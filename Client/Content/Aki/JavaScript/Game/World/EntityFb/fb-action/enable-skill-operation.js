"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnableSkillOperation = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EnableSkillOperation {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsEnableSkillOperation(t, e) {
    return (e || new EnableSkillOperation()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEnableSkillOperation(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new EnableSkillOperation()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startEnableSkillOperation(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endEnableSkillOperation(t) {
    return t.endObject();
  }
  static createEnableSkillOperation(t, e) {
    EnableSkillOperation.startEnableSkillOperation(t);
    EnableSkillOperation.addType(t, e);
    return EnableSkillOperation.endEnableSkillOperation(t);
  }
}
exports.EnableSkillOperation = EnableSkillOperation;
//# sourceMappingURL=enable-skill-operation.js.map