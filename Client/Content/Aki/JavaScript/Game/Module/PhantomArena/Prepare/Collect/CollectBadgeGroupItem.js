"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CollectBadgeGroupItem = void 0;
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  CollectBadgeItem_1 = require("./CollectBadgeItem");
class CollectBadgeGroupItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this._Dt = 0, this.kZ1 = void 0, this.CallbackClickBadge = void 0, this.CallbackCanChange = void 0, this.OZ1 = () => {
      var t = new CollectBadgeItem_1.CollectBadgeItem;
      return t.CallbackClickBadge = this.qZ1, t.CallbackCanChange = this.GZ1, t
    }, this.qZ1 = t => {
      this.CallbackClickBadge && 0 < this._Dt && this.CallbackClickBadge(t, this)
    }, this.GZ1 = (t, e) => !!(this.CallbackCanChange && 0 < this._Dt) && this.CallbackCanChange(t, e)
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIGridLayout],
      [2, UE.UIItem]
    ]
  }
  OnStart() {
    this.kZ1 = new GenericLayout_1.GenericLayout(this.GetGridLayout(1), this.OZ1)
  }
  Refresh(t, e, i) {
    this._Dt = t.GroupId;
    var s = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleBadgeGroupById(t.GroupId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), s.Name), this.kZ1.RefreshByData(t.BadgeIdList)
  }
  SetSelect(t) {
    this.kZ1.DeselectCurrentGridProxy(), this.kZ1.SelectGridProxyByKey(t)
  }
  SetSelectByIndex(t) {
    this.kZ1.DeselectCurrentGridProxy(), this.kZ1.SelectGridProxy(t)
  }
  SetDeselect() {
    this.kZ1.DeselectCurrentGridProxy()
  }
  OnSelected(t) {}
  OnDeselected(t) {}
  GetKey(t, e) {
    return this._Dt
  }
}
exports.CollectBadgeGroupItem = CollectBadgeGroupItem;
//# sourceMappingURL=CollectBadgeGroupItem.js.map