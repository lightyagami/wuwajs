"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotFriendNewApplication = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotFriendNewApplication extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "FunctionFriend";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RefreshFriendApplicationRedDot, EventDefine_1.EEventName.UpdateFriendViewShow];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.FriendModel.HasNewFriendApplication();
  }
}
exports.RedDotFriendNewApplication = RedDotFriendNewApplication;
//# sourceMappingURL=RedDotFriendNewApplication.js.map