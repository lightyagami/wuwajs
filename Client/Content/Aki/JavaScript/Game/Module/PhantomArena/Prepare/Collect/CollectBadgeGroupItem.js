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
    this.rtu = undefined;
    this.CallbackClickBadge = undefined;
    this.CallbackCanChange = undefined;
    this.otu = () => {
      var t = new CollectBadgeItem_1.CollectBadgeItem();
      t.CallbackClickBadge = this.ntu;
      t.CallbackCanChange = this.stu;
      return t;
    };
    this.ntu = t => {
      if (this.CallbackClickBadge && this._Dt > 0) {
        this.CallbackClickBadge(t, this);
      }
    };
    this.stu = (t, e) => !!this.CallbackCanChange && !!(this._Dt > 0) && this.CallbackCanChange(t, e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIGridLayout], [2, UE.UIItem]];
  }
  OnStart() {
    this.rtu = new GenericLayout_1.GenericLayout(this.GetGridLayout(1), this.otu);
  }
  Refresh(t, e, i) {
    this._Dt = t.GroupId;
    var s = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleBadgeGroupById(t.GroupId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), s.Name);
    this.rtu.RefreshByData(t.BadgeIdList);
  }
  SetSelect(t) {
    this.rtu.DeselectCurrentGridProxy();
    this.rtu.SelectGridProxyByKey(t);
  }
  SetSelectByIndex(t) {
    this.rtu.DeselectCurrentGridProxy();
    this.rtu.SelectGridProxy(t);
  }
  SetDeselect() {
    this.rtu.DeselectCurrentGridProxy();
  }
  OnSelected(t) {}
  OnDeselected(t) {}
  GetKey(t, e) {
    return this._Dt;
  }
}
exports.CollectBadgeGroupItem = CollectBadgeGroupItem;
//# sourceMappingURL=CollectBadgeGroupItem.js.map