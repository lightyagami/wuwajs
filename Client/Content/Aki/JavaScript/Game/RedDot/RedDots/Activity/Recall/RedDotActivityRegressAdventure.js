"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotActivityRegressAdventure = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityControllerHolder_1 = require("../../../../Module/Activity/ActivityControllerHolder");
const RedDotBase_1 = require("../../../RedDotBase");
class RedDotActivityRegressAdventure extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.RecallActivityInfoUpdate];
  }
  OnCheck(e) {
    var t = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData?.CheckAdventureRedDot();
    var r = ActivityControllerHolder_1.ActivityControllerHolder.ActivityNewPlayerSupportController?.ActivityData;
    if (r) {
      return t || r.IsAdventureEntranceRedDot();
    } else {
      return t;
    }
  }
}
exports.RedDotActivityRegressAdventure = RedDotActivityRegressAdventure;
//# sourceMappingURL=RedDotActivityRegressAdventure.js.map