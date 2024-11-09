"use client"

import { useAppDispatch, useAppSelector, useMultibandTrackVolume } from "@/common"
import { TrulienceAvatar } from 'trulience-sdk';
import { IMicrophoneAudioTrack } from 'agora-rtc-sdk-ng';
import styles from "./index.module.scss";
import { useRef, useState, useEffect } from "react";
import { rtcManager } from "@/manager";
import { ITextItem } from "@/types";
import { FullScreenIcon } from "@/components/icons/fullsccreen";
import { setAvatarLoaded, setFullscreen } from "@/store/reducers/global"
import AmieSquareSplashScreen from "@/assets/splash-images/amie-square-mobile.png"
import Image from "next/image";

interface AgentProps {
  audioTrack?: IMicrophoneAudioTrack
}

const Agent = (props: AgentProps) => {
  // Get the received audio track from parent component
  const { audioTrack } = props;
  var lastChatTime = 0;
  var dance = 0;
  var bg = 0;
  var music = 0;

  // Maintain a ref to the Trulience Avatar component to call methods on it.
  const trulienceAvatarRef = useRef<TrulienceAvatar | null>(null);

  // Keep track of the media stream created from the audio track
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  // Keep track of the agent connection status.
  const agentConnected = useAppSelector(state => state.global.agentConnected)
  const options = useAppSelector(state => state.global.options)
  const { userId } = options

  const isFullscreen = useAppSelector(state => state.global.isFullscreen)
  const isAvatarLoaded = useAppSelector(state => state.global.isAvatarLoaded)
  const appDispatch = useAppDispatch()

  const animStrings = [
    "<trl-anim immediate='true' type='core' id='Routine_07' />",
    "<trl-anim immediate='true' type='core' id='Shuffle_CrossLimbs_F' />",
    "<trl-anim immediate='true' type='core' id='BubblePop_Dance' />",
    "<trl-anim immediate='true' type='core' id='OnTheFloor_Dance' />"
  ];

  const bgStrings = [
    "<trl-load-environment immediate='true' gltf-model='"+process.env.NEXT_PUBLIC_animationURL+"/assets/environments/PsychedelicMountains.glb' position='0 0 0' rotation='0 0 0' scale='1 1 1' />",
    "<trl-load-environment immediate='true' gltf-model='"+process.env.NEXT_PUBLIC_animationURL+"/assets/environments/NorthernLightsForest.glb' position='0 0 0' rotation='0 0 0' scale='1 1 1' />",
    "<trl-load-environment immediate='true' gltf-model='"+process.env.NEXT_PUBLIC_animationURL+"/assets/environments/GraffitiWarehouse.glb' position='0 0 0' rotation='0 0 0' scale='1 1 1' />",
    "<trl-load-environment immediate='true' gltf-model='"+process.env.NEXT_PUBLIC_animationURL+"/assets/environments/ColorfulSunsetBeach.glb' position='0 0 0' rotation='0 0 0' scale='1 1 1' />"
  ];

  const musicString = [
    "<trl-play-background-audio immediate='true' volume='0.1' audio='"+process.env.NEXT_PUBLIC_animationURL+"/assets/audio/music/DanceMusic.mp3' />",
    "<trl-play-background-audio immediate='true' volume='0.1' audio='"+process.env.NEXT_PUBLIC_animationURL+"/assets/audio/music/LoFiMusic.mp3' />",
    "<trl-play-background-audio immediate='true' volume='0.1' audio='"+process.env.NEXT_PUBLIC_animationURL+"/assets/audio/music/LoFiMusic.mp3' />",
    "<trl-play-background-audio immediate='true' volume='0.1' audio='"+process.env.NEXT_PUBLIC_animationURL+"/assets/audio/music/DanceMusic.mp3' />"
  ];

  function getDance() {
    let ret = animStrings[dance++]
    if (dance > animStrings.length - 1) {
      dance = 0;
    }
    return ret;
  }

  function getMusic() {
    let ret = musicString[music++]
    if (music > musicString.length - 1) {
      music = 0;
    }
    return ret;
  }

  function getBG() {
    let ret = bgStrings[bg++]
    if (bg > bgStrings.length - 1) {
      dance = 0;
    }
    return ret;
  }

  // Forward the received messages to avatar.
  if (trulienceAvatarRef.current == null) {
    console.log('adding listener', trulienceAvatarRef);
    rtcManager.on("textChanged", (textItem: ITextItem) => {
      if (textItem.isFinal && textItem.dataType == "transcribe" && textItem.time != lastChatTime) {
        const isAgent = Number(textItem.uid) != Number(userId);
        if (isAgent) {
          let trulienceObj = trulienceAvatarRef.current?.getTrulienceObject();
          //console.log("Received message for avatar - ", lastChatTime, textItem.time);
          lastChatTime = textItem.time;
          let ssml = "";
          if (textItem.text.includes('SSML_DANCE')) {
            ssml = getDance();
          } else if (textItem.text.includes('SSML_KISS')) {
            ssml = "<trl-anim immediate='true' type='aux' id='kiss' audio='"+process.env.NEXT_PUBLIC_animationURL+"/assets/audio/female/kiss.mp3' />";
          } else if (textItem.text.includes('SSML_CHANGE_BG')) {
            ssml = getBG();
          } else if (textItem.text.includes('SSML_CHANGE_MUSIC')) {
            ssml = getMusic();
          } else if (textItem.text.includes('SSML_MUSIC_STOP')) {
            ssml = "<trl-stop-background-audio immediate='true' />";
          }

          if (ssml.length > 0) {
            console.log("Play ssml " + ssml);
            trulienceObj?.sendMessageToAvatar(ssml);
          }
        }
      }
    });
  }

  useEffect(() => {
    // create media stream if audioTrack changes and agent is connected.
    if (audioTrack && agentConnected && trulienceAvatarRef.current) {
      // Create and set the media stream object.
      const stream = new MediaStream([audioTrack.getMediaStreamTrack()]);
      // Set the media stream to make avatar speak the text.
      trulienceAvatarRef.current?.setMediaStream(null);
      trulienceAvatarRef.current?.setMediaStream(stream);
      console.log("Created MediaStream = ", stream, audioTrack);
    }

    if (!agentConnected && trulienceAvatarRef.current) {
      trulienceAvatarRef.current?.getTrulienceObject()?.sendMessageToAvatar("<trl-stop-background-audio immediate='true' />");
    }

    return () => {
      console.log("Cleanup - setting media-stream null", trulienceAvatarRef.current);
      if(trulienceAvatarRef.current)
        trulienceAvatarRef.current.setMediaStream(null);
    };
  }, [audioTrack, agentConnected]);

  // hide and show joystick(nipple)
  useEffect(() => {
    let message = ""
    if(agentConnected) {
      message = "<trl-enable-joystick />"
    } else {
      message = "<trl-disable-joystick />"
    }
    trulienceAvatarRef.current?.getTrulienceObject()?.sendMessageToAvatar(message)
  }, [agentConnected])
  

  // Sample for listening to truilence notifications.
  // Refer https://trulience.com/docs#/client-sdk/sdk?id=trulience-events for a list of all the events fired by Trulience SDK.
  const authSuccessHandler = (resp: string) => {
    console.log("In callback authSuccessHandler resp = ", resp);
  }

  const websocketConnectHandler = (resp: string) => {
    console.log("In callback websocketConnectHandler resp = ", resp);
    trulienceAvatarRef.current?.getTrulienceObject()?.sendMessageToAvatar("<trl-disable-joystick />")
  }

  const loadProgress = (progressDetails: { [key: string]: any }) => {
    console.log("In callback loadProgress progressDetails = ", progressDetails);
    if (trulienceAvatarRef.current && progressDetails && progressDetails.percent && progressDetails.percent === 1) {
      trulienceAvatarRef.current?.getTrulienceObject()?.sendMessageToAvatar("<trl-disable-joystick />")
      console.log("In callback loadProgress percent = ", progressDetails.percent);
      trulienceAvatarRef.current?.getTrulienceObject()?.sendMessageToAvatar("<trl-load animations='"+process.env.NEXT_PUBLIC_animationURL+"/assets/characters/Amie_Rigged_cmp/Amie_Dances.glb' />");
      console.log("anims loaded in loadProgress");

      // set avatar loaded
      appDispatch(setAvatarLoaded(true))
    }
  }

  const eventCallbacks = {
    "auth-success": authSuccessHandler,
    "websocket-connect": websocketConnectHandler,
    "load-progress": loadProgress
  }

  return (
    <div className={`${styles.agent} ${isFullscreen ? styles.fullscreenContainer : ""}`}>
      <div
        className={styles.fullScreenIcon}
        onClick={() => appDispatch(setFullscreen(!isFullscreen))}
      >
        <FullScreenIcon active={isFullscreen} />
      </div>

      <TrulienceAvatar
        url={process.env.NEXT_PUBLIC_trulienceSDK}
        ref={trulienceAvatarRef}
        avatarId={process.env.NEXT_PUBLIC_avatarId ? process.env.NEXT_PUBLIC_avatarId : ""}
        token={process.env.NEXT_PUBLIC_avatarToken}
        eventCallbacks={eventCallbacks}
        width="100%"
        height="100%"
      ></TrulienceAvatar>

      {/* Show splash screen until avatar loads */}
      {!agentConnected && (
        <Image
          src={AmieSquareSplashScreen}
          alt="SplashScreen"
          className={styles.splashScreen}
        />
      )}
    </div>
  );
}
export default Agent;
