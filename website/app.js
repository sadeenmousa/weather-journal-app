/* Global Variables */
let baseURL ='http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=89d549fabe13d1c4761ed9977334d2d2&units=metric';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();


document.getElementById('generate').addEventListener('click', performAction);


function performAction(e){

    const zipCode = document.getElementById('zip').value;
    const feel = document.getElementById('feelings').value;
    if(!zipCode){
        alert(" please enter zip code ");
    }
    
    getWeather(baseURL,zipCode,apiKey)
    .then(function(data){
        console.log(data);
        postData('/add', {temp:data.main.temp, date: newDate, UserRes:feel} )
        .then(
            updateUI()
          )
    })
    
}


const getWeather = async (baseURL,zip,key)=>{
    const res = await fetch(baseURL+zip+',us'+key)
    console.log(res);
    try {
        const data = await res.json();
        console.log("retrive data");
        console.log(data);
        return data;
    } catch (error) {
        console.log("error",error);
    }
}


const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      console.log("POST");
      console.log(newData);
      return newData
    }catch(error) {
    console.log("error", error);
    }
}

const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      //console.log(allData);
      document.getElementById('date').innerHTML = allData.date;
      document.getElementById('temp').innerHTML = allData.temp;
      document.getElementById('content').innerHTML = allData.UserRes;
      console.log('done');

    }catch(error){
      console.log("error", error);
    }
  }
