import furnace from "../../../assets/Furnace.jpeg";
import flyingShear from "../../../assets/flying-shear.png";
import coolingBed from "../../../assets/cooling bed.jpeg";
import loopControl from "../../../assets/loop-control.png"
import materiaTracking from "../../../assets/matrialTracking.png"
import S7 from "../../../assets/S7-sei.png"
import ABBDrive from "../../../assets/ABB-Drive.png"
import ACDCDRIVE from "../../../assets/AC-DC_drive.png"
import VFD from "../../../assets/VFD.png"
import WinCC from "../../../assets/WinCC.jpeg"

export const serviceGroups = [
  {
    title: "Mill automation",
    description: "TMT, bar, wire rod, section and special steel mills.",
    tags: [
      { name: "Furnace automation", image: furnace },
      { name: "Material tracking", image: materiaTracking },
      { name: "Loop control", image: loopControl },
      { name: "Flying shear sync", image: flyingShear },
      { name: "Cooling bed", image: coolingBed },
    ],
  },
  {
    title: "PLC and drive systems",
    description: "New builds and modernization of installed systems.",
    tags: [
      { name: "Siemens S7-300/400/1200/1500", image: S7 },
      { name: "ABB", image: ABBDrive },
      { name: "AC/DC drives", image: ACDCDRIVE },
      { name: "VFD, servo", image: VFD },
    ],
  },
  {
    title: "SCADA and HMI",
    description: "Operator screens, reports and remote access.",
    tags: [
      { name: "WinCC", image: WinCC },
      { name: "FactoryTalk integration", image: null },
      { name: "Trending", image: null },
      { name: "Production reports", image: null },
    ],
  },
  {
    title: "Electrical panels",
    description: "Built and tested at our own facility.",
    tags: [
      { name: "PLC panels", image: null },
      { name: "MCC and PCC", image: null },
      { name: "Drive panels", image: null },
      { name: "Remote I/O", image: null },
    ],
  },
  {
    title: "Commissioning",
    description: "Teams on site across India.",
    tags: [
      { name: "Loop checking", image: null },
      { name: "Cold and hot trials", image: null },
      { name: "Shutdown work", image: null },
      { name: "Operator training", image: null },
    ],
  },
  {
    title: "After-sales support",
    description: "Remote and on-site help after handover.",
    tags: [
      { name: "24x7 assistance", image: null },
      { name: "AMC", image: null },
      { name: "PLC backup", image: null },
      { name: "System health audit", image: null },
    ],
  },
];