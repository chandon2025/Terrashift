import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { BANGLADESH_DISTRICTS, isWithinBangladesh, buildLocationInfo } from '../data/bangladeshGeo';
import { LocationInfo } from '../types';

interface LeafletMapProps {
  currentLocation: LocationInfo;
  onLocationSelect: (loc: LocationInfo) => void;
  className?: string;
}

export const LeafletMap: React.FC<LeafletMapProps> = ({
  currentLocation,
  onLocationSelect,
  className = 'h-80 w-full',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Bangladesh bounding box bounds
    const southWest = L.latLng(20.4, 87.8);
    const northEast = L.latLng(26.8, 92.9);
    const bdBounds = L.latLngBounds(southWest, northEast);

    // Initialize map centered on Bangladesh
    const map = L.map(mapContainerRef.current, {
      center: [currentLocation.lat, currentLocation.lon],
      zoom: 7,
      minZoom: 6,
      maxZoom: 14,
      maxBounds: bdBounds,
      maxBoundsViscosity: 0.9,
    });

    // CartoDB Positron Tile Layer (clean, high contrast, agricultural friendly)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    // Custom Icon for Farmer Selected Pin
    const farmerIcon = L.divIcon({
      className: 'custom-farmer-pin',
      html: `
        <div style="
          background: #2E7D32;
          border: 3px solid #FFFFFF;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          width: 32px;
          height: 32px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <span style="transform: rotate(45deg); font-size: 16px;">🌱</span>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    // Add selected location marker
    const marker = L.marker([currentLocation.lat, currentLocation.lon], {
      icon: farmerIcon,
      draggable: true,
    }).addTo(map);

    marker.bindPopup(`<b>${currentLocation.name}</b><br/>Lat: ${currentLocation.lat}, Lon: ${currentLocation.lon}`).openPopup();
    markerRef.current = marker;

    // When marker is dragged
    marker.on('dragend', () => {
      const pos = marker.getLatLng();
      if (isWithinBangladesh(pos.lat, pos.lng)) {
        const newLoc = buildLocationInfo(pos.lat, pos.lng);
        onLocationSelect(newLoc);
      } else {
        // Reset to previous location
        marker.setLatLng([currentLocation.lat, currentLocation.lon]);
      }
    });

    // Add district circle markers across Bangladesh
    BANGLADESH_DISTRICTS.forEach((d) => {
      const circle = L.circleMarker([d.lat, d.lon], {
        radius: 5,
        fillColor: '#0B3D91',
        color: '#FFFFFF',
        weight: 1.5,
        opacity: 0.8,
        fillOpacity: 0.6,
      }).addTo(map);

      circle.bindTooltip(`${d.name} (${d.nameBn})`, { direction: 'top', offset: [0, -5] });

      circle.on('click', () => {
        const newLoc = buildLocationInfo(d.lat, d.lon);
        onLocationSelect(newLoc);
      });
    });

    // Handle map click
    map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      if (isWithinBangladesh(lat, lng)) {
        const newLoc = buildLocationInfo(lat, lng);
        onLocationSelect(newLoc);
      }
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update marker position when currentLocation prop changes
  useEffect(() => {
    if (!mapInstanceRef.current || !markerRef.current) return;
    markerRef.current.setLatLng([currentLocation.lat, currentLocation.lon]);
    markerRef.current.getPopup()?.setContent(`<b>${currentLocation.name}</b><br/>Lat: ${currentLocation.lat}, Lon: ${currentLocation.lon}`);
    mapInstanceRef.current.panTo([currentLocation.lat, currentLocation.lon]);
  }, [currentLocation.lat, currentLocation.lon, currentLocation.name]);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-emerald-900/10 shadow-soft">
      <div ref={mapContainerRef} className={className} />
      <div className="absolute top-2 right-2 z-[400] bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-bold text-emerald-900 border border-emerald-200 shadow-sm pointer-events-none">
        🇧🇩 Bangladesh Agricultural Zone
      </div>
    </div>
  );
};
