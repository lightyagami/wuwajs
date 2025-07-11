"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CatapultParam = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class CatapultParam {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, a) {
    this.bb_pos = t;
    this.bb = a;
    return this;
  }
  static getRootAsCatapultParam(t, a) {
    return (a || new CatapultParam()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCatapultParam(t, a) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new CatapultParam()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  p1(t) {
    var a = this.bb.__offset(this.bb_pos, 4);
    if (a) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + a), this.bb);
    } else {
      return undefined;
    }
  }
  p2(t) {
    var a = this.bb.__offset(this.bb_pos, 6);
    if (a) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + a), this.bb);
    } else {
      return undefined;
    }
  }
  gravity() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  time() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  motionCurve(t) {
    var a = this.bb.__offset(this.bb_pos, 12);
    if (a) {
      return this.bb.__string(this.bb_pos + a, t);
    } else {
      return undefined;
    }
  }
  static startCatapultParam(t) {
    t.startObject(5);
  }
  static addP1(t, a) {
    t.addFieldOffset(0, a, 0);
  }
  static addP2(t, a) {
    t.addFieldOffset(1, a, 0);
  }
  static addGravity(t, a) {
    t.addFieldFloat32(2, a, 0);
  }
  static addTime(t, a) {
    t.addFieldFloat32(3, a, 0);
  }
  static addMotionCurve(t, a) {
    t.addFieldOffset(4, a, 0);
  }
  static endCatapultParam(t) {
    return t.endObject();
  }
}
exports.CatapultParam = CatapultParam;
//# sourceMappingURL=catapult-param.js.map