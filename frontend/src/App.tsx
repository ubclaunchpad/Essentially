import './App.scss';
import { useState } from 'react';
import ArticleSection from './components/ArticleSection/Summary';
import Article, { IArticleData } from './components/ArticleSection/index';

function App() {
  const ESSENTIALLY = 'Essentially';
  const EMPTY_TEXT = {
    title: "",
    date: "",
    author: "",
    website: "",
    icon: "",
    body: []
  }

  const [text, setText] = useState<IArticleData>(EMPTY_TEXT);
  const [showSettings, setShowSettings] = useState(false);

  const callExtension = () => {
    setShowSettings(false);
    try {
      let text = '';
      Array.from(document.body.getElementsByTagName('p')).forEach(
          (element) => (text += element.innerText)
      );

      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs[0].id) {
          chrome.tabs.sendMessage(
              tabs[0].id,
              { greeting: 'hello' },
              function (response) {
                setText(response.text);
              }
          );
        }
      });
    } catch (exception) {
      console.log('COULD NOT CONNECT TO CHROME');
      setText({
            title: "DEFAULT TITLE",
            date: "DEFAULT DATE",
            author: "DEFAULT AUTHOR",
            website: "DEFAULT WEBSITE",
            icon: "DEFAULT ICON",
            body: [
          'Setting zero for offset and blur When the x-offset, y-offset, and blur are all zero, the box shadow will be a solid-colored outline of equal-size on all sides. The shadows are drawn back to front, so the first shadow sits on top of subsequent shadows. When the border-radius is set to 0, as is the default, the corners of the shadow will be, well, corners.',
          " Had we put    i i   \t     in a border-radius of any other value, the corners would have been rounded.We added a margin the size of the widest box-shadow to ensure the shadow doesn't overlap adjacent elements or go beyond the border of the containing box. A box-shadow does not impact box model dimensions.Setting zero for offset and blur When the x-offset, y-offset, and blur are all zero, the box shadow will be a solid-colored outline of equal-size on all sides. The shadows are drawn back to front, so the first shadow sits on top of subsequent shadows.",
        ]
      });
    }
  };

  const close = () => {
    setText(EMPTY_TEXT);
  };

  const settingsMenu = () => {
    if (showSettings) {
      return (
          <div className="settings">
            <div className="dropdown">
              <button>Settings</button>
              <div>
                <button>Summary Length</button>
                <button>Appearance</button>
              </div>
            </div>
          </div>
      );
    }
    return <></>;
  };

  if (text.body.length > 0) {
    return <Article
        title={text.title}
        date={text.date}
        author={text.author}
        website={text.website}
        body={text.body}
        close={close}
    />;
  }

  return (
      <div className="popup">
        <div className="main">
          <div className="start">
            <nav>
              <h1>{ESSENTIALLY}</h1>
              <button onClick={() => setShowSettings((prev) => !prev)}>
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      d="M12.6688 20.1668H9.33209C9.12303 20.1669 8.92023 20.0954 8.75734 19.9644C8.59445 19.8333 8.48125 19.6505 8.43651 19.4463L8.06342 17.7193C7.56573 17.5013 7.0938 17.2286 6.65634 16.9062L4.97242 17.4425C4.77311 17.5061 4.55804 17.4995 4.36295 17.424C4.16786 17.3485 4.00447 17.2085 3.89992 17.0272L2.22792 14.1388C2.12447 13.9575 2.08564 13.7463 2.11778 13.54C2.14992 13.3337 2.25112 13.1444 2.40484 13.0031L3.71109 11.8114C3.65169 11.2716 3.65169 10.7269 3.71109 10.1871L2.40484 8.99816C2.25091 8.85679 2.14956 8.66731 2.11742 8.4608C2.08527 8.25428 2.12424 8.04297 2.22792 7.8615L3.89626 4.97125C4.0008 4.79004 4.16419 4.65004 4.35928 4.5745C4.55438 4.49897 4.76944 4.49243 4.96876 4.556L6.65267 5.09225C6.87634 4.92725 7.10917 4.77325 7.34934 4.63391C7.58126 4.50375 7.81959 4.3855 8.06342 4.28008L8.43742 2.55491C8.48195 2.35068 8.59494 2.16779 8.75766 2.03658C8.92038 1.90537 9.12306 1.83372 9.33209 1.8335H12.6688C12.8778 1.83372 13.0805 1.90537 13.2432 2.03658C13.4059 2.16779 13.5189 2.35068 13.5634 2.55491L13.9411 4.281C14.4381 4.50032 14.9099 4.77295 15.3482 5.09408L17.033 4.55783C17.2322 4.4945 17.4471 4.50115 17.642 4.57668C17.8368 4.6522 18.0001 4.79206 18.1046 4.97308L19.7729 7.86333C19.9856 8.23641 19.9123 8.7085 19.596 8.99908L18.2898 10.1907C18.3492 10.7306 18.3492 11.2753 18.2898 11.8151L19.596 13.0067C19.9123 13.2982 19.9856 13.7694 19.7729 14.1425L18.1046 17.0327C18 17.214 17.8367 17.354 17.6416 17.4295C17.4465 17.505 17.2314 17.5116 17.0321 17.448L15.3482 16.9117C14.911 17.2338 14.4394 17.5062 13.942 17.7239L13.5634 19.4463C13.5187 19.6504 13.4056 19.8331 13.2429 19.9641C13.0802 20.0951 12.8777 20.1667 12.6688 20.1668V20.1668ZM10.9968 7.3335C10.0243 7.3335 9.09166 7.7198 8.40403 8.40744C7.7164 9.09507 7.33009 10.0277 7.33009 11.0002C7.33009 11.9726 7.7164 12.9053 8.40403 13.5929C9.09166 14.2805 10.0243 14.6668 10.9968 14.6668C11.9692 14.6668 12.9018 14.2805 13.5895 13.5929C14.2771 12.9053 14.6634 11.9726 14.6634 11.0002C14.6634 10.0277 14.2771 9.09507 13.5895 8.40744C12.9018 7.7198 11.9692 7.3335 10.9968 7.3335V7.3335Z"
                      fill="#D9D9D9"
                  />
                </svg>
              </button>
            </nav>

            <ArticleSection text={text} />
            <section className="actions">
              {!text.length && (
                  <button onClick={() => callExtension()}>SUMMARIZE</button>
              )}
            </section>
          </div>
        </div>
        {settingsMenu()}
      </div>
  );
}

export default App;