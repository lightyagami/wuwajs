"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemHonamiMainView = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const UiManager_1 = require("../../../Ui/UiManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemHonamiMainView extends OpenSystemBase_1.OpenSystemBase {
  GetViewName(e, a) {
    return "HonamiStorySmallLoadingView";
  }
  async ExecuteOpenView(e, a) {
    if (e.FightPreparationEntityId && e.FightPreparationUiCamera) {
      e = {
        TalkEntityId: e.FightPreparationEntityId,
        UiCameraName: e.FightPreparationUiCamera
      };
      if (a?.Type === 9) {
        UiManager_1.UiManager.OpenViewByPlot("HonamiStoryMainView", e);
      } else {
        await UiManager_1.UiManager.OpenViewAsync("HonamiStorySmallLoadingView", e);
      }
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HonamiStory", 78, "打开界面配置异常，【穗波奇妙物语作战准备界面】类型界面需要有【作战准备界面UI相机】配置");
      }
      return false;
    }
  }
}
exports.OpenSystemHonamiMainView = OpenSystemHonamiMainView;
//# sourceMappingURL=OpenSystemHonamiMainView.js.map