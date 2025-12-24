"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnlockViewCardItem = undefined;
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CommonBaseCardItem_1 = require("./CommonBaseCardItem");
class UnlockViewCardItem extends CommonBaseCardItem_1.CommonBaseCardItem {
  OnRegisterCardComponent() {
    this.ComponentsRegisterInfoByItem = [[0, this.GetRootItem()]];
    this.ComponentsRegisterInfoByResourceId = [[9, "UiItem_SoundRemnantItem512Spine", this.GetSpineRootItem()]];
  }
  Refresh(e) {
    var a = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e);
    var o = a.InitAttack;
    var r = ModelManager_1.ModelManager.PhantomArenaModel.CreateCardSpineData(e);
    var t = ModelManager_1.ModelManager.PhantomArenaModel.GetCardFaceType(e);
    var o = {
      CardId: e,
      Cost: a.Cost,
      Attack: o.get(Protocol_1.Aki.Protocol.GC1.Proto_AttackAbility),
      Life: o.get(Protocol_1.Aki.Protocol.GC1.Proto_LifeAbility),
      Element: a.Element,
      CardFaceTexturePath: a.CardFaceTexture,
      ShowCardFaceTexture: t === 0,
      OutlookUnlocked: ModelManager_1.ModelManager.PhantomArenaModel.IsCardOutlookUnlock(e),
      CanToggleExecuteChange: () => false
    };
    this.GetComponent(0)?.Refresh(o);
    var a = {
      CardSpineData: r,
      ShowSpine: t === 1
    };
    this.GetComponent(9)?.Refresh(a);
  }
}
exports.UnlockViewCardItem = UnlockViewCardItem;
//# sourceMappingURL=UnlockViewCardItem.js.map