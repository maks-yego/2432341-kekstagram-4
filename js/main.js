import { createObjects } from './data.js';
import { renderMiniatures } from './render.js';
import './form.js';

const pictures = createObjects();
renderMiniatures(pictures);
