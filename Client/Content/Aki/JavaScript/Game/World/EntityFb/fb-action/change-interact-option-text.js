"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeInteractOptionText = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChangeInteractOptionText {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsChangeInteractOptionText(t, e) {
    return (e || new ChangeInteractOptionText()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsChangeInteractOptionText(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ChangeInteractOptionText()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  tidContent(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startChangeInteractOptionText(t) {
    t.startObject(1);
  }
  static addTidContent(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endChangeInteractOptionText(t) {
    return t.endObject();
  }
  static createChangeInteractOptionText(t, e) {
    ChangeInteractOptionText.startChangeInteractOptionText(t);
    ChangeInteractOptionText.addTidContent(t, e);
    return ChangeInteractOptionText.endChangeInteractOptionText(t);
  }
}
exports.ChangeInteractOptionText = ChangeInteractOptionText;
//# sourceMappingURL=change-interact-option-text.js.map