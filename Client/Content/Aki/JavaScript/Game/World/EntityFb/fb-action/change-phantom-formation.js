"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangePhantomFormation = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChangePhantomFormation {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, a) {
    this.bb_pos = t;
    this.bb = a;
    return this;
  }
  static getRootAsChangePhantomFormation(t, a) {
    return (a || new ChangePhantomFormation()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsChangePhantomFormation(t, a) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new ChangePhantomFormation()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  formationId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  retainRole() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  teleportEntityId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  appendBuffIds(t) {
    var a = this.bb.__offset(this.bb_pos, 10);
    if (a) {
      return this.bb.readInt64(this.bb.__vector(this.bb_pos + a) + t * 8);
    } else {
      return BigInt(0);
    }
  }
  appendBuffIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startChangePhantomFormation(t) {
    t.startObject(4);
  }
  static addFormationId(t, a) {
    t.addFieldInt32(0, a, 0);
  }
  static addRetainRole(t, a) {
    t.addFieldInt8(1, +a, 0);
  }
  static addTeleportEntityId(t, a) {
    t.addFieldInt32(2, a, 0);
  }
  static addAppendBuffIds(t, a) {
    t.addFieldOffset(3, a, 0);
  }
  static createAppendBuffIdsVector(a, n) {
    a.startVector(8, n.length, 8);
    for (let t = n.length - 1; t >= 0; t--) {
      a.addInt64(n[t]);
    }
    return a.endVector();
  }
  static startAppendBuffIdsVector(t, a) {
    t.startVector(8, a, 8);
  }
  static endChangePhantomFormation(t) {
    return t.endObject();
  }
  static createChangePhantomFormation(t, a, n, e, i) {
    ChangePhantomFormation.startChangePhantomFormation(t);
    ChangePhantomFormation.addFormationId(t, a);
    ChangePhantomFormation.addRetainRole(t, n);
    ChangePhantomFormation.addTeleportEntityId(t, e);
    ChangePhantomFormation.addAppendBuffIds(t, i);
    return ChangePhantomFormation.endChangePhantomFormation(t);
  }
}
exports.ChangePhantomFormation = ChangePhantomFormation;
//# sourceMappingURL=change-phantom-formation.js.map