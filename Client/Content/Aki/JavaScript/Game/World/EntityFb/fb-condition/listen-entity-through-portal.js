"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListenEntityThroughPortal = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_target_entity_js_1 = require("../fb-condition/union-target-entity.js");
class ListenEntityThroughPortal {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsListenEntityThroughPortal(t, i) {
    return (i || new ListenEntityThroughPortal()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsListenEntityThroughPortal(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new ListenEntityThroughPortal()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  checkTargetType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_target_entity_js_1.UnionTargetEntity.NONE;
    }
  }
  checkTarget(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  portalEntityId() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startListenEntityThroughPortal(t) {
    t.startObject(4);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addCheckTargetType(t, i) {
    t.addFieldInt8(1, i, union_target_entity_js_1.UnionTargetEntity.NONE);
  }
  static addCheckTarget(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addPortalEntityId(t, i) {
    t.addFieldInt32(3, i, 0);
  }
  static endListenEntityThroughPortal(t) {
    return t.endObject();
  }
  static createListenEntityThroughPortal(t, i, r, e, s) {
    ListenEntityThroughPortal.startListenEntityThroughPortal(t);
    ListenEntityThroughPortal.addType(t, i);
    ListenEntityThroughPortal.addCheckTargetType(t, r);
    ListenEntityThroughPortal.addCheckTarget(t, e);
    ListenEntityThroughPortal.addPortalEntityId(t, s);
    return ListenEntityThroughPortal.endListenEntityThroughPortal(t);
  }
}
exports.ListenEntityThroughPortal = ListenEntityThroughPortal;
//# sourceMappingURL=listen-entity-through-portal.js.map