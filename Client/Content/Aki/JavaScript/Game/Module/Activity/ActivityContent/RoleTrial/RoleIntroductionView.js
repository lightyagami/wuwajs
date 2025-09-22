"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleIntroductionView = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const RoleSkillInputPanel_1 = require("../../../RoleUi/RoleSkill/RoleSkillInputPanel");
const SimpleGenericLayout_1 = require("../../../Util/Layout/SimpleGenericLayout");
const RoleSkinTrialController_1 = require("../RoleSkinTrail/RoleSkinTrialController");
const ActivityRoleTrialController_1 = require("./ActivityRoleTrialController");
class RoleIntroductionView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.dFe = 0;
    this.Nmo = undefined;
    this.$be = undefined;
    this.XLd = undefined;
    this.YLd = undefined;
    this.zLd = 0;
    this.pFe = () => {
      this.CloseMe();
    };
    this.wrh = () => {
      if (this.zLd === 0) {
        this.zLd = 1;
      } else {
        this.zLd = 0;
      }
      this.zao();
    };
    this.JLd = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UIHorizontalLayout], [3, UE.UIText], [4, UE.UITexture], [5, UE.UIText], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem]];
    this.BtnBindInfo = [[0, this.pFe]];
  }
  async OnBeforeStartAsync() {
    this.dFe = this.OpenParam;
    this.zLd = 0;
    this.$be = new SimpleGenericLayout_1.SimpleGenericLayout(this.GetHorizontalLayout(2));
    this.Nmo = new RoleSkillInputPanel_1.RoleSkillInputPanel();
    var i = this.GetItem(8).GetOwner();
    await this.Nmo.CreateThenShowByActorAsync(i);
    this.XLd = new ButtonItem_1.ButtonItem();
    this.YLd = new ButtonItem_1.ButtonItem();
    await Promise.all([this.XLd.CreateThenShowByActorAsync(this.GetItem(9).GetOwner()), this.YLd.CreateThenShowByActorAsync(this.GetItem(10).GetOwner())]);
    this.XLd.SetFunction(this.wrh);
    this.YLd.SetFunction(this.JLd);
    this.YLd.SetLocalTextNew("RoleTrialButton3");
    await this.RefreshAsync();
  }
  async RefreshAsync() {
    var i = ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillInputConfigById(this.dFe);
    var t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.dFe);
    if (i && t) {
      i = i.SkillDescList.length > 0;
      if (!i) {
        this.zLd = 1;
      }
      const r = this.GetTexture(1);
      r.SetUIActive(false);
      this.SetRoleIcon(t.FormationRoleCard, r, this.dFe, undefined, () => {
        r.SetUIActive(true);
      });
      this.GetText(3).ShowTextNew(t.Name);
      var e = ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(t.ElementId);
      var s = ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfoLocalName(e.Name);
      this.GetText(5).SetText(s);
      this.SetElementIcon(e.Icon, this.GetTexture(4), t.ElementId);
      this.$be.RebuildLayout(t.QualityId);
      await this.Nmo.RefreshUiAsync(this.dFe, true, false);
      this.XLd.SetActive(i);
      this.zao();
      this.C4e();
    }
  }
  zao() {
    var i = this.zLd === 0 ? "RoleTrialButton2" : "RoleTrialButton1";
    this.YLd.SetActive(this.zLd === 1);
    this.XLd.SetLocalTextNew(i);
    this.Nmo.SetFeatureActive(this.zLd === 0);
    this.Nmo.SetEmptyActive(this.zLd === 0);
    this.Nmo.SetTrickActive(this.zLd === 1);
  }
  C4e() {
    let i = "";
    if (!RoleSkinTrialController_1.RoleSkinTrialController.CheckIfInRoleSkinTrialInstance()) {
      var t = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
      for (const s of ActivityRoleTrialController_1.ActivityRoleTrialController.GetCurrentActivityDataList()) {
        var e = s.GetConfigByRoleAndInstance(this.dFe, t);
        if (e) {
          i = e.InstanceText;
          break;
        }
      }
    }
    if (StringUtils_1.StringUtils.IsEmpty(i)) {
      this.GetItem(7).SetUIActive(false);
    } else {
      this.GetText(6).ShowTextNew(i);
      this.GetItem(7).SetUIActive(true);
    }
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleIntroductionViewHide);
  }
  OnBeforeDestroy() {
    this.A7l();
  }
  A7l() {
    if (RoleSkinTrialController_1.RoleSkinTrialController.CheckIfInRoleSkinTrialInstance()) {
      RoleSkinTrialController_1.RoleSkinTrialController.RequestRoleSkinTrialUiEndPush();
    } else {
      ActivityRoleTrialController_1.ActivityRoleTrialController.PushRoleIntroductionViewDone();
    }
  }
}
exports.RoleIntroductionView = RoleIntroductionView;
//# sourceMappingURL=RoleIntroductionView.js.map