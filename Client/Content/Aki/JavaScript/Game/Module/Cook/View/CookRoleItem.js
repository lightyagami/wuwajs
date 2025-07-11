"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CookRoleItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const CookController_1 = require("../CookController");
class CookRoleItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.fGt = undefined;
    this.oft = undefined;
    this.sft = undefined;
    this.eTt = t => {
      if (this.oft) {
        this.oft(this.fGt.RoleId);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.eTt]];
  }
  OnStart() {
    this.sft = new SmallItemGrid_1.SmallItemGrid();
    this.sft.Initialize(this.GetItem(3).GetOwner());
  }
  Refresh(t, e, i) {
    t = {
      Type: 2,
      Data: this.fGt = t,
      ItemConfigId: t.RoleId,
      IsCookUp: t.IsBuff
    };
    this.sft.Apply(t);
    this.qWe();
    this.aNt();
    this.N6e(e, false);
    this.GetText(2).OnSelfLanguageChange.Bind(() => {
      this.aNt();
    });
  }
  Clear() {
    this.GetText(2).OnSelfLanguageChange.Unbind();
  }
  OnBeforeDestroy() {
    this.sft.Destroy();
    this.sft = undefined;
  }
  aNt() {
    var t;
    if (CookController_1.CookController.CheckIsBuff(this.fGt.RoleId, this.fGt.ItemId)) {
      t = CookController_1.CookController.GetCookInfoText(this.fGt.RoleId);
      this.GetText(2).SetText(t);
    } else {
      t = ConfigManager_1.ConfigManager.TextConfig.GetTextById("DefaultHelperText");
      this.GetText(2).SetText(t);
    }
  }
  qWe() {
    this.GetText(1).SetText(this.fGt.RoleName);
  }
  BindOnClickedCallback(t) {
    this.oft = t;
  }
  OnSelected(t) {
    this.N6e(true);
  }
  OnDeselected(t) {
    this.N6e(false);
  }
  N6e(t, e = true) {
    var i = this.GetExtendToggle(0);
    if (t) {
      i.SetToggleState(1, e);
    } else {
      i.SetToggleState(0, false);
    }
  }
}
exports.CookRoleItem = CookRoleItem;
//# sourceMappingURL=CookRoleItem.js.map