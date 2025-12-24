"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewTowerScoreReward = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class NewTowerScoreReward {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Level() {
    return this.level();
  }
  get Index() {
    return this.index();
  }
  get DropId() {
    return this.dropid();
  }
  get Desc() {
    return this.desc();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsNewTowerScoreReward(t, e) {
    return (e || new NewTowerScoreReward()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  level() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  index() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  dropid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  desc(t) {
    var e = this.J7.__offset(this.z7, 12);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.NewTowerScoreReward = NewTowerScoreReward;
//# sourceMappingURL=NewTowerScoreReward.js.map