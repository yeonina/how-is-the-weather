const searchForm = document.getElementById("searchForm");
const input = document.getElementById("searchText");
const temp = document.getElementById("temp");
const city = document.getElementById("city");
const image = document.getElementById("image");

searchForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const text = input.value;

  input.value = "";
  input.disabled = true;

  getGeoCode(text)
    .then(function(code) {
      return getWeatherData(code.lat, code.lng);
    })
    .then(function(weatherInfo) {
      setWeatherInfo(text, weatherInfo);
    })
    .catch(function(err) {
      console.log("에러가 발생했습니다.", err);
      input.disabled = false;
    });
});

// 1. {lat, lng}의 형식의 값을 리턴해 주어야합니다.
function getGeoCode(city) {
  return new Promise(function(resolve, reject) {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${GOOGLE_KEY}`
    ).then(function(response) {
      response.json().then(function(data) {
        /**
         * - 아래의 JSON 데이터에서 우리가 필요한 정보만 찾아 resolve에 인풋으로 넣어주세요!
         *
         * * resolve에 넘겨주어야 하는 input 형식
         * {
         *   lat: 위도,
         *   lng: 경도
         * }
         */
        console.log("우리가 받은 위치 데이터 ", data);

        resolve(data.results[0].geometry.location);
      });
    });
  });
}

// 2. 위도, 경도를 바탕으로 해당 지역의 날씨를 가지고 옵니다.
function getWeatherData(lat, lng) {
  return new Promise(function(resolve, reject) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=${WEATHER_KEY}`
    ).then(function(response) {
      response.json().then(function(data) {
        /**
         * - 아래의 JSON 데이터에서 우리가 필요한 정보만 찾아 resolve에 인풋으로 넣어주세요!
         *
         * * resolve에 넘겨주어야 하는 input 형식
         * {
         *    temp: 기온
         *    weather: 날씨(데이터에서 weather -> main을 찾아 설정해주세요!)
         * }
         */
        console.log("우리가 받은 날씨 데이터 ", data);

        const weatherInfo = {
          temp: data.main.temp,
          weather: data.weather[0].main
        };

        resolve(weatherInfo);
      });
    });
  });
}

// 3. 저희가 받은 날씨 정보로 화면을 변경합니다.
function setWeatherInfo(cityName, weatherInfo) {
  /**
   * - 우리가 받아온 온도는 Kelvin 형식으로 표시되어있습니다.
   * - 어떻게 Celsius 형식으로 변경할 수 있을까요?
   */
  const celsious = Math.round(weatherInfo.temp - 273.15);

  city.innerText = cityName;
  temp.innerText = celsious;

  const weatherLink = imgLinks[weatherInfo.weather] || "sun.png";
  image.src = `./img/${weatherLink}`;

  input.disabled = false;
}
