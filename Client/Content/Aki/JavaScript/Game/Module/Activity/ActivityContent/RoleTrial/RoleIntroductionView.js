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
const BigElementItem_1 = require("../../../Common/BigElementItem");
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
    this.gFe = undefined;
    this.pFe = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UIHorizontalLayout], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIItem]];
    this.BtnBindInfo = [[0, this.pFe]];
  }
  async OnBeforeStartAsync() {
    this.gFe = new BigElementItem_1.BigElementItem();
    var e = this.GetItem(4);
    await this.gFe.CreateByActorAsync(e.GetOwner());
    this.Nmo = new RoleSkillInputPanel_1.RoleSkillInputPanel();
    var e = this.GetItem(7).GetOwner();
    await this.Nmo.CreateThenShowByActorAsync(e);
  }
  OnStart() {
    this.$be = new SimpleGenericLayout_1.SimpleGenericLayout(this.GetHorizontalLayout(2));
    this.dFe = this.OpenParam;
    this.Refresh();
  }
  Refresh() {
    var e = ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillInputConfigById(this.dFe);
    var i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.dFe);
    if (e && i) {
      const t = this.GetTexture(1);
      t.SetUIActive(false);
      this.SetRoleIcon(i.FormationRoleCard, t, this.dFe, undefined, () => {
        t.SetUIActive(true);
      });
      this.GetText(3).ShowTextNew(i.Name);
      this.gFe.Refresh(i.ElementId);
      this.gFe.SetUiActive(true);
      this.$be.RebuildLayout(i.QualityId);
      this.Nmo.RefreshUiAsync(this.dFe, true, false);
      this.C4e();
    }
  }
  C4e() {
    let e = "";
    if (!RoleSkinTrialController_1.RoleSkinTrialController.CheckIfInRoleSkinTrialInstance()) {
      var i = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
      for (const r of ActivityRoleTrialController_1.ActivityRoleTrialController.GetCurrentActivityDataList()) {
        var t = r.GetConfigByRoleAndInstance(this.dFe, i);
        if (t) {
          e = t.InstanceText;
          break;
        }
      }
    }
    if (StringUtils_1.StringUtils.IsEmpty(e)) {
      this.GetItem(6).SetUIActive(false);
    } else {
      this.GetText(5).ShowTextNew(e);
      this.GetItem(6).SetUIActive(true);
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