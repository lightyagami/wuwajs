"use strict";

var __decorate = this && this.__decorate || function (e, t, i, n) {
  var s;
  var r = arguments.length;
  var o = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(e, t, i, n);
  } else {
    for (var h = e.length - 1; h >= 0; h--) {
      if (s = e[h]) {
        o = (r < 3 ? s(o) : r > 3 ? s(t, i, o) : s(t, i)) || o;
      }
    }
  }
  if (r > 3 && o) {
    Object.defineProperty(t, i, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterPlanComponent = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const IVar_1 = require("../../../../../UniverseEditor/Interface/IVar");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const BehaviorTreeDefines_1 = require("../../../../LevelGamePlay/LevelAi/BehaviorTree/BehaviorTreeDefines");
const LevelAi_1 = require("../../../../LevelGamePlay/LevelAi/LevelAi");
const LevelAiPlanInstance_1 = require("../../../../LevelGamePlay/LevelAi/LevelAiPlanInstance");
const LevelAiRegistry_1 = require("../../../../LevelGamePlay/LevelAi/LevelAiRegistry");
const LevelAiWorldState_1 = require("../../../../LevelGamePlay/LevelAi/LevelAiWorldState");
const LevelAiNodeBehaviourActions_1 = require("../../../../LevelGamePlay/LevelAi/Nodes/LevelAiNodeBehaviourActions");
const LevelAiNodeBehaviourSpline_1 = require("../../../../LevelGamePlay/LevelAi/Nodes/LevelAiNodeBehaviourSpline");
const BaseActorComponent_1 = require("../../../Common/Component/BaseActorComponent");
let CharacterPlanComponent = class CharacterPlanComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.u1t = undefined;
    this.ConfigId = 0;
    this.Pjr = undefined;
    this.xjr = undefined;
    this.wjr = undefined;
    this.Bjr = undefined;
    this.OPt = undefined;
    this.bjr = true;
    this.qjr = true;
    this.Gjr = false;
    this.sxr = undefined;
    this.DisableAiHandle = undefined;
    this.EFr = new Map();
    this.Nza = (e, t) => {
      if (this.Fza(e, t)) {
        switch ((0, IVar_1.getVarTypeByIndex)(t.iTs)) {
          case "Boolean":
            this.wjr?.SetBooleanWorldState(e, t.rTs);
            break;
          case "Int":
            this.wjr?.SetIntWorldState(e, MathUtils_1.MathUtils.LongToNumber(t.oTs));
        }
      }
    };
  }
  get PlanInstance() {
    return this.xjr;
  }
  get WorldState() {
    return this.wjr;
  }
  get WorldStateProxy() {
    return this.Bjr;
  }
  set WorldStateProxy(e) {
    this.Bjr = e;
  }
  get IsNeedPlan() {
    return this.bjr;
  }
  get Paused() {
    return this.Gjr;
  }
  OnInitData() {
    this.u1t = this.Entity.GetComponent(0);
    this.ConfigId = this.u1t.GetPbDataId();
    var e = this.u1t.GetPbEntityInitData();
    if (!e?.ComponentsData) {
      return !(this.bjr = false);
    }
    this.OPt = (0, IComponent_1.getComponent)(e.ComponentsData, "LevelAiComponent");
    if (!this.OPt?.States) {
      return !(this.bjr = false);
    }
    if (BehaviorTreeDefines_1.BehaviorTreeDefines.CanUseLevelAiBehaviorTree(this.Entity)) {
      return !(this.bjr = false);
    }
    this.wjr = new LevelAiWorldState_1.LevelAiWorldState();
    this.DisableAiHandle = new BaseActorComponent_1.DisableEntityHandle("SetLevelAiDisableInGame");
    var t;
    var e = (0, IComponent_1.getComponent)(e.ComponentsData, "VarComponent");
    if (e) {
      for (const i of e.Vars) {
        if (i.Type === "Int") {
          t = i.Value;
          this.wjr.SetIntWorldState(i.Name, t);
        }
      }
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.EntityVarUpdate, this.Nza);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("LevelAi", 42, "实体未勾选VarComponent组件，请检查是否确定不使用配置变量。", ["实体ID", this.ConfigId]);
    }
    return true;
  }
  OnStart() {
    if (this.bjr && this.OPt?.States) {
      this.xjr = new LevelAiPlanInstance_1.LevelAiPlanInstance();
      this.xjr.Initialize(this);
      this.Pjr = new LevelAi_1.LevelAi();
      let e = 1;
      for (const t of this.OPt.States) {
        switch (t.Behaviour.Type) {
          case "Actions":
            this.Njr(t, e);
            break;
          case "Spline":
            this.Ojr(t, e);
        }
        e++;
      }
    }
    return true;
  }
  OnActivate() {
    if (this.bjr && this.Entity.GetComponent(49)?.InLevelAiControl()) {
      this.StartLevelAi();
    }
  }
  OnTick(e) {
    if (this.bjr && this.qjr) {
      this.xjr.Tick(e);
    }
  }
  OnEnd() {
    if (this.bjr && (this.xjr.Stop(), EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.EntityVarUpdate, this.Nza))) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.EntityVarUpdate, this.Nza);
    }
    return true;
  }
  StartLevelAi() {
    if (this.bjr) {
      this.xjr.Start();
      this.qjr = true;
    }
  }
  StopLevelAi() {
    if (this.bjr) {
      this.xjr.Stop();
      this.qjr = false;
    }
  }
  Pause(e) {
    var t;
    return !!this.bjr && (this.EFr.has(e) ? (Log_1.Log.CheckWarn() && Log_1.Log.Warn("LevelAi", 50, "[CharacterPlanComponent] 重复使用关闭Ai的Key", ["entity", this.constructor.name], ["PbDataId", this.ConfigId], ["Key", e]), false) : (t = this.DisableAiHandle.Disable(e, this.constructor.name), this.EFr.set(e, t), this.sxr === undefined && (this.Gjr = true, this.qjr = false, this.xjr.Pause(), this.sxr = this.Disable("[CharacterPlanComponent.PauseAi]")), true));
  }
  Resume(e) {
    var t;
    return !!this.bjr && !(t = this.EFr.get(e), this.EFr.delete(e) ? !this.DisableAiHandle.Enable(t, this.constructor.name) || (this.DisableAiHandle.Empty && (this.Gjr = false, this.qjr = true, this.xjr.Resume(), this.Enable(this.sxr, "CharacterPlanComponent.Resume"), this.sxr = undefined), 0) : (Log_1.Log.CheckDebug() && Log_1.Log.Debug("LevelAi", 50, "[CharacterPlanComponent] 开启Ai使用了未定义的Key", ["entity", this.constructor.name], ["PbDataId", this.ConfigId], ["Key", e]), 1));
  }
  GetCreatureDataComponent() {
    return this.u1t;
  }
  GetCurrentLevelAiAsset() {
    return this.Pjr;
  }
  FindPlanInstanceBy(e) {
    if (this.xjr && e(this.xjr)) {
      return this.xjr;
    }
  }
  FindActiveTaskInfo(t) {
    let i = undefined;
    var e = this.FindPlanInstanceBy(e => (i = e.FindActiveTaskInfo(t)) !== undefined);
    if (e && i.PlanInstance === e) {
      return i;
    }
  }
  FindActiveDecoratorInfo(t) {
    let i = undefined;
    var e = this.FindPlanInstanceBy(e => (i = e.FindActiveDecoratorInfo(t)) !== undefined);
    if (e && i.PlanInstance === e) {
      return i;
    }
  }
  Njr(e, t) {
    if (e.Behaviour.Type === "Actions") {
      var i = LevelAiRegistry_1.LevelAiRegistry.Instance();
      var n = new LevelAiNodeBehaviourActions_1.LevelAiNodeBehaviourActions();
      n.Serialize(this, this.u1t, "状态" + t);
      n.Actions = e.Behaviour.Actions;
      for (const r of e.Condition.Conditions) {
        var s = new (i.FindDecoratorCtor(r.Type))();
        s.Serialize(this, this.u1t, "状态" + t, r);
        n.Decorators.push(s);
      }
      n.Cost = t;
      this.Pjr.StartNodes.push(n);
    }
  }
  Ojr(e, t) {
    if (e.Behaviour.Type === "Spline" && e.Behaviour.SplineEntityId) {
      var i = LevelAiRegistry_1.LevelAiRegistry.Instance();
      var n = new LevelAiNodeBehaviourSpline_1.LevelAiNodeBehaviourSpline();
      n.Serialize(this, this.u1t, "状态" + t);
      n.SplineId = e.Behaviour.SplineEntityId;
      for (const r of e.Condition.Conditions) {
        var s = new (i.FindDecoratorCtor(r.Type))();
        s.Serialize(this, this.u1t, "状态" + t, r);
        n.Decorators.push(s);
      }
      n.Cost = t;
      this.Pjr.StartNodes.push(n);
    }
  }
  Fza(e, t) {
    var i = this.Entity?.GetComponent(0);
    if (i?.IsNpc() || i?.IsAnimal()) {
      i = i.GetPbEntityInitData();
      if (i) {
        i = (0, IComponent_1.getComponent)(i.ComponentsData, "VarComponent");
        if (i) {
          var n = (0, IVar_1.getVarTypeByIndex)(t.iTs);
          for (const s of i.Vars) {
            if (e === s.Name) {
              return !!s.IsClient && s.Type === n;
            }
          }
        }
      }
    }
    return false;
  }
};
CharacterPlanComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(78)], CharacterPlanComponent);
exports.CharacterPlanComponent = CharacterPlanComponent; //# sourceMappingURL=CharacterPlanComponent.js.map