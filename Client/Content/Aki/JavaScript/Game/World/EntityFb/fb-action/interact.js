"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Interact = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class Interact {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsInteract(t, r) {
    return (r || new Interact()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsInteract(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new Interact()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  who() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  param(t) {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  static startInteract(t) {
    t.startObject(2);
  }
  static addWho(t, r) {
    t.addFieldInt32(0, r, 0);
  }
  static addParam(t, r) {
    t.addFieldOffset(1, r, 0);
  }
  static endInteract(t) {
    return t.endObject();
  }
  static createInteract(t, r, e) {
    Interact.startInteract(t);
    Interact.addWho(t, r);
    Interact.addParam(t, e);
    return Interact.endInteract(t);
  }
}
exports.Interact = Interact;
//# sourceMappingURL=interact.js.map