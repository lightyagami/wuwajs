"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryLimitTaskItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const SkipTaskManager_1 = require("../../SkipInterface/SkipTaskManager");
class HonamiStoryLimitTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.OnClickToGet = i => {};
    this.T8e = undefined;
    this.rOe = () => new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    this.nIu = () => {
      SkipTaskManager_1.SkipTaskManager.RunByConfigId(this.Pe.JumpId);
    };
    this.sIu = () => {
      this.OnClickToGet?.(this.Pe.Id);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [3, UE.UIItem], [2, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIScrollViewWithScrollbarComponent], [7, UE.UIItem]];
    this.BtnBindInfo = [[0, this.nIu], [1, this.sIu]];
  }
  OnStart() {
    this.T8e = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(6), this.rOe);
  }
  Refresh(i, t, e) {
    this.Pe = i;
    var r = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(this.Pe.DropId);
    this.T8e.RefreshByData(r, () => {
      this.T8e.ScrollToLeft(0);
    });
    var r = i.Status === 2;
    var s = i.Status === 0;
    var o = i.Status === 1;
    this.GetItem(7).SetUIActive(s);
    this.GetItem(3).SetUIActive(r);
    this.GetText(2).SetUIActive(o && i.JumpId === 0);
    this.GetButton(1).RootUIComp.SetUIActive(s);
    this.GetButton(0).RootUIComp.SetUIActive(o && i.JumpId > 0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i.TaskName, i.Current, i.Target);
  }
}
exports.HonamiStoryLimitTaskItem = HonamiStoryLimitTaskItem;
//# sourceMappingURL=HonamiStoryLimitTaskItem.js.map