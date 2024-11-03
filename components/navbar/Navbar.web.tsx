import { Link, useRouter } from "expo-router";
import React, { Fragment } from "react";
import { StyleSheet, View } from "react-native";
import { commonStyles } from "@/styles/styles";
import NavButton, { AntDesignIconNames } from "../button/NavButton";
import useDimensions from "@/hook/useDimensions";
import Sidebar from "./Sidebar";
import { MotiView } from "moti";
import Logo from "../logo/Logo";

type Props = {
  userScrollActive: number;
};

function Navbar({ userScrollActive = 0 }: Props) {
  const router = useRouter();
  const { dimensions } = useDimensions();
  const isTablet = dimensions?.window?.width < 960;
  const isPC = dimensions?.window?.width > 960;

  const navItems = [
    {
      title: "Pesquisar",
      icon: "search1",
      onPress: () => {
        router.push("/explore");
      },
    },
    {
      title: "Downloads",
      icon: "download",
      onPress: () => {
        router.push("/download");
      },
    },
    {
      title: "A minha coleção",
      icon: "user",
      onPress: () => {
        router.push("/profile");
      },
    },
  ];

  const items = navItems.map(
    ({ title = "", icon = "", onPress = () => {} }, index) => (
      <Fragment key={index}>
        <NavButton
          title={title}
          icon={icon as AntDesignIconNames}
          onPress={onPress}
        />
      </Fragment>
    )
  );

  const initalPageBtn = (
    <NavButton
      title="Página inicial"
      icon="home"
      onPress={() =>
        router.push({
          pathname: "/",
        })
      }
    />
  );

  return (
    <MotiView
      style={styles.nav}
      animate={{
        backgroundColor: userScrollActive < 1 ? "rgba(0,0,0,0)" : "#222222",
      }}
      transition={{
        duration: 100,
        type: "timing",
      }}
    >
      <View style={[commonStyles.flexRow, { gap: 20 }]}>
        <Link href={"/"}>
          <Logo size="" />
        </Link>
        {isPC && initalPageBtn}
      </View>
      {isTablet ? (
        <Sidebar initalPageBtn={initalPageBtn} items={items} />
      ) : (
        <View style={styles.itemsContainer}>{items}</View>
      )}
    </MotiView>
  );
}

export default Navbar;

const styles = StyleSheet.create({
  nav: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    paddingLeft: 36,
    paddingRight: 36,
    height: 70,
  },
  itemsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
});
