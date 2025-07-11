"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelPrefab = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const prefab_effect_config_js_1 = require("../fb-component/prefab-effect-config.js");
const prefab_state_config_js_1 = require("../fb-component/prefab-state-config.js");
class LevelPrefab {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsLevelPrefab(t, e) {
    return (e || new LevelPrefab()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsLevelPrefab(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new LevelPrefab()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  blueprintPath(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  prefabPath(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  nameOffsetZ() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  prefabStateList(t, e) {
    var r = this.bb.__offset(this.bb_pos, 12);
    if (r) {
      return (e || new prefab_state_config_js_1.PrefabStateConfig()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  prefabStateListLength() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  effectStateList(t, e) {
    var r = this.bb.__offset(this.bb_pos, 14);
    if (r) {
      return (e || new prefab_effect_config_js_1.PrefabEffectConfig()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  effectStateListLength() {
    var t = this.bb.__offset(this.bb_pos, 14);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startLevelPrefab(t) {
    t.startObject(6);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addBlueprintPath(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addPrefabPath(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addNameOffsetZ(t, e) {
    t.addFieldInt32(3, e, 0);
  }
  static addPrefabStateList(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static createPrefabStateListVector(e, r) {
    e.startVector(4, r.length, 4);
    for (let t = r.length - 1; t >= 0; t--) {
      e.addOffset(r[t]);
    }
    return e.endVector();
  }
  static startPrefabStateListVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addEffectStateList(t, e) {
    t.addFieldOffset(5, e, 0);
  }
  static createEffectStateListVector(e, r) {
    e.startVector(4, r.length, 4);
    for (let t = r.length - 1; t >= 0; t--) {
      e.addOffset(r[t]);
    }
    return e.endVector();
  }
  static startEffectStateListVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endLevelPrefab(t) {
    return t.endObject();
  }
  static createLevelPrefab(t, e, r, s, i, a, f) {
    LevelPrefab.startLevelPrefab(t);
    LevelPrefab.addType(t, e);
    LevelPrefab.addBlueprintPath(t, r);
    LevelPrefab.addPrefabPath(t, s);
    LevelPrefab.addNameOffsetZ(t, i);
    LevelPrefab.addPrefabStateList(t, a);
    LevelPrefab.addEffectStateList(t, f);
    return LevelPrefab.endLevelPrefab(t);
  }
}
exports.LevelPrefab = LevelPrefab;
//# sourceMappingURL=level-prefab.js.map