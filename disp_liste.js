function disp_liste (elm,ds,wo) {
   
    svg_maxy = 500
    wo.select('svg').remove
    svg_size = {height: fenster.hoehe * (1 - layout.v1), width: fenster.breite * ( layout.h2)}
    wo.append("svg").attr('id', 'listesvg').attr('width', svg_size.width)
        .attr('height', svg_size.height-100)
    svg = wo.select('#listesvg')

    // der zoom ist nur bei liste und sollte ggf automatisiert werden oder entfernt
    zoom=1


    if (elm.gestrichelt === true) {
        f = (5 * zoom)
        dash_modus = f + ',' + f
    } else {
        dash_modus = ''
    }

    // linke obere ecke der liste, ähnlich margin, von dieser koordinate baut es sich auf
    pos = [10, 10]

    // hier wird das überschrift feld erzeug, g mit einem text und einem rect darin
    col = "white"
    if(elm.color != undefined){col=elm.color}
    lineverb=0
    bold= "none"
    if (elm.id == selected_id){lineverb=1,bold ="bold"}

    svg.append('g')
    .attr('id', 'obg')
    .on('click', function () {select(elm, ds,main)    })
    .append('rect').attr("width", 150).attr("height", 20 + 'px')
    .attr('stroke-width', liniendicke+lineverb)
    .attr('stroke', 'black')
    .attr('x', pos[0])
    .attr('y', pos[1])
    .attr('rx', 5)
    .attr('ry', 5)
    .attr('fill', col)
    .attr('stroke-dasharray', dash_modus)

    // schreibt den titel in das recct
    svg
        .select('#obg')
        .append('text')
        .style('font-weight',bold)
        .text(elm.logic.slice(-1))
        .attr('x', pos[0] + 5)
        .attr('y', pos[1] + 15)
.style('cursor', 'pointer')
    textbreite = svg
        .select('#obg')
        .select("text").node().getComputedTextLength()
    svg
        .select('#obg')
        .select('rect')
        .attr('width', textbreite + 10)

    versatz = (textbreite / 2) + pos[0] + 5

    // ende der erstellung der überschrift

    kinder = show_children(elm, ds)
    steps = kinder.length

    // endhöhe verlängert das svg so lange wie die lite ist, da braucht man bei layout ansatz nicht
    // svg_endhöhe = 60 + (30 * kinder.length)



    pos=[15+versatz,10]
    for (j = 0; j < steps; j++) {
        if (kinder[j].gestrichelt === true) {
            f = 5*zoom
            dash_modus = f + ',' + f
        } else {
            dash_modus = ''
        }

        let uga = kinder[j]
      //  let fu = pos[1] // trick variabele, weil hier pos von oben absolut verwendetet werde sollte, aber im folgenden pos, relativ für jedes kindr
        pos[1] += 30

        col = "white"
       if(kinder[j].color != undefined){col=kinder[j].color}

       lineverb=0
        bold = "none"

        if (kinder[j].id == selected_id) {
            lineverb = 1, bold = "bold";
            svg
                .append('line')
                .attr('x1', versatz)
                .attr('x2', versatz)
                .attr('y1', 30)
                .attr('y2', 51.5 + (j * 30))
                .attr('stroke-width', liniendicke + lineverb)
                .attr('stroke', 'black')
        }



        svg
            .append('g')
            .attr('id', 'obg' + j)
            .append('rect')
            .attr('id','pilleback'+j)
            .attr("width", 120)
            .attr("height", 20 + 'px')
            .attr('stroke-width', liniendicke+lineverb)
            .attr('stroke', 'black')
            .attr('x', pos[0])
            .attr('y', pos[1])
            .attr('rx', 5)
            .attr('ry', 5)
            .attr('fill', col)
            .attr('stroke-dasharray', dash_modus)

        if(kinder[j].progress != undefined){
            if (kinder[j].progress.value != undefined) {
                cal = "green"

            if (kinder[j].progress.value < 0.6){cal ='yellow'}
             if (kinder[j].progress.value < 0.29){cal ='red'}

                svg.select('#obg' + j)
                    .append('rect')
                    .attr('id','pilleprog'+j)
                    .attr("width", 20)
                    .attr("height", 19 + 'px')

                    .attr('x', pos[0]+0.5)
                    .attr('y', pos[1]+0.5)
                    .attr('rx', 5)
                    .attr('ry', 5)
                    .attr('fill', cal)

            }
        }
        if(col == "black"){textfarbe ="white"}else{textfarbe="black"}
        svg
            .select('#obg' + j)
            .append('text')
            .text(kinder[j].logic.slice(-1))
            .attr('x', pos[0] + 5)
            .attr('y', pos[1] + 15)
            .style('fill',textfarbe)
            .style('font-weight',bold)
        .style('cursor', 'pointer')
            //.style('stroke',"black")
        textbreite =
        svg
            .select('#obg' + j)
            .select("text").node().getComputedTextLength()

        svg
            .select('#obg' + j)
            .select('#pilleback'+j)
            .attr("width", textbreite + 10)


        if(kinder[j].progress != undefined){
            if (kinder[j].progress.value != undefined) {


                svg
                    .select('#obg' + j)
                    .select('#pilleprog' + j)
                    .attr("width", (textbreite + 10) * kinder[j].progress.value)
            }}
        svg
            .select('#obg')
            .append('line')
            .attr('x1', pos[0])
            .attr('x2', pos[0] - 15)
            .attr('y1', pos[1] + 10)
            .attr('y2', pos[1] + 10)
            .attr('stroke-dasharray', dash_modus)
            .attr('stroke-width', liniendicke+lineverb)
            .attr('stroke', 'black')

        svg.select('#obg' + j)
            .on('click', function () {
               select(uga,ds, wo)
            })
        /*
     svg.append('circle').attr('r',5).attr('cx',pos[0]+100).attr('cy',pos[1]+10).style('stroke','black').style('stroke-weight',1)
        .on('click', function () {
                uga.show = !uga.show
                if(uga.show == false) {uga.origcolor = uga.color; uga.color ="none"}
                if(uga.show == true) {uga.color = uga.origcolor}
                recolor(elm)
              select(elm,ds, wo)
            })
            */

         /*   .on('mouseover', function () {
                element_mouseover(zzz, wo)
            })
            
*/
if (j==steps-1){
    svg
    .append('line')
    .attr('x1', versatz)
    .attr('x2', versatz)
    .attr('y1', 30)
    .attr('y2', pos[1] + 10)
    .attr('stroke-width', liniendicke)
    .attr('stroke', 'black')
}  
if (kinder[j].id == selected_id){
            enkel = show_children(kinder[j],ds)

            if (enkel.length>0)
            {
            svg.append('line')
                    .attr('x1', pos[0] + 10)
                    .attr('x2', pos[0] + 10)
                    .attr('y1', pos[1] + 20)
                    .attr('y2', pos[1] + 10 + (30 * enkel.length))
                    .attr('stroke-width', liniendicke)
                    .attr('stroke', 'grey')
            }

            for (k=0;k<enkel.length;k++) {
                pos[1] +=30
                //console.log(enkel[k])
                let gul = enkel[k]
                col = 'white'
                if (enkel[k].color != undefined){col = enkel[k].color}
                liniendicke_temp = 1
                if(enkel[k].progress != undefined &&enkel[k].progress != 1){
                    if(enkel[k].progress <1){linienfarbe="orange"}
                    if(enkel[k].progress <0.6){linienfarbe="yellow"}
                    if(enkel[k].progress <0.3){linienfarbe="red"}
                    liniendicke_temp = 2
                    
                }
                else{linienfarbe = "grey"}


                svg
                    .append('g')
                    .attr('id', 'obg' + j+"p"+k)
                    .on('click',function () {select(gul, ds,main)    })
                    .append('rect')
                    //  .attr('id','rect'+j)
                    .attr("width", 120)
                    .attr("height", 20 + 'px')
                    .attr('stroke-width', liniendicke_temp)
                    .attr('stroke', linienfarbe)
                    .attr('x', pos[0]+20)
                    .attr('y', pos[1])
                    .attr('rx', 5)
                    .attr('ry', 5)
                    .attr('fill', col)
                    .attr('stroke-dasharray', dash_modus)
 svg
            .select('#obg' + j+"p"+k)
            .append('line')
            .attr('x1', pos[0]+10)
            .attr('x2', pos[0]+20 )
            .attr('y1', pos[1] + 10)
            .attr('y2', pos[1] + 10)
            .attr('stroke-width', liniendicke)
            .attr('stroke', 'grey')
            if(col == "black"){textfarbe ="white"}else{textfarbe="black"}
                svg
            .select('#obg' + j+"p"+k)
            .append('text')
            .text(enkel[k].logic.slice(-1))
            .attr('x', pos[0] + 5+20)
            .attr('y', pos[1] + 15)
            .style('fill',textfarbe)
.style('cursor', 'pointer')
            //.style('stroke',"black")
        textbreite =
        svg
            .select('#obg' + j+"p"+k)
            .select("text").node().getComputedTextLength()

        svg
            .select('#obg' + j+"p"+k)
            .select('rect')
            .attr("width", textbreite + 10)

            svg_maxy = Math.max(svg_maxy,pos[1])
            }
        
        
        
        }

         //    svg.attr('height', svg_endhöhe)
    svg_maxy = Math.max(svg_maxy,pos[1])
    }
  /*
    if (kinder.length > 0) {
        f = kinder.length
        lä = kinder.length*30+20
        if (kinder[f-1].id != elm.id) {lä += enkel.length*30}
        svg
            .append('line')
            .attr('x1', versatz)
            .attr('x2', versatz)
            .attr('y1', 30)
            .attr('y2', lä)
            .attr('stroke-width', liniendicke)
            .attr('stroke', 'red')
    }
*/
 svg.style('height',svg_maxy+50+"px")
 .style('width',svg_size.breite)


}

