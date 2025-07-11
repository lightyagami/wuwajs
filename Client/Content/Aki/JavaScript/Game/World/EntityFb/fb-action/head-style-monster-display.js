"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeadStyleMonsterDisplay = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HeadStyleMonsterDisplay {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsHeadStyleMonsterDisplay(t, e) {
    return (e || new HeadStyleMonsterDisplay()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsHeadStyleMonsterDisplay(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new HeadStyleMonsterDisplay()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  monsterDisplayId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startHeadStyleMonsterDisplay(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static addMonsterDisplayId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endHeadStyleMonsterDisplay(t) {
    return t.endObject();
  }
  static createHeadStyleMonsterDisplay(t, e, s) {
    HeadStyleMonsterDisplay.startHeadStyleMonsterDisplay(t);
    HeadStyleMonsterDisplay.addType(t, e);
    HeadStyleMonsterDisplay.addMonsterDisplayId(t, s);
    return HeadStyleMonsterDisplay.endHeadStyleMonsterDisplay(t);
  }
}
exports.HeadStyleMonsterDisplay = HeadStyleMonsterDisplay;
//# sourceMappingURL=head-style-monster-display.js.map