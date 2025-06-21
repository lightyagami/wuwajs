"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CollectBadgeItem = void 0;
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class CollectBadgeItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.FZ1 = 0, this.CallbackClickBadge = void 0, this.CallbackCanChange = void 0, this.qZ1 = () => {
      this.CallbackClickBadge && 0 < this.FZ1 && this.CallbackClickBadge(this.FZ1)
    }, this.GZ1 = () => {
      var t;
      return !!(this.CallbackCanChange && 0 < this.FZ1) && (t = this.GetExtendToggle(0).GetToggleState(), this.CallbackCanChange(this.FZ1, t))
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIItem],
      [2, UE.UISprite],
      [3, UE.UIItem],
      [4, UE.UISprite],
      [5, UE.UIText]
    ], this.BtnBindInfo = [
      [0, this.qZ1]
    ]
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.GZ1)
  }
  Refresh(t, e, i) {
    var t = this.FZ1 = t,
      s = ModelManager_1.ModelManager.PhantomArenaModel.IsBadgeUnlock(t),
      s = (this.GetItem(1).SetUIActive(!s), this.GetItem(3).SetUIActive(s), ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleBadgeById(t));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), s.Name), this.SetSpriteByPath(s.ShowIcon, this.GetSprite(4), !1), this.SetSpriteByPath(s.ShowIcon, this.GetSprite(2), !1), this.Oei(e)
  }
  Oei(t) {
    t ? this.OnSelected(!1) : this.OnDeselected(!1)
  }
  OnSelected(t) {
    this.GetExtendToggle(0).SetToggleState(1)
  }
  OnDeselected(t) {
    this.GetExtendToggle(0).SetToggleState(0)
  }
  GetKey(t, e) {
    return this.FZ1
  }
}
exports.CollectBadgeItem = CollectBadgeItem;
//# sourceMappingURL=CollectBadgeItem.js.map