"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalRoleSmallItemGrid = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class PersonalRoleSmallItemGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.v3l = undefined;
    this.AVi = undefined;
    this.PVi = e => {
      if (e === 1 && this.AVi) {
        this.AVi(this.v3l);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIExtendToggle], [2, UE.UIInteractionGroup], [3, UE.UIItem]];
    this.BtnBindInfo = [[1, this.PVi]];
  }
  Refresh(e, t, s) {
    this.v3l = e;
    var i = ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(4);
    const r = this.GetTexture(0);
    r.SetUIActive(false);
    this.SetTextureShowUntilLoaded(e.GetRoleCardHeadIcon(), r, () => {
      r.SetUIActive(true);
    });
    this.GetTexture(0).SetIsGray(e.Lock);
    this.GetItem(3).SetUIActive(e.Id === i);
    e = t ? 1 : 0;
    this.GetExtendToggle(1).SetToggleState(e);
  }
  BindToggleClickCallBack(e) {
    this.AVi = e;
  }
  OnSelected(e) {
    this.GetExtendToggle(1).SetToggleState(1);
  }
  OnDeselected(e) {
    this.GetExtendToggle(1).SetToggleState(0);
  }
}
exports.PersonalRoleSmallItemGrid = PersonalRoleSmallItemGrid;
//# sourceMappingURL=PersonalRoleSmallItemGrid.js.map