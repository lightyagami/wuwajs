"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Prompt = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class Prompt {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsPrompt(t, r) {
    return (r || new Prompt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPrompt(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new Prompt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  generalTextId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startPrompt(t) {
    t.startObject(1);
  }
  static addGeneralTextId(t, r) {
    t.addFieldInt32(0, r, 0);
  }
  static endPrompt(t) {
    return t.endObject();
  }
  static createPrompt(t, r) {
    Prompt.startPrompt(t);
    Prompt.addGeneralTextId(t, r);
    return Prompt.endPrompt(t);
  }
}
exports.Prompt = Prompt;
//# sourceMappingURL=prompt.js.map