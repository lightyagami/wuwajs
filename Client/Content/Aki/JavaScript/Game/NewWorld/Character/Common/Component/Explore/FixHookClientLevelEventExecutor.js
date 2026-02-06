"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FixHookClientLevelEventExecutor = undefined;
const LevelGeneralContextDefine_1 = require("../../../../../LevelGamePlay/LevelGeneralContextDefine");
const LevelGeneralController_1 = require("../../../../../LevelGamePlay/LevelGeneralController");
class FixHookClientLevelEventExecutor {
  static T3g(e, t) {
    switch (e) {
      case 0:
        return t?.ClientHookActionConfig?.HookActions;
      case 1:
        return t?.ClientHookActionConfig?.ExitHookActions;
      case 2:
        return t?.ClientHookActionConfig?.FinishActions;
    }
  }
  static ExecuteHookActions(e, t) {
    var l = t.GetHookInteractConfig();
    var e = FixHookClientLevelEventExecutor.T3g(e, l);
    if (e && e.length !== 0) {
      l = t.Entity.Id;
      LevelGeneralController_1.LevelGeneralController.ExecuteActionsNew(e, LevelGeneralContextDefine_1.EntityContext.Create(l));
    }
  }
}
exports.FixHookClientLevelEventExecutor = FixHookClientLevelEventExecutor;
//# sourceMappingURL=FixHookClientLevelEventExecutor.js.map