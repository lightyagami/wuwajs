"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleBattleModel = void 0;
const ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  EXTRA_TEMP_MORALE_MAX_LEVEL_BUFF_ID = 632400018,
  EXTRA_TEMP_MORALE_MAX_LEVEL = 100;
class MoraleBattleModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), this.oH1 = 0, this.QR1 = 0, this.$fu = 0, this.KR1 = 1, this.U71 = 0, this.B71 = 0, this.CN1 = 1, this.YR1 = !1, this.zR1 = !1, this.k71 = void 0, this.nH1 = void 0, this.oW1 = void 0, this.nW1 = void 0, this.sau = 0, this.f1u = 1, this.afu = !1, this.hfu = !1
  }
  OnInit() {
    return !0
  }
  OnLeaveLevel() {
    return this.k71 = void 0, this.nH1 = void 0, this.oW1 = void 0, this.nW1 = void 0, !(this.afu = !1)
  }
  IsMoraleActive() {
    return this.YR1
  }
  SetMoraleActive(t) {
    this.YR1 = t
  }
  GetMoraleLevel() {
    return this.KR1
  }
  GetMoraleMaxLevel() {
    var t = this.O71();
    return t ? t.length - 1 : 1
  }
  GetLastMoraleLevel() {
    return this.f1u
  }
  GetMoraleIndomitableLevel() {
    return this.CN1
  }
  GetTempMoraleLevel() {
    return this.U71
  }
  GetTempMoraleExp() {
    return this.B71
  }
  GetExpRatio() {
    return this.sau
  }
  GetTempMoraleMaxLevel() {
    var t = this.sW1();
    return t ? (this.afu || (this.afu = !0, ((ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity)?.GetComponent(174))?.HasBuff(EXTRA_TEMP_MORALE_MAX_LEVEL_BUFF_ID) ? this.hfu = !0 : this.hfu = !1), this.hfu ? t.length : Math.max(1, t.length - EXTRA_TEMP_MORALE_MAX_LEVEL)) : 1
  }
  GetMoraleMaxExp() {
    return 0 === this.$fu && (this.$fu = this.GetLevelExp(this.GetMoraleMaxLevel())), this.$fu
  }
  SetIsUnlockTempMoraleMaxLevel(t) {
    this.hfu = t
  }
  O71() {
    return this.k71 || (this.k71 = ConfigManager_1.ConfigManager.MoraleBattleConfig?.GetAllExpConfig() ?? []), this.k71
  }
  sW1() {
    var t;
    return !this.nH1 && (t = ConfigManager_1.ConfigManager.MoraleBattleConfig.GetMoraleConfig(this.oH1)?.BattleScoreId ?? 0, t = ConfigManager_1.ConfigManager.BattleScoreConfig.GetBattleScoreConfig(t)) && (this.nH1 = ConfigManager_1.ConfigManager.BattleScoreConfig.GetBattleScoreActionConfigByGroupId(t.LevelGroupId)), this.nH1
  }
  GetLevelExp(t) {
    var e = this.oW1?.get(t);
    if (void 0 !== e) return e;
    e = this.O71();
    if (0 <= t && t < e.length) {
      e = ConfigManager_1.ConfigManager.MoraleBattleConfig?.GetExpConfig(t);
      if (e) return this.oW1 || (this.oW1 = new Map), this.oW1.set(t, e.Experience), e.Experience
    }
    return 0
  }
  GetTempLevelExpRange(t) {
    const e = this.nW1?.get(t);
    if (void 0 !== e) return e;
    for (const i of this.sW1())
      if (i.Level === t || 1 === i.Level && 0 === t) {
        this.nW1 || (this.nW1 = new Map);
        const e = [i.LowerUpperLimits[0], i.LowerUpperLimits[1]];
        return 0 === t && (e[0] = 0, e[1] = i.LowerUpperLimits[0]), this.nW1.set(t, e), e
      } return [0, 0]
  }
  GetMoraleLevelUpExp(t) {
    let e = t ?? this.KR1;
    var t = this.GetMoraleMaxLevel(),
      t = (e >= t && (e = t - 1), this.GetLevelExp(e)),
      i = this.GetLevelExp(e + 1);
    return Math.max(0, i - t)
  }
  GetMoraleCurrentLevelExp() {
    var t;
    return 1 === this.KR1 ? this.QR1 : this.KR1 === this.GetMoraleMaxLevel() ? this.GetMoraleLevelUpExp(this.KR1 - 1) : (t = this.GetLevelExp(this.KR1 - 1), Math.max(0, this.QR1 - t))
  }
  GetMoraleCurrentExpProgress() {
    var t, e;
    return this.KR1 === this.GetMoraleMaxLevel() ? 1 : (t = this.GetMoraleCurrentLevelExp(), 0 !== (e = this.GetMoraleLevelUpExp()) ? t / e : 0)
  }
  GetTempMoraleLevelUpExp(t) {
    t = t ?? this.U71, t = this.GetTempLevelExpRange(t);
    return Math.max(0, t[1] - t[0])
  }
  GetTempMoraleLevelExp() {
    var t = this.GetTempLevelExpRange(this.U71);
    return Math.max(0, this.B71 - t[0])
  }
  GetTempMoraleExpProgress() {
    var t = this.GetTempMoraleLevelExp(),
      e = this.GetTempMoraleLevelUpExp();
    return 0 !== e ? Math.min(1, t / e) : 0
  }
  HandleMoraleInfoNotify(t) {
    this.oH1 = t.tR1, this.sau = t.snu;
    var e, i, s, r, h = t.g9n;
    this.zR1 || (this.O71(), this.GetMoraleMaxExp(), this.q71(t), this.zR1 = !0), this.IsMoraleActive() !== h && (this.SetMoraleActive(h), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMoraleActiveChanged, h)), h ? (i = (h = this.KR1) + (e = this.U71) !== t.rR1 + t.nR1, s = Math.min(this.$fu, t.oR1), this.QR1 !== s && (r = this.QR1, this.QR1 = s, this.KR1 = t.rR1, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMoraleExpChanged, r, this.QR1, h, this.KR1)), this.B71 !== t.sR1 && (s = this.B71, this.B71 = t.sR1, this.U71 = t.nR1, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMoraleTempExpChanged, s, this.B71, e, this.U71)), i && EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMoraleSumLevelChanged, h, this.KR1, e, this.U71), this.CN1 !== t.iR1 && (r = this.CN1, this.CN1 = t.iR1, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMoraleIndomitableLevelChanged, r, this.CN1)), 1 === t.x9n && (this.f1u = h, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMoraleBattleFail))) : this.q71(t)
  }
  q71(t) {
    this.QR1 = Math.min(this.$fu, t.oR1), this.KR1 = t.rR1, this.CN1 = t.iR1, this.U71 = t.nR1, this.B71 = t.sR1
  }
  GetMoraleLevelDiffType(t, e) {
    var i = (e ?? this.GetMoraleLevel() + this.GetTempMoraleLevel()) - t,
      e = ConfigManager_1.ConfigManager.MoraleBattleConfig.GetAllLevelDiffShowConfig();
    let s = 0;
    if (e)
      for (const r of e)
        if (i >= r.LevelDiffLower && i < r.LevelDiffUpper) {
          2 < (s = r.MonsterLevelPattern) ? s = 2 : s < 0 && (s = 0);
          break
        } return s
  }
}
exports.MoraleBattleModel = MoraleBattleModel;
//# sourceMappingURL=MoraleBattleModel.js.map