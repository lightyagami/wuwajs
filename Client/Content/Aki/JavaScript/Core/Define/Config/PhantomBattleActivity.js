"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomBattleActivity = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class PhantomBattleActivity {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get ActivityId() {
    return this.activityid();
  }
  get TimeQuantumId() {
    return this.timequantumid();
  }
  get ShopId() {
    return this.shopid();
  }
  get ShopItemId() {
    return this.shopitemid();
  }
  get DustItemId() {
    return this.dustitemid();
  }
  get ExpItemId() {
    return this.expitemid();
  }
  get Integration() {
    return this.integration();
  }
  get AttackFactor() {
    return this.attackfactor();
  }
  get LifeFactor() {
    return this.lifefactor();
  }
  get CardGroupNeedNum() {
    return this.cardgroupneednum();
  }
  get CanBattlePhantomNum() {
    return this.canbattlephantomnum();
  }
  get BattleSlotNum() {
    return this.battleslotnum();
  }
  get FourCostCardCount() {
    return this.fourcostcardcount();
  }
  get NormalCardCount() {
    return this.normalcardcount();
  }
  get DeckLimit() {
    return this.decklimit();
  }
  get CardMinRequired() {
    return GameUtils_1.GameUtils.ConvertToMap(this.cardminrequiredLength(), this.cardminrequiredKey, this.cardminrequiredValue, this);
  }
  cardminrequiredKey(t) {
    return this.cardminrequired(t)?.key();
  }
  cardminrequiredValue(t) {
    return this.cardminrequired(t)?.value();
  }
  get CardMaxLimit() {
    return GameUtils_1.GameUtils.ConvertToMap(this.cardmaxlimitLength(), this.cardmaxlimitKey, this.cardmaxlimitValue, this);
  }
  cardmaxlimitKey(t) {
    return this.cardmaxlimit(t)?.key();
  }
  cardmaxlimitValue(t) {
    return this.cardmaxlimit(t)?.value();
  }
  get GroupNameLimit() {
    return GameUtils_1.GameUtils.ConvertToArray(this.groupnamelimitLength(), this.groupnamelimit, this);
  }
  get ElementMax() {
    return this.elementmax();
  }
  get WeeklyExpLimit() {
    return this.weeklyexplimit();
  }
  get MaxItemLimit() {
    return GameUtils_1.GameUtils.ConvertToMap(this.maxitemlimitLength(), this.maxitemlimitKey, this.maxitemlimitValue, this);
  }
  maxitemlimitKey(t) {
    return this.maxitemlimit(t)?.key();
  }
  maxitemlimitValue(t) {
    return this.maxitemlimit(t)?.value();
  }
  get QuicklyBuild() {
    return GameUtils_1.GameUtils.ConvertToArray(this.quicklybuildLength(), this.quicklybuild, this);
  }
  get BadgeGroupEffects() {
    return GameUtils_1.GameUtils.ConvertToArray(this.badgegroupeffectsLength(), this.badgegroupeffects, this);
  }
  get FuncOpenChallenge() {
    return GameUtils_1.GameUtils.ConvertToMap(this.funcopenchallengeLength(), this.funcopenchallengeKey, this.funcopenchallengeValue, this);
  }
  funcopenchallengeKey(t) {
    return this.funcopenchallenge(t)?.key();
  }
  funcopenchallengeValue(t) {
    return this.funcopenchallenge(t)?.value();
  }
  get MainRoleList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.mainrolelistLength(), this.mainrolelist, this);
  }
  get MainRoleSexChange() {
    return GameUtils_1.GameUtils.ConvertToMap(this.mainrolesexchangeLength(), this.mainrolesexchangeKey, this.mainrolesexchangeValue, this);
  }
  mainrolesexchangeKey(t) {
    return this.mainrolesexchange(t)?.key();
  }
  mainrolesexchangeValue(t) {
    return this.mainrolesexchange(t)?.value();
  }
  get SlotLongPressTime() {
    return this.slotlongpresstime();
  }
  get RecommendQuestId() {
    return this.recommendquestid();
  }
  get RecommendQuestTips() {
    return this.recommendquesttips();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsPhantomBattleActivity(t, i) {
    return (i || new PhantomBattleActivity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  timequantumid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  shopid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  shopitemid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  dustitemid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  expitemid() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  integration() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  attackfactor() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  lifefactor() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  cardgroupneednum() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  canbattlephantomnum() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  battleslotnum() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  fourcostcardcount() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  normalcardcount() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  decklimit() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetCardminrequiredAt(t, i) {
    return this.cardminrequired(t);
  }
  cardminrequired(t, i) {
    var s = this.J7.__offset(this.z7, 34);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  cardminrequiredLength() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetCardmaxlimitAt(t, i) {
    return this.cardmaxlimit(t);
  }
  cardmaxlimit(t, i) {
    var s = this.J7.__offset(this.z7, 36);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  cardmaxlimitLength() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetGroupnamelimitAt(t) {
    return this.groupnamelimit(t);
  }
  groupnamelimit(t) {
    var i = this.J7.__offset(this.z7, 38);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  groupnamelimitLength() {
    var t = this.J7.__offset(this.z7, 38);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  groupnamelimitArray() {
    var t = this.J7.__offset(this.z7, 38);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  elementmax() {
    var t = this.J7.__offset(this.z7, 40);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  weeklyexplimit() {
    var t = this.J7.__offset(this.z7, 42);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetMaxitemlimitAt(t, i) {
    return this.maxitemlimit(t);
  }
  maxitemlimit(t, i) {
    var s = this.J7.__offset(this.z7, 44);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  maxitemlimitLength() {
    var t = this.J7.__offset(this.z7, 44);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetQuicklybuildAt(t) {
    return this.quicklybuild(t);
  }
  quicklybuild(t) {
    var i = this.J7.__offset(this.z7, 46);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  quicklybuildLength() {
    var t = this.J7.__offset(this.z7, 46);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  quicklybuildArray() {
    var t = this.J7.__offset(this.z7, 46);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetBadgegroupeffectsAt(t) {
    return this.badgegroupeffects(t);
  }
  badgegroupeffects(t) {
    var i = this.J7.__offset(this.z7, 48);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  badgegroupeffectsLength() {
    var t = this.J7.__offset(this.z7, 48);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  badgegroupeffectsArray() {
    var t = this.J7.__offset(this.z7, 48);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetFuncopenchallengeAt(t, i) {
    return this.funcopenchallenge(t);
  }
  funcopenchallenge(t, i) {
    var s = this.J7.__offset(this.z7, 50);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  funcopenchallengeLength() {
    var t = this.J7.__offset(this.z7, 50);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetMainrolelistAt(t) {
    return this.mainrolelist(t);
  }
  mainrolelist(t) {
    var i = this.J7.__offset(this.z7, 52);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  mainrolelistLength() {
    var t = this.J7.__offset(this.z7, 52);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  mainrolelistArray() {
    var t = this.J7.__offset(this.z7, 52);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetMainrolesexchangeAt(t, i) {
    return this.mainrolesexchange(t);
  }
  mainrolesexchange(t, i) {
    var s = this.J7.__offset(this.z7, 54);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  mainrolesexchangeLength() {
    var t = this.J7.__offset(this.z7, 54);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  slotlongpresstime() {
    var t = this.J7.__offset(this.z7, 56);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1000;
    }
  }
  recommendquestid() {
    var t = this.J7.__offset(this.z7, 58);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  recommendquesttips(t) {
    var i = this.J7.__offset(this.z7, 60);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.PhantomBattleActivity = PhantomBattleActivity;
//# sourceMappingURL=PhantomBattleActivity.js.map