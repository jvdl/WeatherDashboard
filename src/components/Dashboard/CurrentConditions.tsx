import Card from '@mui/joy/Card';
import type { CurrentWeatherCondition } from '@/util/api';

export type CurrentConditionsProps = {
  weather: CurrentWeatherCondition
}

export const CurrentConditions = ({ weather }: CurrentConditionsProps) => (
  <>
   <h2>Current conditions</h2>
    <Card
      color="neutral"
      orientation="horizontal"
      size="md"
      variant="soft">
      <ul className="current">
        <li className="weather-icon">
          <img src={`icons/${weather.icon}.svg`} alt="" />
        </li>
        <li className="conditions">{weather.conditions}</li>
        <li className="temp">{weather.temp}°C</li>
      </ul>
    </Card>
  </>
);
