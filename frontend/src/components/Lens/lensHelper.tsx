import "./index.css"
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

export default function LensHelper({ textSelection }: { textSelection: string }) {


    const [definition, setSelectionDefinition] = useState<
        IDefinition | undefined
    >(undefined);

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



    return (
       <div className={"lens-panel"}>
           <div className={"lens-panel-content"}>
           <h2>{textSelection}</h2>
           <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
           </div>

       <div className={"choices"}>

       </div>

       </div>
    );
}
