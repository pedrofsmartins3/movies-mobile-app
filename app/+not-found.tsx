import ScreenContainer from "@/components/screencontainer/ScreenContainer";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <ScreenContainer>
        <View style={styles.content}>
          <Text style={styles.text}>This screen doesn't exist.</Text>
          <Link href="/" style={styles.link}>
            <Text style={styles.text}>Go to home screen!</Text>
          </Link>
        </View>
      </ScreenContainer>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  text: { color: "#fff" },
});
