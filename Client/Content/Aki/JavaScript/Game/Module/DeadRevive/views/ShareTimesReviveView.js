"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShareTimesReviveView = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const DeadReviveDefine_1 = require("../DeadReviveDefine");
class ShareTimesReviveView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ABc = 0;
    this.kLc = 0;
    this.i3t = () => {
      if (this.ZFt()) {
        ControllerHolder_1.ControllerHolder.DeadReviveController.TryReviveCurrentRoleByShare();
      }
    };
    this.YNi = () => {
      var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(283);
      e.FunctionMap.set(2, () => {
        let e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId;
        if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
          e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
        }
        if (ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)?.InstSubType === 33) {
          ControllerHolder_1.ControllerHolder.DangoAbyssController.RequestQuitChallenge();
        } else {
          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon();
        }
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    };
    this.OLc = () => {
      var e = ModelManager_1.ModelManager.DeadReviveModel.CurrentShareReviveTimes;
      var i = ModelManager_1.ModelManager.DeadReviveModel.MaxShareReviveTimes;
      this.kLc = e;
      var n = this.GetText(3);
      if (e > 0) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(n, DeadReviveDefine_1.SHARE_REVIVE_REMAIN_TIMES, e, i);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(n, DeadReviveDefine_1.SHARE_REVIVE_NO_TIMES);
      }
      var e = this.GetText(4);
      var i = this.ABc > 0;
      e.SetUIActive(i);
      if (i) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(e, DeadReviveDefine_1.REVIVE_COOLDOWN, this.ABc.toFixed(1));
      }
      this.GetButton(0).GetRootComponent().SetUIActive(this.ZFt());
    };
    this.PBc = (e, i) => {
      if (e === ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem?.GetCreatureDataId()) {
        this.ABc = i;
        this.OLc();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText]];
    this.BtnBindInfo = [[0, this.i3t], [1, this.YNi]];
  }
  OnStart() {
    var e = this.GetText(2);
    LguiUtil_1.LguiUtil.SetLocalTextNew(e, ModelManager_1.ModelManager.DeadReviveModel.ReviveConfig?.ReviveTitle ?? "");
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem;
    if (e) {
      e = ModelManager_1.ModelManager.DeadReviveModel.ReviveCooldownCreatureMap.get(e.GetCreatureDataId());
      this.ABc = MathUtils_1.MathUtils.MillisecondToSecond * (e?.RemainMilliseconds ?? 0);
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnShareReviveTimesChange, this.OLc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRoleReviveCooldownChange, this.PBc);
  }
  OnBeforeShow() {
    this.OLc();
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnShareReviveTimesChange, this.OLc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRoleReviveCooldownChange, this.PBc);
  }
  ZFt() {
    return this.kLc > 0 && this.ABc <= 0;
  }
}
exports.ShareTimesReviveView = ShareTimesReviveView;
//# sourceMappingURL=ShareTimesReviveView.js.map