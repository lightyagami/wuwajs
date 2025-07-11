"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FireBulletTrackPosition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_target_entity_js_1 = require("../fb-action/union-target-entity.js");
class FireBulletTrackPosition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsFireBulletTrackPosition(t, i) {
    return (i || new FireBulletTrackPosition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsFireBulletTrackPosition(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new FireBulletTrackPosition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  bulletId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt64(this.bb_pos + t);
    } else {
      return BigInt("0");
    }
  }
  launcherType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_target_entity_js_1.UnionTargetEntity.NONE;
    }
  }
  launcher(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  positionEntityId() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startFireBulletTrackPosition(t) {
    t.startObject(5);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addBulletId(t, i) {
    t.addFieldInt64(1, i, BigInt("0"));
  }
  static addLauncherType(t, i) {
    t.addFieldInt8(2, i, union_target_entity_js_1.UnionTargetEntity.NONE);
  }
  static addLauncher(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addPositionEntityId(t, i) {
    t.addFieldInt32(4, i, 0);
  }
  static endFireBulletTrackPosition(t) {
    return t.endObject();
  }
  static createFireBulletTrackPosition(t, i, e, r, s, n) {
    FireBulletTrackPosition.startFireBulletTrackPosition(t);
    FireBulletTrackPosition.addType(t, i);
    FireBulletTrackPosition.addBulletId(t, e);
    FireBulletTrackPosition.addLauncherType(t, r);
    FireBulletTrackPosition.addLauncher(t, s);
    FireBulletTrackPosition.addPositionEntityId(t, n);
    return FireBulletTrackPosition.endFireBulletTrackPosition(t);
  }
}
exports.FireBulletTrackPosition = FireBulletTrackPosition;
//# sourceMappingURL=fire-bullet-track-position.js.map