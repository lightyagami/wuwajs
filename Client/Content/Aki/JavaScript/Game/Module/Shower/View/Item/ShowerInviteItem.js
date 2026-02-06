"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowerInviteItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class ShowerInviteItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.dFe = 0;
    this.aCo = undefined;
    this._n_ = false;
    this.H5e = undefined;
    this.RW1 = undefined;
    this.sft = undefined;
    this.kqe = t => {
      this.RW1?.(this.aCo);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIText]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  OnStart() {
    this.sft = new SmallItemGrid_1.SmallItemGrid();
    this.sft.Initialize(this.GetItem(3).GetOwner());
    this.H5e = this.GetExtendToggle(0);
    this.H5e?.OnStateChange.Add(this.kqe);
  }
  Refresh(t, i, s) {
    this.aCo = t.RoleInstance;
    this.dFe = t.RoleInstance.GetRoleId();
    this._n_ = t.IsInFormation;
    this._Oe();
    t = {
      Data: this.aCo,
      SkinId: this.aCo.GetRoleSkinId(),
      Type: 2,
      ItemConfigId: this.dFe,
      IsBlack: this._n_
    };
    this.sft?.Apply(t);
    this.sft?.BindOnCanExecuteChange(() => false);
    this.GetText(1)?.SetText(this.aCo.GetRoleRealName());
    t = this.aCo.GetFavorData().GetFavorLevel();
    this.GetText(2).SetUIActive(!this._n_);
    if (this._n_) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "CannotInviteInFormation");
    } else {
      this.GetText(4)?.SetText("" + t);
    }
  }
  _Oe() {
    var t;
    if (this._n_) {
      this.GetItem(5)?.SetUIActive(false);
      this.H5e?.SetToggleStateForce(2);
    } else {
      if ((t = ModelManager_1.ModelManager.ShowerModel.GetRolePos(this.aCo)) !== -1) {
        this.GetItem(5)?.SetUIActive(true);
        this.GetText(6)?.SetText((t + 1).toString());
      } else {
        this.GetItem(5)?.SetUIActive(false);
      }
      if (ModelManager_1.ModelManager.ShowerModel.CheckRoleInCurPos(this.aCo)) {
        this.H5e?.SetToggleState(1);
      } else {
        this.H5e?.SetToggleStateForce(0, false, true);
        if (t = this.H5e?.GetOwner()) {
          t.SetActorScale3D(new UE.Vector(1, 1, 1));
        }
      }
    }
  }
  BindRoleSelectCallback(t) {
    this.RW1 = t;
  }
}
exports.ShowerInviteItem = ShowerInviteItem;
//# sourceMappingURL=ShowerInviteItem.js.map