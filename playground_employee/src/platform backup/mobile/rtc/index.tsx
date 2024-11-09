"use client"

import { ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng"
import { useAppSelector, useAppDispatch, VOICE_OPTIONS } from "@/common"
import { ITextItem } from "@/types"
import { rtcManager, IUserTracks, IRtcUser } from "@/manager"
import { setRoomConnected, addChatItem, setVoiceType } from "@/store/reducers/global"
import MicSection from "./micSection"
import CamSection from "./camSection"
//import Agent from "../../pc/rtc/agent"
import Agent from "./agent"
import styles from "./index.module.scss"
import { useRef, useEffect, useState, Fragment } from "react"
import { VoiceIcon } from "@/components/icons"
import CustomSelect from "@/components/customSelect"

let hasInit = false

const Rtc = () => {
  const dispatch = useAppDispatch()
  const options = useAppSelector(state => state.global.options)
  const voiceType = useAppSelector(state => state.global.voiceType)
  const agentConnected = useAppSelector(state => state.global.agentConnected)
  const { userId, channel } = options
  const [videoTrack, setVideoTrack] = useState<ICameraVideoTrack>()
  const [audioTrack, setAudioTrack] = useState<IMicrophoneAudioTrack>()
  const [remoteuser, setRemoteUser] = useState<IRtcUser>()

  useEffect(() => {
    if (!options.channel) {
      return
    }
    if (hasInit) {
      return
    }

    init()

    return () => {
      if (hasInit) {
        destory()
      }
    }
  }, [options.channel])


  const init = async () => {
    console.log("[test] init")
    rtcManager.on("localTracksChanged", onLocalTracksChanged)
    rtcManager.on("textChanged", onTextChanged)
    rtcManager.on("remoteUserChanged", onRemoteUserChanged)
    // await rtcManager.createTracks()
    // await rtcManager.join({ channel, userId })
    // await rtcManager.publish()
    dispatch(setRoomConnected(true))
    hasInit = true
  }

  const destory = async () => {
    console.log("[test] destory")
    rtcManager.off("textChanged", onTextChanged)
    rtcManager.off("localTracksChanged", onLocalTracksChanged)
    rtcManager.off("remoteUserChanged", onRemoteUserChanged)
    // await rtcManager.destroy()
    dispatch(setRoomConnected(false))
    hasInit = false
  }

  const onRemoteUserChanged = (user: IRtcUser) => {
    console.log("[test] onRemoteUserChanged", user)
    setRemoteUser(user)
  }

  const onLocalTracksChanged = (tracks: IUserTracks) => {
    console.log("[test] onLocalTracksChanged", tracks)
    setVideoTrack(tracks.videoTrack)
    setAudioTrack(tracks.audioTrack)
  }

  const onTextChanged = (text: ITextItem) => {
    if (text.dataType == "transcribe") {
      //console.error('text.text', text.text);
      
      const isAgent = Number(text.uid) != Number(userId)
      dispatch(addChatItem({
        userId: text.uid,
        text: text.text.replace(/\bSSML_\w*\b/g, '').replace(/\s+/g, ' ').trim(),
        type: isAgent ? "agent" : "user",
        isFinal: text.isFinal,
        time: text.time
      }))
    }
  }

  const onVoiceChange = (value: any) => {
    dispatch(setVoiceType(value))
  }


  return <section className={styles.rtc}>
    <Agent audioTrack={remoteuser?.audioTrack}></Agent>
    <div className={styles.you}>
      {/*
      <MicSection audioTrack={audioTrack}></MicSection>
      */}
      <CamSection videoTrack={videoTrack}></CamSection>
    </div>
  </section>
}


export default Rtc;
