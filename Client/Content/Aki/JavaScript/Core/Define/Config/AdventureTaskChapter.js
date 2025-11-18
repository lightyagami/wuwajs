"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdventureTaskChapter = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class AdventureTaskChapter {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Name() {
    return this.name();
  }
  get DropIds() {
    return this.dropids();
  }
  get UnLockCondition() {
    return this.unlockcondition();
  }
  get LevelUnlockCount() {
    return this.levelunlockcount();
  }
  get RewardUnlockCount() {
    return this.rewardunlockcount();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsAdventureTaskChapter(t, e) {
    return (e || new AdventureTaskChapter()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var e = this.J7.__offset(this.z7, 6);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  dropids() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  unlockcondition() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  levelunlockcount() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rewardunlockcount() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.AdventureTaskChapter = AdventureTaskChapter;
//# sourceMappingURL=AdventureTaskChapter.js.map