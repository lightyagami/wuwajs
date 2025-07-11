"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerStateRestriction = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class PlayerStateRestriction {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Type() {
    return this.type();
  }
  get IncludedTags() {
    return GameUtils_1.GameUtils.ConvertToArray(this.includedtagsLength(), this.includedtags, this);
  }
  get ExcludedTags() {
    return GameUtils_1.GameUtils.ConvertToArray(this.excludedtagsLength(), this.excludedtags, this);
  }
  get CreatorId() {
    return this.creatorid();
  }
  get Remark() {
    return this.remark();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsPlayerStateRestriction(t, s) {
    return (s || new PlayerStateRestriction()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  type(t) {
    var s = this.J7.__offset(this.z7, 6);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  GetIncludedtagsAt(t) {
    return this.includedtags(t);
  }
  includedtags(t, s) {
    var e = this.J7.__offset(this.z7, 8);
    var e = e ? this.J7.__string(this.J7.__vector(this.z7 + e) + t * 4, s) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  includedtagsLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetExcludedtagsAt(t) {
    return this.excludedtags(t);
  }
  excludedtags(t, s) {
    var e = this.J7.__offset(this.z7, 10);
    var e = e ? this.J7.__string(this.J7.__vector(this.z7 + e) + t * 4, s) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  excludedtagsLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  creatorid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  remark(t) {
    var s = this.J7.__offset(this.z7, 14);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.PlayerStateRestriction = PlayerStateRestriction;
//# sourceMappingURL=PlayerStateRestriction.js.map