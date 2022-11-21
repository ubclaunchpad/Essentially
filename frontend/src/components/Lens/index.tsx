import { useState, useRef, useEffect } from 'react';

interface IDef {
  definition: string;
  example: string;
  // synonyms: any;
  // antonyms: any;
}

interface IDefinition {
  word: string;
  origin: string;
  // phonetics: any;
  // phonetic: any;
  meanings: { partofspeech: string; definitions: IDef[] }[];
}

export default function Lens({ children }: { children: JSX.Element }) {
  const DEFINITION_POPUP_ID = 'definition-popup';
  const [selectionText, setSelectionText] = useState<string | null>(null);
  const [definition, setSelectionDefinition] = useState<
    IDefinition | undefined
  >(undefined);

  const ref = useRef<HTMLElement>(null);

  async function fetchDefiniton(selectionText: string) {
    const result = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${selectionText}`,
      {
        method: 'GET',
      }
    );
    const def: IDefinition[] = (await result.json()) as IDefinition[];
    setSelectionDefinition(def[0]);
  }

  useEffect(() => {
    if (selectionText) fetchDefiniton(selectionText);
    else {
      setSelectionDefinition(undefined);
    }
  }, [selectionText]);

  document.addEventListener('selectionchange', () => {
    const selection = document.getSelection();
    if (selection == null || selection.toString().length == 0) {
      setSelectionText(null);
      return;
    }

    try {
      if (
        selection.focusNode != null &&
        selection.focusNode.parentElement != null &&
        selection.focusNode.parentElement.closest(`#${DEFINITION_POPUP_ID}`) !=
          null
      ) {
        const element = selection.focusNode.parentElement.closest(
          `#${DEFINITION_POPUP_ID}`
        );
        if (!element || element.id !== `${DEFINITION_POPUP_ID}`) {
          return;
        }
      } else {
        return;
      }
    } catch (e) {
      return;
    }

    setSelectionText(selection.toString());
    const range = selection.getRangeAt(0).cloneRange();
    if (!range.getClientRects) return null;
    range.collapse(true);
    const rects = range.getClientRects();
    if (rects.length <= 0) return null;
    const rect = rects[0];
    if (ref.current) {
      ref.current.style.position = 'absolute';
      ref.current.style.left = 0 + 'px';
      ref.current.style.top =
        rect.top - 40 - ref.current.offsetHeight < 0
          ? 0 + 'px'
          : rect.top - 40 - ref.current.offsetHeight + 'px';
    }
  });

  return (
    <div id={DEFINITION_POPUP_ID}>
      {children}
      {selectionText && (
        <section ref={ref} id={`${DEFINITION_POPUP_ID}-hov`}>
          <h6>{selectionText}</h6>
          {definition &&
            definition.meanings &&
            definition.meanings.map((m) => (
              <div key={m.partofspeech}>
                {m.definitions.map((word) => (
                  <p key={word.definition}>{word.definition}</p>
                ))}
              </div>
            ))}
        </section>
      )}
    </div>
  );
}
