import { getTranslation } from './resources/translate';
import { connectToDb } from './config/db';
import cors = require('cors');
import './config/env';

const express = require('express');
var bodyParser = require('body-parser')
var app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/translation', getTranslation);

connectToDb().then(() => {
    console.log('db connected');
});

app.listen(3012, () => {
    console.log(
        "  App is running at http://localhost:%d in %s mode",
        3012,
        app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
});
