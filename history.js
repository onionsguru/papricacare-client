'use strict';
import React, { Component } from 'react';
import {createStackNavigator, createAppContainer, createBottomTabNavigator, createDrawerNavigator, createMaterialTopTabNavigator} from 'react-navigation';
import { AppRegistry, Image, View, Text, TextInput, Button, TouchableOpacity, 
  ScrollView, Dimensions, FlatList, StyleSheet, Alert, Picker, CameraRoll, Icon, DatePickerIOS,  } from 'react-native';
import {basic_styles} from './styles'

class HomeScreen extends React.Component {
    render() {
      return <View style={{flex:1, flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-start'}}>
      </View>;
    }
  }
  
  class DiseaseScreen extends React.Component {
    render() {
      return <View style={basic_styles.tempText}> 
        <Text>관련 질환 정보</Text>
        <Image style={{width:300, height:200}} source={require('./img/logo.png')} />
      </View>;
    }
  }
  
  
  class MedicineScreen extends React.Component {
  
    render() {
      return <View style={basic_styles.tempText}> 
      <Text>관련 약제 정보</Text>
      <Image style={{width:300, height:200}} source={require('./img/logo.png')} /></View>;
    }
  }
  
  class HospitalScreen extends React.Component {
  
    render() {
      return <View style={basic_styles.tempText}> 
      <Text>관련 병원 정보</Text>
      <Image style={{width:300, height:200}} source={require('./img/logo.png')} /></View>;
    }
  }
  
  class DoctorScreen extends React.Component {
  
    render() {
      return <View style={basic_styles.tempText}> 
      <Text>관련 의사 정보</Text>
      <Image style={{width:300, height:200}} source={require('./img/logo.png')} /></View>;
    }
  }
  
  class PharmScreen extends React.Component {
  
    render() {
      return <View style={basic_styles.tempText}> 
      <Text>관련 약사 정보</Text>
      <Image style={{width:300, height:200}} source={require('./img/logo.png')} /></View>;
    }
  }
  
  class MScreen extends React.Component {
    render() {
      return <View style={basic_styles.tempText}
      ><Text >Home</Text></View>;
    }
  }
  
export const LogTopTabNavigator = createMaterialTopTabNavigator(
    {
      처방전: {
        screen: HomeScreen,
      },
      질환: {
        screen: DiseaseScreen,
      },
  
      약제: {
        screen: MedicineScreen,
      },
  
      병원: {
        screen: HospitalScreen,
      },
      /*
      의사: {
        screen: DoctorScreen,
      },
      
      약사: {
        screen: PharmScreen,
      },
      */
    },
    {
      tabBarOptions: {
        activeBackgroundColor:'red',
        inactiveBackgroundColor:'blue',
        activeTintColor: 'tomato',
        inactiveTintColor:'gray',
        indicatorStyle: {
          backgroundColor:'tomato',
          height:5, borderRadius:90,
        },
        labelStyle: {
          fontWeight:'bold',
        },
        tabStyle: {
          marginTop:32, marginLeft:2, marginRight:2, marginBottom:5,
        },
        style: {
          backgroundColor: 'white',
          color:'white',
        },
      }
    }
  );