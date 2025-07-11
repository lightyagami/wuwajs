"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RollDice = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const GlobalData_1 = require("../../../../GlobalData");
const ModelManager_1 = require("../../../../Manager/ModelManager");
class RollDice {
  constructor(i) {
    this.WFc = undefined;
    this.Promise = undefined;
    this.TDe = undefined;
    this.QFc = 5000;
    this.Va1 = 10;
    this.e8 = 0;
    this.KFc = undefined;
    this.TimerCreate = undefined;
    this.TimerRemove = undefined;
    this.Param = undefined;
    this.DiceOutlineBp = undefined;
    this.DiceCamera = undefined;
    this.J_ = i => {
      this.e8 += i;
      if (this.e8 >= this.QFc) {
        this.XFc();
      } else {
        i = this.e8 / this.QFc;
        this.cEo(i);
      }
    };
    this.TimerSystemCreate = () => {
      this.TDe = TimerSystem_1.GameplayTimerSystem.Forever(this.J_, TimerSystem_1.MIN_TIME);
    };
    this.TimerSystemRemove = () => {
      if (this.TDe) {
        TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
        this.TDe = undefined;
      }
    };
    this.FlowSystemCreate = () => {
      this.TDe = TimerSystem_1.FlowTimeTimerSystem.Forever(this.J_, TimerSystem_1.MIN_TIME);
    };
    this.FlowSystemRemove = () => {
      if (this.TDe) {
        TimerSystem_1.FlowTimeTimerSystem.Remove(this.TDe);
        this.TDe = undefined;
      }
    };
    this.Param = i;
  }
  static Create(i) {
    return new RollDice(i);
  }
  async Run() {
    await this.Promise?.Promise;
    this.WFc = await ModelManager_1.ModelManager.RacingBetsModel.LoadDiceMaterialParameterCollection();
    this.Promise = new CustomPromise_1.CustomPromise();
    this.UpdateSceneBind();
    this.Xa1();
    this.XFc();
    await this.Promise?.Promise;
    this.Promise = undefined;
  }
  Xa1() {
    var i = this.Param;
    this.TimerRemove?.();
    this.KFc = FNameUtil_1.FNameUtil.GetDynamicFName("Ani_Process");
    this.cEo(i?.AniProcess ?? 0);
    UE.KismetMaterialLibrary.SetScalarParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.WFc, FNameUtil_1.FNameUtil.GetDynamicFName("DiceNub"), i?.DicePoints.length ?? 0);
    var t = i?.AniNum ?? this.Va1;
    var t = Math.floor(Math.random() * t);
    UE.KismetMaterialLibrary.SetScalarParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.WFc, FNameUtil_1.FNameUtil.GetDynamicFName("Ani_Num"), t);
    i?.DicePoints.forEach((i, t) => {
      this.UpdateDicePoint(i, t);
    });
  }
  UpdateSceneBind() {
    if (this.Param?.BpDiceCase) {
      this.DiceOutlineBp = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName(this.Param.BpDiceCase), 1);
    }
    if (this.Param?.DiceCameraCase) {
      this.DiceCamera = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName(this.Param.DiceCameraCase), 1);
    }
  }
  UpdateDicePoint(i, t = 0) {
    UE.KismetMaterialLibrary.SetScalarParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.WFc, FNameUtil_1.FNameUtil.GetDynamicFName("DicePoints_" + (t + 1)), i);
  }
  cEo(i) {
    UE.KismetMaterialLibrary.SetScalarParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.WFc, this.KFc, i);
  }
  XFc() {
    this.TimerRemove?.();
    this.Promise?.SetResult();
    this.Promise = undefined;
  }
  TickStart() {
    this.e8 = 0;
    this.TimerCreate?.();
  }
}
exports.RollDice = RollDice;
//# sourceMappingURL=RollDice.js.map