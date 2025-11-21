"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PerformGroupController = exports.PerformGroup = exports.PerformActionPlayMontage = exports.PerformActionChangeMaterial = exports.PerformAction = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ICommon_1 = require("../../../../../UniverseEditor/Interface/ICommon");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
class PerformAction {
  constructor() {
    this.Type = 0;
    this.Entity = undefined;
  }
  Register(t) {
    this.Entity = t;
  }
  UnRegister() {
    this.Entity = undefined;
  }
  Begin() {}
  Tick(t) {}
  End() {}
}
class PerformActionChangeMaterial extends (exports.PerformAction = PerformAction) {
  constructor() {
    super(...arguments);
    this.Type = 2;
    this.DaPath = "";
    this.Handle = 0;
    this.NpcMatController = undefined;
  }
  Register(t) {
    super.Register(t);
    t = t.GetComponent(191);
    this.NpcMatController = t.MaterialController;
  }
  UnRegister() {
    this.NpcMatController = undefined;
    super.UnRegister();
  }
  Begin() {
    if (this.Entity && this.DaPath !== "") {
      this.Handle = this.NpcMatController.ApplyMaterialEffect(this.DaPath);
    }
  }
  End() {
    if (this.Entity && this.DaPath !== "") {
      this.NpcMatController.RemoveMaterialEffect(this.Handle);
      this.Handle = 0;
    }
  }
}
exports.PerformActionChangeMaterial = PerformActionChangeMaterial;
class PerformActionPlayMontage extends PerformAction {
  constructor() {
    super(...arguments);
    this.Type = 1;
  }
}
exports.PerformActionPlayMontage = PerformActionPlayMontage;
class PerformGroup {
  constructor() {
    this.Id = PerformGroup.Yla++;
    this.Entity = undefined;
    this.SwitchKey = "None";
    this.ActionList = new Array();
  }
  Register(t) {
    this.Entity = t;
    for (const o of this.ActionList) {
      o.Register(t);
    }
  }
  UnRegister() {
    for (const t of this.ActionList) {
      t.UnRegister();
    }
    this.Entity = undefined;
  }
  AddAction(t) {
    this.ActionList.push(t);
    if (this.Entity) {
      t.Register(this.Entity);
    }
  }
  Start() {
    for (const t of this.ActionList) {
      t.Begin();
    }
  }
  Tick(t) {
    for (const o of this.ActionList) {
      o.Tick(t);
    }
  }
  Stop() {
    for (const t of this.ActionList) {
      t.End();
    }
  }
}
(exports.PerformGroup = PerformGroup).Yla = 0;
class PerformGroupController {
  constructor(t) {
    this.Entity = undefined;
    this.PerformStateMap = new Map();
    this.PerformGroupMap = new Map();
    this.CurrentRunningGroupMap = new Map();
    this.Entity = t;
  }
  Init() {
    var o = this.Entity.GetComponent(0);
    var r = o.GetPbEntityInitData();
    if (r?.ComponentsData) {
      var s;
      var r = (0, IComponent_1.getComponent)(r.ComponentsData, "NpcPerformComponent")?.NpcPerformState;
      if (r) {
        for (const n of r.Configs) {
          var i = new PerformGroup();
          i.SwitchKey = n.State;
          var e = new PerformActionChangeMaterial();
          e.DaPath = n.MaterialDa ?? "";
          i.ActionList.push(e);
          this.AddPerformGroup(i);
        }
        for (const h of ICommon_1.npcPerformStateConfig[r.InitState.Type]) {
          if (!this.PerformStateMap.has(h)) {
            s = new PerformGroup();
            this.AddPerformGroup(s);
          }
        }
        let t = o.ComponentDataMap.get("cla")?.cla?.Y4n;
        t = t || r.InitState.State;
        this.SwitchPerformState(t);
      }
    }
  }
  Tick(t) {
    for (const o of this.CurrentRunningGroupMap.values()) {
      o.Tick(t);
    }
  }
  AddPerformGroup(t) {
    return !this.PerformStateMap.has(t.SwitchKey) && (t.Register(this.Entity), this.PerformGroupMap.set(t.Id, t), this.PerformStateMap.set(t.SwitchKey, false), true);
  }
  RemovePerformGroup(t) {
    t.UnRegister();
    this.PerformGroupMap.delete(t.Id);
    this.PerformStateMap.delete(t.SwitchKey);
    return true;
  }
  SwitchPerformState(t) {
    if (!this.PerformStateMap.get(t)) {
      for (const o of this.PerformStateMap.keys()) {
        this.UpdatePerformState(o, false);
      }
      this.UpdatePerformState(t, true);
    }
  }
  IsPerformStateEnabled(t) {
    return !!this.PerformStateMap.get(t);
  }
  UpdatePerformState(t, o) {
    var r = this.PerformStateMap.get(t);
    if (r !== undefined && r !== o) {
      this.PerformStateMap.set(t, o);
      this.UpdatePerformGroup();
    }
  }
  UpdatePerformGroup() {
    for (const t of this.PerformGroupMap.values()) {
      if (this.CheckCondition(t)) {
        this.StartPerformGroup(t);
      } else {
        this.StopPerformGroup(t);
      }
    }
  }
  CheckCondition(t) {
    return !!this.PerformStateMap.has(t.SwitchKey) && this.PerformStateMap.get(t.SwitchKey);
  }
  IsGroupRunning(t) {
    return this.CurrentRunningGroupMap.has(t.Id);
  }
  StartPerformGroup(t) {
    if (!this.IsGroupRunning(t)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("NPC", 50, "表现组开启", ["EntityId", this.Entity?.Id], ["Id", t.Id], ["Key", t.SwitchKey]);
      }
      t.Start();
      this.CurrentRunningGroupMap.set(t.Id, t);
    }
  }
  StopPerformGroup(t) {
    if (this.IsGroupRunning(t)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("NPC", 50, "表现组关闭", ["EntityId", this.Entity?.Id], ["Id", t.Id], ["Key", t.SwitchKey]);
      }
      t.Stop();
      this.CurrentRunningGroupMap.delete(t.Id);
    }
  }
}
exports.PerformGroupController = PerformGroupController;
//# sourceMappingURL=NpcPerformGroupController.js.map