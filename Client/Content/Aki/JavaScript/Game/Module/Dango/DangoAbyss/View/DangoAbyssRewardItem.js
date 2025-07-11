"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssRewardItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
class DangoAbyssRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.$Tt = undefined;
    this.s4e = undefined;
    this.W2e = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
    this.nqe = () => {
      this.$Tt?.ClickFunction?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIText], [7, UE.UIScrollViewWithScrollbarComponent], [8, UE.UIItem], [9, UE.UIItem]];
    this.BtnBindInfo = [[2, this.nqe]];
  }
  OnStart() {
    this.s4e = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(7), this.W2e);
  }
  Refresh(e, t, i) {
    if ((this.$Tt = e).NameTextArgs) {
      this.GetText(6).SetText(e.NameTextArgs[0] + "/" + e.NameTextArgs[1]);
      this.GetText(5).SetText(e.NameText ?? "");
    }
    this.GetButton(2).RootUIComp.SetUIActive(e.RewardState === 1);
    this.GetItem(3)?.SetUIActive(e.RewardState === 0);
    this.GetItem(4)?.SetUIActive(e.RewardState === 2);
    this.GetItem(1)?.SetUIActive(e.RewardButtonRedDot ?? false);
    this.s4e?.RefreshByData(e.RewardList ?? []);
    var r = e.RewardState !== 2 ? "SP_ItemBgNor" : "SP_ItemBgFinish";
    var r = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourceConfig(r).Path;
    this.SetSpriteByPath(r, this.GetSprite(0), false);
    this.GetItem(9)?.SetUIActive(e.RewardState === 2);
  }
}
exports.DangoAbyssRewardItem = DangoAbyssRewardItem;
//# sourceMappingURL=DangoAbyssRewardItem.js.map