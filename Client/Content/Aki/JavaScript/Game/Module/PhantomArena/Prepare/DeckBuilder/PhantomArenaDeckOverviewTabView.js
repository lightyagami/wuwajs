"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaDeckOverviewTabView = void 0;
const UE = require("ue"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
  PhantomArenaController_1 = require("../../PhantomArenaController"),
  PhantomArenaChildViewBase_1 = require("../PhantomArenaChildViewBase"),
  PhantomArenaDeckOverviewItem_1 = require("./PhantomArenaDeckOverviewItem");
class PhantomArenaDeckOverviewTabView extends PhantomArenaChildViewBase_1.PhantomArenaChildViewBase {
  constructor() {
    super(...arguments), this.inu = void 0, this.$V1 = () => {
      var e = new PhantomArenaDeckOverviewItem_1.PhantomArenaDeckOverviewItem;
      return e.OnToggleSelect = this.WV1, e
    }, this.WV1 = e => {
      this.SelectDeckByIndex(e)
    }, this.QV1 = () => {
      const t = this.ViewModel.EditableDeckList[this.ViewModel.SelectedDeckIndex];
      var e;
      t.GetDeckServerId() < 0 ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhantomBattle_1070") : this.ViewModel && ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(315)).FunctionMap.set(2, () => {
        var e = t.GetDeckServerId(),
          i = ModelManager_1.ModelManager.PhantomArenaModel.ActivityId;
        PhantomArenaController_1.PhantomArenaController.CardGroupDeleteRequest(e, i, e => {
          var i = this.ViewModel.UsedDeckIndex;
          0 <= i && (i === e ? this.ViewModel.UsedDeckIndex = -1 : e < i && this.ViewModel.UsedDeckIndex--), this.ViewModel?.UpdateEditableDeckList(), this.RefreshDeckInfoLayout(), this.ViewModel.ReportDeckDelete(t)
        })
      }), PhantomArenaController_1.PhantomArenaController.OpenPhantomArenaConfirmBoxView(e))
    }, this.KV1 = () => {
      var e = this.ViewModel.EditableDeckList[this.ViewModel.SelectedDeckIndex];
      if (e) {
        const i = this.ViewModel?.CreateTempDeckFromDeck(e);
        i && (this.ViewModel?.StartEditDeck(i), this.OpenChildView("PhantomArenaDeckBuilderTabView"))
      } else {
        const i = this.ViewModel?.CreateEmptyTempDeck();
        void(i && (this.ViewModel?.StartEditDeck(i), this.OpenChildView("PhantomArenaDeckBuilderTabView")))
      }
    }, this.tWt = () => {
      var e = this.ViewModel.EditableDeckList[this.ViewModel.SelectedDeckIndex];
      e.GetDeckServerId() < 0 || e.GetTotalCardCount() <= 0 ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhantomBattle_1069") : (this.ViewModel.DeckSelectedConfirmFlag = !0, this.ViewModel.UsedDeckIndex = this.ViewModel.SelectedDeckIndex, this.CloseMe())
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UILoopScrollViewComponent],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UIButtonComponent]
    ], this.BtnBindInfo = [
      [2, this.QV1],
      [3, this.KV1],
      [4, this.tWt]
    ]
  }
  OnStart() {
    super.OnStart(), this.inu = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(1).GetOwner(), this.$V1, !0)
  }
  OnBeforeShow() {
    this.ViewModel.SetViewTitle?.("PhantomArenaDeckOverviewTabView_Name"), this.ViewModel.SetViewHelpId?.(336), this.ViewModel.SetViewHelpBtnActive?.(!0), this.ViewModel.SetViewIcon?.("SP_IconSoundRemnantArena3"), this.ViewModel?.HideRoleTexture?.(!0), this.RefreshDeckInfoLayout(), this.GetButton(4).RootUIComp.SetUIActive(this.ViewModel?.CanShowSelectBtnInDeckOverviewTabView ?? !1)
  }
  RefreshDeckInfoLayout() {
    this.inu.RefreshByData(this.ViewModel.EditableDeckList, !1, () => {
      this.inu.ScrollToGridIndex(this.ViewModel.SelectedDeckIndex, !1), this.inu.SelectGridProxy(this.ViewModel.SelectedDeckIndex)
    })
  }
  SelectDeckByIndex(e) {
    e < 0 || e >= this.ViewModel.EditableDeckList.length || (this.ViewModel.SelectedDeckIndex = e, this.inu.SelectGridProxy(e))
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    return e && !(e.length <= 0) && "FirstDeck" === e[0] && (e = this.inu?.GetGridByDisplayIndex(0)) ? [e, e] : void 0
  }
}
exports.PhantomArenaDeckOverviewTabView = PhantomArenaDeckOverviewTabView;
//# sourceMappingURL=PhantomArenaDeckOverviewTabView.js.map