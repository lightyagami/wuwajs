"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetupMoraleSystem = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SetupMoraleSystem {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSetupMoraleSystem(t, e) {
    return (e || new SetupMoraleSystem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSetupMoraleSystem(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SetupMoraleSystem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  moralePlayId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  isOn() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startSetupMoraleSystem(t) {
    t.startObject(2);
  }
  static addMoralePlayId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addIsOn(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static endSetupMoraleSystem(t) {
    return t.endObject();
  }
  static createSetupMoraleSystem(t, e, s) {
    SetupMoraleSystem.startSetupMoraleSystem(t);
    SetupMoraleSystem.addMoralePlayId(t, e);
    SetupMoraleSystem.addIsOn(t, s);
    return SetupMoraleSystem.endSetupMoraleSystem(t);
  }
}
exports.SetupMoraleSystem = SetupMoraleSystem;
//# sourceMappingURL=setup-morale-system.js.map