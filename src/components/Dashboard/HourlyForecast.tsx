import Grid from '@mui/joy/Grid';
import Card from '@mui/joy/Card';
import { getTemperatureUnitForUnitSystem, convertToUnitSystem } from '@/util/units';
import type { Weather, Units } from '@/util/api';

export type HourlyForecastProps = {
  forecast: Weather[]
  units: Units
}
export const HourlyForecast = ({ forecast, units }: HourlyForecastProps) => {
  const tempUnit = getTemperatureUnitForUnitSystem(units)
  return (
    <>
      {forecast.map((hourlyForecast) => {
        const { icon, temp, datetimeEpoch, conditions } = hourlyForecast;
        const forecastDate = new Date(datetimeEpoch * 1000);
        // big @todo here would be to do better at timezone handling
        const isoDatetime = forecastDate.toISOString();
        const intlDateOpts = {
          weekday: 'short',
          month: 'numeric',
          day: 'numeric',
        };
        const intlTimeOpts = {
          hour: 'numeric',
          minute: 'numeric',
        };

        const formattedDate = (new Intl.DateTimeFormat(undefined, intlDateOpts)).format(forecastDate);
        const formattedTime = (new Intl.DateTimeFormat(undefined, intlTimeOpts)).format(forecastDate);
        return (
          <Grid xs={6} sm={4} md={2} key={datetimeEpoch} className="hourly-forecast-item">
            <Card variant="outlined" className="hourly-forecast-card">
              <time className="datetime" dateTime={isoDatetime}>
                <span className="date">{formattedDate}</span>
                {formattedTime}
              </time>
              <div className="weather-icon"><img src={`icons/${icon}.svg`} alt="" /></div>
              <span className="temp">{convertToUnitSystem(temp, units)}°{tempUnit}</span>
              <span className="conditions">{conditions}</span>
            </Card>
          </Grid>
        )
      })}
    </>
  );
}
