import { v4 as uuid4 } from 'uuid';
import { OverlayHandler } from '../commandBuilder.declarations';
import { TextAsset } from '../../declarations';
import { getPath } from '../../utils';

const textOverlay: OverlayHandler = ({
  overlayAsset,
  input,
  ffmpegBuilder,
}) => {
  const outputNodeName = `overlay-text-${uuid4()}`;

  const textAsset = overlayAsset as TextAsset;
  ffmpegBuilder.addFilter({
    filter: 'drawtext',
    inputs: [input.name],
    outputs: [outputNodeName],
    options: {
      text: textAsset.text,
      fontfile: getPath('./public/fonts/ProximaNova-700.otf'),
      ...(textAsset.size && { fontsize: textAsset.size }),
      ...(textAsset.color && { fontcolor: textAsset.color }),
      ...(overlayAsset.x && { x: overlayAsset.x }),
      ...(overlayAsset.y && { y: overlayAsset.y }),
    },
  });

  return {
    name: outputNodeName,
  };
};

export default textOverlay;
