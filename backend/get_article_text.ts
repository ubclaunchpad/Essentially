const jsdom = require('jsdom');
const { JSDOM } = jsdom;
import express from 'express';
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.text())

app.use(cors());

app.post('/article', (req : express.Request, res: express.Response ) => {
    const url = req.body;
    fetch(url)
        .then((res) => res.text())
        .then((text) => {
            const doc = new JSDOM(text);

            const text_elements = doc.window.document.getElementsByTagName('p');


            const all_text = [];

            for (const text_element of text_elements) {
                const span_regex = /<span.*>/g
                const a_tag_regex = /<\/?a([^>])*>/g

                const text = text_element.innerHTML;

                if (text.charAt(0) !== '<' && !(span_regex.exec(text))) {
                    all_text.push(text.replaceAll(a_tag_regex, ""));
                }

            }

            res.send({text: all_text})
        })


})



app.listen(port);