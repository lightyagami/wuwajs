"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetAreaTimeLock = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const fixed_time_js_1 = require("../fb-action/fixed-time.js");
class SetAreaTimeLock {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSetAreaTimeLock(t, e) {
    return (e || new SetAreaTimeLock()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSetAreaTimeLock(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SetAreaTimeLock()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  areaIds(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + t * 4);
    } else {
      return 0;
    }
  }
  areaIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  areaIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  lockTime(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return (t || new fixed_time_js_1.FixedTime()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  static startSetAreaTimeLock(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static addAreaIds(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createAreaIdsVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      e.addInt32(i[t]);
    }
    return e.endVector();
  }
  static startAreaIdsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addLockTime(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endSetAreaTimeLock(t) {
    return t.endObject();
  }
}
exports.SetAreaTimeLock = SetAreaTimeLock;
//# sourceMappingURL=set-area-time-lock.js.map