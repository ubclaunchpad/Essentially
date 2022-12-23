import { useState } from 'react';
import { TEXT_LIMIT, WORD_COUNT_LIMIT } from '.';
import logo from '../assets/icon.png';

const modalScreens = {
  New: "What's new",
  Feedback: 'Feedback',
  None: 'None',
  How: 'How',
};

type MODAL = typeof modalScreens[keyof typeof modalScreens];

export default function TopBar({}) {
  const [showModal, setShowModal] = useState<MODAL>(modalScreens.None);

  const dialog = () => {
    switch (showModal) {
      case modalScreens.New:
        return newFeatures;
      case modalScreens.How:
        return info;
      case modalScreens.Feedback:
        return feedback;
      case modalScreens.None:
      default:
        return <></>;
    }
  };

  const info = (
    <div className="dialog ">
      <div className="info">
        <h4>How to Use</h4>
        <button onClick={() => setShowModal(modalScreens.None)}>Dismiss</button>

        <li>Input any text you want in the text box and click on Add Text</li>
        <li>Click on Summarize to generate a summary from the added texts</li>
        <li>
          Remove an added text by clicking the X on the left side of the text
          item
        </li>

        <h5>Limitations</h5>
        <li>
          you can add up to {TEXT_LIMIT} texts and each up to {WORD_COUNT_LIMIT}{' '}
          words. Reason is to avoid accidental long queries
        </li>
        <li>Summary is disabled when the servers are down</li>
        <li>You can view your word count at the bottom</li>
      </div>
    </div>
  );

  const newFeatures = (
    <div className="dialog ">
      <div className="info">
        <h4>{"What's New"}</h4>
        <button onClick={() => setShowModal(modalScreens.None)}>Dismiss</button>
        <p>Read more on our github repo</p>
        <div className="source-item">
          <h5>January 2023</h5>
          <p>Stay tuned</p>
        </div>
        <div className="source-item">
          <h5>Dec 22, 2022</h5>
          <p>
            {
              "We'd love to hear any feedback about how our summarization works for you"
            }
          </p>
        </div>
      </div>
    </div>
  );

  const feedback = (
    <div className="dialog ">
      <div className="info">
        <h4>Feedback</h4>
        <button onClick={() => setShowModal(modalScreens.None)}>Dismiss</button>
        <p>
          {
            "We'd love to hear any feedback about how our summarization works for you"
          }
        </p>
        <li>
          Please email us at{' '}
          <span>
            <a href="mailto:essentially.read@gmail.com">
              essentially.read@gmail.com
            </a>
          </span>
          .
        </li>
        <li>
          We have plans to automate the feedback process sometime in the future
        </li>

        <h5>Some example feedback questions</h5>
        <li>Does the summary cover the main topic of the text?</li>
        <li>What could be imporoved in the summary?</li>
        <li>Does the summary include unrelated topics?</li>
        <li>
          For a summary*, how well does the summary help you understand the
          text?
        </li>
        <li>Do the keywords acccurately encompass the topics?</li>
        <li>Are the keywords too specific or too vague?</li>
      </div>
    </div>
  );

  return (
    <>
      {dialog()}
      <div className="top">
        <div>
          <img src={logo} alt="icon" />
          <h1>
            Essentially<span>(Testing)</span>
          </h1>
        </div>

        <div>
          <button
            onClick={() => {
              setShowModal(modalScreens.New);
            }}
          >
            {"What's New"}
          </button>
          <button
            onClick={() => {
              setShowModal(modalScreens.How);
            }}
          >
            How to Use
          </button>

          <button
            onClick={() => {
              setShowModal(modalScreens.Feedback);
            }}
          >
            Feedback
          </button>
          <button>
            <a
              href="https://github.com/ubclaunchpad/Essentially"
              target={'_blank'}
              rel="noreferrer"
            >
              Github
            </a>
          </button>
        </div>
      </div>
    </>
  );
}
