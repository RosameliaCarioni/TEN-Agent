"use client"

import Header from "../../platform/pc/header"
import styles from "./index.module.scss"
import { useEffect, useRef } from "react"
import * as d3 from "d3";

export default function Company() {

  const svgRef = useRef();
  const svgBubbleRef = useRef();
  const svgBarRef = useRef();



  // const radarData = [

  // ];

  // useEffect(() => {
  //   if (typeof window === 'undefined') return;


  // }, radarData)

  // const radarData = [

  // ];

  // useEffect(() => {
  //   if (typeof window === 'undefined') return;


  // }, radarData)



  return <div className={styles.entry}>
    <Header></Header>
    <div className={styles.content}>
      <div className={styles.body}>
        <div>
          <h1>Employees experience (Company view)</h1>
          <div className={styles.grid}>
            <div><h3>Current value indices</h3>

              <div class="gauge-grid">
                <div class="gauge" id="gauge1">
                  <div class="title">Work-Life Balance</div>
                  <svg width="250" height="250"><g transform="translate(125,110)"><defs><linearGradient id="gradient-gauge1" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#ff4c4c"></stop><stop offset="50%" stop-color="#ffeb3b"></stop><stop offset="100%" stop-color="#4caf50"></stop></linearGradient></defs><path d="M0,105A105,105,0,1,0,-105,0L-85,0A85,85,0,1,1,0,85Z" style="fill: rgb(224, 224, 224);"></path><path d="M0,105A105,105,0,1,0,-76.542,-71.877L-61.962,-58.187A85,85,0,1,1,0,85Z" style="fill: url(&quot;#gradient-gauge1&quot;);"></path><text text-anchor="middle" dy="0.1em" style="font-size: 36px; fill: rgb(51, 51, 51);">4.2</text></g></svg></div>
                <div class="gauge" id="gauge2">
                  <div class="title">Growth Opportunities</div>
                  <svg width="250" height="250"><g transform="translate(125,110)"><defs><linearGradient id="gradient-gauge2" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#ff4c4c"></stop><stop offset="50%" stop-color="#ffeb3b"></stop><stop offset="100%" stop-color="#4caf50"></stop></linearGradient></defs><path d="M0,105A105,105,0,1,0,-105,0L-85,0A85,85,0,1,1,0,85Z" style="fill: rgb(224, 224, 224);"></path><path d="M0,105A105,105,0,1,0,-26.112,-101.701L-21.139,-82.33A85,85,0,1,1,0,85Z" style="fill: url(&quot;#gradient-gauge2&quot;);"></path><text text-anchor="middle" dy="0.1em" style="font-size: 36px; fill: rgb(51, 51, 51);">3.6</text></g></svg></div>
                <div class="gauge" id="gauge3">
                  <div class="title">Average Review Rating</div>
                  <svg width="250" height="250"><g transform="translate(125,110)"><defs><linearGradient id="gradient-gauge3" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#ff4c4c"></stop><stop offset="50%" stop-color="#ffeb3b"></stop><stop offset="100%" stop-color="#4caf50"></stop></linearGradient></defs><path d="M0,105A105,105,0,1,0,-105,0L-85,0A85,85,0,1,1,0,85Z" style="fill: rgb(224, 224, 224);"></path><path d="M0,105A105,105,0,1,0,-61.717,-84.947L-49.962,-68.766A85,85,0,1,1,0,85Z" style="fill: url(&quot;#gradient-gauge3&quot;);"></path><text text-anchor="middle" dy="0.1em" style="font-size: 36px; fill: rgb(51, 51, 51);">4.0</text></g></svg></div>
                <div class="gauge" id="gauge4">
                  <div class="title">Management Support</div>
                  <svg width="250" height="250"><g transform="translate(125,110)"><defs><linearGradient id="gradient-gauge4" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#ff4c4c"></stop><stop offset="50%" stop-color="#ffeb3b"></stop><stop offset="100%" stop-color="#4caf50"></stop></linearGradient></defs><path d="M0,105A105,105,0,1,0,-105,0L-85,0A85,85,0,1,1,0,85Z" style="fill: rgb(224, 224, 224);"></path><path d="M0,105A105,105,0,1,0,-44.707,-95.007L-36.191,-76.91A85,85,0,1,1,0,85Z" style="fill: url(&quot;#gradient-gauge4&quot;);"></path><text text-anchor="middle" dy="0.1em" style="font-size: 36px; fill: rgb(51, 51, 51);">3.8</text></g></svg></div>
              </div>

            </div>
            <div><h3>Departments overview</h3><svg ref={svgBubbleRef}></svg></div>
            <div><h3>Perfprmance compared to last Q</h3><svg ref={svgBarRef}></svg></div>
            <div className={styles.summaries}><h3>Employees' insights</h3>
              <p>
                <strong>Marketing</strong>: “Only 3 out of 10 employees feel that their work-life balance is respected, with many citing high-pressure deadlines and a relentless workload.”
              </p>
              <p>
                <strong>Design</strong>: “8 out of 10 employees report feeling genuinely supported in their professional growth, noting strong mentorship programs and ample learning opportunities.”
              </p>
              <p>
                <strong>Tech</strong>: “Nearly 9 out of 10 employees at Aava say the company fosters an inclusive and collaborative environment, emphasizing open communication and team-driven success.”
              </p>
              <p>
                <strong>Customer Service</strong>: “Just 4 out of 10 employees feel that the company's public stance on mental health matches their day-to-day experience, citing a disconnect between corporate messaging and the fast-paced, high-stress culture.”
              </p>
            </div>
          </div>

        </div>
      </div>
    </div >
  </div >
}



