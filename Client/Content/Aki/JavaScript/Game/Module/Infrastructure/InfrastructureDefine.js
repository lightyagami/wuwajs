"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.infrShopTabMenuName = exports.infrTaskStateToRewardText = exports.infrTaskStateToRewardStateResolver = exports.INFR_ACTIVITY_FEMALE_TEXTURE = exports.INFR_ACTIVITY_MALE_TEXTURE = exports.INFR_OBSERVATORY_MARK_ID = exports.INFR_SHOP_CURRENCY_ID = exports.INFR_QUEST_MATERIAL_ID = exports.INFR_COLLECTION_MATERIAL_ID = exports.INFR_BATTLE_MATERIAL_ID = exports.MAX_INFR_MARK_INFO_LINE_NUM = exports.difficultySpriteResourceId = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
exports.difficultySpriteResourceId = {
  [1]: "SP_InfrastructureMapStar1",
  2: "SP_InfrastructureMapStar2",
  3: "SP_InfrastructureMapStar3"
};
exports.MAX_INFR_MARK_INFO_LINE_NUM = 3;
exports.INFR_BATTLE_MATERIAL_ID = 80700001;
exports.INFR_COLLECTION_MATERIAL_ID = 80700002;
exports.INFR_QUEST_MATERIAL_ID = 80700003;
exports.INFR_SHOP_CURRENCY_ID = 80700004;
exports.INFR_OBSERVATORY_MARK_ID = 342011;
exports.INFR_ACTIVITY_MALE_TEXTURE = "/Game/Aki/UI/UIResources/Common/Image/BgCgBig/Activity/Activity30/ActivityInfrastructure/ActivityMain/T_AcivityMainMale.T_AcivityMainMale";
exports.INFR_ACTIVITY_FEMALE_TEXTURE = "/Game/Aki/UI/UIResources/Common/Image/BgCgBig/Activity/Activity30/ActivityInfrastructure/ActivityMain/T_AcivityMainFemale.T_AcivityMainFemale";
exports.infrTaskStateToRewardStateResolver = {
  [Protocol_1.Aki.Protocol.YNm.Proto_InfrTaskRunning]: 0,
  [Protocol_1.Aki.Protocol.YNm.Proto_InfrTaskFinish]: 1,
  [Protocol_1.Aki.Protocol.YNm.Proto_InfrTaskTaken]: 2
};
exports.infrTaskStateToRewardText = {
  [Protocol_1.Aki.Protocol.YNm.Proto_InfrTaskRunning]: "CollectActivity_state_open",
  [Protocol_1.Aki.Protocol.YNm.Proto_InfrTaskFinish]: "CollectActivity_state_CanRecive",
  [Protocol_1.Aki.Protocol.YNm.Proto_InfrTaskTaken]: "CollectActivity_state_recived"
};
exports.infrShopTabMenuName = {
  [2]: "BuildShop_Title_1",
  3: "BuildShop_Title_2",
  4: "BuildShop_Title_3"
}; //# sourceMappingURL=InfrastructureDefine.js.map