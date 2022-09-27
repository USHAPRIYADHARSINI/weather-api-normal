// https://csb-gwo8r.netlify.app/    homework


document.body.innerHTML = ` <container><h1>Check your country's weather here....🌧️</h1></container>
<container class="page-container"></container>
<container></container>`

var container = document.querySelector('.page-container')
container.innerHTML = fetchdata();

async function fetchdata() {
    try{
        var data = await fetch("https://restcountries.com/v3.1/all")
        var countries = await data.json();
        console.log(countries);

            countries.forEach((country, index) => {

            var token = document.createElement('div');
            token.setAttribute('class','countries-container');
            token.setAttribute("id","token")
          
            var img = document.createElement('img');
            img.setAttribute('class','flag');
            img.src = country.flags.svg;
            img.alt = "country flag";

            var tokeninfo = document.createElement('div');
            tokeninfo.setAttribute('class', 'info-container');

            var name = document.createElement('h2')
            name.innerHTML = country.name.common;            

            var capital = document.createElement('p');
            capital.setAttribute('class', 'span');
            capital.innerHTML = 'Capital : ' + country.capital;

            var region = document.createElement('p');
            region.setAttribute('class', 'span');
            region.innerHTML = 'Region : ' + country.region;

            var population = document.createElement('p');
            population.setAttribute('class','span');
            population.innerHTML = 'Population : ' + country.population;

            var btn = document.createElement('button');
            btn.setAttribute('class', 'open');
            btn.innerHTML = 'Check Weather';
            btn.id = "btn-" + index;

            var weatherdata = document.createElement('section');
            weatherdata.setAttribute('class', 'weather');
            // weatherdata.setAttribute('id', 'weatherid');
            weatherdata.id='weatherid' + index ;
            // weatherdata.innerHTML='';
            // document.getElementById('weatherid'+ index).style.display= "none";


            btn.onclick = async function() {
                try {
                    var data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=b0be8f00887720a1be242ae7651d582d`);
                   
                    var allweatherdata = await data.json();
                    console.log(allweatherdata);
                    console.log(country.latlng + ' : ' + allweatherdata.coord.lon, allweatherdata.coord.lat)

                    weatherdata.innerHTML = `<h4>Temperature on average : ${allweatherdata.main.temp}</h4>

                    <h4> Pressure : ${allweatherdata.main.pressure}</h4>

                    <h4>Humidity : ${allweatherdata.main.humidity}</h4>

                    <h4>Windspeed :  ${allweatherdata.wind.speed}</h4>
                    
                    <h4>Description : ${allweatherdata['weather'][0].description}</h4>`

                    document.getElementById('weatherid'+ index).style.contentEditable = true;
                    document.getElementById('weatherid' + index).style.display= "flex";

                    var okbtn = document.createElement('button')
                    okbtn.setAttribute('class', 'close');
                    okbtn.id= 'okbutton'
                    okbtn.innerHTML = `Ok`
                    okbtn.onclick= function closetab(){
                        document.getElementById('weatherid' + index).style.display= "none";
                    }

                    weatherdata.append(okbtn);

                    // document.getElementById('weatherid').style.display = b

                    // var okbtn = document.createElement('button');
                    // okbtn.setAttribute('class', 'ok');
                    // okbtn.innerHTML =  'Close' ;
                    // okbtn.onclick = function (){
                    //     document.querySelector('.weather').style.display = none;
                    //     }
                
                    // weatherdata.append(description, temp, pressure, humidity, windspeed, okbtn)
                    // tokeninfo.append(name, capital, region, population, weatherdata)
                    // token.append(img, btn, tokeninfo)

                    // console.log(token)

                    // container.append(token)

                    } catch (err) {
                    console.log(err);
                }

            }

            tokeninfo.append(name, capital, region, population)
            token.append(img, btn, tokeninfo)

            console.log(token)

            container.append(token, weatherdata)

        });
    }catch (err) {
            console.log(err);
        }

        
    }





