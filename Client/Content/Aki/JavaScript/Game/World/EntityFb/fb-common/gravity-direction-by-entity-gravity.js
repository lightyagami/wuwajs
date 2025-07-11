"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GravityDirectionByEntityGravity = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class GravityDirectionByEntityGravity {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsGravityDirectionByEntityGravity(t, i) {
    return (i || new GravityDirectionByEntityGravity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsGravityDirectionByEntityGravity(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new GravityDirectionByEntityGravity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startGravityDirectionByEntityGravity(t) {
    t.startObject(2);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addEntityId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static endGravityDirectionByEntityGravity(t) {
    return t.endObject();
  }
  static createGravityDirectionByEntityGravity(t, i, r) {
    GravityDirectionByEntityGravity.startGravityDirectionByEntityGravity(t);
    GravityDirectionByEntityGravity.addType(t, i);
    GravityDirectionByEntityGravity.addEntityId(t, r);
    return GravityDirectionByEntityGravity.endGravityDirectionByEntityGravity(t);
  }
}
exports.GravityDirectionByEntityGravity = GravityDirectionByEntityGravity;
//# sourceMappingURL=gravity-direction-by-entity-gravity.js.map