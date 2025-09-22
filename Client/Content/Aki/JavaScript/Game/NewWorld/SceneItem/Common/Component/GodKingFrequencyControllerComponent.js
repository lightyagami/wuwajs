"use strict";

var __decorate = this && this.__decorate || function (e, t, n, o) {
  var i;
  var r = arguments.length;
  var a = r < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, n) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(e, t, n, o);
  } else {
    for (var s = e.length - 1; s >= 0; s--) {
      if (i = e[s]) {
        a = (r < 3 ? i(a) : r > 3 ? i(t, n, a) : i(t, n)) || a;
      }
    }
  }
  if (r > 3 && a) {
    Object.defineProperty(t, n, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GodKingFrequencyControllerComponent = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const IAction_1 = require("../../../../../UniverseEditor/Interface/IAction");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const WaitEntityTask_1 = require("../../../../World/Define/WaitEntityTask");
const SceneItemMoveComponent_1 = require("./SceneItemMoveComponent");
const EACH_WAIT_ENTITY_OVER_TIME = 30000;
let GodKingFrequencyControllerComponent = class GodKingFrequencyControllerComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Lo = undefined;
    this.Nld = undefined;
    this.xie = (e, t) => {
      this.Vld(true);
    };
  }
  get jld() {
    return ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.Lo.GodKingFrequencyEntity);
  }
  static get Dependencies() {
    return [0];
  }
  OnInitData(e) {
    var t = this.Entity?.CheckGetComponent(0);
    return !!t && !!(t = t.GetPbEntityInitData()) && (this.Lo = (0, IComponent_1.getComponent)(t.ComponentsData, "GodKingFrequencyControllerComponent"), !!this.Lo);
  }
  OnStart() {
    this.Hld();
    this.$ld();
    this.Vld(true);
    this.Vr();
    return true;
  }
  OnEnd() {
    this.Vld(false);
    this.Wld();
    return true;
  }
  Vr() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.xie);
  }
  Wld() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie);
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
  }
  $ne() {
    this.OnEnd();
  }
  Vld(e) {
    var t;
    if (ModelManager_1.ModelManager.AvoidanceModel.UseRVOAvoidance && (t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity)?.Valid && t.Entity?.Valid && (t = t.Entity.CheckGetComponent(179)) && t.CharacterMovement) {
      t.CharacterMovement.SetAvoidanceGroupMask(ModelManager_1.ModelManager.AvoidanceModel.PlayerAvoidanceGroupMask);
      if (t.CharacterMovement.GetCharacterOwner()) {
        t.CharacterMovement.SetAvoidanceEnabled(e);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelPlay", 72, "[GodKingFrequencyControllerComponent.SetAvoidanceEnabled] OnStart调用的时机太早了");
      }
    }
  }
  Qld(e) {
    e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e);
    if (e?.Valid && e.Entity?.Valid) {
      e = e.Entity.CheckGetComponent(1);
      if (e) {
        return e.ActorLocationProxy;
      }
    }
  }
  Kld(n) {
    if (!this.jld?.Valid) {
      return false;
    }
    const o = this.jld.Entity?.CheckGetComponent(129);
    var e;
    return !!o && !!(e = this.Qld(n)) && (e = new SceneItemMoveComponent_1.MoveTarget(e, this.Lo.MaxFlyTime), o.AddStopMoveCallback(() => {
      o.ClearStopMoveCallback();
      var e;
      var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(n);
      if (t?.Valid && this.Xld(n, IAction_1.entityStateConfig.呓语雕像状态.破坏阶段4)) {
        if ((e = (this.Nld = t).Entity?.CheckGetComponent(86)) && e.IsOverlappingPlayer()) {
          this.Yld(t, true);
        }
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelPlay", 72, "[GodKingFrequencyControllerComponent.TryMoveToStatue] 目标雕塑实体已经无了");
      }
    }), this.Nld = undefined, o.AddMoveTarget(e), true);
  }
  Xld(e, t) {
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e);
    return !!e?.Valid && !!e.Entity?.Valid && !!(e = (e = e.Entity.CheckGetComponent(134)) && GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e.StateTagId)) && e !== t;
  }
  Yld(e, t) {
    if (t && e === this.Nld) {
      var n = [];
      for (const o of this.Lo.StatueEntityIdList) {
        if (o !== this.Nld.PbDataId && this.Xld(o, IAction_1.entityStateConfig.呓语雕像状态.破坏阶段4)) {
          n.push(o);
        }
      }
      if (n.length === 0) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelPlay", 72, "[GodKingFrequencyControllerComponent.StatueOnMyPlayerInOutRangeLocal] 没找到可去的其他雕塑");
        }
        this.$ne();
      } else {
        t = MathUtils_1.MathUtils.GetRandomItem(n);
        this.Kld(t);
      }
    }
  }
  $ld() {
    WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId("[GodKingFrequencyControllerComponent] 等待雕像实体创建", this.Lo.StatueEntityIdList, e => {
      if (e) {
        for (const n of this.Lo.StatueEntityIdList) {
          var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(n);
          if (t && t.Entity?.Valid) {
            EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, t.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.Yld.bind(this, t));
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelPlay", 72, "[GodKingFrequencyControllerComponent.InitStatues] 等待雕像实体创建超时");
      }
    }, EACH_WAIT_ENTITY_OVER_TIME * this.Lo.StatueEntityIdList.length, false);
  }
  Hld() {
    const t = [this.Lo.GodKingFrequencyEntity, this.Lo.InitialAttachStatue];
    WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId("[GodKingFrequencyControllerComponent] 等待神王频率和初始附着雕像实体", t, e => {
      if (e) {
        e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.Lo.GodKingFrequencyEntity)?.Entity?.CheckGetComponent(1);
        if (e) {
          let t = this.Lo.InitialAttachStatue;
          if (!this.Xld(this.Lo.InitialAttachStatue, IAction_1.entityStateConfig.呓语雕像状态.破坏阶段4)) {
            let e = false;
            for (const i of this.Lo.StatueEntityIdList) {
              if (i !== this.Lo.InitialAttachStatue && this.Xld(i, IAction_1.entityStateConfig.呓语雕像状态.破坏阶段4)) {
                t = i;
                e = true;
                break;
              }
            }
            if (!e) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("LevelPlay", 72, "[GodKingFrequencyControllerComponent.InitAttachStatue] 无法找到初始附着的有效雕像");
              }
              return;
            }
          }
          var n = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t);
          var o = n?.Entity?.CheckGetComponent(1);
          if (o) {
            e?.SetActorLocation(o.ActorLocation, "[GodKingFrequencyControllerComponent] 初始附着雕像");
            this.Nld = n;
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelPlay", 72, "[GodKingFrequencyControllerComponent.InitAttachStatue] 实体们创建超时或者已经被销毁", ["EntityId", this.Entity.Id], ["PbDataIds", t]);
      }
    }, EACH_WAIT_ENTITY_OVER_TIME * t.length, false);
  }
};
GodKingFrequencyControllerComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(291)], GodKingFrequencyControllerComponent);
exports.GodKingFrequencyControllerComponent = GodKingFrequencyControllerComponent; //# sourceMappingURL=GodKingFrequencyControllerComponent.js.map