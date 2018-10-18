const MongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost:27017/api"

exports.get_all = (req, res, next) =>{
    MongoClient.connect(url,function(err,db){
        db.collection("Weather3Hours")
        .find({})
        .toArray(function(err ,result)
        {
            if(err) throw err 
            const output =
            {
                status:"OK",
                message  : result
            }
            res.json(output)
            
             db.close()
        })
    })

}

exports.get_col = (req ,res,next) =>{
    var name = {
        name: req.body.column
    }
    var query={};
    var temp="";    
    for(var i=0 ;i<name.name.length;i++)
    { 
        temp=name.name[i];
        query[temp] = 1;
    }
    MongoClient.connect(url,function (err , db){
        db.collection('Weather3Hours').find({}, query).toArray(function(err, result) {
            const output =
            {
                status:"OK",
                message  : result
            }
            res.json(output)
            
        })
       
    db.close    
    })

}

exports.get_row = (req ,res,next) =>{
    var name = {
        name: req.body.row
    };
    var data ;
    var query =[];
    for(var i=0 ;i<name.name.length;i++)
    {
        data = name.name[i];
        query.push(data);
    }
    MongoClient.connect(url ,function (err , db){
        db.collection('Weather3Hours').find({Province :{ $in : query} }).toArray(function(err, result) {
            const output =
            {
                status:"OK",
                message  : result
            }
            res.json(output)
        })
    })

}


