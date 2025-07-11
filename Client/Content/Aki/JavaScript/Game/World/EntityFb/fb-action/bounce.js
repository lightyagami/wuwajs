"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bounce = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class Bounce {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsBounce(t, e) {
    return (e || new Bounce()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBounce(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new Bounce()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  height() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  time() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  motionCurve(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startBounce(t) {
    t.startObject(4);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addHeight(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addTime(t, e) {
    t.addFieldFloat32(2, e, 0);
  }
  static addMotionCurve(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static endBounce(t) {
    return t.endObject();
  }
  static createBounce(t, e, i, s, r) {
    Bounce.startBounce(t);
    Bounce.addType(t, e);
    Bounce.addHeight(t, i);
    Bounce.addTime(t, s);
    Bounce.addMotionCurve(t, r);
    return Bounce.endBounce(t);
  }
}
exports.Bounce = Bounce;
//# sourceMappingURL=bounce.js.map