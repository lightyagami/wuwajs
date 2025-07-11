"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionLeisureInteractOptionHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbBounce_1 = require("./FbBounce");
const FbCatapult_1 = require("./FbCatapult");
const FbFailurePoseInteract_1 = require("./FbFailurePoseInteract");
const FbGameplayPose1Interact_1 = require("./FbGameplayPose1Interact");
const FbGameplayPose2Interact_1 = require("./FbGameplayPose2Interact");
const FbGameplayPose3Interact_1 = require("./FbGameplayPose3Interact");
const FbGetUp_1 = require("./FbGetUp");
const FbGlide_1 = require("./FbGlide");
const FbHookLockInteract_1 = require("./FbHookLockInteract");
const FbKiteHookInteract_1 = require("./FbKiteHookInteract");
const FbManipulate_1 = require("./FbManipulate");
const FbSitDown_1 = require("./FbSitDown");
const FbSitOnGround_1 = require("./FbSitOnGround");
const FbSoar_1 = require("./FbSoar");
const FbStandControl_1 = require("./FbStandControl");
const FbStandControl2_1 = require("./FbStandControl2");
const FbSuperCatapult_1 = require("./FbSuperCatapult");
class UnionLeisureInteractOptionHelper {
  static GetUnionLeisureInteractOptionObject(e) {
    switch (e) {
      case fb_action_1.UnionLeisureInteractOption.Bounce:
        return new fb_action_1.Bounce();
      case fb_action_1.UnionLeisureInteractOption.Catapult:
        return new fb_action_1.Catapult();
      case fb_action_1.UnionLeisureInteractOption.FailurePoseInteract:
        return new fb_action_1.FailurePoseInteract();
      case fb_action_1.UnionLeisureInteractOption.GameplayPose1Interact:
        return new fb_action_1.GameplayPose1Interact();
      case fb_action_1.UnionLeisureInteractOption.GameplayPose2Interact:
        return new fb_action_1.GameplayPose2Interact();
      case fb_action_1.UnionLeisureInteractOption.GameplayPose3Interact:
        return new fb_action_1.GameplayPose3Interact();
      case fb_action_1.UnionLeisureInteractOption.GetUp:
        return new fb_action_1.GetUp();
      case fb_action_1.UnionLeisureInteractOption.Glide:
        return new fb_action_1.Glide();
      case fb_action_1.UnionLeisureInteractOption.HookLockInteract:
        return new fb_action_1.HookLockInteract();
      case fb_action_1.UnionLeisureInteractOption.KiteHookInteract:
        return new fb_action_1.KiteHookInteract();
      case fb_action_1.UnionLeisureInteractOption.Manipulate:
        return new fb_action_1.Manipulate();
      case fb_action_1.UnionLeisureInteractOption.SitDown:
        return new fb_action_1.SitDown();
      case fb_action_1.UnionLeisureInteractOption.SitOnGround:
        return new fb_action_1.SitOnGround();
      case fb_action_1.UnionLeisureInteractOption.Soar:
        return new fb_action_1.Soar();
      case fb_action_1.UnionLeisureInteractOption.StandControl:
        return new fb_action_1.StandControl();
      case fb_action_1.UnionLeisureInteractOption.StandControl2:
        return new fb_action_1.StandControl2();
      case fb_action_1.UnionLeisureInteractOption.SuperCatapult:
        return new fb_action_1.SuperCatapult();
      default:
        return;
    }
  }
  static ReadUnionLeisureInteractOption(e, t) {
    if (t !== undefined) {
      switch (e) {
        case fb_action_1.UnionLeisureInteractOption.Bounce:
          return FbBounce_1.FbBounce.Create(t);
        case fb_action_1.UnionLeisureInteractOption.Catapult:
          return FbCatapult_1.FbCatapult.Create(t);
        case fb_action_1.UnionLeisureInteractOption.FailurePoseInteract:
          return FbFailurePoseInteract_1.FbFailurePoseInteract.Create(t);
        case fb_action_1.UnionLeisureInteractOption.GameplayPose1Interact:
          return FbGameplayPose1Interact_1.FbGameplayPose1Interact.Create(t);
        case fb_action_1.UnionLeisureInteractOption.GameplayPose2Interact:
          return FbGameplayPose2Interact_1.FbGameplayPose2Interact.Create(t);
        case fb_action_1.UnionLeisureInteractOption.GameplayPose3Interact:
          return FbGameplayPose3Interact_1.FbGameplayPose3Interact.Create(t);
        case fb_action_1.UnionLeisureInteractOption.GetUp:
          return FbGetUp_1.FbGetUp.Create(t);
        case fb_action_1.UnionLeisureInteractOption.Glide:
          return FbGlide_1.FbGlide.Create(t);
        case fb_action_1.UnionLeisureInteractOption.HookLockInteract:
          return FbHookLockInteract_1.FbHookLockInteract.Create(t);
        case fb_action_1.UnionLeisureInteractOption.KiteHookInteract:
          return FbKiteHookInteract_1.FbKiteHookInteract.Create(t);
        case fb_action_1.UnionLeisureInteractOption.Manipulate:
          return FbManipulate_1.FbManipulate.Create(t);
        case fb_action_1.UnionLeisureInteractOption.SitDown:
          return FbSitDown_1.FbSitDown.Create(t);
        case fb_action_1.UnionLeisureInteractOption.SitOnGround:
          return FbSitOnGround_1.FbSitOnGround.Create(t);
        case fb_action_1.UnionLeisureInteractOption.Soar:
          return FbSoar_1.FbSoar.Create(t);
        case fb_action_1.UnionLeisureInteractOption.StandControl:
          return FbStandControl_1.FbStandControl.Create(t);
        case fb_action_1.UnionLeisureInteractOption.StandControl2:
          return FbStandControl2_1.FbStandControl2.Create(t);
        case fb_action_1.UnionLeisureInteractOption.SuperCatapult:
          return FbSuperCatapult_1.FbSuperCatapult.Create(t);
        default:
          return;
      }
    }
  }
}
exports.UnionLeisureInteractOptionHelper = UnionLeisureInteractOptionHelper;
//# sourceMappingURL=UnionLeisureInteractOptionHelper.js.map