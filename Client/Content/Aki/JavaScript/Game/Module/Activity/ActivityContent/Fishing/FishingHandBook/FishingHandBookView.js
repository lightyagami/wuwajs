"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingHandBookView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const LocalStorageDefine_1 = require("../../../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const FilterSortEntrance_1 = require("../../../../Common/FilterSort/FilterSortEntrance");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const ScrollingTipsController_1 = require("../../../../ScrollingTips/ScrollingTipsController");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const LoopScrollView_1 = require("../../../../Util/ScrollView/LoopScrollView");
const FishingDefine_1 = require("../FishingDefine");
const FishingQuestShapePanel_1 = require("../FishingQuest/View/FishingQuestShapePanel");
const FishingHandBookDesItem_1 = require("./FishingHandBookDesItem");
const FishingHandBookItem_1 = require("./FishingHandBookItem");
const FishingHandBookTagItem_1 = require("./FishingHandBookTagItem");
class FishingHandBookView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ETt = 0;
    this.qGe = [];
    this.lqe = undefined;
    this.XA_ = undefined;
    this.YA_ = undefined;
    this.zA_ = undefined;
    this.JA_ = undefined;
    this.zji = undefined;
    this.ZA_ = undefined;
    this.eP_ = undefined;
    this.tP_ = 0;
    this.SPe = undefined;
    this.iP_ = () => {
      var i = new FishingHandBookItem_1.FishingHandBookItem();
      i.OnClickToggleCallBack = this.rP_;
      return i;
    };
    this.oP_ = () => {
      return new FishingHandBookTagItem_1.FishingHandBookTagItem();
    };
    this.nP_ = () => {
      return new FishingHandBookDesItem_1.FishingHandBookDesItem();
    };
    this.sP_ = () => {
      var i = !ModelManager_1.ModelManager.FishingModel.FishingItemHandBookDataMap.get(this.ETt);
      if (i && !ModelManager_1.ModelManager.FishingModel.FishingItemHandBookUnlockTraceList.includes(this.ETt)) {
        if (this.tP_ > 0) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Fishing_VariationItemCannotTrace");
        } else {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Fishing_NormalItemCannotTrace");
        }
        return;
      }
      for (const e of ConfigManager_1.ConfigManager.FishingConfig.GetFishingItemConfig(this.ETt).Tech) {
        if (e === FishingDefine_1.FISHING_CAGE_TECH) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Fishing_CageDetect");
          return;
        }
      }
      i = ConfigManager_1.ConfigManager.FishingConfig.GetFishingItemConfig(this.ETt).Relation ?? 0;
      i = i > 0 ? i : this.ETt;
      ModelManager_1.ModelManager.FishingQuestModel.TraceItem(i);
    };
    this.rP_ = (i, e, t) => {
      this.zji?.SetToggleState(0, false);
      this.zji = e;
      this.Og(i);
      this.YA_.SelectGridProxy(t, false);
      this.SPe?.PlayLevelSequenceByName("Switch");
    };
    this.aP_ = (i, e) => {
      let t = 0;
      for (const s of this.qGe) {
        if (s.Id === i) {
          break;
        }
        t++;
      }
      this.YA_.ScrollToGridIndex(t);
      this.YA_.SelectGridProxy(t, true);
    };
    this.Z6e = i => {
      const e = new Array();
      this.qGe = [];
      for (const s of i) {
        var t = s;
        e.push(t.Id);
        this.qGe.push(t);
      }
      if (e.length > 0) {
        this.YA_?.RefreshByData(e, false, () => {
          this.YA_?.SelectGridProxy(0, true);
          this.Og(e[0]);
        });
        this.GetItem(4).SetUIActive(false);
        this.GetLoopScrollViewComponent(1).RootUIComp.SetUIActive(true);
        this.GetItem(19).SetUIActive(true);
      } else {
        this.GetItem(4).SetUIActive(true);
        this.GetLoopScrollViewComponent(1).RootUIComp.SetUIActive(false);
        this.GetItem(19).SetUIActive(false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UILoopScrollViewComponent], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIText], [10, UE.UIItem], [9, UE.UIItem], [11, UE.UIText], [12, UE.UIItem], [13, UE.UIText], [15, UE.UIVerticalLayout], [14, UE.UIHorizontalLayout], [16, UE.UIButtonComponent], [17, UE.UIItem], [18, UE.UIText], [19, UE.UIItem], [20, UE.UIText]];
    this.BtnBindInfo = [[16, this.sP_]];
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    await this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.lqe.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.lqe.SetHelpBtnActive(false);
    this.XA_ = new FishingQuestShapePanel_1.FishingQuestShapePanel();
    await this.XA_.CreateThenShowByActorAsync(this.GetItem(6).GetOwner());
    this.YA_ = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(1), this.GetItem(2).GetOwner(), this.iP_);
    this.zA_ = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(14), this.oP_);
    this.JA_ = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(15), this.nP_);
    this.ZA_ = new FishingHandBookItem_1.FishingHandBookItem();
    await this.ZA_.CreateThenShowByActorAsync(this.GetItem(9).GetOwner());
    this.ZA_.OnClickToggleCallBack = this.aP_;
    this.eP_ = new FilterSortEntrance_1.FilterSortEntrance(this.GetItem(5), this.Z6e);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnStart() {
    var i = ModelManager_1.ModelManager.FishingModel.GetFishingItemList();
    this.eP_?.UpdateData(37, i);
    this.GetText(3).SetText(ModelManager_1.ModelManager.FishingModel.UnLockFishingItemCount + "/" + ModelManager_1.ModelManager.FishingModel.AllFishingItemCount);
  }
  Og(i) {
    this.ETt = i;
    var e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingItemConfig(i);
    if (e.Tech?.length > 0) {
      this.zA_?.RefreshByData(e.Tech);
      this.GetItem(12).SetUIActive(true);
    } else {
      this.GetItem(12).SetUIActive(false);
    }
    if ((this.tP_ = 0) < e.Relation) {
      this.tP_ = e.Relation;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(20), "FishingRelationText");
      this.ZA_?.Refresh(this.tP_, false, 0);
    } else if (e.ChildRelation > 0) {
      this.tP_ = e.ChildRelation;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(20), "FishingChildRelationText");
      this.ZA_?.Refresh(this.tP_, false, 0);
    }
    this.GetItem(10).SetUIActive(this.tP_ > 0);
    var t = !ModelManager_1.ModelManager.FishingModel.FishingItemHandBookDataMap.get(i);
    var s = t ? MultiTextLang_1.configMultiTextLang.GetLocalTextNew("FishingLockItemName") : MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), "Fishing_ArchiveTitle", e.IllustratedNum + "", s);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), t ? "FishingLockItemName" : e.Desc);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), t ? "FishingItemLockState" : "FishingItemUnlockState");
    this.XA_?.RefreshPanel(i, !t);
    this.hP_(i);
    var s = ModelManager_1.ModelManager.FishingModel.FishingItemHandBookUnlockTraceList.includes(this.ETt);
    var i = this.GetButton(16);
    if (!t || s) {
      i.RootUIComp.SetUIActive(true);
      i.SetSelfInteractive(true);
      this.GetItem(17).SetUIActive(false);
    } else if (e.DetectionUnlockCondition) {
      i.RootUIComp.SetUIActive(false);
      this.GetItem(17).SetUIActive(true);
      t = ConfigManager_1.ConfigManager.ConditionConfig?.GetConditionGroupConfig(e.DetectionUnlockCondition);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(18), t.HintText);
    } else {
      i.RootUIComp.SetUIActive(true);
      i.SetSelfInteractive(false);
      i.SetCanClickWhenDisable(true);
      this.GetItem(17).SetUIActive(false);
    }
    this.dH_();
  }
  hP_(i) {
    var e;
    var t;
    var s;
    var n = ConfigManager_1.ConfigManager.FishingConfig.GetFishingItemConfig(i);
    var a = [];
    if (n.Area?.length > 0) {
      t = n.Area[0];
      t = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(t);
      t = ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(t.Title);
      a.push({
        DesText: "Fishing_Area",
        DataText: t
      });
    }
    if (n.Time > 0) {
      t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(FishingDefine_1.fishingItemTimeText[n.Time]) ?? "";
      a.push({
        DesText: "Fishing_Time",
        DataText: t
      });
    }
    if (n.SizeWeight.length > 0) {
      if (!(t = ModelManager_1.ModelManager.FishingModel.FishingItemHandBookDataMap.get(i))) {
        e = {
          DesText: "Fishing_MaxSize",
          DataText: s = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("FishingLockItemName") ?? ""
        };
        a.push({
          DesText: "Fishing_MinSize",
          DataText: s
        });
        a.push(e);
      } else {
        s = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Fishing_SizeDes") ?? "";
        i = {
          DesText: "Fishing_MinSize",
          DataText: t.MinSize + s,
          IsSliver: (e = ModelManager_1.ModelManager.FishingModel.GetSizeIsGoldSize(i)).includes(0)
        };
        t = {
          DesText: "Fishing_MaxSize",
          DataText: t.MaxSize + s,
          IsGolden: e.includes(2)
        };
        a.push(i);
        a.push(t);
      }
    }
    if (n.Reputation > 0) {
      s = {
        DesText: "Fishing_AddCount",
        DataText: "+" + n.Reputation
      };
      a.push(s);
    }
    this.GetVerticalLayout(15).RootUIComp.SetUIActive(a.length > 0);
    this.JA_?.RefreshByData(a);
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    if (i.length !== 0 && i[0] === "FishingHandBookItem") {
      if (i.length !== 2) {
        return;
      }
      var i = Number(i[1]);
      if (i >= 0 && i < this.qGe.length) {
        if (i = this.YA_?.GetGridByDisplayIndex(i)) {
          return [i, i];
        } else {
          return undefined;
        }
      }
    }
  }
  dH_() {
    if (ModelManager_1.ModelManager.FishingModel.FishingItemHandBookDataMap.get(this.ETt)) {
      ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.FishingHandBookItemRecord, this.ETt);
      ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(LocalStorageDefine_1.ELocalStoragePlayerKey.FishingHandBookItemRecord);
    }
  }
}
exports.FishingHandBookView = FishingHandBookView;
//# sourceMappingURL=FishingHandBookView.js.map