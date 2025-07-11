"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnableFunction = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EnableFunction {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, n) {
    this.bb_pos = t;
    this.bb = n;
    return this;
  }
  static getRootAsEnableFunction(t, n) {
    return (n || new EnableFunction()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEnableFunction(t, n) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (n || new EnableFunction()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var n = this.bb.__offset(this.bb_pos, 4);
    if (n) {
      return this.bb.__string(this.bb_pos + n, t);
    } else {
      return undefined;
    }
  }
  static startEnableFunction(t) {
    t.startObject(1);
  }
  static addType(t, n) {
    t.addFieldOffset(0, n, 0);
  }
  static endEnableFunction(t) {
    return t.endObject();
  }
  static createEnableFunction(t, n) {
    EnableFunction.startEnableFunction(t);
    EnableFunction.addType(t, n);
    return EnableFunction.endEnableFunction(t);
  }
}
exports.EnableFunction = EnableFunction;
//# sourceMappingURL=enable-function.js.map