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
    this.v9f = false;
    this.p9f = undefined;
    this.h8g = new Set();
    this.y9f = e => {
      e = e === 0 ? 0 : 1;
      e = ModelManager_1.ModelManager.RoleModel.GetRoleBranchIdByIndex(this.dFe, e);
      if (e !== ModelManager_1.ModelManager.RoleModel.GetRoleCurrentBranchId(this.dFe)) {
        ControllerHolder_1.ControllerHolder.RoleController.RequestRoleSkillBranchModify(this.dFe, e);
      }
    };
    this.S9f = () => {
      var e = this.GetButton(6).RootUIComp;
      if (this.p9f.IsTipsVisible) {
        this.p9f.SetTipsVisible(false);
        e.SetUIActive(false);
      } else {
        this.p9f.RefreshView(this.dFe, this.v9f);
        this.p9f.SetTipsVisible(true);
        e.SetUIActive(true);
      }
    };
    this.Lke = () => ModelManager_1.ModelManager.RoleModel.CheckCanSwitchRoleBranch(true) && ModelManager_1.ModelManager.RoleModel.IsRoleHasBranch(this.dFe);
    this.xog = () => {
      this.p9f.SetTipsVisible(false);
      this.GetButton(6).RootUIComp.SetUIActive(false);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UISprite], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UISprite], [5, UE.UISprite], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIItem]];
    this.BtnBindInfo = [[0, this.y9f], [2, this.S9f], [6, this.xog]];
  }
  async OnBeforeStartAsync() {
    await this.M9f();
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.Lke);
    this.GetButton(6).RootUIComp.SetUIActive(false);
  }
  async M9f() {
    this.p9f = new RoleSkillBranchTipsItem_1.RoleSkillBranchTipsItem();
    await this.p9f.CreateByResourceIdAsync("UiItem_RoleTagTip", this.GetItem(3));
  }
  SetSkillBranchVisible(e, i) {
    if (i) {
      this.h8g.delete(e);
    } else {
      this.h8g.add(e);
    }
    i = this.l8g();
    this.GetRootItem().SetUIActive(i);
    return i;
  }
  l8g() {
    return this.h8g.size === 0;
  }
  Refresh(e, i) {
    this.dFe = e;
    this.v9f = i;
    var e = ModelManager_1.ModelManager.RoleModel.IsRoleHasBranch(this.dFe);
    if (this.SetSkillBranchVisible(0, e) && (this.GetSprite(1).SetUIActive(!this.v9f), i = ModelManager_1.ModelManager.RoleModel.GetRoleBranchIdByIndex(this.dFe, 0), e = ConfigManager_1.ConfigManager.RoleConfig.GetSkillBranchConfigById(i), this.SetSpriteByPath(e.Icon, this.GetSprite(4), false), i = ModelManager_1.ModelManager.RoleModel.GetRoleBranchIdByIndex(this.dFe, 1), e = ConfigManager_1.ConfigManager.RoleConfig.GetSkillBranchConfigById(i), this.SetSpriteByPath(e.Icon, this.GetSprite(5), false), this.GetItem(7).SetUIActive(this.v9f), this.GetItem(8).SetUIActive(this.v9f), i = ModelManager_1.ModelManager.RoleModel.GetRoleCurrentBranchIndex(this.dFe), e = this.v9f ? i === 0 ? 0 : 1 : 2, this.GetExtendToggle(0).SetToggleStateForce(e, false), ModelManager_1.ModelManager.RoleModel.IsRoleOwned(this.dFe))) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGuideTriggerEvent, "OnShowOwnedRoleSkillBranch");
    }
  }
}
exports.RoleSkillBranchItem = RoleSkillBranchItem;
//# sourceMappingURL=RoleSkillBranchItem.js.map