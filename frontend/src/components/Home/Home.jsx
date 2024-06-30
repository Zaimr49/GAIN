import React, { useState } from "react";
import { useForm } from "react-cool-form";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Button,
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  LovingDoodle,
  MeditatingDoodle,
  JumpingDoodle,
  CoffeeDoodle,
  DoggieDoodle,
  ReadingDoodle,
} from "react-open-doodles";
import CompanyStocksPrediction from "../CompanyStocksPrediction/CompanyStocksPrediction";
import "./Home.css";
import axios from "axios";

const companies = [
  { code: "AAPL", name: "Apple Inc." },
  { code: "MSFT", name: "Microsoft Corporation" },
  { code: "GOOGL", name: "Alphabet Inc. (Class A)" },
  { code: "AMZN", name: "Amazon.com Inc." },
  { code: "META", name: "Meta Platforms, Inc. (formerly Facebook, Inc.)" },
  { code: "NVDA", name: "NVIDIA Corporation" },
  { code: "TSLA", name: "Tesla, Inc." },
  { code: "AMD", name: "Advanced Micro Devices, Inc." },
  { code: "NFLX", name: "Netflix, Inc." },
  { code: "ADBE", name: "Adobe Inc." },
  { code: "INTC", name: "Intel Corporation" },
  { code: "CSCO", name: "Cisco Systems, Inc." },
  { code: "IBM", name: "International Business Machines Corporation" },
  { code: "ORCL", name: "Oracle Corporation" },
  { code: "CRM", name: "Salesforce, Inc." },
  { code: "TXN", name: "Texas Instruments Incorporated" },
  { code: "QCOM", name: "QUALCOMM Incorporated" },
  { code: "AVGO", name: "Broadcom Inc." },
  { code: "MU", name: "Micron Technology, Inc." },
  { code: "AMAT", name: "Applied Materials, Inc." },
  { code: "MRNA", name: "Moderna, Inc." },
  { code: "PFE", name: "Pfizer Inc." },
  { code: "JNJ", name: "Johnson & Johnson" },
  { code: "AZN", name: "AstraZeneca PLC" },
  { code: "BNTX", name: "BioNTech SE" },
  { code: "NVAX", name: "Novavax, Inc." },
  { code: "LLY", name: "Eli Lilly and Company" },
  { code: "ABBV", name: "AbbVie Inc." },
  { code: "REGN", name: "Regeneron Pharmaceuticals, Inc." },
  { code: "XOM", name: "Exxon Mobil Corporation" },
  { code: "CVX", name: "Chevron Corporation" },
  { code: "BP", name: "BP p.l.c." },
  { code: "COP", name: "ConocoPhillips" },
  { code: "VLO", name: "Valero Energy Corporation" },
  { code: "PSX", name: "Phillips 66" },
  { code: "MPC", name: "Marathon Petroleum Corporation" },
  { code: "OXY", name: "Occidental Petroleum Corporation" },
  { code: "JPM", name: "JPMorgan Chase & Co." },
  { code: "BAC", name: "Bank of America Corporation" },
  { code: "WFC", name: "Wells Fargo & Company" },
  { code: "C", name: "Citigroup Inc." },
  { code: "GS", name: "The Goldman Sachs Group, Inc." },
  { code: "MS", name: "Morgan Stanley" },
  { code: "AXP", name: "American Express Company" },
  { code: "BK", name: "The Bank of New York Mellon Corporation" },
  { code: "BLK", name: "BlackRock, Inc." },
  { code: "TROW", name: "T. Rowe Price Group, Inc." },
  { code: "KO", name: "The Coca-Cola Company" },
  { code: "PEP", name: "PepsiCo, Inc." },
  { code: "COST", name: "Costco Wholesale Corporation" },
  { code: "WMT", name: "Walmart Inc." },
  { code: "TGT", name: "Target Corporation" },
  { code: "HD", name: "The Home Depot, Inc." },
  { code: "LOW", name: "Lowe's Companies, Inc." },
  { code: "KR", name: "The Kroger Co." },
  { code: "SYY", name: "Sysco Corporation" },
  { code: "ADM", name: "Archer-Daniels-Midland Company" },
  { code: "DIS", name: "DIS - The Walt Disney Company" },
  { code: "CMCSA", name: "Comcast Corporation" },
  { code: "TMUS", name: "T-Mobile US, Inc." },
  { code: "VZ", name: "Verizon Communications Inc." },
  { code: "T", name: "AT&T Inc." },
  { code: "CHTR", name: "Charter Communications, Inc." },
  { code: "NWS", name: "News Corporation" },
  { code: "GILD", name: "Gilead Sciences, Inc." },
  { code: "NKE", name: "NIKE, Inc." },
  { code: "ADDYY", name: "adidas AG" },
  { code: "PUMA", name: "Puma SE" },
  { code: "UAA", name: "Under Armour, Inc." },
  { code: "SKX", name: "Skechers U.S.A., Inc." },
  { code: "DECK", name: "Deckers Outdoor Corporation" },
  { code: "LULU", name: "Lululemon Athletica Inc." },
  { code: "COLM", name: "Columbia Sportswear Company" },
  { code: "CROX", name: "Crocs, Inc." },
  { code: "FL", name: "Foot Locker, Inc." },
  { code: "FDX", name: "FedEx Corporation" },
  { code: "UPS", name: "United Parcel Service, Inc." },
  { code: "DAL", name: "Delta Air Lines, Inc." },
  { code: "LUV", name: "Southwest Airlines Co." },
  { code: "UAL", name: "United Airlines Holdings, Inc." },
  { code: "AAL", name: "American Airlines Group Inc." },
  { code: "HA", name: "Hawaiian Holdings, Inc." },
  { code: "JBLU", name: "JetBlue Airways Corporation" },
  { code: "ALK", name: "Alaska Air Group, Inc." },
  { code: "SAVE", name: "Spirit Airlines, Inc." },
];

