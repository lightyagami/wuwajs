"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelAIComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const level_aistate_js_1 = require("../fb-component/level-aistate.js");
class LevelAIComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsLevelAIComponent(t, e) {
    return (e || new LevelAIComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsLevelAIComponent(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new LevelAIComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  states(t, e) {
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return (e || new level_aistate_js_1.LevelAIState()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  statesLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  btTreeAsset(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startLevelAIComponent(t) {
    t.startObject(3);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addStates(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createStatesVector(e, s) {
    e.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      e.addOffset(s[t]);
    }
    return e.endVector();
  }
  static startStatesVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addBtTreeAsset(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endLevelAIComponent(t) {
    return t.endObject();
  }
  static createLevelAIComponent(t, e, s, i) {
    LevelAIComponent.startLevelAIComponent(t);
    LevelAIComponent.addDisabled(t, e);
    LevelAIComponent.addStates(t, s);
    LevelAIComponent.addBtTreeAsset(t, i);
    return LevelAIComponent.endLevelAIComponent(t);
  }
}
exports.LevelAIComponent = LevelAIComponent;
//# sourceMappingURL=level-aicomponent.js.map