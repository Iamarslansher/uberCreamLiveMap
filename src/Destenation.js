import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function Destenation({ navigation, route }) {
  const { pickUp } = route.params;
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [places, setPlaces] = useState([]);
  const [destenation, setDestenation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      Location.watchPositionAsync(
        {
          accuracy: 6,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (location) => {
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
          setLocation(location.coords);
        }
      );
    })();
  }, []);

  if (!location) return <Text>Loading...</Text>;

  const searchPlace = (text) => {
    setDestenation(null);
    // console.log(text, "text");
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "fsq3gdGAITVMxUkvDGxvkAq4gtXDarIY3rDqNHSkOVcV76s=",
      },
    };

    fetch(
      `https://api.foursquare.com/v3/places/search?query=${text}&ll=${latitude},${longitude}&radius=4000&limit=5`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setPlaces(response.results);
      })
      .catch((err) => console.error(err));
  };

  const selectedDestenation = (place) => {
    setLatitude(place.geocodes.main.latitude);
    setLongitude(place.geocodes.main.longitude);
    setDestenation(place);
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <TextInput
          placeholder="Search Place"
          onChangeText={searchPlace}
          style={styles.input}
        />
        {!!places?.length && (
          <View style={styles.placesContainer}>
            {places &&
              places.map((place, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => selectedDestenation(place)}
                >
                  <Text>
                    {place.name} , {place.location.addressa}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        )}

        {destenation && (
          <View>
            <Text>{destenation?.name}</Text>
          </View>
        )}
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          title="My Location"
          description="Here I am"
        />
      </MapView>
      <Button
        title="select vehicle"
        disabled={!destenation}
        onPress={() =>
          navigation.navigate("SelectRide", { destenation, pickUp })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "95%",
  },
  subContainer: {
    position: "absolute",
    top: 0,
    zIndex: 100,
    width: "100%",
  },
  input: {
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "white",
    borderRadius: 10,
    width: "90%",
    height: 50,
    padding: 10,
    margin: 10,
  },
  placesContainer: {
    backgroundColor: "white",
    width: "90%",
    padding: 10,
    margin: 10,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
  },
});
