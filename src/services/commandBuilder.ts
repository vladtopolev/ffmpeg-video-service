import ffmpeg, { FfmpegCommand, FilterSpecification } from 'fluent-ffmpeg';
import { ImageAsset, VideoAsset, VideoComposition } from '../declarations';

import { assetProcessingHandleraConfig } from './assetHandlers';
import { FfmpegBuilder, GraphNode } from './commandBuilder.declarations';

export class FfmpegCommandBuilder implements FfmpegBuilder {
  private ffmpegCommand: FfmpegCommand;

  private inputs: Array<GraphNode> = [];
  private filters: Array<string | FilterSpecification> = [];

  constructor(private videoComposition: VideoComposition) {
    this.ffmpegCommand = ffmpeg();
  }

  addFilter(filter: FilterSpecification) {
    this.filters = [...this.filters, filter];
  }

  addInput(inputPath: string, inputOptions?: string[]): GraphNode {
    this.ffmpegCommand.input(inputPath);
    if (inputOptions && inputOptions.length !== 0) {
      this.ffmpegCommand.inputOptions(inputOptions);
    }

    const inputNode: GraphNode = {
      name: this.inputs.length.toString(),
    };
    this.inputs = [...this.inputs, inputNode];

    return inputNode;
  }

  getCommand(): FfmpegCommand {
    const lastVideoStreamNode = this.processAsset(
      this.videoComposition.composition
    );

    if (this.filters.length === 0) {
      return this.ffmpegCommand;
    }

    this.ffmpegCommand
      .complexFilter(this.filters)
      .outputOption(`-map [${lastVideoStreamNode.name}]`)
      .outputOption(`-map 0:a`)
      .outputOption('-movflags +faststart');

    return this.ffmpegCommand;
  }

  processAsset(asset: VideoAsset | ImageAsset): GraphNode {
    const handler = assetProcessingHandleraConfig[asset.type];
    return handler({ asset, ffmpegBuilder: this });
  }
}
