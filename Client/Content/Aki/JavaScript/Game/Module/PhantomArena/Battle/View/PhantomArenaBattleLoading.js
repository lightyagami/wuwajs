"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaBattleLoading = void 0;
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  WaitEntityTask_1 = require("../../../../World/Define/WaitEntityTask"),
  GameAudioController_1 = require("../../../Audio/GameAudioController"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  PhantomArenaCard_1 = require("../Card/PhantomArenaCard"),
  CARD_FRONT = 3,
  CARD_TOTAL = 6,
  PER_INTERVAL = 2;
class PhantomArenaBattleLoadingItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.CardItem = void 0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UISprite]
    ]
  }
  async OnBeforeStartAsync() {
    this.CardItem = new PhantomArenaCard_1.PhantomArenaCard, await this.CardItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())
  }
  Refresh(t, e, i) {
    var a;
    t.CardData ? (this.CardItem.SetUiActive(!0), this.GetSprite(1)?.SetUIActive(!1), this.CardItem.Refresh(t.CardData)) : (this.CardItem.SetUiActive(!1), this.GetSprite(1)?.SetUIActive(!0), t.IsMe ? (a = t.Index < CARD_FRONT ? "SP_LoadingMeFront" : "SP_LoadingMeBack", this.RefreshCardFaceByResource(a)) : (a = t.Index >= CARD_FRONT ? "SP_LoadingPlayerFront" : "SP_LoadingPlayerBack", this.RefreshCardFaceByResource(a)))
  }
  RefreshCardFaceByResource(t) {
    var e, t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    t && (e = this.GetSprite(1), this.SetSpriteByPath(t, e, !1))
  }
}
class PhantomArenaBattleLoading extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments), this.OpponentLayout = void 0, this.OwnLayout = void 0, this.IsLoadStart = !1, this.IsLoadEnd = !1, this.NotNeedEntity = !1, this.NotNeedTimeCount = 0, this.WaitTask = void 0, this.EntityTotal = 0, this.CurCount = 0, this.CountSpeed = 1, this.PD1 = () => new PhantomArenaBattleLoadingItem
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UILayoutBase],
      [1, UE.UIItem],
      [2, UE.UILayoutBase],
      [3, UE.UIItem],
      [4, UE.UISliderComponent],
      [5, UE.UISliderComponent],
      [6, UE.UIText]
    ]
  }
  OnBeforeShow() {
    GameAudioController_1.GameAudioController.UpdateLoadingType(1)
  }
  OnBeforeHide() {
    GameAudioController_1.GameAudioController.UpdateLoadingType(void 0)
  }
  OnAfterHide() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaBattleLoadingHide)
  }
  async xD1() {
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetCardDataList(),
      e = new Map;
    for (const r of t) e.set(this.jiu(r.Index), r);
    var i = [];
    for (let t = 0; t < CARD_TOTAL; t++) {
      var a = {
        Index: t,
        IsMe: !1
      };
      e.get(t) && (a.CardData = e.get(t)), i.push(a)
    }
    this.OpponentLayout = new GenericLayout_1.GenericLayout(this.GetLayoutBase(0), this.PD1, this.GetItem(1).GetOwner()), await this.OpponentLayout.RefreshByDataAsync(i)
  }
  jiu(t) {
    return t < CARD_FRONT ? CARD_FRONT + t : t - CARD_FRONT
  }
  async DD1() {
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleCardDataList(),
      e = new Map;
    for (const r of t) e.set(r.Index, r);
    var i = [];
    for (let t = 0; t < CARD_TOTAL; t++) {
      var a = {
        Index: t,
        IsMe: !0
      };
      e.get(t) && (a.CardData = e.get(t)), i.push(a)
    }
    this.OwnLayout = new GenericLayout_1.GenericLayout(this.GetLayoutBase(2), this.PD1, this.GetItem(3).GetOwner()), await this.OwnLayout.RefreshByDataAsync(i)
  }
  async OnBeforeStartAsync() {
    await ModelManager_1.ModelManager.PhantomArenaBattleModel.BattleData.PrepareLoadingPromise?.Promise, await Promise.all([this.xD1(), this.DD1()]), this.WaitEntityLoadFinish()
  }
  WaitEntityLoadFinish() {
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.BattleData.GetAllEntityIdList();
    0 === t.length ? this.NotNeedEntity = !0 : (this.NotNeedEntity = !1, this.EntityTotal = t.length, this.CurCount = 0, this.CountSpeed = PER_INTERVAL * this.EntityTotal, this.WaitTask = WaitEntityTask_1.WaitEntityTask.Create("PhantomArenaEntityNotify", t, () => {})), this.IsLoadStart = !0
  }
  OnTick(t) {
    if (this.IsLoadStart && !this.IsLoadEnd) {
      if (this.NotNeedEntity) return this.NotNeedTimeCount += t, 2 <= this.NotNeedTimeCount ? (this.NotNeedTimeCount = 2, this.SetLoadingValue(1), void this.OnLoadingEnd()) : void this.SetLoadingValue(this.NotNeedTimeCount / 2);
      var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.CurrentLoading,
        t = (this.CurCount < e && (t = t * this.CountSpeed / 1e3, this.CurCount = Math.min(this.CurCount + t, e), this.CurCount = Math.min(this.CurCount, this.EntityTotal)), this.CurCount / this.EntityTotal);
      this.SetLoadingValue(t), this.CurCount >= this.EntityTotal && this.OnLoadingEnd()
    }
  }
  SetLoadingValue(t) {
    this.GetSlider(4)?.SetValue(t), this.GetSlider(5)?.SetValue(t), this.GetText(6)?.SetText(Math.floor(100 * t) + "%")
  }
  OnLoadingEnd() {
    this.IsLoadEnd = !0, UiManager_1.UiManager.OpenView("PhantomArenaBattleVsView", void 0, () => {
      ModelManager_1.ModelManager.PhantomArenaBattleModel.IsBattleLoading = !1, ModelManager_1.ModelManager.PhantomArenaBattleModel.CurrentLoading = 0, UiManager_1.UiManager.CloseView("PhantomArenaBattleLoading")
    })
  }
}
exports.PhantomArenaBattleLoading = PhantomArenaBattleLoading;
//# sourceMappingURL=PhantomArenaBattleLoading.js.map