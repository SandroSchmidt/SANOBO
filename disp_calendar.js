

function disp_calendar(elm,ds,wo) {
    
    showyear = 2022
ymax=50
    //
    zeige = {days:0}

    info.selectAll('*').remove()
    main.selectAll('*').remove()

    info.append('button').text('auto').attr('id', 'calautobut').on('click', function () {
        if (cal_show_mode == "auto_today") {

            cal_show_mode = "auto";
            info.select('#calautobut').text(cal_show_mode)

            disp_calendar(elm, ds, main)
        } else {
            //   if (cal_show_mode == "auto") {
            cal_show_mode = "auto_today";
            info.select('#calautobut').text(cal_show_mode)
            disp_calendar(elm, ds, main)


            //   }

        }

    })

    info.append('button').text('Q1').on('click', function () {
        cal_show_mode = "Q1";
        disp_calendar(elm, ds, main)
    })
    info.append('button').text('Q2').on('click', function () {
        cal_show_mode = "Q2";
        disp_calendar(elm, ds, main)
    })
    info.append('button').text('Q3').on('click', function () {
        cal_show_mode = "Q3";
        disp_calendar(elm, ds, main)
    })
    info.append('button').text('Q4').on('click', function () {
        cal_show_mode = "Q4";
        disp_calendar(elm, ds, main)
    })

    info.append('button').text('next 14').on('click', function () {
        cal_show_mode = "next14";
        disp_calendar(elm, ds, main)
    })

    
    info.append('button').text('next 28').on('click', function () {
        cal_show_mode = "next28";
        disp_calendar(elm, ds, main)
    })

    info.append('br')
    /*
    info.append('input').attr('type', 'number').attr("value", showyear).on('change', function () {
        showyear = this.value;
        disp_calendar(dataset[selected_id], dataset, main)
    }).style('width', "60px")

    
    info.append('input').attr('type', 'button').attr("value", 'long').on('click', function () {
        caltype = "long";
        disp_calendar(dataset[selected_id], dataset, main)
    })

    */
    info.append('input').attr('type', 'button').attr("value", 'Jahresblatt').on('click', function () {
        caltype = "year";
        disp_calendar(dataset[selected_id], dataset, main)
    })
    
        
    info.append('input').attr('type', 'button').attr("value", 'Zeitstrahl').on('click', function () {
        caltype = "wgs";
        disp_calendar(dataset[selected_id], dataset, main)
    })

    info.append('input').attr('type', 'button').attr("value", 'Tagessicht').on('click', function () {
        caltype = "daybyday";
        disp_calendar(dataset[selected_id], dataset, main)
    })

    info.append('input').attr('type', 'button').attr("value", 'fullscreen').attr('id', 'calbut')
        .on('click', function () {
            /*
            d3.select('#div0').selectAll('*').remove()
            wo = d3.select('#div0')
            svg_size = {width: 2000, height: 1000}
            // wo.attr('background-color','white')
            disp_calendar(dataset[selected_id], dataset, wo)
            */
           
if (fs==true){layout={h1:0.7,h2:0.2,v1:0.08}}
            else{layout={h1:0.7,h2:0.0,v1:0.05}}
            fs = !fs
            //
               
            // divs bekommen die größe übergeben
            d3.select('#div0').style('height',fenster.hoehe+"px")
                              .style('width',fenster.breite+"px")
            d3.select('#div0-nav').style('height',fenster.hoehe*layout.v1+"px")
                                  .style('width',fenster.breite*layout.h1+"px")
            d3.select('#div0-info').style('height',fenster.hoehe*layout.v1+"px")
                                .style('width',fenster.breite*(1-layout.h1)+"px")
            d3.select('#div0-menu').style('height',fenster.hoehe*(1-layout.v1)+"px")
                                .style('width',fenster.breite*(layout.h2)+"px")
            d3.select('#div0-main').style('height',fenster.hoehe*(1-layout.v1)+"px")
                                .style('width',fenster.breite*(1-layout.h2)+"px")

                                select(dataset[selected_id],dataset)
        })

        .on('dblclick', function () {
            layout={h1:0,h2:0.0,v1:0}
        d3.select('#div0-nav').remove()
        d3.select('#div0-info').remove()
        d3.select('#div0-menu').remove()
        d3.select('#div0-main').style('height',fenster.hoehe+"px")
                            .style('width',fenster.breite+"px")
svg_size.width = fenster.hoehe-10
svg_size.height = fenster.breite
svg.style('width',(svg_size.width)+"px")
svg.style('height',svg_size.height+"px")
                            select(dataset[selected_id],dataset)
    })
        

    nachkommen = show_decendents(elm, ds)
    frühestes_date_in_ds = new Date("2100-01-01")
    spätestes_date_in_ds = new Date("1950-01-01")


    cal_ds = []
    cal_ds.push(elm)
    for (i = 0; i < nachkommen.length; i++) {

        if (nachkommen[i].start != undefined && nachkommen[i].end != undefined) {
            if (new Date(nachkommen[i].start).getFullYear() == showyear && nachkommen[i].show == true) {
                cal_ds.push(nachkommen[i])
            }
        }
    }

    // geht cal ds einmal durch um das früheste und späteste zu bestimmen das angezeigt wird
    for (i = 0; i < cal_ds.length; i++) {
        x = new Date(cal_ds[i].start)
        y = new Date(cal_ds[i].end)

        if (x.getTime() < frühestes_date_in_ds.getTime()) {
            frühestes_date_in_ds = x
        }
        if (y.getTime() > spätestes_date_in_ds.getTime()) {
            spätestes_date_in_ds = y
        }

    }

   // caltype = "wgs"


    if (cal_show_mode == "auto_today") {

        frühestes_date_in_ds = heute

     
        

    }

    


    if (cal_show_mode == "Q1") {
        frühestes_date_in_ds = new Date(showyear + "-01-01")
        spätestes_date_in_ds = new Date(showyear + "-03-31")
    }
    if (cal_show_mode == "Q2") {
        frühestes_date_in_ds = new Date(showyear + "-04-01")
        spätestes_date_in_ds = new Date(showyear + "-06-30")
    }
    if (cal_show_mode == "Q3") {
        frühestes_date_in_ds = new Date(showyear + "-07-01")
        spätestes_date_in_ds = new Date(showyear + "-09-30")
    }
    if (cal_show_mode == "Q4") {
        frühestes_date_in_ds = new Date(showyear + "-10-01")
        spätestes_date_in_ds = new Date(showyear + "-12-31")
    }
    if (cal_show_mode == "next14") {
        frühestes_date_in_ds = new Date()
        dow = frühestes_date_in_ds.getDay()-1
        frühestes_date_in_ds.setDate(frühestes_date_in_ds.getDate()-dow)
        
        //
        
        spätestes_date_in_ds.setTime(frühestes_date_in_ds.getTime()+13*24*3600000)
        //spätestes_date_in_ds.setDay(4)

    //    alert(frühestes_date_in_ds)
    }

    if (cal_show_mode == "next28") {
        frühestes_date_in_ds = new Date()
        dow = frühestes_date_in_ds.getDay()-1
        frühestes_date_in_ds.setDate(frühestes_date_in_ds.getDate()-dow)
        
        //
        
        spätestes_date_in_ds.setTime(frühestes_date_in_ds.getTime()+27*24*3600000)
        //spätestes_date_in_ds.setDay(4)

    //    alert(frühestes_date_in_ds)
    }

    /*

zeige = {von:showyear +"-"+zeige.von[1]+"-01",bis:showyear+"-"+zeige.bis[1]+"-20"}
    od = zeige.von.slice(0, 10).split('-')
        ode = zeige.bis.slice(0, 10).split('-')
        zeige.von = [parseInt(od[0]), parseInt(od[1]), parseInt(od[2])]
        zeige.bis = [parseInt(ode[0]), parseInt(ode[1]), parseInt(ode[2])]
*/
    zeige = {
        von: [frühestes_date_in_ds.getFullYear(), frühestes_date_in_ds.getMonth() + 1,
            1],//frühestes_date_in_ds.getDate()] ,
        bis: [spätestes_date_in_ds.getFullYear(), spätestes_date_in_ds.getMonth() + 1,
            1] //spätestes_date_in_ds.getDate()] ,

    }


    svg_size = {height: fenster.hoehe * (1 - layout.v1), width: fenster.breite * (1 - layout.h2)}
    pille_ds = []
    zeige.monate = zeige.bis[1] - zeige.von[1] + 1
    //  nachkommen = show_decendents(elm, ds)
    wo.append('svg')
        .style('width', svg_size.width + 'px')
        .style('height', svg_size.height - 5 + 'px')
    svg = wo.select('svg')

    hinter = svg.append('g').attr('id','hinterg')
    pilleg = svg.append('g').attr('id','pillen')
    linesg =svg.append('g').attr('id','linef')

    calfeld = {x: svg_size.width, y: svg_size.height}
    pos = {x: 0, y: 0}
    dom = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (zeige.von[0] % 4 == 0) {
        dom[1] = 29
    }

    if (caltype == "year") {
        info.append('br')
        info.append('input').attr('type','button').attr("value",'nur Blöcke')
        .on('click',function() {
            
            nurblock = !nurblock
           
            select(elm,ds)
        })

        info.append('input').attr('type','button').attr("value",'Farbe')
        .on('click',function() {
            
            for(i=0;i<ds.length;i++){
                if(ds[i].spezialfarbe != undefined){
                    ds[i].color = ds[i].spezialfarbe
                }
            }
           
            select(elm,ds)
        })

        // xyz
        monfeld = calfeld.y / zeige.monate
        dayfeld = calfeld.x / 31
        eventhohe = Math.min(20, (monfeld / anzevent))

        for (i = 0; i < zeige.monate; i++) {
            for (j = 0; j < dom[i + zeige.von[1] - 1]; j++) {
                fcol = 'lightgrey'
                temp = new Date(zeige.von[0] + '-' + (i + zeige.von[1]) + '-' + (j + 1))

                if (temp.getDay() == 6 || temp.getDay() == 0) {
                    fcol = 'grey';
                }
                //    temp = new Date(zeige.von[0]+'-'+(i+zeige.von[1])+'-'+(j+1))
                if (temp.getFullYear() == heute.getFullYear() && temp.getMonth() == heute.getMonth() && temp.getDate() == heute.getDate()) {
                    fcol = 'red';
                }
                hinter.append('rect').attr('x', (j * dayfeld + pos.x) + 'px')
                    .attr('y', i * monfeld + pos.y + 'px')
                    .attr('width', dayfeld + "px")
                    .attr('height', monfeld + 'px')
                    .style('stroke', 'black')
                    .attr('stroke-width', 1)
                    .style('fill', fcol)

                hinter.append('text')
                    .attr('x', (j * dayfeld + pos.x) + 3 + 'px')
                    .attr('y', i * monfeld + pos.y + 8 + 'px')
                    .style('font-size', '8px')
                    .style('color', fcol)
                    .text((j + 1) + '.' + (i + zeige.von[1]) + '.')

                if (temp.getDay() == 1) {
                    hinter.append('text')
                        .attr('x', (j * dayfeld + pos.x) + 3 + 'px')
                        .attr('y', i * monfeld + monfeld / 2 + pos.y + 8 + 'px')
                        .style('font-size', '10px')
                        .style('font-color', 'grey')
                        .text("KW" + temp.getWeek())
                }

            }
        }

        pos.y += 20
        loop1: for (i = 0; i < cal_ds.length; i++) {
            let kkk = cal_ds[i]
            if (cal_ds[i].color == undefined) {
                cal_ds[i].color = "white"
            }


            if (cal_ds[i].start == undefined ||
                cal_ds[i].end == undefined

            ) {
                continue loop1
            }


            od = cal_ds[i].start.slice(0, 10).split('-')
            ode = cal_ds[i].end.slice(0, 10).split('-')
            od = [parseInt(od[0]), parseInt(od[1]), parseInt(od[2])]
            ode = [parseInt(ode[0]), parseInt(ode[1]), parseInt(ode[2])]
            delta = ode[1] - od[1]

            if (od[0] != showyear) {
                continue loop1
            }

            if (ode[1] == od[1]) {
                eintragsbreite = ode[2] - od[2]
            }
            if (ode[1] > od[1]) {
                eintragsbreite =
                    dom[od[1] - 1] - od[2]
//    dom[od[1]+1] - od[2] +1

            }
            // anfangsstück

            temp5 = (new Date(cal_ds[i].end).getTime()-new Date(cal_ds[i].start).getTime())/(1000*3600*24)
           // alert(temp5)
            if(temp5>1 || nurblock ==true)

         {   pille_ds.push({
                x: ((od[2] - 1) * dayfeld + pos.x),
                y: ((od[1] - zeige.von[1]) * monfeld + pos.y),
                w: dayfeld * (eintragsbreite + 1)
                , h: eventhohe * 0.9, c: ttt = cal_ds[i].color, i: cal_ds[i].id,
                t: cal_ds[i].title, yschub: 0, id: cal_ds[i].id
            })


            // endstück
            if (delta > 0) {
                eintragsbreite = ode[2]//-1

                pille_ds.push({
                    x: (0 * dayfeld + pos.x),
                    y: ((ode[1] - zeige.von[1]) * monfeld + pos.y),
                    w: dayfeld * eintragsbreite
                    , h: eventhohe * 0.9, c: cal_ds[i].color, i: cal_ds[i].id,
                    t: cal_ds[i].title, yschub: 0, id: cal_ds[i].id
                })

            }
            if (delta > 1) {

                for (k = 1; k < delta; k++) {
                    //xxx = parseInt(od[1]) - zeige.von[1]

                    //x-=1

                    eintragsbreite = dom[k + od[1] - 1]

                    pille_ds.push({
                        x: 0 * dayfeld + pos.x,
                        y: (od[1] - zeige.von[1] + k) * monfeld + pos.y,
                        w: dayfeld * eintragsbreite
                        , h: eventhohe * 0.9, c: cal_ds[i].color, i: cal_ds[i].id,
                        t: cal_ds[i].title, yschub: 0, id: cal_ds[i].id
                    })

                }


            }}
        }
        yschubmax = 0
        for (xxx = 0; xxx < 5; xxx++) {
            for (a = 0; a < pille_ds.length; a++) {

                for (b = 0; b < pille_ds.length; b++) {
                    if (a == b) {
                        continue
                    }

                    if (pille_ds[a].yschub == pille_ds[b].yschub && pille_ds[a].y == pille_ds[b].y) {
                        a1 = pille_ds[a].x
                        a2 = pille_ds[a].x + pille_ds[a].w
                        b1 = pille_ds[b].x
                        b2 = pille_ds[b].x + pille_ds[b].w
                        if (a1 <= b1 && a2 > b1 ||
                            a1 < b1 && a2 >= b1 ||
                            a1 <= b2 && a2 > b2 ||
                            a1 < b2 && a2 >= b2
                        ) {
                            //   pille_ds[b].y +=eventhohe //*(pille_ds[b].yschub+1)
                            pille_ds[b].yschub++

                        }
                    }

                }
                yschubmax = Math.max(yschubmax, pille_ds[a].yschub)
            }
        }

        eventhohe = Math.min(20, (monfeld / (yschubmax + 2)))
        for (a = 0; a < pille_ds.length; a++) {
            pille_ds[a].y += eventhohe * pille_ds[a].yschub
        }


        for (op = 0; op < pille_ds.length; op++) {
            if (pille_ds[op].y < 0) {
                continue
            }
            cal_pille(pille_ds[op])
        }
    }

    if (caltype == "long") {
        svg_size.width = 10000
        svg.style('width', svg_size.width + "px")
        //svg.style('height',"30px")
        calfeld = {x: svg_size.width, y: svg_size.height}
        //monfeld = calfeld.y / zeige.monate
        dayfeld = calfeld.x / (31 * zeige.monate)
        eventhohe = monfeld / anzevent


        jj = -1
        for (i = 0; i < zeige.monate; i++) {
            for (j = 0; j < dom[i + zeige.von[1] - 1]; j++) {
                fcol = 'lightgrey'
                temp = new Date(zeige.von[0] + '-' + (i + zeige.von[1]) + '-' + (j + 1))
                jj++
                if (temp.getDay() == 6 || temp.getDay() == 0) {
                    fcol = 'grey';
                }
                //    temp = new Date(zeige.von[0]+'-'+(i+zeige.von[1])+'-'+(j+1))
                if (temp.getFullYear() == heute.getFullYear() && temp.getMonth() == heute.getMonth() && temp.getDate() == heute.getDate()) {
                    fcol = 'red';
                }
                svg.append('rect').attr('x', (jj * dayfeld + pos.x) + 'px')
                    .attr('y', pos.y + 'px')
                    .attr('width', dayfeld + "px")
                    .attr('height', calfeld.y + 'px')
                    .style('stroke', 'black')
                    .attr('stroke-width', 1)
                    .style('fill', fcol)

                svg.append('text')
                    .attr('x', (jj * dayfeld + pos.x) + 3 + 'px')
                    .attr('y', pos.y + 20 + 'px')
                    .style('font-size', '20px')
                    .style('color', fcol)
                    .text((j + 1) + '.' + (i + zeige.von[1]) + '.')

                if (temp.getDay() == 1) {
                    svg.append('text')
                        .attr('x', (jj * dayfeld + pos.x) + 3 + 'px')
                        .attr('y', calfeld.y / 2 + pos.y + 8 + 'px')
                        .style('font-size', '20px')
                        .style('font-color', 'grey')
                        .text("KW" + temp.getWeek())
                }

            }
        }

        pos.y = 20
        loop2: for (i = 0; i < cal_ds.length; i++) {
            let kkk = cal_ds[i]
            if (cal_ds[i].start == undefined ||
                cal_ds[i].end == undefined
            ) {
                continue loop2
            }


            first = new Date(zeige.von)

            first.setHours(2)
            stdate = new Date(cal_ds[i].start)
            enddate = new Date(cal_ds[i].end)
            timedelta = (enddate - stdate) / (1000 * 24 * 60 * 60)

            eintragsbreite = timedelta * dayfeld
            console.log(cal_ds[i].end.length)
            if (cal_ds[i].end.length < 11) {
                eintragsbreite += dayfeld
            }
            eventli = dayfeld * (stdate - first) / (1000 * 24 * 60 * 60)


            //  alert(stdate.getFullYear())

            if (stdate.getFullYear() == showyear) {


                pille_ds.push({
                    x: (eventli + pos.x),
                    y: (pos.y),
                    w: eintragsbreite
                    , h: eventhohe * 0.9, c: cal_ds[i].color, i: cal_ds[i].id,
                    t: cal_ds[i].title, yschub: 0, id: cal_ds[i].id
                })

            }


        }
        yschubmax = 0
//console.table(pille_ds)

        for (xxx = 0; xxx < 5; xxx++) {
            for (a = 0; a < pille_ds.length; a++) {

                for (b = 0; b < pille_ds.length; b++) {
                    if (a == b) {
                        continue
                    }

                    if (pille_ds[a].yschub == pille_ds[b].yschub) {
                        a1 = pille_ds[a].x
                        a2 = pille_ds[a].x + pille_ds[a].w
                        b1 = pille_ds[b].x
                        b2 = pille_ds[b].x + pille_ds[b].w

                        if (
                            /*
                        a1<b1 && a2>b1
                        ||
                        a1<b2 && a2>b2
                            ||
                            b1<a2&&b2>a2
                            ||
                            b1<a1&&b2>a1
                            ||
                            b1<a1 && b2>a2
                            ||
                            b1>a1 && b2<a2
                        //||
                        //a1<=b1&&a2>=b2
                        //||
                        //a1>b1&&a2<=b2
                        */
                            a1 <= b1 && a2 > b1 ||
                            a1 < b1 && a2 >= b1 ||
                            a1 <= b2 && a2 > b2 ||
                            a1 < b2 && a2 >= b2
                            // || a1 < b1 && a2 >= b2 || a1 <= b1 && a2 > b2 || a1 > b1 && a2 <= b2 || a1 >= b1 && a2 < b2 ||
                            // a1 < b1 && a2 == b2 || b1 < a1 && a2 == b2
                        ) {
                            //   pille_ds[b].y +=eventhohe //*(pille_ds[b].yschub+1)

                            pille_ds[b].yschub++

                        }
                    }

                }
                //       console.table(pille_ds)
                yschubmax = Math.min(yschubmax, pille_ds[a].yschub)
            }
        }
        eventhohe = Math.min((calfeld.y / (yschubmax + 2)), 20)
        for (a = 0; a < pille_ds.length; a++) {
            pille_ds[a].y += eventhohe * pille_ds[a].yschub
        }


        for (op = 0; op < pille_ds.length; op++) {
            if (pille_ds[op].y < 0) {
                continue
            }
            cal_pille(pille_ds[op])
        }


    }

    if (caltype == "wgs") {
        
        info.append('br')
        info.append('input').attr('type','button').attr("value",'nur Blöcke')
        .on('click',function() {
            
            nurblock = !nurblock
           
            select(elm,ds)
        })

      
       
        monfeld = calfeld.y / zeige.monate
     //   dayfeld = calfeld.x / 31
        eventhohe = Math.min(20, (monfeld / anzevent))

  

//xyz
        display_farbe = true
        dayfeld = 100

        symbol_x = dayfeld*0.8
        symbol_y = (symbol_x*2)/3;

        level =0   
        symbol_counter = 0
   

        zeige.days = ((spätestes_date_in_ds.getTime() - frühestes_date_in_ds.getTime()) / (1000 * 3600 * 24))+1
        
        svg.style('width', zeige.days*dayfeld + "px")
       svg.style('background-color', "#e6e6ff")
     

        calfeld = {x: svg_size.width, y: svg_size.height}
        if (cal_show_mode == "next14"){       svg.style('width', svg_size.width + "px")
            dayfeld = svg_size.width / 14}
        
            if (cal_show_mode == "next28"){       svg.style('width', svg_size.width + "px")
            dayfeld = svg_size.width / 28}
    

        jj = -1
        for (i = 0; i < zeige.monate; i++) {
           // alert(frühestes_date_in_ds)
            if (i==0){pop=frühestes_date_in_ds.getDate()-1}else{pop=0}
            for (j = pop; j < dom[i + zeige.von[1] - 1]; j++) {
                
                fcol = 'white'
                temp = new Date(zeige.von[0] + '-' + (i + zeige.von[1]) + '-' + (j + 1))
        
                jj++
                if (temp.getDay() == 6 || temp.getDay() == 0) {
                    fcol = 'lightgrey';
                }
                //    temp = new Date(zeige.von[0]+'-'+(i+zeige.von[1])+'-'+(j+1))
                if (temp.getFullYear() == heute.getFullYear() && temp.getMonth() == heute.getMonth() && temp.getDate() == heute.getDate()) {
                    fcol = 'red';

                }
                pos.y = 25
                hinter.append('rect').attr('x', (jj * dayfeld + pos.x) + 'px')
                    .attr('y', pos.y + 'px')
                    .attr('width', dayfeld + "px")
                    .attr('height', 25 + 'px')//calfeld.y + 'px')
                    .style('stroke', 'black')
                    .attr('stroke-width', 1)
                    .style('fill', fcol)

                    hinter.append('text')
                    .attr('x', (jj * dayfeld + pos.x)+dayfeld/2 + 'px')
                    .attr('y', pos.y + 15  + 'px')
                    .attr("text-anchor","middle")
                    .style('font-size', '15px')
                    .style('color', fcol)
                    .text((j + 1) + '.' + (i + zeige.von[1]) + '.')
                    
                    pos.y=0
                if (temp.getDay() == 1) {
                    hinter.append('rect').attr('x', (jj * dayfeld + pos.x) + 'px')
                    .attr('y', pos.y + 'px')
                    .attr('width', dayfeld*7 + "px")
                    .attr('height', 25 + 'px')//calfeld.y + 'px')
                .style('stroke', 'black')
                  .attr('stroke-width', 1)
                    .style('fill', "lightgrey")
                   
                    hinter.append('text')
                        .attr('x', (jj * dayfeld + pos.x)+dayfeld*3.5 + 'px')
                        .attr('y', pos.y+19 + 'px')
                        .attr("text-anchor","middle")
                        .style('font-size', '20px')
                        .style('font-color', 'black')
                        .text("KW" + temp.getWeek())
                      //  .attr("transform" , "rotate(1)")
                }

            }
        }
// der sprung zu den einträgen 
        pos.y = 50
        loop2: for (i = 0; i < cal_ds.length; i++) {
            let kkk = cal_ds[i]
            if (cal_ds[i].start == undefined ||
                cal_ds[i].end == undefined
            ) {
                continue loop2
            }


           first = frühestes_date_in_ds// new Date(zeige.von)
         first.setHours(0)
            
            stdate = new Date(cal_ds[i].start)
            enddate = new Date(cal_ds[i].end)
            timedelta = (enddate - stdate) / (1000 * 24 * 60 * 60)
           // cal_ds[i].timedelta = timedelta
            eintragsbreite = timedelta * dayfeld
           
            if (cal_ds[i].end.length < 11) {
                eintragsbreite += dayfeld
            }


            stdate.setHours(0) // diese Zeile dient nur dazu termine die nur innerhalb eines tages sind in der mitte des tages anzuzeigen und nciht zum beginnzeitpunkt
            
            eventli = dayfeld * (stdate - first) / (1000 * 24 * 60 * 60) -1


            //  alert(stdate.getFullYear())

            if (stdate.getFullYear() == showyear) {
         
         //if(timedelta< 1.0)     //das ist durch die folgende zeile deaktiviert weil die sonderform von tagesterminen noch nicht funktionerit
         if(eintragsbreite<dayfeld+5 && nurblock ==true)
         {
 /*
              svg.select('#linef').append('line')
                     .attr('stroke','black')
                     .attr('stroke-width', liniendicke*2)
                     .attr('x1', eventli + dayfeld/2)
                     .attr('x2', eventli + dayfeld/2)
                     .attr('y1', 50)
                     .attr('y2', 175);

           
             draw_symbol((dayfeld/10+eventli ),pos.y+125,cal_ds[i],svg)
         */
            }
         else
     {    pille_ds.push({
             x: (eventli),
             y: (pos.y),
             w: eintragsbreite
             , h: eventhohe * 0.9, c: cal_ds[i].color, i: cal_ds[i].id,
             t: cal_ds[i].title, yschub: 0, id: cal_ds[i].id, inhalt : cal_ds[i].inhalt
         })}

            }


        }
        pille_ds.sort(function (a, b) {
            return a.w - b.w;
          });
        yschubmax = 0
/*
pille_ds.sort(function (a, b) {
    return a.eintragsbreite - b.eintragsbreite;
  });
*/
        for (xxx = 0; xxx < 5; xxx++) {
            for (a = 0; a < pille_ds.length; a++) {

                for (b = 0; b < pille_ds.length; b++) {
                    if (a == b) {
                        continue
                    }

                    if (pille_ds[a].yschub == pille_ds[b].yschub) {
                        a1 = pille_ds[a].x
                        a2 = pille_ds[a].x + pille_ds[a].w
                        b1 = pille_ds[b].x
                        b2 = pille_ds[b].x + pille_ds[b].w

                        if (
                            /*
                        a1<b1 && a2>b1
                        ||
                        a1<b2 && a2>b2
                            ||
                            b1<a2&&b2>a2
                            ||
                            b1<a1&&b2>a1
                            ||
                            b1<a1 && b2>a2
                            ||
                            b1>a1 && b2<a2
                        //||
                        //a1<=b1&&a2>=b2
                        //||
                        //a1>b1&&a2<=b2
                        */
                            a1 <= b1 && a2 > b1 ||
                            a1 < b1 && a2 >= b1 ||
                            a1 <= b2 && a2 > b2 ||
                            a1 < b2 && a2 >= b2
                            // || a1 < b1 && a2 >= b2 || a1 <= b1 && a2 > b2 || a1 > b1 && a2 <= b2 || a1 >= b1 && a2 < b2 ||
                            // a1 < b1 && a2 == b2 || b1 < a1 && a2 == b2
                        ) {
                            //   pille_ds[b].y +=eventhohe //*(pille_ds[b].yschub+1)

                            pille_ds[b].yschub++

                        }
                    }

                }
                //       console.table(pille_ds)
                yschubmax = Math.min(yschubmax, pille_ds[a].yschub)
            }
        }
        eventhohe = Math.min((calfeld.y / (yschubmax + 2)), 20)
        for (a = 0; a < pille_ds.length; a++) {
            pille_ds[a].y += eventhohe * pille_ds[a].yschub *1.5
        }


        for (op = 0; op < pille_ds.length; op++) {
            
            if (pille_ds[op].y < 0) {
                continue
            }
            cal_pille(pille_ds[op])
        }
/*
main.append("br")
main.append("button").text("<--").on('click',function(){spätestes_date_in_ds.setTime(spätestes_date_in_ds.getTime()-7*24*3600000)
                                                        frühestes_date_in_ds.setTime(frühestes_date_in_ds.getTime()-7*24*3600000)
                                                        cal_show_mode = "nope"
                                                        select(elm,ds)
})
main.append("button").text("-->").on('click',function(){spätestes_date_in_ds.setTime(spätestes_date_in_ds.getTime()+7*24*3600000)
    frühestes_date_in_ds.setTime(frühestes_date_in_ds.getTime()+7*24*3600000)
    cal_show_mode = "nope"
    select(elm,ds)
})
        frühestes_date_in_ds = new Date()
        dow = frühestes_date_in_ds.getDay()-1
        frühestes_date_in_ds.setDate(frühestes_date_in_ds.getDate()-dow)
        
        //
        
        spätestes_date_in_ds.setTime(frühestes_date_in_ds.getTime()+13*24*3600000)
*/
    }



    if (caltype == "daybyday") {
        svg.style('width', svg_size.width + "px")
        calfeld = {x: svg_size.width, y: svg_size.height}
       showday = [2022,2,28]

        day_ds = []

        for (p=0;p<cal_ds.length;p++){
            a = cal_ds[p].start
            b = new Date(cal_ds[p].end)
            alert(a)
            if((a.getDate() == showday[2]&&a.getFullYear()==showday[0]&&a.getMonth()==a[1])||
            b.getDate() == showday[2]&&b.getFullYear()==showday[0]&&b.getMonth()==a[1]
            ){
                day_ds.push(ds[p])
            }
        }
alert(day_ds.length)

        zeige.days = ((spätestes_date_in_ds - frühestes_date_in_ds) / (1000 * 3600 * 24))


        pos.y += 10
        tageshöhe = calfeld.y
        for (i = 0; i < zeige.days; i++) {
            temp = new Date()
            temp.setTime(frühestes_date_in_ds.getTime() + i * 1000 * 3600 * 24)

            //  for (j = 0; j < dom[i+zeige.von[1]-1]; j++) {

            if (temp.getDay() == 6 || temp.getDay() == 0) {
                fcol = 'grey';
            } else {
                fcol = 'lightgrey'
            }

            if (
                temp.getFullYear() == heute.getFullYear() && temp.getMonth() == heute.getMonth() && temp.getDate() == heute.getDate()) {

                fcol = 'red';
            }

            svg.append('rect').attr('x', (i * dayfeld + pos.x) + 'px')
                .attr('y', pos.y + 'px')
                .attr('width', dayfeld + "px")
                .attr('height', calfeld.y + 'px')
                .style('stroke', 'black')
                .attr('stroke-width', 1)
                .style('fill', fcol)

            svg.append('text')
                .attr('x', (i * dayfeld + pos.x) + 3 + 'px')
                .attr('y', pos.y + 20 + 'px')
                .style('font-size', '20px')
                .style('color', fcol)
                .text(temp.getDate() + '.' + (temp.getMonth() + 1) + '.')

            if (temp.getDay() == 1) {
                svg.append('text')
                    .attr('x', (i * dayfeld + pos.x) + 3 + 'px')
                    .attr('y', calfeld.y - 20 + 'px')
                    .style('font-size', '20px')
                    .style('font-color', 'grey')
                    .text("KW" + temp.getWeek())
            }


        }

        for (i = 0; i < cal_ds.length; i++) {
            a = new Date(cal_ds[i].start)
            b = new Date(cal_ds[i].end)
            ty = 0
            if (a.getMonth() == b.getMonth() && a.getFullYear() == b.getFullYear() && a.getDate() == b.getDate()) {
                // eintagesevent
                eintragsbreite = dayfeld
                timedelta_min = (b - a) / (1000 * 60)
                eventhohe = tageshöhe / (24 * 60) * timedelta_min
                console.log(eventhohe)
                eventli = dayfeld * (a - frühestes_date_in_ds) / (1000 * 24 * 60 * 60)
                ty = (a.getHours() * 60 + a.getMinutes()) * tageshöhe / (24 * 60)
            } else {
                //mehrtagesevent

                /*
                eintragsbreite = timedelta*dayfeld
                eventhohe =30

                    if (cal_ds[i].end.length<11){eintragsbreite+=dayfeld}
                    eventli =     dayfeld*(a-frühestes_date_in_ds)/(1000*24*60*60)
            */

            }
            if(elm.w>dayfeld || nurblock ==false){
            pille_ds.push({
                x: (eventli + pos.x),
                y: (pos.y + ty),
                w: eintragsbreite
                , h: eventhohe * 0.9, c: cal_ds[i].color, id: cal_ds[i].id,
                t: cal_ds[i].title, yschub: 0
            })
        }

        }


        svg.append('line').attr('x1', 0).attr('x2', calfeld.x).attr('y1', tageshöhe / 4).attr('y2', tageshöhe / 4).style('stroke', 'black')
        svg.append('line').attr('x1', 0).attr('x2', calfeld.x).attr('y1', tageshöhe / 2).attr('y2', tageshöhe / 2).style('stroke', 'black')
        svg.append('line').attr('x1', 0).attr('x2', calfeld.x).attr('y1', tageshöhe * 3 / 4).attr('y2', tageshöhe * 3 / 4).style('stroke', 'black')


        /*






                }
        }

            pos.y = 20
            loop2: for (i = 0; i < nachkommen.length; i++) {
                let kkk = nachkommen[i]
                if (nachkommen[i].start == undefined||
                nachkommen[i].end == undefined
                ){continue loop2}



                first = new Date(zeige.von)

                first.setHours(2)
                stdate = new Date(nachkommen[i].start)
                enddate = new Date(nachkommen[i].end)
                timedelta = (enddate-stdate)/(1000*24*60*60)
                eintragsbreite = timedelta*dayfeld

               // console.log(nachkommen[i].end.length)
                if (nachkommen[i].end.length<11){eintragsbreite+=dayfeld}
                eventli =     dayfeld*(stdate-first)/(1000*24*60*60)


              //  alert(stdate.getFullYear())

                if (stdate.getFullYear()==showyear){





                }


                }





        */

        for (op = 0; op < pille_ds.length; op++) {
            cal_pille(pille_ds[op])
           
        }

    }


        function cal_pille(elm){
            gcounter++
            fonts = Math.min(20,eventhohe) + 'px'
          rounded="10px"
          liniendicke_temp =1
          
         //
          
          if(caltype=="wgs"){
        
                elm.y += 10
               
                rounded ="0px"
                ymax = Math.max(elm.y+eventhohe+15,ymax)
                svg.style('height',ymax+50 +"px")
                if(elm.w < dayfeld+1){
                    elm.w = dayfeld *0.6
                    elm.x += dayfeld *0.2
                    
                    rounded = "10px"

           //     linesg.append('line').attr('x1', elm.x+(dayfeld/2)).attr('x2', elm.x+(dayfeld/2)).attr('y1', 50).attr('y2', elm.y+20).style('stroke', 'black')
                }

                xneu = Math.max(elm.x,0)
                elm.w -= (xneu - elm.x)
                elm.x= xneu
                //elm.w = Math.min(svg_size.width-elm.x-50,elm.w)

            }else{
                    if (elm.w <20) {fonts = '10px'}

                }

           // alert(elm.t.length)
                if (elm.w < 3*dayfeld){fonts =Math.max(10, 30 - (elm.t.length*5))}


            //    

                if(ds[elm.id].gestrichelt===true){
                    f = 10
                    dash_modus = f+','+f
                }
                else{dash_modus=''}

                if(ds[elm.id].progress != undefined &&ds[elm.id].progress != 1){
                    if(ds[elm.id].progress <1){linienfarbe="orange"}
                    if(ds[elm.id].progress <0.6){linienfarbe="yellow"}
                    if(ds[elm.id].progress <0.3){linienfarbe="red"}
                    liniendicke_temp = 3
                    
                }
                else{linienfarbe = "black"}

                if(elm.c == "black"){textfarbe ="white"}else{textfarbe="black"}


            pilleg.append('g').attr('id','fx'+gcounter).on('click',function(){select(ds[elm.id],ds)}).style('cursor','pointer')
            pilleg.select('#fx'+gcounter).append('rect')
                    .attr('x', elm.x+'px')
                    .attr('y', elm.y+5+'px')
                    .attr('width', elm.w+'px')
                    .attr('height', eventhohe + 'px')
                    .attr('rx', rounded)
                    .attr('stroke-dasharray',dash_modus)
                    .style('stroke', linienfarbe)
                    .attr('stroke-width', liniendicke_temp)
                    .style('fill', elm.c)
                   
if(ds[elm.id].vernichtet == "blau"){
    pilleg.select('#fx'+gcounter).append('line')
    .attr('x1',elm.x)
    .attr('x2',elm.x+elm.w)
    .attr('y2',elm.y+5)
    .attr('y1',elm.y+eventhohe+5)
    .attr('stroke','blue')
    .attr('stroke-width',3)
    

}




                    if(caltype == "wgs")
                  {  pilleg.select('#fx'+gcounter)
                    .on('mouseover',function(){katz = main.append('div').attr('id',"Katze")
                    .append('p').text(ds[elm.id].logic)
                    katz.append("p").text("Zeitraum: " +ds[elm.id].start+" bis "+ds[elm.id].end)
                    katz.append("p").text("Inhalt: ")
                    if (typeof ds[elm.id].inhalt == 'object'){
                        for(i=0;i<ds[elm.id].inhalt.length;i++){
                            //katz.append('p').text(ds[elm.id.inhalt])
                            katz.append('p').text(ds[elm.id].inhalt[i])
                        }}else{
                            katz.append('p').text(ds[elm.id].inhalt)
                        }                              
                })
                 //   .on('mouseover',function(){svg.append('g').attr('id',"Katze").style("background-color","white").append('text').attr('x',elm.x+"px").attr('y',"100px").text(ds[elm.id].logic)               })
                    .on('mouseout',function(){main.select('#Katze').remove()})
}
                  //  .append('title').text(elm.inhalt)//(elm.t)

                
                svg.select('#fx'+gcounter).append('text')
            .attr('x', (elm.x + elm.w/2 )+ 'px')
            .attr('y', (elm.y +eventhohe+2) + 'px')
            .style('fill',textfarbe)
            .attr("text-anchor","middle")
            .style('font-size', fonts)
            .text(elm.t)

            
           
    }


    /*
        wo.append('table')
            .style('margin', "3%")
    .style('width', "94%")
       //     .style('border', '1px')
    .style('border-collapse', 'collapse')
    tab = wo.select('table')
            tab.append('tr').attr('id','row')
for (i = 1; i < 32; i++) {
tab.select('#row').append('th').text(i)
}


    for(j=1;j<13;j++) {
        tab.append('tr').attr('id','row' + j)
        for (i = 1; i < 32; i++) {
            tab.select('#row'+j).append('td').attr('id',"cell"+j+'-'+i).text('M')

        }
    }
*/
}

Date.prototype.getWeek = function() {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                          - 3 + (week1.getDay() + 6) % 7) / 7);
  }