import Grid from '@mui/joy/Grid';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';

export type ForecastFormProps = {
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  onCityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  city: string;
  isLoading: boolean;
}
export const ForecastForm = ({ onSubmit, onCityChange, city, isLoading }: ForecastFormProps) => (
  <form onSubmit={onSubmit} className="forecast-form">
    <FormControl>
      <Grid xs={12}>
        <FormLabel>City</FormLabel>
      </Grid>
      <Grid xs={12} spacing={2} container>
        <Grid xs={12} md={8}>
          <Input placeholder="Enter your city name" size="lg" onChange={onCityChange} value={city}/>
        </Grid>
        <Grid xs={12} md={4} display="flex" justifyContent="left">
          <Button xs={12} type="submit" size="lg" loading={isLoading}>Get forecast</Button>
        </Grid>
        <Grid xs={12}>
          <FormHelperText>Use the format City, State, Country, e.g. <em>Sydney, NSW, Australia</em></FormHelperText>
        </Grid>
      </Grid>
    </FormControl>
  </form>
)
