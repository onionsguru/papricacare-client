'use strict';
import React, { Component } from 'react';
import {createStackNavigator, createAppContainer, createBottomTabNavigator,
createDrawerNavigator, createMaterialTopTabNavigator} from 'react-navigation';
import { AppRegistry, Image, View, Text, TextInput, Button, TouchableOpacity, 
  ScrollView, Dimensions, FlatList, StyleSheet, Alert, Picker, CameraRoll, Icon, DatePickerIOS,  } from 'react-native';
import {basic_styles} from './styles'

class MInfo extends React.Component {

    static navigationOptions = {
      title: '약제 DB',
    };
  
    constructor(props) {
      super(props);
      this._onGetData = this._onGetData.bind(this);
      this.state = {items:[], itemPage:1};
      this._onGetData('http://papricacare.onionsapp.com:8000/api/regi/');
    }
  
    _onGetData(url){
      this.request = new XMLHttpRequest();
      this.request.onreadystatechange = 
        (e) => { 
          if( this.request.readyState == 4 && this.request.status == 200 ) {
            this.data = JSON.parse(this.request.responseText);
            this.count = this.data.count;
            this.data.results.forEach( 
              e => this.state.items.push({'key':e.reg_code, 
              'name':e.drug_name, 'storage':e.storage , 'image':e.img_file}) );
              console.log('success to get page: ' + this.state.itemPage);
              this.setState( {itemPage: this.state.itemPage+1} );
          }
        };
      this.request.open('GET', url);
      this.request.send();
    }
  
    render() {
      var dev = Dimensions.get('window');
      const {navigate} = this.props.navigation;
      // this.props.navigationOptions.title = (this.state.itemPage-1).toString + '/' + this.count;
  
      return (
        <View style={basic_styles.container}>
        <View style={basic_styles.header}><Text style={{color:'tomato', paddingLeft:5, textAlignVertical:'center'}}>
        loaded pages: {this.state.itemPage-1}/{this.count}</Text></View>
        <FlatList data={this.state.items} 
        onEndReached={ () => 
          this._onGetData('http://papricacare.onionsapp.com:8000/api/regi/?page='+this.state.itemPage)        
        }
        onEndReachedThreshold={0}
        renderItem={ ({item}) => 
        <TouchableOpacity style={basic_styles.item} 
        onPress={ () => navigate('Detail', {mItem: item} )}>
        <View style={{overflow:'hidden', flex:1, flexDirection:'row', alignItems:'center', 
        justifyContent:'flex-start', padding:10, borderWidth:0}}>
        <Text style={basic_styles.text}>{item.name}</Text>
        </View>
        </TouchableOpacity>}
        > </FlatList>
        </View>
      );
    } 
  }
  
  class DetailView extends React.Component {
    static navigationOptions = {
      title: '약제 상세정보',
     };
  
    render() {
      const {navigation} = this.props;
      const mItem = navigation.getParam('mItem',{});
      const dev = Dimensions.get('window');
       
      return (
        <ScrollView >
        <View style={{flex:1, flexDirection:'column', justifyContent:'space-evenly', alignItems:'baseline'}}>
        <Text style={basic_styles.btext}>등록코드: {mItem.key} </Text>
        <Text style={basic_styles.btext}>약제이름: {mItem.name}</Text>
        <Text style={basic_styles.btext}>공급용기: {mItem.storage}</Text>
        <Text style={basic_styles.btext}>사진정보: </Text>
        <Image style={{flex:1, alignSelf:'flex-start', width:dev.width*0.9, height:200}} resizeMode='contain' 
        source={mItem.image != '' ? {uri: mItem.image} : require('./img/logo.png')}/> 
        </View>
        </ScrollView>
        
      );
    }
  }
  
export const MdbNavigator = createStackNavigator(
    {
      Home: MInfo,
      Detail: DetailView,
    },
    { 
      initialRouteName: "Home", 
      defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: 'white',
            borderBottomColor:'white'
            
          },
          headerTintColor: 'tomato',
          headerTitleStyle: {
            fontWeight: 'bold',
        },
      },
    }
);

class InfoScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {text: '', category: undefined};
    }
  
    render() {
      var dev = Dimensions.get('window');
      return <View style={{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
      <View style={{flex:0.5}}>
      <Picker
        selectedValue={this.state.category}
        onValueChange={(itemValue, itemIndex) =>
          this.setState({category: itemValue})
        }>
        <Picker.Item label="질환" value="d" />
        <Picker.Item label="약제" value="m" />
        <Picker.Item label="병원" value="h" />
      </Picker>
      <TextInput
        style={{height: 50, width:dev.width*0.8, backgroundColor:'tomato', padding:10, marginBottom:80, borderRadius:45}}
        placeholder="검색 키워드를 입력하세요!"
        onChangeText={(text) => this.setState({text})}
      />
      </View>
      <View style={{flex:0.5}}></View>
      </View>;
    }
  }
  
export const InfoTopTabNavigator = createMaterialTopTabNavigator(
    {
      검색: {
        screen: InfoScreen,
      },
      사전: {
        screen: MdbNavigator,
      },
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
          marginTop:36, marginLeft:2, marginRight:2, marginBottom:5,
        },
        style: {
          backgroundColor: 'white',
          color:'white',
        },
      }
    }
  );
  
  