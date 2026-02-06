"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkGamePlayComponent = undefined;
const DynamicMapMark_1 = require("../../../../../Core/Define/Config/DynamicMapMark");
const MapMark_1 = require("../../../../../Core/Define/Config/MapMark");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const MapComponent_1 = require("../../Base/MapComponent");
class MarkGamePlayComponent extends MapComponent_1.MapComponent {
  constructor() {
    super(...arguments);
    this.MarkId = 0;
    this.MarkType = 0;
    this.MapId = 0;
    this.Gravity = 0;
  }
  get ComponentType() {
    return 10;
  }
  set GamePlayState(e) {
    this.PropertyMap.set(0, e);
  }
  get GamePlayState() {
    return this.PropertyMap.tryGet(0, 0);
  }
  get IsFinish() {
    if (this.GameplayCompleteRewardIds.length === 0 && this.GameplayRewardIdList.length !== 0) {
      return this.IsAllRewardReceived;
    } else {
      return this.GamePlayState === 2;
    }
  }
  get IsHide() {
    return this.GamePlayState === 3;
  }
  get IsDisable() {
    return this.MarkId === 0 || ModelManager_1.ModelManager.MapModel.GetMarkExtraShowState(this.MarkId).ShowFlag === Protocol_1.Aki.Protocol.U5s.Proto_ShowDisable || this.IsHide;
  }
  get IsTeleportLocked() {
    return this.MarkId === 0 || ModelManager_1.ModelManager.MapModel.IsTeleportLocked(this.MarkId);
  }
  get InGravityLayer() {
    return this.MarkId !== 0 && (this.Gravity === 0 || this.Gravity === ModelManager_1.ModelManager.WorldMapModel.WorldMapGravity);
  }
  get CanShowGravityChildIcon() {
    return this.MarkId !== 0 && this.Gravity !== 0 && !this.InGravityLayer;
  }
  UQu() {
    var e = this.ParentEntity.GetComponent(15)?.Config;
    if (e && (e instanceof MapMark_1.MapMark || e instanceof DynamicMapMark_1.DynamicMapMark) && e.RelativeId !== 0) {
      return e.RelativeId;
    }
  }
  Dlg() {
    var e = this.ParentEntity.GetComponent(15)?.Config;
    if (e && (e instanceof MapMark_1.MapMark || e instanceof DynamicMapMark_1.DynamicMapMark)) {
      return e.RelativeDungeonId;
    }
  }
  Ngg() {
    var e = this.ParentEntity.GetComponent(15)?.Config;
    if (e && (e instanceof MapMark_1.MapMark || e instanceof DynamicMapMark_1.DynamicMapMark)) {
      return e.RelativeType;
    }
  }
  get GameplayRewardIdList() {
    var e;
    var t;
    if (this.Ngg() !== 1) {
      return [];
    }
    const r = this.UQu();
    if (r !== undefined && (t = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(r))) {
      e = t.RewardConfig?.TreasureBoxIds?.flatMap(e => this.GetTreasureBoxRewardId(e) ?? []) ?? [];
      t = t.RewardConfig?.RewardNodeIds?.flatMap(e => this.GetNodeRewardId(r, e) ?? []) ?? [];
      return e.concat(t, this.GameplayCompleteRewardIds);
    } else {
      return [];
    }
  }
  GetNodeRewardId(e, t) {
    e = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayNodeConfig(e, t);
    if (e?.Type === "ChildQuest") {
      return e.RewardId;
    }
  }
  GetTreasureBoxRewardId(e) {
    e = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(e, this.MapId);
    if (e) {
      return (0, IComponent_1.getComponent)(e.ComponentsData, "RewardComponent")?.RewardId;
    }
  }
  get GameplayCompleteRewardIds() {
    var e;
    if (this.Ngg() === 1 && (e = this.UQu()) !== undefined && e !== 0 && (e = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(e))) {
      return e.RewardConfig?.CompleteRewardIds ?? [];
    } else {
      return [];
    }
  }
  get GameplayDropPreviewItemList() {
    return ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemListByIdList(this.GameplayRewardIdList);
  }
  get ReceivedGameplayRewardIdList() {
    var e;
    var t;
    var r;
    var a;
    if (this.Ngg() !== 1) {
      return [];
    }
    const i = this.UQu();
    if (i === undefined || !(a = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(i)) || (r = this.Dlg()) === undefined) {
      return [];
    } else {
      e = (t = ModelManager_1.ModelManager.LevelPlayReportModel).GetLevelPlayRewardTreasureBoxIds(r, a.Id) ?? [];
      t = t.GetLevelPlayRewardNodeIds(r, a.Id) ?? [];
      r = e.flatMap(e => this.GetTreasureBoxRewardId(e) ?? []);
      a = t.flatMap(e => this.GetNodeRewardId(i, e) ?? []);
      return r.concat(a);
    }
  }
  get RewardNodeIds() {
    var e;
    if (this.Ngg() === 1 && (e = this.UQu()) !== undefined && (e = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(e))) {
      return e.RewardConfig?.RewardNodeIds ?? [];
    } else {
      return [];
    }
  }
  get RewardTreasureBoxIds() {
    var e = this.UQu();
    if (e !== undefined && this.Ngg() === 1 && (e = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(e))) {
      return e.RewardConfig?.TreasureBoxIds ?? [];
    } else {
      return [];
    }
  }
  get ReceivedGameplayDropPreviewItemList() {
    return ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemListByIdList(this.ReceivedGameplayRewardIdList);
  }
  get IsAllRewardReceived() {
    var e;
    var t;
    var r;
    var a;
    var i;
    var n = this.UQu();
    return n !== undefined && (e = this.Dlg()) !== undefined && !!(n = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(n)) && (t = this.RewardNodeIds, r = this.RewardTreasureBoxIds, a = (i = ModelManager_1.ModelManager.LevelPlayReportModel).GetLevelPlayRewardNodeIds(e, n.Id), i = i.GetLevelPlayRewardTreasureBoxIds(e, n.Id), a.length >= t.length) && i.length >= r.length;
  }
}
exports.MarkGamePlayComponent = MarkGamePlayComponent;
//# sourceMappingURL=MarkGamePlayComponent.js.map