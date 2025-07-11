"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeleportComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const pos_a_js_1 = require("../fb-action/pos-a.js");
const gravity_flip_teleport_config_js_1 = require("../fb-component/gravity-flip-teleport-config.js");
class TeleportComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsTeleportComponent(t, e) {
    return (e || new TeleportComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTeleportComponent(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new TeleportComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  teleporterId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  teleportPos(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return (t || new pos_a_js_1.PosA()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  gravityConfig(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return (t || new gravity_flip_teleport_config_js_1.GravityFlipTeleportConfig()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  static startTeleportComponent(t) {
    t.startObject(4);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addTeleporterId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addTeleportPos(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addGravityConfig(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static endTeleportComponent(t) {
    return t.endObject();
  }
}
exports.TeleportComponent = TeleportComponent;
//# sourceMappingURL=teleport-component.js.map