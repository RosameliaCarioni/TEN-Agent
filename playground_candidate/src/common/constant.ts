import { IOptions, ColorItem, LanguageOptionItem, VoiceOptionItem, GraphOptionItem } from "@/types"
export const GITHUB_URL = "https://github.com/RosameliaCarioni/TEN-Agent/tree/junction"
export const AGORA_URL = "https://www.agora.io/en/"
export const AAVA_URL = "https://www.aava.fi/"
export const OPTIONS_KEY = "__options__"
export const DEFAULT_OPTIONS: IOptions = {
  channel: "",
  userName: "",
  userId: 0
}
export const DESCRIPTION = "This is an AI voice assistant powered by ASTRA.ai framework, Agora, Azure and ChatGPT."
export const LANGUAGE_OPTIONS: LanguageOptionItem[] = [
  {
    label: "English",
    value: "en-US"
  },
  {
    label: "Chinese",
    value: "zh-CN"
  },
  {
    label: "Korean",
    value: "ko-KR"
  },
  {
    label: "Japanese",
    value: "ja-JP"
  }
]
export const GRAPH_OPTIONS: GraphOptionItem[] = [
  {
    label: "Candidate",
    value: "agent_candidate",
  },
  {
    label: "Candidate Results",
    value: "agent_candidate_reveal",
  },
  {
    label: "Employee",
    value: "agent_employee",
  }
]

export const isRagGraph = (graphName: string) => {
  return graphName === "va.qwen.rag"
}

export const VOICE_OPTIONS: VoiceOptionItem[] = [
  {
    label: "Male",
    value: "male"
  },
  {
    label: "Female",
    value: "female"
  }
]
export const COLOR_LIST: ColorItem[] = [{
  active: "#fff",
  default: "#143354"
}, {
  active: "#563FD8",
  default: "#2C2553"
},
{
  active: "#18A957",
  default: "#173526"
}, {
  active: "#FFAB08",
  default: "#423115"
}, {
  active: "#FD5C63",
  default: "#462629"
}, {
  active: "#E225B2",
  default: "#481C3F"
}]

export type VoiceTypeMap = {
  [voiceType: string]: string;
};

export type VendorNameMap = {
  [vendorName: string]: VoiceTypeMap;
};

export type LanguageMap = {
  [language: string]: VendorNameMap;
};
