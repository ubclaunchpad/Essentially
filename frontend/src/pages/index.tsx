import { useState } from 'react';
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

export default function Home() {
  const [newSource, setNewSource] = useState<string>('');
  const [sources, setSources] = useState<string[]>([]);
  const [edit, setEdit] = useState(true);

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
                onClick={(e) => {
                  setSources((prev) => prev.concat([newSource]));
                  setNewSource('');
                }}
              >
                Add Text
              </button>
              <button
                disabled={sources.length === 0}
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
    </div>
  );
}
