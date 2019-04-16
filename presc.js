'use strict';
import React, { Component } from 'react';
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';
import {createDrawerNavigator, createMaterialTopTabNavigator} from 'react-navigation';
import { AppRegistry, Image, View, Text, TextInput, Button, TouchableOpacity, ImageStore, copyAssetsFileIOS} from 'react-native';
import { ActivityIndicator, ScrollView, Dimensions, FlatList, StyleSheet, Alert, Picker, CameraRoll, Icon, DatePickerIOS } from 'react-native';
import {Modal, TouchableHighlight, InputAccessoryView} from 'react-native';
import RNFS from 'react-native-fs';
import {RNCamera} from 'react-native-camera';
import {auto_bases, loadAutoCompleteData} from './init'
import {basic_styles, camera_styles} from './styles'

class OrderStatusScreen extends React.Component {
    render() {
      return <View style={basic_styles.tempText}><Text>조제 현황 화면</Text></View>;
    }
}
  
const PRESC_STEP = {
    INIT: 0,
    TAKEN: 1,
    SELECTED: 2,
    OCR_DONE: 3,
    COMPLETED: 4,
};
  
class PrescMenuScreen extends React.Component {
    static navigationOptions = {
        title: '처방전 준비하기',
        headerStyle: {
            backgroundColor: 'beige',
        },
        headerTintColor: 'green',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18
        },
    };

    constructor(props) {
        super(props);
        global.pic_uri = '#';
        this.state = { step: PRESC_STEP.INIT };
        this.onBack = this.onBack.bind(this);
    }

    onBack(is_refresh = false) {
        if( is_refresh ) global.pic_uri = '#';
        this.forceUpdate();
    }

    render() {
        const {navigate} = this.props.navigation;
        const pic_uri = global.pic_uri;
        console.log('uri:'+pic_uri);

        return <View style={{padding:5, flex:1, flexDirection:'column', 
        alignItems:'center', justifyContent:'center', backgroundColor:'beige'}}>
        <View style={{margin:0}}>
        {
        global.pic_uri != '#' ? 
        <Image style={basic_styles.presc_pic} 
        source={ pic_uri == '#' ? require('./img/logo.png') : {uri: pic_uri} }></Image> :
        <View></View>
        }
        </View>
        {
        global.pic_uri == '#' ?  
        <View style={basic_styles.select_buttions}>
        <TouchableOpacity style={basic_styles.presc_button_sub}
            onPress={() => navigate('사진선택',{ onBack: this.onBack })}>
        <Text style={basic_styles.presc_text}>앨범 이용</Text>
        </TouchableOpacity>
        <Text style={{color:'green', margin:2 }}>/</Text>
        <TouchableOpacity style={basic_styles.presc_button}
            onPress={() => navigate('사진찍기', { onBack: this.onBack })}>
            <Text style={basic_styles.presc_text}>직접 촬영</Text>
        </TouchableOpacity>
        </View> : <View></View>
        } 

        {global.pic_uri != '#' ? 

        <View style={basic_styles.select_buttions}>
         <TouchableOpacity style={basic_styles.presc_button_sub}
         onPress={ () => this.onBack(true) }>
         <Text style={basic_styles.presc_text}>새로 준비</Text>
        </TouchableOpacity>    
        <Text style={{color:'green', margin:2 }}>/</Text>
        <TouchableOpacity style={basic_styles.presc_button}
            onPress={ () => navigate('내용작성', { onBack: this.onBack }) }>
            <Text style={basic_styles.presc_text}>내용 확인</Text>
        </TouchableOpacity>
        </View> 
        : <View></View>
        }
        </View>;
    }
}
  
