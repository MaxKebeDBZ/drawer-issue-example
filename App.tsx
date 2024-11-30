import { createRef, useState } from 'react'
import {
  DrawerLayoutAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native'

export default function App() {
  const { width } = useWindowDimensions()
  const drawerRef = createRef<DrawerLayoutAndroid>()
  const [numberPressed, setNumberPressed] = useState(0)

  if (Platform.OS !== 'android')
    return (
      <View style={styles.container}>
        <Text>Test Android only</Text>
      </View>
    )
  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerPosition='right'
      drawerWidth={width * 0.75}
      renderNavigationView={() => (
        <View style={styles.drawer}>
          <Text style={styles.text}>
            Try to press the far right side of the button.
          </Text>
          <Text>You pressed {numberPressed} times.</Text>
          <Pressable
            onPress={() => setNumberPressed((oldValue) => oldValue + 1)}
            style={styles.button}
          >
            <Text style={styles.text}>Press me</Text>
          </Pressable>
          <Text style={styles.text}>
            Check 'inspect element' with the Expo menu, there is a strange
            offset to the renderNavigationView when using a real Android device.
          </Text>
        </View>
      )}
    >
      <View style={styles.container}>
        <Text style={styles.text}>
          This app demonstrates an issue with the DrawerLayoutAndroid component
          set to the right.
        </Text>
        <Pressable
          onPress={() => drawerRef.current?.openDrawer()}
          style={styles.button}
        >
          <Text style={styles.text}>Open Drawer</Text>
        </Pressable>
      </View>
    </DrawerLayoutAndroid>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 100,
  },
  text: {
    textAlign: 'center',
    padding: 15,
  },
  drawer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderWidth: 2,
    backgroundColor: 'lightblue',
    marginTop: 20,
    width: '95%',
    alignItems: 'center',
  },
})
