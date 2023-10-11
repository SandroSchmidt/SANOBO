
function disp_map_old(elm,ds) {
    setviewzoom = 2.5
    kinder = show_decendents(elm,ds)
    kl =kinder.length
    testboundselement = L.geoJSON()
info.append("button").text('Labels on/off').on('click',function(){map_show_lables = !map_show_lables;info.selectAll('*').remove();

select(ds[selected_id],ds) })



info.append("button").text('Vollbild').on('click',function(){

	ganzes.selectAll('*').remove()
	main = ganzes
select(ds[selected_id],ds)

})





info.append("button").text('Punkteliste').on('click',function(){

	ganzes.selectAll('*').remove()


ganzes.append('table').attr('id','tab1').style('padding-left',"10px").attr('width','50%')
tab = d3.select('#tab1')

tab.append('tr').attr('id',"rowx")
d3.select("#rowx").append('th').text("Structure:")
d3.select("#rowx").append('th').text("Title: ")
//d3.select("#rowx").append('th').text("Decknamen: ")
d3.select("#rowx").append('th').text("Lat Long:" )
d3.select("#rowx").append('th').text("MGRS:" )
d3.select("#rowx").append('th').text("Comment:")
//d3.select("#rowx").append('th').text("Inhalt:       " ).attr('width','50%')

	for(p=0;p<kl;p++){
		if (kinder[p].marker != undefined && kinder[p].marker.type != "foto"&& kinder[p].marker.type != "history"){
			//
		
            

if (kinder[p].marker.coordinates_mgrs == undefined){kinder[p].marker.coordinates_mgrs = lattomgrs(kinder[p].marker.coordinates[0],kinder[p].marker.coordinates[1])}

tab.append('tr').attr('id',"row"+p)
d3.select("#row"+p).append('td').text(kinder[p].logic)
d3.select("#row"+p).append('td').text(kinder[p].title)
d3.select("#row"+p).append('td').text(kinder[p].coordinates)
d3.select("#row"+p).append('td').text("MGRS:"+kinder[p].marker.coordinates_mgrs )
d3.select("#row"+p).append('td').text(kinder[p].inhalt)
//d3.select("#row"+p).append('td').text(kinder[p].inhalt )

			
			}
	}	

    ganzes.append("button").text('GPX Datei erstellen').on('click',function(){
        //dsstr = "<?xml version="1.0" encoding="UTF-8" standalone="no" ?><gpx xmlns="http://www.topografix.com/GPX/1/1" xmlns:gpxx="http://www.garmin.com/xmlschemas/GpxExtensions/v3" xmlns:wptx1="http://www.garmin.com/xmlschemas/WaypointExtension/v1" xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1" creator="GPSMAP 62st" version="1.1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.garmin.com/xmlschemas/GpxExtensions/v3 http://www8.garmin.com/xmlschemas/GpxExtensionsv3.xsd http://www.garmin.com/xmlschemas/TrackStatsExtension/v1 http://www8.garmin.com/xmlschemas/TrackStatsExtension.xsd http://www.garmin.com/xmlschemas/WaypointExtension/v1 http://www8.garmin.com/xmlschemas/WaypointExtensionv1.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v1 http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd"><metadata><link href="http://www.garmin.com"><text>Garmin International</text></link><time>2021-11-20T07:36:41Z</time></metadata>"


        function download(content, fileName, contentType) {
            var a = document.createElement("a");
            var file = new Blob([content], {
             type: contentType
            });
            a.href = URL.createObjectURL(file);
            a.download = fileName;
            a.click();
         }
    function saveText(text, filename){
      var a = document.createElement('a');
      a.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(text));
      a.setAttribute('download', filename);
      a.click()
    }
    saveText( dsstr, "export.gpx" );

    })
})	


    if(mymap != undefined) {
        mymap.remove()
    }

    main.append('div').attr('id','mapdiv')
        .style('height','100%')
        .style('background-color',"white")
    var mymap = L.map('mapdiv').setView(setviewmap,setviewzoom)
    
    mymap.on('zoomend', function() {
        setviewzoom = mymap.getZoom()
     
    });

    mymap.on('moveend', function() {
        aa = (mymap.getCenter(),mymap.getCenter())
        setviewmap=[aa.lat,aa.lng]

     
    });
//alert(setviewmap[1])
   //alert(setviewzoom )
   //alert(setviewmap)
xxx = L.geoJSON(kartenmat).addTo(mymap)
    //setviewmap[0]);
//        var geojson;

