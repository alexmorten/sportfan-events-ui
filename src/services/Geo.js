import StorageAdaptor from './StorageAdaptor';




function getLocation(cb,fail,disableCache) {
    if (navigator.geolocation) {
      if(!disableCache){
        StorageAdaptor.getResultFromCache("local-geo",cb);
      }
        navigator.geolocation.getCurrentPosition((position)=>{
          if(!disableCache){
            var coords = position.coords;
            var obj = {
              latitude:coords.latitude,
              longitude:coords.longitude
            };

            StorageAdaptor.cacheResult("local-geo",obj);
          }
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
        if(fail){
          fail();
        }
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
