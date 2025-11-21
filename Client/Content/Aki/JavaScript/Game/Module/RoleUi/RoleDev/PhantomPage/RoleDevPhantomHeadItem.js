"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevPhantomHeadItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const PhantomUtil_1 = require("../../../Phantom/PhantomUtil");
const VisionFetterSuitItem_1 = require("../../../Phantom/Vision/View/VisionFetterSuitItem");
class RoleDevPhantomHeadItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.$8i = undefined;
    this.ko_ = undefined;
    this.Xy = 0;
    this.bxt = undefined;
    this.cLd = () => {
      var e;
      var t;
      if (this.ko_) {
        e = this.Xy;
        ModelManager_1.ModelManager.PhantomBattleModel.CurrentEquipmentSelectIndex = e;
        t = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipByIndex(this.ko_, e);
        ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectUniqueId = t;
        PhantomUtil_1.PhantomUtil.OpenVisionEquipmentView(this.ko_, e);
      }
    };
    this.Xy = e;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIItem], [9, UE.UIItem]];
    this.BtnBindInfo = [[0, this.cLd]];
  }
  async OnBeforeStartAsync() {
    this.bxt = new VisionFetterSuitItem_1.VisionFetterSuitItem();
    await this.bxt.CreateThenShowByActorAsync(this.GetItem(5).GetOwner());
  }
  SetRoleId(e) {
    this.ko_ = e;
  }
  UpdateItem(e) {
    this.$8i = e;
    this.OnUpdateItem(e);
  }
  OnUpdateItem(e) {
    if (e) {
      this.GetItem(8)?.SetUIActive(true);
      this.GetItem(9)?.SetUIActive(false);
      this.Kbe(e);
      this.BGt(e);
      this.dbl(e);
      this.pmt(e);
      this.bxt.Update(e.GetFetterGroupConfig());
    } else {
      this.GetItem(8)?.SetUIActive(false);
      this.GetItem(9)?.SetUIActive(true);
    }
  }
  Kbe(e) {
    var t = this.GetTexture(1);
    if (t && e && (e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e.GetConfigId(true))?.Icon)) {
      this.SetTextureByPath(e, t);
    }
  }
  BGt(e) {
    var t = this.GetSprite(2);
    if (t && e && (e = e.GetQuality(), e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomQualityBgSprite(e))) {
      this.SetSpriteByPath(e, t, false);
    }
  }
  dbl(e) {
    var t = this.GetText(4);
    if (t && e) {
      e = e.GetCost();
      t.SetText(e.toString());
    }
  }
  pmt(e) {
    var t = this.GetText(7);
    if (t && e) {
      e = e.GetPhantomLevel();
      t.SetText("+" + e.toString());
    }
  }
  GetCurrentData() {
    return this.$8i;
  }
}
exports.RoleDevPhantomHeadItem = RoleDevPhantomHeadItem;
//# sourceMappingURL=RoleDevPhantomHeadItem.js.map