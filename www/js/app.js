//init instance 

$(".dropdown-trigger").dropdown({ hover: false });

$(document).ready(function () {
    $('.sidenav').sidenav();
});


// tabs 

$(document).ready(function(){ 
    $('.tabs').tabs();   

  });

 

// end of init instance




var konektor = document.getElementById("konektor");
var tos = document.getElementById("btn");
var toastHTML = '<span id="mensahe_una">Sorry we encountered some issues with your connectivity.</br>Please try again later.</span>';
var change = document.getElementById("change");  // container ito
var change1 = document.getElementById("change1");  // container ito
var indic = document.getElementById("indic");  // container ito
var mapa = document.getElementById("mapa");



function refresh(){
   location.reload();

} // end of refresh



function sarado(){  

    navigator.app.exitApp();
 
 } // end of refresh




async function una() {
    setTimeout(async function () {

        try {

            var a = await fetch('https://freegeoip.app/json/'); // Pang test lang ng connectivity
            var b = await a.json();
            konektor.click();




        } catch (error) {
            // alert('Sorry We Encountered Some Issues with Your Connectivity.\n\nPlease Try Again Later. ');
            tos.click();
            this.sarado();

        }

    }, 6000)
} // end ng unang function


// close function
function sarado() {
    setTimeout(() => {
        navigator.app.exitApp();
    }, 6000)
} // end ng sarado




async function ph() {

    try {



        change.innerHTML = '';
        change1.innerHTML = `<div id ="indic"><center><div class="progress"><div class="indeterminate"></div></div><p id="indictext">Gathering Data</p></center></div>`;




        var aa = await fetch('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minlatitude=4.2259&minlongitude=116.1474999&maxlatitude=19.932&maxlongitude=127.6444784');
        var ab = await aa.json();
        var ac = await ab.features;
        var ad = Object.values(ac);   // to array
        




        ad.forEach(async function (ph) {

            var coor1 = await ph.geometry.coordinates[1];
            var coor2 = await ph.geometry.coordinates[0];
            var x = await ph.id;
            var xa = await ph.properties.mag;
            var xb = await ph.properties.time;
            var xba = moment(xb).startOf('hour').fromNow();  // time
            var xc = await ph.properties.place;
            var xca = await xc.split(',', -1);  // pang Bansa
            var xcb = await xc.split(',', 1);  // pang lugar lamang
            var xcd = await xca[1];  // bansa para API



            change1.innerHTML = "";  // pang remove ng progress bar 

            if (xa <= 3) {



                change.innerHTML += `
            <div class="row">
                  <div class="col s12">
                       
                  <ul class="collection z-depth-2" onclick="window.open('https://earthquake.usgs.gov/earthquakes/eventpage/${x}/map', '_system', 'location=yes'); return false;" class="secondary-content">
                  <li class="collection-item avatar">
                  
                    
                  <p id="pamagat">
                  ${xcb}
                  </p> 

                  <p id="deyt">
                  ${xba}<br>
                  <p id="deyt-min">WEAK</p>
                  </p>  
                  
                  <p id="min">
                        ${xa}
                  </p>  

                  <p id="coor1" value="${coor1}">
                  ${coor1}
                  </p> 

                  <p id="coor2" value="${coor}">
                  ${coor2}
                  </p> 

          
               
                 

                  <a href="#!" class="secondary-content"><i class="material-icons" style="color:#4caf50;" id="bilog">place<p id="bansa">${xcd}</p></i></a>
                  </li>                
                </ul>


                  </div>
            </div>
            
  
            
            
            `;


            } else if (xa <= 5) {

                //change1.innerHTML =     "";  // pang remove ng progress bar 

                change.innerHTML += `
            <div class="row">
                  <div class="col s12">
                       
                  <ul class="collection z-depth-2" onclick="window.open('https://earthquake.usgs.gov/earthquakes/eventpage/${x}/map', '_system', 'location=yes'); return false;" class="secondary-content">
                  <li class="collection-item avatar">                    
                    
                     
                  <p id="pamagat">
                  ${xcb}
                  </p> 

                  <p id="deyt">
                  ${xba}<br>
                  <p id="deyt-med">MODERATE</p>
                  </p>  
                  
                  <p id="med">
                        ${xa}
                  </p>  

                  <p id="coor1" value="${coor1}">
                  ${coor1}
                  </p> 

                  <p id="coor2" value="${coor2}">
                  ${coor2}
                  </p> 
          
               
                  
                

                    <a href="#!" class="secondary-content"><i class="material-icons" style="color:#FBC02D;" id="bilog">place<p id="bansa">${xcd}</p></i></a>
                  </li>                
                </ul>


                  </div>
            </div>
            
  
            
            
            `;


            } else {


                //change1.innerHTML =     "";  // pang remove ng progress bar 

                change.innerHTML += `
            <div class="row">
                  <div class="col s12">
                       
                  <ul class="collection z-depth-2" onclick="window.open('https://earthquake.usgs.gov/earthquakes/eventpage/${x}/map', '_system', 'location=yes'); return false;" class="secondary-content">
                  <li class="collection-item avatar">                   
                    


                  <p id="pamagat">
                  ${xcb}
                  </p> 

                  <p id="deyt">
                  ${xba}<br>
                  <p id="deyt-max">RISKY</p>
                  </p> 
                  </p>  

                 <p id="max">
                  ${xa}
                 </p>       
                 
                 
                 <p id="coor1" value="${coor1}">
                 ${coor1}
                 </p> 

                 <p id="coor2" value="${coor2}">
                 ${coor2}
                 </p> 
            
               
            

                 <a href="#!" class="secondary-content"><i class="material-icons" style="color:#f44336;" id="bilog">place<p id="bansa">${xcd}</p></i></a>
                   
                  </li>                
                </ul>


                  </div>
            </div>
            
  
            
            
            `;



            }// end of foreach        
        });  // end of foreach

      
    } catch (error) {
        change1.innerHTML = "";  // pang remove ng progress bar 
        change.innerHTML += `
        <center>
        <i class="material-icons" id ="warning">close</i>
        <p id ="warning_text"> Sorry, an error occured while fetching data.</p>    
        </center>


        <center>
        <a class="waves-effect waves-light btn-small" id ="warning_btn" onclick="refresh()">Try Again</a>
       </center>
          
         `;

    } // end ng catch



} // end of main function



