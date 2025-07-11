"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextStyle = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_center_text_show_anim_js_1 = require("../fb-action/union-center-text-show-anim.js");
class TextStyle {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsTextStyle(t, e) {
    return (e || new TextStyle()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTextStyle(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new TextStyle()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  showAnimType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_center_text_show_anim_js_1.UnionCenterTextShowAnim.NONE;
    }
  }
  showAnim(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  fontSize(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  textAlign(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  textHorizontal(t) {
    var e = this.bb.__offset(this.bb_pos, 12);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startTextStyle(t) {
    t.startObject(5);
  }
  static addShowAnimType(t, e) {
    t.addFieldInt8(0, e, union_center_text_show_anim_js_1.UnionCenterTextShowAnim.NONE);
  }
  static addShowAnim(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addFontSize(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addTextAlign(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static addTextHorizontal(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static endTextStyle(t) {
    return t.endObject();
  }
  static createTextStyle(t, e, i, s, r, n) {
    TextStyle.startTextStyle(t);
    TextStyle.addShowAnimType(t, e);
    TextStyle.addShowAnim(t, i);
    TextStyle.addFontSize(t, s);
    TextStyle.addTextAlign(t, r);
    TextStyle.addTextHorizontal(t, n);
    return TextStyle.endTextStyle(t);
  }
}
exports.TextStyle = TextStyle;
//# sourceMappingURL=text-style.js.map