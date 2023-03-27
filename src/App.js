import React, { Component, useState } from 'react';
import { HexGrid, Layout, Hexagon, Text, Pattern, Hex } from 'react-hexgrid';
import Select from 'react-select';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import ErrorIcon from '@mui/icons-material/Error';
import hexagonData from './hexagonMap';
import runeList from './runes.json';
import './App.css';


const options = [
  { value: 'lightningStrike', label: 'Lightning Strike' },
  { value: 'frostWave', label: 'Frost Wave' },
  { value: 'shoutOfTerror', label: 'Shout of Terror' },
];

const runeListWithIndex = runeList.map((rune, index) => {
  return {
    label: rune.name,
    value: index
  };
});

console.log(runeListWithIndex)

function App() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [open, setOpen] = useState(false);

  const hexagonSize = { x: 8, y: 8 };
  const hexImgSize = { x: 7, y: 8 };
  const viewBox = `-50 -50 100 100`;

  //Write an algo to generate the hexagonData array
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleRuneSelection = (event) => {
    if (!selectedOption) {
      //return showAlert("Please select a rune first");
      handleClick()
      return
    }
    let rune = selectedOption.value;
    setSelectedOption(null);
    return event.target.setAttribute("fill", `url(#${rune})`);
  };

  return (
    <div className="layer">
      <div className="App">
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert icon={<ErrorIcon font-fontWeight={2} />} variant="filled" onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              <AlertTitle>Error</AlertTitle>
              You Must Select a Rune First!
            </Alert>
          </Snackbar>
        </Stack>
        <div className="search">
          <Select
            key={selectedOption ? selectedOption.value : 'Select a rune'}
            className="my-select"
            classNamePrefix="my-select"
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={runeListWithIndex}
          />
        </div>
        <div className='grid'>
          <HexGrid width={1200} height={1200} viewBox={viewBox}>
            <Layout size={hexagonSize} flat={false} spacing={1.1} origin={{ x: 15, y: -40 }}>
              {hexagonData.map((hex, i) => <Hexagon key={i} q={hex.q} r={hex.r} s={hex.s} onClick={(event) => { handleRuneSelection(event) }} />)}
            </Layout>
            {runeList.map((rune, i) => <Pattern id={i} link={rune.image} size={hexImgSize}/>)}
          </HexGrid>

        </div>
      </div>
    </div>
  );
}


export default App;