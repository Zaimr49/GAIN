import React from 'react';
import { useForm } from 'react-cool-form';
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Button,
  FormHelperText,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
import { LovingDoodle, MeditatingDoodle, JumpingDoodle, CoffeeDoodle, DoggieDoodle, ReadingDoodle } from 'react-open-doodles';
import CompanySelector from '../CompanySelector/CompanySelector';
import './Home.css'; 

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
      <div className="grid-container">
        <div className="doodle-left">
          <CoffeeDoodle accent="#ff6347" ink="#1876d1" />
        <LovingDoodle accent="#ff0083" ink="#1876d1" />
          <DoggieDoodle accent="#ff4500" ink="#1876d1" />
        </div>
        <div className="form-container">
          <CompanySelector />
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
                <option value={1}>16-18</option>
                <option value={2}>18-24</option>
                <option value={3}>24-34</option>
                <option value={4}>34-45</option>
                <option value={5}>45+</option>
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
                <option value={3}>High risk- high return</option>
                <option value={2}>medium risk - medium return</option>
                <option value={1}>low risk - low return</option>
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
                <option value={1}>1-3 years</option>
                <option value={2}>3-5 years</option>
                <option value={3}>5-10 years</option>
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
                <option value={1}>single stock</option>
                <option value={2}>multiple stocks</option>
              </Select>
              <FormHelperText>{errors.diversity}</FormHelperText>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: '20px' }}
            >
              Suggested Investments
            </Button>
          </form>
        </div>
        <div className="doodle-right">
        <MeditatingDoodle accent="#008cff" ink="#1876d1" />
          <JumpingDoodle accent="#ffa500" ink="#1876d1" />
          <ReadingDoodle accent="#8a2be2" ink="#1876d1" />
        </div>
      </div>
    </Container>
  );
}

export default Home;
