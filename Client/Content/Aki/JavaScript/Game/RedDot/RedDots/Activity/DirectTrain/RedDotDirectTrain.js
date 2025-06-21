"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RedDotDirectTrainPro = exports.RedDotDirectTrain = void 0;
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  LocalStorage_1 = require("../../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine"),
  ActivityDirectTrainHelper_1 = require("../../../../Module/Activity/ActivityContent/DirectTrain/ActivityDirectTrainHelper"),
  RedDotBase_1 = require("../../../RedDotBase");
class RedDotDirectTrain extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.ActivityDirectTrainRedDotUpdate]
  }
  OnCheck(e) {
    var t = ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.GetActivityData();
    return void 0 !== t && t.IsShowRedDot()
  }
}
exports.RedDotDirectTrain = RedDotDirectTrain;
class RedDotDirectTrainPro extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "BattleViewMenu"
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.ActivityDirectTrainRedDotUpdate]
  }
  OnCheck(e) {
    var t;
    return !(!ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.IsProOpen || void 0 !== (t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.DirectTrainGotoRedDotHaveDisplayed)) && t)
  }
}
exports.RedDotDirectTrainPro = RedDotDirectTrainPro;
//# sourceMappingURL=RedDotDirectTrain.js.map