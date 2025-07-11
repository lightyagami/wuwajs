"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoguelikeSkillDetail = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const RoleLevelUpSuccessController_1 = require("../../RoleUi/RoleLevel/RoleLevelUpSuccessController");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoguelikeDefine_1 = require("../Define/RoguelikeDefine");
const RoguelikeController_1 = require("../RoguelikeController");
class RoguelikeSkillDetail extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.Ilo = () => {
      var e = ModelManager_1.ModelManager.InventoryModel?.GetItemCountByConfigId(RoguelikeDefine_1.SKILL_POINT_ID);
      var i = ModelManager_1.ModelManager.RoguelikeModel.RoguelikeSkillDataMap.get(this.Data.Id);
      if (e < (this.Data?.Consule[i] ?? 0)) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("Roguelike_Skill_Point_Not_Enough");
      } else {
        const t = this.Data;
        RoguelikeController_1.RoguelikeController.RoguelikeTalentLevelUpRequest(this.Data.Id).then(() => {
          this.Refresh(this.Data);
          var e = ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueTalentTreeDescConfig(t.Describe);
          var e = {
            Title: "Text_ResonanceUnlockSuccess_Text",
            TextList: [{
              TextId: e.BaseDesc,
              Params: e.Args.map(String)
            }]
          };
          RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessEffectView(e);
        });
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [3, UE.UIText], [4, UE.UIText], [6, UE.UIText], [7, UE.UIText], [9, UE.UIButtonComponent], [8, UE.UIText], [1, UE.UISprite], [2, UE.UIItem], [5, UE.UIItem], [10, UE.UIText], [11, UE.UIItem], [12, UE.UITexture], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIText], [16, UE.UIItem]];
    this.BtnBindInfo = [[9, this.Ilo]];
  }
  OnStart() {}
  Refresh(e) {
    this.Data = e;
    var i = ModelManager_1.ModelManager.RoguelikeModel.RoguelikeSkillDataMap.get(e.Id);
    var t = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueTalentTreeDescConfig(e.Describe);
    var l = i >= e.Consule.length;
    this.SetSpriteByPath(t.TalentIcon, this.GetSprite(1), false);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.TalentName);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "Text_LevelNumber_Text", i);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t.BaseDesc, t.Args[i]);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), "Text_LevelNumber_Text", i + 1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), t.BaseDesc, t.Args[l ? i : i + 1]);
    var t = ModelManager_1.ModelManager.RoguelikeModel.GetParamConfigBySeasonId();
    var s = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueCurrencyConfig(t.SkillPoint);
    var t = ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeCurrency(t.SkillPoint);
    var e = e.Consule[i];
    var t = e <= t;
    var r = this.GetText(8);
    r.SetText(e?.toString());
    if (t) {
      r.SetChangeColor(false, r.changeColor);
    } else {
      r.SetChangeColor(true, r.changeColor);
    }
    this.SetTextureByPath(s.IconSmall, this.GetTexture(12));
    this.UpdateDetail(i, l);
  }
  UpdateDetail(e, i) {
    if (e < 0) {
      this.GetItem(2).SetUIActive(false);
      this.GetItem(5).SetUIActive(false);
      this.GetItem(16).SetUIActive(false);
      this.GetButton(9).RootUIComp.SetUIActive(false);
      this.GetItem(14).SetUIActive(true);
      this.GetItem(13).SetUIActive(false);
    } else if (e === 0) {
      this.GetItem(2).SetUIActive(false);
      this.GetItem(5).SetUIActive(false);
      this.GetItem(16).SetUIActive(true);
      this.GetButton(9).RootUIComp.SetUIActive(true);
      this.GetItem(14).SetUIActive(false);
      this.GetItem(13).SetUIActive(false);
    } else {
      this.GetItem(2).SetUIActive(!i);
      this.GetItem(5).SetUIActive(!i);
      this.GetItem(16).SetUIActive(!i);
      this.GetButton(9).RootUIComp.SetUIActive(!i);
      this.GetItem(14).SetUIActive(false);
      this.GetItem(13).SetUIActive(i);
    }
  }
}
exports.RoguelikeSkillDetail = RoguelikeSkillDetail;
//# sourceMappingURL=RoguelikeSkillDetail.js.map