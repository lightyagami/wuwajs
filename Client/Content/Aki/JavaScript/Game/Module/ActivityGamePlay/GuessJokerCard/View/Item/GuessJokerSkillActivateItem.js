"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerSkillActivateItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LoginDefine_1 = require("../../../../Login/Data/LoginDefine");
class GuessJokerSkillActivateItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIText]];
  }
  OnStart() {}
  Refresh(e) {
    var e = ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerSkill(e);
    if (e !== undefined) {
      this.GetText(3)?.ShowTextNew(e.SkillName);
      this.GetText(4)?.ShowTextNew(e.ShortSkillDesc);
      this.SetTextureByPath(e.SkillIconPath, this.GetTexture(2));
      if ((e = e.SkillPlayTexture).length === 1) {
        this.SetTextureByPath(e[0], this.GetTexture(1));
      } else {
        e = ModelManager_1.ModelManager.WorldLevelModel.Sex === LoginDefine_1.ELoginSex.Boy ? e[0] : e[1];
        this.SetTextureByPath(e, this.GetTexture(1));
      }
    }
  }
}
exports.GuessJokerSkillActivateItem = GuessJokerSkillActivateItem;
//# sourceMappingURL=GuessJokerSkillActivateItem.js.map