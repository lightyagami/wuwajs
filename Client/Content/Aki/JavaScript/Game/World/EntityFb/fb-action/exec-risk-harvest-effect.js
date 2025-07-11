"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExecRiskHarvestEffect = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ExecRiskHarvestEffect {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsExecRiskHarvestEffect(t, e) {
    return (e || new ExecRiskHarvestEffect()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsExecRiskHarvestEffect(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ExecRiskHarvestEffect()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startExecRiskHarvestEffect(t) {
    t.startObject(1);
  }
  static addId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static endExecRiskHarvestEffect(t) {
    return t.endObject();
  }
  static createExecRiskHarvestEffect(t, e) {
    ExecRiskHarvestEffect.startExecRiskHarvestEffect(t);
    ExecRiskHarvestEffect.addId(t, e);
    return ExecRiskHarvestEffect.endExecRiskHarvestEffect(t);
  }
}
exports.ExecRiskHarvestEffect = ExecRiskHarvestEffect;
//# sourceMappingURL=exec-risk-harvest-effect.js.map