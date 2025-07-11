"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientSetPlayerPos = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_client_teleport_config_js_1 = require("../fb-action/union-client-teleport-config.js");
class ClientSetPlayerPos {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsClientSetPlayerPos(t, e) {
    return (e || new ClientSetPlayerPos()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsClientSetPlayerPos(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ClientSetPlayerPos()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  telePortConfigType() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_client_teleport_config_js_1.UnionClientTeleportConfig.NONE;
    }
  }
  telePortConfig(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  static startClientSetPlayerPos(t) {
    t.startObject(2);
  }
  static addTelePortConfigType(t, e) {
    t.addFieldInt8(0, e, union_client_teleport_config_js_1.UnionClientTeleportConfig.NONE);
  }
  static addTelePortConfig(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endClientSetPlayerPos(t) {
    return t.endObject();
  }
  static createClientSetPlayerPos(t, e, i) {
    ClientSetPlayerPos.startClientSetPlayerPos(t);
    ClientSetPlayerPos.addTelePortConfigType(t, e);
    ClientSetPlayerPos.addTelePortConfig(t, i);
    return ClientSetPlayerPos.endClientSetPlayerPos(t);
  }
}
exports.ClientSetPlayerPos = ClientSetPlayerPos;
//# sourceMappingURL=client-set-player-pos.js.map