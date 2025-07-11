"use strict";

function getNodesWithNoDependencies(e) {
  const o = [];
  [...e.entries()].forEach(([e, r]) => {
    if (r.DependsOn.size === 0) {
      o.push(e);
    }
  });
  return o;
}
function getNewDependsOnMap(e) {
  return new Map([...e.entries()].map(([e, r]) => [e, new Set(r.DependsOn)]));
}
function topologicalSort(e, r) {
  var o = [];
  const t = getNewDependsOnMap(e);
  const s = [...r];
  while (s.length > 0) {
    const n = s.pop();
    o.push(n);
    e.get(n).DependedOnBy.forEach(e => {
      var r = t.get(e);
      r.delete(n);
      if (r.size === 0) {
        s.push(e);
      }
    });
  }
  return o;
}
function getNodeCumulativePriorities(e, r) {
  const o = new Map();
  for (var t = topologicalSort(e, r); t.length > 0;) {
    var s = t.pop();
    var n = e.get(s);
    var i = n.Priority ?? 0;
    var n = Math.max(...[...n.DependedOnBy.keys()].map(e => {
      var r = o.get(e);
      if (r === undefined) {
        throw new Error("Expected to have already computed the cumulative priority for node " + e);
      }
      return r;
    }), 0);
    o.set(s, i + n);
  }
  return o;
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompositeError = exports.graphHasCycles = exports.getNodeCumulativePriorities = exports.getNodesWithNoDependencies = undefined;
exports.getNodesWithNoDependencies = getNodesWithNoDependencies;
exports.getNodeCumulativePriorities = getNodeCumulativePriorities;
const searchForCycleDFS = (e, r, o) => {
  for (var t = [{
    Node: o,
    Traversing: false
  }]; t.length > 0;) {
    var s = t[t.length - 1];
    if (s.Traversing) {
      r.set(s.Node, false);
      t.pop();
    } else if (r.has(s.Node)) {
      if (r.get(s.Node)) {
        return (n = t.filter(e => e.Traversing).map(e => e.Node)).slice(n.indexOf(s.Node));
      }
      t.pop();
    } else {
      r.set(s.Node, true);
      t[t.length - 1] = {
        ...s,
        Traversing: true
      };
      var n = e.get(s.Node);
      if (!n) {
        throw new Error(`Could not find node "${s.Node}" in the graph`);
      }
      t.push(...[...n.DependedOnBy].map(e => ({
        Node: e,
        Traversing: false
      })));
    }
  }
  return [];
};
function graphHasCycles(e) {
  var r;
  var o = new Map();
  for ([r] of e.entries()) {
    if (!o.has(r)) {
      var t = searchForCycleDFS(e, o, r);
      if (t.length) {
        return {
          HasCycle: true,
          Cycle: t
        };
      }
    }
  }
  return {
    HasCycle: false
  };
}
exports.graphHasCycles = graphHasCycles;
class CompositeError extends Error {
  constructor(e, r) {
    super(r ?? `CompositeError (包含 ${e.length} 个错误)`);
    this.Errors = [];
    this.name = "CompositeError";
    this.Errors = e;
    this.stack = this.stack + " " + e.map((e, r) => `[错误 ${r + 1}] ${e.stack ?? e.message}`).join("\n\n");
    Object.setPrototypeOf(this, CompositeError.prototype);
  }
}
exports.CompositeError = CompositeError;
//# sourceMappingURL=TaskUtils.js.map