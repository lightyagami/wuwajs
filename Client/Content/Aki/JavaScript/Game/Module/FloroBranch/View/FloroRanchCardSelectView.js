"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchCardSelectView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const FloroRanchController_1 = require("../FloroRanchController");
const FloroRanchDefine_1 = require("../FloroRanchDefine");
const FloroRanchCardItem_1 = require("./Item/FloroRanchCardItem");
const FloroRanchCurrencyItem_1 = require("./Item/FloroRanchCurrencyItem");
class FloroRanchCardSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.umu = undefined;
    this.PNo = undefined;
    this.lau = undefined;
    this.fqt = undefined;
    this.RX1 = 0;
    this.IRe = undefined;
    this.fHc = undefined;
    this.POu = e => {
      if (e) {
        this.umu = e.Whu;
        this.iHc();
        this.Og();
        this.JV1();
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanch", 71, "刷新抽卡请求，返回数据为空");
      }
    };
    this.Y5i = () => {
      var e = new FloroRanchCardItem_1.FloroRanchCardItem();
      e.SetToggleCallBack(this.CardToggleClick);
      e.SetCanToggleExecuteFunction(this.WAu);
      return e;
    };
    this.CardToggleClick = (e, i) => {
      if (this.lau.GetSelectedGridIndex() !== e) {
        this.RX1 = i;
        this.lau.SelectGridProxy(e);
        this.GetButton(3)?.SetSelfInteractive(true);
      }
    };
    this.WAu = e => this.lau.GetSelectedGridIndex() !== e;
    this.vmu = () => {
      var e;
      var i;
      if (this.umu.z_u) {
        if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.DiamondData.GetAmount() < this.umu.N2s[0].m9n) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Farm_MoneyNotEnough");
        } else {
          e = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData().Id;
          i = ModelManager_1.ModelManager.FloroRanchGamePlayModel.SubInstanceId;
          FloroRanchController_1.FloroRanchController.FloroRanchPlayRefreshGachaRequest(e, i, this.umu.w5n, this.POu);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 78, "抽卡刷新 allowedRefresh 为 false");
      }
    };
    this.L3e = () => {
      var e = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
      var i = e.Id;
      var t = ModelManager_1.ModelManager.FloroRanchGamePlayModel.SubInstanceId;
      if (this.RX1 === 0) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Farm_ChooseCard");
      } else if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.OwnCardEntityCount >= e.CardLimitCount) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhrolovaFarm_AnimalMax");
      } else {
        if (!(e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchCardInGameRedDot) ?? new Set()).has(this.RX1)) {
          e.add(this.RX1);
          LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchCardInGameRedDot, e);
        }
        FloroRanchController_1.FloroRanchController.FloroRanchPlayGachaRequest(i, t, this.RX1, this.umu.w5n, () => {
          this.CloseMe();
          if (this.PNo) {
            this.PNo();
          }
        });
      }
    };
    this.$Ht = () => {
      this.CloseMe();
      if (this.PNo) {
        this.PNo();
      }
    };
    this.odu = () => {
      ModelManager_1.ModelManager.FloroRanchGamePlayModel.HideRecordView();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UITexture], [9, UE.UIText], [10, UE.UIText], [11, UE.UIItem], [12, UE.UIText]];
    this.BtnBindInfo = [[2, this.vmu], [3, this.L3e], [4, this.$Ht], [5, this.odu]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    this.umu = e.GachaData;
    this.PNo = e.CloseCallback;
    this.lau = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.Y5i);
    this.fqt = new FloroRanchCurrencyItem_1.FloroRanchCurrencyItem();
    await this.fqt.CreateThenShowByActorAsync(this.GetItem(6).GetOwner());
    this.Qh_();
    this.Og();
    this.GetButton(3)?.SetSelfInteractive(this.RX1 !== 0);
    this.JV1();
  }
  OnBeforeShow() {
    this.fHc.SetEnableUiBlur(true);
  }
  OnBeforeHide() {
    this.fHc.SetEnableUiBlur(false);
  }
  Og() {
    var e = this.umu?.z_u ?? false;
    this.GetButton(2)?.RootUIComp.SetUIActive(e);
    if (e) {
      e = ModelManager_1.ModelManager.FloroRanchModel.GetFloroRanchCurrencyConfig(2);
      this.SetTextureByPath(e.GetSmallIcon(), this.GetTexture(8));
      e = this.umu.LOu;
      this.GetText(10)?.ShowTextNew(e > 0 ? "Farm_Edit5" : "Farm_Edit4");
      if (e > 0) {
        this.GetText(9)?.SetText("-0");
        this.GetItem(11)?.SetUIActive(true);
        this.GetText(12)?.SetText("" + e);
      } else {
        e = this.umu.N2s[0];
        this.GetText(9)?.SetText("-" + e.m9n);
        this.GetItem(11)?.SetUIActive(false);
      }
    }
    this.fqt.SetCurrencyData(ModelManager_1.ModelManager.FloroRanchGamePlayModel.DiamondData);
  }
  async JV1() {
    if (this.IRe) {
      this.uei();
    }
    const e = this.lau.GetLayoutItemList();
    for (const r of e) {
      r.StopAppearAnim();
    }
    await this.lau.RefreshByDataAsync(this.umu.Eru);
    const i = e.length;
    let t = 0;
    this.IRe = TimerSystem_1.GameplayTimerSystem.Loop(() => {
      if (t < i) {
        e[t].PlayAppearAnim();
        t++;
      }
    }, FloroRanchDefine_1.FLORO_RANCH_CARD_ITEM_ANIM_GAP_TIME, i);
  }
  uei() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this.IRe)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.IRe);
    }
    this.IRe = undefined;
  }
  OnBeforeDestroy() {
    this.uei();
  }
  Qh_() {
    this.fHc = this.RootActor?.GetComponentByClass(UE.TsUiBlur_C.StaticClass());
    this.fHc.SetEnableUiBlur(false);
  }
  iHc() {
    this.lau.DeselectCurrentGridProxy();
    this.RX1 = 0;
    this.GetButton(3)?.SetSelfInteractive(false);
  }
}
exports.FloroRanchCardSelectView = FloroRanchCardSelectView;
//# sourceMappingURL=FloroRanchCardSelectView.js.map