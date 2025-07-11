"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SundialPuzzleGameplay = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SundialPuzzleGameplay {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, a) {
    this.bb_pos = e;
    this.bb = a;
    return this;
  }
  static getRootAsSundialPuzzleGameplay(e, a) {
    return (a || new SundialPuzzleGameplay()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsSundialPuzzleGameplay(e, a) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (a || new SundialPuzzleGameplay()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  type(e) {
    var a = this.bb.__offset(this.bb_pos, 4);
    if (a) {
      return this.bb.__string(this.bb_pos + a, e);
    } else {
      return undefined;
    }
  }
  static startSundialPuzzleGameplay(e) {
    e.startObject(1);
  }
  static addType(e, a) {
    e.addFieldOffset(0, a, 0);
  }
  static endSundialPuzzleGameplay(e) {
    return e.endObject();
  }
  static createSundialPuzzleGameplay(e, a) {
    SundialPuzzleGameplay.startSundialPuzzleGameplay(e);
    SundialPuzzleGameplay.addType(e, a);
    return SundialPuzzleGameplay.endSundialPuzzleGameplay(e);
  }
}
exports.SundialPuzzleGameplay = SundialPuzzleGameplay;
//# sourceMappingURL=sundial-puzzle-gameplay.js.map