import { PanelProps } from '../lensHelper';
import { useEffect, useState } from 'react';

interface ReferenceInterface {
  imageSource: string;
  extract: string;
  description: string;
}

export default function ReferencePanel(panelProps: PanelProps) {
  const { selectionText } = panelProps;
  const [referenceData, setReferenceData] = useState<
    ReferenceInterface | undefined
  >(undefined);

  async function fetchInformation() {
    const result = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${selectionText.replace(
        ' ',
        '_'
      )}`,
      {
        method: 'GET',
      }
    );
    const response = await result.json();
    try {
      setReferenceData({
        extract: response.extract,
        description: response.description,
        imageSource: response.thumbnail.source,
      });
    } catch (e) {
      setReferenceData(undefined);
    }
  }

  useEffect(() => {
    fetchInformation();
  }, []);

  if (!referenceData) {
    return (
      <div>
        <h2>No Results</h2>
      </div>
    );
  }

  return (
    <div className={'reference-panel'}>
      <h2>{selectionText}</h2>
      <div>
        <p>
          <img
            src={referenceData.imageSource}
            alt={referenceData.description}
          />
          {referenceData.extract}
        </p>
      </div>
    </div>
  );
}
