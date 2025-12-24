"use strict";

var __decorate = this && this.__decorate || function (t, i, o, e) {
  var s;
  var r = arguments.length;
  var h = r < 3 ? i : e === null ? e = Object.getOwnPropertyDescriptor(i, o) : e;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, i, o, e);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (s = t[n]) {
        h = (r < 3 ? s(h) : r > 3 ? s(i, o, h) : s(i, o)) || h;
      }
    }
  }
  if (r > 3 && h) {
    Object.defineProperty(i, o, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterFlowComponent = exports.DEFAULT_BUBBLE_LEAVE_RANGE = exports.DEFAULT_BUBBLE_ENTER_RANGE = undefined;
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../../../UniverseEditor/Interface/IComponent");
const Global_1 = require("../../../../../Global");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const CharacterFlowLogic_1 = require("./CharacterFlowLogic");
const DynamicFlowController_1 = require("./DynamicFlowController");
exports.DEFAULT_BUBBLE_ENTER_RANGE = 500;
exports.DEFAULT_BUBBLE_LEAVE_RANGE = 1500;
let CharacterFlowComponent = class CharacterFlowComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ActorComp = undefined;
    this.HeadInfoComp = undefined;
    this.FlowLogic = undefined;
    this.IsInit = false;
    this.MinRangeSquared = 0;
    this.MaxRangeSquared = 0;
    this.IsEnter = false;
    this.FlowData = undefined;
    this.IsPlayDynamicFlow = false;
  }
  OnStart() {
    this.ActorComp = this.Entity.GetComponent(1);
    this.HeadInfoComp = this.Entity.GetComponent(85);
    var t = this.ActorComp?.CreatureData.GetPbEntityInitData();
    if (t) {
      this.FlowData = (0, IComponent_1.getComponent)(t.ComponentsData, "BubbleComponent");
      this.InitFlowLogic(this.FlowData);
      this.InitCachedDynamicFlow();
      this.HeadInfoComp?.UpdateDialogScale(this.FlowData?.Scale ?? 0.5);
    }
    return true;
  }
  OnActivate() {
    var t;
    if (this.ActorComp && ((t = new DynamicFlowController_1.DynamicFlowActorInfo()).PbDataId = this.ActorComp.CreatureData.GetPbDataId(), t.CreatureId = this.ActorComp.CreatureData.GetCreatureDataId(), t = DynamicFlowController_1.DynamicFlowController.GetDynamicFlowByMasterActorInfo(t))) {
      this.PlayDynamicFlowBegin(t);
    }
  }
  OnClear() {
    var t;
    if (this.IsPlayDynamicFlow) {
      (t = new DynamicFlowController_1.DynamicFlowActorInfo()).PbDataId = this.ActorComp.CreatureData.GetPbDataId();
      t.CreatureId = this.ActorComp.CreatureData.GetCreatureDataId();
      DynamicFlowController_1.DynamicFlowController.RemoveDynamicFlow(t);
    }
    return true;
  }
  ResetBaseInfo() {
    var t;
    var i;
    if (this.FlowData) {
      t = this.FlowData.EnterRange;
      i = this.FlowData.LeaveRange;
      this.MinRangeSquared = t * t;
      this.MaxRangeSquared = i * i;
    }
  }
  InitFlowLogic(t) {
    if (t) {
      this.FlowLogic = new CharacterFlowLogic_1.CharacterFlowLogic(this.ActorComp, t);
      this.InitFlowLogicRange(this.FlowData?.EnterRange, this.FlowData?.LeaveRange);
      this.IsEnter = false;
      this.IsInit = true;
    }
  }
  InitFlowLogicRange(t, i) {
    return !!this.FlowData && !!this.FlowLogic && !(t = t ?? exports.DEFAULT_BUBBLE_ENTER_RANGE, i = i ?? exports.DEFAULT_BUBBLE_LEAVE_RANGE, this.MinRangeSquared = t * t, this.MaxRangeSquared = i * i, 0);
  }
  InitCachedDynamicFlow() {
    var t = this.ActorComp.CreatureData;
    var i = t.ComponentDataMap.get("Oys")?.Oys?.RIs;
    if (i) {
      for (const s of i) {
        var o = ConfigManager_1.ConfigManager.BubbleConfig.GetBubbleData(s.LIs);
        if (o) {
          var e = t.GetCreatureDataId();
          var e = o.EntityIds.length ? DynamicFlowController_1.DynamicFlowController.CreateCharacterFlowData(o) : DynamicFlowController_1.DynamicFlowController.CreateCharacterFlowDataForMasterCreatureId(e, o);
          DynamicFlowController_1.DynamicFlowController.AddDynamicFlow(e);
          break;
        }
      }
    }
  }
  CheckCondition() {
    return !!this.FlowData && !!this.IsInit && (!!this.FlowLogic.HasValidFlow() || !!this.IsPlayDynamicFlow) && !!this.ActorComp?.Owner?.IsValid() && !!Global_1.Global.BaseCharacter && (!this.ActorComp.Owner.bHidden && !!this.HeadInfoComp?.CanShowHeadItem() || !(this.ForceStopFlow(), 1));
  }
  OnTick(t) {
    var i;
    if (this.CheckCondition()) {
      i = Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy;
      if ((i = Vector_1.Vector.DistSquared2D(i, this.ActorComp.ActorLocationProxy)) < this.MinRangeSquared) {
        if (!this.IsEnter && !this.FlowLogic.IsPlaying) {
          this.FlowLogic.EnableUpdate = true;
        }
        this.IsEnter = true;
        this.FlowLogic.IsPause = false;
      } else if (i < this.MaxRangeSquared) {
        this.IsEnter = false;
        this.FlowLogic.IsPause = true;
      } else {
        this.ForceStopFlow();
      }
      this.FlowLogic.Tick(t * MathUtils_1.MathUtils.MillisecondToSecond);
    }
  }
  RemoveFlowActions() {
    this.FlowLogic?.HideDialogueText();
  }
  ResetFlowPlayCoolDownTime() {
    if (this.FlowLogic) {
      this.FlowLogic.ResetWaitTime();
    }
  }
  ForceStopFlow() {
    this.IsEnter = false;
    if (this.FlowLogic && (this.FlowLogic.IsPause = true, this.FlowLogic.IsPlaying)) {
      this.FlowLogic.StopFlow();
    }
  }
  IsPlayingFlow() {
    return this.FlowLogic?.IsShowDialogue() ?? false;
  }
  PlayDynamicFlowBegin(t) {
    this.ForceStopFlow();
    this.IsPlayDynamicFlow = true;
    this.InitFlowLogicRange(t.BubbleData?.EnterRadius, t.BubbleData?.LeaveRadius);
    this.ResetFlowPlayCoolDownTime();
  }
  PlayDynamicFlowEnd() {
    if (this.IsPlayDynamicFlow) {
      this.ForceStopFlow();
      this.IsPlayDynamicFlow = false;
      this.InitFlowLogicRange(this.FlowData?.EnterRange, this.FlowData?.LeaveRange);
    }
  }
};
CharacterFlowComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(31)], CharacterFlowComponent);
exports.CharacterFlowComponent = CharacterFlowComponent; //# sourceMappingURL=CharacterFlowComponent.js.map