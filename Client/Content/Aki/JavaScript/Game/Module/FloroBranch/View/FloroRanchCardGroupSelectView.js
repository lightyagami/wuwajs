"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchCardGroupSelectView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const FloroRanchController_1 = require("../FloroRanchController");
const FloroRanchDefine_1 = require("../FloroRanchDefine");
const FloroRanchCardItem_1 = require("./Item/FloroRanchCardItem");
const FloroRanchCurrencyItem_1 = require("./Item/FloroRanchCurrencyItem");
class FloroRanchCardGroupSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lau = undefined;
    this.dRu = [];
    this.mRu = [];
    this.Zku = undefined;
    this.IRe = undefined;
    this.fHc = undefined;
    this.Y5i = () => {
      var e = new FloroRanchCardItem_1.FloroRanchCardItem();
      e.SetToggleCallBack(this.CardToggleClick);
      return e;
    };
    this.CardToggleClick = (e, t) => {
      var r = this.mRu.indexOf(t);
      if (r !== -1) {
        this.mRu.splice(r, 1);
      } else {
        this.mRu.push(t);
      }
      this.GetButton(3).SetSelfInteractive(this.mRu.length > 0);
    };
    this.L3e = () => {
      var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(339);
      e.FunctionMap.set(2, () => {
        var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchCardInGameRedDot) ?? new Set();
        for (const i of this.mRu) {
          if (!e.has(i)) {
            e.add(i);
          }
        }
        LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchCardInGameRedDot, e);
        var t = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData().Id;
        var r = ModelManager_1.ModelManager.FloroRanchGamePlayModel.SubInstanceId;
        FloroRanchController_1.FloroRanchController.SendFloroRanchPlaySelectCardGroupRequest(t, r, this.mRu, e => {
          this.$Ge();
        });
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    };
    this.Yuu = e => {
      if (e === "ListShow") {
        this.eHc();
      }
    };
    this.$Ge = () => {
      this.CloseMe();
    };
    this.odu = () => {
      ModelManager_1.ModelManager.FloroRanchGamePlayModel.HideRecordView();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIItem], [7, UE.UIItem]];
    this.BtnBindInfo = [[3, this.L3e], [4, this.$Ge], [5, this.odu]];
  }
  async OnBeforeStartAsync() {
    this.Zku = new FloroRanchCurrencyItem_1.FloroRanchCurrencyItem();
    var e = this.GetItem(6);
    await this.Zku.CreateThenShowByActorAsync(e.GetOwner());
    var e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.DiamondData;
    this.Zku.SetCurrencyData(e);
    this.dRu = this.OpenParam;
    this.lau = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.Y5i);
    this.Qh_();
  }
  OnBeforeShow() {
    this.fHc.SetEnableUiBlur(true);
  }
  OnBeforeHide() {
    this.fHc.SetEnableUiBlur(false);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.Yuu);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.Yuu);
  }
  eHc() {
    this.lau.RefreshByDataAsync(this.dRu).then(() => {
      this.tHc();
      this.mRu.push(...this.dRu);
      this.GetButton(3).SetSelfInteractive(this.mRu.length > 0);
      for (const e of this.lau.GetLayoutItemList()) {
        e.SetToggleState(true);
      }
    });
  }
  tHc() {
    if (this.IRe) {
      this.uei();
    }
    const e = this.lau.GetLayoutItemList();
    const t = e.length;
    let r = 0;
    this.IRe = TimerSystem_1.GameplayTimerSystem.Loop(() => {
      if (r < t) {
        e[r].PlayAppearAnim();
        r++;
      }
    }, FloroRanchDefine_1.FLORO_RANCH_CARD_ITEM_ANIM_GAP_TIME, t);
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
}
exports.FloroRanchCardGroupSelectView = FloroRanchCardGroupSelectView;
//# sourceMappingURL=FloroRanchCardGroupSelectView.js.map