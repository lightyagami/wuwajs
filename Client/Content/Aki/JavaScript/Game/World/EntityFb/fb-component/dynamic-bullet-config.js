"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DynamicBulletConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DynamicBulletConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsDynamicBulletConfig(t, i) {
    return (i || new DynamicBulletConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDynamicBulletConfig(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new DynamicBulletConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  bulletId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  portalModel(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  templateId(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  static startDynamicBulletConfig(t) {
    t.startObject(3);
  }
  static addBulletId(t, i) {
    t.addFieldInt32(0, i, 0);
  }
  static addPortalModel(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addTemplateId(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static endDynamicBulletConfig(t) {
    return t.endObject();
  }
  static createDynamicBulletConfig(t, i, e, l) {
    DynamicBulletConfig.startDynamicBulletConfig(t);
    DynamicBulletConfig.addBulletId(t, i);
    DynamicBulletConfig.addPortalModel(t, e);
    DynamicBulletConfig.addTemplateId(t, l);
    return DynamicBulletConfig.endDynamicBulletConfig(t);
  }
}
exports.DynamicBulletConfig = DynamicBulletConfig;
//# sourceMappingURL=dynamic-bullet-config.js.map