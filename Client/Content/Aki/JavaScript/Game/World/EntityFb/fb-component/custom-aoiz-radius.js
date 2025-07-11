"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomAoizRadius = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CustomAoizRadius {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsCustomAoizRadius(t, s) {
    return (s || new CustomAoizRadius()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCustomAoizRadius(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new CustomAoizRadius()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  up() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  down() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startCustomAoizRadius(t) {
    t.startObject(2);
  }
  static addUp(t, s) {
    t.addFieldInt32(0, s, 0);
  }
  static addDown(t, s) {
    t.addFieldInt32(1, s, 0);
  }
  static endCustomAoizRadius(t) {
    return t.endObject();
  }
  static createCustomAoizRadius(t, s, i) {
    CustomAoizRadius.startCustomAoizRadius(t);
    CustomAoizRadius.addUp(t, s);
    CustomAoizRadius.addDown(t, i);
    return CustomAoizRadius.endCustomAoizRadius(t);
  }
}
exports.CustomAoizRadius = CustomAoizRadius;
//# sourceMappingURL=custom-aoiz-radius.js.map