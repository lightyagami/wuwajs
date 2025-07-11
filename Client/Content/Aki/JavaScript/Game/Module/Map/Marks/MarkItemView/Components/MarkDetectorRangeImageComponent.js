"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkDetectorRangeImageComponent = undefined;
const UE = require("ue");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const MarkPanelBase_1 = require("../MarkPanelBase");
class MarkDetectorRangeImageComponent extends MarkPanelBase_1.MarkPanelBase {
  constructor() {
    super(...arguments);
    this.KRi = new UE.VectorDouble();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  async OnBeforeStartAsync() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_ProbeArea");
    await this.SetTextureAsync(e, this.RangeImage);
  }
  OnStart() {
    this.RootItem.SetAnchorOffset(Vector2D_1.Vector2D.ZeroVector);
    this.RootItem.SetUIItemScale(Vector_1.Vector.OneVector);
  }
  OnBeforeShow() {
    this.GetRootItem().D_SetRelativeScale3D(this.KRi);
  }
  get RangeImage() {
    return this.GetTexture(0);
  }
  SetRangeScale(e, t, r) {
    this.KRi.Set(e, t, r);
    if (this.IsShowOrShowing) {
      this.GetRootItem().D_SetRelativeScale3D(this.KRi);
    }
  }
}
exports.MarkDetectorRangeImageComponent = MarkDetectorRangeImageComponent;
//# sourceMappingURL=MarkDetectorRangeImageComponent.js.map