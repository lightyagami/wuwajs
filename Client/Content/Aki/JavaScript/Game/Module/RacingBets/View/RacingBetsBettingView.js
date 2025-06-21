"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RacingBetsBettingView = void 0;
const UE = require("ue"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../../Core/Common/Log"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  CommonCurrencyItem_1 = require("../../Common/CommonCurrencyItem"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  DangoManager_1 = require("../../Dango/DangoLogic/DangoManager"),
  UiCameraAnimationController_1 = require("../../UiCameraAnimation/UiCameraAnimationController"),
  UiCameraAnimationManager_1 = require("../../UiCameraAnimation/UiCameraAnimationManager"),
  UiModelUtil_1 = require("../../UiModel/UiModelUtil"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  RacingBetsController_1 = require("../RacingBetsController"),
  RacingBetsCostItem_1 = require("./Item/RacingBetsCostItem"),
  RacingBetsDangoOddsItem_1 = require("./Item/RacingBetsDangoOddsItem"),
  RacingBetsGearItem_1 = require("./Item/RacingBetsGearItem");
class RacingBetsBettingView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments), this.wv1 = !0, this.$xc = void 0, this.Wxc = void 0, this.Qxc = void 0, this.Kxc = void 0, this.Bxc = [], this.Xxc = [], this.Yxc = [], this.zxc = void 0, this.Jxc = void 0, this.Zxc = void 0, this.eDc = void 0, this.A3o = void 0, this.tDc = void 0, this.iDc = void 0, this.rDc = () => {
      var i = new RacingBetsGearItem_1.RacingBetsGearItem;
      return i.BindClickGearItemCallBack(this.oDc), i
    }, this.nDc = () => {
      var i = new RacingBetsDangoOddsItem_1.RacingBetsDangoOddsItem;
      return i.BindClickGearItemCallBack(this.sDc), i
    }, this.oDc = t => {
      this.Wxc = t;
      var i = this.Yxc.findIndex(i => t === i);
      this.tDc.SelectGridProxy(i), this.aDc(this.Kxc, this.$xc, this.Wxc)
    }, this.sDc = i => {
      this.$xc = i;
      var t = this.Bxc.findIndex(i => i === this.$xc);
      this.iDc.SelectGridProxy(t), this.Hqe(this.Kxc, i, this.Wxc), this.hDc(this.Xxc[t]), UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(this.$xc.DangoCamera)
    }, this.lyt = () => {
      this.CloseMe()
    }, this.lDc = () => {
      var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(297);
      i.FunctionMap.set(2, () => {
        var i = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData(),
          t = i.GetBetCostCount(this.Wxc);
        RacingBetsController_1.RacingBetsController.RacingBetsGearRequest(i.Id, this.Kxc, this.$xc.DangoId, this.Wxc.Id, t)
      }), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i)
    }, this._Dc = () => {
      var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(298);
      i.FunctionMap.set(2, () => {
        var i = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
        RacingBetsController_1.RacingBetsController.RacingBetsGearRefundRequest(i.Id, this.Kxc, this.Kxc.BetDangoId)
      }), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i)
    }, this.cDc = () => {
      this.Hqe(this.Kxc, this.$xc, this.Wxc)
    }, this.zy1 = (i, t) => {
      this.Hqe(this.Kxc, this.$xc, this.Wxc);
      var e = DangoManager_1.DangoManager.GetDangoData(this.$xc.DangoId);
      t ? (this.Qxc?.SetState(1, 1), AudioSystem_1.AudioSystem.PostEvent(e.DangoConfig.CheerAudio)) : i === this.$xc.DangoId && (this.Qxc?.SetState(1, 4), AudioSystem_1.AudioSystem.PostEvent(e.DangoConfig.DeathAudio))
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIHorizontalLayout],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIButtonComponent],
      [8, UE.UIHorizontalLayout],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIButtonComponent],
      [12, UE.UITexture],
      [13, UE.UIText],
      [14, UE.UIItem],
      [15, UE.UIItem],
      [16, UE.UIItem],
      [17, UE.UIText],
      [18, UE.UIButtonComponent],
      [19, UE.UIText],
      [20, UE.UIText],
      [21, UE.UIText],
      [22, UE.UIText],
      [23, UE.UIText],
      [24, UE.UIText],
      [25, UE.UIItem]
    ], this.BtnBindInfo = [
      [7, this.lyt],
      [11, this.lDc],
      [18, this._Dc]
    ]
  }
  async OnBeforeStartAsync() {
    const t = this.OpenParam;
    var i;
    t ? (this.Kxc = t.LegMatchData, this.Bxc = this.Kxc.GetDangoActorDataList(), i = this.Bxc.findIndex(i => t.SelectDangoId === i.DangoId), this.$xc = this.Bxc[i], this.Xxc = t.DangoActorList, await this.eQt()) : Log_1.Log.CheckError() && Log_1.Log.Error("RacingBets", 58, "RacingBetsBettingView Invalid Param")
  }
  async eQt() {
    this.zxc = new RacingBetsCostItem_1.RacingBetsCostItem, await this.zxc.CreateThenShowByActorAsync(this.GetItem(9).GetOwner()), this.Jxc = new RacingBetsCostItem_1.RacingBetsCostItem, await this.Jxc.CreateThenShowByActorAsync(this.GetItem(10).GetOwner()), this.Zxc = new RacingBetsCostItem_1.RacingBetsCostItem, await this.Zxc.CreateThenShowByActorAsync(this.GetItem(14).GetOwner()), this.eDc = new RacingBetsCostItem_1.RacingBetsCostItem, await this.eDc.CreateThenShowByActorAsync(this.GetItem(15).GetOwner()), this.A3o = new CommonCurrencyItem_1.CommonCurrencyItem, await this.A3o.CreateThenShowByActorAsync(this.GetItem(6).GetOwner()), this.tDc = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(8), this.rDc), this.Yxc = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsGearList(), await this.tDc.RefreshByDataAsync(this.Yxc), this.Wxc = this.Yxc[0], this.tDc.SelectGridProxy(0), this.iDc = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.nDc), await this.iDc.RefreshByDataAsync(this.Bxc)
  }
  PushCameraHandle(i, t, e) {
    UiCameraAnimationController_1.UiCameraAnimationController.PushCameraHandle(this.$xc.DangoCamera, t, e)
  }
  OnBeforeShow() {
    var i = this.Bxc.findIndex(i => i === this.$xc),
      i = (this.iDc.SelectGridProxy(i), this.Qxc = this.Xxc[i], this.uDc(this.Xxc, i, !0), this.Hqe(this.Kxc, this.$xc, this.Wxc), this.tBa(), ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData());
    RacingBetsController_1.RacingBetsController.TryRegisterNextDangoOddsUpdateRequest(i), RacingBetsController_1.RacingBetsController.RacingBetsUpdateOddsRequest()
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRacingBetsPlayerInfoUpdate, this.cDc), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRacingBetsBettingInfoUpdate, this.zy1)
  }
  OnTick(i) {
    this.wv1 && (1 === this.Kxc.GetLegMatchState() ? (this.dn1(this.Kxc), this.RR1()) : (this.wv1 = !1, this.Av1()))
  }
  Hqe(i, t, e) {
    i.HasBetting ? (this.GetItem(5).SetUIActive(!0), this.GetItem(4).SetUIActive(!1), this.dDc(i, t)) : (this.GetItem(5).SetUIActive(!1), this.GetItem(4).SetUIActive(!0), this.aDc(i, t, e));
    e = DangoManager_1.DangoManager.GetDangoData(t.DangoId), this.GetText(0).ShowTextNew(e.NameKey), this.GetText(1).ShowTextNew(e.GetSkillConfig()?.Desc ?? StringUtils_1.EMPTY_STRING), this.GetText(3).ShowTextNew(i.Name), this.GetItem(16).SetUIActive(!1), this.dn1(i), t = this.iDc.GetLayoutItemList();
    for (const s of t) s.RefreshOddsDango(i.BetDangoId);
    this.GetText(22).ShowTextNew("Dango_MainPage_StatusTime_Bet"), this.RR1()
  }
  aDc(i, t, e) {
    var s = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData(),
      r = s.GetCurrencyItemId(),
      s = s.GetBetCostCount(e),
      e = (this.zxc.RefreshUi(r, s), Math.ceil(s * t.Odds / 100));
    this.Jxc.RefreshUi(r, e), this.GetText(24).SetText("×" + t.Odds / 100)
  }
  dDc(i, t) {
    var e = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData().GetCurrencyItemId(),
      s = DangoManager_1.DangoManager.GetDangoData(i.BetDangoId);
    this.SetTextureShowUntilLoaded(s.Icon, this.GetTexture(12)), this.GetText(13).ShowTextNew(s.NameKey), this.Zxc.RefreshUi(e, i.BetGearCash), this.eDc.RefreshUi(e, i.GetOddsRewardCount()), this.GetText(17).SetText(i.LeaveCancelNum.toString()), this.GetButton(18).RootUIComp.SetUIActive(0 < i.LeaveCancelNum), this.GetText(23).SetText("×" + i.Odds / 100)
  }
  dn1(i) {
    i.IsFinalOddsRefresh ? this.GetItem(25).SetUIActive(!1) : (this.GetItem(25).SetUIActive(!0), this.GetText(19).ShowTextNew("Dango_BetPage_Function_NextBetRate"), i = TimeUtil_1.TimeUtil.DateFormat7String(this.Kxc.NextOddsRateRefreshTime), this.GetText(20).SetText(i))
  }
  RR1() {
    var i = TimeUtil_1.TimeUtil.GetServerTime();
    (i = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(this.Kxc.BetsEndTime * TimeUtil_1.TimeUtil.Millisecond - i)) && i.CountDownText && this.GetText(21).SetText(i.CountDownText)
  }
  tBa() {
    var i = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
    this.A3o.RefreshTemp(i.GetCurrencyItemId(), i.GetCurrencyCount().toString()), this.A3o.SetButtonActive(!1)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRacingBetsPlayerInfoUpdate, this.cDc), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRacingBetsBettingInfoUpdate, this.zy1)
  }
  OnBeforeHide() {
    var i = this.Bxc.findIndex(i => i === this.$xc);
    this.uDc(this.Xxc, i, !1)
  }
  PopCameraHandle(i, t, e, s) {
    UiCameraAnimationController_1.UiCameraAnimationController.PopCameraHandle(this.$xc.DangoCamera, t, e, s)
  }
  hDc(i) {
    if (this.Qxc !== i) {
      if (this.Qxc) {
        const t = this.Qxc;
        UiModelUtil_1.UiModelUtil.DangoFadeIn(this.Qxc, "RoleFadeInCurve", () => {
          UiModelUtil_1.UiModelUtil.SetVisible(t.Model, !1)
        })
      }
      this.Qxc = i, UiModelUtil_1.UiModelUtil.SetVisible(this.Qxc.Model, !0), UiModelUtil_1.UiModelUtil.DangoFadeOut(this.Qxc)
    }
  }
  uDc(t, e, s) {
    for (let i = 0; i < t.length; i++) i !== e && (s ? UiModelUtil_1.UiModelUtil.DangoFadeIn(t[i], "RoleFadeInCurve", () => {
      UiModelUtil_1.UiModelUtil.SetVisible(t[i].Model, !1)
    }) : (UiModelUtil_1.UiModelUtil.SetVisible(t[i].Model, !0), UiModelUtil_1.UiModelUtil.DangoFadeOut(t[i])))
  }
  Av1() {
    var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(299);
    i.FunctionMap.set(2, () => {
      this.CloseMe()
    }), i.FunctionMap.set(1, () => {
      this.CloseMe()
    }), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i)
  }
}
exports.RacingBetsBettingView = RacingBetsBettingView;
//# sourceMappingURL=RacingBetsBettingView.js.map