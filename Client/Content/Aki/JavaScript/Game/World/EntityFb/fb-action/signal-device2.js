"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignalDevice2 = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const color_piece_js_1 = require("../fb-action/color-piece.js");
class SignalDevice2 {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, i) {
    this.bb_pos = e;
    this.bb = i;
    return this;
  }
  static getRootAsSignalDevice2(e, i) {
    return (i || new SignalDevice2()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsSignalDevice2(e, i) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new SignalDevice2()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, e);
    } else {
      return undefined;
    }
  }
  config(e, i) {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return (i || new color_piece_js_1.ColorPiece()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + t) + e * 4), this.bb);
    } else {
      return undefined;
    }
  }
  configLength() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__vector_len(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startSignalDevice2(e) {
    e.startObject(2);
  }
  static addType(e, i) {
    e.addFieldOffset(0, i, 0);
  }
  static addConfig(e, i) {
    e.addFieldOffset(1, i, 0);
  }
  static createConfigVector(i, t) {
    i.startVector(4, t.length, 4);
    for (let e = t.length - 1; e >= 0; e--) {
      i.addOffset(t[e]);
    }
    return i.endVector();
  }
  static startConfigVector(e, i) {
    e.startVector(4, i, 4);
  }
  static endSignalDevice2(e) {
    return e.endObject();
  }
  static createSignalDevice2(e, i, t) {
    SignalDevice2.startSignalDevice2(e);
    SignalDevice2.addType(e, i);
    SignalDevice2.addConfig(e, t);
    return SignalDevice2.endSignalDevice2(e);
  }
}
exports.SignalDevice2 = SignalDevice2;
//# sourceMappingURL=signal-device2.js.map