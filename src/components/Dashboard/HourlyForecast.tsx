import Grid from '@mui/joy/Grid';
import Card from '@mui/joy/Card';
import type { Weather } from '@/util/api';

export type HourlyForecastProps = {
  forecast: Weather[]
}
export const HourlyForecast = ({ forecast }: HourlyForecastProps) => (
  <>
    {forecast.map((hourlyForecast) => {
      const { icon, temp, datetimeEpoch, conditions } = hourlyForecast;
      const forecastDate = new Date(datetimeEpoch * 1000);
      const isoDatetime = forecastDate.toISOString();
      const localeDatetime = forecastDate.toLocaleString();
      return (
        <Grid xs={4} md={2} key={datetimeEpoch}>
          <Card variant="outlined" className="hourly-forecast-item">
            <time className="datetime" dateTime={isoDatetime}>{localeDatetime}</time>
            <div className="weather-icon"><img src={`icons/${icon}.svg`} alt="" /></div>
            <span className="temp">{temp}°C</span>
            <span className="conditions">{conditions}</span>
          </Card>
        </Grid>
      )
    })}
  </>
);
