import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, StatusBar, Text, View } from "react-native";

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
        margin: 15,
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

  useEffect(() => {
    const getFormattedDate = () => {
      const date = new Date();
      const day = ("0" + date.getDate()).slice(-2);
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      return `${year}-${month}-${day}`;
    };

    const today = getFormattedDate();
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
      <Text></Text>
      <MoonCard />
      <TarenaCard
        moon={moonPhase}
        fishingAdvice={fishingAdvice}
        plantingAdvice={plantingAdvice}
      />
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
