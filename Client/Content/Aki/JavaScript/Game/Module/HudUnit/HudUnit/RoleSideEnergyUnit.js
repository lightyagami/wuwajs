"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSideEnergyUnit = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const CharacterAttributeTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes");
const HudUnitBase_1 = require("../HudUnitBase");
const MAX_DELTA_TIME = 200;
const MIN_DELTA_OFFSET = 0.5;
const MAX_POS_OFFSET = 500;
const OFFSET_X = -150;
class RoleSideEnergyUnit extends HudUnitBase_1.HudUnitBase {
  constructor() {
    super(...arguments);
    this.CueConfig = undefined;
    this.RoleData = undefined;
    this.AttrId = 0;
    this.MaxAttrId = 0;
    this.OffsetX = 0;
    this.OffsetY = 0;
    this.SpeedX = 0;
    this.SpeedY = 0;
    this.OnAttrChanged = (t, i, s) => {
      this.RefreshBarPercent();
    };
  }
  InitInfo(t, i) {
    this.CueConfig = t;
    this.RoleData = i;
    this.AttrId = t.AttrId;
    this.MaxAttrId = CharacterAttributeTypes_1.attributeIdsWithMax.get(this.AttrId) ?? 0;
    this.AddEvents();
    this.RefreshBarPercent();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  OnBeforeDestroy() {
    this.RemoveEvents();
    this.CueConfig = undefined;
    this.RoleData = undefined;
    super.OnBeforeDestroy();
  }
  AddEvents() {
    if (this.AttrId !== 0 && this.RoleData?.AttributeComponent) {
      this.RoleData.AttributeComponent.AddListener(this.AttrId, this.OnAttrChanged);
      this.RoleData.AttributeComponent.AddListener(this.MaxAttrId, this.OnAttrChanged);
    }
  }
  RemoveEvents() {
    if (this.AttrId !== 0 && this.RoleData?.AttributeComponent) {
      this.RoleData.AttributeComponent.RemoveListener(this.AttrId, this.OnAttrChanged);
      this.RoleData.AttributeComponent.RemoveListener(this.MaxAttrId, this.OnAttrChanged);
    }
  }
  RefreshBarPercent() {
    var t;
    var i;
    if (this.AttrId !== 0 && this.RoleData?.AttributeComponent) {
      i = this.RoleData.AttributeComponent.GetCurrentValue(this.AttrId);
      i = (t = this.RoleData.AttributeComponent.GetCurrentValue(this.MaxAttrId)) === 0 ? 0 : i / t;
      this.GetSprite(0).SetFillAmount(i);
    }
  }
  RefreshTargetPosition(t, i) {
    var s = i.X;
    var i = i.Y;
    if (Math.abs(s - this.OffsetX) > MAX_POS_OFFSET || Math.abs(i - this.OffsetY) > MAX_POS_OFFSET) {
      this.OffsetX = s;
      this.OffsetY = i;
      this.SetAnchorOffset(this.OffsetX, this.OffsetY);
    } else {
      this.SpeedX = this.jii(t, s, this.OffsetX, this.SpeedX);
      this.SpeedY = this.jii(t, i, this.OffsetY, this.SpeedY);
      s = this.SpeedX * t;
      i = this.SpeedY * t;
      if (!(s < MIN_DELTA_OFFSET) || !(s > -MIN_DELTA_OFFSET) || !(i < MIN_DELTA_OFFSET) || !(i > -MIN_DELTA_OFFSET)) {
        this.OffsetX += s;
        this.OffsetY += i;
        this.SetAnchorOffset(this.OffsetX + OFFSET_X, this.OffsetY);
      }
    }
  }
  jii(t, i, s, h) {
    let e = i - s;
    let r = false;
    if (e < 0) {
      e = -e;
      r = true;
    }
    if (e < 1) {
      return 0;
    }
    let _ = 0;
    _ = t >= MAX_DELTA_TIME ? e / t : e / MAX_DELTA_TIME;
    if (r) {
      _ = -_;
    }
    return MathUtils_1.MathUtils.Lerp(h, _, 0.5);
  }
}
exports.RoleSideEnergyUnit = RoleSideEnergyUnit;
//# sourceMappingURL=RoleSideEnergyUnit.js.map