"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevRootTabItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class RoleDevRootTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.mvd = 0;
    this.OnClickToggleCallBack = undefined;
    this.CanClickCallBack = undefined;
    this.OnClickToggle = t => {
      if (t === 1) {
        this.OnClickToggleCallBack?.(this.TabIndex);
      }
    };
    this.gke = () => this.CanClickCallBack?.(this.TabIndex) ?? true;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.OnClickToggle]];
  }
  Refresh(t, e, i) {
    this.mvd = i;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.TabName);
    this.GetExtendToggle(0)?.SetToggleState(e ? 1 : 0, false);
    this.GetItem(2)?.SetUIActive(t.TabIsUpgrade);
    this.GetItem(3)?.SetUIActive(t.TabIsFinish);
  }
  get TabIndex() {
    return this.mvd;
  }
  OnSelected(t) {
    this.GetExtendToggle(0)?.SetToggleState(1, t);
  }
  OnDeselected(t) {
    this.GetExtendToggle(0)?.SetToggleState(0, t);
  }
  GetKey(t, e) {
    return e;
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.gke);
  }
  SetToggleState(t, e = false) {
    this.GetExtendToggle(0)?.SetToggleState(t, e);
  }
  GetToggleState() {
    return this.GetExtendToggle(0)?.GetToggleState() ?? 0;
  }
}
exports.RoleDevRootTabItem = RoleDevRootTabItem;
//# sourceMappingURL=RoleDevRootTabItem.js.map