"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelPrefabPerformComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const level_prefab_params_config_js_1 = require("../fb-component/level-prefab-params-config.js");
const toward_entity_config_js_1 = require("../fb-component/toward-entity-config.js");
class LevelPrefabPerformComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsLevelPrefabPerformComponent(t, e) {
    return (e || new LevelPrefabPerformComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsLevelPrefabPerformComponent(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new LevelPrefabPerformComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  towardEntity(t, e) {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return (e || new toward_entity_config_js_1.TowardEntityConfig()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  towardEntityLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  prefabParams(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return (t || new level_prefab_params_config_js_1.LevelPrefabParamsConfig()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  static startLevelPrefabPerformComponent(t) {
    t.startObject(3);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addTowardEntity(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createTowardEntityVector(e, r) {
    e.startVector(4, r.length, 4);
    for (let t = r.length - 1; t >= 0; t--) {
      e.addOffset(r[t]);
    }
    return e.endVector();
  }
  static startTowardEntityVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addPrefabParams(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endLevelPrefabPerformComponent(t) {
    return t.endObject();
  }
}
exports.LevelPrefabPerformComponent = LevelPrefabPerformComponent;
//# sourceMappingURL=level-prefab-perform-component.js.map