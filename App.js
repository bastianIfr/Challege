import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, Switch } from 'react-native';
import  DataDisplay  from './app/DataDisplay';

// Tabs
function ClockDisplay(){
  return (
    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>{clock()}</Text>
      <Text >{Counter()}</Text>
    </View>
  );
}

function DataScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <DataDisplay></DataDisplay>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator >
      <Tab.Screen name="Clock" component={ClockDisplay}/>
      <Tab.Screen name="Data" component={DataScreen} />
    </Tab.Navigator>
  );
}

// Main App
export default function App() {
  return (
        <NavigationContainer>
          <MyTabs />
        </NavigationContainer>
  );
}

// Clock
function clock(){
  const [clockState, setClockState] = useState();
  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setClockState(date.toLocaleTimeString());
    }, 1000);
  }, []);
  return <Text style={styles.clock}>{clockState}</Text>
}

//Style part
const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clock: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});


// Counter
function Counter(){
  const [countState, setCountState] = useState(0);
  const [isEnabled, setIsEnabled] = useState(false);
  let countDefault = 1;

  const toggleSwitch = () => {
    if(isEnabled){
      setCountState(0)
    }
    setIsEnabled(previousState => !previousState)
  }
  if(isEnabled){
    countDefault = 2;
  }
  const increase = () => {
    setCountState(count => count + countDefault)
  }
  const decrease = () => {
    setCountState(count => count - countDefault)
  }
  return(
    <View style={styles.container}>
      <Text style={{ fontSize: 60,fontWeight: 'bold' }}>{countState}</Text>
      <View style={{ flexDirection:'row'}}>
        <Button onPress={decrease} title="Decrease"/>
        <Text> </Text>
        <Button onPress={increase} title="Increase"/>
      </View>
      <Switch 
        trackColor={{false: 'grey', true:'blue'}} 
        thumbColor={isEnabled ? 'grey' : 'white'}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>

  )
}

//Data display
