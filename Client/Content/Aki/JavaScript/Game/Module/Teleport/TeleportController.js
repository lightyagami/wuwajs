"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeleportController = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const AsyncTask_1 = require("../../World/Task/AsyncTask");
const TaskSystem_1 = require("../../World/Task/TaskSystem");
const LevelLoadingController_1 = require("../LevelLoading/LevelLoadingController");
const STREAMING_SOURCE_RADIUS_TELEPORT_NO_LOADING = 3000;
class TeleportController extends ControllerBase_1.ControllerBase {
  static async TeleportPlayer(e) {
    if (ModelManager_1.ModelManager.TeleportModel.IsTeleport) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Teleport", 79, "传送玩家失败, 当前正在传送中", ["ClientReason", e.ClientReason], ["ServerReason", e.ServerReason]);
      }
      return false;
    }
    e = ModelManager_1.ModelManager.TeleportModel.CreateContext(e);
    if (!e) {
      return false;
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 79, "==========传送玩家: 开始==========", ["TeleportContextId", e.TeleportContextId]);
    }
    var o = await this.Tkf(e, false);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 79, "==========传送玩家: 完成==========", ["TeleportContextId", e.TeleportContextId]);
    }
    return o;
  }
  static async TeleportPlayerInVehicle(e) {
    if (ModelManager_1.ModelManager.TeleportModel.IsTeleport) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Teleport", 79, "传送玩家(载具状态)失败, 当前正在传送中", ["ClientReason", e.ClientReason], ["ServerReason", e.ServerReason]);
      }
      return false;
    }
    e = ModelManager_1.ModelManager.TeleportModel.CreateContext(e);
    if (!e) {
      return false;
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 79, "==========传送玩家(载具状态): 开始==========", ["TeleportContextId", e.TeleportContextId]);
    }
    var o = await this.Tkf(e, true);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 79, "==========传送玩家(载具状态): 完成==========", ["TeleportContextId", e.TeleportContextId]);
    }
    return o;
  }
  static async Tkf(r, t) {
    var e = new AsyncTask_1.AsyncTask("TeleportPlayerInternal", async () => {
      var e = r.TeleportCore;
      let o = false;
      try {
        switch (r.TeleportMode) {
          case 0:
            o = this.wlm(r.ServerReason) ? await e.FakeTeleportPlayerWithLoading() : await e.TeleportPlayerWithLoading(t);
            break;
          case 1:
            o = await e.TeleportPlayerNoLoading(t);
            break;
          case 2:
            o = this.QueryCanTeleportNoLoading(r.TargetPosition) ? await e.TeleportPlayerNoLoading(t) : await e.TeleportPlayerWithLoading(t);
            break;
          default:
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Teleport", 79, "TeleportPlayerInternal失败, 不支持的传送类型", ["TeleportMode", r.TeleportMode]);
            }
            o = false;
        }
        return o;
      } finally {
        ModelManager_1.ModelManager.TeleportModel.RemoveContext(r);
        this.$xf();
      }
    });
    TaskSystem_1.TaskSystem.AddTask(e);
    TaskSystem_1.TaskSystem.Run();
    return e.Promise;
  }
  static async TeleportElevatorAndPlayerSeparately(e) {
    e = ModelManager_1.ModelManager.TeleportModel.CreateContext(e);
    try {
      return await e.TeleportCore.TeleportElevatorAndPlayerSeparately();
    } finally {
      ModelManager_1.ModelManager.TeleportModel.RemoveContext(e);
    }
  }
  static QueryCanTeleportNoLoading(e) {
    var o;
    var r;
    if (Global_1.Global.BaseCharacter?.IsValid()) {
      return !ModelManager_1.ModelManager.GameModeModel.UseWorldPartition || (o = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.WorldPartitionSubsystem.StaticClass()), (r = new UE.WorldPartitionStreamingQuerySource()).Location = e.op_ToVector(), r.bUseGridLoadingRange = false, r.Radius = STREAMING_SOURCE_RADIUS_TELEPORT_NO_LOADING, (e = UE.NewArray(UE.WorldPartitionStreamingQuerySource)).Add(r), o.IsStreamingCompleted(2, e, false, undefined, undefined, true));
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Teleport", 79, "查询是否可以无加载传送: 失败, 找不到当前玩家");
      }
      return false;
    }
  }
  static wlm(e) {
    return (e === Protocol_1.Aki.Protocol.v4s.SL_ || e === Protocol_1.Aki.Protocol.v4s.Xvs || e === Protocol_1.Aki.Protocol.v4s.Proto_Fall) && !!ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode() || e === Protocol_1.Aki.Protocol.v4s.cVu && !!ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot();
  }
  static OnInit() {
    Net_1.Net.Register(20412, this.AIo);
    Net_1.Net.Register(16809, this.Nkl);
    Net_1.Net.Register(21484, this.P$_);
    return true;
  }
  static OnClear() {
    Net_1.Net.UnRegister(20412);
    Net_1.Net.UnRegister(16809);
    Net_1.Net.UnRegister(21484);
    return true;
  }
  static OnTick(e) {
    var o = ModelManager_1.ModelManager.TeleportModel.TeleportContext;
    if (o && o.Seamless) {
      o.Treadmill?.Tick(e);
      o.PostProcess?.Tick(e);
      o.KeepMovementMode?.Tick(e);
    }
    if (!ModelManager_1.ModelManager.TeleportModel.IsTeleport) {
      this.$xf();
    }
  }
  static $xf() {
    if (TeleportController.aBf !== undefined) {
      this.AIo(TeleportController.aBf);
    } else if (TeleportController.hBf !== undefined) {
      this.Nkl(TeleportController.hBf);
    }
  }
  static async TeleportToPositionNoLoading(e, o, r, t = true) {
    if (Global_1.Global.BaseCharacter?.IsValid()) {
      return ControllerHolder_1.ControllerHolder.TeleportController.TeleportPlayer({
        ClientReason: r,
        TargetPosition: e,
        TargetRotation: o,
        NeedRestoreCamera: t,
        TeleportMode: 1
      });
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Teleport", 79, "无加载传送: 失败, 找不到当前玩家", ["Reason", r]);
      }
      return false;
    }
  }
  static lBf() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(1);
    return !!e && !!e.Entity.CheckGetComponent(242).VehicleEntity;
  }
  static Fkl(e, o, r, t) {
    var a;
    var l = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
    if (l?.Valid) {
      (a = ControllerHolder_1.ControllerHolder.CharacterController.GetActorComponent(l)).SetActorRotation(r.ToUeRotator(), "ResetLocationForZRangeNotify");
      a.MoveComp?.SetGravityDirectWithoutRotate(t);
      r = Vector_1.Vector.Create(o);
      if (t = l.Entity.GetComponent(3)) {
        t.FixBornLocation("ResetLocationForZRangeNotify", true, r, false, true);
      } else {
        a.SetActorLocation(r.ToUeVector(), "ResetLocationForZRangeNotify", false);
      }
      a.MoveComp?.SetForceSpeed(Vector_1.Vector.ZeroVectorProxy);
      l.Entity.GetComponent(70)?.ClearReplaySamples();
      EventSystem_1.EventSystem.EmitWithTarget(l.Entity, EventDefine_1.EEventName.TeleportChangeLocation);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Teleport", 79, "传送载具：设置载具实体位置", ["CreatureDataId", l.CreatureDataId], ["PbDataId", l.PbDataId], ["EntityId", l.Entity.Id], ["Location", r.ToString()]);
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 48, "传送载具：实体已无效", ["CreatureDataId", e]);
    }
  }
  static OnLeaveLevel() {
    var e = ModelManager_1.ModelManager.TeleportModel.TeleportContext;
    if (e) {
      if (e.CheckStreamingCompletedTimerId) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Teleport", 79, "传送: 终止. 原因: 离开关卡");
        }
        if (TimerSystem_1.GameplayTimerSystem.Has(e.CheckStreamingCompletedTimerId)) {
          TimerSystem_1.GameplayTimerSystem.Remove(e.CheckStreamingCompletedTimerId);
        }
        e.CheckStreamingCompletedTimerId = undefined;
      }
      e.VoxelStreamingCompleted?.SetResult(true);
      e.StreamingCompleted?.SetResult(true);
    }
    return true;
  }
}
exports.TeleportController = TeleportController;
(_a = TeleportController).aBf = undefined;
TeleportController.hBf = undefined;
TeleportController.AIo = e => {
  var o = e.l9_ ? Vector_1.Vector.Create(e.l9_).ToUeVector() : Vector_1.Vector.ZeroVectorDouble;
  var r = e.g8n ? Rotator_1.Rotator.Create(e.g8n.Y, e.g8n.Z, e.g8n.X).ToUeRotator() : Rotator_1.Rotator.ZeroRotator;
  var t = e.ZE_ ? Vector_1.Vector.Create(e.ZE_) : Vector_1.Vector.DownVectorProxy;
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Teleport", 79, "OnTeleportNotify", ["Context", JSON.stringify(e.cvs)], ["Pos", e.l9_], ["Rot", e.g8n], ["Gravity", e.ZE_], ["Reason", e.x9n]);
  }
  if (ModelManager_1.ModelManager.TeleportModel.IsTeleport) {
    TeleportController.aBf = e;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Teleport", 79, "传送中服务器再次发起玩家传送, 缓存TeleportNotify", ["SeverTeleportReason", e.x9n]);
    }
  } else {
    TeleportController.aBf = undefined;
    ControllerHolder_1.ControllerHolder.TeleportController.TeleportPlayer({
      ClientReason: "OnTeleportNotify",
      TargetPosition: o,
      TargetRotation: r,
      TargetGravityDirect: t,
      TeleportMode: 0,
      ServerReason: e.x9n,
      Option: e.f5n,
      DisableAutoFade: e.FI_,
      TeleportCfgId: e.cvs?.ePf?.w2s,
      GameCtx: e.cvs
    });
  }
};
TeleportController.P$_ = o => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Teleport", 45, "收到上线播放CG请求", ["Name", o.x$_]);
  }
  LevelLoadingController_1.LevelLoadingController.OpenLoading(7, 2);
  ModelManager_1.ModelManager.GameModeModel.PlayTravelMp4 = true;
  LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(18, 5, o.x$_, () => {
    var e = Protocol_1.Aki.Protocol.D$_.create();
    e.x$_ = o.x$_;
    if (!o.x$_) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Teleport", 45, "收到的CG名称不存在", ["Name", o.x$_]);
      }
    }
    Net_1.Net.Call(17997, e, e => {
      if (!e || e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Teleport", 45, "播放CG完成请求失败", ["ErrorCode", e.Cvs]);
        }
      }
      ModelManager_1.ModelManager.TeleportModel.TeleportContext?.CgTeleportCompleted?.SetResult(true);
      ModelManager_1.ModelManager.GameModeModel.VideoStartPromise?.SetResult(true);
      LevelLoadingController_1.LevelLoadingController.CloseLoading(18);
      LevelLoadingController_1.LevelLoadingController.CloseLoading(7);
    });
  }, false);
};
TeleportController.Nkl = e => {
  var o;
  var r;
  var t;
  var a;
  if (e.P5n) {
    o = MathUtils_1.MathUtils.LongToNumber(e.HI_);
    r = e.VI_.length > 0;
    t = new UE.VectorDouble(e.P5n.X, e.P5n.Y, e.P5n.Z);
    a = Rotator_1.Rotator.Create(e.g8n?.Pitch ?? 0, e.g8n?.Yaw ?? 0, e.g8n?.Roll ?? 0);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Teleport", 79, "OnTeleportVehicleNotify", ["Position", t], ["Rotation", a], ["Reason", e.x9n]);
    }
    if (r) {
      if (ModelManager_1.ModelManager.TeleportModel.IsTeleport) {
        TeleportController.hBf = e;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Teleport", 79, "传送中服务器再次发起载具传送, 缓存TeleportVehicleNotify", ["SeverTeleportReason", e.x9n]);
        }
      } else if (_a.lBf()) {
        TeleportController.hBf = undefined;
        ControllerHolder_1.ControllerHolder.TeleportController.TeleportPlayerInVehicle({
          ClientReason: "OnTeleportVehicleNotify",
          TargetPosition: t,
          TargetRotation: a,
          TeleportMode: e.$I_ ? 2 : 0,
          ServerReason: e.x9n,
          Option: e.f5n
        });
      } else {
        TeleportController.hBf = e;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Teleport", 79, "服务器发起载具传送时玩家还不在载具上, 缓存TeleportVehicleNotify", ["SeverTeleportReason", e.x9n]);
        }
      }
    } else {
      _a.Fkl(o, t, a, Vector_1.Vector.DownVectorProxy);
    }
  } else if (Log_1.Log.CheckError()) {
    Log_1.Log.Error("Teleport", 18, "传送载具：目标位置错误");
  }
}; //# sourceMappingURL=TeleportController.js.map