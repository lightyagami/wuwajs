"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchTaskItem = undefined;
const UE = require("ue");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
class FloroRanchTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.OnGetBtnClick = () => {};
    this.T8e = undefined;
    this.rOe = () => new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    this.nIu = () => {
      SkipTaskManager_1.SkipTaskManager.RunByConfigId(this.Pe.JumpId);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIText], [6, UE.UISprite], [7, UE.UIItem], [8, UE.UIButtonComponent]];
    this.BtnBindInfo = [[4, this.OnGetBtnClick], [8, this.nIu]];
  }
  OnStart() {
    this.T8e = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(2), this.rOe);
  }
  Refresh(i, e, t) {
    this.Pe = i;
    this.T8e.RefreshByData(i.RewardList, () => {
      this.T8e.ScrollToLeft(0);
    });
    var r = i.Status === 2;
    var s = i.Status === 0;
    var o = i.Status === 1;
    this.GetButton(4).RootUIComp.SetUIActive(s);
    this.GetItem(7).SetUIActive(s);
    this.GetSprite(6).SetUIActive(r);
    this.GetText(5).SetUIActive(o && i.JumpId === 0);
    this.GetButton(8)?.RootUIComp.SetUIActive(o && i.JumpId > 0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i.TaskName);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "BlackCoastTheme_TaskProgress", i.Current, i.Target);
  }
}
exports.FloroRanchTaskItem = FloroRanchTaskItem;
//# sourceMappingURL=FloroRanchTaskItem.js.map