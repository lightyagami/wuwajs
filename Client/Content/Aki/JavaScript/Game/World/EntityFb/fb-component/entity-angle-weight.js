"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityAngleWeight = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EntityAngleWeight {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsEntityAngleWeight(t, e) {
    return (e || new EntityAngleWeight()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEntityAngleWeight(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new EntityAngleWeight()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  angle() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  weight() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startEntityAngleWeight(t) {
    t.startObject(2);
  }
  static addAngle(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addWeight(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static endEntityAngleWeight(t) {
    return t.endObject();
  }
  static createEntityAngleWeight(t, e, i) {
    EntityAngleWeight.startEntityAngleWeight(t);
    EntityAngleWeight.addAngle(t, e);
    EntityAngleWeight.addWeight(t, i);
    return EntityAngleWeight.endEntityAngleWeight(t);
  }
}
exports.EntityAngleWeight = EntityAngleWeight;
//# sourceMappingURL=entity-angle-weight.js.map