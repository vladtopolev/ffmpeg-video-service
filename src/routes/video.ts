import Router from '@koa/router';
import {
  VideoComposition,
  AssetTypes,
  AssetOperationTypes,
} from '../declarations';
import { FfmpegCommandBuilder } from '../services/commandBuilder';

const router = new Router({
  prefix: '/video',
});
const VIDEO =
  'https://res.cloudinary.com/dix3v9vzg/video/upload/v1665668916/tutorials/ffmpeg-universal-api/main-video.mp4';
const IMAGE =
  'https://res.cloudinary.com/dix3v9vzg/image/upload/v1666012114/tutorials/ffmpeg-universal-api/logo.png';

const videoCompositionMeta: VideoComposition = {
  composition: {
    type: AssetTypes.video,
    path: 'https://res.cloudinary.com/dix3v9vzg/video/upload/v1665668916/tutorials/ffmpeg-universal-api/main-video.mp4',
    length: '00:00:10',
    start: '00:00:05',
    operations: [
      {
        type: AssetOperationTypes.crop,
        width: 360,
        height: 640,
      },
    ],
    overlays: [
      {
        type: AssetTypes.text,
        text: 'FFmpeg generic server',
        size: 22,
        x: '(w-tw)/2',
        y: '534',
        color: '#FFB000',
      },
      {
        type: AssetTypes.image,
        path: 'https://res.cloudinary.com/dix3v9vzg/image/upload/v1666012114/tutorials/ffmpeg-universal-api/logo.png',
        operations: [
          {
            type: AssetOperationTypes.scale,
            width: 200,
            height: -1,
          },
        ],
        x: 10,
        y: 10,
      },
    ],
  },
  output: {
    format: 'mp4'
  }
};

router.get('/', async (ctx) => {
  const command = new FfmpegCommandBuilder(videoCompositionMeta).getCommand();

  await new Promise<void>((res, rej) => {
    command
      .output('test.mp4')
      .on('start', function (commandLine) {
        console.log('Spawned Ffmpeg with command: ' + commandLine);
      })
      .on('progress', (p) => {
        console.log(p);
      })
      .on('end', () => {
        res();
      })
      .run();
  });

  ctx.body = {
    ok: true,
  };
});

router.post('/', async (ctx) => {
  const videoCompositionMeta = ctx.request.body as VideoComposition;

  const command = new FfmpegCommandBuilder(videoCompositionMeta).getCommand();

  await new Promise<void>((res, rej) => {
    command
      .output('test.mp4')
      .on('start', function (commandLine) {
        console.log('Spawned Ffmpeg with command: ' + commandLine);
      })
      .on('progress', (p) => {
        console.log(p);
      })
      .on('end', () => {
        res();
      })
      .run();
  });

  ctx.body = {
    ok: true,
  };
});

export default router;
