import { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  View,
  TouchableOpacity
} from 'react-native'
import { ColorPalette } from './src/components/ColorPalette'
import {
  clientConnect,
  connectOptions
} from './src/components/utils/clientConnect'
import Slider from '@react-native-community/slider'

const Message = {
  Color: 'COLOR',
  Animation: 'ANIMATION',
  Threshold: 'THRESHOLD',
  Flash: 'FLASH',
  Brightness: 'BRIGHTNESS',
  Toggle: 'TOGGLE'
}

export default function App() {
  const [clients, setClients] = useState([])
  const [threshold, setThreshold] = useState('')
  const [interval, setInterval] = useState('500')
  const [time, setTime] = useState('50')

  const handleColorSelect = (color) => {
    const colorWithoutRGB = color.slice(3)
    const colorTrimmed = colorWithoutRGB.substring(
      1,
      colorWithoutRGB.length - 1
    )

    sendMessage(colorTrimmed, Message.Color)
  }

  const sendMessage = (message, type) => {
    if (!clients.length) {
      console.error('No clients connected.')
      return
    }

    try {
      clients.forEach((client) => {
        client.write(JSON.stringify({ value: message, type }) + '\n')
      })

      console.log('after client write')
    } catch (error) {
      console.error(error.message)
    }
  }

  const handleAnimationSend = (value, type) => () => {
    sendMessage(value, type)
  }

  const handleThresholdChange = (value) => {
    setThreshold(value)
  }

  const handleThresholdSend = () => {
    if (!threshold) {
      return
    }

    if (isNaN(parseInt(threshold, 10))) {
      return
    }

    sendMessage(threshold, Message.Threshold)
  }

  const handleBrightnessChange = (value) => {
    console.log('in slider')

    sendMessage(Math.round(value * 100) / 100, Message.Brightness)
  }

  useEffect(() => {
    connectOptions.forEach((option) => {
      const newClient = clientConnect(option)
      setClients((prev) => [...prev, newClient])
    })

    return () => {
      if (clients.length) {
        clients.forEach((client) => client.destroy())
      }
    }
  }, [])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.outerContainer}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: 10
            }}
          >
            <TextInput
              style={styles.textInput}
              onChangeText={(v) => setTime(v)}
              value={time}
              placeholder="Time"
              keyboardType="numeric"
            />
            <TouchableOpacity
              onPress={handleAnimationSend(time * 1000, Message.Animation)}
              style={styles.flashButton}
            >
              <Text style={styles.text}>Animation Rainbow</Text>
            </TouchableOpacity>
          </View>

          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={0}
            maximumValue={1}
            step={0.05}
            onValueChange={handleBrightnessChange}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: 10
            }}
          >
            <TextInput
              style={styles.textInput}
              onChangeText={(v) => setInterval(v)}
              value={interval}
              placeholder="Flash Interval"
              keyboardType="numeric"
            />

            <TouchableOpacity
              onPress={() => sendMessage(interval, Message.Flash)}
              style={styles.flashButton}
            >
              <Text style={styles.text}>Flash</Text>
            </TouchableOpacity>
          </View>

          <ColorPalette onColorSelect={handleColorSelect} />

          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <TextInput
              style={styles.textInput}
              onChangeText={handleThresholdChange}
              value={threshold}
              placeholder="Threshold"
              keyboardType="numeric"
            />
            <TouchableOpacity
              onPress={handleThresholdSend}
              style={styles.goButton}
            >
              <Text style={styles.text}>Go</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => sendMessage(0, Message.Toggle)}
            style={styles.flashButton}
          >
            <Text style={styles.text}>Toggle Sound Sensor</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  outerContainer: { flex: 1 },
  innerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    margin: 20,
    width: 250,
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  threshold: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  goButton: {
    margin: 20,
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  flashButton: {
    margin: 5,
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  text: {
    color: '#707070',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  textInput: {
    height: 40,
    alignSelf: 'center',
    width: 100,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'lightgray',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  }
})
