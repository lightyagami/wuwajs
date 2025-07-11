"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MontageRegistered = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const montage_id_js_1 = require("../fb-action/montage-id.js");
class MontageRegistered {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsMontageRegistered(t, e) {
    return (e || new MontageRegistered()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsMontageRegistered(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new MontageRegistered()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  montageId(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return (t || new montage_id_js_1.MontageId()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  static startMontageRegistered(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addMontageId(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endMontageRegistered(t) {
    return t.endObject();
  }
}
exports.MontageRegistered = MontageRegistered;
//# sourceMappingURL=montage-registered.js.map