import { Injectable } from '@nestjs/common';

import * as tf from '@tensorflow/tfjs-node';
@Injectable()
export class AppService {
  async proccessImage(file: any) {
    const url = {
      model: 'https://pottery-pkg.s3.eu-central-1.amazonaws.com/model.json',
    };
    try {
      const model = await tf.loadGraphModel(url.model);
      console.log(model);
    } catch (err) {
      console.error(err);
    }

    return file;
  }
}
