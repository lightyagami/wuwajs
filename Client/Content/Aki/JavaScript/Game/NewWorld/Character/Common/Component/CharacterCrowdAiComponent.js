"use strict";

var __decorate = this && this.__decorate || function (t, e, r, i) {
  var o;
  var s = arguments.length;
  var n = s < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, r) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, r, i);
  } else {
    for (var l = t.length - 1; l >= 0; l--) {
      if (o = t[l]) {
        n = (s < 3 ? o(n) : s > 3 ? o(e, r, n) : o(e, r)) || n;
      }
    }
  }
  if (s > 3 && n) {
    Object.defineProperty(e, r, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterCrowdAiComponent = undefined;
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const GravityUtils_1 = require("../../../../Utils/GravityUtils");
const CrowdAiController_1 = require("../../Npc/Controller/CrowdAiController");
const BaseCrowdAiComponent_1 = require("./BaseCrowdAiComponent");
const STOP_MOVE_MAX_SPEED_SQUARED = 400;
let CharacterCrowdAiComponent = class CharacterCrowdAiComponent extends BaseCrowdAiComponent_1.BaseCrowdAiComponent {
  constructor() {
    super(...arguments);
    this.ActorComp = undefined;
    this.CurRadius = CrowdAiController_1.DEFAULT_ROLE_BOID_MIN_RADIUS;
    this.MinRadius = CrowdAiController_1.DEFAULT_ROLE_BOID_MIN_RADIUS;
    this.MaxRadius = CrowdAiController_1.DEFAULT_ROLE_BOID_MAX_RADIUS;
    this.MaxRadiusChangeTime = CrowdAiController_1.DEFAULT_ROLE_BOID_CHANGE_TIME;
    this.OnChangeRole = (t, e) => {
      t = t.Entity?.GetComponent(335);
      e = e?.Entity?.GetComponent(335);
      if (e && t) {
        t.CurRadius = e.CurRadius;
        t.MinRadius = e.MinRadius;
        t.MaxRadius = e.MaxRadius;
        t.MaxRadiusChangeTime = e.MaxRadiusChangeTime;
      }
    };
  }
  OnStart() {
    super.OnStart();
    this.ActorComp = this.Entity.GetComponent(3);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnChangeRole, this.OnChangeRole);
    return true;
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnChangeRole, this.OnChangeRole);
    return super.OnEnd();
  }
  OnTick(t) {
    this.UpdateRadius(t * MathUtils_1.MathUtils.MillisecondToSecond);
  }
  OnBoidComponentCreated() {
    super.OnBoidComponentCreated();
    this.InitFromRoleBoidParams(ControllerHolder_1.ControllerHolder.CrowdAiController.RoleParams);
  }
  InitFromRoleBoidParams(t) {
    if (t) {
      this.MaxRadius = t.MaxRadius;
      this.MinRadius = t.MinRadius;
      this.MaxRadiusChangeTime = t.MaxRadiusChangeTime;
    }
  }
  UpdateRadius(t) {
    var e;
    if (this.BoidComponent) {
      MathUtils_1.MathUtils.CommonTempVector.DeepCopy(this.ActorComp.ActorLocationProxy);
      MathUtils_1.MathUtils.CommonTempVector.SubtractionEqual(this.ActorComp.LastActorLocation);
      GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(this.ActorComp, MathUtils_1.MathUtils.CommonTempVector);
      if (MathUtils_1.MathUtils.CommonTempVector.SizeSquared() > t * t * STOP_MOVE_MAX_SPEED_SQUARED) {
        this.CurRadius = this.MinRadius;
      } else {
        e = (this.MaxRadius - this.MinRadius) / this.MaxRadiusChangeTime;
        this.CurRadius = Math.min(this.CurRadius + t * e, this.MaxRadius);
      }
      this.BoidComponent.Radius = this.CurRadius;
    }
  }
};
CharacterCrowdAiComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(335)], CharacterCrowdAiComponent);
exports.CharacterCrowdAiComponent = CharacterCrowdAiComponent; //# sourceMappingURL=CharacterCrowdAiComponent.js.map