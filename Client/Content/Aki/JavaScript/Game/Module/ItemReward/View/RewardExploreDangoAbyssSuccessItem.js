"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RewardExploreDangoAbyssSuccessItem = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RewardSmallItemGrid_1 = require("./RewardSmallItemGrid");
class RewardExploreDangoAbyssSuccessItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OFt = undefined;
    this.kGe = undefined;
    this.d2t = () => {
      return this.Pfi();
    };
    this.wYt = e => {
      this.OFt?.SetSelected(false, true);
      this.OFt = e.MediumItemGrid;
      var e = e.Data;
      var r = e.ConfigId;
      var e = e.UniqueId;
      if (e !== undefined && e > 0) {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemUid(e, r);
      } else {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(r);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIGridLayout], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIItem]];
  }
  OnStart() {
    this.kGe = new GenericLayout_1.GenericLayout(this.GetGridLayout(2), this.d2t);
  }
  Refresh(e) {
    this.jqe(e.RewardItemData);
    this.Nqe(e.Progress);
  }
  Nqe(e) {
    e = Math.floor(e * 100);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "AbyssLevelProgress", e.toString());
  }
  jqe(e) {
    e.sort((e, r) => {
      var t = e.GetDropItemType();
      var s = r.GetDropItemType();
      if (t !== s) {
        return s - t;
      } else if ((s = e.GetTypeSortIndex()) !== (t = r.GetTypeSortIndex())) {
        return t - s;
      } else if ((t = e.GetQualityId()) !== (s = r.GetQualityId())) {
        return s - t;
      } else {
        return e.ConfigId - r.ConfigId;
      }
    });
    this.kGe.RefreshByData(e);
    this.GetItem(5).SetUIActive(e.length > 0);
  }
  Pfi() {
    var e = new RewardSmallItemGrid_1.RewardSmallItemGrid();
    e.BindOnCanExecuteChange(() => false);
    e.BindOnExtendToggleClicked(this.wYt);
    return e;
  }
}
exports.RewardExploreDangoAbyssSuccessItem = RewardExploreDangoAbyssSuccessItem;
//# sourceMappingURL=RewardExploreDangoAbyssSuccessItem.js.map