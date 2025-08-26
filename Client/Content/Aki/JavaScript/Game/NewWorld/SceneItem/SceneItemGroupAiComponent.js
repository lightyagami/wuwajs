"use strict";

var __decorate = this && this.__decorate || function (e, t, o, n) {
  var i;
  var r = arguments.length;
  var a = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(e, t, o, n);
  } else {
    for (var s = e.length - 1; s >= 0; s--) {
      if (i = e[s]) {
        a = (r < 3 ? i(a) : r > 3 ? i(t, o, a) : i(t, o)) || a;
      }
    }
  }
  if (r > 3 && a) {
    Object.defineProperty(t, o, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemGroupAiComponent = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const ModelManager_1 = require("../../Manager/ModelManager");
const WaitEntityTask_1 = require("../../World/Define/WaitEntityTask");
const EACH_WAIT_ENTITY_OVER_TIME = 60000;
let SceneItemGroupAiComponent = class SceneItemGroupAiComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.WAl = IComponent_1.EGroupAiMode.Patrol;
    this.Bih = [];
    this.QAl = undefined;
  }
  OnStart() {
    var e = this.Entity.GetComponent(0);
    var t = e?.GetPbEntityInitData();
    if (e && t && (e = (0, IComponent_1.getComponent)(t.ComponentsData, "GroupAiComponent"))) {
      this.WAl = e.Option.Type;
      this.Bih.push(...e.Entities);
      this.QAl = e;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SceneItem", 42, "[GroupAi] OnStart.CreateWaitEntityTask");
      }
      if (this.WAl === IComponent_1.EGroupAiMode.Patrol) {
        ModelManager_1.ModelManager.MonsterGroupPatrolModel?.RecordGroupMonsterPbDataId(this.Bih);
      }
      this.CreateWaitEntityTask(this.Bih);
    }
    return true;
  }
  CreateWaitEntityTask(t) {
    let o = 1;
    if (Array.isArray(t)) {
      o = t.length;
    }
    WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId("SceneItemGroupAiComponent.CreateWaitEntityTask", t, e => {
      if (!e) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("SceneItem", 42, "[GroupAi] 没等到全员加载齐", ["EntityCount", o], ["entityIds", t]);
        }
      }
      this.Gih();
    }, EACH_WAIT_ENTITY_OVER_TIME, true, true);
  }
  Gih() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SceneItem", 42, "[GroupAi] ExecuteWhenEntitiesReady");
    }
    if (this.WAl === IComponent_1.EGroupAiMode.Patrol) {
      this.KAl();
    }
  }
  OnEnd() {
    if (this.WAl === IComponent_1.EGroupAiMode.Patrol) {
      this.$Al();
    }
    return true;
  }
  KAl() {
    this.ePl();
    ModelManager_1.ModelManager.MonsterGroupPatrolModel?.GenerateAddMonsterGroup(this.Entity.Id, this.QAl);
  }
  $Al() {
    this.ePl(true);
    ModelManager_1.ModelManager.MonsterGroupPatrolModel?.RemoveMonsterGroup(this.Entity.Id);
  }
  ePl(e = false) {
    for (const o of this.Bih) {
      var t = ModelManager_1.ModelManager.CreatureModel?.GetEntityIdByPbDataId(o);
      if (t &&= ModelManager_1.ModelManager.CreatureModel?.GetEntityById(t)?.Entity?.GetComponent(206)) {
        if (e) {
          t.RemoveTag(-1250067672);
        } else {
          t.AddTag(-1250067672);
        }
      }
    }
  }
};
SceneItemGroupAiComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(260)], SceneItemGroupAiComponent);
exports.SceneItemGroupAiComponent = SceneItemGroupAiComponent; //# sourceMappingURL=SceneItemGroupAiComponent.js.map