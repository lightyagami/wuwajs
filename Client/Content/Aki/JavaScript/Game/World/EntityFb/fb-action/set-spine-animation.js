"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetSpineAnimation = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_set_spine_animation_js_1 = require("../fb-action/union-set-spine-animation.js");
class SetSpineAnimation {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsSetSpineAnimation(i, t) {
    return (t || new SetSpineAnimation()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsSetSpineAnimation(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new SetSpineAnimation()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  configType() {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.readUint8(this.bb_pos + i);
    } else {
      return union_set_spine_animation_js_1.UnionSetSpineAnimation.NONE;
    }
  }
  config(i) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__union(i, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  static startSetSpineAnimation(i) {
    i.startObject(2);
  }
  static addConfigType(i, t) {
    i.addFieldInt8(0, t, union_set_spine_animation_js_1.UnionSetSpineAnimation.NONE);
  }
  static addConfig(i, t) {
    i.addFieldOffset(1, t, 0);
  }
  static endSetSpineAnimation(i) {
    return i.endObject();
  }
  static createSetSpineAnimation(i, t, n) {
    SetSpineAnimation.startSetSpineAnimation(i);
    SetSpineAnimation.addConfigType(i, t);
    SetSpineAnimation.addConfig(i, n);
    return SetSpineAnimation.endSetSpineAnimation(i);
  }
}
exports.SetSpineAnimation = SetSpineAnimation;
//# sourceMappingURL=set-spine-animation.js.map