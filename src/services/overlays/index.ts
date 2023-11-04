import { GraphNode } from './../commandBuilder.declarations';
import { AssetTypes, OverlayAsset } from '../../declarations';
import { FfmpegBuilder } from '../commandBuilder.declarations';

import textOverlay from './textOverlay';
import videoOrImageOverlay from './videoOrImageOverlay';

export const chainOverlays = ({
  overlays,
  input,
  ffmpegBuilder,
}: {
  overlays: OverlayAsset[];
  input: GraphNode;
  ffmpegBuilder: FfmpegBuilder;
}) => {
  return overlays.reduce((lastNode, overlayAsset) => {
    if (overlayAsset.type === AssetTypes.text) {
      return textOverlay({ input: lastNode, overlayAsset, ffmpegBuilder });
    }
    return videoOrImageOverlay({
      input: lastNode,
      overlayAsset,
      ffmpegBuilder,
    });
  }, input);
};
