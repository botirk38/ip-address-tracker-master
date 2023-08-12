import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import XYZ from 'ol/source/XYZ';
import { transform } from 'ol/proj';
import 'ol/ol.css';



const MapWrapper = ({latitude,longitude}) => {
  const [map, setMap] = useState();
  const [featuresLayer, setFeaturesLayer] = useState();
  

  useEffect(() => {
    const initialFeaturesLayer = new VectorLayer({
      source: new VectorSource()
    });

    const initialMap = new Map({
      target: 'map', // ID of the target HTML element
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            wrapX: false,
            wrapY: false
          })
        })
        ,
        initialFeaturesLayer
      ],
      view: new View({
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 2
      })
    });

    setMap(initialMap);
    setFeaturesLayer(initialFeaturesLayer);
    return () => initialMap.setTarget(null);

  }, []);

  useEffect(() => {
    if (latitude && longitude && featuresLayer && map) {
      const coords = transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857');
      const feature = new Feature({
        geometry: new Point(coords),
      });
  
      const source = featuresLayer.getSource();
      source.clear();
      source.addFeature(feature);
      map.getView().setCenter(coords);
      map.getView().setZoom(15); 
    }
  }, [latitude, longitude, featuresLayer, map]);
  

  return <div id="map"></div>;

};

MapWrapper.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number
};


export default MapWrapper;
