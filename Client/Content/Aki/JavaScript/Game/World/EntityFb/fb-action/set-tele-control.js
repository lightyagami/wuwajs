"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetTeleControl = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_set_tele_control_config_js_1 = require("../fb-action/union-set-tele-control-config.js");
class SetTeleControl {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSetTeleControl(t, e) {
    return (e || new SetTeleControl()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSetTeleControl(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SetTeleControl()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  configType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_set_tele_control_config_js_1.UnionSetTeleControlConfig.NONE;
    }
  }
  config(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  static startSetTeleControl(t) {
    t.startObject(2);
  }
  static addConfigType(t, e) {
    t.addFieldInt8(0, e, union_set_tele_control_config_js_1.UnionSetTeleControlConfig.NONE);
  }
  static addConfig(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endSetTeleControl(t) {
    return t.endObject();
  }
  static createSetTeleControl(t, e, o) {
    SetTeleControl.startSetTeleControl(t);
    SetTeleControl.addConfigType(t, e);
    SetTeleControl.addConfig(t, o);
    return SetTeleControl.endSetTeleControl(t);
  }
}
exports.SetTeleControl = SetTeleControl;
//# sourceMappingURL=set-tele-control.js.map