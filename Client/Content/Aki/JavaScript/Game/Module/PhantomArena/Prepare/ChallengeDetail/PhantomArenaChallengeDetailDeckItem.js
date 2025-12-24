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
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [3, UE.UIText], [2, UE.UITexture], [4, UE.UIText], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIText], [8, UE.UISprite], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIText], [13, UE.UISprite]];
    this.BtnBindInfo = [[0, this.v81]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    for (let t = 9; t <= 10; t++) {
      var i = new CardElementItem_1.CardElementItem();
      this.ElementList.push(i);
      e.push(i.CreateByActorAsync(this.GetItem(t).GetOwner()));
    }
    await Promise.all(e);
  }
  OnStart() {
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  Refresh(t) {
    this.DeckInfo = t;
    var e = this.GetText(5);
    var i = this.GetText(7);
    var r = this.GetTexture(2);
    if (t) {
      this.GetItem(6).SetUIActive(false);
      this.GetItem(1).SetUIActive(true);
      this.GetText(3).SetText("1");
      this.GetText(4).SetText(t.GetName());
      e.SetUIActive(true);
      i.SetUIActive(true);
      var s = t.GetNormalCardCount();
      var a = t.GetNormalCardCountLimit();
      if (s === a) {
        e.SetText(s + "/" + a);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(e, "PhantomBattle_1042", s, a);
      }
      var s = t.IsCoreCardSlotLocked();
      this.GetSprite(8).SetIsGray(s);
      i.SetChangeColor(s, i.changeColor);
      if (s) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(i, "PhantomBattle_1039");
      } else if ((a = t.GetCoreCardCount()) === (s = t.GetCoreCardCountLimit())) {
        i.SetText(a + "/" + s);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(i, "PhantomBattle_1042", a, s);
      }
      this.GetItem(11).SetUIActive(t.GetFieldCardCountLimit() !== 0);
      var a = this.GetText(12);
      var s = t.GetFieldCardCount();
      var n = t.GetFieldCardCountLimit();
      if (s === n) {
        a.SetText(s + "/" + n);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(a, "PhantomBattle_1042", s, n);
      }
      var a = t.GetFieldCardSlot()?.Element;
      var s = a !== undefined ? ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleElementConfig(a).FieldCardElementInDeck : ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_IconSoundRemnantArenaField");
      this.SetSpriteByPath(s, this.GetSprite(13), false);
      var n = t.GetDeckFaceCardId();
      r.SetUIActive(n > 0);
      if (n > 0) {
        a = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(n);
        this.SetTextureByPath(a.DeckFaceTexture, r);
      }
      var h = t.GetElementList();
      for (let t = 0; t < this.ElementList.length; t++) {
        if (t >= h.length) {
          this.ElementList[t].SetActive(false);
        } else {
          this.ElementList[t].SetActive(true);
          this.ElementList[t].RefreshElement(h[t]);
        }
      }
    } else {
      this.GetItem(6).SetUIActive(true);
      this.GetItem(1).SetUIActive(false);
      e.SetUIActive(false);
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