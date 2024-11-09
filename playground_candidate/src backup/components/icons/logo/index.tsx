import { IconProps } from "../types"
import AOTLog from "@/assets/aot-logo.png"
import Image from "next/image"

export const LogoIcon = (props: IconProps) => {
  const { size = "default" } = props;
  return (
    <Image
      src={AOTLog}
      alt="Logo"
      style={{
        height: size == "small" ? "36px" : "42px",
        width: "auto",
      }}
    />
  );
};
