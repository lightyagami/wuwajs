"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleInputLayer = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../../../../Core/Resource/ResourceSystem");
const MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const InputEnums_1 = require("../../../../../../Input/InputEnums");
const InputLayer_1 = require("../../../../../../Input/InputLayer");
const NPC_VEHICLE_INPUT_CLASS_PATH = "/Game/Aki/Character/NPC/BP_InputComponent_NpcVehicle.BP_InputComponent_NpcVehicle_C";
class VehicleInputLayer extends InputLayer_1.InputLayer {
  constructor() {
    super(...arguments);
    this.Aia = undefined;
    this.xBu = undefined;
  }
  Init(s) {
    s = s.Entity;
    let t = undefined;
    let e = s.CheckGetComponent(247);
    t = e ? e.Actor.InputComponentClass?.AssetPathName?.toString() : (e = s.CheckGetComponent(3), NPC_VEHICLE_INPUT_CLASS_PATH);
    const n = e.Actor;
    this.ResetBpInputComp();
    if (!this.Aia) {
      if (t) {
        ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Class, s => {
          this.Aia = n.AddComponentByClass(s, false, MathUtils_1.MathUtils.DefaultTransform, false);
          this.Aia.OwnerActor = n;
          this.xBu = this.Aia;
        });
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Input", 67, "[VehicleInputLayer]加载BpInput失败", ["Role", n.GetName()]);
      }
    }
  }
  Clear() {
    this.Aia = undefined;
    this.xBu = undefined;
  }
  GetLayerType() {
    return 4;
  }
  HandlePress(s, t) {
    if (this.Aia) {
      switch (s) {
        case InputEnums_1.EInputAction.跳跃:
          return this.Aia.跳跃按下(t);
        case InputEnums_1.EInputAction.攀爬:
          return this.Aia.攀爬按下(t);
        case InputEnums_1.EInputAction.走跑切换:
          return this.Aia.走跑切换按下(t);
        case InputEnums_1.EInputAction.攻击:
          return this.Aia.攻击按下(t);
        case InputEnums_1.EInputAction.闪避:
          return this.Aia.闪避按下(t);
        case InputEnums_1.EInputAction.技能1:
          return this.Aia.技能1按下(t);
        case InputEnums_1.EInputAction.幻象1:
          return this.Aia.幻象1按下(t);
        case InputEnums_1.EInputAction.大招:
          return this.Aia.大招按下(t);
        case InputEnums_1.EInputAction.幻象2:
          return this.Aia.幻象2按下(t);
        case InputEnums_1.EInputAction.切换角色1:
          return this.Aia.切换角色1按下(t);
        case InputEnums_1.EInputAction.切换角色2:
          return this.Aia.切换角色2按下(t);
        case InputEnums_1.EInputAction.切换角色3:
          return this.Aia.切换角色3按下(t);
        case InputEnums_1.EInputAction.瞄准:
          return this.Aia.瞄准按下(t);
        case InputEnums_1.EInputAction.通用交互:
          return this.Aia.通用交互按下(t);
      }
    }
  }
  HandleRelease(s, t) {
    if (this.Aia) {
      switch (s) {
        case InputEnums_1.EInputAction.跳跃:
          return this.Aia.跳跃抬起(t);
        case InputEnums_1.EInputAction.攀爬:
          return this.Aia.攀爬抬起(t);
        case InputEnums_1.EInputAction.走跑切换:
          return this.Aia.走跑切换抬起(t);
        case InputEnums_1.EInputAction.攻击:
          return this.Aia.攻击抬起(t);
        case InputEnums_1.EInputAction.闪避:
          return this.Aia.闪避抬起(t);
        case InputEnums_1.EInputAction.技能1:
          return this.Aia.技能1抬起(t);
        case InputEnums_1.EInputAction.幻象1:
          return this.Aia.幻象1抬起(t);
        case InputEnums_1.EInputAction.大招:
          return this.Aia.大招抬起(t);
        case InputEnums_1.EInputAction.幻象2:
          return this.Aia.幻象2抬起(t);
        case InputEnums_1.EInputAction.切换角色1:
          return this.Aia.切换角色1抬起(t);
        case InputEnums_1.EInputAction.切换角色2:
          return this.Aia.切换角色2抬起(t);
        case InputEnums_1.EInputAction.切换角色3:
          return this.Aia.切换角色3抬起(t);
        case InputEnums_1.EInputAction.瞄准:
          return this.Aia.瞄准抬起(t);
      }
    }
  }
  HandleHold(s, t) {
    if (this.Aia) {
      switch (s) {
        case InputEnums_1.EInputAction.跳跃:
          return this.Aia.跳跃长按(t);
        case InputEnums_1.EInputAction.攀爬:
          return this.Aia.攀爬长按(t);
        case InputEnums_1.EInputAction.走跑切换:
          return this.Aia.走跑切换长按(t);
        case InputEnums_1.EInputAction.攻击:
          return this.Aia.攻击长按(t);
        case InputEnums_1.EInputAction.闪避:
          return this.Aia.闪避长按(t);
        case InputEnums_1.EInputAction.技能1:
          return this.Aia.技能1长按(t);
        case InputEnums_1.EInputAction.幻象1:
          return this.Aia.幻象1长按(t);
        case InputEnums_1.EInputAction.大招:
          return this.Aia.大招长按(t);
        case InputEnums_1.EInputAction.幻象2:
          return this.Aia.幻象2长按(t);
        case InputEnums_1.EInputAction.切换角色1:
          return this.Aia.切换角色1长按(t);
        case InputEnums_1.EInputAction.切换角色2:
          return this.Aia.切换角色2长按(t);
        case InputEnums_1.EInputAction.切换角色3:
          return this.Aia.切换角色3长按(t);
        case InputEnums_1.EInputAction.锁定目标:
          return this.Aia.锁定目标长按(t);
        case InputEnums_1.EInputAction.瞄准:
          return this.Aia.瞄准长按(t);
      }
    }
  }
  DispatchPressEvent(s, t) {
    if (this.Aia) {
      switch (s) {
        case InputEnums_1.EInputAction.跳跃:
          this.Aia.跳跃按下事件(t);
          EventSystem_1.EventSystem.EmitWithTarget(this, EventDefine_1.EEventName.VehicleInputLayerPress, s);
          break;
        case InputEnums_1.EInputAction.攀爬:
          this.Aia.攀爬按下事件(t);
          break;
        case InputEnums_1.EInputAction.走跑切换:
          this.Aia.走跑切换按下事件(t);
          break;
        case InputEnums_1.EInputAction.攻击:
          this.Aia.攻击按下事件(t);
          break;
        case InputEnums_1.EInputAction.闪避:
          this.Aia.闪避按下事件(t);
          break;
        case InputEnums_1.EInputAction.技能1:
          this.Aia.技能1按下事件(t);
          break;
        case InputEnums_1.EInputAction.幻象1:
          this.Aia.幻象1按下事件(t);
          break;
        case InputEnums_1.EInputAction.大招:
          this.Aia.大招按下事件(t);
          break;
        case InputEnums_1.EInputAction.幻象2:
          this.Aia.幻象2按下事件(t);
          break;
        case InputEnums_1.EInputAction.切换角色1:
          this.Aia.切换角色1按下事件(t);
          break;
        case InputEnums_1.EInputAction.切换角色2:
          this.Aia.切换角色2按下事件(t);
          break;
        case InputEnums_1.EInputAction.切换角色3:
          this.Aia.切换角色3按下事件(t);
          break;
        case InputEnums_1.EInputAction.锁定目标:
          this.Aia.锁定目标按下事件(t);
          break;
        case InputEnums_1.EInputAction.瞄准:
          this.Aia.瞄准按下事件(t);
      }
    }
  }
  DispatchReleaseEvent(s, t) {
    if (this.Aia) {
      switch (s) {
        case InputEnums_1.EInputAction.跳跃:
          this.Aia.跳跃抬起事件(t);
          EventSystem_1.EventSystem.EmitWithTarget(this, EventDefine_1.EEventName.VehicleInputLayerRelease, s);
          break;
        case InputEnums_1.EInputAction.攀爬:
          this.Aia.攀爬抬起事件(t);
          break;
        case InputEnums_1.EInputAction.走跑切换:
          this.Aia.走跑切换抬起事件(t);
          break;
        case InputEnums_1.EInputAction.攻击:
          this.Aia.攻击抬起事件(t);
          break;
        case InputEnums_1.EInputAction.闪避:
          this.Aia.闪避抬起事件(t);
          break;
        case InputEnums_1.EInputAction.技能1:
          this.Aia.技能1抬起事件(t);
          break;
        case InputEnums_1.EInputAction.幻象1:
          this.Aia.幻象1抬起事件(t);
          break;
        case InputEnums_1.EInputAction.大招:
          this.Aia.大招抬起事件(t);
          break;
        case InputEnums_1.EInputAction.幻象2:
          this.Aia.幻象2抬起事件(t);
          break;
        case InputEnums_1.EInputAction.切换角色1:
          this.Aia.切换角色1抬起事件(t);
          break;
        case InputEnums_1.EInputAction.切换角色2:
          this.Aia.切换角色2抬起事件(t);
          break;
        case InputEnums_1.EInputAction.切换角色3:
          this.Aia.切换角色3抬起事件(t);
          break;
        case InputEnums_1.EInputAction.锁定目标:
          this.Aia.锁定目标抬起事件(t);
          break;
        case InputEnums_1.EInputAction.瞄准:
          this.Aia.瞄准抬起事件(t);
      }
    }
  }
  GetBpInputComp() {
    return this.Aia;
  }
  SetBpInputComp(s) {
    this.Aia = s;
  }
  ResetBpInputComp() {
    this.Aia = this.xBu;
  }
}
exports.VehicleInputLayer = VehicleInputLayer;
//# sourceMappingURL=VehicleInputLayer.js.map