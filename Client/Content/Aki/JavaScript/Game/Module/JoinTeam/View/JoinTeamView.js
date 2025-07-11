"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JoinTeamView = undefined;
const UE = require("ue");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const MiniElementItem_1 = require("../../Common/MiniElementItem");
const JoinTeamController_1 = require("../JoinTeamController");
const RoleController_1 = require("../../RoleUi/RoleController");
class JoinTeamView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Vfi = undefined;
    this.Hfi = false;
    this.jfi = () => {
      var e = ModelManager_1.ModelManager.RoleModel;
      var i = ModelManager_1.ModelManager.JoinTeamModel.GetRoleDescriptionId();
      var i = ConfigManager_1.ConfigManager.JoinTeamConfig.GetRoleConfigId(i);
      var e = e.GetRoleDataById(i);
      JoinTeamController_1.JoinTeamController.CloseJoinTeamView();
      if (e) {
        RoleController_1.RoleController.OpenRoleMainView(0, e.GetRoleId());
      }
    };
    this.Vgt = () => {
      JoinTeamController_1.JoinTeamController.CloseJoinTeamView();
    };
    this.Wfi = () => {
      this.Kfi();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UINiagara], [3, UE.UIText], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIItem]];
    this.BtnBindInfo = [[4, this.jfi], [6, this.Vgt]];
  }
  OnStart(e = false) {
    this.Hfi = e;
    this.GetTexture(1)?.SetUIActive(false);
    this.GetButton(4)?.RootUIComp.SetUIActive(!e);
    this.Kfi();
    this.Ore();
  }
  OnBeforeDestroy() {
    this.kre();
    if (this.Vfi) {
      this.Vfi.Destroy();
      this.Vfi = undefined;
    }
  }
  Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshJoinTeamRole, this.Wfi);
  }
  kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshJoinTeamRole, this.Wfi);
  }
  Kfi() {
    var e;
    var i;
    var t;
    var r;
    var s = ModelManager_1.ModelManager.JoinTeamModel.GetRoleDescriptionId();
    if (s) {
      e = (r = ConfigManager_1.ConfigManager.JoinTeamConfig).GetRoleNameId(s);
      i = r.GetRoleTexturePath(s);
      t = r.GetRoleElementId(s);
      r = r.GetRoleDescriptionId(s);
      this.Qfi(t);
      this.Xfi(i);
      this.$fi(e);
      this.Yfi(r);
      this.GetUiNiagara(2).ActivateSystem(true);
      this.Jfi();
    }
  }
  Qfi(e) {
    var i = this.GetItem(5).GetOwner();
    this.Vfi = new MiniElementItem_1.MiniElementItem(e, undefined, i);
  }
  $fi(e) {
    this.GetText(0).ShowTextNew(e);
  }
  Xfi(e) {
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Texture, e => {
      this.GetTexture(1)?.SetTexture(e);
      this.GetTexture(1)?.SetUIActive(true);
    });
  }
  Yfi(e) {
    this.GetText(3).ShowTextNew(e);
  }
  Jfi() {
    this.GetItem(7)?.SetUIActive(this.Hfi);
  }
}
exports.JoinTeamView = JoinTeamView;
//# sourceMappingURL=JoinTeamView.js.map