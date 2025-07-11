"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RotatorComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const event_rotator_js_1 = require("../fb-component/event-rotator.js");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class RotatorComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsRotatorComponent(t, i) {
    return (i || new RotatorComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsRotatorComponent(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new RotatorComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  content(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  icon(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  rotatorSpeed(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  locationOffset(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    if (i) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  rotationOffset(t) {
    var i = this.bb.__offset(this.bb_pos, 14);
    if (i) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  rotationMapping(t) {
    var i = this.bb.__offset(this.bb_pos, 16);
    if (i) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  isLocalSpace() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  entityId() {
    var t = this.bb.__offset(this.bb_pos, 20);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  isRotatorSelf() {
    var t = this.bb.__offset(this.bb_pos, 22);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  interactAction(t) {
    var i = this.bb.__offset(this.bb_pos, 24);
    if (i) {
      return (t || new event_rotator_js_1.EventRotator()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  isLockZ() {
    var t = this.bb.__offset(this.bb_pos, 26);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  isRecovery() {
    var t = this.bb.__offset(this.bb_pos, 28);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startRotatorComponent(t) {
    t.startObject(13);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addContent(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addIcon(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addRotatorSpeed(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addLocationOffset(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static addRotationOffset(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static addRotationMapping(t, i) {
    t.addFieldOffset(6, i, 0);
  }
  static addIsLocalSpace(t, i) {
    t.addFieldInt8(7, +i, 0);
  }
  static addEntityId(t, i) {
    t.addFieldInt32(8, i, 0);
  }
  static addIsRotatorSelf(t, i) {
    t.addFieldInt8(9, +i, 0);
  }
  static addInteractAction(t, i) {
    t.addFieldOffset(10, i, 0);
  }
  static addIsLockZ(t, i) {
    t.addFieldInt8(11, +i, 0);
  }
  static addIsRecovery(t, i) {
    t.addFieldInt8(12, +i, 0);
  }
  static endRotatorComponent(t) {
    return t.endObject();
  }
}
exports.RotatorComponent = RotatorComponent;
//# sourceMappingURL=rotator-component.js.map