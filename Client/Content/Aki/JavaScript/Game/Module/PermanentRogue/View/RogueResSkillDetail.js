"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueResSkillDetail = undefined;
const UE = require("ue");
const RogueResCurrencyById_1 = require("../../../../Core/Define/ConfigQuery/RogueResCurrencyById");
const RogueResTalentTreeById_1 = require("../../../../Core/Define/ConfigQuery/RogueResTalentTreeById");
const RogueResTalentTreeDescById_1 = require("../../../../Core/Define/ConfigQuery/RogueResTalentTreeDescById");
const RogueResThemeById_1 = require("../../../../Core/Define/ConfigQuery/RogueResThemeById");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const RoleLevelUpSuccessController_1 = require("../../RoleUi/RoleLevel/RoleLevelUpSuccessController");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ActivityPermanentRogueController_1 = require("../ActivityPermanentRogueController");
class RogueResSkillDetail extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.Ilo = () => {
      var e = RogueResTalentTreeById_1.configRogueResTalentTreeById.GetConfig(this.Data.Id);
      var e = RogueResThemeById_1.configRogueResThemeById.GetConfig(e.SeasonId);
      var e = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCurrency(e.SkillItem);
      var i = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetSkillLevelById(this.Data.Id);
      if (e < (this.Data?.Consule[i] ?? 0)) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("ErrorCode_200003_Text");
      } else {
        ActivityPermanentRogueController_1.ActivityPermanentRogueController.RequestRogueResTalentSkillLevel(this.Data.Id).then(() => {
          this.Refresh(this.Data);
          var e = RogueResTalentTreeDescById_1.configRogueResTalentTreeDescById.GetConfig(this.Data.Describe);
          var e = {
            Title: "Text_ResonanceUnlockSuccess_Text",
            TextList: [{
              TextId: e.TalentDesc,
              Params: e.Args
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
    var i = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetSkillLevelById(e.Id);
    var t = RogueResTalentTreeDescById_1.configRogueResTalentTreeDescById.GetConfig(e.Describe);
    var s = i >= e.Consule.length;
    this.SetSpriteByPath(t.TalentIcon, this.GetSprite(1), false);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.TalentName);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "Text_LevelNumber_Text", i);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t.TalentDesc, t.Args[i <= 0 ? 0 : i - 1]);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), "Text_LevelNumber_Text", i + 1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), t.TalentDesc, t.Args[s ? i - 1 : i]);
    var t = RogueResTalentTreeById_1.configRogueResTalentTreeById.GetConfig(this.Data.Id);
    var t = RogueResThemeById_1.configRogueResThemeById.GetConfig(t.SeasonId);
    var r = RogueResCurrencyById_1.configRogueResCurrencyById.GetConfig(t.SkillItem);
    var t = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCurrency(t.SkillItem);
    var e = e.Consule[i];
    var t = e <= t;
    var o = this.GetText(8);
    o.SetText(e?.toString());
    if (t) {
      o.SetChangeColor(false, o.changeColor);
    } else {
      o.SetChangeColor(true, o.changeColor);
    }
    this.SetTextureByPath(r.IconSmall, this.GetTexture(12));
    this.UpdateDetail(i, s);
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
exports.RogueResSkillDetail = RogueResSkillDetail;
//# sourceMappingURL=RogueResSkillDetail.js.map