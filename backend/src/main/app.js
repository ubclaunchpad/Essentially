const express = require("express");
const cors = require('cors')
const keyword = require("./route/keywordRoute")

const app = express();
const port = 3000;

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    console.log(req);
    return res.send('Received a GET HTTP method');
});

app.use("/keyword", keyword);

app.listen(port, () => {
    console.log(`api listen on ${port}`)
});
