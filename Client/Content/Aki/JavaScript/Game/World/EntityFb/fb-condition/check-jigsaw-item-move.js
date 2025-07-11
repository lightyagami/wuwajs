"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckJigsawItemMove = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckJigsawItemMove {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsCheckJigsawItemMove(t, e) {
    return (e || new CheckJigsawItemMove()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCheckJigsawItemMove(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new CheckJigsawItemMove()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  itemEntityId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  compare(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startCheckJigsawItemMove(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addItemEntityId(t, e) {
    t.addFieldInt32(1, e, 0);
  }
  static addCompare(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endCheckJigsawItemMove(t) {
    return t.endObject();
  }
  static createCheckJigsawItemMove(t, e, s, i) {
    CheckJigsawItemMove.startCheckJigsawItemMove(t);
    CheckJigsawItemMove.addType(t, e);
    CheckJigsawItemMove.addItemEntityId(t, s);
    CheckJigsawItemMove.addCompare(t, i);
    return CheckJigsawItemMove.endCheckJigsawItemMove(t);
  }
}
exports.CheckJigsawItemMove = CheckJigsawItemMove;
//# sourceMappingURL=check-jigsaw-item-move.js.map