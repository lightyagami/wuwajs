"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const QuestTagById_1 = require("../../../../Core/Define/ConfigQuery/QuestTagById");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid");
const CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../../Common/TabComponent/TabComponentWithCaptionItem");
const CommonTabItem_1 = require("../../Common/TabComponent/TabItem/CommonTabItem");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const GeneralLogicTreeController_1 = require("../../GeneralLogicTree/GeneralLogicTreeController");
const HelpController_1 = require("../../Help/HelpController");
const LogReportDefine_1 = require("../../LogReport/LogReportDefine");
const MapUtil_1 = require("../../Map/MapUtil");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const UiNavigationNewController_1 = require("../../UiNavigation/New/UiNavigationNewController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const QuestController_1 = require("../Controller/QuestController");
const QuestDefine_1 = require("../QuestDefine");
const QuestUtil_1 = require("../QuestUtil");
const FocusModeToggle_1 = require("./FocusModeToggle");
const QuestTypeItem_1 = require("./QuestTypeItem");
const QuestViewButton_1 = require("./QuestViewButton");
const QuestViewStep_1 = require("./QuestViewStep");
const ALL_QUEST_TYPE = 0;
const LEVEL_HELP = 49;
class QuestView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.Hmu = new QuestViewButton_1.QuestViewButton();
    this.$mu = new QuestViewButton_1.QuestViewButton();
    this.AH1 = new FocusModeToggle_1.FocusModeToggle();
    this.Nno = false;
    this.Ono = false;
    this.kno = 0;
    this.Fno = false;
    this.Vno = [];
    this.Hno = [];
    this.jno = undefined;
    this.sOe = undefined;
    this.Wno = undefined;
    this.Ivt = undefined;
    this.Kno = 0;
    this.HGn = false;
    this.QuestDescChangeLang = () => {
      var e;
      if (this.kno) {
        e = ModelManager_1.ModelManager.QuestNewModel.GetQuestDetails(this.kno);
        this.GetText(8).SetText(e);
      }
    };
    this.Oei = t => {
      this.Hno.forEach(e => {
        e.OnSelect(t);
      });
    };
    this.$Ct = (e, t) => {
      if (e === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest && t && ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.TreeId === t) {
        this.qF1(0);
      }
    };
    this.Qno = e => {
      var t;
      var i = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e);
      if (i) {
        if (this.Hno) {
          for (const s of this.Hno) {
            s.UpdateItem(i.TreeConfigId);
          }
        }
        if (this.kno && (t = ModelManager_1.ModelManager.QuestNewModel?.GetQuest(this.kno)) && t.TreeId === e) {
          this.Xno(this.kno, false);
        }
      }
    };
    this.qF1 = e => {
      if (e) {
        var t;
        var i = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
        if (i) {
          if (this.Hno) {
            for (const s of this.Hno) {
              s.UpdateItem(i.Id);
            }
          }
          if (this.kno && (t = ModelManager_1.ModelManager.QuestNewModel?.GetQuest(this.kno)) && t.Id === e) {
            this.Xno(this.kno, false);
          }
        }
      } else {
        if (this.Hno) {
          for (const o of this.Hno) {
            o.UpdateList();
          }
        }
        if (this.kno && ModelManager_1.ModelManager.QuestNewModel?.GetQuest(this.kno)) {
          this.Xno(this.kno, false);
        }
      }
    };
    this.$no = e => {
      this.Yno(e);
    };
    this.OGn = e => {
      if (this.Hno) {
        for (const t of this.Hno) {
          t.UpdateList();
        }
        this.zno(0);
      }
    };
    this.CNm = () => {
      if (this.kno > 0) {
        this.Xno(this.kno, false);
      }
      if (this.Hno) {
        for (const e of this.Hno) {
          e.UpdateAllItem();
        }
      }
    };
    this.Jno = () => {
      this.GetItem(0).SetUIActive(true);
      this.AH1.Show();
    };
    this.OnStartSequenceEvent = () => {
      var e = ModelManager_1.ModelManager.QuestNewModel;
      if (!this.Kno) {
        e = e.GetCurTrackedQuest();
        if (e) {
          this.Kno = e.Id;
        } else {
          for (const i of this.Hno) {
            var t = i.GetDefaultItem();
            if (t) {
              this.Kno = t.QuestId;
              break;
            }
          }
        }
      }
      this.Yno(this.Kno);
      this.Nno = true;
    };
    this.jdi = (e, t) => {
      return new CommonTabItem_1.CommonTabItem();
    };
    this.zno = e => {
      let t = true;
      let i = undefined;
      var s = this.Vno[e].MainId;
      for (const n of this.Hno) {
        var o = s === ALL_QUEST_TYPE;
        var r = n.IsQuestEmpty();
        if (o) {
          n.SetActive(!r);
          if (!r) {
            t = false;
            i = i || n;
          }
        } else if (n.QuestType !== s) {
          n.SetActive(false);
        } else {
          n.SetActive(!r);
          t = r;
          i = n;
        }
      }
      this.GetItem(14).SetUIActive(!t);
      this.GetItem(12).SetUIActive(t);
      this.GetItem(12).SetAnchorOffset(Vector2D_1.Vector2D.ZeroVector);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Quest", 18, "任务界面是否为空", ["是否为空", t]);
      }
      this.Ono = !t;
      if (this.Ono) {
        if (this.Nno) {
          this.Oei(i.GetDefaultItem()?.QuestId);
        }
      } else {
        this.Ono = false;
        this.UiViewSequence?.StopSequenceByKey("Sle");
        this.GetItem(0).SetUIActive(false);
      }
    };
    this.yqe = e => {
      var e = this.Vno[e];
      var t = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTabIcon(e.MainId);
      var e = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMainTypeConfig(e.MainId);
      return new CommonTabData_1.CommonTabData(t, new CommonTabTitleData_1.CommonTabTitleData(e?.MainTypeName ?? ""));
    };
    this.PH1 = e => {};
    this.xH1 = e => {
      switch (e) {
        case 1:
          QuestController_1.QuestNewController.RequestCancelQuestFocusMode(this.kno, () => {
            this.qF1(0);
          });
          break;
        case 0:
          var t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.kno);
          if (t.IsSuspend() && t.GetSuspendType() === 2) {
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("CannotEnterFocusModeWhenOnline");
            return;
          }
          t = ModelManager_1.ModelManager.QuestNewModel.IsInFocusMode() ? 311 : 312;
          t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(t);
          t.FunctionMap.set(2, () => {
            QuestController_1.QuestNewController.RequestSetQuestFocusMode(this.kno, () => {
              this.qF1(0);
            });
          });
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
      }
    };
    this._5e = () => {
      this.CloseMe();
    };
    this.OW1 = () => {
      if (this.Fno) {
        QuestController_1.QuestNewController.RequestTrackQuest(this.kno, false, 1);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Quest", 18, "取消任务追踪", ["任务Id", this.kno]);
        }
        this.Wmu(this.kno);
        this.eso();
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Quest", 18, "QuestView.OnLeftButtonClick:当前处于未追踪状态，不可取消追踪", ["任务Id", this.kno]);
      }
    };
    this.qW1 = () => {
      var e = ModelManager_1.ModelManager.QuestNewModel;
      const t = e.GetQuest(this.kno);
      if (t) {
        var i = e.GetQuestSpecialState(t);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Quest", 49, "QuestView.OnClickTrack,specialState", ["specialState", i]);
        }
        switch (i) {
          case 2:
            QuestController_1.QuestNewController.SetVideoResourceDownloadTriggerId(this.kno);
            ModelManager_1.ModelManager.SubPackageDownLoadModel.OpenSubPackageByQuest(this.kno);
            break;
          case 3:
            if (t.DungeonId !== ModelManager_1.ModelManager.CreatureModel.GetInstanceId() && t.Type === 11) {
              s = "LockTask_InDifferentMap_Tips";
              s = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(s) ?? s;
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(s);
            } else {
              QuestController_1.QuestNewController.ConfirmQuestResourceRequest(t.Id, () => {
                this.qF1(t.Id);
              });
            }
            break;
          case 4:
            if (e.IsInFocusMode() && !e.IsInFocusOnQuest(this.kno)) {
              (s = new ConfirmBoxDefine_1.ConfirmBoxDataNew(322)).FunctionMap.set(2, () => {
                var e = ModelManager_1.ModelManager.QuestNewModel.GetCurFocusQuestId();
                QuestController_1.QuestNewController.RequestCancelQuestFocusMode(e, () => {
                  GeneralLogicTreeController_1.GeneralLogicTreeController.RequestForcedOccupation(t.TreeId, this.DH1);
                });
              });
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(s);
            } else {
              (s = new ConfirmBoxDefine_1.ConfirmBoxDataNew(162)).FunctionMap.set(2, () => {
                GeneralLogicTreeController_1.GeneralLogicTreeController.RequestForcedOccupation(t.TreeId, this.DH1);
              });
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(s);
            }
            break;
          case 8:
            var s = new ConfirmBoxDefine_1.ConfirmBoxDataNew(311);
            s.FunctionMap.set(2, () => {
              QuestController_1.QuestNewController.RequestSetQuestFocusMode(t.Id, () => {
                if (!this.Wfu()) {
                  this.qF1(0);
                }
              });
            });
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(s);
            break;
          case 9:
            QuestController_1.QuestNewController.RequestAcceptFocusWaitQuest(t.Id, () => {
              this.qF1(t.Id);
            });
            break;
          case 10:
            s = new ConfirmBoxDefine_1.ConfirmBoxDataNew(322);
            s.FunctionMap.set(2, () => {
              var e = ModelManager_1.ModelManager.QuestNewModel.GetCurFocusQuestId();
              QuestController_1.QuestNewController.RequestCancelQuestFocusMode(e, this.DH1);
            });
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(s);
            break;
          default:
            if (this.Fno) {
              this.Wfu();
            } else {
              this.DH1();
            }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Quest", 18, "点击追踪按钮时:找不到任务", ["任务Id", this.kno]);
      }
    };
    this.DH1 = (e = true) => {
      var t = QuestController_1.QuestNewController.RequestTrackQuest(this.kno, true, 1);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Quest", 49, "QuestView.点击追踪按钮时:发送追踪请求至后端", ["任务Id", this.kno], ["追踪结果", t]);
      }
      switch (t) {
        case 1:
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Quest", 18, "QuestView.点击追踪按钮时:找不到任务", ["任务Id", this.kno]);
          }
          return;
        case 2:
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Quest", 18, "QuestView.不允许强制切出", ["任务Id", this.kno]);
          }
          var i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Task_NoSwitch_Tips");
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(i);
          return;
        case 3:
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("FollowQuestStepGuide");
          return;
        case 4:
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Quest", 18, "QuestView.专注模式下不允许切换任务追踪", ["newQuestId", this.kno]);
          }
          return;
      }
      if (e && this.Wfu()) {
        return;
      }
      t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.kno);
      this.Wmu(t.Id);
      this.eso();
    };
    this.BH1 = () => {
      var e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.kno);
      if (e) {
        var t = e.GetCurrentTrackCustomBoard();
        if (QuestUtil_1.QuestUtil.HandleTrackCustomBoard(t)) {
          return true;
        }
        t = e.GetCurrentActiveChildQuestNodes();
        if (t && t.length !== 0) {
          for (const o of t) {
            var i = e.GetDefaultMark(o.NodeId);
            if (i) {
              var s = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
              if (MapUtil_1.MapUtil.GetDungeonsRelation(s, e.DungeonId) === 1) {
                s = MapUtil_1.MapUtil.GetTrackDistanceByMarkId(i);
                if (!s) {
                  continue;
                }
                if (s < (CommonParamById_1.configCommonParamById.GetIntConfig("QuestTrackNeedOpenWordMapDistance") ?? 50)) {
                  UiManager_1.UiManager.ResetToBattleView();
                  return true;
                }
              }
              const r = {
                MarkType: 12,
                MarkId: i,
                IsNotFocusTween: true,
                OpenFogId: 0
              };
              if (UiManager_1.UiManager.GetViewByName("WorldMapView")) {
                UiManager_1.UiManager.CloseViewAsync("WorldMapView").then(() => {
                  UiManager_1.UiManager.OpenView("WorldMapView", r, () => {
                    UiManager_1.UiManager.CloseView("QuestView");
                  });
                });
              } else {
                UiManager_1.UiManager.OpenView("WorldMapView", r, () => {
                  UiManager_1.UiManager.CloseView("QuestView");
                });
              }
              return true;
            }
          }
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Quest", 18, "QuestView.点击Go按钮时:找不到任务标记id", ["任务Id", this.kno]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Quest", 18, "QuestView.点击Go按钮时:找不到任务节点", ["任务Id", this.kno]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Quest", 18, "QuestView.点击Go按钮时:找不到任务", ["任务Id", this.kno]);
      }
      return false;
    };
    this.tso = () => {
      if (this.kno) {
        var e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.kno);
        if (e) {
          if (e.IsSuspend()) {
            var t = e.GetOccupations();
            UiManager_1.UiManager.OpenView("QuestLockPreview", t);
          } else if (e.IsQuestCanPreShow()) {
            HelpController_1.HelpController.OpenHelpById(LEVEL_HELP);
          } else if (e.IsQuestHasRecommendPreQuest()) {
            t = e.GetRecommendPreQuest();
            if (t && t.length !== 0) {
              for (const s of t) {
                var i = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(s);
                if (i === 0) {
                  ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("QuestRecommendAccept");
                  break;
                }
                if (i !== 3) {
                  this.Yno(s);
                  break;
                }
              }
            }
          }
        }
      }
    };
    this.XJ1 = () => {
      var e = ModelManager_1.ModelManager.QuestReviewModel.GetQuestEntryDataByQuestId(this.kno);
      if (e) {
        ControllerHolder_1.ControllerHolder.QuestReviewController.OpenQuestReview(e.Id);
      }
    };
    this.xDd = () => {
      ControllerHolder_1.ControllerHolder.QuestTreeController.OpenMainView();
    };
    this.Xno = (e, t) => {
      QuestController_1.QuestNewController.RedDotRequest(e, 0);
      this.kno = e;
      if (this.Nno && t && this.Ono) {
        this.UiViewSequence.PlaySequencePurely("Sle");
      }
      t = ModelManager_1.ModelManager.QuestNewModel;
      this.GetText(6).SetText(t.GetQuestName(e));
      this.GetText(8).SetText(t.GetQuestDetails(e));
      this.Wmu(e);
      this.oso(e);
      this.rso(e);
      this.$Ma(e);
      this.AH1.SetToggleState(t.IsInFocusOnQuest(this.kno));
      t = ModelManager_1.ModelManager.QuestReviewModel.GetQuestEntryDataByQuestId(e);
      this.GetButton(29).RootUIComp.SetUIActive(!!t && t.ShouldShow);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIText], [12, UE.UIItem], [13, UE.UIText], [14, UE.UIItem], [15, UE.UIButtonComponent], [16, UE.UIItem], [17, UE.UIScrollViewWithScrollbarComponent], [18, UE.UIItem], [19, UE.UISprite], [20, UE.UIItem], [21, UE.UISprite], [22, UE.UISprite], [23, UE.UIItem], [24, UE.UISprite], [25, UE.UIText], [26, UE.UIItem], [27, UE.UIItem], [28, UE.UIItem], [29, UE.UIButtonComponent], [30, UE.UIButtonComponent]];
    this.BtnBindInfo = [[15, this.tso], [29, this.XJ1], [30, this.xDd]];
  }
  async OnBeforeStartAsync() {
    this.GetItem(3).SetUIActive(false);
    this.GetItem(10).SetUIActive(false);
    this.GetItem(5).SetUIActive(false);
    this.GetText(13).SetUIActive(true);
    this.GetItem(0).SetUIActive(false);
    this.GetItem(16).SetUIActive(false);
    this.GetButton(30).GetRootComponent().SetUIActive(true);
    ModelManager_1.ModelManager.SubPackageDownLoadModel.UpdaterDownLoadSize();
    ModelManager_1.ModelManager.SubPackageDownLoadModel.UpdaterFinishState();
    this.UiViewSequence.AddSequenceStartEvent("Start", this.OnStartSequenceEvent);
    this.UiViewSequence.AddSequenceStartEvent("ShowView", this.OnStartSequenceEvent);
    this.UiViewSequence.AddSequenceStartEvent("Sle", this.Jno);
    this.Wno = [];
    this.sOe = [];
    this.Kno = this.OpenParam;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnQuestRedDotStateChange, 0);
    this.nso();
    await this.sso();
    await this.Hmu.CreateByActorAsync(this.GetItem(27).GetOwner(), this.OW1);
    this.Hmu.SetButtonText("InstanceDungeonEntranceCancelTrack", true);
    this.Hmu.Hide();
    await this.$mu.CreateByActorAsync(this.GetItem(1).GetOwner(), this.qW1);
    this.$mu.Hide();
    await this.AH1.CreateByActorAsync(this.GetItem(28).GetOwner());
    this.AH1.BindToggleCallback(this.PH1, this.xH1);
    this.AH1.Hide();
    var e = new LogReportDefine_1.QuestViewEnterLogEvent();
    ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e);
  }
  OnAfterShow() {
    this.qF1(0);
  }
  OnBeforeDestroy() {
    if (this.Ivt) {
      var e;
      for ([, e] of this.Ivt?.GetTabItemMap()) {
        e.Clear();
      }
      this.Ivt.Destroy();
      this.Ivt = undefined;
    }
    this.Vno = undefined;
    if (this.Hno) {
      for (const t of this.Hno) {
        t.Destroy();
      }
      this.Hno = undefined;
    }
    if (this.sOe) {
      for (const i of this.sOe) {
        i.Destroy();
      }
      this.sOe = undefined;
    }
    this.jno = undefined;
  }
  OnTick(e) {
    if (this.Hno) {
      for (const t of this.Hno) {
        t.OnTick(e);
      }
    }
  }
  nso() {
    const t = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon?.MapConfigId;
    var e = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeConfigs()?.filter(e => {
      return !!e.IsShowInQuestPanel || !!t && e.MapId.find(e => e === t) !== undefined;
    });
    e.sort((e, t) => {
      e = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMainTypeConfig(e.MainId);
      t = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMainTypeConfig(t.MainId);
      if (e && t) {
        return e.SortValue - t.SortValue;
      } else {
        return 0;
      }
    });
    this.Vno.length = 0;
    var i = new Map();
    for (const n of e) {
      var s;
      var o;
      var r = n.MainId;
      if (!i.get(r) && !(i.set(r, true), s = this.GetItem(9), s = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(16), s), (o = new QuestTypeItem_1.QuestTypeItem()).Init(s, r, this.Oei), this.Hno.push(o), r === 7 && o.IsQuestEmpty())) {
        this.Vno.push(n);
      }
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
            this.HGn = true;
            const s = this.GetScrollViewWithScrollbar(17);
            if (s) {
              s.OnLateUpdate.Bind(e => {
                TimerSystem_1.GameplayTimerSystem.Next(() => {
                  if (this.HGn && s?.IsValid()) {
                    s.ScrollTo(i.GetRootItem());
                    this.Oei(this.kno);
                    this.Ohl(i.GetTaskToggleItem());
                  }
                  this.HGn = false;
                });
              });
            }
          }
        }
      } else {
        this.kno = QuestDefine_1.INVALID_QUEST_ID;
      }
    }
  }
  Ohl(e) {
    TimerSystem_1.GameplayTimerSystem.Next(() => {
      UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForView(e, true);
    });
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UpdateQuestDetails, this.Xno);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, this.$Ct);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GeneralLogicTreeSuspend, this.Qno);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GeneralLogicTreeCancelSuspend, this.Qno);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnNavigationQuest, this.$no);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActivityQuestCountdownEnd, this.OGn);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshSubPackageDownLoadByPriority, this.CNm);
    this.GetText(8).OnSelfLanguageChange.Bind(this.QuestDescChangeLang);
    ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlink(this.GetText(8), 1, 3, 1);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UpdateQuestDetails, this.Xno);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, this.$Ct);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GeneralLogicTreeSuspend, this.Qno);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GeneralLogicTreeCancelSuspend, this.Qno);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnNavigationQuest, this.$no);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ActivityQuestCountdownEnd, this.OGn);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshSubPackageDownLoadByPriority, this.CNm);
    this.GetText(8).OnSelfLanguageChange.Unbind();
    ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(this.GetText(8));
  }
  async sso() {
    const t = new CommonTabComponentData_1.CommonTabComponentData(this.jdi, this.zno, this.yqe);
    this.Ivt = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(7), t, this._5e);
    var i = this.Ivt.CreateTabItemDataByLength(this.Vno.length);
    for (let e = 0; e < i.length; e++) {
      const t = i[e];
      t.RedDotName = "QuestTab";
      t.RedDotUid = this.Vno[e].MainId;
    }
    await this.Ivt.RefreshTabItemAsync(i);
    this.Ivt.SelectToggleByIndex(ALL_QUEST_TYPE);
  }
  Wfu() {
    var e = this.BH1();
    if (!e) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("FollowQuestStepGuide");
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Quest", 49, "QuestView.点击追踪按钮时:找不到默认的地图标记", ["任务Id", this.kno]);
      }
    }
    return e;
  }
  eso() {
    for (const e of this.Hno) {
      e.UpdateListTrackState();
    }
  }
  Wmu(i) {
    var s = ModelManager_1.ModelManager.QuestNewModel;
    var o = s.GetQuest(i);
    if (o) {
      var r = this.GetText(13);
      var n = this.GetItem(20);
      var e = this.GetSprite(19);
      var a = this.GetButton(15);
      var h = this.GetSprite(21);
      var _ = (o.FocusSetting?.CanOpenFocusMode ?? false) && o.IsProgressing;
      let t = undefined;
      this.Fno = this.kno === ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.Id;
      this.Hmu.SetActive(this.Fno);
      if (this.Fno) {
        this.$mu.SetButtonText("PrefabTextItem_2843016624_Text", false);
      } else {
        this.$mu.SetButtonText("InstanceDungeonEntranceTrack", true);
      }
      switch (s.GetQuestSpecialState(o)) {
        case 4:
          r.SetText(o.GetSuspendText() ?? "");
          t = s.GetQuestLockIconPath(i);
          var l = o.GetSuspendType() === 1;
          a.GetRootComponent().SetUIActive(l);
          var u = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_ComIconQuestion");
          this.aso(u);
          var u = CommonParamById_1.configCommonParamById.GetStringConfig("TaskUnableStripColor") ?? "";
          h.SetColor(UE.Color.FromHex(u));
          this.$mu.SetActive(l);
          this.AH1.SetActive(_);
          n.SetUIActive(true);
          break;
        case 5:
          r.SetText(ConfigManager_1.ConfigManager.TextConfig.GetTextById("SuspendByOnline") ?? "SuspendByOnline");
          t = s.GetQuestLockIconPath(i);
          a.GetRootComponent().SetUIActive(false);
          u = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_ComIconQuestion");
          this.aso(u);
          l = CommonParamById_1.configCommonParamById.GetStringConfig("TaskUnableStripColor") ?? "";
          h.SetColor(UE.Color.FromHex(l));
          this.$mu.SetActive(false);
          this.AH1.SetActive(_);
          n.SetUIActive(true);
          break;
        case 7:
          r.SetText(o.GetRefOccupiedEntityText() ?? "");
          t = s.GetQuestLockIconPath(i);
          a.GetRootComponent().SetUIActive(false);
          u = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_ComIconQuestion");
          this.aso(u);
          l = CommonParamById_1.configCommonParamById.GetStringConfig("TaskUnableStripColor") ?? "";
          h.SetColor(UE.Color.FromHex(l));
          this.$mu.SetActive(false);
          this.AH1.SetActive(false);
          n.SetUIActive(true);
          break;
        case 1:
          {
            r.SetText(s.GetShowQuestConditionDescribe(i) ?? "");
            t = s.GetQuestLockIconPath(i);
            u = s.GetUnlockConditions(i);
            let e = undefined;
            l = (e = u ? u.find(e => e.Type === "ExploreLevel") : e) !== undefined;
            a.GetRootComponent().SetUIActive(l);
            u = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_ComIconQuestion");
            this.aso(u);
            l = CommonParamById_1.configCommonParamById.GetStringConfig("TaskUnableStripColor") ?? "";
            h.SetColor(UE.Color.FromHex(l));
            this.$mu.SetActive(false);
            this.AH1.SetActive(false);
            n.SetUIActive(true);
            break;
          }
        case 2:
          u = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("DownloadResource") ?? "DownloadResource";
          r.SetText(u);
          l = CommonParamById_1.configCommonParamById.GetStringConfig("TaskUnableStripColor") ?? "";
          h.SetColor(UE.Color.FromHex(l));
          this.$mu.SetButtonText("GoToDownload", false);
          this.$mu.SetActive(true);
          a.GetRootComponent().SetUIActive(false);
          this.AH1.SetActive(false);
          n.SetUIActive(true);
          break;
        case 3:
          this.$mu.SetActive(true);
          this.$mu.SetButtonText("GoOnTask", false);
          n.SetUIActive(false);
          this.AH1.SetActive(false);
          break;
        case 6:
          {
            u = o.GetRecommendPreQuest();
            let e = "";
            if (u?.length) {
              e = s.GetQuest(u[0])?.Name ?? "";
            }
            LguiUtil_1.LguiUtil.SetLocalText(r, "QuestRecommendTip", e);
            t = s.GetQuestLockIconPath(i);
            l = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_IconArrive");
            this.aso(l);
            u = CommonParamById_1.configCommonParamById.GetStringConfig("TaskRemindStripColor") ?? "";
            h.SetColor(UE.Color.FromHex(u));
            this.$mu.SetActive(true);
            this.AH1.SetActive(_);
            n.SetUIActive(true);
            break;
          }
        case 8:
          l = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Task_Focus_Tips01") ?? "Task_Focus_Tips01";
          r.SetText(l);
          u = CommonParamById_1.configCommonParamById.GetStringConfig("TaskUnableStripColor") ?? "";
          h.SetColor(UE.Color.FromHex(u));
          this.$mu.SetActive(false);
          a.GetRootComponent().SetUIActive(false);
          this.AH1.SetActive(false);
          n.SetUIActive(true);
          break;
        case 9:
          this.$mu.SetActive(true);
          this.$mu.SetButtonText("Task_Focus_Tips02", false);
          this.AH1.SetActive(false);
          n.SetUIActive(false);
          break;
        default:
          n.SetUIActive(false);
          this.$mu.SetActive(true);
          this.AH1.SetActive(_);
      }
      if (t) {
        this.SetSpriteByPath(t, e, true);
      }
    }
  }
  aso(e) {
    var t = this.GetSprite(22);
    if (t) {
      const i = t.GetOwner().GetComponentByClass(UE.UISpriteTransition.StaticClass());
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.LGUISpriteData_BaseObject, (e, t) => {
        if (e && e.IsValid()) {
          i.SetAllTransitionSprite(e);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Quest", 18, "设置Sprite失败，图片加载失败", ["图片路径", t]);
        }
      }, 102);
    }
  }
  async oso(e) {
    var t = this.GetItem(5);
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
    if (e && e.HasBehaviorTree()) {
      t.SetUIActive(true);
      if (!this.jno) {
        this.jno = new QuestViewStep_1.QuestViewStep(0, -1);
        await this.jno.CreateThenShowByActorAsync(t.GetOwner(), 1);
      }
      e = e.Tree?.GetBlackBoard()?.CreateShowData(false);
      await this.jno.Update(e);
      this.jno.SetActive(true);
    } else {
      t.SetUIActive(false);
    }
  }
  rso(e) {
    this.Wno.splice(0, this.Wno.length);
    var e = ModelManager_1.ModelManager.QuestNewModel.GetDisplayRewardInfo(e);
    var t = this.GetItem(18);
    if (e && e.length !== 0) {
      t.SetUIActive(true);
      if (e) {
        this.Wno = e;
      }
      const o = this.GetItem(3);
      for (const i of this.sOe) {
        i.SetActive(false);
      }
      this.Wno.forEach((e, t) => {
        let i = undefined;
        var s;
        if (t > this.sOe.length - 1) {
          s = LguiUtil_1.LguiUtil.CopyItem(o, o.GetParentAsUIItem());
          (i = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()).Initialize(s.GetOwner());
          this.sOe.push(i);
        } else {
          i = this.sOe[t];
        }
        i.RefreshByConfigId(e.ItemId, e.ItemCount);
        i.SetActive(true);
      });
    } else {
      t.SetUIActive(false);
    }
  }
  $Ma(e) {
    var t;
    var i;
    var s;
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
    if (e && (t = this.GetItem(23))) {
      if (e.TagId) {
        if (i = QuestTagById_1.configQuestTagById.GetConfig(e.TagId)) {
          if (s = this.GetSprite(24)) {
            this.SetSpriteByPath(i.BgSpritePath, s, false);
            s.SetUIActive(true);
          }
          if (s = this.GetText(25)) {
            LguiUtil_1.LguiUtil.SetLocalTextNew(s, i.Text);
            s.SetUIActive(true);
          }
          t.SetUIActive(true);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Quest", 18, "找不到任务标签配置", ["questId", e.Id], ["TagId", e.TagId]);
        }
      } else {
        t.SetUIActive(false);
      }
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (!(e.length > 1) && !isNaN(Number(e[0]))) {
      var t = Number(e[0]);
      const o = ModelManager_1.ModelManager.QuestNewModel.GetQuest(t);
      if (o) {
        var i = this.Hno.find(e => e.QuestType === o.Type);
        if (i) {
          var s = i.GetQuestItem(t);
          if (s) {
            if (this.kno !== QuestDefine_1.INVALID_QUEST_ID && this.kno) {
              i.GetQuestItem(this.kno)?.SetSelected(false);
            } else {
              i.GetDefaultItem().SetSelected(false);
            }
            i.GetQuestItem(t).SetSelected(true);
            this.GetScrollViewWithScrollbar(17).ScrollTo(i.GetRootItem());
            this.HGn = false;
            return [t = s.GetTaskToggleItem(), t];
          }
        }
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Guide", 53, "聚焦引导configParams项配置有误", ["configParams", e]);
    }
  }
  GetGuideScrollViewToLock() {
    return this.GetScrollViewWithScrollbar(17);
  }
}
exports.QuestView = QuestView;
//# sourceMappingURL=QuestView.js.map