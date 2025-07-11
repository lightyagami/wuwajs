"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonEntranceTowerDefenceItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const CommonItemSmallItemGrid_1 = require("../Common/ItemGrid/CommonItemSmallItemGrid");
const LguiUtil_1 = require("../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../Util/ScrollView/GenericScrollViewNew");
class InstanceDungeonEntranceTowerDefenceItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Uth = undefined;
    this.Hzs = undefined;
    this.JGe = () => new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIButtonComponent], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIItem]];
  }
  OnStart() {
    this.Hzs = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(0), this.JGe);
    this.GetItem(3).SetUIActive(false);
    this.GetItem(5).SetUIActive(false);
    this.SetButtonUiActive(1, false);
    if (this.Uth) {
      this.RefreshItem(this.Uth.Data);
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "TowerDefence_Vison");
  }
  RefreshItem(e) {
    if (this.InAsyncLoading()) {
      this.Uth = {
        Data: e
      };
    } else {
      this.Hzs.RefreshByData(e, () => {
        for (const e of this.Hzs.GetScrollItemList()) {
          e.SetQuality();
          e.SetAllowClickBack(false);
        }
      });
    }
  }
}
exports.InstanceDungeonEntranceTowerDefenceItem = InstanceDungeonEntranceTowerDefenceItem;
//# sourceMappingURL=InstanceDungeonEntranceTowerDefenceItem.js.map