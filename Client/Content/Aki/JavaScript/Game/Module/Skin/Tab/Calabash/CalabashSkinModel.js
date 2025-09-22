"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalabashSkinModel = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ModelBase_1 = require("../../../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CalabashSkinDefine_1 = require("./CalabashSkinDefine");
class CalabashSkinModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.xDd = new Set();
    this.BDd = CalabashSkinDefine_1.CALABASH_SKIN_DEFAULT_ID;
  }
  OnClear() {
    ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(LocalStorageDefine_1.ELocalStoragePlayerKey.CalabashSkinRedDot);
    return true;
  }
  kDd(e) {
    if (ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.CalabashSkinRedDot, e)) {
      return false;
    }
    ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.CalabashSkinRedDot, e);
    e = ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleId();
    if (e) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleSkinRedDotRefresh, e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.HuluSkinRedDotRefresh);
    }
    return true;
  }
  ODd(e) {
    this.BDd = e;
  }
  qDd(e) {
    this.xDd.clear();
    for (const a of e) {
      this.xDd.add(a);
    }
  }
  RemoveCalabashSkinRedDot(e) {
    ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.CalabashSkinRedDot, e);
    e = ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleId();
    if (e) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleSkinRedDotRefresh, e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.HuluSkinRedDotRefresh);
    }
  }
  GetCurrentEquipSkinId() {
    return this.BDd;
  }
  GetSkinCountById(e) {
    if (this.xDd.has(e)) {
      return 1;
    } else {
      return 0;
    }
  }
  NotifyCalabashSkinData(e, a) {
    this.ODd(e);
    this.qDd(a);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CalabashSkin", 10, "葫芦皮肤全量推送", ["equipSkinId", e], ["skinIdList", a]);
    }
  }
  NotifyAddUnlockSkinData(e) {
    for (const a of e) {
      this.xDd.add(a);
      this.kDd(a);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CalabashSkin", 10, "葫芦皮肤增量推送", ["skinIdList", e]);
    }
  }
  NotifyCurrentEquippedSkinId(e) {
    this.ODd(e);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CalabashSkin", 10, "葫芦皮肤装备", ["skinId", e]);
    }
  }
  CheckCalabashSkinHasRedDotByRoleId(e) {
    return e === ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleId() && this.CheckCalabashSkinHasRedDot();
  }
  CheckCalabashSkinHasRedDot() {
    for (const e of this.xDd) {
      if (ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.CalabashSkinRedDot, e)) {
        return true;
      }
    }
    return false;
  }
}
exports.CalabashSkinModel = CalabashSkinModel;
//# sourceMappingURL=CalabashSkinModel.js.map