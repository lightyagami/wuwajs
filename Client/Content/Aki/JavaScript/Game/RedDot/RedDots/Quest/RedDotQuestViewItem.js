"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotQuestViewItem = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotQuestViewItem extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnQuestRedDotStateChange];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.QuestNewModel.CheckQuestRedDotDataState(e) ?? false;
  }
}
exports.RedDotQuestViewItem = RedDotQuestViewItem;
//# sourceMappingURL=RedDotQuestViewItem.js.map