import React, { useState } from 'react';
import { Autocomplete, TextField, Button, Typography } from '@mui/material';
// import axios from 'axios';

const companies = [
  { code: 'AAPL', name: 'Apple Inc.' },
  { code: 'MSFT', name: 'Microsoft Corporation' },
  { code: 'GOOGL', name: 'Alphabet Inc. (Class A)' },
  { code: 'AMZN', name: 'Amazon.com Inc.' },
  { code: 'META', name: 'Meta Platforms, Inc. (formerly Facebook, Inc.)' },
  { code: 'NVDA', name: 'NVIDIA Corporation' },
  { code: 'TSLA', name: 'Tesla, Inc.' },
  { code: 'AMD', name: 'Advanced Micro Devices, Inc.' },
  { code: 'NFLX', name: 'Netflix, Inc.' },
  { code: 'ADBE', name: 'Adobe Inc.' },
  { code: 'INTC', name: 'Intel Corporation' },
  { code: 'CSCO', name: 'Cisco Systems, Inc.' },
  { code: 'IBM', name: 'International Business Machines Corporation' },
  { code: 'ORCL', name: 'Oracle Corporation' },
  { code: 'CRM', name: 'Salesforce, Inc.' },
  { code: 'TXN', name: 'Texas Instruments Incorporated' },
  { code: 'QCOM', name: 'QUALCOMM Incorporated' },
  { code: 'AVGO', name: 'Broadcom Inc.' },
  { code: 'MU', name: 'Micron Technology, Inc.' },
  { code: 'AMAT', name: 'Applied Materials, Inc.' },
  { code: 'MRNA', name: 'Moderna, Inc.' },
  { code: 'PFE', name: 'Pfizer Inc.' },
  { code: 'JNJ', name: 'Johnson & Johnson' },
  { code: 'AZN', name: 'AstraZeneca PLC' },
  { code: 'BNTX', name: 'BioNTech SE' },
  { code: 'NVAX', name: 'Novavax, Inc.' },
  { code: 'LLY', name: 'Eli Lilly and Company' },
  { code: 'ABBV', name: 'AbbVie Inc.' },
  { code: 'REGN', name: 'Regeneron Pharmaceuticals, Inc.' },
  { code: 'XOM', name: 'Exxon Mobil Corporation' },
  { code: 'CVX', name: 'Chevron Corporation' },
  { code: 'BP', name: 'BP p.l.c.' },
  { code: 'COP', name: 'ConocoPhillips' },
  { code: 'VLO', name: 'Valero Energy Corporation' },
  { code: 'PSX', name: 'Phillips 66' },
  { code: 'MPC', name: 'Marathon Petroleum Corporation' },
  { code: 'OXY', name: 'Occidental Petroleum Corporation' },
  { code: 'JPM', name: 'JPMorgan Chase & Co.' },
  { code: 'BAC', name: 'Bank of America Corporation' },
  { code: 'WFC', name: 'Wells Fargo & Company' },
  { code: 'C', name: 'Citigroup Inc.' },
  { code: 'GS', name: 'The Goldman Sachs Group, Inc.' },
  { code: 'MS', name: 'Morgan Stanley' },
  { code: 'AXP', name: 'American Express Company' },
  { code: 'BK', name: 'The Bank of New York Mellon Corporation' },
  { code: 'BLK', name: 'BlackRock, Inc.' },
  { code: 'TROW', name: 'T. Rowe Price Group, Inc.' },
  { code: 'KO', name: 'The Coca-Cola Company' },
  { code: 'PEP', name: 'PepsiCo, Inc.' },
  { code: 'COST', name: 'Costco Wholesale Corporation' },
  { code: 'WMT', name: 'Walmart Inc.' },
  { code: 'TGT', name: 'Target Corporation' },
  { code: 'HD', name: 'The Home Depot, Inc.' },
  { code: 'LOW', name: "Lowe's Companies, Inc." },
  { code: 'KR', name: 'The Kroger Co.' },
  { code: 'SYY', name: 'Sysco Corporation' },
  { code: 'ADM', name: 'Archer-Daniels-Midland Company' },
  { code: 'DIS', name: 'The Walt Disney Company' },
  { code: 'CMCSA', name: 'Comcast Corporation' },
  { code: 'TMUS', name: 'T-Mobile US, Inc.' },
  { code: 'VZ', name: 'Verizon Communications Inc.' },
  { code: 'T', name: 'AT&T Inc.' },
  { code: 'CHTR', name: 'Charter Communications, Inc.' },
  { code: 'NWS', name: 'News Corporation' },
  { code: 'NKE', name: 'NIKE, Inc.' },
  { code: 'ADDYY', name: 'adidas AG' },
  { code: 'PUMA', name: 'Puma SE' },
  { code: 'UAA', name: 'Under Armour, Inc.' },
  { code: 'SKX', name: 'Skechers U.S.A., Inc.' },
  { code: 'DECK', name: 'Deckers Outdoor Corporation' },
  { code: 'LULU', name: 'Lululemon Athletica Inc.' },
  { code: 'COLM', name: 'Columbia Sportswear Company' },
  { code: 'CROX', name: 'Crocs, Inc.' },
  { code: 'FL', name: 'Foot Locker, Inc.' },
  { code: 'FDX', name: 'FedEx Corporation' },
  { code: 'UPS', name: 'United Parcel Service, Inc.' },
  { code: 'DAL', name: 'Delta Air Lines, Inc.' },
  { code: 'LUV', name: 'Southwest Airlines Co.' },
  { code: 'UAL', name: 'United Airlines Holdings, Inc.' },
  { code: 'AAL', name: 'American Airlines Group Inc.' },
  { code: 'HA', name: 'Hawaiian Holdings, Inc.' },
  { code: 'JBLU', name: 'JetBlue Airways Corporation' },
  { code: 'ALK', name: 'Alaska Air Group, Inc.' },
  { code: 'SAVE', name: 'Spirit Airlines, Inc.' },
  { code: 'GILD', name: 'Gilead Sciences, Inc.' },
];

const CompanySelector = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleCompanyChange = (event, value) => {
    setSelectedCompany(value);
  };

  const handleButtonClick = () => {
    if (selectedCompany) {
      const selectedCode = selectedCompany.code;
      alert(`Selected Company: ${selectedCompany.name}\nStock Code: ${selectedCode}`);
      // axios.get(`YOUR_API_ENDPOINT/${selectedCode}`)
      //   .then(response => {
      //     console.log(response.data); // Handle the API response
      //     alert(`Selected Company: ${selectedCompany.name}\nResponse: ${JSON.stringify(response.data)}`);
      //   })
      //   .catch(error => {
      //     console.error(error); // Handle any errors
      //   });
      setSelectedCompany(null); // Clear the selected company
    } else {
      alert('Please select a company first.');
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom sx={{ marginTop: 5 }}>
        Stocks Planner
      </Typography>
      <Autocomplete
        options={companies}
        getOptionLabel={(option) => option.name}
        value={selectedCompany}
        onChange={handleCompanyChange}
        renderInput={(params) => <TextField {...params} label="Select Company" variant="outlined" />}
      />
      <Button variant="contained" color="primary" onClick={handleButtonClick} style={{ marginTop: 16,marginBottom:20 }}>
        Check Stock
      </Button>
    </div>
  );
};

export default CompanySelector;
