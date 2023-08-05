import React, { useEffect, useRef, useState } from "react";
import { TileLayer, Marker, MapContainer } from "react-leaflet";
import styles from "./Map.module.scss";
import { useSelector } from "react-redux";
import { selectorData } from "../../redux/slices/data";
import L from "leaflet";
import "leaflet-routing-machine";
import { createControlComponent } from "@react-leaflet/core";

export const Map = () => {
  const { choosenRout } = useSelector(selectorData);

  const ref = useRef();

  const createRoutineMachineLayer = () => {
    try {
      // @ts-ignore
      const instance = L.Routing.control({
        waypoints: [
          L.latLng(choosenRout[0]),
          L.latLng(choosenRout[1]),
          L.latLng(choosenRout[2]),
        ],

        lineOptions: {
          styles: [{ color: "#6FA1EC", weight: 4 }],
        },
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: false,
        showAlternatives: false,
        altLineOptions: { styles: [{ opacity: 0 }] },
      });
      return instance;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (L.Map) {
      document.getElementsByClassName(
        "leaflet-control-attribution"
        // @ts-ignore
      )[0].style.display = "none";
    }
    if (
      choosenRout.length &&
      document.getElementsByClassName(
        "leaflet-routing-alternatives-container"
      )[0]
    ) {
      document.getElementsByClassName(
        "leaflet-routing-alternatives-container"
        // @ts-ignore
      )[0].style.display = "none";
    }
  }, [choosenRout, document.getElementsByClassName("leaflet-routing-alt ")[0]]);

  const RoutineMachine = createControlComponent(createRoutineMachineLayer);
  return (
    <div className={styles.wrapper}>
      <MapContainer
        className={styles.map}
        center={choosenRout[0] || [59.84660399, 30.29496392]}
        zoom={11}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <RoutineMachine ref={ref} />
        <Marker position={choosenRout[0] || [59.84660399, 30.29496392]} />
      </MapContainer>
    </div>
  );
};
