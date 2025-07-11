"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const puerts_1 = require("puerts");
const UE = require("ue");
const StateMachine_1 = require("../../../../Core/Utils/StateMachine/StateMachine");
const RoleTriggerController_1 = require("../../../NewWorld/Character/Role/RoleTriggerController");
const PostProcessTriggerStateInside_1 = require("./PostProcessTriggerStateInside");
const PostProcessTriggerStateInsideToOutside_1 = require("./PostProcessTriggerStateInsideToOutside");
const PostProcessTriggerStateOutside_1 = require("./PostProcessTriggerStateOutside");
const PostProcessTriggerStateOutsideToInside_1 = require("./PostProcessTriggerStateOutsideToInside");
class PostProcessTrigger {
  constructor() {
    this.D1r = undefined;
    this.R1r = undefined;
    this.U1r = undefined;
    this.TransitionTime = -0;
    this.A1r = undefined;
    this.Lle = undefined;
    this.P1r = undefined;
    this.x1r = "";
    this.w1r = (t, s, e) => {
      if (this.B1r(s)) {
        this.A1r = 0;
      }
    };
    this.b1r = (t, s, e, i) => {
      if (this.B1r(s)) {
        this.A1r = 1;
      }
    };
  }
  Init(t, s, e, i, r, o) {
    this.x1r = o;
    this.P1r = r;
    this.Lle = new StateMachine_1.StateMachine(this);
    this.Lle.AddState(0, PostProcessTriggerStateInside_1.default);
    this.Lle.AddState(1, PostProcessTriggerStateOutside_1.default);
    this.Lle.AddState(2, PostProcessTriggerStateInsideToOutside_1.default);
    this.Lle.AddState(3, PostProcessTriggerStateOutsideToInside_1.default);
    this.Lle.Start(1);
    this.D1r = t;
    this.R1r = s;
    this.U1r = e;
    this.TransitionTime = i;
    this.A1r = 1;
    this.U1r.BlendWeight = 0;
    this.U1r.bUnbound = true;
    this.D1r.OnComponentBeginOverlapNoGcAlloc.Add(this.w1r);
    this.R1r.OnComponentEndOverlap.Add(this.b1r);
    var o = (0, puerts_1.$ref)(undefined);
    this.D1r.GetOverlappingActors(o);
    var h = (0, puerts_1.$unref)(o);
    if (h) {
      for (let t = 0; t < h.Num(); t++) {
        if (this.B1r(h.Get(t))) {
          this.A1r = 0;
        }
      }
    }
  }
  GetWuYinQuBattleKey() {
    return this.x1r;
  }
  GetWuYinQuBattleState() {
    return this.P1r;
  }
  GetPostProcessComponent() {
    return this.U1r;
  }
  B1r(t) {
    return !!UE.KismetSystemLibrary.IsValid(t) && t === RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger();
  }
  Tick(t) {
    if (this.Lle.CurrentState !== this.A1r) {
      if (this.Lle.CurrentState === 0) {
        this.Lle.Switch(2);
      } else if (this.Lle.CurrentState === 1) {
        this.Lle.Switch(3);
      }
    }
    this.Lle.Update(t);
  }
  Dispose() {
    this.D1r.OnComponentBeginOverlapNoGcAlloc.Remove(this.w1r);
    this.R1r.OnComponentEndOverlap.Remove(this.b1r);
  }
}
exports.default = PostProcessTrigger;
//# sourceMappingURL=PostProcessTrigger.js.map