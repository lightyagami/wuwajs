"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityComponent = undefined;
const Log_1 = require("../Common/Log");
const Stats_1 = require("../Common/Stats");
const PerformanceDecorators_1 = require("../Performance/PerformanceDecorators");
const Entity_1 = require("./Entity");
class EntityComponent {
  constructor() {
    this.UnResetPropertySet = undefined;
    this.PW = undefined;
    this.vW = 0;
    this.$4a = new Map();
    this.X4a = new Map();
    this.m6 = undefined;
    this._W = undefined;
    this.uW = undefined;
    this.cW = undefined;
    this.mW = undefined;
    this.dW = undefined;
    this.xW = undefined;
    this.wW = undefined;
    this.BW = undefined;
    this.bW = undefined;
    this.qzo = true;
    this.qW = false;
    this.GW = false;
    this.oW = false;
    this.NW = false;
    this.rW = false;
    this.OW = false;
    this.kW = false;
    this.OnEntityWasRecentlyRenderedOnScreenChange = undefined;
    this.OnEntityBudgetTickEnableChange = undefined;
    this.qW = this.OnEnable !== EntityComponent.prototype.OnEnable;
    this.GW = this.OnDisable !== EntityComponent.prototype.OnDisable;
    this.oW = this.OnTick !== EntityComponent.prototype.OnTick;
    this.NW = this.OnForceTick !== EntityComponent.prototype.OnForceTick;
    this.rW = this.OnAfterTick !== EntityComponent.prototype.OnAfterTick;
    this.OW = this.OnForceAfterTick !== EntityComponent.prototype.OnForceAfterTick;
    this.kW = this.OnChangeTimeDilation !== EntityComponent.prototype.OnChangeTimeDilation;
    var t = this.constructor.name;
    let i = undefined;
    if (EntityComponent.UW.has(t)) {
      i = EntityComponent.UW.get(t);
    } else {
      i = [Stats_1.Stat.CreateNoFlameGraph(t + ".Create"), Stats_1.Stat.CreateNoFlameGraph(t + ".Init"), Stats_1.Stat.CreateNoFlameGraph(t + ".Clear"), Stats_1.Stat.CreateNoFlameGraph(t + ".Start"), Stats_1.Stat.CreateNoFlameGraph(t + ".End"), Stats_1.Stat.CreateNoFlameGraph(t + ".Activate"), Stats_1.Stat.CreateNoFlameGraph(t + ".Tick"), Stats_1.Stat.CreateNoFlameGraph(t + ".ForceTick"), Stats_1.Stat.CreateNoFlameGraph(t + ".AfterTick"), Stats_1.Stat.CreateNoFlameGraph(t + ".ForceAfterTick")];
      EntityComponent.UW.set(t, i);
    }
    [this.m6, this._W, this.uW, this.cW, this.mW, this.dW, this.xW, this.wW, this.BW, this.bW] = i;
  }
  static get Dependencies() {}
  get Valid() {
    return !!this.Entity && this.Entity.IsCreate && !this.Entity.IsClear;
  }
  AW() {
    this.$4a.clear();
    this.vW = 0;
    this.PW = undefined;
  }
  get Entity() {
    return this.PW;
  }
  get Active() {
    return (this.PW?.Active ?? false) && this.qzo;
  }
  get NeedTick() {
    return this.oW;
  }
  get NeedForceTick() {
    return this.NW;
  }
  get NeedAfterTick() {
    return this.rW;
  }
  get NeedForceAfterTick() {
    return this.OW;
  }
  get TimeDilation() {
    return this.Entity.TimeDilation;
  }
  FW(t, i) {
    try {
      if (!t()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 1, "组件生命周期执行失败", ["name", i], ["Id", this.Entity.Id], ["entity", this.Entity.constructor.name], ["component", this.constructor.name]);
        }
        return false;
      }
    } catch (t) {
      if (t instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("Entity", 1, "组件生命周期执行异常", t, ["name", i], ["Id", this.Entity.Id], ["entity", this.Entity.constructor.name], ["component", this.constructor.name], ["error", t.message]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 1, "组件生命周期执行异常", ["name", i], ["Id", this.Entity.Id], ["entity", this.Entity.constructor.name], ["component", this.constructor.name], ["error", t]);
      }
      return false;
    }
    return true;
  }
  VW(t, i, s) {
    i?.Start();
    t = this.FW(t, s);
    i?.Stop();
    return t;
  }
  Create(t, i) {
    this.PW = t;
    return this.OnCreate === EntityComponent.prototype.OnCreate || this.VW(() => this.OnCreate(i), this.m6, this.Create.name);
  }
  Respawn(t, i) {
    this.PW = t;
    return this.OnCreate === EntityComponent.prototype.OnCreate || this.VW(() => this.OnCreate(i), this.m6, this.Create.name);
  }
  RespawnNew(t) {
    this.PW = t;
    return true;
  }
  InitData(t) {
    return this.OnInitData(t);
  }
  Init() {
    return this.OnInit === EntityComponent.prototype.OnInit || this.VW(() => this.OnInit(), this._W, this.OnInit.name);
  }
  Deinit() {
    return this.OnDeinit === EntityComponent.prototype.OnDeinit || this.VW(() => this.OnDeinit(), this._W, this.OnDeinit.name);
  }
  Clear() {
    var t;
    if (this.OnClear === EntityComponent.prototype.OnClear) {
      this.AW();
      return true;
    } else {
      t = this.VW(() => this.OnClear(), this.uW, this.OnClear.name);
      this.AW();
      return t;
    }
  }
  Start() {
    return this.OnStart === EntityComponent.prototype.OnStart || this.VW(() => !!this.OnStart(), this.cW, this.OnStart.name);
  }
  Activate() {
    if (this.OnActivate !== EntityComponent.prototype.OnActivate) {
      this.VW(() => {
        this.OnActivate();
        return true;
      }, this.dW, this.OnActivate.name);
    }
  }
  PostActivate() {
    if (this.OnPostActivate !== EntityComponent.prototype.OnPostActivate) {
      this.VW(() => {
        this.OnPostActivate();
        return true;
      }, this.dW, this.OnPostActivate.name);
    }
  }
  End() {
    return this.OnEnd === EntityComponent.prototype.OnEnd || this.VW(() => this.OnEnd(), this.mW, this.OnEnd.name);
  }
  RefreshEnable(i) {
    var t = this.qzo;
    this.qzo = this.$4a.size === 0 && this.X4a.size === 0;
    if (this.PW) {
      this.qzo = this.qzo && this.PW.Active;
    }
    if (this.qzo !== t) {
      if (this.qzo) {
        if (this.qW) {
          this.FW(() => {
            this.OnEnable();
            return true;
          }, this.OnEnable.name);
        }
      } else if (this.GW) {
        this.FW(() => {
          var t = typeof i == "string" ? i : "EEntityDisableKey." + i?.toString();
          this.OnDisable(t);
          return true;
        }, this.OnDisable.name);
      }
    }
  }
  Enable(t, i) {
    if (t && this.$4a.delete(t)) {
      this.RefreshEnable(i);
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 1, "组件激活失败句柄不存在", ["EntityId", this.Entity.Id], ["EntityName", this.constructor.name], ["Handle", t], ["Reason", i]);
      }
      return false;
    }
  }
  Disable(t) {
    if (t) {
      if (t.length < Entity_1.DISABLE_REASON_LENGTH_LIMIT && Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "Disable的Reason字符串长度必须大于等于限制字符数量", ["Component", this.constructor.name], ["Reason", t], ["限制的字符数量", Entity_1.DISABLE_REASON_LENGTH_LIMIT]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Entity", 3, "Disable的Reason不能使用undefined", ["Component", this.constructor.name]);
    }
    var i = ++this.vW;
    this.$4a.set(i, t);
    this.RefreshEnable(t);
    return i;
  }
  EnableByKey(t, i = true) {
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
      this.RefreshEnable(t);
    }
  }
  DisableByKey(t, i = true) {
    var s = Math.max(0, this.X4a.get(t) ?? 0);
    if (!i || !(s > 0)) {
      this.X4a.set(t, s + 1);
      this.RefreshEnable(t);
    }
  }
  Tick(t) {
    if (this.Active) {
      var i = this.xW;
      i?.Start();
      try {
        this.OnTick(t);
      } catch (t) {
        if (t instanceof Error) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("Entity", 1, "组件 Tick 异常", t, ["Id", this.Entity.Id], ["entity", this.Entity.constructor.name], ["component", this.constructor.name], ["error", t.message]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 1, "组件 Tick 异常", ["Id", this.Entity.Id], ["entity", this.Entity.constructor.name], ["component", this.constructor.name], ["error", t]);
        }
      }
      i?.Stop();
    }
  }
  ForceTick(t) {
    if (this.Active) {
      this.wW.Start();
      try {
        this.OnForceTick(t);
      } catch (t) {
        if (t instanceof Error) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("Entity", 1, "组件 ForceTick 异常", t, ["Id", this.Entity.Id], ["entity", this.Entity.constructor.name], ["component", this.constructor.name], ["error", t.message]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 1, "组件 ForceTick 异常", ["Id", this.Entity.Id], ["entity", this.Entity.constructor.name], ["component", this.constructor.name], ["error", t]);
        }
      }
      this.wW.Stop();
    }
  }
  AfterTick(t) {
    if (this.Active) {
      this.BW.Start();
      try {
        this.OnAfterTick(t);
      } catch (t) {
        if (t instanceof Error) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("Entity", 1, "组件 AfterTick 异常", t, ["Id", this.Entity.Id], ["entity", this.Entity.constructor.name], ["component", this.constructor.name], ["error", t.message]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 1, "组件 AfterTick 异常", ["Id", this.Entity.Id], ["entity", this.Entity.constructor.name], ["component", this.constructor.name], ["error", t]);
        }
      }
      this.BW.Stop();
    }
  }
  ForceAfterTick(t) {
    if (this.Active) {
      this.bW.Start();
      try {
        this.OnForceAfterTick(t);
      } catch (t) {
        if (t instanceof Error) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("Entity", 1, "组件 ForceAfterTick 异常", t, ["Id", this.Entity.Id], ["entity", this.Entity.constructor.name], ["component", this.constructor.name], ["error", t.message]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Entity", 1, "组件 ForceAfterTick 异常", ["Id", this.Entity.Id], ["entity", this.Entity.constructor.name], ["component", this.constructor.name], ["error", t]);
        }
      }
      this.bW.Stop();
    }
  }
  SetTimeDilation(t) {
    if (this.kW) {
      this.FW(() => {
        this.OnChangeTimeDilation(t);
        return true;
      }, this.OnChangeTimeDilation.name);
    }
  }
  OnCreate(t) {
    return true;
  }
  OnInitData(t) {
    return true;
  }
  OnInit(t) {
    return true;
  }
  OnDeinit(t) {
    return true;
  }
  OnClear() {
    return true;
  }
  OnStart() {
    return true;
  }
  OnActivate() {}
  OnPostActivate() {}
  OnEnd() {
    return true;
  }
  OnEnable() {}
  OnDisable(t) {}
  OnTick(t) {}
  OnForceTick(t) {}
  OnAfterTick(t) {}
  OnForceAfterTick(t) {}
  OnChangeTimeDilation(t) {}
  toString() {
    return `[object ${this.constructor.name}(Id=${this.Entity?.Id})${this.Valid ? "" : "(D)"}]`;
  }
  DumpDisableInfo() {
    var t;
    var i;
    var s = new Array();
    let n = "";
    for ([t, i] of this.$4a) {
      s.push(`${n}{Component:${this.constructor.name},Handle:${t},Reason:${i}}`);
      n = " ";
    }
    return s.join("");
  }
  AddUnResetProperty(...t) {
    this.UnResetPropertySet ||= new Set();
    for (const i of t) {
      if (!this.UnResetPropertySet.has(i)) {
        this.UnResetPropertySet.add(i);
      }
    }
  }
}
(exports.EntityComponent = EntityComponent).Id = -1;
EntityComponent.UW = new Map(); //# sourceMappingURL=EntityComponent.js.map