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

app.get('/comp/all', async (req, res) => {
    // const db    = await csvdb("./data/companies.csv", ["CMGUnmaskedID","CMGUnmaskedName","ClientTier","GCPStream","GCPBusiness","CMGGlobalBU","CMGSegmentName","GlobalControlPoint","GCPGeography","GlobalRelationshipManagerName","REVENUEFY14","REVENYEFY15X","Deposits_EOP_FY14","Deposits_EOP_FY15x","TotalLimits_EOP_FY14","TotalLimits_EOP_FY15YTD","TotalLimits_EOP_FY15x","RWAFY15","RWAFY14","REV/RWAFY14","REV/RWAFY15","NPAT_AllocEq_FY14","NPAT_AllocEq_FY15X","RegulatoryCapital_AVG_FY15","RegulatoryCapital_AVG_FY14","ROEFY14","ROEFY15"], ",");
    const db    = await csvdb("./data/companies.csv", ["Col01","Col02","Col03","Col04","Col05","Col06","Col07","Col08","Col09","Col10","Col11","Col12","Col13","Col14","Col15","Col16","Col17","Col18","Col19","Col20","Col21","Col22","Col23","Col24","Col25","Col26","Col27"], ",");
    const all   = await db.get();
 
    res.send(all);
});

app.get('/comp/find/:col/:val', async (req, res) => {
    const col   = req.params.col;
    const val   = req.params.val;
    const db    = await csvdb("./data/companies.csv", ["CMGUnmaskedID", "CMGUnmaskedName", "ClientTier", "GCPStream", "GCPBusiness", "CMGGlobalBU", "CMGSegmentName", "GlobalControlPoint", "GCPGeography", "GlobalRelationshipManagerName", "REVENUE FY14", "REVENYE FY15X", " Deposits_EOP_FY14", " Deposits_EOP_FY15x", " TotalLimits_EOP_FY14", " TotalLimits_EOP_FY15YTD", " TotalLimits_EOP_FY15x", " RWAFY15", " RWA FY14", "REV/RWA FY14", "REV/RWA FY15", " NPAT_AllocEq_FY14", " NPAT_AllocEq_FY15X", " RegulatoryCapital_AVG_FY15", " RegulatoryCapital_AVG_FY14", "ROE FY14", "ROE FY15"], ",");
    const find  = col === "Col1" ? await db.get({"Col1":val}) : col === "Col2" ? await db.get({"Col2":val}) : await db.get({"Col3":val}) ;
    // const find  = await db.get({"Col1":"Blabla"});
 
    res.send(find);
});

app.get('/tes/all', async (req, res) => {
    // const db    = await csvdb("./data/companies.csv", ["CMGUnmaskedID","CMGUnmaskedName","ClientTier","GCPStream","GCPBusiness","CMGGlobalBU","CMGSegmentName","GlobalControlPoint","GCPGeography","GlobalRelationshipManagerName","REVENUEFY14","REVENYEFY15X","Deposits_EOP_FY14","Deposits_EOP_FY15x","TotalLimits_EOP_FY14","TotalLimits_EOP_FY15YTD","TotalLimits_EOP_FY15x","RWAFY15","RWAFY14","REV/RWAFY14","REV/RWAFY15","NPAT_AllocEq_FY14","NPAT_AllocEq_FY15X","RegulatoryCapital_AVG_FY15","RegulatoryCapital_AVG_FY14","ROEFY14","ROEFY15"], ",");
    const db    = await csvdb("./data/tes.csv", ["Col01","Col02","Col03","Col04","Col05","Col06","Col07","Col08","Col09","Col10","Col11","Col12","Col13","Col14","Col15","Col16","Col17","Col18","Col19","Col20","Col21","Col22","Col23","Col24","Col25","Col26","Col27"], ",");
    const all   = await db.get();
 
    res.send(all);
});

app.get('/tes/find/:col/:val', async (req, res) => {
    const col   = req.params.col;
    const val   = req.params.val;
    // const db    = await csvdb("./data/tes.csv", ["CMGUnmaskedID", "CMGUnmaskedName", "ClientTier", "GCPStream", "GCPBusiness", "CMGGlobalBU", "CMGSegmentName", "GlobalControlPoint", "GCPGeography", "GlobalRelationshipManagerName", "REVENUE FY14", "REVENYE FY15X", " Deposits_EOP_FY14", " Deposits_EOP_FY15x", " TotalLimits_EOP_FY14", " TotalLimits_EOP_FY15YTD", " TotalLimits_EOP_FY15x", " RWAFY15", " RWA FY14", "REV/RWA FY14", "REV/RWA FY15", " NPAT_AllocEq_FY14", " NPAT_AllocEq_FY15X", " RegulatoryCapital_AVG_FY15", " RegulatoryCapital_AVG_FY14", "ROE FY14", "ROE FY15"], ",");
    const db    = await csvdb("./data/tes.csv", ["Col01","Col02","Col03","Col04","Col05","Col06","Col07","Col08","Col09","Col10","Col11","Col12","Col13","Col14","Col15","Col16","Col17","Col18","Col19","Col20","Col21","Col22","Col23","Col24","Col25","Col26","Col27"], ",");
    const find  = col === "Col1" ? await db.get({"Col01":val}) : col === "Col2" ? await db.get({"Col02":val}) : await db.get({"Col03":val}) ;
    // const find  = await db.get({"Col1":"Blabla"});
 
    res.send(find);
});

app.listen(port, () => console.log('Server running on port '+port));