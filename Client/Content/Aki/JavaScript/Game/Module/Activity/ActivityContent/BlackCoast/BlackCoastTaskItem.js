"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlackCoastTaskItem = undefined;
const UE = require("ue");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
class BlackCoastTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.bOe = undefined;
    this.JGe = () => new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    this.IOe = () => {
      SkipTaskManager_1.SkipTaskManager.RunByConfigId(this.Pe.JumpId);
    };
    this.qOe = () => {
      this.Pe.ReceiveDelegate?.(this.Pe.TaskId);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UIScrollViewWithScrollbarComponent]];
    this.BtnBindInfo = [[0, this.IOe], [1, this.qOe]];
  }
  OnStart() {
    this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(6), this.JGe);
  }
  Refresh(i, t, e) {
    this.Pe = i;
    this.bOe.RefreshByData(i.RewardList);
    var s = i.Status === 2;
    var r = i.Status === 0;
    var o = i.Status === 1;
    this.GetButton(1).RootUIComp.SetUIActive(r);
    this.GetItem(3).SetUIActive(s);
    this.GetItem(2).SetUIActive(o && i.JumpId === 0);
    this.GetButton(0).RootUIComp.SetUIActive(o && i.JumpId > 0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i.TitleTextId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "BlackCoastTheme_TaskProgress", i.Current, i.Target);
  }
}
exports.BlackCoastTaskItem = BlackCoastTaskItem;
//# sourceMappingURL=BlackCoastTaskItem.js.map