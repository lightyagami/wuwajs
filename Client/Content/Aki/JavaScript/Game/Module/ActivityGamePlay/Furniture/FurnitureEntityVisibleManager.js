"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurnitureEntityVisibleManager = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
class FurnitureEntityVisibleManager {
  constructor() {
    this.nSg = [];
    this.z6g = undefined;
    this.Njg = false;
  }
  LockFurnitureEntity() {
    this.Njg = true;
  }
  UnlockFurnitureEntity() {
    this.Njg = false;
  }
  DisabledAllEntities() {
    if (!(this.nSg.length > 0)) {
      var r = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
      if (r) {
        var e = ModelManager_1.ModelManager.FurnitureModel.cVn;
        var e = ConfigManager_1.ConfigManager.FurnitureConfig.GetGameplayConfigById(e);
        var t = e.EntityWhiteList;
        var i = e.ShopNpcEntityId;
        for (const a of r) {
          var o;
          var n = a.Entity;
          if (n && n.Active && (o = n.GetComponent(0)) && this.L6g(o) && !t.includes(a.PbDataId) && a.PbDataId !== i) {
            ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(n, false, "进入家具装修状态");
            this.nSg.push(a);
          }
        }
      }
    }
  }
  EnabledAllEntities() {
    this.EnableAllFurnitureEntity();
    if (this.nSg.length !== 0) {
      for (const e of this.nSg) {
        var r = e.Entity;
        if (r) {
          ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(r, true, "离开家具装修状态");
        }
      }
      this.nSg.length = 0;
    }
  }
  EnableAllFurnitureEntity() {
    if (!this.Njg) {
      var r = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
      if (r) {
        for (const o of r) {
          var e;
          var t;
          var i = o.Entity;
          if (!!i && !i.Active) {
            if (t = i.GetComponent(0)) {
              e = t.FurnitureSlotId;
              t = t.FurnitureId;
              if (!(e <= 0) && !(t <= 0)) {
                ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(i, true, "进入家具装修状态");
              }
            }
          }
        }
      }
    }
  }
  EnableSpareShopNpcEntity() {
    var r = ModelManager_1.ModelManager.FurnitureModel.cVn;
    var r = ConfigManager_1.ConfigManager.FurnitureConfig.GetGameplayConfigById(r).SpareShopNpcEntityId;
    this.z6g = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r);
    var r = this.z6g?.Entity;
    if (r) {
      ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(r, true, "进入家具装修状态");
    }
  }
  DisableSpareShopNpcEntity() {
    var r = this.z6g?.Entity;
    if (r) {
      ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(r, false, "退出家具装修状态");
      this.z6g = undefined;
    }
  }
  L6g(r) {
    return r.IsRole() || r.IsPlayer() || r.IsNpc() || r.IsSceneItem() || r.IsAnimal();
  }
}
exports.FurnitureEntityVisibleManager = FurnitureEntityVisibleManager;
//# sourceMappingURL=FurnitureEntityVisibleManager.js.map