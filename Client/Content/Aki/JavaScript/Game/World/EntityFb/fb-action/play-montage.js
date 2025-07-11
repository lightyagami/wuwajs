"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayMontage = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const action_montage_js_1 = require("../fb-action/action-montage.js");
class PlayMontage {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsPlayMontage(t, i) {
    return (i || new PlayMontage()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPlayMontage(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new PlayMontage()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  actionMontage(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return (t || new action_montage_js_1.ActionMontage()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  expressionMontage(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  mouthSequence(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  duration() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startPlayMontage(t) {
    t.startObject(5);
  }
  static addEntityId(t, i) {
    t.addFieldInt32(0, i, 0);
  }
  static addActionMontage(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addExpressionMontage(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addMouthSequence(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addDuration(t, i) {
    t.addFieldInt32(4, i, 0);
  }
  static endPlayMontage(t) {
    return t.endObject();
  }
}
exports.PlayMontage = PlayMontage;
//# sourceMappingURL=play-montage.js.map