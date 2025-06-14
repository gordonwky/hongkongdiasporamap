'use client';

import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import MemoryCard from './memoryCard';
import 'maplibre-gl/dist/maplibre-gl.css';

const MapWithBottomForm = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<maplibregl.Map | null>(null);

  const markerRef = useRef<maplibregl.Marker | null>(null);

  // State for marker position (lng, lat)
  const [markerLngLat, setMarkerLngLat] = useState<maplibregl.LngLatLike | null>(null);

  // State for whether marker is confirmed
  const [markerConfirmed, setMarkerConfirmed] = useState(false);

  // function to render the marker fetch from the server
  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await fetch('/api/saveStory', {
          method: "GET"
        });
        if (!response.ok) throw new Error('Failed to fetch markers');
        const data = await response.json();

        data.forEach((story: { lat: number; lng: number, story: string }) => {
          new maplibregl.Marker({ color: 'blue' })
            .setLngLat([story.lng, story.lat])
            .setPopup(
              new maplibregl.Popup({ offset: 25 }).setHTML('<h3>Memory Location</h3>' + `<p>${story.story}</p>`))
            .addTo(mapInstance.current!);
        });
      } catch (error) {
        console.error('Error fetching markers:', error);
      }
    };

    fetchMarkers();
  }, []);
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    mapInstance.current = new maplibregl.Map({
      container: mapRef.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [114.18, 22.32],
      zoom: 13,
    });

    mapInstance.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    mapInstance.current.on('click', (e) => {
      if (markerConfirmed) {
        // If marker confirmed, start fresh with a new marker & form
        setMarkerLngLat(e.lngLat);
        setMarkerConfirmed(false);
      } else {
        // Move existing marker or create new one
        setMarkerLngLat(e.lngLat);
      }
    });

    return () => {
      mapInstance.current?.remove();
      mapInstance.current = null;
    };
  }, [markerConfirmed]);

  // Update marker on map when markerLngLat changes
  useEffect(() => {
    if (!mapInstance.current) return;

    if (markerLngLat) {
      if (markerRef.current) {
        markerRef.current.setLngLat(markerLngLat);
      } else {
        markerRef.current = new maplibregl.Marker({ color: 'red' })
          .setLngLat(markerLngLat)
          .addTo(mapInstance.current);
      }
    } else {
      // No marker to show, remove if exists
      markerRef.current?.remove();
      markerRef.current = null;
    }
  }, [markerLngLat]);

  // Change marker color on confirmation
  useEffect(() => {
    if (markerConfirmed) {
      // markerRef.current?.setColor('green');
    }
  }, [markerConfirmed]);

  return (
    <>
      <div ref={mapRef} className="w-screen h-screen" />

      {markerLngLat && !markerConfirmed && (
        <div
          style={{
            position: 'fixed',
            bottom: 20,
            left: 20,
            background: 'transparent',
            padding: '1rem',
            // borderRadius: '8px',
            // boxShadow: '0 0 10px rgba(0,0,0,0.3)',
            zIndex: 1000,
            // maxWidth: '300px',
          }}
        >
          <MemoryCard lat={maplibregl.LngLat.convert(markerLngLat).lat} lng={maplibregl.LngLat.convert(markerLngLat).lng} />
          {/* <form onSubmit={handleSubmit}>
            <label>
              Note:
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                style={{ width: '100%', marginTop: '0.5rem' }}
              />
            </label>
            <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
              <button type="submit" style={{ backgroundColor: 'green', color: 'white', padding: '0.4rem 1rem', border: 'none', borderRadius: '4px' }}>
                Confirm
              </button>
              <button type="button" onClick={handleCancel} style={{ backgroundColor: 'red', color: 'white', padding: '0.4rem 1rem', border: 'none', borderRadius: '4px' }}>
                Cancel
              </button>
            </div>
          </form> */}
        </div>
      )}
    </>
  );
};

export default MapWithBottomForm;
