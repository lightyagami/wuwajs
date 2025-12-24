"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeatherCentralMainView = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../Util/Layout/GenericLayout");
const WeatherCentralBottomItem_1 = require("./WeatherCentralBottomItem");
const MAX_TOGGLE_COUNT = 8;
class WeatherCentralMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Qyi = undefined;
    this.puf = undefined;
    this.vuf = undefined;
    this.A4c = undefined;
    this.cpu = undefined;
    this.yuf = undefined;
    this.Suf = undefined;
    this.duf = -1;
    this.RId = () => {
      this.puf?.GetLayoutItemList().forEach(e => {
        e.RefreshRedDot();
      });
      this.vuf?.GetLayoutItemList().forEach(e => {
        e.RefreshRedDot();
      });
    };
    this.Muf = () => {
      const e = new WeatherToggleItem();
      e.SetToggleClickCallback(() => {
        this.N8e(true, e);
      });
      e.SetCanExecuteChange(e => this.Lke(true, e));
      return e;
    };
    this.Euf = () => {
      const e = new WeatherToggleItem();
      e.SetToggleClickCallback(() => {
        this.N8e(false, e);
      });
      e.SetCanExecuteChange(e => this.Lke(false, e));
      return e;
    };
    this.p5t = () => {
      if (this.duf < 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Weather", 90, "选择的天气非法或没有选择天气！");
        }
      } else {
        var e = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId();
        const i = ConfigManager_1.ConfigManager.AreaConfig.GetLevelOneAreaId(e);
        var e = ModelManager_1.ModelManager.WeatherModel.IsInValidArea(i);
        var t = ModelManager_1.ModelManager.WeatherModel.IsWeatherBanArea(this.duf, i);
        if (!e || t) {
          const r = ConfigManager_1.ConfigManager.WeatherModuleConfig.GetWeatherSwitchConfig(this.duf).MarkConfigId;
          if (ModelManager_1.ModelManager.MapModel.IsConfigMarkIdUnlock(r)) {
            (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(429)).FunctionMap.set(2, () => {
              ControllerHolder_1.ControllerHolder.WorldMapController.TryTeleport(r, () => {
                ModelManager_1.ModelManager.WeatherModel?.SetTargetWeatherSwitchConfigId(this.duf);
              });
            });
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
            return;
          } else {
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("WeatherControl_InvalidAreaTips");
            return;
          }
        }
        if (!ModelManager_1.ModelManager.WeatherModel.IsCurrentTimeInValidTime(this.duf) && ModelManager_1.ModelManager.WeatherModel.TimeSwitchConfirmNeedShow) {
          (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(392)).HasToggle = true;
          t.ToggleText = ConfigManager_1.ConfigManager.TextConfig.GetTextById("PlotSkipConfirmToggle");
          t.SetToggleFunction(e => {
            ModelManager_1.ModelManager.WeatherModel.TimeSwitchConfirmNeedShow = !e;
          });
          t.FunctionMap.set(2, () => {
            this.pgm(i);
          });
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
        } else {
          this.pgm(i);
        }
      }
    };
    this.iGf = () => {
      ModelManager_1.ModelManager.WeatherModel?.RecordSwitchTime();
      var e = ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second;
      ControllerHolder_1.ControllerHolder.TimeOfDayController.AdjustTime(e, Protocol_1.Aki.Protocol.C4s.Proto_PlayerOperate);
    };
    this.rGf = () => {
      ControllerHolder_1.ControllerHolder.WeatherController.RequestSwitchWeather(this.duf).then(() => {
        var e = ConfigManager_1.ConfigManager.WeatherModuleConfig.GetWeatherSwitchConfig(this.duf);
        var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name);
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("WeatherControl_SuccessTips", e);
      });
    };
    this.Ga_ = e => {
      var t = this.cpu.GetLGUISpaceAbsolutePosition().Y;
      var i = this.cpu.Width / 2;
      const r = this.Iuf(this.yuf, t, i);
      this.yuf.forEach((e, t) => {
        t = r[t];
        e.SetPivot(new UE.Vector2D(MathUtils_1.MathUtils.Lerp(0.6, -0.35, t), 0.5));
      });
      const s = this.Iuf(this.Suf, t, i);
      this.Suf.forEach((e, t) => {
        t = s[t];
        e.SetPivot(new UE.Vector2D(MathUtils_1.MathUtils.Lerp(0.4, 1.35, t), 0.5));
      });
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout], [2, UE.UIItem], [3, UE.UIVerticalLayout], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIScrollViewWithScrollbarComponent]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.Qyi = new PopupCaptionItem_1.PopupCaptionItem();
    e.push(this.Qyi.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.A4c = new WeatherCentralBottomItem_1.WeatherCentralBottomItem();
    e.push(this.A4c.CreateThenShowByActorAsync(this.GetItem(6).GetOwner()));
    this.puf = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.Muf);
    this.vuf = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(3), this.Euf);
    e.push(this.Tuf());
    await Promise.all(e);
  }
  OnStart() {
    this.Qyi?.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.GetScrollViewWithScrollbar(7)?.OnScrollValueChange.Bind(this.Ga_);
    this.A4c?.SetClickConfirmCallback(this.p5t);
    this.cpu = this.GetItem(5);
    this.yuf = this.puf.GetLayoutItemList().map(e => e.GetRootItem());
    this.Suf = this.vuf.GetLayoutItemList().map(e => e.GetRootItem());
    let e = 0;
    var t = ConfigManager_1.ConfigManager.WeatherModuleConfig.GetWeatherSwitchConfigAll();
    let i = this.OpenParam;
    if (i === undefined) {
      r = ModelManager_1.ModelManager.WeatherModel.CurrentWeatherId;
      i = ModelManager_1.ModelManager.WeatherModel.GetSwitchConfigIdByWeatherId(r);
    }
    var r = t.findIndex(e => e.Id === i);
    if (r >= 0) {
      e = r;
    }
    this.Y5f(e);
    this.RId();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnWeatherCentralRedDotUpdate, this.RId);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnWeatherCentralRedDotUpdate, this.RId);
  }
  Y5f(e) {
    var t;
    if (e % 2 == 0) {
      if (t = this.puf.GetLayoutItemByIndex(e / 2)) {
        t.SetToggleStateForce(true, true, true);
      }
    } else if (t = this.vuf.GetLayoutItemByIndex((e - 1) / 2)) {
      t.SetToggleStateForce(true, true, true);
    }
  }
  async Tuf() {
    var i = ConfigManager_1.ConfigManager.WeatherModuleConfig?.GetWeatherSwitchConfigAll();
    if (i) {
      var r = [];
      var s = [];
      let t = Math.max(MAX_TOGGLE_COUNT, i.length);
      if (t % 2 == 1) {
        t++;
      }
      for (let e = 0; e < t; e++) {
        var o = {};
        var a = i[e];
        if (a) {
          o.ConfigId = a.Id;
        }
        (e % 2 == 0 ? r : s).push(o);
      }
      await Promise.all([this.puf?.RefreshByDataAsync(r, true), this.vuf?.RefreshByDataAsync(s, true)]);
    }
  }
  pgm(e) {
    UiManager_1.UiManager.ResetToBattleView();
    ControllerHolder_1.ControllerHolder.AutoPilotController.ExitAutoPilot("WeatherSwitch");
    var t = ModelManager_1.ModelManager.WeatherModel.GetAccelerateWeatherTime(this.duf);
    if (t <= 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Weather", 90, "无需时间加速");
      }
      this.iGf();
      ModelManager_1.ModelManager.WeatherModel.ObservatoryModule.PlayWeatherControlSequence(this.rGf);
    } else {
      ModelManager_1.ModelManager.WeatherModel.ObservatoryModule.AccelerateTime(e, t, this.rGf, this.iGf);
    }
  }
  N8e(e, t) {
    (e ? (this.vuf?.DeselectCurrentGridProxy(), this.puf) : (this.puf?.DeselectCurrentGridProxy(), this.vuf))?.SelectGridProxy(t.GridIndex);
    this.A4c?.RefreshByConfigId(t.ConfigId);
    this.duf = t.ConfigId;
    if (ModelManager_1.ModelManager.WeatherModel.IsWeatherSwitchConfigUnlocked(t.ConfigId)) {
      ModelManager_1.ModelManager.WeatherModel.RecordWeatherClicked(t.ConfigId);
    }
  }
  Lke(e, t) {
    if (e) {
      return this.puf?.GetSelectedGridIndex() !== t;
    } else {
      return this.vuf?.GetSelectedGridIndex() !== t;
    }
  }
  Iuf(e, t, i) {
    const r = [];
    e.forEach(e => {
      e = e.GetLGUISpaceAbsolutePosition().Y;
      e = Math.abs(e - t);
      e = Math.min(e / i, 1);
      e = Math.sqrt(1 - e * e);
      r.push(e);
    });
    return r;
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length !== 0 && e[0] === "WeatherNotSelected") {
      for (const i of this.puf.GetLayoutItemList()) {
        var t = i.GetToggleState();
        if (t === 0) {
          if (t = i.GetToggleItem()) {
            return [t, t];
          } else {
            return undefined;
          }
        }
      }
    }
  }
}
exports.WeatherCentralMainView = WeatherCentralMainView;
class WeatherToggleItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.ConfigId = 0;
    this.NTt = undefined;
    this.Lke = undefined;
    this.Ruf = false;
    this.kqe = e => {
      if (e === 1) {
        this.NTt?.();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIExtendToggleSpriteTransition], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  OnStart() {
    this.GetExtendToggle(0)?.CanExecuteChange.Bind(() => !this.Ruf && (!this.Lke || this.Lke(this.GridIndex)));
  }
  SetToggleClickCallback(e) {
    this.NTt = e;
  }
  SetCanExecuteChange(e) {
    this.Lke = e;
  }
  GetToggleState() {
    return this.GetExtendToggle(0)?.GetToggleState() ?? 0;
  }
  GetToggleItem() {
    return this.GetExtendToggle(0).GetRootComponent();
  }
  SetToggleStateForce(e, t, i) {
    this.GetExtendToggle(0)?.SetToggleStateForce(e ? 1 : 0, t, i, i);
  }
  Refresh(e, t, i) {
    var r = this.ConfigId === e.ConfigId;
    this.Ruf = e.ConfigId === undefined;
    this.ConfigId = e.ConfigId ?? 0;
    if (!r) {
      this.RefreshMainPerformance();
      this.Oqe();
    }
    if (e.ConfigId) {
      this.RefreshCurrentTimeState();
      this.RefreshCurrentTips();
      this.RefreshRedDot();
    }
  }
  Oqe() {
    let e = 0;
    var t;
    if (this.ConfigId !== 0) {
      t = ModelManager_1.ModelManager.WeatherModel.IsWeatherSwitchConfigUnlocked(this.ConfigId);
      e = t ? 1 : 2;
    }
    this.GetExtendToggle(0)?.SetSelfInteractive(e !== 0);
    this.GetItem(7)?.SetUIActive(e === 0);
    this.GetItem(6)?.SetUIActive(e === 2);
    this.GetItem(5)?.SetUIActive(e === 1);
    this.GetItem(3)?.SetUIActive(e === 1);
    this.GetText(2)?.SetUIActive(e === 1);
    this.GetItem(8)?.SetUIActive(false);
  }
  OnDeselected(e) {
    this.GetExtendToggle(0)?.SetToggleStateForce(0, false);
  }
  RefreshMainPerformance() {
    var e;
    if (this.ConfigId !== 0 && (e = ConfigManager_1.ConfigManager.WeatherModuleConfig.GetWeatherSwitchConfig(this.ConfigId))) {
      this.SetTextureShowUntilLoaded(e.Background, this.GetTexture(1));
      this.SetExtendToggleSpriteTransitionByPath(e.Icon, this.GetUiExtendToggleSpriteTransition(4));
      this.GetText(2)?.ShowTextNew(e.Name);
    }
  }
  RefreshCurrentTimeState() {
    var e = ModelManager_1.ModelManager.WeatherModel.IsCurrentTimeInValidTime(this.ConfigId);
    var t = ModelManager_1.ModelManager.WeatherModel.IsWeatherSwitchConfigUnlocked(this.ConfigId);
    this.GetItem(9)?.SetUIActive(!e && t);
  }
  RefreshCurrentTips() {
    var e = ModelManager_1.ModelManager.WeatherModel?.GetCurrentWeatherSwitchConfigId() === this.ConfigId;
    var t = ModelManager_1.ModelManager.WeatherModel.IsWeatherSwitchConfigUnlocked(this.ConfigId);
    this.GetItem(5)?.SetUIActive(t && e);
  }
  RefreshRedDot() {
    var e = ModelManager_1.ModelManager.WeatherModel.IsWeatherSwitchConfigUnlocked(this.ConfigId);
    var t = ModelManager_1.ModelManager.WeatherModel.IsWeatherClicked(this.ConfigId);
    this.GetItem(8)?.SetUIActive(e && !t);
  }
}
//# sourceMappingURL=WeatherCentralMainView.js.map