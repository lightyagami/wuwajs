"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComponentReadHelper = exports.requireModule = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const fb_component_1 = require("../../EntityFb/fb-component");
const ImportHelper_1 = require("../ImportHelper");
const requireModule = e => require(e);
exports.requireModule = requireModule;
class ComponentReadHelper {
  static ReadComponents(e) {
    if (e) {
      var o = fb_component_1.ComponentData.getRootAsComponentData(e);
      var t = {};
      var n = t;
      var p = o.componentsLength();
      for (let e = 0; e < p; ++e) {
        var r = o.components(e);
        var a = r.name();
        if (r.isNull()) {
          n[a] = null;
        } else {
          r = ComponentReadHelper.ReadComponent(r);
          t[a] = r;
        }
      }
      return t;
    }
  }
  static ReadComponent(e) {
    if (e) {
      var o = "../../EntityFb/fb-component";
      var t = e.componentType();
      switch (t) {
        case fb_component_1.UnionComponent.AirWallSpawnerComponent:
          var n = "AirWallSpawnerComponent";
          var p = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, n);
          if (p) {
            p = e.component(p);
            a = "./FbAirWallSpawnerComponent";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbAirWallSpawnerComponent.Create(p);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", n]);
            }
            return;
          }
        case fb_component_1.UnionComponent.ActorStateComponent:
          var r = "ActorStateComponent";
          var p = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, r);
          if (p) {
            a = e.component(p);
            n = "./FbActorStateComponent";
            if (p = ImportHelper_1.ImportHelper.GetModule(n, exports.requireModule)) {
              return p.FbActorStateComponent.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", n]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", r]);
            }
            return;
          }
        case fb_component_1.UnionComponent.AiComponent:
          var p = "AiComponent";
          var a = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, p);
          if (a) {
            n = e.component(a);
            r = "./FbAiComponent";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbAiComponent.Create(n);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", p]);
            }
            return;
          }
        case fb_component_1.UnionComponent.LevelAIComponent:
          var a = "LevelAIComponent";
          var n = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, a);
          if (n) {
            r = e.component(n);
            p = "./FbLevelAIComponent";
            if (n = ImportHelper_1.ImportHelper.GetModule(p, exports.requireModule)) {
              return n.FbLevelAIComponent.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", p]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", a]);
            }
            return;
          }
        case fb_component_1.UnionComponent.AttributeComponent:
          var n = "AttributeComponent";
          var r = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, n);
          if (r) {
            p = e.component(r);
            a = "./FbAttributeComponent";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbAttributeComponent.Create(p);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", n]);
            }
            return;
          }
        case fb_component_1.UnionComponent.BaseInfoComponent:
          r = "BaseInfoComponent";
          p = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, r);
          if (p) {
            a = e.component(p);
            n = "./FbBaseInfoComponent";
            if (p = ImportHelper_1.ImportHelper.GetModule(n, exports.requireModule)) {
              return p.FbBaseInfoComponent.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", n]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", r]);
            }
            return;
          }
        case fb_component_1.UnionComponent.BehaviorFlowComponent:
          p = "BehaviorFlowComponent";
          a = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, p);
          if (a) {
            n = e.component(a);
            r = "./FbBehaviorFlowComponent";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbBehaviorFlowComponent.Create(n);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", p]);
            }
            return;
          }
        case fb_component_1.UnionComponent.CalculateComponent:
          a = "CalculateComponent";
          n = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, a);
          if (n) {
            r = e.component(n);
            p = "./FbCalculateComponent";
            if (n = ImportHelper_1.ImportHelper.GetModule(p, exports.requireModule)) {
              return n.FbCalculateComponent.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", p]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", a]);
            }
            return;
          }
        case fb_component_1.UnionComponent.UnUseComponent:
          n = "UnUseComponent";
          r = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, n);
          if (r) {
            p = e.component(r);
            a = "./FbUnUseComponent";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbUnUseComponent.Create(p);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", n]);
            }
            return;
          }
        case fb_component_1.UnionComponent.EntityStateComponent:
          r = "EntityStateComponent";
          p = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, r);
          if (p) {
            a = e.component(p);
            n = "./FbEntityStateComponent";
            if (p = ImportHelper_1.ImportHelper.GetModule(n, exports.requireModule)) {
              return p.FbEntityStateComponent.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", n]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", r]);
            }
            return;
          }
        case fb_component_1.UnionComponent.SceneItemAttributeComponent:
          p = "SceneItemAttributeComponent";
          a = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, p);
          if (a) {
            n = e.component(a);
            r = "./FbSceneItemAttributeComponent";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbSceneItemAttributeComponent.Create(n);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", p]);
            }
            return;
          }
        case fb_component_1.UnionComponent.FlowComponent:
          a = "FlowComponent";
          n = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, a);
          if (n) {
            r = e.component(n);
            p = "./FbFlowComponent";
            if (n = ImportHelper_1.ImportHelper.GetModule(p, exports.requireModule)) {
              return n.FbFlowComponent.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", p]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", a]);
            }
            return;
          }
        case fb_component_1.UnionComponent.GrabComponent:
          n = "GrabComponent";
          r = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, n);
          if (r) {
            p = e.component(r);
            a = "./FbGrabComponent";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbGrabComponent.Create(p);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", n]);
            }
            return;
          }
        case fb_component_1.UnionComponent.InteractComponent:
          r = "InteractComponent";
          p = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, r);
          if (p) {
            a = e.component(p);
            n = "./FbInteractComponent";
            if (p = ImportHelper_1.ImportHelper.GetModule(n, exports.requireModule)) {
              return p.FbInteractComponent.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", n]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", r]);
            }
            return;
          }
        case fb_component_1.UnionComponent.InteractiveComponent:
          p = "InteractiveComponent";
          a = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, p);
          if (a) {
            n = e.component(a);
            r = "./FbInteractiveComponent";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbInteractiveComponent.Create(n);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", p]);
            }
            return;
          }
        case fb_component_1.UnionComponent.MoveComponent:
          a = "MoveComponent";
          n = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, a);
          if (n) {
            r = e.component(n);
            p = "./FbMoveComponent";
            if (n = ImportHelper_1.ImportHelper.GetModule(p, exports.requireModule)) {
              return n.FbMoveComponent.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", p]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", a]);
            }
            return;
          }
        case fb_component_1.UnionComponent.RefreshComponent:
          n = "RefreshComponent";
          r = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, n);
          if (r) {
            p = e.component(r);
            a = "./FbRefreshComponent";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbRefreshComponent.Create(p);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", n]);
            }
            return;
          }
        case fb_component_1.UnionComponent.RefreshGroupComponent:
          r = "RefreshGroupComponent";
          p = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, r);
          if (p) {
            a = e.component(p);
            n = "./FbRefreshGroupComponent";
            if (p = ImportHelper_1.ImportHelper.GetModule(n, exports.requireModule)) {
              return p.FbRefreshGroupComponent.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", n]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", r]);
            }
            return;
          }
        case fb_component_1.UnionComponent.RefreshSingleComponent:
          p = "RefreshSingleComponent";
          a = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, p);
          if (a) {
            n = e.component(a);
            r = "./FbRefreshSingleComponent";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbRefreshSingleComponent.Create(n);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", p]);
            }
            return;
          }
        case fb_component_1.UnionComponent.RewardComponent:
          a = "RewardComponent";
          n = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, a);
          if (n) {
            r = e.component(n);
            p = "./FbRewardComponent";
            if (n = ImportHelper_1.ImportHelper.GetModule(p, exports.requireModule)) {
              return n.FbRewardComponent.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", p]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", a]);
            }
            return;
          }
        case fb_component_1.UnionComponent.RotatorComponent:
          n = "RotatorComponent";
          r = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, n);
          if (r) {
            p = e.component(r);
            a = "./FbRotatorComponent";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbRotatorComponent.Create(p);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", n]);
            }
            return;
          }
        case fb_component_1.UnionComponent.RotatorComponent2:
          r = "RotatorComponent2";
          p = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, r);
          if (p) {
            a = e.component(p);
            n = "./FbRotatorComponent2";
            if (p = ImportHelper_1.ImportHelper.GetModule(n, exports.requireModule)) {
              return p.FbRotatorComponent2.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", n]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", r]);
            }
            return;
          }
        case fb_component_1.UnionComponent.SphereFactoryComponent:
          p = "SphereFactoryComponent";
          a = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, p);
          if (a) {
            n = e.component(a);
            r = "./FbSphereFactoryComponent";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbSphereFactoryComponent.Create(n);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", p]);
            }
            return;
          }
        case fb_component_1.UnionComponent.SpringComponent:
          a = "SpringComponent";
          n = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, a);
          if (n) {
            r = e.component(n);
            p = "./FbSpringComponent";
            if (n = ImportHelper_1.ImportHelper.GetModule(p, exports.requireModule)) {
              return n.FbSpringComponent.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", p]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", a]);
            }
            return;
          }
        case fb_component_1.UnionComponent.SpawnMonsterComponent:
          n = "SpawnMonsterComponent";
          r = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, n);
          if (r) {
            p = e.component(r);
            a = "./FbSpawnMonsterComponent";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbSpawnMonsterComponent.Create(p);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", n]);
            }
            return;
          }
        case fb_component_1.UnionComponent.SwitcherComponent:
          r = "SwitcherComponent";
          p = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, r);
          if (p) {
            a = e.component(p);
            n = "./FbSwitcherComponent";
            if (p = ImportHelper_1.ImportHelper.GetModule(n, exports.requireModule)) {
              return p.FbSwitcherComponent.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", n]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", r]);
            }
            return;
          }
        case fb_component_1.UnionComponent.TrampleUe5Component:
          p = "TrampleUe5Component";
          a = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, p);
          if (a) {
            n = e.component(a);
            r = "./FbTrampleUe5Component";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbTrampleUe5Component.Create(n);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", p]);
            }
            return;
          }
        case fb_component_1.UnionComponent.TreasureBoxComponent:
          a = "TreasureBoxComponent";
          n = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, a);
          if (n) {
            r = e.component(n);
            p = "./FbTreasureBoxComponent";
            if (n = ImportHelper_1.ImportHelper.GetModule(p, exports.requireModule)) {
              return n.FbTreasureBoxComponent.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", p]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", a]);
            }
            return;
          }
        case fb_component_1.UnionComponent.TriggerUe5Component:
          n = "TriggerUe5Component";
          r = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, n);
          if (r) {
            p = e.component(r);
            a = "./FbTriggerUe5Component";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbTriggerUe5Component.Create(p);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", n]);
            }
            return;
          }
        case fb_component_1.UnionComponent.UndergroundComponent:
          r = "UndergroundComponent";
          p = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, r);
          if (p) {
            a = e.component(p);
            n = "./FbUndergroundComponent";
            if (p = ImportHelper_1.ImportHelper.GetModule(n, exports.requireModule)) {
              return p.FbUndergroundComponent.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", n]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", r]);
            }
            return;
          }
        case fb_component_1.UnionComponent.VarComponent:
          p = "VarComponent";
          a = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, p);
          if (a) {
            n = e.component(a);
            r = "./FbVarComponent";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbVarComponent.Create(n);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", p]);
            }
            return;
          }
        case fb_component_1.UnionComponent.TriggerComponent:
          a = "TriggerComponent";
          n = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, a);
          if (n) {
            r = e.component(n);
            p = "./FbTriggerComponent";
            if (n = ImportHelper_1.ImportHelper.GetModule(p, exports.requireModule)) {
              return n.FbTriggerComponent.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", p]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", a]);
            }
            return;
          }
        case fb_component_1.UnionComponent.HookLockPoint:
          n = "HookLockPoint";
          r = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, n);
          if (r) {
            p = e.component(r);
            a = "./FbHookLockPoint";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbHookLockPoint.Create(p);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", n]);
            }
            return;
          }
        case fb_component_1.UnionComponent.TargetGearComponent:
          r = "TargetGearComponent";
          p = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, r);
          if (p) {
            a = e.component(p);
            n = "./FbTargetGearComponent";
            if (p = ImportHelper_1.ImportHelper.GetModule(n, exports.requireModule)) {
              return p.FbTargetGearComponent.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", n]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", r]);
            }
            return;
          }
        case fb_component_1.UnionComponent.TargetGearGroupComponent:
          p = "TargetGearGroupComponent";
          a = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, p);
          if (a) {
            n = e.component(a);
            r = "./FbTargetGearGroupComponent";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbTargetGearGroupComponent.Create(n);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", p]);
            }
            return;
          }
        case fb_component_1.UnionComponent.ItemFoundation:
          a = "ItemFoundation";
          n = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, a);
          if (n) {
            r = e.component(n);
            p = "./FbItemFoundation";
            if (n = ImportHelper_1.ImportHelper.GetModule(p, exports.requireModule)) {
              return n.FbItemFoundation.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", p]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", a]);
            }
            return;
          }
        case fb_component_1.UnionComponent.ItemFoundation2:
          n = "ItemFoundation2";
          r = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, n);
          if (r) {
            p = e.component(r);
            a = "./FbItemFoundation2";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbItemFoundation2.Create(p);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", n]);
            }
            return;
          }
        case fb_component_1.UnionComponent.PullingFoundation:
          r = "PullingFoundation";
          p = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, r);
          if (p) {
            a = e.component(p);
            n = "./FbPullingFoundation";
            if (p = ImportHelper_1.ImportHelper.GetModule(n, exports.requireModule)) {
              return p.FbPullingFoundation.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", n]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", r]);
            }
            return;
          }
        case fb_component_1.UnionComponent.JigsawItem:
          p = "JigsawItem";
          a = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, p);
          if (a) {
            n = e.component(a);
            r = "./FbJigsawItem";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbJigsawItem.Create(n);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", p]);
            }
            return;
          }
        case fb_component_1.UnionComponent.JigsawFoundation:
          a = "JigsawFoundation";
          n = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, a);
          if (n) {
            r = e.component(n);
            p = "./FbJigsawFoundation";
            if (n = ImportHelper_1.ImportHelper.GetModule(p, exports.requireModule)) {
              return n.FbJigsawFoundation.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", p]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", a]);
            }
            return;
          }
        case fb_component_1.UnionComponent.CollectComponent:
          n = "CollectComponent";
          r = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, n);
          if (r) {
            p = e.component(r);
            a = "./FbCollectComponent";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbCollectComponent.Create(p);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", n]);
            }
            return;
          }
        case fb_component_1.UnionComponent.TeleControl2:
          r = "TeleControl2";
          p = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, r);
          if (p) {
            a = e.component(p);
            n = "./FbTeleControl2";
            if (p = ImportHelper_1.ImportHelper.GetModule(n, exports.requireModule)) {
              return p.FbTeleControl2.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", n]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", r]);
            }
            return;
          }
        case fb_component_1.UnionComponent.DestructibleItem:
          p = "DestructibleItem";
          a = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, p);
          if (a) {
            n = e.component(a);
            r = "./FbDestructibleItem";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbDestructibleItem.Create(n);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", p]);
            }
            return;
          }
        case fb_component_1.UnionComponent.LevelPlayComponent:
          a = "LevelPlayComponent";
          n = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, a);
          if (n) {
            r = e.component(n);
            p = "./FbLevelPlayComponent";
            if (n = ImportHelper_1.ImportHelper.GetModule(p, exports.requireModule)) {
              return n.FbLevelPlayComponent.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", p]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", a]);
            }
            return;
          }
        case fb_component_1.UnionComponent.VisionComponent:
          n = "VisionComponent";
          r = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, n);
          if (r) {
            p = e.component(r);
            a = "./FbVisionComponent";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbVisionComponent.Create(p);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", n]);
            }
            return;
          }
        case fb_component_1.UnionComponent.VisionCaptureComponent:
          r = "VisionCaptureComponent";
          p = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, r);
          if (p) {
            a = e.component(p);
            n = "./FbVisionCaptureComponent";
            if (p = ImportHelper_1.ImportHelper.GetModule(n, exports.requireModule)) {
              return p.FbVisionCaptureComponent.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", n]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", r]);
            }
            return;
          }
        case fb_component_1.UnionComponent.ResetEntitiesPosComponent:
          p = "ResetEntitiesPosComponent";
          a = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, p);
          if (a) {
            n = e.component(a);
            r = "./FbResetEntitiesPosComponent";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbResetEntitiesPosComponent.Create(n);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", p]);
            }
            return;
          }
        case fb_component_1.UnionComponent.EntityGroupComponent:
          a = "EntityGroupComponent";
          n = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, a);
          if (n) {
            r = e.component(n);
            p = "./FbEntityGroupComponent";
            if (n = ImportHelper_1.ImportHelper.GetModule(p, exports.requireModule)) {
              return n.FbEntityGroupComponent.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", p]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", a]);
            }
            return;
          }
        case fb_component_1.UnionComponent.AdsorbComponent:
          n = "AdsorbComponent";
          r = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, n);
          if (r) {
            p = e.component(r);
            a = "./FbAdsorbComponent";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbAdsorbComponent.Create(p);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", n]);
            }
            return;
          }
        case fb_component_1.UnionComponent.TeleportComponent:
          r = "TeleportComponent";
          p = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, r);
          if (p) {
            a = e.component(p);
            n = "./FbTeleportComponent";
            if (p = ImportHelper_1.ImportHelper.GetModule(n, exports.requireModule)) {
              return p.FbTeleportComponent.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", n]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", r]);
            }
            return;
          }
        case fb_component_1.UnionComponent.TrampleComponent:
          p = "TrampleComponent";
          a = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, p);
          if (a) {
            n = e.component(a);
            r = "./FbTrampleComponent";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbTrampleComponent.Create(n);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", p]);
            }
            return;
          }
        case fb_component_1.UnionComponent.NpcPerformComponent:
          a = "NpcPerformComponent";
          n = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, a);
          if (n) {
            r = e.component(n);
            p = "./FbNpcPerformComponent";
            if (n = ImportHelper_1.ImportHelper.GetModule(p, exports.requireModule)) {
              return n.FbNpcPerformComponent.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", p]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", a]);
            }
            return;
          }
        case fb_component_1.UnionComponent.InteractGearComponent:
          n = "InteractGearComponent";
          r = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, n);
          if (r) {
            p = e.component(r);
            a = "./FbInteractGearComponent";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbInteractGearComponent.Create(p);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", n]);
            }
            return;
          }
        case fb_component_1.UnionComponent.LiftComponent:
          r = "LiftComponent";
          p = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, r);
          if (p) {
            a = e.component(p);
            n = "./FbLiftComponent";
            if (p = ImportHelper_1.ImportHelper.GetModule(n, exports.requireModule)) {
              return p.FbLiftComponent.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", n]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", r]);
            }
            return;
          }
        case fb_component_1.UnionComponent.FollowTrackComponent:
          p = "FollowTrackComponent";
          a = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, p);
          if (a) {
            n = e.component(a);
            r = "./FbFollowTrackComponent";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbFollowTrackComponent.Create(n);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", p]);
            }
            return;
          }
        case fb_component_1.UnionComponent.SceneItemLifeCycleComponent:
          a = "SceneItemLifeCycleComponent";
          n = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, a);
          if (n) {
            r = e.component(n);
            p = "./FbSceneItemLifeCycleComponent";
            if (n = ImportHelper_1.ImportHelper.GetModule(p, exports.requireModule)) {
              return n.FbSceneItemLifeCycleComponent.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", p]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", a]);
            }
            return;
          }
        case fb_component_1.UnionComponent.BubbleComponent:
          n = "BubbleComponent";
          r = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, n);
          if (r) {
            p = e.component(r);
            a = "./FbBubbleComponent";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbBubbleComponent.Create(p);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", n]);
            }
            return;
          }
        case fb_component_1.UnionComponent.FightInteractComponent:
          r = "FightInteractComponent";
          p = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, r);
          if (p) {
            a = e.component(p);
            n = "./FbFightInteractComponent";
            if (p = ImportHelper_1.ImportHelper.GetModule(n, exports.requireModule)) {
              return p.FbFightInteractComponent.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", n]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", r]);
            }
            return;
          }
        case fb_component_1.UnionComponent.NearbyTrackingComponent:
          p = "NearbyTrackingComponent";
          a = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, p);
          if (a) {
            n = e.component(a);
            r = "./FbNearbyTrackingComponent";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbNearbyTrackingComponent.Create(n);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", p]);
            }
            return;
          }
        case fb_component_1.UnionComponent.EntityPackageComponent:
          a = "EntityPackageComponent";
          n = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, a);
          if (n) {
            r = e.component(n);
            p = "./FbEntityPackageComponent";
            if (n = ImportHelper_1.ImportHelper.GetModule(p, exports.requireModule)) {
              return n.FbEntityPackageComponent.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", p]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", a]);
            }
            return;
          }
        case fb_component_1.UnionComponent.SkyboxComponent:
          n = "SkyboxComponent";
          r = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, n);
          if (r) {
            p = e.component(r);
            a = "./FbSkyboxComponent";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbSkyboxComponent.Create(p);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", n]);
            }
            return;
          }
        case fb_component_1.UnionComponent.StateHintComponent:
          r = "StateHintComponent";
          p = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, r);
          if (p) {
            a = e.component(p);
            n = "./FbStateHintComponent";
            if (p = ImportHelper_1.ImportHelper.GetModule(n, exports.requireModule)) {
              return p.FbStateHintComponent.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", n]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", r]);
            }
            return;
          }
        case fb_component_1.UnionComponent.EntityVisibleComponent:
          p = "EntityVisibleComponent";
          a = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, p);
          if (a) {
            n = e.component(a);
            r = "./FbEntityVisibleComponent";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbEntityVisibleComponent.Create(n);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", p]);
            }
            return;
          }
        case fb_component_1.UnionComponent.CombinedVisibleGroupComponent:
          a = "CombinedVisibleGroupComponent";
          n = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, a);
          if (n) {
            r = e.component(n);
            p = "./FbCombinedVisibleGroupComponent";
            if (n = ImportHelper_1.ImportHelper.GetModule(p, exports.requireModule)) {
              return n.FbCombinedVisibleGroupComponent.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", p]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", a]);
            }
            return;
          }
        case fb_component_1.UnionComponent.WeaponComponent:
          n = "WeaponComponent";
          r = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, n);
          if (r) {
            p = e.component(r);
            a = "./FbWeaponComponent";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbWeaponComponent.Create(p);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", n]);
            }
            return;
          }
        case fb_component_1.UnionComponent.DungeonEntryComponent:
          r = "DungeonEntryComponent";
          p = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, r);
          if (p) {
            a = e.component(p);
            n = "./FbDungeonEntryComponent";
            if (p = ImportHelper_1.ImportHelper.GetModule(n, exports.requireModule)) {
              return p.FbDungeonEntryComponent.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", n]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", r]);
            }
            return;
          }
        case fb_component_1.UnionComponent.ResurrectionComponent:
          p = "ResurrectionComponent";
          a = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, p);
          if (a) {
            n = e.component(a);
            r = "./FbResurrectionComponent";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbResurrectionComponent.Create(n);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", p]);
            }
            return;
          }
        case fb_component_1.UnionComponent.BuffProducerComponent:
          a = "BuffProducerComponent";
          n = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, a);
          if (n) {
            r = e.component(n);
            p = "./FbBuffProducerComponent";
            if (n = ImportHelper_1.ImportHelper.GetModule(p, exports.requireModule)) {
              return n.FbBuffProducerComponent.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", p]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", a]);
            }
            return;
          }
        case fb_component_1.UnionComponent.BuffConsumerComponent:
          n = "BuffConsumerComponent";
          r = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, n);
          if (r) {
            p = e.component(r);
            a = "./FbBuffConsumerComponent";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbBuffConsumerComponent.Create(p);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", n]);
            }
            return;
          }
        case fb_component_1.UnionComponent.GuideLineCreatorComponent:
          r = "GuideLineCreatorComponent";
          p = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, r);
          if (p) {
            a = e.component(p);
            n = "./FbGuideLineCreatorComponent";
            if (p = ImportHelper_1.ImportHelper.GetModule(n, exports.requireModule)) {
              return p.FbGuideLineCreatorComponent.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", n]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", r]);
            }
            return;
          }
        case fb_component_1.UnionComponent.InteractAudioComponent:
          p = "InteractAudioComponent";
          a = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, p);
          if (a) {
            n = e.component(a);
            r = "./FbInteractAudioComponent";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbInteractAudioComponent.Create(n);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", p]);
            }
            return;
          }
        case fb_component_1.UnionComponent.DropComponent:
          a = "DropComponent";
          n = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, a);
          if (n) {
            r = e.component(n);
            p = "./FbDropComponent";
            if (n = ImportHelper_1.ImportHelper.GetModule(p, exports.requireModule)) {
              return n.FbDropComponent.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", p]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", a]);
            }
            return;
          }
        case fb_component_1.UnionComponent.AdviseItemComponent:
          n = "AdviseItemComponent";
          r = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, n);
          if (r) {
            p = e.component(r);
            a = "./FbAdviseItemComponent";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbAdviseItemComponent.Create(p);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", n]);
            }
            return;
          }
        case fb_component_1.UnionComponent.VisionItemComponent:
          r = "VisionItemComponent";
          p = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, r);
          if (p) {
            a = e.component(p);
            n = "./FbVisionItemComponent";
            if (p = ImportHelper_1.ImportHelper.GetModule(n, exports.requireModule)) {
              return p.FbVisionItemComponent.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", n]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", r]);
            }
            return;
          }
        case fb_component_1.UnionComponent.MonsterComponent:
          p = "MonsterComponent";
          a = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, p);
          if (a) {
            n = e.component(a);
            r = "./FbMonsterComponent";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbMonsterComponent.Create(n);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", p]);
            }
            return;
          }
        case fb_component_1.UnionComponent.CombatComponent:
          a = "CombatComponent";
          n = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, a);
          if (n) {
            r = e.component(n);
            p = "./FbCombatComponent";
            if (n = ImportHelper_1.ImportHelper.GetModule(p, exports.requireModule)) {
              return n.FbCombatComponent.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", p]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", a]);
            }
            return;
          }
        case fb_component_1.UnionComponent.EntityListComponent:
          n = "EntityListComponent";
          r = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, n);
          if (r) {
            p = e.component(r);
            a = "./FbEntityListComponent";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbEntityListComponent.Create(p);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", n]);
            }
            return;
          }
        case fb_component_1.UnionComponent.AnimalComponent:
          r = "AnimalComponent";
          p = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, r);
          if (p) {
            a = e.component(p);
            n = "./FbAnimalComponent";
            if (p = ImportHelper_1.ImportHelper.GetModule(n, exports.requireModule)) {
              return p.FbAnimalComponent.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", n]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", r]);
            }
            return;
          }
        case fb_component_1.UnionComponent.EntityAudioComponent:
          p = "EntityAudioComponent";
          a = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, p);
          if (a) {
            n = e.component(a);
            r = "./FbEntityAudioComponent";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbEntityAudioComponent.Create(n);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", p]);
            }
            return;
          }
        case fb_component_1.UnionComponent.EntityStateAudioComponent:
          a = "EntityStateAudioComponent";
          n = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, a);
          if (n) {
            r = e.component(n);
            p = "./FbEntityStateAudioComponent";
            if (n = ImportHelper_1.ImportHelper.GetModule(p, exports.requireModule)) {
              return n.FbEntityStateAudioComponent.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", p]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", a]);
            }
            return;
          }
        case fb_component_1.UnionComponent.EntityCustomAudioComponent:
          n = "EntityCustomAudioComponent";
          r = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, n);
          if (r) {
            p = e.component(r);
            a = "./FbEntityCustomAudioComponent";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbEntityCustomAudioComponent.Create(p);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", n]);
            }
            return;
          }
        case fb_component_1.UnionComponent.SceneItemMovementComponent:
          r = "SceneItemMovementComponent";
          p = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, r);
          if (p) {
            a = e.component(p);
            n = "./FbSceneItemMovementComponent";
            if (p = ImportHelper_1.ImportHelper.GetModule(n, exports.requireModule)) {
              return p.FbSceneItemMovementComponent.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", n]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", r]);
            }
            return;
          }
        case fb_component_1.UnionComponent.RangeComponent:
          p = "RangeComponent";
          a = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, p);
          if (a) {
            n = e.component(a);
            r = "./FbRangeComponent";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbRangeComponent.Create(n);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", p]);
            }
            return;
          }
        case fb_component_1.UnionComponent.TimelineTrackControlComponent:
          a = "TimelineTrackControlComponent";
          n = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, a);
          if (n) {
            r = e.component(n);
            p = "./FbTimelineTrackControlComponent";
            if (n = ImportHelper_1.ImportHelper.GetModule(p, exports.requireModule)) {
              return n.FbTimelineTrackControlComponent.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", p]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", a]);
            }
            return;
          }
        case fb_component_1.UnionComponent.SplineComponent:
          n = "SplineComponent";
          r = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, n);
          if (r) {
            p = e.component(r);
            a = "./FbSplineComponent";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbSplineComponent.Create(p);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", n]);
            }
            return;
          }
        case fb_component_1.UnionComponent.SceneActorRefComponent:
          r = "SceneActorRefComponent";
          p = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, r);
          if (p) {
            a = e.component(p);
            n = "./FbSceneActorRefComponent";
            if (p = ImportHelper_1.ImportHelper.GetModule(n, exports.requireModule)) {
              return p.FbSceneActorRefComponent.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", n]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", r]);
            }
            return;
          }
        case fb_component_1.UnionComponent.EditCustomAoiComponent:
          p = "EditCustomAoiComponent";
          a = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, p);
          if (a) {
            n = e.component(a);
            r = "./FbEditCustomAoiComponent";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbEditCustomAoiComponent.Create(n);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", p]);
            }
            return;
          }
        case fb_component_1.UnionComponent.SceneBulletComponent:
          a = "SceneBulletComponent";
          n = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, a);
          if (n) {
            r = e.component(n);
            p = "./FbSceneBulletComponent";
            if (n = ImportHelper_1.ImportHelper.GetModule(p, exports.requireModule)) {
              return n.FbSceneBulletComponent.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", p]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", a]);
            }
            return;
          }
        case fb_component_1.UnionComponent.TurntableControlComponent:
          n = "TurntableControlComponent";
          r = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, n);
          if (r) {
            p = e.component(r);
            a = "./FbTurntableControlComponent";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbTurntableControlComponent.Create(p);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", n]);
            }
            return;
          }
        case fb_component_1.UnionComponent.ConditionListenerComponent:
          r = "ConditionListenerComponent";
          p = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, r);
          if (p) {
            a = e.component(p);
            n = "./FbConditionListenerComponent";
            if (p = ImportHelper_1.ImportHelper.GetModule(n, exports.requireModule)) {
              return p.FbConditionListenerComponent.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", n]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", r]);
            }
            return;
          }
        case fb_component_1.UnionComponent.AttachTargetComponent:
          p = "AttachTargetComponent";
          a = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, p);
          if (a) {
            n = e.component(a);
            r = "./FbAttachTargetComponent";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbAttachTargetComponent.Create(n);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", p]);
            }
            return;
          }
        case fb_component_1.UnionComponent.ReboundComponent:
          a = "ReboundComponent";
          n = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, a);
          if (n) {
            r = e.component(n);
            p = "./FbReboundComponent";
            if (n = ImportHelper_1.ImportHelper.GetModule(p, exports.requireModule)) {
              return n.FbReboundComponent.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", p]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", a]);
            }
            return;
          }
        case fb_component_1.UnionComponent.LevitateMagnetComponent:
          n = "LevitateMagnetComponent";
          r = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, n);
          if (r) {
            p = e.component(r);
            a = "./FbLevitateMagnetComponent";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbLevitateMagnetComponent.Create(p);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", n]);
            }
            return;
          }
        case fb_component_1.UnionComponent.PhotoTargetComponent:
          r = "PhotoTargetComponent";
          p = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, r);
          if (p) {
            a = e.component(p);
            n = "./FbPhotoTargetComponent";
            if (p = ImportHelper_1.ImportHelper.GetModule(n, exports.requireModule)) {
              return p.FbPhotoTargetComponent.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", n]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", r]);
            }
            return;
          }
        case fb_component_1.UnionComponent.AiAlertNotifyComponent:
          p = "AiAlertNotifyComponent";
          a = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, p);
          if (a) {
            n = e.component(a);
            r = "./FbAiAlertNotifyComponent";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbAiAlertNotifyComponent.Create(n);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", p]);
            }
            return;
          }
        case fb_component_1.UnionComponent.MonsterGachaItemComponent:
          a = "MonsterGachaItemComponent";
          n = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, a);
          if (n) {
            r = e.component(n);
            p = "./FbMonsterGachaItemComponent";
            if (n = ImportHelper_1.ImportHelper.GetModule(p, exports.requireModule)) {
              return n.FbMonsterGachaItemComponent.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", p]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", a]);
            }
            return;
          }
        case fb_component_1.UnionComponent.MonsterGachaBaseComponent:
          n = "MonsterGachaBaseComponent";
          r = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, n);
          if (r) {
            p = e.component(r);
            a = "./FbMonsterGachaBaseComponent";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbMonsterGachaBaseComponent.Create(p);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", n]);
            }
            return;
          }
        case fb_component_1.UnionComponent.ProgressBarControlComponent:
          r = "ProgressBarControlComponent";
          p = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, r);
          if (p) {
            a = e.component(p);
            n = "./FbProgressBarControlComponent";
            if (p = ImportHelper_1.ImportHelper.GetModule(n, exports.requireModule)) {
              return p.FbProgressBarControlComponent.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", n]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", r]);
            }
            return;
          }
        case fb_component_1.UnionComponent.ConveyorBeltComponent:
          p = "ConveyorBeltComponent";
          a = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, p);
          if (a) {
            n = e.component(a);
            r = "./FbConveyorBeltComponent";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbConveyorBeltComponent.Create(n);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", p]);
            }
            return;
          }
        case fb_component_1.UnionComponent.DynamicTeleportComponent:
          a = "DynamicTeleportComponent";
          n = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, a);
          if (n) {
            r = e.component(n);
            p = "./FbDynamicTeleportComponent";
            if (n = ImportHelper_1.ImportHelper.GetModule(p, exports.requireModule)) {
              return n.FbDynamicTeleportComponent.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", p]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", a]);
            }
            return;
          }
        case fb_component_1.UnionComponent.ExploreSkillInteractComponent:
          n = "ExploreSkillInteractComponent";
          r = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, n);
          if (r) {
            p = e.component(r);
            a = "./FbExploreSkillInteractComponent";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbExploreSkillInteractComponent.Create(p);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", n]);
            }
            return;
          }
        case fb_component_1.UnionComponent.FanComponent:
          r = "FanComponent";
          p = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, r);
          if (p) {
            a = e.component(p);
            n = "./FbFanComponent";
            if (p = ImportHelper_1.ImportHelper.GetModule(n, exports.requireModule)) {
              return p.FbFanComponent.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", n]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", r]);
            }
            return;
          }
        case fb_component_1.UnionComponent.ResetSelfPosComponent:
          p = "ResetSelfPosComponent";
          a = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, p);
          if (a) {
            n = e.component(a);
            r = "./FbResetSelfPosComponent";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbResetSelfPosComponent.Create(n);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", p]);
            }
            return;
          }
        case fb_component_1.UnionComponent.PasserbyNpcSpawnComponent:
          a = "PasserbyNpcSpawnComponent";
          n = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, a);
          if (n) {
            r = e.component(n);
            p = "./FbPasserbyNpcSpawnComponent";
            if (n = ImportHelper_1.ImportHelper.GetModule(p, exports.requireModule)) {
              return n.FbPasserbyNpcSpawnComponent.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", p]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", a]);
            }
            return;
          }
        case fb_component_1.UnionComponent.ModelComponent:
          n = "ModelComponent";
          r = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, n);
          if (r) {
            p = e.component(r);
            a = "./FbModelComponent";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbModelComponent.Create(p);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", n]);
            }
            return;
          }
        case fb_component_1.UnionComponent.EntityBundleComponent:
          r = "EntityBundleComponent";
          p = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, r);
          if (p) {
            a = e.component(p);
            n = "./FbEntityBundleComponent";
            if (p = ImportHelper_1.ImportHelper.GetModule(n, exports.requireModule)) {
              return p.FbEntityBundleComponent.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", n]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", r]);
            }
            return;
          }
        case fb_component_1.UnionComponent.BeamCastComponent:
          p = "BeamCastComponent";
          a = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, p);
          if (a) {
            n = e.component(a);
            r = "./FbBeamCastComponent";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbBeamCastComponent.Create(n);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", p]);
            }
            return;
          }
        case fb_component_1.UnionComponent.BeamReceiveComponent:
          a = "BeamReceiveComponent";
          n = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, a);
          if (n) {
            r = e.component(n);
            p = "./FbBeamReceiveComponent";
            if (n = ImportHelper_1.ImportHelper.GetModule(p, exports.requireModule)) {
              return n.FbBeamReceiveComponent.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", p]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", a]);
            }
            return;
          }
        case fb_component_1.UnionComponent.TimeStopComponent:
          n = "TimeStopComponent";
          r = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, n);
          if (r) {
            p = e.component(r);
            a = "./FbTimeStopComponent";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbTimeStopComponent.Create(p);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", n]);
            }
            return;
          }
        case fb_component_1.UnionComponent.PortalComponent:
          r = "PortalComponent";
          p = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, r);
          if (p) {
            a = e.component(p);
            n = "./FbPortalComponent";
            if (p = ImportHelper_1.ImportHelper.GetModule(n, exports.requireModule)) {
              return p.FbPortalComponent.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", n]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", r]);
            }
            return;
          }
        case fb_component_1.UnionComponent.NoRenderPortalComponent:
          p = "NoRenderPortalComponent";
          a = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, p);
          if (a) {
            n = e.component(a);
            r = "./FbNoRenderPortalComponent";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbNoRenderPortalComponent.Create(n);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", p]);
            }
            return;
          }
        case fb_component_1.UnionComponent.EffectAreaComponent:
          a = "EffectAreaComponent";
          n = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, a);
          if (n) {
            r = e.component(n);
            p = "./FbEffectAreaComponent";
            if (n = ImportHelper_1.ImportHelper.GetModule(p, exports.requireModule)) {
              return n.FbEffectAreaComponent.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", p]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", a]);
            }
            return;
          }
        case fb_component_1.UnionComponent.PhysicsConstraintComponent:
          n = "PhysicsConstraintComponent";
          r = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, n);
          if (r) {
            p = e.component(r);
            a = "./FbPhysicsConstraintComponent";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbPhysicsConstraintComponent.Create(p);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", n]);
            }
            return;
          }
        case fb_component_1.UnionComponent.FollowShooterComponent:
          r = "FollowShooterComponent";
          p = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, r);
          if (p) {
            a = e.component(p);
            n = "./FbFollowShooterComponent";
            if (p = ImportHelper_1.ImportHelper.GetModule(n, exports.requireModule)) {
              return p.FbFollowShooterComponent.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", n]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", r]);
            }
            return;
          }
        case fb_component_1.UnionComponent.ConnectorComponent:
          p = "ConnectorComponent";
          a = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, p);
          if (a) {
            n = e.component(a);
            r = "./FbConnectorComponent";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbConnectorComponent.Create(n);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", p]);
            }
            return;
          }
        case fb_component_1.UnionComponent.CharacterConnectorComponent:
          a = "CharacterConnectorComponent";
          n = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, a);
          if (n) {
            r = e.component(n);
            p = "./FbCharacterConnectorComponent";
            if (n = ImportHelper_1.ImportHelper.GetModule(p, exports.requireModule)) {
              return n.FbCharacterConnectorComponent.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", p]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", a]);
            }
            return;
          }
        case fb_component_1.UnionComponent.HitComponent:
          n = "HitComponent";
          r = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, n);
          if (r) {
            p = e.component(r);
            a = "./FbHitComponent";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbHitComponent.Create(p);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", n]);
            }
            return;
          }
        case fb_component_1.UnionComponent.DynamicPortalCreatorComponent:
          r = "DynamicPortalCreatorComponent";
          p = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, r);
          if (p) {
            a = e.component(p);
            n = "./FbDynamicPortalCreatorComponent";
            if (p = ImportHelper_1.ImportHelper.GetModule(n, exports.requireModule)) {
              return p.FbDynamicPortalCreatorComponent.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", n]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", r]);
            }
            return;
          }
        case fb_component_1.UnionComponent.AiGearStrategyComponent:
          p = "AiGearStrategyComponent";
          a = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, p);
          if (a) {
            n = e.component(a);
            r = "./FbAiGearStrategyComponent";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbAiGearStrategyComponent.Create(n);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", p]);
            }
            return;
          }
        case fb_component_1.UnionComponent.PickInteractComponent:
          a = "PickInteractComponent";
          n = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, a);
          if (n) {
            r = e.component(n);
            p = "./FbPickInteractComponent";
            if (n = ImportHelper_1.ImportHelper.GetModule(p, exports.requireModule)) {
              return n.FbPickInteractComponent.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", p]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", a]);
            }
            return;
          }
        case fb_component_1.UnionComponent.ClientTriggerComponent:
          n = "ClientTriggerComponent";
          r = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, n);
          if (r) {
            p = e.component(r);
            a = "./FbClientTriggerComponent";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbClientTriggerComponent.Create(p);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", n]);
            }
            return;
          }
        case fb_component_1.UnionComponent.LocationSafetyComponent:
          r = "LocationSafetyComponent";
          p = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, r);
          if (p) {
            a = e.component(p);
            n = "./FbLocationSafetyComponent";
            if (p = ImportHelper_1.ImportHelper.GetModule(n, exports.requireModule)) {
              return p.FbLocationSafetyComponent.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", n]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", r]);
            }
            return;
          }
        case fb_component_1.UnionComponent.BatchBulletCasterComponent:
          p = "BatchBulletCasterComponent";
          a = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, p);
          if (a) {
            n = e.component(a);
            r = "./FbBatchBulletCasterComponent";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbBatchBulletCasterComponent.Create(n);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", p]);
            }
            return;
          }
        case fb_component_1.UnionComponent.VehicleComponent:
          a = "VehicleComponent";
          n = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, a);
          if (n) {
            r = e.component(n);
            p = "./FbVehicleComponent";
            if (n = ImportHelper_1.ImportHelper.GetModule(p, exports.requireModule)) {
              return n.FbVehicleComponent.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", p]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", a]);
            }
            return;
          }
        case fb_component_1.UnionComponent.EnrichmentAreaComponent:
          n = "EnrichmentAreaComponent";
          r = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, n);
          if (r) {
            p = e.component(r);
            a = "./FbEnrichmentAreaComponent";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbEnrichmentAreaComponent.Create(p);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", n]);
            }
            return;
          }
        case fb_component_1.UnionComponent.ChessmanComponent:
          r = "ChessmanComponent";
          p = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, r);
          if (p) {
            a = e.component(p);
            n = "./FbChessmanComponent";
            if (p = ImportHelper_1.ImportHelper.GetModule(n, exports.requireModule)) {
              return p.FbChessmanComponent.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", n]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", r]);
            }
            return;
          }
        case fb_component_1.UnionComponent.MonitorComponent:
          p = "MonitorComponent";
          a = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, p);
          if (a) {
            n = e.component(a);
            r = "./FbMonitorComponent";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbMonitorComponent.Create(n);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", p]);
            }
            return;
          }
        case fb_component_1.UnionComponent.GroupAiComponent:
          a = "GroupAiComponent";
          n = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, a);
          if (n) {
            r = e.component(n);
            p = "./FbGroupAiComponent";
            if (n = ImportHelper_1.ImportHelper.GetModule(p, exports.requireModule)) {
              return n.FbGroupAiComponent.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", p]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", a]);
            }
            return;
          }
        case fb_component_1.UnionComponent.InhalationAbilityComponent:
          n = "InhalationAbilityComponent";
          r = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, n);
          if (r) {
            p = e.component(r);
            a = "./FbInhalationAbilityComponent";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbInhalationAbilityComponent.Create(p);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", n]);
            }
            return;
          }
        case fb_component_1.UnionComponent.InhaledItemComponent:
          r = "InhaledItemComponent";
          p = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, r);
          if (p) {
            a = e.component(p);
            n = "./FbInhaledItemComponent";
            if (p = ImportHelper_1.ImportHelper.GetModule(n, exports.requireModule)) {
              return p.FbInhaledItemComponent.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", n]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", r]);
            }
            return;
          }
        case fb_component_1.UnionComponent.AirPassageComponent:
          p = "AirPassageComponent";
          a = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, p);
          if (a) {
            n = e.component(a);
            r = "./FbAirPassageComponent";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbAirPassageComponent.Create(n);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", p]);
            }
            return;
          }
        case fb_component_1.UnionComponent.RenderSpecifiedRangeComponent:
          a = "RenderSpecifiedRangeComponent";
          n = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, a);
          if (n) {
            r = e.component(n);
            p = "./FbRenderSpecifiedRangeComponent";
            if (n = ImportHelper_1.ImportHelper.GetModule(p, exports.requireModule)) {
              return n.FbRenderSpecifiedRangeComponent.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", p]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", a]);
            }
            return;
          }
        case fb_component_1.UnionComponent.LevelPrefabPerformComponent:
          n = "LevelPrefabPerformComponent";
          r = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, n);
          if (r) {
            p = e.component(r);
            a = "./FbLevelPrefabPerformComponent";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbLevelPrefabPerformComponent.Create(p);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", n]);
            }
            return;
          }
        case fb_component_1.UnionComponent.SceneItemAiComponent:
          r = "SceneItemAiComponent";
          p = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, r);
          if (p) {
            a = e.component(p);
            n = "./FbSceneItemAiComponent";
            if (p = ImportHelper_1.ImportHelper.GetModule(n, exports.requireModule)) {
              return p.FbSceneItemAiComponent.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", n]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", r]);
            }
            return;
          }
        case fb_component_1.UnionComponent.GravityFlipComponent:
          p = "GravityFlipComponent";
          a = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, p);
          if (a) {
            n = e.component(a);
            r = "./FbGravityFlipComponent";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbGravityFlipComponent.Create(n);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", p]);
            }
            return;
          }
        case fb_component_1.UnionComponent.LevelSequenceFrameEventComponent:
          a = "LevelSequenceFrameEventComponent";
          n = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, a);
          if (n) {
            r = e.component(n);
            p = "./FbLevelSequenceFrameEventComponent";
            if (n = ImportHelper_1.ImportHelper.GetModule(p, exports.requireModule)) {
              return n.FbLevelSequenceFrameEventComponent.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", p]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", a]);
            }
            return;
          }
        case fb_component_1.UnionComponent.LevelQteComponent:
          n = "LevelQteComponent";
          r = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, n);
          if (r) {
            p = e.component(r);
            a = "./FbLevelQteComponent";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbLevelQteComponent.Create(p);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", n]);
            }
            return;
          }
        case fb_component_1.UnionComponent.WalkingPatternComponent:
          r = "WalkingPatternComponent";
          p = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, r);
          if (p) {
            a = e.component(p);
            n = "./FbWalkingPatternComponent";
            if (p = ImportHelper_1.ImportHelper.GetModule(n, exports.requireModule)) {
              return p.FbWalkingPatternComponent.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", n]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", r]);
            }
            return;
          }
        case fb_component_1.UnionComponent.LifePointCenterComponent:
          p = "LifePointCenterComponent";
          a = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, p);
          if (a) {
            n = e.component(a);
            r = "./FbLifePointCenterComponent";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbLifePointCenterComponent.Create(n);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", p]);
            }
            return;
          }
        case fb_component_1.UnionComponent.HackManagementComponent:
          a = "HackManagementComponent";
          n = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, a);
          if (n) {
            r = e.component(n);
            p = "./FbHackManagementComponent";
            if (n = ImportHelper_1.ImportHelper.GetModule(p, exports.requireModule)) {
              return n.FbHackManagementComponent.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", p]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", a]);
            }
            return;
          }
        case fb_component_1.UnionComponent.ClientConditionListenerComponent:
          n = "ClientConditionListenerComponent";
          r = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, n);
          if (r) {
            p = e.component(r);
            a = "./FbClientConditionListenerComponent";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbClientConditionListenerComponent.Create(p);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", n]);
            }
            return;
          }
        case fb_component_1.UnionComponent.TemplateEntitySpawnerComponent:
          r = "TemplateEntitySpawnerComponent";
          p = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, r);
          if (p) {
            a = e.component(p);
            n = "./FbTemplateEntitySpawnerComponent";
            if (p = ImportHelper_1.ImportHelper.GetModule(n, exports.requireModule)) {
              return p.FbTemplateEntitySpawnerComponent.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", n]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", r]);
            }
            return;
          }
        case fb_component_1.UnionComponent.WindSourceComponent:
          p = "WindSourceComponent";
          a = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, p);
          if (a) {
            n = e.component(a);
            r = "./FbWindSourceComponent";
            if (a = ImportHelper_1.ImportHelper.GetModule(r, exports.requireModule)) {
              return a.FbWindSourceComponent.Create(n);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", r]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", p]);
            }
            return;
          }
        case fb_component_1.UnionComponent.SlideRailComponent:
          a = "SlideRailComponent";
          n = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, a);
          if (n) {
            r = e.component(n);
            p = "./FbSlideRailComponent";
            if (n = ImportHelper_1.ImportHelper.GetModule(p, exports.requireModule)) {
              return n.FbSlideRailComponent.Create(r);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", p]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", a]);
            }
            return;
          }
        case fb_component_1.UnionComponent.CurveControlComponent:
          n = "CurveControlComponent";
          r = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, n);
          if (r) {
            p = e.component(r);
            a = "./FbCurveControlComponent";
            if (r = ImportHelper_1.ImportHelper.GetModule(a, exports.requireModule)) {
              return r.FbCurveControlComponent.Create(p);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", a]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", n]);
            }
            return;
          }
        case fb_component_1.UnionComponent.EntityBatchRefreshComponent:
          r = "EntityBatchRefreshComponent";
          p = ImportHelper_1.ImportHelper.CreateInstance(o, exports.requireModule, r);
          if (p) {
            a = e.component(p);
            n = "./FbEntityBatchRefreshComponent";
            if (p = ImportHelper_1.ImportHelper.GetModule(n, exports.requireModule)) {
              return p.FbEntityBatchRefreshComponent.Create(a);
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 3, "获取InstanceModule失败", ["ComponentType", t], ["InterfaceModulePath", n]);
              }
              return;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Entity", 3, "创建fbObject失败", ["ComponentType", t], ["FbModulePath", o], ["FbClassName", r]);
            }
            return;
          }
        default:
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Entity", 3, "未实现该Component的反序列", ["ComponentType", t]);
          }
      }
    }
  }
}
exports.ComponentReadHelper = ComponentReadHelper;
//# sourceMappingURL=ComponentReadHelper.js.map