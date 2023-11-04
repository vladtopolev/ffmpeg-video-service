export enum AssetTypes {
  video = 'video',
  image = 'image',
  text = 'text',
}

// Types of available assets
export type VideoOrImageAssetBase = {
  type: AssetTypes.video | AssetTypes.image;
  path: string;
  operations?: AssetOperation[];
  overlays?: OverlayAsset[];
};

export type VideoAsset = VideoOrImageAssetBase & {
  type: AssetTypes.video;
  start?: string;
  length?: string;
};

export type ImageAsset = VideoOrImageAssetBase & {
  type: AssetTypes.image;
};

export type TextAsset = {
  type: AssetTypes.text;
  text: string;
  size?: number;
  color?: string;
  font?: string;
  fontfile?: string;
  box?: string;
  boxcolor?: string;
  boxborderw?: number;
};

// Overlay Assets
export type OverlayPosition = {
  x?: number | string;
  y?: number | string;
};

export type OverlayAsset = (
  | TextAsset
  | Exclude<VideoAsset, 'overlays'>
  | Exclude<ImageAsset, 'overlays'>
) &
  OverlayPosition;

// Asset Operations
export enum AssetOperationTypes {
  crop = 'crop',
  scale = 'scale',
  horizintalFlip = 'horizintalFlip',
}

export type AssetOperationBase = {
  type: AssetOperationTypes;
};

export type CropOperation = AssetOperationBase & {
  type: AssetOperationTypes.crop;
  width: string | number;
  height: string | number;
  x?: string | number;
  y?: string | number;
};

export type ScaleOperation = AssetOperationBase & {
  type: AssetOperationTypes.scale;
  width: string | number;
  height: string | number;
};

export type HorizonatalFlipOperation = AssetOperationBase & {
  type: AssetOperationTypes.horizintalFlip;
};

export type AssetOperation =
  | ScaleOperation
  | CropOperation
  | HorizonatalFlipOperation;

export type OutputSettings = {
  format: 'mp4' | 'webm';
};

export type VideoComposition = {
  composition: VideoAsset | ImageAsset;
  output: OutputSettings;
};
