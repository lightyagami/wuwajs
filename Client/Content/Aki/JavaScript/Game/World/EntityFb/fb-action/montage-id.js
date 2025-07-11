"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MontageId = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class MontageId {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsMontageId(t, e) {
    return (e || new MontageId()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsMontageId(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new MontageId()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  montageId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  isAbp() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startMontageId(t) {
    t.startObject(2);
  }
  static addMontageId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addIsAbp(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static endMontageId(t) {
    return t.endObject();
  }
  static createMontageId(t, e, s) {
    MontageId.startMontageId(t);
    MontageId.addMontageId(t, e);
    MontageId.addIsAbp(t, s);
    return MontageId.endMontageId(t);
  }
}
exports.MontageId = MontageId;
//# sourceMappingURL=montage-id.js.map