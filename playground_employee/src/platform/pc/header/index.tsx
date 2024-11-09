"use client"

import { useAppSelector, GITHUB_URL, useSmallScreen } from "@/common"
import Network from "./network"
import InfoPopover from "./infoPopover"
import StylePopover from "./stylePopover"
import { GithubIcon, LogoIcon, InfoIcon, ColorPickerIcon } from "@/components/icons"

import styles from "./index.module.scss"

const Header = () => {
  const themeColor = useAppSelector(state => state.global.themeColor)
  const options = useAppSelector(state => state.global.options)
  const { channel } = options


  const onClickGithub = () => {
    if (typeof window !== "undefined") {
      window.open(GITHUB_URL, "_blank")
    }
  }



  return <div className={styles.header}>
    <span className={styles.logoWrapper}>
      <LogoIcon></LogoIcon>
    </span>
    <InfoPopover>
      <span className={styles.content}>
        <span className={styles.text}>Meet Nova&nbsp;</span>
      </span>
    </InfoPopover>
    <div className={styles.links}>
      <Network></Network>
    </div>
  </div>
}


export default Header
