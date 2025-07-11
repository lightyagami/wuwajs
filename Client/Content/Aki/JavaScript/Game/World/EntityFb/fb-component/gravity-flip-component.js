"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GravityFlipComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const gravity_flip_config_js_1 = require("../fb-component/gravity-flip-config.js");
class GravityFlipComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsGravityFlipComponent(t, i) {
    return (i || new GravityFlipComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsGravityFlipComponent(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new GravityFlipComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  config(t, i) {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return (i || new gravity_flip_config_js_1.GravityFlipConfig()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  configLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  defaultGravity() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startGravityFlipComponent(t) {
    t.startObject(3);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addConfig(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createConfigVector(i, r) {
    i.startVector(4, r.length, 4);
    for (let t = r.length - 1; t >= 0; t--) {
      i.addOffset(r[t]);
    }
    return i.endVector();
  }
  static startConfigVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addDefaultGravity(t, i) {
    t.addFieldInt8(2, i, 0);
  }
  static endGravityFlipComponent(t) {
    return t.endObject();
  }
  static createGravityFlipComponent(t, i, r, e) {
    GravityFlipComponent.startGravityFlipComponent(t);
    GravityFlipComponent.addDisabled(t, i);
    GravityFlipComponent.addConfig(t, r);
    GravityFlipComponent.addDefaultGravity(t, e);
    return GravityFlipComponent.endGravityFlipComponent(t);
  }
}
exports.GravityFlipComponent = GravityFlipComponent;
//# sourceMappingURL=gravity-flip-component.js.map