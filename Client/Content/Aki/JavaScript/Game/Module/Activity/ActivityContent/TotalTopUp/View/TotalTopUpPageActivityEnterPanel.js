"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TotalTopUpPageActivityEnterPanel = undefined;
const UE = require("ue");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
const RedDotController_1 = require("../../../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
class TotalTopUpPageActivityEnterPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.Cfe = 0;
    this.eTt = () => {
      ActivityControllerHolder_1.ActivityControllerHolder.TotalTopUpController?.SkipToCurrentActivityView();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIText], [2, UE.UIItem], [0, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.eTt]];
  }
  async OnBeforeStartAsync() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    return Promise.resolve();
  }
  OnStart() {
    var e = ActivityControllerHolder_1.ActivityControllerHolder.TotalTopUpController?.GetSingleActivityData();
    this.Cfe = e?.EndOpenTime ?? 0;
    RedDotController_1.RedDotController.BindRedDot("CommonActivityPage", this.GetItem(2), undefined, e?.Id ?? 0);
  }
  OnAfterHide() {
    RedDotController_1.RedDotController.UnBindGivenUi("CommonActivityPage", this.GetItem(2));
  }
  PlayStartSequence() {
    if (this.GetActive()) {
      this.SPe?.PlayLevelSequenceByName("Start");
    }
  }
  OnTick() {
    var e;
    if (this.GetActive()) {
      e = TimeUtil_1.TimeUtil.GetServerTime();
      if ((e = this.Cfe - e) < 0) {
        this.SetActive(false);
      } else {
        this.SetActive(true);
        this.RefreshTime(e);
      }
    }
  }
  RefreshTime(e) {
    var e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(e);
    var t = this.GetText(1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, "TotalTopUp_1002", e.CountDownText ?? "");
  }
}
exports.TotalTopUpPageActivityEnterPanel = TotalTopUpPageActivityEnterPanel;
//# sourceMappingURL=TotalTopUpPageActivityEnterPanel.js.map