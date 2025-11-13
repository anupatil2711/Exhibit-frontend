// src/data/exhibits.js
// --- IMPORT LOCAL ASSETS ---
import imgSolar from '../assets/solar.jpg';
import imgSolar1 from '../assets/ss.png'
import imgKali from '../assets/kali.jpg';
import imgKali1 from '../assets/kali_c.jpg'
import imgPendulum from '../assets/pendulum.jpg';
import imgPendulum1 from '../assets/pendi.jpg';
import solarKidsVideo from '../assets/videos/solar.mp4'


export const exhibitsData = [
  {
    "id": "1",
    "name": "The Solar Journey",
    // Uses the locally imported variable
    "image": imgSolar,
    "cover": imgSolar1,
    "description": "Step into The Solar Journey and explore our magnificent celestial neighborhood. This exhibit guides you through the scale, science, and history of the Sun and its eight planetary companions. From the scorching heat of Mercury to the frigid rings of Saturn, investigate the atmospheres, orbits, and landscapes that make each world unique.",
    "video_content": {
      "5-10": [solarKidsVideo],
      "11-15": ["https://www.w3schools.com/html/mov_bbb.mp4"],
      "16-21": ["https://www.w3schools.com/html/mov_bbb.mp4"]
    },
    "quiz_id": "quiz101"
  },
 {
    "id": "2",
    "name": "Kaleidoscope of Light", 
    "image": imgKali, 
    "cover": imgKali1,
    "description": "Dive into the mesmerizing world of reflections and symmetry. The giant kaleidoscope allows you to create infinite, stunning patterns using colored glass, prisms, and mirrors. Explore the mathematical beauty behind light and angles.",
    "video_content": {
      "5-10": ["https://www.w3schools.com/html/movie.mp4"],
      "11-15": ["https://www.w3schools.com/html/movie.mp4"]
    },
    "quiz_id": "quiz102"
  },
  {
    "id": "3",
    "name": "Giant Pendulum",
    "image": imgPendulum,
    "cover": imgPendulum1,
    "description": "Watch physics in action as the giant pendulum demonstrates gravity, momentum, and simple harmonic motion. It’s mesmerizing! Track the slow rotation of the pendulum over the day to prove the rotation of the Earth.",
    "video_content": {
      "5-10": ["https://www.w3schools.com/html/mov_bbb.mp4"],
      "11-15": ["https://www.w3schools.com/html/mov_bbb.mp4"]
    },
    "quiz_id": "quiz101" 
  }
];