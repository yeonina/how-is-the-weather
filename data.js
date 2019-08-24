/**
 * 우리가 받은 날씨정보 객체에서
 * {
 *   weather: {
 *     main: '' // 이 값
 *   }
 * }
 * weather.main 에서 나올 수 있는 값들을 아래 객체의 key로 두었습니다.
 *
 * 나올 수 있는 값들에 대한 정보는 아래 link에서 확인하실 수 있습니다.
 * https://openweathermap.org/weather-conditions
 */
const imgLinks = {
  Clear: "sun.png",
  Rain: "rain.png",
  Snow: "snowing.png",
  Clouds: "cloudy.png"
};
const bgcolor = {
  Clear : 'linear-gradient(to right, #ff7e5f, #feb47b)',
  Rain: 'linear-gradient(to right, #3a7bd5, #3a6073)',
  Snow: 'linear-gradient(to right, #6190e8, #a7bfe8)',
  Clouds : 'linear-gradient(to right, #bdc3c7, #2c3e50)'
}