function highlightFeature(e) {
    var layer = e.target;
  //  alert('d')
    layer.setStyle({
        weight: 3,
    //  color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
}
}
function resetHighlight(e) {
    var layer = e.target;
    layer.setStyle({
    weight: 0.3,fillOpacity:0.7,opacity:1})
    // geojson.resetStyle(e.target);
}

function onEachFeature(feature, layer) {
    let xrz = kinder[i].id
layer.on({
    
   mouseover:  highlightFeature,
    mouseout: resetHighlight,
 
})
layer.on('click',function(){select(dataset[xrz],dataset);})
;
}
pip = undefined
if(show_osm == true){pip = "none"}


       test = L.geoJSON(elm.jsondat, {
            style: {color:elm.color,fillColor:pip}
        }).addTo(mymap)

    layer_icons =  L.layerGroup()
    layer_infra =  L.layerGroup()
    layer_cities =  L.layerGroup()
    layer_kasernen =  L.layerGroup()
    layer_tracks =  L.layerGroup()
    layer_named =  L.layerGroup()
    layer_sektoren=  L.layerGroup()
    layer_fotos=  L.layerGroup()
    layer_history=  L.layerGroup()


    icsi =[20,20]
    base = L.icon({
                iconUrl: './data/icons/barraks.png',
                iconSize:     icsi, // size of the icon
                });
    anonunit = L.icon({
        iconUrl: './data/icons/anonunit.png',
        iconSize:     icsi, // size of the icon
        });

        alf = L.icon({
            iconUrl: './data/icons/alf.png',
            iconSize:    [50,50] // size of the icon
            });
    medical = L.icon({
                iconUrl: './data/icons/hospital.png',
        //        shadowUrl: 'hospital.png',

                iconSize:     icsi, // size of the icon
             //   shadowSize:   [50, 64], // size of the shadow
             //   iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
            //    shadowAnchor: [4, 62],  // the same for the shadow
             //   popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
            });
    german = L.icon({
                iconUrl: './data/icons/flag_deu.png',
                iconSize:     icsi, // size of the icon
                });

               foto = L.icon({
                    iconUrl: './data/icons/foto.png',
                    iconSize:     icsi, // size of the icon
                    });


                history = L.icon({
                    iconUrl: './data/icons/anonunit.png',
                    iconSize:     icsi, // size of the icon
                    });

    frankreich = L.icon({
                iconUrl: './data/icons/flag_fra.png',
                iconSize:     icsi, // size of the icon
                });
kreisel= L.icon({
                iconUrl: './data/icons/kreisel.png',
                iconSize:     icsi, // size of the icon
                });

                passingpoint= L.icon({
                    iconUrl: './data/icons/pp.png',
                    iconSize:     icsi, // size of the icon
                    });
    


     airport = L.icon({
                iconUrl: './data/IMG/icon_airport.png',
                iconSize:     (icsi), // size of the icon
		html: "mooooo"
                });
    frage = L.icon({
                iconUrl: './data/icons/frage.png',
                iconSize:     icsi, // size of the icon
                iconAnchor:   [0, icsi[1]]
                });
                city = L.icon({
                    iconUrl: './data/icons/city.svg',
                    iconSize:     icsi, // size of the icon
                   // iconAnchor:   [0, icsi[1]]
                    });
    flag_bfa = L.icon({
        iconUrl: './data/icons/flag_bfa.png',

        iconSize:     icsi, // size of the icon
        });

flag_usa = L.icon({
        iconUrl: './data/icons/flag_usa.png',

        iconSize:     icsi, // size of the icon
        });
        airport = L.icon({
            iconUrl: './data/icons/airport.png',
            iconSize:     icsi, // size of the icon

            });
    // diese schleife zeichnet alle jsondat aller kinder des sel elm
    
    
    geojson2 = L.geoJSON(elm.jsondat)
            
            geojson2.addTo(testboundselement)
    
    
    for (i=0;i<kl;i++){
    
        if(kinder[i].type =="Staat"){ 
                
            geojson2 = L.geoJSON(kinder[i].jsondat)
            
            geojson2.addTo(testboundselement)}

    
    
        let raz= kinder[i].id



        if (kinder[i].jsondat != undefined){

            

	if(kinder[i].type =="area"){ 
 geojson = L.geoJSON(kinder[i].jsondat)
geojson.bindTooltip("<i>" + kinder[i].title + "</i>",
   {permanent: true, direction:"center"}
  )//.openTooltip()
//layer_var = find_oneup(kinder[i],ds)
geojson.addTo(layer_sektoren)

}


            if (kinder[i].color == undefined){kinder[i].color=snb_lbg}//"grey"}
           //xf45.push(kinder[i].jsondat)

            if(kinder[i].jsondat.layer=="tracks"){
                geojson = L.geoJSON(kinder[i].jsondat, {
                    style: {color: "black",dashArray: '10, 10'} // fillOpacity: 0.5, opacity: 1
                })

   geojson.on('mouseover',function(e){this.openPopup()})
                    geojson.on('mouseout',function(e){this.closePopup()})
geojson.addTo(layer_tracks)

}



    if(kinder[i].jsondat.layer=="tracks"){
                geojson = L.geoJSON(kinder[i].jsondat, {
                    style: {color: "black",dashArray: '10, 10'} // fillOpacity: 0.5, opacity: 1
                })

   geojson.on('mouseover',function(e){this.openPopup()})
                    geojson.on('mouseout',function(e){this.closePopup()})
geojson.addTo(layer_tracks)

}

            if(kinder[i].jsondat.layer=="infra"){
                geojson = L.geoJSON(kinder[i].jsondat, {
                    style: {color: kinder[i].color, weight: 0.3, fillOpacity: 0.5, opacity: 1}
                }).addTo(layer_infra)}


          if(kinder[i].jsondat.layer=="named"){

mgrs_lbl = L.divIcon({
html: "<i>" + "kssssssssssssssskk" + "</i>",
 iconSize:10
})


/*
for (eintrag=0;eintrag < kinder[i].jsondat.features.length;eintrag++)
{mitte=0

marker=L.marker(kinder[i].jsondat.features[eintrag].geometry.coordinates[mitte],{icon: mgrs_lbl,})

marker.addTo(layer_named)


*/

for (eintrag=0;eintrag < kinder[i].jsondat.features.length;eintrag++)
{
                geojson = L.geoJSON(kinder[i].jsondat.features[eintrag], {
                    style: {color: "yellow", weight : 10, opacity: 1}

                })

geojson.bindTooltip(kinder[i].jsondat.features[eintrag].properties.title,
   {permanent: true, direction:"center"}
  )//.openTooltip()
//alert(kinder[i].jsondat.features[eintrag].properties.title)





geojson.addTo(layer_named)}


}


              
                if(kinder[i].jsondat.layer=="Kasernen"){
                    geojson = L.geoJSON(kinder[i].jsondat, {
                        style: {color: kinder[i].color, weight: 0.3, fillOpacity: 0.5, opacity: 1}


                    })
                    geojson.bindPopup(kinder[i].title)
                    geojson.on('mouseover',function(e){this.openPopup()})
                    geojson.on('mouseout',function(e){this.closePopup()})
                    geojson.on('click',function(e){select(ds[raz],ds)})
                    geojson.addTo(layer_kasernen)}

                
    if (
kinder[i].jsondat.layer!="Kasernen"&&
kinder[i].jsondat.layer!="infra"&&
kinder[i].jsondat.layer!="tracks"&&
kinder[i].type!="area") {
                      
                        geojson = L.geoJSON(kinder[i].jsondat, {
                          
                           onEachFeature: onEachFeature,
                        
                            style: {color: "#404040" , weight: 0.3, fillOpacity: 0.7, opacity: 1,fillColor:kinder[i].color}

                        },kinder[i].id).addTo(mymap)
                        if (show_länderpop == true){
                        geojson.bindPopup(kinder[i].title  )
                        geojson.on('mouseover',function(e){this.openPopup()})
                        geojson.on('mouseout',function(e){this.closePopup()})
                    }  }
            }








              //  .on('click',function () {    select(ds[raz],ds)            })
        


        if (kinder[i].marker != undefined){

            if (kinder[i].marker.type != undefined){eval("sel_icon = " + kinder[i].marker.type)}else{sel_icon=frage}

if(kinder[i].marker.coordinates_mgrs != undefined){
//alert(kinder[i].marker.coordinates_mgrs)

kinder[i].marker.coordinates= mgrstolat(kinder[i].marker.coordinates_mgrs)
//}
}
            marker=L.marker(kinder[i].marker.coordinates, {icon: sel_icon})//.addTo(mymap);
            marker.bindPopup(kinder[i].title)// +" - " +kinder[i].marker.coordinates[0]+"/"+kinder[i].marker.coordinates[1])//.openPopup();
            marker.on('mouseover',function(e){this.openPopup()})
            marker.on('mouseout',function(e){this.closePopup()})
            marker.on('click',function(e){select(ds[raz],ds)})

// geojson = L.geoJSON(kinder[i].jsondat)
if(map_show_lables == true){
marker.bindTooltip("<i>" + kinder[i].title + "</i>",
   {permanent: true, direction:"center"})
}
if (kinder[i].marker.type =="city"){
    {layer_cities.addLayer(marker)}
}
    if (kinder[i].marker.type =="foto"){
        {layer_fotos.addLayer(marker)}
    }else  
    {layer_icons.addLayer(marker)}

        }


    }






if(elm.type =="Staat")
{   
layer_infra.addTo(mymap)
layer_kasernen.addTo(mymap)
layer_icons.addTo(mymap)
layer_cities.addTo(mymap)

 L.control.layers(null, {
    "Städte": layer_cities,
"infra": layer_infra,
"kasernen":layer_kasernen,
"Icons": layer_icons,
"MGRS": layer_MGRS,
"GRG": layer_GRG , 
"tracks" : layer_tracks,
"Geländetaufe" : layer_named,
"Sektoren" : layer_sektoren,
"Fotos" : layer_fotos,
"Historie" : layer_history

}
).addTo(mymap);
}
else
{    layer_cities.addTo(mymap)
    L.control.layers(null, {"Städte": layer_cities,"infra": layer_infra,"kasernen":layer_kasernen,"Icons": layer_icons}).addTo(mymap);
}

 layer_MGRS =  L.layerGroup()
 layer_GRG =  L.layerGroup()
//draw_MGRS_gitter("30P XU",55000,62000,[10,15])
draw_MGRS_gitter("30P XU",50000,60000,[20,25])
draw_MGRS_gitter("30P YT",00000,29000,[6,10])

draw_alphanum_gitter("30P XU",50000,60000,[20,25])
draw_alphanum_gitter("30P YT",00000,29000,[6,10])
function draw_alphanum_gitter(ar,x0,y0,feldgr){
//ytext =["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26"]
ytext =["59","58","57","56","55","54","53","52","51","50","49","48","47","46","43","42","41","40","39","38","37","36","35","34","33","32","31"]
xtext =["J","K","M","L","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","A","B","C","D","E","F","G","H","I","J","K","M"]
/*
ar = "30P XU"
x0 = 55000
y0 = 62000
feldgr=[10,15]
*/
xr = x0

for (j=0;j<feldgr[1]+1;j++){
yr = y0 + 1000*j 
mgrs_lbl = L.divIcon({
html: "<i>" + ytext[j] + "</i>",
 iconSize:0
})
mgrs = ar +" "+xr +" " +yr
mgrs2 = ar +" "+(xr+feldgr[0]*1000) +" " +yr
mgrs3 = ar +" "+(xr+300) +" " +(yr+900)
var lin = L.polyline([mgrstolat(mgrs),mgrstolat(mgrs2)],{color:"black",weight:0.5})
lin.addTo(layer_GRG)
marker=L.marker(mgrstolat(mgrs3),{icon: mgrs_lbl,})
//marker.bindPopup("Vert: "+yr /1000)
//marker.on('mouseover',function(e){this.openPopup()})
marker.addTo(layer_GRG)
}


for (i=0;i<feldgr[0]+1;i++)
{
xr = x0 + 1000*i
mgrs_lbl = L.divIcon({
html: "<i>" + xtext[i] + "</i>",
 iconSize:0
})
mgrs = ar +" "+xr +" " +yr
mgrs2 = ar +" "+xr +" " +(yr-feldgr[1]*1000)
mgrs3 = ar +" "+(xr+200) +" " +(yr-300)
var lin = L.polyline([mgrstolat(mgrs),mgrstolat(mgrs2)],{color:"black",weight:0.5}).addTo(layer_MGRS)
lin.addTo(layer_GRG)
marker=L.marker(mgrstolat(mgrs3),{icon: mgrs_lbl, iconSize:0})
//marker.bindPopup("Horiz: "+xr /1000)
//marker.on('mouseover',function(e){this.openPopup()})
marker.addTo(layer_GRG)
}

}


function draw_MGRS_gitter(ar,x0,y0,feldgr){


//  + (x0+feldgr[0]*500)/1000 + " " + (y0+feldgr[1]*1000)/1000 + 
mgrs_lbl = L.divIcon({html: "<span><font size='+3'>"+ar+"</font></span>", iconSize:0})

marker=L.marker(mgrstolat(ar +" "+(x0+feldgr[0]*500) +" " +(y0+feldgr[1]*1000+1000)),{icon: mgrs_lbl,})
marker.addTo(layer_MGRS)



/*
ar = "30P XU"
x0 = 55000
y0 = 62000
feldgr=[10,15]
*/
xr = x0

for (j=0;j<feldgr[1]+1;j++){
yr = y0 + 1000*j
mgrs_lbl = L.divIcon({
html: "<i>" + (yr/1000) + "</i>",
 iconSize:0
})
mgrs = ar +" "+xr +" " +yr
mgrs2 = ar +" "+(xr+feldgr[0]*1000) +" " +yr
mgrs3 = ar +" "+(xr+300) +" " +(yr)



var lin = L.polyline([mgrstolat(mgrs),mgrstolat(mgrs2)],{color:"black",weight:0.5})
lin.addTo(layer_MGRS)
marker=L.marker(mgrstolat(mgrs3),{icon: mgrs_lbl,})
//marker.bindPopup("Vert: "+yr /1000)
//marker.on('mouseover',function(e){this.openPopup()})
marker.addTo(layer_MGRS)
}


for (i=0;i<feldgr[0]+1;i++)
{
xr = x0 + 1000*i
mgrs_lbl = L.divIcon({
html: "<i>" + xr/1000 + "</i>",
 iconSize:0
})
mgrs = ar +" "+xr +" " +yr
mgrs2 = ar +" "+xr +" " +(yr-feldgr[1]*1000)
mgrs3 = ar +" "+xr +" " +(yr-300)
var lin = L.polyline([mgrstolat(mgrs),mgrstolat(mgrs2)],{color:"black",weight:0.5}).addTo(layer_MGRS)
lin.addTo(layer_MGRS)
marker=L.marker(mgrstolat(mgrs3),{icon: mgrs_lbl, iconSize:0})
//marker.bindPopup("Horiz: "+xr /1000)
//marker.on('mouseover',function(e){this.openPopup()})
marker.addTo(layer_MGRS)
}}



if(show_osm == true){
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
      }).addTo(mymap);
}

