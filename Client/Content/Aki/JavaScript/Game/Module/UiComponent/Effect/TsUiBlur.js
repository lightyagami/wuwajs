"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TsUiBlur = undefined;
const UE = require("ue");
const GlobalData_1 = require("../../../GlobalData");
class TsUiBlur extends UE.LGUIBehaviour {
  constructor() {
    super(...arguments);
    this.OverrideItem = undefined;
    this.EnableUiBlur = true;
    this.ApplyItem = undefined;
  }
  Constructor() {}
  GetUiBlurComponent() {
    if (this.OverrideItem === undefined) {
      return this.ApplyItem;
    } else {
      return this.OverrideItem.RootComponent;
    }
  }
  SetGlobalBlurUiItem() {
    var t;
    if (this.ApplyItem) {
      t = this.GetUiBlurComponent();
      UE.LGUIBPLibrary.SetGlobalBlurUIItem(t, this.ApplyItem.GetWorld());
    }
  }
  ResetGlobalBlurUiItem() {
    UE.LGUIBPLibrary.ResetGlobalBlurUIItem(GlobalData_1.GlobalData.GameInstance.GetWorld());
  }
  SetEnableUiBlur(t) {
    if (this.EnableUiBlur = t) {
      this.SetGlobalBlurUiItem();
    } else {
      this.ResetGlobalBlurUiItem();
    }
  }
}
exports.TsUiBlur = TsUiBlur;
exports.default = TsUiBlur; //# sourceMappingURL=TsUiBlur.js.map