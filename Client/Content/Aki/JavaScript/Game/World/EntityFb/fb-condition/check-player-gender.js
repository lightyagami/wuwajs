"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckPlayerGender = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckPlayerGender {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, r) {
    this.bb_pos = e;
    this.bb = r;
    return this;
  }
  static getRootAsCheckPlayerGender(e, r) {
    return (r || new CheckPlayerGender()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsCheckPlayerGender(e, r) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new CheckPlayerGender()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.__string(this.bb_pos + r, e);
    } else {
      return undefined;
    }
  }
  gender(e) {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return this.bb.__string(this.bb_pos + r, e);
    } else {
      return undefined;
    }
  }
  static startCheckPlayerGender(e) {
    e.startObject(2);
  }
  static addType(e, r) {
    e.addFieldOffset(0, r, 0);
  }
  static addGender(e, r) {
    e.addFieldOffset(1, r, 0);
  }
  static endCheckPlayerGender(e) {
    return e.endObject();
  }
  static createCheckPlayerGender(e, r, t) {
    CheckPlayerGender.startCheckPlayerGender(e);
    CheckPlayerGender.addType(e, r);
    CheckPlayerGender.addGender(e, t);
    return CheckPlayerGender.endCheckPlayerGender(e);
  }
}
exports.CheckPlayerGender = CheckPlayerGender;
//# sourceMappingURL=check-player-gender.js.map