import app from "./server";
import serverless from "serverless-http";

const port = 3000;

app.listen(port, () => {
  console.log(`RUNNING SERVER on port ${port}`);
});
