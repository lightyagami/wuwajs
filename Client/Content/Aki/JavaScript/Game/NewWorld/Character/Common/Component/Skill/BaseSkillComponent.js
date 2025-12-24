"use strict";

var BaseSkillComponent_1;
var __decorate = this && this.__decorate || function (t, i, e, s) {
  var l;
  var n = arguments.length;
  var o = n < 3 ? i : s === null ? s = Object.getOwnPropertyDescriptor(i, e) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(t, i, e, s);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (l = t[r]) {
        o = (n < 3 ? l(o) : n > 3 ? l(i, e, o) : l(i, e)) || o;
      }
    }
  }
  if (n > 3 && o) {
    Object.defineProperty(i, e, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseSkillComponent = exports.SkillRotateTarget = exports.AnimNotifyStateSkillRotateStyle = exports.SKILL_GROUP_MAIN = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../../Core/Common/Info");
const Log_1 = require("../../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../../Core/Common/Stats");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const Entity_1 = require("../../../../../../Core/Entity/Entity");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const DataTableUtil_1 = require("../../../../../../Core/Utils/DataTableUtil");
const Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../../../GlobalData");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const FormationAttributeController_1 = require("../../../../../Module/Abilities/FormationAttributeController");
const SkillMessageController_1 = require("../../../../../Module/CombatMessage/SkillMessageController");
const SceneTeamController_1 = require("../../../../../Module/SceneTeam/SceneTeamController");
const PreloadDefine_1 = require("../../../../../Preload/PreloadDefine");
const ActorUtils_1 = require("../../../../../Utils/ActorUtils");
const CombatLog_1 = require("../../../../../Utils/CombatLog");
const EffectUtil_1 = require("../../../../../Utils/EffectUtil");
const FightDebugUtil_1 = require("../../../FightDebugUtil");
const BaseAbilityComponent_1 = require("../Abilities/BaseAbilityComponent");
const CharacterBuffIds_1 = require("../Abilities/CharacterBuffIds");
const Skill_1 = require("./Skill");
const SkillBehaviorAction_1 = require("./SkillBehavior/SkillBehaviorAction");
const SkillBehaviorCondition_1 = require("./SkillBehavior/SkillBehaviorCondition");
const SkillUtils_1 = require("./SkillUtils");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
exports.SKILL_GROUP_MAIN = 1;
const HIT_CASE_SOCKET_NAME = "HitCase";
const SKILL_GROUP_INDEX = 0;
const interruptTag = -242791826;
const NEXT_BEGIN_SKILL_NAME = ".NextFrame";
class AnimNotifyStateSkillRotateStyle {
  constructor() {
    this.IsUseAnsRotateOffset = false;
    this.AnsRotateOffset = 0;
    this.PauseRotateThreshold = 0;
    this.ResumeRotateThreshold = 0;
    this.IsPaused = false;
  }
  Reset() {
    this.IsUseAnsRotateOffset = false;
    this.AnsRotateOffset = 0;
    this.PauseRotateThreshold = 0;
    this.ResumeRotateThreshold = 0;
    this.IsPaused = false;
  }
}
exports.AnimNotifyStateSkillRotateStyle = AnimNotifyStateSkillRotateStyle;
class SkillRotateTarget {
  constructor() {
    this.Target = undefined;
    this.Type = 0;
  }
}
exports.SkillRotateTarget = SkillRotateTarget;
let BaseSkillComponent = BaseSkillComponent_1 = class BaseSkillComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.cn_ = new Map();
    this.sZr = false;
    this.LoadedSkills = new Map();
    this.aZr = new Map();
    this.hZr = new Set();
    this.Cn_ = false;
    this.StartOnGivenList = [];
    this.cel = [];
    this.lZr = undefined;
    this._Zr = undefined;
    this.w6a = new Map();
    this.DtSkillInfoExtraList = undefined;
    this.DtSkillInfoMapForDebug = new Map();
    this.VFm = false;
    this.DtBulletInfo = undefined;
    this.DtBulletInfoExtraList = undefined;
    this.DtHitEffect = undefined;
    this.DtHitEffectExtraList = undefined;
    this.EIe = undefined;
    this.Bzr = undefined;
    this.TagComp = undefined;
    this.BuffComp = undefined;
    this.AbilityComp = undefined;
    this.ActorComp = undefined;
    this.uZr = undefined;
    this.LockOnComp = undefined;
    this.mZr = undefined;
    this.bre = undefined;
    this.vHr = undefined;
    this.dZr = undefined;
    this.FightStateComp = undefined;
    this.StateMachineComp = undefined;
    this.MontageComp = undefined;
    this.qk_ = undefined;
    this.oxr = Vector_1.Vector.Create();
    this.TmpVector = Vector_1.Vector.Create();
    this.TmpRotator = Rotator_1.Rotator.Create();
    this.TmpTransform = Transform_1.Transform.Create();
    this.CZr = t => {
      if (this.SkillTarget?.Id === t.Id) {
        this.SkillTarget = undefined;
      }
    };
    this.bpr = t => {
      this.SkillTarget = undefined;
      this.SkillTargetSocket = "";
      if (this.EIe?.IsRole() && this.ActorComp.IsAutonomousProxy) {
        if (!t || !!ModelManager_1.ModelManager.LevelLoadingModel?.IsLoading) {
          this.StopAllSkills("BaseSkillComponent.OnTeleportStart");
        }
      }
    };
    this.Oul = () => {
      if (this.EIe?.IsRole() && this.ActorComp.IsAutonomousProxy) {
        this.StopAllSkills("BaseSkillComponent.OnTeleportOpenLoadingEnd");
      }
    };
    this.gZr = () => {
      this.StopGroup1Skill("受击打断技能");
    };
    this.jFm = () => {
      this.VFm = true;
    };
    this.OnSwitchControl = t => {
      for (var [i, e] of this.LoadedSkills) {
        if (e.Active) {
          CombatLog_1.CombatLog.Info("Skill", this.Entity, "切换控制权，结束当前技能", ["技能Id", i]);
          if (e.IsSimulated) {
            this.SimulateEndSkill(i);
          } else {
            this.EndSkill(i, "BaseSkillComponent.OnSwitchControl");
          }
        }
      }
    };
    this.vZr = false;
    this.IsMainSkillReadyEnd = true;
    this.SkillTarget = undefined;
    this.SkillTargetSocket = "";
    this.MZr = t => {
      var i = this.CurrentSkill;
      if (i && i.SkillInfo.SkillTarget.HateOrLockOnChanged) {
        this.SkillTarget = ModelManager_1.ModelManager.CharacterModel.GetHandle(t);
        this.SkillTargetSocket = "";
      }
    };
    this.ZXr = t => {
      if (this.SkillTarget?.Id === t) {
        this.AUn();
      }
    };
    this.zpe = (t, i) => {
      if (this.SkillTarget === i) {
        this.AUn();
      }
    };
    this.I3r = t => {
      t = t.GetComponent(40);
      this.SkillTarget = t.SkillTarget;
      this.SkillTargetSocket = t.SkillTargetSocket;
    };
    this.Vma = () => {
      this.StopGroup1Skill("电梯开始移动");
    };
    this.SkillCanRotateInternal = false;
    this.SZr = undefined;
    this.SkillRotateSpeedInternal = 0;
    this.IZr = undefined;
    this.SkillRotateToTargetInternal = false;
    this.IgnoreSocketName = new Set();
    this.UZr = 0;
    this.cBn = new Map();
  }
  Vh_(t) {
    t = this.GetSkillInfo(t);
    return this.Cn_ && t?.GroupId === exports.SKILL_GROUP_MAIN;
  }
  jh_(t, i) {
    if (this.GetSkillInfo(t)?.GroupId === exports.SKILL_GROUP_MAIN) {
      this.Cn_ = i;
    }
  }
  get CurrentSkill() {
    return this.aZr.get(exports.SKILL_GROUP_MAIN)?.[SKILL_GROUP_INDEX];
  }
  get DtSkillInfo() {
    return this._Zr;
  }
  set DtSkillInfo(t) {
    this._Zr = t;
  }
  GetSkillIdByName(t) {
    return this.w6a.get(t);
  }
  IsSkillMontageInvalid(t) {
    t = this.MontageComp?.GetMontageInfo(t);
    return !!t && (t.SkillId ?? 0) !== (this.CurrentSkill?.SkillId ?? 0);
  }
  GetSkillInfo(t) {
    if (this._Zr && t !== 0) {
      if (!GlobalData_1.GlobalData.IsPlayInEditor) {
        var e = this.LoadedSkills.get(t);
        if (e) {
          return e.SkillInfo;
        }
      }
      var s = t.toString();
      let i = DataTableUtil_1.DataTableUtil.GetDataTableRow(this._Zr, s);
      if (this.DtSkillInfoExtraList) {
        for (const r of this.DtSkillInfoExtraList) {
          var l = DataTableUtil_1.DataTableUtil.GetDataTableRow(r, s);
          if (l) {
            i = l;
            break;
          }
        }
      }
      if (!(i = this.DtSkillInfoMapForDebug && (e = this.DtSkillInfoMapForDebug.get(FightDebugUtil_1.FightDebugUtil.DtSkillTypeForDebug), e = DataTableUtil_1.DataTableUtil.GetDataTableRow(e, s)) ? e : i)) {
        let t = undefined;
        var e = this.EIe.GetEntityType();
        if (e === Protocol_1.Aki.Protocol.kks.Proto_Player) {
          t = ConfigManager_1.ConfigManager.WorldConfig.GetRoleCommonSkillInfo();
        } else if (e === Protocol_1.Aki.Protocol.kks.Proto_Monster) {
          t = ConfigManager_1.ConfigManager.WorldConfig.GetMonsterCommonSkillInfo();
        } else if (e === Protocol_1.Aki.Protocol.kks.Proto_Vision) {
          t = ConfigManager_1.ConfigManager.WorldConfig.GetVisionCommonSkillInfo();
        }
        if (t) {
          i = DataTableUtil_1.DataTableUtil.GetDataTableRow(t, s);
        }
      }
      if (!i) {
        for (const h of this.EIe.CustomServerEntityIds) {
          var n = ModelManager_1.ModelManager.CreatureModel.GetEntity(h);
          if (n) {
            i = n.Entity?.GetComponent(40)?.GetSkillInfo(t);
            break;
          }
        }
      }
      if (!i) {
        for (const a of this.EIe.VisionServerEntityIds) {
          var o = ModelManager_1.ModelManager.CreatureModel.GetEntity(a);
          if (o) {
            i = o.Entity?.GetComponent(40)?.GetSkillInfo(t);
            break;
          }
        }
      }
      if (!i) {
        if (this.EIe.VisionControlCreatureDataId && (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.EIe.VisionControlCreatureDataId))) {
          i = e.Entity?.GetComponent(40)?.GetSkillInfo(t);
        }
      }
      return i;
    }
  }
  GetSkill(t) {
    return this.LoadedSkills.get(t);
  }
  GetSkillMap() {
    return this.LoadedSkills;
  }
  GetPriority(t) {
    if (this.CheckIsLoaded()) {
      var i = this.GetSkill(t);
      if (i) {
        return i.InterruptLevel;
      }
      i = this.GetSkillInfo(t);
      if (i) {
        return i.InterruptLevel;
      }
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Character", 22, "没有该技能的打断等级", ["玩家id", this.Entity.Id], ["skillID", t]);
      }
    }
    return -1;
  }
  OnInitData() {
    this.SZr = new AnimNotifyStateSkillRotateStyle();
    this.IZr = new SkillRotateTarget();
    this.EIe = this.Entity.CheckGetComponent(0);
    this.ActorComp = this.Entity.CheckGetComponent(1);
    return true;
  }
  OnStart() {
    this.wZr();
    this.BZr();
    this.sZr = true;
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharOnEndPlay, this.CZr);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharOnRoleDead, this.ZXr);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveEntity, this.zpe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportStart, this.bpr);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportOpenLoadingEnd, this.Oul);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SetFightDtTypeForDebug, this.jFm);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharBeHitAnim, this.gZr);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharSwitchControl, this.OnSwitchControl);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.AiHateTargetChanged, this.MZr);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.I3r);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.ElevatorMove, this.Vma);
    return true;
  }
  OnInit() {
    this.Bzr = this.Entity.CheckGetComponent(181);
    this.TagComp = this.Entity.CheckGetComponent(215);
    this.AbilityComp = this.Entity.CheckGetComponent(17);
    this.BuffComp = this.Entity.GetComponent(183);
    this.uZr = this.Entity.GetComponent(16);
    this.LockOnComp = this.Entity.GetComponent(32);
    this.bre = this.Entity.GetComponent(48);
    this.mZr = this.Entity.GetComponent(101);
    this.vHr = this.Entity.GetComponent(131);
    this.dZr = this.Entity.GetComponent(218);
    this.FightStateComp = this.Entity.GetComponent(58);
    this.StateMachineComp = this.Entity.GetComponent(79);
    this.MontageComp = this.Entity.GetComponent(24);
    this.qk_ = this.Entity.GetComponent(230);
    return true;
  }
  OnDisable(t) {
    this.StopGroup1Skill(t);
  }
  OnTick(t) {
    var i = this.cel.shift();
    if (i?.NextSkillId) {
      this.BeginSkill(i?.NextSkillId, i);
    }
  }
  CheckIsLoaded() {
    if (!this.sZr) {
      CombatLog_1.CombatLog.Info("Skill", this.Entity, "SkillComponent没有Activate或已经End");
    }
    return this.sZr;
  }
  wZr() {
    this.qk_.PreloadSkillIds.forEach(t => {
      var i = this.GetSkillInfo(t);
      if (i) {
        this.OZr(t, i);
      }
    });
    for (const i of this.GetAllSkillId(5)) {
      var t = this.GetSkillInfo(i);
      if (t) {
        this.w6a.set(t.SkillName.toString(), i);
      }
    }
  }
  OZr(i, e) {
    if (!this.LoadedSkills.has(i) || this.VFm) {
      try {
        var t = new Skill_1.Skill();
        this.LoadedSkills.set(i, t);
        t.Initialize(i, e, this);
      } catch (t) {
        if (t instanceof Error) {
          CombatLog_1.CombatLog.ErrorWithStack("Skill", this.Entity, "加载技能异常", t, ["skillId", i], ["skillId", e?.SkillName], ["error", t.message]);
        } else {
          CombatLog_1.CombatLog.Error("Skill", this.Entity, "加载技能异常", ["skillId", i], ["skillId", e?.SkillName], ["error", t]);
        }
      }
    }
  }
  BZr() {
    ConfigManager_1.ConfigManager.BulletConfig.PreloadBulletData(this.Entity);
  }
  OnActivate() {
    var t;
    var i;
    var e = this.EIe.ComponentDataMap.get("Vys")?.Vys;
    if (!this.ActorComp.IsAutonomousProxy && e?.YIs) {
      for (const l of e.YIs) {
        if (l.dVn?.r5n && (i = MathUtils_1.MathUtils.LongToNumber(l.dVn.CVn), t = MathUtils_1.MathUtils.LongToBigInt(l.$8n), this.SimulatedBeginSkill(Number(l.dVn.r5n), i, l.dVn.gVn, l.dVn.n5n * 0.001, t)) && (SkillMessageController_1.SkillMessageController.AddSkillMessageId(t), l.lVn >= 0)) {
          i = MathUtils_1.MathUtils.LongToBigInt(l.hVn);
          this.SimulatePlayMontage(Number(l.dVn.r5n), l.lVn, l.vVn, l.XIs, l.QIs / 1000, i);
        }
      }
    }
    for (const n of this.StartOnGivenList) {
      var s = this.LoadedSkills.get(n);
      if (s) {
        if ((s = s.AbilityClass)?.IsChildOf(UE.Ga_Passive_C.StaticClass())) {
          this.AbilityComp.TryActivateAbilityByClass(s, false);
        } else {
          this.BeginSkill(n, {
            Reason: "BaseSkillComponent.StartOnGivenList"
          });
        }
      }
    }
    return !(this.StartOnGivenList.length = 0);
  }
  OnChangeTimeDilation(t) {
    for (const i of this.GetAllActivatedSkill()) {
      i.SetTimeDilation(this.vHr, t);
    }
  }
  OnEnd() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharOnEndPlay, this.CZr);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharOnRoleDead, this.ZXr);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveEntity, this.zpe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportStart, this.bpr);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportOpenLoadingEnd, this.Oul);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SetFightDtTypeForDebug, this.jFm);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharBeHitAnim, this.gZr);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharSwitchControl, this.OnSwitchControl);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.AiHateTargetChanged, this.MZr);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.I3r);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.ElevatorMove, this.Vma);
    this.IgnoreSocketName.clear();
    this.SZr.Reset();
    if (this.LoadedSkills) {
      for (const t of this.LoadedSkills.values()) {
        t.Clear();
      }
    }
    this.LoadedSkills.clear();
    this.vZr = false;
    this.IsMainSkillReadyEnd = true;
    this.SkillCanRotateInternal = false;
    this.SkillRotateToTargetInternal = false;
    this.SkillRotateSpeedInternal = 0;
    this.UZr = 0;
    return !(this.sZr = false);
  }
  OnClear() {
    return true;
  }
  AttachEffectToSkill(t, i, e, s) {
    var l;
    if (this.CheckIsLoaded() && (l = this.CurrentSkill)) {
      EffectUtil_1.EffectUtil.SetEffectTimeScale(t, this.vHr, this.TimeDilation);
      l.AttachEffect(t, i, e, s);
    }
  }
  kZr(t) {
    let i = 1;
    return i = this.Bzr && ((t = t.SkillInfo).SkillGenre === 0 ? i = this.Bzr.GetCurrentValue(EAttributeId.Proto_AutoAttackSpeed) * 0.0001 : t.SkillGenre === 1 && (i = this.Bzr.GetCurrentValue(EAttributeId.Proto_CastAttackSpeed) * 0.0001), i <= 0) ? 1 : i;
  }
  PlaySkillMontage(t, i, e, s) {
    var l = this.CurrentSkill;
    if (!l) {
      CombatLog_1.CombatLog.Error("Skill", this.Entity, "播放技能蒙太奇时，当前技能不存在", ["montageIndex", t]);
      return false;
    }
    if (l.IsSimulated) {
      CombatLog_1.CombatLog.Error("Skill", this.Entity, "播放技能蒙太奇时，当前技能是模拟技能", ["montageIndex", t]);
      return false;
    }
    this.OnBeforePlaySkillMontage();
    var n = this.kZr(l);
    var s = l.PlayMontage(t, n, i, e, s);
    if (s) {
      SkillMessageController_1.SkillMessageController.MontageRequest(this.Entity, 1, l.SkillId?.toString(), this.SkillTarget?.CreatureDataId ?? 0, t, n, i, e, l.MNc, l.MontageContextId);
    }
    return s;
  }
  PlaySkillMontageWithEndAbility(i, e, t, s) {
    var l = i.SkillInfo;
    if (l?.GroupId !== exports.SKILL_GROUP_MAIN) {
      CombatLog_1.CombatLog.Error("Skill", this.Entity, "非1组技能不能跳转蒙太奇", ["技能Id", i.SkillId], ["技能名", i.SkillName], ["MontageIndex", e]);
      return false;
    } else if (l?.SkillMode !== 0) {
      CombatLog_1.CombatLog.Error("Skill", this.Entity, "非Simple技能不能跳转蒙太奇", ["技能Id", i.SkillId], ["技能名", i.SkillName], ["MontageIndex", e]);
      return false;
    } else if (i.CurrentMontageIndex === e) {
      CombatLog_1.CombatLog.Error("Skill", this.Entity, "不能跳转同一个蒙太奇", ["技能Id", i.SkillId], ["技能名", i.SkillName], ["MontageIndex", e]);
      return false;
    } else {
      return this.PlaySkillMontage(e, t, s, t => {
        if (i.CurrentMontageIndex === e) {
          this.DoSkillEnd(i);
        }
      });
    }
  }
  EndOwnerAndFollowSkills() {
    this.StopAllSkills("BaseSkillComponent.EndOwnerAndFollowSkills");
    var t = this.Entity.GetComponent(59)?.FollowIds;
    if (t) {
      for (const e of t) {
        var i = EntitySystem_1.EntitySystem.Get(e)?.GetComponent(40);
        if (i) {
          i.StopAllSkills("BaseSkillComponent.EndOwnerAndFollowSkills");
        }
      }
    }
  }
  StopAllSkills(t) {
    if (this.CheckIsLoaded()) {
      this.cel.length = 0;
      for (const i of this.GetAllActivatedSkill()) {
        this.FZr(i, t);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CharStopAllSkills, this.Entity.Id, t);
    }
  }
  StopGroup1Skill(i) {
    if (this.CheckIsLoaded()) {
      let t = this.cel.length;
      while (t--) {
        var e = this.cel[t];
        if (this.GetSkillInfo(e.NextSkillId).GroupId === exports.SKILL_GROUP_MAIN) {
          this.cel.splice(t, 1);
        }
      }
      var s = this.CurrentSkill;
      if (s) {
        this.FZr(s, i);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CharStopGroup1Skill, this.Entity.Id, i);
    }
  }
  EndSkill(t, i) {
    if (this.CheckIsLoaded() && (t = this.LoadedSkills.get(t))?.Active) {
      this.VZr(t, i);
    }
  }
  HZr(t, i, e) {
    var s = t.SkillInfo.GroupId;
    var l = t.InterruptLevel;
    return this.DoCheckInterrupt(s, l, i, e, t);
  }
  DoCheckInterrupt(t, i, e = [], s = [], l) {
    let n = true;
    if (t === exports.SKILL_GROUP_MAIN) {
      var o;
      var r;
      var h;
      var a = this.CurrentSkill;
      if (a) {
        S = a.InterruptLevel < i;
        o = a.InterruptLevel === i && this.vZr;
        r = this.IsMainSkillReadyEnd;
        h = ModelManager_1.ModelManager.SkillCdModel?.SkillDebugMode ?? false;
        if (S || o || r || h) {
          e.push(a);
        } else {
          n = false;
          s.push(a.InterruptLevel.toString());
          s.push(i.toString());
          s.push(this.vZr.toString());
          s.push(this.IsMainSkillReadyEnd.toString());
        }
      }
    } else {
      var S = this.aZr.get(t);
      if (S) {
        for (const _ of S) {
          if (_ === l) {
            e.push(_);
          }
        }
      }
    }
    if (!n) {
      e.length = 0;
    }
    return n;
  }
  FZr(t, i) {
    if (t?.Active) {
      if (t.IsSimulated) {
        this.SimulateEndSkill(t.SkillId);
      } else {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CharInterruptSkill, this.Entity.Id, t.SkillId);
        this.VZr(t, i);
      }
    }
  }
  VZr(t, i) {
    BaseSkillComponent_1.Zzr.Start();
    SkillUtils_1.SkillUtils.Log(0, 0, this.Entity, "BaseSkillComponent.RequestEndSkill", ["结束技能ID", t.SkillId], ["结束技能名称", t.SkillName], ["Reason", i], ["CanInterrupt", this.vZr], ["ReadyEnd", this.IsMainSkillReadyEnd], ["InterruptLevel", t.InterruptLevel]);
    this.dZr?.ResetMultiSkills(t.SkillId);
    this.dZr?.ResetCdDelayTime(t.SkillId);
    i = t.SkillInfo.SkillMode;
    if (i === 1) {
      if (t.ActiveAbility?.IsValid()) {
        t.ActiveAbility.K2_EndAbility();
      } else {
        CombatLog_1.CombatLog.Error("Skill", this.Entity, "[BaseSkillComponent.RequestEndSkill]技能结束失败，找不到GA（判断一下是否被动GA，如果是，不能主动执行）", ["技能ID", t.SkillId], ["技能名称", t.SkillName]);
      }
    } else if (i === 0) {
      t.RequestStopMontage(true);
    }
    BaseSkillComponent_1.Zzr.Stop();
  }
  IsSkillGenreForbidden(t) {
    switch (t.SkillGenre) {
      case 0:
        return this.TagComp.HasTag(866007727);
      case 1:
        return this.TagComp.HasTag(443489183);
      case 2:
        return this.TagComp.HasTag(495657548);
      case 3:
        return this.TagComp.HasTag(-592555498);
      case 4:
        return this.TagComp.HasTag(-373980873);
      case 5:
        break;
      case 6:
        return this.TagComp.HasTag(-1390464883);
      case 7:
        return this.TagComp.HasTag(1072084846);
      case 8:
        break;
      case 9:
        return this.TagComp.HasTag(1195493782);
      case 10:
        return this.TagComp.HasTag(283451623);
      case 11:
        return this.TagComp.HasTag(-1936884442);
    }
    return false;
  }
  WZr(t, i) {
    var e;
    var s;
    var l = t.SkillInfo;
    if (this.ActorComp.IsAutonomousProxy || l.AutonomouslyBySimulate) {
      if (this.TagComp.HasTag(-1388400236) && !l.SkillCanBeginWithoutControl && l.GroupId === exports.SKILL_GROUP_MAIN) {
        return "角色处于不可控制状态";
      } else if (this.TagComp.HasTag(1008164187)) {
        return "角色处于死亡状态";
      } else if (this.uZr?.IsFrozen() && l.GroupId === exports.SKILL_GROUP_MAIN) {
        return "角色处于冰冻状态";
      } else if (this.IsSkillGenreForbidden(l)) {
        return "该类别技能被临时禁止";
      } else if (t.AbilityClass && t.AbilityClass.IsChildOf(UE.Ga_Passive_C.StaticClass()) && !ModelManager_1.ModelManager.SkillCdModel?.SkillDebugMode) {
        return "策划可能误把被动GA放在普攻0技能组里";
      } else if (this.IsSkillInCd(t.SkillId)) {
        return "技能处于CD中";
      } else if (l.StrengthCost !== 0 && FormationAttributeController_1.FormationAttributeController.GetValue(1) <= 1) {
        return "体力不足";
      } else if (this.dZr?.IsMultiSkill(l) && !this.dZr.CanStartMultiSkill(t)) {
        return "多段技能启动失败";
      } else {
        s = this.EIe.GetEntityType();
        e = this.bre?.AiController?.IsWaitingSwitchControl();
        if (s === Protocol_1.Aki.Protocol.kks.Proto_Monster && !l.AutonomouslyBySimulate && e) {
          return "在等待切换控制权期间，不允许释放普通技能";
        } else if (this.HZr(t, i, s = [])) {
          return "";
        } else {
          return "技能打断失败[" + s.join(",") + "]";
        }
      }
    } else {
      return "非主控无权限释放技能";
    }
  }
  KZr(t) {
    if (!this.LoadedSkills.has(t) && PreloadDefine_1.PreloadSetting.UseNewPreload || this.VFm) {
      this.qk_.LoadSkillAsync(t);
      this.qk_.FlushSkill(t);
      var i = this.GetSkillInfo(t);
      if (!i) {
        return;
      }
      this.OZr(t, i);
      SkillUtils_1.SkillUtils.Log(0, 0, this.Entity, "BaseSkillComponent.TryGetSkill", ["技能Id", t], ["技能名", i.SkillName.toString()]);
    }
    return this.LoadedSkills.get(t);
  }
  async qj1(t) {
    if (!this.LoadedSkills.has(t) && PreloadDefine_1.PreloadSetting.UseNewPreload || this.VFm) {
      var i = await this.qk_.LoadSkillAsync(t, 105);
      if (i !== 3 && (CombatLog_1.CombatLog.Error("Skill", this.Entity, "没有预加载数据", ["技能Id", t]), !Info_1.Info.IsPlayInEditor)) {
        return;
      }
      if (!this.Valid) {
        return;
      }
      i = this.GetSkillInfo(t);
      if (!i) {
        return;
      }
      this.OZr(t, i);
      SkillUtils_1.SkillUtils.Log(0, 0, this.Entity, "BaseSkillComponent.TryGetSkillAsync", ["技能Id", t], ["技能名", i.SkillName.toString()]);
    }
    return this.LoadedSkills.get(t);
  }
  BeginSkillNextFrame(t, i = {}) {
    i.NextSkillId = t;
    i.Reason = i.Reason + NEXT_BEGIN_SKILL_NAME;
    this.cel.push(i);
  }
  async BeginSkillAsync(t, i = {}) {
    let e = false;
    if (await this.qj1(t)) {
      i.IsAsync = true;
      e = this.BeginSkill(t, i);
    } else if (this.Valid) {
      CombatLog_1.CombatLog.Error("Skill", this.Entity, "BeginSkill使用了不存在的技能", ["技能Id", t]);
    }
    return e;
  }
  BeginSkill(t, i = {}) {
    BaseSkillComponent_1.Ozr.Start();
    this.un_(t).Start();
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.ConditionDrivenSMTickLock, true, 0);
    i = this.Gj1(t, i);
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.ConditionDrivenSMTickLock, false, 0);
    this.un_(t).Stop();
    BaseSkillComponent_1.Ozr.Stop();
    return i;
  }
  Gj1(i, t) {
    BaseSkillComponent_1.kzr.Start();
    if (!this.CheckIsLoaded()) {
      BaseSkillComponent_1.kzr.Stop();
      return false;
    }
    var e = this.LoadedSkills.has(i);
    var s = this.GetSkillInfo(i);
    if (!e && this.AbilityComp.GetAbilityScopeLockCount() > 0 && s.SkillMode === 1) {
      this.BeginSkillAsync(i, t);
      BaseSkillComponent_1.kzr.Stop();
      return false;
    }
    var l = this.KZr(i);
    if (!l) {
      CombatLog_1.CombatLog.Error("Skill", this.Entity, "BeginSkill使用了不存在的技能", ["技能Id", i]);
      BaseSkillComponent_1.kzr.Stop();
      return false;
    }
    l.ExtraTargetLocation = t.ExtraTargetLocation;
    if (this.Vh_(i)) {
      CombatLog_1.CombatLog.Error("Skill", this.Entity, "技能打断的过程中不能新开技能", ["技能Id", i], ["技能名", l.SkillName], ["原因", t.Reason]);
      BaseSkillComponent_1.kzr.Stop();
      return false;
    }
    SkillUtils_1.SkillUtils.Log(0, 0, this.Entity, "BaseSkillComponent." + (t.IsAsync ? "BeginSkillAsync" : "BeginSkill"), ["技能Id", i], ["技能名", l.SkillName], ["技能目标", (t.Target instanceof Entity_1.Entity ? t.Target.GetComponent(1)?.Owner : t.Target)?.GetName()], ["原因", t.Reason]);
    var e = [];
    var n = this.WZr(l, e);
    if (n) {
      SkillUtils_1.SkillUtils.Log(0, 0, this.Entity, "BaseSkillComponent.CheckSkillCanBegin条件不满足", ["技能Id", i], ["技能名", l.SkillName], ["当前技能", this.CurrentSkill?.SkillId], ["当前技能名", this.CurrentSkill?.SkillName], ["原因", n]);
      BaseSkillComponent_1.kzr.Stop();
      return false;
    }
    BaseSkillComponent_1.kzr.Stop();
    BaseSkillComponent_1.Fzr.Start();
    this.jh_(i, true);
    e.forEach(t => {
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharBeforeInterruptWithTarget, i, t.SkillId);
      t.EndSkillInfo.Reason = Protocol_1.Aki.Protocol.rR_.Proto_EEndSkillReason_BeginOtherSkill;
      this.FZr(t, "开始新技能");
    });
    this.jh_(i, false);
    BaseSkillComponent_1.Fzr.Stop();
    BaseSkillComponent_1.Vzr.Start();
    n = this.ActorComp?.IsAutonomousProxy ?? false;
    e = this.StateMachineComp?.StateMachineGroup?.IsCurrentTaskSkill(i);
    if (this.FightStateComp && s.GroupId === exports.SKILL_GROUP_MAIN && !e) {
      e = this.FightStateComp.TrySwitchSkillState(l.InterruptLevel, l.SkillInfo, true);
      if (!e) {
        CombatLog_1.CombatLog.Info("Skill", this.Entity, "技能释放失败，状态不满足", ["技能Id", i], ["技能名", l.SkillName]);
        BaseSkillComponent_1.Vzr.Stop();
        return false;
      }
      l.FightStateHandle = e;
    } else {
      l.FightStateHandle = 0;
    }
    BaseSkillComponent_1.Vzr.Stop();
    BaseSkillComponent_1.Hzr.Start();
    this.QZr(t.Target, t.SocketName, s.SkillTarget, s.IsLockOn);
    l.PreContextId = t.ContextId;
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharBeforeSkillWithTarget, i, n);
    BaseSkillComponent_1.Hzr.Stop();
    BaseSkillComponent_1.jzr.Start();
    switch (s.SkillMode) {
      case 1:
        this.lZr = l;
        if (this.AbilityComp.TryActivateAbilityByClass(l.AbilityClass, true)) {
          break;
        }
        SkillUtils_1.SkillUtils.Log(3, 0, this.Entity, "BaseSkillComponent.执行GA失败!", ["技能Id", l.SkillId], ["技能名", l.SkillName], ["GaClass", l.AbilityClass?.GetName()]);
        this.lZr = undefined;
        this.SkillTarget = undefined;
        this.SkillTargetSocket = "";
        this.FightStateComp?.ExitState(l.FightStateHandle);
        BaseSkillComponent_1.jzr.Stop();
        return false;
      case 0:
        this.XZr(l);
        if (l.GetMontageByIndex(Skill_1.MONTAGE_DEFAULT_INDEX)) {
          if (l.CurrentMontageIndex === Skill_1.MONTAGE_INVALID_INDEX) {
            this.PlaySkillMontageWithEndAbility(l, Skill_1.MONTAGE_DEFAULT_INDEX, "", 0);
          }
        } else {
          this.DoSkillEnd(l);
        }
    }
    BaseSkillComponent_1.jzr.Stop();
    BaseSkillComponent_1.nva.Start();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CharUseSkill, this.Entity.Id, l.SkillId, n);
    SceneTeamController_1.SceneTeamController.EmitEvent(this.Entity, EventDefine_1.EEventName.CharUseSkill, this.Entity.Id, l.SkillId, n);
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharRecordOperate, this.SkillTarget, l.SkillId, s.SkillGenre);
    this.BuffComp?.TriggerEvents(2, this.BuffComp, {
      SkillId: Number(l.SkillId),
      SkillGenre: s.SkillGenre
    });
    BaseSkillComponent_1.nva.Stop();
    return true;
  }
  SimulatedBeginSkill(t, i, e = false, s = 0, l = BigInt(0)) {
    if (this.ActorComp.IsAutonomousProxy && this.EIe?.IsRole()) {
      CombatLog_1.CombatLog.Warn("Skill", this.Entity, "主控角色不能模拟开始技能", ["技能Id", t]);
      return false;
    }
    var n = this.KZr(t);
    if (!n) {
      CombatLog_1.CombatLog.Error("Skill", this.Entity, "远端释放不存在的技能", ["技能Id", t]);
      return false;
    }
    if (n.AbilityClass && n.AbilityClass.IsChildOf(UE.Ga_Passive_C.StaticClass())) {
      CombatLog_1.CombatLog.Warn("Skill", this.Entity, "被动技能不模拟", ["技能Id", t]);
      return false;
    }
    if (n.Active && n.IsSimulated) {
      CombatLog_1.CombatLog.Warn("Skill", this.Entity, "重复释放远端技能", ["技能Id", t]);
    }
    var o = n.SkillInfo;
    var r = this.StateMachineComp?.StateMachineGroup?.IsCurrentTaskSkill(t);
    if (this.FightStateComp && n.SkillInfo.GroupId === exports.SKILL_GROUP_MAIN && !r) {
      r = this.FightStateComp.TrySwitchSkillState(n.InterruptLevel, n.SkillInfo, false);
      if (!r) {
        return false;
      }
      n.FightStateHandle = r;
    } else {
      n.FightStateHandle = 0;
    }
    CombatLog_1.CombatLog.Info("Skill", this.Entity, "执行远端技能", ["技能Id", t], ["技能名", n.SkillName], ["特殊技能", e], ["打断等级", n.InterruptLevel]);
    if (e) {
      if (this.CurrentSkill) {
        this.FZr(this.CurrentSkill, "远端特殊技能");
      }
      this.ActorComp.SetMoveControlled(false, s, "远端特殊技能");
    }
    this.Entity.GetComponent(184)?.ExitHitState("远端释放技能");
    SceneTeamController_1.SceneTeamController.EmitEvent(this.Entity, EventDefine_1.EEventName.CharUseSkillRemote, this.Entity.Id, n.SkillId);
    this.YZr(o.GroupId, n);
    n.SimulatedBeginSkill(l);
    this.IsMainSkillReadyEnd = false;
    this.SkillTarget = ModelManager_1.ModelManager.CreatureModel.GetEntity(i);
    return true;
  }
  SimulateEndSkill(t) {
    var i;
    if (this.ActorComp.IsAutonomousProxy && this.EIe?.IsRole()) {
      CombatLog_1.CombatLog.Warn("Skill", this.Entity, "主控角色不能模拟结束技能", ["技能Id", t]);
    } else if (i = this.LoadedSkills.get(t)) {
      if (i.Active && i.IsSimulated) {
        CombatLog_1.CombatLog.Info("Skill", this.Entity, "结束远端技能", ["技能Id", t], ["技能名", i.SkillName]);
        this.JZr(i.SkillInfo.GroupId, i);
        i.EndSkill();
        this.IsMainSkillReadyEnd = false;
        if (i.SkillInfo.AutonomouslyBySimulate) {
          this.ActorComp.ResetMoveControlled("模拟端结束特殊技能");
        }
        SceneTeamController_1.SceneTeamController.EmitEvent(this.Entity, EventDefine_1.EEventName.OnSkillEnd, this.Entity.Id, i.SkillId);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSkillEnd, this.Entity.Id, t);
      } else {
        CombatLog_1.CombatLog.Warn("Skill", this.Entity, "结束远端技能失败，技能未激活或非模拟执行", ["技能Id", t], ["技能名", i.SkillName]);
      }
    } else {
      CombatLog_1.CombatLog.Error("Skill", this.Entity, "远端结束不存在的技能", ["技能Id", t]);
    }
  }
  OnActivateAbility(t, i) {
    if (t.IsA(UE.Ga_Passive_C.StaticClass())) {
      const e = this.cBn.get(t.GetClass());
      if (e) {
        (s = t).当前技能数据名 = e.toString();
        s.SkillId = e;
        if (s = this.GetSkill(e)) {
          SkillMessageController_1.SkillMessageController.UseSkillRequest(this.Entity, s, 0);
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Battle", 35, "被动GA没找到skill", ["skillId", e]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 35, "被动GA没找到skillId", ["skillId", e], ["ga", t.GetName()]);
      }
      return -1;
    }
    if (!this.lZr) {
      CombatLog_1.CombatLog.Error("Skill", this.Entity, "GA已启动，但没有找到对应技能", ["GA", t.GetName()]);
      return -1;
    }
    this.lZr.ActiveAbility = t;
    const e = this.lZr.SkillId;
    var s;
    if (t.IsA(UE.GA_Base_C.StaticClass())) {
      (s = t).当前技能数据 = this.lZr.SkillInfo;
      s.当前技能数据名 = this.lZr.SkillId.toString();
      s.SkillId = e;
    }
    this.XZr(this.lZr);
    this.lZr = undefined;
    return e;
  }
  OnEndAbility(t, i) {
    for (const e of this.GetAllActivatedSkill()) {
      if (e.ActiveAbility === t) {
        this.DoSkillEnd(e);
        return;
      }
    }
    CombatLog_1.CombatLog.Warn("Skill", this.Entity, "[BaseSkillComponent.OnEndAbility]GA已结束，但没有找到对应技能", ["GA", t.GetName()]);
  }
  QZr(t, i, e, s) {
    this.SkillTarget = undefined;
    this.SkillTargetSocket = "";
    if (t) {
      this.SkillTarget = t instanceof Entity_1.Entity ? ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(t) : ActorUtils_1.ActorUtils.GetEntityByActor(t);
      this.SkillTargetSocket = i ?? "";
    } else {
      if (this.bre?.Valid) {
        this.SkillTarget = this.bre.AiController.AiHateList.GetCurrentTarget();
        this.SkillTargetSocket = "";
      }
      if (!this.SkillTarget && this.LockOnComp?.Valid) {
        this.LockOnTargetAndSetShow(e, s);
      }
    }
  }
  LockOnTargetAndSetShow(t, i = true) {
    if (this.LockOnComp?.Valid) {
      this.LockOnComp.DetectSoftLockTarget(t, i);
      this.SkillTarget = this.LockOnComp.GetCurrentTarget();
      this.SkillTargetSocket = this.LockOnComp.GetCurrentTargetSocketName();
    }
  }
  XZr(t) {
    var i;
    var e;
    BaseSkillComponent_1.Wzr.Start();
    if (!this.hZr.has(t.SkillId)) {
      this.hZr.add(t.SkillId);
      SkillUtils_1.SkillUtils.Log(1, 0, this.Entity, "BaseSkillComponent.DoSkillBegin", ["技能Id", t.SkillId], ["技能名", t.SkillName]);
      i = this.GetSkillInfo(t.SkillId);
      t.BeginSkill();
      ModelManager_1.ModelManager.CombatMessageModel?.AddSkillRefCount(t.MNc);
      this.YZr(i.GroupId, t);
      BaseSkillComponent_1.Kzr.Start();
      SkillMessageController_1.SkillMessageController.UseSkillRequest(this.Entity, t, this.SkillTarget?.Id ?? 0);
      BaseSkillComponent_1.Kzr.Stop();
      BaseSkillComponent_1.Qzr.Start();
      this.zZr(t);
      BaseSkillComponent_1.Qzr.Stop();
      BaseSkillComponent_1.Xzr.Start();
      if (this.dZr?.IsMultiSkill(t.SkillInfo)) {
        this.dZr.StartMultiSkill(t, false);
      }
      this.dZr?.StartCd(t.SkillId, t.SkillInfo.SkillGenre);
      if (Math.abs(i.StrengthCost) > 0 && !this.EIe.IsAutoRole()) {
        FormationAttributeController_1.FormationAttributeController.AddValue(1, i.StrengthCost);
      }
      BaseSkillComponent_1.Xzr.Stop();
      e = this.GetSkillLevelBySkillInfoId(t.SkillId);
      BaseSkillComponent_1.$zr.Start();
      t.BeginSkillBuffAndTag(e);
      BaseSkillComponent_1.$zr.Stop();
      if (i.GroupId === exports.SKILL_GROUP_MAIN) {
        this.IsMainSkillReadyEnd = false;
        this.DoSkillBeginMoveAction(t, i);
      }
      if (i.AutonomouslyBySimulate) {
        this.ActorComp.SetMoveControlled(true, i.MoveControllerTime, "特殊技能");
      }
      this.hZr.delete(t.SkillId);
      BaseSkillComponent_1.Wzr.Stop();
    }
  }
  DoSkillEnd(t) {
    var i;
    if (!this.hZr.has(t.SkillId)) {
      this.hZr.add(t.SkillId);
      BaseSkillComponent_1.eZr.Start();
      SkillUtils_1.SkillUtils.Log(0, 0, this.Entity, "BaseSkillComponent.DoSkillEnd", ["技能Id", t.SkillId], ["技能名", t.SkillName]);
      ModelManager_1.ModelManager.CombatMessageModel?.RemoveSkillRefCount(t.MNc);
      i = t.SkillInfo;
      BaseSkillComponent_1.tZr.Start();
      this.ien(t);
      BaseSkillComponent_1.tZr.Stop();
      BaseSkillComponent_1.iZr.Start();
      if (i.GroupId === exports.SKILL_GROUP_MAIN) {
        this.vZr = false;
        this.IsMainSkillReadyEnd = true;
        this.UZr = 0;
        this.DoSkillEndMoveAction(i);
      }
      this.JZr(i.GroupId, t);
      t.EndSkill();
      BaseSkillComponent_1.iZr.Stop();
      BaseSkillComponent_1.oZr.Start();
      if (i.GroupId === exports.SKILL_GROUP_MAIN && (this.BuffComp?.HasBuffAuthority() && this.BuffComp.RemoveBuff(CharacterBuffIds_1.buffId.GoDown, -1, "技能结束"), this.TagComp.HasTag(interruptTag))) {
        this.TagComp.RemoveTag(interruptTag);
      }
      BaseSkillComponent_1.oZr.Stop();
      BaseSkillComponent_1.rZr.Start();
      SkillMessageController_1.SkillMessageController.EndSkillRequest(this.Entity, t.SkillId, t.EndSkillInfo);
      BaseSkillComponent_1.rZr.Stop();
      BaseSkillComponent_1.nZr.Start();
      SceneTeamController_1.SceneTeamController.EmitEvent(this.Entity, EventDefine_1.EEventName.OnSkillEnd, this.Entity.Id, t.SkillId);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSkillEnd, this.Entity.Id, t.SkillId);
      this.BuffComp?.TriggerEvents(3, this.BuffComp, {
        SkillId: Number(t.SkillId),
        SkillGenre: i.SkillGenre
      });
      BaseSkillComponent_1.nZr.Stop();
      this.hZr.delete(t.SkillId);
      BaseSkillComponent_1.eZr.Stop();
    }
  }
  PlaySkillMontage2Server(t, i, e, s, l) {
    var n = this.LoadedSkills.get(t);
    if (n) {
      n.MontageContextId = ModelManager_1.ModelManager.CombatMessageModel.GenMessageId();
      SkillMessageController_1.SkillMessageController.MontageRequest(this.Entity, 1, n.SkillId?.toString(), this.SkillTarget?.CreatureDataId ?? 0, i, e, s, l, n.MNc, n.MontageContextId);
      e = n.GetMontageByIndex(i);
      this.MontageComp?.PushMontageInfo({
        MontageNames: [],
        SkillId: t,
        MontageIndex: i,
        MontageTaskMessageId: n.MontageContextId
      }, e);
    }
  }
  EndSkillMontage(t, i) {}
  SimulatePlayMontage(t, i = 0, e = 1, s = "", l = 0, n = BigInt(0)) {
    var o;
    if (this.ActorComp.IsAutonomousProxy && this.EIe?.IsRole()) {
      CombatLog_1.CombatLog.Warn("Skill", this.Entity, "主控角色不能模拟播放蒙太奇", ["技能Id", t]);
    } else {
      if ((o = this.LoadedSkills.get(t)) && o.Active) {
        EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnBeforeSkillSimulateMontage, this.Entity.Id, t, i, l);
        o.PlayMontage(i, e, s, l, undefined, n);
      }
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnSkillSimulateMontage, this.Entity.Id, t, i, l);
    }
  }
  IsSkillInCd(t) {
    return !!this.dZr && this.dZr.IsSkillInCd(t);
  }
  GetCurrentMontageCorrespondingSkillId() {
    var t;
    var i;
    var e = this.AbilityComp?.GetCurrentWaitAndPlayedMontageCorrespondingGa();
    for ([t, i] of this.LoadedSkills) {
      if (i.Active && i.ActiveAbility === e) {
        return t;
      }
    }
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Character", 22, "不存在该GA的技能", ["玩家id", this.Entity.Id]);
    }
    return 0;
  }
  get SkillAcceptInput() {
    return this.vZr;
  }
  SetSkillAcceptInput(t) {
    this.vZr = t;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SkillAcceptChanged, this.Entity.Id, this.CurrentSkill?.SkillId ?? 0, this.vZr);
  }
  GetSkillTargetForAns() {
    var t;
    if (!this.EIe.IsRole() || (t = this.CurrentSkill) && t.SkillInfo.IsLockOn) {
      return this.SkillTarget;
    } else {
      return undefined;
    }
  }
  AUn() {
    var t = this.CurrentSkill;
    if (t) {
      if (t.SkillInfo.SkillTarget.TargetDied) {
        if (this.LockOnComp?.Valid) {
          this.LockOnTargetAndSetShow(t.SkillInfo.SkillTarget);
        }
        if (this.bre?.Valid && (t = this.bre.AiController.AiHateList.GetCurrentTarget()) && t.Id !== this.SkillTarget?.Id) {
          this.SkillTarget = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(t.Entity);
        }
      } else {
        this.SkillTarget = undefined;
        this.SkillTargetSocket = "";
      }
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharSkillTargetChanged, this.SkillTarget, this.SkillTargetSocket);
    }
  }
  GetTargetTransform() {
    if (SkillUtils_1.SkillUtils.IsTsActor(this.SkillTarget)) {
      let t = this.SkillTargetSocket;
      t = t || HIT_CASE_SOCKET_NAME;
      return SkillUtils_1.SkillUtils.GetTargetSocketTransform(this.SkillTarget.Entity, t, 0, "技能", 1);
    }
    return this.SkillTarget.Entity.GetComponent(1).ActorTransform;
  }
  GetTargetDistance() {
    var t;
    if (this.SkillTarget && (t = this.GetTargetTransform())) {
      this.TmpVector.FromUeVector(t.GetLocation());
      return Vector_1.Vector.Dist(this.ActorComp.ActorLocationProxy, this.TmpVector);
    } else {
      return -1;
    }
  }
  SetSkillCanRotate(t) {
    if (!(this.SkillCanRotateInternal = t)) {
      this.SZr.Reset();
    }
  }
  SetSkillRotateSpeed(t) {
    this.SkillRotateSpeedInternal = t;
  }
  SetRotateTarget(t, i) {
    this.IZr.Target = t;
    this.IZr.Type = i;
  }
  SetSkillRotateToTarget(t, i, e, s = 0, l = 0) {
    this.SkillRotateToTargetInternal = t;
    this.SZr.IsUseAnsRotateOffset = i;
    this.SZr.AnsRotateOffset = -MathUtils_1.MathUtils.Clamp(e, -MathUtils_1.PI_DEG, MathUtils_1.PI_DEG);
    this.SZr.PauseRotateThreshold = s;
    this.SZr.ResumeRotateThreshold = l;
  }
  SetIgnoreSocketName(t) {
    this.IgnoreSocketName.add(t.toString());
  }
  DeleteIgnoreSocketName(t) {
    this.IgnoreSocketName.delete(t.toString());
  }
  GetSkillRotateDirect() {
    return this.GetCurrentSkillRotateDirect();
  }
  GetCurrentSkillRotateDirect() {
    SkillUtils_1.SkillUtils.GetSkillRotateDirect(ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(this.Entity), this.IZr, this.SZr, this.oxr);
    return this.oxr;
  }
  GetCurrentSkillRotateTargetDirect(t, i) {
    var e = this.CurrentSkill;
    let s = undefined;
    if (s = e ? this.GetTargetTransform() : s) {
      this.oxr.FromUeVector(s.GetLocation());
    } else {
      this.oxr.DeepCopy(t.ActorLocationProxy);
    }
    this.oxr.SubtractionEqual(i);
    this.oxr.Normalize();
    return this.oxr;
  }
  get CurrentPriority() {
    return this.UZr;
  }
  SetCurrentPriority(t) {
    this.UZr = t;
  }
  HasAbility(t) {
    return !!this.CheckIsLoaded() && this.LoadedSkills.has(t);
  }
  SetSkillPriority(t, i) {
    if (this.CheckIsLoaded() && (t = this.LoadedSkills.get(t))?.Active) {
      t.InterruptLevel = i;
    }
  }
  CallAnimBreakPoint() {
    if (this.CheckIsLoaded()) {
      if (!this.TagComp.HasTag(interruptTag)) {
        this.TagComp.AddTag(interruptTag);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CharAnimBreakPoint, this.Entity.Id);
    }
  }
  GetActivePriority(t) {
    if (this.CheckIsLoaded() && (t = this.LoadedSkills.get(t))?.Active) {
      return t.InterruptLevel;
    } else {
      return -1;
    }
  }
  GetSkillMontageInstance(t, i) {
    if (this.CheckIsLoaded()) {
      t = this.LoadedSkills.get(t);
      if (t) {
        return t.GetMontageByIndex(i);
      }
    }
  }
  IsCanUseSkill(t) {
    var i;
    return !!this.CheckIsLoaded() && !!(i = this.GetSkillInfo(t)) && !this.IsSkillInCd(t) && !!this.DoCheckInterrupt(i.GroupId, this.GetPriority(t)) && !this.IsSkillGenreForbidden(i);
  }
  ResetRoleGrowComponent(t) {
    this.mZr ||= t;
  }
  GetSkillLevelBySkillInfoId(t) {
    if (this.mZr) {
      return this.mZr.GetSkillLevelBySkillInfoId(t);
    } else {
      return BaseAbilityComponent_1.DEFAULT_SOURCE_SKILL_LEVEL;
    }
  }
  GetSkillIdWithGroupId(t) {
    return this.aZr.get(t)?.[SKILL_GROUP_INDEX]?.SkillId ?? 0;
  }
  zZr(t) {
    var i = {
      Entity: this.Entity,
      SkillComponent: this,
      Skill: t
    };
    var e = this.GetSkillInfo(t.SkillId);
    for (let t = 0; t < e.SkillBehaviorGroup.Num(); t++) {
      var s = e.SkillBehaviorGroup.Get(t);
      if (SkillBehaviorCondition_1.SkillBehaviorCondition.SatisfyGroup(s.SkillBehaviorConditionGroup, s.SkillBehaviorConditionFormula, i) && (SkillBehaviorAction_1.SkillBehaviorAction.BeginGroup(s.SkillBehaviorActionGroup, i), !s.SkillBehaviorContinue)) {
        break;
      }
    }
  }
  ien(t) {
    SkillBehaviorAction_1.SkillBehaviorAction.End(t);
  }
  YZr(t, i) {
    let e = this.aZr.get(t);
    if (!e) {
      e = [];
      this.aZr.set(t, e);
    }
    if (!e.includes(i)) {
      e.push(i);
    }
  }
  JZr(t, i) {
    t = this.aZr.get(t);
    if (t && (i = t.indexOf(i)) !== -1) {
      t.splice(i, 1);
    }
  }
  *GetAllActivatedSkill() {
    for (const t of this.aZr.values()) {
      for (const i of t.values()) {
        yield i;
      }
    }
  }
  SetGaPassiveClassToSkillMap(t, i) {
    if (this.cBn.get(t)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 35, "GaPassiveClass重复,多个Skill用了一个GA", ["existedSkillId", this.cBn.get(t)], ["curSkillId", i]);
      }
    } else {
      this.cBn.set(t, i);
    }
  }
  GiveSkillDebug(t) {
    this.KZr(t);
  }
  LogEndSkillReason(t, i, e) {
    var s;
    if (this.CheckIsLoaded() && (s = this.CurrentSkill)) {
      if (!i) {
        s.EndSkillInfo.Reason = Protocol_1.Aki.Protocol.rR_.Proto_EEndSkillReason_BeHit;
      }
      if (e) {
        s.EndSkillInfo.Reason = Protocol_1.Aki.Protocol.rR_.Proto_EEndSkillReason_BeCounter;
      }
      s.EndSkillInfo.EntityId = MathUtils_1.MathUtils.NumberToLong(t.BulletOwner.GetComponent(0).GetCreatureDataId());
      s.EndSkillInfo.SkillId = t.GetBulletInfo().BulletInitParams.SkillId;
      s.EndSkillInfo.BulletId = MathUtils_1.MathUtils.NumberToLong(t.GetBulletInfo().BulletEntityId);
    }
  }
  DoSkillBeginMoveAction(t, i) {}
  DoSkillEndMoveAction(t) {}
  OnBeforePlaySkillMontage() {}
  GetMainAnimInstance() {}
  un_(t) {
    let i = this.cn_.get(t);
    if (!i) {
      i = Stats_1.Stat.CreateNoFlameGraph("BeginSkill " + t);
      this.cn_.set(t, i);
    }
    return i;
  }
  *GetAllSkillId(t = 7) {
    var i = new Set();
    if (this.DtSkillInfoExtraList && t & 4) {
      for (const r of this.DtSkillInfoExtraList) {
        var e = new Array();
        DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(r, e);
        for (const h of e) {
          var s = Number(h);
          if (!i.has(s)) {
            i.add(s);
            yield s;
          }
        }
      }
    }
    if (this._Zr && t & 1) {
      var l = new Array();
      DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(this._Zr, l);
      for (const a of l) {
        var n = Number(a);
        if (!i.has(n)) {
          i.add(n);
          yield n;
        }
      }
    }
    if (t & 2) {
      let t = [];
      switch (this.EIe.GetEntityType()) {
        case Protocol_1.Aki.Protocol.kks.Proto_Player:
          t = ConfigManager_1.ConfigManager.WorldConfig.GetRoleCommonSkillRowNames();
          break;
        case Protocol_1.Aki.Protocol.kks.Proto_Monster:
          t = ConfigManager_1.ConfigManager.WorldConfig.GetMonsterCommonSkillRowNames();
          break;
        case Protocol_1.Aki.Protocol.kks.Proto_Vision:
          t = ConfigManager_1.ConfigManager.WorldConfig.GetVisionCommonSkillRowNames();
      }
      for (const S of t) {
        var o = Number(S);
        if (!i.has(o)) {
          i.add(o);
          yield o;
        }
      }
    }
  }
  *GetAllBulletId(t = 7) {
    var i = new Set();
    if (this.DtBulletInfoExtraList && t & 4) {
      for (const n of this.DtBulletInfoExtraList) {
        var e = new Array();
        DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(n, e);
        for (const o of e) {
          var s = BigInt(o);
          if (!i.has(s)) {
            i.add(s);
            yield s;
          }
        }
      }
    }
    if (this.DtBulletInfo && t & 1) {
      t = new Array();
      DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(this.DtBulletInfo, t);
      for (const r of t) {
        var l = BigInt(r);
        if (!i.has(l)) {
          i.add(l);
          yield l;
        }
      }
    }
  }
  GetExtraTargetLocation(t) {
    return this.GetSkill(t)?.ExtraTargetLocation;
  }
};
BaseSkillComponent.Ozr = Stats_1.Stat.Create("BeginSkill");
BaseSkillComponent.kzr = Stats_1.Stat.Create("BeginSkill1 CheckSkillCanUse");
BaseSkillComponent.Fzr = Stats_1.Stat.Create("BeginSkill2 InterruptSkill");
BaseSkillComponent.Vzr = Stats_1.Stat.Create("BeginSkill3 StateMachine");
BaseSkillComponent.Hzr = Stats_1.Stat.Create("BeginSkill4 SelectTarget");
BaseSkillComponent.jzr = Stats_1.Stat.Create("BeginSkill5 ActiveSkill");
BaseSkillComponent.nva = Stats_1.Stat.Create("BeginSkill6 EmitSkillBegin");
BaseSkillComponent.Wzr = Stats_1.Stat.Create("DoSkillBegin");
BaseSkillComponent.Kzr = Stats_1.Stat.Create("DoSkillBegin1 NetSend");
BaseSkillComponent.Qzr = Stats_1.Stat.Create("DoSkillBegin2 SkillBehaviorStart");
BaseSkillComponent.Xzr = Stats_1.Stat.Create("DoSkillBegin3 CD&Cost");
BaseSkillComponent.$zr = Stats_1.Stat.Create("DoSkillBegin4 Buff&Tag");
BaseSkillComponent.Zzr = Stats_1.Stat.Create("RequestEndSkill");
BaseSkillComponent.eZr = Stats_1.Stat.Create("DoSkillEnd");
BaseSkillComponent.tZr = Stats_1.Stat.Create("DoSkillEnd1 SkillBehaviorEnd");
BaseSkillComponent.iZr = Stats_1.Stat.Create("DoSkillEnd2 RestoreSkillInfoStaff");
BaseSkillComponent.oZr = Stats_1.Stat.Create("DoSkillEnd3 RestoreMoveState");
BaseSkillComponent.rZr = Stats_1.Stat.Create("DoSkillEnd4 NetSend");
BaseSkillComponent.nZr = Stats_1.Stat.Create("DoSkillEnd5 EmitSkillEnd");
BaseSkillComponent = BaseSkillComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(40)], BaseSkillComponent);
exports.BaseSkillComponent = BaseSkillComponent; //# sourceMappingURL=BaseSkillComponent.js.map