"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveJigsawItem = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const piece_index_js_1 = require("../fb-action/piece-index.js");
class MoveJigsawItem {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsMoveJigsawItem(t, i) {
    return (i || new MoveJigsawItem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsMoveJigsawItem(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new MoveJigsawItem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
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
  foundationEntityId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  destination(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return (t || new piece_index_js_1.PieceIndex()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  static startMoveJigsawItem(t) {
    t.startObject(4);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addItemEntityId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addFoundationEntityId(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static addDestination(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static endMoveJigsawItem(t) {
    return t.endObject();
  }
}
exports.MoveJigsawItem = MoveJigsawItem;
//# sourceMappingURL=move-jigsaw-item.js.map