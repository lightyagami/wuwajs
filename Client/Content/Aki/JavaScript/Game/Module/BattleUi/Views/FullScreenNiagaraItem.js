"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FullScreenNiagaraItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const BattleChildView_1 = require("./BattleChildView/BattleChildView");
class FullScreenNiagaraItem extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments);
    this.Tht = undefined;
    this.Lht = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UINiagara]];
  }
  Reset() {
    this.Lht?.SetNiagaraSystem(undefined);
    this.Tht = undefined;
    this.Lht = undefined;
    super.Reset();
  }
  async LoadNiagara(e) {
    if (StringUtils_1.StringUtils.IsEmpty(e)) {
      return false;
    }
    if (this.Tht === e) {
      return false;
    }
    this.Tht = e;
    const t = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.NiagaraSystem, e => {
      if (e && this.RootItem && (this.Lht = this.GetUiNiagara(0), this.Lht)) {
        this.Lht.SetNiagaraSystem(undefined);
        this.Lht.SetNiagaraSystem(e);
        t.SetResult(true);
      } else {
        t.SetResult(false);
      }
    });
    await t.Promise;
    return true;
  }
  SetNiagaraFloatValue(e, t) {
    if (this.Lht) {
      this.Lht.SetNiagaraVarFloat(e, t);
    }
  }
  SetVisible(e) {
    var t = this.GetUiNiagara(0);
    if (e) {
      t.ActivateSystem(true);
    } else {
      this.Lht.SetNiagaraSystem(undefined);
      this.Lht.DeactivateSystem();
    }
    this.SetActive(e);
  }
}
exports.FullScreenNiagaraItem = FullScreenNiagaraItem;
//# sourceMappingURL=FullScreenNiagaraItem.js.map