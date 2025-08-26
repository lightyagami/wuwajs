"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IntroductionRedDot = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class IntroductionRedDot extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.SdkIntroductionRedPointRefresh];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.KuroSdkModel.IntroductionNoticeState;
  }
}
exports.IntroductionRedDot = IntroductionRedDot;
//# sourceMappingURL=IntroductionRedDot.js.map