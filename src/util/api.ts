import type { LocationWeather } from '@/types/weather';

const API_BASE_URL = import.meta.env.VITE_VC_API_BASE_URL;
const API_KEY = import.meta.env.VITE_VC_API_KEY;

/**
 * Get the ISO date for a given number of hours in the future
 * @param hours - The number of hours to get the time for
 */
const getFutureDateForHours = (hours: number): string => {
  const hoursInMilliseconds = hours * 60 * 60 * 1000;
  return (new Date(Date.now() + hoursInMilliseconds)).toISOString()
}

/**
 * @param location - The location to get the weather for
 * @param date - The date to get the weather for
 * @param forecastHours - The minimum number of hours to forecast, if there are less than this amount
 *                        of hours in the forecast, the forecast will be extended to meet this number
 */
export default async function getWeather(location: string, date: string, forecastHours: number): Promise<LocationWeather>{
  const endDateParam = forecastHours ? `/${getFutureDateForHours(forecastHours)}` : '';
  const response = await fetch(`${API_BASE_URL}/${encodeURIComponent(location)}/${date}${endDateParam}?key=${API_KEY}&unitGroup=metric&include=hours,current`);
  if (!response.ok) {
    throw new Error('There was a problem fetching the weather data');
  }
  return await response.json();
}
