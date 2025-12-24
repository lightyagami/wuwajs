"use strict";

var GamePlayElevatorComponent_1;
var __decorate = this && this.__decorate || function (t, i, e, s) {
  var h;
  var o = arguments.length;
  var r = o < 3 ? i : s === null ? s = Object.getOwnPropertyDescriptor(i, e) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, i, e, s);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (h = t[n]) {
        r = (o < 3 ? h(r) : o > 3 ? h(i, e, r) : h(i, e)) || r;
      }
    }
  }
  if (o > 3 && r) {
    Object.defineProperty(i, e, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GamePlayElevatorComponent = undefined;
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GameSettingsDefine_1 = require("../../GameSettings/GameSettingsDefine");
const GameSettingsDeviceRender_1 = require("../../GameSettings/GameSettingsDeviceRender");
const GameSettingsManager_1 = require("../../GameSettings/GameSettingsManager");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LogReportDefine_1 = require("../../Module/LogReport/LogReportDefine");
const SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager");
const ActorUtils_1 = require("../../Utils/ActorUtils");
const TraceUtils_1 = require("../../Utils/TraceUtils");
const ComponentForceTickController_1 = require("../../World/Controller/ComponentForceTickController");
const LogController_1 = require("../../World/Controller/LogController");
const CharacterBuffIds_1 = require("../Character/Common/Component/Abilities/CharacterBuffIds");
const MIN_SPEED = 1;
const NORMALIZE = 0.01;
const DELTATIMECHANGEVALUE = 10;
const ACCELERATETIMERADIO = 1.5;
let GamePlayElevatorComponent = GamePlayElevatorComponent_1 = class GamePlayElevatorComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ac = 0;
    this.Hte = undefined;
    this.Igo = undefined;
    this.J_n = undefined;
    this.W1u = undefined;
    this.Q1u = undefined;
    this.K1u = undefined;
    this.X1u = false;
    this.z_n = undefined;
    this.Z_n = undefined;
    this.eun = undefined;
    this.tun = undefined;
    this.cz = undefined;
    this.kRe = undefined;
    this.iun = undefined;
    this.oun = undefined;
    this.run = undefined;
    this.nun = undefined;
    this.sun = -0;
    this.aun = undefined;
    this.hun = undefined;
    this.lun = -0;
    this.vtn = undefined;
    this._un = undefined;
    this.EIe = undefined;
    this.uun = -0;
    this.cun = -0;
    this.mun = undefined;
    this.dun = 1;
    this.Cun = 1;
    this.u6a = 0;
    this.Y1u = "Default";
    this.z1u = false;
    this.J1u = false;
    this.QEo = 0;
    this.Z1u = 0;
    this.euu = 0;
    this.Fid = undefined;
    this.Nid = 0;
    this.Vid = 0;
    this.tuu = false;
    this.vun = false;
    this.Mun = false;
    this.Eun = false;
    this.Sun = undefined;
    this.yun = undefined;
    this.Iun = undefined;
    this.xOi = undefined;
    this.KHr = t => {
      this.nHf(t);
      this.sHf(t);
    };
    this.Pun = () => {
      this.hun = false;
    };
    this.xun = (t, i) => {
      var e;
      var i = i.Entity;
      if (i.GetComponent(165) && (i = i.GetComponent(1), e = this.yun.indexOf(i.Owner), t ? e === -1 && this.yun.push(i.Owner) : e !== -1 && this.yun.splice(e, 1), (e = this.Sun.indexOf(i.Owner)) !== -1)) {
        this.Sun.splice(e, 1);
      }
    };
    this.wun = t => {
      var i;
      var e;
      if (this.IsMovingOrTeleporting() && (e = undefined, i = Global_1.Global.BaseCharacter) && (e = i.CharacterActorComponent.Entity.GetComponent(183))) {
        if (t) {
          t = i.D_K2_GetActorLocation().Z;
          if (this.Hte.ActorLocationProxy.Z < t) {
            e.AddBuff(CharacterBuffIds_1.buffId.ElevatorBuff, {
              InstigatorId: e.CreatureDataId,
              Duration: this.Bun(),
              Reason: "电梯添加buff"
            });
            EventSystem_1.EventSystem.EmitWithTarget(e.Entity, EventDefine_1.EEventName.ElevatorMove);
          }
        } else {
          e.RemoveBuff(CharacterBuffIds_1.buffId.ElevatorBuff, -1, "电梯移除buff");
        }
      }
    };
    this.bun = (t, i) => {
      var e = ActorUtils_1.ActorUtils.GetEntityByActor(i);
      if (e && e.Entity.GetComponent(165) && this.Sun.indexOf(i) === -1) {
        if (this.IsMovingOrTeleporting() && this.yun.indexOf(i) !== -1) {
          this.qun(i);
        }
        this.Sun.push(i);
      }
    };
    this.OnSceneInteractionLoadCompleted = () => {
      var t = this.Entity.GetComponent(212);
      var t = SceneInteractionManager_1.SceneInteractionManager.Get().GetMainCollisionActor(t.GetSceneInteractionLevelHandleId());
      this.Iun = t?.GetComponentByClass(UE.PrimitiveComponent.StaticClass());
      if (this.Iun) {
        t.OnActorHit.Add(this.bun);
        this.Iun.SetNotifyRigidBodyCollision(true);
      }
    };
    this.aHf = new Map();
    this.hHf = [];
  }
  get CurLiftFloor() {
    return this.dun;
  }
  OnInitData(t) {
    t = t.GetParam(GamePlayElevatorComponent_1)[0];
    if (!t) {
      throw Error("创建GamePlayElevatorComponent缺少配置参数");
    }
    this.eun = t.UniformMovement;
    this.tun = t.TurnTime;
    this.cz = Vector_1.Vector.Create(0, 0, 0);
    this.iun = Vector_1.Vector.Create(0, 0, 0);
    this.nun = t.MaxSpeed;
    this.z_n = Vector_1.Vector.Create(0, 0, 0);
    this.Z_n = Vector_1.Vector.Create(0, 0, 0);
    this.kRe = Vector_1.Vector.Create(0, 0, 0);
    this.run = Vector_1.Vector.Create(0, 0, 0);
    this.oun = Vector_1.Vector.Create(0, 0, 0);
    this.Sun = [];
    this.yun = [];
    this.EIe = this.Entity.GetComponent(0);
    var i = this.EIe.GetInitLocation();
    var e = i.X || 0;
    var s = i.Y || 0;
    var h = i.Z || 0;
    this.mun = [];
    if (t.StayPositions) {
      for (const o of t.StayPositions) {
        this.mun.push(Vector_1.Vector.Create(o.X ? e + o.X : e, o.Y ? s + o.Y : s, o.Z ? h + o.Z : h));
      }
    }
    this.dun = this.EIe.LiftFloor ?? 1;
    this.Cun = 0;
    this.Igo = Vector_1.Vector.Create(0, 0, 0);
    this.J_n = Vector_1.Vector.Create(0, 0, 0);
    this.W1u = Vector_1.Vector.Create(0, 0, 0);
    this.Q1u = Vector_1.Vector.Create(0, 0, 0);
    this.K1u = Vector_1.Vector.Create(0, 0, 0);
    this.tuu = false;
    this.vun = t.AutoConfig !== undefined;
    this.Mun = t.AutoConfig?.IsCircle ?? false;
    this.Eun = false;
    this.cun = t.AutoConfig?.Interval ?? 0;
    this.uun = 0;
    if (t.SafePoint) {
      this.aun = Vector_1.Vector.Create(t.SafePoint.X ?? 0, t.SafePoint.Y ?? 0, t.SafePoint.Z ?? 0);
    }
    this.Hte = this.Entity.GetComponent(1);
    return true;
  }
  OnStart() {
    this.V6o();
    this.vtn = this.Entity.GetComponent(89);
    if (this.vtn) {
      this.vtn.AddOnPlayerOverlapCallback(this.wun);
      this.vtn.AddOnEntityOverlapCallback(this.xun);
    }
    this._un = this.Entity.GetComponent(139);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.OnSceneInteractionLoadCompleted);
    return true;
  }
  OnClear() {
    if (this.vtn) {
      this.vtn.RemoveOnPlayerOverlapCallback(this.wun);
      this.vtn.RemoveOnEntityOverlapCallback(this.xun);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.OnSceneInteractionLoadCompleted)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.OnSceneInteractionLoadCompleted);
    }
    if (this.xOi !== undefined) {
      TimerSystem_1.TimerSystem.Remove(this.xOi);
    }
    return true;
  }
  OnForceTick(t) {
    this.KHr(t);
  }
  nHf(t) {
    if (!this.Tun()) {
      if (this.ac === 3) {
        this.Lun(t);
      } else if ((this.ac === 1 || this.ac === 2) && (!this.tuu || !this.Dun())) {
        this.iuu();
        this.Swr(t);
        this.Aun();
        this.ruu(() => this.z1u, () => this.K1u, "关卡.事件.电梯.开始传送", t => {
          this.z1u = t;
        });
        this.ruu(() => this.J1u, () => this.Q1u, "关卡.事件.电梯.传送结束", t => {
          this.J1u = t;
        });
      }
    }
  }
  ouu(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneItem", 79, "EnterState", ["Before", this.ac], ["After", t]);
    }
    const i = this.ac;
    switch (this.ac = t) {
      case 3:
        this.nuu();
        break;
      case 0:
        this.nuu();
        if (this.ac === 3) {
          this.SetTargetFloor(this.Hun());
        }
        break;
      case 1:
        this.Nid = UE.GameplayStatics.GetTimeSeconds(this.Hte.Owner);
        this.jid();
        break;
      case 2:
        this.jid();
        break;
      case 5:
        this.ouu(6);
        break;
      case 6:
        if (this.Kun()) {
          ControllerHolder_1.ControllerHolder.TeleportController.TeleportElevatorAndPlayerSeparately({
            ClientReason: "ElevatorTeleportPlayer",
            TargetPosition: this.Q1u.ToUeVector(),
            ElevatorEntity: this.Entity
          }).finally(() => {
            this.ouu(2);
            this.oFe(i, t);
          });
        } else {
          this.Entity.GetComponent(1).SetActorLocation(this.Q1u.ToUeVector());
          this.ouu(2);
          this.oFe(i, t);
        }
        return;
    }
    this.oFe(i, t);
  }
  nuu() {
    if (this.u6a === 0) {
      this.Oun(this.Cun, false);
    }
    this.dun = this.Cun;
    if (this.u6a > 0) {
      if (this.dun !== this.u6a) {
        this.Cun = this.u6a;
      }
      this.u6a = 0;
    } else {
      this.Cun = 0;
    }
    this._un.IsMoving = false;
  }
  jid() {
    this.tuu = this.dun > this.Cun;
    this.suu();
    this.auu();
    this._un.IsMoving = true;
  }
  oFe(t, i) {
    if (t !== i) {
      if (t !== 0 && t !== 3 || i !== 1 && i !== 2) {
        if ((t === 1 || t === 2) && (i === 0 || i === 3)) {
          this.huu(false);
        }
      } else {
        this.huu(true);
      }
    }
  }
  huu(t) {
    var i = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity?.GetComponent(183);
    if (i && this.Kun()) {
      if (t) {
        i.AddBuff(CharacterBuffIds_1.buffId.ElevatorBuff, {
          InstigatorId: i.CreatureDataId,
          Duration: this.Bun() + (this.tun ?? 0),
          Reason: "电梯添加buff"
        });
        EventSystem_1.EventSystem.EmitWithTarget(i.Entity, EventDefine_1.EEventName.ElevatorMove);
      } else {
        i.RemoveBuff(CharacterBuffIds_1.buffId.ElevatorBuff, -1, "电梯移除buff");
      }
    }
    if (this.Sun.length > 0) {
      for (const e of this.Sun) {
        if (this.yun.indexOf(e) !== -1) {
          if (t) {
            this.qun(e);
          } else {
            this.Qun(e);
          }
        }
      }
    }
    if (t) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.MotionBlur.Amount 0");
      if (GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsSupportedAFME) {
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.TemporaryDisableAFME("ElevatorOnMobile");
      }
    } else {
      GameSettingsManager_1.GameSettingsManager.ReApply(GameSettingsDefine_1.EFunction.MOTIONBLUR);
      if (GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsSupportedAFME) {
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.CancelTemporaryDisableAFME("ElevatorOnMobile");
      }
    }
  }
  Oun(i, e) {
    if (!this.Tun() && !this.hun) {
      this.hun = true;
      let t = Protocol_1.Aki.Protocol.Z4s.Proto_End;
      if (e) {
        t = this.Cun > this.dun ? Protocol_1.Aki.Protocol.Z4s.f6n : Protocol_1.Aki.Protocol.Z4s.Proto_Reverse;
      }
      LevelGamePlayController_1.LevelGamePlayController.ElevatorStateChangeRequest(this.Entity.Id, i, t, this.Pun);
    }
  }
  Aun() {
    var t = this.luu();
    var i = this.Hte.ActorLocationProxy;
    t.Subtraction(i, this.cz);
    var t = this.cz.DotProduct(this.iun);
    if (!(t > 0)) {
      this.kun();
    }
  }
  ruu(t, i, e, s) {
    if (t()) {
      t = this.Hte;
      i = i();
      t = t.ActorLocationProxy;
      i.Subtraction(t, this.cz);
      this.cz.MultiplyEqual(this.iun);
      if (!(this.cz.X >= 0) || !(this.cz.Y >= 0) || !(this.cz.Z >= 0)) {
        if (i = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagByName(e)) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CheckClientEvent, i);
        }
        s(false);
      }
    }
  }
  kun() {
    var t = this.luu();
    this.oun.DeepCopy(Vector_1.Vector.ZeroVectorProxy);
    this.run.DeepCopy(Vector_1.Vector.ZeroVectorProxy);
    this.Hte.SetActorLocation(t.ToUeVector());
    this.lun = 0;
    if (this.Y1u !== "Teleport") {
      if (this.vun) {
        this.ouu(3);
      } else {
        this.ouu(0);
      }
    } else if (this.Y1u === "Teleport") {
      if (this.ac === 1) {
        this.ouu(5);
      } else if (this.ac === 2) {
        this.ouu(0);
      }
    }
  }
  luu() {
    if (this.Y1u !== "Teleport" || this.ac !== 1) {
      return this.J_n;
    } else {
      return this.W1u;
    }
  }
  _uu() {
    var t = this.Igo;
    var i = this.J_n;
    var e = this.Hte.ActorLocationProxy;
    var s = this.sun;
    const h = Vector_1.Vector.DistSquared(e, t);
    t = MathUtils_1.MathUtils.Bisection(t => t * t > h, 0, h, 1);
    const o = Vector_1.Vector.DistSquared(e, i);
    e = MathUtils_1.MathUtils.Bisection(t => t * t > o, 0, o, 1);
    if (this.run.SizeSquared() !== 0 && t > 1 / CommonDefine_1.FOUR * s && e > 1 / CommonDefine_1.FOUR * s) {
      this.run.DeepCopy(Vector_1.Vector.ZeroVectorProxy);
    }
    if (this.run.SizeSquared() === 0 && e < 1 / CommonDefine_1.FOUR * s) {
      this.run.DeepCopy(this.jun().MultiplyEqual(CommonDefine_1.NEGATIVEONE));
    }
  }
  iuu() {
    if (!this.eun && this.Y1u !== "CustomSpeed") {
      this._uu();
    }
  }
  Swr(t) {
    if (!this.lun || Math.abs(t - this.lun) > DELTATIMECHANGEVALUE) {
      this.lun = t;
    }
    var i;
    var e;
    var t = this.Hte;
    var s = this.lun * MathUtils_1.MathUtils.MillisecondToSecond;
    if (this.Y1u === "CustomSpeed") {
      e = UE.GameplayStatics.GetTimeSeconds(this.Hte.Owner) - this.Nid;
      e = MathUtils_1.MathUtils.Clamp(e / this.Vid, 0, 1);
      i = this.Fid ? this.Fid.GetFloatValue(e) : e;
      if (e >= 1) {
        t.SetActorLocation(this.J_n.ToUeVector());
      } else {
        Vector_1.Vector.Lerp(this.Igo, this.J_n, i, this.kRe);
        t.SetActorLocation(this.kRe.ToUeVector());
      }
    } else {
      this.cz.DeepCopy(this.run);
      this.cz.MultiplyEqual(s);
      this.oun.Addition(this.cz, this.kRe);
      e = this.kRe;
      if (this.Z_n.SizeSquared() > e.SizeSquared() || e.DotProduct(this.oun) < 0) {
        this.oun.DeepCopy(this.Z_n);
      } else if (this.z_n.SizeSquared() < e.SizeSquared()) {
        this.oun.DeepCopy(this.z_n);
      } else {
        this.oun.AdditionEqual(this.cz);
      }
      this.cz.DeepCopy(this.oun);
      this.cz.MultiplyEqual(s);
      this.kRe.DeepCopy(t.ActorLocationProxy);
      this.kRe.AdditionEqual(this.cz);
      t.SetActorLocation(this.kRe.ToUeVector());
    }
  }
  Lun(t) {
    this.uun += t * MathUtils_1.MathUtils.MillisecondToSecond;
    if (this.uun > this.cun) {
      this.uun = 0;
      this.ouu(0);
    }
  }
  Wun() {
    this.J_n.Subtraction(this.Igo, this.cz);
    this.cz.Normalize(NORMALIZE);
    this.cz.MultiplyEqual(this.nun * CommonDefine_1.MTOCM);
    return this.cz;
  }
  jun() {
    var t = this.Igo;
    this.J_n.Subtraction(t, this.cz);
    var t = this.cz.Size();
    this.cz.Normalize(NORMALIZE);
    this.cz.MultiplyEqual(this.nun * CommonDefine_1.MTOCM * this.nun * CommonDefine_1.MTOCM * 2 / t);
    return this.cz;
  }
  IsMovingOrTeleporting() {
    return this.ac === 1 || this.ac === 2 || this.ac === 5;
  }
  V6o() {
    var t;
    if (this.vun) {
      t = this.Hun();
      this.SetTargetFloor(t);
    }
  }
  SetTargetFloor(t) {
    var i;
    var e;
    if (this.Hid(t)) {
      this.$id(t, "Default");
      this.uuu();
      if (this.vun) {
        this.Oun(t, true);
      }
      if (!this.vun) {
        if (i = Global_1.Global.BaseCharacter) {
          i = i.CharacterActorComponent.ActorLocationProxy;
          (e = new LogReportDefine_1.ElevatorUsedRecord()).i_config_id = this.EIe.GetPbDataId().toString() ?? "";
          e.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId.toString();
          e.i_state_id = t.toString();
          e.f_player_pos_x = i.X.toFixed(2);
          e.f_player_pos_y = i.Y.toFixed(2);
          e.f_player_pos_z = i.Z.toFixed(2);
          LogController_1.LogController.LogElevatorUsedPush(e);
        }
      }
    }
  }
  SetTargetFloorTeleport(t, i, e, s = false, h = 0) {
    if (this.Hid(t)) {
      this.$id(t, "Teleport", s, i, e, h);
      this.uuu();
    }
  }
  SetTargetFloorPathMove(t, i, e) {
    if (this.Hid(t)) {
      if (!StringUtils_1.StringUtils.IsBlank(i)) {
        this.Fid = ResourceSystem_1.ResourceSystem.Load(i, UE.CurveFloat);
      }
      this.Vid = e;
      this.$id(t, "CustomSpeed");
      this.uuu();
    }
  }
  Hid(t) {
    return !this.Tun() && (t < 1 || t > this.mun.length || this.Cun === t ? (Log_1.Log.CheckWarn() && Log_1.Log.Warn("SceneItem", 79, "CheckTargetFloorValid Failed, Wrong Floor", ["CreatureId", ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(this.Entity.Id)], ["TargetFloor", t]), false) : this.Cun === 0 || (Log_1.Log.CheckWarn() && Log_1.Log.Warn("SceneItem", 79, "Elevator Running"), this.u6a = t, false));
  }
  $id(t, i, e = false, s = 0, h = 0, o = 0) {
    this.Cun = t;
    this.Y1u = i;
    this.X1u = e;
    this.z1u = e;
    this.J1u = e;
    this.QEo = s;
    this.Z1u = h;
    this.euu = o;
  }
  uuu() {
    if (this.tun) {
      this.xOi = TimerSystem_1.TimerSystem.Delay(t => {
        this.cuu();
        this.xOi = undefined;
      }, this.tun * CommonDefine_1.THOUSAND);
    } else {
      this.cuu();
    }
  }
  cuu() {
    if (this.ac === 6) {
      this.ouu(2);
    } else {
      this.ouu(1);
    }
  }
  suu() {
    this.Igo.DeepCopy(this.mun[this.dun - 1]);
    this.J_n.DeepCopy(this.mun[this.Cun - 1]);
    this.J_n.Subtraction(this.Igo, this.iun);
    if (this.Y1u === "Teleport" && this.ac !== 6) {
      var t = this.iun.Size();
      var i = t / 2;
      if (this.QEo > i || this.Z1u > i) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 79, "传送电梯位置偏移配置非法, 偏移超过移动距离的一半", ["StartOffset", this.QEo], ["EndOffset", this.Z1u], ["MoveLength", this.iun.Size()]);
        }
        return;
      }
      this.iun.Multiply(this.QEo / t, this.W1u).AdditionEqual(this.Igo);
      if (this.X1u) {
        this.iun.Multiply(this.euu / t, this.K1u).AdditionEqual(this.Igo);
      }
      this.iun.Multiply(this.Z1u / t, this.Q1u).SubtractionEqual(this.J_n).MultiplyEqual(-1);
    }
    this.sun = this.iun.Size();
  }
  auu() {
    if (this.Y1u !== "CustomSpeed") {
      this.cz.DeepCopy(this.iun);
      this.cz.Normalize(NORMALIZE);
      this.cz.Multiply(this.nun * CommonDefine_1.MTOCM, this.z_n);
      this.cz.Multiply(MIN_SPEED * CommonDefine_1.MTOCM, this.Z_n);
      if (this.eun) {
        this.oun.DeepCopy(this.Wun());
      } else {
        this.run.DeepCopy(this.jun());
      }
    }
  }
  Tun() {
    return this.Entity.GetComponent(206).HasTag(-662723379);
  }
  Dun() {
    if (!this.vtn) {
      return false;
    }
    var t;
    var i;
    var e;
    var s;
    var h = this.vtn.GetEntitiesInRangeLocal();
    if (!h) {
      return false;
    }
    let o = false;
    for (const r of h.values()) {
      if (r?.Valid && r.Entity !== this.Entity && (t = r.Entity.GetComponent(1)?.ActorLocationProxy, i = r.Entity.GetComponent(1)?.HasMesh(), e = (e = r.Entity.GetComponent(0)?.GetSummonerId()) !== undefined && e !== 0, s = this.Entity.GetComponent(1)?.ActorLocationProxy, i) && t && t.Z < s.Z - 100 && !e) {
        if (r.Entity === Global_1.Global.BaseCharacter?.CharacterActorComponent.Entity) {
          r.Entity?.GetComponent(68)?.StopManipulate();
        }
        this.Yun(r.Entity);
        o = true;
      }
    }
    return o;
  }
  Yun(i) {
    var e = i.GetComponent(1)?.ActorLocationProxy;
    var t = this.Hte.ActorLocationProxy;
    if (e && t) {
      if (this.aun) {
        const l = i.GetComponent(1);
        var s;
        var h = l.GetRadius();
        var h = Vector_1.Vector.Create(t.X + this.aun.X, t.Y + this.aun.Y, t.Z + this.aun.Z + h);
        var o = i.GetComponent(3);
        if (o) {
          s = l.DisableCollision("[GamePlayElevatorComponent.SetEntitySafePos]");
          o.TeleportAndFindStandLocation(h);
          l.EnableCollision(s);
        } else {
          l.SetActorLocation(h.ToUeVector(), this.constructor.name, false);
        }
      } else {
        t.Subtraction(e, this.cz);
        this.cz.Z = 0;
        const l = i.GetComponent(1);
        for (let t = 0; t <= 3; t++) {
          this.kRe.X = e.X + this.cz.X * (t / 3);
          this.kRe.Y = e.Y + this.cz.Y * (t / 3);
          this.kRe.Z = e.Z;
          var [r, n] = TraceUtils_1.TraceUtils.LineTraceWithLocation(this.kRe, 2000, 0);
          if (r && !n.bStartPenetrating) {
            var a;
            var r = ModelManager_1.ModelManager.TraceElementModel.CommonHitLocation;
            TraceElementCommon_1.TraceElementCommon.GetImpactPoint(n, 0, r);
            var n = l.GetRadius();
            r.Z += n;
            var n = i.GetComponent(3);
            if (n) {
              a = l.DisableCollision("[GamePlayElevatorComponent.SetEntitySafePos]");
              n.TeleportAndFindStandLocation(r);
              l.EnableCollision(a);
            } else {
              if (n = i.GetComponent(165)) {
                n.TryEnableTick(true);
              }
              l.SetActorLocation(r.ToUeVector(), this.constructor.name, false);
            }
            break;
          }
        }
      }
    }
  }
  Kun() {
    if (!this.vtn) {
      return false;
    }
    var t = this.vtn.GetEntitiesInRangeLocal();
    if (!t) {
      return false;
    }
    let i = -1;
    var e = Global_1.Global.BaseCharacter;
    if (e) {
      i = e.CharacterActorComponent.Entity.Id;
    }
    return t.has(i);
  }
  Bun() {
    this.Igo.Subtraction(this.J_n, this.cz);
    var t = this.cz.Size();
    let i = 0;
    if ((i = this.Y1u === "CustomSpeed" ? this.Vid - UE.GameplayStatics.GetTimeSeconds(this.Hte.Owner) + this.Nid : this.eun ? t / CommonDefine_1.MTOCM / this.nun : ACCELERATETIMERADIO * t / CommonDefine_1.MTOCM / this.nun) < 0) {
      return 0;
    } else if (i > CommonDefine_1.THOUSAND) {
      return CommonDefine_1.THOUSAND;
    } else {
      return i;
    }
  }
  Hun() {
    let t = this.Eun ? this.dun - 1 : this.dun + 1;
    if (this.Mun) {
      return t = t > this.mun.length ? 1 : t;
    } else {
      if (t > this.mun.length) {
        t = this.mun.length - 1;
        this.Eun = true;
      } else if (t < 1) {
        t = 2;
        this.Eun = false;
      }
      return t;
    }
  }
  qun(t) {
    var i = ActorUtils_1.ActorUtils.GetEntityByActor(t);
    if (i &&= i.Entity.GetComponent(165)) {
      i.TryDisableTick("[GamePlayElevator.AttachToElevator] 上电梯关闭Tick");
      i = this.Entity.GetComponent(212);
      ControllerHolder_1.ControllerHolder.AttachToActorController.AttachToActor(t, i.Owner, 2, "GamePlayElevatorComponent.AttachToElevator", undefined, 1, 1, 1, false);
    }
  }
  Qun(t) {
    ControllerHolder_1.ControllerHolder.AttachToActorController.DetachActor(t, false, "GamePlayElevatorComponent.DetachFromElevator", 1, 1, 1);
    var t = ActorUtils_1.ActorUtils.GetEntityByActor(t);
    if (t &&= t.Entity.GetComponent(165)) {
      t.TryEnableTick(true);
    }
  }
  RegisterAfterElevatorTickHandler(t, i) {
    let e = this.aHf.get(t);
    if (!e) {
      e = new Set();
      this.aHf.set(t, e);
    }
    e.add(i);
  }
  UnRegisterAfterElevatorTickHandlers(t) {
    this.aHf.delete(t);
  }
  sHf(t) {
    this.hHf.length = 0;
    for (const i of this.aHf.values()) {
      this.hHf.push(...i);
    }
    for (const e of this.hHf) {
      e?.(t);
    }
    this.hHf.length = 0;
  }
  OnActivate() {
    if (!Info_1.Info.EnableForceTick && this.Active) {
      ComponentForceTickController_1.ComponentForceTickController.RegisterPreMoveTick(this, this.KHr);
    }
  }
  OnEnable() {
    if (!Info_1.Info.EnableForceTick && this.Entity?.IsInit) {
      ComponentForceTickController_1.ComponentForceTickController.RegisterPreMoveTick(this, this.KHr);
    }
  }
  OnEnd() {
    if (!Info_1.Info.EnableForceTick) {
      ComponentForceTickController_1.ComponentForceTickController.UnregisterPreMoveTick(this);
    }
    return true;
  }
  OnDisable(t) {
    if (!Info_1.Info.EnableForceTick) {
      ComponentForceTickController_1.ComponentForceTickController.UnregisterPreMoveTick(this);
    }
  }
};
GamePlayElevatorComponent = GamePlayElevatorComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(148)], GamePlayElevatorComponent);
exports.GamePlayElevatorComponent = GamePlayElevatorComponent; //# sourceMappingURL=GamePlayElevatorComponent.js.map