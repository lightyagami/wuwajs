"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseSpecialRewardItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class TrapDefenseSpecialRewardItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.sft = undefined;
    this.SHc = () => {
      ControllerHolder_1.ControllerHolder.TrapDefenseController.RequestTrapDefenseSpecialRewardClaim(this.Pe.Id);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UISprite], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIButtonComponent]];
    this.BtnBindInfo = [[9, this.SHc]];
  }
  async OnBeforeStartAsync() {
    this.sft = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    await this.sft.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  Refresh(e) {
    var i;
    this.Pe = e;
    if (this.Pe) {
      this.GetButton(6).GetRootComponent().SetUIActive(false);
      this.GetButton(9).GetRootComponent().SetUIActive(e.State === 3);
      this.GetText(1).SetUIActive(e.State !== 3 && e.State !== 1);
      this.GetItem(8).SetUIActive(e.State === 1);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.Desc);
      i = e.ItemList[0];
      i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(i[0].ItemId);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i?.Name ?? "");
      this.sft.Refresh(e.ItemList[0]);
      this.GetText(4).SetText(e.CurrentProgress + "/" + e.TotalProgress);
      this.GetSprite(5).SetFillAmount(e.CurrentProgress / (e.TotalProgress || 1));
      this.GetItem(7).SetUIActive(false);
    }
  }
}
exports.TrapDefenseSpecialRewardItem = TrapDefenseSpecialRewardItem;
//# sourceMappingURL=TrapDefenseSpecialRewardItem.js.map