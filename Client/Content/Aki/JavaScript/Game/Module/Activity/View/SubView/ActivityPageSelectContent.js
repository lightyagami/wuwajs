"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityPageSelectContent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const ActivityBubbleComponent_1 = require("./ActivityBubbleComponent");
class ActivityPageSelectContent extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.uFe = undefined;
    this.kel = undefined;
    this.U5e = false;
    this.t$f = undefined;
    this.i$f = false;
    this.kOe = t => {
      this.t$f.RefreshBubble(this.Pe);
    };
    this.cJs = t => {
      if (this.Pe?.Id && this.Pe.Id === t) {
        this.P5e();
        this.u3e();
        this.Kbe();
        this.AM1();
        this.WVm();
        this.QVm();
        this.RefreshBubbleAndCheckTimer();
      }
    };
    this.jbe = t => {
      this.kel?.(this.Pe, t);
      if (t) {
        this.r$f();
      }
    };
    this.A5e = () => this.uFe?.(this.Pe.Id, this.GetExtendToggle(0).GetToggleState() === 1) ?? true;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIItem], [5, UE.UITexture], [6, UE.UIItem], [7, UE.UISprite], [8, UE.UISprite], [9, UE.UISprite], [10, UE.UIItem], [11, UE.UISprite], [12, UE.UIText]];
    this.BtnBindInfo = [[0, this.jbe]];
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.A5e);
    this.t$f = new ActivityBubbleComponent_1.ActivityBubbleComponent(this.GetItem(10), this.GetSprite(11), this.GetText(12), (t, e, i) => {
      this.SetSpriteByPath(t, e, i);
    });
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshActivityTab, this.cJs);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshActivityTab, this.cJs);
  }
  OnBeforeShow() {
    this.AddEventListener();
  }
  OnBeforeHide() {
    this.RemoveEventListener();
  }
  kot() {
    ControllerHolder_1.ControllerHolder.ActivityController.RegisterRefreshTimerDelegate(this.kOe);
    this.i$f = true;
  }
  xHe() {
    ControllerHolder_1.ControllerHolder.ActivityController.UnregisterRefreshTimerDelegate(this.kOe);
    this.i$f = false;
  }
  o$f() {
    return !this.i$f && (this.kot(), true);
  }
  n$f() {
    return !!this.i$f && (this.xHe(), true);
  }
  OnBeforeDestroy() {
    this.Ovt();
    this.xHe();
  }
  Oqe(t, e = false) {
    var i = t ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(i, e);
    if (!e && t) {
      this.r$f();
    }
  }
  SetToggleState(t, e = true) {
    this.Oqe(t, e);
  }
  BindToggleClick(t) {
    this.kel = t;
  }
  BindCanToggleExecuteChange(t) {
    this.uFe = t;
  }
  Refresh(t, e, i) {
    try {
      if (this.Pe) {
        this.Ovt();
      }
      this.Pe = t;
      this.K8e(t);
      this.Oqe(e);
      this.P5e();
      this.u3e();
      this.Kbe();
      this.AM1();
      this.WVm();
      this.QVm();
      this.RefreshBubbleAndCheckTimer();
    } catch (t) {
      ModelManager_1.ModelManager.ActivityModel.OpenActivityErrorConfirmBox(this.Pe?.Id ?? 0, this.Pe?.Type ?? 0);
      if (t instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("Activity", 37, "[Activity] 活动页签状态异常", t, ["id", this.Pe?.Id ?? 0], ["error", t.message]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Activity", 37, "[Activity] 活动页签状态异常", ["id", this.Pe?.Id ?? 0]);
      }
    }
  }
  Clear() {
    this.n$f();
  }
  P5e() {
    var t = this.Pe.GetTitle();
    this.GetText(1).SetText(t.replace(/<.*?>/g, ""));
  }
  u3e() {
    this.GetText(3).SetUIActive(false);
    this.GetItem(4).SetUIActive(false);
  }
  Kbe() {
    var e = this.Pe.LocalConfig.TabTexture;
    const i = this.GetTexture(5);
    i.SetUIActive(false);
    if (e && e.length !== 0) {
      let t = 0;
      if (e.length >= 2) {
        s = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
        t = s === 0 ? 0 : 1;
      }
      this.SetTextureByPath(e[t], i, undefined, () => {
        i.SetUIActive(true);
      });
      var s = this.Pe.FinishShowState;
      this.GetItem(6).SetUIActive(s);
    }
  }
  AM1() {
    var t = this.Pe.LocalConfig.TabTagIcon;
    var e = this.GetSprite(7);
    var i = !!t;
    e.SetUIActive(i);
    if (i) {
      this.SetSpriteByPath(t, e, true);
    }
  }
  WVm() {
    var t = this.Pe.FinishShowState;
    this.GetSprite(9).SetUIActive(this.Pe.LocalConfig.IsTabEffectNotice && !t);
  }
  QVm() {
    var t;
    var e;
    var i = this.Pe.LocalConfig.ShowTabTypeId;
    var i = ConfigManager_1.ConfigManager.ActivityConfig.GetActivityTitleTags(i);
    if (i && (i = i.TagIcon, (t = this.GetSprite(8)).SetUIActive(e = !!i), e)) {
      this.SetSpriteByPath(i, t, true);
    }
  }
  K8e(t) {
    RedDotController_1.RedDotController.BindRedDot("CommonActivityPage", this.GetItem(2), undefined, t.Id);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, t.Id);
    this.U5e = true;
  }
  Ovt() {
    if (this.U5e) {
      RedDotController_1.RedDotController.UnBindGivenUi("CommonActivityPage", this.GetItem(2), this.Pe.Id);
      this.U5e = false;
    }
  }
  RefreshBubbleAndCheckTimer() {
    if (this.t$f.RefreshBubble(this.Pe)) {
      this.o$f();
    } else {
      this.n$f();
    }
  }
  r$f() {
    if (this.t$f.CheckToUpdateBubbleClickState()) {
      this.RefreshBubbleAndCheckTimer();
    }
  }
  GetKey(t, e) {
    return t.Id;
  }
}
exports.ActivityPageSelectContent = ActivityPageSelectContent;
//# sourceMappingURL=ActivityPageSelectContent.js.map