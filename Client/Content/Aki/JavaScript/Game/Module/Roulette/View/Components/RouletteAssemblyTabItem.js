"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouletteAssemblyTabItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class RouletteAssemblyTabItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SelectedTypeId = -1;
    this.ToggleCallBack = undefined;
    this.eGe = undefined;
    this.Hwn = () => {
      var t = new RouletteAssemblyTab();
      t.ToggleCallBack = this.kqe;
      return t;
    };
    this.kqe = (t, e) => {
      if (e && this.SelectedTypeId !== t) {
        if (this.SelectedTypeId !== -1) {
          this.eGe.GetLayoutItemByKey(this.SelectedTypeId).SetToggleState(false, false);
        }
        this.SelectedTypeId = t;
        this.ToggleCallBack?.(t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIItem]];
  }
  OnStart() {
    this.eGe = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.Hwn);
  }
  async Refresh(t) {
    await this.eGe.RefreshByDataAsync(t);
  }
  SelectTab(t) {
    this.eGe.GetLayoutItemByKey(t).SetToggleState(true, true);
  }
}
exports.RouletteAssemblyTabItem = RouletteAssemblyTabItem;
class RouletteAssemblyTab extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.q8e = 0;
    this.ToggleCallBack = undefined;
    this.kqe = t => {
      this.ToggleCallBack?.(this.q8e, t);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIText]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  Refresh(t, e, i) {
    this.q8e = t;
    t = ConfigManager_1.ConfigManager.RouletteConfig.GetExploreRouletteTypeById(t);
    this.SetTextureShowUntilLoaded(t.TabIcon, this.GetTexture(1));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.TabName);
    this.SetToggleState(e, false);
  }
  SetToggleState(t, e) {
    t = t ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(t, e);
  }
  GetKey(t, e) {
    return t;
  }
}
//# sourceMappingURL=RouletteAssemblyTabItem.js.map