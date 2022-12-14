import {useState, useRef, useEffect} from 'react';
import "./index.css"
import LensHelper from "./lensHelper";

type TextActions = "None" | "Google" | "Lens" | "Format" | "Define";

export default function Lens({children}: { children: JSX.Element }) {
    const DEFINITION_POPUP_ID = 'definition-popup';
    const [selectionText, setSelectionText] = useState<string | null>(null);
    const [runLens, setRunLens] = useState<boolean>(false);
    const [options, setOptions] = useState<TextActions>("None");
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        if (options === "Google" && selectionText) {
            window.open(`https://www.google.com/search?q=${selectionText?.replace(" ", "+")}`, '_blank');
        }
        if (options === "Lens") {
            setRunLens(true)
        } else {
            setRunLens(false)
        }
    }, [options])

    useEffect(() => {
        if (!selectionText) {
            setOptions("None")
        }
    }, [selectionText])

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
                    <button className={options === "Google" ? "selected" : ""} onClick={() => {
                        setOptions("Google")
                    }}>Google
                    </button>
                    <button className={"not-ready"} onClick={() => {
                        setOptions("Format")
                    }}>Format
                    </button>
                    <button className={options === "Lens" ? "selected" : ""} onClick={() => {
                        setOptions("Lens")
                    }}>Lens
                    </button>
                    <button className={"not-ready"} onClick={() => {
                        setOptions("Define")
                    }}>Define
                    </button>
                </section>
            )}
            {runLens && selectionText && (
                <div className={"lens-result"}>
                    <svg className={"connect"} width="284" height="175" viewBox="0 0 284 175" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M22.0009 11.4998C-2.49913 13.9998 18.001 23.4998 43.0009 32.9998C68.0008 42.4998 57.5011 57.4998 22.0009 59.9998C-13.4993 62.4998 7.00107 84.9998 39.5009 82.4998C72.0007 79.9998 60.0008 94.4998 24.0009 110.5C-11.9991 126.5 -6.49918 120.5 43.0009 130C92.5009 139.5 -40.5 138.5 22.0009 161.5C84.5017 184.5 247.5 172 271.001 161.5C294.502 151 281.002 138 243.001 139.5C205 141 267 134 264.501 121.5C262.002 109 243.002 102 221.001 90.4998C199 78.9998 244.001 76.4998 257.501 59.9998C271.001 43.4998 235.502 47.9998 230.501 35.9998C225.5 23.9998 271.001 14.9998 257.501 4.49976C244.001 -6.00024 46.5009 8.99976 22.0009 11.4998Z"
                            fill="#191B43" stroke="black"/>
                    </svg>
                    <section className={'reference'}>
                        <LensHelper textSelection={selectionText}/>
                    </section>
                </div>
            )}

        </div>
    );
}
