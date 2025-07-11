"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckFormationRoleInfoCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_check_formation_role_info_js_1 = require("../fb-condition/union-check-formation-role-info.js");
class CheckFormationRoleInfoCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(o, t) {
    this.bb_pos = o;
    this.bb = t;
    return this;
  }
  static getRootAsCheckFormationRoleInfoCondition(o, t) {
    return (t || new CheckFormationRoleInfoCondition()).__init(o.readInt32(o.position()) + o.position(), o);
  }
  static getSizePrefixedRootAsCheckFormationRoleInfoCondition(o, t) {
    o.setPosition(o.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CheckFormationRoleInfoCondition()).__init(o.readInt32(o.position()) + o.position(), o);
  }
  type(o) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, o);
    } else {
      return undefined;
    }
  }
  optionType() {
    var o = this.bb.__offset(this.bb_pos, 6);
    if (o) {
      return this.bb.readUint8(this.bb_pos + o);
    } else {
      return union_check_formation_role_info_js_1.UnionCheckFormationRoleInfo.NONE;
    }
  }
  option(o) {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__union(o, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  static startCheckFormationRoleInfoCondition(o) {
    o.startObject(3);
  }
  static addType(o, t) {
    o.addFieldOffset(0, t, 0);
  }
  static addOptionType(o, t) {
    o.addFieldInt8(1, t, union_check_formation_role_info_js_1.UnionCheckFormationRoleInfo.NONE);
  }
  static addOption(o, t) {
    o.addFieldOffset(2, t, 0);
  }
  static endCheckFormationRoleInfoCondition(o) {
    return o.endObject();
  }
  static createCheckFormationRoleInfoCondition(o, t, i, n) {
    CheckFormationRoleInfoCondition.startCheckFormationRoleInfoCondition(o);
    CheckFormationRoleInfoCondition.addType(o, t);
    CheckFormationRoleInfoCondition.addOptionType(o, i);
    CheckFormationRoleInfoCondition.addOption(o, n);
    return CheckFormationRoleInfoCondition.endCheckFormationRoleInfoCondition(o);
  }
}
exports.CheckFormationRoleInfoCondition = CheckFormationRoleInfoCondition;
//# sourceMappingURL=check-formation-role-info-condition.js.map