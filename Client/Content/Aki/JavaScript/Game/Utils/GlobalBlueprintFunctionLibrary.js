"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const GlobalData_1 = require("../GlobalData");
class GlobalBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static GetBpEventManager() {
    return GlobalData_1.GlobalData.BpEventManager;
  }
  static GetBpFightManager() {
    return GlobalData_1.GlobalData.BpFightManager;
  }
}
exports.default = GlobalBlueprintFunctionLibrary;
//# sourceMappingURL=GlobalBlueprintFunctionLibrary.js.map