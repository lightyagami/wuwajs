"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkRangeImageComponent = undefined;
const UE = require("ue");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const MarkPanelBase_1 = require("../MarkPanelBase");
class MarkRangeImageComponent extends MarkPanelBase_1.MarkPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIItem], [2, UE.UISprite]];
  }
  async OnBeforeStartAsync() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_ProbeArea");
    await this.SetTextureAsync(e, this.RangeImage);
  }
  OnStart() {
    this.RootItem.SetAnchorOffset(Vector2D_1.Vector2D.ZeroVector);
    this.RootItem.SetUIItemScale(Vector_1.Vector.OneVector);
    this.RangeSprite.SetUIActive(true);
    this.RangeImage.SetUIActive(false);
  }
  get RangeImage() {
    return this.GetTexture(0);
  }
  get RangeArea() {
    return this.GetItem(1);
  }
  get RangeSprite() {
    return this.GetSprite(2);
  }
}
exports.MarkRangeImageComponent = MarkRangeImageComponent;
//# sourceMappingURL=MarkRangeImageComponent.js.map