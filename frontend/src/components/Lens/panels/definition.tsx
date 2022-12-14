import {PanelProps} from "../lensHelper";

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
    // const [definition, setSelectionDefinition] = useState<IDefinition | undefined>(undefined);
    // const [res, setRest] = useState<any>()
    //
    // useEffect(() => {
    //     // if (selectionText) fetchDefiniton(selectionText);
    //     // else {
    //     //     setSelectionDefinition(undefined);
    //     // }
    // }, [textSelection]);
    // async function fetchDefiniton(selectionText: string) {
    //     const result = await fetch(
    //         `https://en.wikipedia.org/api/rest_v1/page/summary/${selectionText.replace(' ', '_')}`,
    //         {
    //             method: 'GET',
    //         }
    //     );
    //     setRest(await result.json())
    //
    //     const result2 = await fetch(
    //         `https://api.dictionaryapi.dev/api/v2/entries/en/${selectionText}`,        {
    //             method: 'GET',
    //         }
    //     );
    //
    //     const def: IDefinition[] = (await result2.json()) as IDefinition[];
    //     setSelectionDefinition(def[0]);
    // }

    return (<div className={"reference-panel"}>
        <h2>{"IN PROGRESS"}</h2>
        <div>

        </div>
    </div>)
}