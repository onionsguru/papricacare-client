export var auto_bases = { drug_names:[], drug_codes:[] };  

export const loadAutoCompleteData = async function() {
  fetch('http://papricacare.onionsapp.com:8000/drug/Product/prod_code/json')
  .then((response) => response.json())
  .then((responseJson) => {
      //console.log('success: ' + responseJson);
      return (auto_bases.drug_codes = responseJson);
  })

  fetch('http://papricacare.onionsapp.com:8000/drug/Registration/drug_name/json')
  .then((response) => response.json())
  .then((responseJson) => {
      //console.log('success: ' + responseJson);
      return (auto_bases.drug_names = responseJson);
  })
};