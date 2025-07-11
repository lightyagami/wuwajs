"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer");
class TsUiAutoPlayLevelSequenceComponent extends UE.LGUIBehaviour {
  constructor() {
    super(...arguments);
    this.LevelSequencePlayer = undefined;
    this.AutoPlayList = undefined;
    this.PlayState = undefined;
  }
  Constructor() {
    this.LevelSequencePlayer = undefined;
    this.AutoPlayList = undefined;
    this.PlayState = undefined;
  }
  AwakeBP() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootUIComp);
    this.PlayState = 0;
  }
  OnUIActiveInHierarchyBP(e) {
    this.PlayState = e ? 1 : 2;
    if (this.PlayState === 2) {
      this.TryRefresh();
    }
  }
  OnDestroyBP() {
    this.LevelSequencePlayer?.Clear();
    this.LevelSequencePlayer = undefined;
  }
  UpdateBP(e) {
    this.TryRefresh();
  }
  TryRefresh() {
    if (this.PlayState !== 0) {
      if (this.PlayState === 1) {
        this.TryPlay();
        this.PlayState = 0;
      } else if (this.PlayState === 2) {
        this.TryStop();
        this.PlayState = 0;
      }
    }
  }
  TryPlay() {
    var e = this.GetOwner();
    if (e) {
      var t = e.GetUIItem().LevelSequences;
      this.AutoPlayList = new Array();
      var i = t.Num();
      for (let e = 0; e < i; ++e) {
        var s = t.GetKey(e);
        if (t.Get(s).PlaySetting.bAutoPlay) {
          this.LevelSequencePlayer.PlaySequencePurely(s);
          this.AutoPlayList.push(s);
        }
      }
    }
  }
  TryStop() {
    if (this.AutoPlayList) {
      var e = this.GetOwner();
      if (e) {
        for (const t of this.AutoPlayList) {
          e.StopSequenceByKey(t);
        }
        this.AutoPlayList = undefined;
      }
    }
  }
}
exports.default = TsUiAutoPlayLevelSequenceComponent;
//# sourceMappingURL=TsUiAutoPlayLevelSequenceComponent.js.map