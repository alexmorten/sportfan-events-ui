



function getLocation(cb,fail) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          cb(position.coords);
        },(error)=>{
          if(fail){
            fail(error);
          }else{
            console.log(error);
          }
        });
    } else {
       console.log("Geolocation is not supported by this browser.");
    }
}
function ifGranted(cb,fail){
  if(navigator.geolocation && navigator.permissions){
    navigator.permissions.query({name:"geolocation"}).then((permission)=>{
      if(permission.state === "granted"){
        cb()
      }else{
        fail();
      }
    });
  }
}
function getLocationIfGranted(cb,fail){
  ifGranted(()=>{
    getLocation(cb,fail);
  },()=>{
    fail({error:"Not granted"});
  })
}

const Geo = {getLocation,ifGranted,getLocationIfGranted};
export default Geo;