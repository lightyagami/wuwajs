"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkGravityReverseIconComponent = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const MarkPanelBase_1 = require("../MarkPanelBase");
class MarkGravityReverseIconComponent extends MarkPanelBase_1.MarkPanelBase {
  constructor() {
    super(...arguments);
    this.ffc = 1;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  OnStart() {
    this.GetSprite(0).SetUIActive(false);
    this.ehi();
  }
  ehi() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(this.Gravity === 1 ? "SP_OverviewDown" : "SP_OverviewUp");
    this.SetSpriteByPath(e, this.GetSprite(0), false, undefined, () => {
      this.GetSprite(0).SetUIActive(true);
    });
  }
  set Gravity(e) {
    this.ffc = e;
    if (this.GetSprite(0)) {
      this.ehi();
    }
  }
  get Gravity() {
    return this.ffc;
  }
}
exports.MarkGravityReverseIconComponent = MarkGravityReverseIconComponent;
//# sourceMappingURL=MarkGravityReverseIconComponent.js.map