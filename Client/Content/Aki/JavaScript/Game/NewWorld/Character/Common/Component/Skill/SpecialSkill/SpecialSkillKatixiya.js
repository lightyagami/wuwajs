"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialSkillKatixiya = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem");
const DataTableUtil_1 = require("../../../../../../../Core/Utils/DataTableUtil");
const GameplayTagUtils_1 = require("../../../../../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const CombatLog_1 = require("../../../../../../Utils/CombatLog");
const CharacterUnifiedStateTypes_1 = require("../../Abilities/CharacterUnifiedStateTypes");
const BaseSkillComponent_1 = require("../BaseSkillComponent");
const SpecialSkillBase_1 = require("./SpecialSkillBase");
const katixiyaMorphBuffs = [1409001013, 611250016];
const KATIXIYA_MORPH_CUE_ID = 1409001099;
const UPDATE_MATERIAL_DELAY = 500;
const IS_ENABLE_OPTIMIZE = true;
const katixiyaMeshNames = ["WeaponCase0", "WeaponCase1", "OtherCase0", "GenericCase0"];
const fuludelisiMeshNames = ["OtherCase1", "OtherCase2", "OtherCase3", "OtherCase4"];
class SpecialSkillKatixiya extends SpecialSkillBase_1.SpecialSkillBase {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.oRe = undefined;
    this.Lie = undefined;
    this.cBe = undefined;
    this.$zo = undefined;
    this.C51 = undefined;
    this.zIu = undefined;
    this.aeu = undefined;
    this.UBu = undefined;
    this.yqu = undefined;
    this.ZIu = undefined;
    this.eTu = undefined;
    this.EAu = undefined;
    this.wqu = undefined;
    this.Lpd = undefined;
    this.eNu = new Set();
    this.lF1 = (e, t) => {
      if (e.Entity?.Id === this.SpecialSkillComponent.Entity.Id && this.zIu?.IsMorphing() && !this.UBu?.IsInQte && t?.Entity?.GetComponent(184)?.PositionState !== CharacterUnifiedStateTypes_1.ECharPositionState.Ground && this.EAu) {
        var i = t?.Entity?.GetComponent(215);
        for (const s of this.EAu) {
          if (i?.HasTag(s)) {
            CombatLog_1.CombatLog.Info("Skill", this.SpecialSkillComponent.Entity, "还原形态", ["Reason", 3], ["TagId", s]);
            this.rTu();
            break;
          }
        }
      }
    };
    this.tTu = (e, t) => {
      if (this.iTu(e)) {
        CombatLog_1.CombatLog.Info("Skill", this.SpecialSkillComponent.Entity, "还原形态", ["Reason", 0], ["SkillId", e]);
        this.rTu();
      }
    };
    this.oTu = e => {
      if (this.zIu?.IsMorphing()) {
        CombatLog_1.CombatLog.Info("Skill", this.SpecialSkillComponent.Entity, "还原形态", ["Reason", 1], ["ActionType", e]);
        this.rTu();
      }
    };
    this.dHu = () => {
      if (this.zIu?.IsMorphing()) {
        CombatLog_1.CombatLog.Info("Skill", this.SpecialSkillComponent.Entity, "还原形态", ["Reason", 4]);
        this.rTu(false);
      }
    };
    this.g7r = () => {
      if (this.zIu?.IsMorphing()) {
        CombatLog_1.CombatLog.Info("Skill", this.SpecialSkillComponent.Entity, "还原形态", ["Reason", 5]);
        this.rTu(false);
      }
    };
    this.IAu = () => {
      var e = ModelManager_1.ModelManager.PlotModel.PlotConfig;
      var t = e.PlotLevel;
      var e = e.ShouldSwitchMainRole;
      if (t && t === "LevelC" && !e && ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.Id === this.SpecialSkillComponent.Entity.Id && this.zIu?.IsMorphing()) {
        CombatLog_1.CombatLog.Info("Skill", this.SpecialSkillComponent.Entity, "还原形态", ["Reason", 2]);
        this.rTu();
      }
    };
    this._7_ = (e, t, i) => {
      if (t === 0 && this.Hte?.IsRoleAndCtrlByMe) {
        this.jm();
        this.wqu = TimerSystem_1.TimerSystem.Delay(() => {
          this.yqu?.RefreshStarScarMaterial();
          this.wqu = undefined;
        }, UPDATE_MATERIAL_DELAY);
      }
      this.RefreshNoUpdateMeshes(t);
    };
    this.G5u = (e, t, i) => {
      if (this.Hte?.IsRoleAndCtrlByMe && (this.F5u(), this.Hte.Actor.DitherEffectController?.CurrentDitherValue !== 1)) {
        this.Hte.Actor.CharRenderingComponent?.SetDitherEffect(1, 1);
      }
    };
    this.dZu = (e, t, i, s) => {
      if (!this.Hte?.IsRoleAndCtrlByMe) {
        var a = this.cBe?.GetSkill(t);
        var h = a?.SkillInfo;
        if (a && h) {
          var o = this.zIu.IsMorphing();
          if (a && h.MontagePaths.Num() > 0) {
            var n = h.MontagePaths;
            for (let e = 0; e < n.Num(); ++e) {
              var r = n.Get(e);
              var l = a.GetMontageByIndex(e);
              var _ = o ? this.zIu?.GetMontageByName(r) : this.C51?.GetMontageByName(r, false);
              if ((l && _ && l !== _ || !l && _) && (a.SetMontageByIndex(e, _), Log_1.Log.CheckDebug())) {
                Log_1.Log.Debug("Battle", 67, "[SpecialSkillKatixiya]远端角色替换技能动画", ["SkillId", t], ["MontageName", r], ["LoadedMontage", l], ["NeedMontage", _]);
              }
            }
          }
        }
      }
    };
    this.Ppd = (e, t) => {
      if (t && this.zIu?.IsMorphing() && this.SpecialSkillComponent.Entity.Id === ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity?.Id) {
        CombatLog_1.CombatLog.Info("Skill", this.SpecialSkillComponent.Entity, "还原形态", ["Reason", 6]);
        this.rTu();
      }
    };
  }
  OnStart() {
    var e = this.SpecialSkillComponent.Entity;
    this.Hte = e.GetComponent(3);
    this.oRe = e.GetComponent(45);
    this.Lie = e.GetComponent(215);
    this.cBe = e.GetComponent(40);
    this.$zo = e.GetComponent(220);
    this.C51 = e.GetComponent(25);
    this.zIu = e.GetComponent(306);
    this.aeu = e.GetComponent(238);
    this.UBu = e.GetComponent(104);
    this.yqu = e.GetComponent(98);
    this.EAu = [];
    var t = CommonParamById_1.configCommonParamById.GetStringArrayConfig("KatixiyaChangeRoleResetMorphTags");
    if (t) {
      for (const i of t) {
        this.EAu.push(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i));
      }
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBeforeChangeRole, this.lF1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnExecuteAfterSetPlotMode, this.IAu);
    EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.tTu);
    EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.OnBeforeCharActionWithTarget, this.oTu);
    EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.CharOnRoleDeadEnd, this.dHu);
    EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.CharOnRevive, this.g7r);
    EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.OnCharacterMorphTypeChanged, this._7_);
    EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.OnBeforeCharacterMorphTypeChanged, this.G5u);
    EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.OnBeforeSkillSimulateMontage, this.dZu);
    this.Lpd = this.Lie?.ListenForTagAddOrRemove(262865373, this.Ppd);
  }
  OnEnd() {
    var e = this.SpecialSkillComponent.Entity;
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBeforeChangeRole, this.lF1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnExecuteAfterSetPlotMode, this.IAu);
    EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.tTu);
    EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.OnBeforeCharActionWithTarget, this.oTu);
    EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.CharOnRoleDeadEnd, this.dHu);
    EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.CharOnRevive, this.g7r);
    EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.OnCharacterMorphTypeChanged, this._7_);
    EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.OnBeforeCharacterMorphTypeChanged, this.G5u);
    EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.OnBeforeSkillSimulateMontage, this.dZu);
    this.Lpd?.EndTask();
    this.Lpd = undefined;
    this.jm();
    this.eNu.clear();
  }
  OnActivate() {
    var e = this.zIu?.GetMorphType();
    if (e !== undefined) {
      this.RefreshNoUpdateMeshes(e);
    }
  }
  jm() {
    if (this.wqu) {
      TimerSystem_1.TimerSystem.Remove(this.wqu);
      this.wqu = undefined;
    }
  }
  rTu(e = true) {
    if (this.zIu?.IsMorphing()) {
      for (const t of katixiyaMorphBuffs) {
        if (this.$zo?.HasBuff(t)) {
          this.$zo.RemoveBuff(t, -1, "SpecialSkillKatixiya.ResetMorph");
        }
      }
      if (e) {
        this.aeu?.AddCue(KATIXIYA_MORPH_CUE_ID, {
          Instant: true
        });
      }
    }
  }
  nTu(e) {
    var t;
    if (!this.ZIu) {
      t = CommonParamById_1.configCommonParamById.GetIntArrayConfig("KatixiyaResetMorphSkills") ?? [];
      this.ZIu = [...t];
    }
    return this.ZIu.includes(e);
  }
  sTu(e) {
    var t;
    if (!this.eTu) {
      t = CommonParamById_1.configCommonParamById.GetIntArrayConfig("KatixiyaNotResetMorphSkills") ?? [];
      this.eTu = [...t];
    }
    return this.eTu.includes(e);
  }
  iTu(t) {
    var e;
    var i = this.cBe?.GetSkill(t);
    let s = i?.SkillInfo;
    if (!s) {
      if (e = ConfigManager_1.ConfigManager.WorldConfig.GetRoleCommonSkillInfo()) {
        s = DataTableUtil_1.DataTableUtil.GetDataTableRow(e, t.toString());
      }
    }
    if (!s) {
      return false;
    }
    let a = false;
    if (this.nTu(t)) {
      a = true;
    } else if (this.sTu(t) || s.GroupId !== BaseSkillComponent_1.SKILL_GROUP_MAIN) {
      a = false;
    } else if (s.SkillGenre === 10) {
      a = true;
    }
    var h = !!this.zIu?.IsMorphing() && !a;
    if (i && s.MontagePaths.Num() > 0) {
      var o = s.MontagePaths;
      for (let e = 0; e < o.Num(); ++e) {
        var n = o.Get(e);
        var r = i.GetMontageByIndex(e);
        var l = h ? this.zIu?.GetMontageByName(n) : this.C51?.GetMontageByName(n, false);
        if (r && l && r !== l || !r && l) {
          i.SetMontageByIndex(e, l);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Battle", 67, "[SpecialSkillKatixiya]替换技能动画", ["SkillId", t], ["MontageName", n], ["LoadedMontage", r], ["NeedMontage", l]);
          }
        } else if (r && !l) {
          if (h) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Battle", 67, "[SpecialSkillKatixiya]变身状态下不存在技能动画", ["SkillId", t], ["MontageName", n], ["LoadedMontage", r], ["NeedMontage", l]);
            }
            a = true;
          } else if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Battle", 67, "[SpecialSkillKatixiya]加载的技能动画有异常", ["SkillId", t], ["MontageName", n], ["LoadedMontage", r], ["NeedMontage", l]);
          }
        }
      }
    }
    return a;
  }
  RefreshNoUpdateMeshes(t) {
    if (IS_ENABLE_OPTIMIZE) {
      this.eNu.clear();
      var i = this.Hte.Actor.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
      for (let e = 0; e < i.Num(); e++) {
        var s = i.Get(e);
        var a = s.GetName();
        if (t === 0) {
          if (fuludelisiMeshNames.includes(a)) {
            this.eNu.add(s);
          }
        } else if (t === 1 && katixiyaMeshNames.includes(a)) {
          this.eNu.add(s);
        }
      }
      this.oRe?.SetNoUpdateMeshes(this.eNu);
      this.eNu.clear();
    }
  }
  F5u() {
    var e = this.cBe?.CurrentSkill;
    if (e) {
      e = e.GetLoadedMontages();
      if (e) {
        var t = this.oRe?.MainAnimInstance;
        if (t) {
          for (const i of e) {
            if (t.Montage_IsPlaying(i)) {
              this.cBe?.StopGroup1Skill("形态变化时存在正在播放的技能动画");
              break;
            }
          }
        }
      }
    }
  }
}
exports.SpecialSkillKatixiya = SpecialSkillKatixiya;
//# sourceMappingURL=SpecialSkillKatixiya.js.map