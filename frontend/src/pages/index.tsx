import { useEffect, useState } from 'react';
import './index.scss';
import SummaryPage from './summaryPage';
import TopBar from './topbar';

export const WORD_COUNT_LIMIT = 250;
export const TEXT_LIMIT = 4;

export interface ServerStatus {
  status: number;
  message: string;
  time: string | number;
}
export default function Home() {
  const [newSource, setNewSource] = useState<string>('');
  const [sources, setSources] = useState<string[]>([]);
  const [edit, setEdit] = useState(true);
  const [serverStatus, setServerStatus] = useState<ServerStatus | undefined>();

  const fetchServerStatus = async () => {
    try {
      const status = await fetch('http://localhost:3000/status', {
        method: 'GET',
      });
      const res = await status.text();
      const date = new Date();
      setServerStatus({
        status: status.status,
        message: res,
        time: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
      });
    } catch (e) {
      const date = new Date();
      setServerStatus({
        status: 500,
        message: 'Server is down',
        time: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
      });
    }
  };

  useEffect(() => {
    fetchServerStatus();
  }, []);

  const content = () => {
    if (edit) {
      return (
        <>
          <div className="input-options">
            <button
              disabled={
                newSource.split(' ').length > WORD_COUNT_LIMIT ||
                newSource.length === 0 ||
                sources.length >= TEXT_LIMIT
              }
              onClick={() => {
                setSources((prev) => prev.concat([newSource]));
                setNewSource('');
              }}
            >
              Add Text
            </button>
            {newSource.length > 0 && (
              <h5 className="wordcount">
                {newSource.split(' ').length}/{WORD_COUNT_LIMIT}
              </h5>
            )}

            <textarea
              placeholder="text to add"
              onChange={(e) => {
                setNewSource(e.target.value);
              }}
              value={newSource}
            ></textarea>
          </div>

          <div className="input-options">
            {sources.map((el, index) => {
              return (
                <div className="source-item" key={index}>
                  <button
                    onClick={() =>
                      setSources((prev) =>
                        prev.filter((source, i) => index !== i)
                      )
                    }
                  >
                    x
                  </button>
                  <p>{el}</p>
                </div>
              );
            })}
            <button
              disabled={sources.length === 0 || serverStatus?.status !== 200}
              onClick={() => setEdit(false)}
            >
              Summarize
            </button>

            <h5 className="info">
              {sources.length} / {TEXT_LIMIT}
            </h5>
            <h5 className="wordcount">
              {sources.reduce(
                (partialSum, a) => partialSum + a.split(' ').length,
                0
              )}
            </h5>
          </div>
        </>
      );
    } else {
      return (
        <>
          <SummaryPage
            text={sources}
            navBack={() => setEdit(true)}
            serverStatus={serverStatus}
          />
          <div className="input-options">
            {sources.map((el, index) => {
              return (
                <div className="source-item" key={index}>
                  <p>{el}</p>
                </div>
              );
            })}
            <button
              disabled={sources.length === 0 || serverStatus?.status !== 200}
              onClick={() => setEdit(true)}
            >
              Edit
            </button>

            <h5 className="info">
              {sources.length} / {TEXT_LIMIT}
            </h5>
            <h5 className="wordcount">
              {sources.reduce(
                (partialSum, a) => partialSum + a.split(' ').length,
                0
              )}
            </h5>
          </div>
        </>
      );
    }
  };

  return (
    <div className="webpage">
      <TopBar />

      <div className="home">
        <div className="content">{content()}</div>
      </div>
      <div className="footer">
        <div className={'status '}>
          <div>
            <button
              onClick={() => {
                fetchServerStatus();
              }}
            >
              Refresh
            </button>
            <p>last check was at {serverStatus?.time}</p>
          </div>

          <div>
            <p>{serverStatus?.message}</p>
            <p className={serverStatus?.status === 200 ? 'active' : 'inactive'}>
              {serverStatus?.status}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
