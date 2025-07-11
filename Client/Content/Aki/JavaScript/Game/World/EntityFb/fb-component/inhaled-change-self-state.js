"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InhaledChangeSelfState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class InhaledChangeSelfState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsInhaledChangeSelfState(e, t) {
    return (t || new InhaledChangeSelfState()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsInhaledChangeSelfState(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new InhaledChangeSelfState()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  changeSelfState(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startInhaledChangeSelfState(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addChangeSelfState(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endInhaledChangeSelfState(e) {
    return e.endObject();
  }
  static createInhaledChangeSelfState(e, t, a) {
    InhaledChangeSelfState.startInhaledChangeSelfState(e);
    InhaledChangeSelfState.addType(e, t);
    InhaledChangeSelfState.addChangeSelfState(e, a);
    return InhaledChangeSelfState.endInhaledChangeSelfState(e);
  }
}
exports.InhaledChangeSelfState = InhaledChangeSelfState;
//# sourceMappingURL=inhaled-change-self-state.js.map