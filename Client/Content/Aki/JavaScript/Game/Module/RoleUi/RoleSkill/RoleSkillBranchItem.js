"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkillBranchItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const RoleSkillBranchTipsItem_1 = require("./RoleSkillBranchTipsItem");
class RoleSkillBranchItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.dFe = 0;
    this.$Ff = false;
    this.jFf = undefined;
    this.WFf = e => {
      e = e === 0 ? 0 : 1;
      e = ModelManager_1.ModelManager.RoleModel.GetRoleBranchIdByIndex(this.dFe, e);
      if (e !== ModelManager_1.ModelManager.RoleModel.GetRoleCurrentBranchId(this.dFe)) {
        ControllerHolder_1.ControllerHolder.RoleController.RequestRoleSkillBranchModify(this.dFe, e);
      }
    };
    this.QFf = () => {
      var e = this.GetButton(6).RootUIComp;
      if (this.jFf.IsTipsVisible) {
        this.jFf.SetTipsVisible(false);
        e.SetUIActive(false);
      } else {
        this.jFf.RefreshView(this.dFe, this.$Ff);
        this.jFf.SetTipsVisible(true);
        e.SetUIActive(true);
      }
    };
    this.Lke = () => ModelManager_1.ModelManager.RoleModel.CheckCanSwitchRoleBranch(true) && ModelManager_1.ModelManager.RoleModel.IsRoleHasBranch(this.dFe);
    this.tWf = () => {
      this.jFf.SetTipsVisible(false);
      this.GetButton(6).RootUIComp.SetUIActive(false);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UISprite], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UISprite], [5, UE.UISprite], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIItem]];
    this.BtnBindInfo = [[0, this.WFf], [2, this.QFf], [6, this.tWf]];
  }
  async OnBeforeStartAsync() {
    await this.KFf();
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.Lke);
    this.GetButton(6).RootUIComp.SetUIActive(false);
  }
  async KFf() {
    this.jFf = new RoleSkillBranchTipsItem_1.RoleSkillBranchTipsItem();
    await this.jFf.CreateByResourceIdAsync("UiItem_RoleTagTip", this.GetItem(3));
  }
  Refresh(e, i) {
    this.dFe = e;
    this.$Ff = i;
    var e = ModelManager_1.ModelManager.RoleModel.IsRoleHasBranch(this.dFe);
    this.GetRootItem().SetUIActive(e);
    if (e && (this.GetSprite(1).SetUIActive(!this.$Ff), i = ModelManager_1.ModelManager.RoleModel.GetRoleBranchIdByIndex(this.dFe, 0), e = ConfigManager_1.ConfigManager.RoleConfig.GetSkillBranchConfigById(i), this.SetSpriteByPath(e.Icon, this.GetSprite(4), false), i = ModelManager_1.ModelManager.RoleModel.GetRoleBranchIdByIndex(this.dFe, 1), e = ConfigManager_1.ConfigManager.RoleConfig.GetSkillBranchConfigById(i), this.SetSpriteByPath(e.Icon, this.GetSprite(5), false), this.GetItem(7).SetUIActive(this.$Ff), this.GetItem(8).SetUIActive(this.$Ff), i = ModelManager_1.ModelManager.RoleModel.GetRoleCurrentBranchIndex(this.dFe), e = this.$Ff ? i === 0 ? 0 : 1 : 2, this.GetExtendToggle(0).SetToggleStateForce(e, false), ModelManager_1.ModelManager.RoleModel.IsRoleOwned(this.dFe))) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGuideTriggerEvent, "OnShowOwnedRoleSkillBranch");
    }
  }
}
exports.RoleSkillBranchItem = RoleSkillBranchItem;
//# sourceMappingURL=RoleSkillBranchItem.js.map