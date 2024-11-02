import React from "react";
import { Image } from "react-native";

type Props = {};

export default function Logo({}: Props) {
  return (
    <Image
      source={require("../../assets/images/movies_white.png")}
      style={{ width: 80, height: 80 }}
    />
  );
}
