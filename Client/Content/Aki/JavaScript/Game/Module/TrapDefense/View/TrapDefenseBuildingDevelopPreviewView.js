"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBuildingDevelopPreviewView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const TrapDefenseBuildingDevelopDetailItem_1 = require("./Item/TrapDefenseBuildingDevelopDetailItem");
const TrapDefenseBuildingDevelopPreviewItem_1 = require("./Item/TrapDefenseBuildingDevelopPreviewItem");
class TrapDefenseBuildingDevelopPreviewView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.CaptionItem = undefined;
    this.ScrollView = undefined;
    this.LevelLayout = undefined;
    this.BtnUpgrade = undefined;
    this.ItemList = [];
    this.CurData = undefined;
    this.CanLevelUp = false;
    this.SPe = undefined;
    this.TXu = () => {
      if (this.CurData) {
        this.SPe?.StopCurrentSequence();
        this.SPe?.PlayLevelSequenceByName("SwitchL");
        let e = this.ItemList.indexOf(this.CurData);
        if (--e < 0) {
          e = this.ItemList.length - 1;
        }
        this.CurData = this.ItemList[e];
        this.UpdateDetailPanel();
      }
    };
    this.bXu = () => {
      if (this.CurData) {
        this.SPe?.StopCurrentSequence();
        this.SPe?.PlayLevelSequenceByName("SwitchR");
        let e = this.ItemList.indexOf(this.CurData);
        if (++e >= this.ItemList.length) {
          e = 0;
        }
        this.CurData = this.ItemList[e];
        this.UpdateDetailPanel();
      }
    };
    this.J2i = () => {
      this.CloseMe();
    };
    this.pXu = () => {
      if (this.CurData) {
        if (this.CanLevelUp) {
          ControllerHolder_1.ControllerHolder.TrapDefenseController.RequestTrapDefenseDevelopLevelUp(this.CurData.Id);
        } else {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("TrapDefense_Develop_NoEnoughGold");
        }
      }
    };
    this.azc = e => {
      if (e === this.CurData) {
        this.UpdateDetailPanel();
      }
    };
    this.k0d = () => {
      this.CanLevelUp = this.BtnUpgrade.RefreshButton(this.CurData);
    };
    this.RXu = () => new TrapDefenseBuildingDevelopPreviewItem_1.TrapDefenseDevelopPreviewLevelPointItem();
    this.abi = () => new TrapDefenseBuildingDevelopPreviewItem_1.TrapDefenseDevelopPreviewLevelInfoItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIArtText], [5, UE.UIHorizontalLayout], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIScrollViewWithScrollbarComponent], [9, UE.UIItem], [10, UE.UIButtonComponent], [11, UE.UIButtonComponent]];
    this.BtnBindInfo = [[10, this.TXu], [11, this.bXu]];
  }
  async OnBeforeStartAsync() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    var e = this.OpenParam;
    var i = e.Data;
    var t = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.GetDevelopTabByData(i);
    this.ItemList = t ? t.GetDataList() : [i];
    this.CurData = i;
    if (this.ItemList.length <= 1) {
      this.GetButton(10)?.RootUIComp.SetUIActive(false);
      this.GetButton(11)?.RootUIComp.SetUIActive(false);
    }
    var t = e.IsInDungeon;
    if (t) {
      this.GetItem(7).SetUIActive(false);
    } else {
      this.BtnUpgrade = new TrapDefenseBuildingDevelopDetailItem_1.TrapDefenseBuildingUpgradeItem();
      await this.BtnUpgrade.CreateThenShowByActorAsync(this.GetItem(7).GetOwner());
      this.BtnUpgrade.OnClickCb = this.pXu;
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrapDefenseOnDevelopUpdate, this.azc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrapDefenseOnBranchUpdate, this.k0d);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrapDefenseOnDevelopUpdate, this.azc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrapDefenseOnBranchUpdate, this.k0d);
  }
  OnStart() {
    this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.CaptionItem.SetCloseCallBack(this.J2i);
    this.LevelLayout = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(5), this.RXu);
    this.ScrollView = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(8), this.abi);
  }
  OnBeforeShow() {
    this.UpdateDetailPanel();
  }
  OnBeforeDestroy() {
    this.CaptionItem = undefined;
    this.ScrollView = undefined;
    this.LevelLayout = undefined;
    this.BtnUpgrade = undefined;
  }
  UpdateDetailPanel() {
    if (this.CurData) {
      var e = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.GetDevelopTabByData(this.CurData);
      if (e) {
        e.TempSelectedData = this.CurData;
      }
      this.GetItem(3)?.SetUIActive(this.CurData.GetIsUnlock());
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), this.CurData.GetName());
      this.SetTextureByPath(this.CurData.GetIconPath(), this.GetTexture(1));
      const n = this.CurData.GetLevel();
      this.GetArtText(4)?.SetText(n >= 10 ? "" + n : "0" + n);
      var i = this.CurData.GetMaxLevel();
      var t = [];
      var s = [];
      var h = ModelManager_1.ModelManager.TrapDefenseModel.DecomposeMachineId(this.CurData.Id);
      for (let e = 1; e <= i; e++) {
        t.push(e <= n);
        var r = {
          MachineType: h.MachineType,
          DataType: h.DataType,
          Level: e,
          Branch: 0
        };
        var r = ModelManager_1.ModelManager.TrapDefenseModel.ComposeMachineId(r);
        var r = {
          Id: e === n ? this.CurData.Id : r,
          IsCurLevel: e === n && this.CurData.GetIsUnlock()
        };
        s.push(r);
      }
      this.LevelLayout.RefreshByData(t, undefined, true);
      this.ScrollView.RefreshByData(s, () => {
        var e = this.ScrollView.GetItemByIndex(n - 1);
        this.ScrollView.ScrollTo(e);
      }, true);
      this.CanLevelUp = this.BtnUpgrade.RefreshButton(this.CurData);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapDefenseBuildingPreviewSelectUpdate, this.CurData);
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (!(e.length <= 0) && e[0] === "MachineUpgradePreview") {
      if (e.length < 2) {
        return;
      }
      e = parseInt(e[1]);
      if (e < 0 || e >= (this.ScrollView?.GetGenericLayout()?.GetDatas().length ?? 0)) {
        return;
      }
      e = this.ScrollView?.GetItemByIndex(e);
      if (e) {
        this.ScrollView?.ScrollTo(e);
        return [e, e];
      }
    }
  }
}
exports.TrapDefenseBuildingDevelopPreviewView = TrapDefenseBuildingDevelopPreviewView;
//# sourceMappingURL=TrapDefenseBuildingDevelopPreviewView.js.map