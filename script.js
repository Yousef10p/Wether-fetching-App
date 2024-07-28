function start(){
    const btn = document.getElementById("btnSubmit");
    btn.onclick = buttonPress;
}

function buttonPress(){
    const dateHolder = document.getElementById("dateEn");
    const tableEntry = document.getElementsByTagName("td");
    
    const cityCoor = document.getElementsByTagName('select')[0].value.split(',');
    const lat = Number(cityCoor[0]); 
    const lon = Number(cityCoor[1]);
    const APILINK = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=61c2db3c31ba4770866bf0ca7f7764f0&include=minutely`;

    fetch(APILINK)
    .then(data => data.json())
    .then(data => {
        let temp = data.minutely[0].timestamp_local.split('T')
        let x = temp[1].split(':');
        x[0] = Number(x[0])
        if(x[0] > 12)
            x[0] -= 12;
        x.splice(2,1);
        let y = x.join(':');
        dateHolder.innerHTML =` ${y}  ${temp[0]}`
        
        temp = [data.data[0].weather.description, data.data[0].temp]
        let times = [data.data[0].sunrise.split(':'), data.data[0].sunset.split(':')];
        times[0][0] = Number(times[0][0]) + 3
        times[1][0] = Number(times[1][0]) + 3
        for(let i = 0; i < temp.length; i++){
            tableEntry[i].innerHTML = temp[i]
        }
        for(let i = 0; i < times.length; i++){
            if(times[i][0] > 12)
                times[i][0] -= 12;
        }
        tableEntry[2].innerHTML = `${times[0][0]}:${times[0][1]}`;
        tableEntry[3].innerHTML = `${times[1][0]}:${times[1][1]}`;
    })
}

window.onload = start