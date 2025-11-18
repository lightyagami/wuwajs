"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapSubMapItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../Util/LguiUtil");
class WorldMapSubMapItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.MultiMapConfigId = 0;
    this.OnToggleStateChange = e => {
      if (e === 1) {
        ModelManager_1.ModelManager.WorldMapModel.WorldMapCurrentMultiMapId = this.MultiMapConfigId;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapSelectMultiMap, this.MultiMapConfigId);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapSubMapChanged, this.GridIndex);
      }
    };
  }
  Refresh(e, t, i) {
    this.MultiMapConfigId = e.Id;
    this.GridIndex = i;
    this.GetExtendToggle(3)?.SetToggleState(t ? 1 : 0, false);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.FloorName);
    var i = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId();
    var t = ConfigManager_1.ConfigManager.MapConfig?.GetSubMapConfigByAreaId(i);
    if (e.Area.includes(i) || !e.Area.includes(i) && e.Floor === 0 && !t) {
      i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_MultiMapCurrentAreaIcon");
      if (!StringUtils_1.StringUtils.IsEmpty(i)) {
        t = this.GetSprite(0)?.GetOwner()?.GetComponentByClass(UE.UIExtendToggleSpriteTransition.StaticClass());
        this.SetExtendToggleSpriteTransitionByPath(i, t);
        this.SetSpriteByPath(i, this.GetSprite(1), false);
      }
    } else if (!StringUtils_1.StringUtils.IsEmpty(e.FloorIcon) && !(t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e.FloorIcon), StringUtils_1.StringUtils.IsEmpty(t))) {
      i = this.GetSprite(0)?.GetOwner()?.GetComponentByClass(UE.UIExtendToggleSpriteTransition.StaticClass());
      this.SetExtendToggleSpriteTransitionByPath(t, i);
      this.SetSpriteByPath(t, this.GetSprite(1), false);
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UIText], [3, UE.UIExtendToggle]];
  }
  OnStart() {
    this.GetExtendToggle(3)?.OnStateChange.Add(this.OnToggleStateChange);
  }
  OnSelected(e) {
    this.GetExtendToggle(3)?.SetToggleState(1, e);
  }
  OnDeselected(e) {
    this.GetExtendToggle(3)?.SetToggleState(0, e);
  }
}
exports.WorldMapSubMapItem = WorldMapSubMapItem;
//# sourceMappingURL=WorldMapSubMapItem.js.map