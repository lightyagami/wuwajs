"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaChallengeDetailDeckItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const CardElementItem_1 = require("../../Common/CardItem/Item/CardElementItem");
class PhantomArenaChallengeDetailDeckItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.DeckInfo = undefined;
    this.SequencePlayer = undefined;
    this.ElementList = [];
    this.OnButtonClick = undefined;
    this.v81 = () => {
      this.OnButtonClick?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [3, UE.UIText], [2, UE.UITexture], [4, UE.UIText], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIText], [8, UE.UISprite], [9, UE.UIItem], [10, UE.UIItem]];
    this.BtnBindInfo = [[0, this.v81]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    for (let e = 9; e <= 10; e++) {
      var i = new CardElementItem_1.CardElementItem();
      this.ElementList.push(i);
      t.push(i.CreateByActorAsync(this.GetItem(e).GetOwner()));
    }
    await Promise.all(t);
  }
  OnStart() {
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  Refresh(e) {
    this.DeckInfo = e;
    var t = this.GetText(5);
    var i = this.GetText(7);
    var r = this.GetTexture(2);
    if (e) {
      this.GetItem(6).SetUIActive(false);
      this.GetItem(1).SetUIActive(true);
      this.GetText(3).SetText("1");
      this.GetText(4).SetText(e.GetName());
      t.SetUIActive(true);
      i.SetUIActive(true);
      var s = e.GetNormalCardCount();
      var a = e.GetNormalCardCountLimit();
      if (s === a) {
        t.SetText(s + "/" + a);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(t, "PhantomBattle_1042", s, a);
      }
      var s = e.IsCoreCardSlotLocked();
      this.GetSprite(8).SetIsGray(s);
      i.SetChangeColor(s, i.changeColor);
      if (s) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(i, "PhantomBattle_1039");
      } else if ((a = e.GetCoreCardCount()) === (s = e.GetCoreCardCountLimit())) {
        i.SetText(a + "/" + s);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(i, "PhantomBattle_1042", a, s);
      }
      var a = e.GetDeckFaceCardId();
      r.SetUIActive(a > 0);
      if (a > 0) {
        s = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(a);
        this.SetTextureByPath(s.DeckFaceTexture, r);
      }
      var h = e.GetElementList();
      for (let e = 0; e < this.ElementList.length; e++) {
        if (e >= h.length) {
          this.ElementList[e].SetActive(false);
        } else {
          this.ElementList[e].SetActive(true);
          this.ElementList[e].RefreshElement(h[e]);
        }
      }
    } else {
      this.GetItem(6).SetUIActive(true);
      this.GetItem(1).SetUIActive(false);
      t.SetUIActive(false);
      i.SetUIActive(false);
      r.SetUIActive(false);
    }
  }
  PlaySelectAnim() {
    this.SequencePlayer?.PlayLevelSequenceByName("In");
  }
}
exports.PhantomArenaChallengeDetailDeckItem = PhantomArenaChallengeDetailDeckItem;
//# sourceMappingURL=PhantomArenaChallengeDetailDeckItem.js.map