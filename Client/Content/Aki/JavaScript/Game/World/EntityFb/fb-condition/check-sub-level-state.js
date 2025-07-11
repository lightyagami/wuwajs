"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckSubLevelState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const check_sub_level_state_config_js_1 = require("../fb-condition/check-sub-level-state-config.js");
class CheckSubLevelState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsCheckSubLevelState(t, e) {
    return (e || new CheckSubLevelState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCheckSubLevelState(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new CheckSubLevelState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  conditionCount() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  checkList(t, e) {
    var s = this.bb.__offset(this.bb_pos, 8);
    if (s) {
      return (e || new check_sub_level_state_config_js_1.CheckSubLevelStateConfig()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  checkListLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startCheckSubLevelState(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addConditionCount(t, e) {
    t.addFieldInt8(1, e, 0);
  }
  static addCheckList(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createCheckListVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      e.addOffset(s[t]);
    }
    return e.endVector();
  }
  static startCheckListVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endCheckSubLevelState(t) {
    return t.endObject();
  }
  static createCheckSubLevelState(t, e, s, i) {
    CheckSubLevelState.startCheckSubLevelState(t);
    CheckSubLevelState.addType(t, e);
    CheckSubLevelState.addConditionCount(t, s);
    CheckSubLevelState.addCheckList(t, i);
    return CheckSubLevelState.endCheckSubLevelState(t);
  }
}
exports.CheckSubLevelState = CheckSubLevelState;
//# sourceMappingURL=check-sub-level-state.js.map