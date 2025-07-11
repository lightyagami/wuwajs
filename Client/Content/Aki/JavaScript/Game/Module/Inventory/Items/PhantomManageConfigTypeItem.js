"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomManageConfigTypeItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
class PhantomManageConfigTypeItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.gke = () => {
      var t = this.GetExtendToggle(1).GetToggleState();
      return !this.dqu() || t !== 1;
    };
    this.mqu = () => {
      if (this.Pe && PhantomManageConfigTypeItem.ViewModel && PhantomManageConfigTypeItem.ViewModel.GetSelectType() !== this.Pe.Type) {
        PhantomManageConfigTypeItem.ViewModel.SetSelectType(this.Pe.Type);
      }
    };
    this.dqu = () => {
      return !!this.Pe && !!PhantomManageConfigTypeItem.ViewModel && PhantomManageConfigTypeItem.ViewModel.GetSelectType() === this.Pe.Type;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIExtendToggle], [2, UE.UIItem]];
    this.BtnBindInfo = [[1, this.mqu]];
  }
  OnStart() {
    this.GetItem(2).SetUIActive(false);
    this.GetExtendToggle(1).CanExecuteChange.Bind(this.gke);
  }
  Refresh(t, e, i) {
    this.Pe = t;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.Name);
    t = this.dqu() ? 1 : 0;
    this.GetExtendToggle(1).SetToggleState(t);
  }
  GetKey(t, e) {
    return t.Type;
  }
}
(exports.PhantomManageConfigTypeItem = PhantomManageConfigTypeItem).ViewModel = undefined;
//# sourceMappingURL=PhantomManageConfigTypeItem.js.map