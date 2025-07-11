"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapAreaOnlyShowItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const ExploreProgressDefine_1 = require("../ExploreProgressDefine");
const lockKeys = ["Unlock01", "Unlock02", "Unlock03", "Unlock04"];
class MapAreaOnlyShowItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Cxo = undefined;
    this.Xy = 0;
    this.Pe = undefined;
    this.I8l = e => {
      if (e === "Unlock04" && this.Pe?.NewOpenCount !== 0 && this.IsUiActiveInHierarchy() && !this.Cxo?.IsPlayingSequence("Unlock04") && (this.Cxo?.PlayLevelSequenceByName("Complete"), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Temp", 69, "SequenceTest3", ["Play Unlock04", this.Xy], ["", this.Pe]);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UISprite]];
  }
  OnBeforeCreate() {
    this.Cxo = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.Cxo?.BindSequenceCloseEvent(this.I8l);
  }
  Refresh(s, e) {
    this.Xy = e ?? 0;
    this.Pe = s;
    this.StopSequenceToFirst();
    if (s.OpenCount > 0 || s.NewOpenCount > 0) {
      this.SetTextureByPath(s.IconPath, this.GetTexture(0));
    }
    for (let e = 0; e < ExploreProgressDefine_1.AREA_ICON_UNLOCK_COUNT; e++) {
      var t = e < s.OpenCount;
      this.GetSprite(1 + e)?.SetUIActive(!t);
      var t = !t && e < s.OpenCount + s.NewOpenCount;
      if (t) {
        this.Cxo?.PlayLevelSequenceByName(lockKeys[e]);
      }
    }
    e = s.OpenCount + s.NewOpenCount < ExploreProgressDefine_1.AREA_ICON_UNLOCK_COUNT;
    this.GetSprite(5)?.SetUIActive(e);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Map", 69, this.constructor.name, ["", s]);
    }
  }
  OnBeforeDestroy() {
    this.Cxo?.Clear();
    this.Cxo = undefined;
  }
  StopSequenceToFirst() {
    this.Cxo?.StopPlayingSequence();
    this.Cxo?.PlayLevelSequenceByName("FirstStart");
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Temp", 69, "SequenceTest3", ["StopSequenceToFirst", this.Xy], ["", this.Pe]);
    }
  }
}
exports.MapAreaOnlyShowItem = MapAreaOnlyShowItem;
//# sourceMappingURL=MapAreaOnlyShowItem.js.map