"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.QuestView = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  QuestTagById_1 = require("../../../../Core/Define/ConfigQuery/QuestTagById"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
  CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData"),
  CommonTabData_1 = require("../../Common/TabComponent/CommonTabData"),
  CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData"),
  TabComponentWithTitle_1 = require("../../Common/TabComponent/TabComponentWithTitle"),
  CommonTabItem_1 = require("../../Common/TabComponent/TabItem/CommonTabItem"),
  CommonTabItemBase_1 = require("../../Common/TabComponent/TabItem/CommonTabItemBase"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  GeneralLogicTreeController_1 = require("../../GeneralLogicTree/GeneralLogicTreeController"),
  HelpController_1 = require("../../Help/HelpController"),
  MapUtil_1 = require("../../Map/MapUtil"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  UiNavigationNewController_1 = require("../../UiNavigation/New/UiNavigationNewController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  QuestController_1 = require("../Controller/QuestController"),
  QuestDefine_1 = require("../QuestDefine"),
  FocusModeToggle_1 = require("./FocusModeToggle"),
  QuestTypeItem_1 = require("./QuestTypeItem"),
  QuestViewButton_1 = require("./QuestViewButton"),
  QuestViewStep_1 = require("./QuestViewStep"),
  ALL_QUEST_TYPE = 0,
  LEVEL_HELP = 49;
class QuestView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments), this.$au = new QuestViewButton_1.QuestViewButton, this.Wau = new QuestViewButton_1.QuestViewButton, this.j91 = new FocusModeToggle_1.FocusModeToggle, this.Nno = !1, this.Ono = !1, this.kno = 0, this.Fno = !1, this.Vno = [], this.Hno = [], this.jno = void 0, this.sOe = void 0, this.Wno = void 0, this.Ivt = void 0, this.Kno = 0, this.HGn = !1, this.QuestDescChangeLang = () => {
      var e;
      this.kno && (e = ModelManager_1.ModelManager.QuestNewModel.GetQuestDetails(this.kno), this.GetText(9).SetText(e))
    }, this.Oei = t => {
      this.Hno.forEach(e => {
        e.OnSelect(t)
      })
    }, this.Qno = e => {
      var t, i = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e);
      if (i) {
        if (this.Hno)
          for (const s of this.Hno) s.UpdateItem(i.TreeConfigId);
        this.kno && (t = ModelManager_1.ModelManager.QuestNewModel?.GetQuest(this.kno)) && t.TreeId === e && this.Xno(this.kno, !1)
      }
    }, this.aF1 = e => {
      if (e) {
        var t, i = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
        if (i) {
          if (this.Hno)
            for (const s of this.Hno) s.UpdateItem(i.Id);
          this.kno && (t = ModelManager_1.ModelManager.QuestNewModel?.GetQuest(this.kno)) && t.Id === e && this.Xno(this.kno, !1)
        }
      } else {
        if (this.Hno)
          for (const o of this.Hno) o.UpdateList();
        this.kno && ModelManager_1.ModelManager.QuestNewModel?.GetQuest(this.kno) && this.Xno(this.kno, !1)
      }
    }, this.$no = e => {
      this.Yno(e)
    }, this.OGn = e => {
      if (this.Hno) {
        for (const t of this.Hno) t.UpdateList();
        this.zno(0)
      }
    }, this.Jno = () => {
      this.GetItem(1).SetUIActive(!0), this.j91.Show()
    }, this.OnStartSequenceEvent = () => {
      var e = ModelManager_1.ModelManager.QuestNewModel;
      if (!this.Kno) {
        e = e.GetCurTrackedQuest();
        if (e) this.Kno = e.Id;
        else
          for (const i of this.Hno) {
            var t = i.GetDefaultItem();
            if (t) {
              this.Kno = t.QuestId;
              break
            }
          }
      }
      this.Yno(this.Kno), this.Nno = !0
    }, this.jdi = (e, t) => {
      return new CommonTabItem_1.CommonTabItem
    }, this.zno = e => {
      let t = !0,
        i = void 0;
      var s = this.Vno[e].MainId;
      for (const n of this.Hno) {
        var o = s === ALL_QUEST_TYPE,
          r = n.IsQuestEmpty();
        o ? (n.SetActive(!r), r || (t = !1, i = i || n)) : n.QuestType !== s ? n.SetActive(!1) : (n.SetActive(!r), t = r, i = n)
      }
      this.GetItem(15).SetUIActive(!t), this.GetItem(13).SetUIActive(t), this.GetItem(13).SetAnchorOffset(Vector2D_1.Vector2D.ZeroVector), Log_1.Log.CheckInfo() && Log_1.Log.Info("Quest", 18, "任务界面是否为空", ["是否为空", t]), this.Ono = !t, this.Ono ? this.Nno && this.Oei(i.GetDefaultItem()?.QuestId) : (this.Ono = !1, this.UiViewSequence.StopSequenceByKey("Sle"), this.GetItem(1).SetUIActive(!1))
    }, this.yqe = e => {
      var e = this.Vno[e],
        t = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTabIcon(e.MainId),
        e = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMainTypeConfig(e.MainId);
      return new CommonTabData_1.CommonTabData(t, new CommonTabTitleData_1.CommonTabTitleData(e?.MainTypeName ?? ""))
    }, this.H91 = e => {}, this.$91 = e => {
      switch (e) {
        case 1:
          QuestController_1.QuestNewController.RequestCancelQuestFocusMode(this.kno, () => {
            this.aF1(0)
          });
          break;
        case 0:
          var t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.kno);
          if (t.IsSuspend() && 2 === t.GetSuspendType()) return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("CannotEnterFocusModeWhenOnline");
          t = ModelManager_1.ModelManager.QuestNewModel.IsInFocusMode() ? 311 : 312, t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(t);
          t.FunctionMap.set(2, () => {
            QuestController_1.QuestNewController.RequestSetQuestFocusMode(this.kno, () => {
              this.aF1(0)
            })
          }), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t)
      }
    }, this._5e = () => {
      UiManager_1.UiManager.CloseView(this.Info.Name)
    }, this.eW1 = () => {
      this.Fno ? (QuestController_1.QuestNewController.RequestTrackQuest(this.kno, !1, 1), Log_1.Log.CheckInfo() && Log_1.Log.Info("Quest", 18, "取消任务追踪", ["任务Id", this.kno]), this.Qau(this.kno), this.eso()) : Log_1.Log.CheckError() && Log_1.Log.Error("Quest", 18, "QuestView.OnLeftButtonClick:当前处于未追踪状态，不可取消追踪", ["任务Id", this.kno])
    }, this.tW1 = () => {
      var e = ModelManager_1.ModelManager.QuestNewModel;
      const t = e.GetQuest(this.kno);
      if (t) {
        var i = e.GetQuestSpecialState(t);
        switch (Log_1.Log.CheckInfo() && Log_1.Log.Info("Quest", 49, "QuestView.OnClickTrack,specialState", ["specialState", i]), i) {
          case 2:
            QuestController_1.QuestNewController.SetVideoResourceDownloadTriggerId(this.kno), UiManager_1.UiManager.OpenView("ResDownLoadView");
            break;
          case 3:
            QuestController_1.QuestNewController.ConfirmQuestResourceRequest(t.Id, () => {
              this.aF1(t.Id)
            });
            break;
          case 4:
            e.IsInFocusMode() && !e.IsInFocusOnQuest(this.kno) ? ((s = new ConfirmBoxDefine_1.ConfirmBoxDataNew(322)).FunctionMap.set(2, () => {
              var e = ModelManager_1.ModelManager.QuestNewModel.GetCurFocusQuestId();
              QuestController_1.QuestNewController.RequestCancelQuestFocusMode(e, () => {
                GeneralLogicTreeController_1.GeneralLogicTreeController.RequestForcedOccupation(t.TreeId, this.W91)
              })
            }), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(s)) : ((s = new ConfirmBoxDefine_1.ConfirmBoxDataNew(162)).FunctionMap.set(2, () => {
              GeneralLogicTreeController_1.GeneralLogicTreeController.RequestForcedOccupation(t.TreeId, this.W91)
            }), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(s));
            break;
          case 8:
            var s = new ConfirmBoxDefine_1.ConfirmBoxDataNew(311);
            s.FunctionMap.set(2, () => {
              QuestController_1.QuestNewController.RequestSetQuestFocusMode(t.Id, () => {
                this.uhu() || this.aF1(0)
              })
            }), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(s);
            break;
          case 9:
            QuestController_1.QuestNewController.RequestAcceptFocusWaitQuest(t.Id, () => {
              this.aF1(t.Id)
            });
            break;
          case 10:
            s = new ConfirmBoxDefine_1.ConfirmBoxDataNew(322);
            s.FunctionMap.set(2, () => {
              var e = ModelManager_1.ModelManager.QuestNewModel.GetCurFocusQuestId();
              QuestController_1.QuestNewController.RequestCancelQuestFocusMode(e, this.W91)
            }), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(s);
            break;
          default:
            this.Fno ? this.uhu() : this.W91()
        }
      } else Log_1.Log.CheckError() && Log_1.Log.Error("Quest", 18, "点击追踪按钮时:找不到任务", ["任务Id", this.kno])
    }, this.W91 = (e = !0) => {
      var t = QuestController_1.QuestNewController.RequestTrackQuest(this.kno, !0, 1);
      switch (Log_1.Log.CheckInfo() && Log_1.Log.Info("Quest", 49, "QuestView.点击追踪按钮时:发送追踪请求至后端", ["任务Id", this.kno], ["追踪结果", t]), t) {
        case 1:
          return void(Log_1.Log.CheckError() && Log_1.Log.Error("Quest", 18, "QuestView.点击追踪按钮时:找不到任务", ["任务Id", this.kno]));
        case 2:
          Log_1.Log.CheckInfo() && Log_1.Log.Info("Quest", 18, "QuestView.不允许强制切出", ["任务Id", this.kno]);
          var i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Task_NoSwitch_Tips");
          return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(i);
        case 3:
          return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("FollowQuestStepGuide");
        case 4:
          return void(Log_1.Log.CheckError() && Log_1.Log.Error("Quest", 18, "QuestView.专注模式下不允许切换任务追踪", ["newQuestId", this.kno]))
      }
      if (e && this.uhu()) return;
      t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.kno);
      this.Qau(t.Id), this.eso()
    }, this.K91 = () => {
      var e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.kno);
      if (e) {
        var t = e.GetCurrentActiveChildQuestNodes();
        if (t && 0 !== t.length) {
          for (const o of t) {
            var i = e.GetDefaultMark(o.NodeId);
            if (i) {
              var s = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
              if (1 === MapUtil_1.MapUtil.GetDungeonsRelation(s, e.DungeonId)) {
                s = MapUtil_1.MapUtil.GetTrackDistanceByMarkId(i);
                if (!s) continue;
                if (s < (CommonParamById_1.configCommonParamById.GetIntConfig("QuestTrackNeedOpenWordMapDistance") ?? 50)) return UiManager_1.UiManager.ResetToBattleView(), !0
              }
              const r = {
                MarkType: 12,
                MarkId: i,
                IsNotFocusTween: !0,
                OpenFogId: 0
              };
              return UiManager_1.UiManager.GetViewByName("WorldMapView") ? UiManager_1.UiManager.CloseViewAsync("WorldMapView").then(() => {
                UiManager_1.UiManager.OpenView("WorldMapView", r, () => {
                  UiManager_1.UiManager.CloseView("QuestView")
                })
              }) : UiManager_1.UiManager.OpenView("WorldMapView", r, () => {
                UiManager_1.UiManager.CloseView("QuestView")
              }), !0
            }
          }
          Log_1.Log.CheckError() && Log_1.Log.Error("Quest", 18, "QuestView.点击Go按钮时:找不到任务标记id", ["任务Id", this.kno])
        } else Log_1.Log.CheckError() && Log_1.Log.Error("Quest", 18, "QuestView.点击Go按钮时:找不到任务节点", ["任务Id", this.kno])
      } else Log_1.Log.CheckError() && Log_1.Log.Error("Quest", 18, "QuestView.点击Go按钮时:找不到任务", ["任务Id", this.kno]);
      return !1
    }, this.tso = () => {
      if (this.kno) {
        var e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.kno);
        if (e)
          if (e.IsSuspend()) {
            var t = e.GetOccupations();
            UiManager_1.UiManager.OpenView("QuestLockPreview", t)
          } else if (e.IsQuestCanPreShow()) HelpController_1.HelpController.OpenHelpById(LEVEL_HELP);
        else if (e.IsQuestHasRecommendPreQuest()) {
          t = e.GetRecommendPreQuest();
          if (t && 0 !== t.length)
            for (const s of t) {
              var i = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(s);
              if (0 === i) {
                ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("QuestRecommendAccept");
                break
              }
              if (3 !== i) {
                this.Yno(s);
                break
              }
            }
        }
      }
    }, this.Pz1 = () => {
      var e = ModelManager_1.ModelManager.QuestReviewModel.GetQuestEntryDataByQuestId(this.kno);
      e && ControllerHolder_1.ControllerHolder.QuestReviewController.OpenQuestReview(e.Id)
    }, this.Xno = (e, t) => {
      QuestController_1.QuestNewController.RedDotRequest(e, 0), this.kno = e, this.Nno && t && this.Ono && this.UiViewSequence.PlaySequencePurely("Sle");
      t = ModelManager_1.ModelManager.QuestNewModel, this.GetText(7).SetText(t.GetQuestName(e)), this.GetText(9).SetText(t.GetQuestDetails(e)), this.Qau(e), this.oso(e), this.rso(e), this.$Ma(e), this.j91.SetToggleState(t.IsInFocusOnQuest(this.kno)), t = ModelManager_1.ModelManager.QuestReviewModel.GetQuestEntryDataByQuestId(e);
      this.GetButton(30).RootUIComp.SetUIActive(!!t && t.ShouldShow)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIText],
      [8, UE.UIItem],
      [9, UE.UIText],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIText],
      [13, UE.UIItem],
      [14, UE.UIText],
      [15, UE.UIItem],
      [16, UE.UIButtonComponent],
      [17, UE.UIItem],
      [18, UE.UIScrollViewWithScrollbarComponent],
      [19, UE.UIItem],
      [20, UE.UISprite],
      [21, UE.UIItem],
      [22, UE.UISprite],
      [23, UE.UISprite],
      [24, UE.UIItem],
      [25, UE.UISprite],
      [26, UE.UIText],
      [27, UE.UIItem],
      [28, UE.UIItem],
      [29, UE.UIItem],
      [30, UE.UIButtonComponent]
    ], this.BtnBindInfo = [
      [0, this._5e],
      [16, this.tso],
      [30, this.Pz1]
    ]
  }
  async OnBeforeStartAsync() {
    this.GetItem(4).SetUIActive(!1), this.GetItem(11).SetUIActive(!1), this.GetItem(6).SetUIActive(!1), this.GetText(14).SetUIActive(!0), this.GetItem(1).SetUIActive(!1), this.GetItem(17).SetUIActive(!1), this.UiViewSequence.AddSequenceStartEvent("Start", this.OnStartSequenceEvent), this.UiViewSequence.AddSequenceStartEvent("ShowView", this.OnStartSequenceEvent), this.UiViewSequence.AddSequenceStartEvent("Sle", this.Jno), this.Wno = [], this.sOe = [], this.Kno = this.OpenParam, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnQuestRedDotStateChange, 0), this.nso(), await this.sso(), await this.$au.CreateByActorAsync(this.GetItem(28).GetOwner(), this.eW1), this.$au.SetButtonText("InstanceDungeonEntranceCancelTrack", !0), this.$au.Hide(), await this.Wau.CreateByActorAsync(this.GetItem(2).GetOwner(), this.tW1), this.Wau.Hide(), await this.j91.CreateByActorAsync(this.GetItem(29).GetOwner()), this.j91.BindToggleCallback(this.H91, this.$91), this.j91.Hide()
  }
  OnBeforeDestroy() {
    if (this.Ivt) {
      var e;
      for ([, e] of this.Ivt?.GetTabItemMap()) e.Clear();
      this.Ivt.Destroy(), this.Ivt = void 0
    }
    if (this.Vno = void 0, this.Hno) {
      for (const t of this.Hno) t.Destroy();
      this.Hno = void 0
    }
    if (this.sOe) {
      for (const i of this.sOe) i.Destroy();
      this.sOe = void 0
    }
    this.jno = void 0
  }
  OnTick(e) {
    if (this.Hno)
      for (const t of this.Hno) t.OnTick(e)
  }
  nso() {
    const t = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.MapConfigId;
    var e = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeConfigs()?.filter(e => {
        return !!e.IsShowInQuestPanel || !!t && void 0 !== e.MapId.find(e => e === t)
      }),
      i = (e.sort((e, t) => {
        e = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMainTypeConfig(e.MainId), t = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMainTypeConfig(t.MainId);
        return e && t ? e.SortValue - t.SortValue : 0
      }), this.Vno.length = 0, new Map);
    for (const n of e) {
      var s, o, r = n.MainId;
      i.get(r) || (i.set(r, !0), s = this.GetItem(10), s = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(17), s), (o = new QuestTypeItem_1.QuestTypeItem).Init(s, r, this.Oei), this.Hno.push(o), 7 === r && o.IsQuestEmpty()) || this.Vno.push(n)
    }
  }
  Yno(e) {
    if (e) {
      const t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
      if (t) {
        this.kno = t.Id;
        e = this.Hno.find(e => e.QuestType === t.MainTypeId);
        if (e) {
          const i = e.GetQuestItem(t.Id);
          if (i) {
            this.HGn = !0;
            const s = this.GetScrollViewWithScrollbar(18);
            s && s.OnLateUpdate.Bind(e => {
              TimerSystem_1.TimerSystem.Next(() => {
                this.HGn && s?.IsValid() && (s.ScrollTo(i.GetRootItem()), this.Oei(this.kno), this.Ohl(i.GetTaskToggleItem())), this.HGn = !1
              })
            })
          }
        }
      } else this.kno = QuestDefine_1.INVALID_QUEST_ID
    }
  }
  Ohl(e) {
    TimerSystem_1.TimerSystem.Next(() => {
      UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForView(e, !0)
    })
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UpdateQuestDetails, this.Xno), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GeneralLogicTreeSuspend, this.Qno), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GeneralLogicTreeCancelSuspend, this.Qno), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnNavigationQuest, this.$no), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActivityQuestCountdownEnd, this.OGn), this.GetText(9).OnSelfLanguageChange.Bind(this.QuestDescChangeLang), ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlink(this.GetText(9), 1, 1)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UpdateQuestDetails, this.Xno), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GeneralLogicTreeSuspend, this.Qno), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GeneralLogicTreeCancelSuspend, this.Qno), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnNavigationQuest, this.$no), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ActivityQuestCountdownEnd, this.OGn), this.GetText(9).OnSelfLanguageChange.Unbind(), ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(this.GetText(9))
  }
  async sso() {
    const t = new CommonTabComponentData_1.CommonTabComponentData(this.jdi, this.zno, this.yqe);
    this.Ivt = new TabComponentWithTitle_1.TabComponentWithTitle(this.GetItem(8), t);
    var i = new Array;
    for (let e = 0; e < this.Vno.length; e++) {
      const t = new CommonTabItemBase_1.CommonTabItemData;
      t.Index = e, t.Data = this.Ivt.GetTabComponentData(e), t.RedDotName = "QuestTab", t.RedDotUid = this.Vno[e].MainId, i.push(t)
    }
    await this.Ivt.RefreshTabItemByDataAsync(i), this.Ivt.SelectToggleByIndex(ALL_QUEST_TYPE)
  }
  uhu() {
    var e = this.K91();
    return e || (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("FollowQuestStepGuide"), Log_1.Log.CheckError() && Log_1.Log.Error("Quest", 49, "QuestView.点击追踪按钮时:找不到默认的地图标记", ["任务Id", this.kno])), e
  }
  eso() {
    for (const e of this.Hno) e.UpdateListTrackState()
  }
  Qau(i) {
    var s = ModelManager_1.ModelManager.QuestNewModel,
      o = s.GetQuest(i);
    if (o) {
      var r = this.GetText(14),
        n = this.GetItem(21),
        e = this.GetSprite(20),
        a = this.GetButton(16),
        h = this.GetSprite(22),
        _ = (o.FocusSetting?.CanOpenFocusMode ?? !1) && o.IsProgressing;
      let t = void 0;
      switch (this.Fno = this.kno === ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.Id, this.$au.SetActive(this.Fno), this.Fno ? this.Wau.SetButtonText("PrefabTextItem_2843016624_Text", !1) : this.Wau.SetButtonText("InstanceDungeonEntranceTrack", !0), s.GetQuestSpecialState(o)) {
        case 4:
          r.SetText(o.GetSuspendText() ?? ""), t = s.GetQuestLockIconPath(i);
          var l = 1 === o.GetSuspendType(),
            u = (a.GetRootComponent().SetUIActive(l), ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_ComIconQuestion")),
            u = (this.aso(u), CommonParamById_1.configCommonParamById.GetStringConfig("TaskUnableStripColor") ?? "");
          h.SetColor(UE.Color.FromHex(u)), this.Wau.SetActive(l), this.j91.SetActive(_), n.SetUIActive(!0);
          break;
        case 5:
          r.SetText(ConfigManager_1.ConfigManager.TextConfig.GetTextById("SuspendByOnline") ?? "SuspendByOnline"), t = s.GetQuestLockIconPath(i), a.GetRootComponent().SetUIActive(!1);
          u = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_ComIconQuestion"), l = (this.aso(u), CommonParamById_1.configCommonParamById.GetStringConfig("TaskUnableStripColor") ?? "");
          h.SetColor(UE.Color.FromHex(l)), this.Wau.SetActive(!1), this.j91.SetActive(_), n.SetUIActive(!0);
          break;
        case 7:
          r.SetText(o.GetRefOccupiedEntityText() ?? ""), t = s.GetQuestLockIconPath(i), a.GetRootComponent().SetUIActive(!1);
          u = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_ComIconQuestion"), l = (this.aso(u), CommonParamById_1.configCommonParamById.GetStringConfig("TaskUnableStripColor") ?? "");
          h.SetColor(UE.Color.FromHex(l)), this.Wau.SetActive(!1), this.j91.SetActive(!1), n.SetUIActive(!0);
          break;
        case 1: {
          r.SetText(s.GetShowQuestConditionDescribe(i) ?? ""), t = s.GetQuestLockIconPath(i);
          u = s.GetUnlockConditions(i);
          let e = void 0;
          l = void 0 !== (e = u ? u.find(e => "ExploreLevel" === e.Type) : e), u = (a.GetRootComponent().SetUIActive(l), ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_ComIconQuestion")), l = (this.aso(u), CommonParamById_1.configCommonParamById.GetStringConfig("TaskUnableStripColor") ?? "");
          h.SetColor(UE.Color.FromHex(l)), this.Wau.SetActive(!1), this.j91.SetActive(!1), n.SetUIActive(!0);
          break
        }
        case 2:
          u = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("DownloadResource") ?? "DownloadResource", l = (r.SetText(u), CommonParamById_1.configCommonParamById.GetStringConfig("TaskUnableStripColor") ?? "");
          h.SetColor(UE.Color.FromHex(l)), this.Wau.SetButtonText("GoToDownload", !1), this.Wau.SetActive(!0), a.GetRootComponent().SetUIActive(!1), this.j91.SetActive(!1), n.SetUIActive(!0);
          break;
        case 3:
          this.Wau.SetActive(!0), this.Wau.SetButtonText("GoOnTask", !1), n.SetUIActive(!1), this.j91.SetActive(!1);
          break;
        case 6: {
          u = o.GetRecommendPreQuest();
          let e = "";
          u?.length && (e = s.GetQuest(u[0])?.Name ?? ""), LguiUtil_1.LguiUtil.SetLocalText(r, "QuestRecommendTip", e), t = s.GetQuestLockIconPath(i);
          l = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_IconArrive"), u = (this.aso(l), CommonParamById_1.configCommonParamById.GetStringConfig("TaskRemindStripColor") ?? "");
          h.SetColor(UE.Color.FromHex(u)), this.Wau.SetActive(!0), this.j91.SetActive(_), n.SetUIActive(!0);
          break
        }
        case 8:
          l = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Task_Focus_Tips01") ?? "Task_Focus_Tips01", u = (r.SetText(l), CommonParamById_1.configCommonParamById.GetStringConfig("TaskUnableStripColor") ?? "");
          h.SetColor(UE.Color.FromHex(u)), this.Wau.SetActive(!1), a.GetRootComponent().SetUIActive(!1), this.j91.SetActive(!1), n.SetUIActive(!0);
          break;
        case 9:
          this.Wau.SetActive(!0), this.Wau.SetButtonText("Task_Focus_Tips02", !1), this.j91.SetActive(!1), n.SetUIActive(!1);
          break;
        default:
          n.SetUIActive(!1), this.Wau.SetActive(!0), this.j91.SetActive(_)
      }
      t && this.SetSpriteByPath(t, e, !0)
    }
  }
  aso(e) {
    var t = this.GetSprite(23);
    if (t) {
      const i = t.GetOwner().GetComponentByClass(UE.UISpriteTransition.StaticClass());
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.LGUISpriteData_BaseObject, (e, t) => {
        e && e.IsValid() ? i.SetAllTransitionSprite(e) : Log_1.Log.CheckError() && Log_1.Log.Error("Quest", 18, "设置Sprite失败，图片加载失败", ["图片路径", t])
      }, 102)
    }
  }
  async oso(e) {
    var t = this.GetItem(6),
      e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
    e && e.HasBehaviorTree() ? (t.SetUIActive(!0), this.jno || (this.jno = new QuestViewStep_1.QuestViewStep(0, -1), await this.jno.CreateThenShowByActorAsync(t.GetOwner(), 1)), e = e.Tree?.GetBlackBoard()?.CreateShowData(!1), await this.jno.Update(e), this.jno.SetActive(!0)) : t.SetUIActive(!1)
  }
  rso(e) {
    this.Wno.splice(0, this.Wno.length);
    var e = ModelManager_1.ModelManager.QuestNewModel.GetDisplayRewardInfo(e),
      t = this.GetItem(19);
    if (e && 0 !== e.length) {
      t.SetUIActive(!0), e && (this.Wno = e);
      const o = this.GetItem(4);
      for (const i of this.sOe) i.SetActive(!1);
      this.Wno.forEach((e, t) => {
        let i = void 0;
        var s;
        t > this.sOe.length - 1 ? (s = LguiUtil_1.LguiUtil.CopyItem(o, o.GetParentAsUIItem()), (i = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid).Initialize(s.GetOwner()), this.sOe.push(i)) : i = this.sOe[t], i.RefreshByConfigId(e.ItemId, e.ItemCount), i.SetActive(!0)
      })
    } else t.SetUIActive(!1)
  }
  $Ma(e) {
    var t, i, s, e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
    e && (t = this.GetItem(24)) && (e.TagId ? (i = QuestTagById_1.configQuestTagById.GetConfig(e.TagId)) ? ((s = this.GetSprite(25)) && (this.SetSpriteByPath(i.BgSpritePath, s, !1), s.SetUIActive(!0)), (s = this.GetText(26)) && (LguiUtil_1.LguiUtil.SetLocalTextNew(s, i.Text), s.SetUIActive(!0)), t.SetUIActive(!0)) : Log_1.Log.CheckError() && Log_1.Log.Error("Quest", 18, "找不到任务标签配置", ["questId", e.Id], ["TagId", e.TagId]) : t.SetUIActive(!1))
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (!(1 < e.length || isNaN(Number(e[0])))) {
      var t = Number(e[0]);
      const o = ModelManager_1.ModelManager.QuestNewModel.GetQuest(t);
      if (o) {
        var i = this.Hno.find(e => e.QuestType === o.Type);
        if (i) {
          var s = i.GetQuestItem(t);
          if (s) return this.kno !== QuestDefine_1.INVALID_QUEST_ID && this.kno ? i.GetQuestItem(this.kno)?.SetSelected(!1) : i.GetDefaultItem().SetSelected(!1), i.GetQuestItem(t).SetSelected(!0), this.GetScrollViewWithScrollbar(18).ScrollTo(i.GetRootItem()), this.HGn = !1, [t = s.GetTaskToggleItem(), t]
        }
      }
    }
    Log_1.Log.CheckError() && Log_1.Log.Error("Guide", 53, "聚焦引导configParams项配置有误", ["configParams", e])
  }
  GetGuideScrollViewToLock() {
    return this.GetScrollViewWithScrollbar(18)
  }
}
exports.QuestView = QuestView;
//# sourceMappingURL=QuestView.js.map