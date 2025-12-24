"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleDiyPartBoxItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class MotorcycleDiyPartBoxItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.kqe = () => {
      if (this.Pe && this.Pe.Index !== -1) {
        switch (this.Pe.PartType) {
          case 1:
            this.PCf(this.Pe.Index);
            break;
          case 2:
            this.ACf(this.Pe.Index);
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UITexture], [4, UE.UIItem], [5, UE.UISprite]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  Refresh(i, t, e) {
    if (i && (this.GetItem(4).SetUIActive(false), this.Pe = i, this.Pe.PartType === 1)) {
      this.jPf();
    }
  }
  jPf() {
    var i = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerPartConfig(this.Pe.Index + 1);
    var t = this.Pe.PartId === 0;
    this.SetTextureByPath(i.Icon, this.GetTexture(3));
    this.GetSprite(5).SetUIActive(false);
    this.GetItem(2).SetUIActive(t);
    this.GetTexture(1).SetUIActive(!t);
    if (!t) {
      if (i = ModelManager_1.ModelManager.MotorcycleDiyModel.GetEquippedStickerId(this.Pe.Index + 1)) {
        t = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerConfig(i);
        i = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorQualityConfig(t.QualityId);
        this.GetSprite(5).SetUIActive(true);
        this.SetSpriteByPath(i.Path, this.GetSprite(5), false);
        this.SetTextureByPath(t.StickerIconPath, this.GetTexture(1));
      }
    }
  }
  PCf(i) {
    ModelManager_1.ModelManager.MotorcycleDiyModel.SetJumpStickerIndex(i);
    UiManager_1.UiManager.OpenView("MotorcycleDiyRootView");
    this.GetExtendToggle(0).SetToggleState(0);
  }
  ACf(i) {}
}
exports.MotorcycleDiyPartBoxItem = MotorcycleDiyPartBoxItem;
//# sourceMappingURL=MotorcycleDiyPartBoxItem.js.map