"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchDungeonSettleRewardItem = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class FloroRanchDungeonSettleRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.nqe = () => {
      var e;
      var t;
      if (this.Pe !== undefined && (e = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData()) !== undefined) {
        if (this.Pe.h5n === Protocol_1.Aki.Protocol.AFu.Proto_FloroRanchCard) {
          t = e.GetFloroRanchCardData(this.Pe.s5n);
          UiManager_1.UiManager.OpenView("FloroRanchCommonTipsView", {
            TipType: 3,
            CardData: t
          });
        } else if (this.Pe.h5n === Protocol_1.Aki.Protocol.AFu.Proto_FloroRanchToy) {
          t = e.GetFloroRanchToyData(this.Pe.s5n);
          UiManager_1.UiManager.OpenView("FloroRanchCommonTipsView", {
            TipType: 2,
            ToyData: t
          });
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [2, UE.UITexture], [1, UE.UISprite]];
    this.BtnBindInfo = [[0, this.nqe]];
  }
  Refresh(e) {
    if ((this.Pe = e).h5n === Protocol_1.Aki.Protocol.AFu.Proto_FloroRanchCard) {
      this.cHt(e.s5n);
    } else if (e.h5n === Protocol_1.Aki.Protocol.AFu.Proto_FloroRanchToy) {
      this.ebu(e.s5n);
    } else {
      this.Twc(e.s5n);
    }
  }
  cHt(e) {
    var t = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    if (t !== undefined) {
      e = (t = t.GetFloroRanchCardData(e)).GetCardQualityData();
      this.SetTextureShowUntilLoaded(t.GetIcon(), this.GetTexture(2));
      t = e.GetRarityShopItemBg();
      this.SetSpriteByPath(t, this.GetSprite(1), true);
      this.GetSprite(1).SetUIActive(true);
      this.GetButton(0).SetSelfInteractive(true);
    }
  }
  ebu(e) {
    var t = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    if (t !== undefined) {
      e = (t = t.GetFloroRanchToyData(e)).GetToyQualityData();
      this.SetTextureShowUntilLoaded(t.GetIcon(), this.GetTexture(2));
      t = e.GetRarityShopItemBg();
      this.SetSpriteByPath(t, this.GetSprite(1), true);
      this.GetSprite(1).SetUIActive(true);
      this.GetButton(0).SetSelfInteractive(true);
    }
  }
  Twc(e) {
    var t = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    if (t !== undefined) {
      t = t.GetFloroRanchSkillData(e);
      this.SetTextureShowUntilLoaded(t.Icon, this.GetTexture(2));
      this.GetSprite(1).SetUIActive(false);
      this.GetButton(0).SetSelfInteractive(false);
    }
  }
}
exports.FloroRanchDungeonSettleRewardItem = FloroRanchDungeonSettleRewardItem;
//# sourceMappingURL=FloroRanchDungeonSettleRewardItem.js.map