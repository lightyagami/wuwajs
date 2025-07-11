"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotLogoView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
class PlotLogoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.wk = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  async OnCreateAsync() {
    const s = new CustomPromise_1.CustomPromise();
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetLogoPathByLanguage("PlotLogo");
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Texture, e => {
      if (ObjectUtils_1.ObjectUtils.IsValid(e)) {
        this.wk = e;
        s.SetResult();
      }
    });
    return s.Promise;
  }
  OnBeforeShow() {
    if (this.wk) {
      this.GetTexture(0)?.SetTexture(this.wk);
    }
  }
}
exports.PlotLogoView = PlotLogoView;
//# sourceMappingURL=PlotLogoView.js.map