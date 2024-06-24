import React, { useState } from 'react'
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'

import ColorPicker, {
  Panel3,
  Swatches,
  colorKit,
  BrightnessSlider,
  Preview
} from 'reanimated-color-picker'

const ColorPalette = ({ onColorSelect }) => {
  const [showModal, setShowModal] = useState(false)

  const customSwatches = new Array(6)
    .fill('#fff')
    .map(() => colorKit.randomRgbColor().hex())

  const selectedColor = useSharedValue(customSwatches[0])
  const backgroundColorStyle = useAnimatedStyle(() => ({
    backgroundColor: selectedColor.value
  }))

  const handleColorSelect = (color) => {
    selectedColor.value = color.rgb

    console.log('in handle complete')
    onColorSelect(color.rgb)
  }

  const handleComplete = (color) => {
    onColorSelect(color.rgb)
  }

  return (
    <>
      <Pressable style={styles.openButton} onPress={() => setShowModal(true)}>
        <Text
          style={{
            color: '#707070',
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        >
          Color Palette
        </Text>
      </Pressable>

      <Modal
        onRequestClose={() => setShowModal(false)}
        visible={showModal}
        animationType="slide"
      >
        <Animated.View style={[styles.container, backgroundColorStyle]}>
          <View style={styles.pickerContainer}>
            <ColorPicker
              value={selectedColor.value}
              sliderThickness={25}
              thumbSize={27}
              onChange={handleColorSelect}
              onComplete={handleComplete}
            >
              <View style={styles.previewContainer}>
                <Preview style={styles.previewStyle} colorFormat="rgb" />
              </View>

              <Panel3
                style={styles.panelStyle}
                renderCenterLine
                adaptSpectrum
              />

              <BrightnessSlider style={styles.sliderStyle} />

              <Swatches
                style={styles.swatchesContainer}
                swatchStyle={styles.swatchStyle}
                colors={customSwatches}
              />
            </ColorPicker>
          </View>

          <Pressable
            style={styles.closeButton}
            onPress={() => setShowModal(false)}
          >
            <Text style={{ color: '#707070', fontWeight: 'bold' }}>Close</Text>
          </Pressable>
        </Animated.View>
      </Modal>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  pickerContainer: {
    alignSelf: 'center',
    width: 350,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10
  },
  panelStyle: {
    borderRadius: 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  sliderStyle: {
    borderRadius: 20,
    marginTop: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  previewContainer: {
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#bebdbe'
  },
  previewStyle: {
    height: 40,
    borderRadius: 14
  },
  swatchesContainer: {
    borderTopWidth: 1,
    borderColor: '#bebdbe',
    marginTop: 20,
    paddingTop: 20,
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: 10
  },
  swatchStyle: {
    borderRadius: 20,
    height: 30,
    width: 30,
    margin: 0,
    marginBottom: 0,
    marginHorizontal: 0,
    marginVertical: 0
  },
  openButton: {
    width: 250,
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
  closeButton: {
    position: 'absolute',
    bottom: 50,
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    alignSelf: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }
})

export default ColorPalette
