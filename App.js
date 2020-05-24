import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from "react-native";

export default function App() {
  
  const [name, setName] = useState('');

  useEffect(()=>{
    loadFromAsyncStorage();
  }, [])

  const saveIntoAsyncStorage = async () => {
    try{
      await AsyncStorage.setItem('myName', name);
    }catch(error){
      alert(error)
    }
  }

  const loadFromAsyncStorage = async () => {
    try{
      let loadedName = await AsyncStorage.getItem('myName'); 

      if(name !== null){
        setName(loadedName);
      }
    }catch(error){
      alert(error);
    }
  }

  const removeFromAsyncStorage = async () => {
    try{
      await AsyncStorage.removeItem('myName');
    }catch(error){
      alert(error);
    }
    finally{
      setName('');
    }
  }
  
  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/main-img.png")}
        style={{ width: "100%", height: 200, marginTop: 64 }}
        resizeMode='contain'
      />
      <Text style={{ height: 30 }}>{name}</Text>
      <Text style={styles.name}>What's your user name?</Text>

      <TextInput style={styles.input} onChangeText={(text) => setName(text)} />

      <TouchableOpacity style={styles.button} onPress={()=>saveIntoAsyncStorage()}>
        <Text style={{ color: "white" }}>Save my name!</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={()=>removeFromAsyncStorage()}>
        <Text style={{ color: "white" }}>Remove my name!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "300",
  },
  input: {
    borderWidth: 1,
    borderColor: "#575DD9",
    alignSelf: "stretch",
    margin: 32,
    height: 64,
    borderRadius: 6,
    paddingHorizontal: 16,
    fontSize: 24,
    fontWeight: "300",
  },
  button: {
    backgroundColor: "#575DD9",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 32,
    marginHorizontal: 32,
    borderRadius: 6,
  },
});
