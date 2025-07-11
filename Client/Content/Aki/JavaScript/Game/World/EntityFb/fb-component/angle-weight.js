"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AngleWeight = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const entity_angle_weight_js_1 = require("../fb-component/entity-angle-weight.js");
class AngleWeight {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsAngleWeight(t, e) {
    return (e || new AngleWeight()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsAngleWeight(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new AngleWeight()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  angleWeight(t, e) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return (e || new entity_angle_weight_js_1.EntityAngleWeight()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  angleWeightLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startAngleWeight(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addAngleWeight(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createAngleWeightVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      e.addOffset(i[t]);
    }
    return e.endVector();
  }
  static startAngleWeightVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endAngleWeight(t) {
    return t.endObject();
  }
  static createAngleWeight(t, e, i) {
    AngleWeight.startAngleWeight(t);
    AngleWeight.addType(t, e);
    AngleWeight.addAngleWeight(t, i);
    return AngleWeight.endAngleWeight(t);
  }
}
exports.AngleWeight = AngleWeight;
//# sourceMappingURL=angle-weight.js.map