import { useCallback, useEffect, useState } from 'react';
import { ServerStatus } from '.';
import { v4 as uuidv4 } from 'uuid';
import Loader from '../components/Loader';

export default function SummaryPage({
  text,
  serverStatus,
  navBack,
}: {
  text: string[];
  serverStatus: ServerStatus | undefined;
  navBack: () => void;
}) {
  const [summary, setSummary] = useState<string[]>([]);
  const [summaryLoading, setSummaryIsLoading] = useState(true);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [generateTime, setGenerateTime] = useState(0);

  const generateSummary = useCallback(async () => {
    const time = Date.now();
    setSummaryIsLoading(true);
    const summaryId = uuidv4();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: text.join(), length: 3, summaryId: summaryId }),
    };
    const summaryPath = await fetch('https://xi9bq76tv2.execute-api.us-west-2.amazonaws.com/prod/summaryRequest', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        return data.summaryPath;
      });
    const interval = setInterval(() => {
      fetch(summaryPath).then((res) => {
        if (res.status === 200) {
          clearInterval(interval);
          res.json().then(data => {
            setSummary([data.summarized_text]);
            setSummaryIsLoading(false);
            setGenerateTime(Date.now() - time);
          })
        }
      })
    }, 100);
    generateKeywords();
  }, [text]);

  const generateKeywords = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text.join(), numOfKeywords: 10 }),
    };

    fetch('https://xi9bq76tv2.execute-api.us-west-2.amazonaws.com/prod/keyword', requestOptions)
      .then((res) => res.json())
      .then((data) => setKeywords(data));
  };

  useEffect(() => {
    generateSummary();
  }, [generateSummary]);

  if (summary.length == 0 || summaryLoading) {
    return (
      <div className="input-options">
        <Loader />
      </div>
    );
  }

  return (
    <div className="input-options">
      <h2>Summary</h2>

      {keywords && (
        <div className="source-item">
          {keywords.map((keyword) => (
            <p key={keyword}>{keyword.toUpperCase()}</p>
          ))}
        </div>
      )}
      <div className="source-item">
        <p>{summary.join(' ')}</p>
      </div>

      <h5 className="wordcount">
        {summary.reduce((partialSum, a) => partialSum + a.split(' ').length, 0)}
      </h5>

      <h5 className="info">Generated in: {generateTime}ms</h5>

      <button
        disabled={serverStatus?.status !== 200}
        onClick={() => {
          generateSummary();
        }}
      >
        Try Again
      </button>
    </div>
  );
}
