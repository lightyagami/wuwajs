"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuickNavigateLoopScrollAreaGridItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const MapUtil_1 = require("../../../Map/MapUtil");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const WorldMapDefine_1 = require("../../WorldMapDefine");
class QuickNavigateLoopScrollAreaGridItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.kqe = () => {
      this.Ilh();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapSecondNavigateSelect, this.GridIndex);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIExtendToggle], [4, UE.UIHorizontalLayout], [5, UE.UISprite], [6, UE.UISprite]];
    this.BtnBindInfo = [[3, this.kqe]];
  }
  OnStart() {
    this.GetExtendToggle(3).bLockStateOnSelect = false;
    this.GetSprite(5).SetUIActive(false);
    this.GetSprite(6).SetUIActive(false);
  }
  Refresh(e, t, i) {
    var r = (this.Pe = e).AreaNavigateInfo.AreaId;
    var a = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(r);
    this.UYa(a.Title);
    if (e.RefreshType === 1 || e.RefreshType === 2 || e.RefreshType === 4) {
      this.Ilh();
    }
    var a = MapUtil_1.MapUtil.GetWorldMapLevelOneAreaId();
    if (a === r) {
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_IconCommonPlayer");
      this.GetSprite(0).SetUIActive(true);
      this.SetSpriteByPath(e, this.GetSprite(0), false);
    } else {
      a = ModelManager_1.ModelManager.ExploreProgressModel.TrackTaskAreaId;
      this.GetSprite(0).SetUIActive(a === r);
      if (a === r) {
        e = ModelManager_1.ModelManager.ExploreProgressModel.TrackTaskIconPath;
        this.SetSpriteByPath(e, this.GetSprite(0), false);
      }
    }
    const s = ModelManager_1.ModelManager.ExploreProgressModel.GetOnlinePlayerIndexListByAreaId(r);
    [5, 6].forEach(e => {
      var t = s.pop();
      var e = this.GetSprite(e);
      var i = t !== undefined;
      e.SetUIActive(i);
      if (i) {
        i = WorldMapDefine_1.onlinePlayerIconPathList2[t - 1];
        t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
        this.SetSpriteByPath(t, e, false);
      }
    });
  }
  UYa(e) {
    var t = this.GetText(1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, e);
  }
  Ilh() {
    var e = this.GetExtendToggle(3);
    if (this.Pe.IsSelected) {
      e.SetToggleState(1);
    } else {
      e.SetToggleState(0);
    }
  }
}
exports.QuickNavigateLoopScrollAreaGridItem = QuickNavigateLoopScrollAreaGridItem;
//# sourceMappingURL=QuickNavigateLoopScrollAreaGridItem.js.map