function disp_flowchart (elm,ds)
      {
    main.append('input').attr('type','button').attr('value',"Fortschritt").on('click',function(){show_progress= !show_progress; select(elm,ds)})
    main.append('input').attr('type','button').attr('value',"Swimlanes").on('click',function(){show_swimlanes= !show_swimlanes; select(elm,ds)})
    symbol_counter = 0


    

    elm_ds=[]
    grid = 150
  //  fontsize = grid/10
    symbol_x = grid/2
    symbol_y = symbol_x * (2/3)
    symbol_dia = Math.sqrt((symbol_x*symbol_x)/4)
    fc_ds = show_children(elm, ds)
    
    swimlane_ds =[]
 
    for (j=0;j<fc_ds.length;j++) {
        if (fc_ds[j].swimlane==undefined){fc_ds[j].swimlane="haupt"}
        if (swimlane_ds.includes(fc_ds[j].swimlane)==false){
     
            swimlane_ds.push(fc_ds[j].swimlane)}
        
    }

    for (i=0;i<swimlane_ds.length;i++){
        let raz= i
        
        main.append('input').attr('type','button').attr('value',swimlane_ds[i])
        .on('click',function(){show_swimlanes_ds[raz]= !show_swimlanes_ds[raz]; select(elm,ds)})
    }


    svg_size ={height:50,width:fenster.breite*(1-layout.h2)}
    main.append("svg").attr('id','flowsvg')
    .attr('width',svg_size.width)
    .attr('height',svg_size.height)
    svg = main.select('#flowsvg')

    // hier wird die legende der swimlanes eingezeichnet
    if (show_swimlanes == true)
 {   for(k=0;k<swimlane_ds.length;k++){
        svg.append('text')
        .attr('font-size', 15)//,zoom-1)
        .attr('text-anchor', 'middle')
        .attr('x', 50)
        .attr('y', (k+1)*grid)
             
        .text(swimlane_ds[k])
        .attr("transform","rotate (-90 "+ 50 + " " + (k+1)*grid + ")")

        svg.append('line')
        .attr('stroke','grey')
        .attr('stroke-width', liniendicke)
        .attr('x1', 30)
        .attr('x2', svg_size.width -50)
        .attr('y1', (k+0.5)*grid)
        .attr('y2', (k+0.5)*grid) 
        .attr('stroke-dasharray','5,5')
    }}

    for(k=0;k<swimlane_ds.length;k++){
      // alert(show_swimlanes_ds[k] +" "+ k)
       
        v=0
    for (j=0;j<fc_ds.length;j++) {
           
            if(fc_ds[j].swimlane==swimlane_ds[k]){
                v++
                fc_ds[j].swimlaneno=k
                fc_ds[j].pos = {x:grid*(v),y: (k+1)*grid}
          //      if(fc_ds[j].fctype =="ende"){fc_ds[j].pos = {x:svg_size.width -50,y: 50 + k*100}}
          if (fc_ds[j].posof != undefined){fc_ds[j].pos.x += fc_ds[j].posof.x*grid;fc_ds[j].pos.y += fc_ds[j].posof.y*grid}
        }
        
       
        }
    }


// hier wird de elm ein ort zugewiesen anhand der connectTo, also jeder ist recht von der der zu ihm konnected 
/*
    for (j=0;j<fc_ds.length;j++) {
        for (h=0;h<fc_ds.length;h++) {
            if (fc_ds[j].connect_to == fc_ds[h].logic.slice(-1)&&
            fc_ds[j].swimlaneno == fc_ds[h].swimlaneno
            ){
                fc_ds[h].pos.x = fc_ds[j].pos.x +grid
            }
    }
    
    if (fc_ds[j].posof != undefined){fc_ds[j].pos.x += fc_ds[j].posof.x*grid;fc_ds[j].pos.y += fc_ds[j].posof.y*grid}
}*/

    for (j=0;j<fc_ds.length;j++) {
        
        for (h=0;h<fc_ds.length;h++) {
  
            if (fc_ds[j].connect_to != undefined){
                //|| fc_ds[j].connect_to.includes(fc_ds[h].logic.slice(-1))){
             //   alert('true')
                for (lol=0;lol<fc_ds[j].connect_to.length;lol++){
             if(fc_ds[j].connect_to[lol] == fc_ds[h].logic.slice(-1))
                    {
                        if (show_swimlanes_ds[fc_ds[j].swimlaneno]==true&&show_swimlanes_ds[fc_ds[h].swimlaneno]==true){           
                draw_fc_con(fc_ds[j],fc_ds[h])}}}
            }}}

    /*
    for (j=0;j<fc_ds.length;j++) {
        let raz = fc_ds[j].id
        if (kinder[j].show == undefined){kinder[j].show = true}
        info.append('input').attr('type','button').attr('value',kinder[j].title).on('click',function(){

            ds[raz].show = !ds[raz].show
            select(elm,ds)
        })

*/
function draw_fc_con(elm,elm2){
if(elm2.gestrichelt===true||elm.gestrichelt===true){
    f = 5 // (3*zoom)/15
    dash_modus = f+','+f
}    else{dash_modus=''}

          svg
          .append("line")
          .attr('stroke','black')
          .attr('stroke-width', liniendicke)
          .attr('x1', elm.pos.x)
          .attr('x2',elm2.pos.x)
          .attr('y1', elm.pos.y)
          .attr('y2', elm2.pos.y)
          .attr('stroke-dasharray', dash_modus)

        dx = elm2.pos.x - elm.pos.x
         dy = elm.pos.y - elm2.pos.y
      
       
         
       dir = Math.atan(dy/dx)
        dir = parseInt((dir*360)/(2*Math.PI))


     sizedr = 5
        //x = (elm.pos.x + elm2.pos.x*3)/4
        //y = (elm.pos.y + elm2.pos.y*3)/4
        x  = (elm.pos.x + elm2.pos.x*2)/3 
        y = (elm.pos.y + elm2.pos.y*2)/3
        if(dx<0&&dy<0){dir += 180}
       // svg.append('text').attr('x',x).attr('y',y).text(dir + "°")

        svg.append('polygon')
            .attr('points', x + "," + y + " " + (x - sizedr*2) + "," + (y - sizedr) + " " + (x - sizedr*2) + "," + (y + sizedr))
            .style('fill', "black")
            .attr('transform',"rotate("+ -dir+" "+x+" "+y+")")
    }
for (i=0;i<fc_ds.length;i++){
if (show_swimlanes_ds[fc_ds[i].swimlaneno]==true){   
draw_fc_elm(fc_ds[i])}}


    function draw_fc_elm (elm){
        if(elm.gestrichelt===true){
            f = 5 // (3*zoom)/15
            dash_modus = f+','+f
        }    else{dash_modus=''}
        symbol_counter ++
        symcol = "white"
        if (elm.color != undefined){symcol =elm.color}
        if (elm.type == "jumpto"||elm.fctype == "ende"||elm.fctype == "start"){symcol = "lightsteelblue"}
        if (elm.fctype == undefined){elm.fctype = "event"}
         svg.append('g')
            .attr('id', 'n'+symbol_counter)

        svg_size.width = Math.max(svg_size.width,elm.pos.x+100)     
        svg_size.height = Math.max(svg_size.height,elm.pos.y+50)     
        svg
        .attr('width',svg_size.width)
        .attr('height',svg_size.height)
        if (elm.fctype == "event"||elm.fctype == "ende"||elm.fctype == "start") {
            svg.select('#n' + symbol_counter).append('rect')
                .attr("width", symbol_x + 'px')
                .attr("height", symbol_y + 'px')
                .attr('stroke-width', liniendicke)
                .attr('stroke-dasharray', dash_modus)
                // .attr('stroke-dasharray','5,5')
                .attr('stroke', 'black')
                .attr('fill', symcol)//symfill)
                .attr('x', elm.pos.x - symbol_x / 2)
                .attr('y', elm.pos.y - symbol_y / 2)
                .style('cursor', 'pointer')
                .on('click', function () {
                    select(dataset[elm.id], dataset)
                })
                .append('title')
.text('Inhalt: '+ elm.inhalt )
        }
         if (elm.fctype == "decision") {
            svg.select('#n' + symbol_counter)
                .append('rect')
                .attr("width", symbol_dia + 'px')
                .attr("height", symbol_dia + 'px')
                .attr('stroke-width', liniendicke)
                // .attr('stroke-dasharray', dash_modus)
                .attr('stroke-dasharray', dash_modus)
                .attr('stroke', 'black')
                .attr('fill', "yellow")//symfill)
                .attr('x', elm.pos.x - symbol_dia / 2)
                .attr('y', elm.pos.y - symbol_dia / 2)
                .attr('transform','rotate(-45 '+elm.pos.x+','+elm.pos.y+') ')
                .style('cursor', 'pointer')
                .on('click', function () {
                    select(dataset[elm.id], dataset)
                })
                .append('title')
.text('Inhalt: '+ elm.inhalt )
        }

          // hier wird die textgröße abhängig von der texlange berechnet    
         
in_text_gr =5
in_text = String(elm.logic.slice(-1))

if(elm.type =="person"){  in_text_gr -= 3}

 in_text8 = in_text.split(" ")

     in_text1 = in_text8[0]
     //  in_text2 = in_text8[1]
       in_text2 = ""
       k=0
       for (o=1;o<in_text8.length;o++){
           if (in_text1.length+in_text8[o].length<11){in_text1 = in_text1 + " " + in_text8[o];k=o}
       else
       { //in_text1 = in_text1 + ".."
           break
       }}
       in_text2 = in_text8[k+1]
        for (o=k+2;o<in_text8.length;o++){
           if (in_text2.length+in_text8[o].length<11){in_text2 = in_text2 + " " + in_text8[o]}
       else
        { in_text2 = in_text2 + ".."
           break
       }
        }

   if(in_text2 == ""||in_text2 == undefined)//in_text.length < 11 || in_text8.length == 1)
    {

    in_text_gr = Math.max((20 - in_text1.length*1),5)
        svg.select('#n' + symbol_counter)
            .append('text')
            .attr("width", symbol_x + 'px')
            .attr("height", symbol_y + 'px')
          //  .attr('class', 'symboltext')
          //  .style('word-wrap', 'break-word')

            .attr('font-size', in_text_gr)//,zoom-1)
            .attr('text-anchor', 'middle')
            // .attr('alignment-baseline','center')
            .attr('x', elm.pos.x )//+ 0.5 * symbol_x)
            .attr('y', elm.pos.y)// + (symbol_y + in_text_gr / 2) / 2)
            .text(elm.logic.slice(-1));

    }
   else
   {
       ml = Math.max(in_text1.length,in_text2.length)
    in_text_gr = Math.max((25 - ml*1),8)


      // in_text1 = // in_text.slice(0,5)
     //  in_text2 = in_text.slice(6,99)
       svg.select('#n' + symbol_counter)
            .append('text')
            .attr('font-size', in_text_gr)//,zoom-1)
            .attr('text-anchor', 'middle')
            .attr('x', elm.pos.x )//)+ 0.5 * symbol_x)
            .attr('y', elm.pos.y + (symbol_y + in_text_gr / 2) / 3)
            .text(in_text1);
       svg.select('#n' + symbol_counter)
            .append('text')
            .attr('font-size', in_text_gr)//,zoom-1)
            .attr('text-anchor', 'middle')
            .attr('x', elm.pos.x )//+ 0.5 * symbol_x)
            .attr('y', elm.pos.y)// + (symbol_y + in_text_gr / 2)* 2/ 3)
            .text(in_text2);


   }



        rad =5
        
        if(elm.progress != undefined&&show_progress==true){
            coltemp="red"
            if (elm.progress > 0.3){coltemp="yellow"}
            if (elm.progress > 0.6){coltemp="orange"}
            if (elm.progress > 0.8){coltemp="green"}
            svg.select('#n' + symbol_counter)
            .append('circle')
            .attr('cx',elm.pos.x+symbol_x/2-rad)
            .attr('cy',elm.pos.y-symbol_y/2+rad)
            .attr('r',rad)
            .attr('fill', coltemp)//symfill)
            .attr('stroke-width', liniendicke)
            .attr('stroke', 'black')
        }

    }

 main.append('hr')
}