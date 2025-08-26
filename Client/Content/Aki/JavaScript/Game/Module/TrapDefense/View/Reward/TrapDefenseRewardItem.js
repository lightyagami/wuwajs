"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseRewardItem = undefined;
const UE = require("ue");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
class TrapDefenseRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.yHc = undefined;
    this.OnClaimRewardCallback = undefined;
    this.SHc = () => {
      this.OnClaimRewardCallback?.(this.Pe);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIScrollViewWithScrollbarComponent], [6, UE.UIItem], [7, UE.UIButtonComponent], [8, UE.UIText]];
    this.BtnBindInfo = [[7, this.SHc]];
  }
  OnStart() {
    this.yHc = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(5), () => new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid());
  }
  Refresh(e, i, t) {
    this.Pe = e;
    if (this.Pe) {
      this.GetButton(0).GetRootComponent().SetUIActive(false);
      this.GetButton(7).GetRootComponent().SetUIActive(e.State === 3);
      this.GetText(1).SetUIActive(e.State !== 3 && e.State !== 1);
      if (e.State === 0) {
        this.GetText(1).SetText(e.GetUnlockRemainTimeStr());
      }
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e.Desc);
      this.GetItem(6).SetUIActive(false);
      this.GetItem(3).SetUIActive(e.State === 1);
      this.GetSprite(2).SetUIActive(e.State === 1);
      this.GetText(8).SetText(e.CurProgress + "/" + e.Target);
      this.yHc.RefreshByData(e.ItemList);
    }
  }
}
exports.TrapDefenseRewardItem = TrapDefenseRewardItem;
//# sourceMappingURL=TrapDefenseRewardItem.js.map