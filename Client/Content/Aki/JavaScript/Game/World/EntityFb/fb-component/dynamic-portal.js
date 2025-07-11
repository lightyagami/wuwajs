"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DynamicPortal = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const portal_render_config_js_1 = require("../fb-component/portal-render-config.js");
class DynamicPortal {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsDynamicPortal(t, r) {
    return (r || new DynamicPortal()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsDynamicPortal(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new DynamicPortal()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  portalModel(t) {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  renderConfig(t) {
    var r = this.bb.__offset(this.bb_pos, 8);
    if (r) {
      return (t || new portal_render_config_js_1.PortalRenderConfig()).__init(this.bb.__indirect(this.bb_pos + r), this.bb);
    } else {
      return undefined;
    }
  }
  static startDynamicPortal(t) {
    t.startObject(3);
  }
  static addType(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static addPortalModel(t, r) {
    t.addFieldOffset(1, r, 0);
  }
  static addRenderConfig(t, r) {
    t.addFieldOffset(2, r, 0);
  }
  static endDynamicPortal(t) {
    return t.endObject();
  }
}
exports.DynamicPortal = DynamicPortal;
//# sourceMappingURL=dynamic-portal.js.map