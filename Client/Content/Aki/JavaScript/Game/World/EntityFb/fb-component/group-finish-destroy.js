"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupFinishDestroy = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const entity_state_js_1 = require("../fb-component/entity-state.js");
class GroupFinishDestroy {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsGroupFinishDestroy(t, s) {
    return (s || new GroupFinishDestroy()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsGroupFinishDestroy(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new GroupFinishDestroy()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return this.bb.__string(this.bb_pos + s, t);
    } else {
      return undefined;
    }
  }
  switchSpecifiedStatus(t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return (t || new entity_state_js_1.EntityState()).__init(this.bb.__indirect(this.bb_pos + s), this.bb);
    } else {
      return undefined;
    }
  }
  static startGroupFinishDestroy(t) {
    t.startObject(2);
  }
  static addType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addSwitchSpecifiedStatus(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static endGroupFinishDestroy(t) {
    return t.endObject();
  }
}
exports.GroupFinishDestroy = GroupFinishDestroy;
//# sourceMappingURL=group-finish-destroy.js.map