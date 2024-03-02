import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, Text, Image, StyleSheet } from "react-native";
import { encode } from "base-64";
import { SvgCssUri } from "react-native-svg/css";

import tarenaMarch2024 from "../data/2024-03-tarena";

const MoonCard = () => {
  const [moonPhaseImage, setMoonPhaseImage] = useState(null);
  const [error, setError] = useState(null);
  const [todayMoonPhase, setTodayMoonPhase] = useState(null);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format
    console.log(today);

    const todayMoonPhaseData = tarenaMarch2024.find(
      (phase) => phase.date === today
    ); // Find the moon phase for today

    const API_ASTRONOMY =
      "https://api.astronomyapi.com/api/v2/studio/moon-phase";
    const API_ID = "d7ac534d-9b39-4934-b9fc-cc0f0d8c64fd";
    const API_KEY =
      "76681a9b51264cebd8eddb8c40caa3fc1867efcf9ed844a6c5581376b2abeae97f5fa5e396f02c899b9e19cf9957d90b110c68edacca7164a011cd0dd03160c5ec4438e0b7c7008dd6f3b0a5911cddf20d8620b1470d975fc9f3e45750d1502da6b43008982caf59617b60aadbe08890";

    if (todayMoonPhaseData) {
      setTodayMoonPhase(todayMoonPhaseData);
      const data = JSON.stringify({
        format: "svg",
        style: {
          moonStyle: "default",
          backgroundStyle: "solid",
          backgroundColor: "#000",
          headingColor: "#000",
          textColor: "#000",
        },
        observer: {
          latitude: 33.775867,
          longitude: -84.39733,
          date: today,
        },
        view: {
          type: "portrait-simple",
          parameters: {},
        },
      });

      fetch(API_ASTRONOMY, {
        method: "POST",
        headers: {
          Authorization: `Basic ${encode(`${API_ID}:${API_KEY}`)}`, // Encoding API_ID and API_KEY in base64
          "Content-Type": "application/json",
        },
        body: data,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((responseData) => {
          if (responseData.data && responseData.data.imageUrl) {
            setMoonPhaseImage(responseData.data.imageUrl); // Assuming the image URL is directly under data
          } else {
            setError("Moon image data is missing.");
          }
        })
        .catch((error) => {
          setError(error.message);
        });
      console.log(moonPhaseImage);
    } else {
      setError("Moon phase not found for today's date"); // Fallback message
    }
  }, []);
  console.log(moonPhaseImage);

  return (
    <View style={styles.container}>
      {error ? (
        <Text>Error: {error}</Text>
      ) : moonPhaseImage ? (
        <>
          <SvgCssUri width="100%" height="100%" uri={moonPhaseImage} />
        </>
      ) : (
        <Text>Loading moon phase...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: -150,
    zIndex: -2,
  },
  h1: {
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default MoonCard;
