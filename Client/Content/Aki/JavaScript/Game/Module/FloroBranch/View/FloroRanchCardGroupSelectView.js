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
    this.kau = undefined;
    this.kRu = [];
    this.ORu = [];
    this.MOu = undefined;
    this.IRe = undefined;
    this.xQu = undefined;
    this.Y5i = () => {
      var e = new FloroRanchCardItem_1.FloroRanchCardItem();
      e.SetToggleCallBack(this.CardToggleClick);
      return e;
    };
    this.CardToggleClick = (e, t) => {
      var r = this.ORu.indexOf(t);
      if (r !== -1) {
        this.ORu.splice(r, 1);
      } else {
        this.ORu.push(t);
      }
      this.GetButton(3).SetSelfInteractive(this.ORu.length > 0);
    };
    this.L3e = () => {
      var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(339);
      e.FunctionMap.set(2, () => {
        var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchCardInGameRedDot) ?? new Set();
        for (const i of this.ORu) {
          if (!e.has(i)) {
            e.add(i);
          }
        }
        LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchCardInGameRedDot, e);
        var t = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData().Id;
        var r = ModelManager_1.ModelManager.FloroRanchGamePlayModel.SubInstanceId;
        FloroRanchController_1.FloroRanchController.SendFloroRanchPlaySelectCardGroupRequest(t, r, this.ORu, e => {
          this.$Ge();
        });
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    };
    this.Ucu = e => {
      if (e === "ListShow") {
        this.BWu();
      }
    };
    this.$Ge = () => {
      this.CloseMe();
    };
    this.Ndu = () => {
      ModelManager_1.ModelManager.FloroRanchGamePlayModel.HideRecordView();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIItem], [7, UE.UIItem]];
    this.BtnBindInfo = [[3, this.L3e], [4, this.$Ge], [5, this.Ndu]];
  }
  async OnBeforeStartAsync() {
    this.MOu = new FloroRanchCurrencyItem_1.FloroRanchCurrencyItem();
    var e = this.GetItem(6);
    await this.MOu.CreateThenShowByActorAsync(e.GetOwner());
    var e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.DiamondData;
    this.MOu.SetCurrencyData(e);
    this.kRu = this.OpenParam;
    this.kau = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.Y5i);
    this.Qh_();
  }
  OnBeforeShow() {
    this.xQu.SetEnableUiBlur(true);
  }
  OnBeforeHide() {
    this.xQu.SetEnableUiBlur(false);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.Ucu);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.Ucu);
  }
  BWu() {
    this.kau.RefreshByDataAsync(this.kRu).then(() => {
      this.kWu();
      this.ORu.push(...this.kRu);
      this.GetButton(3).SetSelfInteractive(this.ORu.length > 0);
      for (const e of this.kau.GetLayoutItemList()) {
        e.SetToggleState(true);
      }
    });
  }
  kWu() {
    if (this.IRe) {
      this.uei();
    }
    const t = this.kau.GetLayoutItemList();
    const r = t.length;
    if (r !== 0) {
      let e = 0;
      this.IRe = TimerSystem_1.GameplayTimerSystem.Loop(() => {
        if (e < r) {
          t[e].PlayAppearAnim();
          e++;
        }
      }, FloroRanchDefine_1.FLORO_RANCH_CARD_ITEM_ANIM_GAP_TIME, r);
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
    this.xQu = this.RootActor?.GetComponentByClass(UE.TsUiBlur_C.StaticClass());
    this.xQu.SetEnableUiBlur(false);
  }
}
exports.FloroRanchCardGroupSelectView = FloroRanchCardGroupSelectView;
//# sourceMappingURL=FloroRanchCardGroupSelectView.js.map