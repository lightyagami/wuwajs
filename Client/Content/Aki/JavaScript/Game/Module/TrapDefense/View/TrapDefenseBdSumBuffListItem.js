"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBdSumBuffListItem = undefined;
const UE = require("ue");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const TrapDefenseBdBuffItem_1 = require("./TrapDefenseBdBuffItem");
class TrapDefenseBdSumBuffListItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.ItemData = undefined;
    this.LayoutBdBuff = undefined;
    this.OnSelectBdBuffItemCallBack = undefined;
    this.LastSelectBuffIndex = CommonDefine_1.INVALID_VALUE;
    this.IsFireForBuffClick = false;
    this.OnIsShowBdBuffLockStateCallback = undefined;
    this.OnIsNewTagStateCallback = undefined;
    this.OnGetBdBuffConfig = undefined;
    this.CreateItemBdBuff = () => {
      var e = new TrapDefenseBdBuffItem_1.TrapDefenseBdBuffItem();
      e.OnSelectBuffItemCallback = this.QHc;
      e.OnIsShowBdBuffLockStateCallback = this.OnIsShowBdBuffLockStateCallback;
      e.OnIsNewTagStateCallback = this.OnIsNewTagStateCallback;
      e.OnGetBdBuffConfig = this.OnGetBdBuffConfig;
      return e;
    };
    this.QHc = (e, t) => {
      this.IsFireForBuffClick = true;
      this.ScrollViewDelegate?.SelectGridProxy(this.GridIndex, this.DisplayIndex, false);
      this.OnSelectBdBuffItemCallBack?.(e, t);
      this.IsFireForBuffClick = false;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UILayoutBase], [3, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    var e = this.GetLayoutBase(2);
    var t = this.GetItem(3)?.GetOwner();
    this.LayoutBdBuff = new GenericLayout_1.GenericLayout(e, this.CreateItemBdBuff, t);
  }
  async RefreshAsync(e) {
    this.ItemData = e;
    this.SetTextureByPath(e.Config.Icon, this.GetTexture(0));
    this.GetText(1)?.ShowTextNew(e.Config.Name);
    this.LastSelectBuffIndex = this.LayoutBdBuff.GetSelectedGridIndex();
    await this.LayoutBdBuff.RefreshByDataAsync(e.GetBdBuffShowListForSumView(), true);
  }
  OnSelected() {
    if (!this.IsFireForBuffClick) {
      this.LayoutBdBuff.SelectGridProxy(Math.max(this.LastSelectBuffIndex, 0));
    }
  }
  OnDeselected() {
    this.LayoutBdBuff.DeselectCurrentGridProxy();
  }
}
exports.TrapDefenseBdSumBuffListItem = TrapDefenseBdSumBuffListItem;
//# sourceMappingURL=TrapDefenseBdSumBuffListItem.js.map