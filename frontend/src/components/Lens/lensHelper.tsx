import { useState, useContext } from 'react';
import ReferencePanel from './panels/reference';
import DefinePanel from './panels/definition';
import { ThemeContent } from '../../context/ThemeContent'

export interface PanelProps {
  selectionText: string;
}

export enum LensPanels {
  REFERENCE = 'reference',
  DEFINE = 'define',
  TRANSLATE = 'translate',
  BOOKS = 'books',
  MEDIA = 'media',
}

export default function LensHelper({
  textSelection,
}: {
  textSelection: string;
}) {
  const [selectionPanel, setSelectionPanel] = useState<LensPanels>(
    LensPanels.REFERENCE
  );
  const theme = useContext(ThemeContent);
  const chosenPanel = () => {
    switch (selectionPanel) {
      case LensPanels.BOOKS:
      case LensPanels.MEDIA:
      case LensPanels.TRANSLATE:
        return (
          <>
            <h2>IN PROGRESS</h2>
          </>
        );
      case LensPanels.REFERENCE:
        return <ReferencePanel selectionText={textSelection} />;
      case LensPanels.DEFINE:
        return <DefinePanel selectionText={textSelection} />;
    }
  };

  return (
    <div className={'lens-panel' + ' ' + theme.theme.toLowerCase()}>
      <div className={'lens-panel-content'}>{chosenPanel()}</div>
      <div className={'choices' + ' ' + theme.theme.toLowerCase()}>
        {Object.entries(LensPanels).map((panel) => {
          return (
            <button
              key={panel[0]}
              className={panel[1] === selectionPanel ? 'selected-panel' : ''}
              onClick={() => setSelectionPanel(panel[1])}
            >
              {panel[1]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
