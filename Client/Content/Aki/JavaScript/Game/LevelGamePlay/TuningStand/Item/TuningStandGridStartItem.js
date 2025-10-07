"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TuningStandGridStartItem = undefined;
const UE = require("ue");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LongPressButtonItem_1 = require("../../../Module/Common/Button/LongPressButtonItem");
const LevelSequencePlayer_1 = require("../../../Module/Common/LevelSequencePlayer");
const TuningStandGridBase_1 = require("./TuningStandGridBase");
class TuningStandGridStartItem extends TuningStandGridBase_1.TuningStandGridBase {
  constructor() {
    super(...arguments);
    this.jAe = undefined;
    this.SequencePlayer = undefined;
    this.OnToggleHover = () => {
      if (ModelManager_1.ModelManager.TuningStandModel.OnHover(this.Data) === 2) {
        this.GetItem(4)?.SetUIActive(true);
        ModelManager_1.ModelManager.TuningStandModel.TryStartBubbleFlow(IAction_1.ETuningStandBubbleTriggerType.InvalidLink);
      }
    };
    this.OnToggleUnHover = () => {
      this.GetItem(4)?.SetUIActive(false);
    };
    this.OnTogglePress = () => {
      ModelManager_1.ModelManager.TuningStandModel.OnPress(this.Data);
      this.OnRefreshGrid();
    };
    this.OnToggleRelease = () => {
      this.GetItem(4)?.SetUIActive(false);
      ModelManager_1.ModelManager.TuningStandModel.OnRelease(this.Data);
    };
    this.OnToggleCancel = () => {
      this.GetItem(4)?.SetUIActive(false);
      ModelManager_1.ModelManager.TuningStandModel.OnRelease(this.Data);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIExtendToggle], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem]];
  }
  OnStart() {
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.GetItem(2).SetUIActive(false);
    this.GetItem(3).SetUIActive(false);
    this.InitLongPress();
    this.InitGrid();
  }
  OnResetGrid() {
    this.ZBu();
  }
  InitGrid() {
    this.CurSelected = false;
    var t = this.GridType === IAction_1.ETuningStandGridType.Start1;
    this.GetItem(0)?.SetUIActive(!t);
    this.GetItem(1)?.SetUIActive(t);
  }
  OnRefreshGrid() {
    var t;
    if (ModelManager_1.ModelManager.TuningStandModel.GetIsPressing()) {
      t = ModelManager_1.ModelManager.TuningStandModel.GetCurIndex();
      if (ModelManager_1.ModelManager.TuningStandModel.GetGridList()[t].GetCurGridState().State === this.Data.StaticState.State && !this.CurSelected) {
        this.CurSelected = true;
        this.ZBu();
        this.SequencePlayer.PlayOrReplaySequenceByName("Drag");
      }
    } else if (this.CurSelected || this.Data.StaticState.Next === undefined) {
      if (this.CurSelected && this.Data.StaticState.Next === undefined) {
        this.CurSelected = false;
        this.ZBu();
        this.SequencePlayer.PlayOrReplaySequenceByName("Unfold");
      }
    } else {
      this.CurSelected = true;
      this.ZBu();
      this.SequencePlayer.PlayOrReplaySequenceByName("Drag");
    }
  }
  InitLongPress() {
    this.jAe = new LongPressButtonItem_1.LongPressButtonItem(undefined, 1, undefined);
    this.jAe.Initialize(this.GetExtendToggle(5), undefined, this.OnTogglePress, this.OnToggleRelease, this.OnToggleCancel);
    this.GetExtendToggle(5).OnHover.Add(this.OnToggleHover);
    this.GetExtendToggle(5).OnUnHover.Add(this.OnToggleUnHover);
  }
  ZBu() {
    if (this.SequencePlayer?.IsPlayingSequence("Drag")) {
      this.SequencePlayer.StopSequenceByKey("Drag", false);
    }
    if (this.SequencePlayer?.IsPlayingSequence("Unfold")) {
      this.SequencePlayer.StopSequenceByKey("Unfold", false);
    }
    if (this.SequencePlayer?.IsPlayingSequence("UnLoop")) {
      this.SequencePlayer.StopSequenceByKey("UnLoop", false);
    }
    if (this.SequencePlayer?.IsPlayingSequence("Loop")) {
      this.SequencePlayer.StopSequenceByKey("Loop", false);
    }
  }
  PlayInAnim(t) {
    this.SequencePlayer?.PlayOrReplaySequenceByName("In", true, t / 10 + 1);
  }
  StartRevolving() {
    this.ZBu();
    this.SequencePlayer?.PlayLevelSequenceByName("Up");
  }
}
exports.TuningStandGridStartItem = TuningStandGridStartItem;
//# sourceMappingURL=TuningStandGridStartItem.js.map