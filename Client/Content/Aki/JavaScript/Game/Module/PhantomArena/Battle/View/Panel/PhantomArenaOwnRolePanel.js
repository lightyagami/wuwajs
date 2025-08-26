"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaOwnRolePanel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer");
const UiManager_1 = require("../../../../../Ui/UiManager");
const ScrollingTipsController_1 = require("../../../../ScrollingTips/ScrollingTipsController");
const PhantomArenaRoleHpTween_1 = require("../../Area/Hand/PhantomArenaRoleHpTween");
const PhantomArenaSkillInteractFactory_1 = require("../../SkillInteract/PhantomArenaSkillInteractFactory");
const PhantomArenaRoleItem_1 = require("./PhantomArenaRoleItem");
class PhantomArenaSkill extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Bmo = undefined;
    this.zX1 = false;
    this.ViewProxy = undefined;
    this.Sequence = undefined;
    this.btu = () => {
      this.ViewProxy.ShowSkillTips(this.Bmo, this.GetItem(4));
    };
    this.Rtu = () => {
      this.ViewProxy.HideSkillTips();
    };
    this.eTt = () => {
      var e;
      if (!this.ViewProxy.InCantDragState() && !this.Bmo.IsPassive && !this.ViewProxy.GuideManager.CheckInGuideAndShowTips()) {
        e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleCostPoint);
        if (ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleSkillConfig(this.Bmo.SkillId).CostConsume > e) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhantomBattle_1063");
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("PhantomArena", 10, "使用角色技能", ["技能", this.Bmo.SkillId]);
          }
          this.OnHandleRoleSkillClick();
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIItem]];
    this.BtnBindInfo = [[2, this.eTt]];
  }
  OnStart() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.GetButton(2).OnPointEnterCallBack.Bind(this.btu);
    this.GetButton(2).OnPointExitCallBack.Bind(this.Rtu);
    this.ViewProxy.BanButtonClickModule.RegisterButton(this.GetButton(2));
  }
  async OnHandleRoleSkillClick() {
    this.ViewProxy.RegisterCantDragReason(5);
    try {
      var e;
      if (await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleCardRoleTargetInfo(this.Bmo.SkillId)) {
        e = {
          SkillId: this.Bmo.SkillId,
          CloseCallback: () => {
            this.ExecuteBuffEffect().finally(() => {
              this.ViewProxy.UnRegisterCantDragReason(5);
            });
          }
        };
        UiManager_1.UiManager.OpenView("PhantomArenaRoleCutInView", e);
      } else {
        this.ViewProxy.UnRegisterCantDragReason(5);
      }
    } catch {
      this.ViewProxy.UnRegisterCantDragReason(5);
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 10, "使用角色技能", ["技能", this.Bmo.SkillId]);
      }
    }
  }
  async ExecuteBuffEffect() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.RoleSkillTriggerInfo;
    if (e) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "执行角色技能", ["技能", this.Bmo.SkillId]);
      }
      await PhantomArenaSkillInteractFactory_1.PhantomArenaSkillInteractFactory.GetSkillInteract(e.InteractType).Execute(this.ViewProxy, this);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 10, "角色技能触发信息不存在");
    }
  }
  bwc() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RoleId;
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(e);
    this.GetText(1).SetUIActive(false);
    this.GetItem(3).SetUIActive(false);
    var t = e.PassiveSkillId.indexOf(this.Bmo.SkillId);
    var e = e.PassiveSkillIconList[t];
    this.SetTextureByPath(e, this.GetTexture(0));
  }
  pj1() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RoleId;
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(e);
    this.GetText(1).SetUIActive(true);
    this.GetItem(3).SetUIActive(true);
    var t = e.ActiveSkillId.indexOf(this.Bmo.SkillId);
    var e = e.SkillIconList[t];
    this.SetTextureByPath(e, this.GetTexture(0));
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleSkillConfig(this.Bmo.SkillId);
    this.GetText(1).SetText(t.CostConsume.toString());
  }
  Refresh(e) {
    if ((this.Bmo = e).IsPassive) {
      this.bwc();
    } else {
      this.pj1();
    }
    this.RefreshSkillEffect();
  }
  RefreshSkillEffect() {
    var e;
    if (this.Bmo && !this.Bmo.IsPassive && (e = ModelManager_1.ModelManager.PhantomArenaBattleModel.CheckSkillEnoughCost(this.Bmo.SkillId)) !== this.zX1) {
      if (e) {
        this.Sequence.StopSequenceByKey("Use", false, true);
        this.Sequence.PlaySequencePurely("Activate");
      } else {
        this.Sequence.StopSequenceByKey("Activate", false, true);
        this.Sequence.PlaySequencePurely("Use");
      }
      this.zX1 = e;
    }
  }
  CheckCanvasSortOrder(e, t) {
    return !!e.includes(2) && t.DataId === this.Bmo.SkillId;
  }
  HandleSortOrder() {
    this.RootItem.GetRenderCanvas().SetSortOrderNew(2);
  }
  CancelSortOrder() {
    this.RootItem.GetRenderCanvas().SetSortOrderNew(0);
  }
  CancelSkillInteract() {}
  GetData() {
    return ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.RoleSkillTriggerInfo;
  }
  FinishSkillInteract() {}
}
class PhantomArenaOwnRolePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ParentArea = undefined;
    this.RoleItem = undefined;
    this.IsFourCostShowInFirstTime = false;
    this.RoleHpTween = undefined;
    this.SkillList = [];
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem]];
  }
  async InitRoleHpTween() {
    this.RoleHpTween = new PhantomArenaRoleHpTween_1.PhantomArenaRoleHpTween();
    await this.RoleHpTween.InitCurveDamage();
  }
  async InitRoleItem() {
    this.RoleItem = new PhantomArenaRoleItem_1.PhantomArenaRoleItem();
    this.RoleItem.IsOwn = true;
    this.RoleItem.RegisterViewProxy(this.ParentArea.ViewProxy);
    await this.RoleItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RoleId;
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(e);
    this.RoleItem.RefreshHeadIcon(e.RoleHeadTexture);
  }
  async InitSkillItem(e, t) {
    var i = new PhantomArenaSkill();
    i.ViewProxy = this.ParentArea.ViewProxy;
    this.ParentArea.ViewProxy.CanvasManager.AddAreaCanvas(i);
    this.SkillList.push(i);
    if (t) {
      await i.CreateThenShowByActorAsync(e.GetOwner());
    } else {
      await i.CreateByActorAsync(e.GetOwner());
    }
  }
  async InitSkillList() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RoleId;
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(e);
    var e = [...e.PassiveSkillId.map(e => ({
      SkillId: e,
      IsPassive: true
    })), ...e.ActiveSkillId.map(e => ({
      SkillId: e,
      IsPassive: false
    }))];
    await Promise.all([this.InitSkillItem(this.GetItem(2), e.length > 0), this.InitSkillItem(this.GetItem(1), e.length > 1)]);
    if (e.length > 0) {
      this.SkillList[0].Refresh(e[0]);
    }
    if (e.length > 1) {
      this.SkillList[1].Refresh(e[1]);
    }
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.InitRoleItem(), this.InitSkillList(), this.InitRoleHpTween()]);
  }
  OnStart() {
    this.RoleHpTween.SetRoleItem(this.RoleItem);
    this.RoleItem.SetBarActive(true);
    this.b0u();
  }
  OnBeforeDestroy() {
    this.RoleHpTween.Clear();
  }
  b0u() {
    this.R0u();
    this.RefreshTask();
    this.RefreshSkillEffect();
  }
  R0u() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleLife);
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleMaxLife);
    ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.SetPrevShowLife(e);
    this.RoleItem.RefreshLifeNum(e, t);
  }
  RefreshAll() {
    this.TryDoLifeChangeShow();
    this.RefreshTask();
    this.RefreshSkillEffect();
  }
  RefreshLifeNumWithEffect() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleLife);
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleMaxLife);
    this.RoleItem.PlayAddHpEffect(e);
    this.RoleItem.RefreshLifeNum(e, t);
  }
  TryDoLifeChangeShow() {
    const e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.PrevShowLife;
    const t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleLife);
    if (e !== t) {
      const i = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleMaxLife);
      ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.SetPrevShowLife(t);
      TimerSystem_1.GameplayTimerSystem.Delay(() => {
        this.RoleHpTween.PlayHpTween(e, t, i);
        if (e > t) {
          this.RoleItem.PlayHitAnim();
        }
      }, 300);
    }
  }
  RefreshTask() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.TaskData;
    if (!e || e.IsAllFinish) {
      this.RoleItem.SetPhantomBtnActive(false);
    } else {
      this.RoleItem.SetPhantomBtnActive(this.IsFourCostShowInFirstTime);
      e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e.TaskCardConfigId);
      this.RoleItem.RefreshMonsterIcon(e.TaskBg);
    }
  }
  ActiveIsFourCostShowInFirstTime() {
    this.IsFourCostShowInFirstTime = true;
    this.RoleItem.ShowPhantomBtn();
  }
  RefreshSkillEffect() {
    for (const e of this.SkillList) {
      e.RefreshSkillEffect();
    }
  }
  RegisterBattleArea(e) {
    this.ParentArea = e;
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e && e.length !== 0 && e[0] === "Task") {
      return this.RoleItem?.GetGuideUiItemAndUiItemForShowEx(e);
    } else {
      return undefined;
    }
  }
}
exports.PhantomArenaOwnRolePanel = PhantomArenaOwnRolePanel;
//# sourceMappingURL=PhantomArenaOwnRolePanel.js.map