import { IChatItem } from "@/types"
import styles from "./index.module.scss"
import { usePrevious } from "@/common"
import { use, useEffect, useMemo, useState } from "react"
import { useSelector } from 'react-redux';
import { RootState } from '@/store/index';

interface ChatItemProps {
  data: IChatItem
}


const AgentChatItem = (props: ChatItemProps) => {
  const { data } = props
  const { text } = data

  return <div className={`${styles.agentChatItem} ${styles.chatItem}`}>
    <span className={styles.left}>
      <span className={styles.userName}>Nc</span>
    </span>
    <span className={styles.right}>
      <div className={`${styles.userName} ${styles.agent}`}>Nico</div>
      <div className={`${styles.text} ${styles.agent}`}>
        {text}
      </div>
    </span>
  </div >
}

const UserChatItem = (props: ChatItemProps) => {
  const { data } = props
  const { text } = data
  const userName = useSelector((state: RootState) => state.global.options.userName);

  return (
    <div className={`${styles.userChatItem} ${styles.chatItem}`}>
      <span className={styles.left}>
        <div className={`${styles.userName} ${styles.user}`}>{userName || 'You'}</div>
        <div className={`${styles.text} ${styles.user}`}>
          {text}
        </div>
      </span>
      <span className={styles.right}>
        <span className={styles.user}>
          <span className={styles.userInitial}>{userName ? userName[0].toUpperCase() : 'Y'}
          </span>
        </span>
      </span>
    </div>
  )
}


const ChatItem = (props: ChatItemProps) => {
  const { data } = props


  return (
    data.type === "agent" ? <AgentChatItem {...props} /> : <UserChatItem {...props} />
  );


}


export default ChatItem
