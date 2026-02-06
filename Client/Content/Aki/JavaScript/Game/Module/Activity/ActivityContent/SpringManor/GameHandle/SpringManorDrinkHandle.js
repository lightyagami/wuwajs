"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorDrinkHandle = undefined;
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
class SpringManorDrinkHandle {
  GetCurrentProgress() {
    return ModelManager_1.ModelManager.SpringManorModel?.ActivityData.GetDrinksCurrentProgress() ?? 0;
  }
  GetTotalProgress() {
    return ModelManager_1.ModelManager.SpringManorModel?.ActivityData.GetDrinksTotalProgress() ?? 0;
  }
  EnterGame() {
    ControllerHolder_1.ControllerHolder.DrinksController.OpenMainView(1);
  }
  GetRedDotName() {
    return "DrinksUnlockLevel";
  }
}
exports.SpringManorDrinkHandle = SpringManorDrinkHandle;
//# sourceMappingURL=SpringManorDrinkHandle.js.map