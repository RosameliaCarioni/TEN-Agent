"use client"

import Header from "../../platform/pc/header"
import styles from "./index.module.scss"
import { useEffect, useRef } from "react"
import * as d3 from "d3";

export default function Stats() {

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

  }, radarData)

  // Bubble Chart
  const bubbleData = [
    { x: 10, y: 15, r: 25, label: 'Agora', color: '#ff7675' },
    { x: 5, y: -10, r: 80, label: 'Google', color: '#fab1a0' },
    { x: 20, y: 5, r: 20, label: 'Aava', color: '#ffeaa7' },
    { x: -15, y: 8, r: 52, label: 'Apple', color: '#55efc4' },
  ];

  useEffect(() => {

  }, bubbleData);

  const barData = [
    { bucket: 'A', actual: 30, budgeted: 50 },
    { bucket: 'B', actual: 40, budgeted: 60 },
    { bucket: 'C', actual: 20, budgeted: 35 },
    { bucket: 'D', actual: 25, budgeted: 45 },
    { bucket: 'E', actual: 50, budgeted: 60 }
  ];

  useEffect(() => {

  }, barData);

  return <div className={styles.entry}>
    <Header></Header>
    <div className={styles.content}>
      <div className={styles.body}>
        <div>
          <h1>Your current workplace climate</h1>
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



