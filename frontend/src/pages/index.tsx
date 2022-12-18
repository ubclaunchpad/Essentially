import { useEffect, useState } from 'react';
import Article from '../components/ArticleSection';
import './index.scss';

const text = {
  title: '',
  date: '',
  author: '',
  website: '',
  icon: '',
  body: [],
};

interface ServerStatus {
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
            <textarea
              placeholder="text to add"
              onChange={(e) => {
                setNewSource(e.target.value);
              }}
            ></textarea>

            <div>
              <button
                disabled={
                  newSource.length > 3000 ||
                  newSource.length === 0 ||
                  sources.length >= 5
                }
                onClick={(e) => {
                  setSources((prev) => prev.concat([newSource]));
                  setNewSource('');
                }}
              >
                Add Text
              </button>
              <button
                disabled={sources.length === 0 || serverStatus?.status !== 200}
                onClick={() => setEdit(false)}
              >
                Summarize
              </button>
            </div>
          </div>

          <div className="sources">
            {sources.map((el) => {
              return (
                <div className="source-item" key={el}>
                  <p>{el}</p>
                </div>
              );
            })}
          </div>
        </>
      );
    } else {
      return (
        <div>
          <div>
            <button disabled>Rate</button>
            <button disabled>Feedback</button>
            <button onClick={() => setEdit(true)}>Redo</button>
          </div>
          <Article
            title={text.title}
            date={text.date}
            author={text.author}
            website={text.website}
            body={sources}
            close={close}
          />
        </div>
      );
    }
  };

  return (
    <div className="webpage">
      <div className="top">
        <h1>Essentially Test</h1>
      </div>
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
