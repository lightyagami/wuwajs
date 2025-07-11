"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapExplorePlayProgressItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class MapExplorePlayProgressItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Cxo = undefined;
    this.Pe = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UISprite]];
  }
  OnBeforeCreate() {
    this.Cxo = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  Refresh(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Map", 69, this.constructor.name, ["", e]);
    }
    this.Pe = e;
    this.UpdatePlayPointType();
    if (e.LastPlayPointState !== undefined) {
      this.B7l(e.LastPlayPointState);
    } else {
      this.B7l(e.PlayPointState);
    }
  }
  UpdatePlayPointType() {
    if (!this.Pe.IgnoreHiddenType && this.Pe.PlayPointType === 1) {
      this.GetSprite(4).SetUIActive(true);
    } else {
      this.GetSprite(4).SetUIActive(false);
    }
  }
  B7l(e) {
    switch (e) {
      case 0:
        this.GetSprite(1).SetUIActive(true);
        this.GetSprite(2).SetUIActive(false);
        this.GetSprite(3).SetUIActive(false);
        this.GetSprite(5).SetFillAmount(0);
        break;
      case 1:
        this.GetSprite(1).SetUIActive(false);
        this.GetSprite(2).SetUIActive(true);
        this.GetSprite(3).SetUIActive(false);
        this.GetSprite(5).SetFillAmount(0);
        break;
      case 2:
        this.GetSprite(1).SetUIActive(false);
        this.GetSprite(2).SetUIActive(false);
        this.GetSprite(3).SetUIActive(true);
        this.GetSprite(5).SetFillAmount(1);
    }
  }
  CheckPlayStateChanged() {
    if (this.Pe.LastPlayPointState !== undefined) {
      this.Cxo?.PlayLevelSequenceByName("Complete");
      this.B7l(this.Pe.PlayPointState);
      this.Pe.LastPlayPointState = undefined;
    }
  }
  OnBeforeDestroy() {
    this.Cxo?.Clear();
    this.Cxo = undefined;
  }
}
exports.MapExplorePlayProgressItem = MapExplorePlayProgressItem;
//# sourceMappingURL=MapExplorePlayProgressItem.js.map