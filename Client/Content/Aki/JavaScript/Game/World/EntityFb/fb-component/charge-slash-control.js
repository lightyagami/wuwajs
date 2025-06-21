"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ChargeSlashControl = void 0;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChargeSlashControl {
  constructor() {
    this.bb = void 0, this.bb_pos = 0
  }
  __init(t, r) {
    return this.bb_pos = t, this.bb = r, this
  }
  static getRootAsChargeSlashControl(t, r) {
    return (r || new ChargeSlashControl).__init(t.readInt32(t.position()) + t.position(), t)
  }
  static getSizePrefixedRootAsChargeSlashControl(t, r) {
    return t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH), (r || new ChargeSlashControl).__init(t.readInt32(t.position()) + t.position(), t)
  }
  type(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    return r ? this.bb.__string(this.bb_pos + r, t) : void 0
  }
  upHeight() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return t ? this.bb.readInt32(this.bb_pos + t) : 0
  }
  upCurvePath(t) {
    var r = this.bb.__offset(this.bb_pos, 8);
    return r ? this.bb.__string(this.bb_pos + r, t) : void 0
  }
  static startChargeSlashControl(t) {
    t.startObject(3)
  }
  static addType(t, r) {
    t.addFieldOffset(0, r, 0)
  }
  static addUpHeight(t, r) {
    t.addFieldInt32(1, r, 0)
  }
  static addUpCurvePath(t, r) {
    t.addFieldOffset(2, r, 0)
  }
  static endChargeSlashControl(t) {
    return t.endObject()
  }
  static createChargeSlashControl(t, r, s, e) {
    return ChargeSlashControl.startChargeSlashControl(t), ChargeSlashControl.addType(t, r), ChargeSlashControl.addUpHeight(t, s), ChargeSlashControl.addUpCurvePath(t, e), ChargeSlashControl.endChargeSlashControl(t)
  }
}
exports.ChargeSlashControl = ChargeSlashControl;
//# sourceMappingURL=charge-slash-control.js.map