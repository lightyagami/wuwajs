"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeOfDaySecondCircleAttachItem = undefined;
const UE = require("ue");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const AutoAttachItem_1 = require("../../AutoAttach/AutoAttachItem");
const TimeOfDayDefine_1 = require("../TimeOfDayDefine");
const TimeOfDayModel_1 = require("../TimeOfDayModel");
const ANIMAL_SCALE = 0.8;
const MIDDLE_TIME = 12;
const FULL_ANGLE = 360;
const ONE_HOUR_ANGLE = 30;
const LEFT_RANGE = 0.4;
const MIDDLE_RANGE = 0.5;
const RIGHT_RANGE = 0.6;
const BORDER_ALPHA = 0.8;
const BORDER_RIGHT = 0.65625;
const BORDER_LEFT = 0.34375;
const BORDER_LEFT_HIDE = 0.03125;
const BORDER_RIGHT_HIDE = 0.96875;
const BORDER_MIDDLE = 0.5;
const STONE2_BORDER_LEFT = 0.375;
const STONE2_BORDER_RIGHT = 0.625;
const NIAGARA_MIN_VALUE = 0.2;
class TimeOfDaySecondCircleAttachItem extends AutoAttachItem_1.AutoAttachItem {
  constructor() {
    super(...arguments);
    this.rai = undefined;
    this.Iot = Rotator_1.Rotator.Create();
    this.nai = new UE.Vector(ANIMAL_SCALE, ANIMAL_SCALE, ANIMAL_SCALE);
    this.MLo = () => {
      if (this.rai !== undefined) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ClickTimeItem, this);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UITexture], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem]];
    this.BtnBindInfo = [[3, () => {
      this.MLo();
    }]];
  }
  OnRefreshItem(E) {
    this.rai = E;
    this.GetItem(6).SetUIActive(E === undefined);
    this.GetItem(7).SetUIActive(E !== undefined);
    this.l7e();
    this.gsi();
    this.OnMoveItem();
  }
  l7e() {
    var E;
    if (this.rai) {
      this.GetText(2).SetText(this.rai.ShowName);
      E = TimeOfDayModel_1.TodDayTime.ConvertToHourMinuteString(this.rai.SetTime);
      this.GetText(1).SetText(E);
    }
  }
  gsi() {
    if (this.rai) {
      let E = this.rai.SetTime / TimeOfDayDefine_1.TOD_SECOND_PER_HOUR;
      if (E > MIDDLE_TIME) {
        E -= MIDDLE_TIME;
      }
      var t = FULL_ANGLE - ONE_HOUR_ANGLE * E;
      var R = this.GetItem(0);
      this.Iot.Yaw = t;
      R.SetUIRelativeRotation(this.Iot.ToUeRotator());
    }
  }
  OnMoveItem() {
    var E;
    var t = this.GetCurrentMovePercentage();
    var R = this.RootItem.RelativeScale3D;
    let e = 0;
    let _ = 0;
    let D = 0;
    if (t >= BORDER_LEFT && t < BORDER_MIDDLE) {
      e = (t - BORDER_LEFT) / (BORDER_MIDDLE - BORDER_LEFT);
      _ = MathUtils_1.MathUtils.Lerp(BORDER_ALPHA, 1, e);
    } else if (t > BORDER_LEFT_HIDE && t < BORDER_LEFT) {
      e = (t - BORDER_LEFT_HIDE) / (BORDER_LEFT - BORDER_LEFT_HIDE);
      _ = MathUtils_1.MathUtils.Lerp(0.4, BORDER_ALPHA, e);
    } else if (t <= BORDER_LEFT_HIDE) {
      _ = 0.4;
    }
    if (t >= BORDER_MIDDLE && t < BORDER_RIGHT) {
      e = (t - BORDER_MIDDLE) / (BORDER_RIGHT - BORDER_MIDDLE);
      _ = MathUtils_1.MathUtils.Lerp(1, BORDER_ALPHA, e);
    } else if (t >= BORDER_RIGHT && t < BORDER_RIGHT_HIDE) {
      e = (t - BORDER_RIGHT) / (BORDER_RIGHT_HIDE - BORDER_RIGHT);
      _ = MathUtils_1.MathUtils.Lerp(BORDER_ALPHA, 0.4, e);
    } else if (t >= BORDER_RIGHT_HIDE) {
      _ = 0.4;
    }
    this.GetItem(5).SetAlpha(_);
    D = t > STONE2_BORDER_LEFT && t < BORDER_MIDDLE ? (e = (t - STONE2_BORDER_LEFT) / (BORDER_MIDDLE - STONE2_BORDER_LEFT), _ = MathUtils_1.MathUtils.Lerp(0, 1, e), -(TimeOfDaySecondCircleAttachItem.MiddleOffsetCurve?.GetFloatValue(1 - e) ?? 0)) : t >= BORDER_MIDDLE && t < STONE2_BORDER_RIGHT ? (e = (t - BORDER_MIDDLE) / (STONE2_BORDER_RIGHT - BORDER_MIDDLE), _ = MathUtils_1.MathUtils.Lerp(1, 0, e), TimeOfDaySecondCircleAttachItem.MiddleOffsetCurve?.GetFloatValue(e) ?? 0) : (_ = 0, E = TimeOfDaySecondCircleAttachItem.MiddleOffsetCurve?.GetFloatValue(1) ?? 0, t < STONE2_BORDER_LEFT ? -E : E);
    this.GetItem(7).SetAnchorOffsetX(D);
    this.GetItem(6).SetAnchorOffsetX(D);
    this.GetItem(8).SetAlpha(Math.max(NIAGARA_MIN_VALUE, _));
    this.GetTexture(4).SetAlpha(_);
    if (t >= LEFT_RANGE && t <= RIGHT_RANGE) {
      if (t >= LEFT_RANGE && t <= MIDDLE_RANGE) {
        e = t - LEFT_RANGE;
        E = MathUtils_1.MathUtils.Lerp(ANIMAL_SCALE, 1, e * 10);
        E = new UE.Vector(E, E, E);
        this.RootItem.SetUIItemScale(E);
      } else {
        e = t - MIDDLE_RANGE;
        E = MathUtils_1.MathUtils.Lerp(1, ANIMAL_SCALE, e * 10);
        t = new UE.Vector(E, E, E);
        this.RootItem.SetUIItemScale(t);
      }
    } else if (R.X !== this.nai.X) {
      this.RootItem.SetUIItemScale(this.nai);
    }
  }
  OnUnSelect() {}
  OnSelect() {
    ModelManager_1.ModelManager.TimeOfDayModel.CurrentSelectTimeItemSt = this.rai;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSelectTimeItem);
  }
}
(exports.TimeOfDaySecondCircleAttachItem = TimeOfDaySecondCircleAttachItem).MiddleOffsetCurve = undefined;
//# sourceMappingURL=TimeOfDaySecondCircleAttachItem.js.map