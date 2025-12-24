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
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBattleStateChanged, this.yK);
    this.TK = 0;
    if (PerfSight_1.PerfSight.IsEnable) {
      cpp_1.FKuroPerfSightHelper.BeginExtTag("EGameBudgetMode.None");
    }
    return super.OnInit();
  }
  static OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBattleStateChanged, this.yK);
    this.LK = undefined;
    if (PerfSight_1.PerfSight.IsEnable) {
      if (this.TK === 0) {
        cpp_1.FKuroPerfSightHelper.EndExtTag("EGameBudgetMode.None");
      } else if (this.TK === 1) {
        cpp_1.FKuroPerfSightHelper.EndExtTag("EGameBudgetMode.Normal");
      } else if (this.TK === 2) {
        cpp_1.FKuroPerfSightHelper.EndExtTag("EGameBudgetMode.Plot");
      } else if (this.TK === 3) {
        cpp_1.FKuroPerfSightHelper.EndExtTag("EGameBudgetMode.StreamingSource");
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
  static get MinUpdateFifoBudgetTime() {
    return this.DK;
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
  static RegisterTick(e, t, r, a, o = true, i = true, s = true, n = true) {
    if (this.UK.has(r)) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Game", 24, "Object has already added!");
      }
      return this.UK.get(r);
    } else {
      e = cpp_1.FKuroGameBudgetAllocatorInterface.RegisterFunction(e, t, a, r.ScheduledTick, o ? r.ScheduledAfterTick : undefined, i ? r.OnEnabledChange : undefined, s ? r.OnWasRecentlyRenderedOnScreenChange : undefined, n ? r.LocationProxyFunction : undefined, r);
      this.UK.set(r, e);
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
  static UpdateRegisterActor(e, t, r) {
    cpp_1.FKuroGameBudgetAllocatorInterface.UpdateActor(e, t, r);
  }
  static ComputeDistanceScore(e, t, r, a) {
    var e = new UE.Vector(e[0], e[1], e[2]);
    var t = new UE.Vector(t[0], t[1], t[2]);
    if (!GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsCharacterDtailConfig) {
      GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.CreateCharacterEntityConfigOnly();
    }
    var o = GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsCharacterDtailConfig;
    var a = a ? o.Normal_Render : o.Normal_NotRendered;
    return cpp_1.FKuroGameBudgetAllocatorInterface.ComputeDistanceScore(e, t, a.TickReductionStartSize * 0.01, a.TickReductionIntervalSize * 0.01, a.MaxInterval, r);
  }
  static RegisterOnceTaskDefaultGroup(e, t, r) {
    cpp_1.FKuroGameBudgetAllocatorInterface.RegisterOnceTaskDefaultGroup(e, t, r);
  }
  static ProduceOnceTaskOnDefaultGroup(e, t, r) {
    cpp_1.FKuroGameBudgetAllocatorInterface.ProduceOnceTask(e, t, r);
  }
  static RegisterOnceTaskCustomGroup(e) {
    cpp_1.FKuroGameBudgetAllocatorInterface.RegisterOnceTaskCustomGroup(e.GroupId, e.Priority, e.IsEmpty, e.Consume, e);
  }
  static GetCenterOffset() {
    return this.YVo;
  }
  static SetCenterActorLocationOffset(e) {
    this.YVo = Vector_1.Vector.Create(e);
    cpp_1.FKuroGameBudgetAllocatorInterface.SetCenterActorLocationOffset(e);
  }
  static SetCenterRole(e) {
    if (e && this.EK !== e) {
      cpp_1.FKuroGameBudgetAllocatorInterface.SetCenterActor(e);
      this.EK = e;
      this.SetCenterActorLocationOffset(Vector_1.Vector.ZeroVectorDouble);
    }
  }
  static SetUseBoundsCalculateDistance(e, t, r) {
    cpp_1.FKuroGameBudgetAllocatorInterface.SetUseBoundsCalculateDistance(e, t, r);
  }
  static SetUsePerformanceActorCalculateBounds(e, t, r) {
    cpp_1.FKuroGameBudgetAllocatorInterface.SetUsePerformanceActorCalculateBounds(e, t, r);
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
    e = e.GetComponent(306)?.GetCenterActorLocationOffset();
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
  static OnChangeCenterRole(e, t) {
    if (e) {
      this.SetCenterRole(e);
    }
    if (t) {
      this.SetCenterActorLocationOffset(t);
    }
  }
  static get BudgetMode() {
    return this.TK;
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
        } else if (this.TK === 3) {
          cpp_1.FKuroPerfSightHelper.EndExtTag("EGameBudgetMode.StreamingSource");
        }
        if (e === 0) {
          cpp_1.FKuroPerfSightHelper.BeginExtTag("EGameBudgetMode.None");
        } else if (e === 1) {
          cpp_1.FKuroPerfSightHelper.BeginExtTag("EGameBudgetMode.Normal");
        } else if (e === 2) {
          cpp_1.FKuroPerfSightHelper.BeginExtTag("EGameBudgetMode.Plot");
        } else if (this.TK === 3) {
          cpp_1.FKuroPerfSightHelper.BeginExtTag("EGameBudgetMode.StreamingSource");
        }
      }
      this.bK(this.TK);
      this.TK = e;
      this.qK(e);
    }
  }
  static qK(e) {
    var t;
    if (e === 1) {
      this.SetCenterRole(Global_1.Global.BaseCharacter);
    } else if (e === 2) {
      this.SetCenterRole(Global_1.Global.BaseCharacter);
      if (t = ModelManager_1.ModelManager.CameraModel?.SequenceCamera?.DisplayComponent?.CineCamera) {
        this.LK = t;
        cpp_1.FKuroGameBudgetAllocatorInterface.AddAssistantActor(t);
      }
    } else if (e === 3) {
      this.SetCenterRole(ModelManager_1.ModelManager.GameModeModel?.StreamingSource);
    }
  }
  static bK(e) {
    if (e === 2 && this.LK) {
      cpp_1.FKuroGameBudgetAllocatorInterface.RemoveAssistantActor(this.LK);
      this.LK = undefined;
    }
  }
  static OnBudgetModelChange(e) {
    this.BK(e);
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
GameBudgetInterfaceController.YVo = undefined;
GameBudgetInterfaceController.yK = e => {
  _a.IsInFight = e;
  if (_a.IsInFight && _a.IsInPlot && (_a.IsInPlot = false, Log_1.Log.CheckError())) {
    Log_1.Log.Error("Game", 36, "[GameBudget]进入战斗时时间预算管理仍然处于剧情模式");
  }
  _a.PK();
};
GameBudgetInterfaceController.TK = 0;
GameBudgetInterfaceController.LK = undefined; //# sourceMappingURL=GameBudgetInterfaceController.js.map