// src/assets/assets.js
// Assumes all images are in the same folder as this file: src/assets/

import logo from './logo.png';
import oliveHero from './oliveHero.png';
import face from './face.png';
import logo2 from './logo2.png';
import riad from './riad.png';

import abdeljalil from './abdeljalil.png';
import anas from './anas.png';
import lea from './lea.png';
import marouane from './marouane.png';

import life from './life.png';
import haouzia from './haouzia.png';

// Phase images
import dormancy from './dormancy.png';
import flowering from './flowering.png';
import fruitset from './fruitset.png';
import pit from './pit.png';
import oilaccu from './oilaccu.png';
import maturation from './maturation.png';
import harvest from './harvest.png';

// Footer/wordmark logo — make sure the file name & casing match exactly
import mainlogo from './mainlogo.png';

export const assets = {
  // core
  logo,
  oliveHero,
  face,
  logo2,
  riad,

  // team
  abdeljalil,
  anas,
  lea,
  marouane,

  // misc
  life,
  haouzia,

  // phases
  dormancy,
  flowering,
  fruitset,
  pit,
  oilaccu,
  maturation,
  harvest,

  // footer / wordmark
  mainlogo,           // used by Footer: assets.mainlogo
  footerLogo: mainlogo, // extra alias (optional)
  wordmark: mainlogo,   // extra alias (optional)
};

// Optional direct named export if you ever want to import just the footer logo
export const footerLogo = mainlogo;












