"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MatchPlayerRole = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class MatchPlayerRole {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsMatchPlayerRole(t, e) {
    return (e || new MatchPlayerRole()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsMatchPlayerRole(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new MatchPlayerRole()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  matchPhantomSkill() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  static startMatchPlayerRole(t) {
    t.startObject(2);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addMatchPhantomSkill(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static endMatchPlayerRole(t) {
    return t.endObject();
  }
  static createMatchPlayerRole(t, e, a) {
    MatchPlayerRole.startMatchPlayerRole(t);
    MatchPlayerRole.addType(t, e);
    MatchPlayerRole.addMatchPhantomSkill(t, a);
    return MatchPlayerRole.endMatchPlayerRole(t);
  }
}
exports.MatchPlayerRole = MatchPlayerRole;
//# sourceMappingURL=match-player-role.js.map