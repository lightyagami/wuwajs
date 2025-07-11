"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateBulletConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CreateBulletConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsCreateBulletConfig(t, e) {
    return (e || new CreateBulletConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCreateBulletConfig(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new CreateBulletConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  bulletId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt64(this.bb_pos + t);
    } else {
      return BigInt("0");
    }
  }
  delay() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startCreateBulletConfig(t) {
    t.startObject(2);
  }
  static addBulletId(t, e) {
    t.addFieldInt64(0, e, BigInt("0"));
  }
  static addDelay(t, e) {
    t.addFieldFloat32(1, e, 0);
  }
  static endCreateBulletConfig(t) {
    return t.endObject();
  }
  static createCreateBulletConfig(t, e, i) {
    CreateBulletConfig.startCreateBulletConfig(t);
    CreateBulletConfig.addBulletId(t, e);
    CreateBulletConfig.addDelay(t, i);
    return CreateBulletConfig.endCreateBulletConfig(t);
  }
}
exports.CreateBulletConfig = CreateBulletConfig;
//# sourceMappingURL=create-bullet-config.js.map