"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RoleIntroductionView = void 0;
const UE = require("ue"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  BigElementItem_1 = require("../../../Common/BigElementItem"),
  RoleSkillInputPanel_1 = require("../../../RoleUi/RoleSkill/RoleSkillInputPanel"),
  SimpleGenericLayout_1 = require("../../../Util/Layout/SimpleGenericLayout"),
  RoleSkinTrialController_1 = require("../RoleSkinTrail/RoleSkinTrialController"),
  ActivityRoleTrialController_1 = require("./ActivityRoleTrialController");
class RoleIntroductionView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.dFe = 0, this.Nmo = void 0, this.$be = void 0, this.gFe = void 0, this.pFe = () => {
      this.CloseMe()
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UITexture],
      [2, UE.UIHorizontalLayout],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIItem],
      [7, UE.UIItem]
    ], this.BtnBindInfo = [
      [0, this.pFe]
    ]
  }
  async OnBeforeStartAsync() {
    this.gFe = new BigElementItem_1.BigElementItem;
    var e = this.GetItem(4),
      e = (await this.gFe.CreateByActorAsync(e.GetOwner()), this.Nmo = new RoleSkillInputPanel_1.RoleSkillInputPanel, this.GetItem(7).GetOwner());
    await this.Nmo.CreateThenShowByActorAsync(e)
  }
  OnStart() {
    this.$be = new SimpleGenericLayout_1.SimpleGenericLayout(this.GetHorizontalLayout(2)), this.dFe = this.OpenParam, this.Refresh()
  }
  Refresh() {
    var e = ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillInputConfigById(this.dFe),
      i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.dFe);
    if (e && i) {
      const t = this.GetTexture(1);
      t.SetUIActive(!1), this.SetRoleIcon(i.FormationRoleCard, t, this.dFe, void 0, () => {
        t.SetUIActive(!0)
      }), this.GetText(3).ShowTextNew(i.Name), this.gFe.Refresh(i.ElementId), this.gFe.SetUiActive(!0), this.$be.RebuildLayout(i.QualityId), this.Nmo.RefreshUi(this.dFe, !0, !1), this.C4e()
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
          break
        }
      }
    }
    StringUtils_1.StringUtils.IsEmpty(e) ? this.GetItem(6).SetUIActive(!1) : (this.GetText(5).ShowTextNew(e), this.GetItem(6).SetUIActive(!0))
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleIntroductionViewHide)
  }
  OnBeforeDestroy() {
    this.A7l()
  }
  A7l() {
    RoleSkinTrialController_1.RoleSkinTrialController.CheckIfInRoleSkinTrialInstance() ? RoleSkinTrialController_1.RoleSkinTrialController.RequestRoleSkinTrialUiEndPush() : ActivityRoleTrialController_1.ActivityRoleTrialController.PushRoleIntroductionViewDone()
  }
}
exports.RoleIntroductionView = RoleIntroductionView;
//# sourceMappingURL=RoleIntroductionView.js.map