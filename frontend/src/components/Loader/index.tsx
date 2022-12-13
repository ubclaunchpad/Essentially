export default function Loader() {
  return (
    <div className="loader">
      <div className="progressbar mainbar">
        <h1>Summary is loading</h1>
        <p>
          Process can take up to a minute based on the size and complexity of
          the article
        </p>
      </div>

      <div className="progressbars">
        <div className="progressbar" style={{ animationDelay: '0s' }}>
          <h6>Extracting relevant text</h6>
        </div>

        <div className="progressbar" style={{ animationDelay: '4s' }}>
          <h6>Analyzing text</h6>
        </div>

        <div className="progressbar" style={{ animationDelay: '8s' }}>
          <h6>Finding keywords</h6>
        </div>
        <div className="progressbar" style={{ animationDelay: '12s' }}>
          <h6>Generating smart summary</h6>
        </div>
      </div>
    </div>
  );
}
