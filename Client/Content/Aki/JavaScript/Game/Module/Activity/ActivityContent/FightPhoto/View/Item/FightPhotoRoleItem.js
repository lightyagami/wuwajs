"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FightPhotoRoleItem = undefined;
const UE = require("ue");
const RoleInfoById_1 = require("../../../../../../../Core/Define/ConfigQuery/RoleInfoById");
const RoleSkinById_1 = require("../../../../../../../Core/Define/ConfigQuery/RoleSkinById");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
class FightPhotoRoleItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.OnBtnClickCallback = e => {};
    this.eje = () => {
      this.OnBtnClickCallback?.(this.GridIndex);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture]];
    this.BtnBindInfo = [[0, this.eje]];
  }
  Refresh(r) {
    var o = this.GetTexture(1);
    if (r === 0) {
      o.SetUIActive(false);
    } else {
      let e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(r)?.GetRoleSkinId();
      e = e || RoleInfoById_1.configRoleInfoById.GetConfig(r).SkinId;
      r = RoleSkinById_1.configRoleSkinById.GetConfig(e);
      this.SetTextureByPath(r.RoleHeadIcon, o);
      o.SetUIActive(true);
    }
  }
}
exports.FightPhotoRoleItem = FightPhotoRoleItem;
//# sourceMappingURL=FightPhotoRoleItem.js.map