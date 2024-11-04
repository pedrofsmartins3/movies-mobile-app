import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect, useRef, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import Button from "../button/Button";
import { Skeleton } from "moti/skeleton";

type Props = { isSerie: boolean; loading: boolean };

export default function VideoPlayer({
  isSerie = false,
  loading = true,
}: Props) {
  const isWEB = Platform.OS === "web";
  const ref = useRef<VideoView>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isVideoVisible, setVideoVisible] = useState<boolean>(false);
  const player = useVideoPlayer(
    require("../../assets/videos/big_buck_bunny.mp4"),
    (player) => {
      player.loop = true;
      player.pause();
    }
  );

  useEffect(() => {
    const subscription = player.addListener("playingChange", (isPlaying) => {
      setIsPlaying(isPlaying);
    });

    return () => {
      subscription.remove();
    };
  }, [player]);

  const handleButtonPress = () => {
    setVideoVisible(true);
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
      setTimeout(() => {
        ref.current?.enterFullscreen();
      }, 100);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.contentContainer}>
      {loading ? (
        <Skeleton width={"100%"} height={50} />
      ) : (
        <>
          {isVideoVisible && (
            <VideoView
              ref={ref}
              style={[isWEB ? styles.WEBvideo : styles.video]}
              player={player}
              allowsFullscreen
              allowsPictureInPicture
            />
          )}
          <View style={styles.buttonContainer}>
            <Button
              title={
                isPlaying ? "Pausa" : isSerie ? "Ver 1º episódio" : "Ver filme"
              }
              icon=""
              variant=""
              onPress={handleButtonPress}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  video: {
    width: 350,
    height: 275,
  },
  WEBvideo: {
    width: 700,
    height: 550,
  },
  buttonContainer: {
    padding: 10,
  },
});
