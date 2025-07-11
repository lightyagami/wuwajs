"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionAssembleItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const VisionFetterSuitItem_1 = require("../VisionFetterSuitItem");
class VisionAssembleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.bxt = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UITexture], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UISprite], [6, UE.UITexture], [7, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.bxt = new VisionFetterSuitItem_1.VisionFetterSuitItem(this.GetItem(3));
    await this.bxt.Init().finally(() => {
      this.GetItem(3).SetUIActive(true);
    });
  }
  Reset() {
    this.GetItem(0).SetUIActive(false);
  }
  Update(e) {
    this.GetItem(0).SetUIActive(true);
    this.mFe(e);
    this.m8i(e);
    this.ol_(e);
    this.g0o(e);
    this.q7i(e);
  }
  g0o(e) {
    var t = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomEquipOnRoleId(e);
    if (t && ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t)) {
      this.GetItem(4).SetUIActive(true);
      this.nl_(e);
      this.Zke(e);
    } else {
      this.GetItem(4).SetUIActive(false);
    }
  }
  Zke(e) {
    const t = this.GetTexture(6);
    var i;
    var e = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomEquipOnRoleId(e);
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
    if (e) {
      e = e.GetRoleSkinId();
      i = ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(e).Card;
      this.SetRoleSkinIcon(i, t, e, undefined, () => {
        t.SetUIActive(true);
      });
    } else {
      t.SetUIActive(false);
    }
  }
  mFe(e) {
    e = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(e).GetQuality();
    e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomQualityBgSprite(e);
    this.SetSpriteByPath(e, this.GetSprite(1), false);
  }
  nl_(e) {
    e = ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsMain(e);
    let t = "";
    t = e ? ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_ItemHeadBg1") : ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_ItemHeadBg2");
    this.SetSpriteByPath(t, this.GetSprite(5), false);
  }
  m8i(e) {
    e = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(e);
    e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(e.GetFetterGroupId());
    this.bxt.Update(e);
  }
  ol_(e) {
    e = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(e);
    e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e.GetConfigId(true));
    this.SetTextureByPath(e.IconMiddle, this.GetTexture(2));
  }
  q7i(e) {
    e = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(e);
    this.GetText(7).SetText(e.GetCost().toString());
  }
}
exports.VisionAssembleItem = VisionAssembleItem;
//# sourceMappingURL=VisionAssembleItem.js.map