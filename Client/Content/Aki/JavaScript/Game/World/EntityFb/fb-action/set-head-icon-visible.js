"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetHeadIconVisible = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_head_style_js_1 = require("../fb-action/union-head-style.js");
class SetHeadIconVisible {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsSetHeadIconVisible(e, t) {
    return (t || new SetHeadIconVisible()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsSetHeadIconVisible(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new SetHeadIconVisible()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  headStyleConfigType() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_head_style_js_1.UnionHeadStyle.NONE;
    }
  }
  headStyleConfig(e) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__union(e, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  visible() {
    var e = this.bb.__offset(this.bb_pos, 8);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  static startSetHeadIconVisible(e) {
    e.startObject(3);
  }
  static addHeadStyleConfigType(e, t) {
    e.addFieldInt8(0, t, union_head_style_js_1.UnionHeadStyle.NONE);
  }
  static addHeadStyleConfig(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static addVisible(e, t) {
    e.addFieldInt8(2, +t, 0);
  }
  static endSetHeadIconVisible(e) {
    return e.endObject();
  }
  static createSetHeadIconVisible(e, t, i, s) {
    SetHeadIconVisible.startSetHeadIconVisible(e);
    SetHeadIconVisible.addHeadStyleConfigType(e, t);
    SetHeadIconVisible.addHeadStyleConfig(e, i);
    SetHeadIconVisible.addVisible(e, s);
    return SetHeadIconVisible.endSetHeadIconVisible(e);
  }
}
exports.SetHeadIconVisible = SetHeadIconVisible;
//# sourceMappingURL=set-head-icon-visible.js.map