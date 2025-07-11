"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonStartButtonItem = undefined;
const ue_1 = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const InstOnlineType_1 = require("../../../../Core/Define/Config/SubType/InstOnlineType");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const CLICK_INSTANCE_BEGIN_BUTTON_CD = 500;
class InstanceDungeonStartButtonItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.c5a = 0;
    this.OnClickBtnSoloCallBack = undefined;
    this.OnClickBtnMultipleCallBack = undefined;
    this.OnClickBtnTeamCallBack = undefined;
    this.OnClickBtnSolo = () => {
      if (this.m5a() && (this.c5a = TimeUtil_1.TimeUtil.GetServerTimeStamp() + CLICK_INSTANCE_BEGIN_BUTTON_CD, this.OnClickBtnSoloCallBack)) {
        this.OnClickBtnSoloCallBack();
      }
    };
    this.qli = () => {
      if (this.m5a() && (this.c5a = TimeUtil_1.TimeUtil.GetServerTimeStamp() + CLICK_INSTANCE_BEGIN_BUTTON_CD, this.OnClickBtnMultipleCallBack)) {
        this.OnClickBtnMultipleCallBack();
      }
    };
    this.bli = () => {
      if (this.m5a() && (this.c5a = TimeUtil_1.TimeUtil.GetServerTimeStamp() + CLICK_INSTANCE_BEGIN_BUTTON_CD, this.OnClickBtnTeamCallBack)) {
        this.OnClickBtnTeamCallBack();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, ue_1.UIButtonComponent], [0, ue_1.UIButtonComponent], [2, ue_1.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.OnClickBtnSolo], [0, this.qli], [2, this.bli]];
  }
  RefreshItem(e) {
    this.SetActive(true);
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti && !ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()) {
      this.SetButtonUiActive(0, false);
      this.SetButtonUiActive(1, false);
      this.SetButtonUiActive(2, false);
    } else if (e === InstOnlineType_1.InstOnlineType.Single) {
      this.SetButtonUiActive(0, false);
      this.SetButtonUiActive(1, true);
      this.SetButtonUiActive(2, false);
    } else if (e === InstOnlineType_1.InstOnlineType.Multi) {
      this.SetButtonUiActive(0, true);
      this.SetButtonUiActive(1, false);
      if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
        this.SetButtonUiActive(2, true);
      } else {
        this.SetButtonUiActive(2, false);
      }
    } else {
      this.SetButtonUiActive(0, true);
      if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
        this.SetButtonUiActive(1, false);
        this.SetButtonUiActive(2, true);
      } else {
        this.SetButtonUiActive(1, true);
        this.SetButtonUiActive(2, false);
      }
    }
  }
  m5a() {
    return !(this.c5a > TimeUtil_1.TimeUtil.GetServerTimeStamp()) || !(Log_1.Log.CheckDebug() && Log_1.Log.Debug("InstanceDungeon", 5, "不允许短时间内触发多次进入副本的按钮"), 1);
  }
}
exports.InstanceDungeonStartButtonItem = InstanceDungeonStartButtonItem;
//# sourceMappingURL=InstanceDungeonStartButtonItem.js.map