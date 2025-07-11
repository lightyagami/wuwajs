"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssConfig = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const AbyssActivityByActivityId_1 = require("../../../../Core/Define/ConfigQuery/AbyssActivityByActivityId");
const AbyssCastDescById_1 = require("../../../../Core/Define/ConfigQuery/AbyssCastDescById");
const AbyssInstByActivityId_1 = require("../../../../Core/Define/ConfigQuery/AbyssInstByActivityId");
const AbyssInstById_1 = require("../../../../Core/Define/ConfigQuery/AbyssInstById");
const AbyssInstByInstId_1 = require("../../../../Core/Define/ConfigQuery/AbyssInstByInstId");
const AbyssItemById_1 = require("../../../../Core/Define/ConfigQuery/AbyssItemById");
const AbyssLittleRoleAll_1 = require("../../../../Core/Define/ConfigQuery/AbyssLittleRoleAll");
const AbyssLittleRoleById_1 = require("../../../../Core/Define/ConfigQuery/AbyssLittleRoleById");
const AbyssPluginPropDescById_1 = require("../../../../Core/Define/ConfigQuery/AbyssPluginPropDescById");
const AbyssQualityById_1 = require("../../../../Core/Define/ConfigQuery/AbyssQualityById");
const AbyssRewardAll_1 = require("../../../../Core/Define/ConfigQuery/AbyssRewardAll");
const AbyssRewardById_1 = require("../../../../Core/Define/ConfigQuery/AbyssRewardById");
const AbyssRewardTabById_1 = require("../../../../Core/Define/ConfigQuery/AbyssRewardTabById");
const AbyssRewardTypeById_1 = require("../../../../Core/Define/ConfigQuery/AbyssRewardTypeById");
const AbyssRoleLevelByGroupId_1 = require("../../../../Core/Define/ConfigQuery/AbyssRoleLevelByGroupId");
const AbyssRoleLevelByLevelAndGroupId_1 = require("../../../../Core/Define/ConfigQuery/AbyssRoleLevelByLevelAndGroupId");
const AbyssRoleSlotById_1 = require("../../../../Core/Define/ConfigQuery/AbyssRoleSlotById");
const AbyssRoomById_1 = require("../../../../Core/Define/ConfigQuery/AbyssRoomById");
const AbyssRouteByRouterAndFloor_1 = require("../../../../Core/Define/ConfigQuery/AbyssRouteByRouterAndFloor");
const AbyssSettleById_1 = require("../../../../Core/Define/ConfigQuery/AbyssSettleById");
const AbyssSynthesisAll_1 = require("../../../../Core/Define/ConfigQuery/AbyssSynthesisAll");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
class DangoAbyssConfig extends ConfigBase_1.ConfigBase {
  GetDangoAbyssInstById(e) {
    return AbyssInstById_1.configAbyssInstById.GetConfig(e);
  }
  GetDangoAbyssInstByInstId(e) {
    return AbyssInstByInstId_1.configAbyssInstByInstId.GetConfig(e);
  }
  GetDangoAbyssInstListByActivityId(e) {
    return AbyssInstByActivityId_1.configAbyssInstByActivityId.GetConfigList(e);
  }
  GetAbyssRewardById(e) {
    return AbyssRewardById_1.configAbyssRewardById.GetConfig(e);
  }
  GetAllAbyssReward() {
    return AbyssRewardAll_1.configAbyssRewardAll.GetConfigList();
  }
  GetAbyssRewardTypeById(e) {
    return AbyssRewardTypeById_1.configAbyssRewardTypeById.GetConfig(e);
  }
  GetDangoAbyssRoomById(e) {
    return AbyssRoomById_1.configAbyssRoomById.GetConfig(e);
  }
  GetDangoRoleById(e) {
    return AbyssLittleRoleById_1.configAbyssLittleRoleById.GetConfig(e);
  }
  GetAllDangoRole() {
    return AbyssLittleRoleAll_1.configAbyssLittleRoleAll.GetConfigList();
  }
  GetDangoLevelConfigByLevelAndGroupId(e, r) {
    return AbyssRoleLevelByLevelAndGroupId_1.configAbyssRoleLevelByLevelAndGroupId.GetConfig(e, r);
  }
  GetDangoLevelConfigByGroupId(e) {
    return AbyssRoleLevelByGroupId_1.configAbyssRoleLevelByGroupId.GetConfigList(e);
  }
  GetDangoItemById(e) {
    if (!(e <= 0)) {
      return AbyssItemById_1.configAbyssItemById.GetConfig(e);
    }
  }
  GetSlotTypeByIndex(e) {
    return AbyssRoleSlotById_1.configAbyssRoleSlotById.GetConfig(e)?.SlotType ?? 0;
  }
  GetDangoCastDescById(e) {
    return AbyssCastDescById_1.configAbyssCastDescById.GetConfig(e);
  }
  GetDangoPluginPropDescById(e) {
    return AbyssPluginPropDescById_1.configAbyssPluginPropDescById.GetConfig(e);
  }
  GetAbyssQualityById(e) {
    return AbyssQualityById_1.configAbyssQualityById.GetConfig(e);
  }
  GetAbyssQualityByPluginItemId(e) {
    var e = this.GetDangoItemById(e);
    if (e) {
      e = e.QualityId;
      return AbyssQualityById_1.configAbyssQualityById.GetConfig(e);
    }
  }
  GetWorldInstanceId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("DangoWorldInstanceId");
  }
  GetWorldInstanceEntranceId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("DangoWorldInstanceEntranceId");
  }
  GetWorldTeleportId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("DangoSmallWorldTeleportId");
  }
  GetSmallWorldInsIdList() {
    return CommonParamById_1.configCommonParamById.GetIntArrayConfig("DangoSmallWorldInsId");
  }
  GetAbyssKeyItemId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("AbyssKeyId");
  }
  GetAbyssLimitRewardTexture() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("DangoAbyssLimitRewardTexture");
  }
  GetAbyssLimitRewardRewardId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("DangoAbyssLimitRewardId");
  }
  GetAbyssActivityData(e) {
    return AbyssActivityByActivityId_1.configAbyssActivityByActivityId.GetConfig(e);
  }
  GetAbyssRouteByRouteIdAndFloorId(e, r) {
    return AbyssRouteByRouterAndFloor_1.configAbyssRouteByRouterAndFloor.GetConfigList(e, r)?.[0];
  }
  GetAbyssRewardTabById(e) {
    return AbyssRewardTabById_1.configAbyssRewardTabById.GetConfig(e);
  }
  GetAbyssMarkByActivityId(e) {
    return AbyssActivityByActivityId_1.configAbyssActivityByActivityId.GetConfig(e).MarkId;
  }
  GetAbyssSettleById(e) {
    return AbyssSettleById_1.configAbyssSettleById.GetConfig(e);
  }
  GetAbyssSynthesisByQualityId(e) {
    for (const r of AbyssSynthesisAll_1.configAbyssSynthesisAll.GetConfigList()) {
      if (r.Quality === e) {
        return r;
      }
    }
  }
  GetRecoveryRewardByQualityId(e) {
    e = this.GetAbyssSynthesisByQualityId(e);
    if (e) {
      return e.DecomposeInfo;
    } else {
      return new Map();
    }
  }
  GetDangoShopAngryTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("DangoShopAngryTime");
  }
  GetDangoShopBuyTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("DangoShopBuyTime");
  }
  GetDangoShopClickTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("DangoShopClickTime");
  }
  GetBadDangoMeshId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("BadDangoMesh");
  }
  GetBadDangoStandAni() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("BadDangoStandAnimation");
  }
  GetBadDangoBuyAni() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("BadDangoBuyAnimation");
  }
  GetBadDangoBadDangoPinkAni() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("BadDangoPinkAnimation");
  }
  GetBadDangoBadDangoPinkOverAni() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("BadDangoPinkOverAnimation");
  }
  GetBadDangoTransform() {
    return new UE.Transform(this.yd1(), this.Sd1(), this.Md1());
  }
  yd1() {
    var e = CommonParamById_1.configCommonParamById.GetFloatArrayConfig("BadDangoRotator");
    var r = new UE.Rotator();
    if (e.length === 3) {
      r.Roll = e[0];
      r.Pitch = e[1];
      r.Yaw = e[2];
    }
    return r;
  }
  Md1() {
    var e = CommonParamById_1.configCommonParamById.GetFloatArrayConfig("BadDangoZoom");
    var r = new UE.Vector();
    if (e.length === 3) {
      r.X = e[0];
      r.Y = e[1];
      r.Z = e[2];
    }
    return r;
  }
  Sd1() {
    var e = CommonParamById_1.configCommonParamById.GetFloatArrayConfig("BadDangoLocation");
    var r = new UE.Vector();
    if (e.length === 3) {
      r.X = e[0];
      r.Y = e[1];
      r.Z = e[2];
    }
    return r;
  }
  GetItemBgDesc(e) {
    var e = this.GetDangoItemById(e);
    var r = e.BgDescription;
    if (r === "") {
      return "";
    } else {
      e = e.LevelDescStrArray.length > 0 ? e.LevelDescStrArray[0].ArrayString : [];
      return StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r), ...e);
    }
  }
}
exports.DangoAbyssConfig = DangoAbyssConfig;
//# sourceMappingURL=DangoAbyssConfig.js.map