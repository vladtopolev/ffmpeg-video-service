import { CropOperation } from '../../declarations';
import { OperationHandler } from '../commandBuilder.declarations';
import { v4 as uuid4 } from 'uuid';

const cropOperation: OperationHandler = ({
  input,
  operation,
  ffmpegBuilder,
}) => {
  const _operation = operation as CropOperation;
  const outputNodeName = `cropped-${uuid4()}`;

  ffmpegBuilder.addFilter({
    filter: 'crop',
    inputs: [input.name],
    outputs: [outputNodeName],

    options: {
      w: _operation.width,
      h: _operation.height,
    },
  });

  return {
    name: outputNodeName,
  };
};

export default cropOperation;
