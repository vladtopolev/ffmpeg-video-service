import { GraphNode } from './../commandBuilder.declarations';
import { AssetTypes, OverlayAsset } from '../../declarations';
import { FfmpegBuilder } from '../commandBuilder.declarations';

import textOverlay from './textOverlay';
import videoOrImageOverlay from './videoOrImageOverlay';


export const assetOverlayHandlersConfig = {
  [AssetTypes.text]: textOverlay,
  [AssetTypes.image]: videoOrImageOverlay,
  [AssetTypes.video]: videoOrImageOverlay,
};

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
    const overlayHandler = assetOverlayHandlersConfig[overlayAsset.type];
    return overlayHandler({
      input: lastNode,
      overlayAsset,
      ffmpegBuilder,
    });
  }, input);
};