//alert(test.getBounds()[0])
  mymap.fitBounds(testboundselement.getBounds(),{padding: [0, 0]})

}

perm=false
function disp_map(){
  

info.append('button').text("labels").on("click",function(){perm = !perm;select(dataset[selected_id],dataset)})





  temp_ds = []
  for(i=0;i<dataset.length;i++){
    if (dataset[i].coordinates != undefined && dataset[i].show != false){
      if (dataset[i].layer == undefined){dataset[i].layer = "general"}
      temp_ds.push(dataset[i])
    }
  }

kl= temp_ds.length


  info.append("button").text('Punkteliste').on('click',function(){

    ganzes.selectAll('*').remove()

    ganzes.append('table').attr('id','tab1').style('padding-left',"10px").style('width','100%').style("border-collapse", "collapse")
    tab = d3.select('#tab1')
    
    tab.append('tr').attr('id',"rowx")
    d3.select("#rowx").append('th').text("Structure:")
    d3.select("#rowx").append('th').text("Title:")
    //d3.select("#rowx").append('th').text("Decknamen: ")
    d3.select("#rowx").append('th').text("Lat Long:" )
    d3.select("#rowx").append('th').text("MGRS:" )
    d3.select("#rowx").append('th').text("Comment:").style('width','30%')
    //d3.select("#rowx").append('th').text("Inhalt:       " ).attr('width','50%')
    
    for (i=0;i<temp_ds.length;i++){
      //.splice(2)
      temp_ds[i].logic = temp_ds[i].logic.splice(2).join(" > ") 
    }

    function sort_by_key(array, key)
    {
     return array.sort(function(a, b)
     {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
     });
    }
    
    temp_ds = sort_by_key(temp_ds, 'logic');

    for(p=0;p<temp_ds.length;p++)  
 { if(typeof temp_ds[p].coordinates[0] == "number")
  {
    if (temp_ds[p].coordinates_mgrs == undefined){temp_ds[p].coordinates_mgrs = lattomgrs(temp_ds[p].coordinates[0],temp_ds[p].coordinates[1])}

    row = tab.append('tr')
    row.append('td').text(temp_ds[p].logic)
    row.append('td').text(temp_ds[p].title)
    row.append('td').text(temp_ds[p].coordinates)
  //   row.append('td').text(temp_ds[p].center_cord)
  //row.append('td').text(temp_ds[p].coordinates[0][0][1] +"," + temp_ds[p].coordinates[0][0][0])
    row.append('td').text(temp_ds[p].coordinates_mgrs)
    row.append('td').text(temp_ds[p].inhalt)
}else  {if (temp_ds[p].track != true){
  if (temp_ds[p].coordinates_mgrs == undefined){temp_ds[p].coordinates_mgrs = lattomgrs(temp_ds[p].coordinates[0][0][1],temp_ds[p].coordinates[0][0][0])}

  row = tab.append('tr')
  row.append('td').text(temp_ds[p].logic)
  row.append('td').text(temp_ds[p].title)
  row.append('td').text(temp_ds[p].coordinates[0][0][1] +"," + temp_ds[p].coordinates[0][0][0])
  row.append('td').text(temp_ds[p].coordinates_mgrs)
  row.append('td').text(temp_ds[p].inhalt)
}}
    }
          
          }
        
        
    	)






layerlist =[]
for (i=0;i<temp_ds.length;i++){

if(layerlist.includes(temp_ds[i].layer) == false){
  layerlist.push(temp_ds[i].layer)}
}

if(mymap != undefined) {
  mymap.remove()
}

main.append('div').attr('id','mapdiv')
  .style('height','100%')
  .style('background-color',"white")
var mymap = L.map('mapdiv').setView(setviewmap,setviewzoom)

mymap.on('zoomend', function() {
  setviewzoom = mymap.getZoom()

});

mymap.on('moveend', function() {
  aa = (mymap.getCenter(),mymap.getCenter())
  setviewmap=[aa.lat,aa.lng]


});
//layer_tool =  L.layerGroup()
    layer_general =  L.layerGroup().addTo(mymap)
    layer_dz =  L.layerGroup().addTo(mymap)
    layer_af =  L.layerGroup().addTo(mymap)
    layer_ta =  L.layerGroup().addTo(mymap)
    layer_other =  L.layerGroup()
      L.control.layers(null, {

  //      "Lables": layer_tool,
"General": layer_general,
"DZ": layer_dz,
"AF":layer_af,
"TA":layer_ta,
"other":layer_other

}).addTo(mymap);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
      }).addTo(mymap);


      var cordbox=  mymap.getBounds().getWest()// - mymap.getBounds().getWest()
      //height : mymap.getBounds().getNorth() - mymap.getBounds().getSouth(),
      //left: (mymap.getBounds().getEast )
      geo = L.geoJSON( {
        "type": "Feature",
                "geometry": {
            "type": "Polygon",
            "coordinates":dataset[selected_id].coordinates}},{style:{color:"red",fillColor:"black",fill:false}});
     
     /*
      for(g=0;g<dataset[selected_id].coordinates[0].length;g++){
        cords.push([dataset[selected_id].coordinates[0][g][1],dataset[selected_id].coordinates[0][g][0]])
        
      }*/

