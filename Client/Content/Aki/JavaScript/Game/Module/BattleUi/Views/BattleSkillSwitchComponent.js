"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ItemUseComponent = exports.BattleSkillSwitchComponent = void 0;
const UE = require("ue"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  rotatorAngles = [135, 90, 45, 0, -45, -90, -135, -180],
  ITEM_ANGLE_INDEX = 7;
class BattleSkillSwitchComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.yot = void 0, this.Iot = Rotator_1.Rotator.Create(), this.vot = new Map
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIText]
    ]
  }
  OnStart() {
    for (const t of this.vot.values()) t()
  }
  OnBeforeDestroy() {
    this.vot.clear()
  }
  SetComponentActive(t) {
    var e = () => {
      this.SetActive(t)
    };
    this.InAsyncLoading() ? this.vot.set("SetActive", e) : e()
  }
  RefreshSwitch() {
    var t = () => {
      var t = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId,
        e = ModelManager_1.ModelManager.RouletteModel.ExploreSkillIdList.indexOf(t);
      3002 === t || 3001 === t ? this.UpdateSwitch(ITEM_ANGLE_INDEX) : this.UpdateSwitch(e)
    };
    this.InAsyncLoading() ? this.vot.set("RefreshComponent", t) : t()
  }
  UpdateSwitch(s) {
    var t;
    this.yot === s || s >= rotatorAngles.length || (t = () => {
      this.yot = s;
      var t, e = this.GetSprite(0);
      e.SetUIActive(0 <= s), s < 0 || (this.Iot.Yaw = rotatorAngles[s], t = this.Iot.ToUeRotator(), e.SetUIRelativeRotation(t))
    }, this.InAsyncLoading() ? this.vot.set("UpdateSwitch", t) : t())
  }
  UpdateNumPanel(t, e) {
    var s = () => {
      this.GetItem(1).SetUIActive(t), t && void 0 !== e && this.GetText(2).SetText(e.toString())
    };
    this.InAsyncLoading() ? this.vot.set("UpdateNumPanel", s) : s()
  }
  UpdatePointPanel(e, s, i) {
    var t = () => {
      var t;
      this.GetItem(3).SetUIActive(e), !e || void 0 === s || void 0 === i || s < i || (t = i + "/" + s, this.GetText(4)?.SetText(t))
    };
    this.InAsyncLoading() ? this.vot.set("UpdatePointPanel", t) : t()
  }
}
exports.BattleSkillSwitchComponent = BattleSkillSwitchComponent;
class ItemUseComponent extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite]
    ]
  }
  Refresh(t, e, s) {
    this.SetSpriteVisible(t)
  }
  SetSpriteVisible(t) {
    this.GetSprite(0).SetUIActive(t)
  }
}
exports.ItemUseComponent = ItemUseComponent;
//# sourceMappingURL=BattleSkillSwitchComponent.js.map