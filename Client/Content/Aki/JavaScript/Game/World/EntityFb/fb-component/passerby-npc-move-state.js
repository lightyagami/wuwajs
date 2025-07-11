"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PasserbyNpcMoveState = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PasserbyNpcMoveState {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsPasserbyNpcMoveState(t, e) {
    return (e || new PasserbyNpcMoveState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPasserbyNpcMoveState(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new PasserbyNpcMoveState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  moveState() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  charPositionState() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  moveSpeed() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startPasserbyNpcMoveState(t) {
    t.startObject(3);
  }
  static addMoveState(t, e) {
    t.addFieldInt8(0, e, 0);
  }
  static addCharPositionState(t, e) {
    t.addFieldInt8(1, e, 0);
  }
  static addMoveSpeed(t, e) {
    t.addFieldInt32(2, e, 0);
  }
  static endPasserbyNpcMoveState(t) {
    return t.endObject();
  }
  static createPasserbyNpcMoveState(t, e, s, a) {
    PasserbyNpcMoveState.startPasserbyNpcMoveState(t);
    PasserbyNpcMoveState.addMoveState(t, e);
    PasserbyNpcMoveState.addCharPositionState(t, s);
    PasserbyNpcMoveState.addMoveSpeed(t, a);
    return PasserbyNpcMoveState.endPasserbyNpcMoveState(t);
  }
}
exports.PasserbyNpcMoveState = PasserbyNpcMoveState;
//# sourceMappingURL=passerby-npc-move-state.js.map