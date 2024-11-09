import { IconProps } from "../types"
import LogoSvg from "@/assets/yellow-heart-24.svg"
import SmallLogoSvg from "@/assets/yellow-heart-24.svg"

export const HeartIcon = (props: IconProps) => {
  const { size = "default" } = props
  return size == "small" ? <SmallLogoSvg {...props}></SmallLogoSvg> : <LogoSvg {...props}></LogoSvg>
}
