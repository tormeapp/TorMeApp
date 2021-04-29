// import React, {useState, useEffect} from 'react';
// import { TextInput, View, StyleSheetc} from 'react-native';


// let oneDay = 60 * 60 * 24 * 1000;
// let todayTimestamp = Date.now() - (Date.now() % oneDay) + (new Date().getTimezoneOffset() * 1000 * 60);

//  const DatePicker = () => {

//     const [showDatePicker, setShowDatePicker] = useState(false);    

//     // addBackDrop =e=> {
//     //     if(this.state.showDatePicker && !ReactDOM.findDOMNode(this).contains(e.target)) {
//     //         this.showDatePicker(false);
//     //     }
//     // }
//         return (
//             <View style={styles.datePicker}>
//                 <View  onPress={()=> setShowDatePicker(true)}>
//                     <TextInput type='date'/>
//                 </View>
//                 {this.state.showDatePicker ? (
//                     <View > 
//                     </View>
//                 ) : ''}
//             </View>
//         );
// }

// const styles = StyleSheet.create({
//     datePicker:{

//     },
// });

// export default DatePicker;