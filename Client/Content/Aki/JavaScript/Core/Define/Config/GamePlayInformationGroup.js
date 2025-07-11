"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GamePlayInformationGroup = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class GamePlayInformationGroup {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get InfoGroup() {
    return GameUtils_1.GameUtils.ConvertToArray(this.infogroupLength(), this.infogroup, this);
  }
  get IconString() {
    return this.iconstring();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsGamePlayInformationGroup(t, i) {
    return (i || new GamePlayInformationGroup()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetInfogroupAt(t) {
    return this.infogroup(t);
  }
  infogroup(t) {
    var i = this.J7.__offset(this.z7, 6);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  infogroupLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  infogroupArray() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  iconstring(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.GamePlayInformationGroup = GamePlayInformationGroup;
//# sourceMappingURL=GamePlayInformationGroup.js.map