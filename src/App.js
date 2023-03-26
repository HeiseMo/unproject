import React, { Component, useState } from 'react';
import { GridGenerator, HexGrid, Layout, Path, Hexagon, Text, Pattern, Hex } from 'react-hexgrid';
import './App.css';



function  App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
    const hexagonSize = { x: 5, y: 5 };
    const imageWidth = 20;
    const imageHeight = 20;
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

    return (
      <div className="layer">
        <div className="App">
          <div className="search">
          <input type="text" placeholder="Search" class="search-bar"/>
          </div>
          <div className='grid'>
            <HexGrid width={2000} height={2000} viewBox={viewBox}>
              {/* Main grid with bit hexagons, all manual */}
              <Layout size={hexagonSize} flat={false} spacing={1.1} origin={{ x: 10, y: -25 }}>
                {hexagonData.map((hex, i) => <Hexagon key={i} q={hex.q} r={hex.r} s={hex.s} onClick={(event) => { console.log(event.target) }} />)}
              </Layout>

              <Pattern id="lightningStrike" link="https://undecember.thein.ru/image/skill/Icon_Skill_LightningHit_01.png" size={hexagonSize}>
                <rect x="-50%" y="-50%" width="100%" height="100%" />
              </Pattern>
              <Pattern id="frostWave" link="https://undecember.thein.ru/image/skill/Icon_Skill_FrostWave_01.png" size={hexagonSize}>
                <rect x="-50%" y="-50%" width="100%" height="100%" />
              </Pattern>
              <Pattern id="whirlwind" link="https://undecember.thein.ru/image/skill/Icon_Skill_Whirlwind_01.png" size={hexagonSize}>
                <rect x="-50%" y="-50%" width="100%" height="100%" />
              </Pattern>
            </HexGrid>

          </div>
        </div>
      </div>
    );
  }


export default App;