"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ShareTimesReviveView = void 0;
const UE = require("ue"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  DeadReviveDefine_1 = require("../DeadReviveDefine");
class ShareTimesReviveView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.ABc = 0, this.kLc = 0, this.i3t = () => {
      this.ZFt() && ControllerHolder_1.ControllerHolder.DeadReviveController.TryReviveCurrentRoleByShare()
    }, this.YNi = () => {
      var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(283);
      e.FunctionMap.set(2, () => {
        let e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId;
        ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && (e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId()), 33 === ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)?.InstSubType ? ControllerHolder_1.ControllerHolder.DangoAbyssController.RequestQuitChallenge() : InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon()
      }), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e)
    }, this.OLc = () => {
      var e = ModelManager_1.ModelManager.DeadReviveModel.CurrentShareReviveTimes,
        i = ModelManager_1.ModelManager.DeadReviveModel.MaxShareReviveTimes,
        n = (this.kLc = e, this.GetText(3)),
        e = (0 < e ? LguiUtil_1.LguiUtil.SetLocalTextNew(n, DeadReviveDefine_1.SHARE_REVIVE_REMAIN_TIMES, e, i) : LguiUtil_1.LguiUtil.SetLocalTextNew(n, DeadReviveDefine_1.SHARE_REVIVE_NO_TIMES), this.GetText(4)),
        i = 0 < this.ABc;
      e.SetUIActive(i), i && LguiUtil_1.LguiUtil.SetLocalTextNew(e, DeadReviveDefine_1.REVIVE_COOLDOWN, this.ABc.toFixed(1)), this.GetButton(0).GetRootComponent().SetUIActive(this.ZFt())
    }, this.PBc = (e, i) => {
      e === ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem?.GetCreatureDataId() && (this.ABc = i, this.OLc())
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIText]
    ], this.BtnBindInfo = [
      [0, this.i3t],
      [1, this.YNi]
    ]
  }
  OnStart() {
    var e = this.GetText(2),
      e = (LguiUtil_1.LguiUtil.SetLocalTextNew(e, ModelManager_1.ModelManager.DeadReviveModel.ReviveConfig?.ReviveTitle ?? ""), ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem);
    e && (e = ModelManager_1.ModelManager.DeadReviveModel.ReviveCooldownCreatureMap.get(e.GetCreatureDataId()), this.ABc = MathUtils_1.MathUtils.MillisecondToSecond * (e?.RemainMilliseconds ?? 0))
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnShareReviveTimesChange, this.OLc), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRoleReviveCooldownChange, this.PBc)
  }
  OnBeforeShow() {
    this.OLc()
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnShareReviveTimesChange, this.OLc), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRoleReviveCooldownChange, this.PBc)
  }
  ZFt() {
    return 0 < this.kLc && this.ABc <= 0
  }
}
exports.ShareTimesReviveView = ShareTimesReviveView;
//# sourceMappingURL=ShareTimesReviveView.js.map