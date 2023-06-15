import  React, {useState} from 'react';
import { Alert } from 'react-native';
import {SafeAreaView, StyleSheet, TextInput, Text, TouchableOpacity} from "react-native"

const SampleLoginForm = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleFormSubmission = () => {
    if(!email || !password) return Alert.alert("Error", "Please fill the form properly")
  }


    return ( 
       <SafeAreaView style={styles.container}>
        <Text style={styles.welcomeText}>Welcome Back</Text>
        <TextInput 
        style={styles.inputField}
        keyboardType="email-address"
        placeholder="Your email (eg. john@joe.com)"
        onChangeText={(email) => setEmail(email)}
        value={email}
        >

        </TextInput>
        <TextInput 
        style={styles.inputField}
        placeholder="Your password(**********)"
        onChangeText={(password) => setPassword(password)}
        secureTextEntry
        value={password}
        >

        </TextInput>
        <TouchableOpacity 
        style={styles.button}
        onPress={handleFormSubmission}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
       </SafeAreaView>
     );
}
 
export default SampleLoginForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
    padding: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: "500",
    color: "#222539",
    opacity: 0.9,
    letterSpacing: 1,
    marginBottom: 40
  },
  inputField: {
    width: "100%",
    height: 40,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#03d3a7",
    paddingHorizontal: 20,
    marginBottom: 20
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 7,
    backgroundColor:"#03d3a7",
    alignItems: "center",
    justifyContent: "center"
  },
 buttonText: {
  color: "white",
  fontWeight: "500",
  fontSize: 18
 }
})