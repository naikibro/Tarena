import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
  View,
  Image,
  Dimensions,
  SafeAreaView,
} from "react-native";

import tarenaMarch2024 from "./data/2024-03-tarena";
import tarenaData from "./data/tarena.json";
import MoonCard from "./components/MoonCard";

const TarenaCard = ({ moon, fishingAdvice, plantingAdvice }) => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        backgroundColor: "lightgray",
        padding: 20,
        marginHorizontal: 15,
        marginBottom: 60,
        borderRadius: 20,
      }}
    >
      <Text style={{ color: "black", fontSize: 40 }}>{moon}</Text>
      <Text style={{ color: "black", marginVertical: 10, fontSize: 15 }}>
        {fishingAdvice}
      </Text>

      <Text style={{ color: "black", marginVertical: 10, fontSize: 15 }}>
        {plantingAdvice}
      </Text>
    </View>
  );
};

export default function App() {
  const [moonPhase, setMoonPhase] = useState("");
  const [fishingAdvice, setFishingAdvice] = useState("");
  const [plantingAdvice, setPlantingAdvice] = useState("");
  const [todayDate, setTodayDate] = useState("");

  useEffect(() => {
    const getFormattedDate = () => {
      const date = new Date();
      const day = ("0" + date.getDate()).slice(-2);
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      return `${year}-${month}-${day}`;
    };

    const today = getFormattedDate();
    setTodayDate(today);

    const todayMoonPhase =
      tarenaMarch2024.find((item) => item.date === today)?.moonPhase ||
      "Moon phase not available for today";
    setMoonPhase(todayMoonPhase);

    const todayData = tarenaData.find((data) => data.moon === todayMoonPhase);
    if (todayData) {
      setFishingAdvice(todayData.fish || "No fishing advice available");
      setPlantingAdvice(todayData.plants || "No planting advice available");
    } else {
      setFishingAdvice("No fishing advice available");
      setPlantingAdvice("No planting advice available");
    }
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView style={styles.container}>
        <Text style={{ color: "white", marginTop: 20, fontSize: 30 }}>
          {todayDate}
        </Text>
        <MoonCard date={todayDate} />
        <Image
          source={require("./assets/dsk2.png")}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            opacity: 0.1,
            alignSelf: "center",
          }}
        />
        <TarenaCard
          moon={moonPhase}
          fishingAdvice={fishingAdvice}
          plantingAdvice={plantingAdvice}
        />
        <StatusBar style="auto" />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "black",
  },
});
