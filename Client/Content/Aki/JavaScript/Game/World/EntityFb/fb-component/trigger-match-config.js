"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TriggerMatchConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_entity_match_js_1 = require("../fb-component/union-entity-match.js");
class TriggerMatchConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsTriggerMatchConfig(t, i) {
    return (i || new TriggerMatchConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTriggerMatchConfig(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new TriggerMatchConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  entityMatchType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_entity_match_js_1.UnionEntityMatch.NONE;
    }
  }
  entityMatch(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  entityMatchCount() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startTriggerMatchConfig(t) {
    t.startObject(3);
  }
  static addEntityMatchType(t, i) {
    t.addFieldInt8(0, i, union_entity_match_js_1.UnionEntityMatch.NONE);
  }
  static addEntityMatch(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addEntityMatchCount(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static endTriggerMatchConfig(t) {
    return t.endObject();
  }
  static createTriggerMatchConfig(t, i, r, e) {
    TriggerMatchConfig.startTriggerMatchConfig(t);
    TriggerMatchConfig.addEntityMatchType(t, i);
    TriggerMatchConfig.addEntityMatch(t, r);
    TriggerMatchConfig.addEntityMatchCount(t, e);
    return TriggerMatchConfig.endTriggerMatchConfig(t);
  }
}
exports.TriggerMatchConfig = TriggerMatchConfig;
//# sourceMappingURL=trigger-match-config.js.map