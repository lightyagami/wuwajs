"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingQuestView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const LevelGeneralCommons_1 = require("../../../../../../LevelGamePlay/LevelGeneralCommons");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../../Ui/Common/PopupCaptionItem");
const CommonItemSmallItemGrid_1 = require("../../../../../Common/ItemGrid/CommonItemSmallItemGrid");
const LevelSequencePlayer_1 = require("../../../../../Common/LevelSequencePlayer");
const ConfirmBoxController_1 = require("../../../../../ConfirmBox/ConfirmBoxController");
const ConfirmBoxDefine_1 = require("../../../../../ConfirmBox/ConfirmBoxDefine");
const HelpController_1 = require("../../../../../Help/HelpController");
const SkipTaskManager_1 = require("../../../../../SkipInterface/SkipTaskManager");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../../../Util/ScrollView/GenericScrollViewNew");
const FishingController_1 = require("../../FishingController");
const FishingDefine_1 = require("../../FishingDefine");
const FishingQuestItem_1 = require("./FishingQuestItem");
const FishingQuestShapePanel_1 = require("./FishingQuestShapePanel");
class FishingQuestView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Yc_ = -1;
    this.lqe = undefined;
    this.zc_ = undefined;
    this.H3e = undefined;
    this.Jc_ = undefined;
    this.YV_ = undefined;
    this.Zc_ = undefined;
    this.eu_ = 0;
    this.tu_ = 0;
    this.iu_ = "";
    this.Y9_ = false;
    this.EO_ = undefined;
    this.SPe = undefined;
    this.ru_ = () => {
      HelpController_1.HelpController.OpenHelpById(FishingDefine_1.SAILING_QUEST_HELP_ID);
    };
    this.Pwe = () => {
      switch (this.tu_) {
        case 0:
          FishingController_1.FishingController.RequestFishingEntrustAccept(this.Yc_, true, () => {
            FishingController_1.FishingController.RequestFishingEntrustTrace(this.Yc_);
          });
          break;
        case 3:
          var e;
          var t;
          var s = new Map();
          for ([e, t] of ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(this.Yc_).EntrustTarget) {
            var i = ModelManager_1.ModelManager.DockyardModel.GetItemListByItemId(e);
            i.sort((i, e) => i.Price - e.Price);
            for (const a of i) {
              let i = s.get(e);
              if (i && i?.length >= t) {
                break;
              }
              i = i || [];
              var r = {
                L8n: e,
                b9n: a.IncId,
                m9n: 1
              };
              i.push(r);
              s.set(e, i);
            }
          }
          var n;
          var h = [];
          for ([, n] of s) {
            h.push(...n);
          }
          FishingController_1.FishingController.RequestFishingEntrustHandInRequest(this.Yc_, h);
          break;
        case 4:
          break;
        case 5:
          var o = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(this.Yc_);
          SkipTaskManager_1.SkipTaskManager.RunByConfigId(o.AccessPath);
          break;
        case 1:
          ModelManager_1.ModelManager.FishingQuestModel.TraceFormClick = true;
          FishingController_1.FishingController.RequestFishingEntrustTrace(this.Yc_);
          break;
        case 2:
          FishingController_1.FishingController.RequestFishingEntrustTrace(0);
      }
    };
    this.wwe = () => {
      switch (this.eu_) {
        case 0:
          var e = ModelManager_1.ModelManager.FishingQuestModel.CurrentEntrusts.get(this.Yc_);
          if (e) {
            if (e === 2) {
              (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(260)).FunctionMap.set(2, () => {
                FishingController_1.FishingController.RequestFishingEntrustRefresh(this.Yc_);
              });
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
            } else {
              FishingController_1.FishingController.RequestFishingEntrustRefresh(this.Yc_);
            }
          }
          break;
        case 1:
          {
            var t;
            var s;
            var e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(this.Yc_);
            let i = false;
            if (e.EntrustType === 0 || e.EntrustType === 1) {
              for ([t, s] of e.EntrustTarget) {
                if (!t || !s) {
                  break;
                }
                if (ModelManager_1.ModelManager.DockyardModel.GetItemCountByItemId(t) < s) {
                  break;
                }
              }
              i = true;
            }
            var r = ModelManager_1.ModelManager.FishingQuestModel.CurrentEntrusts.get(this.Yc_);
            if (e.EntrustType === 2 || r === 2 || i) {
              (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(246)).FunctionMap.set(2, () => {
                FishingController_1.FishingController.RequestFishingEntrustTrace(0);
                FishingController_1.FishingController.RequestFishingEntrustAccept(this.Yc_, false);
              });
              ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(e);
              return;
            }
            FishingController_1.FishingController.RequestFishingEntrustTrace(0);
            FishingController_1.FishingController.RequestFishingEntrustAccept(this.Yc_, false);
            break;
          }
      }
    };
    this.ou_ = () => {
      var i = new FishingQuestItem_1.FishingQuestItem();
      i.OnClickTaskCallBack = this.nu_;
      return i;
    };
    this.jWt = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
    this.nu_ = (i, e, t) => {
      this.EO_?.();
      this.EO_ = t;
      if (this.Zc_ !== e) {
        this.Zc_?.SetToggleState(0, false);
      }
      this.Zc_ = e;
      this.Og(i);
      if (this.SPe?.GetCurrentSequence() !== "Switch") {
        this.SPe?.PlayLevelSequenceByName("Switch");
      } else {
        this.SPe?.ReplaySequenceByKey("Switch");
      }
    };
    this.su_ = (i, e) => {
      if (i) {
        this.Og(this.Yc_);
      } else {
        this.Esi(e ?? 0);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIButtonComponent], [10, UE.UIScrollViewWithScrollbarComponent], [11, UE.UIItem], [12, UE.UIButtonComponent], [13, UE.UIText], [14, UE.UIButtonComponent], [15, UE.UIText], [16, UE.UIItem], [17, UE.UIText], [18, UE.UIItem], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UIText], [22, UE.UIItem], [23, UE.UIItem], [24, UE.UIText], [25, UE.UIItem], [26, UE.UIItem], [27, UE.UIItem]];
    this.BtnBindInfo = [[9, this.ru_], [14, this.Pwe], [12, this.wwe]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FishingRefreshQuestView, this.su_);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FishingRefreshQuestView, this.su_);
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    await this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.lqe.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.lqe.SetHelpBtnActive(false);
    await this.lqe.SetCurrencyItemList([FishingDefine_1.FISHING_CURRENCY_ITEMID]);
    this.zc_ = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.ou_);
    this.H3e = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(10), this.jWt);
    this.Jc_ = new FishingQuestShapePanel_1.FishingQuestShapePanel();
    await this.Jc_.CreateThenShowByActorAsync(this.GetItem(5).GetOwner());
    this.YV_ = new FishingQuestShapePanel_1.FishingQuestShapePanel();
    await this.YV_.CreateThenShowByActorAsync(this.GetItem(20).GetOwner());
    this.iu_ = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(FishingDefine_1.FISHING_CURRENCY_ITEMID).IconSmall;
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnStart() {
    var i = ModelManager_1.ModelManager.FishingQuestModel.CurrentTraceEntrust;
    this.Esi(i);
  }
  OnBeforeShow() {
    if (this.Y9_) {
      this.Og(this.Yc_);
      var i = this.zc_?.GetScrollItemList();
      if (i) {
        for (const e of i) {
          e.RefreshChildItemStateAbout();
        }
      }
    } else {
      this.Y9_ = true;
    }
  }
  Esi(t = 0) {
    var i = [];
    let e = false;
    for (const r of ModelManager_1.ModelManager.FishingQuestModel.EntrustPool) {
      if (r !== FishingDefine_1.FISHING_QUICK_SAIL_POOL && (ModelManager_1.ModelManager.FishingQuestModel.GetPoolHasAnyEntrust(r) && i.push(r), ModelManager_1.ModelManager.FishingQuestModel.GetPoolHasAnyAcceptedEntrust(r))) {
        e = true;
      }
    }
    var s = i.length > 0;
    this.GetItem(18)?.SetUIActive(s);
    this.GetItem(19)?.SetUIActive(!s);
    if (!s) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(24), e ? "Fishing_EnrustEmptyState2" : "Fishing_EnrustEmptyState1");
    }
    this.zc_?.RefreshByData(i, () => {
      if (t) {
        for (const e of this.zc_?.GetScrollItemList()) {
          var i = e.HaveTargetTask(t);
          if (i > -1) {
            e.SelectFirstItem(i);
            return;
          }
        }
      }
      this.zc_?.GetScrollItemByIndex(0)?.SelectFirstItem();
    });
  }
  Og(i) {
    i = (this.Yc_ = i) === -1;
    this.GetItem(23).SetUIActive(!i);
    this.GetItem(25).SetUIActive(i);
    if (!i) {
      i = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(this.Yc_);
      if (i) {
        var e;
        var t;
        var s = [];
        for ([e, t] of i.EntrustReward) {
          var r = [{
            IncId: 0,
            ItemId: e
          }, t];
          s.push(r);
        }
        this.H3e?.RefreshByData(s);
        this.GetItem(26).SetUIActive(i.IsNight);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i.Name);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), FishingDefine_1.fishingEntrustTypeText[i.EntrustType]);
        this.zV_();
        this.zao();
      }
    }
  }
  zV_() {
    var i;
    var e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(this.Yc_);
    let t = 0;
    for ([i] of e.EntrustTarget) {
      if (++t === 1) {
        this.Jc_?.RefreshPanel(i);
      } else if (t === 2) {
        this.YV_?.SetUiActive(true);
        this.YV_?.RefreshPanel(i);
      }
    }
    if (t < 2) {
      this.YV_?.SetUiActive(false);
    }
    var s = e.EntrustDestination;
    if (s) {
      s = ConfigManager_1.ConfigManager.FishingConfig.GetFishingPortConfig(s);
      s = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(s.MarkId);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), s?.MarkTitle ?? "Fishing_AnyWharf");
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), "Fishing_AnyWharf");
    }
    var s = e.TargetDesText;
    if (e.TargetDesText) {
      let i = 0;
      for (var [r, n] of s) {
        i++;
        var h = e.EntrustTarget.get(r) ?? 0;
        var r = ModelManager_1.ModelManager.DockyardModel.GetItemCountByItemId(r);
        if (i === 1) {
          this.GetText(17).SetText(ConfigManager_1.ConfigManager.TextConfig.GetMultiText(n, "" + h) + " (" + Math.min(r, h) + "/" + h + ")");
          this.GetText(17).useChangeColor = h <= r;
        } else if (i === 2) {
          this.GetItem(22).SetUIActive(true);
          this.GetText(21).SetText(ConfigManager_1.ConfigManager.TextConfig.GetMultiText(n, "" + h) + " (" + Math.min(r, h) + "/" + h + ")");
          this.GetText(21).useChangeColor = h <= r;
        }
        if (i < 2) {
          this.GetItem(22).SetUIActive(false);
        }
      }
    } else {
      this.GetText(17).SetText("--");
    }
  }
  zao() {
    var i;
    var e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(this.Yc_);
    var t = ModelManager_1.ModelManager.FishingQuestModel.CurrentEntrusts.get(this.Yc_);
    this.GetItem(27).SetUIActive(false);
    if (t === 0) {
      this.GetItem(7).SetUIActive(true);
      i = LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(e.UnlockCondition);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), i ?? "");
      this.GetButton(12).RootUIComp.SetUIActive(false);
      this.GetButton(14).RootUIComp.SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(15), "FishingTagJumpToTech");
      this.tu_ = 5;
      i = ConfigManager_1.ConfigManager.SkipInterfaceConfig.GetAccessPathConfig(e.AccessPath);
      e = Number(i?.Val3 ?? 0);
      if (i && e) {
        i = ModelManager_1.ModelManager.FishingModel.GetTechNodeCanLevelUp(e);
        this.GetItem(27).SetUIActive(i);
        return;
      } else {
        return undefined;
      }
    }
    this.GetItem(7).SetUIActive(false);
    if (ModelManager_1.ModelManager.FishingModel.DockId <= 0) {
      this.GetButton(12)?.RootUIComp.SetUIActive(false);
      this.eu_ = 2;
      e = this.Yc_ === ModelManager_1.ModelManager.FishingQuestModel.CurrentTraceEntrust;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(15), e ? "FishingBtnCancelTrace" : "FishingBtnTrace");
      this.tu_ = e ? 2 : 1;
    } else {
      i = ModelManager_1.ModelManager.FishingQuestModel.GetEntrustsRefreshCost(this.Yc_);
      this.GetButton(12)?.RootUIComp.SetUIActive(i >= 0);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(13), "FishingRefreshEntrust", `<texture=${this.iu_},0.5/>${i}`);
      this.eu_ = 0;
      if (t === 1) {
        this.GetButton(14).RootUIComp.SetUIActive(true);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(15), "FishingBtnReceiving");
        this.tu_ = 0;
      } else {
        this.GetItem(16).SetUIActive(false);
        if (t === 2) {
          this.GetButton(14).RootUIComp.SetUIActive(true);
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(15), "FishingBtnFinishing");
          this.tu_ = 3;
        } else if (ModelManager_1.ModelManager.FishingQuestModel.CurrentTraceEntrust === this.Yc_) {
          this.GetButton(14).RootUIComp.SetUIActive(true);
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(15), "FishingBtnCancelTrace");
          this.tu_ = 2;
        } else if (t === 3) {
          if (ModelManager_1.ModelManager.FishingQuestModel.GetEntrustsTargetEnough(this.Yc_) || ModelManager_1.ModelManager.FishingQuestModel.CurrentTraceEntrust === this.Yc_) {
            this.GetButton(14).RootUIComp.SetUIActive(false);
            this.GetItem(16).SetUIActive(true);
            LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(15), "FishingBtnCanNotFinishing");
            this.tu_ = 4;
          } else {
            this.GetButton(14).RootUIComp.SetUIActive(true);
            LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(15), "FishingBtnTrace");
            this.tu_ = 1;
          }
        }
      }
    }
  }
}
exports.FishingQuestView = FishingQuestView;
//# sourceMappingURL=FishingQuestView.js.map