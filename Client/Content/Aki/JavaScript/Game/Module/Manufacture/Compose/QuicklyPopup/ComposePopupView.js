"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComposePopupView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const ItemDefines_1 = require("../../../Item/Data/ItemDefines");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const ComposePopupGridItem_1 = require("./ComposePopupGridItem");
const DELAY_REFRESH_TIME = 20;
class ComposePopupView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.JPt = undefined;
    this.hRa = undefined;
    this.ZAt = undefined;
    this.Z_m = undefined;
    this.eum = undefined;
    this.tum = false;
    this.ium = undefined;
    this.rum = undefined;
    this.VMm = false;
    this.jMm = undefined;
    this.N8e = e => {
      this.tum = e === 1;
      this.Og();
    };
    this.oum = () => {
      if (!this.VMm) {
        if (TimerSystem_1.GameplayTimerSystem.Has(this.jMm)) {
          TimerSystem_1.GameplayTimerSystem.Remove(this.jMm);
        }
        this.jMm = TimerSystem_1.GameplayTimerSystem.Delay(() => {
          this.jMm = undefined;
          this.Og();
        }, DELAY_REFRESH_TIME);
      }
    };
    this.jWt = () => {
      var e = new ComposePopupGridItem_1.ComposePopupGridItem();
      e.BelongView = this.rum;
      return e;
    };
    this.p5t = () => {
      if (this.eum) {
        let e = 0;
        for (const s of this.eum) {
          if (s.Item.ItemId === ItemDefines_1.EItemId.Gold) {
            var t = s.Item.Count - s.Item.SelectedCount;
            if (t <= 0) {
              break;
            }
            let i = 0;
            s.ComposeList?.forEach(e => {
              var t = ModelManager_1.ModelManager.ComposePopupModel.GetGiftInnerCount(e.ItemId, ItemDefines_1.EItemId.Gold);
              i += t * e.Count;
            });
            e = i - t;
            break;
          }
        }
        var i;
        if (e > 0) {
          (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(390)).ItemIdMap = new Map([[ItemDefines_1.EItemId.Gold, e]]);
          i.FunctionMap.set(2, () => {
            this.aum();
          });
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
        } else {
          this.aum();
        }
      }
    };
    this.rki = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIVerticalLayout], [4, UE.UIItem], [5, UE.UIExtendToggle], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIItem]];
    this.BtnBindInfo = [[5, this.N8e]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    e.push(ControllerHolder_1.ControllerHolder.ComposeController.SendSynthesisInfoRequestAsync());
    this.hRa = new ButtonItem_1.ButtonItem();
    e.push(this.hRa.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()));
    this.ZAt = new ButtonItem_1.ButtonItem();
    e.push(this.ZAt.CreateThenShowByActorAsync(this.GetItem(8).GetOwner()));
    await Promise.all(e);
  }
  OnStart() {
    this.JPt = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(2), this.jWt);
    this.hRa?.SetFunction(this.rki);
    this.ZAt?.SetFunction(this.p5t);
    var e;
    var t = this.OpenParam;
    if (t) {
      e = ModelManager_1.ModelManager.ComposePopupModel.MergeDuplicateSelectedData(t.SelectedItemList);
      this.Z_m = this.Bvm(e);
      this.ium = t.ClickConfirm;
      this.rum = t.BelongView;
      e = this.hum(this.Z_m);
      this.tum = e.Result !== 0;
      this.GetText(0)?.ShowTextNew(e.Result === 0 ? "AutoSynthesis_MaterialEnough_Title" : "AutoSynthesis_MaterialMissing_Title");
      this.GetExtendToggle(5).SetToggleStateForce(this.tum ? 1 : 0, false);
    }
  }
  OnBeforeShow() {
    this.Og();
  }
  OnAfterHide() {
    this.JPt?.GetScrollItemList().forEach(e => {
      e.StopNiagara();
    });
  }
  OnBeforeDestroy() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this.jMm)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.jMm);
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.oum);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.oum);
  }
  Og() {
    for (const t of this.Z_m) {
      t.SelectedCount = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t.ItemId);
    }
    var e = ModelManager_1.ModelManager.ComposePopupModel.CheckComposeResult(this.Z_m, this.tum);
    this.Esi(e.GridDataList);
    this.M3e(e.Result === 0);
    this.lum();
  }
  Esi(e) {
    this.eum = e;
    this.JPt?.RefreshByData(e);
  }
  M3e(e) {
    this.ZAt?.SetEnableClick(e);
    this.ZAt?.SetShowText(e ? "AutoSynthesis_LevelUpBtn_Text" : "AutoSynthesis_MaterialMissingBtn_Text");
  }
  lum() {
    this.GetExtendToggle(5)?.RootUIComp.SetUIActive(ModelManager_1.ModelManager.ComposePopupModel.IsComposeGiftShouldShow(this.Z_m));
  }
  aum() {
    this.ZAt?.SetEnableClick(false);
    ControllerHolder_1.ControllerHolder.ComposeController.SendSynthesisItemRequestBatchNew(this.eum, () => {
      this.VMm = true;
      this.ium?.();
    }).finally(() => {
      this.CloseMe();
    });
  }
  hum(e) {
    var t = ModelManager_1.ModelManager.ComposePopupModel.CheckComposeResult(e, false);
    if (t.Result === 0) {
      return {
        Result: 0,
        GridDataList: t.GridDataList
      };
    } else if ((t = ModelManager_1.ModelManager.ComposePopupModel.CheckComposeResult(e, true)).Result === 0) {
      return {
        Result: 1,
        GridDataList: t.GridDataList
      };
    } else {
      return {
        Result: 2,
        GridDataList: t.GridDataList
      };
    }
  }
  Bvm(e) {
    return e.sort((e, t) => {
      e = e.SelectedCount - e.Count >= 0;
      t = t.SelectedCount - t.Count >= 0;
      if (e && !t) {
        return 1;
      } else if (!e && t) {
        return -1;
      } else {
        return 0;
      }
    });
  }
}
exports.ComposePopupView = ComposePopupView;
//# sourceMappingURL=ComposePopupView.js.map