"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayCommonEffect = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_effect_pos2_js_1 = require("../fb-action/union-effect-pos2.js");
class PlayCommonEffect {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsPlayCommonEffect(t, e) {
    return (e || new PlayCommonEffect()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPlayCommonEffect(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new PlayCommonEffect()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  path(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  pos2Type() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_effect_pos2_js_1.UnionEffectPos2.NONE;
    }
  }
  pos2(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  static startPlayCommonEffect(t) {
    t.startObject(4);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addPath(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addPos2Type(t, e) {
    t.addFieldInt8(2, e, union_effect_pos2_js_1.UnionEffectPos2.NONE);
  }
  static addPos2(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static endPlayCommonEffect(t) {
    return t.endObject();
  }
  static createPlayCommonEffect(t, e, s, o, f) {
    PlayCommonEffect.startPlayCommonEffect(t);
    PlayCommonEffect.addType(t, e);
    PlayCommonEffect.addPath(t, s);
    PlayCommonEffect.addPos2Type(t, o);
    PlayCommonEffect.addPos2(t, f);
    return PlayCommonEffect.endPlayCommonEffect(t);
  }
}
exports.PlayCommonEffect = PlayCommonEffect;
//# sourceMappingURL=play-common-effect.js.map