//.getCenter().
      mymap.fitBounds(geo.getBounds().pad(-0.05))

for (i=0;i<temp_ds.length;i++){

laytemp = layer_general
if(temp_ds[i].layer == "DZ"){laytemp = layer_dz}
if(temp_ds[i].layer == "AF"){laytemp = layer_af}
if(temp_ds[i].layer == "TA"){laytemp = layer_ta}
if(temp_ds[i].layer == "other"){laytemp = layer_other}

  if (typeof temp_ds[i].coordinates[0] == "number"){

    let raz = temp_ds[i].id
    
   


if (temp_ds[i].icon != undefined)
{  
  icsi =[20,20]
  base = L.icon({
              iconUrl: temp_ds[i].icon,
              iconSize:     icsi, // size of the icon
              });

  var x= L.marker(temp_ds[i].coordinates, {color: 'red',fill:false,icon:base})
  .bindTooltip(temp_ds[i].title, 
    
    
  {
   // offset:[50,0],
      permanent: perm, 
      opacity: 0.7,
      direction: 'right',
     // direction: 'bottom'

  }).addTo(laytemp);}else{


    var x= L.marker(temp_ds[i].coordinates, {color: 'red',fill:false})
  .bindTooltip(temp_ds[i].title, 
    
    
  {
   // offset:[50,0],
      permanent: perm, 
      opacity: 0.7,
      direction: 'right',
     // direction: 'bottom'

  }).addTo(laytemp);
  }

  //var line = L.polyline([temp_ds[i].coordinates,[30,30]], {color: 'black',fill:false}).addTo(laytemp);
//  x.click(alert("dsfdsf"))
x.on('click',function(){select(dataset[raz],dataset)})

}else{
  col = "red"
  temp2 = "Polygon"
  dash = ""
  if (temp_ds[i].gestrichelt == true){dash =  "5,5" }

  if (temp_ds[i].track == true){temp2 =  "LineString",col ="green" }

  geo = L.geoJSON( {
    "type": "Feature",
            "geometry": {
        "type": temp2,
        "coordinates":temp_ds[i].coordinates}}, {style:{color:col,fillColor:"red",fillOpacity:0.0,dashArray:dash}}).addTo(laytemp)
        


        if(temp_ds[i].icon != undefined){
        temp_ds[i].center_cord = geo.getBounds().getCenter();

         base = L.icon({
    iconUrl:temp_ds[i].icon ,// "./icons/plane.png",
    iconSize:     [20,20], // size of the icon
    });

        var x= L.marker(temp_ds[i].center_cord, {color: 'red',fill:false,icon:base}).bindTooltip(temp_ds[i].title, 
    
       //   var x= L.marker([temp_ds[i].coordinates[0][0][1],temp_ds[i].coordinates[0][0][0]], {color: 'red',fill:false}).bindTooltip(temp_ds[i].title, 
        
              {
               // offset:[0,-50],
                  permanent: perm, 
                direction: 'right',
                opacity: 0.7,
              }).addTo(laytemp);;
         }
cords = []

//for(g=0;g<temp_ds[i].coordinates[0].length;g++){
  //cords.push([temp_ds[i].coordinates[0][g][1],temp_ds[i].coordinates[0][g][0]])
  
//}
let raz = temp_ds[i].id
geo.on('click',function(){select(dataset[raz],dataset)})

//  var polygon = L.polygon(cords, {color: 'red',fill:false}).bindTooltip(temp_ds[i].title).addTo(laytemp);
//polygon.on('click',function(){alert(raz); select(dataset[raz],dataset)})
//  var line = L.polyline([cords[0],[cordbox,cordbox]], {color: 'red',fill:false}).addTo(laytemp);

}


}


