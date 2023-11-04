import { FilterSpecification } from 'fluent-ffmpeg';
import {
  AssetOperation,
  ImageAsset,
  OverlayAsset,
  VideoAsset,
} from '../declarations';

export type GraphNode = {
  name: string;
};

export interface FfmpegBuilder {
  addFilter: (filter: FilterSpecification) => void;
  addInput: (inputPath: string, inputOptions?: string[]) => GraphNode;
  processAsset: (asset: VideoAsset | ImageAsset) => GraphNode;
}

export type AssetProcessingHandler = (options: {
  asset: ImageAsset | VideoAsset;
  ffmpegBuilder: FfmpegBuilder;
}) => GraphNode;

export type OperationHandler = (options: {
  input?: GraphNode;
  operation: AssetOperation;
  ffmpegBuilder: FfmpegBuilder;
}) => GraphNode;

export type OverlayHandler = (options: {
  input: GraphNode;
  overlayAsset: OverlayAsset;
  ffmpegBuilder: FfmpegBuilder;
}) => GraphNode;
