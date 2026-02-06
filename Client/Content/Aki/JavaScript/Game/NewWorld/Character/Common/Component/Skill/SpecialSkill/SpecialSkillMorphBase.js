"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialSkillMorphBase = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../../../../Core/Define/ConfigCommon/CommonParamById");
const GameplayTagUtils_1 = require("../../../../../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const CombatLog_1 = require("../../../../../../Utils/CombatLog");
const CharacterUnifiedStateTypes_1 = require("../../Abilities/CharacterUnifiedStateTypes");
const BaseSkillComponent_1 = require("../BaseSkillComponent");
const SpecialSkillBase_1 = require("./SpecialSkillBase");
class SpecialSkillMorphBase extends SpecialSkillBase_1.SpecialSkillBase {
  constructor() {
    super(...arguments);
    this.ActorComp = undefined;
    this.AnimComp = undefined;
    this.MorphComp = undefined;
    this.SkillComp = undefined;
    this.MontageComp = undefined;
    this.BuffComp = undefined;
    this.CueComp = undefined;
    this.TagComp = undefined;
    this.RoleQteComp = undefined;
    this.GlideStateListener = undefined;
    this.IsEnableOptimize = true;
    this.OnBeforeChangeRole = (e, i) => {
      if (!this.RoleQteComp?.IsInQte) {
        if ((e = this.ShouldResetMorphOnChangeRole(e, i)) !== undefined) {
          this.LogResetMorph(3, ["TagId", e]);
          this.ResetMorph();
        }
      }
    };
    this.OnCharBeforeSkill = (e, i) => {
      if (this.ShouldResetMorphBeforeSkill(e)) {
        this.LogResetMorph(0, ["SkillId", e]);
        this.ResetMorph();
      }
    };
    this.OnBeforeCharAction = e => {
      if (this.MorphComp?.IsMorphing()) {
        this.LogResetMorph(1, ["ActionType", e]);
        this.ResetMorph();
      }
    };
    this.OnRoleDeadEnd = () => {
      if (this.MorphComp?.IsMorphing()) {
        this.LogResetMorph(4);
        this.ResetMorph(false);
      }
    };
    this.OnRoleRevive = () => {
      if (this.MorphComp?.IsMorphing()) {
        this.LogResetMorph(5);
        this.ResetMorph(false);
      }
    };
    this.OnExecuteAfterSetPlotMode = () => {
      if (this.ShouldResetMorphOnPlotMode()) {
        this.LogResetMorph(2);
        this.ResetMorph();
      }
    };
    this.OnCharacterMorphTypeChanged = (e, i, t) => {
      this.RefreshNoUpdateMeshes(i);
    };
    this.OnBeforeSkillSimulateMontage = (e, i, t, s) => {
      if (!this.ActorComp?.IsRoleAndCtrlByMe) {
        this.SyncRemoteSkillMontage(i);
      }
    };
    this.OnGlideStateChanged = (e, i) => {
      if (i && this.MorphComp?.IsMorphing() && this.SpecialSkillComponent.Entity.Id === ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity?.Id) {
        this.LogResetMorph(6);
        this.ResetMorph();
      }
    };
  }
  get LogPrefix() {
    return this.constructor.name;
  }
  OnStart() {
    var e = this.SpecialSkillComponent.Entity;
    this.ActorComp = e.GetComponent(3);
    this.AnimComp = e.GetComponent(47);
    this.MorphComp = e.GetComponent(308);
    this.SkillComp = e.GetComponent(42);
    this.MontageComp = e.GetComponent(25);
    this.BuffComp = e.GetComponent(222);
    this.CueComp = e.GetComponent(238);
    this.TagComp = e.GetComponent(217);
    this.RoleQteComp = e.GetComponent(106);
    this.RegisterMorphEvents();
  }
  OnEnd() {
    this.UnregisterMorphEvents();
    this.GlideStateListener?.EndTask();
    this.GlideStateListener = undefined;
  }
  OnActivate() {
    var e = this.MorphComp?.GetMorphType();
    if (e !== undefined) {
      this.RefreshNoUpdateMeshes(e);
    }
  }
  RegisterMorphEvents() {
    var e = this.SpecialSkillComponent.Entity;
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBeforeChangeRole, this.OnBeforeChangeRole);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnExecuteAfterSetPlotMode, this.OnExecuteAfterSetPlotMode);
    EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.OnCharBeforeSkill);
    EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.OnBeforeCharActionWithTarget, this.OnBeforeCharAction);
    EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.CharOnRoleDeadEnd, this.OnRoleDeadEnd);
    EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.CharOnRevive, this.OnRoleRevive);
    EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.OnCharacterMorphTypeChanged, this.OnCharacterMorphTypeChanged);
    EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.OnBeforeSkillSimulateMontage, this.OnBeforeSkillSimulateMontage);
    this.GlideStateListener = this.TagComp?.ListenForTagAddOrRemove(262865373, this.OnGlideStateChanged);
  }
  UnregisterMorphEvents() {
    var e = this.SpecialSkillComponent.Entity;
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBeforeChangeRole, this.OnBeforeChangeRole);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnExecuteAfterSetPlotMode, this.OnExecuteAfterSetPlotMode);
    EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.OnCharBeforeSkill);
    EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.OnBeforeCharActionWithTarget, this.OnBeforeCharAction);
    EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.CharOnRoleDeadEnd, this.OnRoleDeadEnd);
    EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.CharOnRevive, this.OnRoleRevive);
    EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.OnCharacterMorphTypeChanged, this.OnCharacterMorphTypeChanged);
    EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.OnBeforeSkillSimulateMontage, this.OnBeforeSkillSimulateMontage);
  }
  ResetMorph(e = true) {
    if (this.MorphComp?.IsMorphing()) {
      for (const i of SpecialSkillMorphBase.pfg(this.MorphBuffsConfigKey)) {
        if (this.BuffComp?.HasBuff(i)) {
          this.BuffComp.RemoveBuff(i, -1, this.LogPrefix + ".ResetMorph");
        }
      }
      if (e) {
        for (const t of SpecialSkillMorphBase.vfg(this.MorphCueIdConfigKey)) {
          if (t > 0) {
            this.CueComp?.AddCue(t, {
              Instant: true
            });
          }
        }
      }
    }
  }
  RefreshNoUpdateMeshes(e) {
    if (this.IsEnableOptimize) {
      var i = this.ActorComp?.Actor;
      if (i && this.AnimComp) {
        SpecialSkillMorphBase.eNu.clear();
        var t = e === 0 ? SpecialSkillMorphBase.ong(this.Morph1SubMeshConfigKey) : SpecialSkillMorphBase.ong(this.Morph0SubMeshConfigKey);
        if (t.length > 0) {
          var s = i.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
          for (let e = 0; e < s.Num(); e++) {
            var h = s.Get(e);
            var a = h.GetName();
            if (t.includes(a)) {
              SpecialSkillMorphBase.eNu.add(h);
            }
          }
        }
        this.AnimComp.SetNoUpdateMeshes(SpecialSkillMorphBase.eNu);
        SpecialSkillMorphBase.eNu.clear();
      }
    }
  }
  LogResetMorph(e, ...i) {
    CombatLog_1.CombatLog.Info("Skill", this.SpecialSkillComponent.Entity, "还原形态", ["Reason", e], ...i);
  }
  ShouldResetMorphBeforeSkill(e) {
    if (!this.SkillComp) {
      return false;
    }
    var i = this.SkillComp.GetSkillInfo(e);
    if (!i) {
      return false;
    }
    let t = false;
    if (SpecialSkillMorphBase.zog(e, this.ResetMorphSkillsConfigKey, SpecialSkillMorphBase.Jog)) {
      t = true;
    } else if (SpecialSkillMorphBase.zog(e, this.NotResetMorphSkillsConfigKey, SpecialSkillMorphBase.Zog) || i.GroupId !== BaseSkillComponent_1.SKILL_GROUP_MAIN) {
      t = false;
    } else if (i.SkillGenre === 10) {
      t = true;
    }
    var s = Boolean(this.MorphComp?.IsMorphing()) && !t;
    var h = this.SkillComp.GetSkill(e);
    this.SkillComp.Entity;
    if (h && i.MontagePaths.Num() > 0) {
      var a = i.MontagePaths;
      for (let e = 0; e < a.Num(); ++e) {
        var r = a.Get(e);
        var o = h.GetMontageByIndex(e);
        var r = s ? this.MorphComp?.GetMontageByName(r) : this.MontageComp?.GetMontageByName(r, false);
        if (o && r && o !== r || !o && r) {
          h.SetMontageByIndex(e, r);
        } else if (o && !r && s) {
          t = true;
        }
      }
    }
    return t;
  }
  ShouldResetMorphOnChangeRole(e, i) {
    if (e.Entity?.Id === this.SpecialSkillComponent.Entity.Id && this.MorphComp?.IsMorphing()) {
      e = i?.Entity?.GetComponent(186)?.PositionState;
      if (e !== CharacterUnifiedStateTypes_1.ECharPositionState.Ground) {
        e = SpecialSkillMorphBase.yfg(SpecialSkillMorphBase.rng, this.ChangeRoleResetMorphTagsConfigKey);
        if (e.length > 0) {
          var t = i?.Entity?.GetComponent(217);
          for (const s of e) {
            if (t?.HasTag(s)) {
              return s;
            }
          }
        }
      }
    }
  }
  ShouldResetMorphOnPlotMode() {
    var e;
    var i = ModelManager_1.ModelManager.PlotModel?.PlotConfig;
    return !!i && !(e = i.PlotLevel, i = i.ShouldSwitchMainRole, !e) && e === "LevelC" && !i && ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity?.Id === this.SpecialSkillComponent.Entity.Id && !!this.MorphComp?.IsMorphing();
  }
  SyncRemoteSkillMontage(e) {
    var i = this.SkillComp?.GetSkill(e);
    var e = i?.SkillInfo;
    if (i && e) {
      var t = this.MorphComp?.IsMorphing() ?? false;
      if (e.MontagePaths.Num() > 0) {
        var s = e.MontagePaths;
        for (let e = 0; e < s.Num(); ++e) {
          var h = s.Get(e);
          var a = i.GetMontageByIndex(e);
          var h = t ? this.MorphComp?.GetMontageByName(h) : this.MontageComp?.GetMontageByName(h, false);
          if (a && h && a !== h || !a && h) {
            i.SetMontageByIndex(e, h);
            this.SkillComp?.Entity;
          }
        }
      }
    }
  }
  static tng(e, i) {
    if (i) {
      if (!e.has(i)) {
        e.set(i, [...(CommonParamById_1.configCommonParamById.GetIntArrayConfig(i) ?? [])]);
      }
      return e.get(i);
    } else {
      return [];
    }
  }
  static zog(e, i, t) {
    return !!i && this.tng(t, i).includes(e);
  }
  static yfg(e, i) {
    if (!i) {
      return [];
    }
    if (!e.has(i)) {
      var t = CommonParamById_1.configCommonParamById.GetStringArrayConfig(i);
      var s = [];
      if (t) {
        for (const h of t) {
          s.push(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(h));
        }
      }
      e.set(i, s);
    }
    return e.get(i);
  }
  static ong(e) {
    var i;
    if (e) {
      if (!this.nng.has(e)) {
        i = CommonParamById_1.configCommonParamById.GetStringArrayConfig(e);
        this.nng.set(e, i ? [...i] : []);
      }
      return this.nng.get(e);
    } else {
      return [];
    }
  }
  static pfg(e) {
    if (e) {
      if (!this.Sfg.has(e)) {
        this.Sfg.set(e, [...(CommonParamById_1.configCommonParamById.GetIntArrayConfig(e) ?? [])]);
      }
      return this.Sfg.get(e);
    } else {
      return [];
    }
  }
  static vfg(e) {
    if (e) {
      if (!this.Mfg.has(e)) {
        this.Mfg.set(e, [...(CommonParamById_1.configCommonParamById.GetIntArrayConfig(e) ?? [])]);
      }
      return this.Mfg.get(e);
    } else {
      return [];
    }
  }
}
(exports.SpecialSkillMorphBase = SpecialSkillMorphBase).Jog = new Map();
SpecialSkillMorphBase.Zog = new Map();
SpecialSkillMorphBase.rng = new Map();
SpecialSkillMorphBase.nng = new Map();
SpecialSkillMorphBase.Sfg = new Map();
SpecialSkillMorphBase.Mfg = new Map();
SpecialSkillMorphBase.eNu = new Set(); //# sourceMappingURL=SpecialSkillMorphBase.js.map