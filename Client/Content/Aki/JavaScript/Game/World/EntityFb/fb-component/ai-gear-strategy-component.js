"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiGearStrategyComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_ai_gear_strategy_js_1 = require("../fb-component/union-ai-gear-strategy.js");
class AiGearStrategyComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsAiGearStrategyComponent(t, e) {
    return (e || new AiGearStrategyComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsAiGearStrategyComponent(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new AiGearStrategyComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  strategyTypeType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_ai_gear_strategy_js_1.UnionAiGearStrategy.NONE;
    }
  }
  strategyType(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  static startAiGearStrategyComponent(t) {
    t.startObject(3);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addStrategyTypeType(t, e) {
    t.addFieldInt8(1, e, union_ai_gear_strategy_js_1.UnionAiGearStrategy.NONE);
  }
  static addStrategyType(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endAiGearStrategyComponent(t) {
    return t.endObject();
  }
  static createAiGearStrategyComponent(t, e, r, a) {
    AiGearStrategyComponent.startAiGearStrategyComponent(t);
    AiGearStrategyComponent.addDisabled(t, e);
    AiGearStrategyComponent.addStrategyTypeType(t, r);
    AiGearStrategyComponent.addStrategyType(t, a);
    return AiGearStrategyComponent.endAiGearStrategyComponent(t);
  }
}
exports.AiGearStrategyComponent = AiGearStrategyComponent;
//# sourceMappingURL=ai-gear-strategy-component.js.map