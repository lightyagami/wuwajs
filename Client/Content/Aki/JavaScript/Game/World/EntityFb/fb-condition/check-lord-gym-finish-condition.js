"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckLordGymFinishCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckLordGymFinishCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsCheckLordGymFinishCondition(i, t) {
    return (t || new CheckLordGymFinishCondition()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsCheckLordGymFinishCondition(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new CheckLordGymFinishCondition()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  lordGymId() {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.readInt32(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  static startCheckLordGymFinishCondition(i) {
    i.startObject(2);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addLordGymId(i, t) {
    i.addFieldInt32(1, t, 0);
  }
  static endCheckLordGymFinishCondition(i) {
    return i.endObject();
  }
  static createCheckLordGymFinishCondition(i, t, o) {
    CheckLordGymFinishCondition.startCheckLordGymFinishCondition(i);
    CheckLordGymFinishCondition.addType(i, t);
    CheckLordGymFinishCondition.addLordGymId(i, o);
    return CheckLordGymFinishCondition.endCheckLordGymFinishCondition(i);
  }
}
exports.CheckLordGymFinishCondition = CheckLordGymFinishCondition;
//# sourceMappingURL=check-lord-gym-finish-condition.js.map