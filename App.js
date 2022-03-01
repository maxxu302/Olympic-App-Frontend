import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, SafeAreaView, Alert} from 'react-native';

import { Picker } from "@react-native-picker/picker";
import { DataTable } from 'react-native-paper';
export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [type, setType] = useState(1);
  const [athletes, setAthletes] = useState([]);
  const [sports, setSports] = useState([]);
  const [results, setResults] = useState([]);
  const [sport, setSport] = useState('0');
  const getAthletesFromApi = async () => {
    try {
      const response = await
    fetch('http://localhost:3000/api/v1/athletes');
    const json = await response.json();
    setAthletes(json);
    setType(1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    }
    const getSportsFromApi = async () => {
      try {
        const response = await
      fetch('http://localhost:3000/api/v1/sports');
      const json = await response.json();
      setSports(json);
      setType(2);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
      }
    const getSportsResults = async (value) => {
      setSport(value);
      console.log("Value:" + value);
      try {
        const response = await
      fetch(`http://localhost:3000/api/v1/results?sportid=${value}`);
      const json = await response.json();
      setResults(json);
      setType(3);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
      }
  const menu = () => {
    return (
      <View style={styles.container}>
    <Text>Winter Olympics Beijing 2022!</Text>
        <View style={styles.Viewstyle}>
        <Button
          title = "View Athletes"
          onPress = {() => getAthletesFromApi()}
          />
        <Button
          title = "View Events"
          onPress = {() => console.log('Works')}
          />
        <Button
          title = "View Results"
          onPress = {() => getSportsFromApi()}
          />
        </View>
        </View>);
  }
  const Athletes = () => {
    return (
    <SafeAreaView style={styles.container}>
      <Text>Winter Olympics Beijing 2022!</Text>
      <View style={styles.Viewstyle}>
      <Button
        title = "View Athletes"
        onPress = {() => getAthletesFromApi()}
        />
      <Button
        title = "View Events"
        onPress = {() => console.log('Works')}
        />
      <Button
        title = "View Results"
        onPress = {() => getSportsFromApi()}
        />
      </View>
      <View>
          {athletes.map((athlete) => <Text>{athlete.name}</Text>)}
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
    );}
    const Sports = () => {
      return (
      <SafeAreaView style={styles.container}>
        <View>
            <Picker
              selectedValue={sport}
              onValueChange={(value, index) => getSportsResults(value)}
              style={styles.picker}>
                <Picker.Item label = "Please select a sport" value="0" />
                {sports.map((sport) => <Picker.Item label = {sport.name} value = {sport.id}/>)}
            </Picker>
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
      );}
      const Results = () => {
        return (
        <SafeAreaView style={styles.container}>
          <Text>Winter Olympics Beijing 2022!</Text>
          <View style={styles.Viewstyle}>
          <Button
            title = "View Athletes"
            onPress = {() => getAthletesFromApi()}
            />
          <Button
            title = "View Events"
            onPress = {() => console.log('Works')}
            />
          <Button
            title = "View Results"
            onPress = {() => getSportsFromApi()}
            />
          </View>
            <DataTable>
             <DataTable.Header>
               <DataTable.Title>Name</DataTable.Title>
               <DataTable.Title>Country</DataTable.Title>
               <DataTable.Title>Medal</DataTable.Title>
             </DataTable.Header>
             {results.map((result) => <DataTable.Row><DataTable.Cell>{result.athletename}</DataTable.Cell>
           <DataTable.Cell>{result.country}</DataTable.Cell>
             <DataTable.Cell>{result.rank}</DataTable.Cell></DataTable.Row>)}
            </DataTable>
          <StatusBar style="auto" />
        </SafeAreaView>
        );}
  if (type === 1) {return Athletes();}
  else if (type === 2) {return Sports();}
  else if (type === 3) {return Results();}
}

const styles = StyleSheet.create({
  Viewstyle: {
    backgroundColor: 'red',
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    marginVertical: 30,
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: "#666",
  },
});
