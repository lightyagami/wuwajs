"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineCrossGroup = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class LineCrossGroup {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get GroupId() {
    return this.groupid();
  }
  get NeedFinishGroup() {
    return GameUtils_1.GameUtils.ConvertToArray(this.needfinishgroupLength(), this.needfinishgroup, this);
  }
  get ChallengeList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.challengelistLength(), this.challengelist, this);
  }
  get Name() {
    return this.name();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsLineCrossGroup(t, s) {
    return (s || new LineCrossGroup()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  groupid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetNeedfinishgroupAt(t) {
    return this.needfinishgroup(t);
  }
  needfinishgroup(t) {
    var s = this.J7.__offset(this.z7, 6);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  needfinishgroupLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  needfinishgroupArray() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetChallengelistAt(t) {
    return this.challengelist(t);
  }
  challengelist(t) {
    var s = this.J7.__offset(this.z7, 8);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  challengelistLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  challengelistArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  name(t) {
    var s = this.J7.__offset(this.z7, 10);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.LineCrossGroup = LineCrossGroup;
//# sourceMappingURL=LineCrossGroup.js.map