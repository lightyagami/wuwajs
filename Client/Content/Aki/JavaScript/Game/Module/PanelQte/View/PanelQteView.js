"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelQteView = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Time_1 = require("../../../../Core/Common/Time");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const CameraController_1 = require("../../../Camera/CameraController");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const PanelQteController_1 = require("../PanelQteController");
const CAMERA_SHAKE_OUTER_RADIUS = 500;
const MIN_BUFF_CD = 1000;
class PanelQteView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.IsMobile = false;
    this.IsPause = false;
    this.IsQteStart = true;
    this.IsQteEnd = false;
    this.CameraShakeOnInput = false;
    this.LoadCameraShakeHandleId = ResourceSystem_1.ResourceSystem.InvalidId;
    this.CameraShakeType = undefined;
    this.BuffId = undefined;
    this.BuffCd = 0;
    this.BuffEnableTime = 0;
    this.Mzt = () => {
      this.RefreshVisible();
    };
    this.JDe = () => {
      this.IsPause = false;
    };
    this.ZDe = () => {
      this.IsPause = true;
    };
    this.VOi = e => {
      if (this.OpenParam === e) {
        this.IsQteEnd = true;
        this.HandleQteEnd();
      }
    };
    this.XBo = () => {
      this.InputControllerChangeInner();
    };
  }
  OnRegisterComponent() {
    this.IsMobile = Info_1.Info.IsInTouch();
  }
  OnAfterShow() {
    this.RefreshVisible();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActiveBattleView, this.JDe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DisActiveBattleView, this.ZDe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PanelQteEnd, this.VOi);
    if (!this.IsMobile) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.XBo);
    }
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.AddCallback(20, this.Mzt);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ActiveBattleView, this.JDe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DisActiveBattleView, this.ZDe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PanelQteEnd, this.VOi);
    if (!this.IsMobile) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.XBo);
    }
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.RemoveCallback(20, this.Mzt);
  }
  RefreshVisible() {
    var e = ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(20);
    this.SetActive(e);
  }
  HandleQteEnd() {}
  InputControllerChangeInner() {}
  OnTick(e) {
    if (!this.IsPause) {
      if (this.IsQteStart && !this.IsQteEnd) {
        ModelManager_1.ModelManager.PanelQteModel.UpdateTime(e);
      }
    }
  }
  OnBeforeDestroy() {
    var e;
    this.ClearCameraShake();
    this.ClearBuff();
    if (ModelManager_1.ModelManager.PanelQteModel.IsInQte && (e = this.OpenParam) === ModelManager_1.ModelManager.PanelQteModel.GetContext().QteHandleId) {
      PanelQteController_1.PanelQteController.StopQte(e, true);
    }
  }
  InitCameraShake(e) {
    this.CameraShakeOnInput = e.CameraShakeOnInput;
    if (this.CameraShakeOnInput) {
      this.LoadCameraShakeHandleId = ResourceSystem_1.ResourceSystem.LoadAsync(e.CameraShakeType.ToAssetPathName(), UE.Class, e => {
        this.CameraShakeType = e;
        this.LoadCameraShakeHandleId = ResourceSystem_1.ResourceSystem.InvalidId;
      }, 100, this.MemoryTag);
    }
  }
  PlayCameraShake() {
    var e;
    if (this.CameraShakeType) {
      e = ModelManager_1.ModelManager.CameraModel.CameraLocation;
      CameraController_1.CameraController.PlayWorldCameraShake(this.CameraShakeType, e.ToUeVector(), 0, CAMERA_SHAKE_OUTER_RADIUS, 1, false);
    }
  }
  ClearCameraShake() {
    this.CameraShakeOnInput = false;
    this.CameraShakeType = undefined;
    if (this.LoadCameraShakeHandleId !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.LoadCameraShakeHandleId);
      this.LoadCameraShakeHandleId = ResourceSystem_1.ResourceSystem.InvalidId;
    }
  }
  InitBuff(e) {
    this.BuffId = Number(e.BuffOnInput);
    this.BuffCd = Math.max(e.BuffCd * TimeUtil_1.TimeUtil.InverseMillisecond, MIN_BUFF_CD);
  }
  AddBuff() {
    var e;
    var t;
    var i;
    if (this.BuffId && !(Time_1.Time.WorldTime < this.BuffEnableTime) && (this.BuffEnableTime = Time_1.Time.WorldTime + this.BuffCd, t = (e = ModelManager_1.ModelManager.PanelQteModel.GetContext()).GetSourceEntity())) {
      i = t.GetComponent(0).GetCreatureDataId();
      t.GetComponent(185)?.AddBuff(this.BuffId, {
        InstigatorId: i,
        Reason: "界面QTE输入时添加",
        PreMessageId: e.PreMessageId
      });
    }
  }
  ClearBuff() {
    this.BuffId = undefined;
  }
}
exports.PanelQteView = PanelQteView;
//# sourceMappingURL=PanelQteView.js.map