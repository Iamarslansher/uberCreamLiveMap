import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable } from "react-native";
import {
  rideRequest,
  onSnapshot,
  db,
  collection,
  orderBy,
  doc,
} from "../config/fireBase";
import { query } from "firebase/firestore";
import MapView, { Marker } from "react-native-maps";

function SelectRide({ route }) {
  const { pickUp, destenation } = route.params;
  const [accepted, setAccepted] = useState("");
  const [status, setStatus] = useState("newRide");
  const [driverAnswer, setDriverAnswer] = useState(false);

  const fares = {
    bike: 150,
    rishka: 170,
    car: 500,
  };
  const pickUpLat = pickUp.geocodes.main.latitude;
  const pickUpLong = pickUp.geocodes.main.longitude;
  const destinationLat = destenation.geocodes.main.longitude;
  const destinationLong = destenation.geocodes.main.longitude;
  const pickUpLocationName = pickUp.name;
  const destenationLocationName = destenation.name;

  const calculateFare = async (vehale) => {
    const { latitude: pickUpLat, longitude: pickUpLong } = pickUp.geocodes.main;
    const { latitude: destinationLat, longitude: destinationLong } =
      destenation.geocodes.main;
    const distance = calcCrow(
      pickUpLat,
      pickUpLong,
      destinationLat,
      destinationLong
    );

    const fare = fares[vehale] * distance;

    await rideRequest({
      pickUpLat,
      pickUpLong,
      destinationLat,
      destinationLong,
      pickUpLocationName,
      destenationLocationName,
      carType: vehale,
      fare,
      status: "compeleted",
      timestamp: Date.now(),
    });
    // alert("Rs." + fare.toFixed(2));
    alert("request send to draiver Please Wait");
    setStatus("compeleted");
  };

  function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

  // Converts numeric degrees to radians
  function toRad(Value) {
    return (Value * Math.PI) / 180;
  }

  // useEffect(() => {
  //   driverMessage();
  // }, []);
  // const driverMessage = () => {
  //   const q = query(collection(db, "location"));
  //   const unsubscribe = onSnapshot(q, (querysnapshot) => {
  //     const rides = [];
  //       querysnapshot.forEach((doc) => {
  //     if (status === "compeleted") {
  //         rides.push(doc.data());
  //         alert("Accepted");
  //         setAccepted(rides);
  //         console.log("condition chali");
  //         setDriverAnswer(true);
  //     }
  //       });
  //     console.log(rides, "rides");
  //   });
  //   return unsubscribe;
  // };

  useEffect(() => {
    driverMessage();
  }, []);
  const driverMessage = () => {
    const q = query(collection(db, "location"));
    const unsubscribe = onSnapshot(q, (querysnapshot) => {
      const rides = [];
      if (status === "compeleted") {
        querysnapshot.forEach((doc) => {
          rides.push(doc.data());
          alert("Accepted");
          // setAccepted(rides);
          // console.log("condition chali");
          // setDriverAnswer(true);
        });
      }
      console.log(rides, "rides");
    });
    return unsubscribe;
  };

  return (
    <>
      {!accepted && (
        <View>
          <Text>your pick up location is :</Text>
          <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>
            {pickUp.name} , {pickUp.location.address}
          </Text>
          <Text>your Destenation location is :</Text>
          <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>
            {destenation.name} ,{destenation.location.address}
          </Text>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
              marginTop: 20,
            }}
          >
            <Pressable onPress={() => calculateFare("bike")}>
              <Image
                source={{
                  uri: "https://i.pinimg.com/originals/fe/a9/2f/fea92f50aa6db93e3a5e9ae9aa27b2a7.gif",
                }}
                style={{ width: 160, height: 160 }}
              />
            </Pressable>
            <Pressable onPress={() => calculateFare("rishka")}>
              <Image
                source={{
                  uri: "https://cdn.dribbble.com/users/760295/screenshots/3467271/2auto.gif",
                }}
                style={{ width: 160, height: 160 }}
              />
            </Pressable>
            <Pressable onPress={() => calculateFare("car")}>
              <Image
                source={{
                  uri: "https://cdn.dribbble.com/users/992933/screenshots/4608688/car_loop.gif",
                }}
                style={{ width: 160, height: 160 }}
              />
            </Pressable>
          </View>
        </View>
      )}
      {driverAnswer && (
        <View style={{ flex: 1 }}>
          <MapView
            style={{ width: "100%", height: "100%" }}
            initialRegion={{
              latitude: accepted.latitude,
              longitude: accepted.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: accepted.latitude,
                longitude: accepted.longitude,
              }}
              title="Driver"
            />
          </MapView>
        </View>
      )}
    </>
  );
}

export default SelectRide;