// function ng resources

function resource(){
    var r1 = document.getElementById('test4');
    r1.innerHTML = `
    <h4 class="head1">Credits to the following:</h4>

   
    <a href="!#" onclick="window.open('https://leafletjs.com/', '_system'); return false;" id="leaflet">Leaflet JS</a>
    <br>
    <a href="!#" onclick="window.open('https://materializecss.com/', '_system'); return false;" id="materialize">Materialize CSS</a>
    <br>
    <a href="!#" onclick="window.open('https://momentjs.com/', '_system'); return false;" id="momentframe">Moment JS</a>
    <br>
    <a href="!#" onclick="window.open('http://docs.phonegap.com/', '_system'); return false;" id="pg">Phonegap</a>
    <br>
    <a href="!#" onclick="window.open('https://earthquake.usgs.gov/', '_system'); return false;" id="usapi">USGS API</a>
    <br>
    <a href="!#" onclick="window.open('https://www.1001fonts.com/', '_system'); return false;" id="usapi">1001 fonts</a>
    <br>
    <br>
    <p id="mungkahi">And Lastly</p>   
    <a href="!#" onclick="window.open('https://www.flaticon.com/', '_system'); return false;" id="flaticon">The icon used is made by Freepik from <span id="bigtime">www.flaticon.com </span></a>


`;  

}

function developer(){
    var dev1 = document.getElementById('test0');
    dev1.innerHTML = `

    <h4 class="head2">Developer</h4>
    <center>
        <img  class="circle" src="../www/img/github.png" id="logo1">
    </center>

    <p id="gitko">Please feel free to visit me via github <br>
        <a href="!#" onclick="window.open('https://github.com/rockstartraders', '_system'); return false;">@rockstartraders </a>and see other projects created by me.
    </p>`;
}

function inpormasyon(){
    var info1 = document.getElementById('test1');
    info1.innerHTML = `
    <h4 class="remark_ko">Lindol Info.</h4>
        <p id="remark_a">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Ang aplikasyon na ito ay naglalayon na magbigay impormasyon sa mga lindol na naitala ng USGS, maging ito man ay sa loob ng ating bayan o maging sa ibayong dagat. Hinde kaya at magagawa ng programang ito na hulaan ang mga magaganap na lindol at maging ang lokasyon nito.<br><br>
            Huwag <span id="tanga">tanga</span> walang ganon maging ang mga magagaling na manghuhula hinde iyon kayang gawin o mapredikta.</p>

            <br>
            <br>
        <p id="jeng">Gumagalang<br>&nbsp;&nbsp;-&nbsp;<i><b>Developer</b></i></p>

    `;
}



// for each ng gbl


