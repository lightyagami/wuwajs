"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollectBadgeGroupItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const CollectBadgeItem_1 = require("./CollectBadgeItem");
class CollectBadgeGroupItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this._Dt = 0;
    this.Peu = undefined;
    this.CallbackClickBadge = undefined;
    this.CallbackCanChange = undefined;
    this.xeu = () => {
      var t = new CollectBadgeItem_1.CollectBadgeItem();
      t.CallbackClickBadge = this.Ueu;
      t.CallbackCanChange = this.Deu;
      return t;
    };
    this.Ueu = t => {
      if (this.CallbackClickBadge && this._Dt > 0) {
        this.CallbackClickBadge(t, this);
      }
    };
    this.Deu = (t, e) => !!this.CallbackCanChange && !!(this._Dt > 0) && this.CallbackCanChange(t, e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIGridLayout], [2, UE.UIItem]];
  }
  OnStart() {
    this.Peu = new GenericLayout_1.GenericLayout(this.GetGridLayout(1), this.xeu);
  }
  Refresh(t, e, i) {
    this._Dt = t.GroupId;
    var s = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleBadgeGroupById(t.GroupId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), s.Name);
    this.Peu.RefreshByData(t.BadgeIdList);
  }
  SetSelect(t) {
    this.Peu.DeselectCurrentGridProxy();
    this.Peu.SelectGridProxyByKey(t);
  }
  SetSelectByIndex(t) {
    this.Peu.DeselectCurrentGridProxy();
    this.Peu.SelectGridProxy(t);
  }
  SetDeselect() {
    this.Peu.DeselectCurrentGridProxy();
  }
  OnSelected(t) {}
  OnDeselected(t) {}
  GetKey(t, e) {
    return this._Dt;
  }
}
exports.CollectBadgeGroupItem = CollectBadgeGroupItem;
//# sourceMappingURL=CollectBadgeGroupItem.js.map