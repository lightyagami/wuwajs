"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySubViewBase = undefined;
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const LevelGeneralCommons_1 = require("../../../../LevelGamePlay/LevelGeneralCommons");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
class ActivitySubViewBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ActivityRemainTimeText = "";
    this.ActivityBaseData = undefined;
    this.LevelSequencePlayer = undefined;
    this.SubViewOpenParam = undefined;
    this.MBn = e => {
      this.OnSequenceStart(e);
    };
    this.yTn = e => {
      this.OnSequenceClose(e);
    };
    this.kOe = () => {
      this.OnTimer(TimeUtil_1.TimeUtil.InverseMillisecond);
    };
  }
  OnBeforeShowImplement() {
    this.jm();
    ControllerHolder_1.ControllerHolder.ActivityController.RegisterRefreshTimerDelegate(this.kOe);
    if (!this.LevelSequencePlayer) {
      this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
      this.LevelSequencePlayer.BindSequenceStartEvent(this.MBn);
      this.LevelSequencePlayer.BindSequenceCloseEvent(this.yTn);
    }
    this.kOe();
    this.OnAddEventListener();
  }
  OnSequenceStart(e) {}
  OnSequenceClose(e) {}
  OnAfterHideImplement() {
    this.jm();
    this.OnRemoveEventListener();
  }
  jm() {
    ControllerHolder_1.ControllerHolder.ActivityController.UnregisterRefreshTimerDelegate(this.kOe);
  }
  SetData(e) {
    this.ActivityBaseData = e;
    this.OnSetData();
  }
  SetOpenParam(e) {
    this.OpenParam = e;
  }
  OnSetData() {}
  RefreshView() {
    if (this.ActivityBaseData) {
      ModelManager_1.ModelManager.ActivityModel.SendActivityTabViewOpenLogData(this.ActivityBaseData);
    }
    this.OnRefreshView();
  }
  async BeforeShowSelfAsync() {
    await this.OnBeforeShowSelfAsync();
  }
  async BeforeHideSelfAsync() {
    await this.OnBeforeHideSelfAsync();
  }
  OnCommonViewStateChange(e) {}
  OnAddEventListener() {}
  OnRemoveEventListener() {}
  OnRefreshView() {}
  async OnBeforeShowSelfAsync() {}
  async OnBeforeHideSelfAsync() {}
  PlaySubViewSequence(e, t = false) {
    if (this.LevelSequencePlayer.CheckSeqActorIsSeqPlaying(e)) {
      this.LevelSequencePlayer.ReplaySequenceByKey(e);
    } else {
      this.LevelSequencePlayer.PlayLevelSequenceByName(e, t);
    }
  }
  GetTimeVisibleAndRemainTime() {
    return ModelManager_1.ModelManager.ActivityModel.GetTimeVisibleAndRemainTime(this.ActivityBaseData);
  }
  GetCurrentLockConditionText() {
    var e;
    if (this.ActivityBaseData.IsUnLock()) {
      return "";
    } else {
      e = this.ActivityBaseData.ConditionGroupId;
      return LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(e) ?? "";
    }
  }
  OnTimer(e) {}
  OnBeforeDestroyImplement() {
    this.jm();
    this.LevelSequencePlayer?.Clear();
  }
}
exports.ActivitySubViewBase = ActivitySubViewBase;
//# sourceMappingURL=ActivitySubViewBase.js.map