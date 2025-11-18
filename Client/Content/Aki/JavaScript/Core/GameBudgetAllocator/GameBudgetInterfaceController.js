"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameBudgetInterfaceController = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const EventDefine_1 = require("../../Game/Common/Event/EventDefine");
const EventSystem_1 = require("../../Game/Common/Event/EventSystem");
const Global_1 = require("../../Game/Global");
const ModelManager_1 = require("../../Game/Manager/ModelManager");
const GameBudgetAllocatorConfigCreator_1 = require("../../Game/World/Define/GameBudgetAllocatorConfigCreator");
const Log_1 = require("../Common/Log");
const ControllerBase_1 = require("../Framework/ControllerBase");
const PerfSight_1 = require("../PerfSight/PerfSight");
const Vector_1 = require("../Utils/Math/Vector");
const GameBudgetTimeEstimationFramesOffset_1 = require("./GameBudgetTimeEstimationFramesOffset");
class GameBudgetInterfaceController extends ControllerBase_1.ControllerBase {
  static get CenterRole() {
    return this.EK;
  }
  static get CurrentGlobalMode() {
    return this.wPa;
  }
  static OnInit() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.SK);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBattleStateChanged, this.yK);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CameraModeChanged, this.IK);
    this.TK = 0;
    if (PerfSight_1.PerfSight.IsEnable) {
      cpp_1.FKuroPerfSightHelper.BeginExtTag("EGameBudgetMode.None");
    }
    return super.OnInit();
  }
  static OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.SK);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBattleStateChanged, this.yK);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CameraModeChanged, this.IK);
    this.LK = undefined;
    if (PerfSight_1.PerfSight.IsEnable) {
      if (this.TK === 0) {
        cpp_1.FKuroPerfSightHelper.EndExtTag("EGameBudgetMode.None");
      } else if (this.TK === 1) {
        cpp_1.FKuroPerfSightHelper.EndExtTag("EGameBudgetMode.Normal");
      } else if (this.TK === 2) {
        cpp_1.FKuroPerfSightHelper.EndExtTag("EGameBudgetMode.Plot");
      }
    }
    return super.OnClear();
  }
  static InitializeEnvironment(e) {
    cpp_1.FKuroGameBudgetAllocatorInterface.InitializeEnvironment(e);
    cpp_1.FKuroGameBudgetAllocatorInterface.SetUpdateCompensateEnable(0);
    if (this.DK) {
      cpp_1.FKuroGameBudgetAllocatorInterface.UpdateMinUpdateFIFOBudgetTime(this.DK);
    }
    this.RK.Initialize();
  }
  static IsEnvironmentValid() {
    return cpp_1.FKuroGameBudgetAllocatorInterface.IsEnvironmentValid();
  }
  static SetMaximumFrameRate(e) {
    cpp_1.FKuroGameBudgetAllocatorInterface.SetMaximumFrameRate(e);
    this.RK.SetMaximumFrameRate(e);
  }
  static UpdateMinUpdateFifoBudgetTime(e) {
    this.DK = e;
    if (this.IsEnvironmentValid()) {
      cpp_1.FKuroGameBudgetAllocatorInterface.UpdateMinUpdateFIFOBudgetTime(e);
    }
  }
  static UpdateBudgetTime(e) {
    this.RK.UpdateBudgetTime(e);
  }
  static RegisterTick(e, t, a, r, o = true, i = true, s = true, n = true) {
    if (this.UK.has(a)) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Game", 24, "Object has already added!");
      }
      return this.UK.get(a);
    } else {
      e = cpp_1.FKuroGameBudgetAllocatorInterface.RegisterFunction(e, t, r, a.ScheduledTick, o ? a.ScheduledAfterTick : undefined, i ? a.OnEnabledChange : undefined, s ? a.OnWasRecentlyRenderedOnScreenChange : undefined, n ? a.LocationProxyFunction : undefined, a);
      this.UK.set(a, e);
      return e;
    }
  }
  static UnregisterTick(e) {
    var t = this.UK.get(e);
    if (t) {
      this.UK.delete(e);
      cpp_1.FKuroGameBudgetAllocatorInterface.UnregisterFunction(t);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Game", 24, "Not found error!");
    }
  }
  static UpdateRegisterActor(e, t, a) {
    cpp_1.FKuroGameBudgetAllocatorInterface.UpdateActor(e, t, a);
  }
  static ComputeDistanceScore(e, t, a, r) {
    var e = new UE.Vector(e[0], e[1], e[2]);
    var t = new UE.Vector(t[0], t[1], t[2]);
    if (!GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsCharacterDtailConfig) {
      GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.CreateCharacterEntityConfigOnly();
    }
    var o = GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsCharacterDtailConfig;
    var r = r ? o.Normal_Render : o.Normal_NotRendered;
    return cpp_1.FKuroGameBudgetAllocatorInterface.ComputeDistanceScore(e, t, r.TickReductionStartSize * 0.01, r.TickReductionIntervalSize * 0.01, r.MaxInterval, a);
  }
  static RegisterOnceTaskDefaultGroup(e, t, a) {
    cpp_1.FKuroGameBudgetAllocatorInterface.RegisterOnceTaskDefaultGroup(e, t, a);
  }
  static ProduceOnceTaskOnDefaultGroup(e, t, a) {
    cpp_1.FKuroGameBudgetAllocatorInterface.ProduceOnceTask(e, t, a);
  }
  static RegisterOnceTaskCustomGroup(e) {
    cpp_1.FKuroGameBudgetAllocatorInterface.RegisterOnceTaskCustomGroup(e.GroupId, e.Priority, e.IsEmpty, e.Consume, e);
  }
  static SetCenterActorLocationOffset(e) {
    cpp_1.FKuroGameBudgetAllocatorInterface.SetCenterActorLocationOffset(e);
  }
  static SetCenterRole(e) {
    if (e && this.EK !== e) {
      cpp_1.FKuroGameBudgetAllocatorInterface.SetCenterActor(e);
      this.EK = e;
      this.SetCenterActorLocationOffset(Vector_1.Vector.ZeroVectorDouble);
    }
  }
  static SetUseBoundsCalculateDistance(e, t, a) {
    cpp_1.FKuroGameBudgetAllocatorInterface.SetUseBoundsCalculateDistance(e, t, a);
  }
  static SetUsePerformanceActorCalculateBounds(e, t, a) {
    cpp_1.FKuroGameBudgetAllocatorInterface.SetUsePerformanceActorCalculateBounds(e, t, a);
  }
  static SetPerformanceLimitMode(e) {
    this.AK = e;
    this.PK();
  }
  static SetPlotMode(e) {
    this.IsInPlot = e;
    this.PK();
  }
  static TryUpdateCenterRoleOffset(e) {
    e = e.GetComponent(287)?.GetCenterActorLocationOffset();
    if (e) {
      this.SetCenterActorLocationOffset(e);
    }
  }
  static PK() {
    var e = this.IsInPlot ? 2 : this.IsInFight && !this.AK ? 1 : 0;
    this.wPa = e;
    cpp_1.FKuroGameBudgetAllocatorInterface.SetGlobalMode(e);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Game", 36, "[GameBudget]RefreshGlobalMode", ["IsInPlot", this.IsInPlot], ["IsInFight", this.IsInFight], ["IsPerformanceLimitMode", this.AK]);
    }
  }
  static BK(e) {
    if (this.TK !== e) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Game", 36, "[GameBudget]时间预算管理模式更改", ["NewModel", e], ["OldModel", this.TK]);
      }
      if (PerfSight_1.PerfSight.IsEnable) {
        if (this.TK === 0) {
          cpp_1.FKuroPerfSightHelper.EndExtTag("EGameBudgetMode.None");
        } else if (this.TK === 1) {
          cpp_1.FKuroPerfSightHelper.EndExtTag("EGameBudgetMode.Normal");
        } else if (this.TK === 2) {
          cpp_1.FKuroPerfSightHelper.EndExtTag("EGameBudgetMode.Plot");
        }
        if (e === 0) {
          cpp_1.FKuroPerfSightHelper.BeginExtTag("EGameBudgetMode.None");
        } else if (e === 1) {
          cpp_1.FKuroPerfSightHelper.BeginExtTag("EGameBudgetMode.Normal");
        } else if (e === 2) {
          cpp_1.FKuroPerfSightHelper.BeginExtTag("EGameBudgetMode.Plot");
        }
      }
      this.bK(this.TK);
      this.TK = e;
      this.qK(e);
    }
  }
  static qK(e) {
    if (e === 1) {
      this.SetCenterRole(Global_1.Global.BaseCharacter);
    } else if (e === 2 && (this.SetCenterRole(Global_1.Global.BaseCharacter), e = ModelManager_1.ModelManager.CameraModel?.SequenceCamera?.DisplayComponent?.CineCamera)) {
      this.LK = e;
      cpp_1.FKuroGameBudgetAllocatorInterface.AddAssistantActor(e);
    }
  }
  static bK(e) {
    if (e === 2 && this.LK) {
      cpp_1.FKuroGameBudgetAllocatorInterface.RemoveAssistantActor(this.LK);
      this.LK = undefined;
    }
  }
}
exports.GameBudgetInterfaceController = GameBudgetInterfaceController;
(_a = GameBudgetInterfaceController).IsOpen = true;
GameBudgetInterfaceController.UK = new Map();
GameBudgetInterfaceController.TsGlobalFifoTaskGroupName = new UE.FName("TsGlobalFifoTaskGroup");
GameBudgetInterfaceController.TsGlobalFifoTaskSignificanceGroup = 2;
GameBudgetInterfaceController.EK = undefined;
GameBudgetInterfaceController.DK = undefined;
GameBudgetInterfaceController.IsInPlot = false;
GameBudgetInterfaceController.IsInFight = false;
GameBudgetInterfaceController.AK = false;
GameBudgetInterfaceController.wPa = 0;
GameBudgetInterfaceController.RK = new GameBudgetTimeEstimationFramesOffset_1.GameBudgetTimeEstimationFramesOffset();
GameBudgetInterfaceController.yK = e => {
  _a.IsInFight = e;
  if (_a.IsInFight && _a.IsInPlot && (_a.IsInPlot = false, Log_1.Log.CheckError())) {
    Log_1.Log.Error("Game", 36, "[GameBudget]进入战斗时时间预算管理仍然处于剧情模式");
  }
  _a.PK();
};
GameBudgetInterfaceController.SK = (e, t) => {
  _a.SetCenterRole(Global_1.Global.BaseCharacter);
  e = e.Entity;
  if (e) {
    _a.TryUpdateCenterRoleOffset(e);
  }
};
GameBudgetInterfaceController.TK = 0;
GameBudgetInterfaceController.LK = undefined;
GameBudgetInterfaceController.IK = (e, t) => {
  if (e === 1 && ModelManager_1.ModelManager.PlotModel?.IsInPlot) {
    _a.BK(2);
  } else {
    _a.BK(1);
  }
}; //# sourceMappingURL=GameBudgetInterfaceController.js.map