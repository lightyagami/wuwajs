"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeatherCentralMainView = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
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
    this.gdf = undefined;
    this.Cdf = undefined;
    this.A4c = undefined;
    this.cpu = undefined;
    this.pdf = undefined;
    this.vdf = undefined;
    this.udf = -1;
    this.RId = () => {
      this.gdf?.GetLayoutItemList().forEach(e => {
        e.RefreshRedDot();
      });
      this.Cdf?.GetLayoutItemList().forEach(e => {
        e.RefreshRedDot();
      });
    };
    this.ydf = () => {
      const e = new WeatherToggleItem();
      e.SetToggleClickCallback(() => {
        this.N8e(true, e);
      });
      e.SetCanExecuteChange(e => this.Lke(true, e));
      return e;
    };
    this.Sdf = () => {
      const e = new WeatherToggleItem();
      e.SetToggleClickCallback(() => {
        this.N8e(false, e);
      });
      e.SetCanExecuteChange(e => this.Lke(false, e));
      return e;
    };
    this.p5t = () => {
      if (this.udf < 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Weather", 90, "选择的天气非法或没有选择天气！");
        }
      } else {
        var e = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId();
        const i = ConfigManager_1.ConfigManager.AreaConfig.GetLevelOneAreaId(e);
        var e = ModelManager_1.ModelManager.WeatherModel.IsInValidArea(i);
        var t = ModelManager_1.ModelManager.WeatherModel.IsWeatherBanArea(this.udf, i);
        if (!e || t) {
          const r = ConfigManager_1.ConfigManager.WeatherModuleConfig.GetWeatherSwitchConfig(this.udf).MarkConfigId;
          if (ModelManager_1.ModelManager.MapModel.IsConfigMarkIdUnlock(r)) {
            (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(429)).FunctionMap.set(2, () => {
              ControllerHolder_1.ControllerHolder.WorldMapController.TryTeleport(r, () => {
                ModelManager_1.ModelManager.WeatherModel?.SetTargetWeatherSwitchConfigId(this.udf);
              });
            });
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
            return;
          } else {
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("WeatherControl_InvalidAreaTips");
            return;
          }
        }
        if (!ModelManager_1.ModelManager.WeatherModel.IsCurrentTimeInValidTime(this.udf) && ModelManager_1.ModelManager.WeatherModel.TimeSwitchConfirmNeedShow) {
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
    this.u6f = () => {
      ModelManager_1.ModelManager.WeatherModel?.RecordSwitchTime();
      var e = ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second;
      ControllerHolder_1.ControllerHolder.TimeOfDayController.AdjustTime(e, Protocol_1.Aki.Protocol.C4s.Proto_PlayerOperate);
    };
    this.c6f = () => {
      ControllerHolder_1.ControllerHolder.WeatherController.RequestSwitchWeather(this.udf);
    };
    this.Ga_ = e => {
      var t = this.cpu.GetLGUISpaceAbsolutePosition().Y;
      var i = this.cpu.Width / 2;
      const r = this.Mdf(this.pdf, t, i);
      this.pdf.forEach((e, t) => {
        t = r[t];
        e.SetPivot(new UE.Vector2D(MathUtils_1.MathUtils.Lerp(0.6, -0.35, t), 0.5));
      });
      const s = this.Mdf(this.vdf, t, i);
      this.vdf.forEach((e, t) => {
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
    this.gdf = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.ydf);
    this.Cdf = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(3), this.Sdf);
    e.push(this.Edf());
    await Promise.all(e);
  }
  OnStart() {
    this.Qyi?.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.GetScrollViewWithScrollbar(7)?.OnScrollValueChange.Bind(this.Ga_);
    this.A4c?.SetClickConfirmCallback(this.p5t);
    this.cpu = this.GetItem(5);
    this.pdf = this.gdf.GetLayoutItemList().map(e => e.GetRootItem());
    this.vdf = this.Cdf.GetLayoutItemList().map(e => e.GetRootItem());
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
    this.FQf(e);
    this.RId();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnWeatherCentralRedDotUpdate, this.RId);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnWeatherCentralRedDotUpdate, this.RId);
  }
  FQf(e) {
    var t;
    if (e % 2 == 0) {
      if (t = this.gdf.GetLayoutItemByIndex(e / 2)) {
        t.SetToggleStateForce(true, true, true);
      }
    } else if (t = this.Cdf.GetLayoutItemByIndex((e - 1) / 2)) {
      t.SetToggleStateForce(true, true, true);
    }
  }
  async Edf() {
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
      await Promise.all([this.gdf?.RefreshByDataAsync(r, true), this.Cdf?.RefreshByDataAsync(s, true)]);
    }
  }
  pgm(e) {
    UiManager_1.UiManager.ResetToBattleView();
    ControllerHolder_1.ControllerHolder.AutoPilotController.ExitAutoPilot("WeatherSwitch");
    var t = ModelManager_1.ModelManager.WeatherModel.GetAccelerateWeatherTime(this.udf);
    if (t <= 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Weather", 90, "无需时间加速");
      }
      this.u6f();
      ModelManager_1.ModelManager.WeatherModel.ObservatoryModule.PlayWeatherControlSequence(this.c6f);
    } else {
      ModelManager_1.ModelManager.WeatherModel.ObservatoryModule.AccelerateTime(e, t, this.c6f, this.u6f);
    }
  }
  N8e(e, t) {
    (e ? (this.Cdf?.DeselectCurrentGridProxy(), this.gdf) : (this.gdf?.DeselectCurrentGridProxy(), this.Cdf))?.SelectGridProxy(t.GridIndex);
    this.A4c?.RefreshByConfigId(t.ConfigId);
    this.udf = t.ConfigId;
    if (ModelManager_1.ModelManager.WeatherModel.IsWeatherSwitchConfigUnlocked(t.ConfigId)) {
      ModelManager_1.ModelManager.WeatherModel.RecordWeatherClicked(t.ConfigId);
    }
  }
  Lke(e, t) {
    if (e) {
      return this.gdf?.GetSelectedGridIndex() !== t;
    } else {
      return this.Cdf?.GetSelectedGridIndex() !== t;
    }
  }
  Mdf(e, t, i) {
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
      for (const i of this.gdf.GetLayoutItemList()) {
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
    this.Idf = false;
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
    this.GetExtendToggle(0)?.CanExecuteChange.Bind(() => !this.Idf && (!this.Lke || this.Lke(this.GridIndex)));
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
    this.Idf = e.ConfigId === undefined;
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