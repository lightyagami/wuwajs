"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotDirectTrainProEntry = exports.RedDotDirectTrainPro = exports.RedDotDirectTrain = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityDirectTrainHelper_1 = require("../../../../Module/Activity/ActivityContent/DirectTrain/ActivityDirectTrainHelper");
const RedDotBase_1 = require("../../../RedDotBase");
class RedDotDirectTrain extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.ActivityDirectTrainRedDotUpdate];
  }
  OnCheck(e) {
    e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
    return e !== undefined && e.IsShowRedDot();
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
    return !!e && e !== 0 && !!ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.IsProOpen && ModelManager_1.ModelManager.ActivityDirectTrainModel.CheckDirectTrainProRedDotById(e);
  }
}
exports.RedDotDirectTrainPro = RedDotDirectTrainPro;
class RedDotDirectTrainProEntry extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.ActivityDirectTrainRedDotUpdate];
  }
  IsAllEventParamAsUId() {
    return false;
  }
  OnCheck(e) {
    return !!ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.IsProOpen && ModelManager_1.ModelManager.ActivityDirectTrainModel.CheckDirectTrainProEntryRedDot();
  }
}
exports.RedDotDirectTrainProEntry = RedDotDirectTrainProEntry;
//# sourceMappingURL=RedDotDirectTrain.js.map