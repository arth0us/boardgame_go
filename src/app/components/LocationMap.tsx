import { motion, useMotionValue, animate } from 'motion/react';
import { useState, useRef, useEffect, useCallback } from 'react';

interface Location {
  id: number;
  name: string;
  address: string;
  distance: string;
  lat: number;
  lng: number;
}

interface LocationMapProps {
  locations: Location[];
  userLocation: { lat: number; lng: number };
  selectedLocation?: string;
  onLocationSelect?: (locationName: string) => void;
  onVisibleLocationsChange?: (visibleLocations: Location[]) => void;
}

// Static map position storage to persist across re-renders
let savedMapX = 0;
let savedMapY = 0;

export function LocationMap({ locations, userLocation, selectedLocation, onLocationSelect, onVisibleLocationsChange }: LocationMapProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const mapRef = useRef<HTMLDivElement>(null);
  const mapX = useMotionValue(savedMapX);
  const mapY = useMotionValue(savedMapY);
  const previousSelectedRef = useRef<string | undefined>(selectedLocation);
  const previousVisibleIdsRef = useRef<string>('');

  // Expanded map area - 3x larger than viewport
  const mapScale = 3;
  const mapWidth = 100 * mapScale;
  const mapHeight = 100 * mapScale;

  // Calculate coordinate range to include all locations
  const allLats = [...locations.map(l => l.lat), userLocation.lat];
  const allLngs = [...locations.map(l => l.lng), userLocation.lng];
  const actualMinLat = Math.min(...allLats) - 0.01;
  const actualMaxLat = Math.max(...allLats) + 0.01;
  const actualMinLng = Math.min(...allLngs) - 0.01;
  const actualMaxLng = Math.max(...allLngs) + 0.01;

  // Convert lat/lng to absolute positions on the larger map
  const getPosition = (lat: number, lng: number) => {
    // Calculate normalized position (0-1)
    const normalizedX = (lng - actualMinLng) / (actualMaxLng - actualMinLng);
    const normalizedY = (actualMaxLat - lat) / (actualMaxLat - actualMinLat);

    // Convert to percentage of the expanded map (0-300%)
    const x = normalizedX * 100;
    const y = normalizedY * 100;

    return {
      x: `${Math.max(0, Math.min(100, x))}%`,
      y: `${Math.max(0, Math.min(100, y))}%`
    };
  };

  // Save map position and update visible locations whenever map moves
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const updateHandler = () => {
      if (!mapRef.current || !onVisibleLocationsChange) return;

      // Debounce the update
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const containerWidth = mapRef.current!.offsetWidth;
        const containerHeight = mapRef.current!.offsetHeight;
        const currentMapX = mapX.get();
        const currentMapY = mapY.get();

        const visible = locations.filter((loc) => {
          const normalizedX = (loc.lng - actualMinLng) / (actualMaxLng - actualMinLng);
          const normalizedY = (actualMaxLat - loc.lat) / (actualMaxLat - actualMinLat);

          const xPercent = normalizedX * 100;
          const yPercent = normalizedY * 100;

          const markerXPx = (xPercent / 100) * (containerWidth * mapScale);
          const markerYPx = (yPercent / 100) * (containerHeight * mapScale);

          const screenX = -containerWidth + currentMapX + markerXPx;
          const screenY = -containerHeight + currentMapY + markerYPx;

          return screenX >= -50 && screenX <= containerWidth + 50 &&
                 screenY >= -50 && screenY <= containerHeight + 50;
        });

        // Only call the callback if visible locations actually changed
        const visibleIds = visible.map(l => l.id).sort().join(',');
        if (visibleIds !== previousVisibleIdsRef.current) {
          previousVisibleIdsRef.current = visibleIds;
          onVisibleLocationsChange(visible);
        }
      }, 100);
    };

    const unsubscribeX = mapX.on('change', (latest) => {
      savedMapX = latest;
      updateHandler();
    });
    const unsubscribeY = mapY.on('change', (latest) => {
      savedMapY = latest;
      updateHandler();
    });

    // Initial update - immediate
    if (mapRef.current && onVisibleLocationsChange) {
      const containerWidth = mapRef.current.offsetWidth;
      const containerHeight = mapRef.current.offsetHeight;
      const currentMapX = mapX.get();
      const currentMapY = mapY.get();

      const visible = locations.filter((loc) => {
        const normalizedX = (loc.lng - actualMinLng) / (actualMaxLng - actualMinLng);
        const normalizedY = (actualMaxLat - loc.lat) / (actualMaxLat - actualMinLat);

        const xPercent = normalizedX * 100;
        const yPercent = normalizedY * 100;

        const markerXPx = (xPercent / 100) * (containerWidth * mapScale);
        const markerYPx = (yPercent / 100) * (containerHeight * mapScale);

        const screenX = -containerWidth + currentMapX + markerXPx;
        const screenY = -containerHeight + currentMapY + markerYPx;

        return screenX >= -50 && screenX <= containerWidth + 50 &&
               screenY >= -50 && screenY <= containerHeight + 50;
      });

      const visibleIds = visible.map(l => l.id).sort().join(',');
      if (visibleIds !== previousVisibleIdsRef.current) {
        previousVisibleIdsRef.current = visibleIds;
        onVisibleLocationsChange(visible);
      }
    }

    return () => {
      unsubscribeX();
      unsubscribeY();
      clearTimeout(timeoutId);
    };
  }, []);

  const userPos = getPosition(userLocation.lat, userLocation.lng);

  // Filter locations based on search
  const filteredLocations = locations.filter((loc) =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const centerOnLocation = useCallback((loc: Location) => {
    if (mapRef.current) {
      const containerWidth = mapRef.current.offsetWidth;
      const containerHeight = mapRef.current.offsetHeight;

      // Get marker position as percentage (0-100)
      const normalizedX = (loc.lng - actualMinLng) / (actualMaxLng - actualMinLng);
      const normalizedY = (actualMaxLat - loc.lat) / (actualMaxLat - actualMinLat);

      const markerXPercent = normalizedX * 100;
      const markerYPercent = normalizedY * 100;

      // Calculate target position to center the marker
      // Map starts at -100% (left: -100%, top: -100%)
      // Marker position on map in pixels from map's top-left
      const markerXPx = (markerXPercent / 100) * (containerWidth * mapScale);
      const markerYPx = (markerYPercent / 100) * (containerHeight * mapScale);

      // To center: we need marker to be at containerWidth/2, containerHeight/2
      // Current marker screen position = -containerWidth + mapX + markerXPx
      // We want: -containerWidth + targetX + markerXPx = containerWidth / 2
      const targetX = containerWidth * 1.5 - markerXPx;
      const targetY = containerHeight * 1.5 - markerYPx;

      // Animate to the centered position
      animate(mapX, targetX, { type: 'spring', damping: 30, stiffness: 300 });
      animate(mapY, targetY, { type: 'spring', damping: 30, stiffness: 300 });
    }
  }, [mapScale, actualMinLat, actualMaxLat, actualMinLng, actualMaxLng, mapX, mapY]);

  // Auto-center only when selectedLocation actually changes (user clicks list)
  useEffect(() => {
    if (selectedLocation && selectedLocation !== previousSelectedRef.current) {
      const loc = locations.find(l => l.name === selectedLocation);
      if (loc) {
        centerOnLocation(loc);
      }
      previousSelectedRef.current = selectedLocation;
    }
  }, [selectedLocation, locations, centerOnLocation]);

  const handleSearchSelect = (loc: Location) => {
    setSearchQuery('');
    if (onLocationSelect) {
      onLocationSelect(loc.name);
    }
    centerOnLocation(loc);
  };

  return (
    <div className="mb-[12px]">
      {/* Search box */}
      <div className="relative mb-[8px]">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="搜尋桌遊店或地址..."
          className="w-full px-[12px] py-[8px] pr-[36px] rounded-[12px] border-2 border-[rgba(111,122,112,0.2)] bg-white font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#1a1c1c] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#006334]"
        />
        <svg className="absolute right-[10px] top-1/2 -translate-y-1/2 size-[18px] text-[#6f7a70]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>

        {/* Search results dropdown */}
        {searchQuery && filteredLocations.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-[4px] bg-white rounded-[12px] border-2 border-[rgba(111,122,112,0.2)] shadow-lg max-h-[120px] overflow-y-auto z-20">
            {filteredLocations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => handleSearchSelect(loc)}
                className="w-full text-left px-[12px] py-[8px] hover:bg-[#f3f4f6] first:rounded-t-[10px] last:rounded-b-[10px]"
              >
                <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[14px] text-[#1a1c1c]">
                  {loc.name}
                </div>
                <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[12px] text-[#6f7a70]">
                  {loc.address}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Location indicators at top */}
      <div className="h-[28px] bg-white rounded-t-[12px] border-2 border-b-0 border-[rgba(111,122,112,0.2)] relative overflow-hidden mb-[-2px] z-10">
        <div className="absolute inset-0 flex items-center px-[8px]">
          <div className="font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[9px] text-[#6f7a70] mr-[6px]">
            店家位置:
          </div>
          <div className="flex-1 relative h-[10px]">
            {locations.map((loc) => {
              const pos = getPosition(loc.lat, loc.lng);
              const isSelected = selectedLocation === loc.name;

              return (
                <div
                  key={loc.id}
                  className="absolute top-0 -translate-x-1/2 cursor-pointer group"
                  style={{ left: pos.x }}
                  onClick={() => {
                    if (onLocationSelect) {
                      onLocationSelect(loc.name);
                    }
                    centerOnLocation(loc);
                  }}
                >
                  <div
                    className={`size-[10px] rounded-full border-2 border-white shadow-md transition-all ${
                      isSelected ? 'bg-[#006334] scale-125' : 'bg-[#B7131A]'
                    }`}
                  />
                  <div className="absolute top-[16px] left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#1a1c1c] text-white px-[6px] py-[2px] rounded-[4px] text-[9px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {loc.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Draggable map */}
      <div
        ref={mapRef}
        className="h-[160px] rounded-b-[12px] border-2 border-[rgba(111,122,112,0.2)] overflow-hidden bg-[#e8f5e9] relative touch-none"
      >
        <motion.div
          drag
          dragMomentum={false}
          dragElastic={0.05}
          className="absolute cursor-grab active:cursor-grabbing"
          style={{
            width: `${mapWidth}%`,
            height: `${mapHeight}%`,
            x: mapX,
            y: mapY,
            left: '-100%',
            top: '-100%'
          }}
        >
          {/* Virtual streets */}
          <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#006334" strokeWidth="0.5"/>
              </pattern>
            </defs>

            {/* Main streets - horizontal */}
            <line x1="0%" y1="20%" x2="100%" y2="20%" stroke="#d4d4d4" strokeWidth="3" opacity="0.6"/>
            <line x1="0%" y1="40%" x2="100%" y2="40%" stroke="#d4d4d4" strokeWidth="4" opacity="0.7"/>
            <line x1="0%" y1="60%" x2="100%" y2="60%" stroke="#d4d4d4" strokeWidth="3" opacity="0.6"/>
            <line x1="0%" y1="80%" x2="100%" y2="80%" stroke="#d4d4d4" strokeWidth="3" opacity="0.6"/>

            {/* Main streets - vertical */}
            <line x1="15%" y1="0%" x2="15%" y2="100%" stroke="#d4d4d4" strokeWidth="3" opacity="0.6"/>
            <line x1="35%" y1="0%" x2="35%" y2="100%" stroke="#d4d4d4" strokeWidth="4" opacity="0.7"/>
            <line x1="55%" y1="0%" x2="55%" y2="100%" stroke="#d4d4d4" strokeWidth="3" opacity="0.6"/>
            <line x1="75%" y1="0%" x2="75%" y2="100%" stroke="#d4d4d4" strokeWidth="4" opacity="0.7"/>

            {/* Small streets - horizontal */}
            <line x1="0%" y1="10%" x2="100%" y2="10%" stroke="#e5e5e5" strokeWidth="2" opacity="0.4"/>
            <line x1="0%" y1="30%" x2="100%" y2="30%" stroke="#e5e5e5" strokeWidth="2" opacity="0.4"/>
            <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="#e5e5e5" strokeWidth="2" opacity="0.4"/>
            <line x1="0%" y1="70%" x2="100%" y2="70%" stroke="#e5e5e5" strokeWidth="2" opacity="0.4"/>
            <line x1="0%" y1="90%" x2="100%" y2="90%" stroke="#e5e5e5" strokeWidth="2" opacity="0.4"/>

            {/* Small streets - vertical */}
            <line x1="5%" y1="0%" x2="5%" y2="100%" stroke="#e5e5e5" strokeWidth="2" opacity="0.4"/>
            <line x1="25%" y1="0%" x2="25%" y2="100%" stroke="#e5e5e5" strokeWidth="2" opacity="0.4"/>
            <line x1="45%" y1="0%" x2="45%" y2="100%" stroke="#e5e5e5" strokeWidth="2" opacity="0.4"/>
            <line x1="65%" y1="0%" x2="65%" y2="100%" stroke="#e5e5e5" strokeWidth="2" opacity="0.4"/>
            <line x1="85%" y1="0%" x2="85%" y2="100%" stroke="#e5e5e5" strokeWidth="2" opacity="0.4"/>
            <line x1="95%" y1="0%" x2="95%" y2="100%" stroke="#e5e5e5" strokeWidth="2" opacity="0.4"/>

            {/* Grid pattern background */}
            <rect width="100%" height="100%" fill="url(#grid)" opacity="0.2"/>
          </svg>

          {/* User location marker */}
          <div
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ left: userPos.x, top: userPos.y }}
          >
            <div className="size-[24px] rounded-full border-4 border-white bg-[#006334] shadow-lg flex items-center justify-center">
              <div className="size-[8px] rounded-full bg-white"></div>
            </div>
            <div className="absolute top-[28px] left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-[8px] py-[4px] rounded-[6px] shadow-md font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[10px] text-[#006334]">
              您的位置
            </div>
          </div>

          {/* Debug: Corner markers */}
          <div className="absolute top-0 left-0 size-[8px] bg-blue-500 rounded-full z-50" title="Top-Left" />
          <div className="absolute top-0 right-0 size-[8px] bg-blue-500 rounded-full z-50" title="Top-Right" />
          <div className="absolute bottom-0 left-0 size-[8px] bg-blue-500 rounded-full z-50" title="Bottom-Left" />
          <div className="absolute bottom-0 right-0 size-[8px] bg-blue-500 rounded-full z-50" title="Bottom-Right" />

          {/* Location markers */}
          {locations.map((loc) => {
            const pos = getPosition(loc.lat, loc.lng);
            const isSelected = selectedLocation === loc.name;
            return (
              <div
                key={loc.id}
                className={`absolute -translate-x-1/2 -translate-y-full pointer-events-none ${
                  isSelected ? 'z-30' : 'z-20'
                }`}
                style={{ left: pos.x, top: pos.y }}
              >
                <svg width="24" height="32" viewBox="0 0 24 32" className="drop-shadow-lg">
                  <path
                    d="M12 0C7.05 0 3 4.05 3 9c0 6 9 21 9 21s9-15 9-21c0-4.95-4.05-9-9-9z"
                    fill={isSelected ? '#006334' : '#B7131A'}
                  />
                  <circle cx="12" cy="9" r="4.5" fill="white"/>
                </svg>
                {isSelected && (
                  <div className="absolute top-[-32px] left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#006334] px-[8px] py-[4px] rounded-[6px] shadow-lg font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[11px] text-white">
                    {loc.name}
                  </div>
                )}
              </div>
            );
          })}

          {/* Map label */}
          <div className="absolute bottom-[8px] right-[8px] bg-white/90 px-[8px] py-[4px] rounded-[6px] font-['WenQuanYi_Zen_Hei:Medium',sans-serif] text-[10px] text-[#6f7a70] pointer-events-none">
            台北市大安區
          </div>
        </motion.div>
      </div>
    </div>
  );
}
