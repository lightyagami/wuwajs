"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouletteFunctionOpenController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const HonamiStoryUtil_1 = require("../HonamiStory/HonamiStoryUtil");
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
  if (ControllerHolder_1.ControllerHolder.MapRogueController.CheckInMapRogueInstance()) {
    UiManager_1.UiManager.OpenView("RogueBattleSummary");
  }
};
RouletteFunctionOpenController.AKd = () => {
  if (ControllerHolder_1.ControllerHolder.SurvivorsRogueController.CheckInSurvivorsRogueInstance()) {
    UiManager_1.UiManager.OpenView("SurvivorsTabMainView");
  }
};
RouletteFunctionOpenController.Jwm = () => {
  if (HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryAreaDungeon()) {
    UiManager_1.UiManager.OpenView("HonamiStoryQuestView");
  }
};
RouletteFunctionOpenController.Ucc = new Map([[20001, _a.Dcc], [20002, _a.Hw1], [20004, _a.AKd], [20007, _a.Jwm]]); //# sourceMappingURL=RouletteFunctionOpenController.js.map