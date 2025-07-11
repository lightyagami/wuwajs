"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetExploreState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_explore_state_js_1 = require("../fb-action/union-explore-state.js");
class SetExploreState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSetExploreState(t, e) {
    return (e || new SetExploreState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSetExploreState(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SetExploreState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  configType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_explore_state_js_1.UnionExploreState.NONE;
    }
  }
  config(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  static startSetExploreState(t) {
    t.startObject(2);
  }
  static addConfigType(t, e) {
    t.addFieldInt8(0, e, union_explore_state_js_1.UnionExploreState.NONE);
  }
  static addConfig(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endSetExploreState(t) {
    return t.endObject();
  }
  static createSetExploreState(t, e, r) {
    SetExploreState.startSetExploreState(t);
    SetExploreState.addConfigType(t, e);
    SetExploreState.addConfig(t, r);
    return SetExploreState.endSetExploreState(t);
  }
}
exports.SetExploreState = SetExploreState;
//# sourceMappingURL=set-explore-state.js.map