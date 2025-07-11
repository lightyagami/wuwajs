"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PerformerAiMoveTo = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_performer_ai_move_to_config_js_1 = require("../fb-action/union-performer-ai-move-to-config.js");
class PerformerAiMoveTo {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, r) {
    this.bb_pos = e;
    this.bb = r;
    return this;
  }
  static getRootAsPerformerAiMoveTo(e, r) {
    return (r || new PerformerAiMoveTo()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsPerformerAiMoveTo(e, r) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new PerformerAiMoveTo()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  configType() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_performer_ai_move_to_config_js_1.UnionPerformerAiMoveToConfig.NONE;
    }
  }
  config(e) {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return this.bb.__union(e, this.bb_pos + r);
    } else {
      return undefined;
    }
  }
  stopDistance() {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.readFloat32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startPerformerAiMoveTo(e) {
    e.startObject(3);
  }
  static addConfigType(e, r) {
    e.addFieldInt8(0, r, union_performer_ai_move_to_config_js_1.UnionPerformerAiMoveToConfig.NONE);
  }
  static addConfig(e, r) {
    e.addFieldOffset(1, r, 0);
  }
  static addStopDistance(e, r) {
    e.addFieldFloat32(2, r, 0);
  }
  static endPerformerAiMoveTo(e) {
    return e.endObject();
  }
  static createPerformerAiMoveTo(e, r, o, t) {
    PerformerAiMoveTo.startPerformerAiMoveTo(e);
    PerformerAiMoveTo.addConfigType(e, r);
    PerformerAiMoveTo.addConfig(e, o);
    PerformerAiMoveTo.addStopDistance(e, t);
    return PerformerAiMoveTo.endPerformerAiMoveTo(e);
  }
}
exports.PerformerAiMoveTo = PerformerAiMoveTo;
//# sourceMappingURL=performer-ai-move-to.js.map