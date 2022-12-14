import "./index.css"
import {useEffect, useState} from "react";
import ReferencePanel from "./panels/reference";
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


export enum LensPanels {
    REFERENCE= "reference",
    DEFINE= "define",
    BOOKS= "books",
    MEDIA= "media",
}

export default function LensHelper({ textSelection }: { textSelection: string }) {

    const  [selectionPanel, setSelectionPanel] = useState<LensPanels>(LensPanels.REFERENCE);
    const [definition, setSelectionDefinition] = useState<IDefinition | undefined>(undefined);
    const [res, setRest] = useState<any>()

    useEffect(() => {
        // if (selectionText) fetchDefiniton(selectionText);
        // else {
        //     setSelectionDefinition(undefined);
        // }
    }, [textSelection]);
    async function fetchDefiniton(selectionText: string) {
        const result = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${selectionText.replace(' ', '_')}`,
            {
                method: 'GET',
            }
        );
        setRest(await result.json())

        const result2 = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${selectionText}`,        {
                method: 'GET',
            }
        );

        const def: IDefinition[] = (await result2.json()) as IDefinition[];
        setSelectionDefinition(def[0]);
    }

    const chosenPanel = () => {
        switch (selectionPanel) {
            case LensPanels.BOOKS:
            case LensPanels.DEFINE:
            case LensPanels.MEDIA:
                return <><h2>IN PROGRESS</h2></>;
            case LensPanels.REFERENCE:
                return  <ReferencePanel/>
        }
    }

    return (
        <div className={"lens-panel"}>
            <div className={"lens-panel-content"}>
            {chosenPanel()}
            </div>
            <div className={"choices"}>
                {Object.entries(LensPanels).map((panel) => {
                   return <button
                       key={panel[0]}
                       className={panel[1] === selectionPanel? "selected-panel": ""}
                       onClick={() => setSelectionPanel(panel[1])}>{panel[1]}</button>
                })}s
            </div>
        </div>

    );
}
