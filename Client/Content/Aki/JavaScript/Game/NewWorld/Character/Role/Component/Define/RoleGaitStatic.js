"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleGaitStatic = undefined;
const CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById");
const WALK_TO_RUN_RATE = 0.3;
class RoleGaitStatic {
  static Init() {
    if (!RoleGaitStatic.IsInit) {
      RoleGaitStatic.MovementStatusGapValue = CommonParamById_1.configCommonParamById.GetFloatConfig("Move_Status_GapValue_GamePad");
      RoleGaitStatic.MovementStatusGapValueSquare = RoleGaitStatic.MovementStatusGapValue * RoleGaitStatic.MovementStatusGapValue;
      RoleGaitStatic.IsInit = true;
    }
  }
  static SetWalkOrRunRateForRocker(t) {
    RoleGaitStatic.Mir = Math.min(t, 0.99);
  }
  static GetWalkOrRunRate() {
    return RoleGaitStatic.Mir;
  }
}
(exports.RoleGaitStatic = RoleGaitStatic).MovementStatusGapValue = 0;
RoleGaitStatic.MovementStatusGapValueSquare = 0;
RoleGaitStatic.IsInit = false;
RoleGaitStatic.Mir = WALK_TO_RUN_RATE; //# sourceMappingURL=RoleGaitStatic.js.map