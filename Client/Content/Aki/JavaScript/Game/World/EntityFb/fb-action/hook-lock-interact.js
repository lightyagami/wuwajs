"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HookLockInteract = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HookLockInteract {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, o) {
    this.bb_pos = t;
    this.bb = o;
    return this;
  }
  static getRootAsHookLockInteract(t, o) {
    return (o || new HookLockInteract()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsHookLockInteract(t, o) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (o || new HookLockInteract()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var o = this.bb.__offset(this.bb_pos, 4);
    if (o) {
      return this.bb.__string(this.bb_pos + o, t);
    } else {
      return undefined;
    }
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startHookLockInteract(t) {
    t.startObject(2);
  }
  static addType(t, o) {
    t.addFieldOffset(0, o, 0);
  }
  static addEntityId(t, o) {
    t.addFieldInt32(1, o, 0);
  }
  static endHookLockInteract(t) {
    return t.endObject();
  }
  static createHookLockInteract(t, o, e) {
    HookLockInteract.startHookLockInteract(t);
    HookLockInteract.addType(t, o);
    HookLockInteract.addEntityId(t, e);
    return HookLockInteract.endHookLockInteract(t);
  }
}
exports.HookLockInteract = HookLockInteract;
//# sourceMappingURL=hook-lock-interact.js.map