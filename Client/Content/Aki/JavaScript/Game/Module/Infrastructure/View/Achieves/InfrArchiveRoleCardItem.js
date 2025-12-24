"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrArchiveRoleCardItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class InfrArchiveRoleCardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.xe = 0;
    this.SelectedCallBack = undefined;
    this.Y3m = () => {
      this.SelectedCallBack?.(this.GridIndex);
    };
  }
  get MsgId() {
    return this.xe;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIItem], [4, UE.UITexture], [5, UE.UIText]];
    this.BtnBindInfo = [[0, this.Y3m]];
  }
  Refresh(e) {
    this.xe = e;
    this.J3m();
  }
  J3m() {
    var e = ConfigManager_1.ConfigManager.InfrastructureConfig.GetInfrPhoneMessageConfigById(this.xe);
    var r = ModelManager_1.ModelManager.PhoneMsgModel.IsPhoneMsgUnlock(this.xe);
    this.GetItem(1).SetUIActive(!r);
    this.GetItem(3).SetUIActive(r);
    this.SetTextureByPath(e.RoleTexturePath, this.GetTexture(4));
    this.GetText(5).ShowTextNew(e.Name);
  }
  SetSelectedCallBack(e) {
    this.SelectedCallBack = e;
  }
}
exports.InfrArchiveRoleCardItem = InfrArchiveRoleCardItem;
//# sourceMappingURL=InfrArchiveRoleCardItem.js.map