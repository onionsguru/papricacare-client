import { StyleSheet, Dimensions } from 'react-native';

export const camera_styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      padding:5,
      borderWidth:1,
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    capture: {
      flex: 0,
      backgroundColor: 'green',
      borderRadius: 45,
      padding: 10,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20,
    },
    capture_sub: {
      flex: 0,
      backgroundColor: 'gray',
      borderRadius: 45,
      padding: 10,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20,
    },
  });

export const basic_styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    borderWidth: 0,
  },
  
  header: {
    width:'100%',
    backgroundColor: 'white',
    justifyContent:'center',
    borderWidth: 3,
    margin:0,
    padding:2,
    borderWidth:0
  },

  item: {
    margin:2,
    padding: 2,
    borderWidth:0,
    backgroundColor:'gold',
    borderRadius:10,
  },

  text: {
    color:'white',
    fontSize:18,
    padding:5,
    borderWidth:0,
  },

  btext: {
    color:'black',
    fontSize:18,
    padding:10,
    fontWeight:'bold'
  },

  tempText: {
    flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center'
  },

  presc_button_sub: {
    borderWidth:0, backgroundColor:'gray', 
    borderRadius:90, marginLeft:5, marginRight:5,
    padding:5, paddingHorizontal:10,
  },

  presc_button: {
    borderWidth:0, backgroundColor:'green', 
    borderRadius:90, marginLeft:10, marginRight:5,
    padding:5, paddingHorizontal:10,
  },

  presc_button_one: {
    borderWidth:0, backgroundColor:'green', 
    borderRadius:90, marginLeft:130, marginRight:130,
  },

  presc_text: {
    textAlign:'center', padding:10, color:'white', fontWeight:'bold', fontSize:14,
  },

  presc_confirm_text: {
    marginTop:30, padding:5, color:'green', fontWeight:'bold', fontSize:18,
  },

  presc_confirm_text2: {
    textAlign:'center', padding:10, color:'green', fontWeight:'bold', fontSize:14,
  },

  presc_field: {
    flex: 0.7, fontSize:18, marginTop:2, padding:5, backgroundColor:'lightblue', borderRadius:5,
  },

  presc_field1: {
    flex: 0.28, fontSize:14, marginTop:2, padding:2, backgroundColor:'lightblue', borderRadius:5,
  },

  presc_field2: {
    flex: 0.45, fontSize:14, marginTop:2, padding:2, backgroundColor:'lightblue', borderRadius:5,
  },
  
  presc_field_num: {
    flex: 0.12, fontSize:14, marginTop:2, padding:2, backgroundColor:'lightblue', borderRadius:5,
    textAlign:'center'
  },
 
  presc_tfield1: {
    flex: 0.28, fontSize:14, fontWeight:'bold', marginTop:2, padding:2, borderWidth:0,
    backgroundColor:'royalblue', borderRadius:5, color:'white', textAlign:'center'
  },

  presc_tfield2: {
    flex: 0.45, fontSize:14, fontWeight:'bold', marginTop:2, padding:2, borderWidth:0, 
    backgroundColor:'royalblue', borderRadius:5, color:'white', textAlign:'center',
  },

  presc_tfield_num: {
    flex: 0.12, fontSize:14, fontWeight:'bold', marginTop:2, padding:2, borderWidth:0,
    backgroundColor:'royalblue', borderRadius:5, color:'white', textAlign:'center'
  },

  presc_pic: {
    alignSelf:'center', borderWidth:1, borderRadius:20,
    height:350, width:250,
    backgroundColor:'black', resizeMode:'contain',
  },

  select_buttions: {
    margin: 20, flexDirection:'row', justifyContent:'center', alignItems:'center'
  }
})