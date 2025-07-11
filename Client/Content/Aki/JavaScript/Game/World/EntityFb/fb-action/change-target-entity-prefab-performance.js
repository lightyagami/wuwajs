"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeTargetEntityPrefabPerformance = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChangeTargetEntityPrefabPerformance {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsChangeTargetEntityPrefabPerformance(e, t) {
    return (t || new ChangeTargetEntityPrefabPerformance()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsChangeTargetEntityPrefabPerformance(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new ChangeTargetEntityPrefabPerformance()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  entityId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  performanceTag(e) {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startChangeTargetEntityPrefabPerformance(e) {
    e.startObject(3);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addEntityId(e, t) {
    e.addFieldInt32(1, t, 0);
  }
  static addPerformanceTag(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static endChangeTargetEntityPrefabPerformance(e) {
    return e.endObject();
  }
  static createChangeTargetEntityPrefabPerformance(e, t, r, a) {
    ChangeTargetEntityPrefabPerformance.startChangeTargetEntityPrefabPerformance(e);
    ChangeTargetEntityPrefabPerformance.addType(e, t);
    ChangeTargetEntityPrefabPerformance.addEntityId(e, r);
    ChangeTargetEntityPrefabPerformance.addPerformanceTag(e, a);
    return ChangeTargetEntityPrefabPerformance.endChangeTargetEntityPrefabPerformance(e);
  }
}
exports.ChangeTargetEntityPrefabPerformance = ChangeTargetEntityPrefabPerformance;
//# sourceMappingURL=change-target-entity-prefab-performance.js.map