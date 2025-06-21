"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.OpponentMonsterProxy = void 0;
const PhantomArenaAssetManager_1 = require("../PhantomArenaAssetManager"),
  OpponentFunctionAreaProxy_1 = require("./OpponentFunctionAreaProxy");
class OpponentMonsterProxy extends OpponentFunctionAreaProxy_1.OpponentFunctionAreaProxy {
  constructor() {
    super(...arguments), this.AreaItem = void 0, this.IsMonster = !0
  }
  GetCardAttachItem() {
    return this.AreaItem.GetCardRootItem()
  }
  async EvolveCard(t) {
    var e = this.Card,
      t = (this.Card = await this.AddCardById(t), this.ParentArea.ParentArea.HandArea.GetLayoutItem());
    await this.PlaySetBattleTween(t), await Promise.all([this.hru(e), this.AreaItem.SetEvolveActive(!0)])
  }
  async hru(t) {
    t && (PhantomArenaAssetManager_1.PhantomArenaAssetManager.RemovePhantomArenaAssetByCardConfigId(t.Data.ConfigId), await t.DestroyAsync())
  }
}
exports.OpponentMonsterProxy = OpponentMonsterProxy;
//# sourceMappingURL=OpponentMonsterProxy.js.map