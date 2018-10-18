const MongoClient = require('mongodb').MongoClient
const deepEqual = require('deep-equal')
const url = "mongodb://localhost:27017/api"
const request = require('ajax-request')




var data
const DataURL = {
        id_url:1,
        url:"http://data.tmd.go.th/api/Weather3Hours/V1/?type=json",
        type:'TMD',
        last_time:""
}


//CreateCollectionURL()
CreateCollectionDATA(DataURL.url)
function CreateCollectionURL()
{
    
    MongoClient.connect(url,function (err,db) {
        db.collection('URL').insertOne(DataURL,(err ,result)=>{
            if(err) throw err 
            else{
                console.log("Create Collection URL complete")
            }
                    
        })
      
  })
}


function CreateCollectionDATA(stringURL) {
    request({
        url: stringURL,
        method: 'GET',
        json :true,
        async : false
        
    }, function(err, res, body) {

        data=body
        data=data.Stations
        //console.log(data.length)
        MongoClient.connect(url,function (err , db){
            for(var i = 0 ;i <data.length ; i++)
            {
                data[i]['round'] = 1
                data[i]['id_url'] =1
                db.collection('Weather3Hours').insertOne(data[i],(err ,result)=>{
                    if(err) throw err 
                    else{
                        
                    }
                    
                });
            }
        db.close
        console.log('Create Collection Weather3Hours complete row : '+data.length)    
        });  
    })
}