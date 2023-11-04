import { ImageAsset } from '../../declarations';
import { AssetProcessingHandler } from '../commandBuilder.declarations';
import { chainOperations } from '../operations';
import { chainOverlays } from '../overlays';

const imageHandler: AssetProcessingHandler = ({ asset, ffmpegBuilder }) => {
  const imageAsset = asset as ImageAsset;

  let lastGraphNode = ffmpegBuilder.addInput(imageAsset.path);

  // handle operations
  lastGraphNode = chainOperations({
    operations: imageAsset.operations || [],
    input: lastGraphNode,
    ffmpegBuilder,
  });

  // handle overlays
  lastGraphNode = chainOverlays({
    overlays: imageAsset.overlays || [],
    input: lastGraphNode,
    ffmpegBuilder,
  });

  return lastGraphNode;
};

export default imageHandler;
