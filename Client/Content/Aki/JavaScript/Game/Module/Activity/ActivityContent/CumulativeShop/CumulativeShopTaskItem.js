"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CumulativeShopTaskItem = void 0;
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid"),
  SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
  CumulativeShopController_1 = require("./CumulativeShopController"),
  REWARD_ITEM_ID = 46;
class CumulativeShopTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.BOe = 0, this.fy1 = 0, this.bOe = void 0, this.JGe = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid
    }, this.gy1 = () => {
      CumulativeShopController_1.CumulativeShopController.ConsumptiveRewardRequest(this.BOe)
    }, this.iu1 = () => {
      this.fy1 <= 0 || SkipTaskManager_1.SkipTaskManager.RunByConfigId(this.fy1)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [1, UE.UIButtonComponent],
      [0, UE.UIButtonComponent],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIScrollViewWithScrollbarComponent],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIText]
    ], this.BtnBindInfo = [
      [1, this.gy1],
      [0, this.iu1]
    ]
  }
  OnStart() {
    this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(6), this.JGe)
  }
  Refresh(i, t, e) {
    this.BOe = i;
    var i = ConfigManager_1.ConfigManager.CumulativeShopConfig.GetCumulativeShopTaskConfig(this.BOe),
      r = (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i.DesString), this.fy1 = i.SkipId, CumulativeShopController_1.CumulativeShopController.GetCumulativeShopData().TaskDataMap.get(this.BOe)),
      s = r.Mm1.lMs,
      o = r.Mm1.j6n,
      s = (this.GetText(5).SetText(s + "/" + o), [{
        IncId: 0,
        ItemId: REWARD_ITEM_ID
      }, i.RewardScore]),
      o = (this.bOe?.RefreshByData([s]), r.DS_.ym1),
      s = r.DS_.mLs,
      r = r.DS_.Sm1;
    0 < o ? (this.GetItem(2).SetUIActive(!1), this.GetItem(3).SetUIActive(!1), this.GetButton(0).RootUIComp.SetUIActive(!1), this.GetButton(1).RootUIComp.SetUIActive(!0), this.GetItem(7).SetUIActive(!0)) : (0 < r && r <= s ? (this.GetItem(2).SetUIActive(!1), this.GetItem(3).SetUIActive(!0), this.GetButton(0).RootUIComp.SetUIActive(!1)) : (o = 0 < i.SkipId, this.GetItem(2).SetUIActive(!o), this.GetItem(3).SetUIActive(!1), this.GetButton(0).RootUIComp.SetUIActive(o)), this.GetButton(1).RootUIComp.SetUIActive(!1), this.GetItem(7).SetUIActive(!1)), 1 < i.MaxFinishCount ? (this.GetItem(8).SetUIActive(!0), o = `<color=#394449><size=44>${s}</size></color>`, i = `<color=#adadad><size=36>${r}</size></color>`, this.GetText(9).SetText(o + "<color=#394449><size=36>/</size></color>" + i)) : this.GetItem(8).SetUIActive(!1)
  }
}
exports.CumulativeShopTaskItem = CumulativeShopTaskItem;
//# sourceMappingURL=CumulativeShopTaskItem.js.map