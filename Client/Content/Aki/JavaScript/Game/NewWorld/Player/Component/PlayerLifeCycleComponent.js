"use strict";

var __decorate = this && this.__decorate || function (t, e, o, r) {
  var n;
  var i = arguments.length;
  var a = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, o) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(t, e, o, r);
  } else {
    for (var l = t.length - 1; l >= 0; l--) {
      if (n = t[l]) {
        a = (i < 3 ? n(a) : i > 3 ? n(e, o, a) : n(e, o)) || a;
      }
    }
  }
  if (i > 3 && a) {
    Object.defineProperty(e, o, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerLifeCycleComponent = undefined;
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
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
  OnClear() {
    FormationDataController_1.FormationDataController.UnRegisterPlayerEntity(this.PlayerId);
    return true;
  }
};
PlayerLifeCycleComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(201)], PlayerLifeCycleComponent);
exports.PlayerLifeCycleComponent = PlayerLifeCycleComponent; //# sourceMappingURL=PlayerLifeCycleComponent.js.map