"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelGamePlayMotorPrepareCountDownView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../Common/PublicUtil");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const LevelGamePlayPrepareCountDownDefine_1 = require("./LevelGamePlayPrepareCountDownDefine");
class LevelGamePlayMotorPrepareCountDownView extends UiViewBase_1.UiViewBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  GetExtraResourceId(e) {
    if (e.UiStyle) {
      return LevelGamePlayPrepareCountDownDefine_1.countDownUiStyleToResourceId[e.UiStyle] ?? "";
    } else {
      return "";
    }
  }
  OnStart() {
    var e = this.OpenParam;
    if (e.TidText) {
      e = PublicUtil_1.PublicUtil.GetConfigTextByKey(e.TidText);
      this.GetText(0)?.SetText(e);
    }
  }
  OnAfterPlayStartSequence() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.LevelGamePlayPrepareCountDownEnd);
    this.CloseMe();
  }
}
exports.LevelGamePlayMotorPrepareCountDownView = LevelGamePlayMotorPrepareCountDownView;
//# sourceMappingURL=LevelGamePlayMotorPrepareCountDownView.js.map