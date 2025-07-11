"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetPlayerMoveControl = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SetPlayerMoveControl {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSetPlayerMoveControl(t, e) {
    return (e || new SetPlayerMoveControl()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSetPlayerMoveControl(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SetPlayerMoveControl()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  left() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  right() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  forward() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  back() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startSetPlayerMoveControl(t) {
    t.startObject(4);
  }
  static addLeft(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addRight(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addForward(t, e) {
    t.addFieldInt32(2, e, 0);
  }
  static addBack(t, e) {
    t.addFieldInt32(3, e, 0);
  }
  static endSetPlayerMoveControl(t) {
    return t.endObject();
  }
  static createSetPlayerMoveControl(t, e, r, o, s) {
    SetPlayerMoveControl.startSetPlayerMoveControl(t);
    SetPlayerMoveControl.addLeft(t, e);
    SetPlayerMoveControl.addRight(t, r);
    SetPlayerMoveControl.addForward(t, o);
    SetPlayerMoveControl.addBack(t, s);
    return SetPlayerMoveControl.endSetPlayerMoveControl(t);
  }
}
exports.SetPlayerMoveControl = SetPlayerMoveControl;
//# sourceMappingURL=set-player-move-control.js.map