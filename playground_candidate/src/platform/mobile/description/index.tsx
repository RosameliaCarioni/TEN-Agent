import { setAgentConnected } from "@/store/reducers/global"
import {
  DESCRIPTION, useAppDispatch, useAppSelector, apiPing, genUUID,
  apiStartService, apiStopService
} from "@/common"
import { message } from "antd"
import { useEffect, useState } from "react"
import { LoadingOutlined, } from "@ant-design/icons"
import styles from "./index.module.scss"
import { rtcManager } from "@/manager"
const { AGENT_SERVER_URL } = process.env;

let intervalId: any

const Description = () => {
  const dispatch = useAppDispatch()
  const agentConnected = useAppSelector(state => state.global.agentConnected)
  const channel = useAppSelector(state => state.global.options.channel)
  const userId = useAppSelector(state => state.global.options.userId)
  const language = useAppSelector(state => state.global.language)
  const voiceType = useAppSelector(state => state.global.voiceType)
  const graphName = useAppSelector(state => state.global.graphName)
  const isAvatarLoaded = useAppSelector(state => state.global.isAvatarLoaded)
  const overridenProperties = useAppSelector(state => state.global.overridenProperties)
  const [loading, setLoading] = useState(false)

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
      await rtcManager.destroy()
      await apiStopService(channel)
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

  // Show a loading indicator while connecting or loading the avatar.
  const showLoading = loading || !isAvatarLoaded

  return <div className={styles.description}>
    <span className={styles.title}>Aime 2024</span>
    <span
      onClick={onClickConnect}
      className={`${styles.btnConnect} ${agentConnected ? styles.disconnect : ''} ${!isAvatarLoaded ? styles.disabled : ''}`}
    >
      <span className={`${styles.btnText} ${agentConnected ? styles.disconnect : ''}`}>
        {!isAvatarLoaded ? "Loading " : !agentConnected ? "Connect" : "Disconnect"}
        {showLoading ? <LoadingOutlined className={styles.loading}></LoadingOutlined> : null}
      </span>
    </span>
  </div>
}


export default Description
