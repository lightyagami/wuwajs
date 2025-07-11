"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityValue = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EntityValue {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsEntityValue(t, e) {
    return (e || new EntityValue()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEntityValue(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new EntityValue()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  v() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startEntityValue(t) {
    t.startObject(1);
  }
  static addV(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static endEntityValue(t) {
    return t.endObject();
  }
  static createEntityValue(t, e) {
    EntityValue.startEntityValue(t);
    EntityValue.addV(t, e);
    return EntityValue.endEntityValue(t);
  }
}
exports.EntityValue = EntityValue;
//# sourceMappingURL=entity-value.js.map