"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchUiCardItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const Macro_1 = require("../../../../../Core/Preprocessor/Macro");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewSequence_1 = require("../../../../Ui/Base/UiViewSequence");
const FloroRanchDefine_1 = require("../../FloroRanchDefine");
const FloroRanchBuffRemindDayItem_1 = require("./FloroRanchBuffRemindDayItem");
const FloroRanchEntityDebugInfoItem_1 = require("./FloroRanchEntityDebugInfoItem");
const FloroRanchEvolveItem_1 = require("./FloroRanchEvolveItem");
const FloroRanchUiItemBase_1 = require("./FloroRanchUiItemBase");
class FloroRanchUiCardItem extends FloroRanchUiItemBase_1.FloroRanchUiItemBase {
  constructor() {
    super(...arguments);
    this.MAu = undefined;
    this.QHu = undefined;
    this.UiLevelSequence = undefined;
    this.M$e = undefined;
    this.cWu = undefined;
    this.TDe = undefined;
    this.cAo = undefined;
    this.qKu = undefined;
    this.xsr = Vector_1.Vector.Create();
    this.Igo = Vector_1.Vector.Create();
    this.l$t = Vector_1.Vector.Create();
    this.cz = Vector_1.Vector.Create();
    this.fz = Vector_1.Vector.Create();
    this.cie = Rotator_1.Rotator.Create();
    this.Ele = Rotator_1.Rotator.Create();
    this.e8 = 0;
    this.J_ = i => {
      if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsSkip) {
        this.MoveToOriginalPositionImmediate();
        this._1o();
      } else {
        this.e8 += i;
        this.xsr.Multiply(this.cWu.GetFloatValue(this.e8 / FloroRanchDefine_1.FLORO_RANCH_CARD_MOVE_TIME), this.cz);
        this.Igo.Addition(this.cz, this.fz);
        this.GetRootItem().SetUIWorldLocation(this.fz.ToUeVectorOld());
        if (this.e8 >= FloroRanchDefine_1.FLORO_RANCH_CARD_MOVE_TIME) {
          this.GetRootItem().SetUIWorldLocation(this.l$t.ToUeVectorOld());
          this.GetItem(0).SetUIRelativeRotation(this.Ele.ToUeRotator());
          this._1o();
        }
      }
    };
    this.dWu = i => {
      if (i && i.getAnimationName() === "eat") {
        (i = this.GetSpine(1)).SetAnimation(0, "idle", true);
        i.SetTimeScale(1);
      }
    };
    this.mWu = i => {
      this.GetRootItem().SetUIWorldLocation(this.M$e);
      this.GetRootItem().SetUIActive(false);
      this.GetSpine(1).ClearTracks();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.SpineSkeletonAnimationComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UINiagara], [5, UE.UINiagara], [6, UE.UINiagara], [7, UE.UINiagara]];
  }
  OnBeforeCreate() {
    this.UiLevelSequence = new UiViewSequence_1.UiBehaviorLevelSequence(this);
    this.AddUiBehavior(this.UiLevelSequence);
  }
  async OnBeforeStartAsync() {
    this.GetSpine(1).AnimationComplete.Add(this.dWu);
    this.UiLevelSequence.AddSequenceFinishEvent("Fushion2", this.mWu);
    this.UiLevelSequence.AddSequenceFinishEvent("Swallowed", this.mWu);
    this.UiLevelSequence.AddSequenceFinishEvent("Sacrifice", this.mWu);
    this.UiLevelSequence.AddSequenceFinishEvent("Close", this.mWu);
    this.MAu = new FloroRanchEvolveItem_1.FloroRanchEvolveItem();
    await this.MAu.CreateByActorAsync(this.GetItem(2).GetOwner());
    this.MAu.SetUiActive(false);
    this.QHu = new FloroRanchBuffRemindDayItem_1.FloroRanchBuffRemindDayItem();
    await this.QHu.CreateByActorAsync(this.GetItem(3).GetOwner());
    this.QHu.SetUiActive(false);
  }
  FollowPosition(i) {
    i = i.GetLocation();
    i.Z -= FloroRanchDefine_1.FLORO_RANCH_CARD_OFFSET_Z;
    this.M$e = i;
    this.GetRootItem().SetUIWorldLocation(this.M$e);
  }
  async RefreshItem() {
    var i = this.Entity.CheckGetComponent(1).CardData;
    this.RefreshEvolveItem();
    this.RefreshRemainTimeItem();
    this.RefreshSpecialEffect();
    this.RefreshDebugInfo();
    await this.SetSpineAssetByPath(i.GetSpineAtlas(), i.GetSpineData(), this.GetSpine(1));
  }
  RefreshEvolveItem() {
    var i = this.Entity.CheckGetComponent(1);
    this.MAu.Refresh(i.EvolveData);
    this.MAu.GetRootItem().SetAnchorOffsetY(i.CardData.GetEvolveItemOffsetY());
  }
  RefreshRemainTimeItem() {
    var i = this.Entity.CheckGetComponent(0);
    this.QHu.Refresh(i.GetMinRemindDayBuff());
  }
  RefreshSpecialEffect() {
    var i = this.Entity.CheckGetComponent(1).CardData.GetCardSpecialEffect();
    this.GetUiNiagara(4).SetUIActive(i === 1);
    this.GetUiNiagara(5).SetUIActive(i === 2);
  }
  RefreshDebugInfo() {}
  async PlayShowAnim() {
    await this.RefreshItem();
    this.GetSpine(1).SetAnimation(0, "idle", true);
    this.GetRootItem().SetUIActive(true);
    if (this.UiLevelSequence.IsInSequence()) {
      this.UiLevelSequence.StopPrevSequence(false, true);
    }
    this.UiLevelSequence.PlaySequence("Start", false, ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetTimeDilation());
    await ModelManager_1.ModelManager.FloroRanchGamePlayModel.FloroRanchTimerSystem.Wait(FloroRanchDefine_1.FLORO_RANCH_CARD_SHOW_ANIM_WAIT_TIME);
  }
  async PlayHideAnim() {
    if (this.UiLevelSequence.IsInSequence()) {
      this.UiLevelSequence.StopPrevSequence(false, true);
    }
    this.UiLevelSequence.PlaySequence("Close", false, ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetTimeDilation());
    var i = this.GetSpine(1);
    if (i) {
      i.ClearTracks();
    }
    await ModelManager_1.ModelManager.FloroRanchGamePlayModel.FloroRanchTimerSystem.Wait(FloroRanchDefine_1.FLORO_RANCH_CARD_HIDE_ANIM_WAIT_TIME);
  }
  ShowCoinNiagara(i) {
    var t = this.GetUiNiagara(6);
    var e = this.GetUiNiagara(7);
    t.SetUIActive(false);
    e.SetUIActive(false);
    if (i >= FloroRanchDefine_1.FLORO_RANCH_POPUP_REWARD_RED_COIN_COUNT) {
      e.SetUIActive(true);
    } else if (i >= FloroRanchDefine_1.FLORO_RANCH_POPUP_REWARD_YELLOW_COIN_COUNT) {
      t.SetUIActive(true);
    }
  }
  async ShowUiItem() {
    if (this.UiLevelSequence.IsInSequence()) {
      this.UiLevelSequence.StopPrevSequence(false, true);
    }
    await this.RefreshItem();
    this.GetSpine(1).SetAnimation(0, "idle", true);
    this.GetRootItem().SetUIActive(true);
    var i = new CustomPromise_1.CustomPromise();
    await this.UiLevelSequence.PlaySequenceAsync("SkipStart", i);
  }
  async HideUiItem() {
    if (this.UiLevelSequence.IsInSequence()) {
      this.UiLevelSequence.StopPrevSequence(false, true);
    }
    this.GetRootItem().SetUIActive(false);
    this.GetSpine(1).ClearTracks();
    await Promise.resolve();
  }
  Pause() {
    this.UiLevelSequence.PauseSequence();
    this.GetSpine(1).SetTimeScale(0);
  }
  Resume() {
    this.UiLevelSequence.ResumeSequence();
    this.GetSpine(1).SetTimeScale(1);
  }
  async PlayNormalAnim() {
    if (this.UiLevelSequence.IsInSequence()) {
      this.UiLevelSequence.StopPrevSequence(true, true);
    }
    this.UiLevelSequence.PlaySequence("Act", false, ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetTimeDilation());
    await ModelManager_1.ModelManager.FloroRanchGamePlayModel.FloroRanchTimerSystem.Wait(FloroRanchDefine_1.FLORO_RANCH_CARD_NORAML_WAIT_ANIM_TIME);
  }
  async MoveToItem(i) {
    if (this.TDe) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 58, "FloroRanchUiCardItem 已经有一个计时器在运行");
      }
      this._1o();
    }
    this.cAo = new CustomPromise_1.CustomPromise();
    var t = Vector_1.Vector.Create(this.RootActor.GetTransform().GetLocation());
    this.Igo.DeepCopy(t);
    var e = i.GetWidth() / 2;
    var s = i.GetUIWorldPosition().X < t.X;
    var i = Vector_1.Vector.Create(i.GetUIWorldPosition());
    i.X += s ? e : -e;
    i.Subtraction(t, this.xsr);
    t.Addition(this.xsr, this.l$t);
    var s = this.n3u(t, this.l$t);
    this.GetItem(0).SetUIRelativeRotation(s.ToUeRotator());
    this.Ele.DeepCopy(s);
    this.e8 = 0;
    this.TDe = ModelManager_1.ModelManager.FloroRanchGamePlayModel.FloroRanchTimerSystem.Forever(this.J_, TimerSystem_1.MIN_TIME);
    await this.cAo.Promise;
  }
  async MoveToOriginalPosition() {
    if (this.TDe) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 58, "FloroRanchUiCardItem 已经有一个计时器在运行");
      }
      this._1o();
    }
    this.cAo = new CustomPromise_1.CustomPromise();
    var i = Vector_1.Vector.Create(this.RootActor.GetTransform().GetLocation());
    this.Igo.DeepCopy(i);
    this.l$t = Vector_1.Vector.Create(this.M$e);
    this.l$t.Subtraction(i, this.xsr);
    var i = this.n3u(i, this.l$t);
    this.GetItem(0).SetUIRelativeRotation(i.ToUeRotator());
    this.Ele.Set(0, 0, 0);
    this.e8 = 0;
    this.TDe = ModelManager_1.ModelManager.FloroRanchGamePlayModel.FloroRanchTimerSystem.Forever(this.J_, TimerSystem_1.MIN_TIME);
    await this.cAo.Promise;
  }
  MoveToOriginalPositionImmediate() {
    this.GetRootItem().SetUIWorldLocation(this.M$e);
    this.Ele.Set(0, 0, 0);
    this.GetItem(0).SetUIRelativeRotation(this.Ele.ToUeRotator());
  }
  GetRewardPopTransform() {
    return this.GetRootActor().GetTransform();
  }
  async PlayEatAnim() {
    var i = this.GetSpine(1);
    i.SetAnimation(0, "eat", false);
    i.SetTimeScale(ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetTimeDilation());
    await ModelManager_1.ModelManager.FloroRanchGamePlayModel.FloroRanchTimerSystem.Wait(FloroRanchDefine_1.FLORO_RANCH_CARD_EAT_TIME);
  }
  async PlayBeEatAnim() {
    if (this.UiLevelSequence.IsInSequence()) {
      this.UiLevelSequence.StopPrevSequence(true, true);
    }
    this.UiLevelSequence.PlaySequence("Swallowed", false, ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetTimeDilation());
    await ModelManager_1.ModelManager.FloroRanchGamePlayModel.FloroRanchTimerSystem.Wait(FloroRanchDefine_1.FLORO_RANCH_CARD_BE_EAT_TIME);
  }
  async PlaySacrificeAnim() {
    if (this.UiLevelSequence.IsInSequence()) {
      this.UiLevelSequence.StopPrevSequence(true, true);
    }
    this.UiLevelSequence.PlaySequence("Sacrifice", false, ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetTimeDilation());
    await ModelManager_1.ModelManager.FloroRanchGamePlayModel.FloroRanchTimerSystem.Wait(FloroRanchDefine_1.FLORO_RANCH_CARD_SACRIFICE_TIME);
  }
  async PlayFusionHideAnim() {
    if (this.UiLevelSequence.IsInSequence()) {
      this.UiLevelSequence.StopPrevSequence(true, true);
    }
    this.UiLevelSequence.PlaySequence("Fushion2", false, ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetTimeDilation());
    await ModelManager_1.ModelManager.FloroRanchGamePlayModel.FloroRanchTimerSystem.Wait(FloroRanchDefine_1.FLORO_RANCH_CARD_FUSION_HIDE_TIME);
  }
  async PlayFusionShowAnim() {
    if (this.UiLevelSequence.IsInSequence()) {
      this.UiLevelSequence.StopPrevSequence(false, true);
    }
    await this.ShowUiItem();
    this.UiLevelSequence.PlaySequence("Fushion1", false, ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetTimeDilation());
    await ModelManager_1.ModelManager.FloroRanchGamePlayModel.FloroRanchTimerSystem.Wait(FloroRanchDefine_1.FLORO_RANCH_CARD_FUSION_SHOW_TIME);
  }
  async PlayEvolveUpAnim() {
    this.UiLevelSequence.PlaySequence("Evolution", false, ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetTimeDilation());
    await ModelManager_1.ModelManager.FloroRanchGamePlayModel.FloroRanchTimerSystem.Wait(FloroRanchDefine_1.FLORO_RANCH_CARD_EVOLVE_UP_TIME);
  }
  n3u(i, t) {
    this.cie.Set(0, 0, 0);
    var e = this.Entity.CheckGetComponent(1).CardData.GetCardDefaultDirection();
    if (e !== 0 && (t.Subtraction(i, this.cz), e !== (this.cz.X > 0 ? 2 : 1))) {
      this.cie.Set(180, 0, 0);
    }
    return this.cie;
  }
  OnBeforeDestroy() {
    this.GetSpine(1).AnimationComplete.Remove(this.dWu);
    this._1o();
  }
  _1o() {
    if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.FloroRanchTimerSystem.Has(this.TDe)) {
      ModelManager_1.ModelManager.FloroRanchGamePlayModel.FloroRanchTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
    if (this.cAo) {
      this.cAo.SetResult(undefined);
      this.cAo = undefined;
    }
  }
  BindMoveCurve(i) {
    this.cWu = i;
  }
}
exports.FloroRanchUiCardItem = FloroRanchUiCardItem;
//# sourceMappingURL=FloroRanchUiCardItem.js.map