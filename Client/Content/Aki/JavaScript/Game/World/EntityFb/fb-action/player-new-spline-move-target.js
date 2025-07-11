"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerNewSplineMoveTarget = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PlayerNewSplineMoveTarget {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsPlayerNewSplineMoveTarget(e, t) {
    return (t || new PlayerNewSplineMoveTarget()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsPlayerNewSplineMoveTarget(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new PlayerNewSplineMoveTarget()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startPlayerNewSplineMoveTarget(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endPlayerNewSplineMoveTarget(e) {
    return e.endObject();
  }
  static createPlayerNewSplineMoveTarget(e, t) {
    PlayerNewSplineMoveTarget.startPlayerNewSplineMoveTarget(e);
    PlayerNewSplineMoveTarget.addType(e, t);
    return PlayerNewSplineMoveTarget.endPlayerNewSplineMoveTarget(e);
  }
}
exports.PlayerNewSplineMoveTarget = PlayerNewSplineMoveTarget;
//# sourceMappingURL=player-new-spline-move-target.js.map