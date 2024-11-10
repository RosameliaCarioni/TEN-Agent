"use client"

import Header from "../../platform/pc/header"
import styles from "./index.module.scss"
import { useEffect, useRef } from "react"
import * as d3 from "d3";

export default function Company() {

  const svgRef = useRef();
  const svgBubbleRef = useRef();
  const svgBarRef = useRef();

  const radarData = [
    { axis: "Menal Wellbeing", value: 9 },
    { axis: "Carrer Development", value: 9 },
    { axis: "Leadership Style", value: 7 },
    { axis: "Cross Department Collaboration", value: 8 },
    { axis: "Recognition of Achievements", value: 8 },
    { axis: "Work Life Balance", value: 3 },
    { axis: "Gender Balance", value: 9 },
    { axis: "Paid Sick Leave", value: 6 },
    { axis: "Health Insurance", value: 2 },
    { axis: "Pension Plans", value: 8 },
    { axis: "Remote Work Options", value: 8 },
    { axis: "Fitness Program", value: 5 },
    { axis: "Child Care Support", value: 9 },
    { axis: "Flexible Working Hours", value: 3 },
  ];

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const margin = { top: 40, right: 50, bottom: 0, left: 80 };
    const width = 500 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${width / 2 + margin.left}, ${height / 2 + margin.top})`);

    const angleSlice = Math.PI * 2 / radarData.length;

    // Scales
    const rScale = d3.scaleLinear()
      .range([0, radius])
      .domain([0, 10]);

    // Draw the circular grid
    const levels = 5;
    const gridCircles = svg.selectAll(".gridCircle")
      .data(d3.range(1, levels + 1).reverse())
      .enter()
      .append("circle")
      .attr("class", "gridCircle")
      .attr("r", d => radius / levels * d)
      .style("fill", "none")
      .style("stroke", "#ccc")
      .style("stroke-dasharray", "4,4");

    // Draw the axes
    const axes = svg.selectAll(".axis")
      .data(radarData)
      .enter()
      .append("g")
      .attr("class", "axis");

    axes.append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", (d, i) => rScale(10) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr("y2", (d, i) => rScale(10) * Math.sin(angleSlice * i - Math.PI / 2))
      .style("stroke", "#999")
      .style("stroke-width", "1px");

    axes.append("text")
      .attr("class", "legend")
      .style("font-size", "14px") // Increase font size
      .attr("fill", "white")      // Set text color to white
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("x", (d, i) => rScale(10.5) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr("y", (d, i) => rScale(10.5) * Math.sin(angleSlice * i - Math.PI / 2))
      .text(d => d.axis);

    // Draw the radar chart path
    const radarLine = d3.lineRadial()
      .radius(d => rScale(d.value))
      .angle((d, i) => i * angleSlice);

    svg.append("path")
      .datum(radarData)
      .attr("class", "radarPath")
      .attr("d", radarLine)
      .style("fill", "#ffd700")
      .style("fill-opacity", 0.5)
      .style("stroke", "#ffd700")
      .style("stroke-width", "2px");


  }, radarData)

  // Bubble Chart
  const bubbleData = [
    { x: 10, y: 15, r: 25, label: 'Agora', color: '#ff7675' },
    { x: 5, y: -10, r: 80, label: 'Google', color: '#fab1a0' },
    { x: 20, y: 5, r: 20, label: 'Aava', color: '#ffeaa7' },
    { x: -15, y: 8, r: 52, label: 'Apple', color: '#55efc4' },
  ];

  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 20, left: 110 };
    const width = 500 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(svgBubbleRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Scales
    const xScale = d3.scaleLinear()
      .domain([-20, 20])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([-20, 20])
      .range([height, 0]);

    // Add axes
    svg.append("g")
      .attr("transform", `translate(0, ${height / 2})`)
      .call(d3.axisBottom(xScale));

    svg.append("g")
      .attr("transform", `translate(${width / 2}, 0)`)
      .call(d3.axisLeft(yScale));

    // Add bubbles
    svg.selectAll("circle")
      .data(bubbleData)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("r", d => d.r)
      .style("fill", d => d.color)
      .style("opacity", 0.7);

    // Add labels
    svg.selectAll("text.bubble-label")
      .data(bubbleData)
      .enter()
      .append("text")
      .attr("class", "bubble-label")
      .attr("x", d => xScale(d.x))
      .attr("y", d => yScale(d.y))
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .style("font-size", "16px")
      .text(d => d.label);
  }, bubbleData);

  const barData = [
    { bucket: 'A', actual: 30, budgeted: 50 },
    { bucket: 'B', actual: 40, budgeted: 60 },
    { bucket: 'C', actual: 20, budgeted: 35 },
    { bucket: 'D', actual: 25, budgeted: 45 },
    { bucket: 'E', actual: 50, budgeted: 60 }
  ];

  useEffect(() => {
    const margin = { top: 40, right: 0, bottom: 0, left: 140 };
    const width = 500 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3.select(svgBarRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = d3.scaleBand()
      .range([0, width])
      .padding(0.1)
      .domain(barData.map(d => d.bucket));

    const yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(barData, d => Math.max(d.actual, d.budgeted))]);

    // Add axes
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    svg.append("g")
      .call(d3.axisLeft(yScale));

    // Add bars
    const barWidth = xScale.bandwidth() / 2;

    // Budgeted bars
    svg.selectAll(".bar-budgeted")
      .data(barData)
      .enter()
      .append("rect")
      .attr("class", "bar-budgeted")
      .attr("x", d => xScale(d.bucket))
      .attr("width", barWidth)
      .attr("y", d => yScale(d.budgeted))
      .attr("height", d => height - yScale(d.budgeted))
      .style("fill", "#74b9ff");

    // Actual bars
    svg.selectAll(".bar-actual")
      .data(barData)
      .enter()
      .append("rect")
      .attr("class", "bar-actual")
      .attr("x", d => xScale(d.bucket) + barWidth)
      .attr("width", barWidth)
      .attr("y", d => yScale(d.actual))
      .attr("height", d => height - yScale(d.actual))
      .style("fill", "#a8e6cf");
  }, barData);

  return <div className={styles.entry}>
    <Header></Header>
    <div className={styles.content}>
      <div className={styles.body}>
        <div>
          <h1>Employees experience (Company view)</h1>
          <div className={styles.grid}>
            <div><h3>Your workplace priorities</h3><svg ref={svgRef}></svg></div>
            <div><h3>Company Perks and Values match</h3><svg ref={svgBubbleRef}></svg></div>
            <div><h3>Your priorities compared</h3><svg ref={svgBarRef}></svg></div>
            <div className={styles.summaries}><h3>Employees are saying</h3>
              <p>
                <strong>Apple</strong>: “Only 3 out of 10 employees at Apple feel that their work-life balance is respected, with many citing high-pressure deadlines and a relentless workload.”
              </p>
              <p>
                <strong>Agora</strong>: “8 out of 10 employees at Agora report feeling genuinely supported in their professional growth, noting strong mentorship programs and ample learning opportunities.”
              </p>
              <p>
                <strong>Aava</strong>: “Nearly 9 out of 10 employees at Aava say the company fosters an inclusive and collaborative environment, emphasizing open communication and team-driven success.”
              </p>
              <p>
                <strong>Google</strong>: “Just 4 out of 10 employees at Google feel that the company's public stance on mental health matches their day-to-day experience, citing a disconnect between corporate messaging and the fast-paced, high-stress culture.”
              </p>
            </div>
          </div>

        </div>
      </div>
    </div >
  </div >
}



