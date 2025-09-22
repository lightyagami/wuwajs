"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseShopGoodsItem = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class TrapDefenseShopGoodsItem extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.uXc = undefined;
    this.hJs = () => {
      if (!!this.uXc && !this.IsSelected) {
        ModelManager_1.ModelManager.TrapDefenseModel.ViewModelShop.SelectGoods(this.uXc);
      }
    };
    this._Xc = e => {
      var t = this.GetItemGridExtendToggle();
      if (e === this.uXc && t.GetToggleState() !== 1) {
        this.IsSelected = true;
        t.SetToggleState(1);
      }
      if (e !== this.uXc && t.GetToggleState() !== 0) {
        this.IsSelected = false;
        t.SetToggleStateForce(0);
      }
    };
  }
  OnStart() {
    this.BindOnExtendToggleClicked(this.hJs);
    ModelManager_1.ModelManager.TrapDefenseModel.ViewModelShop.AddOnSelectGoodsDelegate(this._Xc);
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.TrapDefenseModel.ViewModelShop.RemoveOnSelectGoodsDelegate(this._Xc);
  }
  OnRefresh(e, t, s) {
    this.uXc = e;
    this.Apply(e.GetItemGridParam());
  }
  OnExtendToggleStateChanged(e) {
    var t = this.GetItemGridExtendToggle();
    if (e === 0 && this.IsSelected) {
      t.SetToggleStateForce(1);
    }
    if (e === 1 && !this.IsSelected) {
      ModelManager_1.ModelManager.TrapDefenseModel.ViewModelShop.SelectGoods(this.uXc);
    }
  }
}
exports.TrapDefenseShopGoodsItem = TrapDefenseShopGoodsItem;
//# sourceMappingURL=TrapDefenseShopGoodsItem.js.map