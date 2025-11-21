"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GotItem = exports.PrizeDrawingRewardItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
class PrizeDrawingRewardItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, t, i) {
    super();
    this.ETt = e;
    this.t6 = t;
    this.AGe = i;
    this.o7d = [];
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText], [3, UE.UIGridLayout], [4, UE.UIItem], [5, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    await this.aGe(this.ETt, this.t6, this.AGe);
  }
  async aGe(e, t, i) {
    var s = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e);
    this.GetText(1)?.ShowTextNew(s.Name);
    this.GetText(5)?.SetText("x" + t);
    this.SetItemIcon(this.GetTexture(0), e);
    this.GetText(2)?.SetText("x" + i);
    var r = [];
    var a = this.GetItem(4);
    var n = a.GetParentAsUIItem();
    for (let e = 0; e < i; e++) {
      var h = LguiUtil_1.LguiUtil.CopyItem(a, n);
      var o = new GotItem();
      this.o7d.push(o);
      r.push(o.CreateThenShowByActorAsync(h.GetOwner()));
    }
    await Promise.all(r);
    this.o7d.forEach((e, t) => {
      e.SetIndexText(t + 1);
    });
  }
  Refresh(i, s = false) {
    this.o7d.forEach((e, t) => {
      e.RefreshGotState(t + 1 <= i, s);
    });
  }
}
exports.PrizeDrawingRewardItem = PrizeDrawingRewardItem;
class GotItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.n7d = undefined;
    this.s7d = undefined;
    this.SPe = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.s7d = this.GetText(0);
    this.n7d = this.GetItem(1);
    this.n7d?.SetUIActive(false);
  }
  OnBeforeDestroy() {
    this.SPe?.Clear();
  }
  SetIndexText(e) {
    this.s7d?.SetText(e < 10 ? "0" + e : e.toString());
  }
  RefreshGotState(e, t = false) {
    if (!this.n7d?.IsUIActiveSelf() && !!e && !t) {
      this.SPe?.PlaySequencePurely("Start");
    }
    this.n7d?.SetUIActive(e);
  }
}
exports.GotItem = GotItem;
//# sourceMappingURL=PrizeDrawingRewardItem.js.map