"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattlePass = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class BattlePass {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get InitialLevel() {
    return this.initiallevel();
  }
  get BattlePassRewardId() {
    return this.battlepassrewardid();
  }
  get LevelLimit() {
    return this.levellimit();
  }
  get LevelUpExp() {
    return this.levelupexp();
  }
  get ConsumeId() {
    return this.consumeid();
  }
  get ConsumeCount() {
    return this.consumecount();
  }
  get IsRecurringLevel() {
    return this.isrecurringlevel();
  }
  get FreeRecurringReward() {
    return GameUtils_1.GameUtils.ConvertToMap(this.freerecurringrewardLength(), this.freerecurringrewardKey, this.freerecurringrewardValue, this);
  }
  freerecurringrewardKey(t) {
    return this.freerecurringreward(t)?.key();
  }
  freerecurringrewardValue(t) {
    return this.freerecurringreward(t)?.value();
  }
  get PayRecurringReward() {
    return GameUtils_1.GameUtils.ConvertToMap(this.payrecurringrewardLength(), this.payrecurringrewardKey, this.payrecurringrewardValue, this);
  }
  payrecurringrewardKey(t) {
    return this.payrecurringreward(t)?.key();
  }
  payrecurringrewardValue(t) {
    return this.payrecurringreward(t)?.value();
  }
  get RecurringLevelExp() {
    return this.recurringlevelexp();
  }
  get WeekExpLimit() {
    return this.weekexplimit();
  }
  get ExclusiveRewardPath() {
    return this.exclusiverewardpath();
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsBattlePass(t, r) {
    return (r || new BattlePass()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  initiallevel() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  battlepassrewardid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  levellimit() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  levelupexp() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  consumeid() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  consumecount() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  isrecurringlevel() {
    var t = this.J7.__offset(this.z7, 18);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  GetFreerecurringrewardAt(t, r) {
    return this.freerecurringreward(t);
  }
  freerecurringreward(t, r) {
    var e = this.J7.__offset(this.z7, 20);
    if (e) {
      return (r || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + e) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  freerecurringrewardLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPayrecurringrewardAt(t, r) {
    return this.payrecurringreward(t);
  }
  payrecurringreward(t, r) {
    var e = this.J7.__offset(this.z7, 22);
    if (e) {
      return (r || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + e) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  payrecurringrewardLength() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  recurringlevelexp() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  weekexplimit() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  exclusiverewardpath(t) {
    var r = this.J7.__offset(this.z7, 28);
    var r = r ? this.J7.__string(this.z7 + r, t) : null;
    if (typeof r == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(r);
    }
    return r;
  }
}
exports.BattlePass = BattlePass;
//# sourceMappingURL=BattlePass.js.map