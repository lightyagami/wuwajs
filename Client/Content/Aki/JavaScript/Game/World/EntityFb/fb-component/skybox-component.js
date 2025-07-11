"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkyboxComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_trigger_mode_js_1 = require("../fb-component/union-trigger-mode.js");
class SkyboxComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSkyboxComponent(t, e) {
    return (e || new SkyboxComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSkyboxComponent(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SkyboxComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  weatherDataAsset(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  pptodDataAsset(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  skyboxSetting() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  fadeTime() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  priority() {
    var t = this.bb.__offset(this.bb_pos, 14);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  triggerModeType() {
    var t = this.bb.__offset(this.bb_pos, 16);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_trigger_mode_js_1.UnionTriggerMode.NONE;
    }
  }
  triggerMode(t) {
    var e = this.bb.__offset(this.bb_pos, 18);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  static startSkyboxComponent(t) {
    t.startObject(8);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addWeatherDataAsset(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addPptodDataAsset(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addSkyboxSetting(t, e) {
    t.addFieldInt32(3, e, 0);
  }
  static addFadeTime(t, e) {
    t.addFieldFloat32(4, e, 0);
  }
  static addPriority(t, e) {
    t.addFieldFloat32(5, e, 0);
  }
  static addTriggerModeType(t, e) {
    t.addFieldInt8(6, e, union_trigger_mode_js_1.UnionTriggerMode.NONE);
  }
  static addTriggerMode(t, e) {
    t.addFieldOffset(7, e, 0);
  }
  static endSkyboxComponent(t) {
    return t.endObject();
  }
  static createSkyboxComponent(t, e, o, i, s, r, n, a, d) {
    SkyboxComponent.startSkyboxComponent(t);
    SkyboxComponent.addDisabled(t, e);
    SkyboxComponent.addWeatherDataAsset(t, o);
    SkyboxComponent.addPptodDataAsset(t, i);
    SkyboxComponent.addSkyboxSetting(t, s);
    SkyboxComponent.addFadeTime(t, r);
    SkyboxComponent.addPriority(t, n);
    SkyboxComponent.addTriggerModeType(t, a);
    SkyboxComponent.addTriggerMode(t, d);
    return SkyboxComponent.endSkyboxComponent(t);
  }
}
exports.SkyboxComponent = SkyboxComponent;
//# sourceMappingURL=skybox-component.js.map