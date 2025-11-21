"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryTechnologyInfoPanel = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivityFunctionalTypeA_1 = require("../../../Activity/ActivityContent/UniversalComponents/Functional/ActivityFunctionalTypeA");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const CommonCostItem_1 = require("../../../Common/PropItem/CommonCostItem");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const HonamiStoryController_1 = require("../../HonamiStoryController");
class HonamiStoryTechnologyInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.gem = undefined;
    this.ucc = undefined;
    this.U1a = undefined;
    this.uVd = undefined;
    this.Cem = "/Game/Aki/UI/UIResources/UiActivity/Atlas/Activity28/HonamiStory/HonamiStorySkillTree/SP_SkillFrmLockNor.SP_SkillFrmLockNor";
    this.pem = "/Game/Aki/UI/UIResources/UiActivity/Atlas/Activity28/HonamiStory/HonamiStorySkillTree/SP_SkillFrmANor.SP_SkillFrmANor";
    this.L3e = () => {
      HonamiStoryController_1.HonamiStoryController.SendHonamiStoryActivateTalentRequest(this.gem.Id, () => {
        var i = ModelManager_1.ModelManager.HonamiStoryModel;
        i.CurrentSelectNodeItem?.PlayActivateAnim();
        if (i.CurrentSelectNode) {
          UiManager_1.UiManager.OpenView("HonamiStoryTechSuccessEffectView", i.CurrentSelectNode.GetConfig);
        }
      });
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIItem], [9, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.U1a = new CommonCostItem_1.CommonCostItem();
    this.ucc = new ButtonItem_1.ButtonItem();
    this.uVd = new ActivityFunctionalTypeA_1.FunctionalPanelConditionLock();
    var i = [this.U1a.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()), this.ucc.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()), this.uVd.CreateThenShowByActorAsync(this.GetItem(6).GetOwner())];
    await Promise.all(i);
    this.ucc.SetFunction(this.L3e);
    this.GetText(2).SetText("");
    this.GetText(3).SetText("");
    this.GetText(7).SetText("");
    this.GetText(9).SetText("");
    this.GetItem(4).SetUIActive(false);
    this.GetItem(5).SetUIActive(false);
    this.GetItem(6).SetUIActive(false);
    this.GetItem(8).SetUIActive(false);
  }
  Refresh(i) {
    if (i) {
      this.gem = i;
      var t;
      var e = this.gem.GetConfig;
      var s = ModelManager_1.ModelManager.HonamiStoryModel.CheckNodeCanActiveAndIsEnough(i);
      var o = this.gem.GetNodeStatus === 2 ? this.pem : this.Cem;
      this.SetSpriteByPath(o, this.GetSprite(0), false);
      this.SetTextureByPath(e.Icon, this.GetTexture(1));
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.Name);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), e.Desc);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), e.MidTitle);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.MidDexc);
      var o = e.ConsumeItems;
      if (o && o.size !== 0) {
        this.U1a.SetUiActive(true);
        o.forEach((i, t) => {
          this.U1a.UpdateItem(t, i);
          this.U1a.RefreshCountEnableState();
        });
      } else {
        this.U1a.SetUiActive(false);
      }
      this.GetItem(5).SetUIActive(false);
      this.GetItem(6).SetUIActive(false);
      this.GetItem(8).SetUIActive(false);
      switch (this.gem.GetNodeStatus) {
        case 2:
          this.U1a.SetUiActive(false);
          this.GetItem(8).SetUIActive(true);
          break;
        case 1:
          if (s) {
            this.GetItem(5).SetUIActive(true);
          } else {
            this.GetItem(6).SetUIActive(true);
            this.uVd.SetTextByTextId("HonamiStory_Tech_NotEnough");
          }
          break;
        case 0:
          this.GetItem(6).SetUIActive(true);
          if (i.PreNodeIsActive) {
            t = i.GetConfig.LockPanelTip;
            this.uVd.SetTextByTextId(t);
          } else {
            this.uVd.SetTextByTextId("HonamiStory_Tech_PreNodeLock");
          }
      }
    }
  }
}
exports.HonamiStoryTechnologyInfoPanel = HonamiStoryTechnologyInfoPanel;
//# sourceMappingURL=HonamiStoryTechnologyInfoPanel.js.map