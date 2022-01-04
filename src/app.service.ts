import { Injectable } from '@nestjs/common';
import * as tf from '@tensorflow/tfjs-node';

@Injectable()
export class AppService {
  model;
  modelUrl = 'https://pottery-pkg.s3.eu-central-1.amazonaws.com/model.json';
  async proccessImage(image: any) {
    try {
      if (!this.model) {
        this.model = await tf.loadGraphModel(this.modelUrl);
      }
      return this.predict(image);
    } catch (err) {
      console.error(err);
    }
  }
  async predict(incoming) {
    const buffer = new Uint8Array(incoming.buffer);
    const imgData = tf.node.decodeImage(buffer); //error throwns here.
    // const res = tf.tensor(incoming.buffer);
    // const tensorImg = tf.browser
    //   .fromPixels(res)
    //   .resizeNearestNeighbor([150, 150])
    //   .toFloat()
    //   .expandDims();
    const prediction = await this.model.predict(imgData).data();
    return prediction;
  }
  _arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}
