"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemMingSuTi = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const MingSuDefine_1 = require("../../../Module/MingSu/MingSuDefine");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemMingSuTi extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, i) {
    e = e.BoardId;
    if (!e) {
      return false;
    }
    const n = new CustomPromise_1.CustomPromise();
    return !!ControllerHolder_1.ControllerHolder.MingSuController.OpenView(e, e => {
      n.SetResult(e);
    }) && n.Promise;
  }
  GetViewName(e) {
    switch (e.BoardId) {
      case MingSuDefine_1.MING_SU_POOL_CONFIG_ID:
        return "MingSuView";
      case MingSuDefine_1.CHENG_XIAO_SHAN_POOL_CONFIG_ID:
        return "CollectItemView";
      case MingSuDefine_1.PUPU_VILLAGE_POOL_CONFIG_ID:
        return "PupuVillageItemView";
      case MingSuDefine_1.PUPU_VILLAGE_QIQIU_POOL_CONFIG_ID:
        return "PupuVillageItemViewQIQIU";
      case MingSuDefine_1.DARK_COAST_POOL_CONFIG_ID:
        return "DarkCoastDeliveryMainView";
      case MingSuDefine_1.LAHAILUOSHENGXIA_POOL_CONFIG_ID:
      case MingSuDefine_1.RILINGCOLLECT_POOL_CONFIG_ID:
        return "LaHaiLuoCollectView";
      default:
        return "MingSuView";
    }
  }
}
exports.OpenSystemMingSuTi = OpenSystemMingSuTi;
//# sourceMappingURL=OpenSystemMingSuTi.js.map