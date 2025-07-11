"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemPatrol = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_scene_item_ai_patrol_type_js_1 = require("../fb-component/union-scene-item-ai-patrol-type.js");
const condition_group_js_1 = require("../fb-condition/condition-group.js");
class SceneItemPatrol {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSceneItemPatrol(t, e) {
    return (e || new SceneItemPatrol()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSceneItemPatrol(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SceneItemPatrol()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  enableCondition(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return (t || new condition_group_js_1.ConditionGroup()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  disableCondition(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return (t || new condition_group_js_1.ConditionGroup()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  hideWhenDisable() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  patrolTypeType() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_scene_item_ai_patrol_type_js_1.UnionSceneItemAiPatrolType.NONE;
    }
  }
  patrolType(t) {
    var e = this.bb.__offset(this.bb_pos, 14);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  static startSceneItemPatrol(t) {
    t.startObject(6);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addEnableCondition(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addDisableCondition(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addHideWhenDisable(t, e) {
    t.addFieldInt8(3, +e, 0);
  }
  static addPatrolTypeType(t, e) {
    t.addFieldInt8(4, e, union_scene_item_ai_patrol_type_js_1.UnionSceneItemAiPatrolType.NONE);
  }
  static addPatrolType(t, e) {
    t.addFieldOffset(5, e, 0);
  }
  static endSceneItemPatrol(t) {
    return t.endObject();
  }
}
exports.SceneItemPatrol = SceneItemPatrol;
//# sourceMappingURL=scene-item-patrol.js.map