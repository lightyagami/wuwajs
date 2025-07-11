"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskGraph = undefined;
const Log_1 = require("../../../Core/Common/Log");
const PriorityQueue_1 = require("../../../Core/Container/PriorityQueue");
const TaskGraphVisualizer_1 = require("./TaskGraphVisualizer");
const TaskUtils_1 = require("./TaskUtils");
class TaskGraph {
  constructor(r, s) {
    this.BK1 = new Map();
    this.kK1 = [];
    this.E7 = (r, s) => {
      var e = (0, TaskUtils_1.getNodeCumulativePriorities)(this.BK1, this.kK1);
      return e.get(r) - e.get(s);
    };
    [...r.entries()].forEach(([r, s]) => {
      this.BK1.set(r, {
        ...s,
        DependsOn: new Set(),
        DependedOnBy: new Set(),
        Failed: false
      });
    });
    s.forEach(([r, s]) => {
      var e = this.BK1.get(r);
      var o = this.BK1.get(s);
      if (!e) {
        throw new Error(`检查dependencies参数传入的被依赖ID: ${r}, 不在nodeMap中`);
      }
      if (!o) {
        throw new Error(`检查dependencies参数传入的依赖ID ${s}, 不在nodeMap中`);
      }
      e.DependedOnBy.add(s);
      o.DependsOn.add(r);
    });
    this.kK1 = (0, TaskUtils_1.getNodesWithNoDependencies)(this.BK1);
    if (this.kK1.length === 0 && r.size > 0) {
      throw new Error("找不到Task执行起点, 可能有一个依赖链包含了所有的Task");
    }
    r = (0, TaskUtils_1.graphHasCycles)(this.BK1);
    if (r.HasCycle) {
      throw new Error(`检测到了循环依赖:
${r.Cycle.join("\n")}`);
    }
    if (TaskGraph.VisualizeTaskGraph && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("TaskGraph", 72, new TaskGraphVisualizer_1.TaskGraphVisualizer(s).Visualize());
    }
  }
  async Run(t) {
    const i = t?.Concurrency;
    if (i !== undefined && i < 0) {
      throw new Error("Concurrency需要是正数或者不传, 现在: " + t?.Concurrency);
    }
    const a = new PriorityQueue_1.PriorityQueue(this.E7);
    this.kK1.forEach(r => {
      a.Push(r);
    });
    let n = 0;
    const h = async () => {
      const e = a.Pop();
      if (!e) {
        throw new Error("尝试调度一个Task的时候, 发现没货了!");
      }
      const o = this.BK1.get(e);
      try {
        n += 1;
        if (!o.Failed) {
          await o.Run();
        }
      } catch (r) {
        o.Failed = true;
        throw r instanceof Error ? (Log_1.Log.CheckError() && Log_1.Log.ErrorWithStack("TaskGraph", 72, "TaskGraph执行异常", r, ["error", r.message], ["taskToRun", o]), r) : (Log_1.Log.CheckError() && Log_1.Log.Error("TaskGraph", 72, "TaskGraph执行异常", ["error", r], ["taskToRun", o]), new Error("TaskGraph执行异常"));
      } finally {
        if (t?.ContinueEvenFail ?? !o.Failed) {
          --n;
          o.DependedOnBy.forEach(r => {
            var s = this.BK1.get(r);
            if (o.Failed) {
              s.Failed = true;
            }
            s.DependsOn.delete(e);
            if (s.DependsOn.size === 0) {
              a.Push(r);
            }
          });
        }
      }
    };
    return new Promise((r, s) => {
      const e = [];
      const o = () => {
        if (a.Empty && n === 0) {
          if (e.length === 0) {
            r();
          } else {
            s(new TaskUtils_1.CompositeError(e));
          }
        } else {
          while (!a.Empty && (i === undefined || n < i)) {
            h().then(() => {
              o();
            }).catch(r => {
              r = r instanceof Error ? r : new Error("trySchedulingTasks error");
              e.push(r);
              if (t?.ContinueEvenFail) {
                o();
              } else {
                s(r);
              }
            });
          }
        }
      };
      o();
    });
  }
}
(exports.TaskGraph = TaskGraph).VisualizeTaskGraph = false;
//# sourceMappingURL=TaskGraph.js.map