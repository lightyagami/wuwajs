"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerHeroSkillItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LoginDefine_1 = require("../../../../Login/Data/LoginDefine");
const GuessJokerDefine_1 = require("../../GuessJokerDefine");
class GuessJokerHeroSkillItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.kqe = e => {
      if (e === 1) {
        this.Wjt(true);
      } else {
        this.Wjt(false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIText]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  OnStart() {
    var e = ModelManager_1.ModelManager.WorldLevelModel.Sex;
    this.GetTexture(1).SetUIActive(e === LoginDefine_1.ELoginSex.Girl);
    this.GetTexture(2).SetUIActive(e === LoginDefine_1.ELoginSex.Boy);
    var e = ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerSkill(GuessJokerDefine_1.GUESS_JOKER_PLAYER_SKILL_ID);
    if (e !== undefined) {
      this.GetText(4).ShowTextNew(e.SkillName);
      this.GetText(6).ShowTextNew(e.SkillName);
      this.GetText(7).ShowTextNew(e.SkillDesc);
      this.Wjt(false);
    }
  }
  CloseDetail() {
    this.GetExtendToggle(0).SetToggleStateForce(0, false);
    this.Wjt(false);
  }
  Wjt(e) {
    this.GetItem(5).SetUIActive(e);
    this.GetItem(3).SetUIActive(!e);
  }
}
exports.GuessJokerHeroSkillItem = GuessJokerHeroSkillItem;
//# sourceMappingURL=GuessJokerHeroSkillItem.js.map