"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeSelfEntityPrefabPerformance = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChangeSelfEntityPrefabPerformance {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsChangeSelfEntityPrefabPerformance(e, t) {
    return (t || new ChangeSelfEntityPrefabPerformance()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsChangeSelfEntityPrefabPerformance(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new ChangeSelfEntityPrefabPerformance()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  performanceTag(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  static startChangeSelfEntityPrefabPerformance(e) {
    e.startObject(2);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addPerformanceTag(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static endChangeSelfEntityPrefabPerformance(e) {
    return e.endObject();
  }
  static createChangeSelfEntityPrefabPerformance(e, t, r) {
    ChangeSelfEntityPrefabPerformance.startChangeSelfEntityPrefabPerformance(e);
    ChangeSelfEntityPrefabPerformance.addType(e, t);
    ChangeSelfEntityPrefabPerformance.addPerformanceTag(e, r);
    return ChangeSelfEntityPrefabPerformance.endChangeSelfEntityPrefabPerformance(e);
  }
}
exports.ChangeSelfEntityPrefabPerformance = ChangeSelfEntityPrefabPerformance;
//# sourceMappingURL=change-self-entity-prefab-performance.js.map