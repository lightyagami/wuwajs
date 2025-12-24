"use strict";

var __decorate = this && this.__decorate || function (t, e, n, o) {
  var r;
  var i = arguments.length;
  var a = i < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, n) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(t, e, n, o);
  } else {
    for (var s = t.length - 1; s >= 0; s--) {
      if (r = t[s]) {
        a = (i < 3 ? r(a) : i > 3 ? r(e, n, a) : r(e, n)) || a;
      }
    }
  }
  if (i > 3 && a) {
    Object.defineProperty(e, n, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerLifeCycleComponent = undefined;
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const FormationDataController_1 = require("../../../Module/Abilities/FormationDataController");
const CombatLog_1 = require("../../../Utils/CombatLog");
let PlayerLifeCycleComponent = class PlayerLifeCycleComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.PlayerId = 0;
  }
  OnInitData() {
    var t;
    var e = this.Entity.CheckGetComponent(0);
    this.PlayerId = e?.GetPlayerId() ?? 0;
    if (this.PlayerId) {
      if (t = FormationDataController_1.FormationDataController.GetPlayerEntity(this.PlayerId)) {
        CombatLog_1.CombatLog.Error("Actor", this.Entity, "PlayerId已经存在", ["PlayerId", this.PlayerId], ["entityId", this.Entity.Id], ["oldEntityId", t.Id]);
      }
      FormationDataController_1.FormationDataController.RegisterPlayerEntity(this.PlayerId, this.Entity);
      return true;
    } else {
      CombatLog_1.CombatLog.Error("Actor", this.Entity, "初始化PlayerEntity时找不到合法的PlayerId", ["creatureDataId", e?.GetCreatureDataId()], ["PlayerId", this.PlayerId], ["entityId", this.Entity.Id]);
      return false;
    }
  }
  OnStart() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlayerEntityStarted, this.PlayerId, this.Entity);
    return true;
  }
  OnEnd() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlayerEntityEnded, this.PlayerId, this.Entity);
    return true;
  }
  OnClear() {
    FormationDataController_1.FormationDataController.UnRegisterPlayerEntity(this.PlayerId);
    return true;
  }
};
PlayerLifeCycleComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(211)], PlayerLifeCycleComponent);
exports.PlayerLifeCycleComponent = PlayerLifeCycleComponent; //# sourceMappingURL=PlayerLifeCycleComponent.js.map