L.circle([29.82536 ,    35.21452], 250).addTo(layer_other);
L.circle([29.79573   ,  35.21899], 250).addTo(layer_other);
L.circle([29.79630 ,    35.23128], 250).addTo(layer_other);

L.circle([29.80518 ,    35.21797], 12964, {fillColor: 'yellow',strokeColor:"black",fillOpacity:0.1,fill:false}).addTo(layer_other);
//L.circle([29.80518 ,    35.21797], 3000, {fillColor: 'yellow',strokeColor:"black",fillOpacity:0.1,fill:false}).addTo(mymap);
//L.circle([29.959470728749743 ,    35.31], 2000, {fillColor: 'yellow',strokeColor:"black",fillOpacity:0.1,fill:false}).addTo(mymap);


function onMapClick(e) {
  alert("You clicked the map at " + e.latlng);

}

mymap.on('dblclick', onMapClick);
}
function mgrstolat(a) 
{
var b = a.trim();
b = b.match(/\S+/g);
if (b == null || b.length != 4) return [false,null,null];
var c = (b[0].length < 3) ? b[0][0] : b[0].slice(0,2);
var d = (b[0].length < 3) ? b[0][1] : b[0][2];
var e = (c*6-183)*Math.PI / 180;
var f = ["ABCDEFGH","JKLMNPQR","STUVWXYZ"][(c-1) % 3].indexOf(b[1][0]) + 1;
var g = "CDEFGHJKLMNPQRSTUVWXX".indexOf(d);
var h = ["ABCDEFGHJKLMNPQRSTUV","FGHJKLMNPQRSTUVABCDE"][(c-1) % 2].indexOf(b[1][1]);
var i = [1.1,2.0,2.8,3.7,4.6,5.5,6.4,7.3,8.2,9.1,0,0.8,1.7,2.6,3.5,4.4,5.3,6.2,7.0,7.9];
var j = [0,2,2,2,4,4,6,6,8,8,0,0,0,2,2,4,4,6,6,6];
var k = i[g];
var l = Number(j[g]) + h / 10;
if (l < k) l += 2;
var m = f*100000.0 + Number(b[2]);
var n = l*1000000 + Number(b[3]);
m -= 500000.0;
if (d < 'N') n -= 10000000.0;
m /= 0.9996; n /= 0.9996;
var o = n / 6367449.14570093;
var p = o + (0.0025188266133249035*Math.sin(2.0*o)) + (0.0000037009491206268*Math.sin(4.0*o)) + (0.0000000074477705265*Math.sin(6.0*o)) + (0.0000000000170359940*Math.sin(8.0*o));
var q = Math.tan(p);
var r = q*q;
var s = r*r;
var t = Math.cos(p);
var u = 0.006739496819936062*Math.pow(t,2);
var v = 40680631590769 / (6356752.314*Math.sqrt(1 + u));
var w = v;
var x = 1.0 / (w*t); w *= v;
var y = q / (2.0*w); w *= v;
var z = 1.0 / (6.0*w*t); w *= v;
var aa = q / (24.0*w); w *= v;
var ab = 1.0 / (120.0*w*t); w *= v;
var ac = q / (720.0*w); w *= v;
var ad = 1.0 / (5040.0*w*t); w *= v;
var ae = q / (40320.0*w);
var af = -1.0-u;
var ag = -1.0-2*r-u;
var ah = 5.0 + 3.0*r + 6.0*u-6.0*r*u-3.0*(u*u)-9.0*r*(u*u);
var ai = 5.0 + 28.0*r + 24.0*s + 6.0*u + 8.0*r*u;
var aj = -61.0-90.0*r-45.0*s-107.0*u + 162.0*r*u;
var ak = -61.0-662.0*r-1320.0*s-720.0*(s*r);
var al = 1385.0 + 3633.0*r + 4095.0*s + 1575*(s*r);
var lat = p + y*af*(m*m) + aa*ah*Math.pow(m,4) + ac*aj*Math.pow(m,6) + ae*al*Math.pow(m,8);
var lng = e + x*m + z*ag*Math.pow(m,3) + ab*ai*Math.pow(m,5) + ad*ak*Math.pow(m,7);
lat = lat*180 / Math.PI;
lng = lng*180 / Math.PI;
//return [true,lat,lng];
return [lat,lng];
}



