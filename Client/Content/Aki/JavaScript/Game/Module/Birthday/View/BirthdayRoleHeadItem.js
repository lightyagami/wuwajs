"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BirthdayRoleHeadItem = undefined;
const UE = require("ue");
const RoleInfoById_1 = require("../../../../Core/Define/ConfigQuery/RoleInfoById");
const RoleSkinById_1 = require("../../../../Core/Define/ConfigQuery/RoleSkinById");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class BirthdayRoleHeadItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.dFe = 0;
    this.OnToggleClickCallBack = undefined;
    this.N8e = () => {
      if (this.OnToggleClickCallBack) {
        this.OnToggleClickCallBack(this.GridIndex, this.dFe);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UITexture]];
    this.BtnBindInfo = [[0, this.N8e]];
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(() => true);
  }
  Refresh(e, t, i) {
    this.dFe = e;
    let r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.dFe)?.GetRoleSkinId();
    r = r || RoleInfoById_1.configRoleInfoById.GetConfig(this.dFe).SkinId;
    var e = RoleSkinById_1.configRoleSkinById.GetConfig(r);
    if (e) {
      e = e.RoleHeadIconCircle;
      this.SetTextureByPath(e, this.GetTexture(1));
    }
    this.SetToggleState(t);
    var e = ModelManager_1.ModelManager.BirthdayModel.IsRoleSelected(this.dFe);
    this.GetTexture(2).SetUIActive(e);
  }
  SetToggleState(e) {
    e = e ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(e);
  }
  OnSelected(e) {
    this.SetToggleState(true);
  }
  OnDeselected(e) {
    this.SetToggleState(false);
  }
}
exports.BirthdayRoleHeadItem = BirthdayRoleHeadItem;
//# sourceMappingURL=BirthdayRoleHeadItem.js.map