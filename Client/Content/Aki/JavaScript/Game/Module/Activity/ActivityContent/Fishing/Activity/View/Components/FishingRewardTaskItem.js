"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingRewardTaskItem = undefined;
const UE = require("ue");
const SkipTaskManager_1 = require("../../../../../../SkipInterface/SkipTaskManager");
const GridProxyAbstract_1 = require("../../../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../../../../Util/ScrollView/GenericScrollViewNew");
const ActivitySmallItemGrid_1 = require("../../../../UniversalComponents/ActivitySmallItemGrid");
const FINISHED_ITEM_ALPHA = 0.6;
const NORMAL_ITEM_ALPHA = 1;
class FishingRewardTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.sOn = undefined;
    this.bOe = undefined;
    this.JGe = () => new ActivitySmallItemGrid_1.ActivitySmallItemGrid();
    this.IOe = () => {
      SkipTaskManager_1.SkipTaskManager.RunByConfigId(this.sOn.JumpId);
    };
    this.qOe = () => {
      this.sOn.ReceiveDelegate?.(this.sOn.TaskId);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIButtonComponent], [0, UE.UIButtonComponent], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UIScrollViewWithScrollbarComponent], [7, UE.UIItem]];
    this.BtnBindInfo = [[1, this.IOe], [0, this.qOe]];
  }
  OnStart() {
    this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(6), this.JGe);
  }
  Refresh(i, t, e) {
    var r = (this.sOn = i).Status === 2;
    var s = i.Status === 0;
    var a = i.Status === 1;
    var h = [];
    for (const o of i.RewardList) {
      var l = {
        Item: o,
        HasClaimed: r
      };
      h.push(l);
    }
    this.bOe.RefreshByData(h);
    this.GetButton(0).RootUIComp.SetUIActive(s);
    this.GetItem(3).SetUIActive(r);
    this.GetText(2).SetUIActive(a && i.JumpId === 0);
    this.GetButton(1).RootUIComp.SetUIActive(a && i.JumpId !== 0);
    s = r ? FINISHED_ITEM_ALPHA : NORMAL_ITEM_ALPHA;
    this.GetItem(7).SetAlpha(s);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i.TitleTextId);
    this.GetText(5)?.SetText(i.Current + "/" + i.Target);
  }
}
exports.FishingRewardTaskItem = FishingRewardTaskItem;
//# sourceMappingURL=FishingRewardTaskItem.js.map