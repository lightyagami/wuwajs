"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightTaskItem = undefined;
const UE = require("ue");
const CommonItemSmallItemGrid_1 = require("../../../../../Common/ItemGrid/CommonItemSmallItemGrid");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../../../Util/ScrollView/GenericScrollViewNew");
class MotorFightTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.T8e = undefined;
    this.OnRewardBtnClick = () => {};
    this.rOe = () => new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[4, UE.UIButtonComponent], [1, UE.UIText], [6, UE.UIText], [5, UE.UISprite], [0, UE.UIText], [2, UE.UIScrollViewWithScrollbarComponent], [7, UE.UIItem]];
    this.BtnBindInfo = [[4, this.OnRewardBtnClick]];
  }
  OnStart() {
    this.T8e = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(2), this.rOe);
  }
  Refresh(t, i, e) {
    this.T8e.RefreshByData(t.RewardList, () => {
      this.T8e.ScrollToLeft(0);
    });
    this.GetItem(7)?.SetUIActive(t.IsUnclaimed);
    this.GetButton(4).RootUIComp.SetUIActive(t.IsUnclaimed);
    this.GetSprite(5).SetUIActive(t.IsFinished);
    this.GetText(6).SetUIActive(t.IsDoing);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.TaskName);
    this.GetText(1)?.SetUIActive(t.Target !== 0);
    this.GetText(1)?.SetText(t.Current + "/" + t.Target);
  }
}
exports.MotorFightTaskItem = MotorFightTaskItem;
//# sourceMappingURL=MotorFightTaskItem.js.map