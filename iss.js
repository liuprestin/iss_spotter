/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require("request");

const fetchMyIP = function (callback) {
  let ip;
  request("https://api.ipify.org?format=json", (error, response, body) => {
    ip = JSON.parse(body);

    callback(error, ip["ip"]);

    // inside the request callback ...
  // error can be set if invalid domain, user is offline, etc.
  if (error) {
    callback(error, null);
    return;
  }
  // if non-200 status, assume server error
  if (response.statusCode !== 200) {
    const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
    callback(Error(msg), null);
    return;
  }

  // if we get here, all's well and we got the data
  });
};

//return corrodinates and run a function 
// given a string that is an ip address and a callback function 
const fetchCoordsByIP = function(ip, callback) {

    request(`http://ipwho.is/${ip}`, (error, response, body) => {
    const parsed = JSON.parse(body);
    const { latitude, longitude } = parsed;

    callback(error, { latitude, longitude });

    // inside the request callback ...
  // error can be set if invalid domain, user is offline, etc.
  if (error) {
    callback(error, null);
    return;
  }
  // if non-200 status, assume server error
  if (response.statusCode !== 200) {
    const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
    callback(Error(msg), null);
    return;
  }

});
}

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
    let times;
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    times = JSON.parse(body);

    callback(error, times);

    // inside the request callback ...
  // error can be set if invalid domain, user is offline, etc.
  if (error) {
    callback(error, null);
    return;
  }
  // if non-200 status, assume server error
  if (response.statusCode !== 200) {
    const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
    callback(Error(msg), null);
    return;
  }

  // if we get here, all's well and we got the data
  });
  };

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
