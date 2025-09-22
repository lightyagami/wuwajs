"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayShopSecondTabItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
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
    t = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabDataByPayShopIdAndTabId(t, e);
    this.GetText(0).SetText(t ? t.Name : "");
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