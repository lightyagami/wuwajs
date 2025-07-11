"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Core = undefined;
const cpp_1 = require("cpp");
const Stats_1 = require("../Core/Common/Stats");
const ActorSystem_1 = require("./Actor/ActorSystem");
const Application_1 = require("./Application/Application");
const Info_1 = require("./Common/Info");
const Log_1 = require("./Common/Log");
const Logo_1 = require("./Common/Logo");
const Time_1 = require("./Common/Time");
const ProxyLru_1 = require("./Container/ProxyLru");
const ConfigStatement_1 = require("./Define/ConfigQuery/ConfigStatement");
const EffectEnvironment_1 = require("./Effect/EffectEnvironment");
const EntityComponentSystem_1 = require("./Entity/EntityComponentSystem");
const EntitySystem_1 = require("./Entity/EntitySystem");
const GameBudgetInterfaceController_1 = require("./GameBudgetAllocator/GameBudgetInterfaceController");
const Net_1 = require("./Net/Net");
const ObjectSystem_1 = require("./Object/ObjectSystem");
const CycleCounter_1 = require("./Performance/CycleCounter");
const PerfSight_1 = require("./PerfSight/PerfSight");
const TickSystem_1 = require("./Tick/TickSystem");
const TimerSystem_1 = require("./Timer/TimerSystem");
class Core {
  constructor() {}
  static *Initialize(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Core", 1, Logo_1.LOGO);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Core", 1, Info_1.Info.Version);
    }
    Log_1.Log.SetLevel(Info_1.Info.IsBuildShipping || Info_1.Info.IsBuildTest ? 2 : 3);
    Stats_1.Stat.EnableCreateWithStack = Info_1.Info.IsBuildDevelopmentOrDebug;
    GameBudgetInterfaceController_1.GameBudgetInterfaceController.InitializeEnvironment(e.GetWorld());
    cpp_1.FKuroCycleCounter.InitializeEnvironment();
    PerfSight_1.PerfSight.Initialize();
    Time_1.Time.Initialize();
    Net_1.Net.Initialize();
    TickSystem_1.TickSystem.Add(this.TickPriority2, "CorePriority2", 0, true, 2);
    TickSystem_1.TickSystem.Add(this.TickPriority1, "CorePriority1", 0, true, 1);
    TickSystem_1.TickSystem.Add(this.Tick, "Core", 0, true);
    TickSystem_1.TickSystem.Add(this.AfterTick, "Core", 4, true);
    yield this.c2a();
    ConfigStatement_1.ConfigStatement.Init();
    yield this.c2a();
    ObjectSystem_1.ObjectSystem.Initialize();
    EntitySystem_1.EntitySystem.Initialize();
    EntityComponentSystem_1.EntityComponentSystem.Initialize();
    Application_1.Application.Initialize();
    ActorSystem_1.ActorSystem.Initialize();
    EffectEnvironment_1.EffectEnvironment.Initialize();
    ProxyLru_1.ProxyLru.ProxyLruEnable = Info_1.Info.IsPlayInEditor;
  }
  static RegisterPreTick(e) {
    if (this.Y7.has(e)) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Core", 7, "[Core.RegisterPreTickFunctions] 已经注册过PreTickfunc");
      }
    } else {
      this.Y7.add(e);
    }
  }
  static UnRegisterPreTick(e) {
    if (this.Y7.has(e)) {
      this.Y7.delete(e);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Core", 7, "[Core.UnRegisterPreTick] 未注册的PreTickfunc");
    }
  }
  static async c2a() {
    return new Promise(e => {
      TimerSystem_1.TimerSystem.Next(() => {
        e();
      });
    });
  }
}
exports.Core = Core;
(_a = Core).Y7 = new Set();
Core.QQs = 0;
Core.cq1 = 2;
Core.ForbiddenTickPriority = false;
Core.TickPriority2 = e => {
  if (!_a.ForbiddenTickPriority) {
    _a.cq1 = 1;
    Time_1.Time.Tick(e);
  }
};
Core.TickPriority1 = e => {
  if (_a.cq1 === 1) {
    _a.cq1 = 0;
  } else {
    _a.ForbiddenTickPriority = true;
  }
};
Core.Tick = e => {
  if (_a.cq1 !== 0) {
    Time_1.Time.Tick(e);
    _a.ForbiddenTickPriority = true;
  }
  _a.cq1 = -1;
  CycleCounter_1.CycleCounter.RefreshState();
  var t = e / 1000;
  Net_1.Net.Tick(t);
  if (!TickSystem_1.TickSystem.IsPaused) {
    for (const o of _a.Y7) {
      o(e);
    }
  }
  TimerSystem_1.TimerSystem.Tick(e);
  TimerSystem_1.FlowTimeTimerSystem.Tick(e * Time_1.Time.TimeDilation * Time_1.Time.FlowTimeDilation);
  TimerSystem_1.GameplayTimerSystem.Tick(e * Time_1.Time.InverseSelfCenteredTimeDilation);
  var r = Time_1.Time.ServerTimeStamp;
  var i = r - _a.QQs;
  _a.QQs = r;
  TimerSystem_1.RealTimeTimerSystem.Tick(i);
  if (!TickSystem_1.TickSystem.IsPaused) {
    EffectEnvironment_1.EffectEnvironment.Tick(e, Info_1.Info.World);
    if (Info_1.Info.EnableForceTick) {
      EntitySystem_1.EntitySystem.ForceTick(e);
    }
    GameBudgetInterfaceController_1.GameBudgetInterfaceController.UpdateBudgetTime(e);
  }
  cpp_1.FKuroGameBudgetAllocatorInterface.TickOutside(t);
  if (!TickSystem_1.TickSystem.IsPaused) {
    EntitySystem_1.EntitySystem.Tick(e);
  }
};
Core.AfterTick = e => {
  _a.cq1 = 2;
  _a.ForbiddenTickPriority = false;
  if (!TickSystem_1.TickSystem.IsPaused) {
    if (Info_1.Info.EnableForceTick) {
      EntitySystem_1.EntitySystem.ForceAfterTick(e);
    }
  }
  cpp_1.FKuroGameBudgetAllocatorInterface.AfterTickOutside(e / 1000);
  if (!TickSystem_1.TickSystem.IsPaused) {
    EntitySystem_1.EntitySystem.AfterTick(e);
  }
}; //# sourceMappingURL=Core.js.map