"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkillTreeSkillSpriteItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class RoleSkillTreeSkillSpriteItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.CreateThenShowByActor(e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  Update(e) {
    e = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(e);
    this.SetSpriteByPath(e.Icon, this.GetSprite(0), false);
  }
}
exports.RoleSkillTreeSkillSpriteItem = RoleSkillTreeSkillSpriteItem;
//# sourceMappingURL=RoleSkillTreeSkillSpriteItem.js.map