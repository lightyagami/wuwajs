"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.UnlockViewCardItem = void 0;
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  CommonBaseCardItem_1 = require("./CommonBaseCardItem");
class UnlockViewCardItem extends CommonBaseCardItem_1.CommonBaseCardItem {
  OnRegisterCardComponent() {
    this.ComponentsRegisterInfoByItem = [
      [0, this.GetRootItem()]
    ], this.ComponentsRegisterInfoByResourceId = [
      [7, "UiItem_SoundRemnantItem512Spine", this.GetSpineRootItem()]
    ]
  }
  Refresh(e) {
    var a = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e),
      o = a.InitAttack,
      r = ModelManager_1.ModelManager.PhantomArenaModel.CreateCardSpineData(e),
      t = ModelManager_1.ModelManager.PhantomArenaModel.GetCardFaceType(e),
      o = {
        CardId: e,
        Cost: a.Cost,
        Attack: o.get(Protocol_1.Aki.Protocol.gC1.Proto_AttackAbility),
        Life: o.get(Protocol_1.Aki.Protocol.gC1.Proto_LifeAbility),
        Element: a.Element,
        CardFaceTexturePath: a.CardFaceTexture,
        ShowCardFaceTexture: 0 === t,
        OutlookUnlocked: ModelManager_1.ModelManager.PhantomArenaModel.IsCardOutlookUnlock(e),
        CanToggleExecuteChange: () => !1
      },
      a = (this.GetComponent(0)?.Refresh(o), {
        CardSpineData: r,
        ShowSpine: 1 === t
      });
    this.GetComponent(7)?.Refresh(a)
  }
}
exports.UnlockViewCardItem = UnlockViewCardItem;
//# sourceMappingURL=UnlockViewCardItem.js.map