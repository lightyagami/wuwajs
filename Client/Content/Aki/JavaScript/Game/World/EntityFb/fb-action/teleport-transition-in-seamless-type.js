"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeleportTransitionInSeamlessType = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const floor_settings_js_1 = require("../fb-action/floor-settings.js");
class TeleportTransitionInSeamlessType {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsTeleportTransitionInSeamlessType(t, e) {
    return (e || new TeleportTransitionInSeamlessType()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTeleportTransitionInSeamlessType(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new TeleportTransitionInSeamlessType()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  effectDaPath(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  leastTime() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  effectExpandTime() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  effectCollapseTime() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  transitionWeatherDaPath(t) {
    var e = this.bb.__offset(this.bb_pos, 14);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  floorSettings(t) {
    var e = this.bb.__offset(this.bb_pos, 16);
    if (e) {
      return (t || new floor_settings_js_1.FloorSettings()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  isTeleportInPlace() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startTeleportTransitionInSeamlessType(t) {
    t.startObject(8);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addEffectDaPath(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addLeastTime(t, e) {
    t.addFieldFloat32(2, e, 0);
  }
  static addEffectExpandTime(t, e) {
    t.addFieldFloat32(3, e, 0);
  }
  static addEffectCollapseTime(t, e) {
    t.addFieldFloat32(4, e, 0);
  }
  static addTransitionWeatherDaPath(t, e) {
    t.addFieldOffset(5, e, 0);
  }
  static addFloorSettings(t, e) {
    t.addFieldOffset(6, e, 0);
  }
  static addIsTeleportInPlace(t, e) {
    t.addFieldInt8(7, +e, 0);
  }
  static endTeleportTransitionInSeamlessType(t) {
    return t.endObject();
  }
}
exports.TeleportTransitionInSeamlessType = TeleportTransitionInSeamlessType;
//# sourceMappingURL=teleport-transition-in-seamless-type.js.map