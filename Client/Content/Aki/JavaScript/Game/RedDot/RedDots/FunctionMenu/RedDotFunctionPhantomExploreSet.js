"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotFunctionPhantomExploreSet = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotFunctionPhantomExploreSet extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "BattleViewMenu";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RouletteRefreshNew];
  }
  OnCheck() {
    var e = ModelManager_1.ModelManager.RouletteModel.CheckHasAnyNewItem();
    var t = ModelManager_1.ModelManager.PhantomInteractModel.CheckAnyPhantomInteractUnlockRedDot();
    return e || t;
  }
}
exports.RedDotFunctionPhantomExploreSet = RedDotFunctionPhantomExploreSet;
//# sourceMappingURL=RedDotFunctionPhantomExploreSet.js.map