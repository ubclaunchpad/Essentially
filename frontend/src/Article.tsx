import { useState, useEffect } from "react";
import './App.css';
import { useNavigate } from 'react-router-dom'

interface IArticleData {
    title: string,
    date: Date,
    author: string,
    website: string,
    body: string,
}

function Article() {
    const navigate = useNavigate();

    const [url, setUrl] = useState<string>();
    const [article, setArticle] = useState<any>([]);

    const getCurrentUrl = () => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs : any) => {
            setUrl(tabs[0].url);
        })
    }

    useEffect(() => {
        getCurrentUrl();
    }, [])

    useEffect(() => {
        if (url) {
            fetch("http://localhost:3000/article", {
                method: 'POST',
                body: url,
                headers: {
                    'Content-Type': 'text/plain'
                }
            })
                .then((res : any) => res.json())
                .then((json : any) =>  setArticle(json.text))
        }
    }, [url]);

    const mainMenu = () => {
        navigate('/');
    }


    return (
        <div>
            <h1>
                Article Text
            </h1>
            <div className='article'>
                {article.map((text : any, i : number) => {
                    return (
                        <p key={i}>
                            {text}
                        </p>
                    );
                })}
            </div>
            <button onClick={mainMenu}>
                Back
            </button>
            <button>
                Summarize
            </button>
        </div>
    );
}


export default Article