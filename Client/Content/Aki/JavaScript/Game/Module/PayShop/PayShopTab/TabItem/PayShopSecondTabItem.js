"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayShopSecondTabItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class PayShopSecondTabItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.TabId = 0;
    this.IsSelected = false;
    this.ToggleFunction = undefined;
    this.Toggle = undefined;
    this.Bke = t => {
      if (t === 1) {
        this.IsSelected = true;
        this.ToggleFunction?.(this.TabId);
      }
    };
    this.Lke = () => {
      var t = this.Toggle.GetToggleState();
      return !this.IsSelected || t !== 1;
    };
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[2, UE.UIExtendToggle], [0, UE.UIText]];
    this.BtnBindInfo = [[2, this.Bke]];
  }
  OnStart() {
    this.Toggle = this.GetExtendToggle(2);
    this.Toggle.CanExecuteChange.Bind(this.Lke);
    this.SetToggleState(false);
  }
  OnBeforeDestroy() {
    this.SetToggleState(false);
    this.Toggle.CanExecuteChange.Unbind();
  }
  SetName(t, e) {
    this.TabId = e;
    t = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopTabConfig(t, e);
    this.GetText(0).ShowTextNew(t.Name);
  }
  SetToggleFunction(t) {
    this.ToggleFunction = t;
  }
  SetToggleState(t) {
    this.IsSelected = t;
    this.Toggle.SetToggleState(t ? 1 : 0, false);
  }
}
exports.PayShopSecondTabItem = PayShopSecondTabItem;
//# sourceMappingURL=PayShopSecondTabItem.js.map