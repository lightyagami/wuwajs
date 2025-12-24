"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaSkill = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer");
const UiManager_1 = require("../../../../../Ui/UiManager");
const ScrollingTipsController_1 = require("../../../../ScrollingTips/ScrollingTipsController");
const PhantomArenaSkillInteractFactory_1 = require("../../SkillInteract/PhantomArenaSkillInteractFactory");
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
        e = (this.Bmo.IsOwn ? ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData : ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData).GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleCostPoint);
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
    var e = this.GetButton(2);
    e.OnPointEnterCallBack.Bind(this.btu);
    e.OnPointExitCallBack.Bind(this.Rtu);
    this.ViewProxy.BanButtonClickModule.RegisterButton(this.GetButton(2));
  }
  async OnHandleRoleSkillClick() {
    this.ViewProxy.RegisterCantDragReason(4);
    try {
      var e;
      if (await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleCardRoleTargetInfo(this.Bmo.SkillId)) {
        e = {
          SkillId: this.Bmo.SkillId,
          CloseCallback: () => {
            this.ExecuteBuffEffect().finally(() => {
              this.ViewProxy.UnRegisterCantDragReason(4);
            });
          }
        };
        UiManager_1.UiManager.OpenView("PhantomArenaRoleCutInView", e);
      } else {
        this.ViewProxy.UnRegisterCantDragReason(4);
      }
    } catch {
      this.ViewProxy.UnRegisterCantDragReason(4);
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
    this.GetText(1).SetUIActive(false);
    this.GetItem(3).SetUIActive(false);
    this.SetTextureByPath(this.Bmo.Icon, this.GetTexture(0));
  }
  pj1() {
    this.GetText(1).SetUIActive(true);
    this.GetItem(3).SetUIActive(true);
    this.SetTextureByPath(this.Bmo.Icon, this.GetTexture(0));
    this.GetText(1).SetText(this.Bmo.CostConsume.toString());
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
  GetData() {
    return ModelManager_1.ModelManager.PhantomArenaBattleModel.BuffEffectData.RoleSkillTriggerInfo;
  }
}
exports.PhantomArenaSkill = PhantomArenaSkill;
//# sourceMappingURL=PhantomArenaSkillItem.js.map