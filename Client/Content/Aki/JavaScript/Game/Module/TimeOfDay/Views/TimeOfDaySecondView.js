"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeOfDaySecondView = undefined;
const UE = require("ue");
const ue_1 = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiLayer_1 = require("../../../Ui/UiLayer");
const NoCircleAttachView_1 = require("../../AutoAttach/NoCircleAttachView");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const TimeOfDayAnimController_1 = require("../TimeOfDayAnimController");
const TimeOfDayController_1 = require("../TimeOfDayController");
const TimeOfDayDefine_1 = require("../TimeOfDayDefine");
const TimeOfDaySecondCircleAttachItem_1 = require("./TimeOfDaySecondCircleAttachItem");
const TimeOfDaySecondToggleItem_1 = require("./TimeOfDaySecondToggleItem");
const TIMEGAP = 1000;
class TimeOfDaySecondView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.IRe = undefined;
    this.ELo = undefined;
    this.SLo = undefined;
    this.Sui = undefined;
    this.TTn = undefined;
    this.LTn = undefined;
    this.yLo = () => {
      return new TimeOfDaySecondToggleItem_1.TimeOfDaySecondToggleItem();
    };
    this.ILo = (e, i, t) => {
      return new TimeOfDaySecondCircleAttachItem_1.TimeOfDaySecondCircleAttachItem(e);
    };
    this.TLo = e => {
      if (!this.ELo.IsVelocityMoveState()) {
        this.ELo.AttachToIndex(e.GetCurrentShowItemIndex(), false);
      }
    };
    this.LLo = () => {
      this.DLo();
    };
    this.$Ge = e => {
      if (e === "TimeOfDayLoadingView" && (TimeOfDayController_1.TimeOfDayController.SetUiAnimFlag(false), this.GetUiNiagara(4)?.ActivateSystem(true), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DestroyAllUiCameraAnimationHandles), this.LTn)) {
        this.LTn();
        this.LTn = undefined;
      }
    };
    this.ELt = e => {
      if (!(e < 0) && ModelManager_1.ModelManager.TimeOfDayModel.CurrentSelectTimeItemSt?.ChangeDayIndex !== e) {
        this.Sui.SelectGridProxy(e);
        var i = TimeOfDayDefine_1.DEFAULT_JUMP_HOUR * TimeOfDayDefine_1.TOD_SECOND_PER_HOUR;
        for (const t of this.SLo) {
          if (t.ChangeDayIndex === e && (e === 0 || t.SetTime === i)) {
            ModelManager_1.ModelManager.TimeOfDayModel.CurrentSelectTimeItemSt = t;
            break;
          }
        }
        this.ELo.AttachToIndex(ModelManager_1.ModelManager.TimeOfDayModel.CurrentSelectTimeItemSt.Id, true);
        for (let e = -3; e < 3; e++) {
          this.ELo.GetItemByShowIndex(e)?.GetRootItem().SetHierarchyIndex(e + 3);
        }
        this.GetItem(7).GetOwner().GetComponentByClass(ue_1.UIInturnAnimController.StaticClass()).Play();
      }
    };
    this.q7e = () => {
      this.FNe();
    };
    this.Awe = () => {
      this.CloseMe();
    };
    this.L3e = () => {
      this.RLo(ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second, ModelManager_1.ModelManager.TimeOfDayModel.CurrentSelectTimeItemSt.SetTime);
    };
    this.RLo = (e, i, t) => {
      var r = i - e < TimeOfDayDefine_1.TOD_MIN_ADJUST_MINUTE * TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE ? i + TimeOfDayDefine_1.TOD_SECOND_PER_DAY : i;
      this.LTn = t;
      var t = this.ULo();
      TimeOfDayController_1.TimeOfDayController.SetUiAnimFlag(true);
      TimeOfDayController_1.TimeOfDayController.AdjustTime(i, Protocol_1.Aki.Protocol.C4s.Proto_PlayerOperate, t);
      this.TTn = TimerSystem_1.GameplayTimerSystem.Delay(() => {
        this.ALo();
        this.TTn = undefined;
      }, 1000);
      this.PLo(e, r, () => {});
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UINiagara], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIHorizontalLayout], [9, UE.UIItem]];
    this.BtnBindInfo = [[2, this.Awe], [3, this.L3e]];
  }
  async OnBeforeStartAsync() {
    this.Sui = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(8), this.yLo);
    var e = ConfigManager_1.ConfigManager.TimeOfDayConfig.GetDayTimeChangePresets();
    var i = [];
    i.push(this.Sui.RefreshByDataAsync(e));
    this.Sui.SelectGridProxy(0);
    var e = CommonParamById_1.configCommonParamById.GetStringConfig("TimeOfDaySecondMiddleOffsetCurve");
    if (e) {
      const t = new CustomPromise_1.CustomPromise();
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.CurveFloat, e => {
        TimeOfDaySecondCircleAttachItem_1.TimeOfDaySecondCircleAttachItem.MiddleOffsetCurve = e;
        t.SetResult();
      }, 100, this.MemoryTag);
      i.push(t.Promise);
    }
    await Promise.all(i);
  }
  OnStart() {
    var e = this.GetItem(6);
    var i = this.GetItem(7);
    this.GetUiNiagara(4).SetUIActive(false);
    this.ELo = new NoCircleAttachView_1.NoCircleAttachView(e.GetOwner());
    this.ELo?.SetControllerItem(i);
    this.ELo?.SetIfNeedFakeItem(true);
    this.ELo.CreateItems(this.GetItem(5).GetOwner(), 0, this.ILo);
    this.GetItem(5).SetUIActive(false);
    this.FNe();
    this.ALo();
    this.IRe = TimerSystem_1.GameplayTimerSystem.Forever(this.q7e, TIMEGAP);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ClickTimeItem, this.TLo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AdjustTimeInAnim, this.RLo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSelectTimeItem, this.LLo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSelectTimePreset, this.ELt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ClickTimeItem, this.TLo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AdjustTimeInAnim, this.RLo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSelectTimeItem, this.LLo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSelectTimePreset, this.ELt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge);
  }
  OnAfterShow() {
    var e;
    if (this.OpenParam !== undefined) {
      e = this.OpenParam;
      this.RLo(ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second, e.SetTime);
    }
  }
  DLo() {
    var e = ModelManager_1.ModelManager.TimeOfDayModel.CurrentSelectTimeItemSt;
    this.Sui.SelectGridProxy(e.ChangeDayIndex);
  }
  ALo() {
    this.SLo = ModelManager_1.ModelManager.TimeOfDayModel.GetTimeOfDayShowData();
    var e = this.SLo;
    this.ELo.ReloadView(e.length, e);
    for (let e = -3; e < 3; e++) {
      this.ELo.GetItemByShowIndex(e)?.GetRootItem().SetHierarchyIndex(e + 3);
    }
  }
  OnTick(e) {
    this.xLo();
  }
  xLo() {
    var e = this.GetUiNiagara(4);
    if (!this.ELo || this.ELo.MovingState()) {
      if (e.IsUIActiveSelf()) {
        this.GetUiNiagara(4).SetUIActive(false);
      }
    } else if (!e.IsUIActiveSelf()) {
      this.GetUiNiagara(4).SetUIActive(true);
    }
  }
  FNe() {
    var e = ModelManager_1.ModelManager.TimeOfDayModel.GameTime.HourMinuteString;
    this.GetText(1).SetText(e);
  }
  OnBeforeDestroy() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this.IRe)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.IRe);
    }
    if (TimerSystem_1.GameplayTimerSystem.Has(this.TTn)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TTn);
    }
    TimeOfDayAnimController_1.TimeOfDayAnimController.CallBack = () => {};
    TimeOfDayController_1.TimeOfDayController.SetUiAnimFlag(false);
    UiLayer_1.UiLayer.SetShowNormalMaskLayer(false);
    TimeOfDayController_1.TimeOfDayController.ResumeTimeScale();
    if (this.LTn) {
      this.LTn();
      this.LTn = undefined;
    }
    TimeOfDaySecondCircleAttachItem_1.TimeOfDaySecondCircleAttachItem.MiddleOffsetCurve = undefined;
    this.ELo.Clear();
    this.Sui?.ClearChildren();
  }
  ULo() {
    return ModelManager_1.ModelManager.TimeOfDayModel.CurrentSelectTimeItemSt.ChangeDayIndex;
  }
  PLo(e, i, t) {
    TimeOfDayAnimController_1.TimeOfDayAnimController.PlayTimeAnimation(e, i, t);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    const i = Number(e[0]);
    if (i !== 0) {
      e = this.SLo?.findIndex(e => e.SetTime === i);
      if (e && e >= 0) {
        this.ELo?.AttachToIndex(e, true);
        e = this.ELo?.GetItemByShowIndex(e)?.GetRootItem();
        if (e) {
          return [e, e];
        }
      }
    }
  }
}
exports.TimeOfDaySecondView = TimeOfDaySecondView;
//# sourceMappingURL=TimeOfDaySecondView.js.map