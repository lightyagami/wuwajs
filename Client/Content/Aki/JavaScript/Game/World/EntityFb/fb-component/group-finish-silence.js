"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupFinishSilence = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const entity_state_js_1 = require("../fb-component/entity-state.js");
class GroupFinishSilence {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsGroupFinishSilence(t, i) {
    return (i || new GroupFinishSilence()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsGroupFinishSilence(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new GroupFinishSilence()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  switchSpecifiedStatus(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return (t || new entity_state_js_1.EntityState()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  static startGroupFinishSilence(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addSwitchSpecifiedStatus(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endGroupFinishSilence(t) {
    return t.endObject();
  }
}
exports.GroupFinishSilence = GroupFinishSilence;
//# sourceMappingURL=group-finish-silence.js.map