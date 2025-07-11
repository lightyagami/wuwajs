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
class KingShipMainView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.dbu = 0;
    this.lqe = undefined;
    this.eVi = undefined;
    this.dMu = false;
    this.mMu = false;
    this.fMu = false;
    this.gMu = false;
    this.CMu = 0;
    this.pMu = 0;
    this.vMu = 0;
    this.yMu = 0;
    this.SMu = 0;
    this.x2u = false;
    this.U2u = 0;
    this.uCa = undefined;
    this.B9e = undefined;
    this.Yal = [];
    this.MMu = [];
    this.EMu = new Map();
    this.IMu = [];
    this.TMu = [];
    this.mbu = new Map();
    this.xBu = [];
    this.lLt = undefined;
    this.J9c = 0;
    this.CWc = undefined;
    this.pWc = undefined;
    this.vWc = undefined;
    this.dQc = undefined;
    this.eQc = false;
    this.x8i = undefined;
    this.B8i = i => {
      var t;
      if (TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount() > 1 || InputSettings_1.InputSettings.IsInputKeyDown("RightMouseButton") || !this.D2u()) {
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
      if (this.D2u()) {
        if (this.eVi?.RightEnd) {
          this.RMu();
        } else if (this.eVi?.LeftEnd) {
          this.wMu();
        }
        this.x8i = undefined;
      }
    };
    this.DXe = (0, puerts_1.$ref)(0);
    this.RXe = (0, puerts_1.$ref)(0);
    this.LMu = new Vector2D_1.Vector2D();
    this.AMu = (i, t) => {
      if (this.D2u() && t !== 0) {
        if (this.eVi?.RightEnd) {
          this.RMu();
        } else if (this.eVi?.LeftEnd) {
          this.wMu();
        }
      }
    };
    this.PMu = (i, t) => {
      if (this.D2u()) {
        if (t === 1) {
          this.mMu = false;
          if (!this.dMu) {
            this.eVi?.ClearCardItemRotation();
          }
        } else if (t === 0) {
          this.mMu = true;
          this.eVi.ClearTargetRotation();
          this.fMu = false;
        }
      }
    };
    this.xMu = (i, t) => {
      if (this.D2u()) {
        if (t === 1) {
          this.dMu = false;
          if (!this.mMu) {
            this.eVi?.ClearCardItemRotation();
          }
        } else if (t === 0) {
          this.dMu = true;
          this.eVi.ClearTargetRotation();
          this.fMu = false;
        }
      }
    };
    this.ChoseCardOptionAfterSeqence = i => {
      if (!this.gMu && !this.fbu) {
        var t = this.GMu(this.pMu);
        if (t) {
          i = i ? t.Options[1] : t.Options[0];
          if ((i.Actions?.length ?? 0) > 0) {
            for (const e of i.Actions) {
              if (!this.OMu(e)) {
                return;
              }
            }
          }
          if (this.vMu) {
            this.pMu = this.vMu;
            this.vMu = 0;
          } else {
            this.pMu = this.HMu();
          }
          if (!this.gMu) {
            this.Og();
          }
        }
      }
    };
    this.fbu = undefined;
    this.tQc = new Queue_1.Queue();
    this.aRo = () => {
      if (!Info_1.Info.IsInTouch() && this.D2u()) {
        if (this.eVi?.RightEnd) {
          this.RMu();
        } else if (this.eVi?.LeftEnd) {
          this.wMu();
        }
      }
    };
    this.$Ht = () => {
      var i;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 5, "王权玩法-剧情梗概", ["text", this.uCa]);
      }
      if (this.uCa) {
        this.x2u = true;
        this.eVi?.PlayReSetSequence();
        i = {
          Text: this.uCa,
          ConfirmFunc: () => {
            GeneralLogicTreeController_1.GeneralLogicTreeController.RequestFinishUiGameplay(Protocol_1.Aki.Protocol.h3s.Proto_Reigns, this.dbu.toString());
            if (this.J9c) {
              const t = KingShipUtil_1.KingShipUtil.GetKingShipOpenData(this.J9c);
              ControllerHolder_1.ControllerHolder.BlackScreenController.AddBlackScreen("None", "KingShip-Skip");
              this.CloseMe(() => {
                ControllerHolder_1.ControllerHolder.BlackScreenController.RemoveBlackScreen("None", "KingShip-Skip");
                UiManager_1.UiManager.OpenView("KingShipLoadingView", t);
              });
            } else {
              this.CloseMe();
            }
            this.x2u = false;
            var i = new LogReportDefine_1.KingShipLogEvent();
            i.i_step_id = this.dbu;
            ControllerHolder_1.ControllerHolder.LogReportController.LogReport(i);
          },
          CancelFunc: () => {
            if (UiManager_1.UiManager.IsViewOpen("SummaryPopView")) {
              UiManager_1.UiManager.CloseView("SummaryPopView");
            }
            this.x2u = false;
          }
        };
        UiManager_1.UiManager.OpenView("SummaryPopView", i);
      }
    };
    this.HightLightInAttribute = i => {
      var t = this.GMu(this.pMu);
      if (t && !this.fbu) {
        t = i ? t.Options[1] : t.Options[0];
        if ((t.Actions?.length ?? 0) > 0) {
          for (const e of t.Actions) {
            this.UBu(e);
          }
        }
        this.GetItem(24).SetUIActive(i);
        this.GetItem(23).SetUIActive(!i);
      }
    };
    this.OnPositionMaxClaer = () => {
      for (var [, i] of this.EMu) {
        i.SetAttributeItem(false);
      }
      this.GetItem(24).SetUIActive(false);
      this.GetItem(23).SetUIActive(false);
    };
    this.XTt = () => {
      for (const i of this.Yal) {
        i.CloseTipsItem();
      }
      for (const t of this.MMu) {
        t.CloseTipsItem();
      }
    };
    this.B2u = i => {
      this.lLt?.SetUiActive(i);
      if (this.x2u = i) {
        this.eVi?.PlayReSetSequence();
      }
    };
    this.XBo = () => {
      this.mMu = false;
      this.dMu = false;
    };
    this.YHt = i => {
      if (i === "HelpView") {
        this.x2u = true;
        this.eVi?.PlayReSetSequence();
      }
    };
    this.$Oe = i => {
      if (i === "HelpView") {
        this.x2u = false;
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UISprite], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIDraggableComponent], [15, UE.UIText], [16, UE.UIItem], [17, UE.UIText], [18, UE.UIText], [20, UE.UIButtonComponent], [19, UE.UITexture], [21, UE.UIItem], [22, UE.UIButtonComponent], [23, UE.UIItem], [24, UE.UIItem], [25, UE.UIItem]];
    this.BtnBindInfo = [[22, this.aRo], [20, this.$Ht]];
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    await this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.lqe.SetCloseCallBack(() => {
      this.CloseMe();
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
    this.MMu.push(i);
    this.MMu.push(t);
    this.MMu.push(e);
    this.MMu.push(s);
    var i = new KingShipBuffItem_1.KingShipBuffItem();
    var t = new KingShipBuffItem_1.KingShipBuffItem();
    var e = new KingShipBuffItem_1.KingShipBuffItem();
    await Promise.all([i.CreateThenShowByActorAsync(this.GetItem(11).GetOwner()), t.CreateThenShowByActorAsync(this.GetItem(12).GetOwner()), e.CreateThenShowByActorAsync(this.GetItem(13).GetOwner())]);
    i.OnClickTipsCallBack = this.B2u;
    t.OnClickTipsCallBack = this.B2u;
    e.OnClickTipsCallBack = this.B2u;
    this.Yal.push(i);
    this.Yal.push(t);
    this.Yal.push(e);
    this.lLt = new DynamicMaskButton_1.DynamicMaskButton();
    this.lLt.SetButtonFunction(this.XTt);
    await this.lLt.Init();
    this.lLt.GetRootItem().SetAsFirstHierarchy();
    this.pWc = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(21));
    this.pWc.BindSequenceCloseEvent(i => {
      if (i === "GuideIn") {
        this.pWc?.PlayLevelSequenceByName("Loop");
      }
      if (i === "GuideOut") {
        this.GetItem(21).SetUIActive(false);
      }
    });
    this.vWc = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(16));
    this.vWc.BindSequenceCloseEvent(i => {
      if (i === "Achievement") {
        this.U2u--;
        this.GetItem(16).SetUIActive(false);
      }
    });
    this.CWc = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(25));
    this.dQc = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnStart() {
    var i = this.OpenParam;
    this.dbu = i.ReignsId;
    this.J9c = i.NextReignsId;
    var t = PublicUtil_1.PublicUtil.GetConfigTextByKey("Reigns_" + this.dbu + "_TargetText");
    this.GetText(2).SetText(t);
    this.DMu(i.FlowId);
    this.BMu(i.BaseAttribute);
    this.IMu.push(...i.EndingList);
    this.kMu();
    this.xDo();
    this.SMu = CommonParamById_1.configCommonParamById.GetFloatConfig("KingShipStaticCardMoveSpeed") ?? 0;
    var t = PublicUtil_1.PublicUtil.GetConfigTextByKey("Reigns_" + this.dbu + "_TitleText");
    this.lqe.SetTitle(t);
    this.yMu = i.UseReducePercent ? i.PropertyDownReducePercent : 0;
    this.GetItem(16).SetUIActive(false);
    this.dQc?.BindSequenceCloseEvent(i => {
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
    this.mMu = false;
    this.dMu = false;
    this.eVi?.ClearCardItemRotation();
    this.Og();
  }
  OnBeforeDestroy() {
    this.pWc?.Clear();
    this.pWc = undefined;
    this.CWc?.Clear();
    this.CWc = undefined;
    this.vWc?.Clear();
    this.vWc = undefined;
    this.dQc?.Clear();
    this.dQc = undefined;
    this.lLt?.Destroy();
  }
  DMu(i) {
    for (const h of ConfigManager_1.ConfigManager.FlowConfig.GetFlowStateActions(i[0], Number(i[1]), Number(i[2]))) {
      if (h.Name === "ShowTalk") {
        var t;
        var e = h.Params;
        if (StringUtils_1.StringUtils.IsEmpty(this.uCa) && !StringUtils_1.StringUtils.IsEmpty(e.TalkOutline?.TidOutline)) {
          t = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(e.TalkOutline.TidOutline);
          this.uCa = ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(t);
        }
        for (const r of e.TalkItems) {
          this.CMu ||= r.Id;
          var s = {
            Id: r.Id,
            Options: r.Options,
            Tid: r.TidTalk ?? "",
            WhoId: r.WhoId ?? 0,
            BackGroundConfig: r.BackgroundConfig?.ImageAsset ?? ""
          };
          this.TMu.push(s);
          for (const n of r.Actions ?? []) {
            this.OMu(n);
          }
        }
      }
    }
    if (this.vMu) {
      this.pMu = this.vMu;
      this.vMu = 0;
    } else {
      this.pMu = this.CMu;
    }
    this.GetButton(20).RootUIComp.SetUIActive(!StringUtils_1.StringUtils.IsEmpty(this.uCa));
  }
  BMu(i) {
    let t = 0;
    this.xBu = [];
    for (const s of i) {
      this.xBu.push(s.AttributeId);
      var e = this.MMu[t++];
      e.RefreshItem(s, this.B2u);
      this.EMu.set(s.AttributeId, e);
      e.SetIsShow(s.IsDefaultEnable);
    }
    for (const h of this.MMu) {
      if (!h.HaveRefresh) {
        h.SetIsShow(false);
      }
    }
  }
  kMu() {
    for (const s of this.IMu) {
      if (s.IsSuccess) {
        var i = s.Conditions.Conditions[0];
        var t = ConfigManager_1.ConfigManager.KingShipConfig.GetKingShipAttribute(i.PropertyId);
        var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Name);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "KingShipAttributeEnough", e, i.Target);
        this.SetSpriteByPath(t.Icon, this.GetSprite(4), false);
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
  }
  cHt() {
    var i = this.GMu(this.pMu);
    if (i) {
      this.eVi?.RefreshCardItemByShowTalk(i.WhoId, i.BackGroundConfig);
      this.eVi?.SetLeftAndRight(i.Options[0].TidTalkOption, i.Options[1].TidTalkOption);
    }
  }
  X7e() {
    var i;
    var t = this.GMu(this.pMu);
    if (t) {
      t = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(t.Tid) ?? "";
      if (!(i = this.GetText(15)).bIsUIActive) {
        this.dQc?.PlayLevelSequenceByName("TextIn");
      }
      i.SetUIActive(true);
      i.SetText(t);
    }
  }
  W4l(i = false) {
    if (!this.eQc || !i) {
      if (i) {
        this.eQc = true;
      }
      for (const t of this.Yal) {
        t.RefreshItem();
      }
    }
  }
  OnTick(i) {
    for (const t of this.MMu) {
      t.Update();
    }
    if (this.D2u()) {
      if (this.eVi) {
        this.eVi.Update(i);
      }
      this.FMu();
      this.NMu();
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.XBo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenView, this.YHt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Oe);
    var i = this.GetDraggable(14);
    i.OnPointerDragCallBack.Bind(this.B8i);
    i.OnPointerEndDragCallBack.Bind(this.b8i);
    InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.UI左摇杆左, this.PMu);
    InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.UI左摇杆右, this.xMu);
    InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.UI键盘F手柄A, this.AMu);
    InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.Ui方向左, this.PMu);
    InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.Ui方向右, this.xMu);
    InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.UI键盘空格, this.AMu);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.XBo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenView, this.YHt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Oe);
    var i = this.GetDraggable(14);
    i.OnPointerBeginDragCallBack.Unbind();
    i.OnPointerDragCallBack.Unbind();
    i.OnPointerEndDragCallBack.Unbind();
    InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.UI左摇杆左, this.PMu);
    InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.UI左摇杆右, this.xMu);
    InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.UI键盘F手柄A, this.AMu);
    InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.Ui方向左, this.PMu);
    InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.Ui方向右, this.xMu);
    InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.UI键盘空格, this.AMu);
  }
  FMu() {
    var i;
    var t;
    if (!Info_1.Info.IsInTouch()) {
      if (t = Global_1.Global.CharacterController.GetCursorPosition()) {
        if (t.X !== this.LMu?.X && t.X !== this.LMu?.X && !this.mMu && !this.dMu) {
          this.fMu = true;
        }
        this.LMu.X = t.X;
        this.LMu.Y = t.Y;
        if (this.fMu) {
          Global_1.Global.CharacterController.GetViewportSize(this.DXe, this.RXe);
          i = (0, puerts_1.$unref)(this.DXe) / 2;
          t = (t.X - i) / i;
          this.eVi.SetCardItemPitchByPercentage(t);
        }
      } else if (this.fMu) {
        this.eVi.ClearCardItemRotation();
      }
    }
  }
  NMu() {
    if (this.dMu || this.mMu) {
      this.eVi.SetCardItemInputPitch(this.dMu ? this.SMu : -this.SMu);
    }
  }
  RMu() {
    this.VMu(true);
  }
  wMu() {
    this.VMu(false);
  }
  VMu(i) {
    this.UMu(false);
    if (this.gMu) {
      this.eVi?.PlaySequenceByName(i ? "DropR" : "DropL");
      if (this.fbu) {
        this.W4l(true);
        this.iQc();
        return;
      } else {
        this.Og();
        this.gMu = false;
        return;
      }
    }
    this.jMu();
    this.eVi?.PlaySequenceByName(i ? "DropR" : "DropL");
  }
  OMu(i) {
    var t;
    if (i.Name === "ReignsChangePlayerName") {
      t = i.Params;
      this.vVi(t.PlayerNameId);
    }
    if (i.Name === "ReignsChangeBackground") {
      if ((t = i.Params).ChangeMode === 2) {
        this.dQc?.PlayLevelSequenceByName("Switch");
      } else if (t.ChangeMode === 1) {
        this.dQc?.PlayLevelSequenceByName("SwitchA");
      }
      this.$Mu(t.Background);
    }
    if (i.Name === "ReignsAddBuff") {
      t = i.Params;
      return this.NEn(t.BuffId);
    } else {
      if (i.Name === "ReignsSetPropertyVisible") {
        t = i.Params;
        this.WMu(t.PropertyId, t.IsVisible);
      }
      if (i.Name === "ReignsCallCard") {
        t = i.Params;
        this.QMu(t.CardId);
      }
      if (i.Name === "ReignsTriggerGuide") {
        this.UMu(true);
      }
      if (i.Name === "JumpTalk") {
        t = i.Params;
        this.vMu = t.TalkId;
      }
      if (i.Name === "ReignsCheckSettle") {
        return this.Z9c(true);
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
    this.dQc?.PlayLevelSequenceByName("Title");
  }
  $Mu(i) {
    this.SetTextureByPath(i, this.GetTexture(19));
  }
  NEn(i) {
    var t;
    var e;
    var s = ConfigManager_1.ConfigManager.KingShipConfig.GetKingShipBuff(i);
    var h = new Map();
    for (const l of this.xBu) {
      h.set(l, 0);
    }
    if (s.Type === 1) {
      for (var [r, n] of s.ParamMap) {
        if (!this.fvt(r, n)) {
          return false;
        }
      }
      if (s.Rrounds > 0) {
        this.mbu.set(s.Id, s.Rrounds);
        for (var [o, a] of s.ParamMap) {
          var _ = h.get(o) ?? 0;
          _ += a;
          h.set(o, _);
        }
      }
    }
    if (s.Rrounds > 0) {
      for (const p of this.Yal) {
        if (!p.GetIsShowingRoundsBuff()) {
          p.ShowBuffItem(s.Id, s.Rrounds);
          break;
        }
      }
    }
    if (s.Type === 2) {
      this.mbu.set(s.Id, s.Rrounds);
    }
    for ([t, e] of h) {
      var u = this.EMu.get(t);
      if (u) {
        u.RefreshBuffItem(e, s.Rrounds);
        u.RefreshUpDownItem();
      }
    }
    return true;
  }
  KMu() {
    var i;
    var t;
    var e = new Map();
    for ([i, t] of this.EMu) {
      e.set(i, t.CurrentCount);
    }
    return e;
  }
  XMu() {
    var i;
    var t;
    var e = [];
    for ([i, t] of this.mbu) {
      var s = ConfigManager_1.ConfigManager.KingShipConfig.GetKingShipBuff(i);
      if (s.Type === 2 && t >= 0) {
        e.push(...s.ParamMap.keys());
      }
    }
    return e;
  }
  jMu() {
    for (var [i, t] of this.mbu) {
      var e = ConfigManager_1.ConfigManager.KingShipConfig.GetKingShipBuff(i);
      if (e.Type === 1) {
        for (var [s, h] of e.ParamMap) {
          if (!this.fvt(s, h)) {
            this.eQc = true;
            break;
          }
        }
      }
      if (t - 1 <= 0) {
        this.mbu.delete(i);
      } else {
        this.mbu.set(i, t - 1);
      }
    }
    this.W4l();
    for (var [, r] of this.EMu) {
      r.RefreshBuffRounds();
      r.RefreshUpDownItem();
    }
  }
  fvt(i, t) {
    let e = t;
    if (this.yMu !== 0 && e < 0) {
      e *= 1 - this.yMu * PERCENT_CHANGE;
    }
    this.EMu.get(i).RefreshAttribute(e);
    for (const s of this.IMu) {
      if (s.IsSuccess) {
        if (KingShipUtil_1.KingShipUtil.CheckEndingList([s], this.KMu(), this.XMu())) {
          this.CWc?.PlayLevelSequenceByName("Sweep");
          this.GetItem(5).SetUIActive(true);
        } else {
          this.GetItem(5).SetUIActive(false);
        }
      }
    }
    return this.Z9c(false);
  }
  Z9c(i) {
    var t = [];
    if (i) {
      t.push(...this.IMu);
    } else {
      for (const e of this.IMu) {
        if (!e.IsSuccess) {
          t.push(e);
        }
      }
    }
    const e = KingShipUtil_1.KingShipUtil.CheckEndingList(t, this.KMu(), this.XMu());
    if (e) {
      this.qMu(e);
      return false;
    }
    if (i) {
      for (const s of this.IMu) {
        if (!s.IsSuccess) {
          this.qMu(s);
          return false;
        }
      }
    }
    return true;
  }
  WMu(i, t) {
    this.EMu.get(i)?.SetIsShow(t);
    let e = true;
    for (var [, s] of this.EMu) {
      if (!s.IsUiActiveInHierarchy()) {
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
  QMu(i) {
    var t;
    var e;
    var s = ConfigManager_1.ConfigManager.KingShipConfig.GetReignsCallCard(i);
    if (s) {
      if (s.CardType === "OptionCard") {
        this.eVi?.RefreshCardItemByCallCard(i);
        e = PublicUtil_1.PublicUtil.GetConfigTextByKey("ReignsCard_" + i + "_CardDesc");
        if (!(t = this.GetText(15)).bIsUIActive) {
          this.dQc?.PlayLevelSequenceByName("TextIn");
        }
        t.SetUIActive(true);
        t.SetText(e);
        this.gMu = true;
      } else if (s.CardType === "AchievementCard") {
        this.GetItem(16).SetUIActive(true);
        this.U2u++;
        t = PublicUtil_1.PublicUtil.GetConfigTextByKey("ReignsCard_" + i + "_CardDesc");
        this.GetText(18).SetText(t);
        e = PublicUtil_1.PublicUtil.GetConfigTextByKey("ReignsCard_" + i + "_CardTitle");
        this.GetText(17).SetText(e);
        this.vWc?.PlayLevelSequenceByName("Achievement");
      } else if (s.CardType === "BuffCard") {
        this.eVi?.RefreshCardItemByBuffCard(i);
        this.dQc?.PlayLevelSequenceByName("TextOut");
        this.gMu = true;
      }
    }
  }
  UMu(i) {
    if (i) {
      this.GetItem(21).SetUIActive(true);
      this.pWc?.PlayLevelSequenceByName("GuideIn");
    } else {
      this.pWc?.PlayLevelSequenceByName("GuideOut");
    }
  }
  qMu(i) {
    for (const t of (this.fbu = i).CardIds) {
      this.tQc.Push(t);
    }
    this.iQc();
    this.dQc?.PlayLevelSequenceByName("Ending");
  }
  iQc() {
    if (this.tQc.Size <= 0) {
      if (this.fbu.IsSuccess) {
        this.CloseMe();
        return;
      } else {
        this.YMu();
        return;
      }
    }
    var i;
    var t;
    var e = this.tQc.Pop();
    if (e) {
      if ((i = ConfigManager_1.ConfigManager.KingShipConfig.GetReignsCallCard(e)).CardType === "OptionCard") {
        this.QMu(e);
      } else if (i.CardType === "Settlement") {
        if (this.fbu.IsSuccess) {
          t = {
            CardId: e,
            ReignsId: this.dbu,
            IsSuccess: this.fbu.IsSuccess,
            NextReignsId: this.J9c
          };
          UiManager_1.UiManager.OpenView("KingShipResultView", t);
          this.CloseMe();
        } else {
          t = {
            CardId: e,
            OnCloseCallBack: () => {
              this.YMu();
            }
          };
          this.x2u = true;
          this.eVi?.PlayReSetSequence();
          UiManager_1.UiManager.OpenView("KingShipFailView", t);
        }
      } else if (i.CardType === "StaticImage") {
        e = {
          Path: i.CardBackground,
          FlowId: i.StaticImageFlow,
          OnCloseCallBack: () => {
            if (this.fbu) {
              this.iQc();
            }
          }
        };
        UiManager_1.UiManager.OpenView("KingShipPlotView", e);
      }
    }
  }
  GMu(i) {
    for (const t of this.TMu) {
      if (t.Id === this.pMu) {
        return t;
      }
    }
  }
  HMu() {
    let t = 0;
    for (let i = 0; i < this.TMu.length; i++) {
      if (this.TMu[i].Id === this.pMu) {
        t = i + 1;
        break;
      }
    }
    if (t < this.TMu.length) {
      return this.TMu[t].Id;
    } else {
      return 0;
    }
  }
  YMu() {
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
  UBu(i) {
    if (i.Name === "ReignsAddBuff") {
      i = i.Params;
      i = ConfigManager_1.ConfigManager.KingShipConfig.GetKingShipBuff(i.BuffId);
      if (i.Type === 1) {
        for (var [t, e] of i.ParamMap) {
          this.EMu.get(t).SetAttributeItem(true, e);
        }
      }
    }
  }
  D2u() {
    return !this.x2u && !(this.U2u > 0) && (!Info_1.Info.IsInGamepad() || ControllerHolder_1.ControllerHolder.UiNavigationNewController.GetCurrentNavigationFocusListener()?.GroupName === DEFAULT_NAVIGATION_GROU_NAME);
  }
}
exports.KingShipMainView = KingShipMainView;
//# sourceMappingURL=KingShipMainView.js.map