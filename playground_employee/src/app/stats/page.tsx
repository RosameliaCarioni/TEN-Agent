"use client"

import Header from "../../platform/pc/header"
import styles from "./index.module.scss"
import { useEffect, useRef } from "react"
import * as d3 from "d3";
import Perf from "@/assets/performance.png"
import Mgmt from "@/assets/Mgmt.png"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Stats() {
  const router = useRouter()


  const onClickCompany = async () => {
    router.push("/company")
  }


  return <div className={styles.entry}>
    <Header></Header>
    <div className={styles.content}>
      <div className={styles.body}>
        <div>
          <h1>Your current workplace climate</h1>
          <div className={styles.grid}>
            <div><h3>Your workplace priorities</h3>


            </div>
            <div><h3>Company Perks and Values match</h3>

            </div>
            <div><h3>Your priorities compared</h3>
              <Image
                src={Perf}
                alt="Perf"
                style={{
                  height: "548px",
                  width: "667px",
                }}
              />

            </div>
            <div className={styles.summaries}><h3>Employees are saying</h3>
              <p>
                “Just 4 out of 10 employees feel that the company's public stance on mental health matches their day-to-day experience, citing a disconnect between corporate messaging and the fast-paced, high-stress culture.”
              </p>
              <p>
                “Only 3 out of 10 employees feel that their work-life balance is respected, with many citing high-pressure deadlines and a relentless workload.”
              </p>
              <p>
                “Nearly 9 out of 10 employees say the company fosters an inclusive and collaborative environment, emphasizing open communication and team-driven success.”
              </p>
              <p>
                “8 out of 10 employees report feeling genuinely supported in their professional growth, noting strong mentorship programs and ample learning opportunities.”
              </p>

            </div>
          </div>
          <span className={styles.btnNext} onClick={onClickCompany}>
            Ok, let's pretend I am HR!
          </span>
        </div>
      </div>

    </div >

  </div >
}



