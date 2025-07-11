"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServerSetPlayerPos = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const pos_a_js_1 = require("../fb-action/pos-a.js");
class ServerSetPlayerPos {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, r) {
    this.bb_pos = e;
    this.bb = r;
    return this;
  }
  static getRootAsServerSetPlayerPos(e, r) {
    return (r || new ServerSetPlayerPos()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsServerSetPlayerPos(e, r) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new ServerSetPlayerPos()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  pos(e) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return (e || new pos_a_js_1.PosA()).__init(this.bb.__indirect(this.bb_pos + r), this.bb);
    } else {
      return undefined;
    }
  }
  static startServerSetPlayerPos(e) {
    e.startObject(1);
  }
  static addPos(e, r) {
    e.addFieldOffset(0, r, 0);
  }
  static endServerSetPlayerPos(e) {
    return e.endObject();
  }
  static createServerSetPlayerPos(e, r) {
    ServerSetPlayerPos.startServerSetPlayerPos(e);
    ServerSetPlayerPos.addPos(e, r);
    return ServerSetPlayerPos.endServerSetPlayerPos(e);
  }
}
exports.ServerSetPlayerPos = ServerSetPlayerPos;
//# sourceMappingURL=server-set-player-pos.js.map