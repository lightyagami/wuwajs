"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FragmentMemoryEntranceRedDot = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class FragmentMemoryEntranceRedDot extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.FragmentRewardEntranceRedDot];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.FragmentMemoryModel.GetRedDotState();
  }
}
exports.FragmentMemoryEntranceRedDot = FragmentMemoryEntranceRedDot;
//# sourceMappingURL=FragmentMemoryEntranceRedDot.js.map