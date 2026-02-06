"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaOpponentRolePanel = undefined;
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
class PhantomArenaOpponentRolePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ParentArea = undefined;
    this.RoleItem = undefined;
    this.SkillItem = undefined;
    this.GamepadSkillItem = undefined;
    this.GamepadFieldItem = undefined;
    this.RoleHpTween = undefined;
    this.nHm = (e, t) => {
      this.ParentArea.ViewProxy.FieldPointerEnter(e, t, true);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  async InitGamepadFieldItem() {
    if (ModelManager_1.ModelManager.PhantomArenaBattleModel.IsOldBvb || Info_1.Info.IsInTouch()) {
      this.GetItem(2).SetUIActive(false);
    } else {
      this.GamepadFieldItem = new PhantomArenaFieldItem_1.PhantomArenaFieldItem();
      this.GamepadFieldItem.SetPointerEnterCallback(this.nHm);
      this.GamepadFieldItem.SetPointerExitCallback(this.ParentArea.ViewProxy.FieldPointerExit);
      await this.GamepadFieldItem.CreateByActorAsync(this.GetItem(2).GetOwner());
    }
  }
  async CreateSkillItem(e) {
    this.SkillItem = new PhantomArenaSkillItem_1.PhantomArenaSkill();
    this.SkillItem.ViewProxy = this.ParentArea.ViewProxy;
    this.ParentArea.ViewProxy.CanvasManager.AddAreaCanvas(this.SkillItem);
    if (Info_1.Info.IsInGamepad()) {
      await this.SkillItem.CreateByActorAsync(this.GetItem(3).GetOwner());
    } else {
      await this.SkillItem.CreateThenShowByActorAsync(this.GetItem(3).GetOwner());
    }
    this.SkillItem.Refresh(e);
  }
  async CreateGamepadSkillItem(e) {
    if (Info_1.Info.IsInTouch()) {
      this.GetItem(1)?.SetUIActive(false);
    } else {
      this.GamepadSkillItem = new PhantomArenaSkillItem_1.PhantomArenaSkill();
      this.GamepadSkillItem.ViewProxy = this.ParentArea.ViewProxy;
      this.ParentArea.ViewProxy.CanvasManager.AddAreaCanvas(this.GamepadSkillItem);
      if (Info_1.Info.IsInGamepad()) {
        await this.GamepadSkillItem.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
      } else {
        await this.GamepadSkillItem.CreateByActorAsync(this.GetItem(1).GetOwner());
      }
      this.GamepadSkillItem.Refresh(e);
    }
  }
  async InitSkillItem() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.ChallengeId;
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallenge(e);
    var i = [];
    for (let e = 0; e < t.NpcChallengeSkillId.length; e++) {
      var a = {
        IsOwn: false,
        SkillId: t.NpcChallengeSkillId[e],
        IsPassive: true,
        Icon: t.NpcSkillIconList[e],
        SkillName: t.NpcSkillNameList[e],
        SkillDesc: t.NpcSkillDescList[e],
        SkillDescParams: t.NpcSkillDescParamsList[e]?.ArrayString ?? [],
        CostConsume: 0
      };
      i.push(a);
    }
    if (i.length <= 0) {
      this.GetItem(3).SetUIActive(false);
      this.GetItem(1).SetUIActive(false);
    } else {
      await Promise.all([this.CreateSkillItem(i[0]), this.CreateGamepadSkillItem(i[0])]);
    }
  }
  async nFe() {
    this.RoleItem = new PhantomArenaRoleItem_1.PhantomArenaRoleItem();
    this.RoleItem.IsOwn = false;
    this.RoleItem.RegisterViewProxy(this.ParentArea.ViewProxy);
    await this.RoleItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.ChallengeId;
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleChallengeConfig(e);
    this.RoleItem.RefreshHeadIcon(e.NpcHead);
    this.RoleItem.SetBarActive(false);
    this.R0u();
    this.RefreshTask();
  }
  async Avu() {
    this.RoleHpTween = new PhantomArenaRoleHpTween_1.PhantomArenaRoleHpTween();
    await this.RoleHpTween.InitCurveDamage();
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.nFe(), this.InitSkillItem(), this.InitGamepadFieldItem(), this.Avu()]);
  }
  OnStart() {
    this.RoleHpTween.SetRoleItem(this.RoleItem);
    this.RoleItem.SetBarActive(true);
  }
  OnBeforeDestroy() {
    this.RoleHpTween.Clear();
  }
  R0u() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleLife);
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleMaxLife);
    ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.SetPrevShowLife(e);
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
  }
  RefreshLifeNumWithEffect() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleLife);
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleMaxLife);
    ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.SetPrevShowLife(e);
    this.RoleItem.PlayHpEffect(e);
    this.RoleItem.RefreshLifeNum(e, t);
  }
  TryDoLifeChangeShow() {
    const e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.PrevShowLife;
    const t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleLife);
    if (e !== t) {
      const i = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleMaxLife);
      ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.SetPrevShowLife(t);
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
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.PrevShowLife;
    var i = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleLife);
    if (t !== i) {
      e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleMaxLife);
      ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.SetPrevShowLife(i);
      this.RoleHpTween.PlayHpTween(t, i, e);
    }
  }
  RefreshShieldNum() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetBattleBattleAttr(Protocol_1.Aki.Protocol.GC1.Proto_Defence);
    this.RoleItem.RefreshShieldNum(e);
  }
  RefreshTask() {
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.TaskData;
    if (!e || e.IsAllFinish) {
      this.RoleItem.SetPhantomBtnActive(false);
    } else {
      this.RoleItem.SetPhantomBtnActive(true);
      e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e.TaskCardConfigId);
      this.RoleItem.RefreshMonsterIcon(e.TaskBg);
    }
  }
  async PlayBeHitEffect(e) {
    this.PlayHpTween();
    await this.RoleItem.PlayBeHitEffect(e);
  }
  RegisterBattleArea(e) {
    this.ParentArea = e;
  }
  SwitchFieldState(e) {
    this.GamepadFieldItem?.SetFieldItemActive(e);
  }
  RefreshSkillState() {
    this.SkillItem?.SetActive(!Info_1.Info.IsInGamepad());
    this.GamepadSkillItem?.SetActive(Info_1.Info.IsInGamepad());
  }
  RefreshField() {
    this.GamepadFieldItem?.Refresh(ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.FieldData);
  }
  GetRoleRootItem() {
    return this.RoleItem.GetRootItem();
  }
}
exports.PhantomArenaOpponentRolePanel = PhantomArenaOpponentRolePanel;
//# sourceMappingURL=PhantomArenaOpponentRolePanel.js.map