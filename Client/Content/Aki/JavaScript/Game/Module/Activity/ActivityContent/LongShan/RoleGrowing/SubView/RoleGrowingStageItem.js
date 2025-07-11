"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleGrowingStageItem = undefined;
const UE = require("ue");
const LongShanStageById_1 = require("../../../../../../../Core/Define/ConfigQuery/LongShanStageById");
const LevelGeneralCommons_1 = require("../../../../../../LevelGamePlay/LevelGeneralCommons");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
class RoleGrowingStageItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.StageId = e;
    this.OnClickStageDetail = undefined;
    this.qNn = () => {
      this.OnClickStageDetail?.(this.StageId);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem]];
  }
  OnStart() {
    var e = this.GetExtendToggle(0);
    e.SetCanClickWhenDisable(true);
    e.CanExecuteChange.Bind(() => false);
    e.OnPointUpCallBack.Bind(this.qNn);
  }
  Refresh(e) {
    var i = e.GetStageInfoById(this.StageId);
    var t = LongShanStageById_1.configLongShanStageById.GetConfig(this.StageId);
    var i = i === undefined;
    var s = e.GetProgress(this.StageId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "LongShanStage_ProgressPercentage02", s);
    this.GetItem(1).SetUIActive(s === 100);
    this.GetExtendToggle(0).SetToggleState(0);
    this.GetItem(5).SetUIActive(i);
    this.GetItem(6).SetUIActive(!i);
    if (i) {
      s = LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(t.OpenConditionId);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), s);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t.Title);
    }
    this.GetItem(4).SetUIActive(e.CheckStageRed(this.StageId));
  }
}
exports.RoleGrowingStageItem = RoleGrowingStageItem;
//# sourceMappingURL=RoleGrowingStageItem.js.map