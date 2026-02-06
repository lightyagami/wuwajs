"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaCard = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const TickSystem_1 = require("../../../../../Core/Tick/TickSystem");
const Transform_1 = require("../../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer");
const LguiEventSystemManager_1 = require("../../../../Ui/LguiEventSystem/LguiEventSystemManager");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const CommonBaseCardItem_1 = require("../../Common/CardItem/Item/CommonBaseCardItem");
const PhantomArenaDefine_1 = require("../PhantomArenaDefine");
const PhantomArenaCardTweenLogic_1 = require("./PhantomArenaCardTweenLogic");
const TICK_DURATION = 1000;
class PhantomArenaCard extends CommonBaseCardItem_1.CommonBaseCardItem {
  constructor() {
    super(...arguments);
    this.LCa = Vector2D_1.Vector2D.Create();
    this.xi1 = Vector2D_1.Vector2D.Create();
    this.ZXl = Vector2D_1.Vector2D.Create();
    this.QTc = Vector_1.Vector.Create();
    this.ItemWorldTrans = Transform_1.Transform.Create();
    this.TempWorldPos = Vector_1.Vector.Create();
    this.Di1 = undefined;
    this.wut = false;
    this.th1 = false;
    this.ih1 = false;
    this.rh1 = false;
    this.sKe = TickSystem_1.TickSystem.InvalidId;
    this.e8 = 0;
    this.Sequence = undefined;
    this.TweenLogic = undefined;
    this.CardLogic = undefined;
    this.fD1 = [];
    this.Data = undefined;
    this.HalfWidth = 0;
    this.HalfHeight = 0;
    this.CopyEffect = undefined;
    this.Ui1 = t => {
      if (this.th1) {
        this.th1 = false;
        this.SetToggleState(0, false);
      } else {
        this.Bi1()?.PointerClickCard?.(this.Data.CardId, t);
      }
    };
    this.vK1 = t => {
      if (t === "Dissolve" || t === "MagicUse") {
        this.Destroy();
      }
    };
    this.r6 = t => {
      if (this.ih1) {
        if (this.e8 < TICK_DURATION) {
          this.e8 += t;
        } else {
          this.oh1(false);
          this.Bi1()?.PointerLongPressCard?.(this.Data.CardId);
        }
      }
    };
    this.ki1 = () => {
      this.Bi1()?.PointerEnterCard?.(this.Data.CardId);
    };
    this.Ngo = () => {
      this.oh1(true);
      var t = LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(0);
      if (t) {
        this.Bi1()?.PointerDownCard?.(this.Data.CardId, t);
      }
    };
    this.GFo = () => {
      this.oh1(false);
    };
    this.nh1 = () => {
      this.oh1(false);
      this.th1 = false;
      this.SetToggleState(0, false);
    };
    this.pKe = t => {
      this.th1 = true;
      if (t) {
        this.Bi1()?.PointerBeginDrag?.(this.Data.CardId, t);
      }
      return true;
    };
    this.vKe = t => {
      if (t) {
        this.Bi1()?.PointerDragCard?.(this.Data.CardId, t);
      }
      return true;
    };
    this.SKe = t => {
      if (t) {
        this.Bi1()?.PointerEndDrag?.(this.Data.CardId, t);
      }
      return true;
    };
  }
  OnRegisterCardComponent() {
    if (ModelManager_1.ModelManager.PhantomArenaBattleModel.IsOldBvb) {
      this.ComponentsRegisterInfoByItem = [[3, this.GetCardRootItem()]];
    } else {
      this.ComponentsRegisterInfoByItem = [[4, this.GetCardRootItem()]];
    }
    this.ComponentsRegisterInfoByResourceId = [[8, "PnlStateChoose1", this.GetCardRootItem()]];
    for (var [t, i] of this.fD1) {
      this.ComponentsRegisterInfoByResourceId.push([t, i, this.GetCardRootItem()]);
    }
    if (this.CardLogic) {
      for (var [e, s, h] of this.CardLogic.GetComponentsDataList()) {
        this.ComponentsRegisterInfoByResourceId.push([e, s, h]);
      }
    }
  }
  async OnBeforeChildStartAsync() {
    var t = this.Cqm();
    if (this.Data) {
      t.SetCardData(this.Data);
      await t.InitSpine();
      await t.InitEffect();
    }
  }
  OnStart() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.GetCardRootItem());
    this.Sequence.BindOnEndSequenceEvent(this.vK1);
    var t = this.Cqm();
    t.RootUiSequencePlayer = this.Sequence;
    t.CardClickCallback = this.Ui1;
    var t = t.GetCardToggle();
    t.OnPointEnterCallBack.Bind(this.ki1);
    t.OnPointDownCallBack.Bind(this.Ngo);
    t.OnPointUpCallBack.Bind(this.GFo);
    t.OnPointCancelCallBack.Bind(this.nh1);
    t.OnPointerBeginDragCallBack.Bind(this.pKe);
    t.OnPointerDragCallBack.Bind(this.vKe);
    t.OnPointerEndDragCallBack.Bind(this.SKe);
    this.CardLogic?.BeforeStart();
    this.sKe = TickSystem_1.TickSystem.Add(this.r6, "LongPressComponent", 0, true, undefined, true).Id;
    this.HalfWidth = this.GetCardRootItem().Width / 2;
    this.HalfHeight = this.GetCardRootItem().Height / 2;
    this.TweenLogic = new PhantomArenaCardTweenLogic_1.PhantomArenaCardTweenLogic();
    this.TweenLogic.Init(this.GetRootItem());
  }
  OnBeforeDestroy() {
    if (this.CopyEffect) {
      UE.LGUIBPLibrary.DestroyActorWithHierarchy(this.CopyEffect, true);
      this.CopyEffect = undefined;
    }
    if (this.sKe !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Remove(this.sKe);
      this.sKe = TickSystem_1.TickSystem.InvalidId;
    }
    this.Sequence.Clear();
    this.TweenLogic.Destroy();
  }
  oh1(t) {
    if (t !== this.wut) {
      this.e8 = 0;
      this.ih1 = t;
      this.wut = t;
    }
  }
  Cqm() {
    if (ModelManager_1.ModelManager.PhantomArenaBattleModel.IsOldBvb) {
      return this.GetComponent(3);
    } else {
      return this.GetComponent(4);
    }
  }
  pqm(t) {
    this.Data = t;
  }
  Bi1() {
    if (!this.rh1) {
      return this.Di1 || undefined;
    }
    this.rh1 = false;
  }
  async InitializePhantomArenaCard(t, i) {
    this.pqm(t);
    t = ModelManager_1.ModelManager.PhantomArenaBattleModel.IsOldBvb ? "UiItem_SoundRemnantItem" : "UiItem_SoundRemnantItemNew";
    await this.CreateByResourceIdAsync(t, i);
    await this.RefreshSelfAsync();
  }
  AddComponentsRegisterInfoByResourceId(t) {
    this.fD1.push(t);
  }
  Refresh(t) {
    this.RefreshAsync(t);
  }
  async RefreshAsync(t) {
    this.pqm(t);
    await this.RefreshSelfAsync();
  }
  async RefreshSelfAsync() {
    this.CardLogic?.Refresh(this.Data);
    await this.Cqm()?.RefreshAsync(this.Data);
  }
  RegisterCardLogic(t) {
    this.CardLogic = t;
  }
  SetCardProxy(t) {
    if (this.Di1 !== t) {
      if (this.th1) {
        this.rh1 = true;
      }
      this.Di1 = t;
    }
  }
  RecordLastDragPos(t) {
    LguiUtil_1.LguiUtil.ConvertPointerPositionToLguiPosition(t, this.LCa);
  }
  MoveCard(t) {
    var i;
    if (this.RootItem) {
      LguiUtil_1.LguiUtil.ConvertPointerPositionToLguiPosition(t, this.xi1);
      if (!Vector2D_1.Vector2D.Create(this.xi1.X, this.xi1.Y).SubtractionEqual(this.LCa).IsNearlyZero(0)) {
        t = this.xi1.X - this.LCa.X;
        i = this.xi1.Y - this.LCa.Y;
        this.ZXl.FromUeVector2D(this.RootItem.GetAnchorOffset());
        this.ZXl.X += t;
        this.ZXl.Y += i;
        this.RootItem.SetAnchorOffset(this.ZXl.ToUeVector2D());
        this.LCa.DeepCopy(this.xi1);
      }
    }
  }
  SetUiParent(t, i = false) {
    this.TempWorldPos.FromUeVector(this.RootItem.D_K2_GetComponentLocation());
    this.ItemWorldTrans.FromUeTransform(t.K2_GetComponentToWorld());
    this.ItemWorldTrans.InverseTransformPosition(this.TempWorldPos, this.TempWorldPos);
    this.GetOriginalItem().SetUIParent(t);
    this.ParentUiItem = t;
    this.RootItem.SetUIRelativeLocation(this.TempWorldPos.ToUeVectorOld());
    if (i) {
      this.RootItem.SetAnchorOffset(Vector2D_1.Vector2D.ZeroVector);
    }
  }
  GetWorldLocation() {
    this.QTc.FromUeVector(this.RootItem.D_K2_GetComponentLocation());
    return this.QTc;
  }
  SetToggleState(t, i = true) {
    this.Cqm().GetCardToggle().SetToggleState(t, i);
  }
  GetToggleState() {
    return this.Cqm().GetCardToggle().GetToggleState();
  }
  RefreshDebugText() {
    this.Cqm()?.SetDebugText();
  }
  OverrideCanvasSortOrder(t) {
    var i = this.GetOriginalItem()?.GetRenderCanvas();
    if (i) {
      i.SetSortOrderNew(t ? 2 : 0);
    }
  }
  async Dissolve() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "Card Dissolve Start");
    }
    var t = new CustomPromise_1.CustomPromise();
    await this.Sequence.PlaySequenceAsync("Dissolve", t);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "Card Dissolve End");
    }
  }
  async MagicUse() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "Card Magic Use Start");
    }
    var t = new CustomPromise_1.CustomPromise();
    await this.Sequence.PlaySequenceAsync("MagicUse", t);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "Card Magic Use End");
    }
  }
  PlayStateSequence(t) {
    this.Cqm()?.PlaySequence(t);
  }
  PlayLocationByItem(t, i, e) {
    this.TweenLogic.PlayLocationByItem(t, i, e);
  }
  StopSequence(t) {
    this.Sequence.StopSequenceByKey(t, false, true);
  }
  PlaySequence(t, i = false) {
    this.Sequence.StopPrevSequence(false, true);
    this.Sequence.PlaySequencePurely(t, false, i);
  }
  PlaySequenceWithoutStop(t, i = false) {
    this.Sequence.PlaySequencePurely(t, false, i);
  }
  async PlaySequenceAsync(t) {
    var i = new CustomPromise_1.CustomPromise();
    await this.Sequence.PlaySequenceAsync(t, i);
  }
  PlaySpineAnimAndEffect(t, i) {
    var e = this.Cqm();
    e?.PlaySpineAnim(t, i);
    e?.PlayEffect();
  }
  SetSelectedStateWithoutSequence() {
    this.GetComponent(8).SetComponentDisActiveWithoutSequence();
    this.CardLogic?.SetSelectedState(false);
  }
  SetSelectedState(t) {
    this.GetComponent(8).SetComponentActive(t);
    this.CardLogic?.SetSelectedState(t);
  }
  SetSelectedStateByGamepad(t) {
    this.CardLogic?.SetSelectedState(t);
  }
  async RefreshEffect(t) {
    await this.CardLogic?.RefreshEffect(t);
  }
  async ShowCopyEffect() {
    this.CopyEffect ||= await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync("UiItem_CardTemporary", this.GetSpineRootItem());
    await Promise.all([this.ShowAsync(), this.PlaySequenceAsync("Copy"), this.PlaySequenceAsync("PutDownHandtoTable")]);
  }
  async PlayHitEffect(t) {
    AudioSystem_1.AudioSystem.PostEvent(PhantomArenaDefine_1.HIT_AUDIO);
    await Promise.all([this.PlaySequenceAsync("CardHit"), this.Cqm()?.PlayHitEffect?.(t)]);
  }
  GetPhantomArenaCardRootItem() {
    return this.GetCardRootItem();
  }
  GetPhantomArenaCardSpineRootItem() {
    return this.GetSpineRootItem();
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var i;
    if (t && !(t.length <= 0)) {
      if (t[0] === "BattleCardSkillById") {
        i = (t = this.GetComponent(12))?.GetGuideUiItem("T_技能按钮");
        t = t?.GetGuideUiItem("V_技能按钮");
        if (i && t) {
          return [i, t];
        } else {
          return undefined;
        }
      } else if (i = this.Cqm()?.GetRootItem()) {
        return [i, i];
      } else {
        return undefined;
      }
    }
  }
}
exports.PhantomArenaCard = PhantomArenaCard;
//# sourceMappingURL=PhantomArenaCard.js.map