"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchUiTerrainItem = undefined;
const UE = require("ue");
const FloroRanchUiItemBase_1 = require("./FloroRanchUiItemBase");
class FloroRanchUiTerrainItem extends FloroRanchUiItemBase_1.FloroRanchUiItemBase {
  constructor() {
    super(...arguments);
    this.Euu = () => {};
    this.OnClickPos = () => {
      this.Euu?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UISprite], [2, UE.UITexture]];
    this.BtnBindInfo = [[0, this.OnClickPos]];
  }
  BindClickPosCallback(t) {
    this.Euu = t;
  }
  async RefreshItem() {
    var t = this.Entity.CheckGetComponent(2).TerrainData;
    await this.SetTextureAsync(t.Icon, this.GetTexture(2));
  }
  async PlayShowAnim() {
    await this.RefreshItem();
    this.GetTexture(2).SetUIActive(true);
    this.GetSprite(1).SetUIActive(false);
  }
  async PlayHideAnim() {
    this.GetSprite(1).SetUIActive(true);
    this.GetTexture(2).SetUIActive(false);
    await Promise.resolve();
  }
  SetSelectState(t) {
    this.GetExtendToggle(0).SetToggleState(t ? 1 : 0);
  }
  SetInteractive(t) {
    this.GetExtendToggle(0).SetSelfInteractive(t);
  }
}
exports.FloroRanchUiTerrainItem = FloroRanchUiTerrainItem;
//# sourceMappingURL=FloroRanchUiTerrainItem.js.map