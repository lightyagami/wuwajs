"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattlePassExtraRewardView = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const RewardSmallItemGrid_1 = require("./RewardSmallItemGrid");
class BattlePassExtraRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.eZs = undefined;
    this.Uc1 = undefined;
    this.Dc1 = undefined;
    this.OFt = undefined;
    this.Bc1 = (e, i) => {
      var t = e.GetDropItemType();
      var r = i.GetDropItemType();
      if (t !== r) {
        return r - t;
      } else if ((r = e.GetTypeSortIndex()) !== (t = i.GetTypeSortIndex())) {
        return t - r;
      } else if ((t = e.GetQualityId()) !== (r = i.GetQualityId())) {
        return r - t;
      } else {
        return e.ConfigId - i.ConfigId;
      }
    };
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
      var i = e.ConfigId;
      var e = e.UniqueId;
      if (e !== undefined && e > 0) {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemUid(e, i);
      } else {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(i);
      }
    };
    this.GLn = () => {
      this.CloseMe();
      this.eZs?.GetRewardInfo().RightAction();
    };
    this.qLn = () => {
      this.CloseMe();
      this.eZs?.GetRewardInfo().LeftAction();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIItem], [4, UE.UIScrollViewWithScrollbarComponent], [5, UE.UIItem], [6, UE.UIText]];
    this.BtnBindInfo = [[0, this.GLn], [1, this.qLn]];
  }
  async OnBeforeStartAsync() {
    this.eZs = this.OpenParam;
    return Promise.resolve();
  }
  OnStart() {
    this.Uc1 = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(2), this.d2t);
    this.Dc1 = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(4), this.d2t);
    this.bl();
  }
  OnBeforeDestroy() {
    this.OFt = undefined;
    this.Uc1 = undefined;
    this.Dc1 = undefined;
  }
  bl() {
    var e = this.eZs?.GetRewardInfo().CommonItems;
    if (e !== undefined) {
      e.sort(this.Bc1);
      this.Uc1?.RefreshByData(e);
    }
    var e = this.eZs?.GetRewardInfo().ExtraItems;
    if (e !== undefined) {
      e.sort(this.Bc1);
      this.Dc1?.RefreshByData(e);
    }
    var e = this.eZs?.GetRewardInfo().TipsTextId;
    if (e) {
      this.GetText(6)?.ShowTextNew(e);
    }
  }
}
exports.BattlePassExtraRewardView = BattlePassExtraRewardView;
//# sourceMappingURL=BattlePassExtraRewardView.js.map