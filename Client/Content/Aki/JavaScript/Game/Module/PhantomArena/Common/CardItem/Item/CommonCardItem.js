"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CommonCardItem = void 0;
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  CommonBaseCardItem_1 = require("./CommonBaseCardItem");
class CommonCardItem extends CommonBaseCardItem_1.CommonBaseCardItem {
  OnRegisterCardComponent() {
    this.ComponentsRegisterInfoByItem = [
      [0, this.GetRootItem()]
    ], this.ComponentsRegisterInfoByResourceId = [
      [7, "UiItem_SoundRemnantItem512Spine", this.GetSpineRootItem()]
    ]
  }
  Refresh(e) {
    var o = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e),
      a = o.InitAttack,
      r = ModelManager_1.ModelManager.PhantomArenaModel.CreateCardSpineData(e),
      t = ModelManager_1.ModelManager.PhantomArenaModel.GetCardFaceType(e),
      a = {
        CardId: e,
        Cost: o.Cost,
        Attack: a.get(Protocol_1.Aki.Protocol.gC1.Proto_AttackAbility),
        Life: a.get(Protocol_1.Aki.Protocol.gC1.Proto_LifeAbility),
        Element: o.Element,
        CardFaceTexturePath: o.CardFaceTexture,
        ShowCardFaceTexture: 0 === t,
        OutlookUnlocked: ModelManager_1.ModelManager.PhantomArenaModel.IsCardOutlookUnlock(e)
      },
      o = (this.GetComponent(0)?.Refresh(a), {
        CardSpineData: r,
        ShowSpine: 1 === t
      });
    this.GetComponent(7)?.Refresh(o)
  }
}
exports.CommonCardItem = CommonCardItem;
//# sourceMappingURL=CommonCardItem.js.map