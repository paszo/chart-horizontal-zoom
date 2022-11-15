import * as d3 from 'd3';
import React, { useState, useEffect, RefObject } from 'react'

function Chart() {
    const ref: RefObject<HTMLDivElement> = React.createRef();

     useEffect(() => {
        draw()
    });

     const draw = () => {

    const width = 500;
    const height = 400;
    const margin = {top: 50, right: 50, bottom: 50, left: 50};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const data = [[-100,100],[-100,200],[-100,300],[-100,400]];

    let yScale = d3.scaleLinear()
                   .domain([100,400])
                   .range([innerHeight, 0]);

    let yAxis = d3.axisLeft(yScale);

    d3.select(ref.current)
         .selectAll("svg")
         .remove();

    const zoomer: any = d3.zoom().on("zoom", zoom)

     const svg = d3.select(ref.current)
         .append("svg")
         .attr("width", width)
         .attr("height", height)
         .call(zoomer);


       var circles = svg.append("g")
                        .attr("id", "circles")
                        .attr("transform", "translate(200, 0)")
                        .selectAll("circle")
                        .data(data)
                        .enter()
                        .append("circle")
                        .attr("r", 4)
                        .attr("cx", function(d) { return d[0]; })
                        .attr("cy", function(d) { return yScale(d[1]); })

       // add y-axis
       var y_axis = svg.append("g")
                       .attr("id", "y_axis")
                       .attr("transform", "translate(75,0)")
                       .call(yAxis)

       function zoom(event: any) {
           // re-scale y axis during zoom; ref [2]
           y_axis.call(yAxis.scale(event.transform.rescaleY(yScale)));

           // re-draw circles using new y-axis scale; ref [3]
           var new_yScale = event.transform.rescaleY(yScale);
           circles.attr("cy", function(d) { return new_yScale(d[1]); });
       }
    }

    return (
        <div style={{margin: 50, position: "relative"}} className="OptionsDataChart" ref={ref}>
        </div>
    )

}

export default Chart;