"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeFightTeam = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ChangeFightTeam {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsChangeFightTeam(t, e) {
    return (e || new ChangeFightTeam()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsChangeFightTeam(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ChangeFightTeam()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  teamIndex() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startChangeFightTeam(t) {
    t.startObject(1);
  }
  static addTeamIndex(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static endChangeFightTeam(t) {
    return t.endObject();
  }
  static createChangeFightTeam(t, e) {
    ChangeFightTeam.startChangeFightTeam(t);
    ChangeFightTeam.addTeamIndex(t, e);
    return ChangeFightTeam.endChangeFightTeam(t);
  }
}
exports.ChangeFightTeam = ChangeFightTeam;
//# sourceMappingURL=change-fight-team.js.map