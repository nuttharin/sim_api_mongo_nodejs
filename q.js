const MongoClient = require('mongodb').MongoClient
const deepEqual = require('deep-equal')
const url = "mongodb://localhost:27017/api"
const request = require('ajax-request')

var data_temp 
var ID_Weather3Hours =1
//setInterval(intervalFunc, 3000)
//intervalFunc()
function intervalFunc()
{
    console.log("interval") 
    var check =false
    request({
        url: 'http://data.tmd.go.th/api/Weather3Hours/V1/?type=json',
        method: 'GET',
        json :true,
        async:false            
        }, function(err, res, body) {
          
            data_temp=body.Stations
            MongoClient.connect(url,function(err,db){
                db.collection("w3")
                .find({},{_id:0})
                .toArray(function(err ,result)
                {
                    if(err) throw err 
                   
                    //console.log(result.length)
                    console.log(data_temp.length)
                    if(result.length == data_temp.length)
                    {
                        console.log("l1=l2")
                         for(var i=0 ;i<result.length;i++)
                        {                      
                            
                            for(var j=0;j<data_temp.length;j++)
                            {

                                if(deepEqual(result[i],data_temp[j]))
                                {
                                    check =true
                                    console.log("true :"+i)
                                    break;
                                }
                                
                                
                            }
                            if(check==false)
                            {
                                break;
                            }
                        }
                    }                   
                   
                    //console.log(check);
                    if(check == false)
                    {
                        //insert
                        //ID_Weather3Hours++
                    }




                   
                    db.close();
                });
            
        
            });
        
    });
    
   
   

}
function add()
{



    request({
        url: 'http://data.tmd.go.th/api/Weather3Hours/V1/?type=json',
        method: 'GET',
        json :true,
        async : false
        
    }, function(err, res, body) {

        data=body
        data=data.Stations
        
        
        //data = temp.Stations ;
        //console.log(data.length)
        console.log(typeof(data[0]))
        data[0]["ID"] =1
        console.log(data[0])
        // MongoClient.connect(url,function (err , db){
        //     for(var i = 0 ;i <data.length ; i++)
        //     {
        //         db.collection('w3').insertOne(data[i],(err ,result)=>{
        //             if(err) throw err ;
                    
        //         });
        //         count =i;
        //     }
        // db.close    
        // });
        
    
        
    
    })
}


maxQuantity: { $max: "$quantity" }


MongoClient.connect(url,function(err,db){
    db.collection("Weather3Hours")
    .find({},{round :1 })
    .sort({ round: -1 })
    .limit(1)
    .toArray(function(err ,result)
    {
        const t ={
            status:"OK",
            message  : result
        }
        var o = JSON.stringify(result)
        console.log(t.message[0].round)        
        db.close()
    })
})

