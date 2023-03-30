import React, { useEffect, useState } from 'react';
import { HexGrid, Layout, Hexagon, Text, Pattern, Hex } from 'react-hexgrid';
import Select, { createFilter } from 'react-select';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import ErrorIcon from '@mui/icons-material/Error';
import runeList from './runes.json';

import InfoBox from './components/InfoBox';
import './App.css';

const runeListWithIndex = runeList.map((rune, index) => {
  return {
    label: rune.name,
    value: index,
    image1: rune.image1,
    description: rune.description,
    tags: rune.tags,
    mana_cost: rune.mana_cost,
    cooldown: rune.cooldown
  };
});


function App() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [open, setOpen] = useState(false);
  const [gridInfo, setGridInfo] = useState([]);
  const [selectedHexagons, setSelectedHexagons] = useState([]);
  const [selectedRune, setSelectedRune] = useState(null);
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
    console.log('gridInfo changed: ', gridInfo);
  }, [gridInfo]);




  const hexagonSize = { x: 8, y: 8 };
  const hexImgSize = { x: 7, y: 8 };
  const viewBox = `-70 -70 140 140`;

  //Write an algo to generate the hexagonData array
  const handleClick = (event) => {

    const clickedHexagon = event.target.parentNode.parentNode;
    const { q, r, s } = clickedHexagon.dataset;
    const fill = gridInfo.find((hex) => hex.q === parseInt(q) && hex.r === parseInt(r) && hex.s === parseInt(s)).fill;
    console.log(fill, "fill")
    if (fill) {
      runeList.map((rune, index) => {
        if (index == fill) {
          setSelectedRune({
            label: rune.name,
            value: index,
            image1: rune.image1,
            description: rune.description,
            tags: rune.tags,
            mana_cost: rune.mana_cost,
            cooldown: rune.cooldown,
          });
        }
        setSelectedHexagons((prevSelectedHexagons) => [...prevSelectedHexagons, { hexagon: clickedHexagon, option: selectedOption }]);
      });
      /*i might need to store the details for the rune info in a different state so the runes are not filled when you click on a different one
      *****Maybe if you hover over it you see the rune info and if you click on it you can select it
      
      const updatedGridInfo = gridInfo.map((hex) => {
        if (hex.fill === fill) {
          return { ...hex, fill: `` };
        }
        return hex;
      });*/
    } else {
      setOpen(true);
    }

  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleRuneSelection = (event) => {
    if (!selectedOption) {
      handleClick(event);
      return;
    }
    let rune = selectedOption.value;
    const clickedHexagon = event.target.parentNode.parentNode;
    const { q, r, s } = clickedHexagon.dataset;

    runeList.map((rune, index) => {
      if (index === selectedOption.value) {
        setSelectedOption({
          label: rune.name,
          value: index,
          image1: rune.image1,
          description: rune.description,
          tags: rune.tags,
          mana_cost: rune.mana_cost,
          cooldown: rune.cooldown,
        });
      }
    });

    const updatedGridInfo = gridInfo.map((hex) => {
      if (hex.q === parseInt(q) && hex.r === parseInt(r) && hex.s === parseInt(s)) {
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
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: state.isFocused ? '#1f1f1f' : '#1f1f1f',
                color: state.isFocused ? "#1f1f1f" : "#1f1f1f",
              }),
            }}
          />

        </div>
        <div className='mainBox'>
          <div className='zodiacInfo'>
            {selectedOption ? (
              <div>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className='grid'>
            <HexGrid width={1800} height={1200} viewBox={viewBox}>
              <Layout size={hexagonSize} flat={false} spacing={1.2} origin={{ x: 15, y: -40 }}>
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
          <div className='runeInfo'>
            {selectedOption ? (
              <InfoBox info={selectedOption} />
            ) : selectedRune ? (
              <InfoBox info={selectedRune} />
            ) : (
              <h1>Select a Rune</h1>
            )}
          </div>
        </div>
      </div>
    </div >
  );
}


export default App;