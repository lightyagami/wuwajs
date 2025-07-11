"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaDeckOverviewTabView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const PhantomArenaController_1 = require("../../PhantomArenaController");
const PhantomArenaChildViewBase_1 = require("../PhantomArenaChildViewBase");
const PhantomArenaDeckOverviewItem_1 = require("./PhantomArenaDeckOverviewItem");
class PhantomArenaDeckOverviewTabView extends PhantomArenaChildViewBase_1.PhantomArenaChildViewBase {
  constructor() {
    super(...arguments);
    this.Clu = undefined;
    this.M61 = () => {
      var e = new PhantomArenaDeckOverviewItem_1.PhantomArenaDeckOverviewItem();
      e.OnToggleSelect = this.E61;
      return e;
    };
    this.E61 = e => {
      this.SelectDeckByIndex(e);
    };
    this.I61 = () => {
      const t = this.ViewModel.EditableDeckList[this.ViewModel.SelectedDeckIndex];
      var e;
      if (t.GetDeckServerId() < 0) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhantomBattle_1070");
      } else if (this.ViewModel) {
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(315)).FunctionMap.set(2, () => {
          var e = t.GetDeckServerId();
          var i = ModelManager_1.ModelManager.PhantomArenaModel.ActivityId;
          PhantomArenaController_1.PhantomArenaController.CardGroupDeleteRequest(e, i, e => {
            var i = this.ViewModel.UsedDeckIndex;
            if (i >= 0) {
              if (i === e) {
                this.ViewModel.UsedDeckIndex = -1;
              } else if (e < i) {
                this.ViewModel.UsedDeckIndex--;
              }
            }
            this.ViewModel?.UpdateEditableDeckList();
            this.RefreshDeckInfoLayout();
            this.ViewModel.ReportDeckDelete(t);
          });
        });
        PhantomArenaController_1.PhantomArenaController.OpenPhantomArenaConfirmBoxView(e);
      }
    };
    this.T61 = () => {
      var e = this.ViewModel.EditableDeckList[this.ViewModel.SelectedDeckIndex];
      if (e) {
        const i = this.ViewModel?.CreateTempDeckFromDeck(e);
        if (i) {
          this.ViewModel?.StartEditDeck(i);
          this.OpenChildView("PhantomArenaDeckBuilderTabView");
        }
      } else {
        const i = this.ViewModel?.CreateEmptyTempDeck();
        if (i) {
          this.ViewModel?.StartEditDeck(i);
          this.OpenChildView("PhantomArenaDeckBuilderTabView");
        }
      }
    };
    this.tWt = () => {
      var e = this.ViewModel.EditableDeckList[this.ViewModel.SelectedDeckIndex];
      if (e.GetDeckServerId() < 0 || e.GetTotalCardCount() <= 0) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhantomBattle_1069");
      } else {
        this.ViewModel.DeckSelectedConfirmFlag = true;
        this.ViewModel.UsedDeckIndex = this.ViewModel.SelectedDeckIndex;
        this.CloseMe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent]];
    this.BtnBindInfo = [[2, this.I61], [3, this.T61], [4, this.tWt]];
  }
  OnStart() {
    super.OnStart();
    this.Clu = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(1).GetOwner(), this.M61, true);
  }
  OnBeforeShow() {
    this.ViewModel.SetViewTitle?.("PhantomArenaDeckOverviewTabView_Name");
    this.ViewModel.SetViewHelpId?.(336);
    this.ViewModel.SetViewHelpBtnActive?.(true);
    this.ViewModel.SetViewIcon?.("SP_IconSoundRemnantArena3");
    this.ViewModel?.HideRoleTexture?.(true);
    this.RefreshDeckInfoLayout();
    this.GetButton(4).RootUIComp.SetUIActive(this.ViewModel?.CanShowSelectBtnInDeckOverviewTabView ?? false);
  }
  RefreshDeckInfoLayout() {
    this.Clu.RefreshByData(this.ViewModel.EditableDeckList, false, () => {
      this.Clu.ScrollToGridIndex(this.ViewModel.SelectedDeckIndex, false);
      this.Clu.SelectGridProxy(this.ViewModel.SelectedDeckIndex);
    });
  }
  SelectDeckByIndex(e) {
    if (!(e < 0) && !(e >= this.ViewModel.EditableDeckList.length)) {
      this.ViewModel.SelectedDeckIndex = e;
      this.Clu.SelectGridProxy(e);
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e && !(e.length <= 0) && e[0] === "FirstDeck" && (e = this.Clu?.GetGridByDisplayIndex(0))) {
      return [e, e];
    } else {
      return undefined;
    }
  }
}
exports.PhantomArenaDeckOverviewTabView = PhantomArenaDeckOverviewTabView;
//# sourceMappingURL=PhantomArenaDeckOverviewTabView.js.map