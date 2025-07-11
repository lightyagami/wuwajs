"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollectRewardPopup = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiViewSequence_1 = require("../../../../Ui/Base/UiViewSequence");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
class CollectRewardPopup extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.KTt = undefined;
    this.QTt = undefined;
    this.vot = new Map();
    this.Cxo = undefined;
    this.rOe = () => {
      return new RewardPanelItem();
    };
    this.XTt = () => {
      this.SetActive(false);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this.XTt]];
  }
  OnBeforeCreateImplement() {
    this.Cxo = new UiViewSequence_1.UiBehaviorLevelSequence(this);
    this.AddUiBehavior(this.Cxo);
  }
  OnStart() {
    this.KTt = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.rOe);
    this.SetActive(false);
    for (const e of this.vot.values()) {
      e();
    }
  }
  async OnShowAsyncImplementImplement() {
    var e = new CustomPromise_1.CustomPromise();
    await this.Cxo?.PlaySequenceAsync("Show", e);
  }
  async OnHideAsyncImplementImplement() {
    var e = new CustomPromise_1.CustomPromise();
    await this.Cxo?.PlaySequenceAsync("Hide", e);
  }
  OnBeforeDestroy() {
    this.KTt.ClearChildren();
    this.KTt = undefined;
    this.QTt = undefined;
    this.vot.clear();
  }
  Refresh(e) {
    var t = () => {
      if (this.QTt.RewardLists.length !== 0) {
        let e = this.QTt.MountItem.GetLGUISpaceAbsolutePosition();
        if (this.QTt.PosBias !== undefined) {
          e = e.op_Addition(this.QTt.PosBias);
        }
        this.GetItem(2).SetLGUISpaceAbsolutePosition(e);
        this.KTt.RefreshByDataAsync(this.QTt.RewardLists).then(() => {
          this.SetActive(true);
        });
      }
    };
    this.QTt = e;
    if (this.InAsyncLoading()) {
      this.vot.set("Refresh", t);
    } else {
      t();
    }
  }
}
exports.CollectRewardPopup = CollectRewardPopup;
class RewardPanelItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.$Tt = undefined;
    this._Ne = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  OnStart() {
    var e = this.GetItem(0).GetOwner();
    this._Ne = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    this._Ne.Initialize(e);
  }
  Refresh(e, t, i) {
    this.$Tt = e;
    this._Ne.RefreshByConfigId(this.$Tt.Id, this.$Tt.Num);
    this._Ne.SetReceivedVisible(this.$Tt.Taken);
  }
  OnBeforeDestroy() {
    this.$Tt = undefined;
  }
}
//# sourceMappingURL=CollectRewardPopup.js.map