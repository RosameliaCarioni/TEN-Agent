"use client"

import Header from "../../platform/pc/header"
import styles from "./index.module.scss"
import { useEffect, useRef } from "react"
import * as d3 from "d3";
import Dots from "@/assets/company-dots.png"
import Perf from "@/assets/performance.png"
import Mgmt from "@/assets/Mgmt.png"
import Image from "next/image"

export default function Company() {

  return <div className={styles.entry}>
    <Header></Header>
    <div className={styles.content}>
      <div className={styles.body}>
        <div>
          <h1>Employees experience (Company view)</h1>
          <div className={styles.grid}>
            <div><h3>Current value indices</h3>
              <Image
                src={Mgmt}
                alt="Mgmt"
                style={{
                  height: "311px",
                  width: "286px",
                }}
              />
            </div>
            <div><h3>Departments overview</h3>
              <Image
                src={Dots}
                alt="Dots"
                style={{
                  height: "250px",
                  width: "500px",
                }}
              />
            </div>
            <div><h3>Performance compared to last Q</h3>
              <Image
                src={Perf}
                alt="Perf"
                style={{
                  height: "548px",
                  width: "667px",
                }}
              />
            </div>
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



