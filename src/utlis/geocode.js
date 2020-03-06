const request=require('request')

const geocode=(address,callback)=>{

    const geoUrl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoibWlsYWQxIiwiYSI6ImNrN2JyN2UyaTA0NnEzZ2xjbXBqNzV6eGEifQ.9j2EAt5qMUlmTDIdGnUETA'

    request({url:geoUrl,json:true},(error,res)=>{

        if(error){
            callback('unable to connect to location servers!',undefined)
        }else if(res.body.features.length===0){
            callback('can\'t find location try another!',undefined)
        }else{
            callback(undefined,{
                latitude:res.body.features[0].center[1],
                longitude:res.body.features[0].center[0],
                location:res.body.features[0].place_name
            })
        }
        
    })

}

module.exports=geocode
