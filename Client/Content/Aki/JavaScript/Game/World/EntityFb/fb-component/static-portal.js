"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StaticPortal = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const portal_render_config_js_1 = require("../fb-component/portal-render-config.js");
class StaticPortal {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsStaticPortal(t, i) {
    return (i || new StaticPortal()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsStaticPortal(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new StaticPortal()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
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
  renderConfig(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return (t || new portal_render_config_js_1.PortalRenderConfig()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  linkPortalEntityId() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  isStreamSource() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startStaticPortal(t) {
    t.startObject(5);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addPortalModel(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addRenderConfig(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addLinkPortalEntityId(t, i) {
    t.addFieldInt32(3, i, 0);
  }
  static addIsStreamSource(t, i) {
    t.addFieldInt8(4, +i, 0);
  }
  static endStaticPortal(t) {
    return t.endObject();
  }
}
exports.StaticPortal = StaticPortal;
//# sourceMappingURL=static-portal.js.map