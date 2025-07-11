"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemFoundationMatch = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ItemFoundationMatch {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsItemFoundationMatch(t, e) {
    return (e || new ItemFoundationMatch()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsItemFoundationMatch(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ItemFoundationMatch()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  matchEntityId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startItemFoundationMatch(t) {
    t.startObject(1);
  }
  static addMatchEntityId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static endItemFoundationMatch(t) {
    return t.endObject();
  }
  static createItemFoundationMatch(t, e) {
    ItemFoundationMatch.startItemFoundationMatch(t);
    ItemFoundationMatch.addMatchEntityId(t, e);
    return ItemFoundationMatch.endItemFoundationMatch(t);
  }
}
exports.ItemFoundationMatch = ItemFoundationMatch;
//# sourceMappingURL=item-foundation-match.js.map