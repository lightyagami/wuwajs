"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RewardExploreHonamiTowerSuccessItem = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RewardSmallItemGrid_1 = require("./RewardSmallItemGrid");
class HonamiTowerRecordItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  Refresh(e, r, t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.RecordName);
    this.GetText(1).SetText(e.RecordValue);
  }
}
class RewardExploreHonamiTowerSuccessItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OFt = undefined;
    this.Tnm = undefined;
    this.H3e = undefined;
    this.bnm = () => new HonamiTowerRecordItem();
    this.d2t = () => {
      var e = new RewardSmallItemGrid_1.RewardSmallItemGrid();
      e.BindOnCanExecuteChange(() => false);
      e.BindOnExtendToggleClicked(this.wYt);
      return e;
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
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIHorizontalLayout]];
  }
  OnStart() {
    this.Tnm = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), this.bnm);
    this.H3e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.d2t);
  }
  Refresh(e) {
    this.Tnm.RefreshByData(e.RecordItemList);
    this.KGt(e.RewardItemList);
  }
  KGt(e) {
    var r = e.length > 0;
    this.GetItem(2).SetUIActive(r);
    this.GetText(1).SetUIActive(r);
    if (r) {
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
      this.H3e.RefreshByData(e);
    }
  }
}
exports.RewardExploreHonamiTowerSuccessItem = RewardExploreHonamiTowerSuccessItem;
//# sourceMappingURL=RewardExploreHonamiTowerSuccessItem.js.map