import Koa from 'koa';
import cors from '@koa/cors';
import serve from 'koa-static';
import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';
import bodyParser from 'koa-bodyparser';

import videoRouter from './routes/video';
import { getPath } from './utils';

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

const app = new Koa();
const PORT = process.env.PORT || 3100;

// create public and temporary folder
fs.mkdirSync(getPath('./public'), { recursive: true });


app.use(serve('public'));
app.use(cors());
app.use(bodyParser());
app.use(videoRouter.routes()).use(videoRouter.allowedMethods());

app.listen(PORT);

console.log(`Server running on port ${PORT}`);
