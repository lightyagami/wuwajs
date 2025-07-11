"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChargeSlashControl = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChargeSlashControl {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsChargeSlashControl(t, r) {
    return (r || new ChargeSlashControl()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsChargeSlashControl(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new ChargeSlashControl()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  upHeight() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  upCurvePath(t) {
    var r = this.bb.__offset(this.bb_pos, 8);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  static startChargeSlashControl(t) {
    t.startObject(3);
  }
  static addType(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static addUpHeight(t, r) {
    t.addFieldInt32(1, r, 0);
  }
  static addUpCurvePath(t, r) {
    t.addFieldOffset(2, r, 0);
  }
  static endChargeSlashControl(t) {
    return t.endObject();
  }
  static createChargeSlashControl(t, r, s, e) {
    ChargeSlashControl.startChargeSlashControl(t);
    ChargeSlashControl.addType(t, r);
    ChargeSlashControl.addUpHeight(t, s);
    ChargeSlashControl.addUpCurvePath(t, e);
    return ChargeSlashControl.endChargeSlashControl(t);
  }
}
exports.ChargeSlashControl = ChargeSlashControl;
//# sourceMappingURL=charge-slash-control.js.map