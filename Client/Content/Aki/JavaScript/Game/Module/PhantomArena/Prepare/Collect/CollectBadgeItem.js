"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollectBadgeItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class CollectBadgeItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.atu = 0;
    this.CallbackClickBadge = undefined;
    this.CallbackCanChange = undefined;
    this.ntu = () => {
      if (this.CallbackClickBadge && this.atu > 0) {
        this.CallbackClickBadge(this.atu);
      }
    };
    this.stu = () => {
      var t;
      return !!this.CallbackCanChange && !!(this.atu > 0) && (t = this.GetExtendToggle(0).GetToggleState(), this.CallbackCanChange(this.atu, t));
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UISprite], [5, UE.UIText]];
    this.BtnBindInfo = [[0, this.ntu]];
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.stu);
  }
  Refresh(t, e, i) {
    var t = this.atu = t;
    var s = ModelManager_1.ModelManager.PhantomArenaModel.IsBadgeUnlock(t);
    this.GetItem(1).SetUIActive(!s);
    this.GetItem(3).SetUIActive(s);
    var s = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleBadgeById(t);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), s.Name);
    this.SetSpriteByPath(s.ShowIcon, this.GetSprite(4), false);
    this.SetSpriteByPath(s.ShowIcon, this.GetSprite(2), false);
    this.Oei(e);
  }
  Oei(t) {
    if (t) {
      this.OnSelected(false);
    } else {
      this.OnDeselected(false);
    }
  }
  OnSelected(t) {
    this.GetExtendToggle(0).SetToggleState(1);
  }
  OnDeselected(t) {
    this.GetExtendToggle(0).SetToggleState(0);
  }
  GetKey(t, e) {
    return this.atu;
  }
}
exports.CollectBadgeItem = CollectBadgeItem;
//# sourceMappingURL=CollectBadgeItem.js.map