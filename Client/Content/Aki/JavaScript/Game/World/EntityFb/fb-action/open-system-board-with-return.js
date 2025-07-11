"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemBoardWithReturn = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_open_system_board_with_return_js_1 = require("../fb-action/union-open-system-board-with-return.js");
class OpenSystemBoardWithReturn {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsOpenSystemBoardWithReturn(t, e) {
    return (e || new OpenSystemBoardWithReturn()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsOpenSystemBoardWithReturn(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new OpenSystemBoardWithReturn()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  systemTypeType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_open_system_board_with_return_js_1.UnionOpenSystemBoardWithReturn.NONE;
    }
  }
  systemType(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  static startOpenSystemBoardWithReturn(t) {
    t.startObject(2);
  }
  static addSystemTypeType(t, e) {
    t.addFieldInt8(0, e, union_open_system_board_with_return_js_1.UnionOpenSystemBoardWithReturn.NONE);
  }
  static addSystemType(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endOpenSystemBoardWithReturn(t) {
    return t.endObject();
  }
  static createOpenSystemBoardWithReturn(t, e, r) {
    OpenSystemBoardWithReturn.startOpenSystemBoardWithReturn(t);
    OpenSystemBoardWithReturn.addSystemTypeType(t, e);
    OpenSystemBoardWithReturn.addSystemType(t, r);
    return OpenSystemBoardWithReturn.endOpenSystemBoardWithReturn(t);
  }
}
exports.OpenSystemBoardWithReturn = OpenSystemBoardWithReturn;
//# sourceMappingURL=open-system-board-with-return.js.map