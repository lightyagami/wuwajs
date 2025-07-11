"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TurntableControlComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_turntable_controller_js_1 = require("../fb-component/union-turntable-controller.js");
class TurntableControlComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, n) {
    this.bb_pos = t;
    this.bb = n;
    return this;
  }
  static getRootAsTurntableControlComponent(t, n) {
    return (n || new TurntableControlComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTurntableControlComponent(t, n) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (n || new TurntableControlComponent()).__init(t.readInt32(t.position()) + t.position(), t);
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
      return union_turntable_controller_js_1.UnionTurntableController.NONE;
    }
  }
  config(t) {
    var n = this.bb.__offset(this.bb_pos, 8);
    if (n) {
      return this.bb.__union(t, this.bb_pos + n);
    } else {
      return undefined;
    }
  }
  static startTurntableControlComponent(t) {
    t.startObject(3);
  }
  static addDisabled(t, n) {
    t.addFieldInt8(0, +n, 0);
  }
  static addConfigType(t, n) {
    t.addFieldInt8(1, n, union_turntable_controller_js_1.UnionTurntableController.NONE);
  }
  static addConfig(t, n) {
    t.addFieldOffset(2, n, 0);
  }
  static endTurntableControlComponent(t) {
    return t.endObject();
  }
  static createTurntableControlComponent(t, n, o, e) {
    TurntableControlComponent.startTurntableControlComponent(t);
    TurntableControlComponent.addDisabled(t, n);
    TurntableControlComponent.addConfigType(t, o);
    TurntableControlComponent.addConfig(t, e);
    return TurntableControlComponent.endTurntableControlComponent(t);
  }
}
exports.TurntableControlComponent = TurntableControlComponent;
//# sourceMappingURL=turntable-control-component.js.map