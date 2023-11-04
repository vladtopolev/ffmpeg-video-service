import { ImageAsset, VideoAsset } from '../../declarations';
import { AssetProcessingHandler } from '../commandBuilder.declarations';
import { assetOperationHandlersConfig, chainOperations } from '../operations';
import { chainOverlays } from '../overlays';

const videoHandler: AssetProcessingHandler = ({ asset, ffmpegBuilder }) => {
  const videoAsset = asset as VideoAsset;

  const videoInputOptions = [
    ...(videoAsset.length ? [`-t ${videoAsset.length}`] : []),
    ...(videoAsset.start ? [`-ss ${videoAsset.start}`] : []),
  ];

  let lastGraphNode = ffmpegBuilder.addInput(
    videoAsset.path,
    videoInputOptions
  );

  // handle operations
  lastGraphNode = chainOperations({
    operations: videoAsset.operations,
    input: lastGraphNode,
    ffmpegBuilder,
  });

  // handle overlays
  lastGraphNode = chainOverlays({
    overlays: videoAsset.overlays,
    input: lastGraphNode,
    ffmpegBuilder,
  });

  return lastGraphNode;
};

export default videoHandler;
