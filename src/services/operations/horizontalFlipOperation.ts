import { v4 as uuid4 } from 'uuid';
import { ScaleOperation } from '../../declarations';
import { OperationHandler } from '../commandBuilder.declarations';

const horizontalFlipOperation: OperationHandler = ({
  input,
  ffmpegBuilder,
}) => {
  const outputNodeName = `hflip-${uuid4()}`;

  ffmpegBuilder.addFilter({
    filter: 'hflip',
    inputs: [input.name],
    outputs: [outputNodeName],
  });

  return {
    name: outputNodeName,
  };
};

export default horizontalFlipOperation;
