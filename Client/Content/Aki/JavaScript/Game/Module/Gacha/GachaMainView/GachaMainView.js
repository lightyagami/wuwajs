"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GachaMainView = undefined;
const UE = require("ue");
const LanguageSystem_1 = require("../../../../Core/Common/LanguageSystem");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const Queue_1 = require("../../../../Core/Container/Queue");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiLayer_1 = require("../../../Ui/UiLayer");
const UiManager_1 = require("../../../Ui/UiManager");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const CommonTextItem_1 = require("../../Common/Button/CommonTextItem");
const ConfirmBoxController_1 = require("../../ConfirmBox/ConfirmBoxController");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const CdnServerDebugConfig_1 = require("../../Debug/CdnServerDebugConfig");
const CommonExchangeData_1 = require("../../ItemExchange/View/CommonExchangeData");
const LogReportDefine_1 = require("../../LogReport/LogReportDefine");
const RoleController_1 = require("../../RoleUi/RoleController");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const WeaponTrialData_1 = require("../../Weapon/Data/WeaponTrialData");
const GachaController_1 = require("../GachaController");
const GachaDefine_1 = require("../GachaDefine");
const CommonRoleGachaPoolItem_1 = require("./CommonRoleGachaPoolItem");
const GachaButton_1 = require("./GachaButton");
const GachaSmallItemGrid_1 = require("./GachaSmallItemGrid");
const GachaTagItem_1 = require("./GachaTagItem");
const SpineRoleGachaPoolItem_1 = require("./SpineRoleGachaPoolItem");
const UpRoleGachaPoolItem_1 = require("./UpRoleGachaPoolItem");
const UpWeaponGachaPoolItem_1 = require("./UpWeaponGachaPoolItem");
class OperationParam {
  constructor(e, i) {
    this.OperationType = e;
    this.Param = i;
  }
}
class GachaMainView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.ljt = new Map();
    this.Lwl = new Map();
    this._jt = undefined;
    this.ujt = undefined;
    this.cjt = undefined;
    this.mjt = undefined;
    this.lqe = undefined;
    this.djt = undefined;
    this.Cjt = undefined;
    this.KOm = undefined;
    this.gjt = undefined;
    this.Dvt = false;
    this._Ma = 0;
    this.TDe = undefined;
    this.fjt = new Queue_1.Queue();
    this.pjt = false;
    this.E5e = e => {
      if (e === "ListAni") {
        this.GetUiInturnAnimController(30).Play();
      }
    };
    this._Mo = () => {
      var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(68);
      e.FunctionMap.set(0, () => {
        GachaController_1.GachaController.GachaInfoRequest(false);
      });
      ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(e);
    };
    this.dpt = () => {
      var e;
      if (this.vjt) {
        if (this.vjt.UsePoolId === 0) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("SelfGacha_NoDetail_Tips");
        } else {
          UiManager_1.UiManager.OpenView("GachaPoolDetailView", this.vjt.GetPoolInfo(this.vjt.UsePoolId));
          (e = new LogReportDefine_1.OnClickGachaOperationLogEvent()).i_gacha_id = this.vjt.Id;
          e.i_operation_type = 3;
          ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Gacha", 34, "OnHelpBtnClick CurGachaInfo is null");
      }
    };
    this.Sjt = () => {
      ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopViewWithTab(4, 1);
      var e = new LogReportDefine_1.OnClickGachaOperationLogEvent();
      e.i_gacha_id = this.vjt.Id;
      e.i_operation_type = 1;
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e);
    };
    this.yjt = () => {
      var e;
      var i;
      var t;
      var a = new LogReportDefine_1.GachaRecordClickLogEvent();
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(a);
      var a = this.vjt;
      if (a) {
        a = this.vjt.GroupId;
        e = ModelManager_1.ModelManager.GachaModel.GetGachaRecordUrlPrefix();
        i = ModelManager_1.ModelManager.GachaModel.GetServerArea();
        t = ModelManager_1.ModelManager.KuroSdkModel.GetPlatformStr();
        a = `{0}/aki/gacha/index.html#/record?svr_id={1}&player_id=${ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString()}&lang=${LanguageSystem_1.LanguageSystem.PackageLanguage}&gacha_id=${this.vjt?.Id}&gacha_type=${a.toString()}&svr_area=${i}&record_id=${ModelManager_1.ModelManager.GachaModel.RecordId}&resources_id=${this.vjt?.ResourcesId}&platform=${t}`;
        i = CdnServerDebugConfig_1.CdnServerDebugConfig.Singleton.TryGetGachaRecordDebugUrl(a, e, ModelManager_1.ModelManager.LoginModel.GetServerId());
        if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
          ControllerHolder_1.ControllerHolder.KuroSdkController.OpenWebView("", i, true, true);
        } else {
          ModelManager_1.ModelManager.MailModel.OpenWebBrowser(i);
        }
        (t = new LogReportDefine_1.OnClickGachaOperationLogEvent()).i_gacha_id = this.vjt.Id;
        t.i_operation_type = 4;
        ControllerHolder_1.ControllerHolder.LogReportController.LogReport(t);
      }
    };
    this.B6e = () => {
      this.CloseMe();
    };
    this.Ijt = () => {
      var e = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewInfo(this.Ejt);
      if (e) {
        var e = e.Type;
        var i = this.Mjt.PreviewIdList;
        switch (e) {
          case 1:
          case 2:
          case 7:
          case 4:
          case 6:
          case 9:
            var t = [];
            for (const h of i) {
              var a = ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(h);
              t.push(a.TrialId);
            }
            RoleController_1.RoleController.OpenRoleMainView(1, 0, t);
            break;
          case 5:
          case 3:
          case 8:
          case 10:
            var r = [];
            for (const _ of i) {
              var o = ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(_);
              var s = new WeaponTrialData_1.WeaponTrialData();
              s.SetTrialId(o.TrialId);
              r.push(s);
            }
            var n = {
              WeaponDataList: r,
              SelectedIndex: 0
            };
            UiManager_1.UiManager.OpenView("WeaponPreviewView", n);
        }
        e = new LogReportDefine_1.OnClickGachaOperationLogEvent();
        e.i_gacha_id = this.vjt.Id;
        e.i_operation_type = 2;
        ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e);
      }
    };
    this.Tjt = () => {
      var e = this.vjt;
      if (e) {
        GachaController_1.GachaController.OpenGachaSelectionView(e);
        this.fjm();
      }
    };
    this.RefreshLeftTime = () => {
      var e = this.vjt;
      if (e && (e = e.GetPoolEndTimeByPoolInfo(this.Mjt)) !== 0) {
        if ((e = e - TimeUtil_1.TimeUtil.GetServerTime()) <= 0) {
          GachaController_1.GachaController.GachaInfoRequest(false);
        } else {
          e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(e);
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), "Text_GachaRemainingTime_Text", e.CountDownText);
          if ((e = e.RemainingTime) > 0) {
            e = e;
            this.TDe = TimerSystem_1.RealTimeTimerSystem.Delay(this.RefreshLeftTime, e * 1000, undefined, "GachaMainView.RefreshLeftTime", false);
          }
        }
      }
    };
    this.zHt = () => {
      this.Ljt();
    };
    this.Djt = () => {
      var e;
      if (this.Rjt) {
        e = new OperationParam(1);
        this.fjt.Push(e);
      } else {
        this.Ujt();
        this.Ajt().finally(() => {
          this.Jft();
        });
      }
    };
    this.Pjt = () => {
      var e;
      var i;
      var t;
      var a;
      var r = this._jt.GetGenericLayout().GetSelectedGridIndex();
      if (!!this.ujt && !(r < 0) && !(r >= this.ujt.length)) {
        e = this.ujt[r];
        i = this._jt?.GetScrollItemByIndex(r);
        if (e && i && (t = (a = e.GachaInfo).UsePoolId, a = a.GetPoolInfo(t))) {
          e.PoolInfo = a;
          i.Refresh(e, true, r);
          this.Djt();
          this.xjt();
        }
      }
    };
    this.wjt = () => {
      var e = new GachaTagItem_1.GachaTagItem();
      e.SelectCallback = this.Bjt;
      e.CanExecuteChange = this.Bpt;
      return e;
    };
    this.bjt = () => {
      return new CommonTextItem_1.CommonTextItem();
    };
    this.qjt = () => {
      return new GachaSmallItemGrid_1.GachaSmallItemGrid();
    };
    this.Bjt = e => {
      var i;
      if (this.Rjt) {
        i = new OperationParam(2, e);
        this.fjt.Push(i);
      } else {
        this.Ujt();
        this.Gjt(e).finally(() => {
          this.Jft();
        });
      }
    };
    this.Gjt = async e => {
      var i = this._jt.GetGenericLayout().GetSelectedGridIndex();
      this._jt.GetGenericLayout().SelectGridProxy(e);
      var t = ModelManager_1.ModelManager.GachaModel.RecordGachaInfo(this.vjt);
      if (t) {
        this._jt.GetScrollItemByIndex(e)?.RefreshRedDot();
      }
      await this.Ajt();
      if (i >= 0) {
        this.xjt();
      }
    };
    this.Bpt = e => e !== this._jt?.GetGenericLayout()?.GetSelectedGridIndex();
    this.Njt = () => {
      var e = this.vjt?.ItemId;
      if (!!e && !(e <= 0) && !!(e = ConfigManager_1.ConfigManager.GachaConfig.GetShopIdByGachaItemId(e)) && !(e <= 0)) {
        ControllerHolder_1.ControllerHolder.PayShopController.OpenExchangePopView(e);
      }
    };
    this.ffd = () => {
      ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopViewToRecharge();
    };
    this.Ojt = () => {
      var e = ConfigManager_1.ConfigManager.GachaConfig.SecondCurrency();
      const r = new CommonExchangeData_1.CommonExchangeData();
      r.InitByItemId(e);
      r.ConfirmNoClose = true;
      r.ConfirmCallBack = (e, i) => {
        var t;
        var a = ModelManager_1.ModelManager.ItemExchangeModel.CalculateConsume(e, 0, i);
        if (a && i) {
          t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(r.GetSrcItemId());
          if ((a = a.ConsumeCount - t) <= 0) {
            ControllerHolder_1.ControllerHolder.ItemExchangeController.ItemExchangeRequest(e, i);
            UiManager_1.UiManager.CloseView("CommonExchangeView");
          } else {
            (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(60)).SetTextArgs(a.toString(), r.GetSrcName());
            t.FunctionMap.set(2, () => {
              UiManager_1.UiManager.CloseView("CommonExchangeView");
              ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopViewToRecharge();
            });
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
          }
        } else {
          UiManager_1.UiManager.CloseView("CommonExchangeView");
        }
      };
      ControllerHolder_1.ControllerHolder.ItemExchangeController.OpenExchangeViewByData(r);
    };
  }
  static async kjt(e, i) {
    let t = undefined;
    switch (i) {
      case 1:
        await (t = new CommonRoleGachaPoolItem_1.CommonRoleGachaPoolItem(i)).CreateThenShowByResourceIdAsync("UiItem_NewPlayerGachaPool", e);
        break;
      case 4:
        await (t = new CommonRoleGachaPoolItem_1.CommonRoleGachaPoolItem(i)).CreateThenShowByResourceIdAsync("UiItem_BaseGachaPool", e);
        break;
      case 2:
      case 7:
      case 9:
        await (t = new UpRoleGachaPoolItem_1.UpRoleGachaPoolItem(i)).CreateThenShowByResourceIdAsync("UiItem_RoleUpGachaPool", e);
        break;
      case 5:
      case 3:
      case 8:
      case 10:
        await (t = new UpWeaponGachaPoolItem_1.UpWeaponGachaPoolItem(i)).CreateThenShowByResourceIdAsync("UiItem_WeaponGachaPool", e);
        break;
      case 6:
        await (t = new UpRoleGachaPoolItem_1.UpRoleGachaPoolItem(i)).CreateThenShowByResourceIdAsync("UiItem_LuckdrawPixF", e);
    }
    return t;
  }
  static async Uwl(e, i, t) {
    t = new SpineRoleGachaPoolItem_1.SpineRoleGachaPoolItem(t);
    await t.CreateThenShowByResourceIdAsync(i, e);
    return t;
  }
  get vjt() {
    return this.Fjt.GachaInfo;
  }
  get Ejt() {
    return this.Fjt.PoolInfo.Id;
  }
  get Mjt() {
    return this.Fjt.PoolInfo;
  }
  get Fjt() {
    var e = this._jt.GetGenericLayout().GetSelectedGridIndex();
    if (!!this.ujt && !(e < 0) && !(e >= this.ujt.length)) {
      return this.ujt[e];
    }
  }
  get Rjt() {
    return this.pjt;
  }
  Ujt() {
    this.pjt = true;
  }
  Jft() {
    this.pjt = false;
    if (this.fjt.Size !== 0) {
      var e = this.fjt.Pop();
      if (e) {
        switch (e.OperationType) {
          case 0:
            this.Ljt();
            break;
          case 1:
            this.Djt();
            break;
          case 2:
            this.Bjt(e?.Param);
        }
      }
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ItemExChangeResponse, this.Djt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshGachaMainView, this.zHt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GachaPoolSelectResponse, this.Pjt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CrossDay, this._Mo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GachaNewNotify, this._Mo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlaySequenceEventByStringParam, this.E5e);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ItemExChangeResponse, this.Djt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshGachaMainView, this.zHt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GachaPoolSelectResponse, this.Pjt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CrossDay, this._Mo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GachaNewNotify, this._Mo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlaySequenceEventByStringParam, this.E5e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIScrollViewWithScrollbarComponent], [9, UE.UIText], [10, UE.UIText], [11, UE.UIItem], [12, UE.UIText], [13, UE.UIText], [14, UE.UIVerticalLayout], [15, UE.UIItem], [16, UE.UIText], [17, UE.UIHorizontalLayout], [18, UE.UIButtonComponent], [19, UE.UITexture], [20, UE.UITexture], [21, UE.UITexture], [22, UE.UIItem], [23, UE.UIItem], [24, UE.UIText], [25, UE.UIItem], [26, UE.UIText], [27, UE.UIText], [28, UE.UIText], [29, UE.UIScrollViewWithScrollbarComponent], [30, UE.UIInturnAnimController]];
    this.BtnBindInfo = [[3, this.dpt], [1, this.Sjt], [4, this.yjt], [2, this.Ijt], [18, this.Tjt]];
  }
  async OnBeforeStartAsync() {
    this.Dvt = true;
    this.mjt = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(17), this.qjt);
    this.djt = new GachaButton_1.GachaButton(GachaDefine_1.GACHA_ONE);
    this.Cjt = new GachaButton_1.GachaButton(GachaDefine_1.GACHA_TEN);
    await Promise.all([this.djt.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()), this.Cjt.CreateThenShowByActorAsync(this.GetItem(6).GetOwner())]);
    this.KOm = new ButtonItem_1.ButtonItem(this.GetItem(23));
    this.KOm.SetFunction(this.Tjt);
    this.cjt = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(14), this.bjt);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.B6e);
    this._jt = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(8), this.wjt);
    await this.Vjt();
    this._Ma = Time_1.Time.ServerTimeStamp;
  }
  OnBeforeShow() {
    var e;
    if (!this.Dvt) {
      GachaController_1.GachaController.GachaInfoRequest(false);
    }
    this.Dvt = false;
    if (ModelManager_1.ModelManager.GachaModel?.IsCacheShowNewNotify) {
      ModelManager_1.ModelManager.GachaModel.IsCacheShowNewNotify = false;
      e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(68);
      ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(e);
    }
    this.gjt?.PlayStartSeq();
  }
  OnTick(e) {
    if (Time_1.Time.ServerTimeStamp - this._Ma >= CommonDefine_1.SECOND_PER_MINUTE * 5 * CommonDefine_1.MILLIONSECOND_PER_SECOND) {
      this._Ma = Time_1.Time.ServerTimeStamp;
      GachaController_1.GachaController.GachaInfoRequest(false);
    }
  }
  async Ajt() {
    UiLayer_1.UiLayer.SetShowMaskLayer("GachaMainViewRefresh", true);
    await this.ITt();
    var e = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewInfo(this.Ejt);
    if (StringUtils_1.StringUtils.IsBlank(e.SpinePrefabResource)) {
      await this.Hjt();
    } else {
      await this.Awl(e.SpinePrefabResource);
    }
    this.jjt();
    this.Wjt();
    this.Kjt();
    UiLayer_1.UiLayer.SetShowMaskLayer("GachaMainViewRefresh", false);
  }
  async ITt() {
    var e;
    if (this.vjt && (await this.lqe.SetCurrencyItemList([ConfigManager_1.ConfigManager.GachaConfig.PrimaryCurrency(), ConfigManager_1.ConfigManager.GachaConfig.SecondCurrency(), this.vjt.ItemId]), e = this.lqe.GetCurrencyItemList())) {
      e[0]?.SetButtonFunction(this.ffd);
      e[1]?.SetButtonFunction(this.Ojt);
      (e = e[2]).SetButtonFunction(this.Njt);
      e.SetButtonActive(true);
    }
  }
  jjt() {
    if (this.Fjt) {
      let e = false;
      for (const r of this.vjt.GachaConsumes) {
        if (r.$Us === this.djt.Times) {
          this.djt.Refresh(this.Fjt, r.HUs);
          e = true;
          break;
        }
      }
      let i = false;
      for (const o of this.vjt.GachaConsumes) {
        if (o.$Us === this.Cjt.Times) {
          this.Cjt.Refresh(this.Fjt, o.HUs);
          i = true;
          break;
        }
      }
      this.djt.GetRootItem().SetUIActive(e && this.vjt.UsePoolId !== 0);
      this.Cjt.GetRootItem().SetUIActive(i && this.vjt.UsePoolId !== 0);
      var t = this.vjt?.UsePoolId === 0;
      this.KOm?.SetActive(t);
      var a = this.Mjt?.UiType === 5;
      var a = (a && !LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FirstOpenCommonWeaponSelect, false)) ?? false;
      this.KOm?.SetRedDotVisible(t && a);
      var t = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewInfo(this.Ejt);
      if (t && (a = t.Type) && (t = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewTypeConfig(a))) {
        a = t.GachaButtonTip;
        t = StringUtils_1.StringUtils.IsBlank(a);
        this.GetText(24).SetUIActive(!t);
        if (!t) {
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(24), a);
        }
      }
    }
  }
  Kjt() {
    var e;
    var i = [];
    var t = ModelManager_1.ModelManager.GachaModel.TodayResultCount;
    if (t >= 0) {
      e = CommonParamById_1.configCommonParamById.GetIntConfig("gacha_daily_total_limit_times");
      t = new LguiUtil_1.TableTextArgNew(GachaDefine_1.TOTAL_REST_COUNT, t, e);
      i.push(t);
    }
    if (this.vjt.DailyLimitTimes > 0) {
      e = this.vjt.DailyLimitTimes;
      t = this.vjt.TodayTimes;
      t = new LguiUtil_1.TableTextArgNew(GachaDefine_1.POOL_TODAY_REST_COUNT, e - t, e);
      i.push(t);
    }
    if (this.vjt.TotalLimitTimes > 0) {
      e = this.vjt.TotalLimitTimes;
      t = this.vjt.TotalTimes;
      t = new LguiUtil_1.TableTextArgNew(GachaDefine_1.POOL_TOTAL_REST_COUNT, e - t, e);
      i.push(t);
    }
    this.cjt.RefreshByData(i);
  }
  fjm() {
    var e;
    if (this.Mjt?.UiType === 5 && !(LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FirstOpenCommonWeaponSelect, false) ?? false) && (LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FirstOpenCommonWeaponSelect, true), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnOpenCommonWeaponSelect), this.jjt(), e = this._jt.GetGenericLayout().GetSelectedGridIndex(), e = this._jt?.GetScrollItemByIndex(e))) {
      e.RefreshRedDot();
    }
  }
  async Hjt() {
    var e = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewType(this.Ejt);
    let i = this.ljt.get(e);
    if (!i) {
      if (!(i = await GachaMainView.kjt(this.GetItem(7), e))) {
        return;
      }
      this.ljt.set(e, i);
    }
    if (this.gjt !== i) {
      this.gjt?.SetActive(false);
      (this.gjt = i).SetActive(true);
    }
    i.Update(this.Fjt);
  }
  async Awl(e) {
    var i = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewType(this.Ejt);
    let t = this.Lwl.get(this.Ejt);
    if (!t) {
      if (!(t = await GachaMainView.Uwl(this.GetItem(7), e, i))) {
        return;
      }
      this.Lwl.set(this.Ejt, t);
    }
    if (this.gjt !== t) {
      this.gjt?.SetActive(false);
      (this.gjt = t).SetActive(true);
    }
    t.Update(this.Fjt);
  }
  xjt() {
    this.gjt?.SetActive(true);
    if (this.UiViewSequence.HasSequenceNameInPlaying("Switch")) {
      this.UiViewSequence.ReplaySequence("Switch");
    } else {
      this.UiViewSequence.PlaySequence("Switch");
    }
    this.gjt?.PlaySwitchSeq();
  }
  Wjt() {
    var e;
    var i;
    var t;
    var a = this.vjt;
    if (a && this.Mjt && (e = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewInfo(this.Ejt)) && (i = this.Mjt.UiType) && (t = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewTypeConfig(i))) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), t.TypeText);
      t = a.GetPoolEndTimeByPoolInfo(this.Mjt);
      this.GetItem(11).SetUIActive(t > 0);
      if (t > 0) {
        this.RefreshLeftTime();
      } else if (this.TDe) {
        TimerSystem_1.RealTimeTimerSystem.Remove(this.TDe);
        this.TDe = undefined;
      }
      t = this.Mjt.UpList;
      i = ModelManager_1.ModelManager.GachaModel.IsRolePool(i);
      if (t && t.length > 0) {
        this.GetItem(15)?.SetUIActive(true);
        this.mjt?.RefreshByData(t);
        t = i ? "Text_GachaUpList1_Text" : "Text_GachaUpList2_Text";
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(16), t);
      } else {
        this.GetItem(15)?.SetUIActive(false);
      }
      if ((t = a.GetValidPoolList()) && t.length > 1 && a.UsePoolId !== 0) {
        this.GetButton(18)?.RootUIComp.SetUIActive(true);
      } else {
        this.GetButton(18)?.RootUIComp.SetUIActive(false);
      }
      this.SetTextureByPath(e.UnderBgTexturePath, this.GetTexture(19));
      t = UE.Color.FromHex(this.Mjt.ThemeColor);
      this.GetTexture(20)?.SetColor(t);
      (a = this.GetTexture(21)).SetUIActive(i);
      if (i) {
        a.SetColor(t);
      }
      this.GetText(10).SetText(this.Mjt.Title);
      this.GetText(13).SetText(this.Mjt.Description);
      this.GetText(28).SetText(this.Mjt.ComplianceDetail);
      this.GetText(28).SetUIActive(!StringUtils_1.StringUtils.IsEmpty(this.Mjt.ComplianceDetail));
      this.GetScrollViewWithScrollbar(29)?.SetScrollProgress(0);
    }
  }
  Ljt() {
    var e;
    if (this.Rjt) {
      e = new OperationParam(0);
      this.fjt.Push(e);
    } else {
      this.Ujt();
      this.Vjt().finally(() => {
        this.Jft();
      });
    }
  }
  async Vjt() {
    let e = 0;
    let i = 0;
    var t = this.Fjt;
    if (t) {
      i = t.GachaInfo.Id;
    } else if (this.Dvt) {
      i = this.OpenParam;
    }
    this.ujt = ModelManager_1.ModelManager.GachaModel.GetValidGachaList();
    if (this.ujt && this.ujt.length !== 0) {
      if ((t = this.ujt.findIndex(e => e.GachaInfo.Id === i)) >= 0 && t < this.ujt.length) {
        e = t;
      }
      await this._jt.RefreshByDataAsync(this.ujt);
      await this.Gjt(e);
    }
  }
  OnAfterHide() {
    if (this.TDe) {
      TimerSystem_1.RealTimeTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
  OnBeforeDestroy() {
    this.lqe?.Destroy();
  }
  SelectGachaTagById(i) {
    var e = this.ujt.findIndex(e => e.GachaInfo.Id === i);
    return e >= 0 && e < this.ujt.length && (this.Bjt(e), true);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var i = Number(e[0]);
    if (i !== 0) {
      var t = this.SelectGachaTagById(i);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Guide", 16, "抽卡聚焦引导", ["配置Id", i]);
      }
      if (t && this.djt) {
        return [i = this.djt.GetRootItem(), i];
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Guide", 53, "聚焦引导extraParam项配置有误", ["configParams", e]);
    }
  }
}
exports.GachaMainView = GachaMainView;
//# sourceMappingURL=GachaMainView.js.map