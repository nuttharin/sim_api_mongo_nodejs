const express =require('express')
const app = express()
const morgan =require('morgan')
const bodyParser = require('body-parser')
const Weather3Hours = require('./api/routers/TMD/Weather3Hours') 



app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended : false})); // false ใช้อัลกอในการ map json ธรรมดา ,true = high
app.use(bodyParser.json());

//---------------Access-Control-Allow-Origin----------
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Orgin, X-Requested-With, Content-Type, Accept,Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next(); // ไปต่อ
})

//-------------------api-------------
app.use('/Weather3Hours',Weather3Hours)

app.get('/',(req , res , next) =>{  // path /
    res.status(200).json({
        message : 'Get root /'
    });

});

module.exports = app