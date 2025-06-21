"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CardOutlookPreviewItem = void 0;
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  CommonBaseCardItem_1 = require("./CommonBaseCardItem");
class CardOutlookPreviewItem extends CommonBaseCardItem_1.CommonBaseCardItem {
  OnRegisterCardComponent() {
    this.ComponentsRegisterInfoByItem = [
      [0, this.GetRootItem()]
    ], this.ComponentsRegisterInfoByResourceId = [
      [7, "UiItem_SoundRemnantItem512Spine", this.GetSpineRootItem()]
    ]
  }
  Refresh(e) {
    var o = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e),
      a = !ModelManager_1.ModelManager.PhantomArenaModel.CheckCardSpineConfigValid(e),
      r = o.InitAttack,
      r = {
        CardId: e,
        Cost: o.Cost,
        Attack: r.get(Protocol_1.Aki.Protocol.gC1.Proto_AttackAbility),
        Life: r.get(Protocol_1.Aki.Protocol.gC1.Proto_LifeAbility),
        Element: o.Element,
        CardFaceTexturePath: o.CardFaceTexture,
        ShowCardFaceTexture: a,
        OutlookUnlocked: !0,
        CanToggleExecuteChange: () => !1
      },
      o = (this.GetComponent(0)?.Refresh(r), {
        CardSpineData: ModelManager_1.ModelManager.PhantomArenaModel.CreateCardSpineData(e),
        ShowSpine: !a
      });
    this.GetComponent(7)?.Refresh(o)
  }
}
exports.CardOutlookPreviewItem = CardOutlookPreviewItem;
//# sourceMappingURL=CardOutlookPreviewItem.js.map