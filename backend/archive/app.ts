import app from "./server";
const port = 3000;

app.listen(port, () => {
  console.log(`RUNNING SERVER on port ${port}`);
});

export default app;
