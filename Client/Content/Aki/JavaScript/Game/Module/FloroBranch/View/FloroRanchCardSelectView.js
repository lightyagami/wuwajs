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
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
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
    this.Kmu = undefined;
    this.PNo = undefined;
    this.kau = undefined;
    this.fqt = undefined;
    this.ZX1 = 0;
    this.IRe = undefined;
    this.RKu = undefined;
    this.dud = true;
    this.COu = e => {
      if (e) {
        this.Kmu = e.vlu;
        this.AKu();
        this.Og();
        this.JV1();
        ControllerHolder_1.ControllerHolder.UiNavigationNewController.MarkViewHandleRefreshNavigationDirty();
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanch", 71, "刷新抽卡请求，返回数据为空");
      }
    };
    this.Y5i = () => {
      var e = new FloroRanchCardItem_1.FloroRanchCardItem();
      e.SetToggleCallBack(this.CardToggleClick);
      e.SetCanToggleExecuteFunction(this.vPu);
      return e;
    };
    this.CardToggleClick = (e, i) => {
      if (this.kau.GetSelectedGridIndex() !== e) {
        this.ZX1 = i;
        this.kau.SelectGridProxy(e);
        this.GetButton(3)?.SetSelfInteractive(true);
      }
    };
    this.vPu = e => this.kau.GetSelectedGridIndex() !== e;
    this.ifu = () => {
      var e;
      var i;
      if (this.dud) {
        if (this.Kmu.D1u) {
          if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.DiamondData.GetAmount() < this.Kmu.N2s[0].m9n) {
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Farm_MoneyNotEnough");
          } else {
            e = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData().Id;
            i = ModelManager_1.ModelManager.FloroRanchGamePlayModel.SubInstanceId;
            this.dud = false;
            FloroRanchController_1.FloroRanchController.FloroRanchPlayRefreshGachaRequest(e, i, this.Kmu.w5n, e => {
              this.COu(e);
              this.dud = true;
            });
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("FloroRanchGamePlay", 78, "抽卡刷新 allowedRefresh 为 false");
        }
      }
    };
    this.L3e = () => {
      var e;
      var i;
      var t;
      if (this.dud) {
        e = (t = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData()).Id;
        i = ModelManager_1.ModelManager.FloroRanchGamePlayModel.SubInstanceId;
        if (this.ZX1 === 0) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Farm_ChooseCard");
        } else if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.OwnCardEntityCount >= t.CardLimitCount) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhrolovaFarm_AnimalMax");
        } else {
          if (!(t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchCardInGameRedDot) ?? new Set()).has(this.ZX1)) {
            t.add(this.ZX1);
            LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchCardInGameRedDot, t);
          }
          this.dud = false;
          FloroRanchController_1.FloroRanchController.FloroRanchPlayGachaRequest(e, i, this.ZX1, this.Kmu.w5n, () => {
            this.CloseMe();
            if (this.PNo) {
              this.PNo();
            }
            this.dud = true;
          });
        }
      }
    };
    this.$Ht = () => {
      var e;
      var i;
      if (this.dud && (this.CloseMe(), this.PNo && this.PNo(), this.Kmu)) {
        e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.ActivityId;
        i = ModelManager_1.ModelManager.FloroRanchGamePlayModel.SubInstanceId;
        this.dud = false;
        FloroRanchController_1.FloroRanchController.SendFloroRanchCloseTaskRequest(e, i, this.Kmu.w5n, e => {
          this.dud = true;
        });
      }
    };
    this.Ndu = () => {
      if (this.dud) {
        ModelManager_1.ModelManager.FloroRanchGamePlayModel.HideRecordView();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UITexture], [9, UE.UIText], [10, UE.UIText], [11, UE.UIItem], [12, UE.UIText]];
    this.BtnBindInfo = [[2, this.ifu], [3, this.L3e], [4, this.$Ht], [5, this.Ndu]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    this.Kmu = e.GachaData;
    this.PNo = e.CloseCallback;
    this.kau = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.Y5i);
    this.fqt = new FloroRanchCurrencyItem_1.FloroRanchCurrencyItem();
    await this.fqt.CreateThenShowByActorAsync(this.GetItem(6).GetOwner());
    this.Qh_();
    this.Og();
    this.GetButton(3)?.SetSelfInteractive(this.ZX1 !== 0);
    this.JV1();
  }
  OnBeforeShow() {
    this.Og();
    this.RKu.SetEnableUiBlur(true);
  }
  OnBeforeHide() {
    this.RKu.SetEnableUiBlur(false);
  }
  Og() {
    var e;
    var i;
    var t = this.Kmu?.D1u ?? false;
    this.GetButton(2)?.RootUIComp.SetUIActive(t);
    if (t) {
      t = ModelManager_1.ModelManager.FloroRanchGamePlayModel.DiamondData;
      this.SetTextureByPath(t.ConfigData.GetSmallIcon(), this.GetTexture(8));
      i = this.Kmu.jBu;
      this.GetText(10)?.ShowTextNew(i > 0 ? "Farm_Edit5" : "Farm_Edit4");
      e = this.GetText(9);
      if (i > 0) {
        e.SetText("-0");
        e.useChangeColor = false;
        this.GetItem(11)?.SetUIActive(true);
        this.GetText(12)?.SetText("" + i);
      } else {
        i = t.GetAmount();
        i = (t = this.Kmu.N2s[0].m9n) <= i;
        e.SetText("-" + t);
        e.useChangeColor = !i;
        this.GetItem(11)?.SetUIActive(false);
      }
    }
    this.fqt.SetCurrencyData(ModelManager_1.ModelManager.FloroRanchGamePlayModel.DiamondData);
  }
  async JV1() {
    if (this.IRe) {
      this.uei();
    }
    let i = this.kau.GetLayoutItemList();
    for (const e of i) {
      e.StopAppearAnim();
    }
    await this.kau.RefreshByDataAsync(this.Kmu.Yru);
    const t = (i = this.kau.GetLayoutItemList()).length;
    if (t === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 78, "刷新卡牌布局，卡牌列表为空，不播放动画");
      }
    } else {
      let e = 0;
      this.IRe = TimerSystem_1.GameplayTimerSystem.Loop(() => {
        if (e < t) {
          i[e].PlayAppearAnim();
          e++;
        }
      }, FloroRanchDefine_1.FLORO_RANCH_CARD_ITEM_ANIM_GAP_TIME, t);
    }
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
    this.RKu = this.RootActor?.GetComponentByClass(UE.TsUiBlur_C.StaticClass());
    this.RKu.SetEnableUiBlur(false);
  }
  AKu() {
    this.kau.DeselectCurrentGridProxy();
    this.ZX1 = 0;
    this.GetButton(3)?.SetSelfInteractive(false);
  }
}
exports.FloroRanchCardSelectView = FloroRanchCardSelectView;
//# sourceMappingURL=FloroRanchCardSelectView.js.map