"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SlashAndTowerTip = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SlashAndTowerTip {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsSlashAndTowerTip(t, s) {
    return (s || new SlashAndTowerTip()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSlashAndTowerTip(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new SlashAndTowerTip()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  warningText(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return this.bb.__string(this.bb_pos + s, t);
    } else {
      return undefined;
    }
  }
  static startSlashAndTowerTip(t) {
    t.startObject(2);
  }
  static addType(t, s) {
    t.addFieldInt8(0, s, 0);
  }
  static addWarningText(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static endSlashAndTowerTip(t) {
    return t.endObject();
  }
  static createSlashAndTowerTip(t, s, e) {
    SlashAndTowerTip.startSlashAndTowerTip(t);
    SlashAndTowerTip.addType(t, s);
    SlashAndTowerTip.addWarningText(t, e);
    return SlashAndTowerTip.endSlashAndTowerTip(t);
  }
}
exports.SlashAndTowerTip = SlashAndTowerTip;
//# sourceMappingURL=slash-and-tower-tip.js.map