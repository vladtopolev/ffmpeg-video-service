import { v4 as uuid4 } from 'uuid';
import { ScaleOperation } from '../../declarations';
import { OperationHandler } from '../commandBuilder.declarations';

const scaleOperation: OperationHandler = ({
  input,
  operation,
  ffmpegBuilder,
}) => {
  const _operation = operation as ScaleOperation;
  const outputNodeName = `scaled-${uuid4()}`;

  ffmpegBuilder.addFilter({
    filter: 'scale',
    inputs: [input.name],
    outputs: [outputNodeName],

    options: {
      width: _operation.width,
      height: _operation.height,
    },
  });

  return {
    name: outputNodeName,
  };
};

export default scaleOperation;
