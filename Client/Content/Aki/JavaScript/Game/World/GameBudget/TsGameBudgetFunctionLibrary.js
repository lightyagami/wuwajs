"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const GameBudgetAllocatorConfigCreator_1 = require("../Define/GameBudgetAllocatorConfigCreator");
const TsBlueprintGameBudgetObject_1 = require("./TsBlueprintGameBudgetObject");
class TsGameBudgetFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static RegisterGameBudget(t, r) {
    if ("ScheduledTick" in t) {
      let e = undefined;
      e = r ? GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsCollisionPlantConfig : GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsNormalEntityGroupConfig;
      r = new TsBlueprintGameBudgetObject_1.TsBlueprintGameBudgetObject(t);
      if (r.RegisterTick(e)) {
        TsGameBudgetFunctionLibrary.TsGameBudgetObjectMap.set(t, r);
      }
    }
  }
  static UnregisterGameBudget(e) {
    var t;
    if (TsGameBudgetFunctionLibrary.TsGameBudgetObjectMap.has(e)) {
      if (t = TsGameBudgetFunctionLibrary.TsGameBudgetObjectMap.get(e)) {
        t.UnregisterTick();
      }
      TsGameBudgetFunctionLibrary.TsGameBudgetObjectMap.delete(e);
    }
  }
}
TsGameBudgetFunctionLibrary.TsGameBudgetObjectMap = new Map();
exports.default = TsGameBudgetFunctionLibrary; //# sourceMappingURL=TsGameBudgetFunctionLibrary.js.map