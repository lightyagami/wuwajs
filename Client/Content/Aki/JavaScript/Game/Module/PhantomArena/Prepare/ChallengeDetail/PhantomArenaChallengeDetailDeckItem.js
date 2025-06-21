"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaChallengeDetailDeckItem = void 0;
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  CardElementItem_1 = require("../../Common/CardItem/Item/CardElementItem");
class PhantomArenaChallengeDetailDeckItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.DeckInfo = void 0, this.SequencePlayer = void 0, this.ElementList = [], this.OnButtonClick = void 0, this.q51 = () => {
      this.OnButtonClick?.()
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [3, UE.UIText],
      [2, UE.UITexture],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIItem],
      [7, UE.UIText],
      [8, UE.UISprite],
      [9, UE.UIItem],
      [10, UE.UIItem]
    ], this.BtnBindInfo = [
      [0, this.q51]
    ]
  }
  async OnBeforeStartAsync() {
    var t = [];
    for (let e = 9; e <= 10; e++) {
      var i = new CardElementItem_1.CardElementItem;
      this.ElementList.push(i), t.push(i.CreateByActorAsync(this.GetItem(e).GetOwner()))
    }
    await Promise.all(t)
  }
  OnStart() {
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)
  }
  Refresh(e) {
    this.DeckInfo = e;
    var t = this.GetText(5),
      i = this.GetText(7),
      r = this.GetTexture(2);
    if (e) {
      this.GetItem(6).SetUIActive(!1), this.GetItem(1).SetUIActive(!0), this.GetText(3).SetText("1"), this.GetText(4).SetText(e.GetName()), t.SetUIActive(!0), i.SetUIActive(!0);
      var s = e.GetNormalCardCount(),
        a = e.GetNormalCardCountLimit(),
        s = (s === a ? t.SetText(s + "/" + a) : LguiUtil_1.LguiUtil.SetLocalTextNew(t, "PhantomBattle_1042", s, a), e.IsCoreCardSlotLocked()),
        a = (this.GetSprite(8).SetIsGray(s), i.SetChangeColor(s, i.changeColor), s ? LguiUtil_1.LguiUtil.SetLocalTextNew(i, "PhantomBattle_1039") : (a = e.GetCoreCardCount()) === (s = e.GetCoreCardCountLimit()) ? i.SetText(a + "/" + s) : LguiUtil_1.LguiUtil.SetLocalTextNew(i, "PhantomBattle_1042", a, s), e.GetDeckFaceCardId()),
        h = (r.SetUIActive(0 < a), 0 < a && (s = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(a), this.SetTextureByPath(s.DeckFaceTexture, r)), e.GetElementList());
      for (let e = 0; e < this.ElementList.length; e++) e >= h.length ? this.ElementList[e].SetActive(!1) : (this.ElementList[e].SetActive(!0), this.ElementList[e].RefreshElement(h[e]))
    } else this.GetItem(6).SetUIActive(!0), this.GetItem(1).SetUIActive(!1), t.SetUIActive(!1), i.SetUIActive(!1), r.SetUIActive(!1)
  }
  PlaySelectAnim() {
    this.SequencePlayer?.PlayLevelSequenceByName("In")
  }
}
exports.PhantomArenaChallengeDetailDeckItem = PhantomArenaChallengeDetailDeckItem;
//# sourceMappingURL=PhantomArenaChallengeDetailDeckItem.js.map