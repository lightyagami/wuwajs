"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetEntityTag = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SetEntityTag {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsSetEntityTag(t, i) {
    return (i || new SetEntityTag()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSetEntityTag(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new SetEntityTag()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  gameplayTag(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  setType(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  delayTime() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  beforeHide() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startSetEntityTag(t) {
    t.startObject(5);
  }
  static addEntityId(t, i) {
    t.addFieldInt32(0, i, 0);
  }
  static addGameplayTag(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addSetType(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addDelayTime(t, i) {
    t.addFieldFloat32(3, i, 0);
  }
  static addBeforeHide(t, i) {
    t.addFieldInt8(4, +i, 0);
  }
  static endSetEntityTag(t) {
    return t.endObject();
  }
  static createSetEntityTag(t, i, e, s, a, r) {
    SetEntityTag.startSetEntityTag(t);
    SetEntityTag.addEntityId(t, i);
    SetEntityTag.addGameplayTag(t, e);
    SetEntityTag.addSetType(t, s);
    SetEntityTag.addDelayTime(t, a);
    SetEntityTag.addBeforeHide(t, r);
    return SetEntityTag.endSetEntityTag(t);
  }
}
exports.SetEntityTag = SetEntityTag;
//# sourceMappingURL=set-entity-tag.js.map