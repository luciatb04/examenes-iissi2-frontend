import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Formik } from 'formik'
import { useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import * as yup from 'yup'
import { createCategory } from '../../api/RestaurantEndpoints'
import InputItem from '../../components/InputItem'
import TextRegular from '../../components/TextRegular'
import TextSemiBold from '../../components/TextSemibold'
import * as GlobalStyles from '../../styles/GlobalStyles'

export default function CreateRestaurantCategoryScreen ({ navigation, route }) {
  const [backendErrors, setBackendErrors] = useState()
  const [message, setMessage] = useState('')
  const [selectedColor, setSelectedColor] = useState('green')
  const [selectedSize, setSelectedSize] = useState(15)

  const initialRestaurantValues = { name: null }
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .max(255, 'Name too long')
      .required('Name is required')
  })

  useEffect(() => {
    randomMessage()
  }, [])

  const randomMessage = () => {
    const randomNumber = Math.floor(Math.random() + Math.random() + Math.random() + Math.random() + 1)
    if (randomNumber === 1) {
      setMessage('¡Crear una nueva categoría de comida implica un nuevo universo de sabores!')
    } else if (randomNumber === 2) {
      setMessage('¿No sabes cómo nombrar a tu nueva categoría de comida? ¡Pide ayuda a la IA!')
    } else if (randomNumber === 3) {
      setMessage('Sólo el creador sabe el secreto del sabor.')
    } else if (randomNumber === 4) {
      setMessage('¡Buenos días! Espero que te vaya todo bien en tu restaurante.')
    } else {
      setMessage('Mi categoría favorita es la "Spanish Food", ¿sabes por qué?: ¡porque España tienela mejor dieta del mundo!')
    }
  }

  const selectButtonColor = (color) => {
    if (color === 'red') {
      setSelectedColor('red')
    } else if (color === 'green') {
      setSelectedColor('green')
    } else if (color === 'blue') {
      setSelectedColor('blue')
    } else if (color === 'pink') {
      setSelectedColor('pink')
    } else if (color === 'black') {
      setSelectedColor('black')
    } else if (color === 'orange') {
      setSelectedColor('orange')
    }
  }

  const selectButtonSize = (size) => {
    if (size === 15) {
      setSelectedSize(15)
    } else if (size === 20) {
      setSelectedSize(20)
    } else if (size === 25) {
      setSelectedSize(25)
    } else if (size === 30) {
      setSelectedSize(30)
    }
  }
  const createRestaurantCategory = async (values) => {
    setBackendErrors([])
    console.log(values)
    try {
      const createdRestaurantCategory = await createCategory(values)
      showMessage({
        message: `Restaurant ${createdRestaurantCategory} succesfully created`,
        type: 'success',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
      navigation.goBack({ dirty: true })
    } catch (error) {
      console.log(error)
      setBackendErrors(error.errors)
    }
  }
  console.log(message)
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialRestaurantValues}
      onSubmit={createRestaurantCategory}>
      {({ handleSubmit, setFieldValue, values }) => (
        <ScrollView>
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: '60%' }}>
              <InputItem
                name='name'
                label='Name:'
              />
              <View style={styles.buttonColorContainer}>
                <Pressable
                  onPress={() => selectButtonColor('red')}
                  style={({ pressed }) => [
                    styles.buttonColor,
                    {
                      backgroundColor:
                        selectedColor === 'red'
                          ? GlobalStyles.brandPrimary
                          : GlobalStyles.brandSuccessTap
                    }
                  ]}>
                  <TextRegular>Red</TextRegular>
                </Pressable>
                <Pressable
                  onPress={() => selectButtonColor('green')}
                  style={({ pressed }) => [
                    styles.buttonColor,
                    {
                      backgroundColor:
                        selectedColor === 'green'
                          ? GlobalStyles.brandPrimary
                          : GlobalStyles.brandSuccessTap
                    }
                  ]}>
                  <TextRegular>Green</TextRegular>
                </Pressable>
                <Pressable
                  onPress={() => selectButtonColor('blue')}
                  style={({ pressed }) => [
                    styles.buttonColor,
                    {
                      backgroundColor:
                        selectedColor === 'blue'
                          ? GlobalStyles.brandPrimary
                          : GlobalStyles.brandSuccessTap
                    }
                  ]}>
                  <TextRegular textStyle={{ color: selectedColor === 'blue' ? 'white' : 'black' }}>Blue</TextRegular>
                </Pressable>
                <Pressable
                  onPress={() => selectButtonColor('pink')}
                  style={({ pressed }) => [
                    styles.buttonColor,
                    {
                      backgroundColor:
                        selectedColor === 'pink'
                          ? GlobalStyles.brandPrimary
                          : GlobalStyles.brandSuccessTap
                    }
                  ]}>
                  <TextRegular textStyle={{ color: selectedColor === 'pink' ? 'white' : 'black' }}>Pink</TextRegular>
                </Pressable>
                <Pressable
                  onPress={() => selectButtonColor('black')}
                  style={({ pressed }) => [
                    styles.buttonColor,
                    {
                      backgroundColor:
                        selectedColor === 'black'
                          ? GlobalStyles.brandPrimary
                          : GlobalStyles.brandSuccessTap
                    }
                  ]}>
                  <TextRegular textStyle={{ color: selectedColor === 'black' ? 'white' : 'black' }}>Black</TextRegular>
                </Pressable>
              </View>
              <View style={styles.buttonSizeContainer}>
                <Pressable
                    onPress={() => selectButtonSize(15)}
                    style={[styles.buttonSize, { backgroundColor: selectedSize === 15 ? GlobalStyles.brandPrimary : GlobalStyles.brandSuccessTap }]}>
                    <TextRegular textStyle={{ color: selectedSize === '15' ? 'white' : 'black' }}>15</TextRegular>
                    </Pressable>
                    <Pressable
                    onPress={() => selectButtonSize(20)}
                    style={[styles.buttonSize, { backgroundColor: selectedSize === 20 ? GlobalStyles.brandPrimary : GlobalStyles.brandSuccessTap }]}>
                    <TextRegular textStyle={{ color: selectedSize === '20' ? 'white' : 'black' }}>20</TextRegular>
                    </Pressable>
                    <Pressable
                    onPress={() => selectButtonSize(25)}
                    style={[styles.buttonSize, { backgroundColor: selectedSize === 25 ? GlobalStyles.brandPrimary : GlobalStyles.brandSuccessTap }]}>
                    <TextRegular textStyle={{ color: selectedSize === '25' ? 'white' : 'black' }}>25</TextRegular>
                    </Pressable>
                    <Pressable
                    onPress={() => selectButtonSize(30)}
                    style={[styles.buttonSize, { backgroundColor: selectedSize === 30 ? GlobalStyles.brandPrimary : GlobalStyles.brandSuccessTap }]}>
                    <TextRegular textStyle={{ color: selectedSize === '30' ? 'white' : 'black' }}>30</TextRegular>
                    </Pressable>
                </View>
              <TextSemiBold textStyle={{ textAlign: 'center', fontSize: selectedSize }}> {message} </TextSemiBold>
              <Pressable
                onPress={handleSubmit}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? GlobalStyles.brandSuccessTap
                      : selectedColor
                  },
                  styles.button
                ]}>
              <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                <MaterialCommunityIcons name='content-save' color={'white'} size={20}/>
                <TextRegular textStyle={styles.text}>
                  Save
                </TextRegular>
              </View>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    height: 40,
    padding: 10,
    width: '100%',
    marginTop: 20,
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginLeft: 5
  },
  imagePicker: {
    height: 40,
    paddingLeft: 10,
    marginTop: 20,
    marginBottom: 80
  },
  image: {
    width: 100,
    height: 100,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 5
  },
  buttonColorContainer: {
    flexDirection: 'row',
    bottom: 5,
    position: 'relative',
    width: '30%',
    justifyContent: 'space-between'
  },
  buttonColor: {
    borderRadius: 8,
    height: 40,
    marginTop: 12,
    margin: '1%',
    padding: 10,
    alignSelf: 'center',
    flexDirection: 'column',
    width: '50%'
  },
  buttonSizeContainer: {
    flexDirection: 'row',
    bottom: 5,
    position: 'relative',
    width: '30%',
    justifyContent: 'space-between'
  },
  buttonSize: {
    borderRadius: 8,
    height: 40,
    marginTop: 12,
    margin: '1%',
    padding: 10,
    alignSelf: 'center',
    flexDirection: 'column',
    width: '50%'
  }
})
