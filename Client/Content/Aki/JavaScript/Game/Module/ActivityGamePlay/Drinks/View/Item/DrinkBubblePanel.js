"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrinksBubblePanel = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
class DrinksBubblePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Bubble1 = undefined;
    this.Bubble2 = undefined;
    this.Bubble3 = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.Bubble1 = new DrinksBubbleItem();
    e.push(this.Bubble1.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.Bubble2 = new DrinksBubbleItem();
    e.push(this.Bubble2.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()));
    this.Bubble3 = new DrinksBubbleItem();
    e.push(this.Bubble3.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()));
    await Promise.all(e);
  }
  OnBeforeShow() {
    this.Bubble1.SetUiActive(false);
    this.Bubble2.SetUiActive(false);
    this.Bubble3.SetUiActive(false);
  }
  UpdateState(e) {
    var s = ModelManager_1.ModelManager.DrinksModel.GetCurStep();
    var t = ModelManager_1.ModelManager.DrinksModel.GetCurrentPlayData();
    if (s === 4) {
      this.Bubble1.SetIsVisible(false);
      this.Bubble2.SetIsVisible(false);
      this.Bubble3.SetIsVisible(false);
    } else if (s === 0) {
      this.Bubble2.SetIsVisible(false);
      this.Bubble3.SetIsVisible(false);
      this.Bubble1.SetIsVisible(t.DrinkBase[0] !== 0, e);
      if (t.DrinkBase[0] !== 0) {
        this.Bubble1.Update(false, t.DrinkBase[0]);
      }
    } else if (s === 1) {
      this.Bubble2.SetIsVisible(false);
      this.Bubble3.SetIsVisible(false);
      this.Bubble1.SetIsVisible(t.DrinkBase[1] !== 0, e);
      if (t.DrinkBase[1] !== 0) {
        this.Bubble1.Update(false, t.DrinkBase[1]);
      }
    } else {
      s = t.Batching ?? [];
      this.Bubble2.SetIsVisible(s.length === 2, e);
      this.Bubble3.SetIsVisible(s.length === 2, e);
      this.Bubble1.SetIsVisible(s.length === 1, e);
      if (s.length === 1) {
        this.Bubble1.Update(true, s[0]);
      } else if (s.length === 2) {
        this.Bubble2.Update(true, s[0]);
        this.Bubble3.Update(true, s[1]);
      }
    }
  }
  HideBubble() {
    this.Bubble1.SetIsVisible(false);
    this.Bubble2.SetIsVisible(false);
    this.Bubble3.SetIsVisible(false);
  }
}
exports.DrinksBubblePanel = DrinksBubblePanel;
class DrinksBubbleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SequencePlayer = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  OnStart() {
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  SetIsVisible(e, s = false) {
    if ((e !== this.IsUiActiveInHierarchy() || !!e) && !s) {
      this.SequencePlayer?.StopSequenceByKey("Start");
      this.SequencePlayer?.StopSequenceByKey("Close");
      this.SequencePlayer?.PlayLevelSequenceByName(e ? "Start" : "Close");
    }
  }
  Update(e, s) {
    let t = "";
    t = e ? ConfigManager_1.ConfigManager.DrinksConfig.GetBatching(s).Icon : ConfigManager_1.ConfigManager.DrinksConfig.GetDrinkBase(s).DrinkIcon;
    this.SetTextureByPath(t, this.GetTexture(0));
  }
}
//# sourceMappingURL=DrinkBubblePanel.js.map