function disp_circle() {
  //ds = dataset // das muss noch aufgehoben werden

  
      feldgroße = 20*zoom
     
      radius = feldgroße/3

      mittelpunkt={}
      mittelpunkt.x = (feldgroße/2.5)+30
      mittelpunkt.y = (feldgroße/2.5)+20
     zieldiv
      .append('svg')
      .attr('id','cycle_svg')
      .attr('float','left')
      .attr('width',feldgroße)
      .attr('height',feldgroße-20)
     // .style('background-color','grey')
      .append('circle')
      .attr('stroke',"black")
      .attr('stroke-width',"5") 
      .attr ('fill',"none")
      .attr("cx", mittelpunkt.x)
      .attr("cy", mittelpunkt.y)
      .attr("r", radius);

      kinder = show_children(elm)
      steps=kinder.length
      

     
       
      for (j=0;j<steps;j++){
          color = 'white'
         
          if(kinder[j].color != undefined){ color = kinder[j].color}
          deg = ((2*Math.PI*j) / (steps))-Math.PI/2
          text_y = (radius+15)*Math.sin(deg)
          text_x = (radius+15)*Math.cos(deg)
          mark_y= (radius)*Math.sin(deg)
          mark_x= (radius)*Math.cos(deg)
          rect_y = (radius+20)*Math.sin(deg)
          rect_x = (radius+20)*Math.cos(deg)

          zieldiv
          .select('#cycle_svg')
          .append('circle')
      .attr('stroke',"black")
      .attr('stroke-width',"3") 
      .attr ('fill',color)
      .attr("cx", mittelpunkt.x+mark_x)
      .attr("cy", mittelpunkt.y+mark_y)
      .attr("r", 5);
     // text2_x =mittelpunkt.x+text_x
    //  text2_y =mittelpunkt.y+text_y
      rot = 360/((2*Math.PI)/deg) + 90
      let goto_elm = kinder[j]
      zieldiv
      .select('#cycle_svg')
      .append ('g')
          .attr('id','g'+j)
          .append('rect')
              .attr("width", 15)
              .attr("height", 20 + 'px')
              .attr('stroke-width',liniendicke)
              .attr('stroke', 'black')
              .attr('rx',5)
              .attr('ry',5)
         //     .attr('x',mittelpunkt.x+rect_x-(textbreite/2)-5)
              .attr('y',mittelpunkt.y+rect_y-10)
              .attr('fill',color)
              
      zieldiv
      .select('#cycle_svg')
      .select('#g'+j)
          .append('text')
              .attr('text-anchor',"middle")
              .attr('x',mittelpunkt.x+text_x)
              .attr('y',mittelpunkt.y+text_y)
              .text(kinder[j].allup.slice(-1))
              .attr('transform','rotate('+ rot +','+ (mittelpunkt.x+text_x) + ',' + (mittelpunkt.y+text_y) + ')')
      
      textbreite = zieldiv
          .select('#cycle_svg')
          .select('#g'+j)
          .select("text").node().getComputedTextLength()
     
      zieldiv
      .select('#cycle_svg')
      .select('#g'+j)
      .select('rect')
              .attr("width", textbreite+10)
              .attr('x',mittelpunkt.x+rect_x-(textbreite/2)-5)
              .attr('transform','rotate('+ rot +','+ (mittelpunkt.x+rect_x) + ',' + (mittelpunkt.y+rect_y) + ')')
      
              let übergabeelm = kinder[j]
      zieldiv
      .select('#cycle_svg')
      .select('#g'+j)
      .on('click',function(){element_selected(übergabeelm,wo)})
      .on('mouseover',function(){element_mouseover(goto_elm,wo)})
    zieldiv
    .select('#cycle_svg')
    .select('#g'+j)
    .append('title')
    .text(kinder[j].inhalt  )
      }

}