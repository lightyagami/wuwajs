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
    this.xVu = e => {
      if (this.fGt && this.fGt.UniqueId === e) {
        this.c4e(this.fGt);
      }
    };
  }
  OnStart() {
    this.SetUseFixedAsync(true);
  }
  OnAddEvents() {
    super.OnAddEvents();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemFuncValueChange, this.xVu);
  }
  OnRemoveEvents() {
    super.OnRemoveEvents();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnItemFuncValueChange, this.xVu);
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
    let n = true;
    switch (t.ItemDataType) {
      case 1:
        {
          var m = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(o);
          const d = {
            Data: e,
            Type: 2,
            ItemConfigId: o,
            BottomTextId: m.Name,
            QualityId: m.QualityId,
            TopRightTextId: a,
            TopRightTextBgColor: r,
            TopRightTextColor: i
          };
          this.Apply(d);
          return;
        }
      case 3:
        {
          if (ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(o).ParentMonsterId !== 0) {
            break;
          }
          var m = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemData(e.UniqueId);
          var s = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(e.UniqueId);
          const d = {
            Data: e,
            Type: 3,
            ItemConfigId: o,
            TopRightTextId: a,
            TopRightTextBgColor: r,
            TopRightTextColor: i,
            FetterGroupId: s.GetFetterGroupId(),
            IsPhantomLock: m.GetIsLock(),
            IsPhantomDeprecate: m.GetIsDeprecated()
          };
          this.Apply(d);
          return;
        }
      case 21:
        n = false;
    }
    const d = {
      Data: e,
      Type: 4,
      ItemConfigId: o,
      BottomText: n ? "x" + e.Count : "",
      TopRightTextId: a,
      TopRightTextBgColor: r,
      TopRightTextColor: i
    };
    this.Apply(d);
  }
}
exports.RewardSmallItemGrid = RewardSmallItemGrid;
//# sourceMappingURL=RewardSmallItemGrid.js.map