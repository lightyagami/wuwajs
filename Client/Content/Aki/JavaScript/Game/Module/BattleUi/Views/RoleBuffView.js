"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleBuffView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BattleUiControl_1 = require("../BattleUiControl");
const BattleVisibleChildView_1 = require("./BattleChildView/BattleVisibleChildView");
const BuffItemContainer_1 = require("./BuffItemContainer");
const EnvironmentItem_1 = require("./EnvironmentItem");
class RoleBuffView extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments);
    this.Wst = undefined;
    this.E0 = undefined;
    this.lmt = new Map();
    this.mkn = new BuffItemContainer_1.BuffItemContainer();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  OnStart() {
    super.OnStart();
    this.InitChildType(26);
    this.mkn.Init(this.GetItem(1), undefined, false, true);
  }
  OnBeforeDestroy() {
    this.Refresh(undefined);
    this._mt();
  }
  Refresh(e) {
    if (e) {
      this.Wst = e;
      this.E0 = e?.EntityHandle?.Id;
      this.mkn.RefreshBuff(e?.EntityHandle);
    } else {
      this.Wst = undefined;
      this.E0 = undefined;
      this.mkn.ClearAll();
    }
  }
  IsValid() {
    return this.Wst?.EntityHandle !== undefined;
  }
  GetEntityId() {
    return this.E0;
  }
  Tick(e) {
    this.mkn.Tick(e);
    this.umt();
  }
  AddBuff(e, t) {
    this.mkn.AddBuffByCue(e, t, true);
  }
  RemoveBuff(e, t) {
    this.mkn.RemoveBuffByCue(e, t, true);
  }
  umt() {
    let t = 0;
    for (const s of ModelManager_1.ModelManager.BattleUiModel.FormationData.EnvironmentPropertyList) {
      var i;
      var r;
      var o = ModelManager_1.ModelManager.FormationAttributeModel.GetValue(s);
      if (o > t) {
        t = o;
      }
      let e = this.lmt.get(s);
      if (e === undefined) {
        if (!(o <= 0)) {
          i = this.GetItem(0);
          i = BattleUiControl_1.BattleUiControl.Pool.GetEnvironmentItem(i);
          (e = new EnvironmentItem_1.EnvironmentItem()).InitPropertyId(s);
          r = ModelManager_1.ModelManager.FormationAttributeModel.GetMax(s);
          e.SetPercent(o, r);
          e.CreateThenShowByActorAsync(i).catch(() => {});
          this.lmt.set(s, e);
        }
      } else {
        r = ModelManager_1.ModelManager.FormationAttributeModel.GetMax(s);
        e.SetPercent(o, r);
      }
    }
  }
  _mt() {
    for (const e of this.lmt.values()) {
      BattleUiControl_1.BattleUiControl.Pool.RecycleEnvironmentItem(e.GetRootActor());
      e.Destroy();
    }
    this.lmt.clear();
  }
}
exports.RoleBuffView = RoleBuffView;
//# sourceMappingURL=RoleBuffView.js.map