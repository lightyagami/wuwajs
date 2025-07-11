"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Entity = exports.TickComponentManager = exports.DISABLE_REASON_LENGTH_LIMIT = undefined;
const Info_1 = require("../Common/Info");
const Log_1 = require("../Common/Log");
const Stats_1 = require("../Common/Stats");
const Time_1 = require("../Common/Time");
const CommonDefine_1 = require("../Define/CommonDefine");
const GameBudgetAllocatorConfig_1 = require("../GameBudgetAllocator/GameBudgetAllocatorConfig");
const GameBudgetInterfaceController_1 = require("../GameBudgetAllocator/GameBudgetInterfaceController");
const JsModelManager_1 = require("../Model/JsModelManager");
const ObjectBase_1 = require("../Object/ObjectBase");
const PerformanceDecorators_1 = require("../Performance/PerformanceDecorators");
const FNameUtil_1 = require("../Utils/FNameUtil");
const MathUtils_1 = require("../Utils/MathUtils");
const EntityComponent_1 = require("./EntityComponent");
const EntityComponentSystem_1 = require("./EntityComponentSystem");
const EntityHelper_1 = require("./EntityHelper");
const EntitySystem_1 = require("./EntitySystem");
exports.DISABLE_REASON_LENGTH_LIMIT = 4;
class TickComponentInfo {
  constructor(t, i, s) {
    this.Component = t;
    this.Index = i;
    this.Priority = s;
  }
}
class TickComponentManager {
  constructor() {
    this.Z7 = 0;
    this.eW = 0;
    this.tW = 0;
    this.iW = 0;
    this.oW = false;
    this.rW = false;
    this.nW = new Array();
    this.sW = new Array();
    this.aW = new Array();
    this.hW = new Array();
    this.lW = 0;
  }
  GetCurrentTickIntervalCount() {
    return this.eW;
  }
  get NeedTick() {
    return this.oW;
  }
  get NeedAfterTick() {
    return this.rW;
  }
  Clear() {
    this.Z7 = 0;
    this.eW = 0;
    this.tW = 0;
    this.iW = 0;
  }
  ClearDelta() {
    this.Z7 = 0;
  }
  Add(t, i) {
    if (t.NeedTick || t.NeedForceTick || t.NeedAfterTick || t.NeedForceAfterTick) {
      i = new TickComponentInfo(t, this.lW, i || 0);
      if (t.NeedTick || t.NeedForceTick) {
        this.nW.push(i);
      }
      if (t.NeedForceTick) {
        this.sW.push(i);
      }
      if (t.NeedAfterTick || t.NeedForceAfterTick) {
        this.aW.push(i);
      }
      if (t.NeedForceAfterTick) {
        this.hW.push(i);
      }
      this.lW++;
    }
  }
  Sort() {
    this.oW = this.nW.length > 0 || this.sW.length > 0;
    this.rW = this.aW.length > 0 || this.hW.length > 0;
    this.nW.sort(TickComponentManager.E7);
    this.sW.sort(TickComponentManager.E7);
    this.aW.sort(TickComponentManager.E7);
    this.hW.sort(TickComponentManager.E7);
  }
  ForceTick(t) {
    for (const i of this.sW) {
      i.Component.ForceTick(t);
    }
  }
  Tick(t, i) {
    this.Z7 += i;
    this.eW++;
    if (GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen || !(this.eW < t)) {
      for (const s of this.nW) {
        if (s.Component.NeedTick) {
          s.Component.Tick(this.Z7);
        }
      }
      this.Z7 = 0;
      this.eW = 0;
    }
  }
  ForceAfterTick(t) {
    for (const i of this.hW) {
      i.Component.ForceAfterTick(t);
    }
  }
  AfterTick(t, i) {
    this.tW += i;
    this.iW++;
    if (GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen || !(this.iW < t)) {
      for (const s of this.aW) {
        if (s.Component.NeedAfterTick) {
          s.Component.AfterTick(this.tW);
        }
      }
      this.tW = 0;
      this.iW = 0;
    }
  }
}
(exports.TickComponentManager = TickComponentManager).E7 = (t, i) => t.Priority === i.Priority ? t.Index - i.Index : i.Priority - t.Priority;
class Entity extends ObjectBase_1.ObjectBase {
  constructor(t, i) {
    super(t, i);
    this.UsePool = false;
    this.m6 = undefined;
    this._W = undefined;
    this.InitStatTdType = undefined;
    this.uW = undefined;
    this.ClearStatTdType = undefined;
    this.cW = undefined;
    this.StartStatTdType = undefined;
    this.mW = undefined;
    this.EndStatTdType = undefined;
    this.dW = undefined;
    this.ir_ = undefined;
    this.ActivateStatTdType = undefined;
    this.gW = undefined;
    this.TickStatTdType = undefined;
    this.fW = undefined;
    this.AfterTickStatTdType = undefined;
    this.pW = 0;
    this.Components = new Array();
    this.OnWasRecentlyRenderComponents = undefined;
    this.OnBudgetTickEnableChangeComponents = undefined;
    this.TickComponentManager = new TickComponentManager();
    this.vW = 0;
    this.mDa = 0;
    this.MW = 0;
    this.LastTickFrame = 0;
    this.EW = false;
    this.SW = 1;
    this.yW = undefined;
    this.IW = undefined;
    this.TW = -1;
    this.LW = new Array();
    this.$4a = new Map();
    this.X4a = new Map();
    this.Ctl = undefined;
    this.EntityData = undefined;
    this.LocationProxyFunction = undefined;
  }
  get IsEncloseSpace() {
    return this.EW;
  }
  set IsEncloseSpace(t) {
    this.EW = t;
  }
  static StaticGameBudgetConfig(t) {
    this.StaticGameBudgetConfigInternal ||= new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfig(FNameUtil_1.FNameUtil.GetDynamicFName("NormalEntity"), 1);
    return this.StaticGameBudgetConfigInternal;
  }
  get GameBudgetManagedToken() {
    return this.yW;
  }
  get Flag() {
    return this.pW;
  }
  get GameBudgetConfig() {
    return this.IW;
  }
  get DistanceWithCamera() {
    return this.TW;
  }
  RW() {
    var t = this.constructor.name;
    let i = Entity.UW.get(t);
    if (!i) {
      i = [Stats_1.Stat.CreateNoFlameGraph(t + ".Create"), Stats_1.Stat.CreateNoFlameGraph(t + ".Init"), Stats_1.Stat.CreateNoFlameGraph(t + ".Clear"), Stats_1.Stat.CreateNoFlameGraph(t + ".Start"), Stats_1.Stat.CreateNoFlameGraph(t + ".End"), Stats_1.Stat.CreateNoFlameGraph(t + ".Activate"), Stats_1.Stat.CreateNoFlameGraph(t + ".PostActivate"), Stats_1.Stat.CreateNoFlameGraph(t + ".Tick"), Stats_1.Stat.CreateNoFlameGraph(t + ".AfterTick")];
      Entity.UW.set(t, i);
    }
    return i;
  }
  get Active() {
    return this.$4a.size === 0 && this.X4a.size === 0;
  }
  get TimeDilation() {
    return this.SW;
  }
  get IsCreate() {
    return !!(this.pW & 1);
  }
  get IsStart() {
    return !!(this.pW & 4);
  }
  get IsInit() {
    return !!(this.pW & 8);
  }
  get IsEnd() {
    return !!(this.pW & 32);
  }
  get IsClear() {
    return !!(this.pW & 64);
  }
  ResetFlag() {
    this.pW = 0;
  }
  GetComponent(t) {
    return this.LW[t];
  }
  CheckGetComponent(t) {
    var i = this.GetComponent(t);
    if (!i) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 1, "获取组件失败", ["Id", this.Id], ["entity", this.constructor.name], ["component", t]);
      }
    }
    return i;
  }
  AddComponent(t, i, s) {
    if (this.pW & 1) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 1, "实体已创建完成不能再添加组件", ["Id", this.Id], ["entity", this.constructor.name], ["component", t.name]);
      }
    } else {
      var e = t.Id;
      if (e < 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 3, "组件没有加上RegisterComponent装饰器", ["entity", this.constructor.name], ["component", t.name]);
        }
      } else {
        var n = t.Dependencies;
        if (n) {
          for (const y of n) {
            if (!this.LW[y]) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 1, "添加组件检查依赖失败", ["Id", this.Id], ["entity", this.constructor.name], ["component", t.name], ["dependence", y]);
              }
              return;
            }
          }
        }
        var n = EntitySystem_1.EntitySystem.Get(this.Id);
        var h = EntityComponentSystem_1.EntityComponentSystem.Create(t, n, s);
        if (h) {
          if (i === undefined || h.NeedTick || h.ForceTick) {
            let t = h?.__proto__;
            while (t?.constructor && t instanceof EntityComponent_1.EntityComponent && t.constructor !== EntityComponent_1.EntityComponent) {
              var r = t.constructor;
              var o = r.Id;
              if (o < 0) {
                if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("Entity", 3, "组件没有加上RegisterComponent装饰器", ["id", e], ["entity", this.constructor.name], ["component", r.name]);
                }
                return;
              }
              var a = this.LW[o];
              if (a) {
                if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("Entity", 1, "添加组件失败：组件已存在，请勿重复添加！", ["entity", this.constructor.name], ["Id", this.Id], ["AddComponent", r.name], ["ExistComponent", a.constructor.name]);
                }
                return;
              }
              while (this.LW.length <= o) {
                this.LW.push(undefined);
              }
              this.LW[o] = h;
              t = t?.__proto__;
            }
            this.Components.push(h);
            this.TickComponentManager.Add(h, i);
            return h;
          }
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Entity", 1, "组件不需要更新不需要设置更新优先级", ["Id", this.Id], ["entity", this.constructor.name], ["component", t.name]);
          }
        }
      }
    }
  }
  SetTimeDilation(t) {
    this.SW = t;
    for (const i of this.Components) {
      i.SetTimeDilation(t);
    }
  }
  ChangeTickInterval(t) {
    this.MW = t;
  }
  GetTickInterval() {
    return this.MW;
  }
  GetDeltaSeconds() {
    return this.mDa;
  }
  RegisterToGameBudgetController(i, s) {
    if (GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen) {
      if (this.IW) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 24, "Entity注册到时间预算管理器中失败，Token已经存在", ["entity", this.constructor.name], ["GameBudgetManagedToken", this.yW]);
        }
      } else {
        this.IW = this.constructor.StaticGameBudgetConfig(s || this);
        let t = false;
        for (const e of this.Components) {
          if (e.OnEntityWasRecentlyRenderedOnScreenChange) {
            this.OnWasRecentlyRenderComponents ||= new Array();
            this.OnWasRecentlyRenderComponents.push(e);
          }
          if (e.OnEntityBudgetTickEnableChange) {
            this.OnBudgetTickEnableChangeComponents ||= new Array();
            this.OnBudgetTickEnableChangeComponents.push(e);
          }
          if (e.NeedAfterTick) {
            t = true;
          }
        }
        this.yW = GameBudgetInterfaceController_1.GameBudgetInterfaceController.RegisterTick(this.IW.GroupName, this.IW.SignificanceGroup, this, i, t, this.OnBudgetTickEnableChangeComponents !== undefined, this.OnWasRecentlyRenderComponents !== undefined);
      }
    }
  }
  UnregisterFromGameBudgetController() {
    if (GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen && this.yW) {
      this.yW = undefined;
      this.IW = undefined;
      GameBudgetInterfaceController_1.GameBudgetInterfaceController.UnregisterTick(this);
    }
  }
  Create(t) {
    var i = this.RW();
    [this.m6, this._W, this.uW, this.cW, this.mW, this.dW, this.ir_, this.gW, this.fW] = i;
    this.m6?.Start();
    if (this.OnCreate !== Entity.prototype.OnCreate) {
      try {
        if (!this.OnCreate(t)) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Entity", 1, "Entity创建失败，请检查前面组件的报错", ["entity", this.constructor.name]);
          }
          this.m6?.Stop();
          return false;
        }
      } catch (t) {
        if (t instanceof Error) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("Entity", 1, "Entity创建执行异常", t, ["Id", this.Id], ["entity", this.constructor.name], ["error", t.message]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 1, "Entity创建执行异常", ["Id", this.Id], ["entity", this.constructor.name], ["error", t]);
        }
        this.m6?.Stop();
        return false;
      }
    }
    this.pW = 1;
    this.TickComponentManager.Sort();
    this.m6?.Stop();
    return true;
  }
  Respawn(t) {
    this.OnRespawn(t);
    for (const i of this.Components) {
      if (!i.Respawn(this, t)) {
        return false;
      }
    }
    this.pW = 1;
    return true;
  }
  OnRespawn(t) {
    return true;
  }
  InitData(t) {
    this.OnInitData(t);
    return true;
  }
  OnInitData(t) {
    return true;
  }
  Init() {
    if (this.pW & 2) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 1, "Entity重复执行Init", ["Id", this.Id], ["entity", this.constructor.name]);
      }
      return false;
    }
    this._W?.Start();
    this.InitStatTdType?.Start();
    this.EntityData = JsModelManager_1.JsModelManager.AddEntity(this.Id);
    if (this.OnInit !== Entity.prototype.OnInit) {
      try {
        if (!this.OnInit()) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Entity", 1, "Entity初始化失败，请检查前面组件的报错", ["entity", this.constructor.name]);
          }
          this.InitStatTdType?.Stop();
          this._W?.Stop();
          return false;
        }
      } catch (t) {
        if (t instanceof Error) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("Entity", 1, "Entity初始化执行异常", t, ["Id", this.Id], ["entity", this.constructor.name], ["error", t.message]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 1, "Entity初始化执行异常", ["Id", this.Id], ["entity", this.constructor.name], ["error", t]);
        }
        this.InitStatTdType?.Stop();
        this._W?.Stop();
        return false;
      }
    }
    for (const t of this.Components) {
      if (!t.Init()) {
        this.InitStatTdType?.Stop();
        this._W?.Stop();
        return false;
      }
    }
    this.pW |= 2;
    this.InitStatTdType?.Stop();
    this._W?.Stop();
    return true;
  }
  Clear() {
    this.uW?.Start();
    this.ClearStatTdType?.Start();
    let i = false;
    for (let t = this.Components.length - 1; t >= 0; --t) {
      if (!EntityComponentSystem_1.EntityComponentSystem.Destroy(this, this.Components[t])) {
        i = true;
      }
    }
    if (i) {
      this.ClearStatTdType?.Stop();
      this.uW?.Stop();
      return false;
    }
    if (this.OnClear !== Entity.prototype.OnClear) {
      try {
        if (!this.OnClear()) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Entity", 1, "清理失败", ["entity", this.constructor.name]);
          }
          this.ClearStatTdType?.Stop();
          this.uW?.Stop();
          return false;
        }
      } catch (t) {
        if (t instanceof Error) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("Entity", 1, "Entity清理执行异常", t, ["Id", this.Id], ["entity", this.constructor.name], ["error", t.message]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 1, "Entity清理执行异常", ["Id", this.Id], ["entity", this.constructor.name], ["error", t]);
        }
        this.ClearStatTdType?.Stop();
        this.uW?.Stop();
        return false;
      }
    }
    this.AW();
    this.ClearStatTdType?.Stop();
    this.uW?.Stop();
    this.pW |= 64;
    return true;
  }
  AW() {
    this.vW = 0;
    this.MW = 0;
    this.SW = 1;
    this.EW = false;
    this.TickComponentManager.Clear();
    this.$4a.clear();
    this.X4a.clear();
    this.Ctl = undefined;
  }
  Start() {
    if (this.pW & 4) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 1, "Entity重复执行Start", ["Id", this.Id], ["entity", this.constructor.name]);
      }
      return false;
    }
    this.cW?.Start();
    this.StartStatTdType?.Start();
    if (this.OnStart !== Entity.prototype.OnStart) {
      try {
        if (!this.OnStart()) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Entity", 1, "Entity开始失败", ["entity", this.constructor.name]);
          }
          this.StartStatTdType?.Stop();
          this.cW?.Stop();
          return false;
        }
      } catch (t) {
        if (t instanceof Error) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("Entity", 1, "Entity开始执行异常", t, ["Id", this.Id], ["entity", this.constructor.name], ["error", t.message]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 1, "Entity开始执行异常", ["Id", this.Id], ["entity", this.constructor.name], ["error", t]);
        }
        this.StartStatTdType?.Stop();
        this.cW?.Stop();
        return false;
      }
    }
    for (const t of this.Components) {
      if (!t.Start()) {
        this.StartStatTdType?.Stop();
        this.cW?.Stop();
        return false;
      }
    }
    this.pW |= 4;
    this.StartStatTdType?.Stop();
    this.cW?.Stop();
    return true;
  }
  Activate() {
    this.dW?.Start();
    this.ActivateStatTdType?.Start();
    for (const t of this.Components) {
      t.Activate();
    }
    this.pW |= 8;
    this.ActivateStatTdType?.Stop();
    this.dW?.Stop();
  }
  PostActivate() {
    this.ir_.Start();
    if (this.pW & 8) {
      var t = this.GetComponent(0)?.GetCreatureDataId();
      var i = this.GetComponent(0)?.GetPbDataId();
      if (t !== undefined && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Entity", 19, "[实体生命周期:创建实体] 实体执行执行PostActivate", ["CreatureDataId", t], ["PbDataId", i], ["EntityId", this.Id]);
      }
      for (const s of this.Components) {
        s.PostActivate();
      }
      this.pW |= 16;
      this.ir_.Stop();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Entity", 19, "Entity未执行Activate就执行PostActivate", ["Id", this.Id], ["entity", this.constructor.name]);
    }
  }
  End() {
    if (this.pW & 4) {
      this.mW?.Start();
      this.EndStatTdType?.Start();
      let i = false;
      for (let t = this.Components.length - 1; t >= 0; --t) {
        if (!this.Components[t].End()) {
          i = true;
        }
      }
      if (i) {
        this.EndStatTdType?.Stop();
        this.mW?.Stop();
        return false;
      }
      if (this.OnEnd !== Entity.prototype.OnEnd) {
        try {
          if (!this.OnEnd()) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 1, "Entity结束失败", ["entity", this.constructor.name]);
            }
            this.EndStatTdType?.Stop();
            this.mW?.Stop();
            return false;
          }
        } catch (t) {
          if (t instanceof Error) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.ErrorWithStack("Entity", 1, "Entity结束执行异常", t, ["Id", this.Id], ["entity", this.constructor.name], ["error", t.message]);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Entity", 1, "Entity结束执行异常", ["Id", this.Id], ["entity", this.constructor.name], ["error", t]);
          }
          this.EndStatTdType?.Stop();
          this.mW?.Stop();
          return false;
        }
      }
      this.pW |= 32;
      if (this.EntityData) {
        JsModelManager_1.JsModelManager.RemoveEntity(this.Id);
        this.EntityData = undefined;
      }
      this.EndStatTdType?.Stop();
      this.mW?.Stop();
    }
    return true;
  }
  Enable(t, i) {
    if (Info_1.Info.IsBuildDevelopmentOrDebug && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Entity", 3, "Entity.Enable", ["EntityId", this.Id], ["EntityName", this.constructor.name], ["Handle", t], ["Reason", i]);
    }
    if (this.$4a.get(t)[1]) {
      this.$4a.delete(t);
      this.gtl(i);
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 1, "Entity实体激活失败句柄不存在", ["EntityId", this.Id], ["EntityName", this.constructor.name], ["Handle", t], ["Reason", i]);
      }
      return false;
    }
  }
  Disable(t) {
    if (t) {
      if (t.length < exports.DISABLE_REASON_LENGTH_LIMIT && Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "Disable的Reason字符串长度必须大于等于限制字符数量", ["EntityId", this.Id], ["Entity", this.constructor.name], ["Reason", t], ["限制的字符数量", exports.DISABLE_REASON_LENGTH_LIMIT]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Entity", 3, "Disable的Reason不能使用undefined", ["Entity", this.constructor.name]);
    }
    var i = ++this.vW;
    this.$4a.set(i, t);
    this.gtl(t);
    if (Info_1.Info.IsBuildDevelopmentOrDebug && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Entity", 3, "Entity.Disable", ["EntityId", this.Id], ["EntityName", this.constructor.name], ["Handle", i], ["Reason", t]);
    }
    return i;
  }
  EnableByKey(t, i = true) {
    if (Info_1.Info.IsBuildDevelopmentOrDebug && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Entity", 48, "Entity.EnableByKey", ["EntityId", this.Id], ["EntityName", this.constructor.name], ["Key", t], ["RemoveAll", i]);
    }
    if (t !== 2) {
      this.EnableByKey(2, true);
    }
    var s = this.X4a.get(t);
    if (!s || s <= 0) {
      if (s !== undefined) {
        this.X4a.delete(t);
      }
    } else {
      if (!i && s > 1) {
        this.X4a.set(t, s - 1);
      } else {
        this.X4a.delete(t);
      }
      this.gtl(t);
    }
  }
  HasDisableKey(t) {
    return this.X4a.has(t);
  }
  DisableByKey(t, i = true) {
    if (Info_1.Info.IsBuildDevelopmentOrDebug && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Entity", 48, "Entity.DisableByKey", ["EntityId", this.Id], ["EntityName", this.constructor.name], ["Key", t], ["NoDuplicate", i]);
    }
    var s = Math.max(0, this.X4a.get(t) ?? 0);
    if (!i || !(s > 0)) {
      this.X4a.set(t, s + 1);
      this.gtl(t);
    }
  }
  gtl(i) {
    if (this.IsStart) {
      for (let t = this.Components.length - 1; t >= 0; --t) {
        this.Components[t].RefreshEnable(i);
      }
    } else {
      this.Ctl = i;
    }
  }
  ExecutePendingEnableProcess() {
    if (this.IsStart && this.Ctl) {
      for (let t = this.Components.length - 1; t >= 0; --t) {
        this.Components[t].RefreshEnable(this.Ctl);
      }
      this.Ctl = undefined;
    }
  }
  ForceTick(t) {
    if (this.Active) {
      this.gW?.Start();
      this.TickStatTdType?.Start();
      this.TickComponentManager.ForceTick(t * this.SW);
      this.TickStatTdType?.Stop();
      this.gW?.Stop();
    }
  }
  ScheduledTick(t, i, s) {
    this.mDa = t;
    this.MW = i;
    this.LastTickFrame = Time_1.Time.Frame;
    if (!MathUtils_1.MathUtils.IsNearlyEqual(this.TW, s) && !(this.TW = s, EntityHelper_1.EntitySystemHelper.IsSortDirty)) {
      EntityHelper_1.EntitySystemHelper.IsSortDirty = true;
    }
    if (this.Valid && this.IsInit) {
      this.Tick(t * CommonDefine_1.MILLIONSECOND_PER_SECOND);
    }
  }
  Tick(t) {
    if (this.Active) {
      this.gW?.Start();
      this.TickStatTdType?.Start();
      this.TickComponentManager.Tick(this.MW, t * this.SW);
      this.TickStatTdType?.Stop();
      this.gW?.Stop();
    } else {
      this.TickComponentManager.ClearDelta();
    }
  }
  ForceAfterTick(t) {
    if (this.Active) {
      this.fW?.Start();
      this.AfterTickStatTdType?.Start();
      this.TickComponentManager.ForceAfterTick(t * this.SW);
      this.AfterTickStatTdType?.Stop();
      this.fW?.Stop();
    }
  }
  ScheduledAfterTick(t, i, s) {
    if (this.Valid && this.IsInit) {
      this.AfterTick(t * 1000);
    }
  }
  OnEnabledChange(t, i) {
    if (this.OnBudgetTickEnableChangeComponents) {
      for (const s of this.OnBudgetTickEnableChangeComponents) {
        s.OnEntityBudgetTickEnableChange(t);
      }
    }
  }
  OnWasRecentlyRenderedOnScreenChange(t) {
    if (this.OnWasRecentlyRenderComponents) {
      for (const i of this.OnWasRecentlyRenderComponents) {
        i.OnEntityWasRecentlyRenderedOnScreenChange(t);
      }
    }
  }
  AfterTick(t) {
    if (this.Active) {
      this.fW?.Start();
      this.AfterTickStatTdType?.Start();
      this.TickComponentManager.AfterTick(this.MW, t * this.SW);
      this.AfterTickStatTdType?.Stop();
      this.fW?.Stop();
    } else {
      this.TickComponentManager.ClearDelta();
    }
  }
  OnCreate(t) {
    return true;
  }
  OnInit(t) {
    return true;
  }
  OnDeinit() {
    return true;
  }
  OnClear() {
    return true;
  }
  OnStart() {
    return true;
  }
  OnEnd() {
    return true;
  }
  toString() {
    return `[object ${this.constructor.name}(Id=${this.Id})${this.Valid ? "" : "(D)"}]`;
  }
  DumpDisableInfo() {
    var t;
    var i;
    var s = new Array();
    let e = "";
    for ([t, i] of this.$4a) {
      s.push(`${e}{Handle:${t},Reason:${i[0]}}`);
      e = " ";
    }
    return s.join("");
  }
  DumpComponentsDisableInfo() {
    var t = new Array();
    let i = "";
    for (const s of this.Components) {
      if (s.DumpDisableInfo().length !== 0) {
        t.push(i + "componentInfo");
        i = " ";
      }
    }
    return t.join("");
  }
}
(exports.Entity = Entity).StaticGameBudgetConfigInternal = undefined;
Entity.UW = new Map(); //# sourceMappingURL=Entity.js.map