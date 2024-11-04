import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import useDimensions from "@/hook/useDimensions";
import BannerContainer from "./BannerContainer";

type Props = {
  title: string;
  image: string;
  isLoading: boolean;
};

function DetailBanner({ title = "", image = "", isLoading = true }: Props) {
  const { dimensions } = useDimensions();
  const isMobile = dimensions.window.width < 480;
  const loading = isLoading || !title || !image;
  const isWEB = Platform.OS === "web";

  return (
    <BannerContainer image={image || ""} loading={loading || !image}>
      <View style={[isWEB && !isMobile ? styles.contentWeb : styles.content]}>
        <Text style={[styles.title, isWEB && !isMobile && styles.titleWeb]}>
          {title}
        </Text>
      </View>
    </BannerContainer>
  );
}

export default DetailBanner;

const styles = StyleSheet.create({
  content: {
    position: "absolute",
    bottom: 12,
    left: 16,
    right: 16,
    zIndex: 30,
    maxWidth: "90%",
    display: "flex",
    gap: 16,
  },
  contentWeb: {
    position: "absolute",
    bottom: 50,
    left: 100,
    right: 20,
    zIndex: 30,
    maxWidth: "90%",
    display: "flex",
    gap: 16,
  },
  title: {
    fontSize: 48,
    fontWeight: "800",
    color: "#fff",
  },
  titleWeb: {
    fontSize: 72,
  },
});
