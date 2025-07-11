"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoRenderPortalComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_no_render_portal_config_js_1 = require("../fb-component/union-no-render-portal-config.js");
class NoRenderPortalComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, o) {
    this.bb_pos = t;
    this.bb = o;
    return this;
  }
  static getRootAsNoRenderPortalComponent(t, o) {
    return (o || new NoRenderPortalComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsNoRenderPortalComponent(t, o) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (o || new NoRenderPortalComponent()).__init(t.readInt32(t.position()) + t.position(), t);
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
      return union_no_render_portal_config_js_1.UnionNoRenderPortalConfig.NONE;
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
  static startNoRenderPortalComponent(t) {
    t.startObject(3);
  }
  static addDisabled(t, o) {
    t.addFieldInt8(0, +o, 0);
  }
  static addConfigType(t, o) {
    t.addFieldInt8(1, o, union_no_render_portal_config_js_1.UnionNoRenderPortalConfig.NONE);
  }
  static addConfig(t, o) {
    t.addFieldOffset(2, o, 0);
  }
  static endNoRenderPortalComponent(t) {
    return t.endObject();
  }
  static createNoRenderPortalComponent(t, o, e, n) {
    NoRenderPortalComponent.startNoRenderPortalComponent(t);
    NoRenderPortalComponent.addDisabled(t, o);
    NoRenderPortalComponent.addConfigType(t, e);
    NoRenderPortalComponent.addConfig(t, n);
    return NoRenderPortalComponent.endNoRenderPortalComponent(t);
  }
}
exports.NoRenderPortalComponent = NoRenderPortalComponent;
//# sourceMappingURL=no-render-portal-component.js.map