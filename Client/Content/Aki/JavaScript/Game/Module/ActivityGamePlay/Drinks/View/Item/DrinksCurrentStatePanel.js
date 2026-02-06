"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrinksCurrentStatePanel = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
class DrinksCurrentStatePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ItemList = [];
    this.Item0 = undefined;
    this.Item1 = undefined;
    this.Item2 = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.Item0 = new DrinksFlavorValueItem();
    e.push(this.Item0.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.Item1 = new DrinksFlavorValueItem();
    e.push(this.Item1.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()));
    this.Item2 = new DrinksFlavorValueItem();
    e.push(this.Item2.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()));
    await Promise.all(e);
    this.ItemList.push(this.Item0);
    this.ItemList.push(this.Item1);
    this.ItemList.push(this.Item2);
  }
  OnStart() {
    for (const e of this.ItemList) {
      e.RefreshState(false, ["0"], false);
    }
  }
  RefreshItem(e, t, s, i = "", r = false) {
    s = [s];
    if (i !== "") {
      s.push(i);
    }
    this.ItemList[e].RefreshState(t, s, r);
  }
  UpdateStep() {
    var e = ModelManager_1.ModelManager.DrinksModel.GetCurStep();
    var t = ModelManager_1.ModelManager.DrinksModel.GetCurrentFlavorValueOnStart();
    var s = ModelManager_1.ModelManager.DrinksModel.GetCurrentPlayData();
    if (e === 0) {
      this.OnDrinkSelected(s.DrinkBase[0]);
    } else if (e === 1) {
      this.OnDrinkSelected(s.DrinkBase[1]);
    } else if (e === 2) {
      var i = new Set();
      if (s.Batching) {
        for (const r of s.Batching) {
          i.add(r);
        }
      }
      this.OnBatchingSelected(i);
    } else {
      for (let e = 0; e < t.length; e++) {
        this.RefreshItem(e, false, String(t[e]), "", false);
      }
    }
  }
  RefreshOnEnterSeq() {
    var t = ModelManager_1.ModelManager.DrinksModel.GetCurrentFlavorValueForce();
    for (let e = 0; e < t.length; e++) {
      this.RefreshItem(e, false, String(t[e]), "", false);
    }
  }
  OnDrinkSelected(e) {
    var t = ModelManager_1.ModelManager.DrinksModel.GetCurrentFlavorValue();
    if (e === 0) {
      for (let e = 0; e < 3; e++) {
        this.RefreshItem(e, false, String(t[e]), "", false);
      }
    } else {
      var s;
      var i = ConfigManager_1.ConfigManager.DrinksConfig.GetDrinkBase(e);
      var r = ModelManager_1.ModelManager.DrinksModel.GetDrinksFlavorRange(i.DrinkId);
      for (let e = 0; e < 3; e++) {
        if (i.Flavor.has(e)) {
          s = r.get(e);
          s = t[e] + s[0] + "~" + (t[e] + s[1]);
          this.RefreshItem(e, i.Flavor.has(e), "" + t[e], s, true);
        } else {
          this.RefreshItem(e, i.Flavor.has(e), "" + t[e], "", true);
        }
      }
    }
  }
  OnBatchingSelected(t) {
    var e;
    var s;
    var i = ModelManager_1.ModelManager.DrinksModel.GetCurrentFlavorValue();
    var r = [0, 0, 0];
    for (const a of t) {
      for ([e, s] of ConfigManager_1.ConfigManager.DrinksConfig.GetBatching(a).Flavor) {
        r[e] += s;
      }
    }
    for (let e = 0; e < 3; e++) {
      this.RefreshItem(e, r[e] !== 0, String(i[e]), r[e] === 0 ? "" : String(i[e] + r[e]), t.size > 0);
    }
  }
}
exports.DrinksCurrentStatePanel = DrinksCurrentStatePanel;
class DrinksFlavorValueItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OldActive = false;
    this.LevelSequence = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText]];
  }
  OnStart() {
    this.LevelSequence = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  RefreshState(e, t, s) {
    this.Smu(e);
    this.TE1(t, s);
  }
  TE1(e, t) {
    this.GetText(2)?.SetUIActive(e.length === 1);
    this.GetText(4)?.SetUIActive(e.length > 1);
    this.GetText(5)?.SetUIActive(e.length > 1);
    if (e.length === 1) {
      this.GetText(2)?.SetText(e[0]);
      this.RootItem?.SetAlpha(t ? 0.5 : 1);
    } else {
      this.GetText(4)?.SetText(e[0]);
      this.GetText(5)?.SetText(e[1]);
      this.RootItem?.SetAlpha(1);
    }
  }
  Smu(e) {
    if (e !== this.OldActive || !!e) {
      if (this.OldActive = e) {
        if (this.LevelSequence?.IsPlayingSequence("Close")) {
          this.LevelSequence?.StopCurrentSequence(false, true);
        }
        this.LevelSequence?.PlayLevelSequenceByName("Start");
      } else {
        if (this.LevelSequence?.IsPlayingSequence("Start")) {
          this.LevelSequence?.StopCurrentSequence(false, true);
        }
        this.LevelSequence?.PlayLevelSequenceByName("Close");
      }
    }
  }
}
//# sourceMappingURL=DrinksCurrentStatePanel.js.map