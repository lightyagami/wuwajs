"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevPhantomHeadItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const PhantomUtil_1 = require("../../../Phantom/PhantomUtil");
class RoleDevPhantomHeadItem extends UiPanelBase_1.UiPanelBase {
  constructor(t, e) {
    super();
    this.$8i = undefined;
    this.ko_ = undefined;
    this.wqe = undefined;
    this.Xy = 0;
    this.rRd = () => {
      PhantomUtil_1.PhantomUtil.OpenVisionEquipmentView(this.ko_, this.Xy);
    };
    this.wqe = t;
    this.Xy = e;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIItem], [9, UE.UIItem]];
    this.BtnBindInfo = [[0, this.rRd]];
  }
  async Init() {
    await this.CreateByActorAsync(this.wqe.GetOwner());
    this.SetUiActive(true);
  }
  SetRoleId(t) {
    this.ko_ = t;
  }
  UpdateItem(t) {
    this.$8i = t;
    this.OnUpdateItem(t);
  }
  OnUpdateItem(t) {
    if (t) {
      this.GetItem(8)?.SetUIActive(true);
      this.GetItem(9)?.SetUIActive(false);
      this.Kbe(t);
      this.BGt(t);
      this.dbl(t);
      this.pmt(t);
    } else {
      this.GetItem(8)?.SetUIActive(false);
      this.GetItem(9)?.SetUIActive(true);
    }
  }
  Kbe(t) {
    var e = this.GetTexture(1);
    if (e && t && (t = t.GetConfig().Icon)) {
      this.SetTextureByPath(t, e);
    }
  }
  BGt(t) {
    var e = this.GetSprite(2);
    if (e && t && (t = t.GetQuality(), t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomQualityBgSprite(t))) {
      this.SetSpriteByPath(t, e, false);
    }
  }
  dbl(t) {
    var e = this.GetText(4);
    if (e && t) {
      t = t.GetCost();
      e.SetText(t.toString());
    }
  }
  pmt(t) {
    var e = this.GetText(7);
    if (e && t) {
      t = t.GetPhantomLevel();
      e.SetText("+" + t.toString());
    }
  }
  GetCurrentData() {
    return this.$8i;
  }
}
exports.RoleDevPhantomHeadItem = RoleDevPhantomHeadItem;
//# sourceMappingURL=RoleDevPhantomHeadItem.js.map