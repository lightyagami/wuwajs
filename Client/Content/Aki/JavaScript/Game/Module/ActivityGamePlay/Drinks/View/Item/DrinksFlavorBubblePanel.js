"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrinksFlavorBubblePanel = undefined;
const UE = require("ue");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
class DrinksFlavorBubblePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Bubble1 = undefined;
    this.Bubble2 = undefined;
    this.BubbleList = [];
    this.OriginPos = Vector_1.Vector.Create();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.Bubble1 = new DrinksFlavorBubble();
    this.BubbleList.push(this.Bubble1);
    e.push(this.Bubble1.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.Bubble2 = new DrinksFlavorBubble();
    this.BubbleList.push(this.Bubble2);
    e.push(this.Bubble2.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()));
    await Promise.all(e);
  }
  OnAfterShow() {
    this.OriginPos.FromUeVector(this.RootItem.GetUIWorldPosition());
  }
  RefreshOnStart() {
    this.Bubble1.SetUiActive(false);
    this.Bubble2.SetUiActive(false);
  }
  Refresh() {
    var e;
    var t;
    var s = ModelManager_1.ModelManager.DrinksModel.GetCurStep();
    var i = ModelManager_1.ModelManager.DrinksModel.GetCurrentPlayData();
    var r = [0, 0, 0];
    if (s === 2) {
      if (!i.Batching) {
        return;
      }
      for (const o of i.Batching) {
        for ([e, t] of ConfigManager_1.ConfigManager.DrinksConfig.GetBatching(o).Flavor) {
          r[e] += t;
        }
      }
    } else {
      var a;
      var h;
      var s = s === 0 ? 0 : 1;
      for ([a, h] of ConfigManager_1.ConfigManager.DrinksConfig.GetDrinkBase(i.DrinkBase[s]).Flavor) {
        r[a] = h;
      }
    }
    let n = 0;
    for (let e = 0; e < 3; e++) {
      if (r[e] > 0) {
        if (n < this.BubbleList.length) {
          this.vXf(n, e, r[e]);
        }
        n++;
      }
    }
    for (let e = n; e < this.BubbleList.length; e++) {
      this.BubbleList[e].SetUiActive(false);
    }
  }
  vXf(e, t, s) {
    var i = this.RootItem.GetUIWorldPosition();
    var r = i.X + this.RootItem.GetWidth() / 2 * (e < 1 ? -1 : 1);
    var a = i.Z + this.RootItem.GetHeight() / 2;
    var h = i.Z - this.RootItem.GetHeight() / 2;
    var i = MathUtils_1.MathUtils.GetRandomFloatNumber(Math.min(i.X, r), Math.max(i.X, r));
    var r = MathUtils_1.MathUtils.GetRandomFloatNumber(a, h);
    this.BubbleList[e].SetUiActive(true);
    this.BubbleList[e].Refresh(t, s, i, r);
  }
}
exports.DrinksFlavorBubblePanel = DrinksFlavorBubblePanel;
class DrinksFlavorBubble extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Location = Vector_1.Vector.Create(0, 0, 0);
    this.SequencePlayer = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText]];
  }
  OnStart() {
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.GetText(1)?.SetText("+0");
  }
  Refresh(e, t, s, i) {
    e = ConfigManager_1.ConfigManager.DrinksConfig.GetFlavorType(e);
    this.SetTextureByPath(e.Icon, this.GetTexture(0));
    this.GetText(1)?.SetText("+" + t);
    this.Location.X = s;
    this.Location.Z = i;
    this.RootItem.SetUIWorldLocation(this.Location.ToUeVectorOld());
    this.SequencePlayer?.PlayLevelSequenceByName("Start");
  }
}
//# sourceMappingURL=DrinksFlavorBubblePanel.js.map