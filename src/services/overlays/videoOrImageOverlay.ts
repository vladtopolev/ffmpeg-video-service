import { v4 as uuid4 } from 'uuid';
import { ImageAsset, VideoAsset } from '../../declarations';
import { OverlayHandler } from '../commandBuilder.declarations';

const videoOrImageOverlay: OverlayHandler = ({
  overlayAsset,
  input,
  ffmpegBuilder,
}) => {
  const outputNodeName = `overlay-image-${uuid4()}`;

  const imageOrVideoAsset = overlayAsset as ImageAsset | VideoAsset;
  const imageOrVideoOverlayLastNode =
    ffmpegBuilder.processAsset(imageOrVideoAsset);

  ffmpegBuilder.addFilter({
    filter: 'overlay',
    inputs: [input.name, imageOrVideoOverlayLastNode.name],
    outputs: [outputNodeName],

    options: {
      ...(overlayAsset.x && { x: overlayAsset.x }),
      ...(overlayAsset.y && { y: overlayAsset.y }),
    },
  });

  return {
    name: outputNodeName,
  };
};

export default videoOrImageOverlay;
