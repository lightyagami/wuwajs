"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonMatchingCountDown = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer");
const InstanceDungeonEntranceController_1 = require("./InstanceDungeonEntranceController");
class InstanceDungeonMatchingCountDown extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super();
    this.SPe = undefined;
    this.y1i = undefined;
    this.I1i = undefined;
    this.T1i = undefined;
    this.n_i = () => {
      var e;
      if (this.T1i === "Close") {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("InstanceDungeon", 27, "当前正在播放Close动画，不响应点击事件");
        }
      } else if ((e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState()) !== 3 && e !== 2 && (this.PlayAnimation("Close"), this.y1i)) {
        this.y1i();
      }
    };
    this.yct = e => {
      if (e === "Close" || e === "Finish") {
        this.SetUiActive(false);
      }
      this.I1i?.(e);
    };
    this.D1i = () => {
      if (UiManager_1.UiManager.IsViewShow("InstanceDungeonEntranceView") || UiManager_1.UiManager.IsViewShow("OnlineWorldHallView") || UiManager_1.UiManager.IsViewShow("EditBattleTeamView") || UiManager_1.UiManager.IsViewShow("DangoAbyssInsSelectView")) {
        this.GetText(5)?.SetText(TimeUtil_1.TimeUtil.GetTimeString(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.MatchingTime));
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[2, UE.UIButtonComponent], [7, UE.UIText], [5, UE.UIText], [8, UE.UIButtonComponent], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem]];
    this.BtnBindInfo = [[8, this.n_i]];
  }
  OnStart() {
    this.GetButton(2)?.RootUIComp.SetUIActive(false);
    this.GetItem(10)?.SetUIActive(false);
    this.GetItem(11)?.SetUIActive(false);
    this.GetItem(12)?.SetUIActive(true);
    this.GetItem(13)?.SetUIActive(false);
    this.GetItem(14)?.SetUIActive(true);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe.BindSequenceCloseEvent(this.yct);
    this.RefreshButtonActivity();
  }
  RefreshButtonActivity() {
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      this.GetButton(8).RootUIComp.SetUIActive(ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam());
    } else {
      this.GetButton(8).RootUIComp.SetUIActive(true);
    }
  }
  PlayAnimation(e) {
    if (this.T1i !== e) {
      this.SetUiActive(true);
      this.SPe.StopCurrentSequence();
      this.SPe.PlayLevelSequenceByName(e);
      this.T1i = e;
    }
  }
  OnBeforeDestroy() {
    this.y1i = undefined;
    this.SPe?.Clear();
    this.SPe = undefined;
  }
  StartTimer() {
    var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel;
    var i = this.GetText(5);
    i.SetText(TimeUtil_1.TimeUtil.GetTimeString(e.MatchingTime));
    i.SetUIActive(true);
    this.GetText(7).ShowTextNew(ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e.GetMatchingId()).MapName);
    InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.StartMatchTimer(this.D1i);
    if (this.SPe.GetCurrentSequence() === "AutoLoop") {
      this.SPe.ReplaySequenceByKey("AutoLoop");
    } else {
      this.SPe.PlayLevelSequenceByName("AutoLoop");
    }
    this.RefreshButtonActivity();
  }
  BindOnStopTimer(e) {
    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.OnStopTimer = e;
  }
  BindOnClickBtnCancelMatching(e) {
    this.y1i = e;
  }
  BindOnAfterCloseAnimation(e) {
    this.I1i = e;
  }
  BindOnStopHandle(e) {
    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.OnStopHandle = e;
  }
  SetMatchingTime(e) {
    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.MatchingTime = e;
  }
}
exports.InstanceDungeonMatchingCountDown = InstanceDungeonMatchingCountDown;
//# sourceMappingURL=InstanceDungeonMatchingCountDown.js.map