async function gbl() {

    try {



        change.innerHTML = '';
        change1.innerHTML = `<div id ="indic"><center><div class="progress"><div class="indeterminate"></div></div><p id="indictext">Gathering Data</p></center></div>`;




        var aa = await fetch('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&endtime=NOW');
        var ab = await aa.json();
        var ac = await ab.features;
        var ad = Object.values(ac);   // to array
        




        ad.slice(0, 150).forEach(async function (ph) {

            var coor1 = await ph.geometry.coordinates[1];
            var coor2 = await ph.geometry.coordinates[0];
            var x = await ph.id;
            var xa = await ph.properties.mag.toFixed(1);
            var xb = await ph.properties.time;
            var xba = moment(xb).startOf('hour').fromNow();  // time
            var xc = await ph.properties.place;
            var xca = await xc.split(',', -1);  // pang Bansa
            var xcb = await xc.split(',', 1);  // pang lugar lamang
            var xcd = await xca[1];  // bansa para API



            change1.innerHTML = "";  // pang remove ng progress bar 

            if (xa <= 3) {



                change.innerHTML += `
            <div class="row">
                  <div class="col s12">
                       
                  <ul class="collection z-depth-2" onclick="window.open('https://earthquake.usgs.gov/earthquakes/eventpage/${x}/map', '_system', 'location=yes'); return false;" class="secondary-content">
                  <li class="collection-item avatar">
                  
                    
                  <p id="pamagat">
                  ${xcb}
                  </p> 

                  <p id="deyt">
                  ${xba}<br>
                  <p id="deyt-min">WEAK</p>
                  </p>  
                  
                  <p id="min">
                        ${xa}
                  </p>  

                  <p id="coor1">
                  ${coor1}
                  </p> 

                  <p id="coor2">
                  ${coor2}
                  </p> 

          
               
                 

                  <a href="#!" class="secondary-content"><i class="material-icons" style="color:#4caf50;" id="bilog">place<p id="bansa">${xcd}</p></i></a>
                  </li>                
                </ul>


                  </div>
            </div>
            
  
            
            
            `;


            } else if (xa <= 5) {

                //change1.innerHTML =     "";  // pang remove ng progress bar 

                change.innerHTML += `
            <div class="row">
                  <div class="col s12">
                       
                  <ul class="collection z-depth-2" onclick="window.open('https://earthquake.usgs.gov/earthquakes/eventpage/${x}/map', '_system', 'location=yes'); return false;" class="secondary-content">
                  <li class="collection-item avatar">                    
                    
                     
                  <p id="pamagat">
                  ${xcb}
                  </p> 

                  <p id="deyt">
                  ${xba}<br>
                  <p id="deyt-med">MODERATE</p>
                  </p>  
                  
                  <p id="med">
                        ${xa}
                  </p>  

                  <p id="coor1">
                  ${coor1}
                  </p> 

                  <p id="coor2">
                  ${coor2}
                  </p> 
          
               
                  
                

                    <a href="#!" class="secondary-content"><i class="material-icons" style="color:#FBC02D;" id="bilog">place<p id="bansa">${xcd}</p></i></a>
                  </li>                
                </ul>


                  </div>
            </div>
            
  
            
            
            `;


            } else {


                //change1.innerHTML =     "";  // pang remove ng progress bar 

                change.innerHTML += `
            <div class="row">
                  <div class="col s12">
                       
                  <ul class="collection z-depth-2" onclick="window.open('https://earthquake.usgs.gov/earthquakes/eventpage/${x}/map', '_system', 'location=yes'); return false;" class="secondary-content">
                  <li class="collection-item avatar">                   
                    


                  <p id="pamagat">
                  ${xcb}
                  </p> 

                  <p id="deyt">
                  ${xba}<br>
                  <p id="deyt-max">RISKY</p>
                  </p> 
                  </p>  

                 <p id="max">
                  ${xa}
                 </p>       
                 
                 
                 <p id="coor1">
                 ${coor1}
                 </p> 

                 <p id="coor2">
                 ${coor2}
                 </p> 
            
               
            

                 <a href="#!" class="secondary-content"><i class="material-icons" style="color:#f44336;" id="bilog">place<p id="bansa">${xcd}</p></i></a>
                   
                  </li>                
                </ul>


                  </div>
            </div>
            
  
            
            
            `;



            }// end of foreach        
        });  // end of foreach

      
    } catch (error) {
        change1.innerHTML = "";  // pang remove ng progress bar 
        change.innerHTML += `
        <center>
        <i class="material-icons" id ="warning">close</i>
        <p id ="warning_text"> Sorry, an error occured while fetching data.</p>    
        </center>


        <center>
        <a class="waves-effect waves-light btn-small" id ="warning_btn" onclick="refresh()">Try Again</a>
       </center>
          
         `;
    }



} // end of main function
