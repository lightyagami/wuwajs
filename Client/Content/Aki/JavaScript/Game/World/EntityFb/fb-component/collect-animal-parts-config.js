"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollectAnimalPartsConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CollectAnimalPartsConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsCollectAnimalPartsConfig(t, i) {
    return (i || new CollectAnimalPartsConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCollectAnimalPartsConfig(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new CollectAnimalPartsConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  slot() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  skeleton(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  collectEntity() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startCollectAnimalPartsConfig(t) {
    t.startObject(3);
  }
  static addSlot(t, i) {
    t.addFieldInt8(0, i, 0);
  }
  static addSkeleton(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addCollectEntity(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static endCollectAnimalPartsConfig(t) {
    return t.endObject();
  }
  static createCollectAnimalPartsConfig(t, i, s, l) {
    CollectAnimalPartsConfig.startCollectAnimalPartsConfig(t);
    CollectAnimalPartsConfig.addSlot(t, i);
    CollectAnimalPartsConfig.addSkeleton(t, s);
    CollectAnimalPartsConfig.addCollectEntity(t, l);
    return CollectAnimalPartsConfig.endCollectAnimalPartsConfig(t);
  }
}
exports.CollectAnimalPartsConfig = CollectAnimalPartsConfig;
//# sourceMappingURL=collect-animal-parts-config.js.map