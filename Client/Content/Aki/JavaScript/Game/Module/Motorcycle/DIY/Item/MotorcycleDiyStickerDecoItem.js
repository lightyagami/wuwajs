"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleDiyStickerDecoItem = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class MotorcycleDiyStickerDecoItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.OnClickToggleBack = undefined;
    this.jbe = () => {
      if (this.Pe) {
        this.OnClickToggleBack?.(this.Pe.ItemId, this.GetExtendToggle(0), this.GetItem(7));
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UISprite], [2, UE.UIItem], [3, UE.UITexture], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem]];
    this.BtnBindInfo = [[0, this.jbe]];
  }
  Refresh(e, r, t) {
    if (e) {
      this.Pe = e;
      var o = this.GetSprite(1);
      var a = this.GetItem(2);
      var i = this.GetTexture(3);
      var s = this.GetItem(4);
      var n = this.GetItem(5);
      var c = this.GetItem(6);
      var M = this.GetItem(7);
      o.SetUIActive(false);
      a.SetUIActive(false);
      i.SetUIActive(false);
      s.SetUIActive(false);
      n.SetUIActive(false);
      c.SetUIActive(false);
      M.SetUIActive(false);
      if (e.ItemId <= 0) {
        var h = e.IsSticker ? CommonParamById_1.configCommonParamById.GetStringConfig("MotorEmptyStickerIcon") : CommonParamById_1.configCommonParamById.GetStringConfig("MotorEmptyDecorationIcon");
        var d = e.IsSticker ? ModelManager_1.ModelManager.MotorcycleDiyModel.IsEquipDefaultSticker(e.Part) : ModelManager_1.ModelManager.MotorcycleDiyModel.IsEquipDefaultDecoration(e.Part);
        a.SetUIActive(true);
        this.SetTextureByPath(h, i);
        c.SetUIActive(d);
      } else {
        a = e.IsSticker ? ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerConfig(e.ItemId) : ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorDecorationConfig(e.ItemId);
        if (!a) {
          return;
        }
        o.SetUIActive(true);
        i.SetUIActive(true);
        this.SetTextureByPath(a.Icon, i);
        h = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorQualityConfig(a.QualityId);
        this.SetSpriteByPath(h.Path, o, false);
        const g = e.IsSticker ? ModelManager_1.ModelManager.MotorcycleDiyModel.GetStickerState(e.ItemId) : ModelManager_1.ModelManager.MotorcycleDiyModel.GetDecorationState(e.ItemId);
        switch (g) {
          case 2:
          case 0:
            break;
          case 3:
            n.SetUIActive(true);
            break;
          case 4:
            s.SetUIActive(true);
            break;
          case 1:
            c.SetUIActive(true);
        }
        M.SetUIActive(ModelManager_1.ModelManager.MotorcycleDiyModel.RedDotHasNewItem(e.ItemId));
      }
      const g = (e.IsSticker ? ModelManager_1.ModelManager.MotorcycleDiyModel.GetSelectedStickerId(e.Part) : ModelManager_1.ModelManager.MotorcycleDiyModel.GetSelectedDecorationId(e.Part)) === e.ItemId ? 1 : 0;
      this.GetExtendToggle(0).SetToggleState(g, false);
    }
  }
  OnSelected() {
    this.jbe();
  }
}
exports.MotorcycleDiyStickerDecoItem = MotorcycleDiyStickerDecoItem;
//# sourceMappingURL=MotorcycleDiyStickerDecoItem.js.map