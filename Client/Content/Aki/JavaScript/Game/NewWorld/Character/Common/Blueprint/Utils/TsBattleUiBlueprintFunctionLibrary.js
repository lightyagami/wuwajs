"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
class TsBattleUiBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static GetBattleScoreStr() {
    var e = ModelManager_1.ModelManager.BattleScoreModel?.GetCurScoreId();
    if (e) {
      return `Id:${e},Score:${ModelManager_1.ModelManager.BattleScoreModel?.GetScore(e) ?? 0}`;
    } else {
      return "";
    }
  }
}
exports.default = TsBattleUiBlueprintFunctionLibrary;
//# sourceMappingURL=TsBattleUiBlueprintFunctionLibrary.js.map