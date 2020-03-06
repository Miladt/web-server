const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/8979b60e75391b5a2c7c00d94848738d/'+latitude+','+longitude+'?units=si'

    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to server',undefined)
        }else if(body.error){
            callback('somthing wromg! check lat and lng',undefined)
        }else{
            callback(undefined,{
                summary:body.daily.data[0].summary,
                temperature:body.currently.temperature,
                chanceOfRain:body.currently.precipProbability,
                humidity:body.currently.humidity
            })
        }
    })
}

module.exports=forecast