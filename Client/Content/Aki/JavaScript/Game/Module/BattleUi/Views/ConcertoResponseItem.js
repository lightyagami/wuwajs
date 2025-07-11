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
class ConcertoResponseItem extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments);
    this.Wst = undefined;
    this.E0 = undefined;
    this.Kst = undefined;
    this.Qst = undefined;
    this.Xst = undefined;
    this.hJ = 0;
    this.o$e = e => {
      if (e === this.E0) {
        this.yTa();
      }
    };
    this.Yst = (e, t, i) => {
      if (e === this.E0) {
        this.RefreshVisible();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture]];
  }
  Initialize(e) {
    super.Initialize(e);
    this.InitChildType(26);
    this.Ore();
  }
  OnBeforeDestroy() {
    this.Refresh(undefined);
  }
  Reset() {
    this.kre();
    super.Reset();
  }
  Refresh(e) {
    if (e && e.RoleConfig?.RoleType !== 2) {
      this.Wst = e;
      this.E0 = e?.EntityHandle?.Id;
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
  }
  kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiElementEnergyChanged, this.o$e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiElementHideTagChanged, this.Yst);
  }
  RefreshVisible() {
    if (this.Wst) {
      if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10036)) {
        for (const e of BattleUiRoleData_1.BattleUiRoleData.HideElementTagList) {
          if (this.Kst.HasTag(e)) {
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
  Jst(e) {
    var t;
    var i;
    var s;
    if (this.Xst !== e) {
      t = this.Qst.Icon5;
      i = this.GetTexture(1);
      s = this.GetSprite(0);
      this.SetElementIcon(t, i, this.Xst);
      i.SetColor(this.Wst.ElementColor);
      s.SetColor(this.Wst.ElementColor);
      this.Xst = e;
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