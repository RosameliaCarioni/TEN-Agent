import { setAgentConnected } from "@/store/reducers/global"
import {

  DESCRIPTION, useAppDispatch, useAppSelector, VOICE_OPTIONS, apiPing, genUUID,
  apiStartService, apiStopService,
  LANGUAGE_OPTIONS,
  GRAPH_OPTIONS,
  isRagGraph

} from "@/common"
import { Select, Button, message, Upload } from "antd"
import { useEffect, useState, MouseEventHandler } from "react"
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons"
import styles from "./index.module.scss"
import CustomSelect from "@/components/customSelect"
import { VoiceIcon } from "@/components/icons"
import { setVoiceType } from "@/store/reducers/global"
import { setGraphName, setLanguage } from "@/store/reducers/global"
import PdfSelect from "@/components/pdfSelect"
import { NextRequest, NextResponse } from 'next/server';
import { rtcManager } from "@/manager"
import { useRouter } from "next/navigation"
const { AGENT_SERVER_URL } = process.env;


let intervalId: any

const Description = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const agentConnected = useAppSelector(state => state.global.agentConnected)
  const channel = useAppSelector(state => state.global.options.channel)
  const userId = useAppSelector(state => state.global.options.userId)
  const language = useAppSelector(state => state.global.language)
  const voiceType = useAppSelector(state => state.global.voiceType)
  const graphName = useAppSelector(state => state.global.graphName)
  const isAvatarLoaded = useAppSelector(state => state.global.isAvatarLoaded)
  const [loading, setLoading] = useState(false)
  const overridenProperties = useAppSelector(state => state.global.overridenProperties)

  useEffect(() => {
    if (channel) {
      checkAgentConnected()
    }
  }, [channel])


  const checkAgentConnected = async () => {
    const res: any = await apiPing(channel)
    if (res?.code == 0) {
      dispatch(setAgentConnected(true))
    }
  }

  const onClickConnect = async () => {
    if (loading) {
      return
    }
    setLoading(true)
    if (agentConnected) {
      await apiStopService(channel)
      await rtcManager.destroy()
      dispatch(setAgentConnected(false))
      message.success("Nova disconnected")
      stopPing()
    } else {
      let properties: Record<string, any> = overridenProperties[graphName] || {}
      await rtcManager.connect({ channel, userId })
      const res = await apiStartService({
        channel,
        userId,
        graphName,
        language,
        voiceType,
        properties
      })
      const { code, msg } = res || {}
      if (code != 0) {
        if (code == "10001") {
          message.error("The number of users experiencing the program simultaneously has exceeded the limit. Please try again later.")
        } else {
          message.error(`code:${code},msg:${msg}`)
        }
        setLoading(false)
        throw new Error(msg)
      }
      dispatch(setAgentConnected(true))
      message.success("Nova connected")
      startPing()
    }
    setLoading(false)
  }

  const onClickNext = async () => {

    if (loading) {
      return
    }
    setLoading(true)

    if (agentConnected) {
      await apiStopService(channel)
      await rtcManager.destroy()
      dispatch(setAgentConnected(false))
      dispatch(setGraphName("agent_candidate_reveal"))
      stopPing()
    }

    let properties: Record<string, any> = overridenProperties[graphName] || {}
    await rtcManager.connect({ channel, userId })
    const res = await apiStartService({
      channel,
      userId,
      graphName,
      language,
      voiceType,
      properties
    })
    const { code, msg } = res || {}
    if (code != 0) {
      if (code == "10001") {
        message.error("The number of users experiencing the program simultaneously has exceeded the limit. Please try again later.")
      } else {
        message.error(`code:${code},msg:${msg}`)
      }
      setLoading(false)
      throw new Error(msg)
    }
    dispatch(setAgentConnected(true))
    message.success("Nova connected")
    startPing()
    setLoading(false)



  }

  const onClickStats = async () => {
    if (agentConnected) {
      await apiStopService(channel)
      await rtcManager.destroy()
      dispatch(setAgentConnected(false))
      stopPing()
    }
    router.push("/stats")
  }

  const startPing = () => {
    if (intervalId) {
      stopPing()
    }
    intervalId = setInterval(() => {
      apiPing(channel)
    }, 3000)
  }

  const stopPing = () => {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }
  const onVoiceChange = (value: any) => {
    dispatch(setVoiceType(value))
  }

  const onGraphNameChange = (val: any) => {
    dispatch(setGraphName(val))
  }

  const onLanguageChange = (val: any) => {
    dispatch(setLanguage(val))
  }


  // Show a loading indicator while connecting or loading the avatar.
  const showLoading = loading || !isAvatarLoaded

  return <div className={styles.description}>

    <span className={styles.text}>Nova is an intelligent companion for scouting positions in companies aligning with your values and well being</span>
    {/*
    <CustomSelect className={styles.voiceSelect}
        disabled={agentConnected}
        value={voiceType}
        prefixIcon={<VoiceIcon></VoiceIcon>}
        options={VOICE_OPTIONS} onChange={onVoiceChange}></CustomSelect>
   */}
    <span className={styles.left}>
    </span>
    <span className={styles.right}>
      {/* <Select className={styles.graphName}
        disabled={agentConnected} options={GRAPH_OPTIONS}
        value={graphName} onChange={onGraphNameChange}></Select> */}

      {/*
        <Select className={styles.languageSelect}
          disabled={agentConnected} options={LANGUAGE_OPTIONS}
          value={language} onChange={onLanguageChange}></Select>
         */}
      {isRagGraph(graphName) ? <PdfSelect></PdfSelect> : null}
    </span>


    <span className={`${styles.btnConnect} ${agentConnected ? styles.disconnect : ''} ${!isAvatarLoaded ? styles.disabled : ''}`} onClick={onClickConnect}>
      <span className={`${styles.btnText} ${agentConnected ? styles.disconnect : ''}`}>
        {!isAvatarLoaded ? "Loading " : !agentConnected ? "Connect" : "Disconnect"}
        {showLoading ? <LoadingOutlined className={styles.loading}></LoadingOutlined> : null}
      </span>
    </span>

    {agentConnected && graphName !== "agent_candidate_reveal" ? <span className={styles.btnNext} onClick={onClickNext}>
      Ok, let's move on.
    </span> : null}

    {agentConnected && graphName === "agent_candidate_reveal" ? <span className={styles.btnNext} onClick={onClickStats}>
      Visualize results
    </span> : null}
  </div>
}


export default Description
