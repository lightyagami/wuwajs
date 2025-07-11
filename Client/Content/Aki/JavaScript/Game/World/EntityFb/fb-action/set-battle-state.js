"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetBattleState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_state_option_js_1 = require("../fb-action/union-state-option.js");
class SetBattleState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSetBattleState(t, e) {
    return (e || new SetBattleState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSetBattleState(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SetBattleState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  stateOptionType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_state_option_js_1.UnionStateOption.NONE;
    }
  }
  stateOption(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  static startSetBattleState(t) {
    t.startObject(2);
  }
  static addStateOptionType(t, e) {
    t.addFieldInt8(0, e, union_state_option_js_1.UnionStateOption.NONE);
  }
  static addStateOption(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endSetBattleState(t) {
    return t.endObject();
  }
  static createSetBattleState(t, e, a) {
    SetBattleState.startSetBattleState(t);
    SetBattleState.addStateOptionType(t, e);
    SetBattleState.addStateOption(t, a);
    return SetBattleState.endSetBattleState(t);
  }
}
exports.SetBattleState = SetBattleState;
//# sourceMappingURL=set-battle-state.js.map