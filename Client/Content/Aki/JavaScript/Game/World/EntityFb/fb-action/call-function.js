"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallFunction = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CallFunction {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsCallFunction(t, i) {
    return (i || new CallFunction()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCallFunction(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new CallFunction()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  name(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  static startCallFunction(t) {
    t.startObject(1);
  }
  static addName(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static endCallFunction(t) {
    return t.endObject();
  }
  static createCallFunction(t, i) {
    CallFunction.startCallFunction(t);
    CallFunction.addName(t, i);
    return CallFunction.endCallFunction(t);
  }
}
exports.CallFunction = CallFunction;
//# sourceMappingURL=call-function.js.map