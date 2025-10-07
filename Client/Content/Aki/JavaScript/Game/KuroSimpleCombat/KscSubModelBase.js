"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KscSubModelBase = undefined;
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const UiAsyncTaskManager_1 = require("../Ui/Base/UiAsyncTaskManager");
const KscHeadStateData_1 = require("./UI/KscHeadStateData");
class KscSubModelBase {
  constructor() {
    this.KscGameplayType = 0;
    this.PropertyConfigs = new Map();
    this.SkillDataDt = new Map();
    this.EntityDataDt = new Map();
    this.dRu = new Map();
    this.EntityProcessMgr = new UiAsyncTaskManager_1.UiAsyncTaskManager(true);
    this.KscEntities = new Map();
    this.KscPlayerEntity = undefined;
    this.KscPlayerCreatureDataId = 0;
    this.KscPlayerEntityId = 0;
    this.KscPlayerHeadStateData = undefined;
    this.NextPlayerHpSyncTime = 0;
    this.IsHpModify = false;
  }
  GetSkillDtPath() {
    return "";
  }
  GetEntityDtPath() {
    return "";
  }
  Init() {
    return this.OnInit();
  }
  Clear() {
    this.PropertyConfigs.clear();
    this.SkillDataDt.clear();
    this.EntityDataDt.clear();
    this.dRu.clear();
    this.KscEntities.clear();
    this.SetKscPlayerEntity(undefined, 0);
    return this.OnClear();
  }
  OnInit() {
    return true;
  }
  OnClear() {
    return true;
  }
  get GameplayType() {
    return this.KscGameplayType;
  }
  SetLogicProxy(t, e) {
    this.dRu.set(t, e);
  }
  GetLogicProxy(t) {
    if (this.dRu && this.dRu.size !== 0) {
      return this.dRu.get(t);
    }
  }
  GetKscEntityHandle(t) {
    t = this.GetLogicProxy(t);
    if (t) {
      return this.KscEntities.get(t);
    }
  }
  RemoveLogicProxy(t) {
    return this.dRu.delete(t);
  }
  GetEntityCreatureId(t) {
    t = this.KscEntities.get(t);
    if (t?.Valid) {
      return t.CreatureDataId;
    } else {
      return 0;
    }
  }
  SetKscPlayerEntity(t, e) {
    this.KscPlayerEntity = t;
    this.NextPlayerHpSyncTime = 0;
    this.IsHpModify = false;
    if (t) {
      this.KscPlayerEntityId = t.EntityId_;
      this.KscPlayerCreatureDataId = e;
      this.KscPlayerHeadStateData = new KscHeadStateData_1.KscHeadStateData();
      this.KscPlayerHeadStateData.EntityId = this.KscPlayerEntityId;
      if (e = t.GetSkillComp()?.AttrSet_?.Attrs_) {
        this.KscPlayerHeadStateData.MaxHp = e.Get(2) ?? 0;
        this.KscPlayerHeadStateData.Hp = e.Get(3) ?? 0;
        this.KscPlayerHeadStateData.Shield = e.Get(4) ?? 0;
      } else {
        this.KscPlayerHeadStateData.MaxHp = 0;
        this.KscPlayerHeadStateData.Hp = 0;
        this.KscPlayerHeadStateData.Shield = 0;
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnKscPlayerHpChanged, this.KscPlayerHeadStateData);
    } else {
      this.KscPlayerEntityId = 0;
      this.KscPlayerCreatureDataId = 0;
      this.KscPlayerHeadStateData = undefined;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnKscPlayerHpChanged, undefined);
    }
  }
}
exports.KscSubModelBase = KscSubModelBase;
//# sourceMappingURL=KscSubModelBase.js.map