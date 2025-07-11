"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionReadHelper = exports.requireModule = undefined;
const fb_action_1 = require("../../EntityFb/fb-action");
const fb_action_2 = require("../../EntityFb/fb-action");
const Log_1 = require("../../../../Core/Common/Log");
const ImportHelper_1 = require("../ImportHelper");
const FB_ACTION_MODULE_PATH = "../../EntityFb/fb-action";
const requireModule = o => require(o);
exports.requireModule = requireModule;
class ActionReadHelper {
  static ReadActionParams(o) {
    if (o) {
      var t = o.paramsExtActionPage();
      if (t !== -1) {
        return ActionReadHelper["ReadActionParams" + t](o);
      }
    }
  }
  static ReadActionParams0(o) {
    if (o) {
      var t = o.params0Type();
      switch (t) {
        case fb_action_1.UnionActionParams0.Interact:
          var e = "Interact";
          var _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (_) {
            _ = o.params0(_);
            r = "./FbInteract";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbInteract.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.AcceptCurrentQuest:
          var a = "AcceptCurrentQuest";
          var _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (_) {
            r = o.params0(_);
            e = "./FbAcceptCurrentQuest";
            if (_ = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return _.FbAcceptCurrentQuest.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.AddFlowInteractOption:
          var _ = "AddFlowInteractOption";
          var r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (r) {
            e = o.params0(r);
            a = "./FbAddFlowInteractOption";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbAddFlowInteractOption.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.AdjustTodTime:
          var r = "AdjustTodTime";
          var e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (e) {
            a = o.params0(e);
            _ = "./FbAdjustTodTime";
            if (e = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return e.FbAdjustTodTime.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.AwakeEntity:
          var e = "AwakeEntity";
          var a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (a) {
            _ = o.params0(a);
            r = "./FbAwakeEntity";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbAwakeEntity.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.CalculateVar:
          a = "CalculateVar";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (_) {
            r = o.params0(_);
            e = "./FbCalculateVar";
            if (_ = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return _.FbCalculateVar.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.RandomVar:
          _ = "RandomVar";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (r) {
            e = o.params0(r);
            a = "./FbRandomVar";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbRandomVar.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.CallByCondition:
          r = "CallByCondition";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (e) {
            a = o.params0(e);
            _ = "./FbCallByCondition";
            if (e = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return e.FbCallByCondition.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.CallFunction:
          e = "CallFunction";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (a) {
            _ = o.params0(a);
            r = "./FbCallFunction";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbCallFunction.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.CameraLookAt:
          a = "CameraLookAt";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (_) {
            r = o.params0(_);
            e = "./FbCameraLookAt";
            if (_ = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return _.FbCameraLookAt.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.StopCameraLookAt:
          _ = "StopCameraLookAt";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (r) {
            e = o.params0(r);
            a = "./FbStopCameraLookAt";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbStopCameraLookAt.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.EnableHostility:
          r = "EnableHostility";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (e) {
            a = o.params0(e);
            _ = "./FbEnableHostility";
            if (e = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return e.FbEnableHostility.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ChangeActorState:
          e = "ChangeActorState";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (a) {
            _ = o.params0(a);
            r = "./FbChangeActorState";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbChangeActorState.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ChangeBehaviorState:
          a = "ChangeBehaviorState";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (_) {
            r = o.params0(_);
            e = "./FbChangeBehaviorState";
            if (_ = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return _.FbChangeBehaviorState.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ChangeEntityState:
          _ = o.paramsExtType0();
          r = "./UnionChangeEntityStateHelper";
          e = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule);
          if (e) {
            a = e.UnionChangeEntityStateHelper.GetUnionChangeEntityStateObject(_);
            return e.UnionChangeEntityStateHelper.ReadUnionChangeEntityState(_, o.params0(a));
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "获取unionModule失败", ["ParamsType", t], ["UnionModulePath", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ChangeNpcPerformState:
          e = "ChangeNpcPerformState";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (_) {
            a = o.params0(_);
            r = "./FbChangeNpcPerformState";
            if (_ = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return _.FbChangeNpcPerformState.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ChangeInteractOptionText:
          _ = "ChangeInteractOptionText";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (a) {
            r = o.params0(a);
            e = "./FbChangeInteractOptionText";
            if (a = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return a.FbChangeInteractOptionText.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ChangeOtherState:
          a = "ChangeOtherState";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (r) {
            e = o.params0(r);
            _ = "./FbChangeOtherState";
            if (r = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return r.FbChangeOtherState.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ChangeRandomState:
          r = "ChangeRandomState";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (e) {
            _ = o.params0(e);
            a = "./FbChangeRandomState";
            if (e = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return e.FbChangeRandomState.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ChangeState:
          e = "ChangeState";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (_) {
            a = o.params0(_);
            r = "./FbChangeState";
            if (_ = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return _.FbChangeState.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.Collect:
          _ = "Collect";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (a) {
            r = o.params0(a);
            e = "./FbCollect";
            if (a = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return a.FbCollect.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.CompleteChildQuest:
          a = "CompleteChildQuest";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (r) {
            e = o.params0(r);
            _ = "./FbCompleteChildQuest";
            if (r = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return r.FbCompleteChildQuest.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.Destroy:
          r = "Destroy";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (e) {
            _ = o.params0(e);
            a = "./FbDestroy";
            if (e = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return e.FbDestroy.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.DestroyAllChild:
          e = "DestroyAllChild";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (_) {
            a = o.params0(_);
            r = "./FbDestroyAllChild";
            if (_ = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return _.FbDestroyAllChild.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.DestroyEntity:
          _ = "DestroyEntity";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (a) {
            r = o.params0(a);
            e = "./FbDestroyEntity";
            if (a = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return a.FbDestroyEntity.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.DestroySelf:
          a = "DestroySelf";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (r) {
            e = o.params0(r);
            _ = "./FbDestroySelf";
            if (r = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return r.FbDestroySelf.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.DoCalculate:
          r = "DoCalculate";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (e) {
            _ = o.params0(e);
            a = "./FbDoCalculate";
            if (e = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return e.FbDoCalculate.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.EnableFunction:
          e = "EnableFunction";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (_) {
            a = o.params0(_);
            r = "./FbEnableFunction";
            if (_ = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return _.FbEnableFunction.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.FaceToPos:
          _ = "FaceToPos";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (a) {
            r = o.params0(a);
            e = "./FbFaceToPos";
            if (a = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return a.FbFaceToPos.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.FinishDoInteract:
          a = "FinishDoInteract";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (r) {
            e = o.params0(r);
            _ = "./FbFinishDoInteract";
            if (r = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return r.FbFinishDoInteract.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.FinishState:
          r = "FinishState";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (e) {
            _ = o.params0(e);
            a = "./FbFinishState";
            if (e = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return e.FbFinishState.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.FinishTalk:
          e = "FinishTalk";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (_) {
            a = o.params0(_);
            r = "./FbFinishTalk";
            if (_ = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return _.FbFinishTalk.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.GetItem:
          _ = "GetItem";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (a) {
            r = o.params0(a);
            e = "./FbGetItem";
            if (a = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return a.FbGetItem.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.DestroyQuestItem:
          a = "DestroyQuestItem";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (r) {
            e = o.params0(r);
            _ = "./FbDestroyQuestItem";
            if (r = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return r.FbDestroyQuestItem.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.GuideTrigger:
          r = "GuideTrigger";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (e) {
            _ = o.params0(e);
            a = "./FbGuideTrigger";
            if (e = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return e.FbGuideTrigger.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.CompleteGuide:
          e = "CompleteGuide";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (_) {
            a = o.params0(_);
            r = "./FbCompleteGuide";
            if (_ = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return _.FbCompleteGuide.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.Invoke:
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, "Invoke");
          if (_) {
            a = o.params0(_);
            r = "./FbInvoke";
            if (e = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return e.FbInvoke.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", "Invoke"]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.JumpTalk:
          _ = "JumpTalk";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (e) {
            a = o.params0(e);
            r = "./FbJumpTalk";
            if (e = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return e.FbJumpTalk.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.Log:
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, "Log");
          if (e) {
            a = o.params0(e);
            r = "./FbLog";
            if (_ = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return _.FbLog.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", "Log"]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.MoveToPosA:
          e = "MoveToPosA";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (_) {
            a = o.params0(_);
            r = "./FbMoveToPosA";
            if (_ = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return _.FbMoveToPosA.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.MoveWithSpline:
          _ = "MoveWithSpline";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (a) {
            r = o.params0(a);
            e = "./FbMoveWithSpline";
            if (a = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return a.FbMoveWithSpline.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.NewMoveWithSpline:
          a = "NewMoveWithSpline";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (r) {
            e = o.params0(r);
            _ = "./FbNewMoveWithSpline";
            if (r = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return r.FbNewMoveWithSpline.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.StopNewMoveWithSpline:
          r = "StopNewMoveWithSpline";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (e) {
            _ = o.params0(e);
            a = "./FbStopNewMoveWithSpline";
            if (e = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return e.FbStopNewMoveWithSpline.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.CharacterMoveToPoint:
          e = "CharacterMoveToPoint";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (_) {
            a = o.params0(_);
            r = "./FbCharacterMoveToPoint";
            if (_ = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return _.FbCharacterMoveToPoint.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.OpenSystemBoard:
          _ = "OpenSystemBoard";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (a) {
            r = o.params0(a);
            e = "./FbOpenSystemBoard";
            if (a = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return a.FbOpenSystemBoard.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.OpenSystemFunction:
          a = "OpenSystemFunction";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (r) {
            e = o.params0(r);
            _ = "./FbOpenSystemFunction";
            if (r = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return r.FbOpenSystemFunction.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.PlayCustomSequence:
          r = "PlayCustomSequence";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (e) {
            _ = o.params0(e);
            a = "./FbPlayCustomSequence";
            if (e = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return e.FbPlayCustomSequence.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.PlayerLookAt:
          e = "PlayerLookAt";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (_) {
            a = o.params0(_);
            r = "./FbPlayerLookAt";
            if (_ = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return _.FbPlayerLookAt.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.EntityLookAt:
          _ = "EntityLookAt";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (a) {
            r = o.params0(a);
            e = "./FbEntityLookAt";
            if (a = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return a.FbEntityLookAt.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.CharacterLookAt:
          a = "CharacterLookAt";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (r) {
            e = o.params0(r);
            _ = "./FbCharacterLookAt";
            if (r = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return r.FbCharacterLookAt.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.EntityTurnTo:
          r = "EntityTurnTo";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (e) {
            _ = o.params0(e);
            a = "./FbEntityTurnTo";
            if (e = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return e.FbEntityTurnTo.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.PlayFlow:
          e = "PlayFlow";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (_) {
            a = o.params0(_);
            r = "./FbPlayFlow";
            if (_ = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return _.FbPlayFlow.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.PlayMovie:
          _ = "PlayMovie";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (a) {
            r = o.params0(a);
            e = "./FbPlayMovie";
            if (a = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return a.FbPlayMovie.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.PlayEffect:
          a = "PlayEffect";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (r) {
            e = o.params0(r);
            _ = "./FbPlayEffect";
            if (r = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return r.FbPlayEffect.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.PlayCommonEffect:
          r = "PlayCommonEffect";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (e) {
            _ = o.params0(e);
            a = "./FbPlayCommonEffect";
            if (e = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return e.FbPlayCommonEffect.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.PlayMontage:
          e = "PlayMontage";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (_) {
            a = o.params0(_);
            r = "./FbPlayMontage";
            if (_ = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return _.FbPlayMontage.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.PlaySequenceData:
          _ = "PlaySequenceData";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (a) {
            r = o.params0(a);
            e = "./FbPlaySequenceData";
            if (a = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return a.FbPlaySequenceData.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.PlayerInput:
          a = "PlayerInput";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (r) {
            e = o.params0(r);
            _ = "./FbPlayerInput";
            if (r = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return r.FbPlayerInput.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.Prompt:
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, "Prompt");
          if (r) {
            e = o.params0(r);
            _ = "./FbPrompt";
            if (a = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return a.FbPrompt.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", "Prompt"]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.AddPlayBubble:
          r = "AddPlayBubble";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (a) {
            e = o.params0(a);
            _ = "./FbAddPlayBubble";
            if (a = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return a.FbAddPlayBubble.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.PlayBubble:
          a = "PlayBubble";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (e) {
            _ = o.params0(e);
            r = "./FbPlayBubble";
            if (e = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return e.FbPlayBubble.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ClearPlayBubble:
          e = "ClearPlayBubble";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (_) {
            r = o.params0(_);
            a = "./FbClearPlayBubble";
            if (_ = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return _.FbClearPlayBubble.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.EnableAI:
          _ = "EnableAI";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (r) {
            a = o.params0(r);
            e = "./FbEnableAI";
            if (r = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return r.FbEnableAI.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.RemoveFlowInteractOption:
          r = "RemoveFlowInteractOption";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (a) {
            e = o.params0(a);
            _ = "./FbRemoveFlowInteractOption";
            if (a = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return a.FbRemoveFlowInteractOption.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SendNpcMail:
          a = "SendNpcMail";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (e) {
            _ = o.params0(e);
            r = "./FbSendNpcMail";
            if (e = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return e.FbSendNpcMail.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SetBehaviorIsPaused:
          e = "SetBehaviorIsPaused";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (_) {
            r = o.params0(_);
            a = "./FbSetBehaviorIsPaused";
            if (_ = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return _.FbSetBehaviorIsPaused.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SetCameraMode:
          _ = "SetCameraMode";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (r) {
            a = o.params0(r);
            e = "./FbSetCameraMode";
            if (r = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return r.FbSetCameraMode.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SetEntityVisible:
          r = "SetEntityVisible";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (a) {
            e = o.params0(a);
            _ = "./FbSetEntityVisible";
            if (a = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return a.FbSetEntityVisible.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SetEntityClientVisible:
          a = "SetEntityClientVisible";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (e) {
            _ = o.params0(e);
            r = "./FbSetEntityClientVisible";
            if (e = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return e.FbSetEntityClientVisible.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SetEntityClientVisibleSave:
          e = "SetEntityClientVisibleSave";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (_) {
            r = o.params0(_);
            a = "./FbSetEntityClientVisibleSave";
            if (_ = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return _.FbSetEntityClientVisibleSave.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SetHeadIconVisible:
          _ = "SetHeadIconVisible";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (r) {
            a = o.params0(r);
            e = "./FbSetHeadIconVisible";
            if (r = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return r.FbSetHeadIconVisible.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SetMoveSpeed:
          r = "SetMoveSpeed";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (a) {
            e = o.params0(a);
            _ = "./FbSetMoveSpeed";
            if (a = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return a.FbSetMoveSpeed.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SetNumberVar:
          a = "SetNumberVar";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (e) {
            _ = o.params0(e);
            r = "./FbSetNumberVar";
            if (e = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return e.FbSetNumberVar.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SetPlotMode:
          e = "SetPlotMode";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (_) {
            r = o.params0(_);
            a = "./FbSetPlotMode";
            if (_ = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return _.FbSetPlotMode.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SetPosA:
          _ = "SetPosA";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (r) {
            a = o.params0(r);
            e = "./FbSetPosA";
            if (r = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return r.FbSetPosA.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SetVar:
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, "SetVar");
          if (r) {
            a = o.params0(r);
            e = "./FbSetVar";
            if (_ = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return _.FbSetVar.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", "SetVar"]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ShowCenterText:
          r = "ShowCenterText";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (_) {
            a = o.params0(_);
            e = "./FbShowCenterText";
            if (_ = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return _.FbShowCenterText.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ShowMessage:
          _ = "ShowMessage";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (a) {
            e = o.params0(a);
            r = "./FbShowMessage";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbShowMessage.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ShowTalk:
          a = "ShowTalk";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (e) {
            r = o.params0(e);
            _ = "./FbShowTalk";
            if (e = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return e.FbShowTalk.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SimpleMove:
          e = "SimpleMove";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (r) {
            _ = o.params0(r);
            a = "./FbSimpleMove";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbSimpleMove.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SpawnChild:
          r = "SpawnChild";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (_) {
            a = o.params0(_);
            e = "./FbSpawnChild";
            if (_ = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return _.FbSpawnChild.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SpawnEntity:
          _ = "SpawnEntity";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (a) {
            e = o.params0(a);
            r = "./FbSpawnEntity";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbSpawnEntity.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SyncVarToActorState:
          a = "SyncVarToActorState";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (e) {
            r = o.params0(e);
            _ = "./FbSyncVarToActorState";
            if (e = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return e.FbSyncVarToActorState.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.Wait:
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, "Wait");
          if (e) {
            r = o.params0(e);
            _ = "./FbWait";
            if (a = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return a.FbWait.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", "Wait"]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.AddBuffToEntity:
          e = "AddBuffToEntity";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (a) {
            r = o.params0(a);
            _ = "./FbAddBuffToEntity";
            if (a = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return a.FbAddBuffToEntity.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.AddBuffToPlayer:
          a = "AddBuffToPlayer";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (r) {
            _ = o.params0(r);
            e = "./FbAddBuffToPlayer";
            if (r = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return r.FbAddBuffToPlayer.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.AddBuffToFollowShooter:
          r = "AddBuffToFollowShooter";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (_) {
            e = o.params0(_);
            a = "./FbAddBuffToFollowShooter";
            if (_ = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return _.FbAddBuffToFollowShooter.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.LockEntity:
          _ = "LockEntity";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (e) {
            a = o.params0(e);
            r = "./FbLockEntity";
            if (e = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return e.FbLockEntity.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.UnlockEntity:
          e = "UnlockEntity";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (a) {
            r = o.params0(a);
            _ = "./FbUnlockEntity";
            if (a = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return a.FbUnlockEntity.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SetForceLock:
          a = "SetForceLock";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (r) {
            _ = o.params0(r);
            e = "./FbSetForceLock";
            if (r = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return r.FbSetForceLock.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SetAreaState:
          r = "SetAreaState";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (_) {
            e = o.params0(_);
            a = "./FbSetAreaState";
            if (_ = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return _.FbSetAreaState.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SetWuYinQuState:
          _ = "SetWuYinQuState";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (e) {
            a = o.params0(e);
            r = "./FbSetWuYinQuState";
            if (e = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return e.FbSetWuYinQuState.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.RemoveBuffFromEntity:
          e = "RemoveBuffFromEntity";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (a) {
            r = o.params0(a);
            _ = "./FbRemoveBuffFromEntity";
            if (a = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return a.FbRemoveBuffFromEntity.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.RemoveBuffFromPlayer:
          a = "RemoveBuffFromPlayer";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (r) {
            _ = o.params0(r);
            e = "./FbRemoveBuffFromPlayer";
            if (r = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return r.FbRemoveBuffFromPlayer.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SetPlayerMoveControl:
          r = "SetPlayerMoveControl";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (_) {
            e = o.params0(_);
            a = "./FbSetPlayerMoveControl";
            if (_ = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return _.FbSetPlayerMoveControl.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.UnlockTeleportTrigger:
          _ = "UnlockTeleportTrigger";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (e) {
            a = o.params0(e);
            r = "./FbUnlockTeleportTrigger";
            if (e = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return e.FbUnlockTeleportTrigger.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ChangeTeamPosition:
          e = "ChangeTeamPosition";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (a) {
            r = o.params0(a);
            _ = "./FbChangeTeamPosition";
            if (a = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return a.FbChangeTeamPosition.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ClaimLevelPlayReward:
          a = "ClaimLevelPlayReward";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (r) {
            _ = o.params0(r);
            e = "./FbClaimLevelPlayReward";
            if (r = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return r.FbClaimLevelPlayReward.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SetReviveRegion:
          r = "SetReviveRegion";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (_) {
            e = o.params0(_);
            a = "./FbSetReviveRegion";
            if (_ = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return _.FbSetReviveRegion.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.PromptQuestChapterUI:
          _ = "PromptQuestChapterUI";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (e) {
            a = o.params0(e);
            r = "./FbPromptQuestChapterUI";
            if (e = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return e.FbPromptQuestChapterUI.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.FireBullet:
          e = "FireBullet";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (a) {
            r = o.params0(a);
            _ = "./FbFireBullet";
            if (a = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return a.FbFireBullet.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.FireBulletEffect:
          a = "FireBulletEffect";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (r) {
            _ = o.params0(r);
            e = "./FbFireBulletEffect";
            if (r = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return r.FbFireBulletEffect.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SetPlayerPos:
          r = "SetPlayerPos";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (_) {
            e = o.params0(_);
            a = "./FbSetPlayerPos";
            if (_ = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return _.FbSetPlayerPos.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ClientSetPlayerPos:
          _ = "ClientSetPlayerPos";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (e) {
            a = o.params0(e);
            r = "./FbClientSetPlayerPos";
            if (e = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return e.FbClientSetPlayerPos.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ClientPreEnableSubLevels:
          e = "ClientPreEnableSubLevels";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (a) {
            r = o.params0(a);
            _ = "./FbClientPreEnableSubLevels";
            if (a = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return a.FbClientPreEnableSubLevels.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ChangeSelfEntityState:
          a = "ChangeSelfEntityState";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (r) {
            _ = o.params0(r);
            e = "./FbChangeSelfEntityState";
            if (r = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return r.FbChangeSelfEntityState.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.InterludeActions:
          r = "InterludeActions";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (_) {
            e = o.params0(_);
            a = "./FbInterludeActions";
            if (_ = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return _.FbInterludeActions.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.AddBuffToTriggeredEntity:
          _ = "AddBuffToTriggeredEntity";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (e) {
            a = o.params0(e);
            r = "./FbAddBuffToTriggeredEntity";
            if (e = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return e.FbAddBuffToTriggeredEntity.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.RemoveBuffToTriggeredEntity:
          e = "RemoveBuffToTriggeredEntity";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (a) {
            r = o.params0(a);
            _ = "./FbRemoveBuffToTriggeredEntity";
            if (a = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return a.FbRemoveBuffToTriggeredEntity.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.DetectTrigger:
          a = "DetectTrigger";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (r) {
            _ = o.params0(r);
            e = "./FbDetectTrigger";
            if (r = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return r.FbDetectTrigger.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ItemFoundationMatch:
          r = "ItemFoundationMatch";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (_) {
            e = o.params0(_);
            a = "./FbItemFoundationMatch";
            if (_ = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return _.FbItemFoundationMatch.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SetBattleState:
          _ = "SetBattleState";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (e) {
            a = o.params0(e);
            r = "./FbSetBattleState";
            if (e = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return e.FbSetBattleState.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ExecBattleAction:
          e = "ExecBattleAction";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (a) {
            r = o.params0(a);
            _ = "./FbExecBattleAction";
            if (a = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return a.FbExecBattleAction.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.WaitBattleCondition:
          a = "WaitBattleCondition";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (r) {
            _ = o.params0(r);
            e = "./FbWaitBattleCondition";
            if (r = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return r.FbWaitBattleCondition.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.UnlockSystemItem:
          r = "UnlockSystemItem";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (_) {
            e = o.params0(_);
            a = "./FbUnlockSystemItem";
            if (_ = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return _.FbUnlockSystemItem.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.RunActions:
          _ = "RunActions";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (e) {
            a = o.params0(e);
            r = "./FbRunActions";
            if (e = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return e.FbRunActions.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.CommonTip:
          e = "CommonTip";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (a) {
            r = o.params0(a);
            _ = "./FbCommonTip";
            if (a = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return a.FbCommonTip.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.CommonTip2:
          a = "CommonTip2";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (r) {
            _ = o.params0(r);
            e = "./FbCommonTip2";
            if (r = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return r.FbCommonTip2.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.EnableNearbyTracking:
          r = "EnableNearbyTracking";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (_) {
            e = o.params0(_);
            a = "./FbEnableNearbyTracking";
            if (_ = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return _.FbEnableNearbyTracking.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.EnableLevelPlay:
          _ = "EnableLevelPlay";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (e) {
            a = o.params0(e);
            r = "./FbEnableLevelPlay";
            if (e = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return e.FbEnableLevelPlay.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.UnLimitPlayerOperation:
          e = "UnLimitPlayerOperation";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (a) {
            r = o.params0(a);
            _ = "./FbUnLimitPlayerOperation";
            if (a = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return a.FbUnLimitPlayerOperation.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.LimitPlayerOperation:
          a = "LimitPlayerOperation";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (r) {
            _ = o.params0(r);
            e = "./FbLimitPlayerOperation";
            if (r = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return r.FbLimitPlayerOperation.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SetPlayerOperationRestriction:
          r = o.paramsExtType0();
          _ = "./UnionSetPlayerOperationRestrictionHelper";
          e = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule);
          if (e) {
            a = e.UnionSetPlayerOperationRestrictionHelper.GetUnionSetPlayerOperationRestrictionObject(r);
            return e.UnionSetPlayerOperationRestrictionHelper.ReadUnionSetPlayerOperationRestriction(r, o.params0(a));
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "获取unionModule失败", ["ParamsType", t], ["UnionModulePath", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.LeisureInteract:
          e = "LeisureInteract";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (r) {
            a = o.params0(r);
            _ = "./FbLeisureInteract";
            if (r = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return r.FbLeisureInteract.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.NpcLeisureInteract:
          r = "NpcLeisureInteract";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (a) {
            _ = o.params0(a);
            e = "./FbNpcLeisureInteract";
            if (a = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return a.FbNpcLeisureInteract.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ChangePhantom:
          a = "ChangePhantom";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (_) {
            e = o.params0(_);
            r = "./FbChangePhantom";
            if (_ = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return _.FbChangePhantom.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.RestorePhantom:
          _ = "RestorePhantom";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (e) {
            r = o.params0(e);
            a = "./FbRestorePhantom";
            if (e = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return e.FbRestorePhantom.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.TakePlotPhoto:
          e = "TakePlotPhoto";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (r) {
            a = o.params0(r);
            _ = "./FbTakePlotPhoto";
            if (r = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return r.FbTakePlotPhoto.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.OpenQteAction:
          r = "OpenQteAction";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (a) {
            _ = o.params0(a);
            e = "./FbOpenQteAction";
            if (a = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return a.FbOpenQteAction.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.PreloadAction:
          a = "PreloadAction";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (_) {
            e = o.params0(_);
            r = "./FbPreloadAction";
            if (_ = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return _.FbPreloadAction.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.RemovePreloadResourceAction:
          _ = "RemovePreloadResourceAction";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (e) {
            r = o.params0(e);
            a = "./FbRemovePreloadResourceAction";
            if (e = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return e.FbRemovePreloadResourceAction.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ExecAlertSystemAction:
          e = "ExecAlertSystemAction";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (r) {
            a = o.params0(r);
            _ = "./FbExecAlertSystemAction";
            if (r = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return r.FbExecAlertSystemAction.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ChangeEntityCamp:
          r = "ChangeEntityCamp";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (a) {
            _ = o.params0(a);
            e = "./FbChangeEntityCamp";
            if (a = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return a.FbChangeEntityCamp.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.RecordDungeonEvent:
          a = "RecordDungeonEvent";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (_) {
            e = o.params0(_);
            r = "./FbRecordDungeonEvent";
            if (_ = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return _.FbRecordDungeonEvent.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ResetLevelPlay:
          _ = "ResetLevelPlay";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (e) {
            r = o.params0(e);
            a = "./FbResetLevelPlay";
            if (e = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return e.FbResetLevelPlay.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.GetRewardByInteract:
          e = "GetRewardByInteract";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (r) {
            a = o.params0(r);
            _ = "./FbGetRewardByInteract";
            if (r = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return r.FbGetRewardByInteract.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.GuestOperateUiAnimation:
          r = "GuestOperateUiAnimation";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (a) {
            _ = o.params0(a);
            e = "./FbGuestOperateUiAnimation";
            if (a = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return a.FbGuestOperateUiAnimation.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.VehicleEnter:
          a = "VehicleEnter";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (_) {
            e = o.params0(_);
            r = "./FbVehicleEnter";
            if (_ = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return _.FbVehicleEnter.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.EnterNpcVehicle:
          _ = "EnterNpcVehicle";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (e) {
            r = o.params0(e);
            a = "./FbEnterNpcVehicle";
            if (e = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return e.FbEnterNpcVehicle.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.VehicleExitPlayer:
          e = "VehicleExitPlayer";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (r) {
            a = o.params0(r);
            _ = "./FbVehicleExitPlayer";
            if (r = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return r.FbVehicleExitPlayer.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.VehicleExitNpc:
          r = "VehicleExitNpc";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (a) {
            _ = o.params0(a);
            e = "./FbVehicleExitNpc";
            if (a = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return a.FbVehicleExitNpc.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.TeleportVehicle:
          a = "TeleportVehicle";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (_) {
            e = o.params0(_);
            r = "./FbTeleportVehicle";
            if (_ = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return _.FbTeleportVehicle.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.VehiclePlayPassengerVoice:
          _ = "VehiclePlayPassengerVoice";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (e) {
            r = o.params0(e);
            a = "./FbVehiclePlayPassengerVoice";
            if (e = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return e.FbVehiclePlayPassengerVoice.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.VehicleWaterfallClimbing:
          e = "VehicleWaterfallClimbing";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (r) {
            a = o.params0(r);
            _ = "./FbVehicleWaterfallClimbing";
            if (r = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return r.FbVehicleWaterfallClimbing.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.TeleportToAndEnterVehicle:
          r = "TeleportToAndEnterVehicle";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (a) {
            _ = o.params0(a);
            e = "./FbTeleportToAndEnterVehicle";
            if (a = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return a.FbTeleportToAndEnterVehicle.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.VehicleMoveWithPathLine:
          a = "VehicleMoveWithPathLine";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (_) {
            e = o.params0(_);
            r = "./FbVehicleMoveWithPathLine";
            if (_ = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return _.FbVehicleMoveWithPathLine.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.VehicleSprint:
          _ = "VehicleSprint";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (e) {
            r = o.params0(e);
            a = "./FbVehicleSprint";
            if (e = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return e.FbVehicleSprint.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SetAreaTimeState:
          e = "SetAreaTimeState";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (r) {
            a = o.params0(r);
            _ = "./FbSetAreaTimeState";
            if (r = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return r.FbSetAreaTimeState.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SlideRailStart:
          r = "SlideRailStart";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (a) {
            _ = o.params0(a);
            e = "./FbSlideRailStart";
            if (a = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return a.FbSlideRailStart.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.BvbSendSystemEvent:
          a = "BvbSendSystemEvent";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (_) {
            e = o.params0(_);
            r = "./FbBvbSendSystemEvent";
            if (_ = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return _.FbBvbSendSystemEvent.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.TeleportDungeon:
          _ = "TeleportDungeon";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (e) {
            r = o.params0(e);
            a = "./FbTeleportDungeon";
            if (e = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return e.FbTeleportDungeon.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SettlementDungeon:
          e = "SettlementDungeon";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (r) {
            a = o.params0(r);
            _ = "./FbSettlementDungeon";
            if (r = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return r.FbSettlementDungeon.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ClaimDungeonReward:
          r = "ClaimDungeonReward";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (a) {
            _ = o.params0(a);
            e = "./FbClaimDungeonReward";
            if (a = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return a.FbClaimDungeonReward.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ExitDungeon:
          a = "ExitDungeon";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (_) {
            e = o.params0(_);
            r = "./FbExitDungeon";
            if (_ = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return _.FbExitDungeon.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.UnlockDungeonEntry:
          _ = "UnlockDungeonEntry";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (e) {
            r = o.params0(e);
            a = "./FbUnlockDungeonEntry";
            if (e = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return e.FbUnlockDungeonEntry.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.FinishDungeon:
          e = "FinishDungeon";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (r) {
            a = o.params0(r);
            _ = "./FbFinishDungeon";
            if (r = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return r.FbFinishDungeon.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.StartFlowTemplate:
          r = "StartFlowTemplate";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (a) {
            _ = o.params0(a);
            e = "./FbStartFlowTemplate";
            if (a = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return a.FbStartFlowTemplate.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.BeginFlowTemplate:
          a = "BeginFlowTemplate";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (_) {
            e = o.params0(_);
            r = "./FbBeginFlowTemplate";
            if (_ = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return _.FbBeginFlowTemplate.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ChangeFlowTemplate:
          _ = "ChangeFlowTemplate";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (e) {
            r = o.params0(e);
            a = "./FbChangeFlowTemplate";
            if (e = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return e.FbChangeFlowTemplate.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SetFlowTemplate:
          e = "SetFlowTemplate";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (r) {
            a = o.params0(r);
            _ = "./FbSetFlowTemplate";
            if (r = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return r.FbSetFlowTemplate.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.EndFlowTemplate:
          r = "EndFlowTemplate";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (a) {
            _ = o.params0(a);
            e = "./FbEndFlowTemplate";
            if (a = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return a.FbEndFlowTemplate.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.CloseFlowTemplate:
          a = "CloseFlowTemplate";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (_) {
            e = o.params0(_);
            r = "./FbCloseFlowTemplate";
            if (_ = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return _.FbCloseFlowTemplate.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SendAiEvent:
          _ = "SendAiEvent";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (e) {
            r = o.params0(e);
            a = "./FbSendAiEvent";
            if (e = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return e.FbSendAiEvent.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.FadeInScreen:
          e = "FadeInScreen";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (r) {
            a = o.params0(r);
            _ = "./FbFadeInScreen";
            if (r = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return r.FbFadeInScreen.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.FadeOutScreen:
          r = "FadeOutScreen";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (a) {
            _ = o.params0(a);
            e = "./FbFadeOutScreen";
            if (a = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return a.FbFadeOutScreen.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ChangeFightTeam:
          a = "ChangeFightTeam";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (_) {
            e = o.params0(_);
            r = "./FbChangeFightTeam";
            if (_ = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return _.FbChangeFightTeam.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ManualOccupations:
          _ = "ManualOccupations";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (e) {
            r = o.params0(e);
            a = "./FbManualOccupations";
            if (e = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return e.FbManualOccupations.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.AddTrialCharacter:
          e = "AddTrialCharacter";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (r) {
            a = o.params0(r);
            _ = "./FbAddTrialCharacter";
            if (r = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return r.FbAddTrialCharacter.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.RemoveTrialCharacter:
          r = "RemoveTrialCharacter";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (a) {
            _ = o.params0(a);
            e = "./FbRemoveTrialCharacter";
            if (a = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return a.FbRemoveTrialCharacter.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.AddGuestCharacter:
          a = "AddGuestCharacter";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (_) {
            e = o.params0(_);
            r = "./FbAddGuestCharacter";
            if (_ = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return _.FbAddGuestCharacter.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.RemoveGuestCharacter:
          _ = "RemoveGuestCharacter";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (e) {
            r = o.params0(e);
            a = "./FbRemoveGuestCharacter";
            if (e = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return e.FbRemoveGuestCharacter.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.AddTrialFollowShooter:
          e = "AddTrialFollowShooter";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (r) {
            a = o.params0(r);
            _ = "./FbAddTrialFollowShooter";
            if (r = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return r.FbAddTrialFollowShooter.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.RemoveTrialFollowShooter:
          r = "RemoveTrialFollowShooter";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (a) {
            _ = o.params0(a);
            e = "./FbRemoveTrialFollowShooter";
            if (a = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return a.FbRemoveTrialFollowShooter.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.DestroyQuest:
          a = "DestroyQuest";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (_) {
            e = o.params0(_);
            r = "./FbDestroyQuest";
            if (_ = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return _.FbDestroyQuest.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SetCameraAnim:
          _ = "SetCameraAnim";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (e) {
            r = o.params0(e);
            a = "./FbSetCameraAnim";
            if (e = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return e.FbSetCameraAnim.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.RotatorEntity:
          e = "RotatorEntity";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (r) {
            a = o.params0(r);
            _ = "./FbRotatorEntity";
            if (r = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return r.FbRotatorEntity.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.TraceSpline:
          r = "TraceSpline";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (a) {
            _ = o.params0(a);
            e = "./FbTraceSpline";
            if (a = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return a.FbTraceSpline.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ToggleScanSplineEffect:
          a = o.paramsExtType0();
          _ = "./UnionToggleScanSplineEffectHelper";
          e = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule);
          if (e) {
            r = e.UnionToggleScanSplineEffectHelper.GetUnionToggleScanSplineEffectObject(a);
            return e.UnionToggleScanSplineEffectHelper.ReadUnionToggleScanSplineEffect(a, o.params0(r));
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "获取unionModule失败", ["ParamsType", t], ["UnionModulePath", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ChangeTimer:
          e = "ChangeTimer";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (a) {
            r = o.params0(a);
            _ = "./FbChangeTimer";
            if (a = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return a.FbChangeTimer.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ToggleTimerPauseState:
          a = "ToggleTimerPauseState";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (r) {
            _ = o.params0(r);
            e = "./FbToggleTimerPauseState";
            if (r = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return r.FbToggleTimerPauseState.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.EnableSystem:
          r = "EnableSystem";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (_) {
            e = o.params0(_);
            a = "./FbEnableSystem";
            if (_ = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return _.FbEnableSystem.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.PostAkEvent:
          _ = "PostAkEvent";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (e) {
            a = o.params0(e);
            r = "./FbPostAkEvent";
            if (e = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return e.FbPostAkEvent.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.MoveSceneItem:
          e = "MoveSceneItem";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (a) {
            r = o.params0(a);
            _ = "./FbMoveSceneItem";
            if (a = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return a.FbMoveSceneItem.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.StopSceneItemMove:
          a = "StopSceneItemMove";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (r) {
            _ = o.params0(r);
            e = "./FbStopSceneItemMove";
            if (r = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return r.FbStopSceneItemMove.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ChangeLiftTarget:
          r = "ChangeLiftTarget";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (_) {
            e = o.params0(_);
            a = "./FbChangeLiftTarget";
            if (_ = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return _.FbChangeLiftTarget.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.HideByRangeInFlow:
          _ = "HideByRangeInFlow";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (e) {
            a = o.params0(e);
            r = "./FbHideByRangeInFlow";
            if (e = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return e.FbHideByRangeInFlow.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.OpenSimpleGameplay:
          e = "OpenSimpleGameplay";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (a) {
            r = o.params0(a);
            _ = "./FbOpenSimpleGameplay";
            if (a = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return a.FbOpenSimpleGameplay.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ChangeActorTalker:
          a = "ChangeActorTalker";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (r) {
            _ = o.params0(r);
            e = "./FbChangeActorTalker";
            if (r = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return r.FbChangeActorTalker.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SwitchSubLevels:
          r = o.paramsExtType0();
          _ = "./UnionSwitchSubLevelsHelper";
          e = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule);
          if (e) {
            a = e.UnionSwitchSubLevelsHelper.GetUnionSwitchSubLevelsObject(r);
            return e.UnionSwitchSubLevelsHelper.ReadUnionSwitchSubLevels(r, o.params0(a));
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "获取unionModule失败", ["ParamsType", t], ["UnionModulePath", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SwitchDataLayers:
          e = "SwitchDataLayers";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (r) {
            a = o.params0(r);
            _ = "./FbSwitchDataLayers";
            if (r = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return r.FbSwitchDataLayers.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ActivateResetPoint:
          r = "ActivateResetPoint";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (a) {
            _ = o.params0(a);
            e = "./FbActivateResetPoint";
            if (a = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return a.FbActivateResetPoint.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.TeleportToLatestResetPoint:
          a = "TeleportToLatestResetPoint";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (_) {
            e = o.params0(_);
            r = "./FbTeleportToLatestResetPoint";
            if (_ = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return _.FbTeleportToLatestResetPoint.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SetWeather:
          _ = "SetWeather";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (e) {
            r = o.params0(e);
            a = "./FbSetWeather";
            if (e = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return e.FbSetWeather.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SetTimeLockState:
          e = "SetTimeLockState";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (r) {
            a = o.params0(r);
            _ = "./FbSetTimeLockState";
            if (r = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return r.FbSetTimeLockState.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SetWeatherLockState:
          r = "SetWeatherLockState";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (a) {
            _ = o.params0(a);
            e = "./FbSetWeatherLockState";
            if (a = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return a.FbSetWeatherLockState.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.AdjustPlayerCamera:
          a = "AdjustPlayerCamera";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (_) {
            e = o.params0(_);
            r = "./FbAdjustPlayerCamera";
            if (_ = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return _.FbAdjustPlayerCamera.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.RestorePlayerCameraAdjustment:
          _ = "RestorePlayerCameraAdjustment";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (e) {
            r = o.params0(e);
            a = "./FbRestorePlayerCameraAdjustment";
            if (e = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return e.FbRestorePlayerCameraAdjustment.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ResetPlayerCameraFocus:
          e = "ResetPlayerCameraFocus";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (r) {
            a = o.params0(r);
            _ = "./FbResetPlayerCameraFocus";
            if (r = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return r.FbResetPlayerCameraFocus.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.UsePhantomSkill:
          r = "UsePhantomSkill";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (a) {
            _ = o.params0(a);
            e = "./FbUsePhantomSkill";
            if (a = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return a.FbUsePhantomSkill.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ChangePhantomFormation:
          a = "ChangePhantomFormation";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (_) {
            e = o.params0(_);
            r = "./FbChangePhantomFormation";
            if (_ = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return _.FbChangePhantomFormation.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.RestorePhantomFormation:
          _ = "RestorePhantomFormation";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (e) {
            r = o.params0(e);
            a = "./FbRestorePhantomFormation";
            if (e = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return e.FbRestorePhantomFormation.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.EnterOrbitalCamera:
          e = "EnterOrbitalCamera";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (r) {
            a = o.params0(r);
            _ = "./FbEnterOrbitalCamera";
            if (r = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return r.FbEnterOrbitalCamera.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ExitOrbitalCamera:
          r = "ExitOrbitalCamera";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (a) {
            _ = o.params0(a);
            e = "./FbExitOrbitalCamera";
            if (a = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return a.FbExitOrbitalCamera.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.EnableSplineMoveModel:
          a = "EnableSplineMoveModel";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (_) {
            e = o.params0(_);
            r = "./FbEnableSplineMoveModel";
            if (_ = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return _.FbEnableSplineMoveModel.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SetSportsState:
          _ = "SetSportsState";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (e) {
            r = o.params0(e);
            a = "./FbSetSportsState";
            if (e = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return e.FbSetSportsState.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.PlayLevelSequence:
          e = "PlayLevelSequence";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (r) {
            a = o.params0(r);
            _ = "./FbPlayLevelSequence";
            if (r = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return r.FbPlayLevelSequence.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SetExploreState:
          r = "SetExploreState";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (a) {
            _ = o.params0(a);
            e = "./FbSetExploreState";
            if (a = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return a.FbSetExploreState.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.RogueGotoNextFloor:
          a = "RogueGotoNextFloor";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (_) {
            e = o.params0(_);
            r = "./FbRogueGotoNextFloor";
            if (_ = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return _.FbRogueGotoNextFloor.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.RogueSelectRoom:
          _ = "RogueSelectRoom";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (e) {
            r = o.params0(e);
            a = "./FbRogueSelectRoom";
            if (e = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return e.FbRogueSelectRoom.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.RogueActivatePortal:
          e = "RogueActivatePortal";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (r) {
            a = o.params0(r);
            _ = "./FbRogueActivatePortal";
            if (r = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return r.FbRogueActivatePortal.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.RogueReceiveReward:
          r = "RogueReceiveReward";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (a) {
            _ = o.params0(a);
            e = "./FbRogueReceiveReward";
            if (a = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return a.FbRogueReceiveReward.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.EnableAoiNotify:
          a = "EnableAoiNotify";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (_) {
            e = o.params0(_);
            r = "./FbEnableAoiNotify";
            if (_ = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return _.FbEnableAoiNotify.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ChangeEntityPrefabPerformance:
          _ = o.paramsExtType0();
          e = "./UnionChangeEntityPrefabPerformanceHelper";
          r = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule);
          if (r) {
            a = r.UnionChangeEntityPrefabPerformanceHelper.GetUnionChangeEntityPrefabPerformanceObject(_);
            return r.UnionChangeEntityPrefabPerformanceHelper.ReadUnionChangeEntityPrefabPerformance(_, o.params0(a));
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "获取unionModule失败", ["ParamsType", t], ["UnionModulePath", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ModifySceneItemAttributeTag:
          r = o.paramsExtType0();
          _ = "./UnionModifySceneItemAttributeTagHelper";
          a = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule);
          if (a) {
            e = a.UnionModifySceneItemAttributeTagHelper.GetUnionModifySceneItemAttributeTagObject(r);
            return a.UnionModifySceneItemAttributeTagHelper.ReadUnionModifySceneItemAttributeTag(r, o.params0(e));
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "获取unionModule失败", ["ParamsType", t], ["UnionModulePath", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ToggleMapMarkState:
          a = o.paramsExtType0();
          r = "./UnionToggleMapMarkStateHelper";
          e = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule);
          if (e) {
            _ = e.UnionToggleMapMarkStateHelper.GetUnionToggleMapMarkStateObject(a);
            return e.UnionToggleMapMarkStateHelper.ReadUnionToggleMapMarkState(a, o.params0(_));
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "获取unionModule失败", ["ParamsType", t], ["UnionModulePath", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.FocusOnMapMark:
          e = "FocusOnMapMark";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (a) {
            _ = o.params0(a);
            r = "./FbFocusOnMapMark";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbFocusOnMapMark.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.EnableTemporaryTeleport:
          a = "EnableTemporaryTeleport";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (_) {
            r = o.params0(_);
            e = "./FbEnableTemporaryTeleport";
            if (_ = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return _.FbEnableTemporaryTeleport.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SetTeleControl:
          _ = "SetTeleControl";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (r) {
            e = o.params0(r);
            a = "./FbSetTeleControl";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbSetTeleControl.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ActiveAntiGravitySafePoint:
          r = "ActiveAntiGravitySafePoint";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (e) {
            a = o.params0(e);
            _ = "./FbActiveAntiGravitySafePoint";
            if (e = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return e.FbActiveAntiGravitySafePoint.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ClearFishingCabinInSaleItems:
          e = "ClearFishingCabinInSaleItems";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (a) {
            _ = o.params0(a);
            r = "./FbClearFishingCabinInSaleItems";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbClearFishingCabinInSaleItems.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.AcceptFishingEntrust:
          a = "AcceptFishingEntrust";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (_) {
            r = o.params0(_);
            e = "./FbAcceptFishingEntrust";
            if (_ = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return _.FbAcceptFishingEntrust.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.DestroyFishingBoat:
          _ = "DestroyFishingBoat";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (r) {
            e = o.params0(r);
            a = "./FbDestroyFishingBoat";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbDestroyFishingBoat.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SetSpineAnimation:
          r = "SetSpineAnimation";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (e) {
            a = o.params0(e);
            _ = "./FbSetSpineAnimation";
            if (e = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return e.FbSetSpineAnimation.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.DangoAbyssActivatePortal:
          e = "DangoAbyssActivatePortal";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (a) {
            _ = o.params0(a);
            r = "./FbDangoAbyssActivatePortal";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbDangoAbyssActivatePortal.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.DangoAbyssGotoNextFloor:
          a = "DangoAbyssGotoNextFloor";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (_) {
            r = o.params0(_);
            e = "./FbDangoAbyssGotoNextFloor";
            if (_ = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return _.FbDangoAbyssGotoNextFloor.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.DangoAbyssCreateRewardTreasureBox:
          _ = "DangoAbyssCreateRewardTreasureBox";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (r) {
            e = o.params0(r);
            a = "./FbDangoAbyssCreateRewardTreasureBox";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbDangoAbyssCreateRewardTreasureBox.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.DangoAbyssReceiveReward:
          r = "DangoAbyssReceiveReward";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (e) {
            a = o.params0(e);
            _ = "./FbDangoAbyssReceiveReward";
            if (e = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return e.FbDangoAbyssReceiveReward.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SetTimeScale:
          e = "SetTimeScale";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (a) {
            _ = o.params0(a);
            r = "./FbSetTimeScale";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbSetTimeScale.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.EnableActor:
          a = "EnableActor";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (_) {
            r = o.params0(_);
            e = "./FbEnableActor";
            if (_ = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return _.FbEnableActor.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ModifyActorMaterial:
          _ = "ModifyActorMaterial";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (r) {
            e = o.params0(r);
            a = "./FbModifyActorMaterial";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbModifyActorMaterial.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ToggleAirWall:
          r = "ToggleAirWall";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (e) {
            a = o.params0(e);
            _ = "./FbToggleAirWall";
            if (e = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return e.FbToggleAirWall.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.TriggerCameraShake:
          e = "TriggerCameraShake";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (a) {
            _ = o.params0(a);
            r = "./FbTriggerCameraShake";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbTriggerCameraShake.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.CreatePrefab:
          a = "CreatePrefab";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (_) {
            r = o.params0(_);
            e = "./FbCreatePrefab";
            if (_ = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return _.FbCreatePrefab.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.DestroyPrefab:
          _ = "DestroyPrefab";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (r) {
            e = o.params0(r);
            a = "./FbDestroyPrefab";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbDestroyPrefab.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.PlayRegisteredMontage:
          r = "PlayRegisteredMontage";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (e) {
            a = o.params0(e);
            _ = "./FbPlayRegisteredMontage";
            if (e = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return e.FbPlayRegisteredMontage.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.RecoverDurability:
          e = "RecoverDurability";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (a) {
            _ = o.params0(a);
            r = "./FbRecoverDurability";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbRecoverDurability.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SetRegionConfig:
          a = "SetRegionConfig";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (_) {
            r = o.params0(_);
            e = "./FbSetRegionConfig";
            if (_ = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return _.FbSetRegionConfig.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SetJigsawItem:
          _ = "SetJigsawItem";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (r) {
            e = o.params0(r);
            a = "./FbSetJigsawItem";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbSetJigsawItem.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SetJigsawFoundation:
          r = "SetJigsawFoundation";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (e) {
            a = o.params0(e);
            _ = "./FbSetJigsawFoundation";
            if (e = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return e.FbSetJigsawFoundation.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ToggleHighlightExploreUi:
          e = o.paramsExtType0();
          a = "./UnionHighlightExploreSkillIconHelper";
          _ = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule);
          if (_) {
            r = _.UnionHighlightExploreSkillIconHelper.GetUnionHighlightExploreSkillIconObject(e);
            return _.UnionHighlightExploreSkillIconHelper.ReadUnionHighlightExploreSkillIcon(e, o.params0(r));
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "获取unionModule失败", ["ParamsType", t], ["UnionModulePath", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ResetEntity:
          _ = "ResetEntity";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (e) {
            r = o.params0(e);
            a = "./FbResetEntity";
            if (e = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return e.FbResetEntity.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.PlayDynamicSettlement:
          e = "PlayDynamicSettlement";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (r) {
            a = o.params0(r);
            _ = "./FbPlayDynamicSettlement";
            if (r = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return r.FbPlayDynamicSettlement.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SetInteractionLockState:
          r = "SetInteractionLockState";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (a) {
            _ = o.params0(a);
            e = "./FbSetInteractionLockState";
            if (a = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return a.FbSetInteractionLockState.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.FinishCondition:
          a = "FinishCondition";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (_) {
            e = o.params0(_);
            r = "./FbFinishCondition";
            if (_ = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return _.FbFinishCondition.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ClearEntityVisibleTag:
          _ = "ClearEntityVisibleTag";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (e) {
            r = o.params0(e);
            a = "./FbClearEntityVisibleTag";
            if (e = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return e.FbClearEntityVisibleTag.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.SetEntityPos:
          e = "SetEntityPos";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (r) {
            a = o.params0(r);
            _ = "./FbSetEntityPos";
            if (r = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return r.FbSetEntityPos.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ResetEntityPos:
          r = "ResetEntityPos";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (a) {
            _ = o.params0(a);
            e = "./FbResetEntityPos";
            if (a = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return a.FbResetEntityPos.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ServerSetPlayerPos:
          a = "ServerSetPlayerPos";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (_) {
            e = o.params0(_);
            r = "./FbServerSetPlayerPos";
            if (_ = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return _.FbServerSetPlayerPos.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.FixTeleControllerPos:
          _ = "FixTeleControllerPos";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (e) {
            r = o.params0(e);
            a = "./FbFixTeleControllerPos";
            if (e = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return e.FbFixTeleControllerPos.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.CustomJson:
          e = "CustomJson";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (r) {
            a = o.params0(r);
            _ = "./FbCustomJson";
            if (r = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return r.FbCustomJson.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.FixFoundationRelation:
          r = "FixFoundationRelation";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (a) {
            _ = o.params0(a);
            e = "./FbFixFoundationRelation";
            if (a = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return a.FbFixFoundationRelation.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.FixShowTargetRange:
          a = "FixShowTargetRange";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (_) {
            e = o.params0(_);
            r = "./FbFixShowTargetRange";
            if (_ = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return _.FbFixShowTargetRange.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ForceOccupations:
          _ = "ForceOccupations";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (e) {
            r = o.params0(e);
            a = "./FbForceOccupations";
            if (e = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return e.FbForceOccupations.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.ServerForceEnableLevelPlay:
          e = "ServerForceEnableLevelPlay";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (r) {
            a = o.params0(r);
            _ = "./FbServerForceEnableLevelPlay";
            if (r = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return r.FbServerForceEnableLevelPlay.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_1.UnionActionParams0.TeleportDungeonPos:
          r = "TeleportDungeonPos";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (a) {
            _ = o.params0(a);
            e = "./FbTeleportDungeonPos";
            if (a = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return a.FbTeleportDungeonPos.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        default:
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Entity", 3, "未实现该Action的反序列化", ["ActionType", t]);
          }
      }
    }
  }
  static ReadActionParams1(o) {
    if (o) {
      var t = o.params1Type();
      switch (t) {
        case fb_action_2.UnionActionParams1.SetAudioState:
          var e = "SetAudioState";
          var _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (_) {
            _ = o.params1(_);
            r = "./FbSetAudioState";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbSetAudioState.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_2.UnionActionParams1.PerformerAiSplineMove:
          var a = "PerformerAiSplineMove";
          var _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (_) {
            r = o.params1(_);
            e = "./FbPerformerAiSplineMove";
            if (_ = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return _.FbPerformerAiSplineMove.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_2.UnionActionParams1.PerformerAiMoveTo:
          var _ = "PerformerAiMoveTo";
          var r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (r) {
            e = o.params1(r);
            a = "./FbPerformerAiMoveTo";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbPerformerAiMoveTo.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_2.UnionActionParams1.HideTargetRange:
          var r = "HideTargetRange";
          var e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (e) {
            a = o.params1(e);
            _ = "./FbHideTargetRange";
            if (e = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return e.FbHideTargetRange.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_2.UnionActionParams1.ShowTargetRange:
          var e = "ShowTargetRange";
          var a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (a) {
            _ = o.params1(a);
            r = "./FbShowTargetRange";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbShowTargetRange.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_2.UnionActionParams1.HideSpecificEntities:
          a = "HideSpecificEntities";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (_) {
            r = o.params1(_);
            e = "./FbHideSpecificEntities";
            if (_ = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return _.FbHideSpecificEntities.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_2.UnionActionParams1.ShowSpecificEntities:
          _ = "ShowSpecificEntities";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (r) {
            e = o.params1(r);
            a = "./FbShowSpecificEntities";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbShowSpecificEntities.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_2.UnionActionParams1.HideGroup:
          r = "HideGroup";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (e) {
            a = o.params1(e);
            _ = "./FbHideGroup";
            if (e = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return e.FbHideGroup.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_2.UnionActionParams1.ShowHidedGroup:
          e = "ShowHidedGroup";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (a) {
            _ = o.params1(a);
            r = "./FbShowHidedGroup";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbShowHidedGroup.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_2.UnionActionParams1.ExecResurrection:
          a = "ExecResurrection";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (_) {
            r = o.params1(_);
            e = "./FbExecResurrection";
            if (_ = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return _.FbExecResurrection.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_2.UnionActionParams1.OpenSystemBoardWithReturn:
          _ = "OpenSystemBoardWithReturn";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (r) {
            e = o.params1(r);
            a = "./FbOpenSystemBoardWithReturn";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbOpenSystemBoardWithReturn.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_2.UnionActionParams1.ExecRiskHarvestEffect:
          r = "ExecRiskHarvestEffect";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (e) {
            a = o.params1(e);
            _ = "./FbExecRiskHarvestEffect";
            if (e = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return e.FbExecRiskHarvestEffect.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        case fb_action_2.UnionActionParams1.MowingTowerGotoNextFloor:
          e = "MowingTowerGotoNextFloor";
          a = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, e);
          if (a) {
            _ = o.params1(a);
            r = "./FbMowingTowerGotoNextFloor";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbMowingTowerGotoNextFloor.Create(_);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", e]);
            }
            return;
          }
        case fb_action_2.UnionActionParams1.SlashAndTowerGotoNextFloor:
          a = "SlashAndTowerGotoNextFloor";
          _ = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, a);
          if (_) {
            r = o.params1(_);
            e = "./FbSlashAndTowerGotoNextFloor";
            if (_ = ImportHelper_1.ImportHelper.GetModule(e, exports.requireModule)) {
              return _.FbSlashAndTowerGotoNextFloor.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", e]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", a]);
            }
            return;
          }
        case fb_action_2.UnionActionParams1.SummonEntity:
          _ = "SummonEntity";
          r = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, _);
          if (r) {
            e = o.params1(r);
            a = "./FbSummonEntity";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbSummonEntity.Create(e);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", _]);
            }
            return;
          }
        case fb_action_2.UnionActionParams1.SetupMoraleSystem:
          r = "SetupMoraleSystem";
          e = ImportHelper_1.ImportHelper.CreateInstance(FB_ACTION_MODULE_PATH, exports.requireModule, r);
          if (e) {
            a = o.params1(e);
            _ = "./FbSetupMoraleSystem";
            if (e = ImportHelper_1.ImportHelper.GetModule(_, exports.requireModule)) {
              return e.FbSetupMoraleSystem.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取actionModule失败", ["ParamsType", t], ["ActionModulePath", _]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "fbActionObject为空", ["ParamsType", t], ["FB_ACTION_MODULE_PATH", FB_ACTION_MODULE_PATH], ["ActionClassName", r]);
            }
            return;
          }
        default:
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Entity", 3, "未实现该Action的反序列化", ["ActionType", t]);
          }
      }
    }
  }
}
exports.ActionReadHelper = ActionReadHelper;
//# sourceMappingURL=ActionReadHelper.js.map