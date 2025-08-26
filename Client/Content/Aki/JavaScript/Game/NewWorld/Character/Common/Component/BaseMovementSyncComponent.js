"use strict";

var BaseMovementSyncComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, s) {
  var o;
  var h = arguments.length;
  var r = h < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, i, s);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (o = t[a]) {
        r = (h < 3 ? o(r) : h > 3 ? o(e, i, r) : o(e, i)) || r;
      }
    }
  }
  if (h > 3 && r) {
    Object.defineProperty(e, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseMovementSyncComponent = exports.ReplaySample = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const LogAnalyzer_1 = require("../../../../../Core/Common/LogAnalyzer");
const Time_1 = require("../../../../../Core/Common/Time");
const Deque_1 = require("../../../../../Core/Container/Deque");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../../Core/Net/Net");
const MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const Global_1 = require("../../../../Global");
const GlobalData_1 = require("../../../../GlobalData");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CombatMessageController_1 = require("../../../../Module/CombatMessage/CombatMessageController");
const CombatDebugController_1 = require("../../../../Utils/CombatDebugController");
const CombatDebugDrawController_1 = require("../../../../Utils/CombatDebugDrawController");
const CombatLog_1 = require("../../../../Utils/CombatLog");
const IS_WITH_EDITOR = cpp_1.KuroApplication.IsWithEditor() ? 1 : undefined;
class RelativeMove {
  constructor() {
    this.BaseMovementEntityId = 0;
    this.RelativeLocation = undefined;
    this.RelativeRotation = undefined;
  }
}
class ReplaySample {
  constructor(t, e, i) {
    this.P5n = Vector_1.Vector.Create();
    this.g8n = Rotator_1.Rotator.Create();
    this.f8n = Vector_1.Vector.Create();
    this.PWn = Vector_1.Vector.Create();
    this.ControllerPitch = 0;
    this.KVn = 0;
    this.BWn = 0;
    this.J8n = 0;
    this.wWn = undefined;
    this.bWn = 0;
    this.qWn = 1;
    this.GWn = 0;
    this.OWn = 0;
    const s = t.P5n;
    const o = t.g8n;
    var h = t.f8n;
    var r = t.PWn;
    this.P5n.Set(s.X, s.Y, s.Z);
    this.g8n.Set(o.Pitch, o.Yaw, o.Roll);
    if (h) {
      this.f8n.Set(h.X, h.Y, h.Z);
    }
    if (r) {
      this.PWn.Set(r.X, r.Y, r.Z);
    }
    this.ControllerPitch = t.ControllerPitch;
    this.KVn = t.KVn;
    this.BWn = t.rSs;
    this.qWn = t.qWn;
    this.J8n = i;
    this.bWn = e;
    this.GWn = MathUtils_1.MathUtils.LongToNumber(t.GWn);
    this.OWn = t.NWn;
    var h = t.kWn;
    if (h) {
      this.wWn = new RelativeMove();
      this.wWn.BaseMovementEntityId = MathUtils_1.MathUtils.LongToNumber(h.FWn);
      const o = h.VWn;
      const s = h.HWn;
      this.wWn.RelativeRotation = Rotator_1.Rotator.Create(o.Pitch, o.Yaw, o.Roll);
      this.wWn.RelativeLocation = Vector_1.Vector.Create(s.X, s.Y, s.Z);
    }
  }
}
exports.ReplaySample = ReplaySample;
let BaseMovementSyncComponent = BaseMovementSyncComponent_1 = class BaseMovementSyncComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ActorComp = undefined;
    this.TimeScaleComp = undefined;
    this.MoveComp = undefined;
    this.CreatureDataComp = undefined;
    this.EnableMovementSyncInternal = false;
    this.CacheBaseEntityHandle = undefined;
    this.CacheRelativeLocation = Vector_1.Vector.Create();
    this.CacheRelativeRotator = Rotator_1.Rotator.Create();
    this.CacheFinalLocation = Vector_1.Vector.Create();
    this.CacheFinalRotator = Rotator_1.Rotator.Create();
    this.CacheVelocity = Vector_1.Vector.Create();
    this.ControllerPlayerId = 0;
    this.THr = 1;
    this.TmpVector = Vector_1.Vector.Create();
    this.TmpVector2 = Vector_1.Vector.Create();
    this.LastHasBaseMovement = false;
    this.LastBasePlatform = undefined;
    this.LastMoveAutonomousProxy = false;
    this.LastRelativeMove = false;
    this.LastMove = false;
    this.LastSendTime = 0;
    this.LastReceiveControllerPlayerId = 0;
    this.LastSendLocation = Vector_1.Vector.Create();
    this.LastSendRotation = Rotator_1.Rotator.Create();
    this.LastLocation = Vector_1.Vector.Create();
    this.LastRotation = Rotator_1.Rotator.Create();
    this.IsPending = false;
    this.PendingTime = 0;
    this.PendingMoveInfos = [];
    this.LastReceiveMoveSample = undefined;
    this.LastApplyMoveSample = undefined;
    this.LastMoveSample = undefined;
    this.LastApplyMoveSampleUsed = false;
    this.NowLogicTickTime = 0;
    this.LastLogicTickTime = 0;
    this.LastApplyLogicTickTime = 0;
    this.cSa = false;
    this.bi_ = t => {
      this.CustomPreTickInternal(t);
    };
    this.CustomAfterTick = t => {
      this.CustomAfterTickInternal(t);
    };
    this.ZHr = new Deque_1.Deque();
    this.TmpLocation = Vector_1.Vector.Create();
    this.TmpLocation2 = Vector_1.Vector.Create();
    this.TmpRotation = Rotator_1.Rotator.Create();
  }
  DefaultEnableMovementSync() {
    return false;
  }
  get EnableMovementSync() {
    return this.EnableMovementSyncInternal;
  }
  set EnableMovementSync(t) {
    if (this.EnableMovementSyncInternal !== t && (this.EnableMovementSyncInternal = t, this.cSa)) {
      if (t) {
        this.RecordLastData();
        this.ClearPendingMoveInfos();
        this.CollectSampleAndSend();
        CombatMessageController_1.CombatMessageController.RegisterPreTick(this, this.bi_);
        CombatMessageController_1.CombatMessageController.RegisterAfterTick(this, this.CustomAfterTick);
      } else {
        this.ClearReplaySamples();
        this.ClearPendingMoveInfos();
        CombatMessageController_1.CombatMessageController.UnregisterPreTick(this);
        CombatMessageController_1.CombatMessageController.UnregisterAfterTick(this);
      }
    }
  }
  OnInit() {
    this.EnableMovementSync = this.DefaultEnableMovementSync();
    return true;
  }
  OnStart() {
    this.ActorComp = this.Entity.GetComponent(1);
    this.TimeScaleComp = this.Entity.GetComponent(180);
    this.MoveComp = this.Entity.GetComponent(45);
    this.CreatureDataComp = this.Entity.GetComponent(0);
    if (!ModelManager_1.ModelManager.CombatMessageModel.AddMoveSync(this)) {
      CombatLog_1.CombatLog.Warn("Move", this.Entity, "重复添加移动同步");
    }
    return true;
  }
  OnEnd() {
    if (!ModelManager_1.ModelManager.CombatMessageModel.DeleteMoveSync(this)) {
      CombatLog_1.CombatLog.Warn("Move", this.Entity, "移除移动同步失败");
    }
    return !(this.EnableMovementSync = false);
  }
  ApplyInput(t, e) {}
  OnActivate() {
    if (this.LastReceiveMoveSample && Time_1.Time.NowSeconds >= this.LastReceiveMoveSample.J8n) {
      this.ActorComp.SetActorLocationAndRotation(this.LastReceiveMoveSample.P5n.ToUeVector(), this.LastReceiveMoveSample.g8n.ToUeRotator(), "角色移动同步.处理出生位置刷新", false);
      this.LastLocation.DeepCopy(this.LastReceiveMoveSample.P5n);
      this.LastRotation.DeepCopy(this.LastReceiveMoveSample.g8n);
    } else {
      this.LastLocation.DeepCopy(this.ActorComp.Owner.D_K2_GetActorLocation());
      this.LastRotation.DeepCopy(this.ActorComp.Owner.K2_GetActorRotation());
    }
    if (this.ActorComp.IsMoveAutonomousProxy) {
      this.CollectSampleAndSend();
    }
    this.LastMoveAutonomousProxy = this.ActorComp.IsMoveAutonomousProxy;
    if (this.EnableMovementSyncInternal) {
      CombatMessageController_1.CombatMessageController.RegisterPreTick(this, this.bi_);
      CombatMessageController_1.CombatMessageController.RegisterAfterTick(this, this.CustomAfterTick);
    }
    return this.cSa = true;
  }
  GetCurrentMoveSample() {
    var t = Protocol_1.Aki.Protocol.Wks.create();
    t.P5n = {
      X: this.ActorComp.ActorLocationProxy.X,
      Y: this.ActorComp.ActorLocationProxy.Y,
      Z: this.ActorComp.ActorLocationProxy.Z
    };
    t.g8n = {
      Pitch: this.ActorComp.ActorRotationProxy.Pitch,
      Roll: this.ActorComp.ActorRotationProxy.Roll,
      Yaw: this.ActorComp.ActorRotationProxy.Yaw
    };
    t.GWn = Time_1.Time.CombatServerTime;
    t.J8n = Time_1.Time.NowSeconds;
    if (this.Entity.GetTickInterval() > 1 && this.LastLogicTickTime > 0 && this.NowLogicTickTime > 0) {
      t.jWn = (this.NowLogicTickTime - this.LastLogicTickTime) * 1000;
    }
    t.NWn = Net_1.Net.RttMs;
    t.qWn = this.Entity.TimeDilation * (this.TimeScaleComp?.CurrentTimeScale ?? 1);
    this.LastMoveSample = t;
    this.CompressData(t);
    return t;
  }
  CompressData(t) {
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      if (Info_1.Info.IsBuildDevelopmentOrDebug) {
        t.GWn = 0;
        t.NWn = 0;
      }
    } else {
      t.f8n = undefined;
      t.KVn = 0;
      t.rSs = 0;
      t.kWn = undefined;
      t.ControllerPitch = 0;
      t.qWn = 0;
      t.GWn = 0;
      t.NWn = 0;
      t.PWn = undefined;
      t.jWn = 0;
    }
  }
  RecordLastData(t = false) {
    this.LastLocation.DeepCopy(this.ActorComp.ActorLocationProxy);
    this.LastRotation.DeepCopy(this.ActorComp.ActorRotationProxy);
    this.LastMoveAutonomousProxy = this.ActorComp.IsMoveAutonomousProxy;
    this.LastMove = t;
  }
  OnTick(t) {
    this.LastLogicTickTime = this.NowLogicTickTime;
    this.NowLogicTickTime = Time_1.Time.NowSeconds;
  }
  CustomPreTickInternal(t) {
    var e;
    if (!this.ActorComp.IsMoveAutonomousProxy && !this.Entity.GetComponent(206).HasTag(-648310348)) {
      this.IsPending = false;
      this.PendingMoveInfos.length = 0;
      this.TickReplaySamples();
      if (this.LastMoveAutonomousProxy) {
        e = Vector_1.Vector.Dist(this.LastLocation, this.ActorComp.ActorLocationProxy);
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("MultiplayerCombat", 14, "ChangeControl", ["control", this.ActorComp.IsMoveAutonomousProxy], ["diffDistance", e]);
        }
        this.ReportMoveDataDragDistance(e, false);
      }
    }
  }
  GetIsMoving() {
    return !this.LastLocation.Equals(this.ActorComp.ActorLocationProxy) || !this.LastRotation.Equals(this.ActorComp.ActorRotationProxy);
  }
  GetImportantMove(t) {
    return !t && this.LastMove;
  }
  GetSecondaryImportantMove() {
    return false;
  }
  CustomAfterTickInternal(t) {
    var e;
    var i;
    if (this.EnableMovementSync && this.ActorComp.IsMoveAutonomousProxy) {
      if (!(this.LastApplyLogicTickTime > 0) || this.LastApplyLogicTickTime !== this.NowLogicTickTime) {
        this.LastApplyLogicTickTime = this.NowLogicTickTime;
        this.ControllerPlayerId = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
        this.ClearReplaySamples();
        e = this.GetIsMoving();
        i = this.GetImportantMove(e);
        if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
          this.TryPushMoveMulti(e, i, this.ActorComp.ActorLocationProxy);
        } else {
          this.TryPushMoveSingle(e, this.ActorComp.ActorLocationProxy, this.ActorComp.ActorRotationProxy);
        }
        this.RecordLastData(e);
      }
    } else {
      this.RecordLastData();
    }
  }
  TryPushMoveSingle(t, e, i) {
    var s;
    var o = Time_1.Time.NowSeconds - this.LastSendTime >= BaseMovementSyncComponent_1.SingleModeSendInterval;
    var i = !this.LastSendLocation.Equals(e, BaseMovementSyncComponent_1.SingleModeSendLocationTolerance) || !this.LastSendRotation.Equals(i, BaseMovementSyncComponent_1.SingleModeSendRotationTolerance);
    var e = Global_1.Global.BaseCharacter?.EntityId === this.Entity.Id && !this.LastSendLocation.Equals(e, BaseMovementSyncComponent_1.SingleModeSendLocationToleranceMax);
    if (!t && this.LastMove) {
      s = this.GetCurrentMoveSample();
      this.PendingMoveInfos.push(s);
      ModelManager_1.ModelManager.CombatMessageModel.NeedPushMove = true;
    } else if (t && i || e) {
      if (o || e) {
        s = this.GetCurrentMoveSample();
        this.PendingMoveInfos.push(s);
        ModelManager_1.ModelManager.CombatMessageModel.NeedPushMove = true;
      } else if (this.GetSecondaryImportantMove()) {
        t = this.GetCurrentMoveSample();
        this.PendingMoveInfos.push(t);
      }
    }
  }
  TryPushMoveMulti(t, e, i) {
    if (!this.LastMoveAutonomousProxy) {
      s = Vector_1.Vector.Dist(this.LastLocation, i);
      this.ReportMoveDataDragDistance(s, true);
      CombatLog_1.CombatLog.Info("Move", this.Entity, "移动来源切换自身", ["上个控制者", this.ControllerPlayerId], ["当前控制者", ModelManager_1.ModelManager.CreatureModel.GetPlayerId()], ["位移距离", s.toFixed()]);
    }
    var s = this.Entity.GetComponent(0);
    if (CombatDebugDrawController_1.CombatDebugDrawController.DebugMonsterMovePath && s.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Monster) {
      UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.World, this.LastLocation.ToUeVector(), i.ToUeVector(), new UE.LinearColor(0, 1, 0, 1), 15);
    }
    if (ModelManager_1.ModelManager.CombatMessageModel.MoveSyncUdpMode) {
      if (e) {
        this.CollectSampleAndSend(true);
      } else if (t) {
        this.CollectSampleAndSendUdp();
      }
    } else {
      if (!this.IsPending) {
        if (!t) {
          return;
        }
        this.IsPending = true;
        this.PendingTime = Time_1.Time.NowSeconds;
        this.PendingMoveInfos.length = 0;
      }
      s = this.GetCurrentMoveSample();
      new ReplaySample(s, ModelManager_1.ModelManager.CreatureModel.GetPlayerId(), Time_1.Time.NowSeconds).J8n = Time_1.Time.NowSeconds;
      this.PendingMoveInfos.push(s);
      if (Time_1.Time.NowSeconds >= this.PendingTime + BaseMovementSyncComponent_1.PendingMoveCacheTime || !t) {
        ModelManager_1.ModelManager.CombatMessageModel.NeedPushMove = true;
      }
    }
  }
  CollectSampleAndSend(t = false) {
    var e = this.GetCurrentMoveSample();
    this.PendingMoveInfos.push(e);
    if (t) {
      (e = Protocol_1.Aki.Protocol.Yus.create()).uhh = ModelManager_1.ModelManager.GameModeModel.IsMulti ? ModelManager_1.ModelManager.OnlineModel.OwnerId : ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
      e.WRs.push(this.CollectPendingMoveInfos());
      Net_1.Net.Send(23287, e);
      if (Info_1.Info.IsBuildDevelopmentOrDebug) {
        t = {
          scene_id: ModelManager_1.ModelManager.CreatureModel.GetSceneId(),
          instance_id: ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
          msg_id: 23287,
          immediately: true,
          sub_count: e.WRs.length,
          is_multi: ModelManager_1.ModelManager.GameModeModel.IsMulti,
          ed: IS_WITH_EDITOR,
          br: LogAnalyzer_1.LogAnalyzer.GetBranch()
        };
        e = JSON.stringify(t);
        CombatDebugController_1.CombatDebugController.DataReport("COMBAT_MESSAGE_COUNT", e);
      }
      this.LastSendTime = Time_1.Time.NowSeconds;
    } else {
      ModelManager_1.ModelManager.CombatMessageModel.NeedPushMove = true;
    }
  }
  CollectSampleAndSendUdp() {
    if (Time_1.Time.NowSeconds - this.LastSendTime < ModelManager_1.ModelManager.CombatMessageModel.MoveSyncUdpSendInterval) {
      if (ModelManager_1.ModelManager.CombatMessageModel.MoveSyncUdpFullSampling) {
        const e = this.GetCurrentMoveSample();
        this.PendingMoveInfos.push(e);
      }
    } else {
      const e = this.GetCurrentMoveSample();
      this.PendingMoveInfos.push(e);
      var t = Protocol_1.Aki.Protocol.zus.create();
      t.uhh = ModelManager_1.ModelManager.GameModeModel.IsMulti ? ModelManager_1.ModelManager.OnlineModel.OwnerId : ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
      t.WRs.push(this.CollectPendingMoveInfos());
      Net_1.Net.Send(24484, t);
      if (Info_1.Info.IsBuildDevelopmentOrDebug) {
        t = {
          scene_id: ModelManager_1.ModelManager.CreatureModel.GetSceneId(),
          instance_id: ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
          msg_id: 24484,
          immediately: true,
          is_multi: ModelManager_1.ModelManager.GameModeModel.IsMulti,
          ed: IS_WITH_EDITOR,
          br: LogAnalyzer_1.LogAnalyzer.GetBranch()
        };
        t = JSON.stringify(t);
        CombatDebugController_1.CombatDebugController.DataReport("COMBAT_MESSAGE_COUNT", t);
      }
      this.LastSendTime = Time_1.Time.NowSeconds;
    }
  }
  CollectPendingMoveInfos() {
    let t = 0;
    for (const r of this.PendingMoveInfos) {
      if (Time_1.Time.NowSeconds < r.J8n + BaseMovementSyncComponent_1.MaxPendingMoveCacheTime) {
        break;
      }
      t++;
    }
    var e;
    var i;
    var s;
    var o;
    var h;
    if (this.PendingMoveInfos.length > 50 && Log_1.Log.CheckError()) {
      Log_1.Log.Error("MultiplayerCombat", 14, "移动包过多", ["diff", Time_1.Time.NowSeconds - this.PendingMoveInfos[0].J8n], ["NowSeconds", Time_1.Time.NowSeconds], ["TimeStamp", this.PendingMoveInfos[0].J8n], ["length", this.PendingMoveInfos.length]);
    }
    if (t > 0) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("MultiplayerCombat", 14, "移动包过期", ["diff", Time_1.Time.NowSeconds - this.PendingMoveInfos[0].J8n], ["NowSeconds", Time_1.Time.NowSeconds], ["TimeStamp", this.PendingMoveInfos[0].J8n]);
      }
      this.PendingMoveInfos.splice(0, t);
    }
    if (this.PendingMoveInfos.length !== 0) {
      (e = Protocol_1.Aki.Protocol.r4s.create()).F4n = MathUtils_1.MathUtils.NumberToLong(this.ActorComp.CreatureData.GetCreatureDataId());
      e.Y8n = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
      e.iVn = this.PendingMoveInfos;
      i = this.PendingMoveInfos[this.PendingMoveInfos.length - 1];
      this.LastSendLocation.X = i.P5n.X;
      this.LastSendLocation.Y = i.P5n.Y;
      this.LastSendLocation.Z = i.P5n.Z;
      this.LastSendRotation.Roll = i.g8n.Roll;
      this.LastSendRotation.Pitch = i.g8n.Pitch;
      this.LastSendRotation.Yaw = i.g8n.Yaw;
      this.IsPending = false;
      this.LastSendTime = Time_1.Time.NowSeconds;
      this.PendingMoveInfos = [];
      if (Info_1.Info.IsBuildDevelopmentOrDebug && (i = Protocol_1.Aki.Protocol.r4s.encode(e).finish(), h = this.CreatureDataComp?.GetPbDataId(), s = this.CreatureDataComp?.GetEntityType(), o = this.CreatureDataComp?.GetCreatureDataId(), i.length > 0)) {
        o = {
          scene_id: ModelManager_1.ModelManager.CreatureModel.GetSceneId(),
          instance_id: ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
          creature_id: o,
          pb_data_id: h,
          entity_type: s,
          msg_id: -1,
          length: i.length,
          is_multi: ModelManager_1.ModelManager.GameModeModel.IsMulti,
          is_send: true,
          ed: IS_WITH_EDITOR,
          br: LogAnalyzer_1.LogAnalyzer.GetBranch()
        };
        h = JSON.stringify(o);
        CombatDebugController_1.CombatDebugController.DataReport("COMBAT_MESSAGE_INFO", h);
      }
      return e;
    }
  }
  ReceiveMoveInfos(t, e, i) {
    if (t.length === 0) {
      CombatLog_1.CombatLog.Warn("Move", this.Entity, "收移动包失败，移动包长度为0");
    } else {
      var s = ModelManager_1.ModelManager.CombatMessageModel.GetMessageBufferByEntityId(this.Entity.Id);
      if (s) {
        var o = i + s.TimelineOffset;
        if (Time_1.Time.NowSeconds > o) {
          o = Time_1.Time.NowSeconds - o;
          CombatLog_1.CombatLog.Warn("Move", this.Entity, "移动缓冲不足", ["missTime", o], ["TimeStamp", i]);
          this.ReportMoveDataBufferMissTime(o * 1000);
        }
        var h = MathUtils_1.MathUtils.LongToNumber(e);
        if (this.LastReceiveControllerPlayerId !== h) {
          CombatLog_1.CombatLog.Info("Move", this.Entity, "移动协议包切换", ["上个控制者", this.LastReceiveControllerPlayerId], ["当前控制者", h], ["TimeStamp", i]);
        }
        for (const a of t) {
          if ((!a.J8n || a.J8n <= 0) && Log_1.Log.CheckError()) {
            Log_1.Log.Error("MultiplayerCombat", 14, "[BaseMovementSyncComponent.ReceiveMoveInfos] TimeStamp不能小于等于0", ["TimeStamp", a.J8n ?? undefined]);
          }
          let t = a.jWn > 0 ? a.jWn * 0.001 : 0;
          if (t > 0) {
            t = MathUtils_1.MathUtils.Clamp(t, 0, this.THr);
            CombatLog_1.CombatLog.Info("Move", this.Entity, "额外移动缓冲", ["extraOffset", t]);
          }
          var r = new ReplaySample(a, h, a.J8n + s.TimelineOffset + t);
          this.AddReplaySample(r);
        }
        this.LastReceiveControllerPlayerId = h;
      } else {
        CombatLog_1.CombatLog.Warn("Move", this.Entity, "收移动包失败，缓冲器查询失败");
      }
    }
  }
  GetEnableMovementSync() {
    return this.EnableMovementSync;
  }
  SetEnableMovementSync(t, e = "") {
    CombatLog_1.CombatLog.Info("Move", this.Entity, "SetEnableMovementSync", ["enable", t], ["reason", e]);
    this.EnableMovementSync = t;
  }
  AddReplaySample(t) {
    while (!this.ZHr.Empty && this.ZHr.Rear.J8n > t.J8n) {
      this.ZHr.RemoveRear();
    }
    this.ZHr.AddRear(t);
    this.LastReceiveMoveSample = t;
  }
  ClearReplaySamples() {
    this.ZHr.Clear();
    this.LastApplyMoveSample = undefined;
  }
  ClearPendingMoveInfos() {
    this.PendingMoveInfos.length = 0;
    this.IsPending = false;
  }
  CloneMoveSampleInfos(t) {
    this.ZHr.Clone(t.ZHr);
  }
  CalcRelativeMove(t, e, i, s, o) {
    return false;
  }
  CheckRelativeMove(t, e, i, s, o) {}
  TransformFromRelativeMove(t, e, i, s, o) {
    return false;
  }
  TickReplaySamples() {
    var t;
    var e;
    var i = Time_1.Time.NowSeconds;
    for (this.LastApplyMoveSample && i - this.LastApplyMoveSample.J8n > 1 && (CombatLog_1.CombatLog.Info("Move", this.Entity, "不连贯的样条点丢弃", ["diff", i - this.LastApplyMoveSample.J8n]), this.LastApplyMoveSample = undefined); !this.ZHr.Empty;) {
      var s = this.LastApplyMoveSample;
      var o = this.ZHr.Front;
      if (!(i >= o.J8n)) {
        if (!s) {
          break;
        }
        var h = MathUtils_1.MathUtils.RangeClamp(i, s.J8n, o.J8n, 0, 1);
        this.CacheBaseEntityHandle = this.CheckRelativeMove(s, o, h, this.CacheRelativeLocation, this.CacheRelativeRotator);
        if (this.CacheBaseEntityHandle && this.TransformFromRelativeMove(this.CacheBaseEntityHandle, this.CacheRelativeLocation, this.CacheRelativeRotator, this.CacheFinalLocation, this.CacheFinalRotator)) {
          this.LastRelativeMove;
          this.LastRelativeMove = true;
        } else {
          Vector_1.Vector.Lerp(s.P5n, o.P5n, h, this.CacheFinalLocation);
          Rotator_1.Rotator.Lerp(s.g8n, o.g8n, h, this.CacheFinalRotator);
          this.LastRelativeMove;
          this.LastRelativeMove = false;
        }
        Vector_1.Vector.Lerp(s.f8n, o.f8n, h, this.CacheVelocity);
        var h = MathUtils_1.MathUtils.Lerp(MathCommon_1.MathCommon.WrapAngle(s.ControllerPitch), MathCommon_1.MathCommon.WrapAngle(o.ControllerPitch), h);
        this.ApplyMoveSample(s.KVn, this.CacheFinalLocation, this.CacheFinalRotator, s.f8n, s.PWn, o.bWn, s.BWn, h, s.qWn, s.GWn, s.OWn);
        this.LastApplyMoveSampleUsed = true;
        break;
      }
      this.LastApplyMoveSample = o;
      this.LastApplyMoveSampleUsed = false;
      this.ZHr.RemoveFront();
    }
    if (this.ZHr.Empty && !this.LastApplyMoveSampleUsed && this.LastApplyMoveSample) {
      t = this.LastApplyMoveSample;
      this.CacheBaseEntityHandle = this.CheckRelativeMove(t, t, 1, this.CacheRelativeLocation, this.CacheRelativeRotator);
      e = this.CacheBaseEntityHandle && this.TransformFromRelativeMove(this.CacheBaseEntityHandle, this.CacheRelativeLocation, this.CacheRelativeRotator, this.CacheFinalLocation, this.CacheFinalRotator);
      this.ApplyMoveSample(t.KVn, e ? this.CacheFinalLocation : t.P5n, e ? this.CacheFinalRotator : t.g8n, t.f8n, t.PWn, t.bWn, t.BWn, t.ControllerPitch, t.qWn, t.GWn, t.OWn);
      this.LastApplyMoveSampleUsed = true;
    }
  }
  ApplyMoveSample(t, e, i, s, o, h, r, a, n, _, l) {
    if (!!this.LastMoveAutonomousProxy || this.ControllerPlayerId !== h) {
      m = Vector_1.Vector.Dist(this.LastLocation, this.CacheFinalLocation);
      CombatLog_1.CombatLog.Info("Move", this.Entity, "移动来源切换", ["上个控制者", this.ControllerPlayerId], ["当前控制者", h], ["位移距离", m.toFixed()]);
    }
    var m = this.Entity.GetComponent(0);
    if (CombatDebugDrawController_1.CombatDebugDrawController.DebugMonsterMovePath && m.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Monster) {
      UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.World, this.LastLocation.ToUeVector(), this.CacheFinalLocation.ToUeVector(), new UE.LinearColor(1, 0, 0, 1), 15);
    }
    this.ControllerPlayerId = h;
    this.ActorComp.SetActorLocationAndRotation(e.ToUeVector(), i.ToUeRotator(), "角色移动同步.添加简单位移", false);
    let M = 0;
    if (this.LastReceiveMoveSample) {
      M = (this.LastReceiveMoveSample.J8n - Time_1.Time.NowSeconds) * 1000;
    }
    this.ReportMoveDataApplyInfo(Time_1.Time.CombatServerTime - _, M, l);
  }
  VectorToString(t) {
    if (t) {
      return `[${t.X.toFixed()},${t.Y.toFixed()},${t.Z.toFixed()}]`;
    } else {
      return "[-]";
    }
  }
  MoveInfosToString(t) {
    var e = t[0];
    var i = t[t.length - 1];
    return `length:${t.length}, t:${e.J8n.toFixed(3)}-${i.J8n.toFixed(3)}, position:${this.VectorToString(e.P5n)}-${this.VectorToString(i.P5n)}, refPos:${this.VectorToString(i.kWn?.HWn)} r:${e.g8n?.Yaw.toFixed()}-${i.g8n?.Yaw.toFixed()}, timeScale:${i.qWn}`;
  }
  MoveInfoToString(t) {
    return `t:${t.J8n.toFixed(3)}, position:${this.VectorToString(t.P5n)}, timeScale:${t.qWn}`;
  }
  ReportMoveDataApplyInfo(t, e, i) {
    i = {
      udp_mode: ModelManager_1.ModelManager.CombatMessageModel.MoveSyncUdpMode,
      creature_id: this.CreatureDataComp.GetCreatureDataId(),
      pb_data_id: this.CreatureDataComp.GetPbDataId(),
      rtt: Net_1.Net.RttMs,
      rtt_total: Net_1.Net.RttMs + i,
      delay: t,
      buffer_time: e
    };
    t = JSON.stringify(i);
    CombatDebugController_1.CombatDebugController.DataReport("MOVE_SYNC_INFO", t);
  }
  ReportMoveDataDragDistance(t, e) {
    e = {
      udp_mode: ModelManager_1.ModelManager.CombatMessageModel.MoveSyncUdpMode,
      creature_id: this.CreatureDataComp.GetCreatureDataId(),
      pb_data_id: this.CreatureDataComp.GetPbDataId(),
      rtt: Net_1.Net.RttMs,
      to_self: e,
      distance: t
    };
    t = JSON.stringify(e);
    CombatDebugController_1.CombatDebugController.DataReport("MOVE_SYNC_DRAG_DISTANCE", t);
  }
  ReportMoveDataBufferMissTime(t) {
    t = {
      udp_mode: ModelManager_1.ModelManager.CombatMessageModel.MoveSyncUdpMode,
      creature_id: this.CreatureDataComp.GetCreatureDataId(),
      pb_data_id: this.CreatureDataComp.GetPbDataId(),
      rtt: Net_1.Net.RttMs,
      miss_time: t
    };
    t = JSON.stringify(t);
    CombatDebugController_1.CombatDebugController.DataReport("MOVE_SYNC_BUFFER_MISS_TIME", t);
  }
  ReportMoveDataInnerBufferMissTime(t) {
    t = {
      udp_mode: ModelManager_1.ModelManager.CombatMessageModel.MoveSyncUdpMode,
      creature_id: this.CreatureDataComp.GetCreatureDataId(),
      pb_data_id: this.CreatureDataComp.GetPbDataId(),
      rtt: Net_1.Net.RttMs,
      miss_time: t
    };
    t = JSON.stringify(t);
    CombatDebugController_1.CombatDebugController.DataReport("MOVE_SYNC_INNER_BUFFER_MISS_TIME", t);
  }
};
BaseMovementSyncComponent.PendingMoveCacheTime = 0.08;
BaseMovementSyncComponent.MaxPendingMoveCacheTime = 1;
BaseMovementSyncComponent.SingleModeSendInterval = 1;
BaseMovementSyncComponent.SingleModeSendLocationTolerance = 10;
BaseMovementSyncComponent.SingleModeSendRotationTolerance = 5;
BaseMovementSyncComponent.SingleModeSendLocationToleranceMax = 600;
BaseMovementSyncComponent = BaseMovementSyncComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(67)], BaseMovementSyncComponent);
exports.BaseMovementSyncComponent = BaseMovementSyncComponent; //# sourceMappingURL=BaseMovementSyncComponent.js.map