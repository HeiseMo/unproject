import React, { useEffect, useState } from 'react';
import { HexGrid, Layout, Hexagon, Text, Pattern, Hex } from 'react-hexgrid';
import Select, { createFilter } from 'react-select';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import ErrorIcon from '@mui/icons-material/Error';
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
  const [currentOption, setCurrentOption] = useState(null);
  const [open, setOpen] = useState(false);
  const [gridInfo, setGridInfo] = useState([]);

  //Need to add a state that takes selected runes and hexcoordinates and adds them to a new array to maintain state

  useEffect(() => {
    fetch('hexagonMap.json')
      .then((response) => response.json())
      .then((data) => {
        const updatedData = data.map((hex) => ({
          ...hex,
          fill: '',
        }));
        setGridInfo(updatedData);
      });
  }, []);

  useEffect(() => {
    console.log('gridInfo changed:234423', gridInfo);
  }, [gridInfo]);




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
      handleClick();
      return;
    }
    console.log("igothere")
    let rune = selectedOption.value;
    console.log(rune)

    const clickedHexagon = event.target.parentNode.parentNode;
    const { q, r, s } = clickedHexagon.dataset;
    console.log(clickedHexagon)

    const updatedGridInfo = gridInfo.map((hex) => {
      console.log(hex)
      if (hex.q === parseInt(q) && hex.r === parseInt(r) && hex.s === parseInt(s)) {
        console.log("IfoundmyHex")
        return { ...hex, fill: `${rune}` };
      }
      return hex;
    });

    setGridInfo(updatedGridInfo);
    setSelectedOption(null);
  };

  return (
    <div className="layer">
      <div className="App">
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert icon={<ErrorIcon />} variant="filled" onClose={handleClose} severity="error" sx={{ width: '100%' }}>
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
            {gridInfo.map((hex, index) => (
            <Hexagon
              key={index}
              q={hex.q}
              r={hex.r}
              s={hex.s}
              fill={hex.fill}
              onClick={handleRuneSelection}
              data-q={hex.q}
              data-r={hex.r}
              data-s={hex.s}
            />
          ))}
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