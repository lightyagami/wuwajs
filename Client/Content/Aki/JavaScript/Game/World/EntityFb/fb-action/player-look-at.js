"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerLookAt = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class PlayerLookAt {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsPlayerLookAt(t, e) {
    return (e || new PlayerLookAt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsPlayerLookAt(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new PlayerLookAt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  pos(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  cameraMove() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startPlayerLookAt(t) {
    t.startObject(2);
  }
  static addPos(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addCameraMove(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static endPlayerLookAt(t) {
    return t.endObject();
  }
  static createPlayerLookAt(t, e, r) {
    PlayerLookAt.startPlayerLookAt(t);
    PlayerLookAt.addPos(t, e);
    PlayerLookAt.addCameraMove(t, r);
    return PlayerLookAt.endPlayerLookAt(t);
  }
}
exports.PlayerLookAt = PlayerLookAt;
//# sourceMappingURL=player-look-at.js.map