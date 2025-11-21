"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueCardComponentRoleItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const SurvivorsRogueCardAttributeItem_1 = require("./SurvivorsRogueCardAttributeItem");
const SurvivorsRogueCardComponent_1 = require("./SurvivorsRogueCardComponent");
class SurvivorsRogueCardComponentRoleItem extends SurvivorsRogueCardComponent_1.SurvivorsRogueCardComponent {
  constructor() {
    super(...arguments);
    this.iEd = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.iEd = new SurvivorsRogueCardAttributeItem_1.SurvivorsRogueCardAttributeItem();
    await this.iEd.CreateByActorAsync(this.GetItem(1).GetOwner());
    this.iEd.SetIsUp(false);
    this.GetTexture(0).SetUIActive(false);
  }
  OnGetResourceId() {
    return "UiItem_SurvivorsCardRole";
  }
  GetLayoutLevel() {
    return 0;
  }
  OnRefresh(e, r) {
    var t = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsRole(e);
    if (t = t && ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t.TrialRoleId)?.GetRoleConfig()) {
      this.SetRoleIcon(t.RoleHeadIconCircle, this.GetTexture(0), e);
      this.GetTexture(0).SetUIActive(true);
      if (r) {
        t = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetPropertyConfig(r);
        this.iEd.SetTextureIcon(t?.Icon);
      }
      this.iEd.SetActive(r !== undefined);
      this.SetActive(true);
    } else {
      this.SetActive(false);
    }
  }
}
exports.SurvivorsRogueCardComponentRoleItem = SurvivorsRogueCardComponentRoleItem;
//# sourceMappingURL=SurvivorsRogueCardComponentRoleItem.js.map