"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandBookRoleMediumItemGird = undefined;
const LoopScrollMediumItemGrid_1 = require("../Common/MediumItemGrid/LoopScrollMediumItemGrid");
const RoleDataBase_1 = require("../RoleUi/RoleData/RoleDataBase");
const RoleDefine_1 = require("../RoleUi/RoleDefine");
class HandBookRoleMediumItemGird extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  OnRefresh(e, o, i) {
    let t = false;
    if (e.GetDataId() >= RoleDefine_1.ROBOT_DATA_MIN_ID) {
      t = true;
    }
    let s = e.GetIsNew();
    if (t) {
      s = false;
    }
    e = {
      Type: 2,
      Data: e,
      ItemConfigId: e.GetRoleId(),
      SkinId: e.GetRoleConfig().SkinId,
      BottomText: e.GetName(),
      ElementId: e.GetRoleConfig().ElementId,
      IsNewVisible: s,
      IsDisable: t,
      IsShowLock: t
    };
    this.Apply(e);
    this.SetSelected(o);
  }
  OnSelected(e) {
    this.SetSelected(true);
    this.SetNewVisible(false);
    if (this.Data instanceof RoleDataBase_1.RoleDataBase && this.Data.GetRoleId() < RoleDefine_1.ROBOT_DATA_MIN_ID) {
      this.Data.TryRemoveNewFlag();
    }
  }
  OnDeselected(e) {
    this.SetSelected(false, true);
  }
}
exports.HandBookRoleMediumItemGird = HandBookRoleMediumItemGird;
//# sourceMappingURL=HandBookRoleMediumItemGird.js.map