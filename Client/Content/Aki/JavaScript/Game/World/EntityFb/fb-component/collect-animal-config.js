"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollectAnimalConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const collect_animal_parts_config_js_1 = require("../fb-component/collect-animal-parts-config.js");
class CollectAnimalConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsCollectAnimalConfig(t, i) {
    return (i || new CollectAnimalConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCollectAnimalConfig(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new CollectAnimalConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  partsMap(t, i) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return (i || new collect_animal_parts_config_js_1.CollectAnimalPartsConfig()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  partsMapLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startCollectAnimalConfig(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addPartsMap(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createPartsMapVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; t >= 0; t--) {
      i.addOffset(e[t]);
    }
    return i.endVector();
  }
  static startPartsMapVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endCollectAnimalConfig(t) {
    return t.endObject();
  }
  static createCollectAnimalConfig(t, i, e) {
    CollectAnimalConfig.startCollectAnimalConfig(t);
    CollectAnimalConfig.addType(t, i);
    CollectAnimalConfig.addPartsMap(t, e);
    return CollectAnimalConfig.endCollectAnimalConfig(t);
  }
}
exports.CollectAnimalConfig = CollectAnimalConfig;
//# sourceMappingURL=collect-animal-config.js.map