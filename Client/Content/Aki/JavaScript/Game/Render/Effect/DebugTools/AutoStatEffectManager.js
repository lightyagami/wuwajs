"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoStatEffectDataMgr = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const Stats_1 = require("../../../../Core/Common/Stats");
const PerformanceController_1 = require("../../../../Core/Performance/PerformanceController");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TickSystem_1 = require("../../../../Core/Tick/TickSystem");
const Platform_1 = require("../../../../Launcher/Platform/Platform");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ConfirmBoxDefine_1 = require("../../../Module/ConfirmBox/ConfirmBoxDefine");
const EffectGlobal_1 = require("../EffectGlobal");
const EFFECT_PATHS_DA_PATH = "/Game/Aki/Render/RuntimeBP/Effect/Debug/DA_EffectPaths.DA_EffectPaths";
class EffectStatData {
  constructor(t, e) {
    this.MaxUpdateTime = -0;
    this.AvgUpdateTime = -0;
    this.LoopTime = -0;
    this.UpdateTimeArray = Array();
    this.Path = t;
    this.SpawnTime = e;
  }
  ToCsv() {
    var t = new Array();
    t.push(this.Path);
    t.push(this.SpawnTime.toFixed());
    t.push(this.AvgUpdateTime.toFixed());
    t.push(this.MaxUpdateTime.toFixed());
    t.push(this.LoopTime.toFixed());
    return t.join(",");
  }
  OnStop(t) {
    this.LoopTime = t;
    this.MaxUpdateTime = 0;
    if ((this.AvgUpdateTime = 0) < this.UpdateTimeArray.length) {
      let e = 0;
      for (let t = 0; t < this.UpdateTimeArray.length; t++) {
        e += this.UpdateTimeArray[t];
        if (this.MaxUpdateTime < this.UpdateTimeArray[t]) {
          this.MaxUpdateTime = this.UpdateTimeArray[t];
        }
      }
      this.AvgUpdateTime = e / this.UpdateTimeArray.length;
    }
  }
}
EffectStatData.CsvHeader = "Path,SpawnCost(us),AvgUpdateCost(us),MaxUpdateCost(us),LoopTime(ms)\n";
class AutoStatEffectDataMgr {
  constructor() {
    this.BasePaths = undefined;
    this.rvi = 0;
    this.e1r = -0;
    this.ac = 0;
    this.t1r = undefined;
    this.i1r = -0;
    this.o1r = undefined;
    this.r1r = false;
    this.r6 = t => {
      this.Usi(t);
    };
    this.TickId = TickSystem_1.TickSystem.InvalidId;
  }
  static Get() {
    if (!this.Instance) {
      this.Instance = new AutoStatEffectDataMgr();
      this.Dpe = Stats_1.Stat.Create("AutoStatEffectDataMgr:SpawnEffect");
      this.n1r = Stats_1.Stat.Create("AutoStatEffectDataMgr:UpdateEffect");
    }
    return this.Instance;
  }
  static GetMicrosecond() {
    if (Platform_1.Platform.IsWindowsPlatform()) {
      return cpp_1.KuroTime.GetCycles64() * 0.1;
    } else {
      return cpp_1.KuroTime.GetCycles64();
    }
  }
  av() {
    if (this.TickId !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Remove(this.TickId);
      this.TickId = TickSystem_1.TickSystem.InvalidId;
    }
    if (EffectSystem_1.EffectSystem.IsValid(this.rvi)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.rvi, "[AutoStatEffectDataMgr.Reset]", false);
      this.rvi = 0;
    }
    this.t1r = new Array();
    this.e1r = 0;
    this.ac = 1;
    this.i1r = 0;
    this.r1r = false;
    this.o1r = undefined;
    EffectGlobal_1.EffectGlobal.AllowEffectInPool = false;
    EffectGlobal_1.EffectGlobal.AllowEffectOutPool = false;
  }
  Play(i = 0, r = -1) {
    if (Info_1.Info.IsBuildDevelopmentOrDebug) {
      this.av();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("RenderEffect", 40, "加载特效路径");
      }
      ResourceSystem_1.ResourceSystem.LoadAsync(EFFECT_PATHS_DA_PATH, UE.PDA_EffectPaths_C, t => {
        var e = t.BasePaths;
        let s = 0;
        if (i > 0 && i < e.Num() - 1) {
          s = i;
        }
        let a = e.Num() - 1;
        if (r !== -1 && r < e.Num()) {
          a = r;
        }
        this.BasePaths = new Array();
        for (let t = s; t <= a; t++) {
          this.BasePaths.push(e.Get(t));
        }
        this.TickId = TickSystem_1.TickSystem.Add(this.r6, "PlayEffectOneByOne").Id;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("RenderEffect", 40, "加载特效路径完成", ["特效数量", this.BasePaths.length], ["开始索引", s], ["结束索引", a], ["最大播放时长(ms)", AutoStatEffectDataMgr.s1r], ["播放间歇时长(ms)", AutoStatEffectDataMgr.a1r]);
        }
      });
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RenderEffect", 40, "shipping 包或test 包");
    }
  }
  PlayWithTrace() {
    if (Info_1.Info.IsBuildDevelopmentOrDebug) {
      this.av();
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "Stat NamedEvents");
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "Trace.Start");
      this.r1r = true;
      this.BasePaths = [];
      this.TickId = TickSystem_1.TickSystem.Add(this.r6, "PlayEffectOneByOne").Id;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("RenderEffect", 40, "", ["特效数量", this.BasePaths.length], ["最大播放时长(ms)", AutoStatEffectDataMgr.s1r], ["播放间歇时长(ms)", AutoStatEffectDataMgr.a1r]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RenderEffect", 40, "shipping 包或test 包");
    }
  }
  Usi(t) {
    this.e1r += t;
    switch (this.ac) {
      case 0:
        if (!EffectSystem_1.EffectSystem.IsValid(this.rvi) || this.e1r >= AutoStatEffectDataMgr.s1r) {
          this.h1r();
          this.yri(1);
        } else {
          this.l1r(t);
        }
        break;
      case 1:
        if (this.e1r >= AutoStatEffectDataMgr.a1r) {
          this._1r();
          this.yri(0);
          this.l1r(t);
        }
    }
  }
  yri(t) {
    this.ac = t;
    this.e1r = 0;
  }
  l1r(t) {
    var e;
    if (EffectSystem_1.EffectSystem.IsValid(this.rvi)) {
      AutoStatEffectDataMgr.n1r.Start();
      e = PerformanceController_1.PerformanceController.ConsumeTickTime("NiagaraDebugTick");
      AutoStatEffectDataMgr.n1r.Stop();
      this.t1r[this.t1r.length - 1].UpdateTimeArray.push(e * 1000);
    }
  }
  h1r() {
    if (EffectSystem_1.EffectSystem.IsValid(this.rvi)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.rvi, "[AutoStatEffectDataMgr.StopCurrent]", true);
      this.rvi = 0;
    }
    this.t1r[this.t1r.length - 1].OnStop(this.e1r);
  }
  _1r() {
    if (this.BasePaths.length === 0) {
      if (this.TickId !== TickSystem_1.TickSystem.InvalidId) {
        TickSystem_1.TickSystem.Remove(this.TickId);
        this.TickId = TickSystem_1.TickSystem.InvalidId;
      }
      var t = new Array();
      for (const a of this.t1r.values()) {
        t.push(a.ToCsv());
      }
      var e = `${UE.KismetSystemLibrary.GetProjectSavedDirectory()}Profiling/${Date.now()}_EffectStats.csv`;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("RenderEffect", 40, "", ["保存统计信息", e]);
      }
      var e = UE.KuroStaticLibrary.SaveStringToFile(EffectStatData.CsvHeader + t.join("\n"), e);
      this.t1r.length = 0;
      if (this.r1r) {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "Trace.Stop");
      }
      var e = `[保存特效统计信息:${e}]`;
      var s = new ConfirmBoxDefine_1.ConfirmBoxDataNew(33);
      s.SetTextArgs(e);
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(s);
    } else {
      e = Global_1.Global.BaseCharacter;
      if (e) {
        this.i1r++;
        if (!this.o1r || this.i1r > AutoStatEffectDataMgr.u1r) {
          this.o1r = this.BasePaths.pop();
          this.i1r = 1;
        }
        AutoStatEffectDataMgr.Dpe.Start();
        s = AutoStatEffectDataMgr.GetMicrosecond();
        this.rvi = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, e.D_GetTransform(), this.o1r, "[AutoStatEffectDataMgr.PlayNext]", undefined, 3, t => {
          EffectSystem_1.EffectSystem.DebugUpdate(t, true);
        });
        if (EffectSystem_1.EffectSystem.IsValid(this.rvi)) {
          e = AutoStatEffectDataMgr.GetMicrosecond();
          AutoStatEffectDataMgr.Dpe.Stop();
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("RenderEffect", 40, "", ["测试特效", this.o1r]);
          }
          this.t1r.push(new EffectStatData(this.o1r, e - s));
        } else if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("RenderEffect", 40, "", ["播放特效失败", this.o1r]);
        }
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("RenderEffect", 40, "未找到主角位置");
      }
    }
  }
}
(exports.AutoStatEffectDataMgr = AutoStatEffectDataMgr).u1r = 1;
AutoStatEffectDataMgr.s1r = 5000;
AutoStatEffectDataMgr.a1r = 1000; //# sourceMappingURL=AutoStatEffectManager.js.map