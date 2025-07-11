"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleBuyRoleView = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const MapRoguePanelFetter_1 = require("../../MapRogue/View/Components/MapRoguePanelFetter");
const MapRogueTitleItem_1 = require("../../MapRogue/View/Components/MapRogueTitleItem");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const RogueBattleBuyRoleItem_1 = require("../Component/RogueBattleBuyRoleItem");
const RogueBattleBuyRolePreviewPanel_1 = require("../Component/RogueBattleBuyRolePreviewPanel");
const RogueBattleShopButton_1 = require("../Component/RogueBattleShopButton");
class RogueBattleBuyRoleView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Mpu = -1;
    this.Epu = false;
    this._Xe = 0;
    this.Ipu = undefined;
    this.lqe = undefined;
    this.Tpu = undefined;
    this.bpu = undefined;
    this.ZGe = undefined;
    this.c01 = undefined;
    this.JGn = () => {
      ControllerHolder_1.ControllerHolder.MapRogueController.OpenMapHelpView();
    };
    this.d01 = () => {
      var t = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this._Xe);
      if (t) {
        t.Select(Protocol_1.Aki.Protocol.pd1.Proto_GiveUp);
      }
    };
    this.vlo = () => {
      var t;
      var e = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this._Xe);
      if (e) {
        if ((t = e.Data.GEc.QEc).fm1 > ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t.mm1)) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("RogueBattle_RefreshItemNotEnough");
        } else if (t.So1 >= t.yo1) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("RogueBattle_RefreshCountMax");
        } else {
          e.Select(Protocol_1.Aki.Protocol.pd1.Proto_Refresh);
        }
      }
    };
    this.Rpu = () => {
      if (this.Epu) {
        this.Lpu();
      }
    };
    this.UIi = (t, e) => {
      var i = this.Mpu;
      if (this.Mpu >= 0) {
        this.c01.UnsafeGetGridProxy(this.wpu(this.Mpu))?.Deselect(this.Mpu);
      }
      this.Mpu = t;
      this.c01.UnsafeGetGridProxy(this.wpu(this.Mpu))?.Select(t);
      this.ZGe.SetInteractive(!e.mIc?.O2s);
      this.bpu.Refresh(e);
      this.z3e(true);
      if (i === -1) {
        this.UiViewSequence?.StopSequenceByKey("Switch02", false, true);
        this.UiViewSequence?.StopSequenceByKey("Switch", false, true);
        this.UiViewSequence?.PlaySequence("Switch");
      } else if (i !== this.Mpu) {
        this.UiViewSequence?.StopSequenceByKey("Switch02", false, true);
        this.UiViewSequence?.StopSequenceByKey("Switch", false, true);
        this.UiViewSequence?.PlaySequence("Switch02");
      }
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.MarkViewHandleRefreshNavigationDirty();
    };
    this.vIl = t => this.Mpu === t;
    this.Bqe = () => {
      var t = new RogueBattleBuyRoleItem_1.RogueBattleBuyRoleGroupItem();
      t.OnSelectCallback = this.UIi;
      t.IsSelectOn = this.vIl;
      return t;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UILoopScrollViewComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIButtonComponent]];
    this.BtnBindInfo = [[9, this.Rpu]];
  }
  wpu(t) {
    return Math.floor(t / 2);
  }
  Lpu() {
    if (this.Mpu >= 0) {
      this.c01.UnsafeGetGridProxy(this.wpu(this.Mpu))?.Deselect(this.Mpu);
    }
    this.Mpu = -1;
    this.z3e(false);
  }
  async OnBeforeStartAsync() {
    this._Xe = this.OpenParam;
    var t = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this._Xe);
    if (t) {
      t.UpdateViewFunc = () => {
        this.RefreshRoleList();
      };
      t.CloseViewFunc = () => {
        this.CloseMe();
      };
    }
    var t = [];
    this.Ipu = new MapRogueTitleItem_1.MapRogueTitleItem();
    t.push(this.Ipu.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    t.push(this.lqe.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()));
    this.Tpu = new MapRoguePanelFetter_1.MapRoguePanelFetter();
    t.push(this.Tpu.CreateThenShowByActorAsync(this.GetItem(6).GetOwner()));
    this.bpu = new RogueBattleBuyRolePreviewPanel_1.RogueBattleBuyRolePreviewPanel(this._Xe);
    this.bpu.BackBtnFunc = this.Rpu;
    t.push(this.bpu.CreateThenShowByActorAsync(this.GetItem(8).GetOwner()));
    this.ZGe = new RogueBattleShopButton_1.RogueBattleShopButton();
    t.push(this.ZGe.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()));
    this.c01 = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(2), this.GetItem(3).GetOwner(), this.Bqe, true);
    await Promise.all(t);
    await this.lqe.SetCurrencyItemList([ModelManager_1.ModelManager.MapRogueModel.GetRogueCurrencyItemId()]);
    this.lqe.SetHelpCallBack(this.JGn);
    this.lqe.SetCloseCallBack(this.d01);
    this.lqe.SetHelpBtnActive(true);
    this.UiViewSequence.AddSequenceFinishEvent("SwClose", () => {
      this.GetItem(7).SetUIActive(false);
    });
    this.ZGe.SetFunction(this.vlo);
    this.bjc();
    await this.RefreshRoleList();
  }
  bjc() {
    this.Epu = false;
    this.lqe.SetCloseBtnActive(true);
    this.lqe.SetHelpBtnActive(true);
    this.GetItem(5).SetUIActive(true);
    this.GetItem(7).SetUIActive(false);
  }
  z3e(t) {
    if (this.Epu !== t && !(this.Epu = t, this.lqe.SetCloseBtnActive(!t), this.lqe.SetHelpBtnActive(!t), this.RefreshBtnRefresh(), this.UiViewSequence?.StopSequenceByKey("SwClose", false, true), this.GetItem(7).SetUIActive(true), t)) {
      this.Tpu.RefreshFetter();
      this.UiViewSequence?.PlaySequence("SwClose");
    }
  }
  async RefreshRoleList() {
    var t = new UiAsyncTask_1.UiAsyncTask("RogueBattleBuyRoleView.RefreshRoleList", async () => {
      var t = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this._Xe);
      if (t) {
        var e = t.Data.GEc.QEc.fIc;
        this.RefreshBtnRefresh();
        var t = this.GetLoopScrollViewComponent(2);
        var i = this.GetItem(3).GetWidth();
        var s = t.GetViewport().GetUIItem().GetWidth();
        var s = Math.floor(s / (i + t.SpacingHorizontal)) * 2;
        var o = Math.max(s, e.length);
        var h = [];
        for (let t = 0; t < o; t += 2) {
          var r = new RogueBattleBuyRoleItem_1.RoleBuyInfoGroupData();
          if (t < e.length) {
            r.Data1 = e[t];
          }
          if (t + 1 < e.length) {
            r.Data2 = e[t + 1];
          }
          h.push(r);
        }
        await this.c01.RefreshByDataAsync(h, true);
        this.Lpu();
      }
    });
    await this.RunAsyncTask(t);
  }
  RefreshBtnRefresh() {
    var t;
    var e = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this._Xe);
    if (e && (t = (e = e.Data.GEc.QEc).yo1 > 0 && !this.Epu, this.ZGe.SetActive(t), t) && (e.fm1 !== undefined && (t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e.mm1), this.ZGe.SetCostText(e.fm1.toString(), t < e.fm1)), this.ZGe.SetText("RogueBattle_BuyRole_RefreshCost", e.So1, e.yo1), e.mm1 !== undefined)) {
      this.ZGe.SetCostItem(e.mm1);
    }
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (t.length !== 0 && t[0] === "FirstRole" && (t = this.c01?.UnsafeGetGridProxy(0)?.GetRoleUiItem(0))) {
      return [t, t];
    } else {
      return undefined;
    }
  }
}
exports.RogueBattleBuyRoleView = RogueBattleBuyRoleView;
//# sourceMappingURL=RogueBattleBuyRoleView.js.map