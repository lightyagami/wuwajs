"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleSkillUltraItem = undefined;
const UE = require("ue");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class BattleSkillUltraItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.Visible = false;
    this.Uot = undefined;
    this.Aot = undefined;
    this.Pot = "";
    this.xot = undefined;
    this.wot = "";
    this.dsh = "";
    this.Bot = undefined;
    this.bot = undefined;
    this.Csh = undefined;
    this.qot = -1;
    this.vot = new Map();
    this.Qel = false;
    this.Eoh = t => {
      this.ixl();
    };
    this.CreateByResourceIdAsync("UiItem_BattleSkillUltraItem", t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UINiagara], [2, UE.UINiagara], [3, UE.UINiagara], [4, UE.UINiagara]];
  }
  OnStart() {
    this.Uot = this.GetSprite(0);
    for (const t of this.vot.values()) {
      t();
    }
    if (ModelManager_1.ModelManager.BattleLinkModel?.CheckInDreamLink()) {
      this.ixl();
      this.Qel = true;
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBattleLinkStatusChanged, this.Eoh);
    }
  }
  OnBeforeDestroy() {
    this.Uot = undefined;
    this.vot.clear();
    this.Got();
    this.Not();
    if (this.Qel) {
      this.Qel = false;
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBattleLinkStatusChanged, this.Eoh);
    }
  }
  SetComponentActive(t) {
    this.Visible = t;
    t = () => {
      this.SetActive(this.Visible);
    };
    if (this.InAsyncLoading()) {
      this.vot.set("SetActive", t);
    } else {
      t();
    }
  }
  SetBarPercent(t, i) {
    var e;
    if (this.qot !== t) {
      e = () => {
        this.Uot.SetFillAmount(t);
        this.qot = t;
      };
      if (this.InAsyncLoading()) {
        this.vot.set("SetBarPercent", e);
      } else {
        e();
      }
    }
  }
  SetBarVisible(t) {
    var i = () => {
      if (this.Uot.bIsUIActive !== t) {
        this.Uot.SetUIActive(t);
      }
    };
    if (this.InAsyncLoading()) {
      this.vot.set("SetBarVisible", i);
    } else {
      i();
    }
  }
  SetFrameSprite(t) {
    var i;
    if (!!t && (!this.Aot || !this.Aot.op_Equality(t))) {
      i = () => {
        this.Uot?.SetColor(t);
        this.Aot = t;
      };
      if (this.InAsyncLoading()) {
        this.vot.set("SetFrameSprite", i);
      } else {
        i();
      }
    }
  }
  gsh(t, i) {
    if (t && t.bIsUIActive !== i) {
      t.SetUIActive(i);
      if (i) {
        t.ActivateSystem(true);
      } else {
        t.DeactivateSystem();
      }
    }
  }
  SetUltraEffectEnable(t) {
    var i = () => {
      if (this.HasValidUltDynamicEffect()) {
        if (t) {
          this.SetBarVisible(false);
          this.gsh(this.GetUiNiagara(1), false);
          this.gsh(this.GetUiNiagara(4), true);
        } else {
          this.SetBarVisible(true);
          this.gsh(this.GetUiNiagara(1), false);
          this.gsh(this.GetUiNiagara(4), false);
        }
      } else {
        this.SetBarVisible(true);
        this.gsh(this.GetUiNiagara(1), t);
        this.gsh(this.GetUiNiagara(4), false);
      }
    };
    if (this.InAsyncLoading()) {
      this.vot.set("SetUltraEffectEnable", i);
    } else {
      i();
    }
  }
  SetUltraTipsEffectEnable(i) {
    var t = () => {
      var t = this.GetUiNiagara(2);
      if (t.bIsUIActive !== i) {
        t.SetUIActive(i);
      }
      if (i) {
        t.ActivateSystem(true);
      } else {
        t.DeactivateSystem();
      }
    };
    if (this.InAsyncLoading()) {
      this.vot.set("SetUltraTipsEffectEnable", t);
    } else {
      t();
    }
  }
  SetUltraUpEffectEnable(i) {
    var t = () => {
      var t = this.GetUiNiagara(3);
      if (t.bIsUIActive !== i) {
        t.SetUIActive(i);
      }
      if (i) {
        t.SetNiagaraVarFloat("Time", this.qot);
        t.ActivateSystem(true);
      } else {
        t.DeactivateSystem();
      }
    };
    if (this.InAsyncLoading()) {
      this.vot.set("SetUltraUpEffectEnable", t);
    } else {
      t();
    }
  }
  RefreshUltraEffect(t, i) {
    var e;
    if (StringUtils_1.StringUtils.IsEmpty(this.Pot) || this.Pot !== t) {
      this.xot = i;
      e = () => {
        this.Got();
        this.Bot = ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.NiagaraSystem, t => {
          var i;
          if (t?.IsValid()) {
            (i = this.GetUiNiagara(1))?.SetNiagaraSystem(t);
            i?.SetNiagaraVarLinearColor("Color", this.xot);
          }
        });
        this.Pot = t;
      };
      if (this.InAsyncLoading()) {
        this.vot.set("RefreshUltraEffect", e);
      } else {
        e();
      }
    } else if (this.xot !== i) {
      this.xot = i;
      if (!this.InAsyncLoading()) {
        this.GetUiNiagara(1)?.SetNiagaraVarLinearColor("Color", this.xot);
      }
    }
  }
  Got() {
    if (this.Bot) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Bot);
      this.Bot = undefined;
    }
  }
  RefreshUltraTipsEffect(t) {
    var i;
    if (!!StringUtils_1.StringUtils.IsEmpty(this.wot) || this.wot !== t) {
      i = () => {
        this.Not();
        this.bot = ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.NiagaraSystem, t => {
          if (t?.IsValid()) {
            this.GetUiNiagara(2)?.SetNiagaraSystem(t);
          }
        });
        this.wot = t;
      };
      if (this.InAsyncLoading()) {
        this.vot.set("RefreshUltraTipsEffect", i);
      } else {
        i();
      }
    }
  }
  Not() {
    if (this.bot) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.bot);
      this.bot = undefined;
    }
  }
  RefreshUltraDynamicEffect(t, i = 0) {
    var e;
    if (!!StringUtils_1.StringUtils.IsEmpty(this.dsh) || this.dsh !== t) {
      e = () => {
        this.fsh();
        this.Csh = ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.NiagaraSystem, t => {
          if (t?.IsValid()) {
            this.GetUiNiagara(4)?.SetNiagaraSystem(t);
          }
        });
        this.dsh = t;
      };
      if (this.InAsyncLoading()) {
        this.vot.set("RefreshUltraDynamicEffect", e);
      } else {
        e();
      }
    }
  }
  fsh() {
    if (this.Csh) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Csh);
      this.Csh = undefined;
    }
  }
  StopUltraDynamicEffect() {
    var t = this.GetUiNiagara(4);
    t?.DeactivateSystem();
    t?.SetUIActive(false);
  }
  HasValidUltDynamicEffect() {
    return !!this.Csh && !!ModelManager_1.ModelManager.BattleLinkModel.CheckInDreamLink() && ModelManager_1.ModelManager.BattleLinkModel.CanUseLinkSkill();
  }
  ixl() {
    if (ModelManager_1.ModelManager.BattleLinkModel?.CanUseLinkSkill()) {
      this.SetUltraEffectEnable(true);
    } else {
      this.SetUltraEffectEnable(false);
    }
  }
}
exports.BattleSkillUltraItem = BattleSkillUltraItem;
//# sourceMappingURL=BattleSkillUltraItem.js.map