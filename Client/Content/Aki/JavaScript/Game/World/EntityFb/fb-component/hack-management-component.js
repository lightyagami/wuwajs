"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HackManagementComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class HackManagementComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsHackManagementComponent(t, e) {
    return (e || new HackManagementComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsHackManagementComponent(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new HackManagementComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  maxHackingCount() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  validDistance() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startHackManagementComponent(t) {
    t.startObject(3);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addMaxHackingCount(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addValidDistance(t, e) {
    t.addFieldFloat32(2, e, 0);
  }
  static endHackManagementComponent(t) {
    return t.endObject();
  }
  static createHackManagementComponent(t, e, n, a) {
    HackManagementComponent.startHackManagementComponent(t);
    HackManagementComponent.addDisabled(t, e);
    HackManagementComponent.addMaxHackingCount(t, n);
    HackManagementComponent.addValidDistance(t, a);
    return HackManagementComponent.endHackManagementComponent(t);
  }
}
exports.HackManagementComponent = HackManagementComponent;
//# sourceMappingURL=hack-management-component.js.map