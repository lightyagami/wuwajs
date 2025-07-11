"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnableSystem = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EnableSystem {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsEnableSystem(t, e) {
    return (e || new EnableSystem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEnableSystem(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new EnableSystem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  systemType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  isEnable() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startEnableSystem(t) {
    t.startObject(2);
  }
  static addSystemType(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addIsEnable(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static endEnableSystem(t) {
    return t.endObject();
  }
  static createEnableSystem(t, e, s) {
    EnableSystem.startEnableSystem(t);
    EnableSystem.addSystemType(t, e);
    EnableSystem.addIsEnable(t, s);
    return EnableSystem.endEnableSystem(t);
  }
}
exports.EnableSystem = EnableSystem;
//# sourceMappingURL=enable-system.js.map