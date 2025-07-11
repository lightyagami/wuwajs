"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetPlayerOperationRestriction = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SetPlayerOperationRestriction {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSetPlayerOperationRestriction(t, e) {
    return (e || new SetPlayerOperationRestriction()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSetPlayerOperationRestriction(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SetPlayerOperationRestriction()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startSetPlayerOperationRestriction(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endSetPlayerOperationRestriction(t) {
    return t.endObject();
  }
  static createSetPlayerOperationRestriction(t, e) {
    SetPlayerOperationRestriction.startSetPlayerOperationRestriction(t);
    SetPlayerOperationRestriction.addType(t, e);
    return SetPlayerOperationRestriction.endSetPlayerOperationRestriction(t);
  }
}
exports.SetPlayerOperationRestriction = SetPlayerOperationRestriction;
//# sourceMappingURL=set-player-operation-restriction.js.map