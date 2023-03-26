import React, { Component } from 'react';
import { GridGenerator, HexGrid, Layout, Path, Hexagon, Text, Pattern, Hex } from 'react-hexgrid';
import './App.css';

class App extends Component {
  render() {
    const hexagonSize = { x: 5, y: 5 };
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const viewBox = `-50 -50 100 100`;
    return (
      <div className="App">
        <div className='grid'>
          <HexGrid width={1000} height={1000} viewBox={viewBox}>
            {/* Main grid with bit hexagons, all manual */}
            <Layout size={hexagonSize} flat={false} spacing={1.2} origin={{ x: 0, y: 0 }}>
              <Hexagon q={-3} r={0} s={3} />
              <Hexagon q={-2} r={0} s={2} fill="pat-1" />
              <Hexagon q={-1} r={0} s={1} />
              <Hexagon q={0} r={0} s={0} />
              <Hexagon q={1} r={0} s={-1} />

              <Hexagon q={-4} r={1} s={3} />
              <Hexagon q={-3} r={1} s={2} />
              <Hexagon q={-2} r={1} s={1} />
              <Hexagon q={-1} r={1} s={0} />
              <Hexagon q={0} r={1} s={-1} />
              <Hexagon q={1} r={1} s={-2} />

              <Hexagon q={-5} r={2} s={3} />
              <Hexagon q={-4} r={2} s={2} />
              <Hexagon q={-3} r={2} s={1} />
              <Hexagon q={-2} r={2} s={0} />
              <Hexagon q={-1} r={2} s={-1} />
              <Hexagon q={0} r={2} s={-2} />
              <Hexagon q={1} r={2} s={-3} />

              <Hexagon q={-6} r={3} s={3} />
              <Hexagon q={-5} r={3} s={2} />
              <Hexagon q={-4} r={3} s={1} />
              <Hexagon q={-3} r={3} s={0} />
              <Hexagon q={-2} r={3} s={-1} />
              <Hexagon q={-1} r={3} s={-2} />
              <Hexagon q={0} r={3} s={-3} />
              <Hexagon q={1} r={3} s={-4} />

              <Hexagon q={-6} r={4} s={4} />
              <Hexagon q={-5} r={4} s={3} />
              <Hexagon q={-4} r={4} s={2} />
              <Hexagon q={-3} r={4} s={1} />
              <Hexagon q={-2} r={4} s={0} />
              <Hexagon q={-1} r={4} s={-1} />
              <Hexagon q={0} r={4} s={-2} />

              <Hexagon q={-6} r={5} s={5} />
              <Hexagon q={-5} r={5} s={4} />
              <Hexagon q={-4} r={5} s={3} />
              <Hexagon q={-3} r={5} s={2} />
              <Hexagon q={-2} r={5} s={1} />
              <Hexagon q={-1} r={5} s={0} />

              <Hexagon q={-6} r={6} s={6} />
              <Hexagon q={-5} r={6} s={5} />
              <Hexagon q={-4} r={6} s={4} />
              <Hexagon q={-3} r={6} s={3} />
              <Hexagon q={-2} r={6} s={4} />





              {/* Middle */}



            </Layout>
          </HexGrid>
        </div>

      </div>
    );
  }
}

export default App;