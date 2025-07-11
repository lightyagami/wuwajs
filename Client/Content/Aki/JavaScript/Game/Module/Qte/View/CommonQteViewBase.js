"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonQteViewBase = undefined;
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiLayerType_1 = require("../../../Ui/Define/UiLayerType");
const UiLayer_1 = require("../../../Ui/UiLayer");
const UiManager_1 = require("../../../Ui/UiManager");
class CommonQteViewBase extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.IsMobile = false;
    this.IsQteActive = false;
    this.IsQtePlayStart = false;
    this.IsQteStart = false;
    this.IsQteEnd = false;
    this.IsQteInteractive = false;
    this.IsQtePause = false;
    this.oIl = e => {
      this.CommonQteEnd(e);
    };
    this.mFl = () => {
      this.RefreshOnBattleUiVisibleChanged();
    };
    this.esh = () => {
      if (!this.IsQteEnd) {
        if (Time_1.Time.TimeDilation === 0) {
          this.PauseQte();
        } else {
          this.ResumeQte(true);
        }
      }
    };
  }
  OnRegisterComponent() {
    this.IsMobile = Info_1.Info.IsInTouch();
  }
  OnStart() {
    var e = UiLayer_1.UiLayer.GetFloatUnit(UiLayerType_1.ELayerType.BattleFloat, 2);
    if (e) {
      this.SetParentUiItem(e);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DisableCustomInputData, this.Info.Name);
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.AddCallback(20, this.mFl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TriggerUiTimeDilation, this.esh);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CommonQteEnd, this.oIl);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.EnableCacheCustomInputData, this.Info.Name);
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.RemoveCallback(20, this.mFl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TriggerUiTimeDilation, this.esh);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CommonQteEnd, this.oIl);
  }
  OnAfterShow() {
    super.OnAfterShow();
    this.ResumeQte();
  }
  OnBeforeHide() {
    super.OnBeforeHide();
    this.PauseQte();
  }
  CommonQteEnd(e) {}
  RefreshOnBattleUiVisibleChanged() {}
  PauseQte() {
    if (!this.IsQtePause && !this.IsQteEnd) {
      this.IsQtePause = true;
      if (this.IsQteActive) {
        this.OnQtePause();
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CommonQte", 67, "Qte界面进入暂停", ["IsQteActive", this.IsQteActive]);
      }
    }
  }
  ResumeQte(e = false) {
    if (this.IsQtePause && !this.IsQteEnd && (this.IsQtePause = false, this.IsQteActive && (e ? TimerSystem_1.TimerSystem.Next(() => {
      if (this.RootItem?.IsValid()) {
        this.OnQteResume();
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CommonQte", 67, "Qte界面暂停恢复失败, 界面已销毁");
      }
    }) : this.OnQteResume()), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("CommonQte", 67, "Qte界面暂停恢复", ["IsQteActive", this.IsQteActive]);
    }
  }
  OnQtePause() {}
  OnQteResume() {}
  HandleQteEnd() {}
  IsValidInput() {
    return !!this.IsQteInteractive && !this.IsQteEnd && !this.IsQtePause;
  }
  SetQteActive(e) {
    var t;
    this.IsQteActive = true;
    if (e.Source === 3) {
      if ((t = UiManager_1.UiManager.GetViewByName("VideoView")) && (t = t.GetRootItem())) {
        this.GetRootItem().SetUIParent(t);
      }
    } else if (e.Source === 0) {
      if (t = ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(20)) {
        if (Time_1.Time.TimeDilation === 0) {
          this.PauseQte();
        }
      } else {
        this.PauseQte();
        this.SetActive(t);
      }
    } else if (e.Source === 1 && Time_1.Time.TimeDilation === 0) {
      this.PauseQte();
    }
  }
}
exports.CommonQteViewBase = CommonQteViewBase;
//# sourceMappingURL=CommonQteViewBase.js.map