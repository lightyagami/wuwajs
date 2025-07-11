"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TsBlueprintGameBudgetObject = exports.BlueprintGameBudgetActor = undefined;
const Log_1 = require("../../../Core/Common/Log");
const GameBudgetInterfaceController_1 = require("../../../Core/GameBudgetAllocator/GameBudgetInterfaceController");
class BlueprintGameBudgetActor {
  constructor() {
    this.ScheduledTick = undefined;
  }
}
exports.BlueprintGameBudgetActor = BlueprintGameBudgetActor;
class TsBlueprintGameBudgetObject {
  constructor(e) {
    this.Actor = e;
    this.ScheduledAfterTick = undefined;
    this.OnEnabledChange = undefined;
    this.OnWasRecentlyRenderedOnScreenChange = undefined;
    this.LocationProxyFunction = undefined;
    this.my1 = false;
  }
  RegisterTick(e) {
    if (this.my1) {
      return 0;
    } else {
      this.my1 = true;
      return GameBudgetInterfaceController_1.GameBudgetInterfaceController.RegisterTick(e.GroupName, e.SignificanceGroup, this, this.Actor);
    }
  }
  UnregisterTick() {
    if (this.my1) {
      this.my1 = false;
      GameBudgetInterfaceController_1.GameBudgetInterfaceController.UnregisterTick(this);
    }
  }
  ScheduledTick(e, t, r) {
    if (this.Actor?.IsValid()) {
      this.Actor.ScheduledTick(e);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Game", 36, "TsBlueprintGameBudgetObject Tick Invalid Actor");
      }
      this.UnregisterTick();
    }
  }
}
exports.TsBlueprintGameBudgetObject = TsBlueprintGameBudgetObject;
//# sourceMappingURL=TsBlueprintGameBudgetObject.js.map