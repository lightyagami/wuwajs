"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConcertoResponseItem = undefined;
const UE = require("ue");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BattleUiRoleData_1 = require("../BattleUiRoleData");
const BattleVisibleChildView_1 = require("./BattleChildView/BattleVisibleChildView");
const BattleSkillExtraEffectRhythmItem_1 = require("./BattleSkillExtraEffectRhythmItem");
class ConcertoResponseItem extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments);
    this.Wst = undefined;
    this.E0 = undefined;
    this.Kst = undefined;
    this.Qst = undefined;
    this.Xst = undefined;
    this.hJ = 0;
    this.U7d = undefined;
    this.ufe = 0;
    this.o$e = t => {
      if (t === this.E0) {
        this.yTa();
      }
    };
    this.Yst = (t, e, i) => {
      if (t === this.E0) {
        this.RefreshVisible();
      }
    };
    this.x7d = (t, e) => {
      this.RefreshExtraEffect(t, e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture]];
  }
  Initialize(t) {
    super.Initialize(t);
    this.InitChildType(37);
    this.Ore();
  }
  OnBeforeDestroy() {
    this.Refresh(undefined);
  }
  Reset() {
    this.kre();
    if (this.U7d) {
      this.U7d.Stop();
      this.U7d.Destroy();
      this.U7d = undefined;
    }
    super.Reset();
  }
  Refresh(t) {
    if (t && t.RoleConfig?.RoleType !== 2) {
      this.Wst = t;
      this.E0 = t?.EntityHandle?.Id;
      this.Kst = this.Wst.GameplayTagComponent;
      this.Qst = this.Wst.ElementConfig;
      if (this.hJ !== 0) {
        ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.hJ);
        this.hJ = 0;
      }
      this.Jst(this.Wst.ElementType);
      this.yTa();
      this.RefreshVisible();
    } else {
      this.Wst = undefined;
      this.E0 = undefined;
      this.Kst = undefined;
      this.Xst = undefined;
      this.Qst = undefined;
      this.SetVisible(1, false);
    }
  }
  GetEntityId() {
    return this.E0;
  }
  Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiElementEnergyChanged, this.o$e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiElementHideTagChanged, this.Yst);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiConcertoExtraEffectRefresh, this.x7d);
  }
  kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiElementEnergyChanged, this.o$e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiElementHideTagChanged, this.Yst);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiConcertoExtraEffectRefresh, this.x7d);
  }
  RefreshVisible() {
    if (this.Wst) {
      if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10036)) {
        for (const t of BattleUiRoleData_1.BattleUiRoleData.HideElementTagList) {
          if (this.Kst.HasTag(t)) {
            this.SetVisible(1, false);
            return;
          }
        }
        this.SetVisible(1, true);
      } else {
        this.SetVisible(1, false);
      }
    }
  }
  RefreshExtraEffect(t, e) {
    if (t === 0) {
      if (this.U7d) {
        this.U7d.SetComponentActive(false);
      }
    } else {
      if (this.U7d) {
        if (this.U7d.GetEffectType() === this.ufe) {
          this.U7d.SetComponentActive(true);
          this.U7d.Refresh(e);
          return;
        }
        this.U7d.Destroy();
        this.U7d = undefined;
      }
      if ((this.ufe = t) === 1) {
        this.U7d = new BattleSkillExtraEffectRhythmItem_1.BattleSkillExtraEffectRhythmItem();
        this.U7d.Init(this.RootItem);
        this.U7d.SetComponentActive(true);
        this.U7d.Refresh(e);
      }
      this.U7d?.SetEffectType(t);
    }
  }
  Jst(t) {
    var e;
    var i;
    var s;
    if (this.Xst !== t) {
      e = this.Qst.Icon5;
      i = this.GetTexture(1);
      s = this.GetSprite(0);
      this.SetElementIcon(e, i, this.Xst);
      i.SetColor(this.Wst.ElementColor);
      s.SetColor(this.Wst.ElementColor);
      this.Xst = t;
    }
  }
  yTa() {
    this.GetSprite(0).SetFillAmount(this.GetElementPercent());
  }
  GetElementPercent() {
    if (this.Wst) {
      return this.Wst.GetElementAttributePercent();
    } else {
      return 0;
    }
  }
}
exports.ConcertoResponseItem = ConcertoResponseItem;
//# sourceMappingURL=ConcertoResponseItem.js.map