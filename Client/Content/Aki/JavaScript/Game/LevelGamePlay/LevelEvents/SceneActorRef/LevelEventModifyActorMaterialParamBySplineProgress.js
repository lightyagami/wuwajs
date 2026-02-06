"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventModifyActorMaterialParamBySplineProgress = undefined;
const LevelGamePlayUtils_1 = require("../../LevelGamePlayUtils");
const LevelGeneralBase_1 = require("../../LevelGeneralBase");
class LevelEventModifyActorMaterialParamBySplineProgress extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, l) {
    l = LevelGamePlayUtils_1.LevelGamePlayUtils.GetEntityHandle(undefined, l)?.Entity?.CheckGetComponent(174);
    if (l) {
      l.HandleModifyActorMaterialParamBySplineProgress(e);
    }
  }
}
exports.LevelEventModifyActorMaterialParamBySplineProgress = LevelEventModifyActorMaterialParamBySplineProgress;
//# sourceMappingURL=LevelEventModifyActorMaterialParamBySplineProgress.js.map