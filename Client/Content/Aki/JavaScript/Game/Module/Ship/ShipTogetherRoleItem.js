"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTogetherRoleItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../Manager/ModelManager");
const SmallItemGrid_1 = require("../Common/SmallItemGrid/SmallItemGrid");
const GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../Util/LguiUtil");
class ShipTogetherRoleItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.dFe = 0;
    this.sft = undefined;
    this.H5e = undefined;
    this.ZBl = undefined;
    this._n_ = false;
    this.kqe = t => {
      if (t === 1) {
        this.ZBl?.(this.H5e, this.dFe);
      } else if (t === 0) {
        this.ZBl?.(undefined, 0);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UIItem]];
  }
  OnStart() {
    this.sft = new SmallItemGrid_1.SmallItemGrid();
    this.sft.Initialize(this.GetItem(4).GetOwner());
    this.H5e = this.GetExtendToggle(0);
    this.H5e?.OnStateChange.Add(this.kqe);
  }
  Refresh(t, i, e) {
    this.dFe = t.GetRoleId();
    var s = ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationData?.GetRoleIdList ?? [];
    this._n_ = s.includes(this.dFe);
    this._Oe();
    var s = {
      Data: t,
      SkinId: t.GetRoleSkinId(),
      Type: 2,
      ItemConfigId: this.dFe,
      IsBlack: this._n_
    };
    this.sft?.Apply(s);
    this.sft?.BindOnCanExecuteChange(() => false);
    this.GetText(1)?.SetText(t.GetRoleRealName());
    var s = t.GetFavorData().GetFavorLevel();
    this.GetText(2).SetUIActive(!this._n_);
    if (this._n_) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "CannotInviteInFormation");
    } else {
      this.GetText(3)?.SetText("" + s);
    }
  }
  BindOnClickToggleCallBack(t) {
    this.ZBl = t;
  }
  _Oe() {
    if (this._n_) {
      this.H5e?.SetToggleState(2);
    } else if (this.dFe === ModelManager_1.ModelManager.ShipTogetherModel.CurrentSelectTogetherRoleId) {
      this.H5e?.SetToggleStateForce(1, true);
    } else {
      this.H5e?.SetToggleState(0);
    }
  }
}
exports.ShipTogetherRoleItem = ShipTogetherRoleItem;
//# sourceMappingURL=ShipTogetherRoleItem.js.map