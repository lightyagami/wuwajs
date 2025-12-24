"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapLoadDirectlyConfigMarkSet = exports.addMarkFilterInTeamModeSet = exports.serverMarkIgnoreReadConfigSet = exports.Circle = exports.FishingPointMarkCreateInfo = exports.FishingShipMarkCreateInfo = exports.FISHING_SHIP_MARK_ID = exports.PlayerMarkCreateInfo = exports.QuestMarkCreateInfo = exports.DynamicMarkCreateInfo = exports.ConfigMarkCreateInfo = exports.MarkCreateInfo = exports.canDisableGameplayFinishMarkType = exports.hasSingleComponentMarkType = exports.HONAMI_MAP_ID = exports.WORLD_MAP_MAX_SCALE = exports.DEFAULT_MAP_BORDER_ID = exports.DETAIL_TILE_SPACE = exports.HHA_BIG_WORLD_MAP_ID = exports.BIG_WORLD_MAP_ID = exports.MARK_WORLD_TO_HASH_SCALE = exports.MARK_HASH_XY_PANDING = exports.MARK_SCOPE = exports.UNIT = exports.MINI_MAP_UPDATE_GAP = exports.MINI_MAP_RADIUS = exports.DETAIL_TILE_REALSIZE = exports.worldToScreenScale = exports.world2UiUnit = exports.FLOAT_0_01 = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../Core/Utils/Math/Vector2D");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
exports.FLOAT_0_01 = 0.01;
exports.world2UiUnit = Vector_1.Vector.Create(exports.FLOAT_0_01, -exports.FLOAT_0_01, exports.FLOAT_0_01);
exports.worldToScreenScale = Vector2D_1.Vector2D.Create(exports.FLOAT_0_01, -exports.FLOAT_0_01);
exports.DETAIL_TILE_REALSIZE = 850;
exports.MINI_MAP_RADIUS = 200;
exports.MINI_MAP_UPDATE_GAP = 20;
exports.UNIT = 100;
exports.MARK_SCOPE = 50;
exports.MARK_HASH_XY_PANDING = 100000;
exports.MARK_WORLD_TO_HASH_SCALE = 0.01;
exports.BIG_WORLD_MAP_ID = 8;
exports.HHA_BIG_WORLD_MAP_ID = 900;
exports.DETAIL_TILE_SPACE = Math.round(exports.DETAIL_TILE_REALSIZE);
exports.DEFAULT_MAP_BORDER_ID = 1;
exports.WORLD_MAP_MAX_SCALE = 2.5;
exports.HONAMI_MAP_ID = 907;
exports.hasSingleComponentMarkType = new Set([17, 12, 22]);
exports.canDisableGameplayFinishMarkType = new Set([29]);
class MarkCreateInfo {
  constructor(t) {
    this.CreateType = t;
  }
}
class ConfigMarkCreateInfo extends (exports.MarkCreateInfo = MarkCreateInfo) {
  constructor(t, e) {
    super(0);
    this.MarkConfig = t;
    if (void (this.MarkId = 0) === e) {
      this.MarkId = t.MarkId;
    }
  }
}
exports.ConfigMarkCreateInfo = ConfigMarkCreateInfo;
class DynamicMarkCreateInfo extends MarkCreateInfo {
  constructor(t) {
    super(1);
    this.CreateParams = undefined;
    this.CreateParams = t;
    if (this.CreateParams.MapAndDungeonInfo === undefined) {
      this.CreateParams.MapAndDungeonInfo = {
        MapConfigId: exports.BIG_WORLD_MAP_ID
      };
    }
    let e = this.CreateParams.MapAndDungeonInfo?.MapConfigId;
    if (e === 0) {
      e = exports.BIG_WORLD_MAP_ID;
    }
    this.CreateParams.MapAndDungeonInfo.MapConfigId = e ?? ConfigManager_1.ConfigManager.MapConfig.SearchMapConfigByType(this.CreateParams.MarkConfigId, t.MarkType)?.MapId;
    var r = this.CreateParams.MapAndDungeonInfo.DungeonId;
    this.CreateParams.MapAndDungeonInfo.DungeonId = r ?? ConfigManager_1.ConfigManager.MapConfig.SearchMarkInstanceDungeonId(this.CreateParams.MarkConfigId, t.MarkType);
  }
  get TrackTarget() {
    return this.CreateParams.TrackTarget;
  }
  set TrackTarget(t) {
    this.CreateParams.TrackTarget = t;
  }
  get MarkConfigId() {
    return this.CreateParams.MarkConfigId;
  }
  set MarkConfigId(t) {
    this.CreateParams.MarkConfigId = t;
  }
  get MarkType() {
    return this.CreateParams.MarkType;
  }
  get MarkId() {
    return this.CreateParams.MarkId;
  }
  set MarkId(t) {
    this.CreateParams.MarkId = t;
  }
  get TrackSource() {
    return this.CreateParams.TrackSource;
  }
  get DestroyOnUnTrack() {
    return this.CreateParams.DestroyOnUnTrack ?? false;
  }
  get TeleportId() {
    return this.CreateParams.TeleportId;
  }
  set TeleportId(t) {
    this.CreateParams.TeleportId = t;
  }
  get EntityConfigId() {
    return this.CreateParams.EntityConfigId;
  }
  get AreaId() {
    return this.CreateParams.AreaId;
  }
  set AreaId(t) {
    this.CreateParams.AreaId = t;
  }
  get ServerMarkState() {
    return this.CreateParams.ServerMarkState ?? Protocol_1.Aki.Protocol.Tom.Proto_MarkNormal;
  }
  set ServerMarkState(t) {
    this.CreateParams.ServerMarkState = t;
  }
  get MapId() {
    return this.CreateParams.MapAndDungeonInfo.MapConfigId;
  }
  get InstanceDungeonId() {
    return this.CreateParams.MapAndDungeonInfo.DungeonId;
  }
  get MapGravity() {
    if (this.CreateParams.Gravity !== undefined) {
      return this.CreateParams.Gravity;
    }
    if (this.EntityConfigId !== undefined) {
      var t = ConfigManager_1.ConfigManager.WorldMapConfig.GetEntityGravityDirection(this.MapId, this.EntityConfigId);
      if (t !== 0) {
        return t;
      }
    }
    if (this.MarkType !== 9 && this.MarkType !== 15 && this.MarkType !== 17 && ModelManager_1.ModelManager.WorldMapModel.IsGravityMap(this.MapId)) {
      return 1;
    } else {
      return 0;
    }
  }
}
class QuestMarkCreateInfo extends (exports.DynamicMarkCreateInfo = DynamicMarkCreateInfo) {
  get TreeId() {
    return this.CreateParams.TreeId;
  }
  get NodeId() {
    return this.CreateParams.NodeId;
  }
  constructor(t) {
    if (t.MapAndDungeonInfo !== undefined) {
      t.MapAndDungeonInfo.MapConfigId = t.MapAndDungeonInfo.DungeonId;
    }
    super(t);
  }
}
exports.QuestMarkCreateInfo = QuestMarkCreateInfo;
class PlayerMarkCreateInfo extends MarkCreateInfo {
  constructor(t, e, r, s, o = 1) {
    super(2);
    this.PlayerId = t;
    this.PlayerIndex = e;
    this.Position = r;
    this.MapId = s;
    this.Gravity = o;
  }
}
exports.PlayerMarkCreateInfo = PlayerMarkCreateInfo;
exports.FISHING_SHIP_MARK_ID = 8;
class FishingShipMarkCreateInfo extends DynamicMarkCreateInfo {
  constructor(t) {
    super(t);
  }
}
exports.FishingShipMarkCreateInfo = FishingShipMarkCreateInfo;
class FishingPointMarkCreateInfo extends DynamicMarkCreateInfo {
  get FishPointDetectSourceType() {
    return this.CreateParams.FishPointDetectSourceType;
  }
  constructor(t) {
    super(t);
  }
}
exports.FishingPointMarkCreateInfo = FishingPointMarkCreateInfo;
class Circle {
  constructor(t = 0, e = 0, r = 0) {
    this.X = t;
    this.Y = e;
    this.R = r;
  }
}
exports.Circle = Circle;
exports.serverMarkIgnoreReadConfigSet = new Set([12, 9, 22, 23]);
exports.addMarkFilterInTeamModeSet = new Set([Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_TreasureBoxPoint, Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_SoundBox, Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_HookLockSoundBox, Protocol_1.Aki.Protocol.w5s.ENUMS.Proto_CalmingWindBell]);
exports.mapLoadDirectlyConfigMarkSet = new Set([46]); //# sourceMappingURL=MapDefine.js.map