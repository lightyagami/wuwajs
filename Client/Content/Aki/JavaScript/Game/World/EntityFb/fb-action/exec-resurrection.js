"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExecResurrection = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ExecResurrection {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsExecResurrection(e, t) {
    return (t || new ExecResurrection()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsExecResurrection(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new ExecResurrection()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  reviveId() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startExecResurrection(e) {
    e.startObject(1);
  }
  static addReviveId(e, t) {
    e.addFieldInt32(0, t, 0);
  }
  static endExecResurrection(e) {
    return e.endObject();
  }
  static createExecResurrection(e, t) {
    ExecResurrection.startExecResurrection(e);
    ExecResurrection.addReviveId(e, t);
    return ExecResurrection.endExecResurrection(e);
  }
}
exports.ExecResurrection = ExecResurrection;
//# sourceMappingURL=exec-resurrection.js.map