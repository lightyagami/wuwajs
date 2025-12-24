"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaOwnRolePanel = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../../Core/Common/Info");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const PhantomArenaRoleHpTween_1 = require("../../Area/Hand/PhantomArenaRoleHpTween");
const PhantomArenaFieldItem_1 = require("../Field/PhantomArenaFieldItem");
const PhantomArenaRoleItem_1 = require("./PhantomArenaRoleItem");
const PhantomArenaSkillItem_1 = require("./PhantomArenaSkillItem");
class PhantomArenaOwnRolePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ParentArea = undefined;
    this.RoleItem = undefined;
    this.IsFourCostShowInFirstTime = false;
    this.RoleHpTween = undefined;
    this.SkillList = [];
    this.GamepadFieldItem = undefined;
    this.I9m = (e, t) => {
      this.ParentArea.ViewProxy.FieldPointerEnter(e, t, true);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  async InitGamepadFieldItem() {
    if (ModelManager_1.ModelManager.PhantomArenaBattleModel.IsOldBvb || Info_1.Info.IsInTouch()) {
      this.GetItem(3).SetUIActive(false);
    } else {
      this.GamepadFieldItem = new PhantomArenaFieldItem_1.PhantomArenaFieldItem();
      this.GamepadFieldItem.SetInteractClickCallback(this.ParentArea.ViewProxy.FieldInteractClick);
      this.GamepadFieldItem.SetFinishSkillInteractCallback(this.ParentArea.ViewProxy.FieldFinishSkillInteract);
      this.GamepadFieldItem.SetPointerEnterCallback(this.I9m);
      this.GamepadFieldItem.SetPointerExitCallback(this.ParentArea.ViewProxy.FieldPointerExit);
      await this.GamepadFieldItem.CreateByActorAsync(this.GetItem(3).GetOwner());
    }
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
    var i = new PhantomArenaSkillItem_1.PhantomArenaSkill();
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
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(e);
    var i = [];
    for (let e = 0; e < t.PassiveSkillId.length; e++) {
      var a = {
        IsOwn: true,
        SkillId: t.PassiveSkillId[e],
        IsPassive: true,
        Icon: t.PassiveSkillIconList[e],
        SkillName: t.PassiveSkillNameList[e],
        SkillDesc: t.PassiveSkillDescList[e],
        SkillDescParams: t.PassiveSkillDescParamsList[e]?.ArrayString ?? [],
        CostConsume: 0
      };
      i.push(a);
    }
    for (let e = 0; e < t.ActiveSkillId.length; e++) {
      var s = t.ActiveSkillId[e];
      var o = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleSkillConfig(s);
      var s = {
        IsOwn: true,
        SkillId: s,
        IsPassive: false,
        Icon: t.SkillIconList[e],
        SkillName: t.SkillNameList[e],
        SkillDesc: t.SkillDescList[e],
        SkillDescParams: t.SkillDescParamsList[e]?.ArrayString ?? [],
        CostConsume: o.CostConsume
      };
      i.push(s);
    }
    await Promise.all([this.InitSkillItem(this.GetItem(2), i.length > 0), this.InitSkillItem(this.GetItem(1), i.length > 1)]);
    if (i.length > 0) {
      this.SkillList[0].Refresh(i[0]);
    }
    if (i.length > 1) {
      this.SkillList[1].Refresh(i[1]);
    }
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.InitRoleItem(), this.InitSkillList(), this.InitRoleHpTween(), this.InitGamepadFieldItem()]);
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
  RefreshAll(e) {
    if (e) {
      this.R0u();
    } else {
      this.RefreshShieldNum();
      this.TryDoLifeChangeShow();
    }
    this.RefreshTask();
    this.RefreshSkillEffect();
  }
  RefreshLifeNumWithEffect() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleLife);
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleMaxLife);
    this.RoleItem.PlayHpEffect(e);
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
  PlayHpTween() {
    var e;
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.PrevShowLife;
    var i = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleLife);
    if (t !== i) {
      e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleMaxLife);
      ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.SetPrevShowLife(i);
      this.RoleHpTween.PlayHpTween(t, i, e);
    }
  }
  RefreshShieldNum() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleBattleAttr(Protocol_1.Aki.Protocol.GC1.Proto_Defence);
    this.RoleItem.RefreshShieldNum(e);
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
  async PlayBeHitEffect(e) {
    this.PlayHpTween();
    await this.RoleItem.PlayBeHitEffect(e);
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
  SwitchFieldState(e) {
    this.GamepadFieldItem?.SetFieldItemActive(e);
  }
  RefreshField() {
    this.GamepadFieldItem?.Refresh(ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.FieldData);
  }
  GetRoleRootItem() {
    return this.RoleItem.GetRootItem();
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