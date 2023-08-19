import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
  Animated,
} from "react-native";
import { data } from "./data";
import { useRef } from "react";

const { width, height } = Dimensions.get("screen");

const imageW = width * 0.7;
const imageH = imageW * 1.54;

export default function App() {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={StyleSheet.absoluteFillObject}>
        {data.map((image, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });

          return (
            <Animated.Image
              key={`image-${index}`}
              source={{ uri: image }}
              style={[StyleSheet.absoluteFillObject, { opacity }]}
              blurRadius={50}
            />
          );
        })}
      </View>
      <Animated.FlatList
        horizontal
        scrollEventThrottle={16}
        pagingEnabled
        data={data}
        keyExtractor={(_, index) => index.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item: image }) => {
          return (
            <View
              style={{ width, alignItems: "center", justifyContent: "center" }}
            >
              <Image
                source={{ uri: image }}
                style={{
                  width: imageW,
                  height: imageH,
                  borderRadius: 16,
                  resizeMode: "cover",
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
