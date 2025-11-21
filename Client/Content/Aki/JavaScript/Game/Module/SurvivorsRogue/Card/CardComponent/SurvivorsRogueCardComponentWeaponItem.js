"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueCardComponentWeaponItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const SurvivorsRogueCardAttributeItem_1 = require("./SurvivorsRogueCardAttributeItem");
const SurvivorsRogueCardComponent_1 = require("./SurvivorsRogueCardComponent");
class SurvivorsRogueCardComponentWeaponItem extends SurvivorsRogueCardComponent_1.SurvivorsRogueCardComponent {
  constructor() {
    super(...arguments);
    this.iEd = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UIItem]];
  }
  OnGetResourceId() {
    return "UiItem_SurvivorsCardWeapon";
  }
  GetLayoutLevel() {
    return 0;
  }
  async OnBeforeStartAsync() {
    this.iEd = new SurvivorsRogueCardAttributeItem_1.SurvivorsRogueCardAttributeItem();
    await this.iEd.CreateByActorAsync(this.GetItem(2).GetOwner());
    this.iEd.SetIsUp(false);
  }
  OnRefresh(e, r, t) {
    e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeapon(e);
    if (e) {
      r = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetQualityConfig(r);
      this.SetTextureByPath(r.WeaponBasePath, this.GetTexture(0));
      this.SetTextureShowUntilLoaded(e.Icon, this.GetTexture(1));
      if (t) {
        r = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetPropertyConfig(t);
        this.iEd.SetTextureIcon(r?.Icon);
      }
      this.iEd.SetActive(t !== undefined);
      this.SetActive(true);
    } else {
      this.SetActive(false);
    }
  }
}
exports.SurvivorsRogueCardComponentWeaponItem = SurvivorsRogueCardComponentWeaponItem;
//# sourceMappingURL=SurvivorsRogueCardComponentWeaponItem.js.map