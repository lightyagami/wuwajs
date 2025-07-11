"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PerformerAiSplineMove = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PerformerAiSplineMove {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, r) {
    this.bb_pos = e;
    this.bb = r;
    return this;
  }
  static getRootAsPerformerAiSplineMove(e, r) {
    return (r || new PerformerAiSplineMove()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsPerformerAiSplineMove(e, r) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new PerformerAiSplineMove()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  splineEntityId() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startPerformerAiSplineMove(e) {
    e.startObject(1);
  }
  static addSplineEntityId(e, r) {
    e.addFieldInt32(0, r, 0);
  }
  static endPerformerAiSplineMove(e) {
    return e.endObject();
  }
  static createPerformerAiSplineMove(e, r) {
    PerformerAiSplineMove.startPerformerAiSplineMove(e);
    PerformerAiSplineMove.addSplineEntityId(e, r);
    return PerformerAiSplineMove.endPerformerAiSplineMove(e);
  }
}
exports.PerformerAiSplineMove = PerformerAiSplineMove;
//# sourceMappingURL=performer-ai-spline-move.js.map