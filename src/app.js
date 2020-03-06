const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geoCode=require('./utlis/geocode')
const forecast=require('./utlis/forecast')

//Define paths for express config
const publicDir=path.join(__dirname,'../public')
const viewsDir=path.join(__dirname,'../templates/views')
const partialsDir=path.join(__dirname,'../templates/partials')

const app=express()
const port=process.env.PORT || 3000

//setup handlebars engine and views location
app.use(express.static(publicDir))
app.set('view engine','hbs')
app.set('views',viewsDir)
hbs.registerPartials(partialsDir)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Title from hbs engine',
        name:'Milad Taheri'
        })
})

app.get('/about',(req,res)=>{

    res.render('about',{
        title:'About me',
        name:'Milad taheri'
    })

})


app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:'No address!'
        })
    }

    geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
    
        if(error){
           return res.send({error})
        }

        forecast(latitude,longitude,(error,{summary,temperature,chanceOfRain}={})=>{
            if(error){
               return res.send(error)
            }
            res.send({
                summary,
                chanceOfRain,
                address : req.query.address,
                location,
                temperature,

            })
        })
    })

    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        error:'Help article not found!'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        error:'Page not found!'
    })
})


app.listen(3000,()=>{
    console.log('Starting server on port 3000.')
})