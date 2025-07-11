"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapExploreStoryItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class MapExploreStoryItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Cxo = undefined;
    this.fGt = undefined;
    this.I8l = e => {
      if (e === "Unlock") {
        this.w8l();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIItem]];
  }
  OnBeforeCreate() {
    this.Cxo = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.Cxo.BindSequenceCloseEvent(this.I8l);
  }
  OnStart() {}
  OnBeforeDestroy() {
    this.Cxo?.Clear();
  }
  SB_(e, t) {
    if (t) {
      this.GetText(e)?.ShowTextNew(t);
    } else {
      this.GetText(e)?.SetText("");
    }
  }
  Refresh(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Map", 69, this.constructor.name, ["", e]);
    }
    this.fGt = e;
    this.SB_(1, e.StoryTitle);
    this.SB_(2, e.StoryContent);
    this.SB_(4, e.LockedDesc);
    if (e.IsOpen && !e.IsNewOpen) {
      this.w8l();
    } else {
      this.P8l();
    }
  }
  w8l() {
    this.GetItem(3)?.SetUIActive(false);
    this.GetText(2)?.SetUIActive(true);
    this.GetItem(5)?.SetUIActive(!!this.fGt?.StoryTitle);
  }
  P8l() {
    this.GetItem(3)?.SetUIActive(true);
    this.GetText(2)?.SetUIActive(false);
    this.GetItem(5)?.SetUIActive(false);
  }
  PlayNewOpenAnim() {
    this.Cxo?.PlayLevelSequenceByName("Unlock");
  }
}
exports.MapExploreStoryItem = MapExploreStoryItem;
//# sourceMappingURL=MapExploreStoryItem.js.map