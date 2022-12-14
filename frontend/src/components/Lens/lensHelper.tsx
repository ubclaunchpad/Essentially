import "./index.css"
import {useState} from "react";
import ReferencePanel from "./panels/reference";
import DefinePanel from "./panels/definition";

export interface PanelProps {
    selectionText: string;
}

export enum LensPanels {
    REFERENCE= "reference",
    DEFINE= "define",
    BOOKS= "books",
    MEDIA= "media",
}

export default function LensHelper({ textSelection }: { textSelection: string }) {

    const  [selectionPanel, setSelectionPanel] = useState<LensPanels>(LensPanels.REFERENCE);

    const chosenPanel = () => {
        switch (selectionPanel) {
            case LensPanels.BOOKS:
            case LensPanels.MEDIA:
                return <><h2>IN PROGRESS</h2></>;
            case LensPanels.REFERENCE:
                return  <ReferencePanel selectionText={textSelection}/>
            case LensPanels.DEFINE:
                return  <DefinePanel selectionText={textSelection}/>
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
                })}
            </div>
        </div>

    );
}
