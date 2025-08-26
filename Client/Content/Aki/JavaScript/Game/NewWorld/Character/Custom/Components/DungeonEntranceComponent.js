"use strict";

var __decorate = this && this.__decorate || function (t, e, n, i) {
  var o;
  var s = arguments.length;
  var r = s < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, n) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, n, i);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (o = t[h]) {
        r = (s < 3 ? o(r) : s > 3 ? o(e, n, r) : o(e, n)) || r;
      }
    }
  }
  if (s > 3 && r) {
    Object.defineProperty(e, n, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DungeonEntranceComponent = undefined;
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
let DungeonEntranceComponent = class DungeonEntranceComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.cen = undefined;
    this.men = undefined;
    this.den = (t, e) => {
      this.Cen();
    };
    this.gen = t => {
      this.Cen(t);
    };
  }
  OnStart() {
    this.cen = this.Entity.GetComponent(134);
    this.men = new Array();
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.den);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStatePreChangeInSequence, this.gen);
    this.Cen();
    return true;
  }
  OnActivate() {
    return true;
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.den);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStatePreChangeInSequence, this.gen);
    return !(this.men = undefined);
  }
  RegisterRestoreCb(t) {
    this.men.push(t);
  }
  Restore() {
    if (this.men?.length) {
      for (const t of this.men) {
        t();
      }
      this.men.length = 0;
    }
  }
  Cen(t) {
    if (t) {
      if (t === -3775711) {
        this.cen.ChangePerformanceState(217251158, false, false);
      }
    } else if (this.cen?.State === 2) {
      this.cen.ChangePerformanceState(217251158, false, false);
    }
  }
};
DungeonEntranceComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(84)], DungeonEntranceComponent);
exports.DungeonEntranceComponent = DungeonEntranceComponent; //# sourceMappingURL=DungeonEntranceComponent.js.map