"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LongShanStageItem = undefined;
const UE = require("ue");
const LongShanStageById_1 = require("../../../../../Core/Define/ConfigQuery/LongShanStageById");
const LevelGeneralCommons_1 = require("../../../../LevelGamePlay/LevelGeneralCommons");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ActivityLongShanController_1 = require("./ActivityLongShanController");
class LongShanStageItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.xOe = 0;
    this.OnClickStageDetail = undefined;
    this.qNn = () => {
      this.OnClickStageDetail?.(this.xOe);
    };
    this.xOe = e;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIItem]];
    this.BtnBindInfo = [[0, this.qNn]];
  }
  OnStart() {
    this.RefreshState();
  }
  RefreshState() {
    var e = LongShanStageById_1.configLongShanStageById.GetConfig(this.xOe);
    var t = ActivityLongShanController_1.ActivityLongShanController.GetActivityData();
    var i = t.GetStageInfoById(this.xOe);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.Title);
    var n = i === undefined;
    this.GetItem(5).SetUIActive(n);
    this.GetItem(8).SetUIActive(!n);
    var n = t.GetProgress(this.xOe);
    this.GetItem(4).SetUIActive(n === 100);
    if (!i) {
      i = LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(e.OpenConditionId);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), i);
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "LongShanStage_ProgressPercentage02", n);
    this.GetItem(7).SetUIActive(t.CheckStageRed(this.xOe));
  }
  SetButtonInteractive(e) {
    this.GetButton(0)?.SetSelfInteractive(e);
  }
  GetLongShanButton() {
    return this.GetButton(0).RootUIComp;
  }
}
exports.LongShanStageItem = LongShanStageItem;
//# sourceMappingURL=LongShanStageItem.js.map