"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleUiPureModeData = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GameSettingsDefine_1 = require("../../GameSettings/GameSettingsDefine");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const desktopHideChildren = [4, 13, 14, 15, 16, 17];
const padHideChildren = [4, 13, 14, 15, 16, 17];
class BattleUiPureModeData {
  constructor() {
    this.SEl = false;
    this.yEl = 0;
    this.IsSkipConfirmBox = false;
    this.IsSkipConfirmBoxTmp = false;
    this.GuideId = 0;
  }
  Init() {
    this.yEl = Info_1.Info.OperationType;
    this.GuideId = CommonParamById_1.configCommonParamById.GetIntConfig("PureModeGuideId");
  }
  Clear() {
    this.IsOpen = false;
  }
  get IsOpen() {
    return this.SEl;
  }
  set IsOpen(e) {
    if (this.SEl !== e) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "沉浸模式切换", ["是否开启", e]);
      }
      this.SEl = e;
      this.bl(!e);
      UiManager_1.UiManager.RefreshByPureModeChanged();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiPureModeChanged, e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshMenuSetting, GameSettingsDefine_1.EFunction.UIPureMode);
    }
  }
  ShowTypeChange(e, t) {
    if (t !== 0 && this.yEl !== t) {
      if (this.IsOpen) {
        this.bl(false);
        this.yEl = t;
        this.bl(false);
      } else {
        this.yEl = t;
      }
    }
  }
  bl(e) {
    if (this.yEl !== 0) {
      if (this.yEl === 2) {
        ModelManager_1.ModelManager.BattleUiModel?.ChildViewData?.SetChildrenVisible(8, desktopHideChildren, e);
      } else {
        ModelManager_1.ModelManager.BattleUiModel?.ChildViewData?.SetChildrenVisible(8, padHideChildren, e);
      }
    }
  }
}
exports.BattleUiPureModeData = BattleUiPureModeData;
//# sourceMappingURL=BattleUiPureModeData.js.map