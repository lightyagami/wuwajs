"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerSplineMoveTarget = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PlayerSplineMoveTarget {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsPlayerSplineMoveTarget(e, t) {
    return (t || new PlayerSplineMoveTarget()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsPlayerSplineMoveTarget(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new PlayerSplineMoveTarget()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startPlayerSplineMoveTarget(e) {
    e.startObject(1);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static endPlayerSplineMoveTarget(e) {
    return e.endObject();
  }
  static createPlayerSplineMoveTarget(e, t) {
    PlayerSplineMoveTarget.startPlayerSplineMoveTarget(e);
    PlayerSplineMoveTarget.addType(e, t);
    return PlayerSplineMoveTarget.endPlayerSplineMoveTarget(e);
  }
}
exports.PlayerSplineMoveTarget = PlayerSplineMoveTarget;
//# sourceMappingURL=player-spline-move-target.js.map