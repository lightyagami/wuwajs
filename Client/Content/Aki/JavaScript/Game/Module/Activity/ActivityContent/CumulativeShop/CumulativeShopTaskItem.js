"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CumulativeShopTaskItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const CumulativeShopController_1 = require("./CumulativeShopController");
const REWARD_ITEM_ID = 46;
class CumulativeShopTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.BOe = 0;
    this.Gy1 = 0;
    this.bOe = undefined;
    this.JGe = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
    this.Fy1 = () => {
      CumulativeShopController_1.CumulativeShopController.ConsumptiveRewardRequest(this.BOe);
    };
    this.Tu1 = () => {
      if (!(this.Gy1 <= 0)) {
        SkipTaskManager_1.SkipTaskManager.RunByConfigId(this.Gy1);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIButtonComponent], [0, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UIScrollViewWithScrollbarComponent], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIText]];
    this.BtnBindInfo = [[1, this.Fy1], [0, this.Tu1]];
  }
  OnStart() {
    this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(6), this.JGe);
  }
  Refresh(i, t, e) {
    this.BOe = i;
    var i = ConfigManager_1.ConfigManager.CumulativeShopConfig.GetCumulativeShopTaskConfig(this.BOe);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i.DesString);
    this.Gy1 = i.SkipId;
    var r = CumulativeShopController_1.CumulativeShopController.GetCumulativeShopData().TaskDataMap.get(this.BOe);
    var s = r.$m1.lMs;
    var o = r.$m1.j6n;
    this.GetText(5).SetText(s + "/" + o);
    var s = [{
      IncId: 0,
      ItemId: REWARD_ITEM_ID
    }, i.RewardScore];
    this.bOe?.RefreshByData([s]);
    var o = r.DS_.jm1;
    var s = r.DS_.mLs;
    var r = r.DS_.Hm1;
    if (o > 0) {
      this.GetItem(2).SetUIActive(false);
      this.GetItem(3).SetUIActive(false);
      this.GetButton(0).RootUIComp.SetUIActive(false);
      this.GetButton(1).RootUIComp.SetUIActive(true);
      this.GetItem(7).SetUIActive(true);
    } else {
      if (r > 0 && r <= s) {
        this.GetItem(2).SetUIActive(false);
        this.GetItem(3).SetUIActive(true);
        this.GetButton(0).RootUIComp.SetUIActive(false);
      } else {
        o = i.SkipId > 0;
        this.GetItem(2).SetUIActive(!o);
        this.GetItem(3).SetUIActive(false);
        this.GetButton(0).RootUIComp.SetUIActive(o);
      }
      this.GetButton(1).RootUIComp.SetUIActive(false);
      this.GetItem(7).SetUIActive(false);
    }
    if (i.MaxFinishCount > 1) {
      this.GetItem(8).SetUIActive(true);
      o = `<color=#394449><size=44>${s}</size></color>`;
      i = `<color=#adadad><size=36>${r}</size></color>`;
      this.GetText(9).SetText(o + "<color=#394449><size=36>/</size></color>" + i);
    } else {
      this.GetItem(8).SetUIActive(false);
    }
  }
}
exports.CumulativeShopTaskItem = CumulativeShopTaskItem;
//# sourceMappingURL=CumulativeShopTaskItem.js.map