"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonGrid = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../Util/LguiUtil");
class InstanceDungeonGrid extends UiPanelBase_1.UiPanelBase {
  constructor(e, i) {
    super();
    this.NUe = 0;
    this.s1i = e => {};
    this.kqe = e => {
      if (e === 1) {
        this.s1i(this.NUe);
      }
    };
    this.NUe = e;
    this.CreateThenShowByActor(i.GetOwner());
  }
  get ClickCallback() {
    return this.s1i;
  }
  set ClickCallback(e) {
    this.s1i = e;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIExtendToggle], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIText], [10, UE.UIItem]];
    this.BtnBindInfo = [[2, this.kqe]];
  }
  OnStart() {
    this.GetItem(4).SetUIActive(false);
    var e = this.GetText(1);
    var i = this.GetItem(10);
    if (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceCanChallenge(this.NUe)) {
      e.SetUIActive(true);
      i.SetUIActive(false);
    } else {
      e.SetUIActive(false);
      i.SetUIActive(true);
    }
  }
  OnBeforeDestroy() {}
  ShowTitle(e) {
    this.GetItem(4).SetUIActive(true);
    e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTitleConfig(e);
    if (e) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.CommonText);
    }
    e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(this.NUe).EnterControlId;
    e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstanceData(e);
    if (e?.LimitChallengedTimes) {
      this.GetItem(6).SetUIActive(true);
      this.GetText(8).SetUIActive(true);
      this.GetText(8).SetText(e.LeftChallengedTimes + "/" + e.LimitChallengedTimes);
    } else {
      this.GetItem(6).SetUIActive(false);
      this.GetText(8).SetUIActive(false);
    }
    e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstanceResetTime(this.NUe);
    let i = MathUtils_1.MathUtils.LongToBigInt(e ?? 0);
    if (i <= 0) {
      i = MathUtils_1.MathUtils.LongToBigInt(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceEndTime);
    }
    var e = Number(i) - TimeUtil_1.TimeUtil.GetServerTime();
    if (i > 0 && e > 0) {
      this.GetItem(7).SetUIActive(true);
      e = TimeUtil_1.TimeUtil.CalculateRemainingTime(e);
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(9), e.TextId, e.TimeValue);
    } else {
      this.GetItem(7).SetUIActive(false);
    }
  }
  SetSelected(e, i = false) {
    if (i) {
      this.GetExtendToggle(2).SetToggleStateForce(e ? 1 : 0, false, true);
    } else {
      this.GetExtendToggle(2).SetToggleState(e ? 1 : 0, false);
    }
  }
  OnDeselected(e) {
    this.SetSelected(false, e);
  }
  Refresh() {
    this.UpdateView(this.NUe);
  }
  UpdateView(e) {
    var i;
    if (e) {
      this.GetText(0).ShowTextNew(ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e).MapName);
      i = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(e, ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel);
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "InstanceDungeonRecommendLevel", i);
      this.GetItem(3).SetUIActive(!ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(e));
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("InstanceDungeon", 16, "副本格子视图刷新失败，instanceId非法");
    }
  }
}
exports.InstanceDungeonGrid = InstanceDungeonGrid;
//# sourceMappingURL=InstanceDungeonGrid.js.map