function lattomgrs (Lat, Long)
{ 
if (Lat < -80) return 'Too far South' ; if (Lat > 84) return 'Too far North' ;
var c = 1 + Math.floor ((Long+180)/6);
var e = c*6 - 183 ;
var k = Lat*Math.PI/180;
var l = Long*Math.PI/180;
var m = e*Math.PI/180;
var n = Math.cos (k);
var o = 0.006739496819936062*Math.pow (n,2);
var p = 40680631590769/(6356752.314*Math.sqrt(1 + o));
var q = Math.tan (k);
var r = q*q;
var s = (r*r*r) - Math.pow (q,6);
var t = l - m;
var u = 1.0 - r + o;
var v = 5.0 - r + 9*o + 4.0*(o*o);
var w = 5.0 - 18.0*r + (r*r) + 14.0*o - 58.0*r*o;
var x = 61.0 - 58.0*r + (r*r) + 270.0*o - 330.0*r*o;
var y = 61.0 - 479.0*r + 179.0*(r*r) - (r*r*r);
var z = 1385.0 - 3111.0*r + 543.0*(r*r) - (r*r*r);
var aa = p*n*t + (p/6.0*Math.pow (n,3)*u*Math.pow (t,3)) + (p/120.0*Math.pow (n,5)*w*Math.pow (t,5)) + (p/5040.0*Math.pow (n,7)*y*Math.pow (t,7));
var ab = 6367449.14570093*(k - (0.00251882794504*Math.sin (2*k)) + (0.00000264354112*Math.sin (4*k)) - (0.00000000345262*Math.sin (6*k)) + (0.000000000004892*Math.sin (8*k))) + (q/2.0*p*Math.pow (n,2)*Math.pow (t,2)) + (q/24.0*p*Math.pow (n,4)*v*Math.pow (t,4)) + (q/720.0*p*Math.pow (n,6)*x*Math.pow (t,6)) + (q/40320.0*p*Math.pow (n,8)*z*Math.pow (t,8));
aa = aa*0.9996 + 500000.0;
ab = ab*0.9996; if (ab < 0.0) ab += 10000000.0;
var ad = 'CDEFGHJKLMNPQRSTUVWXX'.charAt (Math.floor (Lat/8 + 10));
var ae = Math.floor (aa/100000);
var af = ['ABCDEFGH','JKLMNPQR','STUVWXYZ'][(c-1)%3].charAt (ae-1);
var ag = Math.floor (ab/100000)%20;
var ah = ['ABCDEFGHJKLMNPQRSTUV','FGHJKLMNPQRSTUVABCDE'][(c-1)%2].charAt (ag);
function pad (val) {if (val < 10) {val = '0000' + val} else if (val < 100) {val = '000' + val} else if (val < 1000) {val = '00' + val} else if (val < 10000) {val = '0' + val};return val};
aa = Math.floor (aa%100000); aa = pad (aa);
ab = Math.floor (ab%100000); ab = pad (ab);
return c + ad + ' ' + af + ah + ' ' + aa + ' ' + ab;
};



