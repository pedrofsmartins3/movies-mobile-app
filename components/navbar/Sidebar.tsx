import { commonStyles } from "@/styles/styles";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link } from "expo-router";
import { MotiView } from "moti";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
type Props = { initalPageBtn: any; items: any };

export default function Sidebar({ initalPageBtn, items }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Pressable onPress={() => setExpanded(!expanded)} style={[styles.button]}>
        <MotiView
          animate={{ scale: expanded ? 1.5 : 1 }}
          transition={{
            duration: 150,
            type: "timing",
          }}
        >
          <FontAwesome6 name="bars" size={24} color="white" />
        </MotiView>
      </Pressable>
      <MotiView
        style={styles.mobileNav}
        animate={{ right: expanded ? 0 : -300 }}
        transition={{
          duration: 300,
          type: "timing",
        }}
      >
        <View style={[commonStyles.flexCol]}>
          <View
            style={[
              commonStyles.flexRow,
              { justifyContent: "space-between", width: 200 },
            ]}
          >
            <Link href={"/"}>
              <Image
                source={require("../../assets/images/movies_white.png")}
                style={{ width: 80, height: 80 }}
              />
            </Link>
            <AntDesign
              name="closecircle"
              size={36}
              color="#fff"
              onPress={() => setExpanded(false)}
            />
          </View>
          {initalPageBtn}
          {items}
        </View>
      </MotiView>
      {
        <>
          {expanded && (
            <TouchableOpacity
              style={styles.blur}
              onPress={() => setExpanded(false)}
            />
          )}
        </>
      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#111",
    padding: 8,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  mobileNav: {
    backgroundColor: "#222",
    position: "absolute",
    width: "90%",
    maxWidth: 300,
    height: 400,
    top: 0,
    bottom: 0,
    gap: 16,
    zIndex: 50,
    padding: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  blur: {
    position: "absolute",
    width: 1200,
    height: 1200,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
    zIndex: 30,
  },
});
