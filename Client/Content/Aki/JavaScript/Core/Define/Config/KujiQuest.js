"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KujiQuest = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class KujiQuest {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get KujiId() {
    return this.kujiid();
  }
  get CoinQuestId() {
    return this.coinquestid();
  }
  get QuestDesc() {
    return this.questdesc();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsKujiQuest(t, s) {
    return (s || new KujiQuest()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  kujiid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  coinquestid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  questdesc(t) {
    var s = this.J7.__offset(this.z7, 10);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.KujiQuest = KujiQuest;
//# sourceMappingURL=KujiQuest.js.map