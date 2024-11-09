"use client"

import packageData from "../../../package.json"
import { useRouter } from 'next/navigation'
import { message } from "antd"
import { useState } from "react"
import { GithubIcon, LogoH, AavaIcon } from "../icons"
import { GITHUB_URL, getRandomUserId, useAppDispatch, getRandomChannel, AGORA_URL, AAVA_URL } from "@/common"
import { setOptions } from "@/store/reducers/global"
import styles from "./index.module.scss"
import { LoadingOutlined } from "@ant-design/icons"


const { version } = packageData

const LoginCard = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [userName, setUserName] = useState("")
  const [loading, setLoading] = useState(false)

  const onClickGithub = () => {
    if (typeof window !== "undefined") {
      window.open(GITHUB_URL, "_blank")
    }
  }

  const onClickLogo = () => {
    if (typeof window !== "undefined") {
      window.open(AGORA_URL, "_blank")
    }
  }

  const onClickAava = () => {
    if (typeof window !== "undefined") {
      window.open(AAVA_URL, "_blank")
    }
  }

  const onUserNameChange = (e: any) => {
    let value = e.target.value
    value = value.replace(/\s/g, "");
    setUserName(value)
  }

  const onFocus = (event: any) => {
    event.target.setAttribute('autocomplete', 'off');
  }

  const onClickJoin = () => {
    if (!userName) {
      message.error("please input your name")
      return
    }

    setLoading(true)
    const userId = getRandomUserId()
    dispatch(setOptions({
      userName,
      channel: getRandomChannel(),
      userId
    }))
    router.push("/home")
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onClickJoin();
    }
  };

  return <div className={styles.card}>
    <section className={styles.top}>
      <span className={styles.github} onClick={onClickGithub}>
        <GithubIcon></GithubIcon>
        <span className={styles.text}>GitHub</span>
      </span>
    </section>
    <section className={styles.content}>
      <div className={styles.title}>
        <LogoH transform="scale(0.3)" margin-bottom="-100px" margin-top="-100px" margin-left="-100px" margin-right="-100px"></LogoH>
        <span className={styles.text}> Your professional journey<br></br>healthier & happier</span>
      </div>
      <div className={styles.section}>
        <input
          key="input-box"
          placeholder="Name"
          value={userName}
          name={"name " + Math.random()}
          onChange={onUserNameChange}
          onKeyDown={handleKeyDown}
          onFocus={onFocus}
          autoComplete="off"
        ></input>
      </div>
      <div className={styles.section}>
        <div className={styles.btn} onClick={onClickJoin}>
          <span className={styles.btnText}>Enter</span>
          {loading ? <LoadingOutlined className={styles.loading}></LoadingOutlined> : null}
        </div>
      </div>
      <div className={styles.version}>Junction 2024 Challenge<br></br><br></br>ThriveConnect: Redefine Work Well-Being by</div>
      <div className={styles.aava}>
        <AavaIcon onClick={onClickAava}></AavaIcon>
      </div>
    </section >
  </div >

}

export default LoginCard
