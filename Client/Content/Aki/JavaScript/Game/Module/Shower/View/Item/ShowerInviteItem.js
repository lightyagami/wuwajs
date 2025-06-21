"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ShowerInviteItem = void 0;
const UE = require("ue"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class ShowerInviteItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.dFe = 0, this.aCo = void 0, this._n_ = !1, this.H5e = void 0, this.H$1 = void 0, this.sft = void 0, this.kqe = t => {
      this.H$1?.(this.aCo)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UIText]
    ], this.BtnBindInfo = [
      [0, this.kqe]
    ]
  }
  OnStart() {
    this.sft = new SmallItemGrid_1.SmallItemGrid, this.sft.Initialize(this.GetItem(3).GetOwner()), this.H5e = this.GetExtendToggle(0), this.H5e?.OnStateChange.Add(this.kqe)
  }
  Refresh(t, i, s) {
    this.aCo = t, this.dFe = this.aCo.GetRoleId();
    t = ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationData?.GetRoleIdList ?? [], this._n_ = t.includes(this.dFe), this._Oe(), t = {
      Data: this.aCo,
      SkinId: this.aCo.GetRoleSkinId(),
      Type: 2,
      ItemConfigId: this.dFe,
      IsBlack: this._n_
    }, this.sft?.Apply(t), this.sft?.BindOnCanExecuteChange(() => !1), this.GetText(1)?.SetText(this.aCo.GetRoleRealName()), t = this.aCo.GetFavorData().GetFavorLevel();
    this.GetText(2).SetUIActive(!this._n_), this._n_ ? LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "CannotInviteInFormation") : this.GetText(4)?.SetText("" + t)
  }
  _Oe() {
    var t;
    this._n_ ? (this.GetItem(5)?.SetUIActive(!1), this.H5e?.SetToggleStateForce(2)) : (-1 !== (t = ModelManager_1.ModelManager.ShowerModel.GetRolePos(this.aCo)) ? (this.GetItem(5)?.SetUIActive(!0), this.GetText(6)?.SetText((t + 1).toString())) : this.GetItem(5)?.SetUIActive(!1), ModelManager_1.ModelManager.ShowerModel.CheckRoleInCurPos(this.aCo) ? this.H5e?.SetToggleState(1) : (this.H5e?.SetToggleStateForce(0, !1, !0), (t = this.H5e?.GetOwner()) && t.SetActorScale3D(new UE.Vector(1, 1, 1))))
  }
  BindRoleSelectCallback(t) {
    this.H$1 = t
  }
}
exports.ShowerInviteItem = ShowerInviteItem;
//# sourceMappingURL=ShowerInviteItem.js.map