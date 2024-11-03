import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

type Props = {
  image: string;
  children: any;
};

export default function BannerContainer({ image, children }: Props) {
  return (
    <ImageBackground
      source={{
        uri: `https://image.tmdb.org/t/p/original/${image}`,
      }}
      style={styles.backgroundImage}
      imageStyle={{ resizeMode: "cover" }}
    >
      <View style={styles.topShadow}>
        <LinearGradient
          colors={["rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 0)"]}
          style={styles.gradient}
        />
      </View>
      <View style={styles.leftShadow}>
        <LinearGradient
          colors={["rgba(0, 0, 0, 0.1)", "rgba(0, 0, 0, 1)"]}
          style={styles.gradient}
        />
      </View>
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    height: "100%",
    width: "100%",
  },
  topShadow: {
    position: "absolute",
    left: 0,
    top: -10,
    right: 0,
    height: "40%",
    zIndex: 10,
  },
  leftShadow: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "100%",
    zIndex: 10,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
