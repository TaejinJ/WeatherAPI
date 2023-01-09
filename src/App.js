import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [location, setLocation] = useState('');
  const [result, setResult] = useState({});
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;
  const searchWeather = async (e) => {
    if (e.key === "Enter") {
      try {
        const data = await axios({
          method: 'get',
          url: url,

        })
        setResult(data);
        console.log(data);
      } catch (err) {
        alert(err);
      }
    }
  }

  return (
    <AppWrap>
      <div className='appContentWrap'>
        <div className='input__bg'>
          <input
            placeholder='도시를 입력해주세요 '
            type="text"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            onKeyDown={searchWeather}
          />
        </div>
        {
          Object.keys(result).length !== 0 && (
            <ResultWrap>
              <div className='city'>{result.data.name}</div>
              <div className='temp'>현재온도 : {Math.round(result.data.main.temp - 273.13)}도</div>
              <div className='sky'>날씨상태 : {result.data.weather[0].main}</div>
            </ResultWrap>
          )
        }
      </div>
    </AppWrap>
  );
}

export default App;

const AppWrap = styled.div`
  width: 100vw;
  height: 100vh;
  .appContentWrap {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    padding: 20px;
    
    
  }
 

  input {
     background-color: antiquewhite;
    padding: 16px;
    border: 2px white solid;
    border-radius: 16px;
  }
`;

const ResultWrap = styled.div`
  margin-top: 60px;
  border: 1px white solid;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
    background-color: antiquewhite;
  .city {
    font-size: 24px;
  }
  .temperature {
    font-size: 60px;
    margin-top: 8px;
  }
  .sky {
    font-size: 20px;
    margin-top: 8px;
    
  }
`;