class PrescTakeScreen extends React.Component {
    static navigationOptions = {
        title: '처방전 촬영',
        headerStyle: {
            backgroundColor: 'beige',
        },
        headerTintColor: 'green',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18
        },
    };

    takePicture = async function() {
        const { navigation } = this.props;

        if (this.camera) {
            const options = { quality: 0.5, base64: false, doNotSave:false, pauseAfterCapture:false };
            const data = await this.camera.takePictureAsync(options);
            CameraRoll.saveToCameraRoll(data.uri);
            global.pic_uri = data.uri;
            const reload = navigation.getParam('onBack');
            reload();
            navigation.goBack();
            this.setModalVisible(true)
        }
    };

    state = {
        modalVisible: true,
      };
    
      setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }

    render() {
        return (
        /*    
        <View style={camera_styles.container}>
            <RNCamera
            ref={ref => {
                this.camera = ref;
            }}
            style={camera_styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.off}
            autoFocus={RNCamera.Constants.AutoFocus.on}
            orientation={RNCamera.Constants.Orientation.portrait}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
            />
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity onPress={this.takePicture.bind(this)} style={camera_styles.capture}>
                <Text style={{ fontSize: 14, color:'white' }}>사진 찍기</Text>
            </TouchableOpacity>
            </View>
        </View>
        */
       <View style={camera_styles.container}>
       <Modal
        animationType="fade"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {
        Alert.alert('Camera has been closed by an enternal request!');
        }}>
        <RNCamera
            ref={ref => {
                this.camera = ref;
            }}
            style={camera_styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.off}
            autoFocus={RNCamera.Constants.AutoFocus.on}
            orientation={RNCamera.Constants.Orientation.portrait}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
            />
        <View style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor:'black' }}>
        <TouchableOpacity onPress={() => {this.props.navigation.goBack(); this.setModalVisible(true);}} 
        style={camera_styles.capture_sub}>
        <Text style={{ fontSize: 14, color:'white' }}>취소</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.takePicture.bind(this)} style={camera_styles.capture}>
            <Text style={{ fontSize: 14, color:'white' }}>찍기</Text>
        </TouchableOpacity>
        </View> 
        </Modal>
        </View>
        );
    }
}
  
class PrescSelectScreen extends React.Component {
    static navigationOptions = {
        title: '처방전 선택',
        headerStyle: {
            backgroundColor: 'beige',
        },
        headerTintColor: 'green',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18
        },
    };

    constructor(){
        super();
        this.state={
         photos: [],
        };
        this.onSelected.bind(this);
        this._handleButtonPress();
    }
    
    _handleButtonPress = () => {
        CameraRoll.getPhotos({
            first: 50,
            //groupName:'Onions',
            groupTypes: 'All',
            assetType: 'Photos',
        })
        .then(r => {
            this.setState({ photos: r.edges });
        })
        .catch((err) => {
            //Error Loading Images
        });
    }

    onSelected(p) {
        const {navigation} = this.props;
        global.pic_uri = p.node.image.uri;
        const reload = navigation.getParam('onBack');
        reload();
        navigation.goBack();
    }
    
    render() {
        return(
            <ScrollView style={{backgroundColor:'beige'}} onScrollBeginDrag={ () => this._handleButtonPress()}>
            <View style={{flexDirection:'column', justifyContent:'flex-start', alignItems:'center'}}>
            { this.state.photos.map((p, i) => {
            return (
                <TouchableOpacity style={{margin:5}} key={i} onPress={ () => this.onSelected(p)}>
                <Image
                style={basic_styles.presc_pic}
                source={{ uri: p.node.image.uri }}
                />
                </TouchableOpacity>
            );
            })}
        </View>
        </ScrollView>);
    }
}

const PRESC_ANALYSIS = {
    INIT: 0,
    SENT: 1, 
    FAILED: 2,
    CANNOTREAD: 3,
    SUCCESSED: 4,
};

