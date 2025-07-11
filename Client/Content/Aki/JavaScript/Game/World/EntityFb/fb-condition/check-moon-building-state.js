"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckMoonBuildingState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckMoonBuildingState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsCheckMoonBuildingState(t, i) {
    return (i || new CheckMoonBuildingState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCheckMoonBuildingState(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new CheckMoonBuildingState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  buildingId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  isBuilt() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startCheckMoonBuildingState(t) {
    t.startObject(3);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addBuildingId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addIsBuilt(t, i) {
    t.addFieldInt8(2, +i, 0);
  }
  static endCheckMoonBuildingState(t) {
    return t.endObject();
  }
  static createCheckMoonBuildingState(t, i, e, n) {
    CheckMoonBuildingState.startCheckMoonBuildingState(t);
    CheckMoonBuildingState.addType(t, i);
    CheckMoonBuildingState.addBuildingId(t, e);
    CheckMoonBuildingState.addIsBuilt(t, n);
    return CheckMoonBuildingState.endCheckMoonBuildingState(t);
  }
}
exports.CheckMoonBuildingState = CheckMoonBuildingState;
//# sourceMappingURL=check-moon-building-state.js.map