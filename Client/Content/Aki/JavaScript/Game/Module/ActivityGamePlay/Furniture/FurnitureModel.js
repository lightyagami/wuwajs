"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurnitureModel = undefined;
const PrefabConfigById_1 = require("../../../../Core/Define/ConfigQuery/PrefabConfigById");
const TemplateConfigByBlueprintType_1 = require("../../../../Core/Define/ConfigQuery/TemplateConfigByBlueprintType");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ItemDefines_1 = require("../../Item/Data/ItemDefines");
const FurnitureAreaData_1 = require("./Data/FurnitureAreaData");
const FurnitureDefine_1 = require("./FurnitureDefine");
const FurnitureEntityVisibleManager_1 = require("./FurnitureEntityVisibleManager");
const FurnitureSceneItemManager_1 = require("./SceneItem/FurnitureSceneItemManager");
class FurnitureModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.cVn = 0;
    this.MapId = 0;
    this.FurnitureAreaDataMap = new Map();
    this.UnlockFurnitureIdSet = new Set();
    this.CurEditorAreaDataMap = new Map();
    this.FurnitureSceneItemManager = new FurnitureSceneItemManager_1.FurnitureSceneItemManager();
    this.FurnitureEntityVisibleManager = new FurnitureEntityVisibleManager_1.FurnitureEntityVisibleManager();
    this.GetAtmosphereLevelDataDelegate = undefined;
    this.SaveLocalDataDelegate = undefined;
    this.GetLocalDataDelegate = undefined;
    this.GetFurnitureFunctionIsUnlockedDelegate = undefined;
    this.GetShopFunctionUnlockedDelegate = undefined;
    this.GetHandBookFunctionUnlockedDelegate = undefined;
    this.GetPresetFunctionUnlockedDelegate = undefined;
  }
  OnInit() {
    return true;
  }
  UpdateFurnitureInfo(t, e, r, n) {
    this.cVn = t;
    this.MapId = e;
    this.UnlockFurnitureIdSet.clear();
    this.ClearCurrentAreaData();
    this.AddUnlockAreaData(r);
    for (const i of n) {
      this.UnlockFurnitureIdSet.add(i);
    }
  }
  ClearCurrentAreaData() {
    this.FurnitureAreaDataMap.clear();
  }
  AddUnlockAreaData(t) {
    var r = this.MapId;
    var n = this.FurnitureAreaDataMap;
    for (const f of t) {
      var i = f.p6n;
      let e = n.get(i);
      if (!e) {
        e = new FurnitureAreaData_1.FurnitureAreaData();
        n.set(i, e);
      }
      e.SetAreaId(i);
      e.SetMapId(r);
      e.SetAtmosphere(f.ybf);
      var o = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureAreaConfig(i);
      if (o) {
        e.SetMaxAtmosphere(o.MaxAtmosphere);
        for (const h of o.SlotEntityIds) {
          e.CreateSceneSlotData(h);
        }
      }
      for (const l of f.Mbf) {
        var u = l.Ebf;
        var a = l.Ibf;
        var s = l.Tbf;
        e.SetSlotPlacedData(u, -1, a);
        for (let t = 0; t < s.length; t++) {
          e.SetSlotPlacedData(u, t, s[t]);
        }
      }
      this.a9g(i);
      this.FurnitureAreaDataMap.set(i, e);
    }
  }
  a9g(t) {
    for (const e of ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureConfigListBySourceTypeAndGetWayId(0, t)) {
      this.UnlockFurnitureIdSet.add(e.Id);
    }
  }
  GetAreaData(t) {
    return this.FurnitureAreaDataMap.get(t);
  }
  GetFurnitureSceneItemType(t) {
    t = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureConfig(t);
    if (!t || t.EntityId <= 0) {
      return 0;
    } else if (t.IsEntityGroup) {
      return 2;
    } else {
      return 1;
    }
  }
  GetFurnitureEntityTemplateData(t) {
    t = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureConfig(t);
    if (!(t.EntityId <= 0)) {
      return ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(t.EntityId);
    }
  }
  GetSubSlotInfos(t) {
    t = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureConfig(t);
    if (!(t.EntityId <= 0)) {
      if (t.IsEntityGroup) {
        return this.GetEntityGroupSubSlotInfos(t.EntityId);
      } else {
        return this.GetSingleEntitySubSlotInfos(t.EntityId);
      }
    }
  }
  GetEntityGroupSubSlotInfos(t) {
    t = this.GetFurnitureEntityGroupData(t);
    if (t) {
      var e = [];
      for (const n of t) {
        var r = (0, IComponent_1.getComponent)(n.ComponentsData, "FurnitureSlotComponent");
        if (r) {
          e.push(...r.Slots);
        }
      }
      return e;
    }
  }
  GetSingleEntitySubSlotInfos(t) {
    t = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(t);
    if (t) {
      t = t.ComponentsData;
      t = (0, IComponent_1.getComponent)(t, "FurnitureSlotComponent");
      if (t) {
        return t.Slots;
      }
    }
  }
  GetFurnitureEntityGroupData(t) {
    t = PrefabConfigById_1.configPrefabConfigById.GetConfig(t);
    if (t) {
      var e = [];
      for (const i of JSON.parse(t.Entities)) {
        var r = i.EntityData;
        var n = TemplateConfigByBlueprintType_1.configTemplateConfigByBlueprintType.GetConfig(r.BlueprintType);
        var n = JSON.parse(n.ComponentsData);
        e.push({
          EntityData: r,
          ComponentsData: n
        });
      }
      return e;
    }
  }
  GetFurnitureSingleEntityPrefabPath(t) {
    t = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureConfig(t);
    if (!t.IsEntityGroup && !(t.EntityId <= 0)) {
      var t = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(t.EntityId);
      if (t) {
        t = t.ComponentsData;
        if ((t = (0, IComponent_1.getComponent)(t, "ModelComponent")) && t.ModelType.Type === "LevelPrefab") {
          return t.ModelType.PrefabPath;
        } else {
          return undefined;
        }
      }
    }
  }
  GetSceneSlotEntityData(t, e) {
    e = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(e, t);
    if (e) {
      return e;
    }
  }
  GetSceneSlotEntitySlotComponentData(t, e) {
    t = this.GetSceneSlotEntityData(t, e);
    if (t) {
      e = t.ComponentsData;
      t = (0, IComponent_1.getComponent)(e, "FurnitureSlotComponent");
      if (t) {
        return t;
      }
    }
  }
  GetSceneSlotEntitySlotInfo(t, e) {
    t = this.GetSceneSlotEntitySlotComponentData(t, e);
    if (t && t.Slots.length !== 0) {
      return t.Slots[0];
    }
  }
  GetFurnitureSlotRelativeTransform(t, e) {
    t = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureConfig(t);
    if (t.IsEntityGroup) {
      return this.GetEntityGroupFurnitureSlotRelativeTransform(t.EntityId, e);
    } else {
      return this.GetSingleEntityFurnitureSlotRelativeTransform(t.EntityId, e);
    }
  }
  GetSingleEntityFurnitureSlotRelativeTransform(t, e) {
    t = this.GetSingleEntitySubSlotInfos(t);
    if (t) {
      t = t[e];
      if (t) {
        e = t.SlotShape;
        return PublicUtil_1.PublicUtil.CreateTransformFromConfig(e.Center, e.Rotator, Vector_1.Vector.OneVectorProxy);
      }
    }
  }
  GetEntityGroupFurnitureSlotRelativeTransform(t, e) {
    t = this.GetEntityGroupFurnitureSlotTransforms(t);
    if (t) {
      return t[e];
    }
  }
  GetEntityGroupFurnitureSlotTransforms(t) {
    t = this.GetFurnitureEntityGroupData(t);
    if (t) {
      var e = [];
      for (const a of t) {
        var r = a.EntityData;
        var n = (0, IComponent_1.getComponent)(a.ComponentsData, "FurnitureSlotComponent");
        if (n) {
          for (const s of n.Slots) {
            var i = s.SlotShape;
            var i = PublicUtil_1.PublicUtil.CreateTransformFromConfig(i.Center, i.Rotator, Vector_1.Vector.OneVectorProxy);
            var o = Transform_1.Transform.Create();
            var u = this.CoverTransform(r.Transform);
            i.ComposeTransforms(u, o);
            e.push(o);
          }
        }
      }
      return e;
    }
  }
  GetSceneSlotEntityTransform(t, e) {
    t = ModelManager_1.ModelManager.FurnitureModel.GetSceneSlotEntityData(t, e);
    if (t && t.Transform) {
      return this.CoverTransform(t.Transform);
    }
  }
  CoverTransform(t) {
    var e = t.Pos;
    var e = Vector_1.Vector.Create(e.X ?? 0, e.Y ?? 0, e.Z ?? 0);
    var r = t.Rot;
    var r = Rotator_1.Rotator.Create(r?.Y ?? 0, r?.Z ?? 0, r?.X ?? 0);
    var t = t.Scale;
    var t = Vector_1.Vector.Create(t?.X ?? 1, t?.Y ?? 1, t?.Z ?? 1);
    return Transform_1.Transform.Create(r.Quaternion(), e, t);
  }
  GetSceneSlotEntityShapeTransform(t, e) {
    t = ModelManager_1.ModelManager.FurnitureModel.GetSceneSlotEntitySlotInfo(t, e);
    if (t) {
      e = t.SlotShape;
      return PublicUtil_1.PublicUtil.CreateTransformFromConfig(e.Center, e.Rotator, Vector_1.Vector.OneVectorProxy);
    }
  }
  GetRootFurnitureTransform(t, e) {
    var r = this.GetSceneSlotEntityTransform(t, e);
    if (r) {
      t = this.GetSceneSlotEntityShapeTransform(t, e);
      if (t) {
        e = Transform_1.Transform.Create();
        r.ComposeTransforms(t, e);
        return e;
      }
    }
  }
  GetSubFurnitureTransform(t, e, r, n) {
    t = this.GetRootFurnitureTransform(t, e);
    if (t) {
      e = this.GetFurnitureSlotRelativeTransform(r, n);
      if (e) {
        r = Transform_1.Transform.Create();
        e.ComposeTransforms(t, r);
        return r;
      }
    }
  }
  IsSingleEntityFurnitureCanInteract(t) {
    var t = t.EntityId;
    return !(t <= 0) && !!(t = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(t)) && !(t = t.ComponentsData, !(0, IComponent_1.getComponent)(t, "InteractComponent"));
  }
  GetFurnitureFunctionIsOpen() {
    return !(this.cVn <= 0) && !!this.GetFurnitureFunctionIsUnlockedDelegate && this.GetFurnitureFunctionIsUnlockedDelegate();
  }
  GetIsFurnitureUnlockById(t) {
    return this.UnlockFurnitureIdSet.has(t);
  }
  GetFurnitureUseCount(t, e) {
    let r = 0;
    for (const n of this.FurnitureAreaDataMap.values()) {
      if (!e || !!e(n)) {
        r += n.GetFurnitureUseCount(t);
      }
    }
    return r;
  }
  GetAreaPlacedSceneSlotCount(t) {
    t = this.GetAreaData(t);
    if (t) {
      return t.GetPlacedSceneSlotCount();
    } else {
      return 0;
    }
  }
  GetAreaPlacedSlotCount(t) {
    t = this.GetAreaData(t);
    if (t) {
      return t.GetPlacedSlotCount();
    } else {
      return 0;
    }
  }
  GetAreaAtmosphere(t) {
    t = this.GetAreaData(t);
    if (t) {
      return t.GetAtmosphere();
    } else {
      return 0;
    }
  }
  GetAreaIsUnlock(t) {
    return this.FurnitureAreaDataMap.has(t);
  }
  GetAtmosphereLevelData() {
    if (this.GetAtmosphereLevelDataDelegate) {
      return this.GetAtmosphereLevelDataDelegate();
    }
  }
  GetFurnitureConfigListBySlotInfo(t, e, r) {
    var n = t.GetSlotData(e, r);
    if (n) {
      t = n.GetSlotTagId();
      e = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureConfigListByTagId(t);
      if (e) {
        var i = [];
        for (const o of e) {
          if (n.CheckCanPlaceByConfig(o)) {
            i.push(o);
          }
        }
        return i;
      }
    }
  }
  GetSlotEntityIdListByFurnitureConfigId(t) {
    var e = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureConfig(t);
    var r = [];
    for (const n of this.FurnitureAreaDataMap.values()) {
      for (const i of n.GetSceneSlotDataMap().values()) {
        if (i.CheckCanPlaceByConfig(e)) {
          r.push(i.GetSlotEntityId());
        }
      }
    }
    return r;
  }
  GetFurnitureShopFunctionIsUnlocked() {
    return !!this.GetShopFunctionUnlockedDelegate && this.GetShopFunctionUnlockedDelegate();
  }
  GetFurnitureHandBookFunctionIsUnlocked() {
    return !!this.GetHandBookFunctionUnlockedDelegate && this.GetHandBookFunctionUnlockedDelegate();
  }
  GetFurniturePresetFunctionIsUnlocked() {
    return !!this.GetPresetFunctionUnlockedDelegate && this.GetPresetFunctionUnlockedDelegate();
  }
  FindFurniturePlacedSlot(t, e) {
    let r = undefined;
    let n = undefined;
    for (const o of e.values()) {
      var i = this.FindFurniturePlacedSlotInArea(t, o);
      if (i) {
        r = o;
        n = i;
        break;
      }
    }
    if (r && n) {
      return {
        AreaData: r,
        SlotContext: n
      };
    }
  }
  FindFurniturePlacedSlotInArea(t, e) {
    var r;
    var n;
    let i = 0;
    let o = 0;
    for ([r, n] of e.GetSceneSlotDataMap()) {
      if (n?.GetPlacedFurnitureConfigId() === t) {
        i = r;
        o = FurnitureDefine_1.FURNITURE_SCENE_SLOT_SUB_SLOT_INDEX;
        break;
      }
      var u = this.FindFurnitureInSubSlots(n, t);
      if (u !== -1) {
        i = r;
        o = u;
        break;
      }
    }
    if (i !== 0 && o !== 0) {
      return {
        SlotEntityId: i,
        SubSlotIndex: o
      };
    }
  }
  FindFurnitureInSubSlots(t, e) {
    for (const r of t.GetSubSlotDataList()) {
      if (r?.GetPlacedFurnitureConfigId() === e) {
        return r.GetSlotIndex();
      }
    }
    return -1;
  }
  GetFurnitureConfigByGoodsData(t) {
    t = t.GetItemData().ItemId;
    let e = 0;
    if (ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(t) === 24) {
      e = t;
    } else {
      t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t).Parameters.get(ItemDefines_1.EItemFunctionType.AutoOpenGift);
      if (t) {
        for (const r of ConfigManager_1.ConfigManager.GiftPackageConfig.GetGiftPackageConfig(t).Content.keys()) {
          e = r;
          break;
        }
      }
    }
    return ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureConfig(e);
  }
  CheckFurnitureAreaRedDot(t) {
    return !!this.GetFurnitureFunctionIsOpen() && !!this.GetAreaIsUnlock(t) && !!this.GetLocalDataDelegate && this.GetLocalDataDelegate(this.cVn, 0, 0, t, FurnitureDefine_1.FURNITURE_AREA_RED_DOT_LOCAL_KEY3) === 0;
  }
  CheckFurnitureHandBookItemRedDot(t) {
    return !!this.GetFurnitureFunctionIsOpen() && !!this.GetIsFurnitureUnlockById(t) && !!this.GetLocalDataDelegate && this.GetLocalDataDelegate(this.cVn, 0, 0, t, FurnitureDefine_1.FURNITURE_HANDBOOK_ITEM_RED_DOT_LOCAL_KEY3) === 0;
  }
  CheckFurnitureShopItemRedDot(t) {
    return !!this.GetFurnitureFunctionIsOpen() && !!(t = ModelManager_1.ModelManager.PayShopModel.GetPayShopGoods(t)) && this.CheckFurnitureShopItemRedDotByData(t);
  }
  CheckFurnitureShopItemRedDotByData(t) {
    return !!this.GetFurnitureFunctionIsOpen() && !t.IsLocked() && !t.IsSoldOut() && !!t.GetGoodsData().GetCanBuyValue() && !!this.GetLocalDataDelegate && this.GetLocalDataDelegate(this.cVn, 0, 0, t.GetGoodsId(), FurnitureDefine_1.FURNITURE_SHOP_ITEM_RED_DOT_LOCAL_KEY3) === 0;
  }
  CheckFurnitureShopRedDot() {
    if (this.GetFurnitureFunctionIsOpen() && this.GetFurnitureShopFunctionIsUnlocked()) {
      var t = ConfigManager_1.ConfigManager.FurnitureConfig.GetGameplayConfigById(this.cVn);
      if (t) {
        t = t.ShopId;
        t = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(t, undefined, false);
        if (t) {
          for (const e of t) {
            if (this.CheckFurnitureShopItemRedDotByData(e)) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }
  CheckFurnitureDesignItemRedDot(t) {
    return !!this.GetFurnitureFunctionIsOpen() && !!this.GetFurniturePresetFunctionIsUnlocked() && !!(t = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureConfig(t)) && this.CheckFurnitureDesignItemRedDotByConfig(t);
  }
  CheckFurnitureDesignItemRedDotByConfig(t) {
    return !!this.GetFurnitureFunctionIsOpen() && !!this.GetIsFurnitureUnlockById(t.Id) && !!this.GetLocalDataDelegate && this.GetLocalDataDelegate(this.cVn, 0, 0, t.Id, FurnitureDefine_1.FURNITURE_DESIGN_ITEM_RED_DOT_LOCAL_KEY3) === 0;
  }
  CheckFurnitureFloorRedDot(t) {
    if (this.GetFurnitureFunctionIsOpen()) {
      t = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureAreaConfigListByFloorId(t);
      if (t) {
        for (const e of t) {
          if (this.CheckFurnitureAreaRedDot(e.Id)) {
            return true;
          }
        }
      }
    }
    return false;
  }
  CheckFurnitureSlotRedDot(t, e, r) {
    if (this.GetFurnitureFunctionIsOpen()) {
      t = this.GetFurnitureConfigListBySlotInfo(t, e, r);
      if (t) {
        for (const n of t) {
          if (this.CheckFurnitureDesignItemRedDotByConfig(n)) {
            return true;
          }
        }
      }
    }
    return false;
  }
  CheckFurnitureHandBookRedDot() {
    if (this.GetFurnitureFunctionIsOpen() && this.GetFurnitureHandBookFunctionIsUnlocked()) {
      for (const t of this.UnlockFurnitureIdSet) {
        if (this.CheckFurnitureHandBookItemRedDot(t)) {
          return true;
        }
      }
    }
    return false;
  }
  CheckFurnitureEntranceRedDot() {
    if (!this.GetFurnitureFunctionIsOpen()) {
      return false;
    }
    for (const t of this.FurnitureAreaDataMap.keys()) {
      if (this.CheckFurnitureAreaRedDot(t)) {
        return true;
      }
    }
    return !!this.CheckFurnitureShopRedDot() || !!this.CheckFurnitureHandBookRedDot();
  }
}
exports.FurnitureModel = FurnitureModel;
//# sourceMappingURL=FurnitureModel.js.map