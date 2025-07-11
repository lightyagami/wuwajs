"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LifePointMaxStepRewardRuleItem = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class LifePointMaxStepRewardRuleItem {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsLifePointMaxStepRewardRuleItem(t, e) {
    return (e || new LifePointMaxStepRewardRuleItem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsLifePointMaxStepRewardRuleItem(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new LifePointMaxStepRewardRuleItem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  paintCount() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  addStep() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startLifePointMaxStepRewardRuleItem(t) {
    t.startObject(2);
  }
  static addPaintCount(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addAddStep(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endLifePointMaxStepRewardRuleItem(t) {
    return t.endObject();
  }
  static createLifePointMaxStepRewardRuleItem(t, e, i) {
    LifePointMaxStepRewardRuleItem.startLifePointMaxStepRewardRuleItem(t);
    LifePointMaxStepRewardRuleItem.addPaintCount(t, e);
    LifePointMaxStepRewardRuleItem.addAddStep(t, i);
    return LifePointMaxStepRewardRuleItem.endLifePointMaxStepRewardRuleItem(t);
  }
}
exports.LifePointMaxStepRewardRuleItem = LifePointMaxStepRewardRuleItem;
//# sourceMappingURL=life-point-max-step-reward-rule-item.js.map