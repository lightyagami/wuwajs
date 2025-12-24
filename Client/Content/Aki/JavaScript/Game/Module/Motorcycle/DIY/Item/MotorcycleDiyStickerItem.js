"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleDiyStickerItem = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class MotorcycleDiyStickerItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.OnClickToggleBack = undefined;
    this.jbe = () => {
      if (this.Pe) {
        this.OnClickToggleBack?.(this.Pe.StickerId, this.GetExtendToggle(0), this.GetItem(7));
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
      var i = this.GetSprite(1);
      var s = this.GetItem(2);
      var a = this.GetTexture(3);
      var o = this.GetItem(4);
      var n = this.GetItem(5);
      var c = this.GetItem(6);
      var h = this.GetItem(7);
      i.SetUIActive(false);
      s.SetUIActive(false);
      a.SetUIActive(false);
      o.SetUIActive(false);
      n.SetUIActive(false);
      c.SetUIActive(false);
      h.SetUIActive(false);
      if (e.StickerId <= 0) {
        s.SetUIActive(true);
        s = CommonParamById_1.configCommonParamById.GetStringConfig("MotorEmptyStickerIcon");
        this.SetTextureByPath(s, a);
        s = ModelManager_1.ModelManager.MotorcycleDiyModel.IsEquipDefaultSticker(e.StickerPart);
        c.SetUIActive(s);
      } else {
        s = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerConfig(e.StickerId);
        if (!s) {
          return;
        }
        i.SetUIActive(true);
        a.SetUIActive(true);
        this.SetTextureByPath(s.Icon, a);
        a = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorQualityConfig(s.QualityId);
        this.SetSpriteByPath(a.Path, i, false);
        const M = ModelManager_1.ModelManager.MotorcycleDiyModel.GetStickerState(e.StickerId);
        switch (M) {
          case 2:
          case 0:
            break;
          case 3:
            n.SetUIActive(true);
            break;
          case 4:
            o.SetUIActive(true);
            break;
          case 1:
            c.SetUIActive(true);
        }
        h.SetUIActive(ModelManager_1.ModelManager.MotorcycleDiyModel.RedDotHasNewItem(e.StickerId));
      }
      const M = ModelManager_1.ModelManager.MotorcycleDiyModel.GetSelectedStickerId(e.StickerPart) === e.StickerId ? 1 : 0;
      this.GetExtendToggle(0).SetToggleState(M, false);
    }
  }
  OnSelected() {
    this.jbe();
  }
}
exports.MotorcycleDiyStickerItem = MotorcycleDiyStickerItem;
//# sourceMappingURL=MotorcycleDiyStickerItem.js.map