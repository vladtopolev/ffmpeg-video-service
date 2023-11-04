import { AssetTypes } from '../../declarations';
import { AssetProcessingHandler } from '../commandBuilder.declarations';
import imageBuilder from './imageHandler';
import videoBuilder from './videoHandler';

export const assetProcessingHandleraConfig: { [k: string]: AssetProcessingHandler } = {
  [AssetTypes.image]: imageBuilder,
  [AssetTypes.video]: videoBuilder,
};
