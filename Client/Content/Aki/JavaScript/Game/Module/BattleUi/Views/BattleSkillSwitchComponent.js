"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemUseComponent = exports.BattleSkillSwitchComponent = undefined;
const UE = require("ue");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const rotatorAngles = [135, 90, 45, 0, -45, -90, -135, -180];
const ITEM_ANGLE_INDEX = 7;
class BattleSkillSwitchComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.yot = undefined;
    this.Iot = Rotator_1.Rotator.Create();
    this.vot = new Map();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText]];
  }
  OnStart() {
    for (const t of this.vot.values()) {
      t();
    }
  }
  OnBeforeDestroy() {
    this.vot.clear();
  }
  SetComponentActive(t) {
    var e = () => {
      this.SetActive(t);
    };
    if (this.InAsyncLoading()) {
      this.vot.set("SetActive", e);
    } else {
      e();
    }
  }
  RefreshSwitch() {
    var t = () => {
      var t = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId;
      var e = ModelManager_1.ModelManager.RouletteModel.ExploreSkillIdList.indexOf(t);
      if (t === 3002 || t === 3001) {
        this.UpdateSwitch(ITEM_ANGLE_INDEX);
      } else {
        this.UpdateSwitch(e);
      }
    };
    if (this.InAsyncLoading()) {
      this.vot.set("RefreshComponent", t);
    } else {
      t();
    }
  }
  UpdateSwitch(s) {
    var t;
    if (this.yot !== s && !(s >= rotatorAngles.length)) {
      t = () => {
        this.yot = s;
        var t;
        var e = this.GetSprite(0);
        e.SetUIActive(s >= 0);
        if (!(s < 0)) {
          this.Iot.Yaw = rotatorAngles[s];
          t = this.Iot.ToUeRotator();
          e.SetUIRelativeRotation(t);
        }
      };
      if (this.InAsyncLoading()) {
        this.vot.set("UpdateSwitch", t);
      } else {
        t();
      }
    }
  }
  UpdateNumPanel(t, e) {
    var s = () => {
      this.GetItem(1).SetUIActive(t);
      if (t && e !== undefined) {
        this.GetText(2).SetText(e.toString());
      }
    };
    if (this.InAsyncLoading()) {
      this.vot.set("UpdateNumPanel", s);
    } else {
      s();
    }
  }
  UpdatePointPanel(e, s, i) {
    var t = () => {
      var t;
      this.GetItem(3).SetUIActive(e);
      if (!!e && s !== undefined && i !== undefined && !(s < i)) {
        t = i + "/" + s;
        this.GetText(4)?.SetText(t);
      }
    };
    if (this.InAsyncLoading()) {
      this.vot.set("UpdatePointPanel", t);
    } else {
      t();
    }
  }
}
exports.BattleSkillSwitchComponent = BattleSkillSwitchComponent;
class ItemUseComponent extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  Refresh(t, e, s) {
    this.SetSpriteVisible(t);
  }
  SetSpriteVisible(t) {
    this.GetSprite(0).SetUIActive(t);
  }
}
exports.ItemUseComponent = ItemUseComponent;
//# sourceMappingURL=BattleSkillSwitchComponent.js.map