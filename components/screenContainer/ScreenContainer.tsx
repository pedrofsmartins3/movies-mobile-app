import React, { useRef, useState } from "react";
import { Platform } from "react-native";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePathname } from "expo-router";
import Navbar from "../navbar/Navbar";

type Props = { children: any };

export default function ScreenContainer({ children }: Props) {
  const isWEB = Platform.OS === "web";
  const scrollViewREF = useRef<ScrollView>(null);
  const [userScroll, setUserScroll] = useState<number>(0);
  const pathname = usePathname();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setUserScroll(event.nativeEvent.contentOffset.y);
  };

  const noTopPadding = pathname === "/" || pathname === "/detail";

  return (
    <SafeAreaView
      style={{
        height: "100%",
        backgroundColor: "#000",
        paddingTop: noTopPadding ? 0 : isWEB ? 80 : 0,
      }}
    >
      <Navbar userScrollActive={userScroll} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollViewREF}
        onScroll={handleScroll}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
