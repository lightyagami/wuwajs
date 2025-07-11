"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActiveRenjuPiece = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const jigsaw_item_matched_config_js_1 = require("../fb-component/jigsaw-item-matched-config.js");
const renju_config_js_1 = require("../fb-component/renju-config.js");
class ActiveRenjuPiece {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsActiveRenjuPiece(e, t) {
    return (t || new ActiveRenjuPiece()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsActiveRenjuPiece(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new ActiveRenjuPiece()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, e);
    } else {
      return undefined;
    }
  }
  renjuConfig(e, t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return (t || new renju_config_js_1.RenjuConfig()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + e * 4), this.bb);
    } else {
      return undefined;
    }
  }
  renjuConfigLength() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__vector_len(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  exitMatchedConfig(e, t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return (t || new jigsaw_item_matched_config_js_1.JigsawItemMatchedConfig()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + e * 4), this.bb);
    } else {
      return undefined;
    }
  }
  exitMatchedConfigLength() {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__vector_len(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  static startActiveRenjuPiece(e) {
    e.startObject(3);
  }
  static addType(e, t) {
    e.addFieldOffset(0, t, 0);
  }
  static addRenjuConfig(e, t) {
    e.addFieldOffset(1, t, 0);
  }
  static createRenjuConfigVector(t, i) {
    t.startVector(4, i.length, 4);
    for (let e = i.length - 1; e >= 0; e--) {
      t.addOffset(i[e]);
    }
    return t.endVector();
  }
  static startRenjuConfigVector(e, t) {
    e.startVector(4, t, 4);
  }
  static addExitMatchedConfig(e, t) {
    e.addFieldOffset(2, t, 0);
  }
  static createExitMatchedConfigVector(t, i) {
    t.startVector(4, i.length, 4);
    for (let e = i.length - 1; e >= 0; e--) {
      t.addOffset(i[e]);
    }
    return t.endVector();
  }
  static startExitMatchedConfigVector(e, t) {
    e.startVector(4, t, 4);
  }
  static endActiveRenjuPiece(e) {
    return e.endObject();
  }
  static createActiveRenjuPiece(e, t, i, s) {
    ActiveRenjuPiece.startActiveRenjuPiece(e);
    ActiveRenjuPiece.addType(e, t);
    ActiveRenjuPiece.addRenjuConfig(e, i);
    ActiveRenjuPiece.addExitMatchedConfig(e, s);
    return ActiveRenjuPiece.endActiveRenjuPiece(e);
  }
}
exports.ActiveRenjuPiece = ActiveRenjuPiece;
//# sourceMappingURL=active-renju-piece.js.map