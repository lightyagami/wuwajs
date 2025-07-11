"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LifePointGroup = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class LifePointGroup {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get GroupId() {
    return this.groupid();
  }
  get ChallengeList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.challengelistLength(), this.challengelist, this);
  }
  get LockEntracneGroupNumResource() {
    return this.lockentracnegroupnumresource();
  }
  get EntracneGroupNumResource() {
    return this.entracnegroupnumresource();
  }
  get HighlightEntranceResource() {
    return this.highlightentranceresource();
  }
  get LockHighlightEntranceResource() {
    return this.lockhighlightentranceresource();
  }
  get LevelNumResource() {
    return this.levelnumresource();
  }
  get Name() {
    return this.name();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsLifePointGroup(t, e) {
    return (e || new LifePointGroup()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  groupid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetChallengelistAt(t) {
    return this.challengelist(t);
  }
  challengelist(t) {
    var e = this.J7.__offset(this.z7, 6);
    if (e) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + e) + t * 4);
    } else {
      return 0;
    }
  }
  challengelistLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  challengelistArray() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  lockentracnegroupnumresource(t) {
    var e = this.J7.__offset(this.z7, 8);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  entracnegroupnumresource(t) {
    var e = this.J7.__offset(this.z7, 10);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  highlightentranceresource(t) {
    var e = this.J7.__offset(this.z7, 12);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  lockhighlightentranceresource(t) {
    var e = this.J7.__offset(this.z7, 14);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  levelnumresource(t) {
    var e = this.J7.__offset(this.z7, 16);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  name(t) {
    var e = this.J7.__offset(this.z7, 18);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.LifePointGroup = LifePointGroup;
//# sourceMappingURL=LifePointGroup.js.map