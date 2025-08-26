"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleBuffView = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BattleUiControl_1 = require("../BattleUiControl");
const BattleVisibleChildView_1 = require("./BattleChildView/BattleVisibleChildView");
const BuffItem_1 = require("./BuffItem");
const BuffItemContainer_1 = require("./BuffItemContainer");
const EnvironmentItem_1 = require("./EnvironmentItem");
class RoleBuffView extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments);
    this.E0 = undefined;
    this.lmt = new Map();
    this.mkn = new BuffItemContainer_1.BuffItemContainer();
    this.v2u = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  OnStart() {
    super.OnStart();
    this.InitChildType(37);
    this.V2u();
    var e = CommonParamById_1.configCommonParamById.GetIntConfig("RoleBuffItemCount");
    this.mkn.Init(this.GetItem(1), e, false, true, false, this.v2u.GetRootItem());
  }
  OnBeforeDestroy() {
    this.Refresh(undefined);
    this._mt();
    this.j2u();
  }
  V2u() {
    this.v2u = new BuffItem_1.BuffItem(this.GetItem(1));
    this.v2u.ActivateExceedTip();
  }
  j2u() {
    if (this.v2u) {
      this.v2u.DestroyCompatible();
      this.v2u = undefined;
    }
  }
  Refresh(e) {
    if (e) {
      this.E0 = e?.EntityHandle?.Id;
      this.mkn.RefreshBuff(e?.EntityHandle);
    } else {
      this.E0 = undefined;
      this.mkn.ClearAll();
    }
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
    for (const n of ModelManager_1.ModelManager.BattleUiModel.FormationData.EnvironmentPropertyList) {
      var i;
      var r;
      var o = ModelManager_1.ModelManager.FormationAttributeModel.GetValue(n);
      if (o > t) {
        t = o;
      }
      let e = this.lmt.get(n);
      if (e === undefined) {
        if (!(o <= 0)) {
          i = this.GetItem(0);
          i = BattleUiControl_1.BattleUiControl.Pool.GetEnvironmentItem(i);
          (e = new EnvironmentItem_1.EnvironmentItem()).InitPropertyId(n);
          r = ModelManager_1.ModelManager.FormationAttributeModel.GetMax(n);
          e.SetPercent(o, r);
          e.CreateThenShowByActorAsync(i).catch(() => {});
          this.lmt.set(n, e);
        }
      } else {
        r = ModelManager_1.ModelManager.FormationAttributeModel.GetMax(n);
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