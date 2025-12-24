"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleDiyStickerTabItemData = exports.MotorcycleDiyStickerTabItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const CommonTabItemBase_1 = require("../../../Common/TabComponent/TabItem/CommonTabItemBase");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
class MotorcycleDiyStickerTabItem extends CommonTabItemBase_1.CommonTabItemBase {
  constructor() {
    super(...arguments);
    this.l4e = undefined;
    this.SHf = 0;
    this.kqe = t => {
      var e = t === 1;
      this.hGf(t === 1);
      if (e) {
        this.SelectedCallBack?.(this.GridIndex);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIExtendToggle], [0, UE.UITexture], [2, UE.UIItem], [3, UE.UIItem]];
    this.BtnBindInfo = [[1, this.kqe]];
  }
  OnRefresh(t, e, o) {
    t = t.StickerPart;
    t = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerPartConfig(t);
    if (t) {
      this.SetTextureByPath(t.Icon, this.GetTexture(0));
    }
  }
  OnUpdateTabIcon(t) {}
  OnSetToggleState(t, e) {
    this.GetExtendToggle(1).SetToggleStateForce(t, e);
    this.hGf(t === 1);
  }
  GetTabToggle() {
    return this.GetExtendToggle(1);
  }
  hGf(t) {
    var e = this.CurrentData;
    var e = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerPartConfig(e.StickerPart);
    if (e) {
      t = t ? e.IconSelect : e.Icon;
      this.SetTextureByPath(t, this.GetTexture(0));
    }
  }
  BindRedDot(t, e) {
    this.UnBindRedDot();
    var o = this.GetItem(3);
    this.l4e = t;
    this.SHf = e;
    RedDotController_1.RedDotController.BindRedDot(t, o, undefined, e);
  }
  UnBindRedDot() {
    if (this.l4e) {
      RedDotController_1.RedDotController.UnBindGivenUi(this.l4e, this.GetItem(3), this.SHf);
      this.l4e = undefined;
      this.SHf = 0;
    }
  }
}
exports.MotorcycleDiyStickerTabItem = MotorcycleDiyStickerTabItem;
class MotorcycleDiyStickerTabItemData extends CommonTabItemBase_1.CommonTabItemData {
  constructor() {
    super(...arguments);
    this.StickerPart = 0;
  }
}
exports.MotorcycleDiyStickerTabItemData = MotorcycleDiyStickerTabItemData;
//# sourceMappingURL=MotorcycleDiyStickerTabItem.js.map