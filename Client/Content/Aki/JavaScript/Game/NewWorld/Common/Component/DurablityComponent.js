"use strict";

var __decorate = this && this.__decorate || function (t, e, i, n) {
  var o;
  var r = arguments.length;
  var s = r < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(t, e, i, n);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (o = t[h]) {
        s = (r < 3 ? o(s) : r > 3 ? o(e, i, s) : o(e, i)) || s;
      }
    }
  }
  if (r > 3 && s) {
    Object.defineProperty(e, i, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DurabilityComponent = undefined;
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
let DurabilityComponent = class DurabilityComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.u1t = undefined;
    this.ac = undefined;
    this.cmt = undefined;
    this.Qlt = undefined;
    this.DeadActions = undefined;
  }
  get IsDestroyed() {
    return this.ac >= 1;
  }
  OnInit() {
    this.u1t = this.Entity.GetComponent(0);
    this.ac = 0;
    this.cmt = undefined;
    var t = this.u1t.GetPbEntityInitData();
    var t = (0, IComponent_1.getComponent)(t.ComponentsData, "DestructibleItem");
    if (!t.DurabilityStateConfig?.NonDestructable) {
      this.DeadActions = t.DestructionActions;
    }
    this.Entity.GetComponent(121).SetLogicRange(ConfigManager_1.ConfigManager.ManipulateConfig.SearchRange);
    return true;
  }
  OnStart() {
    this.Qlt = t => {
      this.$rn();
    };
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemDurabilityChange, this.Qlt);
    this.$rn();
    return true;
  }
  OnEnd() {
    if (this.Qlt !== undefined) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemDurabilityChange, this.Qlt);
      this.Qlt = undefined;
    }
    if ((this.ac = undefined) !== this.cmt && TimerSystem_1.TimerSystem.Has(this.cmt)) {
      TimerSystem_1.TimerSystem.Remove(this.cmt);
    }
    return !(this.cmt = undefined);
  }
  $rn() {
    if (this.ac === 0 && !(this.u1t.GetDurabilityValue() > 0)) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSceneItemDestroy, this.Entity);
      this.ac = 1;
    }
  }
};
DurabilityComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(102)], DurabilityComponent);
exports.DurabilityComponent = DurabilityComponent; //# sourceMappingURL=DurablityComponent.js.map