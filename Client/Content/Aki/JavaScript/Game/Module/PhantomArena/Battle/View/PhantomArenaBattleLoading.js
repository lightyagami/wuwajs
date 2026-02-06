"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleLoading = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const WaitEntityTask_1 = require("../../../../World/Define/WaitEntityTask");
const GameAudioController_1 = require("../../../Audio/GameAudioController");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const PhantomArenaCard_1 = require("../Card/PhantomArenaCard");
const CARD_FRONT = 3;
const CARD_TOTAL = 6;
const PER_INTERVAL = 2;
class PhantomArenaBattleLoadingItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.CardItem = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite]];
  }
  async OnBeforeStartAsync() {
    this.CardItem = new PhantomArenaCard_1.PhantomArenaCard();
    await this.CardItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  Refresh(t, e, i) {
    var a;
    if (t.CardData) {
      this.CardItem.SetUiActive(true);
      this.GetSprite(1)?.SetUIActive(false);
      this.CardItem.Refresh(t.CardData);
    } else {
      this.CardItem.SetUiActive(false);
      this.GetSprite(1)?.SetUIActive(true);
      if (t.IsMe) {
        a = t.Index < CARD_FRONT ? "SP_LoadingMeFront" : "SP_LoadingMeBack";
        this.RefreshCardFaceByResource(a);
      } else {
        a = t.Index >= CARD_FRONT ? "SP_LoadingPlayerFront" : "SP_LoadingPlayerBack";
        this.RefreshCardFaceByResource(a);
      }
    }
  }
  RefreshCardFaceByResource(t) {
    var e;
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    if (t) {
      e = this.GetSprite(1);
      this.SetSpriteByPath(t, e, false);
    }
  }
}
class PhantomArenaBattleLoading extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.OpponentLayout = undefined;
    this.OwnLayout = undefined;
    this.IsLoadStart = false;
    this.IsLoadEnd = false;
    this.NotNeedEntity = false;
    this.NotNeedTimeCount = 0;
    this.WaitTask = undefined;
    this.EntityTotal = 0;
    this.CurCount = 0;
    this.CountSpeed = 1;
    this.sU1 = () => new PhantomArenaBattleLoadingItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILayoutBase], [1, UE.UIItem], [2, UE.UILayoutBase], [3, UE.UIItem], [4, UE.UISliderComponent], [5, UE.UISliderComponent], [6, UE.UIText], [7, UE.UITexture]];
  }
  OnBeforeShow() {
    GameAudioController_1.GameAudioController.UpdateLoadingType(1);
  }
  OnBeforeHide() {
    GameAudioController_1.GameAudioController.UpdateLoadingType(undefined);
  }
  OnAfterHide() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaBattleLoadingHide);
  }
  async XTm() {
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.ChallengeId;
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallengeConfig(t);
    await this.SetTextureAsync(t.BvbBattleLoadingBg, this.GetTexture(7));
  }
  async aU1() {
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetCardDataList();
    var e = new Map();
    for (const n of t) {
      e.set(this.Psu(n.Index), n);
    }
    var i = [];
    for (let t = 0; t < CARD_TOTAL; t++) {
      var a = {
        Index: t,
        IsMe: false
      };
      if (e.get(t)) {
        a.CardData = e.get(t);
      }
      i.push(a);
    }
    this.OpponentLayout = new GenericLayout_1.GenericLayout(this.GetLayoutBase(0), this.sU1, this.GetItem(1).GetOwner());
    await this.OpponentLayout.RefreshByDataAsync(i);
  }
  Psu(t) {
    if (t < CARD_FRONT) {
      return CARD_FRONT + t;
    } else {
      return t - CARD_FRONT;
    }
  }
  async hU1() {
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleCardDataList();
    var e = new Map();
    for (const n of t) {
      e.set(n.Index, n);
    }
    var i = [];
    for (let t = 0; t < CARD_TOTAL; t++) {
      var a = {
        Index: t,
        IsMe: true
      };
      if (e.get(t)) {
        a.CardData = e.get(t);
      }
      i.push(a);
    }
    this.OwnLayout = new GenericLayout_1.GenericLayout(this.GetLayoutBase(2), this.sU1, this.GetItem(3).GetOwner());
    await this.OwnLayout.RefreshByDataAsync(i);
  }
  async OnBeforeStartAsync() {
    await ModelManager_1.ModelManager.PhantomArenaBattleModel.BattleData.PrepareLoadingPromise?.Promise;
    await Promise.all([this.aU1(), this.hU1(), this.XTm()]);
    this.WaitEntityLoadFinish();
  }
  WaitEntityLoadFinish() {
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.BattleData.GetAllEntityIdList();
    if (t.length === 0) {
      this.NotNeedEntity = true;
    } else {
      this.NotNeedEntity = false;
      this.EntityTotal = t.length;
      this.CurCount = 0;
      this.CountSpeed = PER_INTERVAL * this.EntityTotal;
      this.WaitTask = WaitEntityTask_1.WaitEntityTask.Create("PhantomArenaEntityNotify", t, () => {});
    }
    this.IsLoadStart = true;
  }
  OnTick(t) {
    if (this.IsLoadStart && !this.IsLoadEnd) {
      if (this.NotNeedEntity) {
        this.NotNeedTimeCount += t;
        if (this.NotNeedTimeCount >= 2) {
          this.NotNeedTimeCount = 2;
          this.SetLoadingValue(1);
          this.OnLoadingEnd();
          return;
        } else {
          this.SetLoadingValue(this.NotNeedTimeCount / 2);
          return;
        }
      }
      var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.CurrentLoading;
      if (this.CurCount < e) {
        t = t * this.CountSpeed / 1000;
        this.CurCount = Math.min(this.CurCount + t, e);
        this.CurCount = Math.min(this.CurCount, this.EntityTotal);
      }
      var t = this.CurCount / this.EntityTotal;
      this.SetLoadingValue(t);
      if (this.CurCount >= this.EntityTotal) {
        this.OnLoadingEnd();
      }
    }
  }
  SetLoadingValue(t) {
    this.GetSlider(4)?.SetValue(t);
    this.GetSlider(5)?.SetValue(t);
    this.GetText(6)?.SetText(Math.floor(t * 100) + "%");
  }
  OnLoadingEnd() {
    this.IsLoadEnd = true;
    UiManager_1.UiManager.OpenView("PhantomArenaBattleVsView", undefined, () => {
      ModelManager_1.ModelManager.PhantomArenaBattleModel.IsBattleLoading = false;
      ModelManager_1.ModelManager.PhantomArenaBattleModel.CurrentLoading = 0;
      UiManager_1.UiManager.CloseView("PhantomArenaBattleLoading");
    });
  }
  GetExtraResourceId(t) {
    if (ModelManager_1.ModelManager.PhantomArenaBattleModel.IsOldBvb) {
      return "UiView_DesktopLoading";
    } else {
      return "UiView_DesktopLoadingNew";
    }
  }
}
exports.PhantomArenaBattleLoading = PhantomArenaBattleLoading;
//# sourceMappingURL=PhantomArenaBattleLoading.js.map