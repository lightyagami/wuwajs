"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleDetailsTips = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const Transform_1 = require("../../../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer");
const LguiEventSystemManager_1 = require("../../../../../Ui/LguiEventSystem/LguiEventSystemManager");
const DynamicMaskButton_1 = require("../../../../DynamicMask/DynamicMaskButton");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const CardDetailEntryDescLayoutItem_1 = require("../../../Common/CardDetail/CardDetailEntryDescLayoutItem");
const CardDetailFactorDescItem_1 = require("../../../Common/CardDetail/CardDetailFactorDescItem");
const CardDetailItem_1 = require("../../../Common/CardDetail/CardDetailItem");
class PhantomArenaBattleDetailsTips extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.DetailItem = undefined;
    this.EntryDescLayoutItem = undefined;
    this.Sequence = undefined;
    this.MaskButton = undefined;
    this.MaskAttach = undefined;
    this.IsEntryShow = false;
    this.ShowTipsType = 0;
    this.IsInActive = false;
    this.ShowType = 0;
    this.BtnBottomCb = undefined;
    this.TempWorldPos = Vector_1.Vector.Create();
    this.ItemWorldTrans = Transform_1.Transform.Create();
    this.TimerHandle = undefined;
    this.Nno = t => {
      if (t === "Close") {
        this.SetActive(false);
      }
    };
    this.cgu = () => {
      this.ShowEntry();
      this.MLt();
    };
    this.XTt = () => {
      this.HideEntry();
      this.TLt();
    };
    this.d2u = () => {
      if (this.BtnBottomCb) {
        this.BtnBottomCb();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UILayoutBase], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent]];
    this.BtnBindInfo = [[5, this.cgu], [6, this.d2u]];
  }
  async InitDetailsItem() {
    this.DetailItem = new CardDetailItem_1.CardDetailItem();
    await this.DetailItem.CreateThenShowByActorAsync(this.GetItem(2).GetOwner());
  }
  async InitMaskButton() {
    this.MaskButton = new DynamicMaskButton_1.DynamicMaskButton();
    this.MaskButton.SetButtonFunction(this.XTt);
    await this.MaskButton.Init(this.MaskAttach);
    this.MaskButton.GetRootItem().SetAsFirstHierarchy();
  }
  async OnBeforeStartAsync() {
    this.MaskButton = new DynamicMaskButton_1.DynamicMaskButton();
    this.MaskButton.SetButtonFunction(this.XTt);
    await Promise.all([this.InitDetailsItem(), this.InitMaskButton()]);
    this.IsEntryShow = false;
    this.RefreshEntryShowState();
  }
  OnStart() {
    this.GetButton(6)?.RootUIComp.SetUIActive(false);
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.Sequence.BindOnEndSequenceEvent(this.Nno);
    this.EntryDescLayoutItem = new CardDetailEntryDescLayoutItem_1.CardDetailEntryDescLayoutItem(this.GetLayoutBase(3), this.GetItem(4));
  }
  OnBeforeDestroy() {
    this.Sequence.Clear();
    this.MaskButton?.Destroy();
    this.FBd();
  }
  RefreshByTaskData(t) {
    var i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(t.TaskCardConfigId);
    var e = i.InitAttack.get(Protocol_1.Aki.Protocol.GC1.Proto_AttackAbility);
    var a = i.InitAttack.get(Protocol_1.Aki.Protocol.GC1.Proto_LifeAbility);
    var s = [];
    for (const o of i.CardFactorId) {
      var r = new CardDetailFactorDescItem_1.CardDetailFactorDescItemData();
      r.FactorConfigId = o;
      r.IsActive = false;
      s.push(r);
    }
    var h = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomArenaFourTask(t.TaskCardConfigId);
    var t = t.GetConditionDescCurrentProgress(h.TaskDescConditionId);
    var h = {
      Desc: h.TaskDesc,
      CurrentProgress: t
    };
    var t = {
      Cost: i.Cost,
      Attack: e,
      Life: a
    };
    var e = {
      Description: i.CardEffectDescription,
      DescriptionParams: i.CardEffectDescriptionParams
    };
    var a = {
      Name: i.Name,
      AttributeData: t,
      CardDescriptionData: e,
      FactorDataList: s,
      TaskData: h
    };
    this.DetailItem.Refresh(a);
    this.EntryDescLayoutItem.RefreshByCardConfig(i);
  }
  F4m(t) {
    if (t.IsTool) {
      return [];
    }
    var i = [];
    for (const s of t.ExtraFactors) {
      var e = new CardDetailFactorDescItem_1.CardDetailFactorDescItemData();
      e.FactorConfigId = s;
      e.IsActive = true;
      i.push(e);
    }
    for (const r of t.UnActiveFactors) {
      var a = new CardDetailFactorDescItem_1.CardDetailFactorDescItemData();
      a.FactorConfigId = r;
      a.IsActive = false;
      i.push(a);
    }
    return i;
  }
  ikm(t) {
    var i;
    var e;
    if (!t.IsTool) {
      i = t.GetFightValueByAttr(Protocol_1.Aki.Protocol.GC1.Proto_AttackAbility);
      e = t.GetFightValueByAttr(Protocol_1.Aki.Protocol.GC1.Proto_LifeAbility);
      return {
        Cost: t.GetFightValueByAttr(Protocol_1.Aki.Protocol.GC1.Proto_CostAbility),
        Attack: i,
        Life: e
      };
    }
  }
  N4m(t) {
    if (!t.IsTool) {
      return {
        Description: (t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(t.ConfigId)).CardEffectDescription,
        DescriptionParams: t.CardEffectDescriptionParams
      };
    }
  }
  V4m(t) {
    if (t.HasDurability) {
      return {
        DurationDesc: t.Durable + "/" + t.DurableMax
      };
    }
  }
  j4m(t) {
    if (t.HasClickActiveSkill) {
      return {
        Desc: (t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(t.ConfigId)).DurableSkillDescription,
        Params: t.DurableSkillDescriptionParams
      };
    }
  }
  H4m(t) {
    var i;
    var e;
    var a;
    if (t.IsField) {
      i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(t.ConfigId);
      e = (t.IsNpcCard ? ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData : ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData).IsFieldActive ? "PhantomBattle_1144" : "PhantomBattle_1143";
      e = {
        TextArg: new LguiUtil_1.TableTextArgNew(e)
      };
      a = t.HasCountSkill ? {
        CurrentEffectCount: t.CurEffectCount,
        TotalEffectCount: t.MaxEffectCount
      } : undefined;
      return {
        Desc: t.HasCountSkill ? i.CountSkillDescription : i.CardEffectDescription,
        Params: t.HasCountSkill ? i.CountSkillDescriptionParams : i.CardEffectDescriptionParams,
        FieldData: {
          InData: e
        },
        EffectCountData: a
      };
    }
  }
  $4m(t) {
    var i;
    if (t.HasCountSkill) {
      i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(t.ConfigId);
      t = {
        CurrentEffectCount: t.CurEffectCount,
        TotalEffectCount: t.MaxEffectCount
      };
      return {
        Desc: i.CountSkillDescription,
        Params: i.CountSkillDescriptionParams,
        EffectCountData: t
      };
    }
  }
  tYm(t) {
    if (t.IsCopy) {
      return {
        RemainRound: 1
      };
    }
  }
  gjm(t) {
    var i = this.F4m(t);
    var e = this.ikm(t);
    var a = this.N4m(t);
    var s = this.V4m(t);
    var r = this.j4m(t);
    var h = this.$4m(t);
    var o = this.tYm(t);
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(t.ConfigId);
    var e = {
      Name: t.Name,
      AttributeData: e,
      CardDescriptionData: a,
      FactorDataList: i,
      DurationData: s,
      ActiveSkillData: r,
      PassiveSkillData: h,
      RemainRoundData: o
    };
    this.DetailItem.Refresh(e);
    this.EntryDescLayoutItem.RefreshByCardConfig(t);
  }
  Cjm(t) {
    var i = this.j4m(t);
    var e = this.H4m(t);
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(t.ConfigId);
    var i = {
      Name: t.Name,
      ActiveSkillData: i,
      PassiveSkillData: e
    };
    this.DetailItem.Refresh(i);
    this.EntryDescLayoutItem.RefreshByCardConfig(t);
  }
  NKm(t) {
    if (t) {
      this.TempWorldPos.FromUeVector(t.D_K2_GetComponentLocation());
      this.ItemWorldTrans.FromUeTransform(this.ParentUiItem.K2_GetComponentToWorld());
      this.ItemWorldTrans.InverseTransformPosition(this.TempWorldPos, this.TempWorldPos);
      this.GetOriginalItem()?.SetUIRelativeLocation(this.TempWorldPos.ToUeVectorOld());
    }
  }
  VKm(t) {
    this.ShowType = t.ShowType;
    if (t.PositionType === 0) {
      this.GetItem(0).SetHierarchyIndex(0);
      this.SetPivotAndResetOffset(0, 1);
    } else if (t.PositionType === 1) {
      this.GetItem(1).SetHierarchyIndex(0);
      this.SetPivotAndResetOffset(1, 1);
    } else if (t.PositionType === 2) {
      this.GetItem(0).SetHierarchyIndex(0);
      this.SetPivotAndResetOffset(0, 0);
    } else {
      this.GetItem(1).SetHierarchyIndex(0);
      this.SetPivotAndResetOffset(1, 0);
    }
  }
  b6f() {
    this.FBd();
    this.TimerHandle = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      this.ygf();
    }, 100);
  }
  FBd() {
    if (this.TimerHandle) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TimerHandle);
      this.TimerHandle = undefined;
    }
  }
  jt_() {
    this.FBd();
    this.SetActive(true);
    this.Sequence.StopPrevSequence(false, true);
    this.Sequence.PlaySequence("Start");
  }
  dbu() {
    this.FBd();
    this.Sequence.StopPrevSequence(false, true);
    this.Sequence.PlaySequence("Close");
    this.ShowType = 0;
  }
  ygf() {
    if (this.RootItem) {
      if (!LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(0, true).enterComponentStack.Contains(this.RootItem)) {
        this.dbu();
      }
    } else {
      this.FBd();
    }
  }
  RefreshByCardData(t) {
    if (t.IsField) {
      this.Cjm(t);
    } else {
      this.gjm(t);
    }
  }
  SetTipsPositionByAttachItem(t) {
    this.GetOriginalItem()?.SetUIParent(t.AttachItem);
    this.VKm(t);
  }
  SetTipsPositionByTriggerItem(t) {
    this.VKm(t);
    this.NKm(t.TriggerItem);
  }
  SetTipsActive(t) {
    var i = t === 2 || t === 3;
    if (this.IsInActive !== i) {
      this.IsInActive = i;
      i = this.ShowTipsType;
      this.ShowTipsType = t;
      if (this.IsInActive) {
        this.jt_();
      } else if (i === 2) {
        this.dbu();
      } else if (i === 3) {
        this.b6f();
      }
    }
  }
  SetPivotAndResetOffset(t, i) {
    this.GetOriginalItem()?.SetPivot(new UE.Vector2D(t, i));
    this.GetOriginalItem()?.SetAnchorOffset(new UE.Vector2D(0, 0));
  }
  MLt() {
    this.MaskButton.SetActive(true);
  }
  TLt() {
    this.MaskButton.SetActive(false);
  }
  SetMaskAttach(t) {
    this.MaskAttach = t;
  }
  ShowEntry() {
    if (!this.IsEntryShow) {
      this.IsEntryShow = true;
      this.RefreshEntryShowState();
    }
  }
  HideEntry() {
    if (this.IsEntryShow) {
      this.IsEntryShow = false;
      this.RefreshEntryShowState();
    }
  }
  RefreshEntryShowState() {
    this.GetItem(1).SetUIActive(this.IsEntryShow);
  }
  SetBtnMaskCallback(t) {
    this.BtnBottomCb = t;
    this.GetButton(6)?.RootUIComp.SetUIActive(true);
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var i;
    if (t && !(t.length <= 0)) {
      if ((i = t[0]) === "CardEffect" || i === "CardAttr" || i === "Task") {
        return this.DetailItem?.GetGuideUiItemAndUiItemForShowEx(t);
      } else if (i === "CardFullInfo" && (t = this.GetItem(0))) {
        return [t, t];
      } else {
        return undefined;
      }
    }
  }
}
exports.PhantomArenaBattleDetailsTips = PhantomArenaBattleDetailsTips;
//# sourceMappingURL=PhantomArenaBattleDetailsTips.js.map