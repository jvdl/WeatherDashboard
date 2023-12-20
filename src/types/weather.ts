
// These types aren't representative of the full set of data returned from the API,
// just the fields that we're interested in using in this app.

type _WithDate = {
    datetime: string,
    datetimeEpoch: number,
}

export type CurrentWeatherCondition = _WithDate & {
    conditions: string, // "Overcast",
    feelslike: number,
    icon: string, // "cloudy",
    temp: number,
}

export type Weather = _WithDate & {
  temp: number, // 64.5,
  feelslike: number, // 64.5,
  humidity: number, // 95.1,
  precip: number, // 1.125,
  precipprob: number, // 100,
  precipcover: number, // 87.5,
  preciptype: string[], // [ 'rain' ]
  pressure: number, // 1012,
  cloudcover: number, // 100,
  uvindex: number, // 0,
  conditions: string, // "Overcast",
  icon: string, // "cloudy",
}

export type DailyWeather = Weather & {
  tempmax: number, // 69.8,
  tempmin: number, // 58.7,
  description: string, // "Cloudy skies throughout the day with a chance of rain throughout the day.",
  hours: Weather[]
};

export type LocationWeather = {
  latitude: number, // -33.8696,
  longitude: number, // 151.207,
  resolvedAddress: string, // "Sydney, NSW 2000, Australia",
  timezone: string, // "Australia/Sydney",
  tzoffset: number, // 11,
  description: string, // "Similar temperatures continuing with no rain expected.",
  currentConditions: CurrentWeatherCondition,
  days: DailyWeather[],
}

export type Units = 'metric' | 'us';
