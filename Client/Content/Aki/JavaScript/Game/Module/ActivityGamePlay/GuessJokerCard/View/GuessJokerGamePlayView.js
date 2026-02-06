"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerGamePlayView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const UiCameraAnimationController_1 = require("../../../UiCameraAnimation/UiCameraAnimationController");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GuessJokerDialogLogic_1 = require("../Data/GuessJokerDialogLogic");
const GuessJokerDefine_1 = require("../GuessJokerDefine");
const GuessJokerUtils_1 = require("../GuessJokerUtils");
const GuessJokerCardItem_1 = require("./Item/GuessJokerCardItem");
const GuessJokerCoinFlipItem_1 = require("./Item/GuessJokerCoinFlipItem");
const GuessJokerHeadItem_1 = require("./Item/GuessJokerHeadItem");
const GuessJokerPositionPanelBase_1 = require("./Item/GuessJokerPositionPanelBase");
const GuessJokerSkillActivateItem_1 = require("./Item/GuessJokerSkillActivateItem");
const GuessJokerSkillItem_1 = require("./Item/GuessJokerSkillItem");
class GuessJokerGamePlayView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.UUf = 0;
    this.lqe = undefined;
    this.CLf = undefined;
    this.pLf = undefined;
    this.vLf = undefined;
    this.yLf = undefined;
    this.SLf = undefined;
    this.K$f = undefined;
    this.X$f = undefined;
    this.MLf = new Map();
    this.zuu = new Map();
    this.Axg = undefined;
    this.U9g = undefined;
    this.ILf = undefined;
    this.TLf = undefined;
    this.Wvg = 0;
    this.CDg = undefined;
    this.pDg = new Map();
    this.vDg = new Map();
    this.pOg = undefined;
    this.t5g = undefined;
    this.yDg = e => {
      var i = this.pDg.get(e);
      if (i) {
        i();
        this.pDg.delete(e);
      }
    };
    this.Wpu = (e, i) => {
      if (e === "LevelChange" && i === "LevelChange") {
        this.UpdateRoundNumber();
      }
    };
    this.zFg = () => {
      this.X$f?.SetClickEnable(false);
      this.ShowFlipCoinEffect(false, () => {
        this.ShowInitialRoundTip(true, () => {
          ModelManager_1.ModelManager.GuessJokerGamePlayModel.ChangeState(4);
        });
      });
    };
    this.RLf = e => {
      var i = e.Data;
      var e = e.GetChoose();
      var i = i.Id;
      var t = this.Axg?.Data?.Id ?? 0;
      this.TLf?.(i, t, e);
    };
    this.dV1 = () => {
      var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(459);
      e.IsEscViewTriggerCallBack = false;
      e.FunctionMap.set(2, () => {
        ModelManager_1.ModelManager.GuessJokerGamePlayModel.GuessJokerExitSaveReport();
        ModelManager_1.ModelManager.GuessJokerGamePlayModel.ExitGame();
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    };
    this.LLf = () => {
      var e = [];
      for (const i of ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetPlayerPlayCardIdList()) {
        e.push(...i.CardIdList);
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GuessJokerCard", 78, "玩家出牌：" + e.join(","));
      }
      this.ILf?.(e);
    };
    this.ULf = () => {
      this.HRr(true);
    };
    this.xLf = () => {
      this.HRr(false);
    };
    this.vOg = e => {
      e = e !== 1;
      this.GetItem(37).SetUIActive(e);
      this.GetItem(40).SetUIActive(e);
      this.GetItem(41).SetUIActive(e);
      this.GetButton(42).RootUIComp.SetUIActive(e);
      this.GetButton(43).RootUIComp.SetUIActive(e);
    };
    this.QJu = () => {
      this.CLf?.ShowLockSkillTips(false);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [8, UE.UIButtonComponent], [7, UE.UIButtonComponent], [10, UE.UIButtonComponent], [9, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UISliderComponent], [15, UE.UIText], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UIItem], [22, UE.UIItem], [23, UE.UIItem], [24, UE.UIItem], [25, UE.UIItem], [26, UE.UIItem], [27, UE.UIItem], [28, UE.UIItem], [29, UE.UIItem], [30, UE.UIItem], [31, UE.UISprite], [32, UE.UIButtonComponent], [33, UE.UIItem], [34, UE.UIText], [35, UE.UIExtendToggle], [36, UE.UIText], [37, UE.UIItem], [38, UE.UIItem], [39, UE.UIText], [40, UE.UIItem], [41, UE.UIItem], [42, UE.UIButtonComponent], [43, UE.UIButtonComponent], [44, UE.UIButtonComponent], [45, UE.UIText], [46, UE.UIText], [47, UE.UISprite]];
    this.BtnBindInfo = [[8, this.LLf], [35, this.vOg], [44, this.QJu]];
  }
  async OnBeforeStartAsync() {
    this.UUf = this.OpenParam;
    var e = [];
    var i = this.GetItem(0);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    e.push(this.lqe.CreateThenShowByActorAsync(i.GetOwner()));
    this.lqe.SetCloseCallBack(this.dV1);
    this.CLf = new GuessJokerHeadItem_1.GuessJokerHeadItem();
    e.push(this.CLf.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()));
    this.pLf = new GuessJokerHeadItem_1.GuessJokerHeadItem();
    e.push(this.pLf.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()));
    this.yLf = new GuessJokerSkillItem_1.GuessJokerSkillItem();
    this.yLf?.BindClickCallback(this.ULf);
    e.push(this.yLf.CreateThenShowByActorAsync(this.GetItem(12).GetOwner()));
    this.SLf = new GuessJokerSkillItem_1.GuessJokerSkillItem();
    this.SLf?.BindClickCallback(this.xLf);
    e.push(this.SLf.CreateThenShowByActorAsync(this.GetItem(13).GetOwner()));
    this.K$f = new GuessJokerSkillActivateItem_1.GuessJokerSkillActivateItem();
    e.push(this.K$f.CreateByActorAsync(this.GetItem(17).GetOwner()));
    this.X$f = new GuessJokerCoinFlipItem_1.GuessJokerCoinFlipItem();
    this.X$f.SetClickCallback(this.zFg);
    this.X$f.SetClickEnable(false);
    e.push(this.X$f.CreateByActorAsync(this.GetItem(18).GetOwner()));
    await Promise.all(e);
    await this.BLf();
    await this.kLf();
    this.CDg = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.CDg.BindSequenceCloseEvent(this.yDg);
    this.RootActor.OnSequencePlayEvent.Bind(this.Wpu);
    this.pOg = new GuessJokerDialogLogic_1.GuessJokerDialogLogic();
    this.pOg.InitData({
      GetDialogText: e => {
        if (e === 1) {
          return this.GetText(34);
        }
      },
      OnDialogStart: (e, i, t) => {
        if (e === 0) {
          this.SetDialogText(e, i);
        }
        this.ShowDialog(e, true, t);
      },
      OnDialogEnd: (e, i) => {
        this.ShowDialog(e, false, i);
      },
      OnCancelDialogStartAnim: e => {
        if (e === 1) {
          this.pDg.delete("DialogTipShow");
          this.pDg.delete("DialogTipHide");
        }
      }
    });
  }
  OnBeforeShow() {
    this.qLf();
    this.OLf();
    this.POg();
    this.Opa();
  }
  OnAfterShow() {
    ModelManager_1.ModelManager.GuessJokerGamePlayModel?.SetActiveDialogLogic(this.pOg);
  }
  OnBeforeHide() {
    ModelManager_1.ModelManager.GuessJokerGamePlayModel?.SetActiveDialogLogic(undefined);
    this.pOg?.Clear();
  }
  PushCameraHandle(e, i, t) {
    var s = ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerAiConfigByEntityId(this.UUf);
    if (s !== undefined && (s = s.GamePlayCameraId, s = GuessJokerUtils_1.GuessJokerUtils.GetCameraNameByCameraId(s))) {
      UiCameraAnimationController_1.UiCameraAnimationController.PushCameraHandle(s, i, t);
    }
  }
  PopCameraHandle(e, i, t, s) {
    var r = ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerAiConfigByEntityId(this.UUf);
    if (r !== undefined && (r = r.GamePlayCameraId, r = GuessJokerUtils_1.GuessJokerUtils.GetCameraNameByCameraId(r))) {
      UiCameraAnimationController_1.UiCameraAnimationController.PopCameraHandle(r, i, t, s);
    }
  }
  qLf() {
    this.CLf.SetRoleData(ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetRoleData(1));
    this.pLf.SetRoleData(ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetRoleData(0));
  }
  OLf() {
    var e;
    var i = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetRoleId();
    var i = ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerAiConfigByRoleId(i);
    if (i !== undefined && ((e = i.UseSkillText) && (e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? "", this.yLf?.SetText(e)), e = i.GiveUpSkillText)) {
      i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? "";
      this.SLf?.SetText(i);
    }
  }
  async BLf() {
    var e = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetAllCardDataList();
    var i = [];
    for (const o of e) {
      i.push(this.Y5i(o));
    }
    await Promise.all(i);
    var t = [];
    var s = [];
    for (const h of e) {
      var r = this.zuu.get(h.Id);
      var a = h.GetBelongPlayerType();
      if (a === 1) {
        t.push(r);
      } else if (a === 0) {
        s.push(r);
      }
      r.SetClickEnable(false);
      r.CardFlip(a === 0, false);
    }
  }
  async kLf() {
    var e = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetBlankCardData();
    this.vLf = new GuessJokerCardItem_1.GuessJokerCardItem(e);
    await this.vLf.CreateThenShowByActorAsync(this.GetItem(4).GetOwner());
    this.vLf.CardFlip(true, false);
  }
  POg() {
    var e = ModelManager_1.ModelManager.GuessJokerGamePlayModel.RoundNumber;
    this.GetText(3).SetText("" + (e === 0 ? 1 : e));
    this.vLf.RefreshCardItem();
    for (const i of this.zuu.values()) {
      if (i.Data.IsBlank()) {
        i.RefreshCardItem();
      }
    }
  }
  Opa() {
    var e = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetPlayerNameByType(1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(39), "GuessJoker_AiSelectText", e);
  }
  HidePlayerButtons() {
    this.PlayGamePlayViewSequence("BtnHide", () => {
      this.GetItem(29).SetUIActive(false);
    });
  }
  async Y5i(e) {
    var i = new GuessJokerCardItem_1.GuessJokerCardItem(e);
    await i.CreateByResourceIdAsync("UiItem_GhostCardItem", this.RootItem);
    i.SetUiParent(this.GetItem(9));
    i.BindClickCallback(this.RLf);
    this.zuu.set(e.Id, i);
    return i;
  }
  OnBeforeDestroy() {
    for (const e of this.zuu.values()) {
      e.Destroy();
    }
    this.zuu.clear();
  }
  GetCardItemById(e) {
    return this.zuu.get(e);
  }
  SwapCardItemMap(e, i) {
    var t = this.zuu.get(e);
    var s = this.zuu.get(i);
    if (t && s) {
      this.zuu.set(e, s);
      this.zuu.set(i, t);
    }
  }
  SDg(e) {
    let i = this.vDg.get(e);
    if (!i) {
      var t = this.GetItem(e);
      if (!t) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GuessJokerCard", 78, "Item not found: " + e);
        }
        return;
      }
      i = new LevelSequencePlayer_1.LevelSequencePlayer(t);
      this.vDg.set(e, i);
    }
    return i;
  }
  SetPlayerPlayCardInteractiveCallback(i) {
    this.ILf = e => {
      this.HidePlayerButtons();
      i?.(e);
    };
  }
  SetPlayerCardClickCallback(e) {
    this.TLf = e;
  }
  SetFlipCoinClickEnable() {
    this.X$f?.SetClickEnable(true);
  }
  SetPlayerSkillRequestCallback(e) {
    this.t5g = e;
  }
  UpdateRoundNumber() {
    var e = ModelManager_1.ModelManager.GuessJokerGamePlayModel.RoundNumber;
    this.GetText(3).SetText("" + (e === 0 ? 1 : e));
  }
  PlayGamePlayViewSequence(e, i) {
    this.CDg?.PlaySequencePurely(e);
    if (i) {
      this.pDg.set(e, i);
    }
  }
  SetSkillProgress(e, i) {
    let t = undefined;
    if ((t = e === 1 ? ((e = this.GetSprite(31)).SetFillAmount(1 - i), e) : (this.GetSlider(14).SetValue(1 - i), this.GetSprite(47))) && (e = 1 - i > GuessJokerDefine_1.GUESS_JOKER_SKILL_PROGRESS_THRESHOLD, this.U9g !== e)) {
      i = e ? UE.Color.FromHex("#98edf2") : UE.Color.FromHex("#ec435f");
      t.SetColor(i);
      this.U9g = e;
    }
  }
  ShowAiSkillProgress(e) {
    this.EDg(e, 30);
  }
  ShowDialog(e, i, t) {
    if (e === 1) {
      if (i) {
        this.GetItem(33).SetUIActive(true);
        this.PlayGamePlayViewSequence("DialogTipShow", t);
      } else {
        this.PlayGamePlayViewSequence("DialogTipHide", () => {
          this.GetItem(33).SetUIActive(false);
          t?.();
        });
      }
    } else if (e = this.pLf) {
      e.SetDialogueItemActive(i, t);
    }
  }
  SetDialogText(e, i) {
    if (e === 1) {
      this.GetText(34).ShowTextNew(i);
    } else if (e = this.pLf) {
      e.SetDialogueText(i);
    }
  }
  ShowPlayerButtons(e) {
    this.GetButton(7).RootUIComp.SetUIActive(false);
    this.GetButton(10).RootUIComp.SetUIActive(false);
    this.GetText(36).ShowTextNew("GuessJoker_PlayCardConfirmText");
    this.GetItem(29).SetUIActive(true);
    this.PlayGamePlayViewSequence("BtnShow");
    if (e > 0) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGuideTriggerEvent, "GuessJokerHasPair");
    }
  }
  ShowSkillInteractivePanel(e) {
    var i = e ? "SkillShow" : "SkillHide";
    if (e) {
      this.GetItem(11).SetUIActive(true);
      this.PlayGamePlayViewSequence(i);
    } else {
      this.PlayGamePlayViewSequence(i, () => {
        this.GetItem(11).SetUIActive(false);
        this.t5g = undefined;
      });
    }
  }
  UpdateCurrentPlayer(e) {
    this.CLf.SetSelfRound(e === 1);
    this.pLf.SetSelfRound(e === 0);
  }
  SetCurrentSkillInfo(e, i) {
    this.Wvg = i;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(15), "GuessJoker_SkillChargesText", this.Wvg);
  }
  ShowCards(e, i) {
    for (const s of e) {
      var t = this.GetCardItemById(s);
      if (t) {
        t.CardFlip(i, true);
      }
    }
  }
  BlankCardAnimPlay() {
    var e = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetBlankCardData();
    if (e && e.GetChange()) {
      this.vLf.RefreshCardChangeTexture();
      this.vLf.PlayCardSequence("Change");
      for (const i of this.zuu.values()) {
        if (i.Data.IsBlank()) {
          i.RefreshCardChangeTexture();
          i.PlayCardSequence("Change");
        }
      }
    }
  }
  RemoveCardFromMiddleArea(e) {
    const i = this.GetPositionPanel(7);
    for (const t of i.GetCardIdList()) {
      this.zuu.delete(t);
    }
    i.ShowCardPairNotice(() => {
      i.RemoveCards(e);
    });
  }
  SetBlankCardDisable() {
    this.vLf.SetBlankCardDisable();
  }
  DealCards(e) {
    var i = [];
    var t = [];
    for (const l of ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetAllCardDataList()) {
      var s = this.zuu.get(l.Id);
      var r = l.GetBelongPlayerType();
      if (r === 1) {
        i.push(s);
      } else if (r === 0) {
        t.push(s);
      }
    }
    var a = this.GetPositionPanel(0);
    var o = this.GetPositionPanel(1);
    let h = 0;
    var n = () => {
      if (++h === 2) {
        e();
      }
    };
    AudioSystem_1.AudioSystem.PostEvent("play_ui_springfestival_ghostcard_card_deal");
    a.DealCards(i, n);
    o.DealCards(t, n);
  }
  SetPositionPanelCardsDark(e, i, t = []) {
    this.GetPositionPanel(e).SetCardsDarkExcept(i, t);
  }
  MDg(i, t) {
    const s = this.SDg(i);
    if (s) {
      s.BindSequenceCloseEvent(e => {
        if (e === "Start") {
          s.PlayLevelSequenceByName("Close");
        } else if (e === "Close") {
          this.GetItem(i).SetUIActive(false);
          t?.();
        }
      }, true);
      this.GetItem(i).SetUIActive(true);
      s.PlayLevelSequenceByName("Start");
    } else {
      t?.();
    }
  }
  EDg(e, i, t) {
    var s = this.SDg(i);
    if (s) {
      s.BindSequenceCloseEvent(e => {
        if (e === "Close") {
          this.GetItem(i).SetUIActive(false);
        }
        t?.();
      }, true);
      if (e) {
        this.GetItem(i).SetUIActive(true);
        s.PlayLevelSequenceByName("Start");
      } else {
        s.PlayLevelSequenceByName("Close");
      }
    } else {
      t?.();
    }
  }
  PlaySkillEffect(e, i) {
    this.K$f?.Refresh(e);
    this.MDg(17, i);
  }
  ShowFlipCoinEffect(e, i) {
    if (e) {
      this.X$f?.Refresh();
      this.EDg(true, 18, i);
    } else {
      this.EDg(false, 18, i);
    }
  }
  UpdateHp(e, i) {
    e = e === 1 ? this.CLf : this.pLf;
    if (e) {
      e.UpdateHp(i);
    } else {
      i();
    }
  }
  UpdateSkill(e) {
    e = e === 1 ? this.CLf : this.pLf;
    if (e) {
      e.SetSkillUnlock(true);
    }
  }
  HRr(e) {
    this.t5g?.(e);
  }
  SetCardChoose(e, i) {
    e = this.GetCardItemById(e);
    if (e) {
      if (i) {
        if (this.Axg && this.Axg !== e) {
          this.Axg.SetChoose(false, true);
        }
        this.Axg = e;
      } else if (this.Axg === e) {
        this.Axg = undefined;
      }
      e.SetChoose(i, true);
    }
  }
  ClearChooseCard() {
    if (this.Axg) {
      this.Axg.SetChoose(false, false);
      this.Axg = undefined;
    }
  }
  SetCardsSelect(e, i) {
    e = this.GetCardItemById(e);
    if (e) {
      e.SetSelectCardItem(i);
    }
  }
  UpdateCardItemsHierarchyIndex() {
    var i = Array.from(this.zuu.values());
    i.sort((e, i) => e.GetGlobalIndex() - i.GetGlobalIndex());
    for (let e = 0; e < i.length; e++) {
      i[e].SetHierarchyIndex(e);
    }
  }
  ClearAllCardsChecking() {
    for (const e of this.zuu.values()) {
      e.ClearCheckingSign();
    }
  }
  ShowPlayerRoundStartTip(e, i) {
    this.MDg(e === 1 ? 21 : 22, i);
  }
  ShowPlayerDrawCardTip(e, i) {
    this.EDg(e, 25, i);
  }
  ShowInitialRoundTip(e, i) {
    this.EDg(e, 26, i);
  }
  ShowDrawSpecialTip(e, i, t, s) {
    var r = i ? 24 : 23;
    var a = i ? 46 : 45;
    var i = i ? "GuessJoker_DrawBlankCardTipText" : "GuessJoker_DrawJokerTipText";
    var t = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetPlayerNameByType(t);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(a), i, t);
    this.EDg(e, r, s);
  }
  ShowWinLoseReasonTip(e, i, t, s) {
    var r = t ? 46 : 45;
    var e = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetPlayerNameByType(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(r), i, e);
    this.GetText(r).ShowTextNew(i);
    var e = t ? 24 : 23;
    this.MDg(e, s);
  }
  ShowOfficialRoundStartTip(e) {
    this.MDg(27, e);
  }
  ShowAiSelectCardTip(e, i) {
    this.EDg(e, 38, i);
  }
  GetPositionPanel(e) {
    let i = this.MLf.get(e);
    if (!i) {
      i = new GuessJokerPositionPanelBase_1.GuessJokerPositionPanelBase(e, this);
      this.MLf.set(e, i);
    }
    return i;
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e[0] === "CardById") {
      e = Number(e[1]);
      if (e = this.GetCardItemById(e)?.GetRootItem()) {
        return [e, e];
      } else {
        return undefined;
      }
    }
  }
}
exports.GuessJokerGamePlayView = GuessJokerGamePlayView;
//# sourceMappingURL=GuessJokerGamePlayView.js.map