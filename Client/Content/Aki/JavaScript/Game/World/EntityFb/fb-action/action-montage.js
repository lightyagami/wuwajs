"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionMontage = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ActionMontage {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsActionMontage(t, e) {
    return (e || new ActionMontage()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsActionMontage(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ActionMontage()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  montageType(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  path(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startActionMontage(t) {
    t.startObject(2);
  }
  static addMontageType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addPath(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endActionMontage(t) {
    return t.endObject();
  }
  static createActionMontage(t, e, i) {
    ActionMontage.startActionMontage(t);
    ActionMontage.addMontageType(t, e);
    ActionMontage.addPath(t, i);
    return ActionMontage.endActionMontage(t);
  }
}
exports.ActionMontage = ActionMontage;
//# sourceMappingURL=action-montage.js.map