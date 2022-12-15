import {PanelProps} from "../lensHelper";
import {useEffect, useState} from "react";

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

export default function DefinePanel(panelProps: PanelProps) {
    const [definition, setSelectionDefinition] = useState<IDefinition | undefined>(undefined);

    useEffect(() => {
        fetchDefiniton(panelProps.selectionText);
    }, []);

    async function fetchDefiniton(selectionText: string) {
        const result = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${selectionText}`,        {
                method: 'GET',
            }
        );
        const def: IDefinition[] = (await result.json()) as IDefinition[];
        setSelectionDefinition(def[0]);
    }

    return (<div className={"reference-panel"}>
        <h2>{panelProps.selectionText}</h2>
        <div>
            {definition &&
                definition.meanings &&
                definition.meanings.map((m) => (
                    <div key={m.partofspeech}>
                        {m.definitions.map((word) => (
                            <p key={word.definition}>{word.definition}</p>
                        ))}
                    </div>
                ))}
        </div>
    </div>)
}