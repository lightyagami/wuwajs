"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RewardItemLoopList = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const RewardSmallItemGrid_1 = require("./RewardSmallItemGrid");
class RewardItemLoopList extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Uwf = undefined;
    this.OFt = undefined;
    this.pSg = undefined;
    this.sGe = () => {
      return this.Pfi();
    };
    this.wYt = e => {
      this.OFt?.SetSelected(false, true);
      this.OFt = e.MediumItemGrid;
      var e = e.Data;
      var r = e.ConfigId;
      var e = e.UniqueId;
      if (e !== undefined && e > 0) {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemUid(e, r, this.pSg);
      } else {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(r, this.pSg);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIItem]];
    this.BtnBindInfo = [];
  }
  OnStart() {
    this.Uwf = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(1).GetOwner(), this.sGe);
  }
  OnBeforeDestroy() {
    this.Uwf = undefined;
    this.OFt = undefined;
  }
  Refresh(e, r = true) {
    e.sort((e, r) => {
      var t = e.GetDropItemType();
      var i = r.GetDropItemType();
      if (t !== i) {
        return i - t;
      } else if ((i = e.GetTypeSortIndex()) !== (t = r.GetTypeSortIndex())) {
        return t - i;
      } else if ((t = e.GetQualityId()) !== (i = r.GetQualityId())) {
        return i - t;
      } else {
        return e.ConfigId - r.ConfigId;
      }
    });
    this.Uwf.RefreshByData(e);
    this.pSg = r;
  }
  Pfi() {
    var e = new RewardSmallItemGrid_1.RewardSmallItemGrid();
    e.BindOnCanExecuteChange(() => false);
    e.BindOnExtendToggleClicked(this.wYt);
    return e;
  }
}
exports.RewardItemLoopList = RewardItemLoopList;
//# sourceMappingURL=RewardItemLoopList.js.map