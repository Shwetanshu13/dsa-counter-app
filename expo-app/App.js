import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { config } from './conf';


export default function App() {
  const [counter, setCounter] = useState(0);

  const currentCounter = async () => {
    const counterResponse = await fetch(`${config.apiUrl}/counter`);
    const counterData = await counterResponse.json();
    setCounter(counterData.value);
    console.log('Current Counter:', counterData);
  }
  const incrementCounter = async () => {
    const incrementResponse = await fetch(`${config.apiUrl}/increment`, {
      method: 'POST',
    });
    const incrementData = await incrementResponse.json();
    setCounter(incrementData.value);
    console.log('Incremented Counter:', incrementData);
  }

  useEffect(() => {
    currentCounter();
  }, []);


  return (
    <View style={styles.container}>
      <Text>Counter: {counter}</Text>
      <TouchableOpacity onPress={incrementCounter}>
        <Text>Increment Counter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
