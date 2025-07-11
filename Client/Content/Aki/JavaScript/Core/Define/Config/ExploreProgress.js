"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExploreProgress = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class ExploreProgress {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Area() {
    return this.area();
  }
  get ExploreType() {
    return this.exploretype();
  }
  get SubTypeScore() {
    return GameUtils_1.GameUtils.ConvertToMap(this.subtypescoreLength(), this.subtypescoreKey, this.subtypescoreValue, this);
  }
  subtypescoreKey(t) {
    return this.subtypescore(t)?.key();
  }
  subtypescoreValue(t) {
    return this.subtypescore(t)?.value();
  }
  get PhantomSkillId() {
    return this.phantomskillid();
  }
  get UnlockTextId() {
    return this.unlocktextid();
  }
  get LockTextId() {
    return this.locktextid();
  }
  get UnlockCondition() {
    return this.unlockcondition();
  }
  get SpecialPlayerMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.specialplayermapLength(), this.specialplayermapKey, this.specialplayermapValue, this);
  }
  specialplayermapKey(t) {
    return this.specialplayermap(t)?.key();
  }
  specialplayermapValue(t) {
    return this.specialplayermap(t)?.value();
  }
  get IsRecommend() {
    return this.isrecommend();
  }
  get IsShowProgress() {
    return this.isshowprogress();
  }
  get IsShowTrack() {
    return this.isshowtrack();
  }
  get SpecialPlayerDesc() {
    return this.specialplayerdesc();
  }
  get UnlockTrackType() {
    return this.unlocktracktype();
  }
  get LockTrackType() {
    return this.locktracktype();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsExploreProgress(t, s) {
    return (s || new ExploreProgress()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  area() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  exploretype() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetSubtypescoreAt(t, s) {
    return this.subtypescore(t);
  }
  subtypescore(t, s) {
    var e = this.J7.__offset(this.z7, 10);
    if (e) {
      return (s || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + e) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  subtypescoreLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  phantomskillid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  unlocktextid(t) {
    var s = this.J7.__offset(this.z7, 14);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  locktextid(t) {
    var s = this.J7.__offset(this.z7, 16);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  unlockcondition() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetSpecialplayermapAt(t, s) {
    return this.specialplayermap(t);
  }
  specialplayermap(t, s) {
    var e = this.J7.__offset(this.z7, 20);
    if (e) {
      return (s || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + e) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  specialplayermapLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  isrecommend() {
    var t = this.J7.__offset(this.z7, 22);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  isshowprogress() {
    var t = this.J7.__offset(this.z7, 24);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  isshowtrack() {
    var t = this.J7.__offset(this.z7, 26);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  specialplayerdesc(t) {
    var s = this.J7.__offset(this.z7, 28);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  unlocktracktype() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  locktracktype() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
}
exports.ExploreProgress = ExploreProgress;
//# sourceMappingURL=ExploreProgress.js.map