"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrastructureRoadRewardPanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GenericLayoutNew_1 = require("../../../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const InfrastructureRewardItem_1 = require("./InfrastructureRewardItem");
class InfrastructureRoadRewardPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.pji = undefined;
    this.JGe = (e, t, r) => {
      var i = new InfrastructureRewardItem_1.InfrastructureRewardItem();
      i.Initialize(t.GetOwner());
      i.Refresh(e, false, r);
      return {
        Key: r,
        Value: i
      };
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIGridLayout], [2, UE.UIItem]];
  }
  OnStart() {
    this.pji = new GenericLayoutNew_1.GenericLayoutNew(this.GetGridLayout(1), this.JGe);
  }
  RebuildRewardsByData(e) {
    this.pji.RebuildLayoutByDataNew(e);
  }
  SetTitleNewTxt(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e);
  }
}
exports.InfrastructureRoadRewardPanel = InfrastructureRoadRewardPanel;
//# sourceMappingURL=InfrastructureRoadRewardPanel.js.map