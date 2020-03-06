console.log('client side js loaded!')



const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    messageOne.textContent=''
    messageTwo.textContent=''
    
    const location=search.value

    if(!location){
         return messageOne.textContent='Please enter location'
    }

    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
           // console.log(data)
            if(data.error){
                    return messageOne.textContent=data.error
            }
    

            messageOne.textContent=data.location
            messageTwo.textContent=data.summary +' humidity='+data.humidity
        })
    })

})