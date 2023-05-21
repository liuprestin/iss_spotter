// index.js
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

/*
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});
*/

fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
  
    fetchCoordsByIP(ip, (error, data) => {
        if (error) {
          console.log("It didn't work!" , error);
          return;
        }
      
        fetchISSFlyOverTimes(data, (error, times) => {
            if (error) {
                console.log("It didn't work!" , error);
                return;
              }
            
            console.log(times);
        });
      });
  });

