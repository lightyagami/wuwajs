"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaOwnRolePanel = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  ScrollingTipsController_1 = require("../../../../ScrollingTips/ScrollingTipsController"),
  PhantomArenaRoleHpTween_1 = require("../../Area/Hand/PhantomArenaRoleHpTween"),
  PhantomArenaSkillInteractFactory_1 = require("../../SkillInteract/PhantomArenaSkillInteractFactory"),
  PhantomArenaRoleItem_1 = require("./PhantomArenaRoleItem");
class PhantomArenaSkill extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.Bmo = void 0, this.xK1 = !1, this.ViewProxy = void 0, this.Sequence = void 0, this.neu = () => {
      this.ViewProxy.ShowSkillTips(this.Bmo, this.GetItem(4))
    }, this.seu = () => {
      this.ViewProxy.HideSkillTips()
    }, this.eTt = () => {
      var e;
      this.ViewProxy.InCantDragState() || this.Bmo.IsPassive || this.ViewProxy.GuideManager.CheckInGuideAndShowTips() || (e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.fC1.Proto_PhantomBattleCostPoint), ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleSkillConfig(this.Bmo.SkillId).CostConsume > e ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhantomBattle_1063") : (Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "使用角色技能", ["技能", this.Bmo.SkillId]), this.OnHandleRoleSkillClick()))
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
      [3, UE.UIItem],
      [4, UE.UIItem]
    ], this.BtnBindInfo = [
      [2, this.eTt]
    ]
  }
  OnStart() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem), this.GetButton(2).OnPointEnterCallBack.Bind(this.neu), this.GetButton(2).OnPointExitCallBack.Bind(this.seu), this.ViewProxy.BanButtonClickModule.RegisterButton(this.GetButton(2))
  }
  async OnHandleRoleSkillClick() {
    var e;
    await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleCardRoleTargetInfo(this.Bmo.SkillId) && (e = {
      SkillId: this.Bmo.SkillId,
      CloseCallback: () => {
        this.ExecuteBuffEffect()
      }
    }, UiManager_1.UiManager.OpenView("PhantomArenaRoleCutInView", e))
  }
  async ExecuteBuffEffect() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.RoleSkillTriggerInfo;
    e ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "执行角色技能", ["技能", this.Bmo.SkillId]), await PhantomArenaSkillInteractFactory_1.PhantomArenaSkillInteractFactory.GetSkillInteract(e.InteractType).Execute(this.ViewProxy, this)) : Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 10, "角色技能触发信息不存在")
  }
  bwc() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RoleId,
      e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(e),
      t = (this.GetText(1).SetUIActive(!1), this.GetItem(3).SetUIActive(!1), e.PassiveSkillId.indexOf(this.Bmo.SkillId)),
      e = e.PassiveSkillIconList[t];
    this.SetTextureByPath(e, this.GetTexture(0))
  }
  F81() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RoleId,
      e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(e),
      t = (this.GetText(1).SetUIActive(!0), this.GetItem(3).SetUIActive(!0), e.ActiveSkillId.indexOf(this.Bmo.SkillId)),
      e = e.SkillIconList[t],
      t = (this.SetTextureByPath(e, this.GetTexture(0)), ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleSkillConfig(this.Bmo.SkillId));
    this.GetText(1).SetText(t.CostConsume.toString())
  }
  Refresh(e) {
    (this.Bmo = e).IsPassive ? this.bwc() : this.F81(), this.RefreshSkillEffect()
  }
  RefreshSkillEffect() {
    var e;
    this.Bmo && !this.Bmo.IsPassive && (e = ModelManager_1.ModelManager.PhantomArenaBattleModel.CheckSkillEnoughCost(this.Bmo.SkillId)) !== this.xK1 && (e ? this.Sequence.PlaySequencePurely("Activate") : this.Sequence.PlaySequencePurely("Use"), this.xK1 = e)
  }
  CheckCanvasSortOrder(e, t) {
    return !!e.includes(2) && t.DataId === this.Bmo.SkillId
  }
  HandleSortOrder() {
    this.RootItem.GetRenderCanvas().SetSortOrderNew(2)
  }
  CancelSortOrder() {
    this.RootItem.GetRenderCanvas().SetSortOrderNew(0)
  }
  CancelSkillInteract() {}
  GetData() {
    return ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.RoleSkillTriggerInfo
  }
  FinishSkillInteract() {}
}
class PhantomArenaOwnRolePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.ParentArea = void 0, this.RoleItem = void 0, this.IsFourCostShowInFirstTime = !1, this.RoleHpTween = void 0, this.SkillList = []
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem]
    ]
  }
  async InitRoleHpTween() {
    this.RoleHpTween = new PhantomArenaRoleHpTween_1.PhantomArenaRoleHpTween, await this.RoleHpTween.InitCurveDamage()
  }
  async InitRoleItem() {
    this.RoleItem = new PhantomArenaRoleItem_1.PhantomArenaRoleItem, this.RoleItem.IsOwn = !0, this.RoleItem.RegisterViewProxy(this.ParentArea.ViewProxy), await this.RoleItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RoleId,
      e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(e);
    this.RoleItem.RefreshHeadIcon(e.RoleHeadTexture)
  }
  async InitSkillItem(e, t) {
    var i = new PhantomArenaSkill;
    i.ViewProxy = this.ParentArea.ViewProxy, this.ParentArea.ViewProxy.CanvasManager.AddAreaCanvas(i), this.SkillList.push(i), t ? await i.CreateThenShowByActorAsync(e.GetOwner()) : await i.CreateByActorAsync(e.GetOwner())
  }
  async InitSkillList() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RoleId,
      e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(e),
      e = [...e.PassiveSkillId.map(e => ({
        SkillId: e,
        IsPassive: !0
      })), ...e.ActiveSkillId.map(e => ({
        SkillId: e,
        IsPassive: !1
      }))];
    await Promise.all([this.InitSkillItem(this.GetItem(2), 0 < e.length), this.InitSkillItem(this.GetItem(1), 1 < e.length)]), 0 < e.length && this.SkillList[0].Refresh(e[0]), 1 < e.length && this.SkillList[1].Refresh(e[1])
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.InitRoleItem(), this.InitSkillList(), this.InitRoleHpTween()])
  }
  OnStart() {
    this.RoleHpTween.SetRoleItem(this.RoleItem), this.RoleItem.SetBarActive(!0), this.o_u()
  }
  OnBeforeDestroy() {
    this.RoleHpTween.Clear()
  }
  o_u() {
    this.n_u(), this.RefreshTask(), this.RefreshSkillEffect()
  }
  n_u() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.fC1.Proto_PhantomBattleLife),
      t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.fC1.Proto_PhantomBattleMaxLife);
    ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.SetPrevShowLife(e), this.RoleItem.RefreshLifeNum(e, t)
  }
  RefreshAll() {
    this.TryDoLifeChangeShow(), this.RefreshTask(), this.RefreshSkillEffect()
  }
  RefreshLifeNumWithEffect() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.fC1.Proto_PhantomBattleLife),
      t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.fC1.Proto_PhantomBattleMaxLife);
    this.RoleItem.PlayAddHpEffect(e), this.RoleItem.RefreshLifeNum(e, t)
  }
  TryDoLifeChangeShow() {
    const e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.PrevShowLife,
      t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.fC1.Proto_PhantomBattleLife);
    if (e !== t) {
      const i = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.fC1.Proto_PhantomBattleMaxLife);
      ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.SetPrevShowLife(t), TimerSystem_1.TimerSystem.Delay(() => {
        this.RoleHpTween.PlayHpTween(e, t, i), e > t && this.RoleItem.PlayHitAnim()
      }, 300)
    }
  }
  RefreshTask() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.TaskData;
    !e || e.IsAllFinish ? this.RoleItem.SetPhantomBtnActive(!1) : (this.RoleItem.SetPhantomBtnActive(this.IsFourCostShowInFirstTime), e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e.TaskCardConfigId), this.RoleItem.RefreshMonsterIcon(e.TaskBg))
  }
  ActiveIsFourCostShowInFirstTime() {
    this.IsFourCostShowInFirstTime = !0, this.RoleItem.ShowPhantomBtn()
  }
  RefreshSkillEffect() {
    for (const e of this.SkillList) e.RefreshSkillEffect()
  }
  RegisterBattleArea(e) {
    this.ParentArea = e
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    return e && 0 !== e.length && "Task" === e[0] ? this.RoleItem?.GetGuideUiItemAndUiItemForShowEx(e) : void 0
  }
}
exports.PhantomArenaOwnRolePanel = PhantomArenaOwnRolePanel;
//# sourceMappingURL=PhantomArenaOwnRolePanel.js.map