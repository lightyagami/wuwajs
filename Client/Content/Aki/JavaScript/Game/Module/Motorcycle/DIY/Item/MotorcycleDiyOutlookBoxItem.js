"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleDiyOutlookBoxItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class MotorcycleDiyOutlookBoxItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.kqe = () => {
      if (this.Pe && this.Pe.JumpIndex !== -1) {
        switch (this.Pe.OutlookType) {
          case 1:
            this.rEg();
            break;
          case 2:
            this.dyf(this.Pe.JumpIndex);
            break;
          case 3:
            this.myf(this.Pe.JumpIndex);
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UITexture], [4, UE.UIItem], [5, UE.UISprite]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  Refresh(e, i, t) {
    if (e) {
      this.GetItem(4).SetUIActive(false);
      this.Pe = e;
      switch (this.Pe.OutlookType) {
        case 2:
          this.Fkf();
          break;
        case 3:
          this.oEg();
      }
    }
  }
  Fkf() {
    var e = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerPartConfig(this.Pe.JumpIndex + 1);
    var i = this.Pe.ItemId === 0;
    this.SetTextureByPath(e.Icon, this.GetTexture(3));
    this.GetSprite(5).SetUIActive(false);
    this.GetItem(2).SetUIActive(i);
    this.GetTexture(1).SetUIActive(!i);
    if (!i) {
      if (e = ModelManager_1.ModelManager.MotorcycleDiyModel.GetEquippedStickerId(this.Pe.JumpIndex + 1)) {
        i = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerConfig(e);
        e = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorQualityConfig(i.QualityId);
        this.GetSprite(5).SetUIActive(true);
        this.SetSpriteByPath(e.Path, this.GetSprite(5), false);
        this.SetTextureByPath(i.StickerIconPath, this.GetTexture(1));
      }
    }
  }
  oEg() {
    var e = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorDecorationPartConfig(this.Pe.JumpIndex + 1);
    var i = this.Pe.ItemId === 0;
    this.SetTextureByPath(e.Icon, this.GetTexture(3));
    this.GetSprite(5).SetUIActive(false);
    this.GetItem(2).SetUIActive(i);
    this.GetTexture(1).SetUIActive(!i);
    if (!i) {
      if (e = ModelManager_1.ModelManager.MotorcycleDiyModel.GetEquippedDecorationId(this.Pe.JumpIndex + 1)) {
        i = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorDecorationConfig(e);
        e = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorQualityConfig(i.QualityId);
        this.GetSprite(5).SetUIActive(true);
        this.SetSpriteByPath(e.Path, this.GetSprite(5), false);
        this.SetTextureByPath(i.DecorationsIconPath, this.GetTexture(1));
      }
    }
  }
  rEg() {
    UiManager_1.UiManager.OpenView("MotorcycleDiyRootView", {
      OpenTabView: "MotorcycleDiyFrameTabView",
      IsNeedResetMotor: true
    });
  }
  dyf(e) {
    e = {
      OpenTabView: "MotorcycleDiyStickerTabView",
      PartTabIndex: e + 1,
      IsNeedResetMotor: true
    };
    UiManager_1.UiManager.OpenView("MotorcycleDiyRootView", e);
    this.GetExtendToggle(0).SetToggleState(0);
  }
  myf(e) {
    e = {
      OpenTabView: "MotorcycleDiyDecorationTabView",
      PartTabIndex: e + 1,
      IsNeedResetMotor: true
    };
    UiManager_1.UiManager.OpenView("MotorcycleDiyRootView", e);
    this.GetExtendToggle(0).SetToggleState(0);
  }
}
exports.MotorcycleDiyOutlookBoxItem = MotorcycleDiyOutlookBoxItem;
//# sourceMappingURL=MotorcycleDiyOutlookBoxItem.js.map