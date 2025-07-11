"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BusinessHelperPanel = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../../../Ui/Base/UiPanelBase");
const EditTeamModule_1 = require("../Common/EditTeamModule");
class BusinessHelperPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.EditTeamModule = undefined;
    this.SelectedRoleId = 0;
    this.RoleList = [];
    this.aOn = undefined;
    this.Mke = () => {
      this.aOn?.SkipToInteractivePanel();
    };
    this.Wpa = () => {
      var e;
      var i = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(this.SelectedRoleId);
      if (i.JumpType === 1) {
        this.aOn?.SkipToTaskView(1, i.Id);
      } else if (i.JumpType === 2) {
        if (ModelManager_1.ModelManager.MoonChasingTaskModel.GetBranchLineState(i.JumpParam) === 0) {
          if ((e = ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingIdByRoleId(i.Id)) <= 0) {
            this.aOn?.SkipToBuildingPreview();
          } else {
            this.aOn?.SkipToBuildingView(e);
          }
        } else {
          this.aOn?.SkipToTaskView(2, i.JumpParam);
        }
      }
    };
    this.qke = (e, i, s) => {
      var t = this.SelectedRoleId;
      this.SelectedRoleId = e;
      var h = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetEditTeamDataById(e);
      this.GetButton(1)?.RootUIComp.SetUIActive(h.IsOwn);
      this.GetButton(2)?.RootUIComp.SetUIActive(!h.IsOwn);
      if (t !== 0) {
        this.EditTeamModule.SelectEditTeamItem(s);
      }
      this.aOn?.RefreshSpine(e).finally(undefined);
    };
    this.Lke = (e, i) => this.SelectedRoleId !== e || i !== 1;
    this.dga = e => this.SelectedRoleId === e;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.Mke], [2, this.Wpa]];
  }
  async OnBeforeStartAsync() {
    this.EditTeamModule = new EditTeamModule_1.EditTeamModule();
    this.EditTeamModule.SetClickEvent(this.qke);
    this.EditTeamModule.SetCanExecuteChange(this.Lke);
    this.EditTeamModule.SetIsItemSelected(this.dga);
    await this.EditTeamModule.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.EditTeamModule.SetTitleItemActive(false);
  }
  async OnBeforeShowAsyncImplement() {
    this.RoleList = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetHelpEditTeamDataList();
    this.EditTeamModule.SetEditTeamDataList(this.RoleList);
    await this.EditTeamModule.RefreshEditTeamModule();
    this.EditTeamModule.SelectEditTeamItem(this.EditTeamModule.GetSelectGridIndex(), true);
  }
  RegisterViewController(e) {
    this.aOn = e;
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    return this.EditTeamModule.GetGuideUiItemAndUiItemForShowEx(e);
  }
}
exports.BusinessHelperPanel = BusinessHelperPanel;
//# sourceMappingURL=BusinessHelperPanel.js.map