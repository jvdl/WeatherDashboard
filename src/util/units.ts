import type { Units } from '@/types/weather';

export const getTemperatureUnitForUnitSystem = (systemUnit: Units): string => {
  if (systemUnit === 'metric') {
    return 'C'
  } else if (systemUnit === 'us') {
    return 'F'
  } else {
    return ''
  }
}
export const convertToUnitSystem = (value: number, systemUnit: Units): number => {
  if (systemUnit === 'metric') {
    return value
  } else if (systemUnit === 'us') {
    return ((value * 9/5) + 32).toFixed(1)
  } else {
    return value
  }
}
