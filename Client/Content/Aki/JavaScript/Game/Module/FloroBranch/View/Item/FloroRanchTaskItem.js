"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchTaskItem = undefined;
const UE = require("ue");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class FloroRanchTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.OnGetBtnClick = () => {};
    this.H3e = undefined;
    this.rOe = () => new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    this.WEu = () => {
      SkipTaskManager_1.SkipTaskManager.RunByConfigId(this.Pe.JumpId);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIHorizontalLayout], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIText], [6, UE.UISprite], [7, UE.UIItem], [8, UE.UIButtonComponent]];
    this.BtnBindInfo = [[4, this.OnGetBtnClick], [8, this.WEu]];
  }
  OnStart() {
    this.H3e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.rOe);
  }
  Refresh(t, i, e) {
    this.Pe = t;
    this.H3e.RefreshByData(t.RewardList);
    var r = t.Status === 2;
    var s = t.Status === 0;
    var o = t.Status === 1;
    this.GetButton(4).RootUIComp.SetUIActive(s);
    this.GetItem(7).SetUIActive(s);
    this.GetSprite(6).SetUIActive(r);
    this.GetText(5).SetUIActive(o && t.JumpId === 0);
    this.GetButton(8)?.RootUIComp.SetUIActive(o && t.JumpId > 0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.TaskName);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "BlackCoastTheme_TaskProgress", t.Current, t.Target);
  }
}
exports.FloroRanchTaskItem = FloroRanchTaskItem;
//# sourceMappingURL=FloroRanchTaskItem.js.map