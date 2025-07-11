"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionChangeTimerHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbAddTime_1 = require("./FbAddTime");
const FbReduceTime_1 = require("./FbReduceTime");
const FbSetTime_1 = require("./FbSetTime");
class UnionChangeTimerHelper {
  static GetUnionChangeTimerObject(e) {
    switch (e) {
      case fb_action_1.UnionChangeTimer.AddTime:
        return new fb_action_1.AddTime();
      case fb_action_1.UnionChangeTimer.ReduceTime:
        return new fb_action_1.ReduceTime();
      case fb_action_1.UnionChangeTimer.SetTime:
        return new fb_action_1.SetTime();
      default:
        return;
    }
  }
  static ReadUnionChangeTimer(e, i) {
    if (i !== undefined) {
      switch (e) {
        case fb_action_1.UnionChangeTimer.AddTime:
          return FbAddTime_1.FbAddTime.Create(i);
        case fb_action_1.UnionChangeTimer.ReduceTime:
          return FbReduceTime_1.FbReduceTime.Create(i);
        case fb_action_1.UnionChangeTimer.SetTime:
          return FbSetTime_1.FbSetTime.Create(i);
        default:
          return;
      }
    }
  }
}
exports.UnionChangeTimerHelper = UnionChangeTimerHelper;
//# sourceMappingURL=UnionChangeTimerHelper.js.map