"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LockCursorHandle = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const BattleUiControl_1 = require("../../BattleUi/BattleUiControl");
const PhantomUtil_1 = require("../../Phantom/PhantomUtil");
const LockCursorUnit_1 = require("../HudUnit/LockCursorUnit");
const HudUnitUtils_1 = require("../Utils/HudUnitUtils");
const HudUnitHandleBase_1 = require("./HudUnitHandleBase");
const HIT_CASE_SOCKET = new UE.FName("HitCase");
class LockCursorHandle extends HudUnitHandleBase_1.HudUnitHandleBase {
  constructor() {
    super(...arguments);
    this.jma = new Vector2D_1.Vector2D();
    this.Poi = undefined;
    this.v$e = false;
    this.xoi = false;
    this.woi = false;
    this.Boi = 0;
    this.vG_ = undefined;
    this.yG_ = undefined;
    this.SG_ = undefined;
    this.MG_ = false;
    this.boi = (t, i) => {
      if (Info_1.Info.IsInGamepad()) {
        if (i === 0) {
          this.woi = this.Poi !== undefined;
        } else {
          this.xoi = true;
        }
      }
      if (this.Poi && !ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(215)?.HasTag(-2140742267)) {
        if (i === 0) {
          this.qoi();
        } else {
          this.Goi();
        }
      }
    };
    this.Noi = (t, i) => {
      if (i === 102) {
        if (t) {
          this.qoi();
        } else {
          this.Goi();
        }
      }
    };
    this.VJe = (t, i) => {
      if (t) {
        this.Boi = i;
      } else if (i === this.Boi) {
        this.Boi = 0;
      }
    };
  }
  OnAddEvents() {
    InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.锁定目标, this.boi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPressOrReleaseBehaviorButton, this.Noi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterOrExitExecutionRange, this.VJe);
  }
  OnRemoveEvents() {
    InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.锁定目标, this.boi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPressOrReleaseBehaviorButton, this.Noi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterOrExitExecutionRange, this.VJe);
  }
  OnDestroyed() {
    this.EG_();
    this.Poi = undefined;
  }
  qoi() {
    var t;
    if (this.Poi?.IsForceLockState()) {
      t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(65).GetBpInputComp().UnlockLongPressTime * TimeUtil_1.TimeUtil.InverseMillisecond;
      this.Poi.ActivateUnlockTimeDown(t);
    }
  }
  Goi() {
    this.Poi?.DeactivateUnlockTimeDown();
  }
  OnTick(t) {
    super.OnTick(t);
    if (!this.v$e) {
      this.IG_();
      if (this.xoi) {
        this.xoi = false;
        if (!this.woi && !this.vG_ && !this.Ooi()) {
          BattleUiControl_1.BattleUiControl.ResetFocus();
        }
      }
      if (this.vG_ && this.vG_.Id !== this.Boi && (t = this.Koi(this.vG_, this.yG_)) && HudUnitUtils_1.HudUnitUtils.PositionUtil.ProjectWorldToScreen(t, this.jma)) {
        this.Activate();
        if (this.Poi) {
          this.Poi.Refresh(this.vG_, this.SG_, this.MG_);
          this.Poi.GetRootItem().SetAnchorOffset(this.jma.ToUeVector2D(true));
        }
        this.EG_();
      } else {
        this.Deactivate();
      }
    }
  }
  Ooi() {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    return !!t?.Valid && t.Entity.GetComponent(184)?.DirectionState === CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection;
  }
  Activate() {
    if (this.Poi) {
      this.Poi.Activate();
    } else if (!this.v$e) {
      this.v$e = true;
      this.NewHudUnit(LockCursorUnit_1.LockCursorUnit, "UiItem_SuoDing").then(t => {
        if (t) {
          this.v$e = false;
          this.Poi = t;
        }
      }, () => {});
    }
  }
  Deactivate() {
    this.EG_();
    if (this.Poi) {
      this.Poi.Deactivate();
    }
  }
  IG_() {
    this.EG_();
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (t?.Valid) {
      const e = t.Entity.CheckGetComponent(33).GetTargetInfo();
      if (e.ShowTarget?.Valid) {
        this.vG_ = e.ShowTarget;
        this.yG_ = e.SocketName;
        this.SG_ = t;
        this.MG_ = true;
      } else {
        var i = t.Entity.GetComponent(243)?.VehicleEntity?.GetComponent(32);
        if (i) {
          const e = i.GetTargetInfo();
          if (e.ShowTarget?.Valid) {
            this.vG_ = e.ShowTarget;
            this.yG_ = e.SocketName;
            return;
          }
        }
        if (t.Entity.GetComponent(215)?.HasTag(-2100129479) && (i = PhantomUtil_1.PhantomUtil.GetSummonedEntity(t.Entity, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision))?.Valid && (t = i.Entity.CheckGetComponent(33)) && (t = t.GetTargetInfo()).ShowTarget?.Valid) {
          this.vG_ = t.ShowTarget;
          this.yG_ = t.SocketName;
          this.SG_ = i;
        }
      }
    }
  }
  EG_() {
    this.vG_ = undefined;
    this.yG_ = undefined;
    this.SG_ = undefined;
    this.MG_ = false;
  }
  Koi(i, e) {
    if (i?.Valid) {
      i = i.Entity.GetComponent(1).Owner;
      if (i instanceof TsBaseCharacter_1.default) {
        i = i.Mesh;
        let t = FNameUtil_1.FNameUtil.GetDynamicFName(e);
        if (!t || !i.DoesSocketExist(t)) {
          t = HIT_CASE_SOCKET;
        }
        return i.D_GetSocketLocation(t);
      }
    }
  }
}
exports.LockCursorHandle = LockCursorHandle;
//# sourceMappingURL=LockCursorHandle.js.map