class PrescFormScreen extends React.Component {
    static navigationOptions = {
        title: '처방전 내용',
        headerStyle: {
            backgroundColor: 'beige',
        },
        headerTintColor: 'green',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18
        },
    };
  
    constructor(props) {
        super(props);
        this.state = {
            chosenDate: new Date(),
            analysisStatus: PRESC_ANALYSIS.INIT,
            drugData:[],
            diseaseData:'',
            hospitalData:'',
        };
        this.setDate = this.setDate.bind(this);
        this.onOCRAnalize = this.onOCRAnalize.bind(this);
        this.onAddDrug = this.onAddDrug.bind(this);
        this.onMakeOrder = this.onMakeOrder.bind(this);
        this.onRemoveDrug = this.onRemoveDrug.bind(this);
    }

    setDate(newDate) {
        console.log(newDate);
        this.setState( {chosenDate: newDate} );
    }

    onOCRAnalize() {
        var ws = new WebSocket('ws://papricacare.onionsapp.com:8000/ws/ocr/');
        ws.onopen = () => {
            // connection opened
            console.log('ocr open');
            
            RNFS.readFile(global.pic_uri,'base64')
            .then(res =>{
                const data_url = 'data:image/jpeg;base64,' + res;
                console.log('succeeded to read the base64 image file!');
                var msg = {message:'', attr: {img_src: data_url, 
                is_privacy:true, is_num:false, is_char:false,
                is_drug:true, is_disease:true, is_hosp:true } };
                ws.send(JSON.stringify(msg)); // send a message
                console.log('ocr sent');
                this.setState({analysisStatus:PRESC_ANALYSIS.SENT});
             }).catch( (err) => {console.log(err); 
                this.setState({analysisStatus:PRESC_ANALYSIS.CANNOTREAD});
            } );
            
       };
          
        ws.onmessage = (e) => {
            // a message was received
            const res = JSON.parse(e.data);
            var drugs = res.message.drugs;
            
            if( res.message.disease !== undefined ) {
                this.state.diseaseData = res.message.disease.name;
            }

            if( res.message.hospital !== undefined ) {
                this.state.hospitalData = res.message.hospital.name;
            }

            if( res.message.issue !== undefined ) {
                this.state.chosenDate = new Date(res.message.issue);
            }

            if( drugs !== undefined && drugs.length > 0 ) {
                global.pic_uri = res.img_src;
                var i = 0;
                for( i = 0; i < drugs.length; i++ ) {
                    var item = {reg_code:drugs[i].reg_code, drug_name:drugs[i].drug_name, 
                        dose:drugs[i].dose, qty_perday:drugs[i].qty_perday };
                    console.log('item: ' + item);
                    this.state.drugData.push(item);
                }                
                this.setState({analysisStatus:PRESC_ANALYSIS.SUCCESSED});
                console.log('array: ' + this.state.drugData);
            }
            else {
                global.pic_uri = res.img_src;
                this.setState({analysisStatus:PRESC_ANALYSIS.FAILED});
            }
        };
        
        ws.onerror = (e) => {
            // an error occurred
            console.log('ocr error: ' + e.message);
            this.setState({analysisStatus:PRESC_ANALYSIS.CANNOTREAD});
        };
        
        ws.onclose = (e) => {
            // connection closed
            console.log('ocr closed: ' + e.code, e.reason);
            this.setState({analysisStatus:PRESC_ANALYSIS.CANNOTREAD});
        };

    }

    onAddDrug() {
        var item = {reg_code:'',reg_code:'', dose:0, qty_perday:0 };
        this.state.drugData.push(item);
        this.forceUpdate();
    }

    onRemoveDrug() {
        this.state.drugData.pop();
        this.forceUpdate();
    }

    onMakeOrder() {
        var order = { disease: this.state.diseaseData, drugs: this.state.drugData, 
            hospital: this.state.hospitalData, issue: this.state.chosenDate};
        var data = JSON.stringify(order);
        Alert.alert('주문: ' + data );
    }

    render() {
        return( 
            <View>
            <ScrollView style={{backgroundColor:'lightgray'}}>
            <View style={{padding:5, marginHorizontal:5, marginTop:5, backgroundColor:'beige'}}>
            <Image source={{uri:global.pic_uri}} style={basic_styles.presc_pic}></Image>
            {  
            this.state.analysisStatus == PRESC_ANALYSIS.INIT ?
            <View style={basic_styles.select_buttions}>
            <TouchableOpacity style={basic_styles.presc_button_sub}
            onPress={() => this.setState({analysisStatus:PRESC_ANALYSIS.SUCCESSED})}>
            <Text style={basic_styles.presc_text}>직접 입력</Text>
            </TouchableOpacity>
            <Text style={{color:'green', margin:2 }}>/</Text>
            <TouchableOpacity style={basic_styles.presc_button}
            onPress={() => this.onOCRAnalize()}>
            <Text style={basic_styles.presc_text}>자동 입력</Text>
            </TouchableOpacity> 
            </View>: 
            this.state.analysisStatus == PRESC_ANALYSIS.SENT ?
            <View styles={{flex:1, justifyContent:'center'}}>
            <ActivityIndicator size="large" color="tomato"/>
            <Text style={basic_styles.presc_confirm_text2}> OCR 분석중</Text></View>: 
            this.state.analysisStatus == PRESC_ANALYSIS.CANNOTREAD ?
            <View>
            <Text style={basic_styles.presc_confirm_text2}>사진에 문제가 있습니다.</Text>
            <TouchableOpacity style={basic_styles.presc_button_one}
            onPress={() => { const reload = this.props.navigation.getParam('onBack'); reload(true); this.props.navigation.goBack();}}>
            <Text style={basic_styles.presc_text}>다시 하기</Text>
            </TouchableOpacity> 
            </View>
            : 
            this.state.analysisStatus == PRESC_ANALYSIS.FAILED ?
            <View>
            <Text style={basic_styles.presc_confirm_text2}> 처방전 아닐 수 있음</Text> 
            <TouchableOpacity style={basic_styles.presc_button_one}
            onPress={() => { const reload = this.props.navigation.getParam('onBack'); reload(true); this.props.navigation.goBack();}}>
            <Text style={basic_styles.presc_text}>다시 하기</Text>
            </TouchableOpacity> 
            </View>
            : 
            <Text style={basic_styles.presc_confirm_text2}> 처방전 확인 완료 </Text>
            }
            </View>
            { this.state.analysisStatus == PRESC_ANALYSIS.SUCCESSED  ?
            <View style={{padding:5, marginHorizontal:5, marginBottom:5, backgroundColor:'beige'}}>
            <View style={{margin:5}}>
            <Text style={basic_styles.presc_confirm_text}>1. 질환</Text>
            <TextInput style={basic_styles.presc_field} maxLength={50}>{this.state.diseaseData}</TextInput>
            </View>
            
            <View style={{margin:5}}>
            <Text style={basic_styles.presc_confirm_text}>2. 처방약</Text>
            <View style={{flexDirection:'column', justifyContent:'flex-start'}}>
            <View style={{flex:1, flexDirection:'row', justifyContent:'space-around', alignItems:'stretch'}}>
            <Text style={basic_styles.presc_tfield1}>약제 코드</Text> 
            <Text style={basic_styles.presc_tfield2}>약제 이름</Text> 
            <Text style={basic_styles.presc_tfield_num}>수량</Text>
            <Text style={basic_styles.presc_tfield_num}>횟수</Text>
            </View>
            <ScrollView>
            { 
                this.state.drugData.map( (d,i) => {
                    return (
                    <View key={i} style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
                    <TextInput style={basic_styles.presc_field1} maxLength={9} 
                    onChangeText={(text) => {this.state.drugData[i].drug_name = text}}>{d.drug_code}</TextInput>
                    <TextInput style={basic_styles.presc_field2} maxLength={50} 
                    onChangeText={(text) => {this.state.drugData[i].drug_name = text}}>{d.drug_name}</TextInput>
                    <TextInput style={basic_styles.presc_field_num} maxLength={3} 
                    onChangeText={(text) => {this.state.drugData[i].dose = text}}>{d.dose}</TextInput> 
                    <TextInput style={basic_styles.presc_field_num} maxLength={3}
                    onChangeText={(text) => {this.state.drugData[i].qty_perday = text}}>{d.qty_perday}</TextInput>
                    </View>
                    );    
                })
            }
            </ScrollView>
            </View>
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={{marginTop:5, borderRadius:25, backgroundColor:'lightblue', 
            width:30, padding:2, alignItems:'center'}} onPress={() => this.onAddDrug() }>
            <Text style={{textAlign:'center', fontWeight:'bold', fontSize:16, lineHeight:0}}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop:5, marginLeft:2, borderRadius:25, backgroundColor:'lightblue', 
            width:30, padding:2 }} onPress={() => this.onRemoveDrug() }>
            <Text style={{textAlign:'center', alignSelf:'center', fontWeight:'bold', fontSize:16, lineHeight:0}}>-</Text>
            </TouchableOpacity>
            </View>
            </View>

            <View style={{margin:5}}>
            <Text style={basic_styles.presc_confirm_text}>3. 병원</Text>
            <TextInput style={basic_styles.presc_field} maxLength={50} >{this.state.hospitalData}</TextInput>
            </View>
    
            <View style={{margin:5}}>
            <Text style={basic_styles.presc_confirm_text}>4. 발행일</Text>
            <DatePickerIOS style={{marginHorizontal:50}}
            date={this.state.chosenDate}
            onDateChange={ (date) => this.setDate(date) }
            mode={'date'}
            />
            </View>
            <View style={basic_styles.select_buttions}>
            <TouchableOpacity style={basic_styles.presc_button_sub}
            onPress={ () => this.props.navigation.goBack() }>
            <Text style={basic_styles.presc_text}>취소</Text>
            </TouchableOpacity>    
            <Text style={{color:'green', margin:2 }}>/</Text>
            <TouchableOpacity style={basic_styles.presc_button}
                onPress={ () => this.onMakeOrder() }>
                <Text style={basic_styles.presc_text}>요청</Text>
            </TouchableOpacity>
            </View>  
            </View>
            : <Text></Text>}
        </ScrollView>
        </View>
        );
    }
}
  
const OrderMakeNavigator = createStackNavigator({
    처방전생성: {screen: PrescMenuScreen},
    사진찍기: {screen: PrescTakeScreen},
    사진선택: {screen: PrescSelectScreen},
    내용작성: {screen: PrescFormScreen},
 });
  
class OrderPharmScreen extends React.Component {
    render() {
      return <View style={basic_styles.tempText}><Text>주치약사 관리</Text></View>;
    }
}
  
export const OrderTopTabNavigator = createMaterialTopTabNavigator(
    {
      주문: {
        screen: OrderMakeNavigator,
      },
      조회: {
        screen: OrderStatusScreen,
      },
  
      주치약사: {
        screen: OrderPharmScreen,
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