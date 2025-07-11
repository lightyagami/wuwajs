"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotFlySkinChildTab = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotBase_1 = require("../../../RedDotBase");
class RedDotFlySkinChildTab extends RedDotBase_1.RedDotBase {
  IsMultiple() {
    return true;
  }
  OnGetParentName() {
    return "FlySkinTab";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RefreshFlySkinChildTabRed];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.FlySkinModel.CheckFlySkinHasRedDotBySkinType(e);
  }
}
exports.RedDotFlySkinChildTab = RedDotFlySkinChildTab;
//# sourceMappingURL=RedDotFlySkinChildTab.js.map