import Card from '@mui/joy/Card';
import { getTemperatureUnitForUnitSystem, convertToUnitSystem } from '@/util/units';
import type { CurrentWeatherCondition, Units } from '@/util/api';

export type CurrentConditionsProps = {
  weather: CurrentWeatherCondition;
  location: string; // the "resolved" location
  units: Units;
}

export const CurrentConditions = ({ weather, location, units }: CurrentConditionsProps) => {
  const tempUnit = getTemperatureUnitForUnitSystem(units)
  return (
    <>
    <h2>Current conditions</h2>
    <h3>{location}</h3>
      <Card
        color="neutral"
        orientation="horizontal"
        size="md"
        variant="soft">
        <ul className="current">
          <li className="weather-icon">
            <img src={`icons/${weather.icon}.svg`} alt="" />
          </li>
          <li className="temp">{convertToUnitSystem(weather.temp, units)}°{tempUnit}</li>
          <li className="conditions">{weather.conditions}</li>
        </ul>
      </Card>
    </>
  );
}
