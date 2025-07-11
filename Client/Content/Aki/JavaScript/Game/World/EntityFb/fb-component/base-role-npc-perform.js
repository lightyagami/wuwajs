"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseRoleNpcPerform = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class BaseRoleNpcPerform {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, r) {
    this.bb_pos = e;
    this.bb = r;
    return this;
  }
  static getRootAsBaseRoleNpcPerform(e, r) {
    return (r || new BaseRoleNpcPerform()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsBaseRoleNpcPerform(e, r) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new BaseRoleNpcPerform()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.__string(this.bb_pos + r, e);
    } else {
      return undefined;
    }
  }
  static startBaseRoleNpcPerform(e) {
    e.startObject(1);
  }
  static addType(e, r) {
    e.addFieldOffset(0, r, 0);
  }
  static endBaseRoleNpcPerform(e) {
    return e.endObject();
  }
  static createBaseRoleNpcPerform(e, r) {
    BaseRoleNpcPerform.startBaseRoleNpcPerform(e);
    BaseRoleNpcPerform.addType(e, r);
    return BaseRoleNpcPerform.endBaseRoleNpcPerform(e);
  }
}
exports.BaseRoleNpcPerform = BaseRoleNpcPerform;
//# sourceMappingURL=base-role-npc-perform.js.map