import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
} from "react-native";
import { data } from "./data";

const { width, height } = Dimensions.get("screen");

const imageW = width * 0.7;
const imageH = imageW * 1.54;

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={StyleSheet.absoluteFillObject}>
        {data.map((image, index) => {
          return (
            <Image
              key={`image-${index}`}
              source={{ uri: image }}
              style={[StyleSheet.absoluteFillObject]}
              blurRadius={10}
            />
          );
        })}
      </View>
      <FlatList
        horizontal
        scrollEventThrottle={16}
        pagingEnabled
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <View
              style={{ width, alignItems: "center", justifyContent: "center" }}
            >
              <Image
                source={{ uri: item }}
                style={{ width: imageW, height: imageH }}
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
