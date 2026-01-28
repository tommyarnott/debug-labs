import { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

const TileGrid = () => {
  const canvasRef = useRef(null);
  const appRef = useRef(null);
  const tilesRef = useRef([]);
  const baseColorRef = useRef({ h: 200, s: 70, l: 50 });
  const cleanupRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const app = new PIXI.Application();
    appRef.current = app;

    (async () => {
      try {
        await app.init({
          width: window.innerWidth,
          height: window.innerHeight,
          backgroundColor: 0x0a0a0a,
          antialias: false,
          resolution: window.devicePixelRatio || 1,
        });

        if (!isMounted || !canvasRef.current) return;

        canvasRef.current.appendChild(app.canvas);

      // Create grid
      const tileSize = 10;
      const gap = 2;
      const totalTileSize = tileSize + gap;
      const cols = Math.ceil(window.innerWidth / totalTileSize);
      const rows = Math.ceil(window.innerHeight / totalTileSize);

      const tiles = [];

      // Create tiles as Graphics objects
      for (let i = 0; i < cols * rows; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);

        const tile = new PIXI.Graphics();
        const hueShift = (Math.random() - 0.5) * 60;
        const satShift = (Math.random() - 0.5) * 30;
        const lightShift = (Math.random() - 0.5) * 20;

        tile.userData = {
          col,
          row,
          hueShift,
          satShift,
          lightShift,
          isHovered: false,
          targetCol: col,
          targetRow: row,
        };

        // Make interactive
        tile.eventMode = 'static';
        tile.cursor = 'pointer';

        // Hover events
        tile.on('pointerover', () => {
          tile.userData.isHovered = true;
          updateTileColor(tile);
        });

        tile.on('pointerout', () => {
          // Change tile's color permanently to the hover color
          const baseColor = baseColorRef.current;
          const hoverH = (baseColor.h + 180) % 360;

          // Update the tile's color shifts to match the hover color
          tile.userData.hueShift = hoverH - baseColor.h;
          tile.userData.satShift = 90 - baseColor.s;
          tile.userData.lightShift = 70 - baseColor.l;

          tile.userData.isHovered = false;
          updateTileColor(tile);
        });

        // Initial position and color
        tile.x = col * totalTileSize;
        tile.y = row * totalTileSize;
        updateTileColor(tile);

        app.stage.addChild(tile);
        tiles.push(tile);
      }

      if (!isMounted) return;

      tilesRef.current = tiles;

      // Helper function to update tile color
      function updateTileColor(tile) {
        const baseColor = baseColorRef.current;
        const { hueShift, satShift, lightShift, isHovered } = tile.userData;

        tile.clear();

        if (isHovered) {
          // Hover color - complementary with higher brightness
          const hoverH = (baseColor.h + 180) % 360;
          const hoverColor = hslToHex(hoverH, 90, 70);
          tile.rect(0, 0, tileSize, tileSize);
          tile.fill(hoverColor);
          tile.scale.set(1.5);
          tile.zIndex = 100;
        } else {
          // Normal color
          const h = baseColor.h + hueShift;
          const s = baseColor.s + satShift;
          const l = baseColor.l + lightShift;
          const color = hslToHex(h, s, l);
          tile.rect(0, 0, tileSize, tileSize);
          tile.fill(color);
          tile.scale.set(1);
          tile.zIndex = 1;
        }
      }

      // HSL to Hex conversion
      function hslToHex(h, s, l) {
        h = h % 360;
        s = Math.max(0, Math.min(100, s));
        l = Math.max(0, Math.min(100, l));

        const c = (1 - Math.abs(2 * l / 100 - 1)) * s / 100;
        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
        const m = l / 100 - c / 2;

        let r = 0, g = 0, b = 0;

        if (h >= 0 && h < 60) {
          r = c; g = x; b = 0;
        } else if (h >= 60 && h < 120) {
          r = x; g = c; b = 0;
        } else if (h >= 120 && h < 180) {
          r = 0; g = c; b = x;
        } else if (h >= 180 && h < 240) {
          r = 0; g = x; b = c;
        } else if (h >= 240 && h < 300) {
          r = x; g = 0; b = c;
        } else {
          r = c; g = 0; b = x;
        }

        const toHex = (val) => {
          const hex = Math.round((val + m) * 255).toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        };

        return parseInt(`${toHex(r)}${toHex(g)}${toHex(b)}`, 16);
      }

      // Random color change interval
      const colorInterval = setInterval(() => {
        baseColorRef.current = {
          h: Math.random() * 360,
          s: 60 + Math.random() * 40,
          l: 40 + Math.random() * 30,
        };

        // Update all tiles with new base color
        tiles.forEach(tile => {
          if (!tile.userData.isHovered) {
            updateTileColor(tile);
          }
        });
      }, 3000);

      // Random position swap with smooth animation
      const swapInterval = setInterval(() => {
        // Swap 3 random pairs
        for (let i = 0; i < 3; i++) {
          const idx1 = Math.floor(Math.random() * tiles.length);
          const idx2 = Math.floor(Math.random() * tiles.length);

          const tile1 = tiles[idx1];
          const tile2 = tiles[idx2];

          // Swap target positions
          const tempCol = tile1.userData.targetCol;
          const tempRow = tile1.userData.targetRow;

          tile1.userData.targetCol = tile2.userData.targetCol;
          tile1.userData.targetRow = tile2.userData.targetRow;
          tile2.userData.targetCol = tempCol;
          tile2.userData.targetRow = tempRow;
        }
      }, 500);

      // Animation loop for smooth position transitions
      app.ticker.add(() => {
        tiles.forEach(tile => {
          const targetX = tile.userData.targetCol * totalTileSize;
          const targetY = tile.userData.targetRow * totalTileSize;

          // Smooth lerp to target position
          const speed = 0.05;
          tile.x += (targetX - tile.x) * speed;
          tile.y += (targetY - tile.y) * speed;
        });
      });

        // Store cleanup function
        cleanupRef.current = () => {
          clearInterval(colorInterval);
          clearInterval(swapInterval);
          if (app && app.stage) {
            app.destroy(true, { children: true });
          }
        };
      } catch (error) {
        console.error('PixiJS initialization error:', error);
      }
    })();

    // Handle window resize
    const handleResize = () => {
      if (appRef.current && appRef.current.renderer) {
        appRef.current.renderer.resize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isMounted = false;
      window.removeEventListener('resize', handleResize);
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);

  return (
    <div
      ref={canvasRef}
      className="w-screen h-screen bg-zinc-950"
      style={{ overflow: 'hidden' }}
    />
  );
};

export default TileGrid;
