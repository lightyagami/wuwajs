"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotRogueResIllustrated = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotRogueResIllustrated extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.PermanentRogueRewardUpdate];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.ActivityPermanentRogueModel.CheckIllustratedRedDot();
  }
}
exports.RedDotRogueResIllustrated = RedDotRogueResIllustrated;
//# sourceMappingURL=RedDotRogueResIllustrated.js.map