"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DynamicPortalConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class DynamicPortalConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsDynamicPortalConfig(t, i) {
    return (i || new DynamicPortalConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDynamicPortalConfig(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new DynamicPortalConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  portalModel(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  templateId(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  static startDynamicPortalConfig(t) {
    t.startObject(2);
  }
  static addPortalModel(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addTemplateId(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static endDynamicPortalConfig(t) {
    return t.endObject();
  }
  static createDynamicPortalConfig(t, i, a) {
    DynamicPortalConfig.startDynamicPortalConfig(t);
    DynamicPortalConfig.addPortalModel(t, i);
    DynamicPortalConfig.addTemplateId(t, a);
    return DynamicPortalConfig.endDynamicPortalConfig(t);
  }
}
exports.DynamicPortalConfig = DynamicPortalConfig;
//# sourceMappingURL=dynamic-portal-config.js.map