"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestRewardItemList = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView");
const QuestRewardItemGrid_1 = require("./QuestRewardItemGrid");
class QuestRewardItemList extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.wqe = undefined;
    this.kGe = undefined;
    this.OFt = undefined;
    this.d2t = (e, r, t) => {
      r = this.xYt(r);
      r.Refresh(e, false, t);
      return {
        Key: t,
        Value: r
      };
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
    if (e) {
      this.CreateThenShowByActor(e);
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIScrollViewWithScrollbarComponent]];
    this.BtnBindInfo = [];
  }
  OnStart() {
    this.wqe = this.GetItem(1);
    this.wqe.SetUIActive(false);
    this.kGe = new GenericScrollView_1.GenericScrollView(this.GetScrollViewWithScrollbar(2), this.d2t);
  }
  Refresh(e) {
    e.sort((e, r) => {
      var t = e.GetTypeSortIndex();
      var i = r.GetTypeSortIndex();
      if (t !== i) {
        return i - t;
      } else if ((i = e.GetQualityId()) !== (t = r.GetQualityId())) {
        return t - i;
      } else {
        return e.ConfigId - r.ConfigId;
      }
    });
    this.kGe.RefreshByData(e);
  }
  xYt(e) {
    var r = new QuestRewardItemGrid_1.QuestRewardItemGrid();
    r.Initialize(e.GetOwner());
    r.BindOnCanExecuteChange(() => false);
    r.BindOnExtendToggleClicked(this.wYt);
    r.SetActive(true);
    return r;
  }
}
exports.QuestRewardItemList = QuestRewardItemList;
//# sourceMappingURL=QuestRewardItemList.js.map