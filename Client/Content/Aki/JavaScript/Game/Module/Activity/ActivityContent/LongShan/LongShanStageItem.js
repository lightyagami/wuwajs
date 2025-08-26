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
class LongShanStageItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, t) {
    super();
    this.xOe = 0;
    this.CNe = undefined;
    this.OnClickStageDetail = undefined;
    this.qNn = () => {
      this.OnClickStageDetail?.(this.xOe);
    };
    this.CNe = e;
    this.xOe = t;
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
    var t = this.CNe.GetStageInfoById(this.xOe);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.Title);
    var i = t === undefined;
    this.GetItem(5).SetUIActive(i);
    this.GetItem(8).SetUIActive(!i);
    var i = this.CNe.GetProgress(this.xOe);
    this.GetItem(4).SetUIActive(i === 100);
    if (!t) {
      t = LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(e.OpenConditionId);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), t);
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "LongShanStage_ProgressPercentage02", i);
    this.GetItem(7).SetUIActive(this.CNe.CheckStageRed(this.xOe));
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