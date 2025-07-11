"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateBulletDestroyCondition = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CreateBulletDestroyCondition {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsCreateBulletDestroyCondition(t, e) {
    return (e || new CreateBulletDestroyCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCreateBulletDestroyCondition(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new CreateBulletDestroyCondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startCreateBulletDestroyCondition(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endCreateBulletDestroyCondition(t) {
    return t.endObject();
  }
  static createCreateBulletDestroyCondition(t, e) {
    CreateBulletDestroyCondition.startCreateBulletDestroyCondition(t);
    CreateBulletDestroyCondition.addType(t, e);
    return CreateBulletDestroyCondition.endCreateBulletDestroyCondition(t);
  }
}
exports.CreateBulletDestroyCondition = CreateBulletDestroyCondition;
//# sourceMappingURL=create-bullet-destroy-condition.js.map