function disp_minimap(elm, ds){
    
    feld = main
        .append('svg')
        .attr('height',"100%")
        .attr('width',"100%")
        .style('background-color',"lightgrey")

    yh=fenster.hoehe*(1-layout.v1)
    xw=fenster.breite*(1-layout.h2)

    let grids = elm.coordinates.slice()

    minx = 9999999
    miny = 9999999
    maxx = 0
    maxy = 0

    for (i=0;i<grids[0].length;i++){
        minx = Math.min(minx,grids[0][i][0])
        miny = Math.min(miny,grids[0][i][1])
        maxx = Math.max(maxx,grids[0][i][0])
        maxy = Math.max(maxy,grids[0][i][1])
    }

    // hier wird das verhältniss von kartenausschnitt und fenster gemessen um zu entscheiden ob nach  oder x gestretched wird
    if((maxx-minx)/(maxy-miny) > (xw/yh)){
    stretch =(xw/2)/(maxx-minx)
    }else{stretch =(yh)/(maxy-miny)}

   

function convert_area_minimap(ioioi){


for (i=0;i<ioioi[0].length;i++){
  ioioi[0][i][1] = (maxy- ioioi[0][i][1]) 

   ioioi[0][i][0] -= minx

  

    ioioi[0][i][0]=ioioi[0][i][0]* stretch
    ioioi[0][i][1]=ioioi[0][i][1]* stretch  


    ioioi[0][i][1] += (yh-((maxy-miny)* stretch))/2
   ioioi[0][i][0] += (xw -(maxx-minx)* stretch) /2
}


return ioioi
 }   

 grids = convert_area_minimap(grids)

function convert_minimap(inarr,tog){
   if (tog ==true) {let a = inarr[0]
let b= inarr[1]
inarr[0]=b
inarr[1]=a}
    inarr[1] = (maxy- inarr[1]) 
    inarr[0] -= minx
   
    inarr[0]=inarr[0]* stretch
    inarr[1]=inarr[1]* stretch  
    inarr[1] += (yh-((maxy-miny)* stretch))/2
    inarr[0] += (xw -(maxx-minx)* stretch) /2

    return inarr
}

feld.append('polygon').attr('points',[grids[0]]).style('fill','lightgreen').style('stroke','black').style('stroke-width','5px')

/*
cor= convert_minimap([35.54566531753454,32.393992011030576])//[31.909739262917483,35.91603730035112])//[35.54566531753454,32.393992011030576])

feld.append('circle').attr('cx',cor[0]).attr('cy',cor[1]).style('fill','red').attr('r',3)
cor= convert_minimap([29.552351948139485,35.00846587171193],true)
feld.append('circle').attr('cx',cor[0]).attr('cy',cor[1]).style('fill','green').attr('r',13)
*/




///let temp_ds = show_decendents(elm,ds).slice()
let temp_ds = dataset

dot_ds =[]
//alert(temp_ds.length)


ymedian=[]
for(i=0;i<temp_ds.length;i++){
   // alert("dsfd")
    if(temp_ds[i].coordinates != undefined && typeof temp_ds[i].coordinates[0] == "number" &&
    temp_ds[i].coordinates[1] > minx &&temp_ds[i].coordinates[1]<maxx&&temp_ds[i].coordinates[0]>miny&&temp_ds[i].coordinates[0]<maxy   )
{
       dot_ds.push(temp_ds[i])
    ymedian.push(temp_ds[i].coordinates[1])
}}

ymedian.sort()
ymedian = ymedian[Math.floor(ymedian.length/2)]

xdotmin =99999
xdotmax=000000
xdotmitte =0
ii =0
for(i=0;i<dot_ds.length;i++){

    xdotmin = Math.min(xdotmin,dot_ds[i].coordinates[1])
  //  xdotmax = Math.max(xdotmax,dot_ds[i].coordinates[1])
  xdotmitte += dot_ds[i].coordinates[1]
  ii++
}

xdotmitte = ((xdotmitte/ii))//((xdotmax-xdotmin)/2)+xdotmin

//alert(xdotmitte)

/*
for(i=0;i<dot_ds.length;i++){

    col='blue'
if (dot_ds[i].coordinates[1]  > xdotmitte){col ="red"}

let fufu =dot_ds[i].coordinates.slice()
    cor = convert_minimap(fufu,true)
   
    
feld.append('circle').attr('cx',cor[0]).attr('cy',cor[1]).style('fill',col).attr('r',5)
feld.append('text').attr('x',cor[0]).attr('y',cor[1]).text(parseInt(dot_ds[i].coordinates[1] )+ " " + i)//.style('fill',col).attr('r',5)


}

*/



leftlist =[]
rightlist =[]
farbnr =0
for(i=0;i<dot_ds.length;i++){

    if (dot_ds[i].coordinates[1] <ymedian){
 
        leftlist.push(dot_ds[i])
        
    } else{
  
        rightlist.push(dot_ds[i])
    }
}

rightlist.sort((a, b) => b.coordinates[0]- a.coordinates[0]);
leftlist.sort((a, b) => b.coordinates[0]- a.coordinates[0]);

for (i=0;i<leftlist.length;i++){

    x=100
    y=20+(i*1.2*symbol_y)
        draw_symbol(x,y,leftlist[i],feld)
        let fufu =leftlist[i].coordinates.slice()
        cor = convert_minimap(fufu,true)
       
       feld.append('line').attr('x1',x+symbol_x).attr('x2',cor[0]).attr('y1',y+symbol_y/2).attr('y2',cor[1]).style('stroke',farbschema2[farbnr])
    
       
        
    feld.append('circle').attr('cx',cor[0]).attr('cy',cor[1]).style('fill',farbschema2[farbnr]).attr('r',3).style('stroke','black')
 
    farbnr++
    if (farbnr>farbschema2.length-1){farbnr=0}

}

for (i=0;i<rightlist.length;i++){
x=xw - 2*symbol_x 
y=20+(i*1.2*symbol_y)
    draw_symbol(x,y,rightlist[i],feld)

    let fufu =rightlist[i].coordinates.slice()
    cor = convert_minimap(fufu,true)
   
   feld.append('line').attr('x1',x).attr('x2',cor[0]).attr('y1',y+symbol_y/2).attr('y2',cor[1]).style('stroke',farbschema2[farbnr])

   
    
feld.append('circle').attr('cx',cor[0]).attr('cy',cor[1]).style('fill',farbschema2[farbnr]).attr('r',3).style('stroke','black')
 
farbnr++
if (farbnr>farbschema2.length-1){farbnr=0}
   }

}




