"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StateHintComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const entity_state_condition_js_1 = require("../fb-condition/entity-state-condition.js");
class StateHintComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsStateHintComponent(t, e) {
    return (e || new StateHintComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsStateHintComponent(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new StateHintComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  activeConditions(t, e) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return (e || new entity_state_condition_js_1.EntityStateCondition()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  activeConditionsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startStateHintComponent(t) {
    t.startObject(2);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addActiveConditions(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createActiveConditionsVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      e.addOffset(i[t]);
    }
    return e.endVector();
  }
  static startActiveConditionsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endStateHintComponent(t) {
    return t.endObject();
  }
  static createStateHintComponent(t, e, i) {
    StateHintComponent.startStateHintComponent(t);
    StateHintComponent.addDisabled(t, e);
    StateHintComponent.addActiveConditions(t, i);
    return StateHintComponent.endStateHintComponent(t);
  }
}
exports.StateHintComponent = StateHintComponent;
//# sourceMappingURL=state-hint-component.js.map