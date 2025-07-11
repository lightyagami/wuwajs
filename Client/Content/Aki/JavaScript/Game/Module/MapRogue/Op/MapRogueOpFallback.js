"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRogueOpFallback = undefined;
const UiManager_1 = require("../../../Ui/UiManager");
const MapRogueOp_1 = require("./MapRogueOp");
class MapRogueOpFallback extends MapRogueOp_1.MapRogueOp {
  constructor() {
    super(...arguments);
    this.StepSize = 1;
    this.AutoFinish = true;
    this.ExecuteInMapView = false;
  }
  ToString() {
    return `[Fallback] IncId:${this.IncId} Step:${this.CurrentStep}`;
  }
  OnUpdate() {}
  OnStartExecute(e) {
    UiManager_1.UiManager.OpenView("RogueBattleFallbackView", this.IncId);
  }
  OnExecute(e) {
    if (this.AutoFinish) {
      this.Execute(e);
    }
  }
  OnFinish(e) {}
  OnDelete(e) {
    if (UiManager_1.UiManager.IsViewOpen("RogueBattleFallbackView")) {
      UiManager_1.UiManager.CloseView("RogueBattleFallbackView");
    }
  }
}
exports.MapRogueOpFallback = MapRogueOpFallback;
//# sourceMappingURL=MapRogueOpFallback.js.map