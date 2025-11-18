"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KingShipMainView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Queue_1 = require("../../../Core/Container/Queue");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Vector2D_1 = require("../../../Core/Utils/Math/Vector2D");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../Common/PublicUtil");
const Global_1 = require("../../Global");
const InputSettings_1 = require("../../InputSettings/InputSettings");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
const TouchFingerManager_1 = require("../../Ui/TouchFinger/TouchFingerManager");
const UiManager_1 = require("../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const DynamicMaskButton_1 = require("../DynamicMask/DynamicMaskButton");
const GeneralLogicTreeController_1 = require("../GeneralLogicTree/GeneralLogicTreeController");
const TsInteractionUtils_1 = require("../Interaction/TsInteractionUtils");
const LogReportDefine_1 = require("../LogReport/LogReportDefine");
const LguiUtil_1 = require("../Util/LguiUtil");
const KingShipAttributeItem_1 = require("./KingShipAttributeItem");
const KingShipBuffItem_1 = require("./KingShipBuffItem");
const KingShipCardItem_1 = require("./KingShipCardItem");
const KingShipUtil_1 = require("./KingShipUtil");
const PERCENT_CHANGE = 0.01;
const DEFAULT_NAVIGATION_GROU_NAME = "Group1";
const FIRTS_REIGNS_ID = 700001;
const SKIP_SHOW_TALK_ID = 14;
class KingShipMainView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.Ubu = 0;
    this.lqe = undefined;
    this.eVi = undefined;
    this.mMu = false;
    this.fMu = false;
    this.gMu = false;
    this.CMu = false;
    this.pMu = 0;
    this.vMu = 0;
    this.yMu = 0;
    this.SMu = 0;
    this.MMu = 0;
    this.BFu = false;
    this.Hod = true;
    this.kFu = 0;
    this.uCa = undefined;
    this.B9e = undefined;
    this.Yal = [];
    this.EMu = [];
    this.IMu = new Map();
    this.TMu = [];
    this.bMu = [];
    this.Dbu = new Map();
    this.oku = [];
    this.lLt = undefined;
    this.DWu = 0;
    this.q$c = undefined;
    this.G$c = undefined;
    this.F$c = undefined;
    this._zc = undefined;
    this.n0d = false;
    this.ZXc = false;
    this.x8i = undefined;
    this.B8i = i => {
      var t;
      if (TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount() > 1 || InputSettings_1.InputSettings.IsInputKeyDown("RightMouseButton") || !this.OFu()) {
        this.x8i = undefined;
      } else {
        this.eVi.ClearTargetRotation();
        t = this.x8i;
        this.x8i = i.GetLocalPointInPlane();
        if (t && (i = this.x8i.X - t.X) != 0) {
          this.eVi.SetCardItemInputPitch(i);
        }
      }
    };
    this.b8i = i => {
      if (this.OFu()) {
        if (this.eVi?.RightEnd) {
          this.wMu();
        } else if (this.eVi?.LeftEnd) {
          this.LMu();
        }
        this.x8i = undefined;
      }
    };
    this.DXe = (0, puerts_1.$ref)(0);
    this.RXe = (0, puerts_1.$ref)(0);
    this.AMu = new Vector2D_1.Vector2D();
    this.PMu = (i, t) => {
      if (this.OFu() && t !== 0) {
        if (this.eVi?.RightEnd) {
          this.wMu();
        } else if (this.eVi?.LeftEnd) {
          this.LMu();
        }
      }
    };
    this.xMu = (i, t) => {
      if (this.OFu()) {
        if (t === 1) {
          this.fMu = false;
          if (!this.mMu) {
            this.eVi?.ClearCardItemRotation();
          }
        } else if (t === 0) {
          this.fMu = true;
          this.eVi.ClearTargetRotation();
          this.gMu = false;
        }
      }
    };
    this.UMu = (i, t) => {
      if (this.OFu()) {
        if (t === 1) {
          this.mMu = false;
          if (!this.fMu) {
            this.eVi?.ClearCardItemRotation();
          }
        } else if (t === 0) {
          this.mMu = true;
          this.eVi.ClearTargetRotation();
          this.gMu = false;
        }
      }
    };
    this.ChoseCardOptionAfterSeqence = i => {
      if (!this.CMu && !this.Bbu) {
        var t = this.FMu(this.vMu);
        if (t) {
          i = i ? t.Options[1] : t.Options[0];
          if ((i.Actions?.length ?? 0) > 0) {
            for (const e of i.Actions) {
              if (!this.qMu(e)) {
                return;
              }
            }
          }
          if (this.yMu) {
            this.vMu = this.yMu;
            this.yMu = 0;
          } else {
            this.vMu = this.$Mu();
          }
          if (!this.CMu) {
            this.Og();
          }
        }
      }
    };
    this.Bbu = undefined;
    this.eYc = new Queue_1.Queue();
    this.aRo = () => {
      if (!Info_1.Info.IsInTouch() && this.OFu()) {
        if (this.eVi?.RightEnd) {
          this.wMu();
        } else if (this.eVi?.LeftEnd) {
          this.LMu();
        }
      }
    };
    this.$Ht = () => {
      var i;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 5, "王权玩法-剧情梗概", ["text", this.uCa]);
      }
      if (this.uCa) {
        this.BFu = true;
        this.eVi?.PlayReSetSequence();
        i = {
          Text: this.uCa,
          ConfirmFunc: () => {
            GeneralLogicTreeController_1.GeneralLogicTreeController.RequestFinishUiGameplay(Protocol_1.Aki.Protocol.h3s.Proto_Reigns, this.Ubu.toString());
            if (this.DWu) {
              const t = KingShipUtil_1.KingShipUtil.GetKingShipOpenData(this.DWu);
              ControllerHolder_1.ControllerHolder.BlackScreenController.AddBlackScreen("None", "KingShip-Skip");
              this.CloseMe(() => {
                ControllerHolder_1.ControllerHolder.BlackScreenController.RemoveBlackScreen("None", "KingShip-Skip");
                UiManager_1.UiManager.OpenView("KingShipLoadingView", t);
              });
            } else {
              this.CloseMe();
            }
            this.BFu = false;
            var i = new LogReportDefine_1.KingShipLogEvent();
            i.i_step_id = this.Ubu;
            ControllerHolder_1.ControllerHolder.LogReportController.LogReport(i);
          },
          CancelFunc: () => {
            if (UiManager_1.UiManager.IsViewOpen("SummaryPopView")) {
              UiManager_1.UiManager.CloseView("SummaryPopView");
            }
            this.BFu = false;
          }
        };
        UiManager_1.UiManager.OpenView("SummaryPopView", i);
      }
    };
    this.HightLightInAttribute = i => {
      var t = this.FMu(this.vMu);
      if (t && !this.Bbu) {
        t = i ? t.Options[1] : t.Options[0];
        if ((t.Actions?.length ?? 0) > 0) {
          for (const e of t.Actions) {
            this.nku(e);
          }
        }
        this.GetItem(24).SetUIActive(i);
        this.GetItem(23).SetUIActive(!i);
      }
    };
    this.OnPositionMaxClaer = () => {
      for (var [, i] of this.IMu) {
        i.SetAttributeItem(false);
      }
      this.GetItem(24)?.SetUIActive(false);
      this.GetItem(23)?.SetUIActive(false);
    };
    this.XTt = () => {
      for (const i of this.Yal) {
        i.CloseTipsItem();
      }
      for (const t of this.EMu) {
        t.CloseTipsItem();
      }
    };
    this.qFu = i => {
      this.lLt?.SetUiActive(i);
      if (this.BFu = i) {
        this.eVi?.PlayReSetSequence();
      }
    };
    this.XBo = () => {
      this.fMu = false;
      this.mMu = false;
    };
    this.YHt = i => {
      if (i === "HelpView") {
        this.BFu = true;
        this.eVi?.PlayReSetSequence();
      }
    };
    this.$Oe = i => {
      if (i === "HelpView") {
        this.BFu = false;
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [28, UE.UIText], [4, UE.UISprite], [27, UE.UISprite], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIDraggableComponent], [15, UE.UIText], [16, UE.UIItem], [17, UE.UIText], [18, UE.UIText], [20, UE.UIButtonComponent], [19, UE.UITexture], [21, UE.UIItem], [22, UE.UIButtonComponent], [23, UE.UIItem], [24, UE.UIItem], [25, UE.UIItem], [26, UE.UITexture]];
    this.BtnBindInfo = [[22, this.aRo], [20, this.$Ht]];
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    await this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.lqe.SetCloseCallBack(() => {
      var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(353);
      i.FunctionMap.set(1, () => {
        this.BFu = false;
      });
      i.FunctionMap.set(2, () => {
        this.CloseMe();
      });
      this.BFu = true;
      this.eVi?.PlayReSetSequence();
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
    });
    this.eVi = new KingShipCardItem_1.KingShipCardItem();
    await this.eVi.CreateThenShowByActorAsync(this.GetItem(10).GetOwner());
    this.eVi.OnClearPostionMax = this.OnPositionMaxClaer;
    this.eVi.OnPostionMaxCallBack = this.HightLightInAttribute;
    this.eVi.OnCallBackDropSequence = this.ChoseCardOptionAfterSeqence;
    this.eVi.ContentItem = this.GetText(15);
    var i = new KingShipAttributeItem_1.KingShipAttributeItem();
    var t = new KingShipAttributeItem_1.KingShipAttributeItem();
    var e = new KingShipAttributeItem_1.KingShipAttributeItem();
    var s = new KingShipAttributeItem_1.KingShipAttributeItem();
    await Promise.all([i.CreateThenShowByActorAsync(this.GetItem(6).GetOwner()), t.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()), e.CreateThenShowByActorAsync(this.GetItem(8).GetOwner()), s.CreateThenShowByActorAsync(this.GetItem(9).GetOwner())]);
    this.EMu.push(i);
    this.EMu.push(t);
    this.EMu.push(e);
    this.EMu.push(s);
    var i = new KingShipBuffItem_1.KingShipBuffItem();
    var t = new KingShipBuffItem_1.KingShipBuffItem();
    var e = new KingShipBuffItem_1.KingShipBuffItem();
    await Promise.all([i.CreateThenShowByActorAsync(this.GetItem(11).GetOwner()), t.CreateThenShowByActorAsync(this.GetItem(12).GetOwner()), e.CreateThenShowByActorAsync(this.GetItem(13).GetOwner())]);
    i.OnClickTipsCallBack = this.qFu;
    t.OnClickTipsCallBack = this.qFu;
    e.OnClickTipsCallBack = this.qFu;
    this.Yal.push(i);
    this.Yal.push(t);
    this.Yal.push(e);
    this.lLt = new DynamicMaskButton_1.DynamicMaskButton();
    this.lLt.SetButtonFunction(this.XTt);
    await this.lLt.Init();
    this.lLt.GetRootItem().SetAsFirstHierarchy();
    this.G$c = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(21));
    this.G$c.BindSequenceCloseEvent(i => {
      if (i === "GuideIn") {
        this.G$c?.PlayLevelSequenceByName("Loop");
      }
      if (i === "GuideOut") {
        this.GetItem(21).SetUIActive(false);
      }
    });
    this.F$c = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(16));
    this.F$c.BindSequenceCloseEvent(i => {
      if (i === "Achievement") {
        this.kFu--;
        this.GetItem(16).SetUIActive(false);
      }
    });
    this.q$c = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(25));
    this._zc = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.UiViewSequence?.AddSequenceFinishEvent("Start", () => {
      this.Hod = false;
    });
  }
  OnStart() {
    var i = this.OpenParam;
    this.Ubu = i.ReignsId;
    this.DWu = i.NextReignsId;
    var t = PublicUtil_1.PublicUtil.GetConfigTextByKey("Reigns_" + this.Ubu + "_TargetText");
    this.GetText(2).SetText(t);
    this.BMu(i.FlowId);
    this.kMu(i.BaseAttribute);
    this.FZc();
    this.TMu.push(...i.EndingList);
    this.OMu();
    this.xDo();
    this.MMu = CommonParamById_1.configCommonParamById.GetFloatConfig("KingShipStaticCardMoveSpeed") ?? 0;
    var t = PublicUtil_1.PublicUtil.GetConfigTextByKey("Reigns_" + this.Ubu + "_TitleText");
    this.lqe.SetTitle(t);
    this.SMu = i.UseReducePercent ? i.PropertyDownReducePercent : 0;
    this.GetItem(16).SetUIActive(false);
    this._zc?.BindSequenceCloseEvent(i => {
      if (i === "TextOut") {
        this.GetText(15).SetUIActive(false);
      }
    });
    if (!this.B9e) {
      this.GetText(1).SetUIActive(false);
    }
    this.GetDraggable(14).RootUIComp.SetUIActive(Info_1.Info.IsInTouch());
  }
  OnBeforeShow() {
    this.fMu = false;
    this.mMu = false;
    this.eVi?.ClearCardItemRotation();
    this.Og();
  }
  OnBeforeDestroy() {
    this.G$c?.Clear();
    this.G$c = undefined;
    this.q$c?.Clear();
    this.q$c = undefined;
    this.F$c?.Clear();
    this.F$c = undefined;
    this._zc?.Clear();
    this._zc = undefined;
    this.lLt?.Destroy();
  }
  BMu(i) {
    for (const h of ConfigManager_1.ConfigManager.FlowConfig.GetFlowStateActions(i[0], Number(i[1]), Number(i[2]))) {
      if (h.Name === "ShowTalk") {
        var t;
        var e = h.Params;
        if (StringUtils_1.StringUtils.IsEmpty(this.uCa) && !StringUtils_1.StringUtils.IsEmpty(e.TalkOutline?.TidOutline)) {
          t = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(e.TalkOutline.TidOutline);
          this.uCa = ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(t);
        }
        for (const r of e.TalkItems) {
          this.pMu ||= r.Id;
          var s = {
            Id: r.Id,
            Options: r.Options,
            Tid: r.TidTalk ?? "",
            WhoId: r.WhoId ?? 0,
            BackGroundConfig: r.BackgroundConfig?.ImageAsset ?? ""
          };
          this.bMu.push(s);
          for (const n of r.Actions ?? []) {
            this.qMu(n);
          }
        }
      }
    }
    if (this.yMu) {
      this.vMu = this.yMu;
      this.yMu = 0;
    } else {
      this.vMu = this.pMu;
    }
    this.GetButton(20).RootUIComp.SetUIActive(!StringUtils_1.StringUtils.IsEmpty(this.uCa) && this.Ubu !== FIRTS_REIGNS_ID);
  }
  kMu(i) {
    let t = 0;
    this.oku = [];
    for (const s of i) {
      this.oku.push(s.AttributeId);
      var e = this.EMu[t++];
      e.RefreshItem(s, this.qFu);
      this.IMu.set(s.AttributeId, e);
      e.SetIsShow(s.IsDefaultEnable);
    }
    for (const h of this.EMu) {
      if (!h.HaveRefresh) {
        h.SetIsShow(false);
      }
    }
  }
  OMu() {
    for (const s of this.TMu) {
      if (s.IsSuccess) {
        var i = s.Conditions.Conditions[0];
        var t = ConfigManager_1.ConfigManager.KingShipConfig.GetKingShipAttribute(i.PropertyId);
        var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Name);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "KingShipAttributeEnough", e, i.Target);
        this.SetSpriteByPath(t.Icon, this.GetSprite(4), false);
        if (s.Conditions.Conditions.length > 1) {
          e = s.Conditions.Conditions[1];
          i = ConfigManager_1.ConfigManager.KingShipConfig.GetKingShipAttribute(e.PropertyId);
          t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Name);
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(28), "KingShipAttributeEnough", t, e.Target);
          this.SetSpriteByPath(i.Icon, this.GetSprite(27), false);
        } else {
          this.GetSprite(27).SetUIActive(false);
          this.GetText(28).SetUIActive(false);
        }
        break;
      }
    }
    this.GetItem(5).SetUIActive(false);
  }
  xDo() {
    for (const i of this.Yal) {
      i.SetUiActive(false);
    }
  }
  Og() {
    this.cHt();
    this.X7e();
    this.Udd();
  }
  cHt() {
    var i = this.FMu(this.vMu);
    if (i) {
      this.eVi?.RefreshCardItemByShowTalk(i.WhoId, i.BackGroundConfig);
      this.eVi?.SetLeftAndRight(i.Options[0].TidTalkOption, i.Options[1].TidTalkOption);
    }
  }
  X7e() {
    var i;
    var t = this.FMu(this.vMu);
    if (t) {
      t = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(t.Tid) ?? "";
      if (!(i = this.GetText(15)).bIsUIActive) {
        this._zc?.PlayLevelSequenceByName("TextIn");
      }
      i.SetUIActive(true);
      i.SetText(t);
    }
  }
  Udd() {
    if (this.vMu === SKIP_SHOW_TALK_ID) {
      this.GetButton(20).RootUIComp.SetUIActive(true);
    }
  }
  W4l(i = false) {
    if (!this.ZXc || !i) {
      if (i) {
        this.ZXc = true;
      }
      for (const t of this.Yal) {
        t.RefreshItem();
      }
    }
  }
  OnTick(i) {
    for (const t of this.EMu) {
      t.Update();
    }
    if (this.OFu()) {
      if (this.eVi) {
        this.eVi.Update(i);
      }
      this.NMu();
      this.VMu();
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.XBo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenView, this.YHt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Oe);
    var i = this.GetDraggable(14);
    i.OnPointerDragCallBack.Bind(this.B8i);
    i.OnPointerEndDragCallBack.Bind(this.b8i);
    InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.UI左摇杆左, this.xMu);
    InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.UI左摇杆右, this.UMu);
    InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.UI键盘F手柄A, this.PMu);
    InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.Ui方向左, this.xMu);
    InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.Ui方向右, this.UMu);
    InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.UI键盘空格, this.PMu);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.XBo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenView, this.YHt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Oe);
    var i = this.GetDraggable(14);
    i.OnPointerBeginDragCallBack.Unbind();
    i.OnPointerDragCallBack.Unbind();
    i.OnPointerEndDragCallBack.Unbind();
    InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.UI左摇杆左, this.xMu);
    InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.UI左摇杆右, this.UMu);
    InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.UI键盘F手柄A, this.PMu);
    InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.Ui方向左, this.xMu);
    InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.Ui方向右, this.UMu);
    InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.UI键盘空格, this.PMu);
  }
  NMu() {
    var i;
    var t;
    if (!Info_1.Info.IsInTouch()) {
      if (t = Global_1.Global.CharacterController.GetCursorPosition()) {
        if (t.X !== this.AMu?.X && t.X !== this.AMu?.X && !this.fMu && !this.mMu) {
          this.gMu = true;
        }
        this.AMu.X = t.X;
        this.AMu.Y = t.Y;
        if (this.gMu) {
          Global_1.Global.CharacterController.GetViewportSize(this.DXe, this.RXe);
          i = (0, puerts_1.$unref)(this.DXe) / 2;
          t = (t.X - i) / i;
          this.eVi.SetCardItemPitchByPercentage(t);
        }
      } else if (this.gMu) {
        this.eVi.ClearCardItemRotation();
      }
    }
  }
  VMu() {
    if (this.mMu || this.fMu) {
      this.eVi.SetCardItemInputPitch(this.mMu ? this.MMu : -this.MMu);
    }
  }
  wMu() {
    this.jMu(true);
  }
  LMu() {
    this.jMu(false);
  }
  jMu(i) {
    this.DMu(false);
    this.GetItem(24).SetUIActive(false);
    this.GetItem(23).SetUIActive(false);
    if (this.CMu) {
      this.eVi?.PlaySequenceByName(i ? "DropR" : "DropL");
      if (this.Bbu) {
        this.W4l(true);
        this.tYc();
        return;
      } else {
        this.Og();
        this.CMu = false;
        return;
      }
    }
    this.HMu();
    this.eVi?.PlaySequenceByName(i ? "DropR" : "DropL");
  }
  qMu(i) {
    var t;
    if (i.Name === "ReignsChangePlayerName") {
      t = i.Params;
      this.vVi(t.PlayerNameId);
    }
    if (i.Name === "ReignsChangeBackground") {
      const e = i.Params;
      if (e.ChangeMode === 2) {
        this._zc?.PlayLevelSequenceByName("Switch");
        this.n0d = true;
      } else if (e.ChangeMode === 1) {
        if (this.n0d) {
          this.WMu(e.Background, "SwitchB");
        } else {
          this.WMu(e.Background, "SwitchA");
        }
        this.n0d = false;
      } else if (e.ChangeMode === 0) {
        this.H_d(e.Background).finally(() => {
          if (this.n0d) {
            this.WMu(e.Background, "SwitchB");
          }
          this.n0d = false;
        });
      }
    }
    if (i.Name === "ReignsAddBuff") {
      t = i.Params;
      return this.NEn(t.BuffId);
    } else {
      if (i.Name === "ReignsSetPropertyVisible") {
        t = i.Params;
        this.QMu(t.PropertyId, t.IsVisible);
      }
      if (i.Name === "ReignsCallCard") {
        t = i.Params;
        this.KMu(t.CardId);
      }
      if (i.Name === "ReignsTriggerGuide") {
        this.DMu(true);
      }
      if (i.Name === "JumpTalk") {
        t = i.Params;
        this.yMu = t.TalkId;
      }
      if (i.Name === "ReignsCheckSettle") {
        return this.UWu(true);
      } else {
        if (i.Name === "PostAkEvent") {
          t = i.Params;
          this.X1n(t);
        }
        return true;
      }
    }
  }
  vVi(i) {
    this.GetText(1).SetUIActive(true);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i);
    this.B9e = i;
    this._zc?.PlayLevelSequenceByName("Title");
  }
  WMu(i, t) {
    this.H_d(i).finally(() => {
      this._zc?.PlayLevelSequenceByName(t);
    });
  }
  async H_d(i) {
    var t = [];
    t.push(this.SetTextureAsync(i, this.GetTexture(19)));
    t.push(this.SetTextureAsync(i, this.GetTexture(26)));
    await Promise.all(t);
  }
  NEn(i) {
    var t;
    var e;
    var s = ConfigManager_1.ConfigManager.KingShipConfig.GetKingShipBuff(i);
    var h = new Map();
    for (const l of this.oku) {
      h.set(l, 0);
    }
    if (s.Type === 1) {
      for (var [r, n] of s.ParamMap) {
        if (!this.fvt(r, n)) {
          return false;
        }
      }
      if (s.Rrounds > 0) {
        this.Dbu.set(s.Id, s.Rrounds);
        for (var [o, a] of s.ParamMap) {
          var _ = h.get(o) ?? 0;
          _ += a;
          h.set(o, _);
        }
      }
    }
    if (s.Rrounds > 0) {
      for (const f of this.Yal) {
        if (!f.GetIsShowingRoundsBuff()) {
          f.ShowBuffItem(s.Id, s.Rrounds);
          break;
        }
      }
    }
    if (s.Type === 2) {
      this.Dbu.set(s.Id, s.Rrounds);
    }
    for ([t, e] of h) {
      var u = this.IMu.get(t);
      if (u) {
        u.RefreshBuffItem(e, s.Rrounds);
        u.RefreshUpDownItem();
      }
    }
    return true;
  }
  XMu() {
    var i;
    var t;
    var e = new Map();
    for ([i, t] of this.IMu) {
      e.set(i, t.CurrentCount);
    }
    return e;
  }
  YMu() {
    var i;
    var t;
    var e = [];
    for ([i, t] of this.Dbu) {
      var s = ConfigManager_1.ConfigManager.KingShipConfig.GetKingShipBuff(i);
      if (s.Type === 2 && t >= 0) {
        e.push(...s.ParamMap.keys());
      }
    }
    return e;
  }
  HMu() {
    for (var [i, t] of this.Dbu) {
      var e = ConfigManager_1.ConfigManager.KingShipConfig.GetKingShipBuff(i);
      if (e.Type === 1) {
        for (var [s, h] of e.ParamMap) {
          if (!this.fvt(s, h)) {
            this.ZXc = true;
            break;
          }
        }
      }
      if (t - 1 <= 0) {
        this.Dbu.delete(i);
      } else {
        this.Dbu.set(i, t - 1);
      }
    }
    this.W4l();
    for (var [, r] of this.IMu) {
      r.RefreshBuffRounds();
      r.RefreshUpDownItem();
    }
  }
  fvt(i, t) {
    let e = t;
    if (this.SMu !== 0 && e < 0) {
      e *= 1 - this.SMu * PERCENT_CHANGE;
    }
    this.IMu.get(i).RefreshAttribute(e);
    for (const s of this.TMu) {
      if (s.IsSuccess) {
        if (KingShipUtil_1.KingShipUtil.CheckEndingList([s], this.XMu(), this.YMu())) {
          this.q$c?.PlayLevelSequenceByName("Sweep");
          this.GetItem(5).SetUIActive(true);
        } else {
          this.GetItem(5).SetUIActive(false);
        }
      }
    }
    return this.UWu(false);
  }
  UWu(i) {
    var t = [];
    if (i) {
      t.push(...this.TMu);
    } else {
      for (const e of this.TMu) {
        if (!e.IsSuccess) {
          t.push(e);
        }
      }
    }
    const e = KingShipUtil_1.KingShipUtil.CheckEndingList(t, this.XMu(), this.YMu());
    if (e) {
      this.GMu(e);
      return false;
    }
    if (i) {
      for (const s of this.TMu) {
        if (!s.IsSuccess) {
          this.GMu(s);
          return false;
        }
      }
    }
    return true;
  }
  QMu(i, t) {
    if (t) {
      this.NZc();
    }
    this.IMu.get(i)?.SetIsShow(t);
    let e = true;
    for (var [, s] of this.IMu) {
      if (!s.GetShowItem().IsUIActiveInHierarchy()) {
        e = false;
        break;
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnKingShipAllAttrItemShown, e);
  }
  X1n(i) {
    if (i.EventConfig.Type === IAction_1.EPostAkEvent.Global) {
      const e = (0, AudioSystem_1.parseAudioEventPath)(i.EventConfig.AkEvent);
      if (ModelManager_1.ModelManager.MapModel.CurrentInWorld || i.PersistWhenExitDungeon) {
        AudioSystem_1.AudioSystem.PostEvent(e);
      } else {
        const s = AudioSystem_1.AudioSystem.PostEvent(e, undefined, {
          CallbackHandler: (i, t) => {
            ControllerHolder_1.ControllerHolder.GameAudioController.RemovePostAkEventHandle(s);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Audio", 5, "[PostAkEventAudio] 全局音频事件Handle移除记录", ["Handle", s], ["Event", e]);
            }
          },
          CallbackMask: 1
        });
        if (!ModelManager_1.ModelManager.MapModel.CurrentInWorld) {
          ControllerHolder_1.ControllerHolder.GameAudioController.AddPostAkEventHandle(s);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Audio", 5, "[PostAkEventAudio] 全局音频事件Handle添加记录", ["Handle", s], ["Event", e]);
          }
        }
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Audio", 5, "[Game.Action] PostEvent", ["Event", e]);
      }
    }
  }
  KMu(i) {
    var t;
    var e;
    var s = ConfigManager_1.ConfigManager.KingShipConfig.GetReignsCallCard(i);
    if (s) {
      if (s.CardType === "OptionCard") {
        this.eVi?.RefreshCardItemByCallCard(i);
        e = PublicUtil_1.PublicUtil.GetConfigTextByKey("ReignsCard_" + i + "_CardDesc");
        if (!(t = this.GetText(15)).bIsUIActive) {
          this._zc?.PlayLevelSequenceByName("TextIn");
        }
        t.SetUIActive(true);
        t.SetText(e);
        this.CMu = true;
      } else if (s.CardType === "AchievementCard") {
        this.GetItem(16).SetUIActive(true);
        this.kFu++;
        t = PublicUtil_1.PublicUtil.GetConfigTextByKey("ReignsCard_" + i + "_CardDesc");
        this.GetText(18).SetText(t);
        e = PublicUtil_1.PublicUtil.GetConfigTextByKey("ReignsCard_" + i + "_CardTitle");
        this.GetText(17).SetText(e);
        this.F$c?.PlayLevelSequenceByName("Achievement");
      } else if (s.CardType === "BuffCard") {
        this.eVi?.RefreshCardItemByBuffCard(i);
        this._zc?.PlayLevelSequenceByName("TextOut");
        this.CMu = true;
      }
    }
  }
  DMu(i) {
    if (i) {
      this.GetItem(21).SetUIActive(true);
      this.G$c?.PlayLevelSequenceByName("GuideIn");
    } else {
      this.G$c?.PlayLevelSequenceByName("GuideOut");
    }
  }
  GMu(i) {
    for (const t of (this.Bbu = i).CardIds) {
      this.eYc.Push(t);
    }
    this.tYc();
    this._zc?.PlayLevelSequenceByName("Ending");
  }
  tYc() {
    if (this.eYc.Size <= 0) {
      if (this.Bbu.IsSuccess) {
        this.CloseMe();
        return;
      } else {
        this.zMu();
        return;
      }
    }
    var i;
    var t;
    var e = this.eYc.Pop();
    if (e) {
      if ((i = ConfigManager_1.ConfigManager.KingShipConfig.GetReignsCallCard(e)).CardType === "OptionCard") {
        this.KMu(e);
      } else if (i.CardType === "Settlement") {
        if (this.Bbu.IsSuccess) {
          t = {
            CardId: e,
            ReignsId: this.Ubu,
            IsSuccess: this.Bbu.IsSuccess,
            NextReignsId: this.DWu
          };
          UiManager_1.UiManager.OpenView("KingShipResultView", t);
          this.CloseMe();
        } else {
          t = {
            CardId: e,
            OnCloseCallBack: () => {
              this.zMu();
            }
          };
          this.BFu = true;
          this.eVi?.PlayReSetSequence();
          UiManager_1.UiManager.OpenView("KingShipFailView", t);
        }
      } else if (i.CardType === "StaticImage") {
        e = {
          Path: i.CardBackground,
          FlowId: i.StaticImageFlow,
          OnCloseCallBack: () => {
            if (this.Bbu) {
              this.tYc();
            }
          }
        };
        UiManager_1.UiManager.OpenView("KingShipPlotView", e);
      }
    }
  }
  FMu(i) {
    for (const t of this.bMu) {
      if (t.Id === this.vMu) {
        return t;
      }
    }
  }
  $Mu() {
    let t = 0;
    for (let i = 0; i < this.bMu.length; i++) {
      if (this.bMu[i].Id === this.vMu) {
        t = i + 1;
        break;
      }
    }
    if (t < this.bMu.length) {
      return this.bMu[t].Id;
    } else {
      return 0;
    }
  }
  zMu() {
    var i = this.OpenParam;
    i.UseReducePercent = true;
    const t = TsInteractionUtils_1.TsInteractionUtils.GetCurrentOpenViewName() === this.Info?.Name;
    UiManager_1.UiManager.OpenView("KingShipLoadingView", i);
    this.CloseMe(() => {
      if (t) {
        TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName("KingShipMainView");
      }
    });
  }
  nku(i) {
    if (i.Name === "ReignsAddBuff") {
      i = i.Params;
      i = ConfigManager_1.ConfigManager.KingShipConfig.GetKingShipBuff(i.BuffId);
      if (i.Type === 1) {
        for (var [t, e] of i.ParamMap) {
          this.IMu.get(t).SetAttributeItem(true, e);
        }
      }
    }
  }
  OFu() {
    var i;
    if (this.BFu || this.kFu > 0 || this.Hod || this.Jud()) {
      this.mMu = false;
      return this.fMu = false;
    } else {
      return !Info_1.Info.IsInGamepad() || ((i = ControllerHolder_1.ControllerHolder.UiNavigationNewController.GetCurrentNavigationFocusListener()?.GroupName === DEFAULT_NAVIGATION_GROU_NAME) || (this.mMu = false, this.fMu = false), i);
    }
  }
  FZc() {
    for (var [, i] of this.IMu) {
      if (i.IsShowByKingShip) {
        this.GetItem(25).SetUIActive(true);
        return;
      }
    }
    this.GetItem(25).SetUIActive(false);
  }
  NZc() {
    this.GetItem(25).SetUIActive(true);
  }
  Jud() {
    var i = ModelManager_1.ModelManager.GuideModel.GetRunningWithoutPendingGroupIdList().length > 0;
    if (i) {
      this.eVi?.PlayReSetSequence();
    }
    return i;
  }
}
exports.KingShipMainView = KingShipMainView;
//# sourceMappingURL=KingShipMainView.js.map