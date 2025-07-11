"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonCardItem = undefined;
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CommonBaseCardItem_1 = require("./CommonBaseCardItem");
class CommonCardItem extends CommonBaseCardItem_1.CommonBaseCardItem {
  OnRegisterCardComponent() {
    this.ComponentsRegisterInfoByItem = [[0, this.GetRootItem()]];
    this.ComponentsRegisterInfoByResourceId = [[7, "UiItem_SoundRemnantItem512Spine", this.GetSpineRootItem()]];
  }
  Refresh(e) {
    var o = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e);
    var a = o.InitAttack;
    var r = ModelManager_1.ModelManager.PhantomArenaModel.CreateCardSpineData(e);
    var t = ModelManager_1.ModelManager.PhantomArenaModel.GetCardFaceType(e);
    var a = {
      CardId: e,
      Cost: o.Cost,
      Attack: a.get(Protocol_1.Aki.Protocol.GC1.Proto_AttackAbility),
      Life: a.get(Protocol_1.Aki.Protocol.GC1.Proto_LifeAbility),
      Element: o.Element,
      CardFaceTexturePath: o.CardFaceTexture,
      ShowCardFaceTexture: t === 0,
      OutlookUnlocked: ModelManager_1.ModelManager.PhantomArenaModel.IsCardOutlookUnlock(e)
    };
    this.GetComponent(0)?.Refresh(a);
    var o = {
      CardSpineData: r,
      ShowSpine: t === 1
    };
    this.GetComponent(7)?.Refresh(o);
  }
}
exports.CommonCardItem = CommonCardItem;
//# sourceMappingURL=CommonCardItem.js.map