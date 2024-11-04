import { LinearGradient } from "expo-linear-gradient";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { ImageBackground, Platform, StyleSheet, View } from "react-native";

type Props = {
  image: string;
  loading: boolean;
  children: any;
};

export default function BannerContainer({
  image,
  children,
  loading = true,
}: Props) {
  const isWEB = Platform.OS === "web";

  return (
    <View style={[isWEB ? styles.containerWeb : styles.container]}>
      {loading ? (
        <Skeleton width="100%" height={isWEB ? 500 : 300} />
      ) : (
        <>
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
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    height: 300,
    width: "100%",
    position: "relative",
  },
  containerWeb: {
    marginVertical: 0,
    height: 500,
    width: "100%",
    position: "relative",
  },
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
