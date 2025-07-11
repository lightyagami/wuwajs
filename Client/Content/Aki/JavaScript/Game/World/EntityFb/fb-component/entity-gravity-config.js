"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityGravityConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_gravity_direction_js_1 = require("../fb-common/union-gravity-direction.js");
class EntityGravityConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsEntityGravityConfig(t, i) {
    return (i || new EntityGravityConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEntityGravityConfig(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new EntityGravityConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  gravityDirectionType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_gravity_direction_js_1.UnionGravityDirection.NONE;
    }
  }
  gravityDirection(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  specifyGravityLoad() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  specifyGravityLock() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startEntityGravityConfig(t) {
    t.startObject(4);
  }
  static addGravityDirectionType(t, i) {
    t.addFieldInt8(0, i, union_gravity_direction_js_1.UnionGravityDirection.NONE);
  }
  static addGravityDirection(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addSpecifyGravityLoad(t, i) {
    t.addFieldInt8(2, +i, 0);
  }
  static addSpecifyGravityLock(t, i) {
    t.addFieldInt8(3, +i, 0);
  }
  static endEntityGravityConfig(t) {
    return t.endObject();
  }
  static createEntityGravityConfig(t, i, r, n, a) {
    EntityGravityConfig.startEntityGravityConfig(t);
    EntityGravityConfig.addGravityDirectionType(t, i);
    EntityGravityConfig.addGravityDirection(t, r);
    EntityGravityConfig.addSpecifyGravityLoad(t, n);
    EntityGravityConfig.addSpecifyGravityLock(t, a);
    return EntityGravityConfig.endEntityGravityConfig(t);
  }
}
exports.EntityGravityConfig = EntityGravityConfig;
//# sourceMappingURL=entity-gravity-config.js.map