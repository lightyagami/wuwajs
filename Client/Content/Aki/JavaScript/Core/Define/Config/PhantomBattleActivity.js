"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomBattleActivity = void 0;
const GameUtils_1 = require("../../../Game/GameUtils"),
  DicIntInt_1 = require("./SubType/DicIntInt");
class PhantomBattleActivity {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get ActivityId() {
    return this.activityid()
  }
  get TimeQuantumId() {
    return this.timequantumid()
  }
  get ShopId() {
    return this.shopid()
  }
  get ShopItemId() {
    return this.shopitemid()
  }
  get DustItemId() {
    return this.dustitemid()
  }
  get ExpItemId() {
    return this.expitemid()
  }
  get Integration() {
    return this.integration()
  }
  get AttackFactor() {
    return this.attackfactor()
  }
  get LifeFactor() {
    return this.lifefactor()
  }
  get CardGroupNeedNum() {
    return this.cardgroupneednum()
  }
  get CanBattlePhantomNum() {
    return this.canbattlephantomnum()
  }
  get BattleSlotNum() {
    return this.battleslotnum()
  }
  get FourCostCardCount() {
    return this.fourcostcardcount()
  }
  get NormalCardCount() {
    return this.normalcardcount()
  }
  get DeckLimit() {
    return this.decklimit()
  }
  get CardMinRequired() {
    return GameUtils_1.GameUtils.ConvertToMap(this.cardminrequiredLength(), this.cardminrequiredKey, this.cardminrequiredValue, this)
  }
  cardminrequiredKey(t) {
    return this.cardminrequired(t)?.key()
  }
  cardminrequiredValue(t) {
    return this.cardminrequired(t)?.value()
  }
  get CardMaxLimit() {
    return GameUtils_1.GameUtils.ConvertToMap(this.cardmaxlimitLength(), this.cardmaxlimitKey, this.cardmaxlimitValue, this)
  }
  cardmaxlimitKey(t) {
    return this.cardmaxlimit(t)?.key()
  }
  cardmaxlimitValue(t) {
    return this.cardmaxlimit(t)?.value()
  }
  get GroupNameLimit() {
    return GameUtils_1.GameUtils.ConvertToArray(this.groupnamelimitLength(), this.groupnamelimit, this)
  }
  get ElementMax() {
    return this.elementmax()
  }
  get WeeklyExpLimit() {
    return this.weeklyexplimit()
  }
  get MaxItemLimit() {
    return GameUtils_1.GameUtils.ConvertToMap(this.maxitemlimitLength(), this.maxitemlimitKey, this.maxitemlimitValue, this)
  }
  maxitemlimitKey(t) {
    return this.maxitemlimit(t)?.key()
  }
  maxitemlimitValue(t) {
    return this.maxitemlimit(t)?.value()
  }
  get QuicklyBuild() {
    return GameUtils_1.GameUtils.ConvertToArray(this.quicklybuildLength(), this.quicklybuild, this)
  }
  get BadgeGroupEffects() {
    return GameUtils_1.GameUtils.ConvertToArray(this.badgegroupeffectsLength(), this.badgegroupeffects, this)
  }
  get FuncOpenChallenge() {
    return GameUtils_1.GameUtils.ConvertToMap(this.funcopenchallengeLength(), this.funcopenchallengeKey, this.funcopenchallengeValue, this)
  }
  funcopenchallengeKey(t) {
    return this.funcopenchallenge(t)?.key()
  }
  funcopenchallengeValue(t) {
    return this.funcopenchallenge(t)?.value()
  }
  get MainRoleList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.mainrolelistLength(), this.mainrolelist, this)
  }
  get MainRoleSexChange() {
    return GameUtils_1.GameUtils.ConvertToMap(this.mainrolesexchangeLength(), this.mainrolesexchangeKey, this.mainrolesexchangeValue, this)
  }
  mainrolesexchangeKey(t) {
    return this.mainrolesexchange(t)?.key()
  }
  mainrolesexchangeValue(t) {
    return this.mainrolesexchange(t)?.value()
  }
  get SlotLongPressTime() {
    return this.slotlongpresstime()
  }
  get RecommendQuestId() {
    return this.recommendquestid()
  }
  get RecommendQuestTips() {
    return this.recommendquesttips()
  }
  __init(t, i) {
    return this.z7 = t, this.J7 = i, this
  }
  static getRootAsPhantomBattleActivity(t, i) {
    return (i || new PhantomBattleActivity).__init(t.readInt32(t.position()) + t.position(), t)
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  timequantumid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  shopid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  shopitemid() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  dustitemid() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  expitemid() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  integration() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  attackfactor() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  lifefactor() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  cardgroupneednum() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  canbattlephantomnum() {
    var t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  battleslotnum() {
    var t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  fourcostcardcount() {
    var t = this.J7.__offset(this.z7, 28);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  normalcardcount() {
    var t = this.J7.__offset(this.z7, 30);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  decklimit() {
    var t = this.J7.__offset(this.z7, 32);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  GetCardminrequiredAt(t, i) {
    return this.cardminrequired(t)
  }
  cardminrequired(t, i) {
    var s = this.J7.__offset(this.z7, 34);
    return s ? (i || new DicIntInt_1.DicIntInt).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t), this.J7) : null
  }
  cardminrequiredLength() {
    var t = this.J7.__offset(this.z7, 34);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  GetCardmaxlimitAt(t, i) {
    return this.cardmaxlimit(t)
  }
  cardmaxlimit(t, i) {
    var s = this.J7.__offset(this.z7, 36);
    return s ? (i || new DicIntInt_1.DicIntInt).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t), this.J7) : null
  }
  cardmaxlimitLength() {
    var t = this.J7.__offset(this.z7, 36);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  GetGroupnamelimitAt(t) {
    return this.groupnamelimit(t)
  }
  groupnamelimit(t) {
    var i = this.J7.__offset(this.z7, 38);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0
  }
  groupnamelimitLength() {
    var t = this.J7.__offset(this.z7, 38);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  groupnamelimitArray() {
    var t = this.J7.__offset(this.z7, 38);
    return t ? new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t)) : null
  }
  elementmax() {
    var t = this.J7.__offset(this.z7, 40);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  weeklyexplimit() {
    var t = this.J7.__offset(this.z7, 42);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  GetMaxitemlimitAt(t, i) {
    return this.maxitemlimit(t)
  }
  maxitemlimit(t, i) {
    var s = this.J7.__offset(this.z7, 44);
    return s ? (i || new DicIntInt_1.DicIntInt).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t), this.J7) : null
  }
  maxitemlimitLength() {
    var t = this.J7.__offset(this.z7, 44);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  GetQuicklybuildAt(t) {
    return this.quicklybuild(t)
  }
  quicklybuild(t) {
    var i = this.J7.__offset(this.z7, 46);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0
  }
  quicklybuildLength() {
    var t = this.J7.__offset(this.z7, 46);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  quicklybuildArray() {
    var t = this.J7.__offset(this.z7, 46);
    return t ? new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t)) : null
  }
  GetBadgegroupeffectsAt(t) {
    return this.badgegroupeffects(t)
  }
  badgegroupeffects(t) {
    var i = this.J7.__offset(this.z7, 48);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0
  }
  badgegroupeffectsLength() {
    var t = this.J7.__offset(this.z7, 48);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  badgegroupeffectsArray() {
    var t = this.J7.__offset(this.z7, 48);
    return t ? new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t)) : null
  }
  GetFuncopenchallengeAt(t, i) {
    return this.funcopenchallenge(t)
  }
  funcopenchallenge(t, i) {
    var s = this.J7.__offset(this.z7, 50);
    return s ? (i || new DicIntInt_1.DicIntInt).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t), this.J7) : null
  }
  funcopenchallengeLength() {
    var t = this.J7.__offset(this.z7, 50);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  GetMainrolelistAt(t) {
    return this.mainrolelist(t)
  }
  mainrolelist(t) {
    var i = this.J7.__offset(this.z7, 52);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0
  }
  mainrolelistLength() {
    var t = this.J7.__offset(this.z7, 52);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  mainrolelistArray() {
    var t = this.J7.__offset(this.z7, 52);
    return t ? new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t)) : null
  }
  GetMainrolesexchangeAt(t, i) {
    return this.mainrolesexchange(t)
  }
  mainrolesexchange(t, i) {
    var s = this.J7.__offset(this.z7, 54);
    return s ? (i || new DicIntInt_1.DicIntInt).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t), this.J7) : null
  }
  mainrolesexchangeLength() {
    var t = this.J7.__offset(this.z7, 54);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  slotlongpresstime() {
    var t = this.J7.__offset(this.z7, 56);
    return t ? this.J7.readInt32(this.z7 + t) : 1e3
  }
  recommendquestid() {
    var t = this.J7.__offset(this.z7, 58);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  recommendquesttips(t) {
    var i = this.J7.__offset(this.z7, 60),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
}
exports.PhantomBattleActivity = PhantomBattleActivity;
//# sourceMappingURL=PhantomBattleActivity.js.map