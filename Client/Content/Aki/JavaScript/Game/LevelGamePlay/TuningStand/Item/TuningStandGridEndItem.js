"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TuningStandGridEndItem = undefined;
const UE = require("ue");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LongPressButtonItem_1 = require("../../../Module/Common/Button/LongPressButtonItem");
const LevelSequencePlayer_1 = require("../../../Module/Common/LevelSequencePlayer");
const TuningStandDefine_1 = require("../TuningStandDefine");
const TuningStandGridBase_1 = require("./TuningStandGridBase");
class TuningStandGridEndItem extends TuningStandGridBase_1.TuningStandGridBase {
  constructor() {
    super(...arguments);
    this.jAe = undefined;
    this.SequencePlayer = undefined;
    this.H2u = undefined;
    this.$2u = undefined;
    this.W2u = undefined;
    this.Q2u = undefined;
    this.OnToggleHover = () => {
      var i = ModelManager_1.ModelManager.TuningStandModel.OnHover(this.Data);
      if (i === 2) {
        this.GetItem(8)?.SetUIActive(true);
        ModelManager_1.ModelManager.TuningStandModel.TryStartBubbleFlow(IAction_1.ETuningStandBubbleTriggerType.InvalidLink);
      } else if (i === 1) {
        this.OnRefreshGrid();
      }
    };
    this.OnToggleUnHover = () => {
      this.GetItem(8)?.SetUIActive(false);
    };
    this.OnTogglePress = () => {};
    this.OnToggleRelease = () => {
      this.GetItem(8)?.SetUIActive(false);
      ModelManager_1.ModelManager.TuningStandModel.OnRelease(this.Data);
    };
    this.OnToggleCancel = () => {
      this.GetItem(8)?.SetUIActive(false);
      ModelManager_1.ModelManager.TuningStandModel.OnRelease(this.Data);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UIItem], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UIItem], [6, UE.UISprite], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIExtendToggle], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var i = [];
    this.H2u = new TuningStandGridBase_1.TuningStandGridLine();
    this.$2u = new TuningStandGridBase_1.TuningStandGridLine();
    this.W2u = new TuningStandGridBase_1.TuningStandGridLine();
    this.Q2u = new TuningStandGridBase_1.TuningStandGridLine();
    i.push(this.H2u.CreateByActorAsync(this.GetItem(10).GetOwner()));
    i.push(this.$2u.CreateByActorAsync(this.GetItem(11).GetOwner()));
    i.push(this.W2u.CreateByActorAsync(this.GetItem(12).GetOwner()));
    i.push(this.Q2u.CreateByActorAsync(this.GetItem(13).GetOwner()));
    await Promise.all(i);
    this.H2u.SetUiActive(true);
    this.$2u.SetUiActive(true);
    this.W2u.SetUiActive(true);
    this.Q2u.SetUiActive(true);
    this.H2u.Refresh(false);
    this.$2u.Refresh(false);
    this.W2u.Refresh(false);
    this.Q2u.Refresh(false);
  }
  OnStart() {
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.GetItem(5).SetUIActive(false);
    this.GetItem(7).SetUIActive(false);
    this.InitLongPress();
    this.InitGrid();
  }
  OnBeforeDestroy() {
    this.H2u = undefined;
    this.$2u = undefined;
    this.W2u = undefined;
    this.Q2u = undefined;
  }
  OnResetGrid() {
    this.K$c();
    this.RBu();
    this._Pu();
  }
  InitGrid() {
    var i;
    var t = TuningStandDefine_1.gridSpriteMap.get(this.GridType);
    if (t) {
      this.CurSelected = false;
      i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t[0]);
      this.SetSpriteByPath(i, this.GetSprite(1), false);
      this.SetSpriteByPath(i, this.GetSprite(3), false);
      i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t[2]);
      this.SetSpriteByPath(i, this.GetSprite(4), false);
      i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t[1]);
      this.SetSpriteByPath(i, this.GetSprite(6), false);
      t = this.Data.GridType;
      this.GetItem(2)?.SetUIActive(t === IAction_1.ETuningStandGridType.End1);
      this.GetItem(0)?.SetUIActive(t === IAction_1.ETuningStandGridType.End2);
      this.OnRefreshGrid();
    }
  }
  OnRefreshGrid() {
    var i = this.Data.GetCurGridState().State;
    this._Pu();
    if (i === 0) {
      if (this.CurSelected) {
        this.CurSelected = false;
        this.RBu();
        this.SequencePlayer?.PlayLevelSequenceByName("Move");
      }
    } else if (!this.CurSelected) {
      this.CurSelected = true;
      this.RBu();
      this.SequencePlayer?.PlayLevelSequenceByName("Select");
    }
  }
  InitLongPress() {
    this.jAe = new LongPressButtonItem_1.LongPressButtonItem(undefined, 1, undefined);
    this.jAe.Initialize(this.GetExtendToggle(9), undefined, this.OnTogglePress, this.OnToggleRelease, this.OnToggleCancel);
    this.GetExtendToggle(9).OnHover.Add(this.OnToggleHover);
    this.GetExtendToggle(9).OnUnHover.Add(this.OnToggleUnHover);
  }
  RBu() {
    if (this.SequencePlayer?.IsPlayingSequence("Move")) {
      this.SequencePlayer.StopSequenceByKey("Move");
    }
    if (this.SequencePlayer?.IsPlayingSequence("Select")) {
      this.SequencePlayer.StopSequenceByKey("Select");
    }
  }
  PlayInAnim(i) {
    this.SequencePlayer?.PlayOrReplaySequenceByName("In", true, i / 10 + 1);
  }
  _Pu() {
    var i = this.GetPrevDirection();
    this.H2u.Refresh(i === 0, this.Data.GetCurGridState().State);
    this.$2u.Refresh(i === 1, this.Data.GetCurGridState().State);
    this.W2u.Refresh(i === 2, this.Data.GetCurGridState().State);
    this.Q2u.Refresh(i === 3, this.Data.GetCurGridState().State);
  }
  K$c() {
    this.H2u.HideLine();
    this.$2u.HideLine();
    this.W2u.HideLine();
    this.Q2u.HideLine();
  }
  StartRevolving() {
    this.H2u.Refresh(false, this.Data.GetCurGridState().State);
    this.$2u.Refresh(false, this.Data.GetCurGridState().State);
    this.W2u.Refresh(false, this.Data.GetCurGridState().State);
    this.Q2u.Refresh(false, this.Data.GetCurGridState().State);
  }
}
exports.TuningStandGridEndItem = TuningStandGridEndItem;
//# sourceMappingURL=TuningStandGridEndItem.js.map