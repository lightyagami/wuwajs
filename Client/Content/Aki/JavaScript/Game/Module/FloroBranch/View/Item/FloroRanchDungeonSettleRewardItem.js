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
      var t;
      var i;
      if (this.Pe !== undefined && (t = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData()) !== undefined) {
        if (this.Pe.h5n === Protocol_1.Aki.Protocol.$4u.Proto_FloroRanchCard) {
          i = t.GetFloroRanchCardData(this.Pe.s5n);
          UiManager_1.UiManager.OpenView("FloroRanchCommonTipsView", {
            TipType: 3,
            CardData: i
          });
        } else if (this.Pe.h5n === Protocol_1.Aki.Protocol.$4u.Proto_FloroRanchToy) {
          i = t.GetFloroRanchToyData(this.Pe.s5n);
          UiManager_1.UiManager.OpenView("FloroRanchCommonTipsView", {
            TipType: 2,
            ToyData: i
          });
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [2, UE.UITexture], [1, UE.UISprite], [3, UE.UIItem], [4, UE.UITexture], [5, UE.UIItem]];
    this.BtnBindInfo = [[0, this.nqe]];
  }
  Refresh(t) {
    if ((this.Pe = t).h5n === Protocol_1.Aki.Protocol.$4u.Proto_FloroRanchCard) {
      this.cHt(t.s5n);
    } else if (t.h5n === Protocol_1.Aki.Protocol.$4u.Proto_FloroRanchToy) {
      this.ybu(t.s5n);
    } else {
      this.Twc(t.s5n);
    }
  }
  cHt(t) {
    var i = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    if (i !== undefined) {
      t = (i = i.GetFloroRanchCardData(t)).GetCardQualityData();
      this.SetTextureShowUntilLoaded(i.GetIcon(), this.GetTexture(2));
      t = t.GetRarityShopItemBg();
      this.SetSpriteByPath(t, this.GetSprite(1), true);
      this.GetSprite(1).SetUIActive(true);
      this.GetButton(0).SetSelfInteractive(true);
      this.GetItem(5)?.SetUIActive(i.IsSpecialPhantom);
      this.GetItem(3)?.SetUIActive(false);
    }
  }
  ybu(t) {
    var i = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    if (i !== undefined) {
      t = (i = i.GetFloroRanchToyData(t)).GetToyQualityData();
      this.SetTextureShowUntilLoaded(i.GetIcon(), this.GetTexture(2));
      t = t.GetRarityShopItemBg();
      this.SetSpriteByPath(t, this.GetSprite(1), true);
      this.GetSprite(1).SetUIActive(true);
      this.GetButton(0).SetSelfInteractive(true);
      this.GetItem(5)?.SetUIActive(false);
      if (t = i.GetToyRaceData()) {
        this.GetItem(3)?.SetUIActive(true);
        this.SetTextureShowUntilLoaded(t.SmallIcon, this.GetTexture(4));
      } else {
        this.GetItem(3)?.SetUIActive(false);
      }
    }
  }
  Twc(t) {
    var i = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    if (i !== undefined) {
      i = i.GetFloroRanchSkillData(t);
      this.SetTextureShowUntilLoaded(i.Icon, this.GetTexture(2));
      this.GetSprite(1).SetUIActive(false);
      this.GetButton(0).SetSelfInteractive(false);
      this.GetItem(5)?.SetUIActive(false);
      this.GetItem(3)?.SetUIActive(false);
    }
  }
}
exports.FloroRanchDungeonSettleRewardItem = FloroRanchDungeonSettleRewardItem;
//# sourceMappingURL=FloroRanchDungeonSettleRewardItem.js.map