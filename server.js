const express   = require('express');
const app       = express();
const csvdb     = require('csv-database');

const port      = 3000;

app.get('/', (req, res) => {
    res.send(req);
});

app.get('/csv/all', async (req, res) => {
    const db    = await csvdb("./data/default.csv", ["Col1","Col2","Col3"], ",");
    const all   = await db.get();
 
    res.send(all);
});

app.get('/csv/find/:col/:val', async (req, res) => {
    const col   = req.params.col;
    const val   = req.params.val;
    const db    = await csvdb("./data/default.csv", ["Col1","Col2","Col3"], ",");
    const find  = col === "Col1" ? await db.get({"Col1":val}) : col === "Col2" ? await db.get({"Col2":val}) : await db.get({"Col3":val}) ;
    // const find  = await db.get({"Col1":"Blabla"});
 
    res.send(find);
});

app.listen(port, () => console.log('Server running on port '+port));