kartenmat = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "Name": "Zarqa Airport",
          "marker-color": "#0400ff",
          "marker-size": "medium",
          "marker-symbol": "airfield"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            36.14393117078626,
            32.02564519974954
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "Name": "King Abdullah II Air Base",
          "marker-color": "#0400ff",
          "marker-size": "medium",
          "marker-symbol": "airfield"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            36.224777698516846,
            32.00454595752156
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "Name": "Muwaffaq Salti Air Base",
          "marker-color": "#0400ff",
          "marker-size": "medium",
          "marker-symbol": "airfield"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            36.792354583740234,
            31.82346067146911
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "Name": "Queen Alia Int Airport",
          "marker-color": "yellow",
          "marker-size": "medium",
          "marker-symbol": "airfield"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            35.99601745605469,
            31.724662910710993
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "Name": "Amman Airport",
          "marker-color": "yellow",
          "marker-size": "medium",
          "marker-symbol": "airfield"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            35.99099636077881,
            31.972660610498902
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "Name": "King Husein Int Airport",
          "marker-color": "yellow",
          "marker-size": "medium",
          "marker-symbol": "airfield"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            35.01874923706055,
            29.610923905318607
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "Name": "King Faisal Airbase",
          "marker-color": "#0400ff",
          "marker-size": "medium",
          "marker-symbol": "airfield"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            36.14381790161133,
            30.335398357396045
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          
          "marker-color": "green",
          "marker-size": "medium",
          "marker-symbol": "triangle-stroked"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            35.959421396255486,
            32.02675177291466
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "Name": "KASOTC - Airbus",
          "marker-color": "#04ff00",
          "marker-size": "medium",
          "marker-symbol": "circle-stroked"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            35.975847244262695,
            32.03354616823574
          ]
        }
      }
    ]
  }