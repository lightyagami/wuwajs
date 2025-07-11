"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RewardSmallItemGrid = undefined;
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LoopScrollSmallItemGrid_1 = require("../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class RewardSmallItemGrid extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments);
    this.fGt = undefined;
    this.nNu = e => {
      if (this.fGt && this.fGt.UniqueId === e) {
        this.c4e(this.fGt);
      }
    };
  }
  OnAddEvents() {
    super.OnAddEvents();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemFuncValueChange, this.nNu);
  }
  OnRemoveEvents() {
    super.OnRemoveEvents();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnItemFuncValueChange, this.nNu);
  }
  OnRefresh(e, t, o) {
    this.c4e(e);
  }
  c4e(e) {
    var t = (this.fGt = e).GetConfig();
    var o = e.ConfigId;
    let a = undefined;
    let r = undefined;
    let i = undefined;
    switch (e.GetDropItemType()) {
      case 1:
        a = "Reward_Tag_Extra";
        r = CommonParamById_1.configCommonParamById.GetStringConfig("Reward_Tag_Extra_Bg_Color");
        i = CommonParamById_1.configCommonParamById.GetStringConfig("Reward_Tag_Extra_Text_Color");
        break;
      case 2:
        a = "Reward_Tag_Magnification";
        r = CommonParamById_1.configCommonParamById.GetStringConfig("Reward_Tag_Magnification_Bg_Color");
        i = CommonParamById_1.configCommonParamById.GetStringConfig("Reward_Tag_Magnification_Text_Color");
    }
    switch (t.ItemDataType) {
      case 1:
        var n = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(o);
        var n = {
          Data: e,
          Type: 2,
          ItemConfigId: o,
          BottomTextId: n.Name,
          QualityId: n.QualityId,
          TopRightTextId: a,
          TopRightTextBgColor: r,
          TopRightTextColor: i
        };
        this.Apply(n);
        break;
      case 3:
        var n = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemData(e.UniqueId);
        var m = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(e.UniqueId);
        var m = {
          Data: e,
          Type: 3,
          ItemConfigId: o,
          TopRightTextId: a,
          TopRightTextBgColor: r,
          TopRightTextColor: i,
          FetterGroupId: m.GetFetterGroupId(),
          IsPhantomLock: n.GetIsLock(),
          IsPhantomDeprecate: n.GetIsDeprecated()
        };
        this.Apply(m);
        break;
      default:
        n = {
          Data: e,
          Type: 4,
          ItemConfigId: o,
          BottomText: "x" + e.Count,
          TopRightTextId: a,
          TopRightTextBgColor: r,
          TopRightTextColor: i
        };
        this.Apply(n);
    }
  }
}
exports.RewardSmallItemGrid = RewardSmallItemGrid;
//# sourceMappingURL=RewardSmallItemGrid.js.map