import React from "react";
import { Image } from "react-native";

type Props = { size: string };

export default function Logo({ size }: Props) {
  const small = size === "small";
  return (
    <Image
      source={require("../../assets/images/movies_white.png")}
      style={{ width: small ? 60 : 80, height: small ? 60 : 80 }}
    />
  );
}
