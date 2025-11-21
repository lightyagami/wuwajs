"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestReviewNodeItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const QuestReviewDefine_1 = require("../../QuestReviewDefine");
const NODE_STATE_TRANS_ANIM_DELAY = 1800;
const NODE_TRIGGER_ANIM_DELAY = 20;
const NODE_FUSION_ANIM_INTERVAL = 100;
class QuestReviewNodeItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.s81 = undefined;
    this.a81 = undefined;
    this.h81 = undefined;
    this.l81 = undefined;
    this.Hea = undefined;
    this.vAu = undefined;
    this.pDe = undefined;
    this.osu = () => {
      let t = "ActivateClose";
      if (this._81(this.pDe)) {
        t = "ActivateClose";
      } else if (this.u81(this.pDe)) {
        t = "ActivateCloseC";
      } else if (this.c81(this.pDe)) {
        t = "NotClose";
      } else if (this.d81(this.pDe)) {
        t = "NotCloseB";
      }
      this.Hea?.PlayLevelSequenceByName(t);
    };
    this.$xt = t => {
      if (this.GetRootActor()?.IsValid() && (t === "Flame" && (this.s81?.SetUiActive(false), this.s81?.SetToggleInteractive(true), ControllerHolder_1.ControllerHolder.QuestReviewController.SetBurnFinish()), t === "Change" && (this.s81?.SetUiActive(false), this.s81?.SetToggleInteractive(true)), t === "Trigger")) {
        ControllerHolder_1.ControllerHolder.QuestReviewController.SetNewTabUnlockFinish();
      }
    };
  }
  get j3() {
    return this.vAu;
  }
  set j3(t) {
    if (this.vAu && TimerSystem_1.TimerSystem.Has(this.vAu)) {
      TimerSystem_1.TimerSystem.Remove(this.vAu);
    }
    this.vAu = t;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    this.s81 = new QuestReviewNodeNormalItem(this.GetItem(5));
    this.a81 = new QuestReviewNodeDestroyItem();
    this.h81 = new QuestReviewNodeStarItem();
    this.l81 = new QuestReviewNodeStarDestroyItem();
    var t = [];
    var e = this.GetItem(1).GetOwner();
    t.push(this.s81.CreateByActorAsync(e));
    var e = this.GetItem(2).GetOwner();
    t.push(this.a81.CreateByActorAsync(e));
    var e = this.GetItem(3).GetOwner();
    t.push(this.h81.CreateByActorAsync(e));
    var e = this.GetItem(4).GetOwner();
    t.push(this.l81.CreateByActorAsync(e));
    await Promise.all(t);
    this.s81.SetSeqPlayer(this.Hea);
    this.a81.SetSeqPlayer(this.Hea);
    this.h81.SetSeqPlayer(this.Hea);
    this.l81.SetSeqPlayer(this.Hea);
  }
  OnStart() {
    this.Hea.BindSequenceCloseEvent(this.$xt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnQuestReviewMainViewBeforeHide, this.osu);
  }
  OnBeforeDestroy() {
    this.j3 = undefined;
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnQuestReviewMainViewBeforeHide, this.osu);
  }
  Refresh(t) {
    this.pDe = t;
    this.s81.SetUiActive(this._81(t));
    this.a81.SetUiActive(this.u81(t));
    this.h81.SetUiActive(this.c81(t));
    this.l81.SetUiActive(this.d81(t));
    if (t.ShouldHide) {
      this.GetRootItem().SetAlpha(0);
    } else {
      this.GetRootItem().SetAlpha(1);
      if (this._81(t)) {
        this.Hea?.PlayLevelSequenceByName("Flame");
        this.Hea?.StopCurrentSequence();
        this.s81.Refresh(t);
      }
      if (this.u81(t)) {
        this.a81.Refresh(t);
      }
      if (this.c81(t)) {
        this.h81.Refresh(t);
      }
      if (this.d81(t)) {
        this.l81.Refresh(t);
      }
      this.Blu(t);
    }
  }
  Blu(t) {
    var e;
    var i;
    var s = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewLineDataById(t.LineId);
    if (!s?.SkipAnim) {
      if (this._81(t)) {
        if (ModelManager_1.ModelManager.QuestReviewModel.IsFirstEntry()) {
          this.I_u(t);
          if (t.Data?.IsFirstTimeShow) {
            t.Data.IsFirstTimeShow = false;
          }
          if (s?.IsFirstTimeShow) {
            s.IsFirstTimeShow = false;
          }
        } else {
          if (s?.IsShow && s?.IsFirstTimeShow && (this.nsu(t), t.Data?.IsFirstTimeShow)) {
            t.Data.IsFirstTimeShow = false;
          }
          if (t.Data?.IsFirstTimeShow) {
            this.nsu(t);
            t.Data.IsFirstTimeShow = false;
          } else {
            this.Hea.PlayLevelSequenceByName("ActivateStart");
          }
        }
      } else if (this.u81(t)) {
        if (s?.IsDestroy && s?.IsFirstTimeDestroy) {
          this.ssu(t);
          if (t.Data?.IsFirstTimeShow) {
            t.Data.IsFirstTimeShow = false;
          }
        } else {
          this.Hea.PlayLevelSequenceByName("ActivateStartC");
        }
      } else if (this.c81(t)) {
        e = t.LineId === QuestReviewDefine_1.NEW_QUEST_LINE;
        i = ModelManager_1.ModelManager.QuestReviewModel.HasQuestLineFused();
        if (e && !i) {
          this.h81?.SetUiActive(false);
          this.j3 = TimerSystem_1.TimerSystem.Delay(() => {
            this.h81?.SetUiActive(true);
            this.Hea.PlayLevelSequenceByName("UnTrigger");
          }, NODE_TRIGGER_ANIM_DELAY);
        } else {
          this.Hea.PlayLevelSequenceByName("NotStart");
        }
      } else if (this.d81(t)) {
        if (s?.IsDestroy && s?.IsFirstTimeDestroy) {
          this.asu(t);
          if (t.Data?.IsFirstTimeShow) {
            t.Data.IsFirstTimeShow = false;
          }
        } else {
          this.Hea.PlayLevelSequenceByName("NotStartB");
        }
      }
    }
  }
  _81(t) {
    var e = ModelManager_1.ModelManager.QuestReviewModel.GetPredecessorNodeByNodeId(t.Data?.Id ?? 0);
    return !!t.Data && t.Data.State !== 0 && !t.IsDestroy && (t.Data.ShowOnceUnlock || !e || e?.State === 3);
  }
  u81(t) {
    return !!t.Data && t.IsDestroy;
  }
  c81(t) {
    var e = ModelManager_1.ModelManager.QuestReviewModel.GetPredecessorNodeByNodeId(t.Data?.Id ?? 0);
    return (!t.Data || t.Data.State === 0 || !t.Data.ShowOnceUnlock && !!e && e.State < 3) && !t.IsDestroy;
  }
  d81(t) {
    var e = ModelManager_1.ModelManager.QuestReviewModel.GetPredecessorNodeByNodeId(t.Data?.Id ?? 0);
    return (!t.Data || t.Data.State === 0 || !t.Data.ShowOnceUnlock && !!e && e.State < 3) && t.IsDestroy;
  }
  nsu(t) {
    this.s81?.SetUiActive(false);
    this.h81?.SetUiActive(true);
    this.h81?.Refresh(t);
    this.Hea.PlayLevelSequenceByName("NotStart");
    const e = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewLineDataById(t.LineId);
    this.j3 = TimerSystem_1.TimerSystem.Delay(() => {
      this.s81?.SetUiActive(true);
      this.Hea?.PlayLevelSequenceByName(e.ShowSeqName);
    }, NODE_TRIGGER_ANIM_DELAY);
  }
  I_u(t) {
    this.s81?.SetUiActive(false);
    this.h81?.SetUiActive(true);
    this.h81?.Refresh(t);
    const e = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewLineDataById(t.LineId);
    this.j3 = TimerSystem_1.TimerSystem.Delay(() => {
      this.s81?.SetUiActive(true);
      this.Hea?.PlayLevelSequenceByName(e.NodeFirstActivateSeqName);
    }, NODE_STATE_TRANS_ANIM_DELAY);
  }
  async ssu(t) {
    this.a81?.SetUiActive(false);
    this.s81?.SetUiActive(true);
    this.s81?.SetToggleInteractive(false);
    this.s81?.Refresh(t);
    const e = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewLineDataById(t.LineId);
    if (e.IsFusionLine) {
      this.Hea?.PlayLevelSequenceByName("Flame");
      this.Hea?.StopCurrentSequence();
      await ControllerHolder_1.ControllerHolder.QuestReviewController.BurnFinishPromise.Promise;
      await TimerSystem_1.TimerSystem.Wait(Math.max(NODE_FUSION_ANIM_INTERVAL * t.SlotIndex, TimerSystem_1.MIN_TIME));
      await this.Hea?.PlaySequenceAsync(e.DestroySeqName, new CustomPromise_1.CustomPromise());
      if (e.DisplayOrder === 4) {
        ControllerHolder_1.ControllerHolder.QuestReviewController.SetFusionFinish();
      }
    } else {
      this.j3 = TimerSystem_1.TimerSystem.Next(() => {
        this.a81?.SetUiActive(true);
        this.Hea?.PlayLevelSequenceByName(e.DestroySeqName);
      });
    }
  }
  async asu(t) {
    this.l81?.SetUiActive(false);
    this.h81?.SetUiActive(true);
    this.h81?.Refresh(t);
    const e = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewLineDataById(t.LineId);
    if (e.IsFusionLine) {
      await ControllerHolder_1.ControllerHolder.QuestReviewController.BurnFinishPromise.Promise;
      await TimerSystem_1.TimerSystem.Wait(TimerSystem_1.MIN_TIME);
      await TimerSystem_1.TimerSystem.Wait(Math.max(NODE_FUSION_ANIM_INTERVAL * t.SlotIndex, TimerSystem_1.MIN_TIME));
      this.l81?.SetUiActive(!e.IsFusionLine);
      this.Hea?.PlayLevelSequenceByName("Unchange");
    } else {
      this.j3 = TimerSystem_1.TimerSystem.Next(() => {
        this.l81?.SetUiActive(!e.IsFusionLine);
        this.Hea?.PlayLevelSequenceByName("NotFlameA");
      });
    }
  }
}
exports.QuestReviewNodeItem = QuestReviewNodeItem;
class QuestReviewNodeItemBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SeqPlayer = undefined;
  }
  Refresh(t) {}
  SetSeqPlayer(t) {
    this.SeqPlayer = t;
  }
  PlaySeqByName(t) {
    this.SeqPlayer?.PlayLevelSequenceByName(t);
  }
}
const NORMAL_VERTICAL_LINE_HEIGHT = 50;
const BRANCHING_VERTICAL_LINE_HEIGHT = 320;
const LINE_ALPHA = 0.5;
class QuestReviewNodeNormalItem extends QuestReviewNodeItemBase {
  constructor(t) {
    super();
    this.hsu = t;
    this.Pe = undefined;
    this.tW1 = () => {
      ControllerHolder_1.ControllerHolder.QuestReviewController.OpenQuestNodeDetail(this.Pe.Id);
      this.GetExtendToggle(13).SetToggleState(0);
      this.Pe.HasRedDot = false;
      this.hsu.SetUIActive(false);
    };
    this.m2u = t => {
      if (this.Pe?.Id === t) {
        this.hsu.SetUIActive(false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UIText], [4, UE.UISprite], [5, UE.UISprite], [6, UE.UISprite], [7, UE.UISprite], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UISprite], [11, UE.UISprite], [12, UE.UISprite], [13, UE.UIExtendToggle], [14, UE.UITexture]];
    this.BtnBindInfo = [[13, this.tW1]];
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnOpenQuestReviewDetail, this.m2u);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnOpenQuestReviewDetail, this.m2u);
  }
  Refresh(t) {
    this.Pe = t.Data;
    this.GetRootItem().SetAlpha(1);
    this.f81.SetAlpha(LINE_ALPHA);
    this.m81.SetAlpha(LINE_ALPHA);
    this.SetTextureByPath(this.Pe.ImageSmall, this.GetTexture(0));
    this.SetTextureByPath(this.Pe.ImageSmall, this.GetTexture(14));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), this.Pe.TitleId);
    this.GetItem(8).SetUIActive(this.Pe.LineType === 1);
    this.GetItem(9).SetUIActive(this.Pe.LineType === 0);
    var e = this.Pe.IsBranching ? BRANCHING_VERTICAL_LINE_HEIGHT : NORMAL_VERTICAL_LINE_HEIGHT;
    this.m81.SetHeight(e);
    this.m81.SetUIActive(this.Pe.IsBranching);
    this.GetSprite(4).SetUIActive(!t.IsLastSlotEmpty);
    this.SetSpriteByPath(t.RoundIcon, this.GetSprite(4), false);
    this.iZ1(t);
    var e = ModelManager_1.ModelManager.QuestReviewModel.GetQuestReviewLineDataById(t.LineId);
    this.hsu.SetUIActive(t.Data.HasRedDot && !e.IsDestroy);
  }
  SetToggleInteractive(t) {
    this.GetExtendToggle(13).SetSelfInteractive(t);
  }
  get m81() {
    if (this.Pe.LineType === 0) {
      return this.GetSprite(2);
    } else {
      return this.GetSprite(12);
    }
  }
  get f81() {
    if (this.Pe.LineType === 0) {
      return this.GetSprite(1);
    } else {
      return this.GetSprite(10);
    }
  }
  get rZ1() {
    if (this.Pe.LineType === 0) {
      return this.GetSprite(6);
    } else {
      return this.GetSprite(11);
    }
  }
  iZ1(t) {
    this.m81.SetColor(UE.Color.FromHex(t.LineColorHex));
    this.f81.SetColor(UE.Color.FromHex(t.LineColorHex));
    this.rZ1.SetColor(UE.Color.FromHex(t.LineColorHex));
  }
}
class QuestReviewNodeDestroyItem extends QuestReviewNodeItemBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite]];
  }
  Refresh(t) {
    this.GetRootItem().SetAlpha(1);
    this.GetSprite(0).SetAlpha(LINE_ALPHA);
    this.GetSprite(1).SetAlpha(LINE_ALPHA);
    this.GetSprite(1).SetUIActive(!t.IsLastSlotEmpty);
    this.SetSpriteByPath(t.RoundIcon, this.GetSprite(1), false);
    t = UE.Color.FromHex(t.LineColorHex);
    this.GetSprite(0).SetColor(t);
  }
}
const STAR_HORIZONTAL_LINE_STRETCH_RIGHT = -190;
class QuestReviewNodeStarItem extends QuestReviewNodeItemBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UISprite]];
  }
  Refresh(t) {
    this.GetRootItem().SetAlpha(1);
    this.GetSprite(0).SetAlpha(LINE_ALPHA);
    this.GetSprite(2).SetAlpha(LINE_ALPHA);
    this.GetSprite(1).SetAlpha(LINE_ALPHA);
    this.GetSprite(1).SetUIActive(!t.IsLastSlotEmpty);
    this.SetSpriteByPath(t.RoundIcon, this.GetSprite(1), false);
    this.SetSpriteByPath(t.StarIcon, this.GetSprite(3), false);
    this.GetSprite(0).SetUIActive(true);
    this.GetSprite(2).SetUIActive(false);
    var e = t.IsLastSlot ? 0 : STAR_HORIZONTAL_LINE_STRETCH_RIGHT;
    this.f81.SetStretchRight(e);
    var e = UE.Color.FromHex(t.LineColorHex);
    this.f81.SetColor(e);
  }
  get f81() {
    return this.GetSprite(0);
  }
}
class QuestReviewNodeStarDestroyItem extends QuestReviewNodeItemBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UIItem]];
  }
  Refresh(t) {
    this.GetRootItem().SetAlpha(1);
    this.GetSprite(0).SetAlpha(LINE_ALPHA);
    this.GetSprite(1).SetAlpha(LINE_ALPHA);
    this.GetSprite(1).SetUIActive(!t.IsLastSlotEmpty);
    this.GetItem(2).SetUIActive(!t.IsLastSlotEmpty);
    this.SetSpriteByPath(t.RoundIcon, this.GetSprite(1), false);
    var e = UE.Color.FromHex(t.LineColorHex);
    this.GetSprite(0).SetColor(e);
    var e = t.IsLastSlot ? 0 : STAR_HORIZONTAL_LINE_STRETCH_RIGHT;
    this.GetSprite(0).SetStretchRight(e);
  }
}
//# sourceMappingURL=QuestReviewNodeItem.js.map