"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SpecialSkillKatixiya = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../../../../Core/Define/ConfigCommon/CommonParamById"),
  TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem"),
  DataTableUtil_1 = require("../../../../../../../Core/Utils/DataTableUtil"),
  GameplayTagUtils_1 = require("../../../../../../../Core/Utils/GameplayTagUtils"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  CombatLog_1 = require("../../../../../../Utils/CombatLog"),
  CharacterUnifiedStateTypes_1 = require("../../Abilities/CharacterUnifiedStateTypes"),
  SpecialSkillBase_1 = require("./SpecialSkillBase"),
  katixiyaMorphBuffs = [1409001013, 611250016],
  KATIXIYA_MORPH_CUE_ID = 1409001099,
  UPDATE_MATERIAL_DELAY = 500,
  IS_ENABLE_OPTIMIZE = !0,
  katixiyaMeshNames = ["WeaponCase0", "WeaponCase1", "OtherCase0", "GenericCase0"],
  fuludelisiMeshNames = ["OtherCase1", "OtherCase2", "OtherCase3", "OtherCase4"];
class SpecialSkillKatixiya extends SpecialSkillBase_1.SpecialSkillBase {
  constructor() {
    super(...arguments), this.Hte = void 0, this.oRe = void 0, this.cBe = void 0, this.$zo = void 0, this.k61 = void 0, this.Scu = void 0, this.VJ1 = void 0, this.Mcu = void 0, this.Ymu = void 0, this.Hfu = void 0, this.Ecu = void 0, this.Icu = void 0, this.Ydu = void 0, this.Yfu = void 0, this.igu = new Set, this.xG1 = (e, t) => {
      if (e.Entity?.Id === this.SpecialSkillComponent.Entity.Id && this.Scu?.IsMorphing() && !this.Ymu?.IsInQte && t?.Entity?.GetComponent(175)?.PositionState !== CharacterUnifiedStateTypes_1.ECharPositionState.Ground && this.Ydu) {
        var i = t?.Entity?.GetComponent(205);
        for (const s of this.Ydu)
          if (i?.HasTag(s)) {
            CombatLog_1.CombatLog.Info("Skill", this.SpecialSkillComponent.Entity, "还原形态", ["Reason", 3], ["TagId", s]), this.Rcu();
            break
          }
      }
    }, this.Tcu = (e, t) => {
      this.bcu(e) && (CombatLog_1.CombatLog.Info("Skill", this.SpecialSkillComponent.Entity, "还原形态", ["Reason", 0], ["SkillId", e]), this.Rcu())
    }, this.Lcu = e => {
      this.Scu?.IsMorphing() && (CombatLog_1.CombatLog.Info("Skill", this.SpecialSkillComponent.Entity, "还原形态", ["Reason", 1], ["ActionType", e]), this.Rcu())
    }, this.lSl = () => {
      this.Scu?.IsMorphing() && this.Mcu?.IsDead() && (CombatLog_1.CombatLog.Info("Skill", this.SpecialSkillComponent.Entity, "还原形态", ["Reason", 4]), this.Rcu())
    }, this.zdu = () => {
      var e = ModelManager_1.ModelManager.PlotModel.PlotConfig,
        t = e.PlotLevel,
        e = e.ShouldSwitchMainRole;
      t && "LevelC" === t && !e && ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.Id === this.SpecialSkillComponent.Entity.Id && this.Scu?.IsMorphing() && (CombatLog_1.CombatLog.Info("Skill", this.SpecialSkillComponent.Entity, "还原形态", ["Reason", 2]), this.Rcu())
    }, this._7_ = (e, t, i) => {
      0 === t && this.Hte?.IsRoleAndCtrlByMe && (this.jm(), this.Yfu = TimerSystem_1.TimerSystem.Delay(() => {
        this.Hfu?.RefreshStarScarMaterial(), this.Yfu = void 0
      }, UPDATE_MATERIAL_DELAY)), this.RefreshNoUpdateMeshes(t)
    }, this.lCu = (e, t, i) => {
      this.Hte?.IsRoleAndCtrlByMe && (this._Cu(), 1 !== this.Hte.Actor.DitherEffectController?.CurrentDitherValue) && this.Hte.Actor.CharRenderingComponent?.SetDitherEffect(1, 1)
    }
  }
  OnStart() {
    var e = this.SpecialSkillComponent.Entity,
      t = (this.Hte = e.GetComponent(3), this.oRe = e.GetComponent(44), this.cBe = e.GetComponent(39), this.$zo = e.GetComponent(209), this.k61 = e.GetComponent(25), this.Scu = e.GetComponent(279), this.VJ1 = e.GetComponent(225), this.Mcu = e.GetComponent(15), this.Ymu = e.GetComponent(98), this.Hfu = e.GetComponent(92), this.Ydu = [], CommonParamById_1.configCommonParamById.GetStringArrayConfig("KatixiyaChangeRoleResetMorphTags"));
    if (t)
      for (const i of t) this.Ydu.push(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i));
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBeforeChangeRole, this.xG1), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnExecuteAfterSetPlotMode, this.zdu), EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.Tcu), EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.OnBeforeCharActionWithTarget, this.Lcu), EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.OnRoleGoDownFinish, this.lSl), EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.OnCharacterMorphTypeChanged, this._7_), EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.OnBeforeCharacterMorphTypeChanged, this.lCu)
  }
  OnEnd() {
    var e = this.SpecialSkillComponent.Entity;
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBeforeChangeRole, this.xG1), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnExecuteAfterSetPlotMode, this.zdu), EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.Tcu), EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.OnBeforeCharActionWithTarget, this.Lcu), EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.OnRoleGoDownFinish, this.lSl), EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.OnCharacterMorphTypeChanged, this._7_), EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.OnBeforeCharacterMorphTypeChanged, this.lCu), this.jm(), this.igu.clear()
  }
  OnActivate() {
    var e = this.Scu?.GetMorphType();
    void 0 !== e && this.RefreshNoUpdateMeshes(e)
  }
  jm() {
    this.Yfu && (TimerSystem_1.TimerSystem.Remove(this.Yfu), this.Yfu = void 0)
  }
  Rcu() {
    if (this.Scu?.IsMorphing()) {
      for (const e of katixiyaMorphBuffs) this.$zo?.HasBuff(e) && this.$zo.RemoveBuff(e, -1, "SpecialSkillKatixiya.ResetMorph");
      this.VJ1?.AddCue(KATIXIYA_MORPH_CUE_ID, {
        Instant: !0
      })
    }
  }
  wcu(e) {
    var t;
    return this.Ecu || (t = CommonParamById_1.configCommonParamById.GetIntArrayConfig("KatixiyaResetMorphSkills") ?? [], this.Ecu = [...t]), this.Ecu.includes(e)
  }
  Acu(e) {
    var t;
    return this.Icu || (t = CommonParamById_1.configCommonParamById.GetIntArrayConfig("KatixiyaNotResetMorphSkills") ?? [], this.Icu = [...t]), this.Icu.includes(e)
  }
  bcu(t) {
    var e, i = this.cBe?.GetSkill(t);
    let s = i?.SkillInfo;
    if (s || (e = ConfigManager_1.ConfigManager.WorldConfig.GetRoleCommonSkillInfo()) && (s = DataTableUtil_1.DataTableUtil.GetDataTableRow(e, t.toString())), !s) return !1;
    let a = !1;
    this.wcu(t) ? a = !0 : this.Acu(t) ? a = !1 : 10 === s.SkillGenre && (a = !0);
    var h = !!this.Scu?.IsMorphing() && !a;
    if (i && 0 < s.MontagePaths.Num()) {
      var o = s.MontagePaths;
      for (let e = 0; e < o.Num(); ++e) {
        var r = o.Get(e),
          n = i.GetMontageByIndex(e),
          l = h ? this.Scu?.GetMontageByName(r) : this.k61?.GetMontageByName(r, !1);
        n && l && n !== l || !n && l ? (i.SetMontageByIndex(e, l), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 67, "[SpecialSkillKatixiya]替换技能动画", ["SkillId", t], ["MontageName", r], ["LoadedMontage", n], ["NeedMontage", l])) : n && !l && (h ? (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 67, "[SpecialSkillKatixiya]变身状态下不存在技能动画", ["SkillId", t], ["MontageName", r], ["LoadedMontage", n], ["NeedMontage", l]), a = !0) : Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 67, "[SpecialSkillKatixiya]加载的技能动画有异常", ["SkillId", t], ["MontageName", r], ["LoadedMontage", n], ["NeedMontage", l]))
      }
    }
    return a
  }
  RefreshNoUpdateMeshes(t) {
    if (IS_ENABLE_OPTIMIZE) {
      this.igu.clear();
      var i = this.Hte.Actor.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
      for (let e = 0; e < i.Num(); e++) {
        var s = i.Get(e),
          a = s.GetName();
        0 === t ? fuludelisiMeshNames.includes(a) && this.igu.add(s) : 1 === t && katixiyaMeshNames.includes(a) && this.igu.add(s)
      }
      this.oRe?.SetNoUpdateMeshes(this.igu), this.igu.clear()
    }
  }
  _Cu() {
    var e = this.cBe?.CurrentSkill;
    if (e) {
      e = e.GetLoadedMontages();
      if (e) {
        var t = this.oRe?.MainAnimInstance;
        if (t)
          for (const i of e)
            if (t.Montage_IsPlaying(i)) {
              this.cBe?.StopGroup1Skill("形态变化时存在正在播放的技能动画");
              break
            }
      }
    }
  }
}
exports.SpecialSkillKatixiya = SpecialSkillKatixiya;
//# sourceMappingURL=SpecialSkillKatixiya.js.map