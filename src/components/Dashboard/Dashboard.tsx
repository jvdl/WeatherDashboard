import getWeather from '@/util/api';
import { ForecastForm } from './ForecastForm';
import { CurrentConditions } from './CurrentConditions';
import { HourlyForecast } from './HourlyForecast';
import Alert from '@mui/joy/Alert';
import Grid from '@mui/joy/Grid';
import type { LocationWeather, CurrentWeatherCondition, Weather, DailyWeather } from '@/util/api';

import { useState } from 'react';

import './Dashboard.scss';


const FORECAST_HOURS = 6

const getHourlyForecast = (days: DailyWeather[]): Weather[] => {
  // get the current hour and based on that get the forecast for the next FORECAST_HOURS hours
  // ensuring that if the amount is higher than the number of hours left in the day, we get the
  // remaining hours from the next day

  let startDay = 0; // the index of the days array to start at
  let currentHour = (new Date()).getHours() + 1;
  if (currentHour > 23) {
    currentHour = 0;
    startDay = 1;
  }
  const hourlyForecasts = days[startDay].hours.slice(currentHour, currentHour + FORECAST_HOURS);
  // Keep adding hours until we've met the number of hours we need
  while (hourlyForecasts.length < FORECAST_HOURS) {
    hourlyForecasts.push(...days[++startDay].hours.slice(0, FORECAST_HOURS - hourlyForecasts.length));
  }

  return hourlyForecasts;
}

export default function Dashboard() {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ city, setCity ] = useState('Sydney, Australia'); // @todo: remove default
  const [ currentConditions, setCurrentConditions ] = useState<CurrentWeatherCondition>(null);
  const [ errorMessage, setErrorMessage ] = useState<string>(null);
  const [ forecast, setForecast ] = useState<Weather[]>(null); // @todo: remove default

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!city.trim()) {
      // @todo: Show error message for invalid/empty value
      return;
    }
    setIsLoading(true);
    try {
      const today = '2023-12-20T10:33:49.276Z';
      // const today =  (new Date()).toISOString();
      const res: LocationWeather = await getWeather(city, today, FORECAST_HOURS);

      handleResponse(res);
    } catch (e) {
      console.error(e);
      setErrorMessage(e.message);
    } finally {
      setIsLoading(false);
    }
  }

  const onCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  }

  const handleResponse = (weather: WeatherForecast) => {

    const {
      icon, temp, conditions
    } = weather.currentConditions

    setCurrentConditions({ icon, temp, conditions })

    setForecast(getHourlyForecast(weather.days));
  }

  return (
    <div className="dashboard">
      <h1>Weather Dashboard</h1>
      <Grid xs={12} container spacing={2}>
        <ForecastForm
          onSubmit={onSubmit}
          onCityChange={onCityChange}
          city={city}
          isLoading={isLoading}
        />
        <Grid xs={12} spacing={2} className="weather" container>
          { errorMessage ? <Alert color="danger">{errorMessage}</Alert> : null }
          { !isLoading && currentConditions ?
            <>
              <Grid xs={12} spacing={1} className="current-conditions">
                <CurrentConditions weather={currentConditions} />
              </Grid>
              <Grid xs={12} spacing={1} className="hourly-forecast" container>
                <HourlyForecast forecast={forecast} />
              </Grid>
            </>
          : null }
        </Grid>
      </Grid>
    </div>
  )
}
