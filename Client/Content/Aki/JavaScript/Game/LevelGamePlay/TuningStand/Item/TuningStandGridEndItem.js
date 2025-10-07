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
    this.QFu = undefined;
    this.KFu = undefined;
    this.XFu = undefined;
    this.YFu = undefined;
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
    this.QFu = new TuningStandGridBase_1.TuningStandGridLine();
    this.KFu = new TuningStandGridBase_1.TuningStandGridLine();
    this.XFu = new TuningStandGridBase_1.TuningStandGridLine();
    this.YFu = new TuningStandGridBase_1.TuningStandGridLine();
    i.push(this.QFu.CreateByActorAsync(this.GetItem(10).GetOwner()));
    i.push(this.KFu.CreateByActorAsync(this.GetItem(11).GetOwner()));
    i.push(this.XFu.CreateByActorAsync(this.GetItem(12).GetOwner()));
    i.push(this.YFu.CreateByActorAsync(this.GetItem(13).GetOwner()));
    await Promise.all(i);
    this.QFu.SetUiActive(true);
    this.KFu.SetUiActive(true);
    this.XFu.SetUiActive(true);
    this.YFu.SetUiActive(true);
    this.QFu.Refresh(false);
    this.KFu.Refresh(false);
    this.XFu.Refresh(false);
    this.YFu.Refresh(false);
  }
  OnStart() {
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.GetItem(5).SetUIActive(false);
    this.GetItem(7).SetUIActive(false);
    this.InitLongPress();
    this.InitGrid();
  }
  OnBeforeDestroy() {
    this.QFu = undefined;
    this.KFu = undefined;
    this.XFu = undefined;
    this.YFu = undefined;
  }
  OnResetGrid() {
    this.ujc();
    this.ZBu();
    this.qPu();
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
    this.qPu();
    if (i === 0) {
      if (this.CurSelected) {
        this.CurSelected = false;
        this.ZBu();
        this.SequencePlayer?.PlayLevelSequenceByName("Move");
      }
    } else if (!this.CurSelected) {
      this.CurSelected = true;
      this.ZBu();
      this.SequencePlayer?.PlayLevelSequenceByName("Select");
    }
  }
  InitLongPress() {
    this.jAe = new LongPressButtonItem_1.LongPressButtonItem(undefined, 1, undefined);
    this.jAe.Initialize(this.GetExtendToggle(9), undefined, this.OnTogglePress, this.OnToggleRelease, this.OnToggleCancel);
    this.GetExtendToggle(9).OnHover.Add(this.OnToggleHover);
    this.GetExtendToggle(9).OnUnHover.Add(this.OnToggleUnHover);
  }
  ZBu() {
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
  qPu() {
    var i = this.GetPrevDirection();
    this.QFu.Refresh(i === 0, this.Data.GetCurGridState().State);
    this.KFu.Refresh(i === 1, this.Data.GetCurGridState().State);
    this.XFu.Refresh(i === 2, this.Data.GetCurGridState().State);
    this.YFu.Refresh(i === 3, this.Data.GetCurGridState().State);
  }
  ujc() {
    this.QFu.HideLine();
    this.KFu.HideLine();
    this.XFu.HideLine();
    this.YFu.HideLine();
  }
  StartRevolving() {
    this.QFu.Refresh(false, this.Data.GetCurGridState().State);
    this.KFu.Refresh(false, this.Data.GetCurGridState().State);
    this.XFu.Refresh(false, this.Data.GetCurGridState().State);
    this.YFu.Refresh(false, this.Data.GetCurGridState().State);
  }
}
exports.TuningStandGridEndItem = TuningStandGridEndItem;
//# sourceMappingURL=TuningStandGridEndItem.js.map