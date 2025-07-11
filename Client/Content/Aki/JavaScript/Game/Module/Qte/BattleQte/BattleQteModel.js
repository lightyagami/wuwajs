"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleQteModel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const DataTableUtil_1 = require("../../../../Core/Utils/DataTableUtil");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const BattleQteContext_1 = require("./BattleQteContext");
const DT_BATTLE_QTE_PATH = "/Game/Aki/Data/Qte/DT_BattleQte.DT_BattleQte";
class BattleQteModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.iS1 = 0;
    this.rS1 = 0;
    this.ilc = undefined;
    this.oS1 = undefined;
    this.oIl = e => {
      var t = this.GetBattleQteContext(this.GetBattleQteHandleId());
      if (t && e === t?.CommonQteHandleId) {
        this.oS1?.delete(t.BattleQteHandleId);
        this.ClearBattleQteHandleId();
      }
    };
  }
  OnInit() {
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CommonQteEnd, this.oIl)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CommonQteEnd, this.oIl);
    }
    return true;
  }
  OnClear() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CommonQteEnd, this.oIl)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CommonQteEnd, this.oIl);
    }
    return true;
  }
  OnLeaveLevel() {
    this.oS1?.clear();
    return !(this.ilc = undefined);
  }
  CreateBattleQteContext(e, t, s, r) {
    var i;
    var n = this.GetBattleQteConfig(e);
    if (n) {
      (i = new BattleQteContext_1.BattleQteContext()).BattleQteHandleId = this.iS1++;
      i.CommonQteId = n.QteId;
      i.BattleQteId = e;
      i.MessageId = t;
      i.EntityHandle = s;
      i.BattleQteSource = r;
      return i;
    }
  }
  GetBattleQteConfig(e) {
    this.ilc ||= ResourceSystem_1.ResourceSystem.GetLoadedAsset(DT_BATTLE_QTE_PATH, UE.DataTable);
    var t = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.ilc, e.toString());
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("CommonQte", 67, "找不到战斗QTE配置", ["BattleQteId", e]);
      }
    }
    return t;
  }
  SetCurrentBattleQte(e) {
    this.rS1 = e.BattleQteHandleId;
    this.oS1 ||= new Map();
    this.oS1.set(e.BattleQteHandleId, e);
  }
  GetBattleQteHandleId() {
    return this.rS1;
  }
  ClearBattleQteHandleId() {
    this.rS1 = -1;
  }
  GetBattleQteContext(e) {
    return this.oS1?.get(e);
  }
}
exports.BattleQteModel = BattleQteModel;
//# sourceMappingURL=BattleQteModel.js.map