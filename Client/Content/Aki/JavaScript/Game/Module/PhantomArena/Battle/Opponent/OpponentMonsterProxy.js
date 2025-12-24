"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpponentMonsterProxy = undefined;
const PhantomArenaAssetManager_1 = require("../PhantomArenaAssetManager");
const OpponentFunctionAreaProxy_1 = require("./OpponentFunctionAreaProxy");
class OpponentMonsterProxy extends OpponentFunctionAreaProxy_1.OpponentFunctionAreaProxy {
  constructor() {
    super(...arguments);
    this.AreaItem = undefined;
    this.IsMonster = true;
  }
  get IsNeedPreload() {
    return !!this.Card && this.Card.Data.IsNormal;
  }
  GetCardAttachItem() {
    return this.AreaItem.GetCardRootItem();
  }
  async EvolveCard(t) {
    var e = this.Card;
    this.Card = await this.AddCardById(t);
    var t = this.ParentArea.ParentArea.HandArea.GetLayoutItem();
    await this.PlaySetBattleTween(t);
    await Promise.all([this.lau(e), this.AreaItem.SetEvolveActive(true)]);
  }
  async CopyCard(t) {
    if (!this.Card) {
      this.Card = await this.AddFightCardById(t);
      await this.Card.ShowCopyEffect();
    }
  }
  async lau(t) {
    if (t) {
      PhantomArenaAssetManager_1.PhantomArenaAssetManager.RemovePhantomArenaAssetByCardConfigId(t.Data.ConfigId);
      await t.DestroyAsync();
    }
  }
}
exports.OpponentMonsterProxy = OpponentMonsterProxy;
//# sourceMappingURL=OpponentMonsterProxy.js.map