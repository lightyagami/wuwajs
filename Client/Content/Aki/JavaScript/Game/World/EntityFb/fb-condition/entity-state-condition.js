"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityStateCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EntityStateCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsEntityStateCondition(t, i) {
    return (i || new EntityStateCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEntityStateCondition(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new EntityStateCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  state(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  static startEntityStateCondition(t) {
    t.startObject(2);
  }
  static addEntityId(t, i) {
    t.addFieldInt32(0, i, 0);
  }
  static addState(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endEntityStateCondition(t) {
    return t.endObject();
  }
  static createEntityStateCondition(t, i, n) {
    EntityStateCondition.startEntityStateCondition(t);
    EntityStateCondition.addEntityId(t, i);
    EntityStateCondition.addState(t, n);
    return EntityStateCondition.endEntityStateCondition(t);
  }
}
exports.EntityStateCondition = EntityStateCondition;
//# sourceMappingURL=entity-state-condition.js.map