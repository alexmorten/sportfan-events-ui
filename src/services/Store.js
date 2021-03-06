

var API_URL = "https://sportfan-events-api.herokuapp.com/";
if(process.env.NODE_ENV === "development"){
   API_URL = "http://localhost:3000/";

}


function receive(url,cb,fail){

  var receiveHeaders = {
    accept: 'application/json',
  };


  fetch(API_URL+url,{
    headers:receiveHeaders
  })
  .then(checkStatus)
  .then(parseJSON)
  .then((answer)=>{
    if(!answer.error){

      cb(answer);
    }else if (fail) {
      fail(answer);
    }
  });
}
function query(url,paramsObj,cb,fail,disableCache){


  var headers = {
    accept: 'application/json',
  };

  fetch(API_URL+url+constructQueryParams(paramsObj),{
    headers:headers
  }).then(checkStatus)
    .then(parseJSON)
    .then((answer)=>{
      if(!answer.error){

        cb(answer);
      }else if (fail) {
        fail(answer);
      }
    });



}
async function asyncQuery(url,paramsObj){
  var headers = {
    accept: 'application/json',
  };

  var result = await fetch(API_URL+url+constructQueryParams(paramsObj),{ headers:headers})
  var response = checkStatus(result);
  return parseJSON(response);
}

function checkStatus(response) {

  if (response.ok) {
    //  setNewAuthDetails(response.headers);
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;

}


function parseJSON(response) {
  if(response){
    return response.json();
  }else{
    return {error:"error"};
  }

}
function constructQueryParams(params){
  var paramsArr = [];
  for (var key in params){
    paramsArr.push({
      key:key,
      value:params[key]
    });
  }
  if (paramsArr.length === 0) {
    return "";
  }
  var firstParam = paramsArr.shift();

  var queryString="?"+firstParam.key+"="+firstParam.value;
  for (var indx in paramsArr){

    queryString+="&"+paramsArr[indx].key+"="+paramsArr[indx].value;
  }

  return queryString;
}
const AuthStore = {receive,query,asyncQuery,constructQueryParams};
export default AuthStore;
