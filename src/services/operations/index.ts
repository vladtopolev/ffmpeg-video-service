import { AssetOperation, AssetOperationTypes } from '../../declarations';

import cropOperation from './cropOperation';
import scaleOperation from './scaleOperation';
import horizontalFlipOperation from './horizontalFlipOperation';
import { FfmpegBuilder, GraphNode } from '../commandBuilder.declarations';

export const assetOperationHandlersConfig = {
  [AssetOperationTypes.crop]: cropOperation,
  [AssetOperationTypes.scale]: scaleOperation,
  [AssetOperationTypes.horizintalFlip]: horizontalFlipOperation,
};

export const chainOperations = ({
  operations,
  input,
  ffmpegBuilder,
}: {
  operations: AssetOperation[];
  input: GraphNode;
  ffmpegBuilder: FfmpegBuilder;
}) => {
  return operations.reduce((lastNode, operation) => {
    const operationHandler = assetOperationHandlersConfig[operation.type];
    return operationHandler({
      input: lastNode,
      operation,
      ffmpegBuilder,
    });
  }, input);
};
