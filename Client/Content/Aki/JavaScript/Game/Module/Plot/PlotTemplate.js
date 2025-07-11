"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotTemplate = exports.BEGIN_WAIT_TIME = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const PlotAudioById_1 = require("../../../Core/Define/ConfigQuery/PlotAudioById");
const QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathCommon_1 = require("../../../Core/Utils/Math/MathCommon");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const CameraController_1 = require("../../Camera/CameraController");
const TimeUtil_1 = require("../../Common/TimeUtil");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterNameDefines_1 = require("../../NewWorld/Character/Common/CharacterNameDefines");
const GameplayCueController_1 = require("../../NewWorld/Character/Common/Component/Abilities/GameplayCueSFX/Controller/GameplayCueController");
const NpcPerformController_1 = require("../../NewWorld/Character/Npc/Controller/NpcPerformController");
const GravityUtils_1 = require("../../Utils/GravityUtils");
const WaitEntityTask_1 = require("../../World/Define/WaitEntityTask");
const TeleportController_1 = require("../Teleport/TeleportController");
const MovingShotManager_1 = require("./MovingShotManager");
const PlotAudioModel_1 = require("./PlotAudioModel");
const PlotController_1 = require("./PlotController");
const SequenceDefine_1 = require("./Sequence/SequenceDefine");
const PLAYER_UNUSED_INDEX = -1;
const PLAYER_USED_ID = -1;
const ACTOR_EMPTY_INDEX = -1;
const FIX_TELEPORT_TRACE_DOWN = -1000;
const PROFILE_KEY = "PlotTemplate_GroundCheckModify";
const ACTOR_NUM_MAX = 10;
const WAIT_ENTITY_TIME = 30000;
const DITHER_RATE_PER_SECOND = 0.33;
const WAIT_TURING_TIME = 1500;
exports.BEGIN_WAIT_TIME = 800;
const MONTAGE_BLEND_OUT_TIME = 0.5;
const DEFAULT_CAMERA_BASE = 140.19;
const DEFAULT_CAMERA_BASE_HEAD = 135.96;
const MAX_POS_DIST_SQ = 1000000;
class ActorData {
  constructor() {
    this.ValidInternal = false;
    this.PbDataId = 0;
    this.EntityId = 0;
    this.TalkerId = 0;
    this.Pos = {
      X: 0,
      Y: 0,
      Z: 0,
      A: 0,
      Roll: 0,
      Pitch: 0
    };
    this.Visible = false;
    this.MontageBlendToEnd = false;
    this.MontageLooping = false;
    this.MontageKeeping = false;
    this.BodyMontage = undefined;
    this.BodyMontagePath = undefined;
    this.OverlayMontageLooping = false;
    this.OverlayMontageKeeping = false;
    this.OverlayMontage = undefined;
    this.OverlayMontagePath = undefined;
    this.FaceMontage = undefined;
    this.MouseMontageLoadingId = ResourceSystem_1.ResourceSystem.InvalidId;
    this.FaceExpressionId = undefined;
    this.FaceChangeManager = undefined;
    this.OriginPos = {
      X: 0,
      Y: 0,
      Z: 0,
      A: 0,
      Roll: 0,
      Pitch: 0
    };
    this.IsPosReset = false;
    this.IsMontageKeep = false;
    this.OriginEnableLookAt = false;
    this.OriginEnableAi = false;
    this.OriginMoveSync = false;
    this.OriginMoveMode = undefined;
    this.LookLocked = false;
    this.PositionLocked = false;
    this.QueHandleIds = [];
  }
  get Valid() {
    return !!this.ValidInternal && (this.IsPlayer() ? ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Valid ?? false : ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(this.PbDataId)?.Valid ?? false);
  }
  set Valid(t) {
    this.ValidInternal = t;
  }
  Reset() {
    this.ValidInternal = false;
    this.PbDataId = 0;
    this.EntityId = 0;
    this.TalkerId = 0;
    this.Visible = true;
    this.MontageBlendToEnd = false;
    this.MontageLooping = false;
    this.MontageKeeping = false;
    this.BodyMontage = undefined;
    this.BodyMontagePath = undefined;
    this.FaceMontage = undefined;
    this.MouseMontageLoadingId = ResourceSystem_1.ResourceSystem.InvalidId;
    this.OverlayMontageLooping = false;
    this.OverlayMontageKeeping = false;
    this.OverlayMontage = undefined;
    this.OverlayMontagePath = undefined;
    this.FaceExpressionId = undefined;
    this.FaceChangeManager = undefined;
    this.Pos.X = 0;
    this.Pos.Y = 0;
    this.Pos.Z = 0;
    this.Pos.A = 0;
    this.Pos.Roll = 0;
    this.Pos.Pitch = 0;
    this.OriginPos.X = 0;
    this.OriginPos.Y = 0;
    this.OriginPos.Z = 0;
    this.OriginPos.A = 0;
    this.OriginPos.Roll = 0;
    this.OriginPos.Pitch = 0;
    this.IsPosReset = false;
    this.IsMontageKeep = false;
    this.OriginEnableLookAt = false;
    this.OriginEnableAi = false;
    this.OriginMoveSync = false;
    this.OriginMoveMode = undefined;
    this.LookLocked = false;
    this.PositionLocked = false;
    this.QueHandleIds.length = 0;
  }
  IsPlayer() {
    return this.PbDataId === PLAYER_USED_ID;
  }
}
class ShowActorParam {
  constructor() {
    this.Visible = false;
    this.UseEffect = false;
  }
}
class DelayActionManager {
  constructor() {
    this.Sia = new Set();
    this.Eia = new Map();
  }
  DelayAction(e, t, i, o) {
    if (t < TimerSystem_1.MIN_TIME || t > TimerSystem_1.MAX_TIME) {
      i();
    } else if (o) {
      o = TimerSystem_1.TimerSystem.Delay(() => {
        var t = this.Eia.get(e)[1];
        this.Eia.delete(e);
        t();
      }, t);
      if (this.Eia.has(e)) {
        this.Eia.get(e)[0].Remove();
      }
      this.Eia.set(e, [o, i]);
    } else {
      const s = TimerSystem_1.TimerSystem.Delay(() => {
        this.Sia.delete(s);
        i();
      }, t);
      this.Sia.add(s);
    }
  }
  CleanAction(i = true) {
    this.Sia.forEach(t => t.Remove());
    this.Sia.clear();
    this.Eia.forEach(t => {
      var e = t[0];
      var t = t[1];
      e.Remove();
      if (i) {
        t();
      }
    });
    this.Eia.clear();
  }
}
class PlotTemplate {
  constructor() {
    this.iJi = undefined;
    this.nx = undefined;
    this.oJi = false;
    this.rJi = Transform_1.Transform.Create();
    this.fuc = true;
    this.nJi = 0;
    this.sJi = undefined;
    this.aJi = new Map();
    this.ZYi = new Map();
    this.hJi = new Set();
    this.lJi = new Set();
    this._Ji = new ShowActorParam();
    this.uJi = ACTOR_EMPTY_INDEX;
    this.cJi = "";
    this.mJi = undefined;
    this.dJi = PLAYER_UNUSED_INDEX;
    this.fJi = Vector_1.Vector.Create();
    this.uoe = undefined;
    this.vJi = new RegExp(/(?<=station)\d/);
    this.MJi = new RegExp(/_CU|_MS|_FS|_RFS/);
    this.EJi = false;
    this.AWl = false;
    this.SJi = 0;
    this.yJi = 0;
    this.tNn = -1;
    this.iNn = undefined;
    this.xJt = undefined;
    this.a9s = 0;
    this.Y2_ = undefined;
    this.LJi = new MovingShotManager_1.MovingShotManager();
    this.yia = new DelayActionManager();
    this.m8a = new DelayActionManager();
    this.z2_ = new DelayActionManager();
    this.NP1 = new Map();
  }
  get IsInTemplate() {
    return this.oJi;
  }
  get IsCameraControl() {
    return this.EJi;
  }
  get DJi() {
    if (!this.sJi) {
      this.sJi = new Array();
      for (let t = 0; t < ACTOR_NUM_MAX; t++) {
        var e = new ActorData();
        this.sJi.push(e);
      }
    }
    return this.sJi;
  }
  get MinWaitingTime() {
    if (this.IsInTemplate) {
      return TimeUtil_1.TimeUtil.SetTimeSecond(this.SJi);
    } else {
      return 0;
    }
  }
  StartTemplateNew(i, t, o) {
    this.oJi = true;
    this.EJi = i.UseFreeCamera;
    this.SJi = 0;
    this.nx = t;
    this.AWl = i.IsSwitchMainRole ?? false;
    var e = new Array();
    for (const s of i.Actors) {
      e.push(s.EntityId);
    }
    this.RJi(e, () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "等待模板演出实体完成");
      }
      const t = this.VP1();
      var e;
      if (this.EJi) {
        ControllerHolder_1.ControllerHolder.PlotController.EnableViewControl(true);
      } else {
        (e = ModelManager_1.ModelManager.CameraModel.SequenceCamera.DisplayComponent.CineCamera).ResetSeqCineCamSetting();
        e.D_K2_SetActorTransform(ModelManager_1.ModelManager.CameraModel.CameraTransform, false, undefined, true);
        ControllerHolder_1.ControllerHolder.PlotController.EnableViewControl(false);
        this.yJi = UE.KismetSystemLibrary.GetConsoleVariableFloatValue("r.MotionBlur.Amount");
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.MotionBlur.Amount 0");
        ModelManager_1.ModelManager.PlotModel.SwitchCameraMode(3);
      }
      this.UJi(i.Actors);
      this.mJi = new Array();
      if (this.EJi) {
        this.DJi.forEach((t, e) => {
          if (t.Valid) {
            this.mJi.push({
              Index: e
            });
          }
        });
      }
      this.AJi(i.Actors, () => {
        t.finally(o);
      });
    });
  }
  async VP1() {
    var t = ControllerHolder_1.ControllerHolder.FlowController.GetNextNameAction("ShowTalk");
    if (t) {
      var t = t.Params;
      var e = new Array();
      for (const o of t.TalkItems) {
        if (o.ActorMontageArray) {
          for (const s of o.ActorMontageArray) {
            if (s?.MontageId) {
              var i = s.ActorIndex === this.dJi ? this.PJi(s.MontageId) : s.MontageId;
              let t = undefined;
              if ((t = s.IsAbpMontage ? ModelManager_1.ModelManager.PlotModel.GetAbpMontageConfig(i) : ModelManager_1.ModelManager.PlotModel.GetMontageConfig(i))?.ActionMontage) {
                const r = new CustomPromise_1.CustomPromise();
                e.push(r.Promise);
                ResourceSystem_1.ResourceSystem.LoadAsync(t.ActionMontage, UE.AnimMontage, (t, e) => {
                  if (t?.IsValid()) {
                    this.NP1.set(e, t);
                  }
                  r.SetResult();
                });
              }
            }
          }
        }
      }
      await Promise.all(e);
    }
  }
  UJi(e) {
    this.aJi.clear();
    for (let t = 0; t < ACTOR_NUM_MAX; t++) {
      var i;
      var o;
      var s;
      var r;
      var a = this.DJi[t];
      a.Reset();
      if (!(t >= e.length)) {
        i = t === this.dJi ? ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity : ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e[t].EntityId);
        if (this._Ws(i)) {
          if (o = i.Entity.GetComponent(3)) {
            ModelManager_1.ModelManager.WorldModel.AddIgnore(o.Actor);
            o.ClearInput();
            if ((s = i.Entity.GetComponent(40))?.Valid) {
              s.StopAllSkills("PlotTemplate.ControlActor");
            }
            o.SetActorVelocity(Vector_1.Vector.ZeroVectorProxy);
            if ((s = i.Entity.GetComponent(177))?.Valid) {
              s.SetSightTargetItem(undefined);
            }
            if ((r = i.Entity.GetComponent(68))?.Valid && (a.OriginMoveSync = r.GetEnableMovementSync(), a.OriginMoveSync)) {
              r.SetEnableMovementSync(false, "PlotTemplate");
            }
            a.Valid = true;
            a.EntityId = i.Id;
            a.PbDataId = e[t].EntityId;
            a.TalkerId = e[t].TalkerId;
            a.OriginPos.X = o.ActorLocationProxy.X;
            a.OriginPos.Y = o.ActorLocationProxy.Y;
            a.OriginPos.Z = o.ActorLocationProxy.Z;
            a.OriginPos.A = o.ActorRotationProxy.Yaw;
            a.OriginPos.Roll = o.ActorRotationProxy.Roll;
            a.OriginPos.Pitch = o.ActorRotationProxy.Pitch;
            Object.assign(a.Pos, a.OriginPos);
            a.IsPosReset = e[t].IsResetPosition;
            a.OriginEnableLookAt = false;
            a.Visible = true;
            a.OriginMoveMode = o.Actor.CharacterMovement.MovementMode;
            if (!a.IsPlayer()) {
              r = i?.Entity?.GetComponent(187);
              a.FaceChangeManager = r?.ExpressionController;
            }
            if (a.TalkerId !== -1) {
              if (this.aJi.has(a.TalkerId) && Log_1.Log.CheckWarn()) {
                Log_1.Log.Warn("Plot", 26, "重复的对话人，请策划检查配置");
              }
              this.aJi.set(a.TalkerId, a);
            } else if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Plot", 26, "未配置说话人，口型和自动看向功能不生效", ["演员位", t]);
            }
            if (t === this.dJi) {
              o.Entity.GetComponent(81).HideWeapon(-1, true, false);
              if (!this.EJi) {
                o.Actor.CharRenderingComponent?.SetDisableFightDither(true);
              }
              a.PositionLocked = this.nx.KeepMainRolePose;
            } else {
              NpcPerformController_1.NpcPerformController.ForceSetNpcDitherVisible(true, a.PbDataId, 1);
              if ((r = i.Entity.GetComponent(187))?.Valid) {
                a.OriginEnableLookAt = r.OpenLookAt;
                r.SetLookAtPlayerEnabled(false);
                r.OnNpcInPlot(true);
                a.PositionLocked = r.GetIsUseFixLocation();
              }
              if ((r = i.Entity?.GetComponent(47))?.Valid && (a.OriginEnableAi = r.IsAiDriver && r.IsEnabled(), a.OriginEnableAi)) {
                r.DisableAi("Plot Control Ai");
              }
              if (!a.PositionLocked && !i?.Entity?.GetComponent(229)?.IsOnVehicle) {
                o.Actor.KuroSetMovementMode({
                  Mode: 1,
                  Context: "[PlotTemplate.ControlActor]"
                });
              }
              s.SetBlendSpaceLookAt(true);
            }
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Plot", 26, "演员信息", ["index", t], ["actor", o.Actor.GetName()], ["entityId", a.EntityId], ["pbDataId", a.PbDataId === -1 ? o.CreatureData.GetPbDataId() : a.PbDataId]);
            }
          } else if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Plot", 26, "实体类型错误", ["PbDataId", e[t].EntityId]);
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Plot", 26, "模板演出拿不到演员", ["PbDataId", e[t].EntityId]);
        }
      }
    }
  }
  _Ws(t) {
    return !!t?.Valid && !!t?.IsInit && !!t?.Entity?.Active && !!(t = t.Entity.GetComponent(0)) && !t.GetRemoveState();
  }
  AJi(e, t) {
    if (this.nx.IsBackground) {
      t();
    } else {
      var i = new Array();
      for (let t = 0; t < e.length; t++) {
        var o = e[t];
        var s = this.DJi[t];
        if (s.Valid) {
          var r;
          var a = o.InitialState?.InitialMontage;
          if (a) {
            r = s.IsPlayer() ? this.PJi(a.MontageId.MontageId) : a.MontageId.MontageId;
            if (a = a.MontageId.IsAbp ? ModelManager_1.ModelManager.PlotModel.GetAbpMontageConfig(r) : ModelManager_1.ModelManager.PlotModel.GetMontageConfig(r)) {
              i.push(this.xJi(s, a.ActionMontage));
            } else {
              ControllerHolder_1.ControllerHolder.FlowController.LogError("初始化演员蒙太奇时找不到资源", ["id", r]);
            }
          }
          var _ = EntitySystem_1.EntitySystem.Get(s.EntityId);
          var a = o.InitialState?.InitialLookAt;
          if (a) {
            r = _.GetComponent(177);
            this.wJi(r, a, s);
          }
          var a = o.InitialState?.InitialEffects;
          if (a) {
            let t = undefined;
            for (const l of t = s.IsPlayer() && ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender() === 1 ? a.EffectIdsMaleVariant ?? a.EffectIds : a.EffectIds) {
              var h = _.GetComponent(225);
              if (h) {
                s.QueHandleIds.push(h.AddCue(l));
              }
            }
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Plot", 26, "初始化演员失败", ["EntityId", o.EntityId]);
        }
      }
      const n = new CustomPromise_1.CustomPromise();
      i.push(n.Promise);
      TimerSystem_1.TimerSystem.Delay(() => {
        n.SetResult();
      }, exports.BEGIN_WAIT_TIME);
      Promise.all(i).finally(t);
    }
  }
  async SetTemplateNew(e) {
    if (!this.EJi && e && this.IsInTemplate) {
      var i;
      var o;
      this.bJi(e.TemplateMode.CameraId);
      if (e.TargetPos) {
        this.qJi(e.TargetPos);
        i = Vector_1.Vector.Create(e.TargetPos.X, e.TargetPos.Y, e.TargetPos.Z);
        o = Rotator_1.Rotator.Create(e.TargetPos.Pitch ?? 0, e.TargetPos.A ?? 0, e.TargetPos.Roll ?? 0);
        this.rJi.SetRotation(o.Quaternion());
        this.rJi.SetLocation(i);
        this.rJi.SetScale3D(Vector_1.Vector.OneVectorProxy);
        this.nJi = e.TargetPos.A;
        if (o.Pitch === 0 && o.Roll === 0) {
          this.fuc = true;
        } else {
          this.fuc = false;
        }
      }
      let t = false;
      if (e.ActorIndexArray) {
        t = true;
        this.mJi = e.ActorIndexArray;
      }
      if (this.mJi) {
        i = e.CameraPosAndRot ? Transform_1.Transform.Create(Rotator_1.Rotator.Create(e.CameraPosAndRot.CameraRotate.Y, e.CameraPosAndRot.CameraRotate.Z, e.CameraPosAndRot.CameraRotate.X).Quaternion(), Vector_1.Vector.Create(e.CameraPosAndRot.CameraOffset.X, e.CameraPosAndRot.CameraOffset.Y, e.CameraPosAndRot.CameraOffset.Z), Vector_1.Vector.OneVectorProxy) : undefined;
        o = this.GJi(t);
        this.NJi();
        this.OJi(i, e.CameraSetting);
        this.PlayCameraAnimCompatible(e.CameraAnim);
        await o;
      } else {
        ControllerHolder_1.ControllerHolder.FlowController.LogError("没有演员列表啊，前面也没有");
      }
    }
  }
  bJi(t) {
    var e;
    this.iJi = ModelManager_1.ModelManager.PlotModel.GetPlotTemplateConfig(t);
    if (this.iJi) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "演出模板", ["TemplateName", this.iJi.Name]);
      }
      e = this.vJi.exec(this.iJi.Name);
      this.uJi = e !== null && e.length > 0 ? parseInt(e[0]) - 1 : ACTOR_EMPTY_INDEX;
      e = this.MJi.exec(this.iJi.Name);
      this.cJi = e !== null && e.length > 0 ? e[0] : "UNDEFINED";
    } else {
      ControllerHolder_1.ControllerHolder.FlowController.LogError("C级演出模板配置读取失败", ["Id", t]);
    }
  }
  async GJi(e) {
    let i = undefined;
    var o = this.iJi.ActorDataArray;
    var s = Vector_1.Vector.Create(0, 0, 0);
    var r = Vector_1.Vector.Create(0, 0, 0);
    var a = new UE.VectorDouble(0, 0, 0);
    var _ = new UE.Rotator(0, 0, 0);
    var h = Vector_1.Vector.Create(0, 0, 0);
    this.fJi.X = 0;
    this.fJi.Y = 0;
    this.fJi.Z = 0;
    var t = Time_1.Time.Frame;
    if (!this.nx.IsBackground) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "剧情切镜飘带处理 -关闭", ["frame", t]);
      }
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.DisableKawaiiSimulate 1");
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.InvalidSeveralFrameOcculusion 5");
    }
    for (let t = 0; t < o.length && !(t >= this.mJi.length) && !(t >= this.DJi.length); t++) {
      var n = this.mJi[t];
      if (n.Index !== ACTOR_EMPTY_INDEX && !(n.Index >= this.DJi.length)) {
        var l = this.DJi[n.Index];
        if (l.Valid) {
          if (!l.PositionLocked) {
            var c = EntitySystem_1.EntitySystem.Get(l.EntityId)?.GetComponent(3);
            if (c) {
              if (this.fuc) {
                if (e && n.Offset) {
                  this.qJi(n.Offset);
                  a.X = n.Offset.X;
                  a.Y = n.Offset.Y;
                  a.Z = n.Offset.Z;
                  _.Yaw = (n.Offset.A + 180) % 360 - 180;
                  _.Roll = 0;
                  _.Pitch = 0;
                  r.FromUeVector(a);
                } else {
                  m = o[t];
                  s.Set(m.X, m.Y, 0);
                  this.rJi.TransformPosition(s, r);
                  a.Set(r.X, r.Y, r.Z);
                  _.Yaw = (m.A + this.nJi + 180) % 360 - 180;
                  _.Roll = 0;
                  _.Pitch = 0;
                }
                m = a.Z;
                this.kJi(Vector_1.Vector.Create(a), c);
                h.X = 0;
                h.Y = 0;
                h.Z = a.Z - m;
                a.Z += c.Actor.CapsuleComponent.GetScaledCapsuleHalfHeight();
              } else {
                if (e && n.Offset) {
                  this.qJi(n.Offset);
                  a.X = n.Offset.X;
                  a.Y = n.Offset.Y;
                  a.Z = n.Offset.Z;
                  _.Roll = (n.Offset.Roll + 180) % 360 - 180;
                  _.Pitch = (n.Offset.Pitch + 180) % 360 - 180;
                  _.Yaw = (n.Offset.A + 180) % 360 - 180;
                  r.FromUeVector(a);
                } else {
                  v = o[t];
                  s.Set(v.X, v.Y, 0);
                  this.rJi.TransformPosition(s, r);
                  a.Set(r.X, r.Y, r.Z);
                  v = Rotator_1.Rotator.Create(0, v.A, 0);
                  d = Rotator_1.Rotator.Create(0, 0, 0);
                  this.rJi.TransformRotation(v, d);
                  _.Roll = (d.Roll + 180) % 360 - 180;
                  _.Pitch = (d.Pitch + 180) % 360 - 180;
                  _.Yaw = (d.Yaw + 180) % 360 - 180;
                }
                v = Vector_1.Vector.Create(a);
                d = Vector_1.Vector.Create(a);
                this.kJi(d, c);
                d.Subtraction(v, h);
                M = _.RotateVectorDouble(new UE.VectorDouble(0, 0, c.Actor.CapsuleComponent.GetScaledCapsuleHalfHeight()));
                a.X += M.X;
                a.Y += M.Y;
                a.Z += M.Z;
              }
              var m;
              var v;
              var d;
              var M = this.FJi(l.Pos, a.X, a.Y, a.Z, _.Yaw);
              l.Pos.X = a.X;
              l.Pos.Y = a.Y;
              l.Pos.Z = a.Z;
              l.Pos.A = _.Yaw;
              l.Pos.Roll = _.Roll;
              l.Pos.Pitch = _.Pitch;
              if (!this.nx.IsBackground) {
                if (!l.IsPlayer() && c.HasMesh()) {
                  c.SkeletalMesh.bForceTickThisFrame = true;
                }
                if (t === this.uJi) {
                  if (Log_1.Log.CheckDebug()) {
                    Log_1.Log.Debug("Plot", 26, "演员位", ["station", this.uJi]);
                  }
                  this.fJi = h;
                }
                if (M) {
                  if (Log_1.Log.CheckDebug()) {
                    Log_1.Log.Debug("Plot", 26, "位置相同，略了", ["id", l.PbDataId]);
                  }
                } else {
                  if (l.IsPlayer()) {
                    if (this.VJi(l.OriginPos, l.Pos)) {
                      i = TeleportController_1.TeleportController.TeleportToPositionNoLoading(a, _, "剧情演出.SetupTemplateActor");
                      continue;
                    }
                    if (c.Actor.CharacterMovement) {
                      c.Actor.KuroSetMovementMode({
                        Mode: c.Actor.CharacterMovement.DefaultLandMovementMode,
                        Context: "[PlotTemplate.SetupTemplateActor]"
                      });
                    }
                  }
                  c.FixBornLocation("剧情演出.SetupTemplateActor", true, r, false);
                  c.SetActorRotation(_, "剧情演出.SetupTemplateActor", false);
                  c.SetInputRotator(_);
                }
              }
            } else if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Plot", 26, "无法获取实体CharacterActorComponent", ["PbDataId", l.PbDataId]);
            }
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Plot", 26, "演员无效", ["演员位置", n.Index]);
        }
      }
    }
    if (i !== undefined) {
      await i;
    }
    if (!this.nx.IsBackground) {
      this.iNn = new CustomPromise_1.CustomPromise();
      this.tNn = t + 3;
      await this.iNn.Promise;
    }
    return true;
  }
  rNn() {
    var t;
    if (!!this.iNn && !((t = Time_1.Time.Frame) < this.tNn)) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "剧情切镜飘带处理 -开启", ["curFrame", t]);
      }
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.DisableKawaiiSimulate 0");
      t = this.iNn;
      this.tNn = -1;
      this.iNn = undefined;
      t.SetResult();
    }
  }
  FJi(t, e, i, o, s) {
    return MathUtils_1.MathUtils.IsNearlyEqual(t.X, e, 1) && MathUtils_1.MathUtils.IsNearlyEqual(t.Y, i, 1) && MathUtils_1.MathUtils.IsNearlyEqual(t.Z, o, 1) && MathUtils_1.MathUtils.IsNearlyEqual(t.A, s, 1);
  }
  VJi(t, e) {
    t = Vector_1.Vector.Create(t);
    e = Vector_1.Vector.Create(e);
    return Vector_1.Vector.DistSquared(t, e) > MAX_POS_DIST_SQ;
  }
  OJi(i, e) {
    if (!this.nx.IsBackground) {
      this.LJi.Stop();
      var o = this.iJi.CameraData;
      let t = i;
      if (!t) {
        var i = Vector_1.Vector.Create(o.Pos.X, o.Pos.Y, o.Pos.Z);
        var s = Rotator_1.Rotator.Create(o.Rot.Y, o.Rot.Z, o.Rot.X);
        if ((this.cJi === "_CU" || this.cJi === "_MS") && this.uJi >= 0 && this.uJi < this.mJi.length) {
          var r = this.mJi[this.uJi].Index;
          let e = 0;
          if (r !== ACTOR_EMPTY_INDEX) {
            r = this.DJi[r];
            let t = EntitySystem_1.EntitySystem.Get(r.EntityId)?.GetComponent(3)?.Actor.Mesh.D_GetSocketTransform(PlotTemplate.HJi, 2)?.GetLocation().Z ?? DEFAULT_CAMERA_BASE;
            e = t === 0 ? (t = EntitySystem_1.EntitySystem.Get(r.EntityId)?.GetComponent(3)?.Actor.Mesh.D_GetSocketTransform(PlotTemplate.jJi, 2)?.GetLocation().Z ?? DEFAULT_CAMERA_BASE_HEAD) !== 0 ? t - DEFAULT_CAMERA_BASE_HEAD : 0 : t - DEFAULT_CAMERA_BASE;
            r = Vector_1.Vector.Create(0, 0, e);
            if (!this.fuc) {
              a = Vector_1.Vector.Create(0, 0, 0);
              this.rJi.TransformVector(r, a);
              r.DeepCopy(a);
            }
            this.fJi.X += r.X;
            this.fJi.Y += r.Y;
            this.fJi.Z += r.Z;
            i.X += this.fJi.X;
            i.Y += this.fJi.Y;
            i.Z += this.fJi.Z;
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Plot", 26, "CU、MS相机自动调整", ["Offset", this.fJi]);
            }
          }
        }
        var a = Transform_1.Transform.Create(s.Quaternion(), i, Vector_1.Vector.OneVectorProxy);
        t = Transform_1.Transform.Create();
        a.ComposeTransforms(this.rJi, t);
      }
      r = CameraController_1.CameraController.SequenceCamera.GetComponent(9).CineCamera;
      s = r.CameraComponent;
      if (ObjectUtils_1.ObjectUtils.IsValid(r)) {
        r.D_K2_SetActorTransform(t.ToUeTransform(), false, undefined, true);
        r.ResetSeqCineCamSetting();
        if (e) {
          s.CurrentAperture = e.Aperture;
          s.CurrentFocalLength = e.FocalLength;
          s.FocusSettings.ManualFocusDistance = e.FocusDistance;
          s.CurrentFocalRegion = e.FocalRegion;
        } else {
          if (o.Aperture) {
            s.CurrentAperture = o.Aperture;
          }
          if (o.FocalLength) {
            s.CurrentFocalLength = o.FocalLength;
          }
          if (o.FocusDistance) {
            s.FocusSettings.ManualFocusDistance = o.FocusDistance;
          }
          if (o.FocalRegion) {
            s.CurrentFocalRegion = o.FocalRegion;
          }
        }
        this.WJi();
      }
    }
  }
  WJi() {
    for (const t of this.DJi) {
      if (t.Valid && t.Visible) {
        EntitySystem_1.EntitySystem.Get(t.EntityId)?.GetComponent(177)?.StartForceDisableAnimOptimization(0);
      }
    }
  }
  async EndTemplateNew(t) {
    if (this.IsInTemplate) {
      this.LJi.Stop();
      this.yia.CleanAction(false);
      this.m8a.CleanAction(false);
      if (!this.EJi) {
        ModelManager_1.ModelManager.PlotModel.SwitchCameraMode(1);
        CameraController_1.CameraController.FightCamera.LogicComponent.ResetArmLengthAndRotation(ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.PlotTemplateCameraExitRotation.ToUeRotator());
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.MotionBlur.Amount " + this.yJi);
      }
      if (this.AWl) {
        ControllerHolder_1.ControllerHolder.PlotController.RestoreChangeRole();
      }
      t = this.Lc(t);
      if (!this.nx.IsBackground) {
        await t;
      }
      this.hJi.forEach(t => {
        TimerSystem_1.TimerSystem.Remove(t);
      });
      this.hJi.clear();
      this.lJi.forEach(t => {
        TimerSystem_1.TimerSystem.Remove(t);
      });
      this.lJi.clear();
      this.ZYi.clear();
      this.fJi.X = 0;
      this.fJi.Y = 0;
      this.fJi.Z = 0;
      this.iJi = undefined;
      this.rJi.Reset();
      this.nJi = 0;
      this.fuc = true;
      this.dJi = PLAYER_UNUSED_INDEX;
      this.oJi = false;
      this.SJi = 0;
      this.NP1.clear();
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Kuro.DisableKawaiiSimulate 0");
    }
  }
  async Lc(e) {
    e?.EndState?.StayFlowMontageActors?.forEach(t => {
      this.DJi[t].IsMontageKeep = true;
    });
    var i = [];
    for (let t = 0; t < this.DJi.length; t++) {
      var o = this.DJi[t];
      if (o.Valid) {
        var s = EntitySystem_1.EntitySystem.Get(o.EntityId);
        var r = s?.GetComponent(3);
        if (r) {
          r.ClearInput();
          ModelManager_1.ModelManager.WorldModel.RemoveIgnore(r.Actor);
          if (!o.Visible) {
            ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(s, true, "[PlotTemplate.ReleaseActor] 恢复模板演出实体显隐");
          }
          if (o.MouseMontageLoadingId !== ResourceSystem_1.ResourceSystem.InvalidId) {
            ResourceSystem_1.ResourceSystem.CancelAsyncLoad(o.MouseMontageLoadingId);
            o.MouseMontageLoadingId = ResourceSystem_1.ResourceSystem.InvalidId;
          }
          var a = s.GetComponent(177);
          var _ = a?.MainAnimInstance;
          if (ObjectUtils_1.ObjectUtils.IsValid(_)) {
            a.ResetSightLimit();
            a.SetSightTargetItem(undefined);
          }
          var _ = s.GetComponent(68);
          if (_?.Valid && o.OriginMoveSync) {
            _.SetEnableMovementSync(true, "PlotTemplate");
          }
          const h = s?.GetComponent(225);
          if (h) {
            o.QueHandleIds.forEach(t => {
              if (t !== GameplayCueController_1.INVALID_CUE_HANDLE) {
                h.RemoveCueByHandle(t);
              }
            });
          }
          if (t === this.dJi) {
            if (!this.EJi) {
              r.Actor.CharRenderingComponent?.SetDisableFightDither(false);
            }
            if (!o.IsMontageKeep) {
              a.MontageManager.StopMontage({
                Method: 0,
                BlendOutTime: MONTAGE_BLEND_OUT_TIME
              });
            }
          } else {
            NpcPerformController_1.NpcPerformController.ForceSetNpcDitherVisible(false, o.PbDataId, 1);
            if ((_ = s?.GetComponent(47))?.Valid && o.OriginEnableAi) {
              _.EnableAi("Plot Control Ai");
            }
            if ((_ = s.GetComponent(187))?.Valid) {
              if (o.OriginEnableLookAt) {
                _.SetLookAtPlayerEnabled(true);
              }
              if (!o.IsMontageKeep) {
                _.StopPerformMontage(1, {
                  Method: 0,
                  BlendOutTime: MONTAGE_BLEND_OUT_TIME
                });
              }
              _.OnNpcInPlot(false);
            }
            if (!s.GetComponent(229)?.IsOnVehicle) {
              r.Actor.KuroSetMovementMode({
                Mode: o.OriginMoveMode,
                Context: "[PlotTemplate.ReleaseActor]"
              });
            }
            a.SetBlendSpaceLookAt(false);
            _ = s.GetComponent(0).GetModelConfig();
            if (!ObjectUtils_1.ObjectUtils.SoftObjectPathIsValid(_.DA) || !!StringUtils_1.StringUtils.IsEmpty(_.DA.AssetPathName?.toString()) || _.DA.AssetPathName?.toString() === "None") {
              a = r.SkeletalMesh.SkeletalMesh;
              UE.KuroMeshTextureFunctionLibrary.HandleSkeletalMeshComponentStreaming(a, false);
            }
          }
          i.push(this.KJi(o, e?.IsResetPosition));
          o.Reset();
        } else if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "模板结束时无法获取实体CharacterActorComponent", ["EntityId", o.EntityId], ["PbDataId", o.PbDataId]);
        }
      }
    }
    await Promise.all(i);
  }
  async KJi(e, i = false) {
    if (!ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode() && (e.IsPlayer() || !e.PositionLocked)) {
      var o;
      var s;
      var r;
      var a = Vector_1.Vector.Create();
      var _ = new UE.Rotator(0, 0, 0);
      let t = false;
      if (i && e.IsPosReset) {
        _.Yaw = e.OriginPos.A;
        _.Roll = e.OriginPos.Roll;
        _.Pitch = e.OriginPos.Pitch;
        a.Set(e.OriginPos.X, e.OriginPos.Y, e.OriginPos.Z);
        t = true;
      } else if (this.nx.IsBackground) {
        _.Yaw = e.Pos.A;
        _.Roll = e.Pos.Roll;
        _.Pitch = e.Pos.Pitch;
        a.Set(e.Pos.X, e.Pos.Y, e.Pos.Z);
        t = true;
      }
      if (t) {
        o = (i = EntitySystem_1.EntitySystem.Get(e.EntityId)).GetComponent(3);
        if (this.EJi) {
          if (e.IsPlayer()) {
            o.SetInputRotator(_);
          } else {
            i = i.GetComponent(46);
            s = Rotator_1.Rotator.Create(_);
            r = Vector_1.Vector.Create();
            s.Vector(r);
            i.PerformTurn(1, {
              Direction: r
            });
          }
        } else if (e.IsPlayer()) {
          await TeleportController_1.TeleportController.TeleportToPositionNoLoading(a.ToUeVector(), _, "模板演出结束设置位置", false);
        } else {
          o.SetActorRotation(_, "模板演出结束设置位置", false);
          o.SetInputRotator(_);
          o.FixBornLocation("模板演出结束设置位置", true, a, false);
        }
      }
    }
  }
  RJi(t, e) {
    const i = new Array();
    this.dJi = PLAYER_UNUSED_INDEX;
    for (const o of t) {
      if (o !== PLAYER_USED_ID) {
        i.push(o);
      } else {
        this.dJi = t.indexOf(o);
      }
    }
    if (this.AWl) {
      PlotController_1.PlotController.RequestChangeRole();
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Plot", 17, "剧情加载等待-npc-开始", ["", i]);
    }
    WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId("PlotTemplate.WaitActor", i, t => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 17, "剧情加载等待-npc-完成", ["result", t]);
      }
      this.$In(i, e);
    }, WAIT_ENTITY_TIME);
  }
  $In(t, o) {
    const s = new Map();
    for (const r of t) {
      var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r);
      if (e?.IsInit) {
        var i = e.Entity.GetComponent(0)?.GetModelConfig();
        if (i) {
          if (ObjectUtils_1.ObjectUtils.SoftObjectPathIsValid(i.DA)) {
            i = i.DA.AssetPathName?.toString();
            if (i?.length && i !== "None") {
              continue;
            }
          }
          i = e.Entity.GetComponent(3)?.SkeletalMesh?.SkeletalMesh;
          if (ObjectUtils_1.ObjectUtils.IsValid(i)) {
            s.set(i, false);
          }
        }
      }
    }
    if (s.size === 0) {
      o();
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Plot", 26, "剧情加载等待 npc纹理流送 开始", ["size", s.size]);
      }
      this.a9s = 0;
      this.xJt = TimerSystem_1.TimerSystem.Forever(() => {
        this.a9s++;
        let t = true;
        for (var [e, i] of s) {
          if (!i) {
            if (UE.KuroMeshTextureFunctionLibrary.IsSkeletalMeshComponentStreamingComplete(e)) {
              s.set(e, true);
            } else {
              t = false;
            }
          }
        }
        if (t || this.a9s > 15) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Plot", 26, "剧情加载等待 npc纹理流送 完成", ["checkTimes", this.a9s]);
          }
          this.a9s = 0;
          this.xJt?.Remove();
          this.xJt = undefined;
          o();
        }
      }, 200);
    }
  }
  qJi(t) {
    return !!t && !(t.A = t.A ?? 0, t.X = t.X ?? 0, t.Y = t.Y ?? 0, t.Z = t.Z ?? 0, t.A === undefined) && t.X !== undefined && t.Y !== undefined && t.Z !== undefined && !isNaN(t.A) && !isNaN(t.X) && !isNaN(t.Y) && !isNaN(t.Z);
  }
  PlayCameraAnimCompatible(t) {
    if (t && !this.nx.IsBackground) {
      this.LJi.Play({
        Type: IAction_1.EShowTalkCameraMotionType.Preset,
        CamShake: {
          CameraShakeBp: ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.TemplateCameraShakePath
        }
      });
    }
  }
  async HandleTemplateShowTalk(t) {
    var e;
    var i;
    if (this.IsInTemplate) {
      if (t.CameraData && Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Plot", 26, "旧演出模板已废弃");
      }
      if (t.FlowTemplateList || t.FlowTemplate) {
        e = [];
        if (t.FlowTemplateList) {
          e.push(...t.FlowTemplateList);
        }
        if (t.FlowTemplate) {
          e.push(t.FlowTemplate);
        }
        e.sort((t, e) => (t.DelayTime ?? 0) - (e.DelayTime ?? 0));
        i = !!e[0].DelayTime && e[0].DelayTime > TimerSystem_1.MIN_TIME && e[0].DelayTime < TimerSystem_1.MAX_TIME;
        this.z2_.CleanAction(i);
        this.J2_(e);
      } else {
        this.z2_.CleanAction(true);
      }
      if (this.Y2_) {
        await this.Y2_;
      }
      this.JJi(t);
      this.QJi(t.WhoId, t.ActorTurnToArray);
      if (!this.nx.IsBackground) {
        this.XJi(t.WhoId, t.ActorLookAtArray, t.Type === "Option");
        this.$Ji(t.ActorMontageArray);
      }
    }
  }
  J2_(e) {
    for (let t = 0; t < e.length; t++) {
      const o = e[t];
      var i = o.DelayTime ? o.DelayTime * CommonDefine_1.MILLIONSECOND_PER_SECOND : 0;
      this.z2_.DelayAction(0, i, () => {
        this.Z2_(o);
      }, t === e.length - 1);
    }
  }
  Z2_(t) {
    if (t) {
      if (this.Y2_) {
        this.Y2_.finally(() => {
          this.Z2_(t);
        });
      } else {
        const e = new CustomPromise_1.CustomPromise();
        this.Y2_ = e.Promise;
        TimerSystem_1.TimerSystem.Next(() => {
          this.SetTemplateNew(t).finally(() => {
            this.Y2_ = undefined;
            e.SetResult();
          });
        });
      }
    }
  }
  JJi(t) {
    let e = undefined;
    switch (t.Type) {
      case "Talk":
      case "Option":
        e = t.CameraMotion;
    }
    if (e) {
      this.LJi.Play(e);
    }
  }
  XJi(t, e, i) {
    this.yia.CleanAction();
    let o = undefined;
    let s = undefined;
    if (i) {
      if (this.dJi !== PLAYER_UNUSED_INDEX) {
        o = this.DJi[this.dJi];
        s = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(3);
      }
    } else {
      o = this.aJi.get(t);
      s = o?.Valid ? EntitySystem_1.EntitySystem.Get(o.EntityId)?.GetComponent(3) : undefined;
    }
    if (!s?.Valid) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "说话人未在模板内，可能会导致演员看向错误");
      }
    }
    const r = new Map();
    e?.forEach(t => {
      var e;
      if (r.has(t.ActorIndex)) {
        (e = r.get(t.ActorIndex)).push(t);
        e.sort((t, e) => (t.DelayTime ?? 0) - (e.DelayTime ?? 0));
      } else {
        (e = new Array()).push(t);
        r.set(t.ActorIndex, e);
      }
    });
    for (const n of this.DJi) {
      var a;
      if (!!n.Valid && !n.Visible && !n.LookLocked) {
        if ((a = EntitySystem_1.EntitySystem.Get(n.EntityId)?.GetComponent(177))?.Valid) {
          a.ResetSightLimit();
          a.SetSightTargetItem(undefined);
        }
      }
    }
    for (const l of this.mJi) {
      if (l.Index !== ACTOR_EMPTY_INDEX) {
        var _;
        var h = this.DJi[l.Index];
        if (h.Valid) {
          const c = EntitySystem_1.EntitySystem.Get(h.EntityId)?.GetComponent(177);
          if (c?.Valid) {
            _ = h.LookLocked;
            if ((!r.has(l.Index) || !this.Iia(c, r.get(l.Index), h, o)) && !_) {
              if (this.cJi === "_CU" && l === this.mJi[this.uJi]) {
                c.ResetSightLimit();
                c.SetSightTargetItem(undefined);
              } else if (h.Visible && h.Valid) {
                if (o?.Visible && o?.Valid) {
                  if (h === o) {
                    if (!c.GetSightTargetPoint() && !this.zJi(c.GetSightTargetItem())) {
                      c.ResetSightLimit();
                      c.SetSightTargetItem(undefined);
                    }
                  } else {
                    _ = ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.PlotTemplateLookAtDelay;
                    _ = MathUtils_1.MathUtils.GetRandomRange(_[0], _[1]);
                    this.yia.DelayAction(h.EntityId, _, () => {
                      c.ResetSightLimit();
                      c.SetSightTargetItem(s);
                    }, false);
                  }
                } else {
                  c.ResetSightLimit();
                  c.SetSightTargetItem(undefined);
                }
              }
            }
          }
        }
      }
    }
  }
  Iia(i, t, o, s) {
    const r = t.length - 1;
    if (r < 0) {
      return false;
    }
    let a = false;
    t.forEach((t, e) => {
      a ||= (t.DelayTime ?? 0) * CommonDefine_1.MILLIONSECOND_PER_SECOND < TimerSystem_1.MIN_TIME;
      this.wJi(i, t.Target, o, s, t.DelayTime, e === r);
    });
    return a;
  }
  wJi(e, t, i, o, s = 0, r) {
    let a = undefined;
    let _ = false;
    switch (t.Type) {
      case 3:
        {
          var h = t;
          const l = Vector_1.Vector.Create(h.Pos.X ?? 0, h.Pos.Y ?? 0, h.Pos.Z ?? 0);
          _ = h.Lock ?? false;
          a = () => {
            e.SetSightLimit([-90, 90], [-90, 90]);
            e.SetSightTargetPoint(l);
          };
          break;
        }
      case 2:
        var h = t;
        var n = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(h.EntityId);
        if (n?.IsInit) {
          const c = n.Entity.GetComponent(3) ?? n.Entity.GetComponent(202);
          _ = h.Lock ?? false;
          a = () => {
            e.ResetSightLimit();
            e.SetSightTargetItem(c);
          };
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Plot", 26, "看向的实体不存在", ["pbdataid", h.EntityId]);
        }
        break;
      case 1:
        _ = t.Lock ?? false;
        a = () => {
          e.ResetSightLimit();
          e.SetSightTargetItem(undefined);
        };
        break;
      case 4:
        {
          n = t;
          const m = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(3);
          _ = n.Lock ?? false;
          a = () => {
            e.ResetSightLimit();
            e.SetSightTargetItem(m);
          };
          break;
        }
      case 0:
      case 5:
        {
          let t = undefined;
          if (o && i !== o) {
            t = EntitySystem_1.EntitySystem.Get(o.EntityId)?.GetComponent(3);
          }
          _ = false;
          a = () => {
            e.ResetSightLimit();
            e.SetSightTargetItem(t);
          };
          break;
        }
      case 6:
        h = t;
        if (h.ActorIndex >= 0 && h.ActorIndex < this.DJi.length && this.DJi[h.ActorIndex].Valid) {
          const v = EntitySystem_1.EntitySystem.Get(this.DJi[h.ActorIndex].EntityId)?.GetComponent(1);
          _ = h.Lock ?? false;
          a = () => {
            e.ResetSightLimit();
            e.SetSightTargetItem(v);
          };
        }
    }
    if (a) {
      i.LookLocked = _;
      if ((s = (s ?? 0) * CommonDefine_1.MILLIONSECOND_PER_SECOND) > TimerSystem_1.MIN_TIME) {
        this.yia.DelayAction(i.EntityId, s, a, _);
      } else {
        a();
      }
    }
  }
  zJi(t) {
    if (!t) {
      return false;
    }
    if ((0, RegisterComponent_1.isComponentInstance)(t, 3)) {
      for (const e of this.DJi) {
        if (!e.Visible && e.Valid) {
          if (EntitySystem_1.EntitySystem.Get(e.EntityId)?.GetComponent(3) === t) {
            return false;
          }
        }
      }
    }
    return true;
  }
  $Ji(t) {
    this.m8a.CleanAction();
    this.hJi.clear();
    for (const a of this.DJi) {
      if (!a.OverlayMontageKeeping) {
        a.OverlayMontagePath = undefined;
      }
      a.MontageBlendToEnd = false;
      if (a.MouseMontageLoadingId !== ResourceSystem_1.ResourceSystem.InvalidId) {
        ResourceSystem_1.ResourceSystem.CancelAsyncLoad(a.MouseMontageLoadingId);
        a.MouseMontageLoadingId = ResourceSystem_1.ResourceSystem.InvalidId;
      }
      EntitySystem_1.EntitySystem.Get(a.EntityId)?.GetComponent(177)?.MainAnimInstance?.StopSlotAnimation(0, SequenceDefine_1.ABP_Mouth_Slot_Name);
    }
    var e = new Set();
    if (t) {
      var i = [...t];
      i.sort((t, e) => (t.DelayTime ?? 0) - (e.DelayTime ?? 0));
      var o = new Set();
      for (let t = i.length - 1; t >= 0; t--) {
        var s = i[t];
        if (o.has(s.ActorIndex)) {
          s.KeepPose = false;
        } else if (s.KeepPose ?? s.EndLoopingMontage ?? s.EndMontageDirectly) {
          s.KeepPose = true;
          o.add(s.ActorIndex);
          s.KeepPose = true;
        }
      }
      for (const _ of i) {
        if (!(_.ActorIndex < 0) && !(_.ActorIndex >= ACTOR_NUM_MAX)) {
          const h = this.DJi[_.ActorIndex];
          if (h.Valid && h.Visible) {
            var r = _.DelayTime ? TimeUtil_1.TimeUtil.SetTimeMillisecond(_.DelayTime) : 0;
            if (r <= TimerSystem_1.MIN_TIME) {
              if (_.EndMontageDirectly) {
                h.MontageKeeping = false;
                h.OverlayMontageKeeping = false;
                h.MontageBlendToEnd = true;
                continue;
              }
              if (_.EndLoopingMontage) {
                h.MontageKeeping = false;
                h.OverlayMontageKeeping = false;
                h.MontageBlendToEnd = false;
                continue;
              }
              this.ZJi(h, _);
              e.add(h);
            } else {
              if (_.EndMontageDirectly) {
                this.m8a.DelayAction(h.PbDataId, r, () => {
                  h.MontageKeeping = false;
                  h.OverlayMontageKeeping = false;
                  h.MontageBlendToEnd = true;
                  this.tzi(h);
                }, _.KeepPose ?? false);
                continue;
              }
              if (_.EndLoopingMontage) {
                this.m8a.DelayAction(h.PbDataId, r, () => {
                  h.MontageKeeping = false;
                  h.OverlayMontageKeeping = false;
                  h.MontageBlendToEnd = false;
                  this.tzi(h);
                }, _.KeepPose ?? false);
                continue;
              }
              this.m8a.DelayAction(h.PbDataId, r, () => {
                this.ZJi(h, _);
              }, _.KeepPose ?? false);
            }
            if (_.OverlayMontage) {
              r = _.OverlayMontage?.DelayTime ? TimeUtil_1.TimeUtil.SetTimeMillisecond(_.OverlayMontage.DelayTime) : 0;
              if (r <= TimerSystem_1.MIN_TIME) {
                this.ezi(h, _, false);
              } else {
                const n = TimerSystem_1.TimerSystem.Delay(() => {
                  this.ezi(h, _, true);
                  this.hJi.delete(n);
                }, r);
                this.hJi.add(n);
              }
            }
          }
        }
      }
    }
    for (const l of this.DJi) {
      if (l.Valid && l.Visible) {
        if (!e.has(l)) {
          this.tzi(l);
        }
        this.izi(l);
        this.BJi(l.OverlayMontagePath, t => {
          this.rzi(l, t);
        });
      }
    }
  }
  ezi(e, i, o) {
    if (i.OverlayMontage?.MontageId.MontageId !== undefined) {
      var s = i.ActorIndex === this.dJi ? this.PJi(i.OverlayMontage.MontageId.MontageId) : i.OverlayMontage.MontageId.MontageId;
      let t = undefined;
      if (t = i.OverlayMontage.MontageId.IsAbp ? ModelManager_1.ModelManager.PlotModel.GetOverlayAbpMontageConfig(s) : ModelManager_1.ModelManager.PlotModel.GetMontageConfig(s)) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "模板演出蒙太奇播放", ["演员", e.PbDataId], ["蒙太奇", t]);
        }
        e.OverlayMontagePath = t.ActionMontage;
        e.OverlayMontageLooping = i.OverlayMontage.IsLoop ?? false;
        e.OverlayMontageKeeping = i.OverlayMontage.KeepPose ?? false;
        if (o) {
          this.izi(e);
          this.BJi(e.OverlayMontagePath, t => {
            this.rzi(e, t);
          });
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Plot", 26, "模板蒙太奇库中没有该资源", ["Id", s]);
      }
    }
  }
  ZJi(e, i) {
    if (i.MontageId !== undefined) {
      var o = i.ActorIndex === this.dJi ? this.PJi(i.MontageId) : i.MontageId;
      let t = undefined;
      if (t = i.IsAbpMontage ? ModelManager_1.ModelManager.PlotModel.GetAbpMontageConfig(o) : ModelManager_1.ModelManager.PlotModel.GetMontageConfig(o)) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 26, "模板演出蒙太奇播放", ["演员", e.PbDataId], ["蒙太奇", t]);
        }
        e.BodyMontagePath = t.ActionMontage;
        e.MontageLooping = i.IsLoop ?? false;
        e.MontageKeeping = i.KeepPose ?? false;
        e.FaceExpressionId = i.FaceExpressionId;
        this.ij_(e, {
          MontageAsset: this.NP1.get(e.BodyMontagePath),
          IsLoop: e.MontageLooping,
          InSectionToStartMontageAt: i.StartFromLoop ? CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION : undefined,
          OnPlayCallback: t => {
            e.BodyMontage = t;
            e.FaceChangeManager?.ResetFacialExpressionOuter();
            e.FaceChangeManager?.ChangeFaceForExpression(t, e.FaceExpressionId);
          },
          KeepOtherMontage: true
        });
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Plot", 26, "模板蒙太奇库中没有该资源", ["Id", o]);
      }
    }
  }
  async xJi(e, i) {
    const o = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.AnimMontage, t => {
      if (t?.IsValid()) {
        this.NP1.set(i, t);
      }
      o.SetResult();
    });
    await o.Promise;
    const s = new CustomPromise_1.CustomPromise();
    this.ij_(e, {
      MontageAsset: this.NP1.get(i),
      IsLoop: true,
      InSectionToStartMontageAt: CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
      OnPlayCallback: t => {
        e.BodyMontage = t;
        e.MontageLooping = true;
        e.MontageKeeping = true;
        s.SetResult();
      },
      KeepOtherMontage: true
    });
    return s.Promise;
  }
  ij_(t, e) {
    var i = EntitySystem_1.EntitySystem.Get(t.EntityId);
    if (t.IsPlayer()) {
      i.GetComponent(44).MontageManager.PlayMontage(e);
    } else {
      i.GetComponent(46).PlayPerformMontage(1, e);
    }
  }
  rj_(t, e) {
    var i = EntitySystem_1.EntitySystem.Get(t.EntityId);
    if (t.IsPlayer()) {
      i.GetComponent(44).MontageManager.StopMontage(e);
    } else {
      i.GetComponent(46).StopPerformMontage(1, e);
    }
  }
  PJi(t) {
    if (ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender() === 1) {
      return t + 1;
    } else {
      return t;
    }
  }
  BJi(e, i) {
    var t;
    if (!e || StringUtils_1.StringUtils.IsEmpty(e)) {
      i(undefined);
    } else {
      t = this.ZYi.get(e);
      if (ObjectUtils_1.ObjectUtils.IsValid(t)) {
        i(t);
      } else {
        ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.AnimMontage, t => {
          if (this.IsInTemplate) {
            this.ZYi.set(e, t);
            i(t);
          }
        });
      }
    }
  }
  $Ca(e, i) {
    if (!i.Montage_GetCurrentSection(e).op_Equality(CharacterNameDefines_1.CharacterNameDefines.END_SECTION)) {
      i.Montage_Stop(MONTAGE_BLEND_OUT_TIME, e);
      var o = e.CompositeSections;
      var s = o.Num();
      for (let t = 0; t < s; t++) {
        var r = o.Get(t);
        if (r.SectionName.op_Equality(CharacterNameDefines_1.CharacterNameDefines.END_SECTION)) {
          r = r.SegmentBeginTime;
          i.Montage_Play(e, undefined, undefined, r, false);
          i.Montage_SetNextSection(CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION, CharacterNameDefines_1.CharacterNameDefines.END_SECTION, e);
          break;
        }
      }
    }
  }
  tzi(t) {
    var e = EntitySystem_1.EntitySystem.Get(t.EntityId)?.GetComponent(177)?.MainAnimInstance;
    if (ObjectUtils_1.ObjectUtils.IsValid(e) && !t.MontageKeeping) {
      if (t.MontageBlendToEnd) {
        this.ij_(t, {
          MontageAsset: t.BodyMontage,
          InSectionToStartMontageAt: CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
          IsLoop: false,
          KeepOtherMontage: true
        });
      } else {
        this.rj_(t, {
          Method: 1
        });
      }
      t.BodyMontage = undefined;
      t.BodyMontagePath = undefined;
    }
  }
  izi(t) {
    var e;
    var i = EntitySystem_1.EntitySystem.Get(t.EntityId)?.GetComponent(177)?.MainAnimInstance;
    if (ObjectUtils_1.ObjectUtils.IsValid(i)) {
      if (ObjectUtils_1.ObjectUtils.IsValid(t.OverlayMontage) && i.Montage_IsPlaying(t.OverlayMontage)) {
        if (StringUtils_1.StringUtils.IsEmpty(t.OverlayMontagePath)) {
          if (t.MontageBlendToEnd) {
            this.$Ca(t.OverlayMontage, i);
          } else if (!t.OverlayMontageKeeping && (!!(e = i.Montage_GetCurrentSection(t.OverlayMontage)).op_Equality(CharacterNameDefines_1.CharacterNameDefines.START_SECTION) || !!e.op_Equality(CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION))) {
            i.Montage_SetNextSection(e, CharacterNameDefines_1.CharacterNameDefines.END_SECTION, t.OverlayMontage);
          }
        } else if (t.OverlayMontage !== this.ZYi.get(t.OverlayMontagePath)) {
          i.Montage_Stop(MONTAGE_BLEND_OUT_TIME, t.OverlayMontage);
          t.OverlayMontage = undefined;
        }
      } else {
        t.OverlayMontage = undefined;
      }
    }
  }
  rzi(t, e, i = 1) {
    var o;
    if (ObjectUtils_1.ObjectUtils.IsValid(e) && this.IsInTemplate && (o = EntitySystem_1.EntitySystem.Get(t.EntityId)?.GetComponent(177)?.MainAnimInstance, ObjectUtils_1.ObjectUtils.IsValid(o))) {
      if (this.ZYi.get(t.OverlayMontagePath) !== e) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Plot", 26, "异步加载完的蒙太奇过期了");
        }
      } else {
        t.OverlayMontagePath = undefined;
        if (!o.Montage_IsPlaying(e) || !!o.Montage_GetCurrentSection(e).op_Equality(CharacterNameDefines_1.CharacterNameDefines.END_SECTION)) {
          o.Montage_Play(e, i, 0, 0, false);
        }
        t.OverlayMontage = e;
        if (t.OverlayMontageLooping) {
          o.Montage_SetNextSection(CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION, CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION, e);
        } else {
          o.Montage_SetNextSection(CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION, CharacterNameDefines_1.CharacterNameDefines.END_SECTION, e);
        }
      }
    }
  }
  koe() {
    this.uoe = UE.NewObject(UE.TraceLineElement.StaticClass());
    this.uoe.bIsSingle = true;
    this.uoe.bIgnoreSelf = true;
    this.uoe.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround);
  }
  kJi(t, o) {
    if (!this.uoe) {
      this.koe();
    }
    var e;
    var i = o.Actor;
    var s = i.CapsuleComponent;
    this.uoe.WorldContextObject = i;
    var i = Vector_1.Vector.Create(0, 0, s.GetScaledCapsuleHalfHeight() * 2);
    var s = Vector_1.Vector.Create(0, 0, i.Z + FIX_TELEPORT_TRACE_DOWN);
    if (!this.fuc) {
      r = Quat_1.Quat.Create();
      GravityUtils_1.GravityUtils.GetBaseQuatInGravityForActor(o, r);
      (e = Vector_1.Vector.Create()).DeepCopy(i);
      r.RotateVector(e, i);
      e.DeepCopy(s);
      r.RotateVector(e, s);
    }
    this.uoe.SetStartLocation(t.X + i.X, t.Y + i.Y, t.Z + i.Z);
    this.uoe.SetEndLocation(t.X + s.X, t.Y + s.Y, t.Z + s.Z);
    var r = TraceElementCommon_1.TraceElementCommon.LineTrace(this.uoe, PROFILE_KEY);
    var a = this.uoe.HitResult;
    if (r && a.bBlockingHit) {
      var _ = a.Actors.Num();
      let e = 0;
      let i = undefined;
      for (let t = 0; t < _; t++) {
        i = a.Actors.Get(t);
        if (ObjectUtils_1.ObjectUtils.IsValid(i) && !i.IsA(UE.Character.StaticClass())) {
          e = t;
          break;
        }
      }
      t.X = a.LocationX_Array.Get(e);
      t.Y = a.LocationY_Array.Get(e);
      t.Z = a.LocationZ_Array.Get(e);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "实体剧情内修正地面", ["FixedActor", o.CreatureData.GetPbDataId()], ["Location", t], ["HitActor", i.GetName()]);
      }
    }
    this.uoe.WorldContextObject = undefined;
  }
  NJi() {
    if (this.DJi && this.mJi) {
      const i = new Map();
      this.mJi.forEach(t => {
        if (t.Index !== ACTOR_EMPTY_INDEX) {
          i.set(t.Index, t);
        }
      });
      this.DJi.forEach((t, e) => {
        if (t.Valid && (this._Ji.Visible = i.has(e), this._Ji.UseEffect = false, t.Visible !== this._Ji.Visible)) {
          t.Visible = this._Ji.Visible;
          this.nzi(t, this._Ji);
        }
      });
    }
  }
  nzi(t, e) {
    var t = EntitySystem_1.EntitySystem.Get(t.EntityId);
    var i = t?.GetComponent(3);
    if (i?.Valid && e) {
      if (e.Visible) {
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(t, true, "[PlotTemplate.ShowActor] 显示模板剧情实体");
        if (e.UseEffect) {
          i.Actor.DitherEffectController.EnterAppearEffect(DITHER_RATE_PER_SECOND, 1, true);
        }
      } else {
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(t, false, "[PlotTemplate.ShowActor] 隐藏演出的实体");
        if ((t = t.GetComponent(177))?.Valid) {
          t.MainAnimInstance.Montage_Stop(0);
        }
        if (e.UseEffect) {
          i.Actor.DitherEffectController.EnterDisappearEffect(DITHER_RATE_PER_SECOND, 1);
        }
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Plot", 26, "显隐实体出错");
    }
  }
  SetActorName(t) {
    if (!(t.ActorIndex >= this.DJi.length) && !(t.ActorIndex < 0)) {
      this.aJi.set(t.Talker, this.DJi[t.ActorIndex]);
    }
  }
  HandleMouthAnim(i) {
    if (this.IsInTemplate && !!i.PlayVoice && !!i.WhoId && (!i || i.Type === "Talk") && !StringUtils_1.StringUtils.IsEmpty(i.TidTalk) && !i.NoMouthAnim) {
      var t = i;
      if (t.Style?.Type !== "InnerVoice") {
        const o = this.aJi.get(i.WhoId);
        if (o?.Valid && o?.Visible) {
          const s = EntitySystem_1.EntitySystem.Get(o.EntityId)?.GetComponent(177)?.MainAnimInstance;
          if (s) {
            t = PlotAudioById_1.configPlotAudioById.GetConfig(i.TidTalk);
            t = PlotAudioModel_1.PlotAudioModel.GetAudioMouthAnimName(t);
            o.MouseMontageLoadingId = ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.AnimSequence, t => {
              o.MouseMontageLoadingId = ResourceSystem_1.ResourceSystem.InvalidId;
              var e = s.PlaySlotAnimationAsDynamicMontage(t, SequenceDefine_1.ABP_Mouth_Slot_Name, 0, 0, 1, 1, -1, 0, false);
              o.FaceChangeManager?.ChangeFaceForMouthMontage(e);
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Plot", 38, "MouthAnim 播放口型", ["Key", i.TidTalk], ["Asset", t?.GetName()], ["ABP", s.GetName()]);
              }
            });
          } else if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Plot", 26, "播放嘴型时拿不到AnimInst", ["EntityId", o.EntityId]);
          }
        }
      }
    }
  }
  QJi(e, t) {
    this.SJi = 0;
    this.lJi.forEach(t => {
      TimerSystem_1.TimerSystem.Remove(t);
    });
    if (t && t.length !== 0) {
      for (const a of t) {
        if (!(a.ActorIndex > this.DJi.length)) {
          const _ = this.DJi[a.ActorIndex];
          if (_.Valid && _.Visible) {
            if (_.PositionLocked) {
              return;
            }
            let t = undefined;
            switch (a.Target.Type) {
              case 2:
                var i = a.Target;
                t = this.tL(i.EntityId);
                break;
              case 3:
                i = a.Target;
                t = Vector_1.Vector.Create(i.Pos.X, i.Pos.Y, i.Pos.Z);
                break;
              case 0:
                var o = this.aJi.get(e);
                if (!o?.Valid) {
                  if (Log_1.Log.CheckWarn()) {
                    Log_1.Log.Warn("Plot", 26, "说话人未在模板内，转向失败");
                  }
                  continue;
                }
                o = EntitySystem_1.EntitySystem.Get(o.EntityId)?.GetComponent(3);
                if (o) {
                  t = Vector_1.Vector.Create(o.ActorLocationProxy);
                }
                break;
              case 4:
                o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(3);
                if (o) {
                  t = Vector_1.Vector.Create(o.ActorLocationProxy);
                }
            }
            if (t) {
              var s = Vector_1.Vector.Create();
              var r = EntitySystem_1.EntitySystem.Get(_.EntityId)?.GetComponent(3);
              if (r?.Valid) {
                t.Subtraction(r.ActorLocationProxy, s);
                _.Pos.A = s.HeadingAngle() * MathCommon_1.MathCommon.RadToDeg;
              }
              if (!this.nx.IsBackground) {
                r = a.DelayTime ? TimeUtil_1.TimeUtil.SetTimeMillisecond(a.DelayTime) : 0;
                if (r < TimerSystem_1.MIN_TIME) {
                  this.szi(_, t);
                } else {
                  const h = TimerSystem_1.TimerSystem.Delay(() => {
                    this.szi(_, t);
                    this.lJi.delete(h);
                  }, r);
                  this.lJi.add(h);
                }
                s = r + WAIT_TURING_TIME + MONTAGE_BLEND_OUT_TIME * 0.5;
                if (this.SJi < s) {
                  this.SJi = s;
                }
              }
            }
          }
        }
      }
    }
  }
  tL(t) {
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t)?.Entity?.GetComponent(3);
    if (e) {
      return Vector_1.Vector.Create(e.ActorLocationProxy);
    } else if (e = ModelManager_1.ModelManager.CreatureModel.GetEntityData(t)) {
      return Vector_1.Vector.Create(e.Transform.Pos.X, e.Transform.Pos.Y, e.Transform.Pos.Z);
    } else {
      return undefined;
    }
  }
  szi(t, e) {
    var i;
    var o = EntitySystem_1.EntitySystem.Get(t.EntityId);
    var s = o?.GetComponent(3);
    if (s?.Valid) {
      if (t.IsPlayer()) {
        t = MathUtils_1.MathUtils.CommonTempRotator;
        i = MathUtils_1.MathUtils.CommonTempVector;
        e.Subtraction(s.ActorLocationProxy, i);
        i.Normalize();
        t.Roll = 0;
        t.Pitch = 0;
        t.Yaw = MathUtils_1.MathUtils.GetAngleByVector2D(i);
        o.GetComponent(177).MontageManager.StopMontage({
          Method: 0,
          BlendOutTime: 0.5
        });
        s.SetInputRotator(t);
      } else {
        o.GetComponent(46).PerformTurn(1, {
          TargetLocation: e
        });
      }
    }
  }
  SetTemplatePlayerTransform(t) {
    var e;
    if (this.dJi !== PLAYER_UNUSED_INDEX) {
      (e = this.DJi[this.dJi]).Pos.X = t.X ?? 0;
      e.Pos.Y = t.Y ?? 0;
      e.Pos.Z = t.Z ?? 0;
      e.Pos.A = t.A ?? 0;
      e.Pos.Roll = t.Roll ?? 0;
      e.Pos.Pitch = t.Pitch ?? 0;
    }
  }
  OnFinishShowTalk() {
    if (this.IsInTemplate) {
      for (const e of this.DJi) {
        if (!e.Valid) {
          return;
        }
        var t = EntitySystem_1.EntitySystem.Get(e.EntityId)?.GetComponent(177)?.MainAnimInstance;
        if (!ObjectUtils_1.ObjectUtils.IsValid(t)) {
          return;
        }
        t?.StopSlotAnimation(0, SequenceDefine_1.ABP_Mouth_Slot_Name);
      }
    }
  }
  OnTick(t) {
    if (this.IsInTemplate) {
      this.LJi.OnTick(t);
      this.rNn();
    }
  }
}
(exports.PlotTemplate = PlotTemplate).HJi = new UE.FName("Bip001_Pupil_Bone01_L");
PlotTemplate.jJi = new UE.FName("Bip001Head"); //# sourceMappingURL=PlotTemplate.js.map