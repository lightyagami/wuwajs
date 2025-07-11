"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FixProcessor = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const fix_action_js_1 = require("../fb-fix-processor/fix-action.js");
class FixProcessor {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(s, t) {
    this.bb_pos = s;
    this.bb = t;
    return this;
  }
  static getRootAsFixProcessor(s, t) {
    return (t || new FixProcessor()).__init(s.readInt32(s.position()) + s.position(), s);
  }
  static getSizePrefixedRootAsFixProcessor(s, t) {
    s.setPosition(s.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new FixProcessor()).__init(s.readInt32(s.position()) + s.position(), s);
  }
  fixActions(s, t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return (t || new fix_action_js_1.FixAction()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + s * 4), this.bb);
    } else {
      return undefined;
    }
  }
  fixActionsLength() {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return this.bb.__vector_len(this.bb_pos + s);
    } else {
      return 0;
    }
  }
  static startFixProcessor(s) {
    s.startObject(1);
  }
  static addFixActions(s, t) {
    s.addFieldOffset(0, t, 0);
  }
  static createFixActionsVector(t, r) {
    t.startVector(4, r.length, 4);
    for (let s = r.length - 1; s >= 0; s--) {
      t.addOffset(r[s]);
    }
    return t.endVector();
  }
  static startFixActionsVector(s, t) {
    s.startVector(4, t, 4);
  }
  static endFixProcessor(s) {
    return s.endObject();
  }
  static createFixProcessor(s, t) {
    FixProcessor.startFixProcessor(s);
    FixProcessor.addFixActions(s, t);
    return FixProcessor.endFixProcessor(s);
  }
}
exports.FixProcessor = FixProcessor;
//# sourceMappingURL=fix-processor.js.map