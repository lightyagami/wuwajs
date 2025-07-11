"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityStateComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const lock_config_js_1 = require("../fb-component/lock-config.js");
const state_change_behavior_js_1 = require("../fb-component/state-change-behavior.js");
const state_config_js_1 = require("../fb-component/state-config.js");
const condition_group_js_1 = require("../fb-condition/condition-group.js");
class EntityStateComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsEntityStateComponent(t, e) {
    return (e || new EntityStateComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEntityStateComponent(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new EntityStateComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  state(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  stateChangeCondition(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return (t || new condition_group_js_1.ConditionGroup()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  stateChangeBehaviors(t, e) {
    var i = this.bb.__offset(this.bb_pos, 12);
    if (i) {
      return (e || new state_change_behavior_js_1.StateChangeBehavior()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  stateChangeBehaviorsLength() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  instantActionsOnStateChange() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  lockConfig(t) {
    var e = this.bb.__offset(this.bb_pos, 16);
    if (e) {
      return (t || new lock_config_js_1.LockConfig()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  stateConfigs(t, e) {
    var i = this.bb.__offset(this.bb_pos, 18);
    if (i) {
      return (e || new state_config_js_1.StateConfig()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  stateConfigsLength() {
    var t = this.bb.__offset(this.bb_pos, 18);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  cycleStates(t, e) {
    var i = this.bb.__offset(this.bb_pos, 20);
    if (i) {
      return this.bb.__string(this.bb.__vector(this.bb_pos + i) + t * 4, e);
    } else {
      return undefined;
    }
  }
  cycleStatesLength() {
    var t = this.bb.__offset(this.bb_pos, 20);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  prefabPerformanceType(t) {
    var e = this.bb.__offset(this.bb_pos, 22);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startEntityStateComponent(t) {
    t.startObject(10);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addType(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addState(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addStateChangeCondition(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static addStateChangeBehaviors(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static createStateChangeBehaviorsVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      e.addOffset(i[t]);
    }
    return e.endVector();
  }
  static startStateChangeBehaviorsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addInstantActionsOnStateChange(t, e) {
    t.addFieldInt8(5, +e, 0);
  }
  static addLockConfig(t, e) {
    t.addFieldOffset(6, e, 0);
  }
  static addStateConfigs(t, e) {
    t.addFieldOffset(7, e, 0);
  }
  static createStateConfigsVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      e.addOffset(i[t]);
    }
    return e.endVector();
  }
  static startStateConfigsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addCycleStates(t, e) {
    t.addFieldOffset(8, e, 0);
  }
  static createCycleStatesVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      e.addOffset(i[t]);
    }
    return e.endVector();
  }
  static startCycleStatesVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addPrefabPerformanceType(t, e) {
    t.addFieldOffset(9, e, 0);
  }
  static endEntityStateComponent(t) {
    return t.endObject();
  }
}
exports.EntityStateComponent = EntityStateComponent;
//# sourceMappingURL=entity-state-component.js.map