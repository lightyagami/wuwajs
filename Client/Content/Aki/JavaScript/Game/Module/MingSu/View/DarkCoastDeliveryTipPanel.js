"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DarkCoastDeliveryTipPanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const SkipTaskManager_1 = require("../../SkipInterface/SkipTaskManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
class DarkCoastDeliveryTipPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.kQa = () => {
      SkipTaskManager_1.SkipTaskManager.RunByConfigId(this.Pe.Config.JumpId);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIItem]];
    this.BtnBindInfo = [[4, this.kQa]];
  }
  RefreshUi(i) {
    this.Pe = i;
    this.SetTextureShowUntilLoaded(i.Config.TipIcon, this.GetTexture(0));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.Config.TipName);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i.Config.TipDesc);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), i.Config.UnlockCondition);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "DarkShoreRewardNumber", i.Config.RewardCount);
    i = i.GetDarkCoastDeliveryGuardState();
    this.GetItem(5).SetUIActive(i === 0);
    this.GetButton(4).RootUIComp.SetUIActive(i !== 0);
    this.GetItem(7).SetUIActive(i === 3);
    this.GetItem(8).SetUIActive(i === 4);
  }
}
exports.DarkCoastDeliveryTipPanel = DarkCoastDeliveryTipPanel;
//# sourceMappingURL=DarkCoastDeliveryTipPanel.js.map