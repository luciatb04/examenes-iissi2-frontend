import React, { useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { createCategory } from '../../api/RestaurantCategoryEndpoint'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import InputItem from '../../components/InputItem'
import TextRegular from '../../components/TextRegular'
import * as GlobalStyles from '../../styles/GlobalStyles'
import { showMessage } from 'react-native-flash-message'
import * as yup from 'yup'
import { Formik } from 'formik'

export default function CreateRestaurantsCategoryScreen ({ navigation, route }) {
  const [backendErrors, setBackendErrors] = useState()
  const [mensaje, setMensaje] = useState('')
  const [color, setColor] = useState('purple')
  useEffect(() => {
    randomMessage()
  }, [])
  const initialProductValues = { name: null }
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .max(255, 'Name too long')
      .required('Name is required')

  })
  //   const actionColor = (colors) => {
  //     if (colors === 'red') {
  //       setColor('red')
  //     }
  //     else if (colors==='green') {
  //         setColor('green')
  //     }else if (colors==='pink') {
  //         setColor('pink')
  //     }else if (colors==='orange'){
  //         setColor('orange')
  //     }
  //   }
  const randomMessage = () => {
    const randomNumber = Math.floor(Math.random() + Math.random() + Math.random() + Math.random() + 1)
    if (randomNumber === 1) {
      setMensaje('Mi categoría favorita es la "Spanish Food", ¿sabes por qué?: ¡porque España tienela mejor dieta del mundo!')
    } else if (randomNumber === 2) {
      setMensaje('¡Buenos días! Espero que te vaya todo bien en tu restaurante.')
    } else if (randomNumber === 3) {
      setMensaje('¿No sabes cómo nombrar a tu nueva categoría de comida? ¡Pide ayuda a la IA!')
    } else if (randomNumber === 4) {
      setMensaje('¿Sabías que la comida es la forma más rápida de llegar al corazón de una persona?')
    } else {
      setMensaje('¡Crear una nueva categoría de comida implica un nuevo universo de sabores')
    }
  }
  const createCategories = async (values) => {
    setBackendErrors([])
    try {
      const createdCategory = await createCategory(values)
      showMessage({
        message: `Product ${createdCategory.name} succesfully created`,
        type: 'success',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
      navigation.navigate('EditRestaurantScreen', { id: route.params.id, dirty: true })
    } catch (error) {
      console.log(error)
      setBackendErrors(error.errors)
    }
  }
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialProductValues}
      onSubmit={createCategories}>
      {({ handleSubmit, setFieldValue, values }) => (
        <ScrollView>
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: '60%' }}>
              <InputItem
                name='name'
                label='Name:'
              />
              <View style={{ alignContent: 'center', marginTop: 20 }}>
                {mensaje}
                </View>
    <View style={styles.actionButton}>
            <Pressable
                onPress={() => setColor('red') }
                style={({ pressed }) => [
                  {
                    backgroundColor: color === 'red'
                      ? GlobalStyles.brandPrimary
                      : GlobalStyles.brandSuccess
                  },
                  styles.button
                ]}>
                <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                <TextRegular textStyle={styles.text}>
                    Red
                  </TextRegular>
                </View>
              </Pressable>
              <Pressable
                onPress={() => setColor('pink') }
                style={({ pressed }) => [
                  {
                    backgroundColor: color === 'pink'
                      ? GlobalStyles.brandPrimary
                      : GlobalStyles.brandSuccess
                  },
                  styles.button
                ]}>
                <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                <TextRegular textStyle={styles.text}>
                    pink
                  </TextRegular>
                </View>
              </Pressable>
              <Pressable
                onPress={ () => setColor('green') }
                style={({ pressed }) => [
                  {
                    backgroundColor: color === 'green'
                      ? GlobalStyles.brandPrimary
                      : GlobalStyles.brandSuccess
                  },
                  styles.button
                ]}>
                <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                <TextRegular textStyle={styles.text}>
                    Green
                  </TextRegular>
                </View>
              </Pressable>
            <Pressable
                onPress={() => setColor('blue') }
                style={({ pressed }) => [
                  {
                    backgroundColor: color === 'blue'
                      ? GlobalStyles.brandPrimary
                      : GlobalStyles.brandSuccess
                  },
                  styles.button
                ]}>
                <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                <TextRegular textStyle={styles.text}>
                    blue
                  </TextRegular>
                </View>
              </Pressable>
                </View>
              <Pressable
                onPress={ handleSubmit }
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? GlobalStyles.brandSuccessTap
                      : color
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
    margin: 10,
    width: '100%',
    marginTop: 20,
    marginBottom: 20
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    width: '30%'
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
  switch: {
    marginTop: 5
  }
})
