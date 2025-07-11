"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckDangoAbyssProgress = exports.LevelConditionOnDangoAbyssEquipPluginWithInvalid = exports.LevelConditionOnDangoAbyssEquipPluginWithValidChange = exports.LevelConditionCheckDangoAbyssHasItemByType = exports.LevelConditionOnDangoAbyssEnterWithTeamExploreBtn = exports.LevelConditionOnDangoAbyssPluginRoleSelect = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnDangoAbyssPluginRoleSelect extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...s) {
    s = s[0];
    e = Number(e.LimitParams?.get("Index"));
    return e !== undefined && !isNaN(e) && !!s && !ModelManager_1.ModelManager.DangoAbyssModel.GetSlotLockState(s, e);
  }
}
exports.LevelConditionOnDangoAbyssPluginRoleSelect = LevelConditionOnDangoAbyssPluginRoleSelect;
class LevelConditionOnDangoAbyssEnterWithTeamExploreBtn extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...s) {
    var [s] = s;
    return s;
  }
}
exports.LevelConditionOnDangoAbyssEnterWithTeamExploreBtn = LevelConditionOnDangoAbyssEnterWithTeamExploreBtn;
class LevelConditionCheckDangoAbyssHasItemByType extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    e = Number(e.LimitParams?.get("Type"));
    return e !== undefined && !isNaN(e) && ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemListByType(e).length > 0;
  }
}
exports.LevelConditionCheckDangoAbyssHasItemByType = LevelConditionCheckDangoAbyssHasItemByType;
class LevelConditionOnDangoAbyssEquipPluginWithValidChange extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...s) {
    var [, s] = s;
    return s;
  }
}
exports.LevelConditionOnDangoAbyssEquipPluginWithValidChange = LevelConditionOnDangoAbyssEquipPluginWithValidChange;
class LevelConditionOnDangoAbyssEquipPluginWithInvalid extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...s) {
    var [s] = s;
    return s;
  }
}
exports.LevelConditionOnDangoAbyssEquipPluginWithInvalid = LevelConditionOnDangoAbyssEquipPluginWithInvalid;
class LevelConditionCheckDangoAbyssProgress extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    e = Number(e.LimitParams?.get("Progress"));
    return e !== undefined && !isNaN(e) && (ModelManager_1.ModelManager.DangoAbyssModel.GetCurrentOpenAbyssActivityData()?.GetCanChallengeIdList().length ?? 0) >= e + 1;
  }
}
exports.LevelConditionCheckDangoAbyssProgress = LevelConditionCheckDangoAbyssProgress;
//# sourceMappingURL=LevelConditionDangoAbyssGuide.js.map