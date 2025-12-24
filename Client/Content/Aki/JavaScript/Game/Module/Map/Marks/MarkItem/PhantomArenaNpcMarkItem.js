"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaNpcMarkItem = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ConfigMarkItem_1 = require("../../../Map/Marks/MarkItem/ConfigMarkItem");
const PhantomArenaNpcMarkItemView_1 = require("../MarkItemView/PhantomArenaNpcMarkItemView");
class PhantomArenaNpcMarkItem extends ConfigMarkItem_1.ConfigMarkItem {
  constructor(e, a, r, t, n, o = 1) {
    super(e, a, r, t, n, o);
    this.InnerView = undefined;
  }
  OnInitialize() {
    super.OnInitialize();
    this.yn_();
  }
  yn_() {
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig?.GetPhantomBattleChallengeByMarkId(this.MarkId);
    if (e) {
      e = ModelManager_1.ModelManager.PhantomArenaModel?.GetPermanentChallengeStateById(e.Id);
      this.MarkItemEntity.GamePlay.GamePlayState = e === 2 ? 2 : 1;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 87, "PhantomArenaNpcMarkItem找不到对应的挑战数据", ["markId", this.MarkId]);
    }
  }
  GetMarkItemViewType() {
    return 31;
  }
  CreateView() {
    return new PhantomArenaNpcMarkItemView_1.PhantomArenaNpcMarkItemView(this);
  }
  GetTitleText() {
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig?.GetPhantomBattleChallengeByMarkId(this.MarkId);
    if (e) {
      e = ModelManager_1.ModelManager.PhantomArenaModel?.GetPermanentChallengeData(e.Id)?.qgf ?? true;
      return ConfigManager_1.ConfigManager.MapConfig.GetLocalText(e ? this.MarkConfig.MarkTitle : "PhantomBattle_1164");
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 87, "获取挑战信息失败", ["MarkId", this.MarkId]);
      }
      return "";
    }
  }
  CheckCanShowView() {
    var e = ConfigManager_1.ConfigManager.PhantomArenaConfig?.GetPhantomBattleChallengeByMarkId(this.MarkId);
    if (e) {
      return !!ModelManager_1.ModelManager.MapModel?.IsExtraUiMarkTypeVisible(this.MapType, this.MarkType) || e.IsWorldMapShowMark && super.CheckCanShowView();
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 87, "PhantomArenaNpcMarkItem找不到对应的挑战数据", ["markId", this.MarkId]);
      }
      return false;
    }
  }
}
exports.PhantomArenaNpcMarkItem = PhantomArenaNpcMarkItem;
//# sourceMappingURL=PhantomArenaNpcMarkItem.js.map