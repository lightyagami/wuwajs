"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryLoadingChecker = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const HonamiStoryUtil_1 = require("../../HonamiStory/HonamiStoryUtil");
class HonamiStoryLoadingChecker {
  CanHandle(e) {
    return HonamiStoryUtil_1.HonamiStoryUtil.CheckEnterOrExitHonamiStoryDungeon(e);
  }
  GetLoadingViewName(e) {
    return ModelManager_1.ModelManager.HonamiStoryModel.GetCurLoadViewName();
  }
}
exports.HonamiStoryLoadingChecker = HonamiStoryLoadingChecker;
//# sourceMappingURL=HonamiStoryLoadingChecker.js.map