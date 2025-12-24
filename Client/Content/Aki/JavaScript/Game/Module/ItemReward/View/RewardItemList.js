"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RewardItemList = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const RewardSmallItemGrid_1 = require("./RewardSmallItemGrid");
class RewardItemList extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.wqe = undefined;
    this.kGe = undefined;
    this.OFt = undefined;
    this.cZf = undefined;
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
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(r, this.cZf);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIScrollViewWithScrollbarComponent]];
    this.BtnBindInfo = [];
  }
  OnStart() {
    this.wqe = this.GetItem(1);
    this.wqe.SetUIActive(false);
    this.kGe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(2), this.d2t);
  }
  OnBeforeDestroy() {
    this.OFt = undefined;
    this.kGe = undefined;
  }
  Refresh(e, r = true) {
    e.sort((e, r) => {
      var i = e.GetDropItemType();
      var t = r.GetDropItemType();
      if (i !== t) {
        return t - i;
      } else if ((t = e.GetTypeSortIndex()) !== (i = r.GetTypeSortIndex())) {
        return i - t;
      } else if ((i = e.GetQualityId()) !== (t = r.GetQualityId())) {
        return t - i;
      } else {
        return e.ConfigId - r.ConfigId;
      }
    });
    this.kGe.RefreshByData(e);
    this.cZf = r;
  }
  Pfi() {
    var e = new RewardSmallItemGrid_1.RewardSmallItemGrid();
    e.BindOnCanExecuteChange(() => false);
    e.BindOnExtendToggleClicked(this.wYt);
    return e;
  }
}
exports.RewardItemList = RewardItemList;
//# sourceMappingURL=RewardItemList.js.map