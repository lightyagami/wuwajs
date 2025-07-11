"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeEntityStateDirectly = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChangeEntityStateDirectly {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsChangeEntityStateDirectly(t, e) {
    return (e || new ChangeEntityStateDirectly()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsChangeEntityStateDirectly(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ChangeEntityStateDirectly()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
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
  state(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  delayChange() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startChangeEntityStateDirectly(t) {
    t.startObject(4);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addEntityId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addState(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addDelayChange(t, e) {
    t.addFieldInt8(3, +e, 0);
  }
  static endChangeEntityStateDirectly(t) {
    return t.endObject();
  }
  static createChangeEntityStateDirectly(t, e, i, a, r) {
    ChangeEntityStateDirectly.startChangeEntityStateDirectly(t);
    ChangeEntityStateDirectly.addType(t, e);
    ChangeEntityStateDirectly.addEntityId(t, i);
    ChangeEntityStateDirectly.addState(t, a);
    ChangeEntityStateDirectly.addDelayChange(t, r);
    return ChangeEntityStateDirectly.endChangeEntityStateDirectly(t);
  }
}
exports.ChangeEntityStateDirectly = ChangeEntityStateDirectly;
//# sourceMappingURL=change-entity-state-directly.js.map