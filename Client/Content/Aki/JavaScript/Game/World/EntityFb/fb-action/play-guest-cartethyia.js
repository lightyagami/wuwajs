"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayGuestCartethyia = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class PlayGuestCartethyia {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsPlayGuestCartethyia(t, e) {
    return (e || new PlayGuestCartethyia()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPlayGuestCartethyia(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new PlayGuestCartethyia()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startPlayGuestCartethyia(t) {
    t.startObject(1);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static endPlayGuestCartethyia(t) {
    return t.endObject();
  }
  static createPlayGuestCartethyia(t, e) {
    PlayGuestCartethyia.startPlayGuestCartethyia(t);
    PlayGuestCartethyia.addType(t, e);
    return PlayGuestCartethyia.endPlayGuestCartethyia(t);
  }
}
exports.PlayGuestCartethyia = PlayGuestCartethyia;
//# sourceMappingURL=play-guest-cartethyia.js.map