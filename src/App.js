import React, { Component, useState } from 'react';
import { HexGrid, Layout, Hexagon, Text, Pattern, Hex } from 'react-hexgrid';
import Select, { createFilter } from 'react-select';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import ErrorIcon from '@mui/icons-material/Error';
import hexagonData from './hexagonMap';
import runeList from './runes.json';
import './App.css';

const runeListWithIndex = runeList.map((rune, index) => {
  return {
    label: rune.name,
    value: index,
    image1: rune.image1,
    image2: rune.image2,
  };
});

const Checkbox = (props: JSX.IntrinsicElements['input']) => (
  <input type="checkbox" {...props} />
);

function App() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [open, setOpen] = useState(false);
  const [additionalHexagons, setAdditionalHexagons] = useState([]);

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
      handleClick();
      return;
    }

    let rune = selectedOption.value;

    event.target.setAttribute("fill", `url(#${rune})`);

    if (selectedOption.image2) {
      console.log(event.target.parentNode.parentNode);

      // Get the Hexagon component that was clicked
      const clickedHexagon = event.target.parentNode.parentNode;
      const { q, r, s } = clickedHexagon.dataset;
      // Add a new hexagon with the image2 fill to the additionalHexagons state
      setAdditionalHexagons((prevHexagons) => [
        ...prevHexagons,
        { q: parseInt(q), r: parseInt(r), s: parseInt(s), fill: `url(#image2-${selectedOption.image2})` },
      ]);
    }
    setSelectedOption(null);
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
          <Checkbox
            id="cypress-single__clearable-checkbox"
          />
        </div>
        <div className='grid'>
          <HexGrid width={1200} height={1200} viewBox={viewBox}>
            <Layout size={hexagonSize} flat={false} spacing={1.1} origin={{ x: 15, y: -40 }}>
              {hexagonData.map((hex, i) => <Hexagon key={i} q={hex.q} r={hex.r} s={hex.s} data-q={hex.q} data-r={hex.r} data-s={hex.s} onClick={(event) => { handleRuneSelection(event) }} />)}

            </Layout>
            {runeList.map((rune, i) => (
                <Pattern id={i} link={rune.image1} size={hexImgSize} />
            ))}
          </HexGrid>

        </div>
      </div>
    </div>
  );
}


export default App;