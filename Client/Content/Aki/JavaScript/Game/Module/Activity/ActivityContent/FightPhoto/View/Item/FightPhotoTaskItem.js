"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FightPhotoTaskItem = undefined;
const UE = require("ue");
const CommonItemSmallItemGrid_1 = require("../../../../../Common/ItemGrid/CommonItemSmallItemGrid");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../../../Util/ScrollView/GenericScrollViewNew");
class FightPhotoTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.T8e = undefined;
    this.OnRewardBtnClick = () => {};
    this.rOe = () => new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIScrollViewWithScrollbarComponent], [6, UE.UIItem]];
    this.BtnBindInfo = [[0, this.OnRewardBtnClick]];
  }
  OnStart() {
    this.T8e = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(4), this.rOe);
  }
  Refresh(t, e, i) {
    this.T8e.RefreshByData(t.RewardList, () => {
      this.T8e.ScrollToLeft(0);
    });
    this.GetItem(6)?.SetUIActive(t.IsUnclaimed);
    this.GetButton(0).RootUIComp.SetUIActive(t.IsUnclaimed);
    this.GetItem(2).SetUIActive(t.IsFinished);
    this.GetText(1).SetUIActive(t.IsDoing);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t.TaskName);
  }
}
exports.FightPhotoTaskItem = FightPhotoTaskItem;
//# sourceMappingURL=FightPhotoTaskItem.js.map