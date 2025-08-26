"use strict";

var __decorate = this && this.__decorate || function (e, t, i, s) {
  var o;
  var a = arguments.length;
  var h = a < 3 ? t : s === null ? s = Object.getOwnPropertyDescriptor(t, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(e, t, i, s);
  } else {
    for (var r = e.length - 1; r >= 0; r--) {
      if (o = e[r]) {
        h = (a < 3 ? o(h) : a > 3 ? o(t, i, h) : o(t, i)) || h;
      }
    }
  }
  if (a > 3 && h) {
    Object.defineProperty(t, i, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleTeamComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const Quat_1 = require("../../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const CameraController_1 = require("../../../../Camera/CameraController");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const Global_1 = require("../../../../Global");
const GlobalData_1 = require("../../../../GlobalData");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FormationDataController_1 = require("../../../../Module/Abilities/FormationDataController");
const BattleUiDefine_1 = require("../../../../Module/BattleUi/BattleUiDefine");
const SceneTeamDefine_1 = require("../../../../Module/SceneTeam/SceneTeamDefine");
const UiCameraAnimationManager_1 = require("../../../../Module/UiCameraAnimation/UiCameraAnimationManager");
const EffectUtil_1 = require("../../../../Utils/EffectUtil");
const CharacterNameDefines_1 = require("../../Common/CharacterNameDefines");
const CharacterBuffIds_1 = require("../../Common/Component/Abilities/CharacterBuffIds");
const CharacterUnifiedStateComponent_1 = require("../../Common/Component/Abilities/CharacterUnifiedStateComponent");
const CharacterUnifiedStateTypes_1 = require("../../Common/Component/Abilities/CharacterUnifiedStateTypes");
const RoleInheritComponent_1 = require("./RoleInheritComponent");
let RoleTeamComponent = class RoleTeamComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.m1t = undefined;
    this.Xte = undefined;
    this.mBe = undefined;
    this.Mrn = undefined;
    this.cBe = undefined;
    this.Ern = undefined;
    this.Gce = undefined;
    this.Nce = undefined;
    this.cZr = undefined;
    this.xGl = undefined;
    this.wGl = undefined;
    this._du = undefined;
    this.BGl = undefined;
    this._pn = undefined;
    this.uwl = undefined;
    this.Srn = undefined;
    this.yrn = undefined;
    this.Irn = -1;
    this.wCl = undefined;
    this.GoBattleSkill = false;
    this.Trn = undefined;
    this.Lrn = undefined;
    this.DSa = 0;
    this.Drn = undefined;
    this.lQc = false;
    this.cz = Vector_1.Vector.Create();
    this.cie = Rotator_1.Rotator.Create();
    this.e7o = Quat_1.Quat.Create();
  }
  OnInit(e) {
    this.m1t = this.Entity.GetComponent(175);
    this.Xte = this.Entity.GetComponent(206);
    this.Hte = this.Entity.GetComponent(3);
    this.mBe = this.Entity.GetComponent(176);
    this.Mrn = this.Entity.GetComponent(97);
    this.cBe = this.Entity.GetComponent(40);
    this.Ern = this.Entity.GetComponent(99);
    this.Gce = this.Entity.GetComponent(179);
    this.Nce = this.Entity.GetComponent(62);
    this.cZr = this.Entity.GetComponent(32);
    this.xGl = this.Entity.GetComponent(65);
    this.wGl = this.Entity.GetComponent(66);
    this._du = this.Entity.GetComponent(54);
    this.BGl = this.Entity.GetComponent(100);
    this.uwl = this.Entity.GetComponent(230);
    this._pn = this.Entity.GetComponent(68);
    return true;
  }
  OnStart() {
    var e = EffectUtil_1.EffectUtil.GetEffectPath(SceneTeamDefine_1.GO_BATTLE_MATERIAL);
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.PD_CharacterControllerDataGroup_C, e => {
      if (e) {
        this.Srn = e;
      }
    });
    var e = EffectUtil_1.EffectUtil.GetEffectPath(SceneTeamDefine_1.GO_DOWN_MATERIAL);
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.PD_CharacterControllerData_C, e => {
      if (e) {
        this.yrn = e;
      }
    });
    return true;
  }
  OnEnd() {
    this.Rrn();
    return true;
  }
  Rrn() {
    this.Trn?.EndTask();
    this.Trn = undefined;
    this.Lrn?.EndTask();
    this.Lrn = undefined;
    if (this.Drn) {
      TimerSystem_1.TimerSystem.Remove(this.Drn);
      this.Drn = undefined;
    }
  }
  NeedSyncTransform() {
    return !this.lQc;
  }
  static OnChangeRole(e, t, i, s, o, a, h) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneTeam", 48, "执行战斗换人", ["Last", e?.Id], ["New", t.Id]);
    }
    var r = e?.Entity?.GetComponent(94);
    var t = t.Entity.GetComponent(94);
    var n = ModelManager_1.ModelManager.SceneTeamModel.CurrentGroupType === 3;
    var _ = r?.cBe;
    if (o && _ && _.CurrentSkill && !_.IsMainSkillReadyEnd) {
      let e = _.SkillTarget;
      if (!e && FormationDataController_1.FormationDataController.GlobalIsInFight) {
        (o = r.cZr)?.DetectSoftLockTarget({});
        e = o?.GetCurrentTarget();
      }
      _ = r.m1t;
      if (e && _?.HasBuffAuthority()) {
        _.AddBuff(CharacterBuffIds_1.buffId.GoDown, {
          InstigatorId: _.CreatureDataId,
          Reason: "战斗换人"
        });
      }
    }
    let m = false;
    let l = false;
    o = r?.Xte;
    if (o) {
      l = o.HasTag(504239013) || o.HasTag(855966206);
      m = o.HasAllTag([40422668, -959917199]);
    }
    t.Urn();
    if (r && r !== t) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneTeam", 48, "角色下场", ["Entity", r.Entity?.Id]);
      }
      t.m1t.AddBuff(CharacterBuffIds_1.buffId.WaitRemoveQteInvincible, {
        InstigatorId: t.m1t.CreatureDataId,
        Reason: "换人去除QTE无敌"
      });
      if (GlobalData_1.GlobalData.GameInstance) {
        GlobalData_1.GlobalData.BpEventManager.当换人完成时.Broadcast();
      }
      t.xGl?.SetDataFromOldRole(e);
      t.wGl?.SetDataFromOldRole(e);
      t._du?.SetDataFromOldRole(e);
      t.BGl?.SetDataFromOldRole(e);
      r.wGl?.ClearTarget();
      r.ClearMovePlatformAttach();
      if (!!n || !r.Xte.HasTag(1144073280)) {
        r.cBe.StopGroup1Skill("RoleTeamComponent.OnChangeRole");
      }
      _ = r.Xte.HasTag(-1371021686) && !r.cBe.IsMainSkillReadyEnd;
      RoleInheritComponent_1.RoleInheritComponent.StateInherit(r.Mrn, t.Mrn, t.Ern.IsInQte ? 1 : 0, _);
      r.Arn(n);
      r.Prn(s);
    }
    o = l || h || n;
    t.xrn(e, m, a, o);
    t.wrn(!l && i);
  }
  Urn() {
    var e = Global_1.Global.CharacterController;
    var t = this.Hte.Actor;
    if (e.Pawn !== t) {
      t.Mesh.AddTickPrerequisiteActor(e);
      e.Possess(t);
      this.Gce.StopMove(false);
      if (!this.Nce?.Active) {
        this.Nce?.SetActive(true);
      }
    }
  }
  xrn(e, t, i, s) {
    this.lQc = false;
    var o = e === undefined;
    if (ModelManager_1.ModelManager.AutoRunModel?.IsInLogicTreeGmMode()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneTeam", 48, "人物上场，GM推进中，继承位置");
      }
      this.InheritTransform(o);
    } else if (i) {
      if (s) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SceneTeam", 48, "人物上场，强制继承位置");
        }
        this.InheritTransform(o);
      } else if (this.Ern.IsInQte) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SceneTeam", 48, "人物上场，角色QTE中，不更新位置");
        }
      } else if ((i = e?.Entity?.GetComponent(206))?.HasAnyTag([-1388400236, -2100129479, 1144073280, -2044964178])) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SceneTeam", 48, "人物上场，上个角色还在场，进行寻点");
        }
        s = !!t || !i.HasTag(1788158005) && i.HasTag(40422668);
        this.Entity.GetComponent(99).SetQtePosition({
          Rotate: s ? SceneTeamDefine_1.SPECIAL_CHANGE_ANGLE_AIR : SceneTeamDefine_1.SPECIAL_CHANGE_ANGLE_LAND,
          Length: s ? SceneTeamDefine_1.SPECIAL_CHANGE_DIS_AIR : SceneTeamDefine_1.SPECIAL_CHANGE_DIS_LAND,
          Height: s ? SceneTeamDefine_1.SPECIAL_CHANGE_HEIGHT_AIR : SceneTeamDefine_1.SPECIAL_CHANGE_HEIGHT_LAND,
          ReferenceTarget: false,
          QteType: s ? 1 : 0
        });
        this.Gce?.ActorComp?.Actor.KuroSetMovementMode({
          Mode: s ? 3 : 1,
          Context: "[RoleTeamComponent.RefreshPosition]"
        });
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SceneTeam", 48, "人物上场，上个角色不在场，继承位置");
        }
        this.InheritTransform(o);
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneTeam", 48, "人物上场，不允许改变位置");
    }
  }
  InheritTransform(e = false) {
    this.lQc = true;
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetSpawnTransform();
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneTeam", 48, "继承位置失败，获取角色Transform为空");
      }
      return false;
    }
    if (this.Gce.IsStandardGravity) {
      t.SetRotation(new UE.Rotator(0, t.Rotator().Yaw, 0).Quaternion());
    } else {
      this.e7o.FromUeQuat(t.GetRotation());
      this.e7o.RotateVector(Vector_1.Vector.ForwardVectorProxy, this.cz);
      MathUtils_1.MathUtils.LookRotationUpFirst(this.cz, this.Gce.GravityUp, this.cie);
      this.cie.Quaternion(this.e7o);
      t.SetRotation(this.e7o.ToUeQuat());
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneTeam", 48, "继承位置", ["Location", t.GetLocation()]);
    }
    this.Hte.SetActorTransform(t, "换人.上场", false);
    if (e) {
      this.Hte.SetInputFacing(this.Hte.ActorForwardProxy);
    }
    ModelManager_1.ModelManager.SceneTeamModel.SetLastTransform(undefined);
    t = this.mBe;
    if (t.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground && ModelManager_1.ModelManager.SceneTeamModel.LastEntityIsOnGround) {
      this.Brn("换人.地面修正");
    } else if (t.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Slide || t.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.NormalSki) {
      this.Brn("换人.滑行修正");
    }
    return true;
  }
  Brn(e) {
    this.Hte.FixSwitchLocation(e, true, true);
  }
  wrn(e) {
    var t;
    var i;
    var s;
    if (this.Ern.IsInQte) {
      this.GoBattleSkill = false;
    } else {
      s = this.Xte.HasTag(1949807524);
      this.cZr.DetectSoftLockTarget({});
      t = this.cZr.GetCurrentTarget() !== undefined;
      i = this.Xte.HasTag(-1207177910);
      this.GoBattleSkill = s || e && i && t;
    }
    this.Rrn();
    for (const o of CharacterUnifiedStateComponent_1.outGameRoleTags) {
      this.Xte.RemoveTag(o);
    }
    this.SetTeamTag(0);
    if (!ModelManager_1.ModelManager.PlotModel.InSeamlessFormation) {
      this.Entity.EnableByKey(1, true);
    } else {
      this.Entity.DisableByKey(1, true);
    }
    this.brn();
    this.Hte.KuroMoveAlongFloor(Vector_1.Vector.ZeroVector, 0, "GoBattle");
    if (!UiCameraAnimationManager_1.UiCameraAnimationManager.IsActivate()) {
      CameraController_1.CameraController.ExitCameraMode(2);
    }
    if (this.GoBattleSkill) {
      s = this.mBe.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Air;
      this.Hte.Actor.FightCommand(s);
    }
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnRoleGoUp);
  }
  brn() {
    var e;
    var t;
    if (ModelManager_1.ModelManager.SceneTeamModel.CurrentGroupType === 3) {
      t = this.Entity.GetComponent(0).GetRoleId();
      t = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(t);
      if ((e = ModelManager_1.ModelManager.PlotModel.GoBattleMaterial) && ModelManager_1.ModelManager.RoleModel.IsMainRole(t)) {
        this.Hte.Actor.CharRenderingComponent.AddMaterialControllerData(e);
      }
    } else {
      if (this.Srn) {
        this.Hte.Actor.CharRenderingComponent.AddMaterialControllerDataGroup(this.Srn);
      }
      t = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, this.Hte.ActorTransform, SceneTeamDefine_1.GO_BATTLE_EFFECT, "[RoleTeamComponent.SpawnGoBattleMaterial]", new EffectContext_1.EffectContext(this.Entity.Id));
      EffectSystem_1.EffectSystem.SetAdditionTimeScale(14, t, ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation);
      if (EffectSystem_1.EffectSystem.IsValid(t)) {
        EffectSystem_1.EffectSystem.GetEffectActor(t).K2_AttachToComponent(this.Hte.SkeletalMesh, FNameUtil_1.FNameUtil.NONE, 2, 2, 2, true);
      }
    }
  }
  Arn(e) {
    var t = this.Xte?.HasTag(1144073280);
    var i = this.Xte?.HasTag(-2044964178);
    if (e || !t && !i) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneTeam", 48, "角色下场，立即隐藏");
      }
      this.SetTeamTag(2);
      this.Entity.DisableByKey(1, true);
      this.Hte.RestoreDefaultController();
      this.Gce?.StopAllAddMove();
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnRoleGoDownFinish);
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneTeam", 48, "角色下场，等待切人不隐藏Tag、硬直时间Tag移除再隐藏角色");
      }
      if (t && !this.Trn) {
        this.Trn = this.Xte.ListenForTagAddOrRemove(1144073280, (e, t) => {
          if (!t) {
            this.Trn?.EndTask();
            this.Trn = undefined;
            this.qrn();
          }
        });
      }
      if (i && !this.Lrn) {
        this.Lrn = this.Xte.ListenForTagAddOrRemove(-2044964178, (e, t) => {
          if (!t) {
            this.Lrn?.EndTask();
            this.Lrn = undefined;
            this.qrn();
          }
        });
      }
      this.SetTeamTag(1);
      this.Hte.RestoreDefaultController();
      this.Gce?.StopAllAddMove();
    }
  }
  qrn() {
    var e = !this.Trn && !this.Lrn;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneTeam", 48, "角色下场，尝试隐藏角色", ["CanGoDown", e]);
    }
    if (e && ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Id !== this.Entity.Id) {
      this.DisableRoleWithEffect();
    }
  }
  InterruptDisableWithEffect() {
    if (this.Drn) {
      TimerSystem_1.TimerSystem.Remove(this.Drn);
      this.Drn = undefined;
    }
    var e = this.DSa;
    if (e) {
      this.Hte.Actor.CharRenderingComponent.RemoveMaterialControllerData(e);
      this.DSa = 0;
    }
  }
  DisableRoleWithEffect() {
    if (this.Drn) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneTeam", 48, "角色下场，正在播放特效等待隐藏");
      }
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneTeam", 48, "角色下场，播放特效后再隐藏");
      }
      if (this.yrn) {
        this.DSa = this.Hte.Actor.CharRenderingComponent.AddMaterialControllerData(this.yrn);
      }
      this.Drn = TimerSystem_1.TimerSystem.Delay(() => {
        this.Drn = undefined;
        this.BCl();
      }, SceneTeamDefine_1.EFFECT_DELAY_QUIT, undefined, undefined, true, ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation);
      if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
        ControllerHolder_1.ControllerHolder.SceneTeamController.RoleGoDownPush(this.Entity);
      }
    }
  }
  DisableRoleWithoutEffect() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneTeam", 48, "角色下场，立刻隐藏");
    }
    if (this.Drn) {
      TimerSystem_1.TimerSystem.Remove(this.Drn);
      this.Drn = undefined;
    }
    this.BCl();
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      ControllerHolder_1.ControllerHolder.SceneTeamController.RoleGoDownPush(this.Entity);
    }
  }
  BCl() {
    var e = this.DSa;
    if (e) {
      this.Hte.Actor.CharRenderingComponent.RemoveMaterialControllerData(e);
      this.DSa = 0;
    }
    this.cBe.StopAllSkills("RoleTeamComponent.DisableRole");
    this.QQa(false);
    this.SetTeamTag(2);
    this.Gce.CharacterMovement?.SetDefaultMovementMode();
    this.Entity.DisableByKey(1, true);
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnRoleGoDownFinish);
  }
  Prn(e) {
    var t = e * BattleUiDefine_1.SECOND_TO_MILLISECOND;
    this.Irn = t + Time_1.Time.PlayerWorldTime;
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnChangeRoleCoolDownChanged, e);
  }
  IsChangeRoleCoolDown() {
    return this.GetChangeRoleCoolDown() > 0 || !(this.Irn = -1);
  }
  GetChangeRoleCoolDown() {
    if (this.Irn > 0) {
      return this.Irn - Time_1.Time.PlayerWorldTime;
    } else {
      return -1;
    }
  }
  SetTeamTag(e) {
    if (this.Entity.IsInit) {
      switch (this.wCl = e) {
        case 0:
          this.Xte.AddTag(-1384309247);
          this.QQa(false);
          if (this.Xte.HasTag(-1207177910)) {
            this.Xte.RemoveTag(-1207177910);
          }
          if (this.Xte.HasTag(-1388400236)) {
            this.Xte.RemoveTag(-1388400236);
          }
          break;
        case 1:
          this.Xte.AddTag(-1388400236);
          this.QQa(true);
          if (this.Xte.HasTag(-1207177910)) {
            this.Xte.RemoveTag(-1207177910);
          }
          if (this.Xte.HasTag(-1384309247)) {
            this.Xte.RemoveTag(-1384309247);
          }
          break;
        case 2:
          if (this.Hte.IsAutonomousProxy) {
            this.Xte.AddTag(-1207177910);
          }
          if (this.Xte.HasTag(-1384309247)) {
            this.Xte.RemoveTag(-1384309247);
          }
          if (this.Xte.HasTag(-1388400236)) {
            this.Xte.RemoveTag(-1388400236);
          }
      }
    }
  }
  GetTeamState() {
    return this.wCl;
  }
  QQa(e) {
    if (e) {
      this.Xte?.AddTag(85148660);
    } else {
      this.Xte?.RemoveTag(85148660);
    }
  }
  OutOfControl() {
    this.SetTeamTag(1);
    this.cBe.StopAllSkills("RoleTeamComponent.OutOfControl");
    this.Nce?.ClearMoveVectorCache();
    this.Nce?.SetActive(false);
    this.Hte.ClearInput();
    this.Gce?.StopMove(true);
    this.Hte.RestoreDefaultController();
    this.Gce?.StopAllAddMove();
  }
  static OnSimulateChangeRole(e, t, i, s = undefined, o = undefined) {
    var a;
    var h;
    var e = e.Entity;
    var t = t.Entity;
    if (t && e) {
      t.GetComponent(94).SimulateGoBattle();
      a = s && o;
      if (t.IsInit) {
        h = t.GetComponent(3);
        if (a) {
          h.SetActorLocationAndRotation(s.ToUeVector(), o.ToUeRotator(), "SwitchRoleNotify", false);
        } else {
          h.SetActorTransform(e.GetComponent(3).ActorTransform, "SwitchRoleNotify", false);
          if (e.GetComponent(206).HasAnyTag(SceneTeamDefine_1.needFixLocationTagList)) {
            h.FixSwitchLocation("模拟端换人地面修正", true, true);
          }
        }
        h.SetInputFacing(h.ActorForwardProxy);
      }
      s = t.GetComponent(178).MainAnimInstance;
      o = e.GetComponent(178).MainAnimInstance;
      if (UE.KuroStaticLibrary.IsObjectClassByName(s, CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE) && UE.KuroStaticLibrary.IsObjectClassByName(o, CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE)) {
        s.替换角色时同步动作数据(o);
      }
      if (!a) {
        h = t.GetComponent(68);
        s = e.GetComponent(68);
        h.CloneMoveSampleInfos(s);
      }
      if (!i) {
        e.GetComponent(94).SimulateGoDown(false);
      }
    }
  }
  SimulateGoBattle() {
    this.InterruptDisableWithEffect();
    this.Entity.GetComponent(0).SetVisible(true);
    this.Entity.EnableByKey(1, true);
  }
  SimulateGoDown(e) {
    if (e) {
      if (this.Drn) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SceneTeam", 48, "模拟端角色下场，正在播放特效等待隐藏");
        }
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SceneTeam", 48, "模拟端角色下场，播放特效后再隐藏");
        }
        if (this.yrn) {
          this.DSa = this.Hte?.Actor?.CharRenderingComponent?.AddMaterialControllerData(this.yrn) ?? 0;
        }
        this.Drn = TimerSystem_1.TimerSystem.Delay(() => {
          this.Drn = undefined;
          this._Qc();
        }, SceneTeamDefine_1.EFFECT_DELAY_QUIT, undefined, undefined, true, ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation);
      }
    } else {
      this._Qc();
    }
  }
  _Qc() {
    this.Entity.GetComponent(0)?.SetVisible(false);
    this.Entity.DisableByKey(1, true);
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnOtherRoleGoDownFinish);
  }
  ClearMovePlatformAttach() {
    this.uwl.IsAttachToMoveSceneItem = false;
    this.Gce.NeedRootMotionWhenAttached = false;
    this.Gce.CharacterMovement.bKuroStopUpdateBasedMovement = false;
    this.Hte?.Owner?.K2_DetachFromActor(1, 1, 1);
    this._pn?.ClearBasePlatform();
  }
};
RoleTeamComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(94)], RoleTeamComponent);
exports.RoleTeamComponent = RoleTeamComponent; //# sourceMappingURL=RoleTeamComponent.js.map