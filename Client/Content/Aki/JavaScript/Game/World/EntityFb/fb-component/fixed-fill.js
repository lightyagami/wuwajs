"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FixedFill = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const jigsaw_config_js_1 = require("../fb-action/jigsaw-config.js");
const piece_index_js_1 = require("../fb-action/piece-index.js");
class FixedFill {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsFixedFill(i, t) {
    return (t || new FixedFill()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsFixedFill(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new FixedFill()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  modelId() {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.readInt32(this.bb_pos + i);
    } else {
      return 0;
    }
  }
  centre(i) {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return (i || new piece_index_js_1.PieceIndex()).__init(this.bb.__indirect(this.bb_pos + t), this.bb);
    } else {
      return undefined;
    }
  }
  config(i) {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return (i || new jigsaw_config_js_1.JigsawConfig()).__init(this.bb.__indirect(this.bb_pos + t), this.bb);
    } else {
      return undefined;
    }
  }
  static startFixedFill(i) {
    i.startObject(4);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static addModelId(i, t) {
    i.addFieldInt32(1, t, 0);
  }
  static addCentre(i, t) {
    i.addFieldOffset(2, t, 0);
  }
  static addConfig(i, t) {
    i.addFieldOffset(3, t, 0);
  }
  static endFixedFill(i) {
    return i.endObject();
  }
}
exports.FixedFill = FixedFill;
//# sourceMappingURL=fixed-fill.js.map