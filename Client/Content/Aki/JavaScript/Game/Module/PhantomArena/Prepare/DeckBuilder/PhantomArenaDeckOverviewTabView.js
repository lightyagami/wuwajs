"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaDeckOverviewTabView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const PhantomArenaController_1 = require("../../PhantomArenaController");
const PhantomArenaChildViewBase_1 = require("../PhantomArenaChildViewBase");
const PhantomArenaDeckOverviewItem_1 = require("./PhantomArenaDeckOverviewItem");
class PhantomArenaDeckOverviewTabView extends PhantomArenaChildViewBase_1.PhantomArenaChildViewBase {
  constructor() {
    super(...arguments);
    this.Hlu = undefined;
    this.M61 = () => {
      var t = new PhantomArenaDeckOverviewItem_1.PhantomArenaDeckOverviewItem();
      t.OnToggleSelect = this.E61;
      t.ActivityId = this.ActivityId;
      return t;
    };
    this.E61 = t => {
      this.SelectDeckByIndex(t);
    };
    this.I61 = () => {
      const e = this.ViewModel.EditableDeckList[this.ViewModel.SelectedDeckIndex];
      var t;
      var i;
      if (e.GetDeckServerId() < 0) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhantomBattle_1070");
      } else if (this.ViewModel) {
        (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(315)).FunctionMap.set(2, () => {
          var t = e.GetDeckServerId();
          PhantomArenaController_1.PhantomArenaController.CardGroupDeleteRequest(t, this.ActivityId, t => {
            var i = this.ViewModel.UsedDeckIndex;
            if (i >= 0) {
              if (i === t) {
                this.ViewModel.UsedDeckIndex = -1;
              } else if (t < i) {
                this.ViewModel.UsedDeckIndex--;
              }
            }
            this.ViewModel?.UpdateEditableDeckList();
            this.RefreshDeckInfoLayout();
            this.ViewModel.ReportDeckDelete(e);
          });
        });
        i = ModelManager_1.ModelManager.PhantomArenaModel.IsNewPhantomArenaActivity(this.ActivityId);
        PhantomArenaController_1.PhantomArenaController.OpenPhantomArenaConfirmBoxView(t, i);
      }
    };
    this.T61 = () => {
      if (this.ViewModel?.RecommendDeck) {
        this.rKm(this.ViewModel.RecommendDeck);
      } else {
        var t = ModelManager_1.ModelManager.PhantomArenaModel.IsNewPhantomArenaActivity(this.ActivityId) ? "PhantomArenaNewDeckBuilderTabView" : "PhantomArenaDeckBuilderTabView";
        var i = this.ViewModel.EditableDeckList[this.ViewModel.SelectedDeckIndex];
        if (i) {
          const e = this.ViewModel?.CreateTempDeckFromDeck(i);
          if (e) {
            this.ViewModel?.StartEditDeck(e);
            this.OpenChildView(t);
          }
        } else {
          const e = this.ViewModel?.CreateEmptyTempDeck();
          if (e) {
            this.ViewModel?.StartEditDeck(e);
            this.OpenChildView(t);
          }
        }
      }
    };
    this.Efu = (t, i) => {
      const e = () => {
        this.ViewModel?.UpdateEditableDeckList();
        this.ViewModel.RecommendDeck = undefined;
        this.RefreshDeckInfoLayout();
        this.RefreshButtonAndTip();
      };
      var s;
      if (i < 0) {
        PhantomArenaController_1.PhantomArenaController.CardGroupAddRequest(t.GetName(), t.CoverToCardIdList(), this.ActivityId, () => {
          e();
          if (t) {
            this.ViewModel.ReportDeckCreate(t);
          }
        });
      } else {
        s = t.CoverToCardIdList();
        PhantomArenaController_1.PhantomArenaController.CardGroupUpdateRequest(i, s, this.ActivityId, () => {
          e();
          if (t) {
            this.ViewModel.ReportDeckCover(t);
          }
        });
      }
    };
    this.tWt = () => {
      var t = this.ViewModel.EditableDeckList[this.ViewModel.SelectedDeckIndex];
      if (t.GetDeckServerId() < 0 || t.GetTotalCardCount() <= 0) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhantomBattle_1069");
      } else {
        this.ViewModel.DeckSelectedConfirmFlag = true;
        this.ViewModel.UsedDeckIndex = this.ViewModel.SelectedDeckIndex;
        this.CloseMe();
      }
    };
    this.AMo = () => {
      this.ViewModel.RecommendDeck = undefined;
      this.BackToLastView();
      this.ViewModel.ResetOverrideCloseFunc();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIText]];
    this.BtnBindInfo = [[2, this.I61], [3, this.T61], [4, this.tWt]];
  }
  OnStart() {
    super.OnStart();
    this.Hlu = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(1).GetOwner(), this.M61, true);
  }
  OnBeforeShow() {
    this.ViewModel.SetViewTitle?.("PhantomArenaDeckOverviewTabView_Name");
    var t = ModelManager_1.ModelManager.PhantomArenaModel.IsNewPhantomArenaActivity(this.ActivityId);
    this.ViewModel.SetViewHelpId?.(t ? 481 : 336);
    this.ViewModel.SetViewHelpBtnActive?.(true);
    this.ViewModel.SetViewIcon?.("SP_IconSoundRemnantArena3");
    this.ViewModel?.HideRoleTexture?.(true);
    this.RefreshDeckInfoLayout();
    this.RefreshButtonAndTip();
    if (this.ViewModel) {
      this.ViewModel.SetOverrideCloseFunc(this.AMo);
    }
  }
  RefreshDeckInfoLayout() {
    this.Hlu.RefreshByData(this.ViewModel.EditableDeckList, false, () => {
      this.Hlu.ScrollToGridIndex(this.ViewModel.SelectedDeckIndex, false);
      this.Hlu.SelectGridProxy(this.ViewModel.SelectedDeckIndex);
    });
  }
  RefreshButtonAndTip() {
    var t = this.ViewModel?.RecommendDeck !== undefined;
    this.GetButton(4).RootUIComp.SetUIActive(!!this.ViewModel?.CanShowSelectBtnInDeckOverviewTabView && !t);
    var i = t ? "PhantomBattle_1140" : "PrefabTextItem_1635688567_Text";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), i);
    this.GetItem(5)?.SetUIActive(!t);
    this.GetItem(6)?.SetUIActive(t);
  }
  SelectDeckByIndex(t) {
    if (!(t < 0) && !(t >= this.ViewModel.EditableDeckList.length)) {
      this.ViewModel.SelectedDeckIndex = t;
      this.Hlu.SelectGridProxy(t);
    }
  }
  rKm(t) {
    var i;
    var e;
    const s = this.ViewModel.EditableDeckList[this.ViewModel.SelectedDeckIndex].GetDeckServerId();
    if (s >= 0) {
      (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(414)).FunctionMap.set(2, () => {
        this.Efu(t, s);
      });
      e = ModelManager_1.ModelManager.PhantomArenaModel.IsNewPhantomArenaActivity(this.ActivityId);
      PhantomArenaController_1.PhantomArenaController.OpenPhantomArenaConfirmBoxView(i, e);
    } else {
      this.Efu(t, s);
    }
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (t && !(t.length <= 0) && t[0] === "FirstDeck" && (t = this.Hlu?.GetGridByDisplayIndex(0))) {
      return [t, t];
    } else {
      return undefined;
    }
  }
}
exports.PhantomArenaDeckOverviewTabView = PhantomArenaDeckOverviewTabView;
//# sourceMappingURL=PhantomArenaDeckOverviewTabView.js.map