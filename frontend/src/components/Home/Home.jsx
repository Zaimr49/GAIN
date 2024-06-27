import React from 'react';
import { useForm } from 'react-cool-form';
import {
  Container,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Button,
  FormHelperText,
  OutlinedInput,
  InputAdornment,
  MenuItem,
} from '@mui/material';

function Home() {
  const { form, use, reset } = useForm({
    defaultValues: {
      age: '',
      risk: '',
      amount: '',
      term: '',
      diversity: '',
    },
    validate: (values) => {
      const errors = {};
      if (values.amount <= 0) {
        errors.amount = 'Amount must be greater than 0';
      }
      return errors;
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, undefined, 2));
      reset(); // Reset the form fields
    },
  });

  const errors = use("errors");

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ marginTop: 5 }}>
        Investment Planner
      </Typography>

      <form ref={form} noValidate>
        <FormControl fullWidth margin="normal" variant="filled" error={!!errors.age}>
          <InputLabel>Your Age*</InputLabel>
          <Select
            name="age"
            required
            native
          >
            <option aria-label="None" value="" />
            <option value={16}>16-18</option>
            <option value={18}>18-24</option>
            <option value={24}>24-34</option>
            <option value={34}>34+</option>
          </Select>
          <FormHelperText>{errors.age}</FormHelperText>
        </FormControl>

        <FormControl fullWidth margin="normal" variant="filled" error={!!errors.risk}>
          <InputLabel>Risk Involvement*</InputLabel>
          <Select
            name="risk"
            required
            native
          >
            <option aria-label="None" value="" />
            <option value="high">High Risk - High Return</option>
            <option value="medium">Medium Risk - Average Return</option>
            <option value="low">Low Risk - Low Return</option>
          </Select>
          <FormHelperText>{errors.risk}</FormHelperText>
        </FormControl>

        <FormControl fullWidth margin="normal" error={!!errors.amount}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount*</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            name="amount"
            type="number"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
            required
          />
          <FormHelperText>{errors.amount}</FormHelperText>
        </FormControl>

        <FormControl fullWidth margin="normal" variant="filled" error={!!errors.term}>
          <InputLabel>Term of Investment*</InputLabel>
          <Select
            name="term"
            required
            native
          >
            <option aria-label="None" value="" />
            <option value="intraday">Intraday</option>
            <option value="weeks">Weeks</option>
            <option value="1-3m">1-3 Months</option>
            <option value="1yr">1 Year</option>
            <option value="1-3yr">1-3 Years</option>
          </Select>
          <FormHelperText>{errors.term}</FormHelperText>
        </FormControl>

        <FormControl fullWidth margin="normal" variant="filled" error={!!errors.diversity}>
          <InputLabel>How Diverse*</InputLabel>
          <Select
            name="diversity"
            required
            native
          >
            <option aria-label="None" value="" />
            <option value="one">Just One</option>
            <option value="multiple-stocks">Multiple Stocks</option>
            <option value="multiple-sectors">Multiple Sectors</option>
            <option value="multiple-fields">Multiple Fields</option>
          </Select>
          <FormHelperText>{errors.diversity}</FormHelperText>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '20px' }}
        >
          Suggested Investments
        </Button>
      </form>
    </Container>
  );
}

export default Home;
