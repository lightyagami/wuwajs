"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotDirectTrainPro = exports.RedDotDirectTrain = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const LocalStorage_1 = require("../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const ActivityDirectTrainHelper_1 = require("../../../../Module/Activity/ActivityContent/DirectTrain/ActivityDirectTrainHelper");
const RedDotBase_1 = require("../../../RedDotBase");
class RedDotDirectTrain extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.ActivityDirectTrainRedDotUpdate];
  }
  OnCheck(e) {
    var t = ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.GetActivityData();
    return t !== undefined && t.IsShowRedDot();
  }
}
exports.RedDotDirectTrain = RedDotDirectTrain;
class RedDotDirectTrainPro extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "BattleViewMenu";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.ActivityDirectTrainRedDotUpdate];
  }
  OnCheck(e) {
    var t;
    return !!ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.IsProOpen && ((t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.DirectTrainGotoRedDotHaveDisplayed)) === undefined || !t);
  }
}
exports.RedDotDirectTrainPro = RedDotDirectTrainPro;
//# sourceMappingURL=RedDotDirectTrain.js.map