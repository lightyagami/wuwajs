"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRogueOp = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class MapRogueOp {
  constructor() {
    this.IncId = -1;
    this.Data = undefined;
    this.ExecuteInMapView = true;
    this.ExecuteAfterMapViewShow = false;
    this.CurrentStep = -1;
    this.OpExecuteClientId = 0;
    this.Priority = 1;
  }
  get Type() {
    return this.Data.OEc;
  }
  Update(t, e) {
    this.Data = t;
    this.IncId = this.Data.w5n;
    this.OnUpdate(e);
  }
  ToString() {
    return `IncId:${this.IncId} Type:${this.Data.OEc} Step:${this.CurrentStep}`;
  }
  get IsFinished() {
    return this.CurrentStep > this.StepSize;
  }
  get IsStartExecute() {
    return this.CurrentStep >= 0;
  }
  BattleStateUpdate(t, e) {
    this.OnBattleStateUpdate(t, e);
  }
  StartExecute(t) {
    if (this.OnBeforeStartExecuteCheck(t) && this.CurrentStep === -1) {
      this.i91(t);
    }
  }
  async i91(t) {
    if (this.ExecuteInMapView && t.ViewOpenPromise.IsPending()) {
      await t.ViewOpenPromise.Promise;
    }
    if (this.ExecuteAfterMapViewShow && (t.ViewShowPromise.IsPending() && (await t.ViewShowPromise.Promise), t.ViewLoadPromise.IsPending())) {
      await t.ViewLoadPromise.Promise;
    }
    this.CurrentStep = 0;
    this.OnStartExecute(t);
  }
  Execute(t, e) {
    if (!this.IsFinished) {
      this.CurrentStep++;
      if (this.CurrentStep > this.StepSize) {
        this.$ne(t, e);
      } else {
        this.OnExecute(t);
        e?.(true);
      }
    }
  }
  Delete(t) {
    this.OnDelete(t);
  }
  $ne(t, e) {
    this.OnFinish(t);
    this.ExecuteOp(e);
  }
  ExecuteOp(t) {
    ControllerHolder_1.ControllerHolder.MapRogueController.RequestExecuteOp(this.IncId, this.OpExecuteClientId, t);
  }
  ExecuteOpMultiSelect(t, e) {
    ControllerHolder_1.ControllerHolder.MapRogueController.RequestExecuteOpMultiSelect(this.IncId, t, e);
  }
  OnUpdate(t) {}
  OnBattleStateUpdate(t, e) {}
  OnStartExecute(t) {}
  OnExecute(t) {}
  OnFinish(t) {}
  OnDelete(t) {}
  OnBeforeStartExecuteCheck(t) {
    return true;
  }
}
exports.MapRogueOp = MapRogueOp;
//# sourceMappingURL=MapRogueOp.js.map