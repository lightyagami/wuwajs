"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemFunction = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class OpenSystemFunction {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsOpenSystemFunction(t, e) {
    return (e || new OpenSystemFunction()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsOpenSystemFunction(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new OpenSystemFunction()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  functionId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startOpenSystemFunction(t) {
    t.startObject(1);
  }
  static addFunctionId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static endOpenSystemFunction(t) {
    return t.endObject();
  }
  static createOpenSystemFunction(t, e) {
    OpenSystemFunction.startOpenSystemFunction(t);
    OpenSystemFunction.addFunctionId(t, e);
    return OpenSystemFunction.endOpenSystemFunction(t);
  }
}
exports.OpenSystemFunction = OpenSystemFunction;
//# sourceMappingURL=open-system-function.js.map