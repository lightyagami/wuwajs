"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TuningStandGridBase = exports.TuningStandGridLine = undefined;
const UE = require("ue");
const LevelSequencePlayer_1 = require("../../../Module/Common/LevelSequencePlayer");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class TuningStandGridLine extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.LevelSequencePlayer = undefined;
    this.CurVisible = false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.GetItem(1)?.SetUIActive(false);
    this.GetItem(0)?.SetUIActive(false);
  }
  OnBeforeDestroy() {
    this.LevelSequencePlayer = undefined;
  }
  Refresh(e, i = 0) {
    if (e) {
      this.GetItem(1)?.SetUIActive(i === 1);
      this.GetItem(0)?.SetUIActive(i === 2);
    }
    if (e && !this.CurVisible) {
      this.CurVisible = true;
      this.LevelSequencePlayer?.StopCurrentSequence();
      this.LevelSequencePlayer?.PlayLevelSequenceByName("Start");
    } else if (!e && this.CurVisible) {
      this.CurVisible = false;
      this.LevelSequencePlayer?.StopCurrentSequence();
      this.LevelSequencePlayer?.PlayLevelSequenceByName("Close");
    }
  }
  HideLine() {
    this.CurVisible = false;
    this.GetItem(1)?.SetUIActive(false);
    this.GetItem(0)?.SetUIActive(false);
  }
}
exports.TuningStandGridLine = TuningStandGridLine;
class TuningStandGridBase extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.Data = e;
    this.GridType = undefined;
    this.CurSelected = false;
    this.OnToggleHover = () => {};
    this.OnToggleUnHover = () => {};
    this.OnTogglePress = () => {};
    this.OnToggleRelease = () => {};
    this.OnToggleCancel = () => {};
    this.GridType = e.GridType;
  }
  OnRefreshGrid() {}
  OnResetGrid() {}
  ResetGrid(e) {
    this.Data = e;
    this.CurSelected = false;
    this.OnResetGrid();
  }
  InitGrid() {}
  PlayInAnim(e) {}
  OnLinkMiss(e) {}
  GetPrevDirection() {
    var e = this.Data.GetCurGridState();
    var i = this.Data.Index;
    if (e.Prev === undefined) {
      return -1;
    } else if ((e = e.Prev) === i - 1) {
      return 0;
    } else if (e === i + 1) {
      return 1;
    } else if (i < e) {
      return 3;
    } else {
      return 2;
    }
  }
  StartRevolving() {}
}
exports.TuningStandGridBase = TuningStandGridBase;
//# sourceMappingURL=TuningStandGridBase.js.map