"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouletteFunctionOpenController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const MapRogueController_1 = require("../MapRogue/MapRogueController");
class RouletteFunctionOpenController {
  static OpenRelateView(e) {
    var o = this.Ucc.get(e);
    if (o) {
      o();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Functional", 37, "[FunctionRoulette] 查找不到对应FuncId打开界面的实现方式,请在RouletteFunctionOpenController中注册", ["功能ID", e]);
    }
  }
}
exports.RouletteFunctionOpenController = RouletteFunctionOpenController;
(_a = RouletteFunctionOpenController).Dcc = () => {
  if (ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsInWeeklyRogue()) {
    UiManager_1.UiManager.OpenView("WeeklyRogueInfo");
  }
};
RouletteFunctionOpenController.Hw1 = () => {
  if (MapRogueController_1.MapRogueController.CheckInMapRogueInstance()) {
    UiManager_1.UiManager.OpenView("RogueBattleSummary");
  }
};
RouletteFunctionOpenController.Ucc = new Map([[20001, _a.Dcc], [20002, _a.Hw1]]); //# sourceMappingURL=RouletteFunctionOpenController.js.map