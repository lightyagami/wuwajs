"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.skipConditionCheckerMap = exports.TeleportStateConditionChecker = exports.QuestStateConditionChecker = exports.SystemFunctionConditionChecker = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
class SystemFunctionConditionChecker {
  Parse(e) {
    return {
      ConditionType: 1,
      FunctionType: e[0]
    };
  }
  Check(e) {
    e = this.Parse(e).FunctionType;
    return ModelManager_1.ModelManager.FunctionModel.IsOpen(e);
  }
}
exports.SystemFunctionConditionChecker = SystemFunctionConditionChecker;
class QuestStateConditionChecker {
  Parse(e) {
    return {
      ConditionType: 2,
      QuestId: e[0],
      CheckQuestState: e[1]
    };
  }
  Check(e) {
    var e = this.Parse(e);
    var t = e.QuestId;
    var e = e.CheckQuestState;
    var t = ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(t);
    if (e === 0) {
      return !t;
    } else {
      return t;
    }
  }
}
exports.QuestStateConditionChecker = QuestStateConditionChecker;
class TeleportStateConditionChecker {
  Parse(e) {
    return {
      ConditionType: 3,
      MarkId: e[0],
      CheckTeleportState: e[1]
    };
  }
  Check(e) {
    var e = this.Parse(e);
    var t = e.MarkId;
    var e = e.CheckTeleportState;
    var t = ModelManager_1.ModelManager.MapModel.CheckTeleportUnlocked(t) ?? false;
    if (e === 0) {
      return !t;
    } else {
      return t;
    }
  }
}
exports.TeleportStateConditionChecker = TeleportStateConditionChecker;
exports.skipConditionCheckerMap = new Map([[1, new SystemFunctionConditionChecker()], [2, new QuestStateConditionChecker()], [3, new TeleportStateConditionChecker()]]); //# sourceMappingURL=SkipConditionDefine.js.map