"use strict";

var __decorate = this && this.__decorate || function (t, e, i, n) {
  var s;
  var o = arguments.length;
  var r = o < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, i, n);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (s = t[h]) {
        r = (o < 3 ? s(r) : o > 3 ? s(e, i, r) : s(e, i)) || r;
      }
    }
  }
  if (o > 3 && r) {
    Object.defineProperty(e, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PawnSensoryInfoComponent = undefined;
const cpp_1 = require("cpp");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const EnvironmentalPerceptionController_1 = require("../../../World/Enviroment/EnvironmentalPerceptionController");
const PERCEPTION_SEARCH_RANGE = 2000;
let PawnSensoryInfoComponent = class PawnSensoryInfoComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.whn = 0;
    this.Bhn = false;
    this.bhn = false;
    this.qhn = Number.MAX_VALUE;
    this.Ghn = undefined;
    this.wBa = new Set();
    this.Nhn = undefined;
    this.Ohn = () => {
      this.Bhn = true;
      if (!this.bhn) {
        this.khn();
      }
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.EnterLogicRange);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlayerSenseTargetEnter, this.Entity.Id);
    };
    this.Fhn = () => {
      this.Bhn = false;
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.LeaveLogicRange);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlayerSenseTargetLeave, this.Entity.Id);
    };
    this.khn = () => {
      if (!this.bhn) {
        this.bhn = true;
        if (this.Ghn) {
          this.DeletePerceptionEvent(this.Ghn);
          this.Ghn = undefined;
        }
      }
    };
  }
  OnEnable() {
    super.OnEnable();
    if (this.wBa.size > 0 && this.Entity.GameBudgetManagedToken) {
      cpp_1.FKuroPerceptionInterface.MarkElementDisable(this.Entity.GameBudgetManagedToken, false);
    }
  }
  OnDisable(t) {
    super.OnDisable(t);
    if (this.wBa.size > 0 && this.Entity.GameBudgetManagedToken) {
      cpp_1.FKuroPerceptionInterface.MarkElementDisable(this.Entity.GameBudgetManagedToken, true);
    }
  }
  CreatePerceptionEvent(t, e, i = undefined, n = undefined, s = undefined, o = undefined, r = -1, h = undefined) {
    var v = EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.CreatePlayerPerceptionEvent();
    this.wBa.add(v);
    v.Init(t, e, i, n, s, o, r, h);
    if (e) {
      cpp_1.FKuroPerceptionInterface.MarkElementDisable(e, !this.Entity.Active);
    }
    return v;
  }
  DeletePerceptionEvent(t) {
    this.wBa.delete(t);
    EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.DestroyPlayerPerceptionEvent(t);
  }
  BBa() {
    for (const t of this.wBa) {
      EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.DestroyPlayerPerceptionEvent(t);
    }
    this.wBa.clear();
  }
  RegisterPerceptionEvent() {
    var t = this.Entity.GameBudgetManagedToken;
    if (t) {
      for (const e of this.wBa) {
        if (!e.IsValid()) {
          e.Register(t);
        }
      }
      cpp_1.FKuroPerceptionInterface.MarkElementDisable(t, !this.Entity.Active);
    }
  }
  OnActivate() {
    var t = this.Entity.GetComponent(0);
    var e = this.Entity?.GameBudgetManagedToken;
    if (t.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player) {
      this.khn();
    } else {
      if (this.Ghn) {
        this.DeletePerceptionEvent(this.Ghn);
        this.Ghn = undefined;
      }
      this.Ghn = this.CreatePerceptionEvent(PERCEPTION_SEARCH_RANGE, e, this.khn);
    }
    if (!this.Nhn && this.whn > 0) {
      this.Nhn = this.CreatePerceptionEvent(this.whn, e, this.Ohn, this.Fhn);
    }
    return true;
  }
  SetLogicRange(t) {
    var e;
    if (t > this.whn) {
      this.whn = t;
      if (this.Nhn) {
        this.Nhn.UpdateDistance(t);
      } else if (e = this.Entity?.GameBudgetManagedToken) {
        this.Nhn = this.CreatePerceptionEvent(t, e, this.Ohn, this.Fhn);
      }
    }
  }
  OnEnd() {
    this.Nhn = undefined;
    this.Ghn = undefined;
    this.BBa();
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.LeaveLogicRange);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlayerSenseTargetLeave, this.Entity.Id);
    return true;
  }
  get PlayerDistSquared() {
    return this.qhn;
  }
  get PlayerDist() {
    return Math.sqrt(this.qhn);
  }
  get LogicRange() {
    return this.whn;
  }
  get IsInLogicRange() {
    return this.Bhn;
  }
  GetDebugString() {
    let t = "";
    t = `${t += `DefaultRangeToken: ${this.Ghn?.EventToken ?? "undefined"}
`}LogicRangeToken: ${this.Nhn?.EventToken ?? "undefined"}; LogicRange: ${this.whn}; IsInRangeInternal: ${this.IsInLogicRange}
LogicRangeInfo:
`;
    if (this.Nhn) {
      t += cpp_1.FKuroPerceptionInterface.GetPlayerPerceptionDebugString(this.Nhn.EventToken);
    }
    return t;
  }
};
PawnSensoryInfoComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(130)], PawnSensoryInfoComponent);
exports.PawnSensoryInfoComponent = PawnSensoryInfoComponent; //# sourceMappingURL=PawnSensoryInfoComponent.js.map