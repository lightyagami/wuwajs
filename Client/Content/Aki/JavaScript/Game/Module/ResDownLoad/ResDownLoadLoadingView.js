"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ResDownLoadLoadingView = void 0;
const UE = require("ue"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  HotFixManager_1 = require("../../../Launcher/Ui/HotFix/HotFixManager"),
  VideoUpdateManager_1 = require("../../../Launcher/Update/VideoUpdateManager"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  LguiUtil_1 = require("../Util/LguiUtil");
class ResDownLoadLoadingView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.TDe = void 0, this.Z61 = 0n, this.ZG1 = e => {
      3 === e && (this.e51(), (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(313)).IsEscViewTriggerCallBack = !0, e.FunctionMap.set(0, () => {
        this.CloseMe(), ModelManager_1.ModelManager.QuestResourceModel.UserClicked()
      }), e.FunctionMap.set(1, () => {
        this.CloseMe(), ModelManager_1.ModelManager.QuestResourceModel.UserClicked()
      }), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(e))
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIText]
    ]
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ResDownLoadStateRefresh, this.ZG1)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ResDownLoadStateRefresh, this.ZG1)
  }
  OnStart() {
    this.Og(), this.TDe = TimerSystem_1.TimerSystem.Forever(() => {
      this.Og()
    }, TimeUtil_1.TimeUtil.InverseMillisecond)
  }
  e51() {
    this.TDe && (TimerSystem_1.TimerSystem.Remove(this.TDe), this.TDe = void 0), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "DownLoadText_Downing");
    var e = Number(this.Z61) / Number(this.Z61),
      i = HotFixManager_1.HotFixManager.ByteConverter(0) + "/s ",
      t = "(" + HotFixManager_1.HotFixManager.ByteConverter(this.Z61) + "/" + HotFixManager_1.HotFixManager.ByteConverter(this.Z61) + ") ",
      e = (this.GetTexture(0).SetFillAmount(e), (100 * e).toFixed(2).replace(/\.?0+$/, "") + "%");
    this.GetText(2).SetText(i + t + e)
  }
  Og() {
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    let i = void 0;
    i = (1 === e ? VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(4) : VideoUpdateManager_1.VideoUpdateManager.GetVideoUpdater(3)).GetDownLoadProgress(), this.Z61 = i[2], LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "DownLoadText_Downing");
    var e = Number(i[1]) / Number(i[2]),
      t = HotFixManager_1.HotFixManager.ByteConverter(i[3]) + "/s ",
      r = "(" + HotFixManager_1.HotFixManager.ByteConverter(i[1]) + "/" + HotFixManager_1.HotFixManager.ByteConverter(i[2]) + ") ",
      e = (this.GetTexture(0).SetFillAmount(e), (100 * e).toFixed(2).replace(/\.?0+$/, "") + "%");
    this.GetText(2).SetText(t + r + e)
  }
  OnBeforeDestroy() {
    this.TDe && (TimerSystem_1.TimerSystem.Remove(this.TDe), this.TDe = void 0)
  }
}
exports.ResDownLoadLoadingView = ResDownLoadLoadingView;
//# sourceMappingURL=ResDownLoadLoadingView.js.map