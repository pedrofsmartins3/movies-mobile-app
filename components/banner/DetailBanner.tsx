import React from "react";
import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Skeleton } from "moti/skeleton";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  title: string;
  image: string;
  isLoading: boolean;
};

function DetailBanner({ title = "", image = "", isLoading = true }: Props) {
  const loading = isLoading || !title || !image;
  const isWEB = Platform.OS === "web";
  return (
    <View style={[isWEB ? styles.containerWeb : styles.container]}>
      {loading ? (
        <Skeleton width={"100%"} height={isWEB ? 600 : 300} />
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
            <View style={[isWEB ? styles.contentWeb : styles.content]}>
              <Text style={[styles.title, isWEB && styles.titleWeb]}>
                {title}
              </Text>
            </View>
          </ImageBackground>
        </>
      )}
    </View>
  );
}

export default DetailBanner;

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    height: 300,
    width: "100%",
    position: "relative",
  },
  containerWeb: {
    marginVertical: 0,
    height: 450,
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
    left: 40,
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
