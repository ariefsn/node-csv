const express   = require('express');
const app       = express();
const csvdb     = require('csv-database');
var cors        = require('cors');
var bodyParser  = require('body-parser');
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use(express.static('assets'));
app.use(express.static('node_modules'));

const port      = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/views/company.html');;
});

app.post('/company/update', async (req, res) => {
    const ID    = req.body.CMGUnmaskedID;
    const data  = req.body.NewData;

    const db    = await csvdb("./data/companies.csv", [
            "CMGUnmaskedID","CMGUnmaskedName","ClientTier","GCPStream","GCPBusiness",
            "CMGGlobalBU","CMGSegmentName","GlobalControlPoint","GCPGeography","GlobalRelationshipManagerName",
            "REVENUE FY14","REVENYE FY15X"," Deposits_EOP_FY14"," Deposits_EOP_FY15x"," TotalLimits_EOP_FY14",
            " TotalLimits_EOP_FY15YTD"," TotalLimits_EOP_FY15x"," RWAFY15"," RWA FY14","REV/RWA FY14",
            "REV/RWA FY15"," NPAT_AllocEq_FY14"," NPAT_AllocEq_FY15X"," RegulatoryCapital_AVG_FY15"," RegulatoryCapital_AVG_FY14",
            "ROE FY14", "ROE FY15"], ",");
    const result = await db.edit({CMGUnmaskedID: ID}, data);
    res.status(200).send("Saved");
});

app.post('/company/getDetail', async (req, res) => {
    const ID = req.body.CMGUnmaskedID;

    const db    = await csvdb("./data/companies.csv", [
            "CMGUnmaskedID","CMGUnmaskedName","ClientTier","GCPStream","GCPBusiness",
            "CMGGlobalBU","CMGSegmentName","GlobalControlPoint","GCPGeography","GlobalRelationshipManagerName",
            "REVENUE FY14","REVENYE FY15X"," Deposits_EOP_FY14"," Deposits_EOP_FY15x"," TotalLimits_EOP_FY14",
            " TotalLimits_EOP_FY15YTD"," TotalLimits_EOP_FY15x"," RWAFY15"," RWA FY14","REV/RWA FY14",
            "REV/RWA FY15"," NPAT_AllocEq_FY14"," NPAT_AllocEq_FY15X"," RegulatoryCapital_AVG_FY15"," RegulatoryCapital_AVG_FY14",
            "ROE FY14", "ROE FY15"], ",");
    const result = await db.get({CMGUnmaskedID: ID});
    res.send(result);
});

app.post('/company/getData', async (req, res) => {
    const limit = parseInt(req.body.length);
    const offset= parseInt(req.body.start);
    const sumol = offset+limit;
    const filter= req.body.filter !== undefined ? req.body.filter : "";

    const db    = await csvdb("./data/companies.csv", [
            "CMGUnmaskedID","CMGUnmaskedName","ClientTier","GCPStream","GCPBusiness",
            "CMGGlobalBU","CMGSegmentName","GlobalControlPoint","GCPGeography","GlobalRelationshipManagerName",
            "REVENUE FY14","REVENYE FY15X"," Deposits_EOP_FY14"," Deposits_EOP_FY15x"," TotalLimits_EOP_FY14",
            " TotalLimits_EOP_FY15YTD"," TotalLimits_EOP_FY15x"," RWAFY15"," RWA FY14","REV/RWA FY14",
            "REV/RWA FY15"," NPAT_AllocEq_FY14"," NPAT_AllocEq_FY15X"," RegulatoryCapital_AVG_FY15"," RegulatoryCapital_AVG_FY14",
            "ROE FY14", "ROE FY15"], ",");
    const all   = await db.get();
    const search= await db.get(filter);

    var data    = [];

    for(var i = offset; i < sumol; i++){
        search[i] !== undefined ? data.push(search[i]) : '';
    }

    var result  = {
        "recordsTotal"      : all.length,
        "recordsFiltered"   : search.length,
        "data"              : data
    };

    res.send(result);
});

app.listen(port, () => console.log('Server running on port '+port));