// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const commentsPath = path.join(__dirname, 'comments.json');

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/comments', (req, res) => {
    fs.readFile(commentsPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading comments file');
            return;
        }

        res.send(data);
    });
});

app.post('/comments', (req, res) => {
    const comment = req.body.comment;

    fs.readFile(commentsPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading comments file');
            return;
        }

        const comments = JSON.parse(data);
        comments.push(comment);

        fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
            if (err) {
                res.status(500).send('Error writing comments file');
                return;
            }

            res.send('Comment added successfully');
        });
    });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});