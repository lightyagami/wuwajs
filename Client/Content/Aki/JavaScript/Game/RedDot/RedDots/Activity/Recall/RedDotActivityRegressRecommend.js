"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotActivityRegressRecommend = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotBase_1 = require("../../../RedDotBase");
class RedDotActivityRegressRecommend extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.RecallActivityInfoUpdate];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.ActivityRegressModel.ActivityData?.CheckRecommendRedDot();
  }
}
exports.RedDotActivityRegressRecommend = RedDotActivityRegressRecommend;
//# sourceMappingURL=RedDotActivityRegressRecommend.js.map