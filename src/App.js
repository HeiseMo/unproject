import React, { Component, useState } from 'react';
import { HexGrid, Layout, Hexagon, Text, Pattern, Hex } from 'react-hexgrid';
import Select from 'react-select';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import './App.css';


const options = [
  { value: 'lightningStrike', label: 'Lightning Strike' },
  { value: 'frostWave', label: 'Frost Wave' },
  { value: 'shoutOfTerror', label: 'Shout of Terror' },
];

function App() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [open, setOpen] = useState(false);

  const hexagonSize = { x: 8, y: 8 };
  const hexImgSize = { x: 7, y: 8 };
  const viewBox = `-50 -50 100 100`;
  let hexagonData = [
    { q: -3, r: 0, s: 3 },
    { q: -2, r: 0, s: 2 },
    { q: -1, r: 0, s: 1 },
    { q: 0, r: 0, s: 0 },
    { q: 1, r: 0, s: -1 },
    { q: -4, r: 1, s: 3 },
    { q: -3, r: 1, s: 2 },
    { q: -2, r: 1, s: 1 },
    { q: -1, r: 1, s: 0 },
    { q: 0, r: 1, s: -1 },
    { q: 1, r: 1, s: -2 },
    { q: -5, r: 2, s: 3 },
    { q: -4, r: 2, s: 2 },
    { q: -3, r: 2, s: 1 },
    { q: -2, r: 2, s: 0 },
    { q: -1, r: 2, s: -1 },
    { q: -1, r: 2, s: -1 },
    { q: 0, r: 2, s: -2 },
    { q: 1, r: 2, s: -3 },
    { q: -6, r: 3, s: 3 },
    { q: -5, r: 3, s: 2 },
    { q: -4, r: 3, s: 1 },
    { q: -3, r: 3, s: 0 },
    { q: -2, r: 3, s: -1 },
    { q: -1, r: 3, s: -2 },
    { q: 0, r: 3, s: -3 },
    { q: 1, r: 3, s: -4 },
    { q: -6, r: 4, s: 4 },
    { q: -5, r: 4, s: 3 },
    { q: -4, r: 4, s: 2 },
    { q: -3, r: 4, s: 1 },
    { q: -2, r: 4, s: 0 },
    { q: -1, r: 4, s: -1 },
    { q: 0, r: 4, s: -2 },
    { q: -6, r: 5, s: 5 },
    { q: -5, r: 5, s: 4 },
    { q: -4, r: 5, s: 3 },
    { q: -3, r: 5, s: 2 },
    { q: -2, r: 5, s: 1 },
    { q: -1, r: 5, s: 0 },
    { q: -6, r: 6, s: 6 },
    { q: -5, r: 6, s: 5 },
    { q: -4, r: 6, s: 4 },
    { q: -3, r: 6, s: 3 },
    { q: -2, r: 6, s: 2 }];
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
            options={options}
          />
        </div>
        <div className='grid'>
          <HexGrid width={1200} height={1200} viewBox={viewBox}>
            <Layout size={hexagonSize} flat={false} spacing={1} origin={{ x: 15, y: -40 }}>
              {hexagonData.map((hex, i) => <Hexagon key={i} q={hex.q} r={hex.r} s={hex.s} onClick={(event) => { handleRuneSelection(event) }} />)}
            </Layout>

            <Pattern id="lightningStrike" link="http://www.vhpg.com/t/undecember/Icon_Skill_LightningHit_01.png" size={hexImgSize}>
            </Pattern>
            <Pattern id="frostWave" link="http://www.vhpg.com/t/undecember/LinkSkill_Bg_Intellect_01.png" size={hexImgSize}>
            </Pattern>
            <Pattern id="shoutOfTerror" link="http://www.vhpg.com/t/undecember/Icon_Skill_BattleCry_01.png" size={hexImgSize}>
            </Pattern>
          </HexGrid>

        </div>
      </div>
    </div>
  );
}


export default App;