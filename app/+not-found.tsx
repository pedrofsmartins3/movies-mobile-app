import Button from "@/components/button/Button";
import ScreenContainer from "@/components/screenContainer/ScreenContainer";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  const router = useRouter();
  return (
    <ScreenContainer>
      <View style={styles.content}>
        <Text style={styles.text}>Esta página não existe!!</Text>
        <Button
          title="Voltar para a página inicial"
          variant=""
          icon=""
          onPress={() => router.push("/")}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    display: "flex",
    gap: 16,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: { color: "#fff", fontSize: 18 },
});
