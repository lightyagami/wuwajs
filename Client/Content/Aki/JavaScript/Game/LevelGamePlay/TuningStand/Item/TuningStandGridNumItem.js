"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TuningStandGridNumItem = undefined;
const UE = require("ue");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LongPressButtonItem_1 = require("../../../Module/Common/Button/LongPressButtonItem");
const LevelSequencePlayer_1 = require("../../../Module/Common/LevelSequencePlayer");
const TuningStandDefine_1 = require("../TuningStandDefine");
const TuningStandGridBase_1 = require("./TuningStandGridBase");
class TuningStandGridNumItem extends TuningStandGridBase_1.TuningStandGridBase {
  constructor() {
    super(...arguments);
    this.jAe = undefined;
    this.SequencePlayer = undefined;
    this.Pku = undefined;
    this.xku = undefined;
    this.Dku = undefined;
    this.Uku = undefined;
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
    this.OnTogglePress = () => {
      ModelManager_1.ModelManager.TuningStandModel.OnPress(this.Data);
    };
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
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UIItem], [3, UE.UISprite], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UISprite], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIExtendToggle], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var i = [];
    this.Pku = new TuningStandGridBase_1.TuningStandGridLine();
    this.xku = new TuningStandGridBase_1.TuningStandGridLine();
    this.Dku = new TuningStandGridBase_1.TuningStandGridLine();
    this.Uku = new TuningStandGridBase_1.TuningStandGridLine();
    i.push(this.Pku.CreateByActorAsync(this.GetItem(10).GetOwner()));
    i.push(this.xku.CreateByActorAsync(this.GetItem(11).GetOwner()));
    i.push(this.Dku.CreateByActorAsync(this.GetItem(12).GetOwner()));
    i.push(this.Uku.CreateByActorAsync(this.GetItem(13).GetOwner()));
    await Promise.all(i);
    this.Pku.SetUiActive(true);
    this.xku.SetUiActive(true);
    this.Dku.SetUiActive(true);
    this.Uku.SetUiActive(true);
    this.Pku.Refresh(false);
    this.xku.Refresh(false);
    this.Dku.Refresh(false);
    this.Uku.Refresh(false);
  }
  OnStart() {
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.InitLongPress();
    this.GetItem(4).SetUIActive(false);
    this.GetItem(7).SetUIActive(false);
    this.InitGrid();
  }
  OnBeforeDestroy() {
    this.Pku = undefined;
    this.xku = undefined;
    this.Dku = undefined;
    this.Uku = undefined;
  }
  InitGrid() {
    var i;
    var t = TuningStandDefine_1.gridSpriteMap.get(this.GridType);
    if (t) {
      i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t[0]);
      this.SetSpriteByPath(i, this.GetSprite(1), false);
      i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t[2]);
      this.SetSpriteByPath(i, this.GetSprite(3), false);
      i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t[1]);
      this.SetSpriteByPath(i, this.GetSprite(6), false);
      this.OnRefreshGrid();
    }
  }
  OnResetGrid() {
    this.YWu();
    this.OnRefreshGrid();
  }
  OnRefreshGrid() {
    var i = this.Data.GetCurGridState().State;
    this.qPu();
    this.GetItem(0)?.SetUIActive(i === 0);
    this.GetItem(5)?.SetUIActive(i === 1);
    this.GetItem(2)?.SetUIActive(i === 2);
  }
  InitLongPress() {
    this.jAe = new LongPressButtonItem_1.LongPressButtonItem(undefined, 1, undefined);
    this.jAe.Initialize(this.GetExtendToggle(9), undefined, this.OnTogglePress, this.OnToggleRelease, this.OnToggleCancel);
    this.GetExtendToggle(9).OnHover.Add(this.OnToggleHover);
    this.GetExtendToggle(9).OnUnHover.Add(this.OnToggleUnHover);
  }
  PlayInAnim(i) {
    this.SequencePlayer?.PlayOrReplaySequenceByName("In", true, i / 10 + 1);
  }
  qPu() {
    var i = this.GetPrevDirection();
    this.Pku.Refresh(i === 0, this.Data.GetCurGridState().State);
    this.xku.Refresh(i === 1, this.Data.GetCurGridState().State);
    this.Dku.Refresh(i === 2, this.Data.GetCurGridState().State);
    this.Uku.Refresh(i === 3, this.Data.GetCurGridState().State);
  }
  YWu() {
    this.Pku.HideLine();
    this.xku.HideLine();
    this.Dku.HideLine();
    this.Uku.HideLine();
  }
  OnLinkMiss(i) {
    if (i) {
      this.SequencePlayer?.PlayOrReplaySequenceByName("Loop");
    } else if (this.SequencePlayer?.IsPlayingSequence("Loop")) {
      this.SequencePlayer?.StopSequenceByKey("Loop", false, true);
    }
  }
  StartRevolving() {
    this.Pku.Refresh(false, this.Data.GetCurGridState().State);
    this.xku.Refresh(false, this.Data.GetCurGridState().State);
    this.Dku.Refresh(false, this.Data.GetCurGridState().State);
    this.Uku.Refresh(false, this.Data.GetCurGridState().State);
  }
}
exports.TuningStandGridNumItem = TuningStandGridNumItem;
//# sourceMappingURL=TuningStandGridNumItem.js.map