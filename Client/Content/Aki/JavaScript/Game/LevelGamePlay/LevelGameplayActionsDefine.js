"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionInteractGravityFlip = exports.ActionInteractFan = exports.ActionTimeTrackControl = exports.ActionBtGm = exports.ActionOpenAdvice = exports.ActionPlotChangeRole = exports.ActionPickupDropItem = exports.ActionBubbleData = exports.ActionPlayBubble = exports.ActionEnterSequenceCamera = exports.ActionPlotInterludeAction = exports.ActionSetSeqCameraTransform = exports.ActionSetNpcPosition = exports.EntityPositionData = exports.ActionMoveToLocation = exports.ActionDeliverQuestBehavior = exports.ActionSubmitQuestBehavior = exports.ActionSendGameplayEvent = exports.ActionCaptureRequest = exports.BreakWeakness = exports.ActionExecution = exports.CommonInteractOption = exports.optionTypeLogString = exports.CommonInteractActions = exports.CommonActionInfo = undefined;
const Protocol_1 = require("../../Core/Define/Net/Protocol");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const IAction_1 = require("../../UniverseEditor/Interface/IAction");
const ModelManager_1 = require("../Manager/ModelManager");
const LevelGeneralContextDefine_1 = require("./LevelGeneralContextDefine");
class CommonActionInfo {
  constructor() {
    this.Name = undefined;
    this.Params = undefined;
    this.ActionGuid = undefined;
  }
}
exports.CommonActionInfo = CommonActionInfo;
class CommonInteractActions {
  constructor() {
    this.Actions = undefined;
    this.Type = "Actions";
  }
}
exports.CommonInteractActions = CommonInteractActions;
exports.optionTypeLogString = {
  [0]: "基础交互",
  1: "动态交互",
  2: "随机交互"
};
class CommonInteractOption {
  constructor() {
    this.Type = undefined;
    this.Icon = undefined;
    this.DoIntactType = undefined;
    this.Range = 0;
    this.Context = undefined;
    this.InstanceId = 0;
    this.OptionType = 0;
    this.ContentType = 0;
    this.CustomOptionType = 0;
    this.k_h = false;
    this.IsUniqueness = false;
    this.UniequenessType = IAction_1.EInteractUniqueness.Closest;
    this.OptionContentId = 0;
    this.SortWeight = 0;
    this.DelayRemove = false;
    this.ConditionCheck = false;
    this.LockTips = undefined;
    this.Offset = undefined;
    this.ConfirmBox = undefined;
  }
  get Disabled() {
    let t = 0;
    if (this.Context?.Type === 6 && this.Context.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest) {
      t = this.Context.TreeConfigId;
    } else if (this.Context?.Type === 2) {
      t = this.Context.QuestId;
    }
    if (t) {
      return ModelManager_1.ModelManager.QuestNewModel.CheckNeedBanQuestPushByFocusMode(t);
    } else {
      return this.k_h;
    }
  }
  Init(t, o, s, i, e, r, c = 0, n = 0, h = false, a) {
    this.InstanceId = t;
    this.Guid = o.Guid;
    this.Type = o.Type;
    this.Icon = o.Icon;
    this.TidContent = o.TidContent;
    this.Condition = o.Condition;
    this.Context = LevelGeneralContextDefine_1.GeneralContext.Copy(s);
    this.Range = i;
    this.DoIntactType = e;
    this.OptionType = r;
    this.CustomOptionType = c;
    this.ContentType = n;
    this.DelayRemove = h;
    this.LockTips = a;
    this.ConfirmBox = o.ConfirmBox;
    this.Offset = Vector_1.Vector.Create(o.InteractPointOffset?.X ?? 0, o.InteractPointOffset?.Y ?? 0, o.InteractPointOffset?.Z ?? 0);
    this.ConditionCheck = false;
    if (o.UniquenessTest) {
      this.IsUniqueness = true;
      this.UniequenessType = o.UniquenessTest;
    } else {
      this.IsUniqueness = false;
    }
  }
  Dispose() {
    if (this.Context) {
      this.Context.Release();
      this.Context = undefined;
    }
    this.Condition = undefined;
    this.TidContent = undefined;
  }
  SetDisable(t) {
    this.k_h = t;
  }
}
exports.CommonInteractOption = CommonInteractOption;
class ActionExecution {
  constructor() {
    this.SuccessEvent = undefined;
  }
}
exports.ActionExecution = ActionExecution;
class BreakWeakness {
  constructor() {
    this.SuccessEvent = undefined;
  }
}
exports.BreakWeakness = BreakWeakness;
class ActionCaptureRequest {
  constructor() {
    this.SuccessEvent = undefined;
  }
}
exports.ActionCaptureRequest = ActionCaptureRequest;
class ActionSendGameplayEvent {
  constructor() {
    this.Tag = undefined;
    this.Both = false;
  }
}
exports.ActionSendGameplayEvent = ActionSendGameplayEvent;
class ActionSubmitQuestBehavior {
  constructor() {
    this.Callback = undefined;
  }
}
exports.ActionSubmitQuestBehavior = ActionSubmitQuestBehavior;
class ActionDeliverQuestBehavior {
  constructor() {
    this.Items = undefined;
    this.DescText = "";
    this.EntityId = 0;
  }
}
exports.ActionDeliverQuestBehavior = ActionDeliverQuestBehavior;
class ActionMoveToLocation {
  constructor() {
    this.ToLocation = undefined;
    this.MoveState = 0;
    this.IsNavigation = false;
    this.IsFly = false;
    this.DebugMode = false;
    this.MoveSpeed = 0;
  }
}
exports.ActionMoveToLocation = ActionMoveToLocation;
class EntityPositionData {
  constructor(t, o) {
    this.EntityId = t;
    this.Pos = o;
  }
}
exports.EntityPositionData = EntityPositionData;
class ActionSetNpcPosition {
  constructor() {
    this.EntityData = undefined;
    this.IsCenterPosition = true;
  }
}
exports.ActionSetNpcPosition = ActionSetNpcPosition;
class ActionSetSeqCameraTransform {
  constructor() {
    this.Transform = undefined;
  }
}
exports.ActionSetSeqCameraTransform = ActionSetSeqCameraTransform;
class ActionPlotInterludeAction {
  constructor() {
    this.FadeInTime = 0;
    this.FadeOutTime = 0;
    this.ActionList = undefined;
  }
}
exports.ActionPlotInterludeAction = ActionPlotInterludeAction;
class ActionEnterSequenceCamera {
  constructor() {
    this.ShouldEnter = false;
  }
}
exports.ActionEnterSequenceCamera = ActionEnterSequenceCamera;
class ActionPlayBubble {
  constructor() {
    this.Condition = undefined;
    this.Flow = undefined;
  }
}
exports.ActionPlayBubble = ActionPlayBubble;
class ActionBubbleData {
  constructor() {
    this.FlowIndex = {
      FlowListName: "",
      FlowId: 0
    };
    this.WaitTime = 0;
  }
}
exports.ActionBubbleData = ActionBubbleData;
class ActionPickupDropItem {
  constructor() {
    this.EntityId = 0;
  }
}
exports.ActionPickupDropItem = ActionPickupDropItem;
class ActionPlotChangeRole {
  constructor() {
    this.Enable = false;
  }
}
exports.ActionPlotChangeRole = ActionPlotChangeRole;
class ActionOpenAdvice {
  constructor() {
    this.EntityId = 0;
  }
}
exports.ActionOpenAdvice = ActionOpenAdvice;
class ActionBtGm {
  constructor() {
    this.ActualEventType = "";
  }
}
exports.ActionBtGm = ActionBtGm;
class ActionTimeTrackControl {
  constructor() {
    this.EntityId = 0;
    this.ConfigIndex = 0;
  }
}
exports.ActionTimeTrackControl = ActionTimeTrackControl;
class ActionInteractFan {
  constructor() {
    this.EntityId = 0;
  }
}
exports.ActionInteractFan = ActionInteractFan;
class ActionInteractGravityFlip {
  constructor() {
    this.EntityId = 0;
  }
}
exports.ActionInteractGravityFlip = ActionInteractGravityFlip;
//# sourceMappingURL=LevelGameplayActionsDefine.js.map