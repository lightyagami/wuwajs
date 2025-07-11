"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelGamePlayPrepareCountDownView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../Common/PublicUtil");
const LevelSequencePlayer_1 = require("../../Module/Common/LevelSequencePlayer");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
class LevelGamePlayPrepareCountDownView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.zkl = 3;
    this.SPe = undefined;
    this.yct = e => {
      switch (e) {
        case "Start01":
          if (--this.zkl > 0) {
            this.Jkl();
            this.SPe?.PlayLevelSequenceByName("Start01");
            AudioSystem_1.AudioSystem.PostEvent("play_ui_fx_com_count_number");
          } else {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.LevelGamePlayPrepareCountDownEnd);
            this.SPe?.PlayLevelSequenceByName("Start02");
            AudioSystem_1.AudioSystem.PostEvent("play_ui_fx_com_count_start");
          }
          break;
        case "Start02":
          this.CloseMe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIArtText], [1, UE.UIArtText], [2, UE.UIText]];
  }
  OnStart() {
    var e = this.OpenParam;
    this.zkl = e.CountDownNum;
    this.Jkl();
    if (e.TidText) {
      e = PublicUtil_1.PublicUtil.GetConfigTextByKey(e.TidText);
      this.GetText(2)?.SetText(e);
    }
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe.BindSequenceCloseEvent(this.yct);
  }
  OnAfterShow() {
    this.SPe?.PlayLevelSequenceByName("Start01");
    AudioSystem_1.AudioSystem.PostEvent("play_ui_fx_com_count_number");
  }
  Jkl() {
    this.GetArtText(0)?.SetText(this.zkl.toString());
    this.GetArtText(1)?.SetText(this.zkl.toString());
  }
}
exports.LevelGamePlayPrepareCountDownView = LevelGamePlayPrepareCountDownView;
//# sourceMappingURL=LevelGamePlayPrepareCountDownView.js.map