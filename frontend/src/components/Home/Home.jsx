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
} from '@mui/material';
import { LovingDoodle, MeditatingDoodle, JumpingDoodle, CoffeeDoodle, DoggieDoodle, ReadingDoodle } from 'react-open-doodles';
import CompanyStocksPrediction from '../CompanyStocksPrediction/CompanyStocksPrediction';
import './Home.css';
import axios from "axios"

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
      
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://127.0.0.1:5002/predict/stock', {
          Age_Group: values.age,
          Risk_Level: values.risk,
          Amount_to_Invest: values.amount,
          Investment_Term: values.term,
          Diversity_Option: "Just one stock" 
        });
        console.log(values)
        alert(response.data);
      } catch (error) {
        console.error(error); // Handle any errors
      }
      reset(); // Reset the form fields
    },
  });

  const errors = use("errors");

  // Replace with your actual data source
  const ageOptions = ['16-18', '18-24', '24-34', '34-45', '45+'];
  const riskOptions = ['High risk- high return', 'medium risk- medium return', 'low risk- low return'];
const amountOptions = ['0-50k', '100k-500k', '500k-1m'];

  const termOptions = ['Intraday', '2-4 weeks', '1-3 months', '1-3 years', '3-5 years', '5-10 years'];
  const diversityOptions = ['Just one stock', 'multiple stocks', 'multiple sectors', 'hybrid'];

  return (
    <Container>
      <div className="grid-container">
        <div className="doodle-left">
          <CoffeeDoodle accent="#ff6347" ink="#1876d1" />
          <LovingDoodle accent="#ff0083" ink="#1876d1" />
          <DoggieDoodle accent="#ff4500" ink="#1876d1" />
        </div>
        <div className="form-container">
          <CompanyStocksPrediction />
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
                value={form.age}
                onChange={form.handleChange}
              >
                <option aria-label="None" value="" />
                {ageOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
              <FormHelperText>{errors.age}</FormHelperText>
            </FormControl>

            <FormControl fullWidth margin="normal" variant="filled" error={!!errors.risk}>
              <InputLabel>Risk Involvement*</InputLabel>
              <Select
                name="risk"
                required
                native
                value={form.risk}
                onChange={form.handleChange}
              >
                <option aria-label="None" value="" />
                {riskOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
              <FormHelperText>{errors.risk}</FormHelperText>
            </FormControl>

            <FormControl fullWidth margin="normal" variant="filled" error={!!errors.amount}>
              <InputLabel>Amount to Invest*</InputLabel>
              <Select
                name="amount"
                required
                native
                value={form.amount}
                onChange={form.handleChange}
              >
                <option aria-label="None" value="" />
                {amountOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
              <FormHelperText>{errors.amount}</FormHelperText>
            </FormControl>

            <FormControl fullWidth margin="normal" variant="filled" error={!!errors.term}>
              <InputLabel>Term of Investment*</InputLabel>
              <Select
                name="term"
                required
                native
                value={form.term}
                onChange={form.handleChange}
              >
                <option aria-label="None" value="" />
                {termOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
              <FormHelperText>{errors.term}</FormHelperText>
            </FormControl>

            <FormControl fullWidth margin="normal" variant="filled" error={!!errors.diversity}>
              <InputLabel>How Diverse*</InputLabel>
              <Select
                name="diversity"
                required
                native
                value={form.diversity}
                onChange={form.handleChange}
              >
                <option aria-label="None" value="" />
                {diversityOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
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