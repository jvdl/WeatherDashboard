import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';
import Grid from '@mui/joy/Grid';
import Input from '@mui/joy/Input';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';

export type ForecastFormProps = {
  city: string;
  isLoading: boolean;
  onCityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  onUnitsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  units: 'metric' | 'us';
}

export const ForecastForm = ({
  city,
  isLoading,
  onCityChange,
  onSubmit,
  onUnitsChange,
  units,
}: ForecastFormProps) => (
  <form onSubmit={onSubmit} className="forecast-form">

    <FormControl>
      <Grid xs={12}>
        <FormLabel>City</FormLabel>
      </Grid>
      <Grid xs={12} spacing={2} container>
        <Grid xs={12} md={8}>
          <Input placeholder="Enter your city name" size="lg" onChange={onCityChange} value={city}/>
        </Grid>
        <Grid xs={12} md={4} display="flex" justifyContent={{ xs: "right", md: "left" }}>
          <Button xs={12} type="submit" size="lg" loading={isLoading}>Get forecast</Button>
        </Grid>

        <Grid xs={12} md={8}>
          <FormHelperText>Use the format City, State, Country, e.g. <em>Sydney, NSW, Australia</em></FormHelperText>
        </Grid>
        <Grid xs={12} md={4}>
          <FormControl>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormLabel sx={{ marginTop: '0.5rem' }}>Units</FormLabel>
              <RadioGroup
                orientation="horizontal"
                defaultValue="metric"
                name="weather-units"
                value={units}
                onChange={onUnitsChange}
                sx={{ my: 1 }}
              >
                <Radio value="metric" label="°C" />
                <Radio value="us" label="°F" />
              </RadioGroup>
            </Box>
          </FormControl>
        </Grid>
      </Grid>
    </FormControl>
  </form>
)
