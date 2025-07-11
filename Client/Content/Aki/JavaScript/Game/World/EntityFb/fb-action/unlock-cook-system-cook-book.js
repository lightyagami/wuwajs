"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnlockCookSystemCookBook = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class UnlockCookSystemCookBook {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(o, t) {
    this.bb_pos = o;
    this.bb = t;
    return this;
  }
  static getRootAsUnlockCookSystemCookBook(o, t) {
    return (t || new UnlockCookSystemCookBook()).__init(o.readInt32(o.position()) + o.position(), o);
  }
  static getSizePrefixedRootAsUnlockCookSystemCookBook(o, t) {
    o.setPosition(o.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new UnlockCookSystemCookBook()).__init(o.readInt32(o.position()) + o.position(), o);
  }
  type(o) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, o);
    } else {
      return undefined;
    }
  }
  cookBookId() {
    var o = this.bb.__offset(this.bb_pos, 6);
    if (o) {
      return this.bb.readInt32(this.bb_pos + o);
    } else {
      return 0;
    }
  }
  static startUnlockCookSystemCookBook(o) {
    o.startObject(2);
  }
  static addType(o, t) {
    o.addFieldOffset(0, t, 0);
  }
  static addCookBookId(o, t) {
    o.addFieldInt32(1, t, 0);
  }
  static endUnlockCookSystemCookBook(o) {
    return o.endObject();
  }
  static createUnlockCookSystemCookBook(o, t, k) {
    UnlockCookSystemCookBook.startUnlockCookSystemCookBook(o);
    UnlockCookSystemCookBook.addType(o, t);
    UnlockCookSystemCookBook.addCookBookId(o, k);
    return UnlockCookSystemCookBook.endUnlockCookSystemCookBook(o);
  }
}
exports.UnlockCookSystemCookBook = UnlockCookSystemCookBook;
//# sourceMappingURL=unlock-cook-system-cook-book.js.map