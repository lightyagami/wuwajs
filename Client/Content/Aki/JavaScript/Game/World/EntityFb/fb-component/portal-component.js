"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PortalComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_portal_config_js_1 = require("../fb-component/union-portal-config.js");
class PortalComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, o) {
    this.bb_pos = t;
    this.bb = o;
    return this;
  }
  static getRootAsPortalComponent(t, o) {
    return (o || new PortalComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPortalComponent(t, o) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (o || new PortalComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  configType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_portal_config_js_1.UnionPortalConfig.NONE;
    }
  }
  config(t) {
    var o = this.bb.__offset(this.bb_pos, 8);
    if (o) {
      return this.bb.__union(t, this.bb_pos + o);
    } else {
      return undefined;
    }
  }
  static startPortalComponent(t) {
    t.startObject(3);
  }
  static addDisabled(t, o) {
    t.addFieldInt8(0, +o, 0);
  }
  static addConfigType(t, o) {
    t.addFieldInt8(1, o, union_portal_config_js_1.UnionPortalConfig.NONE);
  }
  static addConfig(t, o) {
    t.addFieldOffset(2, o, 0);
  }
  static endPortalComponent(t) {
    return t.endObject();
  }
  static createPortalComponent(t, o, n, e) {
    PortalComponent.startPortalComponent(t);
    PortalComponent.addDisabled(t, o);
    PortalComponent.addConfigType(t, n);
    PortalComponent.addConfig(t, e);
    return PortalComponent.endPortalComponent(t);
  }
}
exports.PortalComponent = PortalComponent;
//# sourceMappingURL=portal-component.js.map