"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientPreEnableSubLevels = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_enable_sub_level_transition_js_1 = require("../fb-action/union-enable-sub-level-transition.js");
class ClientPreEnableSubLevels {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsClientPreEnableSubLevels(e, t) {
    return (t || new ClientPreEnableSubLevels()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsClientPreEnableSubLevels(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new ClientPreEnableSubLevels()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  enableLevels(e, t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return this.bb.__string(this.bb.__vector(this.bb_pos + s) + e * 4, t);
    } else {
      return undefined;
    }
  }
  enableLevelsLength() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__vector_len(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  disableLevels(e, t) {
    var s = this.bb.__offset(this.bb_pos, 6);
    if (s) {
      return this.bb.__string(this.bb.__vector(this.bb_pos + s) + e * 4, t);
    } else {
      return undefined;
    }
  }
  disableLevelsLength() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__vector_len(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  transitionOptionType() {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_enable_sub_level_transition_js_1.UnionEnableSubLevelTransition.NONE;
    }
  }
  transitionOption(e) {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.__union(e, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  static startClientPreEnableSubLevels(e) {
    e.startObject(4);
  }
  static addEnableLevels(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static createEnableLevelsVector(t, s) {
    t.startVector(4, s.length, 4);
    for (let e = s.length - 1; e >= 0; e--) {
      t.addOffset(s[e]);
    }
    return t.endVector();
  }
  static startEnableLevelsVector(e, t) {
    e.startVector(4, t, 4);
  }
  static addDisableLevels(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static createDisableLevelsVector(t, s) {
    t.startVector(4, s.length, 4);
    for (let e = s.length - 1; e >= 0; e--) {
      t.addOffset(s[e]);
    }
    return t.endVector();
  }
  static startDisableLevelsVector(e, t) {
    e.startVector(4, t, 4);
  }
  static addTransitionOptionType(e, t) {
    e.addFieldInt8(2, t, union_enable_sub_level_transition_js_1.UnionEnableSubLevelTransition.NONE);
  }
  static addTransitionOption(e, t) {
    e.addFieldOffset(3, t, 0);
  }
  static endClientPreEnableSubLevels(e) {
    return e.endObject();
  }
  static createClientPreEnableSubLevels(e, t, s, i, n) {
    ClientPreEnableSubLevels.startClientPreEnableSubLevels(e);
    ClientPreEnableSubLevels.addEnableLevels(e, t);
    ClientPreEnableSubLevels.addDisableLevels(e, s);
    ClientPreEnableSubLevels.addTransitionOptionType(e, i);
    ClientPreEnableSubLevels.addTransitionOption(e, n);
    return ClientPreEnableSubLevels.endClientPreEnableSubLevels(e);
  }
}
exports.ClientPreEnableSubLevels = ClientPreEnableSubLevels;
//# sourceMappingURL=client-pre-enable-sub-levels.js.map