function Home() {
  const [open, setOpen] = useState(false);
  const [investmentAdvice, setInvestmentAdvice] = useState("");
  const { form, use, reset } = useForm({
    defaultValues: {
      age: "",
      risk: "",
      amount: "",
      term: "",
      diversity: "",
    },
    validate: (values) => {
      const errors = {};
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:5002/predict/stock",
          {
            Age_Group: values.age,
            Risk_Level: values.risk,
            Amount_to_Invest: values.amount,
            Investment_Term: values.term,
            Diversity_Option: "Just one stock",
          }
        );
        console.log(response.data);
        setInvestmentAdvice(response.data["Investment Advice"]);
        setOpen(true);
      } catch (error) {
        console.error(error);
      }
      reset();
    },
  });

  const errors = use("errors");

  const ageOptions = ["16-18", "18-24", "24-34", "34-45", "45+"];
  const riskOptions = [
    "High risk- high return",
    "medium risk- medium return",
    "low risk- low return",
  ];
  const amountOptions = ["0-50k", "100k-500k", "500k-1m"];
  const termOptions = [
    "Intraday",
    "2-4 weeks",
    "1-3 months",
    "1-3 years",
    "3-5 years",
    "5-10 years",
  ];
  const diversityOptions = [
    "Just one stock",
    "multiple stocks",
    "multiple sectors",
    "hybrid",
  ];


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
            <FormControl
              fullWidth
              margin="normal"
              variant="filled"
              error={!!errors.age}
            >
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

            <FormControl
              fullWidth
              margin="normal"
              variant="filled"
              error={!!errors.risk}
            >
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

            <FormControl
              fullWidth
              margin="normal"
              variant="filled"
              error={!!errors.amount}
            >
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

            <FormControl
              fullWidth
              margin="normal"
              variant="filled"
              error={!!errors.term}
            >
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

            <FormControl
              fullWidth
              margin="normal"
              variant="filled"
              error={!!errors.diversity}
            >
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
              style={{ marginTop: "20px" }}
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
      <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="investment-advice-title"
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle id="investment-advice-title">
            Investment Advice
            <IconButton
              aria-label="close"
              onClick={() => setOpen(false)}
              style={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers style={{ textAlign: "center" }}>
            <Typography gutterBottom>The <b>Company</b> you should <b>INVEST</b> in is: <u style={{color:"#1876D1"}}><b>{companies.find((company) => company.code === investmentAdvice)
            ?.name || investmentAdvice}</b></u></Typography>
          </DialogContent>
          
        </Dialog>
    </Container>
  );
}

export default Home;
