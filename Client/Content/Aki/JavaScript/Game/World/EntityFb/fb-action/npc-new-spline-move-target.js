"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcNewSplineMoveTarget = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class NpcNewSplineMoveTarget {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsNpcNewSplineMoveTarget(e, t) {
    return (t || new NpcNewSplineMoveTarget()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsNpcNewSplineMoveTarget(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new NpcNewSplineMoveTarget()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  npcId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startNpcNewSplineMoveTarget(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addNpcId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static endNpcNewSplineMoveTarget(e) {
    return e.endObject();
  }
  static createNpcNewSplineMoveTarget(e, t, i) {
    NpcNewSplineMoveTarget.startNpcNewSplineMoveTarget(e);
    NpcNewSplineMoveTarget.addType(e, t);
    NpcNewSplineMoveTarget.addNpcId(e, i);
    return NpcNewSplineMoveTarget.endNpcNewSplineMoveTarget(e);
  }
}
exports.NpcNewSplineMoveTarget = NpcNewSplineMoveTarget;
//# sourceMappingURL=npc-new-spline-move-target.js.map