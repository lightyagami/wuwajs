"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckChessWinner = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class CheckChessWinner {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, s) {
    this.bb_pos = e;
    this.bb = s;
    return this;
  }
  static getRootAsCheckChessWinner(e, s) {
    return (s || new CheckChessWinner()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsCheckChessWinner(e, s) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new CheckChessWinner()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return this.bb.__string(this.bb_pos + s, e);
    } else {
      return undefined;
    }
  }
  chessboardId() {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  winner(e) {
    var s = this.bb.__offset(this.bb_pos, 8);
    if (s) {
      return this.bb.__string(this.bb_pos + s, e);
    } else {
      return undefined;
    }
  }
  static startCheckChessWinner(e) {
    e.startObject(3);
  }
  static addType(e, s) {
    e.addFieldOffset(0, s, 0);
  }
  static addChessboardId(e, s) {
    e.addFieldInt32(1, s, 0);
  }
  static addWinner(e, s) {
    e.addFieldOffset(2, s, 0);
  }
  static endCheckChessWinner(e) {
    return e.endObject();
  }
  static createCheckChessWinner(e, s, t, i) {
    CheckChessWinner.startCheckChessWinner(e);
    CheckChessWinner.addType(e, s);
    CheckChessWinner.addChessboardId(e, t);
    CheckChessWinner.addWinner(e, i);
    return CheckChessWinner.endCheckChessWinner(e);
  }
}
exports.CheckChessWinner = CheckChessWinner;
//# sourceMappingURL=check-chess-winner.js.map