"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BattleQteModel = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  DataTableUtil_1 = require("../../../../Core/Utils/DataTableUtil"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  BattleQteContext_1 = require("./BattleQteContext"),
  DT_BATTLE_QTE_PATH = "/Game/Aki/Data/Qte/DT_BattleQte.DT_BattleQte";
class BattleQteModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), this.xy1 = 0, this.Uy1 = 0, this.ilc = void 0, this.Dy1 = void 0, this.oIl = e => {
      var t = this.GetBattleQteContext(this.GetBattleQteHandleId());
      t && e === t?.CommonQteHandleId && (this.Dy1?.delete(t.BattleQteHandleId), this.ClearBattleQteHandleId())
    }
  }
  OnInit() {
    return EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CommonQteEnd, this.oIl) || EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CommonQteEnd, this.oIl), !0
  }
  OnClear() {
    return EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CommonQteEnd, this.oIl) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CommonQteEnd, this.oIl), !0
  }
  OnLeaveLevel() {
    return this.Dy1?.clear(), !(this.ilc = void 0)
  }
  CreateBattleQteContext(e, t, s, r) {
    var i, n = this.GetBattleQteConfig(e);
    if (n) return (i = new BattleQteContext_1.BattleQteContext).BattleQteHandleId = this.xy1++, i.CommonQteId = n.QteId, i.BattleQteId = e, i.MessageId = t, i.EntityHandle = s, i.BattleQteSource = r, i
  }
  GetBattleQteConfig(e) {
    this.ilc || (this.ilc = ResourceSystem_1.ResourceSystem.GetLoadedAsset(DT_BATTLE_QTE_PATH, UE.DataTable));
    var t = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.ilc, e.toString());
    return t || Log_1.Log.CheckError() && Log_1.Log.Error("CommonQte", 67, "找不到战斗QTE配置", ["BattleQteId", e]), t
  }
  SetCurrentBattleQte(e) {
    this.Uy1 = e.BattleQteHandleId, this.Dy1 || (this.Dy1 = new Map), this.Dy1.set(e.BattleQteHandleId, e)
  }
  GetBattleQteHandleId() {
    return this.Uy1
  }
  ClearBattleQteHandleId() {
    this.Uy1 = -1
  }
  GetBattleQteContext(e) {
    return this.Dy1?.get(e)
  }
}
exports.BattleQteModel = BattleQteModel;
//# sourceMappingURL=BattleQteModel.js.map