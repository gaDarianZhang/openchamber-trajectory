(() => {
  var __create = Object.create;
  var __getProtoOf = Object.getPrototypeOf;
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  function __accessProp(key) {
    return this[key];
  }
  var __toESMCache_node;
  var __toESMCache_esm;
  var __toESM = (mod, isNodeMode, target) => {
    var canCache = mod != null && typeof mod === "object";
    if (canCache) {
      var cache = isNodeMode ? __toESMCache_node ??= new WeakMap : __toESMCache_esm ??= new WeakMap;
      var cached = cache.get(mod);
      if (cached)
        return cached;
    }
    target = mod != null ? __create(__getProtoOf(mod)) : {};
    const to = isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
    if (mod && typeof mod === "object" || typeof mod === "function") {
      for (let key of __getOwnPropNames(mod))
        if (!__hasOwnProp.call(to, key))
          __defProp(to, key, {
            get: __accessProp.bind(mod, key),
            enumerable: true
          });
    }
    if (canCache)
      cache.set(mod, to);
    return to;
  };
  var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

  // node_modules/react/cjs/react.production.js
  var require_react_production = __commonJS(function(exports) {
    var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
    var REACT_PORTAL_TYPE = Symbol.for("react.portal");
    var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
    var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
    var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer");
    var REACT_CONTEXT_TYPE = Symbol.for("react.context");
    var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
    var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
    var REACT_MEMO_TYPE = Symbol.for("react.memo");
    var REACT_LAZY_TYPE = Symbol.for("react.lazy");
    var REACT_ACTIVITY_TYPE = Symbol.for("react.activity");
    var REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition");
    var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
    function getIteratorFn(maybeIterable) {
      if (maybeIterable === null || typeof maybeIterable !== "object")
        return null;
      maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
      return typeof maybeIterable === "function" ? maybeIterable : null;
    }
    var ReactNoopUpdateQueue = {
      isMounted: function() {
        return false;
      },
      enqueueForceUpdate: function() {},
      enqueueReplaceState: function() {},
      enqueueSetState: function() {}
    };
    var assign = Object.assign;
    var emptyObject = {};
    function Component(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }
    Component.prototype.isReactComponent = {};
    Component.prototype.setState = function(partialState, callback) {
      if (typeof partialState !== "object" && typeof partialState !== "function" && partialState != null)
        throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, partialState, callback, "setState");
    };
    Component.prototype.forceUpdate = function(callback) {
      this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
    };
    function ComponentDummy() {}
    ComponentDummy.prototype = Component.prototype;
    function PureComponent(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }
    var pureComponentPrototype = PureComponent.prototype = new ComponentDummy;
    pureComponentPrototype.constructor = PureComponent;
    assign(pureComponentPrototype, Component.prototype);
    pureComponentPrototype.isPureReactComponent = true;
    var isArrayImpl = Array.isArray;
    function noop() {}
    var ReactSharedInternals = { H: null, A: null, T: null, S: null };
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function ReactElement(type, key, props) {
      var refProp = props.ref;
      return {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        ref: refProp !== undefined ? refProp : null,
        props
      };
    }
    function cloneAndReplaceKey(oldElement, newKey) {
      return ReactElement(oldElement.type, newKey, oldElement.props);
    }
    function isValidElement(object) {
      return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    function escape(key) {
      var escaperLookup = { "=": "=0", ":": "=2" };
      return "$" + key.replace(/[=:]/g, function(match) {
        return escaperLookup[match];
      });
    }
    var userProvidedKeyEscapeRegex = /\/+/g;
    function getElementKey(element, index) {
      return typeof element === "object" && element !== null && element.key != null ? escape("" + element.key) : index.toString(36);
    }
    function resolveThenable(thenable) {
      switch (thenable.status) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          throw thenable.reason;
        default:
          switch (typeof thenable.status === "string" ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(function(fulfilledValue) {
            thenable.status === "pending" && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
          }, function(error) {
            thenable.status === "pending" && (thenable.status = "rejected", thenable.reason = error);
          })), thenable.status) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw thenable.reason;
          }
      }
      throw thenable;
    }
    function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
      var type = typeof children;
      if (type === "undefined" || type === "boolean")
        children = null;
      var invokeCallback = false;
      if (children === null)
        invokeCallback = true;
      else
        switch (type) {
          case "bigint":
          case "string":
          case "number":
            invokeCallback = true;
            break;
          case "object":
            switch (children.$$typeof) {
              case REACT_ELEMENT_TYPE:
              case REACT_PORTAL_TYPE:
                invokeCallback = true;
                break;
              case REACT_LAZY_TYPE:
                return invokeCallback = children._init, mapIntoArray(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
            }
        }
      if (invokeCallback)
        return callback = callback(children), invokeCallback = nameSoFar === "" ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", invokeCallback != null && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
          return c;
        })) : callback != null && (isValidElement(callback) && (callback = cloneAndReplaceKey(callback, escapedPrefix + (callback.key == null || children && children.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + invokeCallback)), array.push(callback)), 1;
      invokeCallback = 0;
      var nextNamePrefix = nameSoFar === "" ? "." : nameSoFar + ":";
      if (isArrayImpl(children))
        for (var i = 0;i < children.length; i++)
          nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
      else if (i = getIteratorFn(children), typeof i === "function")
        for (children = i.call(children), i = 0;!(nameSoFar = children.next()).done; )
          nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
      else if (type === "object") {
        if (typeof children.then === "function")
          return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
        array = String(children);
        throw Error("Objects are not valid as a React child (found: " + (array === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead.");
      }
      return invokeCallback;
    }
    function mapChildren(children, func, context) {
      if (children == null)
        return children;
      var result = [], count = 0;
      mapIntoArray(children, result, "", "", function(child) {
        return func.call(context, child, count++);
      });
      return result;
    }
    function lazyInitializer(payload) {
      if (payload._status === -1) {
        var ctor = payload._result, thenable = ctor();
        thenable.then(function(moduleObject) {
          if (payload._status === 0 || payload._status === -1)
            payload._status = 1, payload._result = moduleObject, thenable.status === undefined && (thenable.status = "fulfilled", thenable.value = moduleObject);
        }, function(error) {
          if (payload._status === 0 || payload._status === -1)
            payload._status = 2, payload._result = error, thenable.status === undefined && (thenable.status = "rejected", thenable.reason = error);
        });
        payload._status === -1 && (payload._status = 0, payload._result = thenable);
      }
      if (payload._status === 1)
        return payload._result.default;
      throw payload._result;
    }
    var reportGlobalError = typeof reportError === "function" ? reportError : function(error) {
      if (typeof window === "object" && typeof window.ErrorEvent === "function") {
        var event = new window.ErrorEvent("error", {
          bubbles: true,
          cancelable: true,
          message: typeof error === "object" && error !== null && typeof error.message === "string" ? String(error.message) : String(error),
          error
        });
        if (!window.dispatchEvent(event))
          return;
      } else if (typeof process === "object" && typeof process.emit === "function") {
        process.emit("uncaughtException", error);
        return;
      }
      console.error(error);
    };
    function startTransition(scope) {
      var prevTransition = ReactSharedInternals.T, currentTransition = {};
      currentTransition.types = prevTransition !== null ? prevTransition.types : null;
      ReactSharedInternals.T = currentTransition;
      try {
        var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
        onStartTransitionFinish !== null && onStartTransitionFinish(currentTransition, returnValue);
        typeof returnValue === "object" && returnValue !== null && typeof returnValue.then === "function" && returnValue.then(noop, reportGlobalError);
      } catch (error) {
        reportGlobalError(error);
      } finally {
        prevTransition !== null && currentTransition.types !== null && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
      }
    }
    function addTransitionType(type) {
      var transition = ReactSharedInternals.T;
      if (transition !== null) {
        var transitionTypes = transition.types;
        transitionTypes === null ? transition.types = [type] : transitionTypes.indexOf(type) === -1 && transitionTypes.push(type);
      } else
        startTransition(addTransitionType.bind(null, type));
    }
    var Children = {
      map: mapChildren,
      forEach: function(children, forEachFunc, forEachContext) {
        mapChildren(children, function() {
          forEachFunc.apply(this, arguments);
        }, forEachContext);
      },
      count: function(children) {
        var n = 0;
        mapChildren(children, function() {
          n++;
        });
        return n;
      },
      toArray: function(children) {
        return mapChildren(children, function(child) {
          return child;
        }) || [];
      },
      only: function(children) {
        if (!isValidElement(children))
          throw Error("React.Children.only expected to receive a single React element child.");
        return children;
      }
    };
    exports.Activity = REACT_ACTIVITY_TYPE;
    exports.Children = Children;
    exports.Component = Component;
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.Profiler = REACT_PROFILER_TYPE;
    exports.PureComponent = PureComponent;
    exports.StrictMode = REACT_STRICT_MODE_TYPE;
    exports.Suspense = REACT_SUSPENSE_TYPE;
    exports.ViewTransition = REACT_VIEW_TRANSITION_TYPE;
    exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
    exports.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function(size) {
        return ReactSharedInternals.H.useMemoCache(size);
      }
    };
    exports.addTransitionType = addTransitionType;
    exports.cache = function(fn) {
      return function() {
        return fn.apply(null, arguments);
      };
    };
    exports.cacheSignal = function() {
      return null;
    };
    exports.cloneElement = function(element, config, children) {
      if (element === null || element === undefined)
        throw Error("The argument must be a React element, but you passed " + element + ".");
      var props = assign({}, element.props), key = element.key;
      if (config != null)
        for (propName in config.key !== undefined && (key = "" + config.key), config)
          !hasOwnProperty.call(config, propName) || propName === "key" || propName === "__self" || propName === "__source" || propName === "ref" && config.ref === undefined || (props[propName] = config[propName]);
      var propName = arguments.length - 2;
      if (propName === 1)
        props.children = children;
      else if (1 < propName) {
        for (var childArray = Array(propName), i = 0;i < propName; i++)
          childArray[i] = arguments[i + 2];
        props.children = childArray;
      }
      return ReactElement(element.type, key, props);
    };
    exports.createContext = function(defaultValue) {
      defaultValue = {
        $$typeof: REACT_CONTEXT_TYPE,
        _currentValue: defaultValue,
        _currentValue2: defaultValue,
        _threadCount: 0,
        Provider: null,
        Consumer: null
      };
      defaultValue.Provider = defaultValue;
      defaultValue.Consumer = {
        $$typeof: REACT_CONSUMER_TYPE,
        _context: defaultValue
      };
      return defaultValue;
    };
    exports.createElement = function(type, config, children) {
      var propName, props = {}, key = null;
      if (config != null)
        for (propName in config.key !== undefined && (key = "" + config.key), config)
          hasOwnProperty.call(config, propName) && propName !== "key" && propName !== "__self" && propName !== "__source" && (props[propName] = config[propName]);
      var childrenLength = arguments.length - 2;
      if (childrenLength === 1)
        props.children = children;
      else if (1 < childrenLength) {
        for (var childArray = Array(childrenLength), i = 0;i < childrenLength; i++)
          childArray[i] = arguments[i + 2];
        props.children = childArray;
      }
      if (type && type.defaultProps)
        for (propName in childrenLength = type.defaultProps, childrenLength)
          props[propName] === undefined && (props[propName] = childrenLength[propName]);
      return ReactElement(type, key, props);
    };
    exports.createRef = function() {
      return { current: null };
    };
    exports.forwardRef = function(render) {
      return { $$typeof: REACT_FORWARD_REF_TYPE, render };
    };
    exports.isValidElement = isValidElement;
    exports.lazy = function(ctor) {
      return {
        $$typeof: REACT_LAZY_TYPE,
        _payload: { _status: -1, _result: ctor },
        _init: lazyInitializer
      };
    };
    exports.memo = function(type, compare) {
      return {
        $$typeof: REACT_MEMO_TYPE,
        type,
        compare: compare === undefined ? null : compare
      };
    };
    exports.startTransition = startTransition;
    exports.unstable_useCacheRefresh = function() {
      return ReactSharedInternals.H.useCacheRefresh();
    };
    exports.use = function(usable) {
      return ReactSharedInternals.H.use(usable);
    };
    exports.useActionState = function(action, initialState, permalink) {
      return ReactSharedInternals.H.useActionState(action, initialState, permalink);
    };
    exports.useCallback = function(callback, deps) {
      return ReactSharedInternals.H.useCallback(callback, deps);
    };
    exports.useContext = function(Context) {
      return ReactSharedInternals.H.useContext(Context);
    };
    exports.useDebugValue = function() {};
    exports.useDeferredValue = function(value, initialValue) {
      return ReactSharedInternals.H.useDeferredValue(value, initialValue);
    };
    exports.useEffect = function(create, deps) {
      return ReactSharedInternals.H.useEffect(create, deps);
    };
    exports.useEffectEvent = function(callback) {
      return ReactSharedInternals.H.useEffectEvent(callback);
    };
    exports.useId = function() {
      return ReactSharedInternals.H.useId();
    };
    exports.useImperativeHandle = function(ref, create, deps) {
      return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
    };
    exports.useInsertionEffect = function(create, deps) {
      return ReactSharedInternals.H.useInsertionEffect(create, deps);
    };
    exports.useLayoutEffect = function(create, deps) {
      return ReactSharedInternals.H.useLayoutEffect(create, deps);
    };
    exports.useMemo = function(create, deps) {
      return ReactSharedInternals.H.useMemo(create, deps);
    };
    exports.useOptimistic = function(passthrough, reducer) {
      return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
    };
    exports.useReducer = function(reducer, initialArg, init) {
      return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
    };
    exports.useRef = function(initialValue) {
      return ReactSharedInternals.H.useRef(initialValue);
    };
    exports.useState = function(initialState) {
      return ReactSharedInternals.H.useState(initialState);
    };
    exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
      return ReactSharedInternals.H.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    };
    exports.useTransition = function() {
      return ReactSharedInternals.H.useTransition();
    };
    exports.version = "19.3.1";
  });

  // node_modules/react/index.js
  var require_react = __commonJS(function(exports, module) {
    if (true) {
      module.exports = require_react_production();
    }
  });

  // node_modules/scheduler/cjs/scheduler.production.js
  var require_scheduler_production = __commonJS(function(exports) {
    function push(heap, node) {
      var index = heap.length;
      heap.push(node);
      a:
        for (;0 < index; ) {
          var parentIndex = index - 1 >>> 1, parent = heap[parentIndex];
          if (0 < compare(parent, node))
            heap[parentIndex] = node, heap[index] = parent, index = parentIndex;
          else
            break a;
        }
    }
    function peek(heap) {
      return heap.length === 0 ? null : heap[0];
    }
    function pop(heap) {
      if (heap.length === 0)
        return null;
      var first = heap[0], last = heap.pop();
      if (last !== first) {
        heap[0] = last;
        a:
          for (var index = 0, length = heap.length, halfLength = length >>> 1;index < halfLength; ) {
            var leftIndex = 2 * (index + 1) - 1, left = heap[leftIndex], rightIndex = leftIndex + 1, right = heap[rightIndex];
            if (0 > compare(left, last))
              rightIndex < length && 0 > compare(right, left) ? (heap[index] = right, heap[rightIndex] = last, index = rightIndex) : (heap[index] = left, heap[leftIndex] = last, index = leftIndex);
            else if (rightIndex < length && 0 > compare(right, last))
              heap[index] = right, heap[rightIndex] = last, index = rightIndex;
            else
              break a;
          }
      }
      return first;
    }
    function compare(a, b) {
      var diff = a.sortIndex - b.sortIndex;
      return diff !== 0 ? diff : a.id - b.id;
    }
    exports.unstable_now = undefined;
    if (typeof performance === "object" && typeof performance.now === "function") {
      localPerformance = performance;
      exports.unstable_now = function() {
        return localPerformance.now();
      };
    } else {
      localDate = Date, initialTime = localDate.now();
      exports.unstable_now = function() {
        return localDate.now() - initialTime;
      };
    }
    var localPerformance;
    var localDate;
    var initialTime;
    var taskQueue = [];
    var timerQueue = [];
    var taskIdCounter = 1;
    var currentTask = null;
    var currentPriorityLevel = 3;
    var isPerformingWork = false;
    var isHostCallbackScheduled = false;
    var isHostTimeoutScheduled = false;
    var needsPaint = false;
    var localSetTimeout = typeof setTimeout === "function" ? setTimeout : null;
    var localClearTimeout = typeof clearTimeout === "function" ? clearTimeout : null;
    var localSetImmediate = typeof setImmediate !== "undefined" ? setImmediate : null;
    function advanceTimers(currentTime) {
      for (var timer = peek(timerQueue);timer !== null; ) {
        if (timer.callback === null)
          pop(timerQueue);
        else if (timer.startTime <= currentTime)
          pop(timerQueue), timer.sortIndex = timer.expirationTime, push(taskQueue, timer);
        else
          break;
        timer = peek(timerQueue);
      }
    }
    function handleTimeout(currentTime) {
      isHostTimeoutScheduled = false;
      advanceTimers(currentTime);
      if (!isHostCallbackScheduled)
        if (peek(taskQueue) !== null)
          isHostCallbackScheduled = true, isMessageLoopRunning || (isMessageLoopRunning = true, schedulePerformWorkUntilDeadline());
        else {
          var firstTimer = peek(timerQueue);
          firstTimer !== null && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
        }
    }
    var isMessageLoopRunning = false;
    var taskTimeoutID = -1;
    var frameInterval = 5;
    var startTime = -1;
    function shouldYieldToHost() {
      return needsPaint ? true : exports.unstable_now() - startTime < frameInterval ? false : true;
    }
    function performWorkUntilDeadline() {
      needsPaint = false;
      if (isMessageLoopRunning) {
        var currentTime = exports.unstable_now();
        startTime = currentTime;
        var hasMoreWork = true;
        try {
          a: {
            isHostCallbackScheduled = false;
            isHostTimeoutScheduled && (isHostTimeoutScheduled = false, localClearTimeout(taskTimeoutID), taskTimeoutID = -1);
            isPerformingWork = true;
            var previousPriorityLevel = currentPriorityLevel;
            try {
              b: {
                advanceTimers(currentTime);
                for (currentTask = peek(taskQueue);currentTask !== null && !(currentTask.expirationTime > currentTime && shouldYieldToHost()); ) {
                  var callback = currentTask.callback;
                  if (typeof callback === "function") {
                    currentTask.callback = null;
                    currentPriorityLevel = currentTask.priorityLevel;
                    var continuationCallback = callback(currentTask.expirationTime <= currentTime);
                    currentTime = exports.unstable_now();
                    if (typeof continuationCallback === "function") {
                      currentTask.callback = continuationCallback;
                      advanceTimers(currentTime);
                      hasMoreWork = true;
                      break b;
                    }
                    currentTask === peek(taskQueue) && pop(taskQueue);
                    advanceTimers(currentTime);
                  } else
                    pop(taskQueue);
                  currentTask = peek(taskQueue);
                }
                if (currentTask !== null)
                  hasMoreWork = true;
                else {
                  var firstTimer = peek(timerQueue);
                  firstTimer !== null && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
                  hasMoreWork = false;
                }
              }
              break a;
            } finally {
              currentTask = null, currentPriorityLevel = previousPriorityLevel, isPerformingWork = false;
            }
            hasMoreWork = undefined;
          }
        } finally {
          hasMoreWork ? schedulePerformWorkUntilDeadline() : isMessageLoopRunning = false;
        }
      }
    }
    var schedulePerformWorkUntilDeadline;
    if (typeof localSetImmediate === "function")
      schedulePerformWorkUntilDeadline = function() {
        localSetImmediate(performWorkUntilDeadline);
      };
    else if (typeof MessageChannel !== "undefined") {
      channel = new MessageChannel, port = channel.port2;
      channel.port1.onmessage = performWorkUntilDeadline;
      schedulePerformWorkUntilDeadline = function() {
        port.postMessage(null);
      };
    } else
      schedulePerformWorkUntilDeadline = function() {
        localSetTimeout(performWorkUntilDeadline, 0);
      };
    var channel;
    var port;
    function requestHostTimeout(callback, ms) {
      taskTimeoutID = localSetTimeout(function() {
        callback(exports.unstable_now());
      }, ms);
    }
    exports.unstable_IdlePriority = 5;
    exports.unstable_ImmediatePriority = 1;
    exports.unstable_LowPriority = 4;
    exports.unstable_NormalPriority = 3;
    exports.unstable_Profiling = null;
    exports.unstable_UserBlockingPriority = 2;
    exports.unstable_cancelCallback = function(task) {
      task.callback = null;
    };
    exports.unstable_forceFrameRate = function(fps) {
      0 > fps || 125 < fps ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : frameInterval = 0 < fps ? Math.floor(1000 / fps) : 5;
    };
    exports.unstable_getCurrentPriorityLevel = function() {
      return currentPriorityLevel;
    };
    exports.unstable_next = function(eventHandler) {
      switch (currentPriorityLevel) {
        case 1:
        case 2:
        case 3:
          var priorityLevel = 3;
          break;
        default:
          priorityLevel = currentPriorityLevel;
      }
      var previousPriorityLevel = currentPriorityLevel;
      currentPriorityLevel = priorityLevel;
      try {
        return eventHandler();
      } finally {
        currentPriorityLevel = previousPriorityLevel;
      }
    };
    exports.unstable_requestPaint = function() {
      needsPaint = true;
    };
    exports.unstable_runWithPriority = function(priorityLevel, eventHandler) {
      switch (priorityLevel) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          priorityLevel = 3;
      }
      var previousPriorityLevel = currentPriorityLevel;
      currentPriorityLevel = priorityLevel;
      try {
        return eventHandler();
      } finally {
        currentPriorityLevel = previousPriorityLevel;
      }
    };
    exports.unstable_scheduleCallback = function(priorityLevel, callback, options) {
      var currentTime = exports.unstable_now();
      typeof options === "object" && options !== null ? (options = options.delay, options = typeof options === "number" && 0 < options ? currentTime + options : currentTime) : options = currentTime;
      switch (priorityLevel) {
        case 1:
          var timeout = -1;
          break;
        case 2:
          timeout = 250;
          break;
        case 5:
          timeout = 1073741823;
          break;
        case 4:
          timeout = 1e4;
          break;
        default:
          timeout = 5000;
      }
      timeout = options + timeout;
      priorityLevel = {
        id: taskIdCounter++,
        callback,
        priorityLevel,
        startTime: options,
        expirationTime: timeout,
        sortIndex: -1
      };
      options > currentTime ? (priorityLevel.sortIndex = options, push(timerQueue, priorityLevel), peek(taskQueue) === null && priorityLevel === peek(timerQueue) && (isHostTimeoutScheduled ? (localClearTimeout(taskTimeoutID), taskTimeoutID = -1) : isHostTimeoutScheduled = true, requestHostTimeout(handleTimeout, options - currentTime))) : (priorityLevel.sortIndex = timeout, push(taskQueue, priorityLevel), isHostCallbackScheduled || isPerformingWork || (isHostCallbackScheduled = true, isMessageLoopRunning || (isMessageLoopRunning = true, schedulePerformWorkUntilDeadline())));
      return priorityLevel;
    };
    exports.unstable_shouldYield = shouldYieldToHost;
    exports.unstable_wrapCallback = function(callback) {
      var parentPriorityLevel = currentPriorityLevel;
      return function() {
        var previousPriorityLevel = currentPriorityLevel;
        currentPriorityLevel = parentPriorityLevel;
        try {
          return callback.apply(this, arguments);
        } finally {
          currentPriorityLevel = previousPriorityLevel;
        }
      };
    };
  });

  // node_modules/scheduler/index.js
  var require_scheduler = __commonJS(function(exports, module) {
    if (true) {
      module.exports = require_scheduler_production();
    }
  });

  // node_modules/react-dom/cjs/react-dom.production.js
  var require_react_dom_production = __commonJS(function(exports) {
    var React = require_react();
    function formatProdErrorMessage(code) {
      var url = "https://react.dev/errors/" + code;
      if (1 < arguments.length) {
        url += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var i = 2;i < arguments.length; i++)
          url += "&args[]=" + encodeURIComponent(arguments[i]);
      }
      return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    function noop() {}
    var Internals = {
      d: {
        f: noop,
        r: function() {
          throw Error(formatProdErrorMessage(522));
        },
        D: noop,
        C: noop,
        L: noop,
        m: noop,
        X: noop,
        S: noop,
        M: noop
      },
      p: 0,
      findDOMNode: null
    };
    var REACT_PORTAL_TYPE = Symbol.for("react.portal");
    var REACT_RECOVERABLE_TYPE = Symbol.for("react.recoverable");
    var REACT_OPTIMISTIC_KEY = Symbol.for("react.optimistic_key");
    function createPortal$1(children, containerInfo, implementation) {
      var key = 3 < arguments.length && arguments[3] !== undefined ? arguments[3] : null;
      return {
        $$typeof: REACT_PORTAL_TYPE,
        key: key == null ? null : key === REACT_OPTIMISTIC_KEY ? REACT_OPTIMISTIC_KEY : "" + key,
        children,
        containerInfo,
        implementation
      };
    }
    var ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    function getCrossOriginStringAs(as, input) {
      if (as === "font")
        return "";
      if (typeof input === "string")
        return input === "use-credentials" ? input : "";
    }
    exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
    exports.browser = function(reason) {
      return { $$typeof: REACT_RECOVERABLE_TYPE, _reason: reason };
    };
    exports.createPortal = function(children, container) {
      var key = 2 < arguments.length && arguments[2] !== undefined ? arguments[2] : null;
      if (!container || container.nodeType !== 1 && container.nodeType !== 9 && container.nodeType !== 11)
        throw Error(formatProdErrorMessage(299));
      return createPortal$1(children, container, null, key);
    };
    exports.flushSync = function(fn) {
      var previousTransition = ReactSharedInternals.T, previousUpdatePriority = Internals.p;
      try {
        if (ReactSharedInternals.T = null, Internals.p = 2, fn)
          return fn();
      } finally {
        ReactSharedInternals.T = previousTransition, Internals.p = previousUpdatePriority, Internals.d.f();
      }
    };
    exports.preconnect = function(href, options) {
      typeof href === "string" && (options ? (options = options.crossOrigin, options = typeof options === "string" ? options === "use-credentials" ? options : "" : undefined) : options = null, Internals.d.C(href, options));
    };
    exports.prefetchDNS = function(href) {
      typeof href === "string" && Internals.d.D(href);
    };
    exports.preinit = function(href, options) {
      if (typeof href === "string" && options && typeof options.as === "string") {
        var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = typeof options.integrity === "string" ? options.integrity : undefined, fetchPriority = typeof options.fetchPriority === "string" ? options.fetchPriority : undefined;
        as === "style" ? Internals.d.S(href, typeof options.precedence === "string" ? options.precedence : undefined, {
          crossOrigin,
          integrity,
          fetchPriority
        }) : as === "script" && Internals.d.X(href, {
          crossOrigin,
          integrity,
          fetchPriority,
          nonce: typeof options.nonce === "string" ? options.nonce : undefined
        });
      }
    };
    exports.preinitModule = function(href, options) {
      if (typeof href === "string")
        if (typeof options === "object" && options !== null) {
          if (options.as == null || options.as === "script") {
            var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
            Internals.d.M(href, {
              crossOrigin,
              integrity: typeof options.integrity === "string" ? options.integrity : undefined,
              nonce: typeof options.nonce === "string" ? options.nonce : undefined,
              fetchPriority: typeof options.fetchPriority === "string" ? options.fetchPriority : undefined
            });
          }
        } else
          options == null && Internals.d.M(href);
    };
    exports.preload = function(href, options) {
      if (typeof href === "string" && typeof options === "object" && options !== null && typeof options.as === "string") {
        var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
        Internals.d.L(href, as, {
          crossOrigin,
          integrity: typeof options.integrity === "string" ? options.integrity : undefined,
          nonce: typeof options.nonce === "string" ? options.nonce : undefined,
          type: typeof options.type === "string" ? options.type : undefined,
          fetchPriority: typeof options.fetchPriority === "string" ? options.fetchPriority : undefined,
          referrerPolicy: typeof options.referrerPolicy === "string" ? options.referrerPolicy : undefined,
          imageSrcSet: typeof options.imageSrcSet === "string" ? options.imageSrcSet : undefined,
          imageSizes: typeof options.imageSizes === "string" ? options.imageSizes : undefined,
          media: typeof options.media === "string" ? options.media : undefined
        });
      }
    };
    exports.preloadModule = function(href, options) {
      if (typeof href === "string")
        if (options) {
          var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
          Internals.d.m(href, {
            as: typeof options.as === "string" && options.as !== "script" ? options.as : undefined,
            crossOrigin,
            integrity: typeof options.integrity === "string" ? options.integrity : undefined,
            nonce: typeof options.nonce === "string" ? options.nonce : undefined,
            fetchPriority: typeof options.fetchPriority === "string" ? options.fetchPriority : undefined
          });
        } else
          Internals.d.m(href);
    };
    exports.requestFormReset = function(form) {
      Internals.d.r(form);
    };
    exports.unstable_batchedUpdates = function(fn, a) {
      return fn(a);
    };
    exports.useFormState = function(action, initialState, permalink) {
      return ReactSharedInternals.H.useFormState(action, initialState, permalink);
    };
    exports.useFormStatus = function() {
      return ReactSharedInternals.H.useHostTransitionStatus();
    };
    exports.version = "19.3.1";
  });

  // node_modules/react-dom/index.js
  var require_react_dom = __commonJS(function(exports, module) {
    function checkDCE() {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
        return;
      }
      if (false) {}
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
      } catch (err) {
        console.error(err);
      }
    }
    if (true) {
      checkDCE();
      module.exports = require_react_dom_production();
    }
  });

  // node_modules/react-dom/cjs/react-dom-client.production.js
  var require_react_dom_client_production = __commonJS(function(exports) {
    var Scheduler = require_scheduler();
    var React = require_react();
    var ReactDOM = require_react_dom();
    function formatProdErrorMessage(code) {
      var url = "https://react.dev/errors/" + code;
      if (1 < arguments.length) {
        url += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var i = 2;i < arguments.length; i++)
          url += "&args[]=" + encodeURIComponent(arguments[i]);
      }
      return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    function isValidContainer(node) {
      return !(!node || node.nodeType !== 1 && node.nodeType !== 9 && node.nodeType !== 11);
    }
    function getNearestMountedFiber(fiber) {
      for (var node = fiber, nextNode = node;nextNode && !nextNode.alternate; )
        node = nextNode, (node.flags & 4098) !== 0 && (fiber = node.return), nextNode = node.return;
      for (;node.return; )
        node = node.return;
      return node.tag === 3 ? fiber : null;
    }
    function getSuspenseInstanceFromFiber(fiber) {
      if (fiber.tag === 13) {
        var suspenseState = fiber.memoizedState;
        suspenseState === null && (fiber = fiber.alternate, fiber !== null && (suspenseState = fiber.memoizedState));
        if (suspenseState !== null)
          return suspenseState.dehydrated;
      }
      return null;
    }
    function getActivityInstanceFromFiber(fiber) {
      if (fiber.tag === 31) {
        var activityState = fiber.memoizedState;
        activityState === null && (fiber = fiber.alternate, fiber !== null && (activityState = fiber.memoizedState));
        if (activityState !== null)
          return activityState.dehydrated;
      }
      return null;
    }
    function assertIsMounted(fiber) {
      if (getNearestMountedFiber(fiber) !== fiber)
        throw Error(formatProdErrorMessage(188));
    }
    function findCurrentFiberUsingSlowPath(fiber) {
      var alternate = fiber.alternate;
      if (!alternate) {
        alternate = getNearestMountedFiber(fiber);
        if (alternate === null)
          throw Error(formatProdErrorMessage(188));
        return alternate !== fiber ? null : fiber;
      }
      for (var a = fiber, b = alternate;; ) {
        var parentA = a.return;
        if (parentA === null)
          break;
        var parentB = parentA.alternate;
        if (parentB === null) {
          b = parentA.return;
          if (b !== null) {
            a = b;
            continue;
          }
          break;
        }
        if (parentA.child === parentB.child) {
          for (parentB = parentA.child;parentB; ) {
            if (parentB === a)
              return assertIsMounted(parentA), fiber;
            if (parentB === b)
              return assertIsMounted(parentA), alternate;
            parentB = parentB.sibling;
          }
          throw Error(formatProdErrorMessage(188));
        }
        if (a.return !== b.return)
          a = parentA, b = parentB;
        else {
          for (var didFindChild = false, child$0 = parentA.child;child$0; ) {
            if (child$0 === a) {
              didFindChild = true;
              a = parentA;
              b = parentB;
              break;
            }
            if (child$0 === b) {
              didFindChild = true;
              b = parentA;
              a = parentB;
              break;
            }
            child$0 = child$0.sibling;
          }
          if (!didFindChild) {
            for (child$0 = parentB.child;child$0; ) {
              if (child$0 === a) {
                didFindChild = true;
                a = parentB;
                b = parentA;
                break;
              }
              if (child$0 === b) {
                didFindChild = true;
                b = parentB;
                a = parentA;
                break;
              }
              child$0 = child$0.sibling;
            }
            if (!didFindChild)
              throw Error(formatProdErrorMessage(189));
          }
        }
        if (a.alternate !== b)
          throw Error(formatProdErrorMessage(190));
      }
      if (a.tag !== 3)
        throw Error(formatProdErrorMessage(188));
      return a.stateNode.current === a ? fiber : alternate;
    }
    function findCurrentHostFiberImpl(node) {
      var tag = node.tag;
      if (tag === 5 || tag === 26 || tag === 27 || tag === 6)
        return node;
      for (node = node.child;node !== null; ) {
        tag = findCurrentHostFiberImpl(node);
        if (tag !== null)
          return tag;
        node = node.sibling;
      }
      return null;
    }
    function traverseVisibleInstancesAndTextInstances(child, searchWithinHosts, fn, a, b, c) {
      for (;child !== null; ) {
        if ((child.tag === 5 || child.tag === 27 || child.tag === 6) && fn(child, a, b, c) || (child.tag !== 22 || child.memoizedState === null) && (searchWithinHosts || child.tag !== 5 && child.tag !== 27) && traverseVisibleInstancesAndTextInstances(child.child, searchWithinHosts, fn, a, b, c))
          return true;
        child = child.sibling;
      }
      return false;
    }
    function getFragmentParentInstanceOrContainerFiber(fiber) {
      for (fiber = fiber.return;fiber !== null; ) {
        if (fiber.tag === 3 || fiber.tag === 5 || fiber.tag === 27)
          return fiber;
        fiber = fiber.return;
      }
      return null;
    }
    function fiberIsPortaledIntoHost(fiber) {
      var foundPortalParent = false;
      for (fiber = fiber.return;fiber !== null; ) {
        fiber.tag === 4 && (foundPortalParent = true);
        if (fiber.tag === 3 || fiber.tag === 5 || fiber.tag === 27)
          break;
        fiber = fiber.return;
      }
      return foundPortalParent;
    }
    function getFragmentInstanceOrTextInstanceSiblings(fiber) {
      var result = [null, null], parentHostFiber = getFragmentParentInstanceOrContainerFiber(fiber);
      if (parentHostFiber === null)
        return result;
      findFragmentInstanceOrTextInstanceSiblings(result, fiber, parentHostFiber.child, { foundSelf: false });
      return result;
    }
    function findFragmentInstanceOrTextInstanceSiblings(result, self, child, state) {
      for (;child !== null; ) {
        if (child === self)
          state.foundSelf = true;
        else if (child.tag === 5 || child.tag === 27 || child.tag === 6) {
          if (state.foundSelf)
            return result[1] = child, true;
          result[0] = child;
        } else if ((child.tag !== 22 || child.memoizedState === null) && findFragmentInstanceOrTextInstanceSiblings(result, self, child.child, state))
          return true;
        child = child.sibling;
      }
      return false;
    }
    function getInstanceFromHostFiber(fiber) {
      switch (fiber.tag) {
        case 5:
        case 27:
        case 6:
          return fiber.stateNode;
        case 3:
          return fiber.stateNode.containerInfo;
        default:
          throw Error(formatProdErrorMessage(559));
      }
    }
    var searchTarget = null;
    var searchBoundary = null;
    function isFiberPrecedingCheck(child, target, boundary) {
      return child === boundary ? true : child === target ? (searchTarget = child, true) : false;
    }
    function isFiberFollowingCheck(child, target, boundary) {
      return child === boundary ? (searchBoundary = child, false) : child === target ? (searchBoundary !== null && (searchTarget = child), true) : false;
    }
    function getParentForFragmentAncestors(inst) {
      if (inst === null)
        return null;
      do
        inst = inst === null ? null : inst.return;
      while (inst && inst.tag !== 5 && inst.tag !== 27 && inst.tag !== 3);
      return inst ? inst : null;
    }
    function getLowestCommonAncestor(instA, instB, getParent) {
      for (var depthA = 0, tempA = instA;tempA; tempA = getParent(tempA))
        depthA++;
      tempA = 0;
      for (var tempB = instB;tempB; tempB = getParent(tempB))
        tempA++;
      for (;0 < depthA - tempA; )
        instA = getParent(instA), depthA--;
      for (;0 < tempA - depthA; )
        instB = getParent(instB), tempA--;
      for (;depthA--; ) {
        if (instA === instB || instB !== null && instA === instB.alternate)
          return instA;
        instA = getParent(instA);
        instB = getParent(instB);
      }
      return null;
    }
    var assign = Object.assign;
    var REACT_LEGACY_ELEMENT_TYPE = Symbol.for("react.element");
    var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
    var REACT_PORTAL_TYPE = Symbol.for("react.portal");
    var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
    var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
    var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer");
    var REACT_CONTEXT_TYPE = Symbol.for("react.context");
    var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
    var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
    var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
    var REACT_MEMO_TYPE = Symbol.for("react.memo");
    var REACT_LAZY_TYPE = Symbol.for("react.lazy");
    Symbol.for("react.scope");
    var REACT_ACTIVITY_TYPE = Symbol.for("react.activity");
    var REACT_LEGACY_HIDDEN_TYPE = Symbol.for("react.legacy_hidden");
    Symbol.for("react.tracing_marker");
    var REACT_MEMO_CACHE_SENTINEL = Symbol.for("react.memo_cache_sentinel");
    var REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition");
    var REACT_RECOVERABLE_TYPE = Symbol.for("react.recoverable");
    var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
    function getIteratorFn(maybeIterable) {
      if (maybeIterable === null || typeof maybeIterable !== "object")
        return null;
      maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
      return typeof maybeIterable === "function" ? maybeIterable : null;
    }
    var REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference");
    function getComponentNameFromType(type) {
      if (type == null)
        return null;
      if (typeof type === "function")
        return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
      if (typeof type === "string")
        return type;
      switch (type) {
        case REACT_FRAGMENT_TYPE:
          return "Fragment";
        case REACT_PROFILER_TYPE:
          return "Profiler";
        case REACT_STRICT_MODE_TYPE:
          return "StrictMode";
        case REACT_SUSPENSE_TYPE:
          return "Suspense";
        case REACT_SUSPENSE_LIST_TYPE:
          return "SuspenseList";
        case REACT_ACTIVITY_TYPE:
          return "Activity";
        case REACT_VIEW_TRANSITION_TYPE:
          return "ViewTransition";
      }
      if (typeof type === "object")
        switch (type.$$typeof) {
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_CONTEXT_TYPE:
            return type.displayName || "Context";
          case REACT_CONSUMER_TYPE:
            return (type._context.displayName || "Context") + ".Consumer";
          case REACT_FORWARD_REF_TYPE:
            var innerType = type.render;
            type = type.displayName;
            type || (type = innerType.displayName || innerType.name || "", type = type !== "" ? "ForwardRef(" + type + ")" : "ForwardRef");
            return type;
          case REACT_MEMO_TYPE:
            return innerType = type.displayName || null, innerType !== null ? innerType : getComponentNameFromType(type.type) || "Memo";
          case REACT_LAZY_TYPE:
            innerType = type._payload;
            type = type._init;
            try {
              return getComponentNameFromType(type(innerType));
            } catch (x) {}
        }
      return null;
    }
    var isArrayImpl = Array.isArray;
    var ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    var ReactDOMSharedInternals = ReactDOM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    var sharedNotPendingObject = {
      pending: false,
      data: null,
      method: null,
      action: null
    };
    var valueStack = [];
    var index = -1;
    function createCursor(defaultValue) {
      return { current: defaultValue };
    }
    function pop(cursor) {
      0 > index || (cursor.current = valueStack[index], valueStack[index] = null, index--);
    }
    function push(cursor, value) {
      index++;
      valueStack[index] = cursor.current;
      cursor.current = value;
    }
    var contextStackCursor = createCursor(null);
    var contextFiberStackCursor = createCursor(null);
    var rootInstanceStackCursor = createCursor(null);
    var hostTransitionProviderCursor = createCursor(null);
    function pushHostContainer(fiber, nextRootInstance) {
      push(rootInstanceStackCursor, nextRootInstance);
      push(contextFiberStackCursor, fiber);
      push(contextStackCursor, null);
      switch (nextRootInstance.nodeType) {
        case 9:
        case 11:
          fiber = (fiber = nextRootInstance.documentElement) ? (fiber = fiber.namespaceURI) ? getOwnHostContext(fiber) : 0 : 0;
          break;
        default:
          if (fiber = nextRootInstance.tagName, nextRootInstance = nextRootInstance.namespaceURI)
            nextRootInstance = getOwnHostContext(nextRootInstance), fiber = getChildHostContextProd(nextRootInstance, fiber);
          else
            switch (fiber) {
              case "svg":
                fiber = 1;
                break;
              case "math":
                fiber = 2;
                break;
              default:
                fiber = 0;
            }
      }
      pop(contextStackCursor);
      push(contextStackCursor, fiber);
    }
    function popHostContainer() {
      pop(contextStackCursor);
      pop(contextFiberStackCursor);
      pop(rootInstanceStackCursor);
    }
    function pushHostContext(fiber) {
      var stateHook = fiber.memoizedState;
      stateHook !== null && (HostTransitionContext._currentValue = stateHook.memoizedState, push(hostTransitionProviderCursor, fiber));
      stateHook = contextStackCursor.current;
      var JSCompiler_inline_result = getChildHostContextProd(stateHook, fiber.type);
      stateHook !== JSCompiler_inline_result && (push(contextFiberStackCursor, fiber), push(contextStackCursor, JSCompiler_inline_result));
    }
    function popHostContext(fiber) {
      contextFiberStackCursor.current === fiber && (pop(contextStackCursor), pop(contextFiberStackCursor));
      hostTransitionProviderCursor.current === fiber && (pop(hostTransitionProviderCursor), HostTransitionContext._currentValue = sharedNotPendingObject);
    }
    var prefix;
    var suffix;
    function describeBuiltInComponentFrame(name) {
      if (prefix === undefined)
        try {
          throw Error();
        } catch (x) {
          var match = x.stack.trim().match(/\n( *(at )?)/);
          prefix = match && match[1] || "";
          suffix = -1 < x.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < x.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
      return `
` + prefix + name + suffix;
    }
    var reentry = false;
    function describeNativeComponentFrame(fn, construct) {
      if (!fn || reentry)
        return "";
      reentry = true;
      var previousPrepareStackTrace = Error.prepareStackTrace;
      Error.prepareStackTrace = undefined;
      try {
        var RunInRootFrame = {
          DetermineComponentFrameRoot: function() {
            try {
              if (construct) {
                var Fake = function() {
                  throw Error();
                };
                Object.defineProperty(Fake.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                });
                if (typeof Reflect === "object" && Reflect.construct) {
                  try {
                    Reflect.construct(Fake, []);
                  } catch (x) {
                    var control = x;
                  }
                  Reflect.construct(fn, [], Fake);
                } else {
                  try {
                    Fake.call();
                  } catch (x$1) {
                    control = x$1;
                  }
                  Fake = false;
                  try {
                    var prevProps = Object.getOwnPropertyDescriptor(fn.prototype, "props");
                    Object.defineProperty(fn.prototype, "props", {
                      configurable: true,
                      set: function() {
                        throw Error();
                      }
                    });
                    Fake = true;
                    new fn;
                  } finally {
                    Fake && (prevProps !== undefined ? Object.defineProperty(fn.prototype, "props", prevProps) : delete fn.prototype.props);
                  }
                }
              } else {
                try {
                  throw Error();
                } catch (x$2) {
                  control = x$2;
                }
                (Fake = fn()) && typeof Fake.catch === "function" && Fake.catch(function() {});
              }
            } catch (sample) {
              if (sample && control && typeof sample.stack === "string")
                return [sample.stack, control.stack];
            }
            return [null, null];
          }
        };
        RunInRootFrame.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var namePropDescriptor = Object.getOwnPropertyDescriptor(RunInRootFrame.DetermineComponentFrameRoot, "name");
        namePropDescriptor && namePropDescriptor.configurable && Object.defineProperty(RunInRootFrame.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
        var _RunInRootFrame$Deter = RunInRootFrame.DetermineComponentFrameRoot(), sampleStack = _RunInRootFrame$Deter[0], controlStack = _RunInRootFrame$Deter[1];
        if (sampleStack && controlStack) {
          var sampleLines = sampleStack.split(`
`), controlLines = controlStack.split(`
`);
          for (namePropDescriptor = RunInRootFrame = 0;RunInRootFrame < sampleLines.length && !sampleLines[RunInRootFrame].includes("DetermineComponentFrameRoot"); )
            RunInRootFrame++;
          for (;namePropDescriptor < controlLines.length && !controlLines[namePropDescriptor].includes("DetermineComponentFrameRoot"); )
            namePropDescriptor++;
          if (RunInRootFrame === sampleLines.length || namePropDescriptor === controlLines.length)
            for (RunInRootFrame = sampleLines.length - 1, namePropDescriptor = controlLines.length - 1;1 <= RunInRootFrame && 0 <= namePropDescriptor && sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]; )
              namePropDescriptor--;
          for (;1 <= RunInRootFrame && 0 <= namePropDescriptor; RunInRootFrame--, namePropDescriptor--)
            if (sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
              if (RunInRootFrame !== 1 || namePropDescriptor !== 1) {
                do
                  if (RunInRootFrame--, namePropDescriptor--, 0 > namePropDescriptor || sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
                    var frame = `
` + sampleLines[RunInRootFrame].replace(" at new ", " at ");
                    fn.displayName && frame.includes("<anonymous>") && (frame = frame.replace("<anonymous>", fn.displayName));
                    return frame;
                  }
                while (1 <= RunInRootFrame && 0 <= namePropDescriptor);
              }
              break;
            }
        }
      } finally {
        reentry = false, Error.prepareStackTrace = previousPrepareStackTrace;
      }
      return (previousPrepareStackTrace = fn ? fn.displayName || fn.name : "") ? describeBuiltInComponentFrame(previousPrepareStackTrace) : "";
    }
    function describeFiber(fiber, childFiber) {
      switch (fiber.tag) {
        case 26:
        case 27:
        case 5:
          return describeBuiltInComponentFrame(fiber.type);
        case 16:
          return describeBuiltInComponentFrame("Lazy");
        case 13:
          return fiber.child !== childFiber && childFiber !== null ? describeBuiltInComponentFrame("Suspense Fallback") : describeBuiltInComponentFrame("Suspense");
        case 19:
          return describeBuiltInComponentFrame("SuspenseList");
        case 0:
        case 15:
          return describeNativeComponentFrame(fiber.type, false);
        case 11:
          return describeNativeComponentFrame(fiber.type.render, false);
        case 1:
          return describeNativeComponentFrame(fiber.type, true);
        case 31:
          return describeBuiltInComponentFrame("Activity");
        case 30:
          return describeBuiltInComponentFrame("ViewTransition");
        default:
          return "";
      }
    }
    function getStackByFiberInDevAndProd(workInProgress) {
      try {
        var info = "", previous = null;
        do
          info += describeFiber(workInProgress, previous), previous = workInProgress, workInProgress = workInProgress.return;
        while (workInProgress);
        return info;
      } catch (x) {
        return `
Error generating stack: ` + x.message + `
` + x.stack;
      }
    }
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var scheduleCallback$3 = Scheduler.unstable_scheduleCallback;
    var cancelCallback$1 = Scheduler.unstable_cancelCallback;
    var shouldYield = Scheduler.unstable_shouldYield;
    var requestPaint = Scheduler.unstable_requestPaint;
    var now = Scheduler.unstable_now;
    var getCurrentPriorityLevel = Scheduler.unstable_getCurrentPriorityLevel;
    var ImmediatePriority = Scheduler.unstable_ImmediatePriority;
    var UserBlockingPriority = Scheduler.unstable_UserBlockingPriority;
    var NormalPriority$1 = Scheduler.unstable_NormalPriority;
    var LowPriority = Scheduler.unstable_LowPriority;
    var IdlePriority = Scheduler.unstable_IdlePriority;
    var log$1 = Scheduler.log;
    var unstable_setDisableYieldValue = Scheduler.unstable_setDisableYieldValue;
    var rendererID = null;
    var injectedHook = null;
    function setIsStrictModeForDevtools(newIsStrictMode) {
      typeof log$1 === "function" && unstable_setDisableYieldValue(newIsStrictMode);
      if (injectedHook && typeof injectedHook.setStrictMode === "function")
        try {
          injectedHook.setStrictMode(rendererID, newIsStrictMode);
        } catch (err) {}
    }
    var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback;
    var log = Math.log;
    var LN2 = Math.LN2;
    function clz32Fallback(x) {
      x >>>= 0;
      return x === 0 ? 32 : 31 - (log(x) / LN2 | 0) | 0;
    }
    var nextTransitionUpdateLane = 256;
    var nextTransitionDeferredLane = 262144;
    var nextRetryLane = 4194304;
    function getHighestPriorityLanes(lanes) {
      var pendingSyncLanes = lanes & 42;
      if (pendingSyncLanes !== 0)
        return pendingSyncLanes;
      switch (lanes & -lanes) {
        case 1:
          return 1;
        case 2:
          return 2;
        case 4:
          return 4;
        case 8:
          return 8;
        case 16:
          return 16;
        case 32:
          return 32;
        case 64:
          return 64;
        case 128:
          return 128;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
          return lanes & -lanes;
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return lanes & 3932160;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return lanes & 62914560;
        case 67108864:
          return 67108864;
        case 134217728:
          return 134217728;
        case 268435456:
          return 268435456;
        case 536870912:
          return 536870912;
        case 1073741824:
          return 0;
        default:
          return lanes;
      }
    }
    function getNextLanes(root, wipLanes, rootHasPendingCommit) {
      var pendingLanes = root.pendingLanes;
      if (pendingLanes === 0)
        return 0;
      var nextLanes = 0, suspendedLanes = root.suspendedLanes, pingedLanes = root.pingedLanes;
      root = root.warmLanes;
      var nonIdlePendingLanes = pendingLanes & 134217727;
      nonIdlePendingLanes !== 0 ? (pendingLanes = nonIdlePendingLanes & ~suspendedLanes, pendingLanes !== 0 ? nextLanes = getHighestPriorityLanes(pendingLanes) : (pingedLanes &= nonIdlePendingLanes, pingedLanes !== 0 ? nextLanes = getHighestPriorityLanes(pingedLanes) : rootHasPendingCommit || (rootHasPendingCommit = nonIdlePendingLanes & ~root, rootHasPendingCommit !== 0 && (nextLanes = getHighestPriorityLanes(rootHasPendingCommit))))) : (nonIdlePendingLanes = pendingLanes & ~suspendedLanes, nonIdlePendingLanes !== 0 ? nextLanes = getHighestPriorityLanes(nonIdlePendingLanes) : pingedLanes !== 0 ? nextLanes = getHighestPriorityLanes(pingedLanes) : rootHasPendingCommit || (rootHasPendingCommit = pendingLanes & ~root, rootHasPendingCommit !== 0 && (nextLanes = getHighestPriorityLanes(rootHasPendingCommit))));
      return nextLanes === 0 ? 0 : wipLanes !== 0 && wipLanes !== nextLanes && (wipLanes & suspendedLanes) === 0 && (suspendedLanes = nextLanes & -nextLanes, rootHasPendingCommit = wipLanes & -wipLanes, suspendedLanes >= rootHasPendingCommit || suspendedLanes === 32 && (rootHasPendingCommit & 4194048) !== 0) ? wipLanes : nextLanes;
    }
    function checkIfRootIsPrerendering(root, renderLanes) {
      return (root.pendingLanes & ~(root.suspendedLanes & ~root.pingedLanes) & renderLanes) === 0;
    }
    function getEntangledLanes(root, renderLanes) {
      (renderLanes & 8) !== 0 && (renderLanes |= renderLanes & 32);
      var allEntangledLanes = root.entangledLanes;
      if (allEntangledLanes !== 0)
        for (root = root.entanglements, allEntangledLanes &= renderLanes;0 < allEntangledLanes; ) {
          var index$4 = 31 - clz32(allEntangledLanes), lane = 1 << index$4;
          renderLanes |= root[index$4];
          allEntangledLanes &= ~lane;
        }
      return renderLanes;
    }
    function computeExpirationTime(lane, currentTime) {
      switch (lane) {
        case 1:
        case 2:
        case 4:
        case 8:
        case 64:
          return currentTime + 250;
        case 16:
        case 32:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return currentTime + 5000;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return -1;
        case 67108864:
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
          return -1;
        default:
          return -1;
      }
    }
    function claimNextRetryLane() {
      var lane = nextRetryLane;
      nextRetryLane <<= 1;
      (nextRetryLane & 62914560) === 0 && (nextRetryLane = 4194304);
      return lane;
    }
    function createLaneMap(initial) {
      for (var laneMap = [], i = 0;31 > i; i++)
        laneMap.push(initial);
      return laneMap;
    }
    function markRootUpdated$1(root, updateLane) {
      root.pendingLanes |= updateLane;
      updateLane !== 268435456 && (root.suspendedLanes = 0, root.pingedLanes = 0, root.warmLanes = 0);
    }
    function markRootFinished(root, finishedLanes, remainingLanes, spawnedLane, updatedLanes, suspendedRetryLanes) {
      var previouslyPendingLanes = root.pendingLanes;
      root.pendingLanes = remainingLanes;
      root.suspendedLanes = 0;
      root.pingedLanes = 0;
      root.warmLanes = 0;
      root.expiredLanes &= remainingLanes;
      root.entangledLanes &= remainingLanes;
      root.errorRecoveryDisabledLanes &= remainingLanes;
      root.shellSuspendCounter = 0;
      var { entanglements, expirationTimes, hiddenUpdates } = root;
      for (remainingLanes = previouslyPendingLanes & ~remainingLanes;0 < remainingLanes; ) {
        var index$7 = 31 - clz32(remainingLanes), lane = 1 << index$7;
        entanglements[index$7] = 0;
        expirationTimes[index$7] = -1;
        var hiddenUpdatesForLane = hiddenUpdates[index$7];
        if (hiddenUpdatesForLane !== null)
          for (hiddenUpdates[index$7] = null, index$7 = 0;index$7 < hiddenUpdatesForLane.length; index$7++) {
            var update = hiddenUpdatesForLane[index$7];
            update !== null && (update.lane &= -536870913);
          }
        remainingLanes &= ~lane;
      }
      spawnedLane !== 0 && markSpawnedDeferredLane(root, spawnedLane, 0);
      suspendedRetryLanes !== 0 && updatedLanes === 0 && root.tag !== 0 && (root.suspendedLanes |= suspendedRetryLanes & ~(previouslyPendingLanes & ~finishedLanes));
    }
    function markSpawnedDeferredLane(root, spawnedLane, entangledLanes) {
      root.pendingLanes |= spawnedLane;
      root.suspendedLanes &= ~spawnedLane;
      var spawnedLaneIndex = 31 - clz32(spawnedLane);
      root.entangledLanes |= spawnedLane;
      root.entanglements[spawnedLaneIndex] = root.entanglements[spawnedLaneIndex] | 1073741824 | entangledLanes & 261930;
    }
    function markRootEntangled(root, entangledLanes) {
      var rootEntangledLanes = root.entangledLanes |= entangledLanes;
      for (root = root.entanglements;rootEntangledLanes; ) {
        var index$8 = 31 - clz32(rootEntangledLanes), lane = 1 << index$8;
        lane & entangledLanes | root[index$8] & entangledLanes && (root[index$8] |= entangledLanes);
        rootEntangledLanes &= ~lane;
      }
    }
    function getBumpedLaneForHydration(root, renderLanes) {
      var renderLane = renderLanes & -renderLanes;
      renderLane = (renderLane & 42) !== 0 ? 1 : getBumpedLaneForHydrationByLane(renderLane);
      return (renderLane & (root.suspendedLanes | renderLanes)) !== 0 ? 0 : renderLane;
    }
    function getBumpedLaneForHydrationByLane(lane) {
      switch (lane) {
        case 2:
          lane = 1;
          break;
        case 8:
          lane = 4;
          break;
        case 32:
          lane = 16;
          break;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          lane = 128;
          break;
        case 268435456:
          lane = 134217728;
          break;
        default:
          lane = 0;
      }
      return lane;
    }
    function lanesToEventPriority(lanes) {
      lanes &= -lanes;
      return 2 < lanes ? 8 < lanes ? (lanes & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
    }
    function resolveUpdatePriority() {
      var updatePriority = ReactDOMSharedInternals.p;
      if (updatePriority !== 0)
        return updatePriority;
      updatePriority = window.event;
      return updatePriority === undefined ? 32 : getEventPriority(updatePriority.type);
    }
    function runWithPriority(priority, fn) {
      var previousPriority = ReactDOMSharedInternals.p;
      try {
        return ReactDOMSharedInternals.p = priority, fn();
      } finally {
        ReactDOMSharedInternals.p = previousPriority;
      }
    }
    var randomKey = Math.random().toString(36).slice(2);
    var internalInstanceKey = "__reactFiber$" + randomKey;
    var internalPropsKey = "__reactProps$" + randomKey;
    var internalContainerInstanceKey = "__reactContainer$" + randomKey;
    var internalEventHandlersKey = "__reactEvents$" + randomKey;
    var internalEventHandlerListenersKey = "__reactListeners$" + randomKey;
    var internalEventHandlesSetKey = "__reactHandles$" + randomKey;
    var internalRootNodeResourcesKey = "__reactResources$" + randomKey;
    var internalHoistableMarker = "__reactMarker$" + randomKey;
    var internalLoadPendingKey = "__reactLoad$" + randomKey;
    function detachDeletedInstance(node) {
      delete node[internalInstanceKey];
      delete node[internalPropsKey];
      delete node[internalEventHandlerListenersKey];
      delete node[internalEventHandlesSetKey];
    }
    function getClosestInstanceFromNode(targetNode) {
      var targetInst;
      if (targetInst = targetNode[internalInstanceKey])
        return targetInst;
      for (var parentNode = targetNode.parentNode;parentNode; ) {
        if (targetInst = parentNode[internalContainerInstanceKey] || parentNode[internalInstanceKey]) {
          parentNode = targetInst.alternate;
          if (targetInst.child !== null || parentNode !== null && parentNode.child !== null)
            for (targetNode = getParentHydrationBoundary(targetNode);targetNode !== null; ) {
              if (parentNode = targetNode[internalInstanceKey])
                return parentNode;
              targetNode = getParentHydrationBoundary(targetNode);
            }
          return targetInst;
        }
        targetNode = parentNode;
        parentNode = targetNode.parentNode;
      }
      return null;
    }
    function getInstanceFromNode(node) {
      if (node = node[internalInstanceKey] || node[internalContainerInstanceKey]) {
        var tag = node.tag;
        if (tag === 5 || tag === 6 || tag === 13 || tag === 31 || tag === 26 || tag === 27 || tag === 3)
          return node;
      }
      return null;
    }
    function getNodeFromInstance(inst) {
      var tag = inst.tag;
      if (tag === 5 || tag === 26 || tag === 27 || tag === 6)
        return inst.stateNode;
      throw Error(formatProdErrorMessage(33));
    }
    function getResourcesFromRoot(root) {
      var resources = root[internalRootNodeResourcesKey];
      resources || (resources = root[internalRootNodeResourcesKey] = { hoistableStyles: new Map, hoistableScripts: new Map });
      return resources;
    }
    function markNodeAsHoistable(node) {
      node[internalHoistableMarker] = true;
    }
    function clearPendingLoadOnNode(node) {
      node[internalLoadPendingKey] = undefined;
    }
    var allNativeEvents = new Set;
    var registrationNameDependencies = {};
    function registerTwoPhaseEvent(registrationName, dependencies) {
      registerDirectEvent(registrationName, dependencies);
      registerDirectEvent(registrationName + "Capture", dependencies);
    }
    function registerDirectEvent(registrationName, dependencies) {
      registrationNameDependencies[registrationName] = dependencies;
      for (registrationName = 0;registrationName < dependencies.length; registrationName++)
        allNativeEvents.add(dependencies[registrationName]);
    }
    var VALID_ATTRIBUTE_NAME_REGEX = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$");
    var illegalAttributeNameCache = {};
    var validatedAttributeNameCache = {};
    function isAttributeNameSafe(attributeName) {
      if (hasOwnProperty.call(validatedAttributeNameCache, attributeName))
        return true;
      if (hasOwnProperty.call(illegalAttributeNameCache, attributeName))
        return false;
      if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName))
        return validatedAttributeNameCache[attributeName] = true;
      illegalAttributeNameCache[attributeName] = true;
      return false;
    }
    var viewTransitionMutationContext = false;
    function pushMutationContext() {
      var prev = viewTransitionMutationContext;
      viewTransitionMutationContext = false;
      return prev;
    }
    function setValueForAttribute(node, name, value) {
      if (isAttributeNameSafe(name))
        if (value === null)
          node.removeAttribute(name);
        else {
          switch (typeof value) {
            case "undefined":
            case "function":
            case "symbol":
              node.removeAttribute(name);
              return;
            case "boolean":
              var prefix$10 = name.toLowerCase().slice(0, 5);
              if (prefix$10 !== "data-" && prefix$10 !== "aria-") {
                node.removeAttribute(name);
                return;
              }
          }
          node.setAttribute(name, value);
        }
    }
    function setValueForKnownAttribute(node, name, value) {
      if (value === null)
        node.removeAttribute(name);
      else {
        switch (typeof value) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            node.removeAttribute(name);
            return;
        }
        node.setAttribute(name, value);
      }
    }
    function setValueForNamespacedAttribute(node, namespace, name, value) {
      if (value === null)
        node.removeAttribute(name);
      else {
        switch (typeof value) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            node.removeAttribute(name);
            return;
        }
        node.setAttributeNS(namespace, name, value);
      }
    }
    function getToStringValue(value) {
      switch (typeof value) {
        case "bigint":
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return value;
        case "object":
          return value;
        default:
          return "";
      }
    }
    function isCheckable(elem) {
      var type = elem.type;
      return (elem = elem.nodeName) && elem.toLowerCase() === "input" && (type === "checkbox" || type === "radio");
    }
    function trackValueOnNode(node, valueField, currentValue) {
      var descriptor = Object.getOwnPropertyDescriptor(node.constructor.prototype, valueField);
      if (!node.hasOwnProperty(valueField) && typeof descriptor !== "undefined" && typeof descriptor.get === "function" && typeof descriptor.set === "function") {
        var { get, set } = descriptor;
        Object.defineProperty(node, valueField, {
          configurable: true,
          get: function() {
            return get.call(this);
          },
          set: function(value) {
            currentValue = "" + value;
            set.call(this, value);
          }
        });
        Object.defineProperty(node, valueField, {
          enumerable: descriptor.enumerable
        });
        return {
          getValue: function() {
            return currentValue;
          },
          setValue: function(value) {
            currentValue = "" + value;
          },
          stopTracking: function() {
            node._valueTracker = null;
            delete node[valueField];
          }
        };
      }
    }
    function track(node) {
      if (!node._valueTracker) {
        var valueField = isCheckable(node) ? "checked" : "value";
        node._valueTracker = trackValueOnNode(node, valueField, "" + node[valueField]);
      }
    }
    function updateValueIfChanged(node) {
      if (!node)
        return false;
      var tracker = node._valueTracker;
      if (!tracker)
        return true;
      var lastValue = tracker.getValue();
      var value = "";
      node && (value = isCheckable(node) ? node.checked ? "true" : "false" : node.value);
      node = value;
      return node !== lastValue ? (tracker.setValue(node), true) : false;
    }
    var escapeSelectorAttributeValueInsideDoubleQuotesRegex = /[\n"\\]/g;
    function escapeSelectorAttributeValueInsideDoubleQuotes(value) {
      return value.replace(escapeSelectorAttributeValueInsideDoubleQuotesRegex, function(ch) {
        return "\\" + ch.charCodeAt(0).toString(16) + " ";
      });
    }
    function updateInput(element, value, defaultValue, lastDefaultValue, checked, defaultChecked, type, name) {
      element.name = "";
      type != null && typeof type !== "function" && typeof type !== "symbol" && typeof type !== "boolean" ? element.type = type : element.removeAttribute("type");
      if (value != null)
        if (type === "number") {
          if (value === 0 && element.value === "" || element.value != value)
            element.value = "" + getToStringValue(value);
        } else
          element.value !== "" + getToStringValue(value) && (element.value = "" + getToStringValue(value));
      else
        type !== "submit" && type !== "reset" || element.removeAttribute("value");
      value != null ? type === "number" && element.value == value ? setDefaultValue(element, getToStringValue(element.value)) : setDefaultValue(element, getToStringValue(value)) : defaultValue != null ? setDefaultValue(element, getToStringValue(defaultValue)) : lastDefaultValue != null && element.removeAttribute("value");
      checked == null && defaultChecked != null && (element.defaultChecked = !!defaultChecked);
      checked != null && (element.checked = checked && typeof checked !== "function" && typeof checked !== "symbol");
      name != null && typeof name !== "function" && typeof name !== "symbol" && typeof name !== "boolean" ? element.name = "" + getToStringValue(name) : element.removeAttribute("name");
    }
    function initInput(element, value, defaultValue, checked, defaultChecked, type, name, isHydrating) {
      type != null && typeof type !== "function" && typeof type !== "symbol" && typeof type !== "boolean" && (element.type = type);
      if (value != null || defaultValue != null) {
        if (!(type !== "submit" && type !== "reset" || value !== undefined && value !== null)) {
          track(element);
          return;
        }
        defaultValue = defaultValue != null ? "" + getToStringValue(defaultValue) : "";
        value = value != null ? "" + getToStringValue(value) : defaultValue;
        isHydrating || value === element.value || (element.value = value);
        element.defaultValue = value;
      }
      checked = checked != null ? checked : defaultChecked;
      checked = typeof checked !== "function" && typeof checked !== "symbol" && !!checked;
      element.checked = isHydrating ? element.checked : !!checked;
      element.defaultChecked = !!checked;
      name != null && typeof name !== "function" && typeof name !== "symbol" && typeof name !== "boolean" && (element.name = name);
      track(element);
    }
    function setDefaultValue(node, value) {
      node.defaultValue !== "" + value && (node.defaultValue = "" + value);
    }
    function updateOptions(node, multiple, propValue, setDefaultSelected) {
      node = node.options;
      if (multiple) {
        multiple = {};
        for (var i = 0;i < propValue.length; i++)
          multiple["$" + propValue[i]] = true;
        for (propValue = 0;propValue < node.length; propValue++)
          i = multiple.hasOwnProperty("$" + node[propValue].value), node[propValue].selected !== i && (node[propValue].selected = i), i && setDefaultSelected && (node[propValue].defaultSelected = true);
      } else {
        propValue = "" + getToStringValue(propValue);
        multiple = null;
        for (i = 0;i < node.length; i++) {
          if (node[i].value === propValue) {
            node[i].selected = true;
            setDefaultSelected && (node[i].defaultSelected = true);
            return;
          }
          multiple !== null || node[i].disabled || (multiple = node[i]);
        }
        multiple !== null && (multiple.selected = true);
      }
    }
    function updateTextarea(element, value, defaultValue) {
      if (value != null && (value = "" + getToStringValue(value), value !== element.value && (element.value = value), defaultValue == null)) {
        element.defaultValue !== value && (element.defaultValue = value);
        return;
      }
      element.defaultValue = defaultValue != null ? "" + getToStringValue(defaultValue) : "";
    }
    function initTextarea(element, value, defaultValue, children) {
      if (value == null) {
        if (children != null) {
          if (defaultValue != null)
            throw Error(formatProdErrorMessage(92));
          if (isArrayImpl(children)) {
            if (1 < children.length)
              throw Error(formatProdErrorMessage(93));
            children = children[0];
          }
          defaultValue = children;
        }
        defaultValue == null && (defaultValue = "");
        value = defaultValue;
      }
      defaultValue = getToStringValue(value);
      element.defaultValue = defaultValue;
      children = element.textContent;
      children === defaultValue && children !== "" && children !== null && (element.value = children);
      track(element);
    }
    function setTextContent(node, text) {
      if (text) {
        var firstChild = node.firstChild;
        if (firstChild && firstChild === node.lastChild && firstChild.nodeType === 3) {
          firstChild.nodeValue = text;
          return;
        }
      }
      node.textContent = text;
    }
    var unitlessNumbers = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
    function setValueForStyle(style, styleName, value) {
      var isCustomProperty = styleName.indexOf("--") === 0;
      value == null || typeof value === "boolean" || value === "" ? isCustomProperty ? style.setProperty(styleName, "") : styleName === "float" ? style.cssFloat = "" : style[styleName] = "" : isCustomProperty ? style.setProperty(styleName, value) : typeof value !== "number" || value === 0 || unitlessNumbers.has(styleName) ? styleName === "float" ? style.cssFloat = value : style[styleName] = ("" + value).trim() : style[styleName] = value + "px";
    }
    function setValueForStyles(node, styles, prevStyles) {
      if (styles != null && typeof styles !== "object")
        throw Error(formatProdErrorMessage(62));
      node = node.style;
      if (prevStyles != null) {
        for (var styleName in prevStyles)
          !prevStyles.hasOwnProperty(styleName) || styles != null && styles.hasOwnProperty(styleName) || (styleName.indexOf("--") === 0 ? node.setProperty(styleName, "") : styleName === "float" ? node.cssFloat = "" : node[styleName] = "", viewTransitionMutationContext = true);
        for (var styleName$16 in styles)
          styleName = styles[styleName$16], styles.hasOwnProperty(styleName$16) && prevStyles[styleName$16] !== styleName && (setValueForStyle(node, styleName$16, styleName), viewTransitionMutationContext = true);
      } else
        for (var styleName$17 in styles)
          styles.hasOwnProperty(styleName$17) && setValueForStyle(node, styleName$17, styles[styleName$17]);
    }
    function isCustomElement(tagName) {
      if (tagName.indexOf("-") === -1)
        return false;
      switch (tagName) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return false;
        default:
          return true;
      }
    }
    var aliases = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["maskType", "mask-type"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"]
    ]);
    var isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
    function sanitizeURL(url) {
      return isJavaScriptProtocol.test("" + url) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : url;
    }
    function noop$1() {}
    var currentReplayingEvent = null;
    function getEventTarget(nativeEvent) {
      nativeEvent = nativeEvent.target || nativeEvent.srcElement || window;
      nativeEvent.correspondingUseElement && (nativeEvent = nativeEvent.correspondingUseElement);
      return nativeEvent.nodeType === 3 ? nativeEvent.parentNode : nativeEvent;
    }
    var restoreTarget = null;
    var restoreQueue = null;
    function restoreStateOfTarget(target) {
      var internalInstance = getInstanceFromNode(target);
      if (internalInstance && (target = internalInstance.stateNode)) {
        var props = target[internalPropsKey] || null;
        a:
          switch (target = internalInstance.stateNode, internalInstance.type) {
            case "input":
              updateInput(target, props.value, props.defaultValue, props.defaultValue, props.checked, props.defaultChecked, props.type, props.name);
              internalInstance = props.name;
              if (props.type === "radio" && internalInstance != null) {
                for (props = target;props.parentNode; )
                  props = props.parentNode;
                props = props.querySelectorAll('input[name="' + escapeSelectorAttributeValueInsideDoubleQuotes("" + internalInstance) + '"][type="radio"]');
                for (internalInstance = 0;internalInstance < props.length; internalInstance++) {
                  var otherNode = props[internalInstance];
                  if (otherNode !== target && otherNode.form === target.form) {
                    var otherProps = otherNode[internalPropsKey] || null;
                    if (!otherProps)
                      throw Error(formatProdErrorMessage(90));
                    updateInput(otherNode, otherProps.value, otherProps.defaultValue, otherProps.defaultValue, otherProps.checked, otherProps.defaultChecked, otherProps.type, otherProps.name);
                  }
                }
                for (internalInstance = 0;internalInstance < props.length; internalInstance++)
                  otherNode = props[internalInstance], otherNode.form === target.form && updateValueIfChanged(otherNode);
              }
              break a;
            case "textarea":
              updateTextarea(target, props.value, props.defaultValue);
              break a;
            case "select":
              internalInstance = props.value, internalInstance != null && updateOptions(target, !!props.multiple, internalInstance, false);
          }
      }
    }
    var isInsideEventHandler = false;
    function batchedUpdates$1(fn, a, b) {
      if (isInsideEventHandler)
        return fn(a, b);
      isInsideEventHandler = true;
      try {
        var JSCompiler_inline_result = fn(a);
        return JSCompiler_inline_result;
      } finally {
        if (isInsideEventHandler = false, restoreTarget !== null || restoreQueue !== null) {
          if (flushSyncWork$1(), restoreTarget && (a = restoreTarget, fn = restoreQueue, restoreQueue = restoreTarget = null, restoreStateOfTarget(a), fn))
            for (a = 0;a < fn.length; a++)
              restoreStateOfTarget(fn[a]);
        }
      }
    }
    function getListener(inst, registrationName) {
      var stateNode = inst.stateNode;
      if (stateNode === null)
        return null;
      var props = stateNode[internalPropsKey] || null;
      if (props === null)
        return null;
      stateNode = props[registrationName];
      a:
        switch (registrationName) {
          case "onClick":
          case "onClickCapture":
          case "onDoubleClick":
          case "onDoubleClickCapture":
          case "onMouseDown":
          case "onMouseDownCapture":
          case "onMouseMove":
          case "onMouseMoveCapture":
          case "onMouseUp":
          case "onMouseUpCapture":
          case "onMouseEnter":
            (props = !props.disabled) || (inst = inst.type, props = !(inst === "button" || inst === "input" || inst === "select" || inst === "textarea"));
            inst = !props;
            break a;
          default:
            inst = false;
        }
      if (inst)
        return null;
      if (stateNode && typeof stateNode !== "function")
        throw Error(formatProdErrorMessage(231, registrationName, typeof stateNode));
      return stateNode;
    }
    var canUseDOM = !(typeof window === "undefined" || typeof window.document === "undefined" || typeof window.document.createElement === "undefined");
    var passiveBrowserEventsSupported = false;
    if (canUseDOM)
      try {
        options = {};
        Object.defineProperty(options, "passive", {
          get: function() {
            passiveBrowserEventsSupported = true;
          }
        });
        window.addEventListener("test", options, options);
        window.removeEventListener("test", options, options);
      } catch (e) {
        passiveBrowserEventsSupported = false;
      }
    var options;
    var root = null;
    var startText = null;
    var fallbackText = null;
    function getData() {
      if (fallbackText)
        return fallbackText;
      var start, startValue = startText, startLength = startValue.length, end, endValue = "value" in root ? root.value : root.textContent, endLength = endValue.length;
      for (start = 0;start < startLength && startValue[start] === endValue[start]; start++)
        ;
      var minEnd = startLength - start;
      for (end = 1;end <= minEnd && startValue[startLength - end] === endValue[endLength - end]; end++)
        ;
      return fallbackText = endValue.slice(start, 1 < end ? 1 - end : undefined);
    }
    function getEventCharCode(nativeEvent) {
      var keyCode = nativeEvent.keyCode;
      "charCode" in nativeEvent ? (nativeEvent = nativeEvent.charCode, nativeEvent === 0 && keyCode === 13 && (nativeEvent = 13)) : nativeEvent = keyCode;
      nativeEvent === 10 && (nativeEvent = 13);
      return 32 <= nativeEvent || nativeEvent === 13 ? nativeEvent : 0;
    }
    function functionThatReturnsTrue() {
      return true;
    }
    function functionThatReturnsFalse() {
      return false;
    }
    function createSyntheticEvent(Interface) {
      function SyntheticBaseEvent(reactName, reactEventType, targetInst, nativeEvent, nativeEventTarget) {
        this._reactName = reactName;
        this._targetInst = targetInst;
        this.type = reactEventType;
        this.nativeEvent = nativeEvent;
        this.target = nativeEventTarget;
        this.currentTarget = null;
        for (var propName in Interface)
          Interface.hasOwnProperty(propName) && (reactName = Interface[propName], this[propName] = reactName ? reactName(nativeEvent) : nativeEvent[propName]);
        this.isDefaultPrevented = (nativeEvent.defaultPrevented != null ? nativeEvent.defaultPrevented : nativeEvent.returnValue === false) ? functionThatReturnsTrue : functionThatReturnsFalse;
        this.isPropagationStopped = functionThatReturnsFalse;
        return this;
      }
      assign(SyntheticBaseEvent.prototype, {
        preventDefault: function() {
          this.defaultPrevented = true;
          var event = this.nativeEvent;
          event && (event.preventDefault ? event.preventDefault() : typeof event.returnValue !== "unknown" && (event.returnValue = false), this.isDefaultPrevented = functionThatReturnsTrue);
        },
        stopPropagation: function() {
          var event = this.nativeEvent;
          event && (event.stopPropagation ? event.stopPropagation() : typeof event.cancelBubble !== "unknown" && (event.cancelBubble = true), this.isPropagationStopped = functionThatReturnsTrue);
        },
        persist: function() {},
        isPersistent: functionThatReturnsTrue
      });
      return SyntheticBaseEvent;
    }
    var EventInterface = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(event) {
        return event.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    };
    var SyntheticEvent = createSyntheticEvent(EventInterface);
    var UIEventInterface = assign({}, EventInterface, { view: 0, detail: 0 });
    var SyntheticUIEvent = createSyntheticEvent(UIEventInterface);
    var lastMovementX;
    var lastMovementY;
    var lastMouseEvent;
    var MouseEventInterface = assign({}, UIEventInterface, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: getEventModifierState,
      button: 0,
      buttons: 0,
      relatedTarget: function(event) {
        return event.relatedTarget === undefined ? event.fromElement === event.srcElement ? event.toElement : event.fromElement : event.relatedTarget;
      },
      movementX: function(event) {
        if ("movementX" in event)
          return event.movementX;
        event !== lastMouseEvent && (lastMouseEvent && event.type === "mousemove" ? (lastMovementX = event.screenX - lastMouseEvent.screenX, lastMovementY = event.screenY - lastMouseEvent.screenY) : lastMovementY = lastMovementX = 0, lastMouseEvent = event);
        return lastMovementX;
      },
      movementY: function(event) {
        return "movementY" in event ? event.movementY : lastMovementY;
      }
    });
    var SyntheticMouseEvent = createSyntheticEvent(MouseEventInterface);
    var DragEventInterface = assign({}, MouseEventInterface, { dataTransfer: 0 });
    var SyntheticDragEvent = createSyntheticEvent(DragEventInterface);
    var FocusEventInterface = assign({}, UIEventInterface, { relatedTarget: 0 });
    var SyntheticFocusEvent = createSyntheticEvent(FocusEventInterface);
    var AnimationEventInterface = assign({}, EventInterface, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    });
    var SyntheticAnimationEvent = createSyntheticEvent(AnimationEventInterface);
    var ClipboardEventInterface = assign({}, EventInterface, {
      clipboardData: function(event) {
        return "clipboardData" in event ? event.clipboardData : window.clipboardData;
      }
    });
    var SyntheticClipboardEvent = createSyntheticEvent(ClipboardEventInterface);
    var CompositionEventInterface = assign({}, EventInterface, { data: 0 });
    var SyntheticCompositionEvent = createSyntheticEvent(CompositionEventInterface);
    var normalizeKey = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified"
    };
    var translateToKey = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta"
    };
    var modifierKeyToProp = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function modifierStateGetter(keyArg) {
      var nativeEvent = this.nativeEvent;
      return nativeEvent.getModifierState ? nativeEvent.getModifierState(keyArg) : (keyArg = modifierKeyToProp[keyArg]) ? !!nativeEvent[keyArg] : false;
    }
    function getEventModifierState() {
      return modifierStateGetter;
    }
    var KeyboardEventInterface = assign({}, UIEventInterface, {
      key: function(nativeEvent) {
        if (nativeEvent.key) {
          var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
          if (key !== "Unidentified")
            return key;
        }
        return nativeEvent.type === "keypress" ? (nativeEvent = getEventCharCode(nativeEvent), nativeEvent === 13 ? "Enter" : String.fromCharCode(nativeEvent)) : nativeEvent.type === "keydown" || nativeEvent.type === "keyup" ? translateToKey[nativeEvent.keyCode] || "Unidentified" : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: getEventModifierState,
      charCode: function(event) {
        return event.type === "keypress" ? getEventCharCode(event) : 0;
      },
      keyCode: function(event) {
        return event.type === "keydown" || event.type === "keyup" ? event.keyCode : 0;
      },
      which: function(event) {
        return event.type === "keypress" ? getEventCharCode(event) : event.type === "keydown" || event.type === "keyup" ? event.keyCode : 0;
      }
    });
    var SyntheticKeyboardEvent = createSyntheticEvent(KeyboardEventInterface);
    var PointerEventInterface = assign({}, MouseEventInterface, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0
    });
    var SyntheticPointerEvent = createSyntheticEvent(PointerEventInterface);
    var SubmitEventInterface = assign({}, EventInterface, { submitter: 0 });
    var SyntheticSubmitEvent = createSyntheticEvent(SubmitEventInterface);
    var TouchEventInterface = assign({}, UIEventInterface, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: getEventModifierState
    });
    var SyntheticTouchEvent = createSyntheticEvent(TouchEventInterface);
    var TransitionEventInterface = assign({}, EventInterface, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    });
    var SyntheticTransitionEvent = createSyntheticEvent(TransitionEventInterface);
    var WheelEventInterface = assign({}, MouseEventInterface, {
      deltaX: function(event) {
        return "deltaX" in event ? event.deltaX : ("wheelDeltaX" in event) ? -event.wheelDeltaX : 0;
      },
      deltaY: function(event) {
        return "deltaY" in event ? event.deltaY : ("wheelDeltaY" in event) ? -event.wheelDeltaY : ("wheelDelta" in event) ? -event.wheelDelta : 0;
      },
      deltaZ: 0,
      deltaMode: 0
    });
    var SyntheticWheelEvent = createSyntheticEvent(WheelEventInterface);
    var ToggleEventInterface = assign({}, EventInterface, {
      newState: 0,
      oldState: 0,
      source: 0
    });
    var SyntheticToggleEvent = createSyntheticEvent(ToggleEventInterface);
    var END_KEYCODES = [9, 13, 27, 32];
    var canUseCompositionEvent = canUseDOM && "CompositionEvent" in window;
    var documentMode = null;
    canUseDOM && "documentMode" in document && (documentMode = document.documentMode);
    var canUseTextInputEvent = canUseDOM && "TextEvent" in window && !documentMode;
    var useFallbackCompositionData = canUseDOM && (!canUseCompositionEvent || documentMode && 8 < documentMode && 11 >= documentMode);
    var SPACEBAR_CHAR = String.fromCharCode(32);
    var hasSpaceKeypress = false;
    function isFallbackCompositionEnd(domEventName, nativeEvent) {
      switch (domEventName) {
        case "keyup":
          return END_KEYCODES.indexOf(nativeEvent.keyCode) !== -1;
        case "keydown":
          return nativeEvent.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
          return true;
        default:
          return false;
      }
    }
    function getDataFromCustomEvent(nativeEvent) {
      nativeEvent = nativeEvent.detail;
      return typeof nativeEvent === "object" && "data" in nativeEvent ? nativeEvent.data : null;
    }
    var isComposing = false;
    function getNativeBeforeInputChars(domEventName, nativeEvent) {
      switch (domEventName) {
        case "compositionend":
          return getDataFromCustomEvent(nativeEvent);
        case "keypress":
          if (nativeEvent.which !== 32)
            return null;
          hasSpaceKeypress = true;
          return SPACEBAR_CHAR;
        case "textInput":
          return domEventName = nativeEvent.data, domEventName === SPACEBAR_CHAR && hasSpaceKeypress ? null : domEventName;
        default:
          return null;
      }
    }
    function getFallbackBeforeInputChars(domEventName, nativeEvent) {
      if (isComposing)
        return domEventName === "compositionend" || !canUseCompositionEvent && isFallbackCompositionEnd(domEventName, nativeEvent) ? (domEventName = getData(), fallbackText = startText = root = null, isComposing = false, domEventName) : null;
      switch (domEventName) {
        case "paste":
          return null;
        case "keypress":
          if (!(nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) || nativeEvent.ctrlKey && nativeEvent.altKey) {
            if (nativeEvent.char && 1 < nativeEvent.char.length)
              return nativeEvent.char;
            if (nativeEvent.which)
              return String.fromCharCode(nativeEvent.which);
          }
          return null;
        case "compositionend":
          return useFallbackCompositionData && nativeEvent.locale !== "ko" ? null : nativeEvent.data;
        default:
          return null;
      }
    }
    var supportedInputTypes = {
      color: true,
      date: true,
      datetime: true,
      "datetime-local": true,
      email: true,
      month: true,
      number: true,
      password: true,
      range: true,
      search: true,
      tel: true,
      text: true,
      time: true,
      url: true,
      week: true
    };
    function isTextInputElement(elem) {
      var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
      return nodeName === "input" ? !!supportedInputTypes[elem.type] : nodeName === "textarea" ? true : false;
    }
    function createAndAccumulateChangeEvent(dispatchQueue, inst, nativeEvent, target) {
      restoreTarget ? restoreQueue ? restoreQueue.push(target) : restoreQueue = [target] : restoreTarget = target;
      inst = accumulateTwoPhaseListeners(inst, "onChange");
      0 < inst.length && (nativeEvent = new SyntheticEvent("onChange", "change", null, nativeEvent, target), dispatchQueue.push({ event: nativeEvent, listeners: inst }));
    }
    var activeElement$1 = null;
    var activeElementInst$1 = null;
    function runEventInBatch(dispatchQueue) {
      processDispatchQueue(dispatchQueue, 0);
    }
    function getInstIfValueChanged(targetInst) {
      var targetNode = getNodeFromInstance(targetInst);
      if (updateValueIfChanged(targetNode))
        return targetInst;
    }
    function getTargetInstForChangeEvent(domEventName, targetInst) {
      if (domEventName === "change")
        return targetInst;
    }
    var isInputEventSupported = false;
    if (canUseDOM) {
      if (canUseDOM) {
        isSupported$jscomp$inline_474 = "oninput" in document;
        if (!isSupported$jscomp$inline_474) {
          element$jscomp$inline_475 = document.createElement("div");
          element$jscomp$inline_475.setAttribute("oninput", "return;");
          isSupported$jscomp$inline_474 = typeof element$jscomp$inline_475.oninput === "function";
        }
        JSCompiler_inline_result$jscomp$318 = isSupported$jscomp$inline_474;
      } else
        JSCompiler_inline_result$jscomp$318 = false;
      isInputEventSupported = JSCompiler_inline_result$jscomp$318 && (!document.documentMode || 9 < document.documentMode);
    }
    var JSCompiler_inline_result$jscomp$318;
    var isSupported$jscomp$inline_474;
    var element$jscomp$inline_475;
    function stopWatchingForValueChange() {
      activeElement$1 && (activeElement$1.detachEvent("onpropertychange", handlePropertyChange), activeElementInst$1 = activeElement$1 = null);
    }
    function handlePropertyChange(nativeEvent) {
      if (nativeEvent.propertyName === "value" && getInstIfValueChanged(activeElementInst$1)) {
        var dispatchQueue = [];
        createAndAccumulateChangeEvent(dispatchQueue, activeElementInst$1, nativeEvent, getEventTarget(nativeEvent));
        batchedUpdates$1(runEventInBatch, dispatchQueue);
      }
    }
    function handleEventsForInputEventPolyfill(domEventName, target, targetInst) {
      domEventName === "focusin" ? (stopWatchingForValueChange(), activeElement$1 = target, activeElementInst$1 = targetInst, activeElement$1.attachEvent("onpropertychange", handlePropertyChange)) : domEventName === "focusout" && stopWatchingForValueChange();
    }
    function getTargetInstForInputEventPolyfill(domEventName) {
      if (domEventName === "selectionchange" || domEventName === "keyup" || domEventName === "keydown")
        return getInstIfValueChanged(activeElementInst$1);
    }
    function getTargetInstForClickEvent(domEventName, targetInst) {
      if (domEventName === "click")
        return getInstIfValueChanged(targetInst);
    }
    function getTargetInstForInputOrChangeEvent(domEventName, targetInst) {
      if (domEventName === "input" || domEventName === "change")
        return getInstIfValueChanged(targetInst);
    }
    function is(x, y) {
      return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
    }
    var objectIs = typeof Object.is === "function" ? Object.is : is;
    function shallowEqual(objA, objB) {
      if (objectIs(objA, objB))
        return true;
      if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null)
        return false;
      var keysA = Object.keys(objA), keysB = Object.keys(objB);
      if (keysA.length !== keysB.length)
        return false;
      for (keysB = 0;keysB < keysA.length; keysB++) {
        var currentKey = keysA[keysB];
        if (!hasOwnProperty.call(objB, currentKey) || !objectIs(objA[currentKey], objB[currentKey]))
          return false;
      }
      return true;
    }
    function getActiveElement(doc) {
      doc = doc || (typeof document !== "undefined" ? document : undefined);
      if (typeof doc === "undefined")
        return null;
      try {
        return doc.activeElement || doc.body;
      } catch (e$20) {
        return doc.body;
      }
    }
    function getLeafNode(node) {
      for (;node && node.firstChild; )
        node = node.firstChild;
      return node;
    }
    function getNodeForCharacterOffset(root, offset) {
      var node = getLeafNode(root);
      root = 0;
      for (var nodeEnd;node; ) {
        if (node.nodeType === 3) {
          nodeEnd = root + node.textContent.length;
          if (root <= offset && nodeEnd >= offset)
            return { node, offset: offset - root };
          root = nodeEnd;
        }
        a: {
          for (;node; ) {
            if (node.nextSibling) {
              node = node.nextSibling;
              break a;
            }
            node = node.parentNode;
          }
          node = undefined;
        }
        node = getLeafNode(node);
      }
    }
    function containsNode(outerNode, innerNode) {
      return outerNode && innerNode ? outerNode === innerNode ? true : outerNode && outerNode.nodeType === 3 ? false : innerNode && innerNode.nodeType === 3 ? containsNode(outerNode, innerNode.parentNode) : ("contains" in outerNode) ? outerNode.contains(innerNode) : outerNode.compareDocumentPosition ? !!(outerNode.compareDocumentPosition(innerNode) & 16) : false : false;
    }
    function getActiveElementDeep(containerInfo) {
      containerInfo = containerInfo != null && containerInfo.ownerDocument != null && containerInfo.ownerDocument.defaultView != null ? containerInfo.ownerDocument.defaultView : window;
      for (var element = getActiveElement(containerInfo.document);element instanceof containerInfo.HTMLIFrameElement; ) {
        try {
          var JSCompiler_inline_result = typeof element.contentWindow.location.href === "string";
        } catch (err) {
          JSCompiler_inline_result = false;
        }
        if (JSCompiler_inline_result)
          containerInfo = element.contentWindow;
        else
          break;
        element = getActiveElement(containerInfo.document);
      }
      return element;
    }
    function hasSelectionCapabilities(elem) {
      var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
      return nodeName && (nodeName === "input" && (elem.type === "text" || elem.type === "search" || elem.type === "tel" || elem.type === "url" || elem.type === "password") || nodeName === "textarea" || elem.contentEditable === "true");
    }
    var skipSelectionChangeEvent = canUseDOM && "documentMode" in document && 11 >= document.documentMode;
    var activeElement = null;
    var activeElementInst = null;
    var lastSelection = null;
    var mouseDown = false;
    function constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget) {
      var doc = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget.document : nativeEventTarget.nodeType === 9 ? nativeEventTarget : nativeEventTarget.ownerDocument;
      mouseDown || activeElement == null || activeElement !== getActiveElement(doc) || (doc = activeElement, ("selectionStart" in doc) && hasSelectionCapabilities(doc) ? doc = { start: doc.selectionStart, end: doc.selectionEnd } : (doc = (doc.ownerDocument && doc.ownerDocument.defaultView || window).getSelection(), doc = {
        anchorNode: doc.anchorNode,
        anchorOffset: doc.anchorOffset,
        focusNode: doc.focusNode,
        focusOffset: doc.focusOffset
      }), lastSelection && shallowEqual(lastSelection, doc) || (lastSelection = doc, doc = accumulateTwoPhaseListeners(activeElementInst, "onSelect"), 0 < doc.length && (nativeEvent = new SyntheticEvent("onSelect", "select", null, nativeEvent, nativeEventTarget), dispatchQueue.push({ event: nativeEvent, listeners: doc }), nativeEvent.target = activeElement)));
    }
    function makePrefixMap(styleProp, eventName) {
      var prefixes = {};
      prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
      prefixes["Webkit" + styleProp] = "webkit" + eventName;
      prefixes["Moz" + styleProp] = "moz" + eventName;
      return prefixes;
    }
    var vendorPrefixes = {
      animationend: makePrefixMap("Animation", "AnimationEnd"),
      animationiteration: makePrefixMap("Animation", "AnimationIteration"),
      animationstart: makePrefixMap("Animation", "AnimationStart"),
      transitionrun: makePrefixMap("Transition", "TransitionRun"),
      transitionstart: makePrefixMap("Transition", "TransitionStart"),
      transitioncancel: makePrefixMap("Transition", "TransitionCancel"),
      transitionend: makePrefixMap("Transition", "TransitionEnd")
    };
    var prefixedEventNames = {};
    var style = {};
    canUseDOM && (style = document.createElement("div").style, ("AnimationEvent" in window) || (delete vendorPrefixes.animationend.animation, delete vendorPrefixes.animationiteration.animation, delete vendorPrefixes.animationstart.animation), ("TransitionEvent" in window) || delete vendorPrefixes.transitionend.transition);
    function getVendorPrefixedEventName(eventName) {
      if (prefixedEventNames[eventName])
        return prefixedEventNames[eventName];
      if (!vendorPrefixes[eventName])
        return eventName;
      var prefixMap = vendorPrefixes[eventName], styleProp;
      for (styleProp in prefixMap)
        if (prefixMap.hasOwnProperty(styleProp) && styleProp in style)
          return prefixedEventNames[eventName] = prefixMap[styleProp];
      return eventName;
    }
    var ANIMATION_END = getVendorPrefixedEventName("animationend");
    var ANIMATION_ITERATION = getVendorPrefixedEventName("animationiteration");
    var ANIMATION_START = getVendorPrefixedEventName("animationstart");
    var TRANSITION_RUN = getVendorPrefixedEventName("transitionrun");
    var TRANSITION_START = getVendorPrefixedEventName("transitionstart");
    var TRANSITION_CANCEL = getVendorPrefixedEventName("transitioncancel");
    var TRANSITION_END = getVendorPrefixedEventName("transitionend");
    var topLevelEventsToReactNames = new Map;
    var simpleEventPluginEvents = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
    simpleEventPluginEvents.push("scrollEnd");
    function registerSimpleEvent(domEventName, reactName) {
      topLevelEventsToReactNames.set(domEventName, reactName);
      registerTwoPhaseEvent(reactName, [domEventName]);
    }
    var globalClientIdCounter$1 = 0;
    function getViewTransitionName(props, instance) {
      if (props.name != null && props.name !== "auto")
        return props.name;
      if (instance.autoName !== null)
        return instance.autoName;
      props = pendingEffectsRoot.identifierPrefix;
      var globalClientId = globalClientIdCounter$1++;
      props = "_" + props + "t_" + globalClientId.toString(32) + "_";
      return instance.autoName = props;
    }
    function getClassNameByType(classByType) {
      if (classByType == null || typeof classByType === "string")
        return classByType;
      var className = null, activeTypes = pendingTransitionTypes;
      if (activeTypes !== null)
        for (var i = 0;i < activeTypes.length; i++) {
          var match = classByType[activeTypes[i]];
          if (match != null) {
            if (match === "none")
              return "none";
            className = className == null ? match : className + (" " + match);
          }
        }
      return className == null ? classByType.default : className;
    }
    function getViewTransitionClassName(defaultClass, eventClass) {
      defaultClass = getClassNameByType(defaultClass);
      eventClass = getClassNameByType(eventClass);
      return eventClass == null ? defaultClass === "auto" ? null : defaultClass : eventClass === "auto" ? null : eventClass;
    }
    var reportGlobalError = typeof reportError === "function" ? reportError : function(error) {
      if (typeof window === "object" && typeof window.ErrorEvent === "function") {
        var event = new window.ErrorEvent("error", {
          bubbles: true,
          cancelable: true,
          message: typeof error === "object" && error !== null && typeof error.message === "string" ? String(error.message) : String(error),
          error
        });
        if (!window.dispatchEvent(event))
          return;
      } else if (typeof process === "object" && typeof process.emit === "function") {
        process.emit("uncaughtException", error);
        return;
      }
      console.error(error);
    };
    var concurrentQueues = [];
    var concurrentQueuesIndex = 0;
    var concurrentlyUpdatedLanes = 0;
    function finishQueueingConcurrentUpdates() {
      for (var endIndex = concurrentQueuesIndex, i = concurrentlyUpdatedLanes = concurrentQueuesIndex = 0;i < endIndex; ) {
        var fiber = concurrentQueues[i];
        concurrentQueues[i++] = null;
        var queue = concurrentQueues[i];
        concurrentQueues[i++] = null;
        var update = concurrentQueues[i];
        concurrentQueues[i++] = null;
        var lane = concurrentQueues[i];
        concurrentQueues[i++] = null;
        if (queue !== null && update !== null) {
          var pending = queue.pending;
          pending === null ? update.next = update : (update.next = pending.next, pending.next = update);
          queue.pending = update;
        }
        lane !== 0 && markUpdateLaneFromFiberToRoot(fiber, update, lane);
      }
    }
    function enqueueUpdate$1(fiber, queue, update, lane) {
      concurrentQueues[concurrentQueuesIndex++] = fiber;
      concurrentQueues[concurrentQueuesIndex++] = queue;
      concurrentQueues[concurrentQueuesIndex++] = update;
      concurrentQueues[concurrentQueuesIndex++] = lane;
      concurrentlyUpdatedLanes |= lane;
      fiber.lanes |= lane;
      fiber = fiber.alternate;
      fiber !== null && (fiber.lanes |= lane);
    }
    function enqueueConcurrentHookUpdate(fiber, queue, update, lane) {
      enqueueUpdate$1(fiber, queue, update, lane);
      return getRootForUpdatedFiber(fiber);
    }
    function enqueueConcurrentRenderForLane(fiber, lane) {
      enqueueUpdate$1(fiber, null, null, lane);
      return getRootForUpdatedFiber(fiber);
    }
    function markUpdateLaneFromFiberToRoot(sourceFiber, update, lane) {
      sourceFiber.lanes |= lane;
      var alternate = sourceFiber.alternate;
      alternate !== null && (alternate.lanes |= lane);
      for (var isHidden = false, parent = sourceFiber.return;parent !== null; )
        parent.childLanes |= lane, alternate = parent.alternate, alternate !== null && (alternate.childLanes |= lane), parent.tag === 22 && (sourceFiber = parent.stateNode, sourceFiber === null || sourceFiber._visibility & 1 || (isHidden = true)), sourceFiber = parent, parent = parent.return;
      return sourceFiber.tag === 3 ? (parent = sourceFiber.stateNode, isHidden && update !== null && (isHidden = 31 - clz32(lane), sourceFiber = parent.hiddenUpdates, alternate = sourceFiber[isHidden], alternate === null ? sourceFiber[isHidden] = [update] : alternate.push(update), update.lane = lane | 536870912), parent) : null;
    }
    function getRootForUpdatedFiber(sourceFiber) {
      if (50 < nestedUpdateCount)
        throw nestedUpdateCount = 0, rootWithNestedUpdates = null, Error(formatProdErrorMessage(185));
      for (var parent = sourceFiber.return;parent !== null; )
        sourceFiber = parent, parent = sourceFiber.return;
      return sourceFiber.tag === 3 ? sourceFiber.stateNode : null;
    }
    var emptyContextObject = {};
    function FiberNode(tag, pendingProps, key, mode) {
      this.tag = tag;
      this.key = key;
      this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
      this.index = 0;
      this.refCleanup = this.ref = null;
      this.pendingProps = pendingProps;
      this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
      this.mode = mode;
      this.subtreeFlags = this.flags = 0;
      this.deletions = null;
      this.childLanes = this.lanes = 0;
      this.alternate = null;
    }
    function createFiberImplClass(tag, pendingProps, key, mode) {
      return new FiberNode(tag, pendingProps, key, mode);
    }
    function shouldConstruct(Component) {
      Component = Component.prototype;
      return !(!Component || !Component.isReactComponent);
    }
    function createWorkInProgress(current, pendingProps) {
      var workInProgress = current.alternate;
      workInProgress === null ? (workInProgress = createFiberImplClass(current.tag, pendingProps, current.key, current.mode), workInProgress.elementType = current.elementType, workInProgress.type = current.type, workInProgress.stateNode = current.stateNode, workInProgress.alternate = current, current.alternate = workInProgress) : (workInProgress.pendingProps = pendingProps, workInProgress.type = current.type, workInProgress.flags = 0, workInProgress.subtreeFlags = 0, workInProgress.deletions = null);
      workInProgress.flags = current.flags & 1206910976;
      workInProgress.childLanes = current.childLanes;
      workInProgress.lanes = current.lanes;
      workInProgress.child = current.child;
      workInProgress.memoizedProps = current.memoizedProps;
      workInProgress.memoizedState = current.memoizedState;
      workInProgress.updateQueue = current.updateQueue;
      pendingProps = current.dependencies;
      workInProgress.dependencies = pendingProps === null ? null : { lanes: pendingProps.lanes, firstContext: pendingProps.firstContext };
      workInProgress.sibling = current.sibling;
      workInProgress.index = current.index;
      workInProgress.ref = current.ref;
      workInProgress.refCleanup = current.refCleanup;
      return workInProgress;
    }
    function resetWorkInProgress(workInProgress, renderLanes) {
      workInProgress.flags &= 1206910978;
      var current = workInProgress.alternate;
      current === null ? (workInProgress.childLanes = 0, workInProgress.lanes = renderLanes, workInProgress.child = null, workInProgress.subtreeFlags = 0, workInProgress.memoizedProps = null, workInProgress.memoizedState = null, workInProgress.updateQueue = null, workInProgress.dependencies = null, workInProgress.stateNode = null) : (workInProgress.childLanes = current.childLanes, workInProgress.lanes = current.lanes, workInProgress.child = current.child, workInProgress.subtreeFlags = 0, workInProgress.deletions = null, workInProgress.memoizedProps = current.memoizedProps, workInProgress.memoizedState = current.memoizedState, workInProgress.updateQueue = current.updateQueue, workInProgress.type = current.type, renderLanes = current.dependencies, workInProgress.dependencies = renderLanes === null ? null : {
        lanes: renderLanes.lanes,
        firstContext: renderLanes.firstContext
      });
      return workInProgress;
    }
    function createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, lanes) {
      var fiberTag = 0;
      owner = type;
      if (typeof owner === "function")
        shouldConstruct(owner) && (fiberTag = 1);
      else if (typeof owner === "string")
        fiberTag = isHostHoistableType(type, pendingProps, contextStackCursor.current) ? 26 : type === "html" || type === "head" || type === "body" ? 27 : 5;
      else
        a:
          switch (owner) {
            case REACT_ACTIVITY_TYPE:
              return type = createFiberImplClass(31, pendingProps, key, mode), type.elementType = REACT_ACTIVITY_TYPE, type.lanes = lanes, type;
            case REACT_FRAGMENT_TYPE:
              return createFiberFromFragment(pendingProps.children, mode, lanes, key);
            case REACT_STRICT_MODE_TYPE:
              fiberTag = 8;
              mode |= 24;
              break;
            case REACT_PROFILER_TYPE:
              return type = createFiberImplClass(12, pendingProps, key, mode | 2), type.elementType = REACT_PROFILER_TYPE, type.lanes = lanes, type;
            case REACT_SUSPENSE_TYPE:
              return type = createFiberImplClass(13, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_TYPE, type.lanes = lanes, type;
            case REACT_SUSPENSE_LIST_TYPE:
              return type = createFiberImplClass(19, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_LIST_TYPE, type.lanes = lanes, type;
            case REACT_LEGACY_HIDDEN_TYPE:
            case REACT_VIEW_TRANSITION_TYPE:
              return type = mode | 32, type = createFiberImplClass(30, pendingProps, key, type), type.elementType = REACT_VIEW_TRANSITION_TYPE, type.lanes = lanes, type.stateNode = {
                autoName: null,
                paired: null,
                clones: null,
                ref: null
              }, type;
            default:
              if (typeof owner === "object" && owner !== null)
                switch (owner.$$typeof) {
                  case REACT_CONTEXT_TYPE:
                    fiberTag = 10;
                    break a;
                  case REACT_CONSUMER_TYPE:
                    fiberTag = 9;
                    break a;
                  case REACT_FORWARD_REF_TYPE:
                    fiberTag = 11;
                    break a;
                  case REACT_MEMO_TYPE:
                    fiberTag = 14;
                    break a;
                  case REACT_LAZY_TYPE:
                    fiberTag = 16;
                    owner = null;
                    break a;
                }
              fiberTag = 29;
              pendingProps = Error(formatProdErrorMessage(130, type === null ? "null" : typeof type, ""));
              owner = null;
          }
      key = createFiberImplClass(fiberTag, pendingProps, key, mode);
      key.elementType = type;
      key.type = owner;
      key.lanes = lanes;
      return key;
    }
    function createFiberFromFragment(elements, mode, lanes, key) {
      elements = createFiberImplClass(7, elements, key, mode);
      elements.lanes = lanes;
      return elements;
    }
    function createFiberFromText(content, mode, lanes) {
      content = createFiberImplClass(6, content, null, mode);
      content.lanes = lanes;
      return content;
    }
    function createFiberFromDehydratedFragment(dehydratedNode) {
      var fiber = createFiberImplClass(18, null, null, 0);
      fiber.stateNode = dehydratedNode;
      return fiber;
    }
    function createFiberFromPortal(portal, mode, lanes) {
      mode = createFiberImplClass(4, portal.children !== null ? portal.children : [], portal.key, mode);
      mode.lanes = lanes;
      mode.stateNode = {
        containerInfo: portal.containerInfo,
        pendingChildren: null,
        implementation: portal.implementation
      };
      return mode;
    }
    var CapturedStacks = new WeakMap;
    function createCapturedValueAtFiber(value, source) {
      if (typeof value === "object" && value !== null) {
        var existing = CapturedStacks.get(value);
        if (existing !== undefined)
          return existing;
        source = {
          value,
          source,
          stack: getStackByFiberInDevAndProd(source)
        };
        CapturedStacks.set(value, source);
        return source;
      }
      return {
        value,
        source,
        stack: getStackByFiberInDevAndProd(source)
      };
    }
    var forkStack = [];
    var forkStackIndex = 0;
    var treeForkProvider = null;
    var treeForkCount = 0;
    var idStack = [];
    var idStackIndex = 0;
    var treeContextProvider = null;
    var treeContextId = 1;
    var treeContextOverflow = "";
    function pushTreeFork(workInProgress, totalChildren) {
      forkStack[forkStackIndex++] = treeForkCount;
      forkStack[forkStackIndex++] = treeForkProvider;
      treeForkProvider = workInProgress;
      treeForkCount = totalChildren;
    }
    function pushTreeId(workInProgress, totalChildren, index) {
      idStack[idStackIndex++] = treeContextId;
      idStack[idStackIndex++] = treeContextOverflow;
      idStack[idStackIndex++] = treeContextProvider;
      treeContextProvider = workInProgress;
      var baseIdWithLeadingBit = treeContextId;
      workInProgress = treeContextOverflow;
      var baseLength = 32 - clz32(baseIdWithLeadingBit) - 1;
      baseIdWithLeadingBit &= ~(1 << baseLength);
      index += 1;
      var length = 32 - clz32(totalChildren) + baseLength;
      if (30 < length) {
        var numberOfOverflowBits = baseLength - baseLength % 5;
        length = (baseIdWithLeadingBit & (1 << numberOfOverflowBits) - 1).toString(32);
        baseIdWithLeadingBit >>= numberOfOverflowBits;
        baseLength -= numberOfOverflowBits;
        treeContextId = 1 << 32 - clz32(totalChildren) + baseLength | index << baseLength | baseIdWithLeadingBit;
        treeContextOverflow = length + workInProgress;
      } else
        treeContextId = 1 << length | index << baseLength | baseIdWithLeadingBit, treeContextOverflow = workInProgress;
    }
    function pushMaterializedTreeId(workInProgress) {
      workInProgress.return !== null && (pushTreeFork(workInProgress, 1), pushTreeId(workInProgress, 1, 0));
    }
    function popTreeContext(workInProgress) {
      for (;workInProgress === treeForkProvider; )
        treeForkProvider = forkStack[--forkStackIndex], forkStack[forkStackIndex] = null, treeForkCount = forkStack[--forkStackIndex], forkStack[forkStackIndex] = null;
      for (;workInProgress === treeContextProvider; )
        treeContextProvider = idStack[--idStackIndex], idStack[idStackIndex] = null, treeContextOverflow = idStack[--idStackIndex], idStack[idStackIndex] = null, treeContextId = idStack[--idStackIndex], idStack[idStackIndex] = null;
    }
    function restoreSuspendedTreeContext(workInProgress, suspendedContext) {
      idStack[idStackIndex++] = treeContextId;
      idStack[idStackIndex++] = treeContextOverflow;
      idStack[idStackIndex++] = treeContextProvider;
      treeContextId = suspendedContext.id;
      treeContextOverflow = suspendedContext.overflow;
      treeContextProvider = workInProgress;
    }
    var hydrationParentFiber = null;
    var nextHydratableInstance = null;
    var isHydrating = false;
    var hydrationErrors = null;
    var rootOrSingletonContext = false;
    var HydrationMismatchException = Error(formatProdErrorMessage(519));
    function throwOnHydrationMismatch(fiber) {
      var error = Error(formatProdErrorMessage(418, 1 < arguments.length && arguments[1] !== undefined && arguments[1] ? "text" : "HTML", ""));
      queueHydrationError(createCapturedValueAtFiber(error, fiber));
      throw HydrationMismatchException;
    }
    function prepareToHydrateHostInstance(fiber) {
      var { stateNode: instance, type, memoizedProps: props } = fiber;
      instance[internalInstanceKey] = fiber;
      instance[internalPropsKey] = props;
      switch (type) {
        case "dialog":
          listenToNonDelegatedEvent("cancel", instance);
          listenToNonDelegatedEvent("close", instance);
          break;
        case "iframe":
        case "object":
        case "embed":
          listenToNonDelegatedEvent("load", instance);
          break;
        case "video":
        case "audio":
          for (type = 0;type < mediaEventTypes.length; type++)
            listenToNonDelegatedEvent(mediaEventTypes[type], instance);
          break;
        case "source":
          listenToNonDelegatedEvent("error", instance);
          break;
        case "img":
        case "image":
        case "link":
          listenToNonDelegatedEvent("error", instance);
          listenToNonDelegatedEvent("load", instance);
          break;
        case "details":
          listenToNonDelegatedEvent("toggle", instance);
          break;
        case "input":
          listenToNonDelegatedEvent("invalid", instance);
          initInput(instance, props.value, props.defaultValue, props.checked, props.defaultChecked, props.type, props.name, true);
          break;
        case "select":
          listenToNonDelegatedEvent("invalid", instance);
          break;
        case "textarea":
          listenToNonDelegatedEvent("invalid", instance), initTextarea(instance, props.value, props.defaultValue, props.children);
      }
      type = props.children;
      typeof type !== "string" && typeof type !== "number" && typeof type !== "bigint" || instance.textContent === "" + type || props.suppressHydrationWarning === true || checkForUnmatchedText(instance.textContent, type) ? (props.popover != null && (listenToNonDelegatedEvent("beforetoggle", instance), listenToNonDelegatedEvent("toggle", instance)), props.onScroll != null && listenToNonDelegatedEvent("scroll", instance), props.onScrollEnd != null && listenToNonDelegatedEvent("scrollend", instance), props.onClick != null && (instance.onclick = noop$1), instance = true) : instance = false;
      instance || throwOnHydrationMismatch(fiber, true);
    }
    function popToNextHostParent(fiber) {
      for (hydrationParentFiber = fiber.return;hydrationParentFiber; )
        switch (hydrationParentFiber.tag) {
          case 5:
          case 31:
          case 13:
            rootOrSingletonContext = false;
            return;
          case 27:
          case 3:
            rootOrSingletonContext = true;
            return;
          default:
            hydrationParentFiber = hydrationParentFiber.return;
        }
    }
    function popHydrationState(fiber) {
      if (fiber !== hydrationParentFiber)
        return false;
      if (!isHydrating)
        return popToNextHostParent(fiber), isHydrating = true, false;
      var tag = fiber.tag, JSCompiler_temp;
      if (JSCompiler_temp = tag !== 3 && tag !== 27) {
        if (JSCompiler_temp = tag === 5)
          JSCompiler_temp = fiber.type, JSCompiler_temp = !(JSCompiler_temp !== "form" && JSCompiler_temp !== "button") || shouldSetTextContent(fiber.type, fiber.memoizedProps);
        JSCompiler_temp = !JSCompiler_temp;
      }
      JSCompiler_temp && nextHydratableInstance && throwOnHydrationMismatch(fiber);
      popToNextHostParent(fiber);
      if (tag === 13) {
        fiber = fiber.memoizedState;
        fiber = fiber !== null ? fiber.dehydrated : null;
        if (!fiber)
          throw Error(formatProdErrorMessage(317));
        nextHydratableInstance = getNextHydratableInstanceAfterHydrationBoundary(fiber);
      } else if (tag === 31) {
        fiber = fiber.memoizedState;
        fiber = fiber !== null ? fiber.dehydrated : null;
        if (!fiber)
          throw Error(formatProdErrorMessage(317));
        nextHydratableInstance = getNextHydratableInstanceAfterHydrationBoundary(fiber);
      } else
        tag === 27 ? (tag = nextHydratableInstance, isSingletonScope(fiber.type) ? (fiber = previousHydratableOnEnteringScopedSingleton, previousHydratableOnEnteringScopedSingleton = null, nextHydratableInstance = fiber) : nextHydratableInstance = tag) : nextHydratableInstance = hydrationParentFiber ? getNextHydratable(fiber.stateNode.nextSibling) : null;
      return true;
    }
    function resetHydrationState() {
      nextHydratableInstance = hydrationParentFiber = null;
      isHydrating = false;
    }
    function upgradeHydrationErrorsToRecoverable() {
      var queuedErrors = hydrationErrors;
      queuedErrors !== null && (workInProgressRootRecoverableErrors === null ? workInProgressRootRecoverableErrors = queuedErrors : workInProgressRootRecoverableErrors.push.apply(workInProgressRootRecoverableErrors, queuedErrors), hydrationErrors = null);
      return queuedErrors;
    }
    function queueHydrationError(error) {
      hydrationErrors === null ? hydrationErrors = [error] : hydrationErrors.push(error);
    }
    var valueCursor = createCursor(null);
    var currentlyRenderingFiber$1 = null;
    var lastContextDependency = null;
    function pushProvider(providerFiber, context, nextValue) {
      push(valueCursor, context._currentValue);
      context._currentValue = nextValue;
    }
    function popProvider(context) {
      context._currentValue = valueCursor.current;
      pop(valueCursor);
    }
    function scheduleContextWorkOnParentPath(parent, renderLanes, propagationRoot) {
      for (;parent !== null; ) {
        var alternate = parent.alternate;
        (parent.childLanes & renderLanes) !== renderLanes ? (parent.childLanes |= renderLanes, alternate !== null && (alternate.childLanes |= renderLanes)) : alternate !== null && (alternate.childLanes & renderLanes) !== renderLanes && (alternate.childLanes |= renderLanes);
        if (parent === propagationRoot)
          break;
        parent = parent.return;
      }
    }
    function propagateContextChanges(workInProgress, contexts, renderLanes, forcePropagateEntireTree) {
      var fiber = workInProgress.child;
      fiber !== null && (fiber.return = workInProgress);
      for (;fiber !== null; ) {
        var list = fiber.dependencies;
        if (list !== null) {
          var nextFiber = fiber.child;
          list = list.firstContext;
          a:
            for (;list !== null; ) {
              var dependency = list;
              list = fiber;
              for (var i = 0;i < contexts.length; i++)
                if (dependency.context === contexts[i]) {
                  list.lanes |= renderLanes;
                  dependency = list.alternate;
                  dependency !== null && (dependency.lanes |= renderLanes);
                  scheduleContextWorkOnParentPath(list.return, renderLanes, workInProgress);
                  forcePropagateEntireTree || (nextFiber = null);
                  break a;
                }
              list = dependency.next;
            }
        } else if (fiber.tag === 18) {
          nextFiber = fiber.return;
          if (nextFiber === null)
            throw Error(formatProdErrorMessage(341));
          nextFiber.lanes |= renderLanes;
          list = nextFiber.alternate;
          list !== null && (list.lanes |= renderLanes);
          scheduleContextWorkOnParentPath(nextFiber, renderLanes, workInProgress);
          nextFiber = null;
        } else
          fiber.tag === 13 && fiber.memoizedState !== null && fiber.memoizedState.dehydrated === null ? (fiber.lanes |= renderLanes, nextFiber = fiber.alternate, nextFiber !== null && (nextFiber.lanes |= renderLanes), scheduleContextWorkOnParentPath(fiber.return, renderLanes, workInProgress), nextFiber = fiber.child, nextFiber = nextFiber !== null ? nextFiber.sibling : null) : nextFiber = fiber.child;
        if (nextFiber !== null)
          nextFiber.return = fiber;
        else
          for (nextFiber = fiber;nextFiber !== null; ) {
            if (nextFiber === workInProgress) {
              nextFiber = null;
              break;
            }
            fiber = nextFiber.sibling;
            if (fiber !== null) {
              fiber.return = nextFiber.return;
              nextFiber = fiber;
              break;
            }
            nextFiber = nextFiber.return;
          }
        fiber = nextFiber;
      }
    }
    function propagateParentContextChanges(current, workInProgress, renderLanes, forcePropagateEntireTree) {
      current = null;
      for (var parent = workInProgress, isInsidePropagationBailout = false;parent !== null; ) {
        if (!isInsidePropagationBailout) {
          if ((parent.flags & 524288) !== 0)
            isInsidePropagationBailout = true;
          else if ((parent.flags & 262144) !== 0)
            break;
        }
        if (parent.tag === 10) {
          var currentParent = parent.alternate;
          if (currentParent === null)
            throw Error(formatProdErrorMessage(387));
          currentParent = currentParent.memoizedProps;
          if (currentParent !== null) {
            var context = parent.type;
            objectIs(parent.pendingProps.value, currentParent.value) || (current !== null ? current.push(context) : current = [context]);
          }
        } else if (parent === hostTransitionProviderCursor.current) {
          currentParent = parent.alternate;
          if (currentParent === null)
            throw Error(formatProdErrorMessage(387));
          currentParent.memoizedState.memoizedState !== parent.memoizedState.memoizedState && (current !== null ? current.push(HostTransitionContext) : current = [HostTransitionContext]);
        }
        parent = parent.return;
      }
      current !== null && propagateContextChanges(workInProgress, current, renderLanes, forcePropagateEntireTree);
      workInProgress.flags |= 262144;
      return current !== null;
    }
    function checkIfContextChanged(currentDependencies) {
      for (currentDependencies = currentDependencies.firstContext;currentDependencies !== null; ) {
        if (!objectIs(currentDependencies.context._currentValue, currentDependencies.memoizedValue))
          return true;
        currentDependencies = currentDependencies.next;
      }
      return false;
    }
    function prepareToReadContext(workInProgress) {
      currentlyRenderingFiber$1 = workInProgress;
      lastContextDependency = null;
      workInProgress = workInProgress.dependencies;
      workInProgress !== null && (workInProgress.firstContext = null);
    }
    function readContext(context) {
      return readContextForConsumer(currentlyRenderingFiber$1, context);
    }
    function readContextDuringReconciliation(consumer, context) {
      currentlyRenderingFiber$1 === null && prepareToReadContext(consumer);
      return readContextForConsumer(consumer, context);
    }
    function readContextForConsumer(consumer, context) {
      var value = context._currentValue;
      context = { context, memoizedValue: value, next: null };
      if (lastContextDependency === null) {
        if (consumer === null)
          throw Error(formatProdErrorMessage(308));
        lastContextDependency = context;
        consumer.dependencies = { lanes: 0, firstContext: context };
        consumer.flags |= 524288;
      } else
        lastContextDependency = lastContextDependency.next = context;
      return value;
    }
    var AbortControllerLocal = typeof AbortController !== "undefined" ? AbortController : function() {
      var listeners = [], signal = this.signal = {
        aborted: false,
        addEventListener: function(type, listener) {
          listeners.push(listener);
        }
      };
      this.abort = function() {
        signal.aborted = true;
        listeners.forEach(function(listener) {
          return listener();
        });
      };
    };
    var scheduleCallback$2 = Scheduler.unstable_scheduleCallback;
    var NormalPriority = Scheduler.unstable_NormalPriority;
    var CacheContext = {
      $$typeof: REACT_CONTEXT_TYPE,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0
    };
    function createCache() {
      return {
        controller: new AbortControllerLocal,
        data: new Map,
        refCount: 0
      };
    }
    function releaseCache(cache) {
      cache.refCount--;
      cache.refCount === 0 && scheduleCallback$2(NormalPriority, function() {
        cache.controller.abort();
      });
    }
    function queueTransitionTypes(root, transitionTypes) {
      if ((root.pendingLanes & 4194048) !== 0) {
        var queued = root.transitionTypes;
        queued === null && (queued = root.transitionTypes = []);
        for (root = 0;root < transitionTypes.length; root++) {
          var transitionType = transitionTypes[root];
          queued.indexOf(transitionType) === -1 && queued.push(transitionType);
        }
      }
    }
    var entangledTransitionTypes = null;
    function claimQueuedTransitionTypes(root) {
      var claimed = root.transitionTypes;
      root.transitionTypes = null;
      return claimed;
    }
    var currentEntangledListeners = null;
    var currentEntangledPendingCount = 0;
    var currentEntangledLane = 0;
    var currentEntangledActionThenable = null;
    function entangleAsyncAction(transition, thenable) {
      if (currentEntangledListeners === null) {
        var entangledListeners = currentEntangledListeners = [];
        currentEntangledPendingCount = 0;
        currentEntangledLane = requestTransitionLane();
        currentEntangledActionThenable = {
          status: "pending",
          value: undefined,
          then: function(resolve) {
            entangledListeners.push(resolve);
          }
        };
      }
      currentEntangledPendingCount++;
      thenable.then(pingEngtangledActionScope, pingEngtangledActionScope);
      return thenable;
    }
    function pingEngtangledActionScope() {
      if (--currentEntangledPendingCount === 0 && (entangledTransitionTypes = null, currentEntangledListeners !== null)) {
        currentEntangledActionThenable !== null && (currentEntangledActionThenable.status = "fulfilled");
        var listeners = currentEntangledListeners;
        currentEntangledListeners = null;
        currentEntangledLane = 0;
        currentEntangledActionThenable = null;
        for (var i = 0;i < listeners.length; i++)
          (0, listeners[i])();
      }
    }
    function chainThenableValue(thenable, result) {
      var listeners = [], thenableWithOverride = {
        status: "pending",
        value: null,
        reason: null,
        then: function(resolve) {
          listeners.push(resolve);
        }
      };
      thenable.then(function() {
        thenableWithOverride.status = "fulfilled";
        thenableWithOverride.value = result;
        for (var i = 0;i < listeners.length; i++)
          (0, listeners[i])(result);
      }, function(error) {
        thenableWithOverride.status = "rejected";
        thenableWithOverride.reason = error;
        for (error = 0;error < listeners.length; error++)
          (0, listeners[error])(undefined);
      });
      return thenableWithOverride;
    }
    var prevOnStartTransitionFinish = ReactSharedInternals.S;
    ReactSharedInternals.S = function(transition, returnValue) {
      globalMostRecentTransitionTime = now();
      typeof returnValue === "object" && returnValue !== null && typeof returnValue.then === "function" && entangleAsyncAction(transition, returnValue);
      if (entangledTransitionTypes !== null)
        for (var root$28 = firstScheduledRoot;root$28 !== null; )
          queueTransitionTypes(root$28, entangledTransitionTypes), root$28 = root$28.next;
      root$28 = transition.types;
      if (root$28 !== null) {
        for (var root$29 = firstScheduledRoot;root$29 !== null; )
          queueTransitionTypes(root$29, root$28), root$29 = root$29.next;
        if (currentEntangledLane !== 0) {
          root$29 = entangledTransitionTypes;
          root$29 === null && (root$29 = entangledTransitionTypes = []);
          for (var i = 0;i < root$28.length; i++) {
            var transitionType = root$28[i];
            root$29.indexOf(transitionType) === -1 && root$29.push(transitionType);
          }
        }
      }
      prevOnStartTransitionFinish !== null && prevOnStartTransitionFinish(transition, returnValue);
    };
    var resumedCache = createCursor(null);
    function peekCacheFromPool() {
      var cacheResumedFromPreviousRender = resumedCache.current;
      return cacheResumedFromPreviousRender !== null ? cacheResumedFromPreviousRender : workInProgressRoot.pooledCache;
    }
    function pushTransition(offscreenWorkInProgress, prevCachePool) {
      prevCachePool === null ? push(resumedCache, resumedCache.current) : push(resumedCache, prevCachePool.pool);
    }
    function getSuspendedCache() {
      var cacheFromPool = peekCacheFromPool();
      return cacheFromPool === null ? null : { parent: CacheContext._currentValue, pool: cacheFromPool };
    }
    var SuspenseException = Error(formatProdErrorMessage(460));
    var SuspenseyCommitException = Error(formatProdErrorMessage(474));
    var SuspenseActionException = Error(formatProdErrorMessage(542));
    var noopSuspenseyCommitThenable = { then: function() {} };
    function isThenableResolved(thenable) {
      thenable = thenable.status;
      return thenable === "fulfilled" || thenable === "rejected";
    }
    function trackUsedThenable(thenableState, thenable, index) {
      index = thenableState[index];
      index === undefined ? thenableState.push(thenable) : index !== thenable && (thenable.then(noop$1, noop$1), thenable = index);
      switch (thenable.status) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          thenableState = thenable.reason;
          checkIfUseWrappedInAsyncCatch(thenableState);
          if (thenableState === undefined && !("reason" in thenable))
            throw Error(formatProdErrorMessage(600));
          throw thenableState;
        default:
          if (typeof thenable.status === "string")
            thenable.then(noop$1, noop$1);
          else {
            thenableState = workInProgressRoot;
            if (thenableState !== null && 100 < thenableState.shellSuspendCounter)
              throw Error(formatProdErrorMessage(482));
            thenableState = thenable;
            thenableState.status = "pending";
            thenableState.then(function(fulfilledValue) {
              if (thenable.status === "pending") {
                var fulfilledThenable = thenable;
                fulfilledThenable.status = "fulfilled";
                fulfilledThenable.value = fulfilledValue;
              }
            }, function(error) {
              if (thenable.status === "pending") {
                var rejectedThenable = thenable;
                rejectedThenable.status = "rejected";
                rejectedThenable.reason = error;
              }
            });
          }
          switch (thenable.status) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw thenableState = thenable.reason, checkIfUseWrappedInAsyncCatch(thenableState), thenableState;
          }
          suspendedThenable = thenable;
          throw SuspenseException;
      }
    }
    function resolveLazy(lazyType) {
      try {
        var init = lazyType._init;
        return init(lazyType._payload);
      } catch (x) {
        if (x !== null && typeof x === "object" && typeof x.then === "function")
          throw suspendedThenable = x, SuspenseException;
        throw x;
      }
    }
    var suspendedThenable = null;
    function getSuspendedThenable() {
      if (suspendedThenable === null)
        throw Error(formatProdErrorMessage(459));
      var thenable = suspendedThenable;
      suspendedThenable = null;
      return thenable;
    }
    function checkIfUseWrappedInAsyncCatch(rejectedReason) {
      if (rejectedReason === SuspenseException || rejectedReason === SuspenseActionException)
        throw Error(formatProdErrorMessage(483));
    }
    var thenableState$1 = null;
    var thenableIndexCounter$1 = 0;
    function unwrapThenable(thenable) {
      var index = thenableIndexCounter$1;
      thenableIndexCounter$1 += 1;
      thenableState$1 === null && (thenableState$1 = []);
      return trackUsedThenable(thenableState$1, thenable, index);
    }
    function coerceRef(workInProgress, element) {
      element = element.props.ref;
      workInProgress.ref = element !== undefined ? element : null;
    }
    function throwOnInvalidObjectTypeImpl(returnFiber, newChild) {
      if (newChild.$$typeof === REACT_LEGACY_ELEMENT_TYPE)
        throw Error(formatProdErrorMessage(525));
      returnFiber = Object.prototype.toString.call(newChild);
      throw Error(formatProdErrorMessage(31, returnFiber === "[object Object]" ? "object with keys {" + Object.keys(newChild).join(", ") + "}" : returnFiber));
    }
    function createChildReconciler(shouldTrackSideEffects) {
      function deleteChild(returnFiber, childToDelete) {
        if (shouldTrackSideEffects) {
          var deletions = returnFiber.deletions;
          deletions === null ? (returnFiber.deletions = [childToDelete], returnFiber.flags |= 16) : deletions.push(childToDelete);
        }
      }
      function deleteRemainingChildren(returnFiber, currentFirstChild) {
        if (!shouldTrackSideEffects)
          return null;
        for (;currentFirstChild !== null; )
          deleteChild(returnFiber, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
        return null;
      }
      function mapRemainingChildren(currentFirstChild) {
        for (var existingChildren = new Map;currentFirstChild !== null; )
          currentFirstChild.key === null ? existingChildren.set(currentFirstChild.index, currentFirstChild) : existingChildren.set(currentFirstChild.key, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
        return existingChildren;
      }
      function useFiber(fiber, pendingProps) {
        fiber = createWorkInProgress(fiber, pendingProps);
        fiber.index = 0;
        fiber.sibling = null;
        return fiber;
      }
      function placeChild(newFiber, lastPlacedIndex, newIndex) {
        newFiber.index = newIndex;
        if (!shouldTrackSideEffects)
          return newFiber.flags |= 1048576, lastPlacedIndex;
        newIndex = newFiber.alternate;
        if (newIndex !== null)
          return newIndex = newIndex.index, newIndex < lastPlacedIndex ? (newFiber.flags |= 2, lastPlacedIndex) : newIndex;
        newFiber.flags |= 134217730;
        return lastPlacedIndex;
      }
      function placeSingleChild(newFiber) {
        shouldTrackSideEffects && newFiber.alternate === null && (newFiber.flags |= 134217730);
        return newFiber;
      }
      function updateTextNode(returnFiber, current, textContent, lanes) {
        if (current === null || current.tag !== 6)
          return current = createFiberFromText(textContent, returnFiber.mode, lanes), current.return = returnFiber, current;
        current = useFiber(current, textContent);
        current.return = returnFiber;
        return current;
      }
      function updateElement(returnFiber, current, element, lanes) {
        var elementType = element.type;
        if (elementType === REACT_FRAGMENT_TYPE)
          return returnFiber = updateFragment(returnFiber, current, element.props.children, lanes, element.key), coerceRef(returnFiber, element), returnFiber;
        if (current !== null && (current.elementType === elementType || typeof elementType === "object" && elementType !== null && elementType.$$typeof === REACT_LAZY_TYPE && resolveLazy(elementType) === current.type))
          return current = useFiber(current, element.props), coerceRef(current, element), current.return = returnFiber, current;
        current = createFiberFromTypeAndProps(element.type, element.key, element.props, null, returnFiber.mode, lanes);
        coerceRef(current, element);
        current.return = returnFiber;
        return current;
      }
      function updatePortal(returnFiber, current, portal, lanes) {
        if (current === null || current.tag !== 4 || current.stateNode.containerInfo !== portal.containerInfo || current.stateNode.implementation !== portal.implementation)
          return current = createFiberFromPortal(portal, returnFiber.mode, lanes), current.return = returnFiber, current;
        current = useFiber(current, portal.children || []);
        current.return = returnFiber;
        return current;
      }
      function updateFragment(returnFiber, current, fragment, lanes, key) {
        if (current === null || current.tag !== 7)
          return current = createFiberFromFragment(fragment, returnFiber.mode, lanes, key), current.return = returnFiber, current;
        current = useFiber(current, fragment);
        current.return = returnFiber;
        return current;
      }
      function createChild(returnFiber, newChild, lanes) {
        if (typeof newChild === "string" && newChild !== "" || typeof newChild === "number" || typeof newChild === "bigint")
          return newChild = createFiberFromText("" + newChild, returnFiber.mode, lanes), newChild.return = returnFiber, newChild;
        if (typeof newChild === "object" && newChild !== null) {
          switch (newChild.$$typeof) {
            case REACT_ELEMENT_TYPE:
              return lanes = createFiberFromTypeAndProps(newChild.type, newChild.key, newChild.props, null, returnFiber.mode, lanes), coerceRef(lanes, newChild), lanes.return = returnFiber, lanes;
            case REACT_PORTAL_TYPE:
              return newChild = createFiberFromPortal(newChild, returnFiber.mode, lanes), newChild.return = returnFiber, newChild;
            case REACT_LAZY_TYPE:
              return newChild = resolveLazy(newChild), createChild(returnFiber, newChild, lanes);
          }
          if (isArrayImpl(newChild) || getIteratorFn(newChild))
            return newChild = createFiberFromFragment(newChild, returnFiber.mode, lanes, null), newChild.return = returnFiber, newChild;
          if (typeof newChild.then === "function")
            return createChild(returnFiber, unwrapThenable(newChild), lanes);
          if (newChild.$$typeof === REACT_CONTEXT_TYPE)
            return createChild(returnFiber, readContextDuringReconciliation(returnFiber, newChild), lanes);
          throwOnInvalidObjectTypeImpl(returnFiber, newChild);
        }
        return null;
      }
      function updateSlot(returnFiber, oldFiber, newChild, lanes) {
        var key = oldFiber !== null ? oldFiber.key : null;
        if (typeof newChild === "string" && newChild !== "" || typeof newChild === "number" || typeof newChild === "bigint")
          return key !== null ? null : updateTextNode(returnFiber, oldFiber, "" + newChild, lanes);
        if (typeof newChild === "object" && newChild !== null) {
          switch (newChild.$$typeof) {
            case REACT_ELEMENT_TYPE:
              return newChild.key === key ? updateElement(returnFiber, oldFiber, newChild, lanes) : null;
            case REACT_PORTAL_TYPE:
              return newChild.key === key ? updatePortal(returnFiber, oldFiber, newChild, lanes) : null;
            case REACT_LAZY_TYPE:
              return newChild = resolveLazy(newChild), updateSlot(returnFiber, oldFiber, newChild, lanes);
          }
          if (isArrayImpl(newChild) || getIteratorFn(newChild))
            return key !== null ? null : updateFragment(returnFiber, oldFiber, newChild, lanes, null);
          if (typeof newChild.then === "function")
            return updateSlot(returnFiber, oldFiber, unwrapThenable(newChild), lanes);
          if (newChild.$$typeof === REACT_CONTEXT_TYPE)
            return updateSlot(returnFiber, oldFiber, readContextDuringReconciliation(returnFiber, newChild), lanes);
          throwOnInvalidObjectTypeImpl(returnFiber, newChild);
        }
        return null;
      }
      function updateFromMap(existingChildren, returnFiber, newIdx, newChild, lanes) {
        if (typeof newChild === "string" && newChild !== "" || typeof newChild === "number" || typeof newChild === "bigint")
          return existingChildren = existingChildren.get(newIdx) || null, updateTextNode(returnFiber, existingChildren, "" + newChild, lanes);
        if (typeof newChild === "object" && newChild !== null) {
          switch (newChild.$$typeof) {
            case REACT_ELEMENT_TYPE:
              return existingChildren = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null, updateElement(returnFiber, existingChildren, newChild, lanes);
            case REACT_PORTAL_TYPE:
              return existingChildren = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null, updatePortal(returnFiber, existingChildren, newChild, lanes);
            case REACT_LAZY_TYPE:
              return newChild = resolveLazy(newChild), updateFromMap(existingChildren, returnFiber, newIdx, newChild, lanes);
          }
          if (isArrayImpl(newChild) || getIteratorFn(newChild))
            return existingChildren = existingChildren.get(newIdx) || null, updateFragment(returnFiber, existingChildren, newChild, lanes, null);
          if (typeof newChild.then === "function")
            return updateFromMap(existingChildren, returnFiber, newIdx, unwrapThenable(newChild), lanes);
          if (newChild.$$typeof === REACT_CONTEXT_TYPE)
            return updateFromMap(existingChildren, returnFiber, newIdx, readContextDuringReconciliation(returnFiber, newChild), lanes);
          throwOnInvalidObjectTypeImpl(returnFiber, newChild);
        }
        return null;
      }
      function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, lanes) {
        for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null;oldFiber !== null && newIdx < newChildren.length; newIdx++) {
          oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
          var newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx], lanes);
          if (newFiber === null) {
            oldFiber === null && (oldFiber = nextOldFiber);
            break;
          }
          shouldTrackSideEffects && oldFiber && newFiber.alternate === null && deleteChild(returnFiber, oldFiber);
          currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
          previousNewFiber === null ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
          previousNewFiber = newFiber;
          oldFiber = nextOldFiber;
        }
        if (newIdx === newChildren.length)
          return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
        if (oldFiber === null) {
          for (;newIdx < newChildren.length; newIdx++)
            oldFiber = createChild(returnFiber, newChildren[newIdx], lanes), oldFiber !== null && (currentFirstChild = placeChild(oldFiber, currentFirstChild, newIdx), previousNewFiber === null ? resultingFirstChild = oldFiber : previousNewFiber.sibling = oldFiber, previousNewFiber = oldFiber);
          isHydrating && pushTreeFork(returnFiber, newIdx);
          return resultingFirstChild;
        }
        for (oldFiber = mapRemainingChildren(oldFiber);newIdx < newChildren.length; newIdx++)
          nextOldFiber = updateFromMap(oldFiber, returnFiber, newIdx, newChildren[newIdx], lanes), nextOldFiber !== null && (shouldTrackSideEffects && (newFiber = nextOldFiber.alternate, newFiber !== null && oldFiber.delete(newFiber.key === null ? newIdx : newFiber.key)), currentFirstChild = placeChild(nextOldFiber, currentFirstChild, newIdx), previousNewFiber === null ? resultingFirstChild = nextOldFiber : previousNewFiber.sibling = nextOldFiber, previousNewFiber = nextOldFiber);
        shouldTrackSideEffects && oldFiber.forEach(function(child) {
          return deleteChild(returnFiber, child);
        });
        isHydrating && pushTreeFork(returnFiber, newIdx);
        return resultingFirstChild;
      }
      function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildren, lanes) {
        if (newChildren == null)
          throw Error(formatProdErrorMessage(151));
        for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null, step = newChildren.next();oldFiber !== null && !step.done; newIdx++, step = newChildren.next()) {
          oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
          var newFiber = updateSlot(returnFiber, oldFiber, step.value, lanes);
          if (newFiber === null) {
            oldFiber === null && (oldFiber = nextOldFiber);
            break;
          }
          shouldTrackSideEffects && oldFiber && newFiber.alternate === null && deleteChild(returnFiber, oldFiber);
          currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
          previousNewFiber === null ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
          previousNewFiber = newFiber;
          oldFiber = nextOldFiber;
        }
        if (step.done)
          return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
        if (oldFiber === null) {
          for (;!step.done; newIdx++, step = newChildren.next())
            step = createChild(returnFiber, step.value, lanes), step !== null && (currentFirstChild = placeChild(step, currentFirstChild, newIdx), previousNewFiber === null ? resultingFirstChild = step : previousNewFiber.sibling = step, previousNewFiber = step);
          isHydrating && pushTreeFork(returnFiber, newIdx);
          return resultingFirstChild;
        }
        for (oldFiber = mapRemainingChildren(oldFiber);!step.done; newIdx++, step = newChildren.next())
          step = updateFromMap(oldFiber, returnFiber, newIdx, step.value, lanes), step !== null && (shouldTrackSideEffects && (nextOldFiber = step.alternate, nextOldFiber !== null && oldFiber.delete(nextOldFiber.key === null ? newIdx : nextOldFiber.key)), currentFirstChild = placeChild(step, currentFirstChild, newIdx), previousNewFiber === null ? resultingFirstChild = step : previousNewFiber.sibling = step, previousNewFiber = step);
        shouldTrackSideEffects && oldFiber.forEach(function(child) {
          return deleteChild(returnFiber, child);
        });
        isHydrating && pushTreeFork(returnFiber, newIdx);
        return resultingFirstChild;
      }
      function reconcileChildFibersImpl(returnFiber, currentFirstChild, newChild, lanes) {
        typeof newChild === "object" && newChild !== null && newChild.type === REACT_FRAGMENT_TYPE && newChild.key === null && newChild.props.ref === undefined && (newChild = newChild.props.children);
        if (typeof newChild === "object" && newChild !== null) {
          switch (newChild.$$typeof) {
            case REACT_ELEMENT_TYPE:
              a: {
                for (var key = newChild.key;currentFirstChild !== null; ) {
                  if (currentFirstChild.key === key) {
                    key = newChild.type;
                    if (key === REACT_FRAGMENT_TYPE) {
                      if (currentFirstChild.tag === 7) {
                        deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
                        lanes = useFiber(currentFirstChild, newChild.props.children);
                        coerceRef(lanes, newChild);
                        lanes.return = returnFiber;
                        returnFiber = lanes;
                        break a;
                      }
                    } else if (currentFirstChild.elementType === key || typeof key === "object" && key !== null && key.$$typeof === REACT_LAZY_TYPE && resolveLazy(key) === currentFirstChild.type) {
                      deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
                      lanes = useFiber(currentFirstChild, newChild.props);
                      coerceRef(lanes, newChild);
                      lanes.return = returnFiber;
                      returnFiber = lanes;
                      break a;
                    }
                    deleteRemainingChildren(returnFiber, currentFirstChild);
                    break;
                  } else
                    deleteChild(returnFiber, currentFirstChild);
                  currentFirstChild = currentFirstChild.sibling;
                }
                newChild.type === REACT_FRAGMENT_TYPE ? (lanes = createFiberFromFragment(newChild.props.children, returnFiber.mode, lanes, newChild.key), coerceRef(lanes, newChild), lanes.return = returnFiber, returnFiber = lanes) : (lanes = createFiberFromTypeAndProps(newChild.type, newChild.key, newChild.props, null, returnFiber.mode, lanes), coerceRef(lanes, newChild), lanes.return = returnFiber, returnFiber = lanes);
              }
              return placeSingleChild(returnFiber);
            case REACT_PORTAL_TYPE:
              a: {
                for (key = newChild.key;currentFirstChild !== null; ) {
                  if (currentFirstChild.key === key)
                    if (currentFirstChild.tag === 4 && currentFirstChild.stateNode.containerInfo === newChild.containerInfo && currentFirstChild.stateNode.implementation === newChild.implementation) {
                      deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
                      lanes = useFiber(currentFirstChild, newChild.children || []);
                      lanes.return = returnFiber;
                      returnFiber = lanes;
                      break a;
                    } else {
                      deleteRemainingChildren(returnFiber, currentFirstChild);
                      break;
                    }
                  else
                    deleteChild(returnFiber, currentFirstChild);
                  currentFirstChild = currentFirstChild.sibling;
                }
                lanes = createFiberFromPortal(newChild, returnFiber.mode, lanes);
                lanes.return = returnFiber;
                returnFiber = lanes;
              }
              return placeSingleChild(returnFiber);
            case REACT_LAZY_TYPE:
              return newChild = resolveLazy(newChild), reconcileChildFibersImpl(returnFiber, currentFirstChild, newChild, lanes);
          }
          if (isArrayImpl(newChild))
            return reconcileChildrenArray(returnFiber, currentFirstChild, newChild, lanes);
          if (getIteratorFn(newChild)) {
            key = getIteratorFn(newChild);
            if (typeof key !== "function")
              throw Error(formatProdErrorMessage(150));
            newChild = key.call(newChild);
            return reconcileChildrenIterator(returnFiber, currentFirstChild, newChild, lanes);
          }
          if (typeof newChild.then === "function")
            return reconcileChildFibersImpl(returnFiber, currentFirstChild, unwrapThenable(newChild), lanes);
          if (newChild.$$typeof === REACT_CONTEXT_TYPE)
            return reconcileChildFibersImpl(returnFiber, currentFirstChild, readContextDuringReconciliation(returnFiber, newChild), lanes);
          throwOnInvalidObjectTypeImpl(returnFiber, newChild);
        }
        return typeof newChild === "string" && newChild !== "" || typeof newChild === "number" || typeof newChild === "bigint" ? (newChild = "" + newChild, currentFirstChild !== null && currentFirstChild.tag === 6 ? (deleteRemainingChildren(returnFiber, currentFirstChild.sibling), lanes = useFiber(currentFirstChild, newChild), lanes.return = returnFiber, returnFiber = lanes) : (deleteRemainingChildren(returnFiber, currentFirstChild), lanes = createFiberFromText(newChild, returnFiber.mode, lanes), lanes.return = returnFiber, returnFiber = lanes), placeSingleChild(returnFiber)) : deleteRemainingChildren(returnFiber, currentFirstChild);
      }
      return function(returnFiber, currentFirstChild, newChild, lanes) {
        try {
          thenableIndexCounter$1 = 0;
          var firstChildFiber = reconcileChildFibersImpl(returnFiber, currentFirstChild, newChild, lanes);
          thenableState$1 = null;
          return firstChildFiber;
        } catch (x) {
          if (x === SuspenseException || x === SuspenseActionException)
            throw x;
          var fiber = createFiberImplClass(29, x, null, returnFiber.mode);
          fiber.lanes = lanes;
          fiber.return = returnFiber;
          return fiber;
        } finally {}
      };
    }
    var reconcileChildFibers = createChildReconciler(true);
    var mountChildFibers = createChildReconciler(false);
    var hasForceUpdate = false;
    function initializeUpdateQueue(fiber) {
      fiber.updateQueue = {
        baseState: fiber.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, lanes: 0, hiddenCallbacks: null },
        callbacks: null
      };
    }
    function cloneUpdateQueue(current, workInProgress) {
      current = current.updateQueue;
      workInProgress.updateQueue === current && (workInProgress.updateQueue = {
        baseState: current.baseState,
        firstBaseUpdate: current.firstBaseUpdate,
        lastBaseUpdate: current.lastBaseUpdate,
        shared: current.shared,
        callbacks: null
      });
    }
    function createUpdate(lane) {
      return { lane, tag: 0, payload: null, callback: null, next: null };
    }
    function enqueueUpdate(fiber, update, lane) {
      var updateQueue = fiber.updateQueue;
      if (updateQueue === null)
        return null;
      updateQueue = updateQueue.shared;
      if ((executionContext & 2) !== 0) {
        var pending = updateQueue.pending;
        pending === null ? update.next = update : (update.next = pending.next, pending.next = update);
        updateQueue.pending = update;
        update = getRootForUpdatedFiber(fiber);
        markUpdateLaneFromFiberToRoot(fiber, null, lane);
        return update;
      }
      enqueueUpdate$1(fiber, updateQueue, update, lane);
      return getRootForUpdatedFiber(fiber);
    }
    function entangleTransitions(root, fiber, lane) {
      fiber = fiber.updateQueue;
      if (fiber !== null && (fiber = fiber.shared, (lane & 4194048) !== 0)) {
        var queueLanes = fiber.lanes;
        queueLanes &= root.pendingLanes;
        lane |= queueLanes;
        fiber.lanes = lane;
        markRootEntangled(root, lane);
      }
    }
    function enqueueCapturedUpdate(workInProgress, capturedUpdate) {
      var queue = workInProgress.updateQueue, current = workInProgress.alternate;
      if (current !== null && (current = current.updateQueue, queue === current)) {
        var newFirst = null, newLast = null;
        queue = queue.firstBaseUpdate;
        if (queue !== null) {
          do {
            var clone = {
              lane: queue.lane,
              tag: queue.tag,
              payload: queue.payload,
              callback: null,
              next: null
            };
            newLast === null ? newFirst = newLast = clone : newLast = newLast.next = clone;
            queue = queue.next;
          } while (queue !== null);
          newLast === null ? newFirst = newLast = capturedUpdate : newLast = newLast.next = capturedUpdate;
        } else
          newFirst = newLast = capturedUpdate;
        queue = {
          baseState: current.baseState,
          firstBaseUpdate: newFirst,
          lastBaseUpdate: newLast,
          shared: current.shared,
          callbacks: current.callbacks
        };
        workInProgress.updateQueue = queue;
        return;
      }
      workInProgress = queue.lastBaseUpdate;
      workInProgress === null ? queue.firstBaseUpdate = capturedUpdate : workInProgress.next = capturedUpdate;
      queue.lastBaseUpdate = capturedUpdate;
    }
    var didReadFromEntangledAsyncAction = false;
    function suspendIfUpdateReadFromEntangledAsyncAction() {
      if (didReadFromEntangledAsyncAction) {
        var entangledActionThenable = currentEntangledActionThenable;
        if (entangledActionThenable !== null)
          throw entangledActionThenable;
      }
    }
    function processUpdateQueue(workInProgress$jscomp$0, props, instance$jscomp$0, renderLanes) {
      didReadFromEntangledAsyncAction = false;
      var queue = workInProgress$jscomp$0.updateQueue;
      hasForceUpdate = false;
      var { firstBaseUpdate, lastBaseUpdate } = queue, pendingQueue = queue.shared.pending;
      if (pendingQueue !== null) {
        queue.shared.pending = null;
        var lastPendingUpdate = pendingQueue, firstPendingUpdate = lastPendingUpdate.next;
        lastPendingUpdate.next = null;
        lastBaseUpdate === null ? firstBaseUpdate = firstPendingUpdate : lastBaseUpdate.next = firstPendingUpdate;
        lastBaseUpdate = lastPendingUpdate;
        var current = workInProgress$jscomp$0.alternate;
        current !== null && (current = current.updateQueue, pendingQueue = current.lastBaseUpdate, pendingQueue !== lastBaseUpdate && (pendingQueue === null ? current.firstBaseUpdate = firstPendingUpdate : pendingQueue.next = firstPendingUpdate, current.lastBaseUpdate = lastPendingUpdate));
      }
      if (firstBaseUpdate !== null) {
        var newState = queue.baseState;
        lastBaseUpdate = 0;
        current = firstPendingUpdate = lastPendingUpdate = null;
        pendingQueue = firstBaseUpdate;
        do {
          var updateLane = pendingQueue.lane & -536870913, isHiddenUpdate = updateLane !== pendingQueue.lane;
          if (isHiddenUpdate ? (workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes & updateLane) === updateLane) {
            updateLane !== 0 && updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction = true);
            current !== null && (current = current.next = {
              lane: 0,
              tag: pendingQueue.tag,
              payload: pendingQueue.payload,
              callback: null,
              next: null
            });
            a: {
              var workInProgress = workInProgress$jscomp$0, update = pendingQueue;
              updateLane = props;
              var instance = instance$jscomp$0;
              switch (update.tag) {
                case 1:
                  workInProgress = update.payload;
                  if (typeof workInProgress === "function") {
                    newState = workInProgress.call(instance, newState, updateLane);
                    break a;
                  }
                  newState = workInProgress;
                  break a;
                case 3:
                  workInProgress.flags = workInProgress.flags & -65537 | 128;
                case 0:
                  workInProgress = update.payload;
                  updateLane = typeof workInProgress === "function" ? workInProgress.call(instance, newState, updateLane) : workInProgress;
                  if (updateLane === null || updateLane === undefined)
                    break a;
                  newState = assign({}, newState, updateLane);
                  break a;
                case 2:
                  hasForceUpdate = true;
              }
            }
            updateLane = pendingQueue.callback;
            updateLane !== null && (workInProgress$jscomp$0.flags |= 64, isHiddenUpdate && (workInProgress$jscomp$0.flags |= 8192), isHiddenUpdate = queue.callbacks, isHiddenUpdate === null ? queue.callbacks = [updateLane] : isHiddenUpdate.push(updateLane));
          } else
            isHiddenUpdate = {
              lane: updateLane,
              tag: pendingQueue.tag,
              payload: pendingQueue.payload,
              callback: pendingQueue.callback,
              next: null
            }, current === null ? (firstPendingUpdate = current = isHiddenUpdate, lastPendingUpdate = newState) : current = current.next = isHiddenUpdate, lastBaseUpdate |= updateLane;
          pendingQueue = pendingQueue.next;
          if (pendingQueue === null)
            if (pendingQueue = queue.shared.pending, pendingQueue === null)
              break;
            else
              isHiddenUpdate = pendingQueue, pendingQueue = isHiddenUpdate.next, isHiddenUpdate.next = null, queue.lastBaseUpdate = isHiddenUpdate, queue.shared.pending = null;
        } while (1);
        current === null && (lastPendingUpdate = newState);
        queue.baseState = lastPendingUpdate;
        queue.firstBaseUpdate = firstPendingUpdate;
        queue.lastBaseUpdate = current;
        firstBaseUpdate === null && (queue.shared.lanes = 0);
        workInProgressRootSkippedLanes |= lastBaseUpdate;
        workInProgress$jscomp$0.lanes = lastBaseUpdate;
        workInProgress$jscomp$0.memoizedState = newState;
      }
    }
    function callCallback(callback, context) {
      if (typeof callback !== "function")
        throw Error(formatProdErrorMessage(191, callback));
      callback.call(context);
    }
    function commitCallbacks(updateQueue, context) {
      var callbacks = updateQueue.callbacks;
      if (callbacks !== null)
        for (updateQueue.callbacks = null, updateQueue = 0;updateQueue < callbacks.length; updateQueue++)
          callCallback(callbacks[updateQueue], context);
    }
    var currentTreeHiddenStackCursor = createCursor(null);
    var prevEntangledRenderLanesCursor = createCursor(0);
    function pushHiddenContext(fiber, context) {
      fiber = entangledRenderLanes;
      push(prevEntangledRenderLanesCursor, fiber);
      push(currentTreeHiddenStackCursor, context);
      entangledRenderLanes = fiber | context.baseLanes;
    }
    function reuseHiddenContextOnStack() {
      push(prevEntangledRenderLanesCursor, entangledRenderLanes);
      push(currentTreeHiddenStackCursor, currentTreeHiddenStackCursor.current);
    }
    function popHiddenContext() {
      entangledRenderLanes = prevEntangledRenderLanesCursor.current;
      pop(currentTreeHiddenStackCursor);
      pop(prevEntangledRenderLanesCursor);
    }
    var suspenseHandlerStackCursor = createCursor(null);
    var shellBoundary = null;
    function pushPrimaryTreeSuspenseHandler(handler) {
      var current = handler.alternate;
      push(suspenseStackCursor, suspenseStackCursor.current & 1);
      push(suspenseHandlerStackCursor, handler);
      shellBoundary === null && (current === null || currentTreeHiddenStackCursor.current !== null ? shellBoundary = handler : current.memoizedState !== null && (shellBoundary = handler));
    }
    function pushDehydratedActivitySuspenseHandler(fiber) {
      push(suspenseStackCursor, suspenseStackCursor.current);
      push(suspenseHandlerStackCursor, fiber);
      shellBoundary === null && (shellBoundary = fiber);
    }
    function pushOffscreenSuspenseHandler(fiber) {
      fiber.tag === 22 ? (push(suspenseStackCursor, suspenseStackCursor.current), push(suspenseHandlerStackCursor, fiber), shellBoundary === null && (shellBoundary = fiber)) : reuseSuspenseHandlerOnStack();
    }
    function reuseSuspenseHandlerOnStack() {
      push(suspenseStackCursor, suspenseStackCursor.current);
      push(suspenseHandlerStackCursor, suspenseHandlerStackCursor.current);
    }
    function popSuspenseHandler(fiber) {
      pop(suspenseHandlerStackCursor);
      shellBoundary === fiber && (shellBoundary = null);
      pop(suspenseStackCursor);
    }
    var suspenseStackCursor = createCursor(0);
    function pushSuspenseListContext(fiber, newContext) {
      push(suspenseHandlerStackCursor, suspenseHandlerStackCursor.current);
      push(suspenseStackCursor, newContext);
    }
    function popSuspenseListContext(fiber) {
      pop(suspenseStackCursor);
      pop(suspenseHandlerStackCursor);
      shellBoundary === fiber && (shellBoundary = null);
    }
    function findFirstSuspended(row) {
      for (var node = row;node !== null; ) {
        if (node.tag === 13) {
          var state = node.memoizedState;
          if (state !== null && (state = state.dehydrated, state === null || isSuspenseInstancePending(state) || isSuspenseInstanceFallback(state)))
            return node;
        } else if (node.tag === 19 && node.memoizedProps.revealOrder !== "independent") {
          if ((node.flags & 128) !== 0)
            return node;
        } else if (node.child !== null) {
          node.child.return = node;
          node = node.child;
          continue;
        }
        if (node === row)
          break;
        for (;node.sibling === null; ) {
          if (node.return === null || node.return === row)
            return null;
          node = node.return;
        }
        node.sibling.return = node.return;
        node = node.sibling;
      }
      return null;
    }
    var renderLanes = 0;
    var currentlyRenderingFiber = null;
    var currentHook = null;
    var workInProgressHook = null;
    var didScheduleRenderPhaseUpdate = false;
    var didScheduleRenderPhaseUpdateDuringThisPass = false;
    var shouldDoubleInvokeUserFnsInHooksDEV = false;
    var localIdCounter = 0;
    var thenableIndexCounter = 0;
    var thenableState = null;
    var globalClientIdCounter = 0;
    function throwInvalidHookError() {
      throw Error(formatProdErrorMessage(321));
    }
    function areHookInputsEqual(nextDeps, prevDeps) {
      if (prevDeps === null)
        return false;
      for (var i = 0;i < prevDeps.length && i < nextDeps.length; i++)
        if (!objectIs(nextDeps[i], prevDeps[i]))
          return false;
      return true;
    }
    function renderWithHooks(current, workInProgress, Component, props, secondArg, nextRenderLanes) {
      renderLanes = nextRenderLanes;
      currentlyRenderingFiber = workInProgress;
      workInProgress.memoizedState = null;
      workInProgress.updateQueue = null;
      workInProgress.lanes = 0;
      ReactSharedInternals.H = current === null || current.memoizedState === null ? HooksDispatcherOnMount : HooksDispatcherOnUpdate;
      shouldDoubleInvokeUserFnsInHooksDEV = false;
      nextRenderLanes = Component(props, secondArg);
      shouldDoubleInvokeUserFnsInHooksDEV = false;
      didScheduleRenderPhaseUpdateDuringThisPass && (nextRenderLanes = renderWithHooksAgain(workInProgress, Component, props, secondArg));
      finishRenderingHooks(current);
      return nextRenderLanes;
    }
    function finishRenderingHooks(current) {
      ReactSharedInternals.H = ContextOnlyDispatcher;
      var didRenderTooFewHooks = currentHook !== null && currentHook.next !== null;
      renderLanes = 0;
      workInProgressHook = currentHook = currentlyRenderingFiber = null;
      didScheduleRenderPhaseUpdate = false;
      thenableIndexCounter = 0;
      thenableState = null;
      if (didRenderTooFewHooks)
        throw Error(formatProdErrorMessage(300));
      current === null || didReceiveUpdate || (current = current.dependencies, current !== null && checkIfContextChanged(current) && (didReceiveUpdate = true));
    }
    function renderWithHooksAgain(workInProgress, Component, props, secondArg) {
      currentlyRenderingFiber = workInProgress;
      var numberOfReRenders = 0;
      do {
        didScheduleRenderPhaseUpdateDuringThisPass && (thenableState = null);
        thenableIndexCounter = 0;
        didScheduleRenderPhaseUpdateDuringThisPass = false;
        if (25 <= numberOfReRenders)
          throw Error(formatProdErrorMessage(301));
        numberOfReRenders += 1;
        workInProgressHook = currentHook = null;
        if (workInProgress.updateQueue != null) {
          var children = workInProgress.updateQueue;
          children.lastEffect = null;
          children.events = null;
          children.stores = null;
          children.memoCache != null && (children.memoCache.index = 0);
        }
        ReactSharedInternals.H = HooksDispatcherOnRerender;
        children = Component(props, secondArg);
      } while (didScheduleRenderPhaseUpdateDuringThisPass);
      return children;
    }
    function TransitionAwareHostComponent() {
      var dispatcher = ReactSharedInternals.H, maybeThenable = dispatcher.useState()[0];
      maybeThenable = typeof maybeThenable.then === "function" ? useThenable(maybeThenable) : maybeThenable;
      dispatcher = dispatcher.useState()[0];
      (currentHook !== null ? currentHook.memoizedState : null) !== dispatcher && (currentlyRenderingFiber.flags |= 1024);
      return maybeThenable;
    }
    function checkDidRenderIdHook() {
      var didRenderIdHook = localIdCounter !== 0;
      localIdCounter = 0;
      return didRenderIdHook;
    }
    function bailoutHooks(current, workInProgress, lanes) {
      workInProgress.updateQueue = current.updateQueue;
      workInProgress.flags &= -2053;
      current.lanes &= ~lanes;
    }
    function resetHooksOnUnwind(workInProgress) {
      if (didScheduleRenderPhaseUpdate) {
        for (workInProgress = workInProgress.memoizedState;workInProgress !== null; ) {
          var queue = workInProgress.queue;
          queue !== null && (queue.pending = null);
          workInProgress = workInProgress.next;
        }
        didScheduleRenderPhaseUpdate = false;
      }
      renderLanes = 0;
      workInProgressHook = currentHook = currentlyRenderingFiber = null;
      didScheduleRenderPhaseUpdateDuringThisPass = false;
      thenableIndexCounter = localIdCounter = 0;
      thenableState = null;
    }
    function mountWorkInProgressHook() {
      var hook = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      workInProgressHook === null ? currentlyRenderingFiber.memoizedState = workInProgressHook = hook : workInProgressHook = workInProgressHook.next = hook;
      return workInProgressHook;
    }
    function updateWorkInProgressHook() {
      if (currentHook === null) {
        var nextCurrentHook = currentlyRenderingFiber.alternate;
        nextCurrentHook = nextCurrentHook !== null ? nextCurrentHook.memoizedState : null;
      } else
        nextCurrentHook = currentHook.next;
      var nextWorkInProgressHook = workInProgressHook === null ? currentlyRenderingFiber.memoizedState : workInProgressHook.next;
      if (nextWorkInProgressHook !== null)
        workInProgressHook = nextWorkInProgressHook, currentHook = nextCurrentHook;
      else {
        if (nextCurrentHook === null) {
          if (currentlyRenderingFiber.alternate === null)
            throw Error(formatProdErrorMessage(467));
          throw Error(formatProdErrorMessage(310));
        }
        currentHook = nextCurrentHook;
        nextCurrentHook = {
          memoizedState: currentHook.memoizedState,
          baseState: currentHook.baseState,
          baseQueue: currentHook.baseQueue,
          queue: currentHook.queue,
          next: null
        };
        workInProgressHook === null ? currentlyRenderingFiber.memoizedState = workInProgressHook = nextCurrentHook : workInProgressHook = workInProgressHook.next = nextCurrentHook;
      }
      return workInProgressHook;
    }
    function createFunctionComponentUpdateQueue() {
      return { lastEffect: null, events: null, stores: null, memoCache: null };
    }
    function useThenable(thenable) {
      var index = thenableIndexCounter;
      thenableIndexCounter += 1;
      thenableState === null && (thenableState = []);
      thenable = trackUsedThenable(thenableState, thenable, index);
      index = currentlyRenderingFiber;
      (workInProgressHook === null ? index.memoizedState : workInProgressHook.next) === null && (index = index.alternate, ReactSharedInternals.H = index === null || index.memoizedState === null ? HooksDispatcherOnMount : HooksDispatcherOnUpdate);
      return thenable;
    }
    function use(usable) {
      if (usable !== null && typeof usable === "object") {
        if (typeof usable.then === "function")
          return useThenable(usable);
        if (usable.$$typeof === REACT_RECOVERABLE_TYPE)
          return;
        if (usable.$$typeof === REACT_CONTEXT_TYPE)
          return readContext(usable);
      }
      throw Error(formatProdErrorMessage(438, String(usable)));
    }
    function useMemoCache(size) {
      var memoCache = null, updateQueue = currentlyRenderingFiber.updateQueue;
      updateQueue !== null && (memoCache = updateQueue.memoCache);
      if (memoCache == null) {
        var current = currentlyRenderingFiber.alternate;
        current !== null && (current = current.updateQueue, current !== null && (current = current.memoCache, current != null && (memoCache = {
          data: current.data.map(function(array) {
            return array.slice();
          }),
          index: 0
        })));
      }
      memoCache == null && (memoCache = { data: [], index: 0 });
      updateQueue === null && (updateQueue = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = updateQueue);
      updateQueue.memoCache = memoCache;
      updateQueue = memoCache.data[memoCache.index];
      if (updateQueue === undefined)
        for (updateQueue = memoCache.data[memoCache.index] = Array(size), current = 0;current < size; current++)
          updateQueue[current] = REACT_MEMO_CACHE_SENTINEL;
      memoCache.index++;
      return updateQueue;
    }
    function basicStateReducer(state, action) {
      return typeof action === "function" ? action(state) : action;
    }
    function updateReducer(reducer) {
      var hook = updateWorkInProgressHook();
      return updateReducerImpl(hook, currentHook, reducer);
    }
    function updateReducerImpl(hook, current, reducer) {
      var queue = hook.queue;
      if (queue === null)
        throw Error(formatProdErrorMessage(311));
      queue.lastRenderedReducer = reducer;
      var baseQueue = hook.baseQueue, pendingQueue = queue.pending;
      if (pendingQueue !== null) {
        if (baseQueue !== null) {
          var baseFirst = baseQueue.next;
          baseQueue.next = pendingQueue.next;
          pendingQueue.next = baseFirst;
        }
        current.baseQueue = baseQueue = pendingQueue;
        queue.pending = null;
      }
      pendingQueue = hook.baseState;
      if (baseQueue === null)
        hook.memoizedState = pendingQueue;
      else {
        current = baseQueue.next;
        var newBaseQueueFirst = baseFirst = null, newBaseQueueLast = null, update = current, didReadFromEntangledAsyncAction$64 = false;
        do {
          var updateLane = update.lane & -536870913;
          if (updateLane !== update.lane ? (workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes & updateLane) === updateLane) {
            var revertLane = update.revertLane;
            if (revertLane === 0)
              newBaseQueueLast !== null && (newBaseQueueLast = newBaseQueueLast.next = {
                lane: 0,
                revertLane: 0,
                gesture: null,
                action: update.action,
                hasEagerState: update.hasEagerState,
                eagerState: update.eagerState,
                next: null
              }), updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction$64 = true);
            else if ((renderLanes & revertLane) === revertLane) {
              update = update.next;
              revertLane === currentEntangledLane && (didReadFromEntangledAsyncAction$64 = true);
              continue;
            } else
              updateLane = {
                lane: 0,
                revertLane: update.revertLane,
                gesture: null,
                action: update.action,
                hasEagerState: update.hasEagerState,
                eagerState: update.eagerState,
                next: null
              }, newBaseQueueLast === null ? (newBaseQueueFirst = newBaseQueueLast = updateLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = updateLane, currentlyRenderingFiber.lanes |= revertLane, workInProgressRootSkippedLanes |= revertLane;
            updateLane = update.action;
            shouldDoubleInvokeUserFnsInHooksDEV && reducer(pendingQueue, updateLane);
            pendingQueue = update.hasEagerState ? update.eagerState : reducer(pendingQueue, updateLane);
          } else
            revertLane = {
              lane: updateLane,
              revertLane: update.revertLane,
              gesture: update.gesture,
              action: update.action,
              hasEagerState: update.hasEagerState,
              eagerState: update.eagerState,
              next: null
            }, newBaseQueueLast === null ? (newBaseQueueFirst = newBaseQueueLast = revertLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = revertLane, currentlyRenderingFiber.lanes |= updateLane, workInProgressRootSkippedLanes |= updateLane;
          update = update.next;
        } while (update !== null && update !== current);
        newBaseQueueLast === null ? baseFirst = pendingQueue : newBaseQueueLast.next = newBaseQueueFirst;
        if (!objectIs(pendingQueue, hook.memoizedState) && (didReceiveUpdate = true, didReadFromEntangledAsyncAction$64 && (reducer = currentEntangledActionThenable, reducer !== null)))
          throw reducer;
        hook.memoizedState = pendingQueue;
        hook.baseState = baseFirst;
        hook.baseQueue = newBaseQueueLast;
        queue.lastRenderedState = pendingQueue;
      }
      baseQueue === null && (queue.lanes = 0);
      return [hook.memoizedState, queue.dispatch];
    }
    function rerenderReducer(reducer) {
      var hook = updateWorkInProgressHook(), queue = hook.queue;
      if (queue === null)
        throw Error(formatProdErrorMessage(311));
      queue.lastRenderedReducer = reducer;
      var { dispatch, pending: lastRenderPhaseUpdate } = queue, newState = hook.memoizedState;
      if (lastRenderPhaseUpdate !== null) {
        queue.pending = null;
        var update = lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
        do
          newState = reducer(newState, update.action), update = update.next;
        while (update !== lastRenderPhaseUpdate);
        objectIs(newState, hook.memoizedState) || (didReceiveUpdate = true);
        hook.memoizedState = newState;
        hook.baseQueue === null && (hook.baseState = newState);
        queue.lastRenderedState = newState;
      }
      return [newState, dispatch];
    }
    function updateSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
      var fiber = currentlyRenderingFiber, hook = updateWorkInProgressHook(), isHydrating$jscomp$0 = isHydrating;
      if (isHydrating$jscomp$0) {
        if (getServerSnapshot === undefined)
          throw Error(formatProdErrorMessage(407));
        getServerSnapshot = getServerSnapshot();
      } else
        getServerSnapshot = getSnapshot();
      var snapshotChanged = !objectIs((currentHook || hook).memoizedState, getServerSnapshot);
      snapshotChanged && (hook.memoizedState = getServerSnapshot, didReceiveUpdate = true);
      hook = hook.queue;
      updateEffect(subscribeToStore.bind(null, fiber, hook, subscribe), [
        subscribe
      ]);
      subscribe = hook.getSnapshot !== getSnapshot || snapshotChanged || workInProgressHook !== null && (workInProgressHook.memoizedState.tag & 1) !== 0;
      pushSimpleEffect(subscribe ? 9 : 8, { destroy: undefined }, updateStoreInstance.bind(null, fiber, hook, getServerSnapshot, getSnapshot), null);
      if (subscribe) {
        fiber.flags |= 2048;
        if (workInProgressRoot === null)
          throw Error(formatProdErrorMessage(349));
        isHydrating$jscomp$0 || (renderLanes & 127) !== 0 || pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
      }
      return getServerSnapshot;
    }
    function pushStoreConsistencyCheck(fiber, getSnapshot, renderedSnapshot) {
      fiber.flags |= 16384;
      fiber = { getSnapshot, value: renderedSnapshot };
      getSnapshot = currentlyRenderingFiber.updateQueue;
      getSnapshot === null ? (getSnapshot = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = getSnapshot, getSnapshot.stores = [fiber]) : (renderedSnapshot = getSnapshot.stores, renderedSnapshot === null ? getSnapshot.stores = [fiber] : renderedSnapshot.push(fiber));
    }
    function updateStoreInstance(fiber, inst, nextSnapshot, getSnapshot) {
      inst.value = nextSnapshot;
      inst.getSnapshot = getSnapshot;
      checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
    }
    function subscribeToStore(fiber, inst, subscribe) {
      return subscribe(function() {
        checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
      });
    }
    function checkIfSnapshotChanged(inst) {
      var latestGetSnapshot = inst.getSnapshot;
      inst = inst.value;
      try {
        var nextValue = latestGetSnapshot();
        return !objectIs(inst, nextValue);
      } catch (error) {
        return true;
      }
    }
    function forceStoreRerender(fiber) {
      var root = enqueueConcurrentRenderForLane(fiber, 2);
      root !== null && scheduleUpdateOnFiber(root, fiber, 2);
    }
    function mountStateImpl(initialState) {
      var hook = mountWorkInProgressHook();
      if (typeof initialState === "function") {
        var initialStateInitializer = initialState;
        initialState = initialStateInitializer();
        if (shouldDoubleInvokeUserFnsInHooksDEV) {
          setIsStrictModeForDevtools(true);
          try {
            initialStateInitializer();
          } finally {
            setIsStrictModeForDevtools(false);
          }
        }
      }
      hook.memoizedState = hook.baseState = initialState;
      hook.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: basicStateReducer,
        lastRenderedState: initialState
      };
      return hook;
    }
    function updateOptimisticImpl(hook, current, passthrough, reducer) {
      hook.baseState = passthrough;
      return updateReducerImpl(hook, currentHook, typeof reducer === "function" ? reducer : basicStateReducer);
    }
    function dispatchActionState(fiber, actionQueue, setPendingState, setState, payload) {
      if (isRenderPhaseUpdate(fiber))
        throw Error(formatProdErrorMessage(485));
      fiber = actionQueue.action;
      if (fiber !== null) {
        var actionNode = {
          payload,
          action: fiber,
          next: null,
          isTransition: true,
          status: "pending",
          value: null,
          reason: null,
          listeners: [],
          then: function(listener) {
            actionNode.listeners.push(listener);
          }
        };
        ReactSharedInternals.T !== null ? setPendingState(true) : actionNode.isTransition = false;
        setState(actionNode);
        setPendingState = actionQueue.pending;
        setPendingState === null ? (actionNode.next = actionQueue.pending = actionNode, runActionStateAction(actionQueue, actionNode)) : (actionNode.next = setPendingState.next, actionQueue.pending = setPendingState.next = actionNode);
      }
    }
    function runActionStateAction(actionQueue, node) {
      var { action, payload } = node, prevState = actionQueue.state;
      if (node.isTransition) {
        var prevTransition = ReactSharedInternals.T, currentTransition = {};
        currentTransition.types = prevTransition !== null ? prevTransition.types : null;
        ReactSharedInternals.T = currentTransition;
        try {
          var returnValue = action(prevState, payload), onStartTransitionFinish = ReactSharedInternals.S;
          onStartTransitionFinish !== null && onStartTransitionFinish(currentTransition, returnValue);
          handleActionReturnValue(actionQueue, node, returnValue);
        } catch (error) {
          onActionError(actionQueue, node, error);
        } finally {
          prevTransition !== null && currentTransition.types !== null && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
        }
      } else
        try {
          prevTransition = action(prevState, payload), handleActionReturnValue(actionQueue, node, prevTransition);
        } catch (error$70) {
          onActionError(actionQueue, node, error$70);
        }
    }
    function handleActionReturnValue(actionQueue, node, returnValue) {
      returnValue !== null && typeof returnValue === "object" && typeof returnValue.then === "function" ? returnValue.then(function(nextState) {
        onActionSuccess(actionQueue, node, nextState);
      }, function(error) {
        return onActionError(actionQueue, node, error);
      }) : onActionSuccess(actionQueue, node, returnValue);
    }
    function onActionSuccess(actionQueue, actionNode, nextState) {
      actionNode.status = "fulfilled";
      actionNode.value = nextState;
      notifyActionListeners(actionNode);
      actionQueue.state = nextState;
      actionNode = actionQueue.pending;
      actionNode !== null && (nextState = actionNode.next, nextState === actionNode ? actionQueue.pending = null : (nextState = nextState.next, actionNode.next = nextState, runActionStateAction(actionQueue, nextState)));
    }
    function onActionError(actionQueue, actionNode, error) {
      var last = actionQueue.pending;
      actionQueue.pending = null;
      if (last !== null) {
        last = last.next;
        do
          actionNode.status = "rejected", actionNode.reason = error, notifyActionListeners(actionNode), actionNode = actionNode.next;
        while (actionNode !== last);
      }
      actionQueue.action = null;
    }
    function notifyActionListeners(actionNode) {
      actionNode = actionNode.listeners;
      for (var i = 0;i < actionNode.length; i++)
        (0, actionNode[i])();
    }
    function actionStateReducer(oldState, newState) {
      return newState;
    }
    function mountActionState(action, initialStateProp) {
      if (isHydrating) {
        var ssrFormState = workInProgressRoot.formState;
        if (ssrFormState !== null) {
          a: {
            var JSCompiler_inline_result = currentlyRenderingFiber;
            if (isHydrating) {
              if (nextHydratableInstance) {
                b: {
                  var JSCompiler_inline_result$jscomp$0 = nextHydratableInstance;
                  for (var inRootOrSingleton = rootOrSingletonContext;JSCompiler_inline_result$jscomp$0.nodeType !== 8; ) {
                    if (!inRootOrSingleton) {
                      JSCompiler_inline_result$jscomp$0 = null;
                      break b;
                    }
                    JSCompiler_inline_result$jscomp$0 = getNextHydratable(JSCompiler_inline_result$jscomp$0.nextSibling);
                    if (JSCompiler_inline_result$jscomp$0 === null) {
                      JSCompiler_inline_result$jscomp$0 = null;
                      break b;
                    }
                  }
                  inRootOrSingleton = JSCompiler_inline_result$jscomp$0.data;
                  JSCompiler_inline_result$jscomp$0 = inRootOrSingleton === "F!" || inRootOrSingleton === "F" ? JSCompiler_inline_result$jscomp$0 : null;
                }
                if (JSCompiler_inline_result$jscomp$0) {
                  nextHydratableInstance = getNextHydratable(JSCompiler_inline_result$jscomp$0.nextSibling);
                  JSCompiler_inline_result = JSCompiler_inline_result$jscomp$0.data === "F!";
                  break a;
                }
              }
              throwOnHydrationMismatch(JSCompiler_inline_result);
            }
            JSCompiler_inline_result = false;
          }
          JSCompiler_inline_result && (initialStateProp = ssrFormState[0]);
        }
      }
      ssrFormState = mountWorkInProgressHook();
      ssrFormState.memoizedState = ssrFormState.baseState = initialStateProp;
      JSCompiler_inline_result = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: actionStateReducer,
        lastRenderedState: initialStateProp
      };
      ssrFormState.queue = JSCompiler_inline_result;
      ssrFormState = dispatchSetState.bind(null, currentlyRenderingFiber, JSCompiler_inline_result);
      JSCompiler_inline_result.dispatch = ssrFormState;
      JSCompiler_inline_result = mountStateImpl(false);
      inRootOrSingleton = dispatchOptimisticSetState.bind(null, currentlyRenderingFiber, false, JSCompiler_inline_result.queue);
      JSCompiler_inline_result = mountWorkInProgressHook();
      JSCompiler_inline_result$jscomp$0 = {
        state: initialStateProp,
        dispatch: null,
        action,
        pending: null
      };
      JSCompiler_inline_result.queue = JSCompiler_inline_result$jscomp$0;
      ssrFormState = dispatchActionState.bind(null, currentlyRenderingFiber, JSCompiler_inline_result$jscomp$0, inRootOrSingleton, ssrFormState);
      JSCompiler_inline_result$jscomp$0.dispatch = ssrFormState;
      JSCompiler_inline_result.memoizedState = action;
      return [initialStateProp, ssrFormState, false];
    }
    function updateActionState(action) {
      var stateHook = updateWorkInProgressHook();
      return updateActionStateImpl(stateHook, currentHook, action);
    }
    function updateActionStateImpl(stateHook, currentStateHook, action) {
      currentStateHook = updateReducerImpl(stateHook, currentStateHook, actionStateReducer)[0];
      stateHook = updateReducer(basicStateReducer)[0];
      if (typeof currentStateHook === "object" && currentStateHook !== null && typeof currentStateHook.then === "function")
        try {
          var state = useThenable(currentStateHook);
        } catch (x) {
          if (x === SuspenseException)
            throw SuspenseActionException;
          throw x;
        }
      else
        state = currentStateHook;
      currentStateHook = updateWorkInProgressHook();
      var actionQueue = currentStateHook.queue, dispatch = actionQueue.dispatch;
      action !== currentStateHook.memoizedState && (currentlyRenderingFiber.flags |= 2048, pushSimpleEffect(9, { destroy: undefined }, actionStateActionEffect.bind(null, actionQueue, action), null));
      return [state, dispatch, stateHook];
    }
    function actionStateActionEffect(actionQueue, action) {
      actionQueue.action = action;
    }
    function rerenderActionState(action) {
      var stateHook = updateWorkInProgressHook(), currentStateHook = currentHook;
      if (currentStateHook !== null)
        return updateActionStateImpl(stateHook, currentStateHook, action);
      updateWorkInProgressHook();
      stateHook = stateHook.memoizedState;
      currentStateHook = updateWorkInProgressHook();
      var dispatch = currentStateHook.queue.dispatch;
      currentStateHook.memoizedState = action;
      return [stateHook, dispatch, false];
    }
    function pushSimpleEffect(tag, inst, create, deps) {
      tag = { tag, create, deps, inst, next: null };
      inst = currentlyRenderingFiber.updateQueue;
      inst === null && (inst = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = inst);
      create = inst.lastEffect;
      create === null ? inst.lastEffect = tag.next = tag : (deps = create.next, create.next = tag, tag.next = deps, inst.lastEffect = tag);
      return tag;
    }
    function updateRef() {
      return updateWorkInProgressHook().memoizedState;
    }
    function mountEffectImpl(fiberFlags, hookFlags, create, deps) {
      var hook = mountWorkInProgressHook();
      currentlyRenderingFiber.flags |= fiberFlags;
      hook.memoizedState = pushSimpleEffect(1 | hookFlags, { destroy: undefined }, create, deps === undefined ? null : deps);
    }
    function updateEffectImpl(fiberFlags, hookFlags, create, deps) {
      var hook = updateWorkInProgressHook();
      deps = deps === undefined ? null : deps;
      var inst = hook.memoizedState.inst;
      currentHook !== null && deps !== null && areHookInputsEqual(deps, currentHook.memoizedState.deps) ? hook.memoizedState = pushSimpleEffect(hookFlags, inst, create, deps) : (currentlyRenderingFiber.flags |= fiberFlags, hook.memoizedState = pushSimpleEffect(1 | hookFlags, inst, create, deps));
    }
    function mountEffect(create, deps) {
      mountEffectImpl(8390656, 8, create, deps);
    }
    function updateEffect(create, deps) {
      updateEffectImpl(2048, 8, create, deps);
    }
    function useEffectEventImpl(payload) {
      currentlyRenderingFiber.flags |= 4;
      var componentUpdateQueue = currentlyRenderingFiber.updateQueue;
      if (componentUpdateQueue === null)
        componentUpdateQueue = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = componentUpdateQueue, componentUpdateQueue.events = [payload];
      else {
        var events = componentUpdateQueue.events;
        events === null ? componentUpdateQueue.events = [payload] : events.push(payload);
      }
    }
    function updateEvent(callback) {
      var ref = updateWorkInProgressHook().memoizedState;
      useEffectEventImpl({ ref, nextImpl: callback });
      return function() {
        if ((executionContext & 2) !== 0)
          throw Error(formatProdErrorMessage(440));
        return ref.impl.apply(undefined, arguments);
      };
    }
    function updateInsertionEffect(create, deps) {
      return updateEffectImpl(4, 2, create, deps);
    }
    function updateLayoutEffect(create, deps) {
      return updateEffectImpl(4, 4, create, deps);
    }
    function imperativeHandleEffect(create, ref) {
      if (typeof ref === "function") {
        create = create();
        var refCleanup = ref(create);
        return function() {
          typeof refCleanup === "function" ? refCleanup() : ref(null);
        };
      }
      if (ref !== null && ref !== undefined)
        return create = create(), ref.current = create, function() {
          ref.current = null;
        };
    }
    function updateImperativeHandle(ref, create, deps) {
      deps = deps !== null && deps !== undefined ? deps.concat([ref]) : null;
      updateEffectImpl(4, 4, imperativeHandleEffect.bind(null, create, ref), deps);
    }
    function mountDebugValue() {}
    function updateCallback(callback, deps) {
      var hook = updateWorkInProgressHook();
      deps = deps === undefined ? null : deps;
      var prevState = hook.memoizedState;
      if (deps !== null && areHookInputsEqual(deps, prevState[1]))
        return prevState[0];
      hook.memoizedState = [callback, deps];
      return callback;
    }
    function updateMemo(nextCreate, deps) {
      var hook = updateWorkInProgressHook();
      deps = deps === undefined ? null : deps;
      var prevState = hook.memoizedState;
      if (deps !== null && areHookInputsEqual(deps, prevState[1]))
        return prevState[0];
      prevState = nextCreate();
      if (shouldDoubleInvokeUserFnsInHooksDEV) {
        setIsStrictModeForDevtools(true);
        try {
          nextCreate();
        } finally {
          setIsStrictModeForDevtools(false);
        }
      }
      hook.memoizedState = [prevState, deps];
      return prevState;
    }
    function mountDeferredValueImpl(hook, value, initialValue) {
      if (initialValue === undefined || (renderLanes & 1073741824) !== 0 && (workInProgressRootRenderLanes & 261930) === 0)
        return hook.memoizedState = value;
      hook.memoizedState = initialValue;
      hook = requestDeferredLane();
      currentlyRenderingFiber.lanes |= hook;
      workInProgressRootSkippedLanes |= hook;
      return initialValue;
    }
    function updateDeferredValueImpl(hook, prevValue, value, initialValue) {
      if (objectIs(value, prevValue))
        return value;
      if (currentTreeHiddenStackCursor.current !== null)
        return hook = mountDeferredValueImpl(hook, value, initialValue), objectIs(hook, prevValue) || (didReceiveUpdate = true), hook;
      if ((renderLanes & 106) === 0 || (renderLanes & 1073741824) !== 0 && (workInProgressRootRenderLanes & 261930) === 0)
        return didReceiveUpdate = true, hook.memoizedState = value;
      hook = requestDeferredLane();
      currentlyRenderingFiber.lanes |= hook;
      workInProgressRootSkippedLanes |= hook;
      return prevValue;
    }
    function startTransition(fiber, queue, pendingState, finishedState, callback) {
      var previousPriority = ReactDOMSharedInternals.p;
      ReactDOMSharedInternals.p = previousPriority !== 0 && 8 > previousPriority ? previousPriority : 8;
      var prevTransition = ReactSharedInternals.T, currentTransition = {};
      currentTransition.types = prevTransition !== null ? prevTransition.types : null;
      ReactSharedInternals.T = currentTransition;
      dispatchOptimisticSetState(fiber, false, queue, pendingState);
      try {
        var returnValue = callback(), onStartTransitionFinish = ReactSharedInternals.S;
        onStartTransitionFinish !== null && onStartTransitionFinish(currentTransition, returnValue);
        if (returnValue !== null && typeof returnValue === "object" && typeof returnValue.then === "function") {
          var thenableForFinishedState = chainThenableValue(returnValue, finishedState);
          dispatchSetStateInternal(fiber, queue, thenableForFinishedState, requestUpdateLane(fiber));
        } else
          dispatchSetStateInternal(fiber, queue, finishedState, requestUpdateLane(fiber));
      } catch (error) {
        dispatchSetStateInternal(fiber, queue, { then: function() {}, status: "rejected", reason: error }, requestUpdateLane());
      } finally {
        ReactDOMSharedInternals.p = previousPriority, prevTransition !== null && currentTransition.types !== null && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
      }
    }
    function noop() {}
    function startHostTransition(formFiber, pendingState, action, formData) {
      if (formFiber.tag !== 5)
        throw Error(formatProdErrorMessage(476));
      var queue = ensureFormComponentIsStateful(formFiber).queue;
      startTransition(formFiber, queue, pendingState, sharedNotPendingObject, action === null ? noop : function() {
        requestFormReset$1(formFiber);
        return action(formData);
      });
    }
    function ensureFormComponentIsStateful(formFiber) {
      var existingStateHook = formFiber.memoizedState;
      if (existingStateHook !== null)
        return existingStateHook;
      existingStateHook = {
        memoizedState: sharedNotPendingObject,
        baseState: sharedNotPendingObject,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: basicStateReducer,
          lastRenderedState: sharedNotPendingObject
        },
        next: null
      };
      var initialResetState = {};
      existingStateHook.next = {
        memoizedState: initialResetState,
        baseState: initialResetState,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: basicStateReducer,
          lastRenderedState: initialResetState
        },
        next: null
      };
      formFiber.memoizedState = existingStateHook;
      formFiber = formFiber.alternate;
      formFiber !== null && (formFiber.memoizedState = existingStateHook);
      return existingStateHook;
    }
    function requestFormReset$1(formFiber) {
      var stateHook = ensureFormComponentIsStateful(formFiber);
      stateHook.next === null && (stateHook = formFiber.alternate.memoizedState);
      dispatchSetStateInternal(formFiber, stateHook.next.queue, {}, requestUpdateLane());
    }
    function useHostTransitionStatus() {
      return readContext(HostTransitionContext);
    }
    function updateId() {
      return updateWorkInProgressHook().memoizedState;
    }
    function updateRefresh() {
      return updateWorkInProgressHook().memoizedState;
    }
    function refreshCache(fiber) {
      for (var provider = fiber.return;provider !== null; ) {
        switch (provider.tag) {
          case 24:
          case 3:
            var lane = requestUpdateLane();
            fiber = createUpdate(lane);
            var root$73 = enqueueUpdate(provider, fiber, lane);
            root$73 !== null && (scheduleUpdateOnFiber(root$73, provider, lane), entangleTransitions(root$73, provider, lane));
            provider = { cache: createCache() };
            fiber.payload = provider;
            return;
        }
        provider = provider.return;
      }
    }
    function dispatchReducerAction(fiber, queue, action) {
      var lane = requestUpdateLane();
      action = {
        lane,
        revertLane: 0,
        gesture: null,
        action,
        hasEagerState: false,
        eagerState: null,
        next: null
      };
      isRenderPhaseUpdate(fiber) ? enqueueRenderPhaseUpdate(queue, action) : (action = enqueueConcurrentHookUpdate(fiber, queue, action, lane), action !== null && (scheduleUpdateOnFiber(action, fiber, lane), entangleTransitionUpdate(action, queue, lane)));
    }
    function dispatchSetState(fiber, queue, action) {
      var lane = requestUpdateLane();
      dispatchSetStateInternal(fiber, queue, action, lane);
    }
    function dispatchSetStateInternal(fiber, queue, action, lane) {
      var update = {
        lane,
        revertLane: 0,
        gesture: null,
        action,
        hasEagerState: false,
        eagerState: null,
        next: null
      };
      if (isRenderPhaseUpdate(fiber))
        enqueueRenderPhaseUpdate(queue, update);
      else {
        var alternate = fiber.alternate;
        if (fiber.lanes === 0 && (alternate === null || alternate.lanes === 0) && (alternate = queue.lastRenderedReducer, alternate !== null))
          try {
            var currentState = queue.lastRenderedState, eagerState = alternate(currentState, action);
            update.hasEagerState = true;
            update.eagerState = eagerState;
            if (objectIs(eagerState, currentState))
              return enqueueUpdate$1(fiber, queue, update, 0), workInProgressRoot === null && finishQueueingConcurrentUpdates(), false;
          } catch (error) {} finally {}
        action = enqueueConcurrentHookUpdate(fiber, queue, update, lane);
        if (action !== null)
          return scheduleUpdateOnFiber(action, fiber, lane), entangleTransitionUpdate(action, queue, lane), true;
      }
      return false;
    }
    function dispatchOptimisticSetState(fiber, throwIfDuringRender, queue, action) {
      action = {
        lane: 2,
        revertLane: requestTransitionLane(),
        gesture: null,
        action,
        hasEagerState: false,
        eagerState: null,
        next: null
      };
      if (isRenderPhaseUpdate(fiber)) {
        if (throwIfDuringRender)
          throw Error(formatProdErrorMessage(479));
      } else
        throwIfDuringRender = enqueueConcurrentHookUpdate(fiber, queue, action, 2), throwIfDuringRender !== null && scheduleUpdateOnFiber(throwIfDuringRender, fiber, 2);
    }
    function isRenderPhaseUpdate(fiber) {
      var alternate = fiber.alternate;
      return fiber === currentlyRenderingFiber || alternate !== null && alternate === currentlyRenderingFiber;
    }
    function enqueueRenderPhaseUpdate(queue, update) {
      didScheduleRenderPhaseUpdateDuringThisPass = didScheduleRenderPhaseUpdate = true;
      var pending = queue.pending;
      pending === null ? update.next = update : (update.next = pending.next, pending.next = update);
      queue.pending = update;
    }
    function entangleTransitionUpdate(root, queue, lane) {
      if ((lane & 4194048) !== 0) {
        var queueLanes = queue.lanes;
        queueLanes &= root.pendingLanes;
        lane |= queueLanes;
        queue.lanes = lane;
        markRootEntangled(root, lane);
      }
    }
    var ContextOnlyDispatcher = {
      readContext,
      use,
      useCallback: throwInvalidHookError,
      useContext: throwInvalidHookError,
      useEffect: throwInvalidHookError,
      useImperativeHandle: throwInvalidHookError,
      useLayoutEffect: throwInvalidHookError,
      useInsertionEffect: throwInvalidHookError,
      useMemo: throwInvalidHookError,
      useReducer: throwInvalidHookError,
      useRef: throwInvalidHookError,
      useState: throwInvalidHookError,
      useDebugValue: throwInvalidHookError,
      useDeferredValue: throwInvalidHookError,
      useTransition: throwInvalidHookError,
      useSyncExternalStore: throwInvalidHookError,
      useId: throwInvalidHookError,
      useHostTransitionStatus: throwInvalidHookError,
      useFormState: throwInvalidHookError,
      useActionState: throwInvalidHookError,
      useOptimistic: throwInvalidHookError,
      useMemoCache: throwInvalidHookError,
      useCacheRefresh: throwInvalidHookError,
      useEffectEvent: throwInvalidHookError
    };
    var HooksDispatcherOnMount = {
      readContext,
      use,
      useCallback: function(callback, deps) {
        mountWorkInProgressHook().memoizedState = [
          callback,
          deps === undefined ? null : deps
        ];
        return callback;
      },
      useContext: readContext,
      useEffect: mountEffect,
      useImperativeHandle: function(ref, create, deps) {
        deps = deps !== null && deps !== undefined ? deps.concat([ref]) : null;
        mountEffectImpl(4194308, 4, imperativeHandleEffect.bind(null, create, ref), deps);
      },
      useLayoutEffect: function(create, deps) {
        return mountEffectImpl(4194308, 4, create, deps);
      },
      useInsertionEffect: function(create, deps) {
        mountEffectImpl(4, 2, create, deps);
      },
      useMemo: function(nextCreate, deps) {
        var hook = mountWorkInProgressHook();
        deps = deps === undefined ? null : deps;
        var nextValue = nextCreate();
        if (shouldDoubleInvokeUserFnsInHooksDEV) {
          setIsStrictModeForDevtools(true);
          try {
            nextCreate();
          } finally {
            setIsStrictModeForDevtools(false);
          }
        }
        hook.memoizedState = [nextValue, deps];
        return nextValue;
      },
      useReducer: function(reducer, initialArg, init) {
        var hook = mountWorkInProgressHook();
        if (init !== undefined) {
          var initialState = init(initialArg);
          if (shouldDoubleInvokeUserFnsInHooksDEV) {
            setIsStrictModeForDevtools(true);
            try {
              init(initialArg);
            } finally {
              setIsStrictModeForDevtools(false);
            }
          }
        } else
          initialState = initialArg;
        hook.memoizedState = hook.baseState = initialState;
        reducer = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: reducer,
          lastRenderedState: initialState
        };
        hook.queue = reducer;
        reducer = reducer.dispatch = dispatchReducerAction.bind(null, currentlyRenderingFiber, reducer);
        return [hook.memoizedState, reducer];
      },
      useRef: function(initialValue) {
        var hook = mountWorkInProgressHook();
        initialValue = { current: initialValue };
        return hook.memoizedState = initialValue;
      },
      useState: function(initialState) {
        initialState = mountStateImpl(initialState);
        var queue = initialState.queue, dispatch = dispatchSetState.bind(null, currentlyRenderingFiber, queue);
        queue.dispatch = dispatch;
        return [initialState.memoizedState, dispatch];
      },
      useDebugValue: mountDebugValue,
      useDeferredValue: function(value, initialValue) {
        var hook = mountWorkInProgressHook();
        return mountDeferredValueImpl(hook, value, initialValue);
      },
      useTransition: function() {
        var stateHook = mountStateImpl(false);
        stateHook = startTransition.bind(null, currentlyRenderingFiber, stateHook.queue, true, false);
        mountWorkInProgressHook().memoizedState = stateHook;
        return [false, stateHook];
      },
      useSyncExternalStore: function(subscribe, getSnapshot, getServerSnapshot) {
        var fiber = currentlyRenderingFiber, hook = mountWorkInProgressHook();
        if (isHydrating) {
          if (getServerSnapshot === undefined)
            throw Error(formatProdErrorMessage(407));
          getServerSnapshot = getServerSnapshot();
        } else {
          getServerSnapshot = getSnapshot();
          if (workInProgressRoot === null)
            throw Error(formatProdErrorMessage(349));
          (workInProgressRootRenderLanes & 127) !== 0 || pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
        }
        hook.memoizedState = getServerSnapshot;
        var inst = { value: getServerSnapshot, getSnapshot };
        hook.queue = inst;
        mountEffect(subscribeToStore.bind(null, fiber, inst, subscribe), [
          subscribe
        ]);
        fiber.flags |= 2048;
        pushSimpleEffect(9, { destroy: undefined }, updateStoreInstance.bind(null, fiber, inst, getServerSnapshot, getSnapshot), null);
        return getServerSnapshot;
      },
      useId: function() {
        var hook = mountWorkInProgressHook(), identifierPrefix = workInProgressRoot.identifierPrefix;
        if (isHydrating) {
          var JSCompiler_inline_result = treeContextOverflow;
          var idWithLeadingBit = treeContextId;
          JSCompiler_inline_result = (idWithLeadingBit & ~(1 << 32 - clz32(idWithLeadingBit) - 1)).toString(32) + JSCompiler_inline_result;
          identifierPrefix = "_" + identifierPrefix + "R_" + JSCompiler_inline_result;
          JSCompiler_inline_result = localIdCounter++;
          0 < JSCompiler_inline_result && (identifierPrefix += "H" + JSCompiler_inline_result.toString(32));
          identifierPrefix += "_";
        } else
          JSCompiler_inline_result = globalClientIdCounter++, identifierPrefix = "_" + identifierPrefix + "r_" + JSCompiler_inline_result.toString(32) + "_";
        return hook.memoizedState = identifierPrefix;
      },
      useHostTransitionStatus,
      useFormState: mountActionState,
      useActionState: mountActionState,
      useOptimistic: function(passthrough) {
        var hook = mountWorkInProgressHook();
        hook.memoizedState = hook.baseState = passthrough;
        var queue = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null
        };
        hook.queue = queue;
        hook = dispatchOptimisticSetState.bind(null, currentlyRenderingFiber, true, queue);
        queue.dispatch = hook;
        return [passthrough, hook];
      },
      useMemoCache,
      useCacheRefresh: function() {
        return mountWorkInProgressHook().memoizedState = refreshCache.bind(null, currentlyRenderingFiber);
      },
      useEffectEvent: function(callback) {
        var hook = mountWorkInProgressHook(), ref = { impl: callback };
        hook.memoizedState = ref;
        return function() {
          if ((executionContext & 2) !== 0)
            throw Error(formatProdErrorMessage(440));
          return ref.impl.apply(undefined, arguments);
        };
      }
    };
    var HooksDispatcherOnUpdate = {
      readContext,
      use,
      useCallback: updateCallback,
      useContext: readContext,
      useEffect: updateEffect,
      useImperativeHandle: updateImperativeHandle,
      useInsertionEffect: updateInsertionEffect,
      useLayoutEffect: updateLayoutEffect,
      useMemo: updateMemo,
      useReducer: updateReducer,
      useRef: updateRef,
      useState: function() {
        return updateReducer(basicStateReducer);
      },
      useDebugValue: mountDebugValue,
      useDeferredValue: function(value, initialValue) {
        var hook = updateWorkInProgressHook();
        return updateDeferredValueImpl(hook, currentHook.memoizedState, value, initialValue);
      },
      useTransition: function() {
        var booleanOrThenable = updateReducer(basicStateReducer)[0], start = updateWorkInProgressHook().memoizedState;
        return [
          typeof booleanOrThenable === "boolean" ? booleanOrThenable : useThenable(booleanOrThenable),
          start
        ];
      },
      useSyncExternalStore: updateSyncExternalStore,
      useId: updateId,
      useHostTransitionStatus,
      useFormState: updateActionState,
      useActionState: updateActionState,
      useOptimistic: function(passthrough, reducer) {
        var hook = updateWorkInProgressHook();
        return updateOptimisticImpl(hook, currentHook, passthrough, reducer);
      },
      useMemoCache,
      useCacheRefresh: updateRefresh,
      useEffectEvent: updateEvent
    };
    var HooksDispatcherOnRerender = {
      readContext,
      use,
      useCallback: updateCallback,
      useContext: readContext,
      useEffect: updateEffect,
      useImperativeHandle: updateImperativeHandle,
      useInsertionEffect: updateInsertionEffect,
      useLayoutEffect: updateLayoutEffect,
      useMemo: updateMemo,
      useReducer: rerenderReducer,
      useRef: updateRef,
      useState: function() {
        return rerenderReducer(basicStateReducer);
      },
      useDebugValue: mountDebugValue,
      useDeferredValue: function(value, initialValue) {
        var hook = updateWorkInProgressHook();
        return currentHook === null ? mountDeferredValueImpl(hook, value, initialValue) : updateDeferredValueImpl(hook, currentHook.memoizedState, value, initialValue);
      },
      useTransition: function() {
        var booleanOrThenable = rerenderReducer(basicStateReducer)[0], start = updateWorkInProgressHook().memoizedState;
        return [
          typeof booleanOrThenable === "boolean" ? booleanOrThenable : useThenable(booleanOrThenable),
          start
        ];
      },
      useSyncExternalStore: updateSyncExternalStore,
      useId: updateId,
      useHostTransitionStatus,
      useFormState: rerenderActionState,
      useActionState: rerenderActionState,
      useOptimistic: function(passthrough, reducer) {
        var hook = updateWorkInProgressHook();
        if (currentHook !== null)
          return updateOptimisticImpl(hook, currentHook, passthrough, reducer);
        hook.baseState = passthrough;
        return [passthrough, hook.queue.dispatch];
      },
      useMemoCache,
      useCacheRefresh: updateRefresh,
      useEffectEvent: updateEvent
    };
    function applyDerivedStateFromProps(workInProgress, ctor, getDerivedStateFromProps, nextProps) {
      ctor = workInProgress.memoizedState;
      getDerivedStateFromProps = getDerivedStateFromProps(nextProps, ctor);
      getDerivedStateFromProps = getDerivedStateFromProps === null || getDerivedStateFromProps === undefined ? ctor : assign({}, ctor, getDerivedStateFromProps);
      workInProgress.memoizedState = getDerivedStateFromProps;
      workInProgress.lanes === 0 && (workInProgress.updateQueue.baseState = getDerivedStateFromProps);
    }
    var classComponentUpdater = {
      enqueueSetState: function(inst, payload, callback) {
        inst = inst._reactInternals;
        var lane = requestUpdateLane(), update = createUpdate(lane);
        update.payload = payload;
        callback !== undefined && callback !== null && (update.callback = callback);
        payload = enqueueUpdate(inst, update, lane);
        payload !== null && (scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
      },
      enqueueReplaceState: function(inst, payload, callback) {
        inst = inst._reactInternals;
        var lane = requestUpdateLane(), update = createUpdate(lane);
        update.tag = 1;
        update.payload = payload;
        callback !== undefined && callback !== null && (update.callback = callback);
        payload = enqueueUpdate(inst, update, lane);
        payload !== null && (scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
      },
      enqueueForceUpdate: function(inst, callback) {
        inst = inst._reactInternals;
        var lane = requestUpdateLane(), update = createUpdate(lane);
        update.tag = 2;
        callback !== undefined && callback !== null && (update.callback = callback);
        callback = enqueueUpdate(inst, update, lane);
        callback !== null && (scheduleUpdateOnFiber(callback, inst, lane), entangleTransitions(callback, inst, lane));
      }
    };
    function checkShouldComponentUpdate(workInProgress, ctor, oldProps, newProps, oldState, newState, nextContext) {
      workInProgress = workInProgress.stateNode;
      return typeof workInProgress.shouldComponentUpdate === "function" ? workInProgress.shouldComponentUpdate(newProps, newState, nextContext) : ctor.prototype && ctor.prototype.isPureReactComponent ? !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState) : true;
    }
    function callComponentWillReceiveProps(workInProgress, instance, newProps, nextContext) {
      workInProgress = instance.state;
      typeof instance.componentWillReceiveProps === "function" && instance.componentWillReceiveProps(newProps, nextContext);
      typeof instance.UNSAFE_componentWillReceiveProps === "function" && instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
      instance.state !== workInProgress && classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
    }
    function resolveClassComponentProps(Component, baseProps) {
      var newProps = baseProps;
      if ("ref" in baseProps) {
        newProps = {};
        for (var propName in baseProps)
          propName !== "ref" && (newProps[propName] = baseProps[propName]);
      }
      if (Component = Component.defaultProps) {
        newProps === baseProps && (newProps = assign({}, newProps));
        for (var propName$77 in Component)
          newProps[propName$77] === undefined && (newProps[propName$77] = Component[propName$77]);
      }
      return newProps;
    }
    function defaultOnUncaughtError(error) {
      reportGlobalError(error);
    }
    function defaultOnCaughtError(error) {
      console.error(error);
    }
    function defaultOnRecoverableError(error) {
      reportGlobalError(error);
    }
    function logUncaughtError(root, errorInfo) {
      try {
        var onUncaughtError = root.onUncaughtError;
        onUncaughtError(errorInfo.value, { componentStack: errorInfo.stack });
      } catch (e$78) {
        setTimeout(function() {
          throw e$78;
        });
      }
    }
    function logCaughtError(root, boundary, errorInfo) {
      try {
        var onCaughtError = root.onCaughtError;
        onCaughtError(errorInfo.value, {
          componentStack: errorInfo.stack,
          errorBoundary: boundary.tag === 1 ? boundary.stateNode : null
        });
      } catch (e$79) {
        setTimeout(function() {
          throw e$79;
        });
      }
    }
    function createRootErrorUpdate(root, errorInfo, lane) {
      lane = createUpdate(lane);
      lane.tag = 3;
      lane.payload = { element: null };
      lane.callback = function() {
        logUncaughtError(root, errorInfo);
      };
      return lane;
    }
    function createClassErrorUpdate(lane) {
      lane = createUpdate(lane);
      lane.tag = 3;
      return lane;
    }
    function initializeClassErrorUpdate(update, root, fiber, errorInfo) {
      var getDerivedStateFromError = fiber.type.getDerivedStateFromError;
      if (typeof getDerivedStateFromError === "function") {
        var error = errorInfo.value;
        update.payload = function() {
          return getDerivedStateFromError(error);
        };
        update.callback = function() {
          logCaughtError(root, fiber, errorInfo);
        };
      }
      var inst = fiber.stateNode;
      inst !== null && typeof inst.componentDidCatch === "function" && (update.callback = function() {
        logCaughtError(root, fiber, errorInfo);
        typeof getDerivedStateFromError !== "function" && (legacyErrorBoundariesThatAlreadyFailed === null ? legacyErrorBoundariesThatAlreadyFailed = new Set([this]) : legacyErrorBoundariesThatAlreadyFailed.add(this));
        var stack = errorInfo.stack;
        this.componentDidCatch(errorInfo.value, {
          componentStack: stack !== null ? stack : ""
        });
      });
    }
    function throwException(root, returnFiber, sourceFiber, value, rootRenderLanes) {
      sourceFiber.flags |= 32768;
      if (value !== null && typeof value === "object" && typeof value.then === "function") {
        returnFiber = sourceFiber.alternate;
        returnFiber !== null && propagateParentContextChanges(returnFiber, sourceFiber, rootRenderLanes, true);
        sourceFiber = suspenseHandlerStackCursor.current;
        if (sourceFiber !== null) {
          switch (sourceFiber.tag) {
            case 31:
            case 13:
            case 19:
              return shellBoundary === null ? renderDidSuspendDelayIfPossible() : sourceFiber.alternate === null && workInProgressRootExitStatus === 0 && (workInProgressRootExitStatus = 3), sourceFiber.flags &= -257, sourceFiber.flags |= 65536, sourceFiber.lanes = rootRenderLanes, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, returnFiber === null ? sourceFiber.updateQueue = new Set([value]) : returnFiber.add(value), attachPingListener(root, value, rootRenderLanes)), false;
            case 22:
              return sourceFiber.flags |= 65536, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, returnFiber === null ? (returnFiber = {
                transitions: null,
                markerInstances: null,
                retryQueue: new Set([value])
              }, sourceFiber.updateQueue = returnFiber) : (sourceFiber = returnFiber.retryQueue, sourceFiber === null ? returnFiber.retryQueue = new Set([value]) : sourceFiber.add(value)), attachPingListener(root, value, rootRenderLanes)), false;
          }
          throw Error(formatProdErrorMessage(435, sourceFiber.tag));
        }
        attachPingListener(root, value, rootRenderLanes);
        renderDidSuspendDelayIfPossible();
        return false;
      }
      if (isHydrating)
        return returnFiber = suspenseHandlerStackCursor.current, returnFiber !== null ? ((returnFiber.flags & 65536) === 0 && (returnFiber.flags |= 256), returnFiber.flags |= 65536, returnFiber.lanes = rootRenderLanes, value !== HydrationMismatchException && (root = Error(formatProdErrorMessage(422), { cause: value }), queueHydrationError(createCapturedValueAtFiber(root, sourceFiber)))) : (value !== HydrationMismatchException && (returnFiber = Error(formatProdErrorMessage(423), {
          cause: value
        }), queueHydrationError(createCapturedValueAtFiber(returnFiber, sourceFiber))), root = root.current.alternate, root.flags |= 65536, rootRenderLanes &= -rootRenderLanes, root.lanes |= rootRenderLanes, value = createCapturedValueAtFiber(value, sourceFiber), rootRenderLanes = createRootErrorUpdate(root.stateNode, value, rootRenderLanes), enqueueCapturedUpdate(root, rootRenderLanes), workInProgressRootExitStatus !== 4 && (workInProgressRootExitStatus = 2)), false;
      var wrapperError = Error(formatProdErrorMessage(520), { cause: value });
      wrapperError = createCapturedValueAtFiber(wrapperError, sourceFiber);
      workInProgressRootConcurrentErrors === null ? workInProgressRootConcurrentErrors = [wrapperError] : workInProgressRootConcurrentErrors.push(wrapperError);
      workInProgressRootExitStatus !== 4 && (workInProgressRootExitStatus = 2);
      if (returnFiber === null)
        return true;
      value = createCapturedValueAtFiber(value, sourceFiber);
      sourceFiber = returnFiber;
      do {
        switch (sourceFiber.tag) {
          case 3:
            return sourceFiber.flags |= 65536, root = rootRenderLanes & -rootRenderLanes, sourceFiber.lanes |= root, root = createRootErrorUpdate(sourceFiber.stateNode, value, root), enqueueCapturedUpdate(sourceFiber, root), false;
          case 1:
            returnFiber = sourceFiber.type;
            wrapperError = sourceFiber.stateNode;
            if ((sourceFiber.flags & 128) === 0 && (typeof returnFiber.getDerivedStateFromError === "function" || wrapperError !== null && typeof wrapperError.componentDidCatch === "function" && (legacyErrorBoundariesThatAlreadyFailed === null || !legacyErrorBoundariesThatAlreadyFailed.has(wrapperError))))
              return sourceFiber.flags |= 65536, rootRenderLanes &= -rootRenderLanes, sourceFiber.lanes |= rootRenderLanes, rootRenderLanes = createClassErrorUpdate(rootRenderLanes), initializeClassErrorUpdate(rootRenderLanes, root, sourceFiber, value), enqueueCapturedUpdate(sourceFiber, rootRenderLanes), false;
            break;
          case 22:
            if (sourceFiber.memoizedState !== null)
              return sourceFiber.flags |= 65536, false;
        }
        sourceFiber = sourceFiber.return;
      } while (sourceFiber !== null);
      return false;
    }
    var SelectiveHydrationException = Error(formatProdErrorMessage(461));
    var didReceiveUpdate = false;
    function reconcileChildren(current, workInProgress, nextChildren, renderLanes) {
      workInProgress.child = current === null ? mountChildFibers(workInProgress, null, nextChildren, renderLanes) : reconcileChildFibers(workInProgress, current.child, nextChildren, renderLanes);
    }
    function updateForwardRef(current, workInProgress, Component, nextProps, renderLanes) {
      Component = Component.render;
      var ref = workInProgress.ref;
      if ("ref" in nextProps) {
        var propsWithoutRef = {};
        for (var key in nextProps)
          key !== "ref" && (propsWithoutRef[key] = nextProps[key]);
      } else
        propsWithoutRef = nextProps;
      prepareToReadContext(workInProgress);
      nextProps = renderWithHooks(current, workInProgress, Component, propsWithoutRef, ref, renderLanes);
      key = checkDidRenderIdHook();
      if (current !== null && !didReceiveUpdate)
        return bailoutHooks(current, workInProgress, renderLanes), bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
      isHydrating && key && pushMaterializedTreeId(workInProgress);
      workInProgress.flags |= 1;
      reconcileChildren(current, workInProgress, nextProps, renderLanes);
      return workInProgress.child;
    }
    function updateMemoComponent(current, workInProgress, Component, nextProps, renderLanes) {
      if (current === null) {
        var type = Component.type;
        if (typeof type === "function" && !shouldConstruct(type) && type.defaultProps === undefined && Component.compare === null)
          return workInProgress.tag = 15, workInProgress.type = type, updateSimpleMemoComponent(current, workInProgress, type, nextProps, renderLanes);
        current = createFiberFromTypeAndProps(Component.type, null, nextProps, workInProgress, workInProgress.mode, renderLanes);
        current.ref = workInProgress.ref;
        current.return = workInProgress;
        return workInProgress.child = current;
      }
      type = current.child;
      if (!checkScheduledUpdateOrContext(current, renderLanes)) {
        var prevProps = type.memoizedProps;
        Component = Component.compare;
        Component = Component !== null ? Component : shallowEqual;
        if (Component(prevProps, nextProps) && current.ref === workInProgress.ref)
          return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
      }
      workInProgress.flags |= 1;
      current = createWorkInProgress(type, nextProps);
      current.ref = workInProgress.ref;
      current.return = workInProgress;
      return workInProgress.child = current;
    }
    function updateSimpleMemoComponent(current, workInProgress, Component, nextProps, renderLanes) {
      if (current !== null) {
        var prevProps = current.memoizedProps;
        if (shallowEqual(prevProps, nextProps) && current.ref === workInProgress.ref)
          if (didReceiveUpdate = false, workInProgress.pendingProps = nextProps = prevProps, checkScheduledUpdateOrContext(current, renderLanes))
            (current.flags & 131072) !== 0 && (didReceiveUpdate = true);
          else
            return workInProgress.lanes = current.lanes, bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
      }
      return updateFunctionComponent(current, workInProgress, Component, nextProps, renderLanes);
    }
    function updateOffscreenComponent(current, workInProgress, renderLanes, nextProps) {
      var nextChildren = nextProps.children, prevState = current !== null ? current.memoizedState : null;
      current === null && workInProgress.stateNode === null && (workInProgress.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null
      });
      if (nextProps.mode === "hidden") {
        if ((workInProgress.flags & 128) !== 0) {
          prevState = prevState !== null ? prevState.baseLanes | renderLanes : renderLanes;
          if (current !== null) {
            nextProps = workInProgress.child = current.child;
            for (nextChildren = 0;nextProps !== null; )
              nextChildren = nextChildren | nextProps.lanes | nextProps.childLanes, nextProps = nextProps.sibling;
            nextProps = nextChildren & ~prevState;
          } else
            nextProps = 0, workInProgress.child = null;
          return deferHiddenOffscreenComponent(current, workInProgress, prevState, renderLanes, nextProps);
        }
        if ((renderLanes & 536870912) !== 0)
          workInProgress.memoizedState = { baseLanes: 0, cachePool: null }, current !== null && pushTransition(workInProgress, prevState !== null ? prevState.cachePool : null), prevState !== null ? pushHiddenContext(workInProgress, prevState) : reuseHiddenContextOnStack(), pushOffscreenSuspenseHandler(workInProgress);
        else
          return nextProps = workInProgress.lanes = 536870912, deferHiddenOffscreenComponent(current, workInProgress, prevState !== null ? prevState.baseLanes | renderLanes : renderLanes, renderLanes, nextProps);
      } else
        prevState !== null ? (pushTransition(workInProgress, prevState.cachePool), pushHiddenContext(workInProgress, prevState), reuseSuspenseHandlerOnStack(), workInProgress.memoizedState = null) : (current !== null && pushTransition(workInProgress, null), reuseHiddenContextOnStack(), reuseSuspenseHandlerOnStack());
      reconcileChildren(current, workInProgress, nextChildren, renderLanes);
      return workInProgress.child;
    }
    function bailoutOffscreenComponent(current, workInProgress) {
      current !== null && current.tag === 22 || workInProgress.stateNode !== null || (workInProgress.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null
      });
      return workInProgress.sibling;
    }
    function deferHiddenOffscreenComponent(current, workInProgress, nextBaseLanes, renderLanes, remainingChildLanes) {
      var JSCompiler_inline_result = peekCacheFromPool();
      JSCompiler_inline_result = JSCompiler_inline_result === null ? null : { parent: CacheContext._currentValue, pool: JSCompiler_inline_result };
      workInProgress.memoizedState = {
        baseLanes: nextBaseLanes,
        cachePool: JSCompiler_inline_result
      };
      current !== null && pushTransition(workInProgress, null);
      reuseHiddenContextOnStack();
      pushOffscreenSuspenseHandler(workInProgress);
      current !== null && propagateParentContextChanges(current, workInProgress, renderLanes, true);
      workInProgress.childLanes = remainingChildLanes;
      return null;
    }
    function mountActivityChildren(workInProgress, nextProps) {
      nextProps = mountWorkInProgressOffscreenFiber({ mode: nextProps.mode, children: nextProps.children }, workInProgress.mode);
      nextProps.ref = workInProgress.ref;
      workInProgress.child = nextProps;
      nextProps.return = workInProgress;
      return nextProps;
    }
    function retryActivityComponentWithoutHydrating(current, workInProgress, renderLanes) {
      reconcileChildFibers(workInProgress, current.child, null, renderLanes);
      current = mountActivityChildren(workInProgress, workInProgress.pendingProps);
      current.flags |= 2;
      popSuspenseHandler(workInProgress);
      workInProgress.memoizedState = null;
      return current;
    }
    function updateActivityComponent(current, workInProgress, renderLanes) {
      var nextProps = workInProgress.pendingProps, didSuspend = (workInProgress.flags & 128) !== 0;
      workInProgress.flags &= -129;
      if (current === null) {
        if (isHydrating) {
          if (nextProps.mode === "hidden")
            return current = mountActivityChildren(workInProgress, nextProps), workInProgress.lanes = 536870912, current.memoizedState = { baseLanes: 0, cachePool: null }, bailoutOffscreenComponent(null, current);
          pushDehydratedActivitySuspenseHandler(workInProgress);
          (current = nextHydratableInstance) ? (current = canHydrateHydrationBoundary(current, rootOrSingletonContext), current = current !== null && current.data === "&" ? current : null, current !== null && (workInProgress.memoizedState = {
            dehydrated: current,
            treeContext: treeContextProvider !== null ? { id: treeContextId, overflow: treeContextOverflow } : null,
            retryLane: 536870912,
            hydrationErrors: null
          }, renderLanes = createFiberFromDehydratedFragment(current), renderLanes.return = workInProgress, workInProgress.child = renderLanes, hydrationParentFiber = workInProgress, nextHydratableInstance = null)) : current = null;
          if (current === null)
            throw throwOnHydrationMismatch(workInProgress);
          workInProgress.lanes = 536870912;
          return null;
        }
        return mountActivityChildren(workInProgress, nextProps);
      }
      var prevState = current.memoizedState;
      if (prevState !== null) {
        var dehydrated = prevState.dehydrated;
        pushDehydratedActivitySuspenseHandler(workInProgress);
        if (didSuspend)
          if (workInProgress.flags & 256)
            workInProgress.flags &= -257, workInProgress = retryActivityComponentWithoutHydrating(current, workInProgress, renderLanes);
          else if (workInProgress.memoizedState !== null)
            workInProgress.child = current.child, workInProgress.flags |= 128, workInProgress = null;
          else
            throw Error(formatProdErrorMessage(558));
        else if (didReceiveUpdate || propagateParentContextChanges(current, workInProgress, renderLanes, false), didSuspend = (renderLanes & current.childLanes) !== 0, didReceiveUpdate || didSuspend) {
          if (currentTreeHiddenStackCursor.current === null) {
            nextProps = workInProgressRoot;
            if (nextProps !== null && (dehydrated = getBumpedLaneForHydration(nextProps, renderLanes), dehydrated !== 0 && dehydrated !== prevState.retryLane))
              throw prevState.retryLane = dehydrated, enqueueConcurrentRenderForLane(current, dehydrated), scheduleUpdateOnFiber(nextProps, current, dehydrated), SelectiveHydrationException;
            renderDidSuspendDelayIfPossible();
          }
          workInProgress = retryActivityComponentWithoutHydrating(current, workInProgress, renderLanes);
        } else
          current = prevState.treeContext, nextHydratableInstance = getNextHydratable(dehydrated.nextSibling), hydrationParentFiber = workInProgress, isHydrating = true, hydrationErrors = null, rootOrSingletonContext = false, current !== null && restoreSuspendedTreeContext(workInProgress, current), workInProgress = mountActivityChildren(workInProgress, nextProps), workInProgress.flags |= 134221824;
        return workInProgress;
      }
      current = createWorkInProgress(current.child, {
        mode: nextProps.mode,
        children: nextProps.children
      });
      current.ref = workInProgress.ref;
      workInProgress.child = current;
      current.return = workInProgress;
      return current;
    }
    function markRef(current, workInProgress) {
      var ref = workInProgress.ref;
      if (ref === null)
        current !== null && current.ref !== null && (workInProgress.flags |= 4194816);
      else {
        if (typeof ref !== "function" && typeof ref !== "object")
          throw Error(formatProdErrorMessage(284));
        if (current === null || current.ref !== ref)
          workInProgress.flags |= 4194816;
      }
    }
    function updateFunctionComponent(current, workInProgress, Component, nextProps, renderLanes) {
      prepareToReadContext(workInProgress);
      Component = renderWithHooks(current, workInProgress, Component, nextProps, undefined, renderLanes);
      nextProps = checkDidRenderIdHook();
      if (current !== null && !didReceiveUpdate)
        return bailoutHooks(current, workInProgress, renderLanes), bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
      isHydrating && nextProps && pushMaterializedTreeId(workInProgress);
      workInProgress.flags |= 1;
      reconcileChildren(current, workInProgress, Component, renderLanes);
      return workInProgress.child;
    }
    function replayFunctionComponent(current, workInProgress, nextProps, Component, secondArg, renderLanes) {
      prepareToReadContext(workInProgress);
      workInProgress.updateQueue = null;
      nextProps = renderWithHooksAgain(workInProgress, Component, nextProps, secondArg);
      finishRenderingHooks(current);
      Component = checkDidRenderIdHook();
      if (current !== null && !didReceiveUpdate)
        return bailoutHooks(current, workInProgress, renderLanes), bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
      isHydrating && Component && pushMaterializedTreeId(workInProgress);
      workInProgress.flags |= 1;
      reconcileChildren(current, workInProgress, nextProps, renderLanes);
      return workInProgress.child;
    }
    function updateClassComponent(current, workInProgress, Component, nextProps, renderLanes) {
      prepareToReadContext(workInProgress);
      if (workInProgress.stateNode === null) {
        var context = emptyContextObject, contextType = Component.contextType;
        typeof contextType === "object" && contextType !== null && (context = readContext(contextType));
        context = new Component(nextProps, context);
        workInProgress.memoizedState = context.state !== null && context.state !== undefined ? context.state : null;
        context.updater = classComponentUpdater;
        workInProgress.stateNode = context;
        context._reactInternals = workInProgress;
        context = workInProgress.stateNode;
        context.props = nextProps;
        context.state = workInProgress.memoizedState;
        context.refs = {};
        initializeUpdateQueue(workInProgress);
        contextType = Component.contextType;
        context.context = typeof contextType === "object" && contextType !== null ? readContext(contextType) : emptyContextObject;
        context.state = workInProgress.memoizedState;
        contextType = Component.getDerivedStateFromProps;
        typeof contextType === "function" && (applyDerivedStateFromProps(workInProgress, Component, contextType, nextProps), context.state = workInProgress.memoizedState);
        typeof Component.getDerivedStateFromProps === "function" || typeof context.getSnapshotBeforeUpdate === "function" || typeof context.UNSAFE_componentWillMount !== "function" && typeof context.componentWillMount !== "function" || (contextType = context.state, typeof context.componentWillMount === "function" && context.componentWillMount(), typeof context.UNSAFE_componentWillMount === "function" && context.UNSAFE_componentWillMount(), contextType !== context.state && classComponentUpdater.enqueueReplaceState(context, context.state, null), processUpdateQueue(workInProgress, nextProps, context, renderLanes), suspendIfUpdateReadFromEntangledAsyncAction(), context.state = workInProgress.memoizedState);
        typeof context.componentDidMount === "function" && (workInProgress.flags |= 4194308);
        nextProps = true;
      } else if (current === null) {
        context = workInProgress.stateNode;
        var unresolvedOldProps = workInProgress.memoizedProps, oldProps = resolveClassComponentProps(Component, unresolvedOldProps);
        context.props = oldProps;
        var oldContext = context.context, contextType$jscomp$0 = Component.contextType;
        contextType = emptyContextObject;
        typeof contextType$jscomp$0 === "object" && contextType$jscomp$0 !== null && (contextType = readContext(contextType$jscomp$0));
        var getDerivedStateFromProps = Component.getDerivedStateFromProps;
        contextType$jscomp$0 = typeof getDerivedStateFromProps === "function" || typeof context.getSnapshotBeforeUpdate === "function";
        unresolvedOldProps = workInProgress.pendingProps !== unresolvedOldProps;
        contextType$jscomp$0 || typeof context.UNSAFE_componentWillReceiveProps !== "function" && typeof context.componentWillReceiveProps !== "function" || (unresolvedOldProps || oldContext !== contextType) && callComponentWillReceiveProps(workInProgress, context, nextProps, contextType);
        hasForceUpdate = false;
        var oldState = workInProgress.memoizedState;
        context.state = oldState;
        processUpdateQueue(workInProgress, nextProps, context, renderLanes);
        suspendIfUpdateReadFromEntangledAsyncAction();
        oldContext = workInProgress.memoizedState;
        unresolvedOldProps || oldState !== oldContext || hasForceUpdate ? (typeof getDerivedStateFromProps === "function" && (applyDerivedStateFromProps(workInProgress, Component, getDerivedStateFromProps, nextProps), oldContext = workInProgress.memoizedState), (oldProps = hasForceUpdate || checkShouldComponentUpdate(workInProgress, Component, oldProps, nextProps, oldState, oldContext, contextType)) ? (contextType$jscomp$0 || typeof context.UNSAFE_componentWillMount !== "function" && typeof context.componentWillMount !== "function" || (typeof context.componentWillMount === "function" && context.componentWillMount(), typeof context.UNSAFE_componentWillMount === "function" && context.UNSAFE_componentWillMount()), typeof context.componentDidMount === "function" && (workInProgress.flags |= 4194308)) : (typeof context.componentDidMount === "function" && (workInProgress.flags |= 4194308), workInProgress.memoizedProps = nextProps, workInProgress.memoizedState = oldContext), context.props = nextProps, context.state = oldContext, context.context = contextType, nextProps = oldProps) : (typeof context.componentDidMount === "function" && (workInProgress.flags |= 4194308), nextProps = false);
      } else {
        context = workInProgress.stateNode;
        cloneUpdateQueue(current, workInProgress);
        contextType = workInProgress.memoizedProps;
        contextType$jscomp$0 = resolveClassComponentProps(Component, contextType);
        context.props = contextType$jscomp$0;
        getDerivedStateFromProps = workInProgress.pendingProps;
        oldState = context.context;
        oldContext = Component.contextType;
        oldProps = emptyContextObject;
        typeof oldContext === "object" && oldContext !== null && (oldProps = readContext(oldContext));
        unresolvedOldProps = Component.getDerivedStateFromProps;
        (oldContext = typeof unresolvedOldProps === "function" || typeof context.getSnapshotBeforeUpdate === "function") || typeof context.UNSAFE_componentWillReceiveProps !== "function" && typeof context.componentWillReceiveProps !== "function" || (contextType !== getDerivedStateFromProps || oldState !== oldProps) && callComponentWillReceiveProps(workInProgress, context, nextProps, oldProps);
        hasForceUpdate = false;
        oldState = workInProgress.memoizedState;
        context.state = oldState;
        processUpdateQueue(workInProgress, nextProps, context, renderLanes);
        suspendIfUpdateReadFromEntangledAsyncAction();
        var newState = workInProgress.memoizedState;
        contextType !== getDerivedStateFromProps || oldState !== newState || hasForceUpdate || current !== null && current.dependencies !== null && checkIfContextChanged(current.dependencies) ? (typeof unresolvedOldProps === "function" && (applyDerivedStateFromProps(workInProgress, Component, unresolvedOldProps, nextProps), newState = workInProgress.memoizedState), (contextType$jscomp$0 = hasForceUpdate || checkShouldComponentUpdate(workInProgress, Component, contextType$jscomp$0, nextProps, oldState, newState, oldProps) || current !== null && current.dependencies !== null && checkIfContextChanged(current.dependencies)) ? (oldContext || typeof context.UNSAFE_componentWillUpdate !== "function" && typeof context.componentWillUpdate !== "function" || (typeof context.componentWillUpdate === "function" && context.componentWillUpdate(nextProps, newState, oldProps), typeof context.UNSAFE_componentWillUpdate === "function" && context.UNSAFE_componentWillUpdate(nextProps, newState, oldProps)), typeof context.componentDidUpdate === "function" && (workInProgress.flags |= 4), typeof context.getSnapshotBeforeUpdate === "function" && (workInProgress.flags |= 1024)) : (typeof context.componentDidUpdate !== "function" || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress.flags |= 4), typeof context.getSnapshotBeforeUpdate !== "function" || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress.flags |= 1024), workInProgress.memoizedProps = nextProps, workInProgress.memoizedState = newState), context.props = nextProps, context.state = newState, context.context = oldProps, nextProps = contextType$jscomp$0) : (typeof context.componentDidUpdate !== "function" || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress.flags |= 4), typeof context.getSnapshotBeforeUpdate !== "function" || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress.flags |= 1024), nextProps = false);
      }
      context = nextProps;
      markRef(current, workInProgress);
      nextProps = (workInProgress.flags & 128) !== 0;
      context || nextProps ? (context = workInProgress.stateNode, Component = nextProps && typeof Component.getDerivedStateFromError !== "function" ? null : context.render(), workInProgress.flags |= 1, current !== null && nextProps ? (workInProgress.child = reconcileChildFibers(workInProgress, current.child, null, renderLanes), workInProgress.child = reconcileChildFibers(workInProgress, null, Component, renderLanes)) : reconcileChildren(current, workInProgress, Component, renderLanes), workInProgress.memoizedState = context.state, current = workInProgress.child) : current = bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
      return current;
    }
    function mountHostRootWithoutHydrating(current, workInProgress, nextChildren, renderLanes) {
      resetHydrationState();
      workInProgress.flags |= 256;
      reconcileChildren(current, workInProgress, nextChildren, renderLanes);
      return workInProgress.child;
    }
    var SUSPENDED_MARKER = {
      dehydrated: null,
      treeContext: null,
      retryLane: 0,
      hydrationErrors: null
    };
    function mountSuspenseOffscreenState(renderLanes) {
      return { baseLanes: renderLanes, cachePool: getSuspendedCache() };
    }
    function getRemainingWorkInPrimaryTree(current, primaryTreeDidDefer, renderLanes) {
      current = current !== null ? current.childLanes & ~renderLanes : 0;
      primaryTreeDidDefer && (current |= workInProgressDeferredLane);
      return current;
    }
    function updateSuspenseComponent(current, workInProgress, renderLanes) {
      var nextProps = workInProgress.pendingProps, showFallback = false, didSuspend = (workInProgress.flags & 128) !== 0, JSCompiler_temp;
      (JSCompiler_temp = didSuspend) || (JSCompiler_temp = current !== null && current.memoizedState === null ? false : (suspenseStackCursor.current & 2) !== 0);
      JSCompiler_temp && (showFallback = true, workInProgress.flags &= -129);
      JSCompiler_temp = (workInProgress.flags & 32) !== 0;
      workInProgress.flags &= -33;
      if (current === null) {
        if (isHydrating) {
          showFallback ? pushPrimaryTreeSuspenseHandler(workInProgress) : reuseSuspenseHandlerOnStack();
          (current = nextHydratableInstance) ? (current = canHydrateHydrationBoundary(current, rootOrSingletonContext), current = current !== null && current.data !== "&" ? current : null, current !== null && (workInProgress.memoizedState = {
            dehydrated: current,
            treeContext: treeContextProvider !== null ? { id: treeContextId, overflow: treeContextOverflow } : null,
            retryLane: 536870912,
            hydrationErrors: null
          }, renderLanes = createFiberFromDehydratedFragment(current), renderLanes.return = workInProgress, workInProgress.child = renderLanes, hydrationParentFiber = workInProgress, nextHydratableInstance = null)) : current = null;
          if (current === null)
            throw throwOnHydrationMismatch(workInProgress);
          isSuspenseInstanceFallback(current) ? workInProgress.lanes = 32 : workInProgress.lanes = 536870912;
          return null;
        }
        didSuspend = nextProps.children;
        nextProps = nextProps.fallback;
        if (showFallback)
          return reuseSuspenseHandlerOnStack(), showFallback = workInProgress.mode, didSuspend = mountWorkInProgressOffscreenFiber({ mode: "hidden", children: didSuspend }, showFallback), nextProps = createFiberFromFragment(nextProps, showFallback, renderLanes, null), didSuspend.return = workInProgress, nextProps.return = workInProgress, didSuspend.sibling = nextProps, workInProgress.child = didSuspend, nextProps = workInProgress.child, nextProps.memoizedState = mountSuspenseOffscreenState(renderLanes), nextProps.childLanes = getRemainingWorkInPrimaryTree(current, JSCompiler_temp, renderLanes), workInProgress.memoizedState = SUSPENDED_MARKER, bailoutOffscreenComponent(null, nextProps);
        pushPrimaryTreeSuspenseHandler(workInProgress);
        return mountSuspensePrimaryChildren(workInProgress, didSuspend);
      }
      var prevState = current.memoizedState;
      if (prevState !== null) {
        var dehydrated$96 = prevState.dehydrated;
        if (dehydrated$96 !== null)
          return updateDehydratedSuspenseComponent(current, workInProgress, didSuspend, JSCompiler_temp, nextProps, dehydrated$96, prevState, renderLanes);
      }
      if (showFallback)
        return reuseSuspenseHandlerOnStack(), showFallback = nextProps.fallback, didSuspend = workInProgress.mode, prevState = current.child, dehydrated$96 = prevState.sibling, nextProps = createWorkInProgress(prevState, {
          mode: "hidden",
          children: nextProps.children
        }), nextProps.subtreeFlags = prevState.subtreeFlags & 1206910976, dehydrated$96 !== null ? showFallback = createWorkInProgress(dehydrated$96, showFallback) : (showFallback = createFiberFromFragment(showFallback, didSuspend, renderLanes, null), showFallback.flags |= 2), showFallback.return = workInProgress, nextProps.return = workInProgress, nextProps.sibling = showFallback, workInProgress.child = nextProps, bailoutOffscreenComponent(null, nextProps), nextProps = workInProgress.child, showFallback = current.child.memoizedState, showFallback === null ? showFallback = mountSuspenseOffscreenState(renderLanes) : (didSuspend = showFallback.cachePool, didSuspend !== null ? (prevState = CacheContext._currentValue, didSuspend = didSuspend.parent !== prevState ? { parent: prevState, pool: prevState } : didSuspend) : didSuspend = getSuspendedCache(), showFallback = {
          baseLanes: showFallback.baseLanes | renderLanes,
          cachePool: didSuspend
        }), nextProps.memoizedState = showFallback, nextProps.childLanes = getRemainingWorkInPrimaryTree(current, JSCompiler_temp, renderLanes), workInProgress.memoizedState = SUSPENDED_MARKER, bailoutOffscreenComponent(current.child, nextProps);
      pushPrimaryTreeSuspenseHandler(workInProgress);
      renderLanes = current.child;
      current = renderLanes.sibling;
      renderLanes = createWorkInProgress(renderLanes, {
        mode: "visible",
        children: nextProps.children
      });
      renderLanes.return = workInProgress;
      renderLanes.sibling = null;
      current !== null && (JSCompiler_temp = workInProgress.deletions, JSCompiler_temp === null ? (workInProgress.deletions = [current], workInProgress.flags |= 16) : JSCompiler_temp.push(current));
      workInProgress.child = renderLanes;
      workInProgress.memoizedState = null;
      return renderLanes;
    }
    function mountSuspensePrimaryChildren(workInProgress, primaryChildren) {
      primaryChildren = mountWorkInProgressOffscreenFiber({ mode: "visible", children: primaryChildren }, workInProgress.mode);
      primaryChildren.return = workInProgress;
      return workInProgress.child = primaryChildren;
    }
    function mountWorkInProgressOffscreenFiber(offscreenProps, mode) {
      offscreenProps = createFiberImplClass(22, offscreenProps, null, mode);
      offscreenProps.lanes = 0;
      return offscreenProps;
    }
    function retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes) {
      reconcileChildFibers(workInProgress, current.child, null, renderLanes);
      current = mountSuspensePrimaryChildren(workInProgress, workInProgress.pendingProps.children);
      current.flags |= 2;
      workInProgress.memoizedState = null;
      return current;
    }
    function updateDehydratedSuspenseComponent(current, workInProgress, didSuspend, didPrimaryChildrenDefer, nextProps, suspenseInstance, suspenseState, renderLanes) {
      if (didSuspend) {
        if (workInProgress.flags & 256)
          return pushPrimaryTreeSuspenseHandler(workInProgress), workInProgress.flags &= -257, retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes);
        if (workInProgress.memoizedState !== null)
          return reuseSuspenseHandlerOnStack(), workInProgress.child = current.child, workInProgress.flags |= 128, null;
        reuseSuspenseHandlerOnStack();
        suspenseInstance = nextProps.fallback;
        suspenseState = workInProgress.mode;
        nextProps = mountWorkInProgressOffscreenFiber({ mode: "visible", children: nextProps.children }, suspenseState);
        suspenseInstance = createFiberFromFragment(suspenseInstance, suspenseState, renderLanes, null);
        suspenseInstance.flags |= 2;
        nextProps.return = workInProgress;
        suspenseInstance.return = workInProgress;
        nextProps.sibling = suspenseInstance;
        workInProgress.child = nextProps;
        reconcileChildFibers(workInProgress, current.child, null, renderLanes);
        nextProps = workInProgress.child;
        nextProps.memoizedState = mountSuspenseOffscreenState(renderLanes);
        nextProps.childLanes = getRemainingWorkInPrimaryTree(current, didPrimaryChildrenDefer, renderLanes);
        workInProgress.memoizedState = SUSPENDED_MARKER;
        return bailoutOffscreenComponent(null, nextProps);
      }
      pushPrimaryTreeSuspenseHandler(workInProgress);
      if (isSuspenseInstanceFallback(suspenseInstance)) {
        didPrimaryChildrenDefer = suspenseInstance.nextSibling && suspenseInstance.nextSibling.dataset;
        if (didPrimaryChildrenDefer)
          var digest = didPrimaryChildrenDefer.dgst;
        didPrimaryChildrenDefer = digest;
        didPrimaryChildrenDefer !== "" && (nextProps = Error(formatProdErrorMessage(419)), nextProps.stack = "", nextProps.digest = didPrimaryChildrenDefer, queueHydrationError({ value: nextProps, source: null, stack: null }));
        return retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes);
      }
      didReceiveUpdate || propagateParentContextChanges(current, workInProgress, renderLanes, false);
      didPrimaryChildrenDefer = (renderLanes & current.childLanes) !== 0;
      if (didReceiveUpdate || didPrimaryChildrenDefer) {
        if (currentTreeHiddenStackCursor.current !== null)
          return retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes);
        didPrimaryChildrenDefer = workInProgressRoot;
        if (didPrimaryChildrenDefer !== null && (nextProps = getBumpedLaneForHydration(didPrimaryChildrenDefer, renderLanes), nextProps !== 0 && nextProps !== suspenseState.retryLane))
          throw suspenseState.retryLane = nextProps, enqueueConcurrentRenderForLane(current, nextProps), scheduleUpdateOnFiber(didPrimaryChildrenDefer, current, nextProps), SelectiveHydrationException;
        isSuspenseInstancePending(suspenseInstance) || renderDidSuspendDelayIfPossible();
        return retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes);
      }
      if (isSuspenseInstancePending(suspenseInstance))
        return workInProgress.flags |= 192, workInProgress.child = current.child, null;
      current = suspenseState.treeContext;
      nextHydratableInstance = getNextHydratable(suspenseInstance.nextSibling);
      hydrationParentFiber = workInProgress;
      isHydrating = true;
      hydrationErrors = null;
      rootOrSingletonContext = false;
      current !== null && restoreSuspendedTreeContext(workInProgress, current);
      workInProgress = mountSuspensePrimaryChildren(workInProgress, nextProps.children);
      workInProgress.flags |= 134221824;
      return workInProgress;
    }
    function scheduleSuspenseWorkOnFiber(fiber, renderLanes, propagationRoot) {
      fiber.lanes |= renderLanes;
      var alternate = fiber.alternate;
      alternate !== null && (alternate.lanes |= renderLanes);
      scheduleContextWorkOnParentPath(fiber.return, renderLanes, propagationRoot);
    }
    function findLastContentRow(firstChild) {
      for (var lastContentRow = null;firstChild !== null; ) {
        var currentRow = firstChild.alternate;
        currentRow !== null && findFirstSuspended(currentRow) === null && (lastContentRow = firstChild);
        firstChild = firstChild.sibling;
      }
      return lastContentRow;
    }
    function initSuspenseListRenderState(workInProgress, isBackwards, tail, lastContentRow, tailMode, treeForkCount) {
      var renderState = workInProgress.memoizedState;
      renderState === null ? workInProgress.memoizedState = {
        isBackwards,
        rendering: null,
        renderingStartTime: 0,
        last: lastContentRow,
        tail,
        tailMode,
        treeForkCount
      } : (renderState.isBackwards = isBackwards, renderState.rendering = null, renderState.renderingStartTime = 0, renderState.last = lastContentRow, renderState.tail = tail, renderState.tailMode = tailMode, renderState.treeForkCount = treeForkCount);
    }
    function reverseChildren(fiber) {
      var row = fiber.child;
      for (fiber.child = null;row !== null; ) {
        var nextRow = row.sibling;
        row.sibling = fiber.child;
        fiber.child = row;
        row = nextRow;
      }
    }
    function updateSuspenseListComponent(current, workInProgress, renderLanes) {
      var nextProps = workInProgress.pendingProps, revealOrder = nextProps.revealOrder, tailMode = nextProps.tail;
      nextProps = nextProps.children;
      var suspenseContext = suspenseStackCursor.current;
      if (workInProgress.flags & 128)
        return pushSuspenseListContext(workInProgress, suspenseContext), null;
      var shouldForceFallback = (suspenseContext & 2) !== 0;
      shouldForceFallback ? (suspenseContext = suspenseContext & 1 | 2, workInProgress.flags |= 128) : suspenseContext &= 1;
      pushSuspenseListContext(workInProgress, suspenseContext);
      revealOrder === "backwards" && current !== null ? (reverseChildren(current), reconcileChildren(current, workInProgress, nextProps, renderLanes), reverseChildren(current)) : reconcileChildren(current, workInProgress, nextProps, renderLanes);
      nextProps = isHydrating ? treeForkCount : 0;
      if (!shouldForceFallback && current !== null && (current.flags & 128) !== 0)
        a:
          for (current = workInProgress.child;current !== null; ) {
            if (current.tag === 13)
              current.memoizedState !== null && scheduleSuspenseWorkOnFiber(current, renderLanes, workInProgress);
            else if (current.tag === 19)
              scheduleSuspenseWorkOnFiber(current, renderLanes, workInProgress);
            else if (current.child !== null) {
              current.child.return = current;
              current = current.child;
              continue;
            }
            if (current === workInProgress)
              break a;
            for (;current.sibling === null; ) {
              if (current.return === null || current.return === workInProgress)
                break a;
              current = current.return;
            }
            current.sibling.return = current.return;
            current = current.sibling;
          }
      switch (revealOrder) {
        case "backwards":
          renderLanes = findLastContentRow(workInProgress.child);
          renderLanes === null ? (revealOrder = workInProgress.child, workInProgress.child = null) : (revealOrder = renderLanes.sibling, renderLanes.sibling = null, reverseChildren(workInProgress));
          initSuspenseListRenderState(workInProgress, true, revealOrder, null, tailMode, nextProps);
          break;
        case "unstable_legacy-backwards":
          renderLanes = null;
          revealOrder = workInProgress.child;
          for (workInProgress.child = null;revealOrder !== null; ) {
            current = revealOrder.alternate;
            if (current !== null && findFirstSuspended(current) === null) {
              workInProgress.child = revealOrder;
              break;
            }
            current = revealOrder.sibling;
            revealOrder.sibling = renderLanes;
            renderLanes = revealOrder;
            revealOrder = current;
          }
          initSuspenseListRenderState(workInProgress, true, renderLanes, null, tailMode, nextProps);
          break;
        case "together":
          initSuspenseListRenderState(workInProgress, false, null, null, undefined, nextProps);
          break;
        case "independent":
          workInProgress.memoizedState = null;
          break;
        default:
          renderLanes = findLastContentRow(workInProgress.child), renderLanes === null ? (revealOrder = workInProgress.child, workInProgress.child = null) : (revealOrder = renderLanes.sibling, renderLanes.sibling = null), initSuspenseListRenderState(workInProgress, false, revealOrder, renderLanes, tailMode, nextProps);
      }
      return workInProgress.child;
    }
    function updateContextProvider(current, workInProgress, renderLanes) {
      var newProps = workInProgress.pendingProps;
      pushProvider(workInProgress, workInProgress.type, newProps.value);
      reconcileChildren(current, workInProgress, newProps.children, renderLanes);
      return workInProgress.child;
    }
    function bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes) {
      current !== null && (workInProgress.dependencies = current.dependencies);
      workInProgressRootSkippedLanes |= workInProgress.lanes;
      if ((renderLanes & workInProgress.childLanes) === 0)
        if (current !== null) {
          if (propagateParentContextChanges(current, workInProgress, renderLanes, false), (renderLanes & workInProgress.childLanes) === 0)
            return null;
        } else
          return null;
      if (current !== null && workInProgress.child !== current.child)
        throw Error(formatProdErrorMessage(153));
      if (workInProgress.child !== null) {
        current = workInProgress.child;
        renderLanes = createWorkInProgress(current, current.pendingProps);
        workInProgress.child = renderLanes;
        for (renderLanes.return = workInProgress;current.sibling !== null; )
          current = current.sibling, renderLanes = renderLanes.sibling = createWorkInProgress(current, current.pendingProps), renderLanes.return = workInProgress;
        renderLanes.sibling = null;
      }
      return workInProgress.child;
    }
    function checkScheduledUpdateOrContext(current, renderLanes) {
      if ((current.lanes & renderLanes) !== 0)
        return true;
      current = current.dependencies;
      return current !== null && checkIfContextChanged(current) ? true : false;
    }
    function attemptEarlyBailoutIfNoScheduledUpdate(current, workInProgress, renderLanes) {
      switch (workInProgress.tag) {
        case 3:
          pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
          pushProvider(workInProgress, CacheContext, current.memoizedState.cache);
          resetHydrationState();
          break;
        case 27:
        case 5:
          pushHostContext(workInProgress);
          break;
        case 4:
          pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
          break;
        case 10:
          pushProvider(workInProgress, workInProgress.type, workInProgress.memoizedProps.value);
          break;
        case 31:
          if (workInProgress.memoizedState !== null)
            return workInProgress.flags |= 128, pushDehydratedActivitySuspenseHandler(workInProgress), null;
          break;
        case 13:
          var state$108 = workInProgress.memoizedState;
          if (state$108 !== null) {
            if (state$108.dehydrated !== null)
              return pushPrimaryTreeSuspenseHandler(workInProgress), workInProgress.flags |= 128, null;
            state$108 = propagateParentContextChanges(current, workInProgress, renderLanes, false);
            var primaryChildLanes = workInProgress.child.childLanes;
            if (state$108 || (renderLanes & primaryChildLanes) !== 0)
              return updateSuspenseComponent(current, workInProgress, renderLanes);
            pushPrimaryTreeSuspenseHandler(workInProgress);
            current = bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
            return current !== null ? current.sibling : null;
          }
          pushPrimaryTreeSuspenseHandler(workInProgress);
          break;
        case 19:
          if (workInProgress.flags & 128)
            return updateSuspenseListComponent(current, workInProgress, renderLanes);
          primaryChildLanes = (current.flags & 128) !== 0;
          state$108 = (renderLanes & workInProgress.childLanes) !== 0;
          state$108 || (propagateParentContextChanges(current, workInProgress, renderLanes, false), state$108 = (renderLanes & workInProgress.childLanes) !== 0);
          if (primaryChildLanes) {
            if (state$108)
              return updateSuspenseListComponent(current, workInProgress, renderLanes);
            workInProgress.flags |= 128;
          }
          primaryChildLanes = workInProgress.memoizedState;
          primaryChildLanes !== null && (primaryChildLanes.rendering = null, primaryChildLanes.tail = null, primaryChildLanes.lastEffect = null);
          pushSuspenseListContext(workInProgress, suspenseStackCursor.current);
          if (state$108)
            break;
          else
            return null;
        case 22:
          return workInProgress.lanes = 0, updateOffscreenComponent(current, workInProgress, renderLanes, workInProgress.pendingProps);
        case 24:
          pushProvider(workInProgress, CacheContext, current.memoizedState.cache);
      }
      return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
    }
    function beginWork(current, workInProgress, renderLanes) {
      if (current !== null)
        if (current.memoizedProps !== workInProgress.pendingProps)
          didReceiveUpdate = true;
        else {
          if (!checkScheduledUpdateOrContext(current, renderLanes) && (workInProgress.flags & 128) === 0)
            return didReceiveUpdate = false, attemptEarlyBailoutIfNoScheduledUpdate(current, workInProgress, renderLanes);
          didReceiveUpdate = (current.flags & 131072) !== 0 ? true : false;
        }
      else
        didReceiveUpdate = false, isHydrating && (workInProgress.flags & 1048576) !== 0 && pushTreeId(workInProgress, treeForkCount, workInProgress.index);
      workInProgress.lanes = 0;
      switch (workInProgress.tag) {
        case 16:
          a: {
            var props = workInProgress.pendingProps;
            current = resolveLazy(workInProgress.elementType);
            workInProgress.type = current;
            if (typeof current === "function")
              shouldConstruct(current) ? (props = resolveClassComponentProps(current, props), workInProgress.tag = 1, workInProgress = updateClassComponent(null, workInProgress, current, props, renderLanes)) : (workInProgress.tag = 0, workInProgress = updateFunctionComponent(null, workInProgress, current, props, renderLanes));
            else {
              if (current !== undefined && current !== null) {
                var $$typeof = current.$$typeof;
                if ($$typeof === REACT_FORWARD_REF_TYPE) {
                  workInProgress.tag = 11;
                  workInProgress = updateForwardRef(null, workInProgress, current, props, renderLanes);
                  break a;
                } else if ($$typeof === REACT_MEMO_TYPE) {
                  workInProgress.tag = 14;
                  workInProgress = updateMemoComponent(null, workInProgress, current, props, renderLanes);
                  break a;
                } else if ($$typeof === REACT_CONTEXT_TYPE) {
                  workInProgress.tag = 10;
                  workInProgress.type = current;
                  workInProgress = updateContextProvider(null, workInProgress, renderLanes);
                  break a;
                }
              }
              workInProgress = getComponentNameFromType(current) || current;
              throw Error(formatProdErrorMessage(306, workInProgress, ""));
            }
          }
          return workInProgress;
        case 0:
          return updateFunctionComponent(current, workInProgress, workInProgress.type, workInProgress.pendingProps, renderLanes);
        case 1:
          return props = workInProgress.type, $$typeof = resolveClassComponentProps(props, workInProgress.pendingProps), updateClassComponent(current, workInProgress, props, $$typeof, renderLanes);
        case 3:
          a: {
            pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
            if (current === null)
              throw Error(formatProdErrorMessage(387));
            props = workInProgress.pendingProps;
            var prevState = workInProgress.memoizedState;
            $$typeof = prevState.element;
            cloneUpdateQueue(current, workInProgress);
            processUpdateQueue(workInProgress, props, null, renderLanes);
            var nextState = workInProgress.memoizedState;
            props = nextState.cache;
            pushProvider(workInProgress, CacheContext, props);
            props !== prevState.cache && propagateContextChanges(workInProgress, [CacheContext], renderLanes, true);
            suspendIfUpdateReadFromEntangledAsyncAction();
            props = nextState.element;
            if (prevState.isDehydrated)
              if (prevState = {
                element: props,
                isDehydrated: false,
                cache: nextState.cache
              }, workInProgress.updateQueue.baseState = prevState, workInProgress.memoizedState = prevState, workInProgress.flags & 256) {
                workInProgress = mountHostRootWithoutHydrating(current, workInProgress, props, renderLanes);
                break a;
              } else if (props !== $$typeof) {
                $$typeof = createCapturedValueAtFiber(Error(formatProdErrorMessage(424)), workInProgress);
                queueHydrationError($$typeof);
                workInProgress = mountHostRootWithoutHydrating(current, workInProgress, props, renderLanes);
                break a;
              } else {
                current = workInProgress.stateNode.containerInfo;
                switch (current.nodeType) {
                  case 9:
                    current = current.body;
                    break;
                  default:
                    current = current.nodeName === "HTML" ? current.ownerDocument.body : current;
                }
                nextHydratableInstance = getNextHydratable(current.firstChild);
                hydrationParentFiber = workInProgress;
                isHydrating = true;
                hydrationErrors = null;
                rootOrSingletonContext = true;
                renderLanes = mountChildFibers(workInProgress, null, props, renderLanes);
                for (workInProgress.child = renderLanes;renderLanes; )
                  renderLanes.flags = renderLanes.flags & -3 | 134221824, renderLanes = renderLanes.sibling;
              }
            else {
              resetHydrationState();
              if (props === $$typeof) {
                workInProgress = bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
                break a;
              }
              reconcileChildren(current, workInProgress, props, renderLanes);
            }
            workInProgress = workInProgress.child;
          }
          return workInProgress;
        case 26:
          return markRef(current, workInProgress), current === null ? (renderLanes = getResource(workInProgress.type, null, workInProgress.pendingProps, null)) ? workInProgress.memoizedState = renderLanes : isHydrating || (workInProgress.stateNode = createHoistableInstance(workInProgress.type, workInProgress.pendingProps, rootInstanceStackCursor.current, workInProgress)) : workInProgress.memoizedState = getResource(workInProgress.type, current.memoizedProps, workInProgress.pendingProps, current.memoizedState), null;
        case 27:
          return pushHostContext(workInProgress), current === null && isHydrating && (props = workInProgress.stateNode = resolveSingletonInstance(workInProgress.type, workInProgress.pendingProps, rootInstanceStackCursor.current), hydrationParentFiber = workInProgress, rootOrSingletonContext = true, $$typeof = nextHydratableInstance, isSingletonScope(workInProgress.type) ? (previousHydratableOnEnteringScopedSingleton = $$typeof, nextHydratableInstance = getNextHydratable(props.firstChild)) : nextHydratableInstance = $$typeof), reconcileChildren(current, workInProgress, workInProgress.pendingProps.children, renderLanes), markRef(current, workInProgress), current === null && (workInProgress.flags |= 4194304), workInProgress.child;
        case 5:
          if (current === null && isHydrating) {
            if ($$typeof = props = nextHydratableInstance)
              props = canHydrateInstance(props, workInProgress.type, workInProgress.pendingProps, rootOrSingletonContext), props !== null ? (workInProgress.stateNode = props, hydrationParentFiber = workInProgress, nextHydratableInstance = getNextHydratable(props.firstChild), rootOrSingletonContext = false, $$typeof = true) : $$typeof = false;
            $$typeof || throwOnHydrationMismatch(workInProgress);
          }
          pushHostContext(workInProgress);
          $$typeof = workInProgress.type;
          prevState = workInProgress.pendingProps;
          nextState = current !== null ? current.memoizedProps : null;
          props = prevState.children;
          shouldSetTextContent($$typeof, prevState) ? props = null : nextState !== null && shouldSetTextContent($$typeof, nextState) && (workInProgress.flags |= 32);
          workInProgress.memoizedState !== null && ($$typeof = renderWithHooks(current, workInProgress, TransitionAwareHostComponent, null, null, renderLanes), HostTransitionContext._currentValue = $$typeof);
          markRef(current, workInProgress);
          reconcileChildren(current, workInProgress, props, renderLanes);
          return workInProgress.child;
        case 6:
          if (current === null && isHydrating) {
            if (current = renderLanes = nextHydratableInstance)
              renderLanes = canHydrateTextInstance(renderLanes, workInProgress.pendingProps, rootOrSingletonContext), renderLanes !== null ? (workInProgress.stateNode = renderLanes, hydrationParentFiber = workInProgress, nextHydratableInstance = null, current = true) : current = false;
            current || throwOnHydrationMismatch(workInProgress);
          }
          return null;
        case 13:
          return updateSuspenseComponent(current, workInProgress, renderLanes);
        case 4:
          return pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo), props = workInProgress.pendingProps, current === null ? workInProgress.child = reconcileChildFibers(workInProgress, null, props, renderLanes) : reconcileChildren(current, workInProgress, props, renderLanes), workInProgress.child;
        case 11:
          return updateForwardRef(current, workInProgress, workInProgress.type, workInProgress.pendingProps, renderLanes);
        case 7:
          return props = workInProgress.pendingProps, markRef(current, workInProgress), reconcileChildren(current, workInProgress, props, renderLanes), workInProgress.child;
        case 8:
          return reconcileChildren(current, workInProgress, workInProgress.pendingProps.children, renderLanes), workInProgress.child;
        case 12:
          return reconcileChildren(current, workInProgress, workInProgress.pendingProps.children, renderLanes), workInProgress.child;
        case 10:
          return updateContextProvider(current, workInProgress, renderLanes);
        case 9:
          return $$typeof = workInProgress.type._context, props = workInProgress.pendingProps.children, prepareToReadContext(workInProgress), $$typeof = readContext($$typeof), props = props($$typeof), workInProgress.flags |= 1, reconcileChildren(current, workInProgress, props, renderLanes), workInProgress.child;
        case 14:
          return updateMemoComponent(current, workInProgress, workInProgress.type, workInProgress.pendingProps, renderLanes);
        case 15:
          return updateSimpleMemoComponent(current, workInProgress, workInProgress.type, workInProgress.pendingProps, renderLanes);
        case 19:
          return updateSuspenseListComponent(current, workInProgress, renderLanes);
        case 31:
          return updateActivityComponent(current, workInProgress, renderLanes);
        case 22:
          return updateOffscreenComponent(current, workInProgress, renderLanes, workInProgress.pendingProps);
        case 24:
          return prepareToReadContext(workInProgress), props = readContext(CacheContext), current === null ? ($$typeof = peekCacheFromPool(), $$typeof === null && ($$typeof = workInProgressRoot, prevState = createCache(), $$typeof.pooledCache = prevState, prevState.refCount++, prevState !== null && ($$typeof.pooledCacheLanes |= renderLanes), $$typeof = prevState), workInProgress.memoizedState = { parent: props, cache: $$typeof }, initializeUpdateQueue(workInProgress), pushProvider(workInProgress, CacheContext, $$typeof)) : ((current.lanes & renderLanes) !== 0 && (cloneUpdateQueue(current, workInProgress), processUpdateQueue(workInProgress, null, null, renderLanes), suspendIfUpdateReadFromEntangledAsyncAction()), $$typeof = current.memoizedState, prevState = workInProgress.memoizedState, $$typeof.parent !== props ? ($$typeof = { parent: props, cache: props }, workInProgress.memoizedState = $$typeof, workInProgress.lanes === 0 && (workInProgress.memoizedState = workInProgress.updateQueue.baseState = $$typeof), pushProvider(workInProgress, CacheContext, props)) : (props = prevState.cache, pushProvider(workInProgress, CacheContext, props), props !== $$typeof.cache && propagateContextChanges(workInProgress, [CacheContext], renderLanes, true))), reconcileChildren(current, workInProgress, workInProgress.pendingProps.children, renderLanes), workInProgress.child;
        case 30:
          return workInProgress.stateNode === null && (workInProgress.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }), props = workInProgress.pendingProps, props.name != null && props.name !== "auto" ? workInProgress.flags |= current === null ? 18882560 : 18874368 : isHydrating && pushMaterializedTreeId(workInProgress), current !== null && current.memoizedProps.name !== props.name ? workInProgress.flags |= 4194816 : markRef(current, workInProgress), reconcileChildren(current, workInProgress, props.children, renderLanes), workInProgress.child;
        case 29:
          throw workInProgress.pendingProps;
      }
      throw Error(formatProdErrorMessage(156, workInProgress.tag));
    }
    function markUpdate(workInProgress) {
      workInProgress.flags |= 4;
    }
    function preloadInstanceAndSuspendIfNeeded(workInProgress, type, oldProps, newProps, renderLanes) {
      var JSCompiler_temp;
      if (JSCompiler_temp = (workInProgress.mode & 32) !== 0)
        JSCompiler_temp = oldProps === null ? maySuspendCommit(type, newProps) : maySuspendCommit(type, newProps) && (newProps.src !== oldProps.src || newProps.srcSet !== oldProps.srcSet);
      if (JSCompiler_temp) {
        if (workInProgress.flags |= 16777216, (renderLanes & 335544128) === renderLanes)
          if (workInProgress.stateNode.complete)
            workInProgress.flags |= 8192;
          else if (shouldRemainOnPreviousScreen())
            workInProgress.flags |= 8192;
          else
            throw suspendedThenable = noopSuspenseyCommitThenable, SuspenseyCommitException;
      } else
        workInProgress.flags &= -16777217;
    }
    function preloadResourceAndSuspendIfNeeded(workInProgress, resource) {
      if (resource.type !== "stylesheet" || (resource.state.loading & 4) !== 0)
        workInProgress.flags &= -16777217;
      else if (workInProgress.flags |= 16777216, !preloadResource(resource))
        if (shouldRemainOnPreviousScreen())
          workInProgress.flags |= 8192;
        else
          throw suspendedThenable = noopSuspenseyCommitThenable, SuspenseyCommitException;
    }
    function scheduleRetryEffect(workInProgress, retryQueue) {
      retryQueue !== null && (workInProgress.flags |= 4);
      workInProgress.flags & 16384 && (retryQueue = workInProgress.tag !== 22 ? claimNextRetryLane() : 536870912, workInProgress.lanes |= retryQueue, workInProgressSuspendedRetryLanes |= retryQueue);
    }
    function cutOffTailIfNeeded(renderState, hasRenderedATailFallback) {
      if (!isHydrating)
        switch (renderState.tailMode) {
          case "visible":
            break;
          case "collapsed":
            for (var tailNode = renderState.tail, lastTailNode = null;tailNode !== null; )
              tailNode.alternate !== null && (lastTailNode = tailNode), tailNode = tailNode.sibling;
            lastTailNode === null ? hasRenderedATailFallback || renderState.tail === null ? renderState.tail = null : renderState.tail.sibling = null : lastTailNode.sibling = null;
            break;
          default:
            hasRenderedATailFallback = renderState.tail;
            for (tailNode = null;hasRenderedATailFallback !== null; )
              hasRenderedATailFallback.alternate !== null && (tailNode = hasRenderedATailFallback), hasRenderedATailFallback = hasRenderedATailFallback.sibling;
            tailNode === null ? renderState.tail = null : tailNode.sibling = null;
        }
    }
    function bubbleProperties(completedWork) {
      var didBailout = completedWork.alternate !== null && completedWork.alternate.child === completedWork.child, newChildLanes = 0, subtreeFlags = 0;
      if (didBailout)
        for (var child$113 = completedWork.child;child$113 !== null; )
          newChildLanes |= child$113.lanes | child$113.childLanes, subtreeFlags |= child$113.subtreeFlags & 1206910976, subtreeFlags |= child$113.flags & 1206910976, child$113.return = completedWork, child$113 = child$113.sibling;
      else
        for (child$113 = completedWork.child;child$113 !== null; )
          newChildLanes |= child$113.lanes | child$113.childLanes, subtreeFlags |= child$113.subtreeFlags, subtreeFlags |= child$113.flags, child$113.return = completedWork, child$113 = child$113.sibling;
      completedWork.subtreeFlags |= subtreeFlags;
      completedWork.childLanes = newChildLanes;
      return didBailout;
    }
    function completeWork(current, workInProgress, renderLanes) {
      var newProps = workInProgress.pendingProps;
      popTreeContext(workInProgress);
      switch (workInProgress.tag) {
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return bubbleProperties(workInProgress), null;
        case 1:
          return bubbleProperties(workInProgress), null;
        case 3:
          renderLanes = workInProgress.stateNode;
          newProps = null;
          current !== null && (newProps = current.memoizedState.cache);
          workInProgress.memoizedState.cache !== newProps && (workInProgress.flags |= 2048);
          popProvider(CacheContext);
          popHostContainer();
          renderLanes.pendingContext && (renderLanes.context = renderLanes.pendingContext, renderLanes.pendingContext = null);
          if (current === null || current.child === null)
            popHydrationState(workInProgress) ? markUpdate(workInProgress) : current === null || current.memoizedState.isDehydrated && (workInProgress.flags & 256) === 0 || (workInProgress.flags |= 1024, upgradeHydrationErrorsToRecoverable());
          bubbleProperties(workInProgress);
          return null;
        case 26:
          var { type, memoizedState: nextResource } = workInProgress;
          current === null ? (markUpdate(workInProgress), nextResource !== null ? (bubbleProperties(workInProgress), preloadResourceAndSuspendIfNeeded(workInProgress, nextResource)) : (bubbleProperties(workInProgress), preloadInstanceAndSuspendIfNeeded(workInProgress, type, null, newProps, renderLanes))) : nextResource ? nextResource !== current.memoizedState ? (markUpdate(workInProgress), bubbleProperties(workInProgress), preloadResourceAndSuspendIfNeeded(workInProgress, nextResource)) : (bubbleProperties(workInProgress), workInProgress.flags &= -16777217) : (current = current.memoizedProps, current !== newProps && markUpdate(workInProgress), bubbleProperties(workInProgress), preloadInstanceAndSuspendIfNeeded(workInProgress, type, current, newProps, renderLanes));
          return null;
        case 27:
          popHostContext(workInProgress);
          renderLanes = rootInstanceStackCursor.current;
          type = workInProgress.type;
          if (current !== null && workInProgress.stateNode != null)
            current.memoizedProps !== newProps && markUpdate(workInProgress);
          else {
            if (!newProps) {
              if (workInProgress.stateNode === null)
                throw Error(formatProdErrorMessage(166));
              bubbleProperties(workInProgress);
              workInProgress.subtreeFlags &= -33554433;
              return null;
            }
            current = contextStackCursor.current;
            popHydrationState(workInProgress) ? prepareToHydrateHostInstance(workInProgress, current) : (current = resolveSingletonInstance(type, newProps, renderLanes), workInProgress.stateNode = current, markUpdate(workInProgress));
          }
          bubbleProperties(workInProgress);
          workInProgress.subtreeFlags &= -33554433;
          return null;
        case 5:
          popHostContext(workInProgress);
          type = workInProgress.type;
          if (current !== null && workInProgress.stateNode != null)
            current.memoizedProps !== newProps && markUpdate(workInProgress);
          else {
            if (!newProps) {
              if (workInProgress.stateNode === null)
                throw Error(formatProdErrorMessage(166));
              bubbleProperties(workInProgress);
              workInProgress.subtreeFlags &= -33554433;
              return null;
            }
            nextResource = contextStackCursor.current;
            if (popHydrationState(workInProgress))
              prepareToHydrateHostInstance(workInProgress, nextResource);
            else {
              var ownerDocument = getOwnerDocumentFromRootContainer(rootInstanceStackCursor.current);
              switch (nextResource) {
                case 1:
                  nextResource = ownerDocument.createElementNS("http://www.w3.org/2000/svg", type);
                  break;
                case 2:
                  nextResource = ownerDocument.createElementNS("http://www.w3.org/1998/Math/MathML", type);
                  break;
                default:
                  switch (type) {
                    case "svg":
                      nextResource = ownerDocument.createElementNS("http://www.w3.org/2000/svg", type);
                      break;
                    case "math":
                      nextResource = ownerDocument.createElementNS("http://www.w3.org/1998/Math/MathML", type);
                      break;
                    case "script":
                      nextResource = ownerDocument.createElement("div");
                      nextResource.innerHTML = "<script></script>";
                      nextResource = nextResource.removeChild(nextResource.firstChild);
                      break;
                    case "select":
                      nextResource = typeof newProps.is === "string" ? ownerDocument.createElement("select", {
                        is: newProps.is
                      }) : ownerDocument.createElement("select");
                      newProps.multiple ? nextResource.multiple = true : newProps.size && (nextResource.size = newProps.size);
                      break;
                    default:
                      nextResource = typeof newProps.is === "string" ? ownerDocument.createElement(type, { is: newProps.is }) : ownerDocument.createElement(type);
                  }
              }
              nextResource[internalInstanceKey] = workInProgress;
              nextResource[internalPropsKey] = newProps;
              a:
                for (ownerDocument = workInProgress.child;ownerDocument !== null; ) {
                  if (ownerDocument.tag === 5 || ownerDocument.tag === 6)
                    nextResource.appendChild(ownerDocument.stateNode);
                  else if (ownerDocument.tag !== 4 && ownerDocument.tag !== 27 && ownerDocument.child !== null) {
                    ownerDocument.child.return = ownerDocument;
                    ownerDocument = ownerDocument.child;
                    continue;
                  }
                  if (ownerDocument === workInProgress)
                    break a;
                  for (;ownerDocument.sibling === null; ) {
                    if (ownerDocument.return === null || ownerDocument.return === workInProgress)
                      break a;
                    ownerDocument = ownerDocument.return;
                  }
                  ownerDocument.sibling.return = ownerDocument.return;
                  ownerDocument = ownerDocument.sibling;
                }
              workInProgress.stateNode = nextResource;
              a:
                switch (setInitialProperties(nextResource, type, newProps), type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    newProps = !!newProps.autoFocus;
                    break a;
                  case "img":
                    newProps = true;
                    break a;
                  default:
                    newProps = false;
                }
              newProps && markUpdate(workInProgress);
            }
          }
          bubbleProperties(workInProgress);
          workInProgress.subtreeFlags &= -33554433;
          preloadInstanceAndSuspendIfNeeded(workInProgress, workInProgress.type, current === null ? null : current.memoizedProps, workInProgress.pendingProps, renderLanes);
          return null;
        case 6:
          if (current && workInProgress.stateNode != null)
            current.memoizedProps !== newProps && markUpdate(workInProgress);
          else {
            if (typeof newProps !== "string" && workInProgress.stateNode === null)
              throw Error(formatProdErrorMessage(166));
            current = rootInstanceStackCursor.current;
            if (popHydrationState(workInProgress)) {
              current = workInProgress.stateNode;
              renderLanes = workInProgress.memoizedProps;
              newProps = null;
              type = hydrationParentFiber;
              if (type !== null)
                switch (type.tag) {
                  case 27:
                  case 5:
                    newProps = type.memoizedProps;
                }
              current[internalInstanceKey] = workInProgress;
              current = current.nodeValue === renderLanes || newProps !== null && newProps.suppressHydrationWarning === true || checkForUnmatchedText(current.nodeValue, renderLanes) ? true : false;
              current || throwOnHydrationMismatch(workInProgress, true);
            } else
              current = getOwnerDocumentFromRootContainer(current).createTextNode(newProps), current[internalInstanceKey] = workInProgress, workInProgress.stateNode = current;
          }
          bubbleProperties(workInProgress);
          return null;
        case 31:
          renderLanes = workInProgress.memoizedState;
          if (current === null || current.memoizedState !== null) {
            newProps = popHydrationState(workInProgress);
            if (renderLanes !== null) {
              if (current === null) {
                if (!newProps)
                  throw Error(formatProdErrorMessage(318));
                current = workInProgress.memoizedState;
                current = current !== null ? current.dehydrated : null;
                if (!current)
                  throw Error(formatProdErrorMessage(557));
                current[internalInstanceKey] = workInProgress;
              } else
                resetHydrationState(), (workInProgress.flags & 128) === 0 && (workInProgress.memoizedState = null), workInProgress.flags |= 4;
              bubbleProperties(workInProgress);
              current = false;
            } else
              renderLanes = upgradeHydrationErrorsToRecoverable(), current !== null && current.memoizedState !== null && (current.memoizedState.hydrationErrors = renderLanes), current = true;
            if (!current) {
              if (workInProgress.flags & 256)
                return popSuspenseHandler(workInProgress), workInProgress;
              popSuspenseHandler(workInProgress);
              return null;
            }
            if ((workInProgress.flags & 128) !== 0)
              throw Error(formatProdErrorMessage(558));
          }
          bubbleProperties(workInProgress);
          return null;
        case 13:
          newProps = workInProgress.memoizedState;
          if (current === null || current.memoizedState !== null && current.memoizedState.dehydrated !== null) {
            type = popHydrationState(workInProgress);
            if (newProps !== null && newProps.dehydrated !== null) {
              if (current === null) {
                if (!type)
                  throw Error(formatProdErrorMessage(318));
                type = workInProgress.memoizedState;
                type = type !== null ? type.dehydrated : null;
                if (!type)
                  throw Error(formatProdErrorMessage(317));
                type[internalInstanceKey] = workInProgress;
              } else
                resetHydrationState(), (workInProgress.flags & 128) === 0 && (workInProgress.memoizedState = null), workInProgress.flags |= 4;
              bubbleProperties(workInProgress);
              type = false;
            } else
              type = upgradeHydrationErrorsToRecoverable(), current !== null && current.memoizedState !== null && (current.memoizedState.hydrationErrors = type), type = true;
            if (!type) {
              if (workInProgress.flags & 256)
                return popSuspenseHandler(workInProgress), workInProgress;
              popSuspenseHandler(workInProgress);
              return null;
            }
          }
          popSuspenseHandler(workInProgress);
          if ((workInProgress.flags & 128) !== 0)
            return workInProgress.lanes = renderLanes, workInProgress;
          renderLanes = newProps !== null;
          current = current !== null && current.memoizedState !== null;
          renderLanes && (newProps = workInProgress.child, type = null, newProps.alternate !== null && newProps.alternate.memoizedState !== null && newProps.alternate.memoizedState.cachePool !== null && (type = newProps.alternate.memoizedState.cachePool.pool), nextResource = null, newProps.memoizedState !== null && newProps.memoizedState.cachePool !== null && (nextResource = newProps.memoizedState.cachePool.pool), nextResource !== type && (newProps.flags |= 2048));
          renderLanes !== current && renderLanes && (workInProgress.child.flags |= 8192);
          scheduleRetryEffect(workInProgress, workInProgress.updateQueue);
          bubbleProperties(workInProgress);
          return null;
        case 4:
          return popHostContainer(), current === null && listenToAllSupportedEvents(workInProgress.stateNode.containerInfo), workInProgress.flags |= 67108864, bubbleProperties(workInProgress), null;
        case 10:
          return popProvider(workInProgress.type), bubbleProperties(workInProgress), null;
        case 19:
          popSuspenseListContext(workInProgress);
          newProps = workInProgress.memoizedState;
          if (newProps === null)
            return bubbleProperties(workInProgress), null;
          type = (workInProgress.flags & 128) !== 0;
          nextResource = newProps.rendering;
          if (nextResource === null)
            if (type)
              cutOffTailIfNeeded(newProps, false);
            else {
              if (workInProgressRootExitStatus !== 0 || current !== null && (current.flags & 128) !== 0)
                for (current = workInProgress.child;current !== null; ) {
                  nextResource = findFirstSuspended(current);
                  if (nextResource !== null) {
                    workInProgress.flags |= 128;
                    cutOffTailIfNeeded(newProps, false);
                    current = nextResource.updateQueue;
                    workInProgress.updateQueue = current;
                    scheduleRetryEffect(workInProgress, current);
                    workInProgress.subtreeFlags = 0;
                    current = renderLanes;
                    for (renderLanes = workInProgress.child;renderLanes !== null; )
                      resetWorkInProgress(renderLanes, current), renderLanes = renderLanes.sibling;
                    pushSuspenseListContext(workInProgress, suspenseStackCursor.current & 1 | 2);
                    isHydrating && pushTreeFork(workInProgress, newProps.treeForkCount);
                    return workInProgress.child;
                  }
                  current = current.sibling;
                }
              newProps.tail !== null && now() > workInProgressRootRenderTargetTime && (workInProgress.flags |= 128, type = true, cutOffTailIfNeeded(newProps, false), workInProgress.lanes = 4194304);
            }
          else {
            if (!type)
              if (current = findFirstSuspended(nextResource), current !== null) {
                if (workInProgress.flags |= 128, type = true, current = current.updateQueue, workInProgress.updateQueue = current, scheduleRetryEffect(workInProgress, current), cutOffTailIfNeeded(newProps, true), newProps.tail === null && newProps.tailMode !== "collapsed" && newProps.tailMode !== "visible" && !nextResource.alternate && !isHydrating)
                  return bubbleProperties(workInProgress), null;
              } else
                2 * now() - newProps.renderingStartTime > workInProgressRootRenderTargetTime && renderLanes !== 536870912 && (workInProgress.flags |= 128, type = true, cutOffTailIfNeeded(newProps, false), workInProgress.lanes = 4194304);
            newProps.isBackwards ? (nextResource.sibling = workInProgress.child, workInProgress.child = nextResource) : (current = newProps.last, current !== null ? current.sibling = nextResource : workInProgress.child = nextResource, newProps.last = nextResource);
          }
          if (newProps.tail !== null) {
            current = newProps.tail;
            a: {
              for (renderLanes = current;renderLanes !== null; ) {
                if (renderLanes.alternate !== null) {
                  renderLanes = false;
                  break a;
                }
                renderLanes = renderLanes.sibling;
              }
              renderLanes = true;
            }
            newProps.rendering = current;
            newProps.tail = current.sibling;
            newProps.renderingStartTime = now();
            current.sibling = null;
            nextResource = suspenseStackCursor.current;
            nextResource = type ? nextResource & 1 | 2 : nextResource & 1;
            newProps.tailMode === "visible" || newProps.tailMode === "collapsed" || !renderLanes || isHydrating ? pushSuspenseListContext(workInProgress, nextResource) : (renderLanes = nextResource, push(suspenseHandlerStackCursor, workInProgress), push(suspenseStackCursor, renderLanes), shellBoundary === null && (shellBoundary = workInProgress));
            isHydrating && pushTreeFork(workInProgress, newProps.treeForkCount);
            return current;
          }
          bubbleProperties(workInProgress);
          return null;
        case 22:
        case 23:
          return popSuspenseHandler(workInProgress), popHiddenContext(), newProps = workInProgress.memoizedState !== null, current !== null ? current.memoizedState !== null !== newProps && (workInProgress.flags |= 8192) : newProps && (workInProgress.flags |= 8192), newProps ? (renderLanes & 536870912) !== 0 && (workInProgress.flags & 128) === 0 && (bubbleProperties(workInProgress), workInProgress.subtreeFlags & 6 && (workInProgress.flags |= 8192)) : bubbleProperties(workInProgress), renderLanes = workInProgress.updateQueue, renderLanes !== null && scheduleRetryEffect(workInProgress, renderLanes.retryQueue), renderLanes = null, current !== null && current.memoizedState !== null && current.memoizedState.cachePool !== null && (renderLanes = current.memoizedState.cachePool.pool), newProps = null, workInProgress.memoizedState !== null && workInProgress.memoizedState.cachePool !== null && (newProps = workInProgress.memoizedState.cachePool.pool), newProps !== renderLanes && (workInProgress.flags |= 2048), current !== null && pop(resumedCache), null;
        case 24:
          return renderLanes = null, current !== null && (renderLanes = current.memoizedState.cache), workInProgress.memoizedState.cache !== renderLanes && (workInProgress.flags |= 2048), popProvider(CacheContext), bubbleProperties(workInProgress), null;
        case 25:
          return null;
        case 30:
          return workInProgress.flags |= 33554432, bubbleProperties(workInProgress), null;
      }
      throw Error(formatProdErrorMessage(156, workInProgress.tag));
    }
    function unwindWork(current, workInProgress) {
      popTreeContext(workInProgress);
      switch (workInProgress.tag) {
        case 1:
          return current = workInProgress.flags, current & 65536 ? (workInProgress.flags = current & -65537 | 128, workInProgress) : null;
        case 3:
          return popProvider(CacheContext), popHostContainer(), current = workInProgress.flags, (current & 65536) !== 0 && (current & 128) === 0 ? (workInProgress.flags = current & -65537 | 128, workInProgress) : null;
        case 26:
        case 27:
        case 5:
          return popHostContext(workInProgress), null;
        case 31:
          if (workInProgress.memoizedState !== null) {
            popSuspenseHandler(workInProgress);
            if (workInProgress.alternate === null)
              throw Error(formatProdErrorMessage(340));
            resetHydrationState();
          }
          current = workInProgress.flags;
          return current & 65536 ? (workInProgress.flags = current & -65537 | 128, workInProgress) : null;
        case 13:
          popSuspenseHandler(workInProgress);
          current = workInProgress.memoizedState;
          if (current !== null && current.dehydrated !== null) {
            if (workInProgress.alternate === null)
              throw Error(formatProdErrorMessage(340));
            resetHydrationState();
          }
          current = workInProgress.flags;
          return current & 65536 ? (workInProgress.flags = current & -65537 | 128, workInProgress) : null;
        case 19:
          return popSuspenseListContext(workInProgress), current = workInProgress.flags, current & 65536 ? (workInProgress.flags = current & -65537 | 128, current = workInProgress.memoizedState, current !== null && (current.rendering = null, current.tail = null), workInProgress.flags |= 4, workInProgress) : null;
        case 4:
          return popHostContainer(), null;
        case 10:
          return popProvider(workInProgress.type), null;
        case 22:
        case 23:
          return popSuspenseHandler(workInProgress), popHiddenContext(), current !== null && pop(resumedCache), current = workInProgress.flags, current & 65536 ? (workInProgress.flags = current & -65537 | 128, workInProgress) : null;
        case 24:
          return popProvider(CacheContext), null;
        case 25:
          return null;
        default:
          return null;
      }
    }
    function unwindInterruptedWork(current, interruptedWork) {
      popTreeContext(interruptedWork);
      switch (interruptedWork.tag) {
        case 3:
          popProvider(CacheContext);
          popHostContainer();
          break;
        case 26:
        case 27:
        case 5:
          popHostContext(interruptedWork);
          break;
        case 4:
          popHostContainer();
          break;
        case 31:
          interruptedWork.memoizedState !== null && popSuspenseHandler(interruptedWork);
          break;
        case 13:
          popSuspenseHandler(interruptedWork);
          break;
        case 19:
          popSuspenseListContext(interruptedWork);
          break;
        case 10:
          popProvider(interruptedWork.type);
          break;
        case 22:
        case 23:
          popSuspenseHandler(interruptedWork);
          popHiddenContext();
          current !== null && pop(resumedCache);
          break;
        case 24:
          popProvider(CacheContext);
      }
    }
    function commitHookEffectListMount(flags, finishedWork) {
      try {
        var updateQueue = finishedWork.updateQueue, lastEffect = updateQueue !== null ? updateQueue.lastEffect : null;
        if (lastEffect !== null) {
          var firstEffect = lastEffect.next;
          updateQueue = firstEffect;
          do {
            if ((updateQueue.tag & flags) === flags) {
              lastEffect = undefined;
              var create = updateQueue.create, inst = updateQueue.inst;
              lastEffect = create();
              inst.destroy = lastEffect;
            }
            updateQueue = updateQueue.next;
          } while (updateQueue !== firstEffect);
        }
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }
    }
    function commitHookEffectListUnmount(flags, finishedWork, nearestMountedAncestor$jscomp$0) {
      try {
        var updateQueue = finishedWork.updateQueue, lastEffect = updateQueue !== null ? updateQueue.lastEffect : null;
        if (lastEffect !== null) {
          var firstEffect = lastEffect.next;
          updateQueue = firstEffect;
          do {
            if ((updateQueue.tag & flags) === flags) {
              var inst = updateQueue.inst, destroy = inst.destroy;
              if (destroy !== undefined) {
                inst.destroy = undefined;
                lastEffect = finishedWork;
                var nearestMountedAncestor = nearestMountedAncestor$jscomp$0, destroy_ = destroy;
                try {
                  destroy_();
                } catch (error) {
                  captureCommitPhaseError(lastEffect, nearestMountedAncestor, error);
                }
              }
            }
            updateQueue = updateQueue.next;
          } while (updateQueue !== firstEffect);
        }
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }
    }
    function commitClassCallbacks(finishedWork) {
      var updateQueue = finishedWork.updateQueue;
      if (updateQueue !== null) {
        var instance = finishedWork.stateNode;
        try {
          commitCallbacks(updateQueue, instance);
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
    }
    function safelyCallComponentWillUnmount(current, nearestMountedAncestor, instance) {
      instance.props = resolveClassComponentProps(current.type, current.memoizedProps);
      instance.state = current.memoizedState;
      try {
        instance.componentWillUnmount();
      } catch (error) {
        captureCommitPhaseError(current, nearestMountedAncestor, error);
      }
    }
    function safelyAttachRef(current, nearestMountedAncestor) {
      try {
        var ref = current.ref;
        if (ref !== null) {
          switch (current.tag) {
            case 26:
            case 27:
            case 5:
              var instanceToUse = current.stateNode;
              break;
            case 30:
              var instance = current.stateNode, name = getViewTransitionName(current.memoizedProps, instance);
              if (instance.ref === null || instance.ref.name !== name)
                instance.ref = createViewTransitionInstance(name);
              instanceToUse = instance.ref;
              break;
            case 7:
              if (current.stateNode === null) {
                var fragmentInstance = new FragmentInstance(current);
                traverseVisibleInstancesAndTextInstances(current.child, false, addFragmentHandleToFiber, fragmentInstance, undefined, undefined);
                current.stateNode = fragmentInstance;
              }
              instanceToUse = current.stateNode;
              break;
            default:
              instanceToUse = current.stateNode;
          }
          typeof ref === "function" ? current.refCleanup = ref(instanceToUse) : ref.current = instanceToUse;
        }
      } catch (error) {
        captureCommitPhaseError(current, nearestMountedAncestor, error);
      }
    }
    function safelyDetachRef(current, nearestMountedAncestor) {
      var ref = current.ref, refCleanup = current.refCleanup;
      if (ref !== null)
        if (typeof refCleanup === "function")
          try {
            refCleanup();
          } catch (error) {
            captureCommitPhaseError(current, nearestMountedAncestor, error);
          } finally {
            current.refCleanup = null, current = current.alternate, current != null && (current.refCleanup = null);
          }
        else if (typeof ref === "function")
          try {
            ref(null);
          } catch (error$148) {
            captureCommitPhaseError(current, nearestMountedAncestor, error$148);
          }
        else
          ref.current = null;
    }
    function commitNewChildToFragmentInstances(fiber, parentFragmentInstances) {
      if ((fiber.tag === 5 || fiber.tag === 27 || fiber.tag === 6) && fiber.alternate === null && parentFragmentInstances !== null)
        for (var i = 0;i < parentFragmentInstances.length; i++)
          commitNewChildToFragmentInstance(fiber.stateNode, parentFragmentInstances[i]);
    }
    function commitFragmentInstanceInsertionEffects(fiber) {
      for (var parent = fiber.return;parent !== null; ) {
        isFragmentInstanceParent(parent) && commitNewChildToFragmentInstance(fiber.stateNode, parent.stateNode);
        if (isFragmentInstanceHostBoundary(parent))
          break;
        parent = parent.return;
      }
    }
    function commitFragmentInstanceDeletionEffects(fiber) {
      for (var parent = fiber.return;parent !== null; ) {
        isFragmentInstanceParent(parent) && deleteChildFromFragmentInstance(fiber.stateNode, parent.stateNode);
        if (isFragmentInstanceHostBoundary(parent))
          break;
        parent = parent.return;
      }
    }
    function isFragmentInstanceHostBoundary(fiber) {
      return fiber.tag === 5 || fiber.tag === 3 || fiber.tag === 27;
    }
    function isFragmentInstanceParent(fiber) {
      return fiber && fiber.tag === 7 && fiber.stateNode !== null;
    }
    function commitHostMount(finishedWork) {
      var { type, memoizedProps: props, stateNode: instance } = finishedWork;
      try {
        a:
          switch (type) {
            case "button":
            case "input":
            case "select":
            case "textarea":
              props.autoFocus && instance.focus();
              break a;
            case "img":
              props.src ? instance.src = props.src : props.srcSet && (instance.srcset = props.srcSet);
          }
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }
    }
    function commitHostUpdate(finishedWork, newProps, oldProps) {
      try {
        var domElement = finishedWork.stateNode;
        updateProperties(domElement, finishedWork.type, oldProps, newProps);
        domElement[internalPropsKey] = newProps;
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }
    }
    function isHostParent(fiber) {
      return fiber.tag === 5 || fiber.tag === 3 || fiber.tag === 26 || fiber.tag === 27 && isSingletonScope(fiber.type) || fiber.tag === 4;
    }
    function getHostSibling(fiber) {
      a:
        for (;; ) {
          for (;fiber.sibling === null; ) {
            if (fiber.return === null || isHostParent(fiber.return))
              return null;
            fiber = fiber.return;
          }
          fiber.sibling.return = fiber.return;
          for (fiber = fiber.sibling;fiber.tag !== 5 && fiber.tag !== 6 && fiber.tag !== 18; ) {
            if (fiber.tag === 27 && isSingletonScope(fiber.type))
              continue a;
            if (fiber.flags & 2)
              continue a;
            if (fiber.child === null || fiber.tag === 4)
              continue a;
            else
              fiber.child.return = fiber, fiber = fiber.child;
          }
          if (!(fiber.flags & 2))
            return fiber.stateNode;
        }
    }
    function insertOrAppendPlacementNodeIntoContainer(node, before, parent, parentFragmentInstances) {
      var tag = node.tag;
      if (tag === 5 || tag === 6)
        tag = node.stateNode, before ? (parent.nodeType === 9 ? parent.body : parent.nodeName === "HTML" ? parent.ownerDocument.body : parent).insertBefore(tag, before) : (before = parent.nodeType === 9 ? parent.body : parent.nodeName === "HTML" ? parent.ownerDocument.body : parent, before.appendChild(tag), parent = parent._reactRootContainer, parent !== null && parent !== undefined || before.onclick !== null || (before.onclick = noop$1)), commitNewChildToFragmentInstances(node, parentFragmentInstances), viewTransitionMutationContext = true;
      else if (tag !== 4 && (tag === 27 && (commitNewChildToFragmentInstances(node, parentFragmentInstances), parentFragmentInstances = null, isSingletonScope(node.type) && (parent = node.stateNode, before = null)), node = node.child, node !== null))
        for (insertOrAppendPlacementNodeIntoContainer(node, before, parent, parentFragmentInstances), node = node.sibling;node !== null; )
          insertOrAppendPlacementNodeIntoContainer(node, before, parent, parentFragmentInstances), node = node.sibling;
    }
    function insertOrAppendPlacementNode(node, before, parent, parentFragmentInstances) {
      var tag = node.tag;
      if (tag === 5 || tag === 6)
        tag = node.stateNode, before ? parent.insertBefore(tag, before) : parent.appendChild(tag), commitNewChildToFragmentInstances(node, parentFragmentInstances), viewTransitionMutationContext = true;
      else if (tag !== 4 && (tag === 27 && (commitNewChildToFragmentInstances(node, parentFragmentInstances), parentFragmentInstances = null, isSingletonScope(node.type) && (parent = node.stateNode)), node = node.child, node !== null))
        for (insertOrAppendPlacementNode(node, before, parent, parentFragmentInstances), node = node.sibling;node !== null; )
          insertOrAppendPlacementNode(node, before, parent, parentFragmentInstances), node = node.sibling;
    }
    function commitHostSingletonAcquisition(finishedWork) {
      var { stateNode: singleton, memoizedProps: props } = finishedWork;
      try {
        for (var type = finishedWork.type, attributes = singleton.attributes;attributes.length; )
          singleton.removeAttributeNode(attributes[0]);
        setInitialProperties(singleton, type, props);
        singleton[internalInstanceKey] = finishedWork;
        singleton[internalPropsKey] = props;
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }
    }
    var shouldStartViewTransition = false;
    var appearingViewTransitions = null;
    function trackEnterViewTransitions(placement) {
      if (placement.tag === 30 || (placement.subtreeFlags & 33554432) !== 0)
        shouldStartViewTransition = true;
    }
    var viewTransitionCancelableChildren = null;
    function pushViewTransitionCancelableScope() {
      var prevChildren = viewTransitionCancelableChildren;
      viewTransitionCancelableChildren = null;
      return prevChildren;
    }
    var viewTransitionHostInstanceIdx = 0;
    function applyViewTransitionToHostInstances(fiber, name, className, collectMeasurements, stopAtNestedViewTransitions) {
      viewTransitionHostInstanceIdx = 0;
      return applyViewTransitionToHostInstancesRecursive(fiber.child, name, className, collectMeasurements, stopAtNestedViewTransitions);
    }
    function applyViewTransitionToHostInstancesRecursive(child, name, className, collectMeasurements, stopAtNestedViewTransitions) {
      for (var inViewport = false;child !== null; ) {
        if (child.tag === 5) {
          var instance = child.stateNode;
          if (collectMeasurements !== null) {
            var measurement = measureInstance(instance);
            collectMeasurements.push(measurement);
            measurement.view && (inViewport = true);
          } else
            inViewport || measureInstance(instance).view && (inViewport = true);
          shouldStartViewTransition = true;
          applyViewTransitionName(instance, viewTransitionHostInstanceIdx === 0 ? name : name + "_" + viewTransitionHostInstanceIdx, className);
          viewTransitionHostInstanceIdx++;
        } else if (child.tag !== 22 || child.memoizedState === null)
          child.tag === 30 && stopAtNestedViewTransitions || applyViewTransitionToHostInstancesRecursive(child.child, name, className, collectMeasurements, stopAtNestedViewTransitions) && (inViewport = true);
        child = child.sibling;
      }
      return inViewport;
    }
    function restoreViewTransitionOnHostInstances(child, stopAtNestedViewTransitions) {
      for (;child !== null; ) {
        if (child.tag === 5)
          restoreViewTransitionName(child.stateNode, child.memoizedProps);
        else if (child.tag !== 22 || child.memoizedState === null)
          child.tag === 30 && stopAtNestedViewTransitions || restoreViewTransitionOnHostInstances(child.child, stopAtNestedViewTransitions);
        child = child.sibling;
      }
    }
    function commitAppearingPairViewTransitions(placement) {
      if ((placement.subtreeFlags & 18874368) !== 0)
        for (placement = placement.child;placement !== null; ) {
          if (placement.tag !== 22 || placement.memoizedState === null) {
            if (commitAppearingPairViewTransitions(placement), placement.tag === 30 && (placement.flags & 18874368) !== 0 && placement.stateNode.paired) {
              var props = placement.memoizedProps;
              if (props.name == null || props.name === "auto")
                throw Error(formatProdErrorMessage(544));
              var name = props.name;
              props = getViewTransitionClassName(props.default, props.share);
              props !== "none" && (applyViewTransitionToHostInstances(placement, name, props, null, false) || restoreViewTransitionOnHostInstances(placement.child, false));
            }
          }
          placement = placement.sibling;
        }
    }
    function commitEnterViewTransitions(placement, gesture) {
      if (placement.tag === 30) {
        var state = placement.stateNode, props = placement.memoizedProps, name = getViewTransitionName(props, state), className = getViewTransitionClassName(props.default, state.paired ? props.share : props.enter);
        className !== "none" ? applyViewTransitionToHostInstances(placement, name, className, null, false) ? (commitAppearingPairViewTransitions(placement), state.paired || gesture || scheduleViewTransitionEvent(placement, props.onEnter)) : restoreViewTransitionOnHostInstances(placement.child, false) : commitAppearingPairViewTransitions(placement);
      } else if ((placement.subtreeFlags & 33554432) !== 0)
        for (placement = placement.child;placement !== null; )
          commitEnterViewTransitions(placement, gesture), placement = placement.sibling;
      else
        commitAppearingPairViewTransitions(placement);
    }
    function commitDeletedPairViewTransitions(deletion) {
      if (appearingViewTransitions !== null && appearingViewTransitions.size !== 0) {
        var pairs = appearingViewTransitions;
        if ((deletion.subtreeFlags & 18874368) !== 0)
          for (deletion = deletion.child;deletion !== null; ) {
            if (deletion.tag !== 22 || deletion.memoizedState === null) {
              if (deletion.tag === 30 && (deletion.flags & 18874368) !== 0) {
                var props = deletion.memoizedProps, name = props.name;
                if (name != null && name !== "auto") {
                  var pair = pairs.get(name);
                  if (pair !== undefined) {
                    var className = getViewTransitionClassName(props.default, props.share);
                    className !== "none" && (applyViewTransitionToHostInstances(deletion, name, className, null, false) ? (className = deletion.stateNode, pair.paired = className, className.paired = pair, scheduleViewTransitionEvent(deletion, props.onShare)) : restoreViewTransitionOnHostInstances(deletion.child, false));
                    pairs.delete(name);
                    if (pairs.size === 0)
                      break;
                  }
                }
              }
              commitDeletedPairViewTransitions(deletion);
            }
            deletion = deletion.sibling;
          }
      }
    }
    function commitExitViewTransitions(deletion) {
      if (deletion.tag === 30) {
        var props = deletion.memoizedProps, name = getViewTransitionName(props, deletion.stateNode), pair = appearingViewTransitions !== null ? appearingViewTransitions.get(name) : undefined, className = getViewTransitionClassName(props.default, pair !== undefined ? props.share : props.exit);
        className !== "none" && (applyViewTransitionToHostInstances(deletion, name, className, null, false) ? pair !== undefined ? (className = deletion.stateNode, pair.paired = className, className.paired = pair, appearingViewTransitions.delete(name), scheduleViewTransitionEvent(deletion, props.onShare)) : scheduleViewTransitionEvent(deletion, props.onExit) : restoreViewTransitionOnHostInstances(deletion.child, false));
        appearingViewTransitions !== null && commitDeletedPairViewTransitions(deletion);
      } else if ((deletion.subtreeFlags & 33554432) !== 0)
        for (deletion = deletion.child;deletion !== null; )
          commitExitViewTransitions(deletion), deletion = deletion.sibling;
      else
        appearingViewTransitions !== null && commitDeletedPairViewTransitions(deletion);
    }
    function commitNestedViewTransitions(changedParent) {
      for (changedParent = changedParent.child;changedParent !== null; ) {
        if (changedParent.tag === 30) {
          var props = changedParent.memoizedProps, name = getViewTransitionName(props, changedParent.stateNode);
          props = getViewTransitionClassName(props.default, props.update);
          changedParent.flags &= -5;
          props !== "none" && applyViewTransitionToHostInstances(changedParent, name, props, changedParent.memoizedState = [], false);
        } else
          (changedParent.subtreeFlags & 33554432) !== 0 && commitNestedViewTransitions(changedParent);
        changedParent = changedParent.sibling;
      }
    }
    function restorePairedViewTransitions(parent) {
      if ((parent.subtreeFlags & 18874368) !== 0)
        for (parent = parent.child;parent !== null; ) {
          if (parent.tag !== 22 || parent.memoizedState === null) {
            if (parent.tag === 30 && (parent.flags & 18874368) !== 0) {
              var instance = parent.stateNode;
              instance.paired !== null && (instance.paired = null, restoreViewTransitionOnHostInstances(parent.child, false));
            }
            restorePairedViewTransitions(parent);
          }
          parent = parent.sibling;
        }
    }
    function restoreEnterOrExitViewTransitions(fiber) {
      if (fiber.tag === 30)
        fiber.stateNode.paired = null, restoreViewTransitionOnHostInstances(fiber.child, false), restorePairedViewTransitions(fiber);
      else if ((fiber.subtreeFlags & 33554432) !== 0)
        for (fiber = fiber.child;fiber !== null; )
          restoreEnterOrExitViewTransitions(fiber), fiber = fiber.sibling;
      else
        restorePairedViewTransitions(fiber);
    }
    function restoreNestedViewTransitions(changedParent) {
      for (changedParent = changedParent.child;changedParent !== null; )
        changedParent.tag === 30 ? restoreViewTransitionOnHostInstances(changedParent.child, false) : (changedParent.subtreeFlags & 33554432) !== 0 && restoreNestedViewTransitions(changedParent), changedParent = changedParent.sibling;
    }
    function measureViewTransitionHostInstancesRecursive(parentViewTransition, child, newName, oldName, className, previousMeasurements, stopAtNestedViewTransitions) {
      for (var inViewport = false;child !== null; ) {
        if (child.tag === 5) {
          var instance = child.stateNode;
          if (previousMeasurements !== null && viewTransitionHostInstanceIdx < previousMeasurements.length) {
            var previousMeasurement = previousMeasurements[viewTransitionHostInstanceIdx], nextMeasurement = measureInstance(instance);
            if (previousMeasurement.view || nextMeasurement.view)
              inViewport = true;
            var JSCompiler_temp;
            if (JSCompiler_temp = (parentViewTransition.flags & 4) === 0)
              if (nextMeasurement.clip)
                JSCompiler_temp = true;
              else {
                JSCompiler_temp = previousMeasurement.rect;
                var newRect = nextMeasurement.rect;
                JSCompiler_temp = JSCompiler_temp.y !== newRect.y || JSCompiler_temp.x !== newRect.x || JSCompiler_temp.height !== newRect.height || JSCompiler_temp.width !== newRect.width;
              }
            JSCompiler_temp && (parentViewTransition.flags |= 4);
            nextMeasurement.abs ? nextMeasurement = !previousMeasurement.abs : (previousMeasurement = previousMeasurement.rect, nextMeasurement = nextMeasurement.rect, nextMeasurement = previousMeasurement.height !== nextMeasurement.height || previousMeasurement.width !== nextMeasurement.width);
            nextMeasurement && (parentViewTransition.flags |= 32);
          } else
            parentViewTransition.flags |= 32;
          (parentViewTransition.flags & 4) !== 0 && applyViewTransitionName(instance, viewTransitionHostInstanceIdx === 0 ? newName : newName + "_" + viewTransitionHostInstanceIdx, className);
          inViewport && (parentViewTransition.flags & 4) !== 0 || (viewTransitionCancelableChildren === null && (viewTransitionCancelableChildren = []), viewTransitionCancelableChildren.push(instance, viewTransitionHostInstanceIdx === 0 ? oldName : oldName + "_" + viewTransitionHostInstanceIdx, child.memoizedProps));
          viewTransitionHostInstanceIdx++;
        } else if (child.tag !== 22 || child.memoizedState === null)
          child.tag === 30 && stopAtNestedViewTransitions ? parentViewTransition.flags |= child.flags & 32 : measureViewTransitionHostInstancesRecursive(parentViewTransition, child.child, newName, oldName, className, previousMeasurements, stopAtNestedViewTransitions) && (inViewport = true);
        child = child.sibling;
      }
      return inViewport;
    }
    function measureNestedViewTransitions(changedParent, gesture) {
      for (changedParent = changedParent.child;changedParent !== null; ) {
        if (changedParent.tag === 30) {
          var props = changedParent.memoizedProps, state = changedParent.stateNode, name = getViewTransitionName(props, state), className = getViewTransitionClassName(props.default, props.update);
          if (gesture) {
            state = state.clones;
            var previousMeasurements = state === null ? null : state.map(measureClonedInstance);
          } else
            previousMeasurements = changedParent.memoizedState, changedParent.memoizedState = null;
          state = changedParent;
          var child = changedParent.child;
          viewTransitionHostInstanceIdx = 0;
          name = measureViewTransitionHostInstancesRecursive(state, child, name, name, className, previousMeasurements, false);
          (changedParent.flags & 4) !== 0 && name && (gesture || scheduleViewTransitionEvent(changedParent, props.onUpdate));
        } else
          (changedParent.subtreeFlags & 33554432) !== 0 && measureNestedViewTransitions(changedParent, gesture);
        changedParent = changedParent.sibling;
      }
    }
    var offscreenSubtreeIsHidden = false;
    var offscreenSubtreeWasHidden = false;
    var offscreenDirectParentIsHidden = false;
    var needsFormReset = false;
    var PossiblyWeakSet = typeof WeakSet === "function" ? WeakSet : Set;
    var nextEffect = null;
    var viewTransitionContextChanged = false;
    var inUpdateViewTransition = false;
    var rootViewTransitionAffected = false;
    var rootViewTransitionNameCanceled = false;
    function commitBeforeMutationEffects(root, firstChild, committedLanes) {
      root = root.containerInfo;
      eventsEnabled = _enabled;
      root = getActiveElementDeep(root);
      if (hasSelectionCapabilities(root)) {
        if ("selectionStart" in root)
          var JSCompiler_temp = {
            start: root.selectionStart,
            end: root.selectionEnd
          };
        else
          a: {
            JSCompiler_temp = (JSCompiler_temp = root.ownerDocument) && JSCompiler_temp.defaultView || window;
            var selection = JSCompiler_temp.getSelection && JSCompiler_temp.getSelection();
            if (selection && selection.rangeCount !== 0) {
              JSCompiler_temp = selection.anchorNode;
              var anchorOffset = selection.anchorOffset, focusNode = selection.focusNode;
              selection = selection.focusOffset;
              try {
                JSCompiler_temp.nodeType, focusNode.nodeType;
              } catch (e$21) {
                JSCompiler_temp = null;
                break a;
              }
              var length = 0, start = -1, end = -1, indexWithinAnchor = 0, indexWithinFocus = 0, node = root, parentNode = null;
              b:
                for (;; ) {
                  for (var next;; ) {
                    node !== JSCompiler_temp || anchorOffset !== 0 && node.nodeType !== 3 || (start = length + anchorOffset);
                    node !== focusNode || selection !== 0 && node.nodeType !== 3 || (end = length + selection);
                    node.nodeType === 3 && (length += node.nodeValue.length);
                    if ((next = node.firstChild) === null)
                      break;
                    parentNode = node;
                    node = next;
                  }
                  for (;; ) {
                    if (node === root)
                      break b;
                    parentNode === JSCompiler_temp && ++indexWithinAnchor === anchorOffset && (start = length);
                    parentNode === focusNode && ++indexWithinFocus === selection && (end = length);
                    if ((next = node.nextSibling) !== null)
                      break;
                    node = parentNode;
                    parentNode = node.parentNode;
                  }
                  node = next;
                }
              JSCompiler_temp = start === -1 || end === -1 ? null : { start, end };
            } else
              JSCompiler_temp = null;
          }
        JSCompiler_temp = JSCompiler_temp || { start: 0, end: 0 };
      } else
        JSCompiler_temp = null;
      selectionInformation = { focusedElem: root, selectionRange: JSCompiler_temp };
      _enabled = false;
      committedLanes = (committedLanes & 335544064) === committedLanes;
      nextEffect = firstChild;
      for (firstChild = committedLanes ? 9270 : 1024;nextEffect !== null; ) {
        root = nextEffect;
        if (committedLanes && (JSCompiler_temp = root.deletions, JSCompiler_temp !== null))
          for (anchorOffset = 0;anchorOffset < JSCompiler_temp.length; anchorOffset++)
            committedLanes && commitExitViewTransitions(JSCompiler_temp[anchorOffset]);
        if (root.alternate === null && (root.flags & 2) !== 0)
          committedLanes && trackEnterViewTransitions(root), commitBeforeMutationEffects_complete(committedLanes);
        else {
          if (root.tag === 22) {
            if (JSCompiler_temp = root.alternate, root.memoizedState !== null) {
              JSCompiler_temp !== null && JSCompiler_temp.memoizedState === null && committedLanes && commitExitViewTransitions(JSCompiler_temp);
              commitBeforeMutationEffects_complete(committedLanes);
              continue;
            } else if (JSCompiler_temp !== null && JSCompiler_temp.memoizedState !== null) {
              committedLanes && trackEnterViewTransitions(root);
              commitBeforeMutationEffects_complete(committedLanes);
              continue;
            }
          }
          JSCompiler_temp = root.child;
          (root.subtreeFlags & firstChild) !== 0 && JSCompiler_temp !== null ? (JSCompiler_temp.return = root, nextEffect = JSCompiler_temp) : (committedLanes && commitNestedViewTransitions(root), commitBeforeMutationEffects_complete(committedLanes));
        }
      }
      appearingViewTransitions = null;
    }
    function commitBeforeMutationEffects_complete(isViewTransitionEligible$jscomp$0) {
      for (;nextEffect !== null; ) {
        var fiber = nextEffect, isViewTransitionEligible = isViewTransitionEligible$jscomp$0, { alternate: current, flags } = fiber;
        switch (fiber.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if ((flags & 1024) !== 0 && current !== null) {
              isViewTransitionEligible = undefined;
              flags = current.memoizedProps;
              current = current.memoizedState;
              var instance = fiber.stateNode;
              try {
                var resolvedPrevProps = resolveClassComponentProps(fiber.type, flags);
                isViewTransitionEligible = instance.getSnapshotBeforeUpdate(resolvedPrevProps, current);
                instance.__reactInternalSnapshotBeforeUpdate = isViewTransitionEligible;
              } catch (error) {
                captureCommitPhaseError(fiber, fiber.return, error);
              }
            }
            break;
          case 3:
            if ((flags & 1024) !== 0) {
              if (current = fiber.stateNode.containerInfo, isViewTransitionEligible = current.nodeType, isViewTransitionEligible === 9)
                clearContainerSparingly(current);
              else if (isViewTransitionEligible === 1)
                switch (current.nodeName) {
                  case "HEAD":
                  case "HTML":
                  case "BODY":
                    clearContainerSparingly(current);
                    break;
                  default:
                    current.textContent = "";
                }
            }
            break;
          case 5:
          case 26:
          case 27:
          case 6:
          case 4:
          case 17:
            break;
          case 30:
            isViewTransitionEligible && current !== null && (isViewTransitionEligible = getViewTransitionName(current.memoizedProps, current.stateNode), flags = fiber.memoizedProps, flags = getViewTransitionClassName(flags.default, flags.update), flags !== "none" && applyViewTransitionToHostInstances(current, isViewTransitionEligible, flags, current.memoizedState = [], true));
            break;
          default:
            if ((flags & 1024) !== 0)
              throw Error(formatProdErrorMessage(163));
        }
        current = fiber.sibling;
        if (current !== null) {
          current.return = fiber.return;
          nextEffect = current;
          break;
        }
        nextEffect = fiber.return;
      }
    }
    function commitLayoutEffectOnFiber(finishedRoot, current, finishedWork) {
      var flags = finishedWork.flags;
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 15:
          recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          flags & 4 && commitHookEffectListMount(5, finishedWork);
          break;
        case 1:
          recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          if (flags & 4)
            if (finishedRoot = finishedWork.stateNode, current === null)
              try {
                finishedRoot.componentDidMount();
              } catch (error) {
                captureCommitPhaseError(finishedWork, finishedWork.return, error);
              }
            else {
              var prevProps = resolveClassComponentProps(finishedWork.type, current.memoizedProps);
              current = current.memoizedState;
              try {
                finishedRoot.componentDidUpdate(prevProps, current, finishedRoot.__reactInternalSnapshotBeforeUpdate);
              } catch (error$146) {
                captureCommitPhaseError(finishedWork, finishedWork.return, error$146);
              }
            }
          flags & 64 && commitClassCallbacks(finishedWork);
          flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
          break;
        case 3:
          recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          if (flags & 64 && (finishedRoot = finishedWork.updateQueue, finishedRoot !== null)) {
            current = null;
            if (finishedWork.child !== null)
              switch (finishedWork.child.tag) {
                case 27:
                case 5:
                  current = finishedWork.child.stateNode;
                  break;
                case 1:
                  current = finishedWork.child.stateNode;
              }
            try {
              commitCallbacks(finishedRoot, current);
            } catch (error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, error);
            }
          }
          break;
        case 27:
          current === null && flags & 4 && commitHostSingletonAcquisition(finishedWork);
        case 26:
        case 5:
          recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          current === null && flags & 4 && commitHostMount(finishedWork);
          flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
          break;
        case 12:
          recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          break;
        case 31:
          recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          flags & 4 && commitActivityHydrationCallbacks(finishedRoot, finishedWork);
          break;
        case 13:
          recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
          flags & 64 && (finishedRoot = finishedWork.memoizedState, finishedRoot !== null && (finishedRoot = finishedRoot.dehydrated, finishedRoot !== null && (finishedWork = retryDehydratedSuspenseBoundary.bind(null, finishedWork), registerSuspenseInstanceRetry(finishedRoot, finishedWork))));
          break;
        case 22:
          flags = finishedWork.memoizedState !== null || offscreenSubtreeIsHidden;
          if (!flags) {
            var newOffscreenSubtreeWasHidden = current !== null && current.memoizedState !== null || offscreenSubtreeWasHidden;
            current = offscreenSubtreeIsHidden;
            prevProps = offscreenSubtreeWasHidden;
            offscreenSubtreeIsHidden = flags;
            (offscreenSubtreeWasHidden = newOffscreenSubtreeWasHidden) && !prevProps ? (flags = 2, (finishedWork.subtreeFlags & 8772) !== 0 && (flags |= 1), recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, flags)) : recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
            offscreenSubtreeIsHidden = current;
            offscreenSubtreeWasHidden = prevProps;
          }
          break;
        case 30:
          recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
          break;
        case 7:
          flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
        default:
          recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
      }
    }
    function hideOrUnhideAllChildren(parentFiber, isHidden) {
      for (parentFiber = parentFiber.child;parentFiber !== null; )
        hideOrUnhideAllChildrenOnFiber(parentFiber, isHidden), parentFiber = parentFiber.sibling;
    }
    function hideOrUnhideAllChildrenOnFiber(fiber, isHidden) {
      switch (fiber.tag) {
        case 5:
        case 26:
          try {
            var instance = fiber.stateNode;
            if (isHidden) {
              var style = instance.style;
              typeof style.setProperty === "function" ? style.setProperty("display", "none", "important") : style.display = "none";
            } else {
              var instance$jscomp$0 = fiber.stateNode, styleProp = fiber.memoizedProps.style, display = styleProp !== undefined && styleProp !== null && styleProp.hasOwnProperty("display") ? styleProp.display : null;
              instance$jscomp$0.style.display = display == null || typeof display === "boolean" ? "" : ("" + display).trim();
            }
          } catch (error) {
            captureCommitPhaseError(fiber, fiber.return, error);
          }
          hideOrUnhideNearestPortals(fiber, isHidden);
          break;
        case 6:
          try {
            fiber.stateNode.nodeValue = isHidden ? "" : fiber.memoizedProps, viewTransitionMutationContext = true;
          } catch (error) {
            captureCommitPhaseError(fiber, fiber.return, error);
          }
          break;
        case 18:
          try {
            var instance$jscomp$1 = fiber.stateNode;
            isHidden ? hideOrUnhideDehydratedBoundary(instance$jscomp$1, true) : hideOrUnhideDehydratedBoundary(fiber.stateNode, false);
          } catch (error) {
            captureCommitPhaseError(fiber, fiber.return, error);
          }
          break;
        case 22:
        case 23:
          fiber.memoizedState === null && hideOrUnhideAllChildren(fiber, isHidden);
          break;
        default:
          hideOrUnhideAllChildren(fiber, isHidden);
      }
    }
    function hideOrUnhideNearestPortals(parentFiber, isHidden$jscomp$0) {
      if (parentFiber.subtreeFlags & 67108864)
        for (parentFiber = parentFiber.child;parentFiber !== null; ) {
          a: {
            var fiber = parentFiber, isHidden = isHidden$jscomp$0;
            switch (fiber.tag) {
              case 4:
                hideOrUnhideAllChildrenOnFiber(fiber, isHidden);
                break a;
              case 22:
                fiber.memoizedState === null && hideOrUnhideNearestPortals(fiber, isHidden);
                break a;
              default:
                hideOrUnhideNearestPortals(fiber, isHidden);
            }
          }
          parentFiber = parentFiber.sibling;
        }
    }
    function detachFiberAfterEffects(fiber) {
      var alternate = fiber.alternate;
      alternate !== null && (fiber.alternate = null, detachFiberAfterEffects(alternate));
      fiber.child = null;
      fiber.deletions = null;
      fiber.sibling = null;
      fiber.tag === 5 && (alternate = fiber.stateNode, alternate !== null && detachDeletedInstance(alternate));
      fiber.stateNode = null;
      fiber.return = null;
      fiber.dependencies = null;
      fiber.memoizedProps = null;
      fiber.memoizedState = null;
      fiber.pendingProps = null;
      fiber.stateNode = null;
      fiber.updateQueue = null;
    }
    var hostParent = null;
    var hostParentIsContainer = false;
    function recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, parent) {
      for (parent = parent.child;parent !== null; )
        commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, parent), parent = parent.sibling;
    }
    function commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, deletedFiber) {
      if (injectedHook && typeof injectedHook.onCommitFiberUnmount === "function")
        try {
          injectedHook.onCommitFiberUnmount(rendererID, deletedFiber);
        } catch (err) {}
      switch (deletedFiber.tag) {
        case 26:
          offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
          recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
          deletedFiber.memoizedState ? deletedFiber.memoizedState.count-- : deletedFiber.stateNode && !offscreenSubtreeWasHidden && (deletedFiber = deletedFiber.stateNode, deletedFiber.parentNode.removeChild(deletedFiber));
          break;
        case 27:
          offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
          commitFragmentInstanceDeletionEffects(deletedFiber);
          var prevHostParent = hostParent, prevHostParentIsContainer = hostParentIsContainer;
          isSingletonScope(deletedFiber.type) && (hostParent = deletedFiber.stateNode, hostParentIsContainer = false);
          recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
          releaseSingletonInstance(deletedFiber.stateNode, deletedFiber.type, deletedFiber.memoizedProps);
          hostParent = prevHostParent;
          hostParentIsContainer = prevHostParentIsContainer;
          break;
        case 5:
          offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor), commitFragmentInstanceDeletionEffects(deletedFiber);
        case 6:
          deletedFiber.tag === 6 && commitFragmentInstanceDeletionEffects(deletedFiber);
          prevHostParent = hostParent;
          prevHostParentIsContainer = hostParentIsContainer;
          hostParent = null;
          recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
          hostParent = prevHostParent;
          hostParentIsContainer = prevHostParentIsContainer;
          if (hostParent !== null)
            if (hostParentIsContainer)
              try {
                (hostParent.nodeType === 9 ? hostParent.body : hostParent.nodeName === "HTML" ? hostParent.ownerDocument.body : hostParent).removeChild(deletedFiber.stateNode), viewTransitionMutationContext = true;
              } catch (error) {
                captureCommitPhaseError(deletedFiber, nearestMountedAncestor, error);
              }
            else
              try {
                hostParent.removeChild(deletedFiber.stateNode), viewTransitionMutationContext = true;
              } catch (error) {
                captureCommitPhaseError(deletedFiber, nearestMountedAncestor, error);
              }
          break;
        case 18:
          hostParent !== null && (hostParentIsContainer ? (finishedRoot = hostParent, clearHydrationBoundary(finishedRoot.nodeType === 9 ? finishedRoot.body : finishedRoot.nodeName === "HTML" ? finishedRoot.ownerDocument.body : finishedRoot, deletedFiber.stateNode), retryIfBlockedOn(finishedRoot)) : clearHydrationBoundary(hostParent, deletedFiber.stateNode));
          break;
        case 4:
          prevHostParent = hostParent;
          prevHostParentIsContainer = hostParentIsContainer;
          hostParent = deletedFiber.stateNode.containerInfo;
          hostParentIsContainer = true;
          recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
          hostParent = prevHostParent;
          hostParentIsContainer = prevHostParentIsContainer;
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          commitHookEffectListUnmount(2, deletedFiber, nearestMountedAncestor);
          offscreenSubtreeWasHidden || commitHookEffectListUnmount(4, deletedFiber, nearestMountedAncestor);
          recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
          break;
        case 1:
          offscreenSubtreeWasHidden || (safelyDetachRef(deletedFiber, nearestMountedAncestor), prevHostParent = deletedFiber.stateNode, typeof prevHostParent.componentWillUnmount === "function" && safelyCallComponentWillUnmount(deletedFiber, nearestMountedAncestor, prevHostParent));
          recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
          break;
        case 21:
          recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
          break;
        case 22:
          offscreenSubtreeWasHidden = (prevHostParent = offscreenSubtreeWasHidden) || deletedFiber.memoizedState !== null;
          recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
          offscreenSubtreeWasHidden = prevHostParent;
          break;
        case 30:
          safelyDetachRef(deletedFiber, nearestMountedAncestor);
          recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
          break;
        case 7:
          offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
          recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
          break;
        default:
          recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
      }
    }
    function commitActivityHydrationCallbacks(finishedRoot, finishedWork) {
      if (finishedWork.memoizedState === null && (finishedRoot = finishedWork.alternate, finishedRoot !== null && (finishedRoot = finishedRoot.memoizedState, finishedRoot !== null))) {
        finishedRoot = finishedRoot.dehydrated;
        try {
          retryIfBlockedOn(finishedRoot);
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
    }
    function commitSuspenseHydrationCallbacks(finishedRoot, finishedWork) {
      if (finishedWork.memoizedState === null && (finishedRoot = finishedWork.alternate, finishedRoot !== null && (finishedRoot = finishedRoot.memoizedState, finishedRoot !== null && (finishedRoot = finishedRoot.dehydrated, finishedRoot !== null))))
        try {
          retryIfBlockedOn(finishedRoot);
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
    }
    function getRetryCache(finishedWork) {
      switch (finishedWork.tag) {
        case 31:
        case 13:
        case 19:
          var retryCache = finishedWork.stateNode;
          retryCache === null && (retryCache = finishedWork.stateNode = new PossiblyWeakSet);
          return retryCache;
        case 22:
          return finishedWork = finishedWork.stateNode, retryCache = finishedWork._retryCache, retryCache === null && (retryCache = finishedWork._retryCache = new PossiblyWeakSet), retryCache;
        default:
          throw Error(formatProdErrorMessage(435, finishedWork.tag));
      }
    }
    function attachSuspenseRetryListeners(finishedWork, wakeables) {
      var retryCache = getRetryCache(finishedWork);
      wakeables.forEach(function(wakeable) {
        if (!retryCache.has(wakeable)) {
          retryCache.add(wakeable);
          var retry = resolveRetryWakeable.bind(null, finishedWork, wakeable);
          wakeable.then(retry, retry);
        }
      });
    }
    function recursivelyTraverseMutationEffects(root$jscomp$0, parentFiber, lanes) {
      var deletions = parentFiber.deletions;
      if (deletions !== null)
        for (var i = 0;i < deletions.length; i++) {
          var childToDelete = deletions[i], root = root$jscomp$0, returnFiber = parentFiber, parent = returnFiber;
          a:
            for (;parent !== null; ) {
              switch (parent.tag) {
                case 27:
                  if (isSingletonScope(parent.type)) {
                    hostParent = parent.stateNode;
                    hostParentIsContainer = false;
                    break a;
                  }
                  break;
                case 5:
                  hostParent = parent.stateNode;
                  hostParentIsContainer = false;
                  break a;
                case 3:
                case 4:
                  hostParent = parent.stateNode.containerInfo;
                  hostParentIsContainer = true;
                  break a;
              }
              parent = parent.return;
            }
          if (hostParent === null)
            throw Error(formatProdErrorMessage(160));
          commitDeletionEffectsOnFiber(root, returnFiber, childToDelete);
          hostParent = null;
          hostParentIsContainer = false;
          root = childToDelete.alternate;
          root !== null && (root.return = null);
          childToDelete.return = null;
        }
      if (parentFiber.subtreeFlags & 13886)
        for (parentFiber = parentFiber.child;parentFiber !== null; )
          commitMutationEffectsOnFiber(parentFiber, root$jscomp$0, lanes), parentFiber = parentFiber.sibling;
    }
    var currentHoistableRoot = null;
    function commitMutationEffectsOnFiber(finishedWork, root, lanes) {
      var current = finishedWork.alternate, flags = finishedWork.flags;
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          if (flags & 4 && (current = finishedWork.updateQueue, current = current !== null ? current.events : null, current !== null))
            for (var ii = 0;ii < current.length; ii++) {
              var _eventPayloads$ii2 = current[ii];
              _eventPayloads$ii2.ref.impl = _eventPayloads$ii2.nextImpl;
            }
          recursivelyTraverseMutationEffects(root, finishedWork, lanes);
          commitReconciliationEffects(finishedWork);
          flags & 4 && (commitHookEffectListUnmount(3, finishedWork, finishedWork.return), commitHookEffectListMount(3, finishedWork), commitHookEffectListUnmount(5, finishedWork, finishedWork.return));
          break;
        case 1:
          recursivelyTraverseMutationEffects(root, finishedWork, lanes);
          commitReconciliationEffects(finishedWork);
          flags & 512 && (offscreenSubtreeWasHidden || current === null || safelyDetachRef(current, current.return));
          flags & 64 && offscreenSubtreeIsHidden && (finishedWork = finishedWork.updateQueue, finishedWork !== null && (root = finishedWork.callbacks, root !== null && (lanes = finishedWork.shared.hiddenCallbacks, finishedWork.shared.hiddenCallbacks = lanes === null ? root : lanes.concat(root))));
          break;
        case 26:
          ii = currentHoistableRoot;
          recursivelyTraverseMutationEffects(root, finishedWork, lanes);
          commitReconciliationEffects(finishedWork);
          flags & 512 && (offscreenSubtreeWasHidden || current === null || safelyDetachRef(current, current.return));
          if (flags & 4)
            if (flags = current !== null ? current.memoizedState : null, lanes = finishedWork.memoizedState, current === null)
              if (lanes === null)
                if (finishedWork.stateNode === null)
                  if (offscreenSubtreeIsHidden)
                    finishedWork.stateNode = createHoistableInstance(finishedWork.type, finishedWork.memoizedProps, root.containerInfo, finishedWork);
                  else {
                    a: {
                      root = finishedWork.type;
                      lanes = finishedWork.memoizedProps;
                      flags = ii.ownerDocument || ii;
                      b:
                        switch (root) {
                          case "title":
                            current = flags.getElementsByTagName("title")[0];
                            if (!current || current[internalHoistableMarker] || current[internalInstanceKey] || current.namespaceURI === "http://www.w3.org/2000/svg" || current.hasAttribute("itemprop"))
                              current = flags.createElement(root), flags.head.insertBefore(current, flags.querySelector("head > title"));
                            setInitialProperties(current, root, lanes);
                            current[internalInstanceKey] = finishedWork;
                            markNodeAsHoistable(current);
                            root = current;
                            break a;
                          case "link":
                            if (ii = getHydratableHoistableCache("link", "href", flags).get(root + (lanes.href || ""))) {
                              for (_eventPayloads$ii2 = 0;_eventPayloads$ii2 < ii.length; _eventPayloads$ii2++)
                                if (current = ii[_eventPayloads$ii2], current.getAttribute("href") === (lanes.href == null || lanes.href === "" ? null : lanes.href) && current.getAttribute("rel") === (lanes.rel == null ? null : lanes.rel) && current.getAttribute("title") === (lanes.title == null ? null : lanes.title) && current.getAttribute("crossorigin") === (lanes.crossOrigin == null ? null : lanes.crossOrigin)) {
                                  ii.splice(_eventPayloads$ii2, 1);
                                  break b;
                                }
                            }
                            current = flags.createElement(root);
                            setInitialProperties(current, root, lanes);
                            flags.head.appendChild(current);
                            break;
                          case "meta":
                            if (ii = getHydratableHoistableCache("meta", "content", flags).get(root + (lanes.content || ""))) {
                              for (_eventPayloads$ii2 = 0;_eventPayloads$ii2 < ii.length; _eventPayloads$ii2++)
                                if (current = ii[_eventPayloads$ii2], current.getAttribute("content") === (lanes.content == null ? null : "" + lanes.content) && current.getAttribute("name") === (lanes.name == null ? null : lanes.name) && current.getAttribute("property") === (lanes.property == null ? null : lanes.property) && current.getAttribute("http-equiv") === (lanes.httpEquiv == null ? null : lanes.httpEquiv) && current.getAttribute("charset") === (lanes.charSet == null ? null : lanes.charSet)) {
                                  ii.splice(_eventPayloads$ii2, 1);
                                  break b;
                                }
                            }
                            current = flags.createElement(root);
                            setInitialProperties(current, root, lanes);
                            flags.head.appendChild(current);
                            break;
                          default:
                            throw Error(formatProdErrorMessage(468, root));
                        }
                      current[internalInstanceKey] = finishedWork;
                      markNodeAsHoistable(current);
                      root = current;
                    }
                    finishedWork.stateNode = root;
                  }
                else
                  offscreenSubtreeIsHidden || mountHoistable(ii, finishedWork.type, finishedWork.stateNode);
              else
                finishedWork.stateNode = acquireResource(ii, lanes, finishedWork.memoizedProps);
            else
              flags !== lanes ? (flags === null ? (root = current.stateNode, root === null || offscreenSubtreeWasHidden || root.parentNode.removeChild(root)) : flags.count--, lanes === null ? offscreenSubtreeIsHidden || mountHoistable(ii, finishedWork.type, finishedWork.stateNode) : acquireResource(ii, lanes, finishedWork.memoizedProps)) : lanes === null && finishedWork.stateNode !== null && commitHostUpdate(finishedWork, finishedWork.memoizedProps, current.memoizedProps);
          break;
        case 27:
          recursivelyTraverseMutationEffects(root, finishedWork, lanes);
          commitReconciliationEffects(finishedWork);
          flags & 512 && (offscreenSubtreeWasHidden || current === null || safelyDetachRef(current, current.return));
          current !== null && flags & 4 && commitHostUpdate(finishedWork, finishedWork.memoizedProps, current.memoizedProps);
          break;
        case 5:
          ii = offscreenDirectParentIsHidden;
          offscreenDirectParentIsHidden = false;
          recursivelyTraverseMutationEffects(root, finishedWork, lanes);
          offscreenDirectParentIsHidden = ii;
          commitReconciliationEffects(finishedWork);
          flags & 512 && (offscreenSubtreeWasHidden || current === null || safelyDetachRef(current, current.return));
          if (finishedWork.flags & 32) {
            root = finishedWork.stateNode;
            try {
              setTextContent(root, ""), viewTransitionMutationContext = true;
            } catch (error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, error);
            }
          }
          flags & 4 && finishedWork.stateNode != null && (root = finishedWork.memoizedProps, commitHostUpdate(finishedWork, root, current !== null ? current.memoizedProps : root));
          flags & 1024 && (needsFormReset = true);
          break;
        case 6:
          recursivelyTraverseMutationEffects(root, finishedWork, lanes);
          commitReconciliationEffects(finishedWork);
          if (flags & 4) {
            if (finishedWork.stateNode === null)
              throw Error(formatProdErrorMessage(162));
            root = finishedWork.memoizedProps;
            lanes = finishedWork.stateNode;
            try {
              lanes.nodeValue = root, viewTransitionMutationContext = true;
            } catch (error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, error);
            }
          }
          break;
        case 3:
          viewTransitionMutationContext = false;
          tagCaches = null;
          ii = currentHoistableRoot;
          currentHoistableRoot = getHoistableRoot(root.containerInfo);
          recursivelyTraverseMutationEffects(root, finishedWork, lanes);
          currentHoistableRoot = ii;
          commitReconciliationEffects(finishedWork);
          if (flags & 4 && current !== null && current.memoizedState.isDehydrated)
            try {
              retryIfBlockedOn(root.containerInfo);
            } catch (error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, error);
            }
          needsFormReset && (needsFormReset = false, recursivelyResetForms(finishedWork));
          viewTransitionMutationContext = false;
          break;
        case 4:
          flags = offscreenDirectParentIsHidden;
          offscreenDirectParentIsHidden = offscreenSubtreeIsHidden;
          current = pushMutationContext();
          ii = currentHoistableRoot;
          currentHoistableRoot = getHoistableRoot(finishedWork.stateNode.containerInfo);
          recursivelyTraverseMutationEffects(root, finishedWork, lanes);
          commitReconciliationEffects(finishedWork);
          currentHoistableRoot = ii;
          viewTransitionMutationContext && inUpdateViewTransition && (rootViewTransitionAffected = true);
          viewTransitionMutationContext = current;
          offscreenDirectParentIsHidden = flags;
          break;
        case 12:
          recursivelyTraverseMutationEffects(root, finishedWork, lanes);
          commitReconciliationEffects(finishedWork);
          break;
        case 31:
          recursivelyTraverseMutationEffects(root, finishedWork, lanes);
          commitReconciliationEffects(finishedWork);
          flags & 4 && (root = finishedWork.updateQueue, root !== null && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, root)));
          break;
        case 13:
          recursivelyTraverseMutationEffects(root, finishedWork, lanes);
          commitReconciliationEffects(finishedWork);
          finishedWork.child.flags & 8192 && finishedWork.memoizedState !== null !== (current !== null && current.memoizedState !== null) && (globalMostRecentFallbackTime = now());
          flags & 4 && (root = finishedWork.updateQueue, root !== null && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, root)));
          break;
        case 22:
          ii = finishedWork.memoizedState !== null;
          _eventPayloads$ii2 = current !== null && current.memoizedState !== null;
          var prevOffscreenSubtreeIsHidden = offscreenSubtreeIsHidden, prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden, prevOffscreenDirectParentIsHidden$166 = offscreenDirectParentIsHidden;
          offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden || ii;
          offscreenDirectParentIsHidden = prevOffscreenDirectParentIsHidden$166 || ii;
          offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden || _eventPayloads$ii2;
          recursivelyTraverseMutationEffects(root, finishedWork, lanes);
          offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
          offscreenDirectParentIsHidden = prevOffscreenDirectParentIsHidden$166;
          offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden;
          commitReconciliationEffects(finishedWork);
          flags & 8192 && (root = finishedWork.stateNode, root._visibility = ii ? root._visibility & -2 : root._visibility | 1, !ii || current === null || _eventPayloads$ii2 || offscreenSubtreeIsHidden || offscreenSubtreeWasHidden || (root = _eventPayloads$ii2 || offscreenSubtreeWasHidden, lanes = offscreenSubtreeIsHidden, current = offscreenSubtreeWasHidden, offscreenSubtreeIsHidden = ii || offscreenSubtreeIsHidden, offscreenSubtreeWasHidden = root, recursivelyTraverseDisappearLayoutEffects(finishedWork, 2), offscreenSubtreeIsHidden = lanes, offscreenSubtreeWasHidden = current), !ii && offscreenDirectParentIsHidden || hideOrUnhideAllChildren(finishedWork, ii));
          flags & 4 && (root = finishedWork.updateQueue, root !== null && (lanes = root.retryQueue, lanes !== null && (root.retryQueue = null, attachSuspenseRetryListeners(finishedWork, lanes))));
          break;
        case 19:
          recursivelyTraverseMutationEffects(root, finishedWork, lanes);
          commitReconciliationEffects(finishedWork);
          flags & 4 && (root = finishedWork.updateQueue, root !== null && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, root)));
          break;
        case 30:
          flags & 512 && (offscreenSubtreeWasHidden || current === null || safelyDetachRef(current, current.return));
          flags = pushMutationContext();
          ii = inUpdateViewTransition;
          _eventPayloads$ii2 = (lanes & 335544064) === lanes;
          prevOffscreenSubtreeIsHidden = finishedWork.memoizedProps;
          inUpdateViewTransition = _eventPayloads$ii2 && getViewTransitionClassName(prevOffscreenSubtreeIsHidden.default, prevOffscreenSubtreeIsHidden.update) !== "none";
          recursivelyTraverseMutationEffects(root, finishedWork, lanes);
          commitReconciliationEffects(finishedWork);
          _eventPayloads$ii2 && current !== null && viewTransitionMutationContext && (finishedWork.flags |= 4);
          inUpdateViewTransition = ii;
          viewTransitionMutationContext = flags;
          break;
        case 21:
          break;
        case 7:
          flags & 512 && (offscreenSubtreeWasHidden || current === null || safelyDetachRef(current, current.return)), current && current.stateNode !== null && (current.stateNode._fragmentFiber = finishedWork);
        default:
          recursivelyTraverseMutationEffects(root, finishedWork, lanes), commitReconciliationEffects(finishedWork);
      }
    }
    function commitReconciliationEffects(finishedWork) {
      var flags = finishedWork.flags;
      if (flags & 2) {
        try {
          for (var hostParentFiber, parentFiber = finishedWork.return;parentFiber !== null; ) {
            if (isHostParent(parentFiber)) {
              hostParentFiber = parentFiber;
              break;
            }
            parentFiber = parentFiber.return;
          }
          parentFiber = null;
          for (var parent = finishedWork.return;parent !== null; ) {
            if (isFragmentInstanceParent(parent)) {
              var fragmentInstance = parent.stateNode;
              parentFiber === null ? parentFiber = [fragmentInstance] : parentFiber.push(fragmentInstance);
            }
            if (isFragmentInstanceHostBoundary(parent))
              break;
            parent = parent.return;
          }
          var JSCompiler_inline_result = parentFiber;
          if (hostParentFiber == null)
            throw Error(formatProdErrorMessage(160));
          switch (hostParentFiber.tag) {
            case 27:
              var parent$jscomp$0 = hostParentFiber.stateNode, before = getHostSibling(finishedWork);
              insertOrAppendPlacementNode(finishedWork, before, parent$jscomp$0, JSCompiler_inline_result);
              break;
            case 5:
              var parent$149 = hostParentFiber.stateNode;
              hostParentFiber.flags & 32 && (setTextContent(parent$149, ""), hostParentFiber.flags &= -33);
              var before$150 = getHostSibling(finishedWork);
              insertOrAppendPlacementNode(finishedWork, before$150, parent$149, JSCompiler_inline_result);
              break;
            case 3:
            case 4:
              var parent$151 = hostParentFiber.stateNode.containerInfo, before$152 = getHostSibling(finishedWork);
              insertOrAppendPlacementNodeIntoContainer(finishedWork, before$152, parent$151, JSCompiler_inline_result);
              break;
            default:
              throw Error(formatProdErrorMessage(161));
          }
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
        finishedWork.flags &= -3;
      }
      flags & 4096 && (finishedWork.flags &= -4097);
    }
    function recursivelyResetForms(parentFiber) {
      if (parentFiber.subtreeFlags & 1024)
        for (parentFiber = parentFiber.child;parentFiber !== null; ) {
          var fiber = parentFiber;
          recursivelyResetForms(fiber);
          fiber.tag === 5 && fiber.flags & 1024 && (fiber = fiber.stateNode, _enabled = true, fiber.reset(), _enabled = false);
          parentFiber = parentFiber.sibling;
        }
    }
    function recursivelyTraverseAfterMutationEffects(root, parentFiber) {
      if (parentFiber.subtreeFlags & 9270)
        for (parentFiber = parentFiber.child;parentFiber !== null; )
          commitAfterMutationEffectsOnFiber(parentFiber, root), parentFiber = parentFiber.sibling;
      else
        measureNestedViewTransitions(parentFiber, false);
    }
    function commitAfterMutationEffectsOnFiber(finishedWork, root) {
      var current = finishedWork.alternate;
      if (current === null)
        commitEnterViewTransitions(finishedWork, false);
      else
        switch (finishedWork.tag) {
          case 3:
            rootViewTransitionNameCanceled = viewTransitionContextChanged = false;
            pushViewTransitionCancelableScope();
            recursivelyTraverseAfterMutationEffects(root, finishedWork);
            if (!viewTransitionContextChanged && !rootViewTransitionAffected) {
              finishedWork = viewTransitionCancelableChildren;
              if (finishedWork !== null)
                for (var i = 0;i < finishedWork.length; i += 3) {
                  current = finishedWork[i];
                  var oldName = finishedWork[i + 1];
                  restoreViewTransitionName(current, finishedWork[i + 2]);
                  current = current.ownerDocument.documentElement;
                  current !== null && current.animate({ opacity: [0, 0], pointerEvents: ["none", "none"] }, {
                    duration: 0,
                    fill: "forwards",
                    pseudoElement: "::view-transition-group(" + oldName + ")"
                  });
                }
              finishedWork = root.containerInfo;
              finishedWork = finishedWork.nodeType === 9 ? finishedWork.documentElement : finishedWork.ownerDocument.documentElement;
              finishedWork !== null && finishedWork.style.viewTransitionName === "" && (finishedWork.style.viewTransitionName = "none", finishedWork.animate({ opacity: [0, 0], pointerEvents: ["none", "none"] }, {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition-group(root)"
              }), finishedWork.animate({ width: [0, 0], height: [0, 0] }, {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition"
              }));
              rootViewTransitionNameCanceled = true;
            }
            viewTransitionCancelableChildren = null;
            break;
          case 5:
            recursivelyTraverseAfterMutationEffects(root, finishedWork);
            break;
          case 4:
            i = viewTransitionContextChanged;
            viewTransitionContextChanged = false;
            recursivelyTraverseAfterMutationEffects(root, finishedWork);
            viewTransitionContextChanged && (rootViewTransitionAffected = true);
            viewTransitionContextChanged = i;
            break;
          case 22:
            finishedWork.memoizedState === null && (current.memoizedState !== null ? commitEnterViewTransitions(finishedWork, false) : recursivelyTraverseAfterMutationEffects(root, finishedWork));
            break;
          case 30:
            i = viewTransitionContextChanged;
            oldName = pushViewTransitionCancelableScope();
            viewTransitionContextChanged = false;
            recursivelyTraverseAfterMutationEffects(root, finishedWork);
            viewTransitionContextChanged && (finishedWork.flags |= 4);
            var props = finishedWork.memoizedProps, state = finishedWork.stateNode;
            root = getViewTransitionName(props, state);
            state = getViewTransitionName(current.memoizedProps, state);
            var className = getViewTransitionClassName(props.default, props.update);
            className === "none" ? root = false : (props = current.memoizedState, current.memoizedState = null, current = finishedWork.child, viewTransitionHostInstanceIdx = 0, root = measureViewTransitionHostInstancesRecursive(finishedWork, current, root, state, className, props, true), viewTransitionHostInstanceIdx !== (props === null ? 0 : props.length) && (finishedWork.flags |= 32));
            (finishedWork.flags & 4) !== 0 && root ? (scheduleViewTransitionEvent(finishedWork, finishedWork.memoizedProps.onUpdate), viewTransitionCancelableChildren = oldName) : oldName !== null && (oldName.push.apply(oldName, viewTransitionCancelableChildren), viewTransitionCancelableChildren = oldName);
            viewTransitionContextChanged = (finishedWork.flags & 32) !== 0 ? true : i;
            break;
          default:
            recursivelyTraverseAfterMutationEffects(root, finishedWork);
        }
    }
    function recursivelyTraverseLayoutEffects(root, parentFiber) {
      if (parentFiber.subtreeFlags & 8772)
        for (parentFiber = parentFiber.child;parentFiber !== null; )
          commitLayoutEffectOnFiber(root, parentFiber.alternate, parentFiber), parentFiber = parentFiber.sibling;
    }
    function recursivelyTraverseDisappearLayoutEffects(parentFiber, layoutEffectTraversalFlags$jscomp$0) {
      for (parentFiber = parentFiber.child;parentFiber !== null; ) {
        var finishedWork = parentFiber, layoutEffectTraversalFlags = layoutEffectTraversalFlags$jscomp$0;
        switch (finishedWork.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            commitHookEffectListUnmount(4, finishedWork, finishedWork.return);
            recursivelyTraverseDisappearLayoutEffects(finishedWork, layoutEffectTraversalFlags);
            break;
          case 1:
            safelyDetachRef(finishedWork, finishedWork.return);
            var instance = finishedWork.stateNode;
            typeof instance.componentWillUnmount === "function" && safelyCallComponentWillUnmount(finishedWork, finishedWork.return, instance);
            recursivelyTraverseDisappearLayoutEffects(finishedWork, layoutEffectTraversalFlags);
            break;
          case 27:
            (layoutEffectTraversalFlags & 2) !== 0 && releaseSingletonInstance(finishedWork.stateNode, finishedWork.type, finishedWork.memoizedProps);
          case 5:
            safelyDetachRef(finishedWork, finishedWork.return);
            finishedWork.tag !== 5 && finishedWork.tag !== 27 || commitFragmentInstanceDeletionEffects(finishedWork);
            recursivelyTraverseDisappearLayoutEffects(finishedWork, layoutEffectTraversalFlags);
            break;
          case 6:
            commitFragmentInstanceDeletionEffects(finishedWork);
            break;
          case 26:
            safelyDetachRef(finishedWork, finishedWork.return);
            instance = finishedWork.stateNode;
            finishedWork.memoizedState !== null || instance === null || offscreenSubtreeWasHidden || instance.parentNode.removeChild(instance);
            recursivelyTraverseDisappearLayoutEffects(finishedWork, layoutEffectTraversalFlags);
            break;
          case 22:
            finishedWork.memoizedState === null && recursivelyTraverseDisappearLayoutEffects(finishedWork, layoutEffectTraversalFlags);
            break;
          case 30:
            safelyDetachRef(finishedWork, finishedWork.return);
            recursivelyTraverseDisappearLayoutEffects(finishedWork, layoutEffectTraversalFlags);
            break;
          case 7:
            safelyDetachRef(finishedWork, finishedWork.return);
          default:
            recursivelyTraverseDisappearLayoutEffects(finishedWork, layoutEffectTraversalFlags);
        }
        parentFiber = parentFiber.sibling;
      }
    }
    function recursivelyTraverseReappearLayoutEffects(finishedRoot$jscomp$0, parentFiber, layoutEffectTraversalFlags) {
      layoutEffectTraversalFlags = (parentFiber.subtreeFlags & 8772) !== 0 ? layoutEffectTraversalFlags : layoutEffectTraversalFlags & -2;
      for (parentFiber = parentFiber.child;parentFiber !== null; ) {
        var current = parentFiber.alternate, finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, flags = finishedWork.flags, includeWorkInProgressEffects = (layoutEffectTraversalFlags & 1) !== 0;
        switch (finishedWork.tag) {
          case 0:
          case 11:
          case 15:
            recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
            commitHookEffectListMount(4, finishedWork);
            break;
          case 1:
            recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
            current = finishedWork;
            finishedRoot = current.stateNode;
            if (typeof finishedRoot.componentDidMount === "function")
              try {
                finishedRoot.componentDidMount();
              } catch (error) {
                captureCommitPhaseError(current, current.return, error);
              }
            current = finishedWork;
            finishedRoot = current.updateQueue;
            if (finishedRoot !== null) {
              var instance = current.stateNode;
              try {
                var hiddenCallbacks = finishedRoot.shared.hiddenCallbacks;
                if (hiddenCallbacks !== null)
                  for (finishedRoot.shared.hiddenCallbacks = null, finishedRoot = 0;finishedRoot < hiddenCallbacks.length; finishedRoot++)
                    callCallback(hiddenCallbacks[finishedRoot], instance);
              } catch (error) {
                captureCommitPhaseError(current, current.return, error);
              }
            }
            includeWorkInProgressEffects && flags & 64 && commitClassCallbacks(finishedWork);
            safelyAttachRef(finishedWork, finishedWork.return);
            break;
          case 27:
            (layoutEffectTraversalFlags & 2) !== 0 && commitHostSingletonAcquisition(finishedWork);
          case 5:
            finishedWork.tag !== 5 && finishedWork.tag !== 27 || commitFragmentInstanceInsertionEffects(finishedWork);
            recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
            includeWorkInProgressEffects && current === null && flags & 4 && commitHostMount(finishedWork);
            safelyAttachRef(finishedWork, finishedWork.return);
            break;
          case 6:
            commitFragmentInstanceInsertionEffects(finishedWork);
            break;
          case 26:
            instance = finishedWork.stateNode;
            finishedWork.memoizedState !== null || instance === null || offscreenSubtreeIsHidden || mountHoistable(getHoistableRoot(instance.ownerDocument), finishedWork.type, instance);
            recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
            includeWorkInProgressEffects && current === null && flags & 4 && commitHostMount(finishedWork);
            safelyAttachRef(finishedWork, finishedWork.return);
            break;
          case 12:
            recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
            break;
          case 31:
            recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
            includeWorkInProgressEffects && flags & 4 && commitActivityHydrationCallbacks(finishedRoot, finishedWork);
            break;
          case 13:
            recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
            includeWorkInProgressEffects && flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
            break;
          case 22:
            finishedWork.memoizedState === null && recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
            safelyAttachRef(finishedWork, finishedWork.return);
            break;
          case 30:
            recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
            safelyAttachRef(finishedWork, finishedWork.return);
            break;
          case 7:
            safelyAttachRef(finishedWork, finishedWork.return);
          default:
            recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
        }
        parentFiber = parentFiber.sibling;
      }
    }
    function commitOffscreenPassiveMountEffects(current, finishedWork) {
      var previousCache = null;
      current !== null && current.memoizedState !== null && current.memoizedState.cachePool !== null && (previousCache = current.memoizedState.cachePool.pool);
      current = null;
      finishedWork.memoizedState !== null && finishedWork.memoizedState.cachePool !== null && (current = finishedWork.memoizedState.cachePool.pool);
      current !== previousCache && (current != null && current.refCount++, previousCache != null && releaseCache(previousCache));
    }
    function commitCachePassiveMountEffect(current, finishedWork) {
      current = null;
      finishedWork.alternate !== null && (current = finishedWork.alternate.memoizedState.cache);
      finishedWork = finishedWork.memoizedState.cache;
      finishedWork !== current && (finishedWork.refCount++, current != null && releaseCache(current));
    }
    function recursivelyTraversePassiveMountEffects(root, parentFiber, committedLanes, committedTransitions) {
      var isViewTransitionEligible = (committedLanes & 335544064) === committedLanes;
      if (parentFiber.subtreeFlags & (isViewTransitionEligible ? 10262 : 10256))
        for (parentFiber = parentFiber.child;parentFiber !== null; )
          commitPassiveMountOnFiber(root, parentFiber, committedLanes, committedTransitions), parentFiber = parentFiber.sibling;
      else
        isViewTransitionEligible && restoreNestedViewTransitions(parentFiber);
    }
    function commitPassiveMountOnFiber(finishedRoot, finishedWork, committedLanes, committedTransitions) {
      var isViewTransitionEligible = (committedLanes & 335544064) === committedLanes;
      isViewTransitionEligible && finishedWork.alternate === null && finishedWork.return !== null && finishedWork.return.alternate !== null && restoreEnterOrExitViewTransitions(finishedWork);
      var flags = finishedWork.flags;
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 15:
          recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
          flags & 2048 && commitHookEffectListMount(9, finishedWork);
          break;
        case 1:
          recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
          break;
        case 3:
          recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
          isViewTransitionEligible && rootViewTransitionNameCanceled && (finishedRoot = finishedRoot.containerInfo, finishedRoot = finishedRoot.nodeType === 9 ? finishedRoot.body : finishedRoot.nodeName === "HTML" ? finishedRoot.ownerDocument.body : finishedRoot, finishedRoot.style.viewTransitionName === "root" && (finishedRoot.style.viewTransitionName = ""), finishedRoot = finishedRoot.ownerDocument.documentElement, finishedRoot !== null && finishedRoot.style.viewTransitionName === "none" && (finishedRoot.style.viewTransitionName = ""));
          flags & 2048 && (flags = null, finishedWork.alternate !== null && (flags = finishedWork.alternate.memoizedState.cache), finishedWork = finishedWork.memoizedState.cache, finishedWork !== flags && (finishedWork.refCount++, flags != null && releaseCache(flags)));
          break;
        case 12:
          if (flags & 2048) {
            recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
            flags = finishedWork.stateNode;
            try {
              var _finishedWork$memoize2 = finishedWork.memoizedProps, id = _finishedWork$memoize2.id, onPostCommit = _finishedWork$memoize2.onPostCommit;
              typeof onPostCommit === "function" && onPostCommit(id, finishedWork.alternate === null ? "mount" : "update", flags.passiveEffectDuration, -0);
            } catch (error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, error);
            }
          } else
            recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
          break;
        case 31:
          recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
          break;
        case 13:
          recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
          break;
        case 23:
          break;
        case 22:
          _finishedWork$memoize2 = finishedWork.stateNode;
          id = finishedWork.alternate;
          finishedWork.memoizedState !== null ? (isViewTransitionEligible && id !== null && id.memoizedState === null && restoreEnterOrExitViewTransitions(id), _finishedWork$memoize2._visibility & 2 ? recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions) : recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork)) : (isViewTransitionEligible && id !== null && id.memoizedState !== null && restoreEnterOrExitViewTransitions(finishedWork), _finishedWork$memoize2._visibility & 2 ? recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions) : (_finishedWork$memoize2._visibility |= 2, recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, (finishedWork.subtreeFlags & 10256) !== 0 || false)));
          flags & 2048 && commitOffscreenPassiveMountEffects(id, finishedWork);
          break;
        case 24:
          recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
          flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
          break;
        case 30:
          isViewTransitionEligible && (flags = finishedWork.alternate, flags !== null && (restoreViewTransitionOnHostInstances(flags.child, true), restoreViewTransitionOnHostInstances(finishedWork.child, true)));
          recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
          break;
        default:
          recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
      }
    }
    function recursivelyTraverseReconnectPassiveEffects(finishedRoot$jscomp$0, parentFiber, committedLanes$jscomp$0, committedTransitions$jscomp$0, includeWorkInProgressEffects) {
      includeWorkInProgressEffects = includeWorkInProgressEffects && ((parentFiber.subtreeFlags & 10256) !== 0 || false);
      for (parentFiber = parentFiber.child;parentFiber !== null; ) {
        var finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, committedLanes = committedLanes$jscomp$0, committedTransitions = committedTransitions$jscomp$0, flags = finishedWork.flags;
        switch (finishedWork.tag) {
          case 0:
          case 11:
          case 15:
            recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects);
            commitHookEffectListMount(8, finishedWork);
            break;
          case 23:
            break;
          case 22:
            var instance = finishedWork.stateNode;
            finishedWork.memoizedState !== null ? instance._visibility & 2 ? recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects) : recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork) : (instance._visibility |= 2, recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects));
            includeWorkInProgressEffects && flags & 2048 && commitOffscreenPassiveMountEffects(finishedWork.alternate, finishedWork);
            break;
          case 24:
            recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects);
            includeWorkInProgressEffects && flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
            break;
          default:
            recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects);
        }
        parentFiber = parentFiber.sibling;
      }
    }
    function recursivelyTraverseAtomicPassiveEffects(finishedRoot$jscomp$0, parentFiber) {
      if (parentFiber.subtreeFlags & 10256)
        for (parentFiber = parentFiber.child;parentFiber !== null; ) {
          var finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, flags = finishedWork.flags;
          switch (finishedWork.tag) {
            case 22:
              recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
              flags & 2048 && commitOffscreenPassiveMountEffects(finishedWork.alternate, finishedWork);
              break;
            case 24:
              recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
              flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
              break;
            default:
              recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
          }
          parentFiber = parentFiber.sibling;
        }
    }
    var suspenseyCommitFlag = 8192;
    function recursivelyAccumulateSuspenseyCommit(parentFiber, committedLanes, suspendedState) {
      if (parentFiber.subtreeFlags & suspenseyCommitFlag)
        for (parentFiber = parentFiber.child;parentFiber !== null; )
          accumulateSuspenseyCommitOnFiber(parentFiber, committedLanes, suspendedState), parentFiber = parentFiber.sibling;
    }
    function accumulateSuspenseyCommitOnFiber(fiber, committedLanes, suspendedState) {
      switch (fiber.tag) {
        case 26:
          recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState);
          fiber.flags & suspenseyCommitFlag && (fiber.memoizedState !== null ? suspendResource(suspendedState, currentHoistableRoot, fiber.memoizedState, fiber.memoizedProps) : (fiber = fiber.stateNode, (committedLanes & 335544128) === committedLanes && suspendInstance(suspendedState, fiber)));
          break;
        case 5:
          recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState);
          fiber.flags & suspenseyCommitFlag && (fiber = fiber.stateNode, (committedLanes & 335544128) === committedLanes && suspendInstance(suspendedState, fiber));
          break;
        case 3:
        case 4:
          var previousHoistableRoot = currentHoistableRoot;
          currentHoistableRoot = getHoistableRoot(fiber.stateNode.containerInfo);
          recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState);
          currentHoistableRoot = previousHoistableRoot;
          break;
        case 22:
          fiber.memoizedState === null && (previousHoistableRoot = fiber.alternate, previousHoistableRoot !== null && previousHoistableRoot.memoizedState !== null ? (previousHoistableRoot = suspenseyCommitFlag, suspenseyCommitFlag = 16777216, recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState), suspenseyCommitFlag = previousHoistableRoot) : recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState));
          break;
        case 30:
          if ((fiber.flags & suspenseyCommitFlag) !== 0 && (previousHoistableRoot = fiber.memoizedProps.name, previousHoistableRoot != null && previousHoistableRoot !== "auto")) {
            var state = fiber.stateNode;
            state.paired = null;
            appearingViewTransitions === null && (appearingViewTransitions = new Map);
            appearingViewTransitions.set(previousHoistableRoot, state);
          }
          recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState);
          break;
        default:
          recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState);
      }
    }
    function detachAlternateSiblings(parentFiber) {
      var previousFiber = parentFiber.alternate;
      if (previousFiber !== null && (parentFiber = previousFiber.child, parentFiber !== null)) {
        previousFiber.child = null;
        do
          previousFiber = parentFiber.sibling, parentFiber.sibling = null, parentFiber = previousFiber;
        while (parentFiber !== null);
      }
    }
    function recursivelyTraversePassiveUnmountEffects(parentFiber) {
      var deletions = parentFiber.deletions;
      if ((parentFiber.flags & 16) !== 0) {
        if (deletions !== null)
          for (var i = 0;i < deletions.length; i++) {
            var childToDelete = deletions[i];
            nextEffect = childToDelete;
            commitPassiveUnmountEffectsInsideOfDeletedTree_begin(childToDelete, parentFiber);
          }
        detachAlternateSiblings(parentFiber);
      }
      if (parentFiber.subtreeFlags & 10256)
        for (parentFiber = parentFiber.child;parentFiber !== null; )
          commitPassiveUnmountOnFiber(parentFiber), parentFiber = parentFiber.sibling;
    }
    function commitPassiveUnmountOnFiber(finishedWork) {
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 15:
          recursivelyTraversePassiveUnmountEffects(finishedWork);
          finishedWork.flags & 2048 && commitHookEffectListUnmount(9, finishedWork, finishedWork.return);
          break;
        case 3:
          recursivelyTraversePassiveUnmountEffects(finishedWork);
          break;
        case 12:
          recursivelyTraversePassiveUnmountEffects(finishedWork);
          break;
        case 22:
          var instance = finishedWork.stateNode;
          finishedWork.memoizedState !== null && instance._visibility & 2 && (finishedWork.return === null || finishedWork.return.tag !== 13) ? (instance._visibility &= -3, recursivelyTraverseDisconnectPassiveEffects(finishedWork)) : recursivelyTraversePassiveUnmountEffects(finishedWork);
          break;
        default:
          recursivelyTraversePassiveUnmountEffects(finishedWork);
      }
    }
    function recursivelyTraverseDisconnectPassiveEffects(parentFiber) {
      var deletions = parentFiber.deletions;
      if ((parentFiber.flags & 16) !== 0) {
        if (deletions !== null)
          for (var i = 0;i < deletions.length; i++) {
            var childToDelete = deletions[i];
            nextEffect = childToDelete;
            commitPassiveUnmountEffectsInsideOfDeletedTree_begin(childToDelete, parentFiber);
          }
        detachAlternateSiblings(parentFiber);
      }
      for (parentFiber = parentFiber.child;parentFiber !== null; ) {
        deletions = parentFiber;
        switch (deletions.tag) {
          case 0:
          case 11:
          case 15:
            commitHookEffectListUnmount(8, deletions, deletions.return);
            recursivelyTraverseDisconnectPassiveEffects(deletions);
            break;
          case 22:
            i = deletions.stateNode;
            i._visibility & 2 && (i._visibility &= -3, recursivelyTraverseDisconnectPassiveEffects(deletions));
            break;
          default:
            recursivelyTraverseDisconnectPassiveEffects(deletions);
        }
        parentFiber = parentFiber.sibling;
      }
    }
    function commitPassiveUnmountEffectsInsideOfDeletedTree_begin(deletedSubtreeRoot, nearestMountedAncestor) {
      for (;nextEffect !== null; ) {
        var fiber = nextEffect;
        switch (fiber.tag) {
          case 0:
          case 11:
          case 15:
            commitHookEffectListUnmount(8, fiber, nearestMountedAncestor);
            break;
          case 23:
          case 22:
            if (fiber.memoizedState !== null && fiber.memoizedState.cachePool !== null) {
              var cache = fiber.memoizedState.cachePool.pool;
              cache != null && cache.refCount++;
            }
            break;
          case 24:
            releaseCache(fiber.memoizedState.cache);
        }
        cache = fiber.child;
        if (cache !== null)
          cache.return = fiber, nextEffect = cache;
        else
          a:
            for (fiber = deletedSubtreeRoot;nextEffect !== null; ) {
              cache = nextEffect;
              var sibling = cache.sibling, returnFiber = cache.return;
              detachFiberAfterEffects(cache);
              if (cache === fiber) {
                nextEffect = null;
                break a;
              }
              if (sibling !== null) {
                sibling.return = returnFiber;
                nextEffect = sibling;
                break a;
              }
              nextEffect = returnFiber;
            }
      }
    }
    var DefaultAsyncDispatcher = {
      getCacheForType: function(resourceType) {
        var cache = readContext(CacheContext), cacheForType = cache.data.get(resourceType);
        cacheForType === undefined && (cacheForType = resourceType(), cache.data.set(resourceType, cacheForType));
        return cacheForType;
      },
      cacheSignal: function() {
        return readContext(CacheContext).controller.signal;
      }
    };
    var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
    var executionContext = 0;
    var workInProgressRoot = null;
    var workInProgress = null;
    var workInProgressRootRenderLanes = 0;
    var workInProgressSuspendedReason = 0;
    var workInProgressThrownValue = null;
    var workInProgressRootDidSkipSuspendedSiblings = false;
    var workInProgressRootIsPrerendering = false;
    var workInProgressRootDidAttachPingListener = false;
    var entangledRenderLanes = 0;
    var workInProgressRootExitStatus = 0;
    var workInProgressRootSkippedLanes = 0;
    var workInProgressRootInterleavedUpdatedLanes = 0;
    var workInProgressRootPingedLanes = 0;
    var workInProgressDeferredLane = 0;
    var workInProgressSuspendedRetryLanes = 0;
    var workInProgressRootConcurrentErrors = null;
    var workInProgressRootRecoverableErrors = null;
    var workInProgressRootDidIncludeRecursiveRenderUpdate = false;
    var globalMostRecentFallbackTime = 0;
    var globalMostRecentTransitionTime = 0;
    var workInProgressRootRenderTargetTime = Infinity;
    var workInProgressTransitions = null;
    var legacyErrorBoundariesThatAlreadyFailed = null;
    var pendingEffectsStatus = 0;
    var pendingEffectsRoot = null;
    var pendingFinishedWork = null;
    var pendingEffectsLanes = 0;
    var pendingEffectsRemainingLanes = 0;
    var pendingPassiveTransitions = null;
    var pendingRecoverableErrors = null;
    var pendingViewTransition = null;
    var pendingViewTransitionEvents = null;
    var pendingTransitionTypes = null;
    var nestedUpdateCount = 0;
    var rootWithNestedUpdates = null;
    function requestUpdateLane() {
      return (executionContext & 2) !== 0 && workInProgressRootRenderLanes !== 0 ? workInProgressRootRenderLanes & -workInProgressRootRenderLanes : ReactSharedInternals.T !== null ? requestTransitionLane() : resolveUpdatePriority();
    }
    function requestDeferredLane() {
      if (workInProgressDeferredLane === 0)
        if ((workInProgressRootRenderLanes & 536870912) === 0 || isHydrating) {
          var lane = nextTransitionDeferredLane;
          nextTransitionDeferredLane <<= 1;
          (nextTransitionDeferredLane & 3932160) === 0 && (nextTransitionDeferredLane = 262144);
          workInProgressDeferredLane = lane;
        } else
          workInProgressDeferredLane = 536870912;
      lane = suspenseHandlerStackCursor.current;
      lane !== null && (lane.flags |= 32);
      return workInProgressDeferredLane;
    }
    function scheduleViewTransitionEvent(fiber, callback) {
      if (callback != null) {
        var state = fiber.stateNode, instance = state.ref;
        instance === null && (instance = state.ref = createViewTransitionInstance(getViewTransitionName(fiber.memoizedProps, state)));
        pendingViewTransitionEvents === null && (pendingViewTransitionEvents = []);
        pendingViewTransitionEvents.push(callback.bind(null, instance));
      }
    }
    function scheduleUpdateOnFiber(root, fiber, lane) {
      if (root === workInProgressRoot && (workInProgressSuspendedReason === 2 || workInProgressSuspendedReason === 9) || root.cancelPendingCommit !== null)
        prepareFreshStack(root, 0), markRootSuspended(root, workInProgressRootRenderLanes, workInProgressDeferredLane, false);
      markRootUpdated$1(root, lane);
      if ((executionContext & 2) === 0 || root !== workInProgressRoot)
        root === workInProgressRoot && ((executionContext & 2) === 0 && (workInProgressRootInterleavedUpdatedLanes |= lane), workInProgressRootExitStatus === 4 && markRootSuspended(root, workInProgressRootRenderLanes, workInProgressDeferredLane, false)), ensureRootIsScheduled(root);
    }
    function performWorkOnRoot(root$jscomp$0, lanes, forceSync) {
      if ((executionContext & 6) !== 0)
        throw Error(formatProdErrorMessage(327));
      var shouldTimeSlice = !forceSync && (lanes & 127) === 0 && (lanes & root$jscomp$0.expiredLanes) === 0 || checkIfRootIsPrerendering(root$jscomp$0, lanes), exitStatus = shouldTimeSlice ? renderRootConcurrent(root$jscomp$0, lanes) : renderRootSync(root$jscomp$0, lanes, true), renderWasConcurrent = shouldTimeSlice;
      do {
        if (exitStatus === 0) {
          workInProgressRootIsPrerendering && !shouldTimeSlice && markRootSuspended(root$jscomp$0, lanes, 0, false);
          break;
        } else {
          forceSync = root$jscomp$0.current.alternate;
          if (renderWasConcurrent && !isRenderConsistentWithExternalStores(forceSync)) {
            exitStatus = renderRootSync(root$jscomp$0, lanes, false);
            renderWasConcurrent = false;
            continue;
          }
          if (exitStatus === 2) {
            renderWasConcurrent = lanes;
            if (root$jscomp$0.errorRecoveryDisabledLanes & renderWasConcurrent)
              var JSCompiler_inline_result = 0;
            else
              JSCompiler_inline_result = root$jscomp$0.pendingLanes & -536870913, JSCompiler_inline_result = JSCompiler_inline_result !== 0 ? JSCompiler_inline_result : JSCompiler_inline_result & 536870912 ? 536870912 : 0;
            if (JSCompiler_inline_result !== 0) {
              lanes = JSCompiler_inline_result;
              a: {
                var root = root$jscomp$0;
                exitStatus = workInProgressRootConcurrentErrors;
                var wasRootDehydrated = root.current.memoizedState.isDehydrated;
                wasRootDehydrated && (prepareFreshStack(root, JSCompiler_inline_result).flags |= 256);
                JSCompiler_inline_result = renderRootSync(root, JSCompiler_inline_result, false);
                if (JSCompiler_inline_result !== 2 && JSCompiler_inline_result !== 6) {
                  if (workInProgressRootDidAttachPingListener && !wasRootDehydrated) {
                    root.errorRecoveryDisabledLanes |= renderWasConcurrent;
                    workInProgressRootInterleavedUpdatedLanes |= renderWasConcurrent;
                    exitStatus = 4;
                    break a;
                  }
                  renderWasConcurrent = workInProgressRootRecoverableErrors;
                  workInProgressRootRecoverableErrors = exitStatus;
                  renderWasConcurrent !== null && (workInProgressRootRecoverableErrors === null ? workInProgressRootRecoverableErrors = renderWasConcurrent : workInProgressRootRecoverableErrors.push.apply(workInProgressRootRecoverableErrors, renderWasConcurrent));
                }
                exitStatus = JSCompiler_inline_result;
              }
              renderWasConcurrent = false;
              if (exitStatus !== 2)
                continue;
            }
          }
          if (exitStatus === 1) {
            prepareFreshStack(root$jscomp$0, 0);
            markRootSuspended(root$jscomp$0, lanes, 0, true);
            break;
          }
          a: {
            shouldTimeSlice = root$jscomp$0;
            renderWasConcurrent = exitStatus;
            switch (renderWasConcurrent) {
              case 0:
              case 1:
                throw Error(formatProdErrorMessage(345));
              case 4:
                if ((lanes & 4194048) !== lanes && (lanes & 62914560) !== lanes)
                  break;
              case 6:
                markRootSuspended(shouldTimeSlice, lanes, workInProgressDeferredLane, !workInProgressRootDidSkipSuspendedSiblings);
                break a;
              case 2:
                workInProgressRootRecoverableErrors = null;
                break;
              case 3:
              case 5:
                break;
              default:
                throw Error(formatProdErrorMessage(329));
            }
            if ((lanes & 62914560) === lanes && (exitStatus = globalMostRecentFallbackTime + 300 - now(), 10 < exitStatus)) {
              markRootSuspended(shouldTimeSlice, lanes, workInProgressDeferredLane, !workInProgressRootDidSkipSuspendedSiblings);
              if (getNextLanes(shouldTimeSlice, 0, true) !== 0)
                break a;
              pendingEffectsLanes = lanes;
              shouldTimeSlice.timeoutHandle = scheduleTimeout(completeRootWhenReady.bind(null, shouldTimeSlice, forceSync, workInProgressRootRecoverableErrors, workInProgressTransitions, workInProgressRootDidIncludeRecursiveRenderUpdate, lanes, workInProgressDeferredLane, workInProgressRootInterleavedUpdatedLanes, workInProgressSuspendedRetryLanes, workInProgressRootDidSkipSuspendedSiblings, renderWasConcurrent, "Throttled", -0, 0), exitStatus);
              break a;
            }
            completeRootWhenReady(shouldTimeSlice, forceSync, workInProgressRootRecoverableErrors, workInProgressTransitions, workInProgressRootDidIncludeRecursiveRenderUpdate, lanes, workInProgressDeferredLane, workInProgressRootInterleavedUpdatedLanes, workInProgressSuspendedRetryLanes, workInProgressRootDidSkipSuspendedSiblings, renderWasConcurrent, null, -0, 0);
          }
        }
        break;
      } while (1);
      ensureRootIsScheduled(root$jscomp$0);
    }
    function completeRootWhenReady(root, finishedWork, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, lanes, spawnedLane, updatedLanes, suspendedRetryLanes, didSkipSuspendedSiblings, exitStatus, suspendedCommitReason, completedRenderStartTime, completedRenderEndTime) {
      root.timeoutHandle = -1;
      var subtreeFlags = finishedWork.subtreeFlags, isViewTransitionEligible = (lanes & 335544064) === lanes;
      suspendedCommitReason = null;
      if (isViewTransitionEligible || subtreeFlags & 8192 || (subtreeFlags & 16785408) === 16785408) {
        if (suspendedCommitReason = {
          stylesheets: null,
          count: 0,
          imgCount: 0,
          imgBytes: 0,
          suspenseyImages: [],
          waitingForImages: true,
          waitingForViewTransition: false,
          unsuspend: noop$1
        }, appearingViewTransitions = null, accumulateSuspenseyCommitOnFiber(finishedWork, lanes, suspendedCommitReason), isViewTransitionEligible && (subtreeFlags = suspendedCommitReason, isViewTransitionEligible = root.containerInfo, isViewTransitionEligible = (isViewTransitionEligible.nodeType === 9 ? isViewTransitionEligible : isViewTransitionEligible.ownerDocument).__reactViewTransition, isViewTransitionEligible != null && (subtreeFlags.count++, subtreeFlags.waitingForViewTransition = true, subtreeFlags = onUnsuspend.bind(subtreeFlags), isViewTransitionEligible.finished.then(subtreeFlags, subtreeFlags))), subtreeFlags = (lanes & 62914560) === lanes ? globalMostRecentFallbackTime - now() : (lanes & 4194048) === lanes ? globalMostRecentTransitionTime - now() : 0, subtreeFlags = waitForCommitToBeReady(suspendedCommitReason, subtreeFlags), subtreeFlags !== null) {
          pendingEffectsLanes = lanes;
          root.cancelPendingCommit = subtreeFlags(completeRoot.bind(null, root, finishedWork, lanes, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes, didSkipSuspendedSiblings, exitStatus, suspendedCommitReason, null, completedRenderStartTime, completedRenderEndTime));
          markRootSuspended(root, lanes, spawnedLane, !didSkipSuspendedSiblings);
          return;
        }
      }
      completeRoot(root, finishedWork, lanes, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes, didSkipSuspendedSiblings, exitStatus, suspendedCommitReason);
    }
    function isRenderConsistentWithExternalStores(finishedWork) {
      for (var node = finishedWork;; ) {
        var tag = node.tag;
        if ((tag === 0 || tag === 11 || tag === 15) && node.flags & 16384 && (tag = node.updateQueue, tag !== null && (tag = tag.stores, tag !== null)))
          for (var i = 0;i < tag.length; i++) {
            var check = tag[i], getSnapshot = check.getSnapshot;
            check = check.value;
            try {
              if (!objectIs(getSnapshot(), check))
                return false;
            } catch (error) {
              return false;
            }
          }
        tag = node.child;
        if (node.subtreeFlags & 16384 && tag !== null)
          tag.return = node, node = tag;
        else {
          if (node === finishedWork)
            break;
          for (;node.sibling === null; ) {
            if (node.return === null || node.return === finishedWork)
              return true;
            node = node.return;
          }
          node.sibling.return = node.return;
          node = node.sibling;
        }
      }
      return true;
    }
    function markRootSuspended(root, suspendedLanes, spawnedLane, didAttemptEntireTree) {
      suspendedLanes = getEntangledLanes(root, suspendedLanes);
      suspendedLanes &= ~workInProgressRootPingedLanes;
      suspendedLanes &= ~workInProgressRootInterleavedUpdatedLanes;
      root.suspendedLanes |= suspendedLanes;
      root.pingedLanes &= ~suspendedLanes;
      didAttemptEntireTree && (root.warmLanes |= suspendedLanes);
      didAttemptEntireTree = root.expirationTimes;
      for (var lanes = suspendedLanes;0 < lanes; ) {
        var index$6 = 31 - clz32(lanes), lane = 1 << index$6;
        didAttemptEntireTree[index$6] = -1;
        lanes &= ~lane;
      }
      spawnedLane !== 0 && markSpawnedDeferredLane(root, spawnedLane, suspendedLanes);
    }
    function flushSyncWork$1() {
      return (executionContext & 6) === 0 ? (flushSyncWorkAcrossRoots_impl(0, false), false) : true;
    }
    function resetWorkInProgressStack() {
      if (workInProgress !== null) {
        if (workInProgressSuspendedReason === 0)
          var interruptedWork = workInProgress.return;
        else
          interruptedWork = workInProgress, lastContextDependency = currentlyRenderingFiber$1 = null, resetHooksOnUnwind(interruptedWork), thenableState$1 = null, thenableIndexCounter$1 = 0, interruptedWork = workInProgress;
        for (;interruptedWork !== null; )
          unwindInterruptedWork(interruptedWork.alternate, interruptedWork), interruptedWork = interruptedWork.return;
        workInProgress = null;
      }
    }
    function prepareFreshStack(root, lanes) {
      var timeoutHandle = root.timeoutHandle;
      timeoutHandle !== -1 && (root.timeoutHandle = -1, cancelTimeout(timeoutHandle));
      timeoutHandle = root.cancelPendingCommit;
      timeoutHandle !== null && (root.cancelPendingCommit = null, timeoutHandle());
      pendingEffectsLanes = 0;
      resetWorkInProgressStack();
      workInProgressRoot = root;
      workInProgress = timeoutHandle = createWorkInProgress(root.current, null);
      workInProgressRootRenderLanes = lanes;
      workInProgressSuspendedReason = 0;
      workInProgressThrownValue = null;
      workInProgressRootDidSkipSuspendedSiblings = false;
      workInProgressRootIsPrerendering = checkIfRootIsPrerendering(root, lanes);
      workInProgressRootDidAttachPingListener = false;
      workInProgressSuspendedRetryLanes = workInProgressDeferredLane = workInProgressRootPingedLanes = workInProgressRootInterleavedUpdatedLanes = workInProgressRootSkippedLanes = workInProgressRootExitStatus = 0;
      workInProgressRootRecoverableErrors = workInProgressRootConcurrentErrors = null;
      workInProgressRootDidIncludeRecursiveRenderUpdate = false;
      entangledRenderLanes = getEntangledLanes(root, lanes);
      finishQueueingConcurrentUpdates();
      return timeoutHandle;
    }
    function handleThrow(root, thrownValue) {
      currentlyRenderingFiber = null;
      ReactSharedInternals.H = ContextOnlyDispatcher;
      thrownValue === SuspenseException || thrownValue === SuspenseActionException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = 3) : thrownValue === SuspenseyCommitException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = 4) : workInProgressSuspendedReason = thrownValue === SelectiveHydrationException ? 8 : thrownValue !== null && typeof thrownValue === "object" && typeof thrownValue.then === "function" ? 6 : 1;
      workInProgressThrownValue = thrownValue;
      workInProgress === null && (workInProgressRootExitStatus = 1, logUncaughtError(root, createCapturedValueAtFiber(thrownValue, root.current)));
    }
    function shouldRemainOnPreviousScreen() {
      var handler = suspenseHandlerStackCursor.current;
      return handler === null ? true : (workInProgressRootRenderLanes & 4194048) === workInProgressRootRenderLanes ? shellBoundary === null ? true : false : (workInProgressRootRenderLanes & 62914560) === workInProgressRootRenderLanes || (workInProgressRootRenderLanes & 536870912) !== 0 ? handler === shellBoundary : false;
    }
    function pushDispatcher() {
      var prevDispatcher = ReactSharedInternals.H;
      ReactSharedInternals.H = ContextOnlyDispatcher;
      return prevDispatcher === null ? ContextOnlyDispatcher : prevDispatcher;
    }
    function pushAsyncDispatcher() {
      var prevAsyncDispatcher = ReactSharedInternals.A;
      ReactSharedInternals.A = DefaultAsyncDispatcher;
      return prevAsyncDispatcher;
    }
    function renderDidSuspendDelayIfPossible() {
      workInProgressRootExitStatus = 4;
      workInProgressRootDidSkipSuspendedSiblings || (workInProgressRootRenderLanes & 4194048) !== workInProgressRootRenderLanes && suspenseHandlerStackCursor.current !== null || (workInProgressRootIsPrerendering = true);
      (workInProgressRootSkippedLanes & 134217727) === 0 && (workInProgressRootInterleavedUpdatedLanes & 134217727) === 0 || workInProgressRoot === null || markRootSuspended(workInProgressRoot, workInProgressRootRenderLanes, workInProgressDeferredLane, false);
    }
    function renderRootSync(root, lanes, shouldYieldForPrerendering) {
      var prevExecutionContext = executionContext;
      executionContext |= 2;
      var prevDispatcher = pushDispatcher(), prevAsyncDispatcher = pushAsyncDispatcher();
      if (workInProgressRoot !== root || workInProgressRootRenderLanes !== lanes)
        workInProgressTransitions = null, prepareFreshStack(root, lanes);
      lanes = false;
      var exitStatus = workInProgressRootExitStatus;
      a:
        do
          try {
            if (workInProgressSuspendedReason !== 0 && workInProgress !== null) {
              var unitOfWork = workInProgress, thrownValue = workInProgressThrownValue;
              switch (workInProgressSuspendedReason) {
                case 8:
                  resetWorkInProgressStack();
                  exitStatus = 6;
                  break a;
                case 3:
                case 2:
                case 9:
                case 6:
                  suspenseHandlerStackCursor.current === null && (lanes = true);
                  var reason = workInProgressSuspendedReason;
                  workInProgressSuspendedReason = 0;
                  workInProgressThrownValue = null;
                  throwAndUnwindWorkLoop(root, unitOfWork, thrownValue, reason);
                  if (shouldYieldForPrerendering && workInProgressRootIsPrerendering) {
                    exitStatus = 0;
                    break a;
                  }
                  break;
                default:
                  reason = workInProgressSuspendedReason, workInProgressSuspendedReason = 0, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root, unitOfWork, thrownValue, reason);
              }
            }
            workLoopSync();
            exitStatus = workInProgressRootExitStatus;
            break;
          } catch (thrownValue$184) {
            handleThrow(root, thrownValue$184);
          }
        while (1);
      lanes && root.shellSuspendCounter++;
      lastContextDependency = currentlyRenderingFiber$1 = null;
      executionContext = prevExecutionContext;
      ReactSharedInternals.H = prevDispatcher;
      ReactSharedInternals.A = prevAsyncDispatcher;
      workInProgress === null && (workInProgressRoot = null, workInProgressRootRenderLanes = 0, finishQueueingConcurrentUpdates());
      return exitStatus;
    }
    function workLoopSync() {
      for (;workInProgress !== null; )
        performUnitOfWork(workInProgress);
    }
    function renderRootConcurrent(root, lanes) {
      var prevExecutionContext = executionContext;
      executionContext |= 2;
      var prevDispatcher = pushDispatcher(), prevAsyncDispatcher = pushAsyncDispatcher();
      workInProgressRoot !== root || workInProgressRootRenderLanes !== lanes ? (workInProgressTransitions = null, workInProgressRootRenderTargetTime = now() + 500, prepareFreshStack(root, lanes)) : workInProgressRootIsPrerendering = checkIfRootIsPrerendering(root, lanes);
      a:
        do
          try {
            if (workInProgressSuspendedReason !== 0 && workInProgress !== null) {
              lanes = workInProgress;
              var thrownValue = workInProgressThrownValue;
              b:
                switch (workInProgressSuspendedReason) {
                  case 1:
                    workInProgressSuspendedReason = 0;
                    workInProgressThrownValue = null;
                    throwAndUnwindWorkLoop(root, lanes, thrownValue, 1);
                    break;
                  case 2:
                  case 9:
                    if (isThenableResolved(thrownValue)) {
                      workInProgressSuspendedReason = 0;
                      workInProgressThrownValue = null;
                      replaySuspendedUnitOfWork(lanes);
                      break;
                    }
                    lanes = function() {
                      workInProgressSuspendedReason !== 2 && workInProgressSuspendedReason !== 9 || workInProgressRoot !== root || (workInProgressSuspendedReason = 7);
                      ensureRootIsScheduled(root);
                    };
                    thrownValue.then(lanes, lanes);
                    break a;
                  case 3:
                    workInProgressSuspendedReason = 7;
                    break a;
                  case 4:
                    workInProgressSuspendedReason = 5;
                    break a;
                  case 7:
                    isThenableResolved(thrownValue) ? (workInProgressSuspendedReason = 0, workInProgressThrownValue = null, replaySuspendedUnitOfWork(lanes)) : (workInProgressSuspendedReason = 0, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root, lanes, thrownValue, 7));
                    break;
                  case 5:
                    var resource = null;
                    switch (workInProgress.tag) {
                      case 26:
                        resource = workInProgress.memoizedState;
                      case 5:
                      case 27:
                        var hostFiber = workInProgress;
                        if (resource ? preloadResource(resource) : hostFiber.stateNode.complete) {
                          workInProgressSuspendedReason = 0;
                          workInProgressThrownValue = null;
                          var sibling = hostFiber.sibling;
                          if (sibling !== null)
                            workInProgress = sibling;
                          else {
                            var returnFiber = hostFiber.return;
                            returnFiber !== null ? (workInProgress = returnFiber, completeUnitOfWork(returnFiber)) : workInProgress = null;
                          }
                          break b;
                        }
                    }
                    workInProgressSuspendedReason = 0;
                    workInProgressThrownValue = null;
                    throwAndUnwindWorkLoop(root, lanes, thrownValue, 5);
                    break;
                  case 6:
                    workInProgressSuspendedReason = 0;
                    workInProgressThrownValue = null;
                    throwAndUnwindWorkLoop(root, lanes, thrownValue, 6);
                    break;
                  case 8:
                    resetWorkInProgressStack();
                    workInProgressRootExitStatus = 6;
                    break a;
                  default:
                    throw Error(formatProdErrorMessage(462));
                }
            }
            workLoopConcurrentByScheduler();
            break;
          } catch (thrownValue$186) {
            handleThrow(root, thrownValue$186);
          }
        while (1);
      lastContextDependency = currentlyRenderingFiber$1 = null;
      ReactSharedInternals.H = prevDispatcher;
      ReactSharedInternals.A = prevAsyncDispatcher;
      executionContext = prevExecutionContext;
      if (workInProgress !== null)
        return 0;
      workInProgressRoot = null;
      workInProgressRootRenderLanes = 0;
      finishQueueingConcurrentUpdates();
      return workInProgressRootExitStatus;
    }
    function workLoopConcurrentByScheduler() {
      for (;workInProgress !== null && !shouldYield(); )
        performUnitOfWork(workInProgress);
    }
    function performUnitOfWork(unitOfWork) {
      var next = beginWork(unitOfWork.alternate, unitOfWork, entangledRenderLanes);
      unitOfWork.memoizedProps = unitOfWork.pendingProps;
      next === null ? completeUnitOfWork(unitOfWork) : workInProgress = next;
    }
    function replaySuspendedUnitOfWork(unitOfWork) {
      var next = unitOfWork;
      var current = next.alternate;
      switch (next.tag) {
        case 15:
        case 0:
          next = replayFunctionComponent(current, next, next.pendingProps, next.type, undefined, workInProgressRootRenderLanes);
          break;
        case 11:
          next = replayFunctionComponent(current, next, next.pendingProps, next.type.render, next.ref, workInProgressRootRenderLanes);
          break;
        case 5:
          resetHooksOnUnwind(next);
          var fiber = next;
          fiber === hydrationParentFiber && (isHydrating ? (popToNextHostParent(fiber), fiber.tag === 5 && fiber.stateNode != null && (nextHydratableInstance = fiber.stateNode)) : (popToNextHostParent(fiber), isHydrating = true));
        default:
          unwindInterruptedWork(current, next), next = workInProgress = resetWorkInProgress(next, entangledRenderLanes), next = beginWork(current, next, entangledRenderLanes);
      }
      unitOfWork.memoizedProps = unitOfWork.pendingProps;
      next === null ? completeUnitOfWork(unitOfWork) : workInProgress = next;
    }
    function throwAndUnwindWorkLoop(root, unitOfWork, thrownValue, suspendedReason) {
      lastContextDependency = currentlyRenderingFiber$1 = null;
      resetHooksOnUnwind(unitOfWork);
      thenableState$1 = null;
      thenableIndexCounter$1 = 0;
      var returnFiber = unitOfWork.return;
      try {
        if (throwException(root, returnFiber, unitOfWork, thrownValue, workInProgressRootRenderLanes)) {
          workInProgressRootExitStatus = 1;
          logUncaughtError(root, createCapturedValueAtFiber(thrownValue, root.current));
          workInProgress = null;
          return;
        }
      } catch (error) {
        if (returnFiber !== null)
          throw workInProgress = returnFiber, error;
        workInProgressRootExitStatus = 1;
        logUncaughtError(root, createCapturedValueAtFiber(thrownValue, root.current));
        workInProgress = null;
        return;
      }
      if (unitOfWork.flags & 32768) {
        if (isHydrating || suspendedReason === 1)
          root = true;
        else if (workInProgressRootIsPrerendering || (workInProgressRootRenderLanes & 536870912) !== 0)
          root = false;
        else if (workInProgressRootDidSkipSuspendedSiblings = root = true, suspendedReason === 2 || suspendedReason === 9 || suspendedReason === 3 || suspendedReason === 6)
          suspendedReason = suspenseHandlerStackCursor.current, suspendedReason !== null && suspendedReason.tag === 13 && (suspendedReason.flags |= 16384);
        unwindUnitOfWork(unitOfWork, root);
      } else
        completeUnitOfWork(unitOfWork);
    }
    function completeUnitOfWork(unitOfWork) {
      var completedWork = unitOfWork;
      do {
        if ((completedWork.flags & 32768) !== 0) {
          unwindUnitOfWork(completedWork, workInProgressRootDidSkipSuspendedSiblings);
          return;
        }
        unitOfWork = completedWork.return;
        var next = completeWork(completedWork.alternate, completedWork, entangledRenderLanes);
        if (next !== null) {
          workInProgress = next;
          return;
        }
        completedWork = completedWork.sibling;
        if (completedWork !== null) {
          workInProgress = completedWork;
          return;
        }
        workInProgress = completedWork = unitOfWork;
      } while (completedWork !== null);
      workInProgressRootExitStatus === 0 && (workInProgressRootExitStatus = 5);
    }
    function unwindUnitOfWork(unitOfWork, skipSiblings) {
      do {
        var next = unwindWork(unitOfWork.alternate, unitOfWork);
        if (next !== null) {
          next.flags &= 32767;
          workInProgress = next;
          return;
        }
        next = unitOfWork.return;
        next !== null && (next.flags |= 32768, next.subtreeFlags = 0, next.deletions = null);
        if (!skipSiblings && (unitOfWork = unitOfWork.sibling, unitOfWork !== null)) {
          workInProgress = unitOfWork;
          return;
        }
        workInProgress = unitOfWork = next;
      } while (unitOfWork !== null);
      workInProgressRootExitStatus = 6;
      workInProgress = null;
    }
    function completeRoot(root, finishedWork, lanes, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes, didSkipSuspendedSiblings, exitStatus, suspendedState) {
      root.cancelPendingCommit = null;
      do
        flushPendingEffects();
      while (pendingEffectsStatus !== 0);
      if ((executionContext & 6) !== 0)
        throw Error(formatProdErrorMessage(327));
      if (finishedWork !== null) {
        if (finishedWork === root.current)
          throw Error(formatProdErrorMessage(177));
        root === workInProgressRoot && (workInProgress = workInProgressRoot = null, workInProgressRootRenderLanes = 0);
        pendingFinishedWork = finishedWork;
        pendingEffectsRoot = root;
        pendingEffectsLanes = lanes;
        pendingPassiveTransitions = transitions;
        pendingRecoverableErrors = recoverableErrors;
        commitRoot(root, finishedWork, lanes, spawnedLane, updatedLanes, suspendedRetryLanes, suspendedState);
      }
    }
    function commitRoot(root, finishedWork, lanes, spawnedLane, updatedLanes, suspendedRetryLanes, suspendedState) {
      var remainingLanes = finishedWork.lanes | finishedWork.childLanes;
      pendingEffectsRemainingLanes = remainingLanes;
      remainingLanes |= concurrentlyUpdatedLanes;
      markRootFinished(root, lanes, remainingLanes, spawnedLane, updatedLanes, suspendedRetryLanes);
      pendingViewTransitionEvents = null;
      (lanes & 335544064) === lanes ? (pendingTransitionTypes = claimQueuedTransitionTypes(root), spawnedLane = 10262) : (pendingTransitionTypes = null, spawnedLane = 10256);
      (finishedWork.subtreeFlags & spawnedLane) !== 0 || (finishedWork.flags & spawnedLane) !== 0 ? (root.callbackNode = null, root.callbackPriority = 0, scheduleCallback$1(NormalPriority$1, function() {
        flushPassiveEffects();
        return null;
      })) : (root.callbackNode = null, root.callbackPriority = 0);
      shouldStartViewTransition = false;
      spawnedLane = (finishedWork.flags & 13878) !== 0;
      if ((finishedWork.subtreeFlags & 13878) !== 0 || spawnedLane) {
        spawnedLane = ReactSharedInternals.T;
        ReactSharedInternals.T = null;
        updatedLanes = ReactDOMSharedInternals.p;
        ReactDOMSharedInternals.p = 2;
        suspendedRetryLanes = executionContext;
        executionContext |= 4;
        try {
          commitBeforeMutationEffects(root, finishedWork, lanes);
        } finally {
          executionContext = suspendedRetryLanes, ReactDOMSharedInternals.p = updatedLanes, ReactSharedInternals.T = spawnedLane;
        }
      }
      pendingEffectsStatus = 1;
      shouldStartViewTransition ? pendingViewTransition = startViewTransition(suspendedState, root.containerInfo, pendingTransitionTypes, flushMutationEffects, flushLayoutEffects, flushAfterMutationEffects, flushSpawnedWork, flushPassiveEffects, reportViewTransitionError, null, null) : (flushMutationEffects(), flushLayoutEffects(), flushSpawnedWork());
    }
    function reportViewTransitionError(error) {
      if (pendingEffectsStatus !== 0) {
        var onRecoverableError = pendingEffectsRoot.onRecoverableError;
        onRecoverableError(error, { componentStack: null });
      }
    }
    function flushAfterMutationEffects() {
      pendingEffectsStatus === 3 && (pendingEffectsStatus = 0, commitAfterMutationEffectsOnFiber(pendingFinishedWork, pendingEffectsRoot), pendingEffectsStatus = 4);
    }
    function flushMutationEffects() {
      if (pendingEffectsStatus === 1) {
        pendingEffectsStatus = 0;
        var root = pendingEffectsRoot, finishedWork = pendingFinishedWork, lanes = pendingEffectsLanes, rootMutationHasEffect = (finishedWork.flags & 13878) !== 0;
        if ((finishedWork.subtreeFlags & 13878) !== 0 || rootMutationHasEffect) {
          rootMutationHasEffect = ReactSharedInternals.T;
          ReactSharedInternals.T = null;
          var previousPriority = ReactDOMSharedInternals.p;
          ReactDOMSharedInternals.p = 2;
          var prevExecutionContext = executionContext;
          executionContext |= 4;
          try {
            inUpdateViewTransition = rootViewTransitionAffected = false;
            commitMutationEffectsOnFiber(finishedWork, root, lanes);
            lanes = selectionInformation;
            var curFocusedElem = getActiveElementDeep(root.containerInfo), priorFocusedElem = lanes.focusedElem, priorSelectionRange = lanes.selectionRange;
            if (curFocusedElem !== priorFocusedElem && priorFocusedElem && priorFocusedElem.ownerDocument && containsNode(priorFocusedElem.ownerDocument.documentElement, priorFocusedElem)) {
              if (priorSelectionRange !== null && hasSelectionCapabilities(priorFocusedElem)) {
                var { start, end } = priorSelectionRange;
                end === undefined && (end = start);
                if ("selectionStart" in priorFocusedElem)
                  priorFocusedElem.selectionStart = start, priorFocusedElem.selectionEnd = Math.min(end, priorFocusedElem.value.length);
                else {
                  var doc = priorFocusedElem.ownerDocument || document, win = doc && doc.defaultView || window;
                  if (win.getSelection) {
                    var selection = win.getSelection(), length = priorFocusedElem.textContent.length, start$jscomp$0 = Math.min(priorSelectionRange.start, length), end$jscomp$0 = priorSelectionRange.end === undefined ? start$jscomp$0 : Math.min(priorSelectionRange.end, length);
                    !selection.extend && start$jscomp$0 > end$jscomp$0 && (curFocusedElem = end$jscomp$0, end$jscomp$0 = start$jscomp$0, start$jscomp$0 = curFocusedElem);
                    var startMarker = getNodeForCharacterOffset(priorFocusedElem, start$jscomp$0), endMarker = getNodeForCharacterOffset(priorFocusedElem, end$jscomp$0);
                    if (startMarker && endMarker && (selection.rangeCount !== 1 || selection.anchorNode !== startMarker.node || selection.anchorOffset !== startMarker.offset || selection.focusNode !== endMarker.node || selection.focusOffset !== endMarker.offset)) {
                      var range = doc.createRange();
                      range.setStart(startMarker.node, startMarker.offset);
                      selection.removeAllRanges();
                      start$jscomp$0 > end$jscomp$0 ? (selection.addRange(range), selection.extend(endMarker.node, endMarker.offset)) : (range.setEnd(endMarker.node, endMarker.offset), selection.addRange(range));
                    }
                  }
                }
              }
              doc = [];
              for (selection = priorFocusedElem;selection = selection.parentNode; )
                selection.nodeType === 1 && doc.push({
                  element: selection,
                  left: selection.scrollLeft,
                  top: selection.scrollTop
                });
              typeof priorFocusedElem.focus === "function" && priorFocusedElem.focus();
              for (priorFocusedElem = 0;priorFocusedElem < doc.length; priorFocusedElem++) {
                var info = doc[priorFocusedElem];
                info.element.scrollLeft = info.left;
                info.element.scrollTop = info.top;
              }
            }
            _enabled = !!eventsEnabled;
            selectionInformation = eventsEnabled = null;
          } finally {
            executionContext = prevExecutionContext, ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = rootMutationHasEffect;
          }
        }
        root.current = finishedWork;
        pendingEffectsStatus = 2;
      }
    }
    function flushLayoutEffects() {
      if (pendingEffectsStatus === 2) {
        pendingEffectsStatus = 0;
        var root = pendingEffectsRoot, finishedWork = pendingFinishedWork, rootHasLayoutEffect = (finishedWork.flags & 8772) !== 0;
        if ((finishedWork.subtreeFlags & 8772) !== 0 || rootHasLayoutEffect) {
          rootHasLayoutEffect = ReactSharedInternals.T;
          ReactSharedInternals.T = null;
          var previousPriority = ReactDOMSharedInternals.p;
          ReactDOMSharedInternals.p = 2;
          var prevExecutionContext = executionContext;
          executionContext |= 4;
          try {
            commitLayoutEffectOnFiber(root, finishedWork.alternate, finishedWork);
          } finally {
            executionContext = prevExecutionContext, ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = rootHasLayoutEffect;
          }
        }
        pendingEffectsStatus = 3;
      }
    }
    function flushSpawnedWork() {
      if (pendingEffectsStatus === 4 || pendingEffectsStatus === 3) {
        pendingEffectsStatus = 0;
        var committedViewTransition = pendingViewTransition;
        pendingViewTransition = null;
        requestPaint();
        var root = pendingEffectsRoot, finishedWork = pendingFinishedWork, lanes = pendingEffectsLanes, recoverableErrors = pendingRecoverableErrors, passiveSubtreeMask = (lanes & 335544064) === lanes ? 10262 : 10256;
        (finishedWork.subtreeFlags & passiveSubtreeMask) !== 0 || (finishedWork.flags & passiveSubtreeMask) !== 0 ? pendingEffectsStatus = 5 : (pendingEffectsStatus = 0, pendingFinishedWork = pendingEffectsRoot = null, releaseRootPooledCache(root, root.pendingLanes));
        passiveSubtreeMask = root.pendingLanes;
        passiveSubtreeMask === 0 && (legacyErrorBoundariesThatAlreadyFailed = null);
        lanesToEventPriority(lanes);
        finishedWork = finishedWork.stateNode;
        if (injectedHook && typeof injectedHook.onCommitFiberRoot === "function")
          try {
            injectedHook.onCommitFiberRoot(rendererID, finishedWork, undefined, (finishedWork.current.flags & 128) === 128);
          } catch (err) {}
        if (recoverableErrors !== null) {
          finishedWork = ReactSharedInternals.T;
          passiveSubtreeMask = ReactDOMSharedInternals.p;
          ReactDOMSharedInternals.p = 2;
          ReactSharedInternals.T = null;
          try {
            for (var onRecoverableError = root.onRecoverableError, i = 0;i < recoverableErrors.length; i++) {
              var recoverableError = recoverableErrors[i];
              onRecoverableError(recoverableError.value, {
                componentStack: recoverableError.stack
              });
            }
          } finally {
            ReactSharedInternals.T = finishedWork, ReactDOMSharedInternals.p = passiveSubtreeMask;
          }
        }
        recoverableErrors = pendingViewTransitionEvents;
        onRecoverableError = pendingTransitionTypes;
        pendingTransitionTypes = null;
        if (recoverableErrors !== null && (pendingViewTransitionEvents = null, onRecoverableError === null && (onRecoverableError = []), committedViewTransition !== null))
          for (recoverableError = 0;recoverableError < recoverableErrors.length; recoverableError++)
            finishedWork = (0, recoverableErrors[recoverableError])(onRecoverableError), finishedWork !== undefined && committedViewTransition.finished.finally(finishedWork);
        (pendingEffectsLanes & 3) !== 0 && flushPendingEffects();
        ensureRootIsScheduled(root);
        passiveSubtreeMask = root.pendingLanes;
        (lanes & 261930) !== 0 && (passiveSubtreeMask & 42) !== 0 ? root === rootWithNestedUpdates ? nestedUpdateCount++ : (nestedUpdateCount = 0, rootWithNestedUpdates = root) : (nestedUpdateCount = 0, rootWithNestedUpdates = null);
        flushSyncWorkAcrossRoots_impl(0, false);
      }
    }
    function releaseRootPooledCache(root, remainingLanes) {
      (root.pooledCacheLanes &= remainingLanes) === 0 && (remainingLanes = root.pooledCache, remainingLanes != null && (root.pooledCache = null, releaseCache(remainingLanes)));
    }
    function flushPendingEffects() {
      pendingViewTransition !== null && (pendingViewTransition.skipTransition(), pendingViewTransition = null);
      flushMutationEffects();
      flushLayoutEffects();
      flushSpawnedWork();
      return flushPassiveEffects();
    }
    function flushPassiveEffects() {
      if (pendingEffectsStatus !== 5)
        return false;
      var root = pendingEffectsRoot, remainingLanes = pendingEffectsRemainingLanes;
      pendingEffectsRemainingLanes = 0;
      var renderPriority = lanesToEventPriority(pendingEffectsLanes), prevTransition = ReactSharedInternals.T, previousPriority = ReactDOMSharedInternals.p;
      try {
        ReactDOMSharedInternals.p = 32 > renderPriority ? 32 : renderPriority;
        ReactSharedInternals.T = null;
        renderPriority = pendingPassiveTransitions;
        pendingPassiveTransitions = null;
        var root$jscomp$0 = pendingEffectsRoot, lanes = pendingEffectsLanes;
        pendingEffectsStatus = 0;
        pendingFinishedWork = pendingEffectsRoot = null;
        pendingEffectsLanes = 0;
        if ((executionContext & 6) !== 0)
          throw Error(formatProdErrorMessage(331));
        var prevExecutionContext = executionContext;
        executionContext |= 4;
        commitPassiveUnmountOnFiber(root$jscomp$0.current);
        commitPassiveMountOnFiber(root$jscomp$0, root$jscomp$0.current, lanes, renderPriority);
        executionContext = prevExecutionContext;
        flushSyncWorkAcrossRoots_impl(0, false);
        if (injectedHook && typeof injectedHook.onPostCommitFiberRoot === "function")
          try {
            injectedHook.onPostCommitFiberRoot(rendererID, root$jscomp$0);
          } catch (err) {}
        return true;
      } finally {
        ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition, releaseRootPooledCache(root, remainingLanes);
      }
    }
    function captureCommitPhaseErrorOnRoot(rootFiber, sourceFiber, error) {
      sourceFiber = createCapturedValueAtFiber(error, sourceFiber);
      sourceFiber = createRootErrorUpdate(rootFiber.stateNode, sourceFiber, 2);
      rootFiber = enqueueUpdate(rootFiber, sourceFiber, 2);
      rootFiber !== null && (markRootUpdated$1(rootFiber, 2), ensureRootIsScheduled(rootFiber));
    }
    function captureCommitPhaseError(sourceFiber, nearestMountedAncestor, error) {
      if (sourceFiber.tag === 3)
        captureCommitPhaseErrorOnRoot(sourceFiber, sourceFiber, error);
      else
        for (;nearestMountedAncestor !== null; ) {
          if (nearestMountedAncestor.tag === 3) {
            captureCommitPhaseErrorOnRoot(nearestMountedAncestor, sourceFiber, error);
            break;
          } else if (nearestMountedAncestor.tag === 1) {
            var instance = nearestMountedAncestor.stateNode;
            if (typeof nearestMountedAncestor.type.getDerivedStateFromError === "function" || typeof instance.componentDidCatch === "function" && (legacyErrorBoundariesThatAlreadyFailed === null || !legacyErrorBoundariesThatAlreadyFailed.has(instance))) {
              sourceFiber = createCapturedValueAtFiber(error, sourceFiber);
              error = createClassErrorUpdate(2);
              instance = enqueueUpdate(nearestMountedAncestor, error, 2);
              instance !== null && (initializeClassErrorUpdate(error, instance, nearestMountedAncestor, sourceFiber), markRootUpdated$1(instance, 2), ensureRootIsScheduled(instance));
              break;
            }
          }
          nearestMountedAncestor = nearestMountedAncestor.return;
        }
    }
    function attachPingListener(root, wakeable, lanes) {
      var pingCache = root.pingCache;
      if (pingCache === null) {
        pingCache = root.pingCache = new PossiblyWeakMap;
        var threadIDs = new Set;
        pingCache.set(wakeable, threadIDs);
      } else
        threadIDs = pingCache.get(wakeable), threadIDs === undefined && (threadIDs = new Set, pingCache.set(wakeable, threadIDs));
      threadIDs.has(lanes) || (workInProgressRootDidAttachPingListener = true, threadIDs.add(lanes), root = pingSuspendedRoot.bind(null, root, wakeable, lanes), wakeable.then(root, root));
    }
    function pingSuspendedRoot(root, wakeable, pingedLanes) {
      var pingCache = root.pingCache;
      pingCache !== null && pingCache.delete(wakeable);
      root.pingedLanes |= root.suspendedLanes & pingedLanes;
      root.warmLanes &= ~pingedLanes;
      workInProgressRoot === root && (workInProgressRootRenderLanes & pingedLanes) === pingedLanes && (workInProgressRootExitStatus === 4 || workInProgressRootExitStatus === 3 && (workInProgressRootRenderLanes & 62914560) === workInProgressRootRenderLanes && 300 > now() - globalMostRecentFallbackTime ? (executionContext & 2) === 0 ? prepareFreshStack(root, 0) : workInProgressRootPingedLanes |= pingedLanes : workInProgressRootPingedLanes |= pingedLanes, workInProgressSuspendedRetryLanes === workInProgressRootRenderLanes && (workInProgressSuspendedRetryLanes = 0));
      ensureRootIsScheduled(root);
    }
    function retryTimedOutBoundary(boundaryFiber, retryLane) {
      retryLane === 0 && (retryLane = claimNextRetryLane());
      boundaryFiber = enqueueConcurrentRenderForLane(boundaryFiber, retryLane);
      boundaryFiber !== null && (markRootUpdated$1(boundaryFiber, retryLane), ensureRootIsScheduled(boundaryFiber));
    }
    function retryDehydratedSuspenseBoundary(boundaryFiber) {
      var suspenseState = boundaryFiber.memoizedState, retryLane = 0;
      suspenseState !== null && (retryLane = suspenseState.retryLane);
      retryTimedOutBoundary(boundaryFiber, retryLane);
    }
    function resolveRetryWakeable(boundaryFiber, wakeable) {
      var retryLane = 0;
      switch (boundaryFiber.tag) {
        case 31:
        case 13:
          var retryCache = boundaryFiber.stateNode;
          var suspenseState = boundaryFiber.memoizedState;
          suspenseState !== null && (retryLane = suspenseState.retryLane);
          break;
        case 19:
          retryCache = boundaryFiber.stateNode;
          break;
        case 22:
          retryCache = boundaryFiber.stateNode._retryCache;
          break;
        default:
          throw Error(formatProdErrorMessage(314));
      }
      retryCache !== null && retryCache.delete(wakeable);
      retryTimedOutBoundary(boundaryFiber, retryLane);
    }
    function scheduleCallback$1(priorityLevel, callback) {
      return scheduleCallback$3(priorityLevel, callback);
    }
    var firstScheduledRoot = null;
    var lastScheduledRoot = null;
    var didScheduleMicrotask = false;
    var mightHavePendingSyncWork = false;
    var isFlushingWork = false;
    var currentEventTransitionLane = 0;
    function ensureRootIsScheduled(root) {
      root !== lastScheduledRoot && root.next === null && (lastScheduledRoot === null ? firstScheduledRoot = lastScheduledRoot = root : lastScheduledRoot = lastScheduledRoot.next = root);
      mightHavePendingSyncWork = true;
      didScheduleMicrotask || (didScheduleMicrotask = true, scheduleImmediateRootScheduleTask());
    }
    function flushSyncWorkAcrossRoots_impl(syncTransitionLanes, onlyLegacy) {
      if (!isFlushingWork && mightHavePendingSyncWork) {
        isFlushingWork = true;
        do {
          var didPerformSomeWork = false;
          for (var root$190 = firstScheduledRoot;root$190 !== null; ) {
            if (!onlyLegacy)
              if (syncTransitionLanes !== 0) {
                var pendingLanes = root$190.pendingLanes;
                if (pendingLanes === 0)
                  var JSCompiler_inline_result = 0;
                else {
                  var suspendedLanes = root$190.suspendedLanes, pingedLanes = root$190.pingedLanes;
                  JSCompiler_inline_result = (1 << 31 - clz32(42 | syncTransitionLanes) + 1) - 1;
                  JSCompiler_inline_result &= pendingLanes & ~(suspendedLanes & ~pingedLanes);
                  JSCompiler_inline_result = JSCompiler_inline_result & 201326741 ? JSCompiler_inline_result & 201326741 | 1 : JSCompiler_inline_result ? JSCompiler_inline_result | 2 : 0;
                }
                JSCompiler_inline_result !== 0 && (didPerformSomeWork = true, performSyncWorkOnRoot(root$190, JSCompiler_inline_result));
              } else
                JSCompiler_inline_result = workInProgressRootRenderLanes, JSCompiler_inline_result = getNextLanes(root$190, root$190 === workInProgressRoot ? JSCompiler_inline_result : 0, root$190.cancelPendingCommit !== null || root$190.timeoutHandle !== -1), (JSCompiler_inline_result & 3) === 0 || checkIfRootIsPrerendering(root$190, JSCompiler_inline_result) || (didPerformSomeWork = true, performSyncWorkOnRoot(root$190, JSCompiler_inline_result));
            root$190 = root$190.next;
          }
        } while (didPerformSomeWork);
        isFlushingWork = false;
      }
    }
    function processRootScheduleInImmediateTask() {
      processRootScheduleInMicrotask();
    }
    function processRootScheduleInMicrotask() {
      mightHavePendingSyncWork = didScheduleMicrotask = false;
      var syncTransitionLanes = 0;
      currentEventTransitionLane !== 0 && shouldAttemptEagerTransition() && (syncTransitionLanes = currentEventTransitionLane);
      for (var currentTime = now(), prev = null, root = firstScheduledRoot;root !== null; ) {
        var next = root.next, nextLanes = scheduleTaskForRootDuringMicrotask(root, currentTime);
        if (nextLanes === 0)
          root.next = null, prev === null ? firstScheduledRoot = next : prev.next = next, next === null && (lastScheduledRoot = prev);
        else if (prev = root, syncTransitionLanes !== 0 || (nextLanes & 3) !== 0)
          mightHavePendingSyncWork = true;
        root = next;
      }
      pendingEffectsStatus !== 0 && pendingEffectsStatus !== 5 || flushSyncWorkAcrossRoots_impl(syncTransitionLanes, false);
      currentEventTransitionLane !== 0 && (currentEventTransitionLane = 0);
    }
    function scheduleTaskForRootDuringMicrotask(root, currentTime) {
      for (var { suspendedLanes, pingedLanes, expirationTimes } = root, lanes = root.pendingLanes & -62914561;0 < lanes; ) {
        var index$5 = 31 - clz32(lanes), lane = 1 << index$5, expirationTime = expirationTimes[index$5];
        if (expirationTime === -1) {
          if ((lane & suspendedLanes) === 0 || (lane & pingedLanes) !== 0)
            expirationTimes[index$5] = computeExpirationTime(lane, currentTime);
        } else
          expirationTime <= currentTime && (root.expiredLanes |= lane);
        lanes &= ~lane;
      }
      currentTime = workInProgressRoot;
      suspendedLanes = workInProgressRootRenderLanes;
      suspendedLanes = getNextLanes(root, root === currentTime ? suspendedLanes : 0, root.cancelPendingCommit !== null || root.timeoutHandle !== -1);
      pingedLanes = root.callbackNode;
      if (suspendedLanes === 0 || root === currentTime && (workInProgressSuspendedReason === 2 || workInProgressSuspendedReason === 9) || root.cancelPendingCommit !== null)
        return pingedLanes !== null && pingedLanes !== null && cancelCallback$1(pingedLanes), root.callbackNode = null, root.callbackPriority = 0;
      if ((suspendedLanes & 3) === 0 || checkIfRootIsPrerendering(root, suspendedLanes)) {
        currentTime = suspendedLanes & -suspendedLanes;
        if (currentTime === root.callbackPriority)
          return currentTime;
        pingedLanes !== null && cancelCallback$1(pingedLanes);
        switch (lanesToEventPriority(suspendedLanes)) {
          case 2:
          case 8:
            suspendedLanes = UserBlockingPriority;
            break;
          case 32:
            suspendedLanes = NormalPriority$1;
            break;
          case 268435456:
            suspendedLanes = IdlePriority;
            break;
          default:
            suspendedLanes = NormalPriority$1;
        }
        pingedLanes = performWorkOnRootViaSchedulerTask.bind(null, root);
        suspendedLanes = scheduleCallback$3(suspendedLanes, pingedLanes);
        root.callbackPriority = currentTime;
        root.callbackNode = suspendedLanes;
        return currentTime;
      }
      pingedLanes !== null && pingedLanes !== null && cancelCallback$1(pingedLanes);
      root.callbackPriority = 2;
      root.callbackNode = null;
      return 2;
    }
    function performWorkOnRootViaSchedulerTask(root, didTimeout) {
      if (pendingEffectsStatus !== 0 && pendingEffectsStatus !== 5)
        return root.callbackNode = null, root.callbackPriority = 0, null;
      var originalCallbackNode = root.callbackNode;
      if (flushPendingEffects() && root.callbackNode !== originalCallbackNode)
        return null;
      var workInProgressRootRenderLanes$jscomp$0 = workInProgressRootRenderLanes;
      workInProgressRootRenderLanes$jscomp$0 = getNextLanes(root, root === workInProgressRoot ? workInProgressRootRenderLanes$jscomp$0 : 0, root.cancelPendingCommit !== null || root.timeoutHandle !== -1);
      if (workInProgressRootRenderLanes$jscomp$0 === 0)
        return null;
      performWorkOnRoot(root, workInProgressRootRenderLanes$jscomp$0, didTimeout);
      scheduleTaskForRootDuringMicrotask(root, now());
      return root.callbackNode != null && root.callbackNode === originalCallbackNode ? performWorkOnRootViaSchedulerTask.bind(null, root) : null;
    }
    function performSyncWorkOnRoot(root, lanes) {
      if (flushPendingEffects())
        return null;
      performWorkOnRoot(root, lanes, true);
    }
    function scheduleImmediateRootScheduleTask() {
      scheduleMicrotask(function() {
        (executionContext & 6) !== 0 ? scheduleCallback$3(ImmediatePriority, processRootScheduleInImmediateTask) : processRootScheduleInMicrotask();
      });
    }
    function requestTransitionLane() {
      if (currentEventTransitionLane === 0) {
        var actionScopeLane = currentEntangledLane;
        actionScopeLane === 0 && (actionScopeLane = nextTransitionUpdateLane, nextTransitionUpdateLane <<= 1, (nextTransitionUpdateLane & 261888) === 0 && (nextTransitionUpdateLane = 256));
        currentEventTransitionLane = actionScopeLane;
      }
      return currentEventTransitionLane;
    }
    function coerceFormActionProp(actionProp) {
      return actionProp == null || typeof actionProp === "symbol" || typeof actionProp === "boolean" ? null : typeof actionProp === "function" ? actionProp : sanitizeURL(actionProp);
    }
    function extractEvents$1(dispatchQueue, domEventName, maybeTargetInst, nativeEvent, nativeEventTarget) {
      if (domEventName === "submit" && maybeTargetInst && maybeTargetInst.stateNode === nativeEventTarget) {
        var action = coerceFormActionProp((nativeEventTarget[internalPropsKey] || null).action), submitter = nativeEvent.submitter;
        submitter && (domEventName = (domEventName = submitter[internalPropsKey] || null) ? coerceFormActionProp(domEventName.formAction) : submitter.getAttribute("formAction"), domEventName !== null && (action = domEventName, submitter = null));
        var event = new SyntheticEvent("action", "action", null, nativeEvent, nativeEventTarget);
        dispatchQueue.push({
          event,
          listeners: [
            {
              instance: null,
              listener: function() {
                if (nativeEvent.defaultPrevented) {
                  if (currentEventTransitionLane !== 0) {
                    var formData = new FormData(nativeEventTarget, submitter);
                    startHostTransition(maybeTargetInst, {
                      pending: true,
                      data: formData,
                      method: nativeEventTarget.method,
                      action
                    }, null, formData);
                  }
                } else
                  typeof action === "function" && (event.preventDefault(), formData = new FormData(nativeEventTarget, submitter), startHostTransition(maybeTargetInst, {
                    pending: true,
                    data: formData,
                    method: nativeEventTarget.method,
                    action
                  }, action, formData));
              },
              currentTarget: nativeEventTarget
            }
          ]
        });
      }
    }
    for (i$jscomp$inline_1667 = 0;i$jscomp$inline_1667 < simpleEventPluginEvents.length; i$jscomp$inline_1667++) {
      eventName$jscomp$inline_1668 = simpleEventPluginEvents[i$jscomp$inline_1667], domEventName$jscomp$inline_1669 = eventName$jscomp$inline_1668.toLowerCase(), capitalizedEvent$jscomp$inline_1670 = eventName$jscomp$inline_1668[0].toUpperCase() + eventName$jscomp$inline_1668.slice(1);
      registerSimpleEvent(domEventName$jscomp$inline_1669, "on" + capitalizedEvent$jscomp$inline_1670);
    }
    var eventName$jscomp$inline_1668;
    var domEventName$jscomp$inline_1669;
    var capitalizedEvent$jscomp$inline_1670;
    var i$jscomp$inline_1667;
    registerSimpleEvent(ANIMATION_END, "onAnimationEnd");
    registerSimpleEvent(ANIMATION_ITERATION, "onAnimationIteration");
    registerSimpleEvent(ANIMATION_START, "onAnimationStart");
    registerSimpleEvent("dblclick", "onDoubleClick");
    registerSimpleEvent("focusin", "onFocus");
    registerSimpleEvent("focusout", "onBlur");
    registerSimpleEvent(TRANSITION_RUN, "onTransitionRun");
    registerSimpleEvent(TRANSITION_START, "onTransitionStart");
    registerSimpleEvent(TRANSITION_CANCEL, "onTransitionCancel");
    registerSimpleEvent(TRANSITION_END, "onTransitionEnd");
    registerDirectEvent("onMouseEnter", ["mouseout", "mouseover"]);
    registerDirectEvent("onMouseLeave", ["mouseout", "mouseover"]);
    registerDirectEvent("onPointerEnter", ["pointerout", "pointerover"]);
    registerDirectEvent("onPointerLeave", ["pointerout", "pointerover"]);
    registerTwoPhaseEvent("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
    registerTwoPhaseEvent("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
    registerTwoPhaseEvent("onBeforeInput", [
      "compositionend",
      "keypress",
      "textInput",
      "paste"
    ]);
    registerTwoPhaseEvent("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
    registerTwoPhaseEvent("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
    registerTwoPhaseEvent("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
    var mediaEventTypes = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ");
    var nonDelegatedEvents = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(mediaEventTypes));
    function processDispatchQueue(dispatchQueue, eventSystemFlags) {
      eventSystemFlags = (eventSystemFlags & 4) !== 0;
      for (var i = 0;i < dispatchQueue.length; i++) {
        var _dispatchQueue$i = dispatchQueue[i], event = _dispatchQueue$i.event;
        _dispatchQueue$i = _dispatchQueue$i.listeners;
        a: {
          var previousInstance = undefined;
          if (eventSystemFlags)
            for (var i$jscomp$0 = _dispatchQueue$i.length - 1;0 <= i$jscomp$0; i$jscomp$0--) {
              var _dispatchListeners$i = _dispatchQueue$i[i$jscomp$0], instance = _dispatchListeners$i.instance, currentTarget = _dispatchListeners$i.currentTarget;
              _dispatchListeners$i = _dispatchListeners$i.listener;
              if (instance !== previousInstance && event.isPropagationStopped())
                break a;
              previousInstance = _dispatchListeners$i;
              event.currentTarget = currentTarget;
              try {
                previousInstance(event);
              } catch (error) {
                reportGlobalError(error);
              }
              event.currentTarget = null;
              previousInstance = instance;
            }
          else
            for (i$jscomp$0 = 0;i$jscomp$0 < _dispatchQueue$i.length; i$jscomp$0++) {
              _dispatchListeners$i = _dispatchQueue$i[i$jscomp$0];
              instance = _dispatchListeners$i.instance;
              currentTarget = _dispatchListeners$i.currentTarget;
              _dispatchListeners$i = _dispatchListeners$i.listener;
              if (instance !== previousInstance && event.isPropagationStopped())
                break a;
              previousInstance = _dispatchListeners$i;
              event.currentTarget = currentTarget;
              try {
                previousInstance(event);
              } catch (error) {
                reportGlobalError(error);
              }
              event.currentTarget = null;
              previousInstance = instance;
            }
        }
      }
    }
    function listenToNonDelegatedEvent(domEventName, targetElement) {
      var JSCompiler_inline_result = targetElement[internalEventHandlersKey];
      JSCompiler_inline_result === undefined && (JSCompiler_inline_result = targetElement[internalEventHandlersKey] = new Set);
      var listenerSetKey = domEventName + "__bubble";
      JSCompiler_inline_result.has(listenerSetKey) || (addTrappedEventListener(targetElement, domEventName, 2, false), JSCompiler_inline_result.add(listenerSetKey));
    }
    function listenToNativeEvent(domEventName, isCapturePhaseListener, target) {
      var eventSystemFlags = 0;
      isCapturePhaseListener && (eventSystemFlags |= 4);
      addTrappedEventListener(target, domEventName, eventSystemFlags, isCapturePhaseListener);
    }
    var listeningMarker = "_reactListening" + Math.random().toString(36).slice(2);
    function listenToAllSupportedEvents(rootContainerElement) {
      if (!rootContainerElement[listeningMarker]) {
        rootContainerElement[listeningMarker] = true;
        allNativeEvents.forEach(function(domEventName) {
          domEventName !== "selectionchange" && (nonDelegatedEvents.has(domEventName) || listenToNativeEvent(domEventName, false, rootContainerElement), listenToNativeEvent(domEventName, true, rootContainerElement));
        });
        var ownerDocument = rootContainerElement.nodeType === 9 ? rootContainerElement : rootContainerElement.ownerDocument;
        ownerDocument === null || ownerDocument[listeningMarker] || (ownerDocument[listeningMarker] = true, listenToNativeEvent("selectionchange", false, ownerDocument));
      }
    }
    function addTrappedEventListener(targetContainer, domEventName, eventSystemFlags, isCapturePhaseListener) {
      switch (getEventPriority(domEventName)) {
        case 2:
          var listenerWrapper = dispatchDiscreteEvent;
          break;
        case 8:
          listenerWrapper = dispatchContinuousEvent;
          break;
        default:
          listenerWrapper = dispatchEvent;
      }
      eventSystemFlags = listenerWrapper.bind(null, domEventName, eventSystemFlags, targetContainer);
      listenerWrapper = undefined;
      !passiveBrowserEventsSupported || domEventName !== "touchstart" && domEventName !== "touchmove" && domEventName !== "wheel" || (listenerWrapper = true);
      isCapturePhaseListener ? listenerWrapper !== undefined ? targetContainer.addEventListener(domEventName, eventSystemFlags, {
        capture: true,
        passive: listenerWrapper
      }) : targetContainer.addEventListener(domEventName, eventSystemFlags, true) : listenerWrapper !== undefined ? targetContainer.addEventListener(domEventName, eventSystemFlags, {
        passive: listenerWrapper
      }) : targetContainer.addEventListener(domEventName, eventSystemFlags, false);
    }
    function dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, targetInst$jscomp$0, targetContainer) {
      var ancestorInst = targetInst$jscomp$0;
      if ((eventSystemFlags & 1) === 0 && (eventSystemFlags & 2) === 0 && targetInst$jscomp$0 !== null)
        a:
          for (;; ) {
            if (targetInst$jscomp$0 === null)
              return;
            var nodeTag = targetInst$jscomp$0.tag;
            if (nodeTag === 3 || nodeTag === 4) {
              var container = targetInst$jscomp$0.stateNode.containerInfo;
              if (container === targetContainer)
                break;
              if (nodeTag === 4)
                for (nodeTag = targetInst$jscomp$0.return;nodeTag !== null; ) {
                  var grandTag = nodeTag.tag;
                  if ((grandTag === 3 || grandTag === 4) && nodeTag.stateNode.containerInfo === targetContainer)
                    return;
                  nodeTag = nodeTag.return;
                }
              for (;container !== null; ) {
                nodeTag = getClosestInstanceFromNode(container);
                if (nodeTag === null)
                  return;
                grandTag = nodeTag.tag;
                if (grandTag === 5 || grandTag === 6 || grandTag === 26 || grandTag === 27) {
                  targetInst$jscomp$0 = ancestorInst = nodeTag;
                  continue a;
                }
                container = container.parentNode;
              }
            }
            targetInst$jscomp$0 = targetInst$jscomp$0.return;
          }
      batchedUpdates$1(function() {
        var targetInst = ancestorInst, nativeEventTarget = getEventTarget(nativeEvent), dispatchQueue = [];
        a: {
          var reactName = topLevelEventsToReactNames.get(domEventName);
          if (reactName !== undefined) {
            var SyntheticEventCtor = SyntheticEvent, reactEventType = domEventName;
            switch (domEventName) {
              case "keypress":
                if (getEventCharCode(nativeEvent) === 0)
                  break a;
              case "keydown":
              case "keyup":
                SyntheticEventCtor = SyntheticKeyboardEvent;
                break;
              case "focusin":
                reactEventType = "focus";
                SyntheticEventCtor = SyntheticFocusEvent;
                break;
              case "focusout":
                reactEventType = "blur";
                SyntheticEventCtor = SyntheticFocusEvent;
                break;
              case "beforeblur":
              case "afterblur":
                SyntheticEventCtor = SyntheticFocusEvent;
                break;
              case "click":
                if (nativeEvent.button === 2)
                  break a;
              case "auxclick":
              case "dblclick":
              case "mousedown":
              case "mousemove":
              case "mouseup":
              case "mouseout":
              case "mouseover":
              case "contextmenu":
                SyntheticEventCtor = SyntheticMouseEvent;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                SyntheticEventCtor = SyntheticDragEvent;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                SyntheticEventCtor = SyntheticTouchEvent;
                break;
              case ANIMATION_END:
              case ANIMATION_ITERATION:
              case ANIMATION_START:
                SyntheticEventCtor = SyntheticAnimationEvent;
                break;
              case TRANSITION_END:
                SyntheticEventCtor = SyntheticTransitionEvent;
                break;
              case "scroll":
              case "scrollend":
                SyntheticEventCtor = SyntheticUIEvent;
                break;
              case "wheel":
                SyntheticEventCtor = SyntheticWheelEvent;
                break;
              case "copy":
              case "cut":
              case "paste":
                SyntheticEventCtor = SyntheticClipboardEvent;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                SyntheticEventCtor = SyntheticPointerEvent;
                break;
              case "submit":
                SyntheticEventCtor = SyntheticSubmitEvent;
                break;
              case "toggle":
              case "beforetoggle":
                SyntheticEventCtor = SyntheticToggleEvent;
            }
            var inCapturePhase = (eventSystemFlags & 4) !== 0, accumulateTargetOnly = !inCapturePhase && (domEventName === "scroll" || domEventName === "scrollend"), reactEventName = inCapturePhase ? reactName !== null ? reactName + "Capture" : null : reactName;
            inCapturePhase = [];
            for (var instance = targetInst, lastHostComponent;instance !== null; ) {
              var _instance = instance;
              lastHostComponent = _instance.stateNode;
              _instance = _instance.tag;
              _instance !== 5 && _instance !== 26 && _instance !== 27 || lastHostComponent === null || reactEventName === null || (_instance = getListener(instance, reactEventName), _instance != null && inCapturePhase.push(createDispatchListener(instance, _instance, lastHostComponent)));
              if (accumulateTargetOnly)
                break;
              instance = instance.return;
            }
            0 < inCapturePhase.length && (reactName = new SyntheticEventCtor(reactName, reactEventType, null, nativeEvent, nativeEventTarget), dispatchQueue.push({ event: reactName, listeners: inCapturePhase }));
          }
        }
        if ((eventSystemFlags & 7) === 0) {
          a: {
            SyntheticEventCtor = domEventName === "mouseover" || domEventName === "pointerover";
            reactName = domEventName === "mouseout" || domEventName === "pointerout";
            if (SyntheticEventCtor && nativeEvent !== currentReplayingEvent && (reactEventType = nativeEvent.relatedTarget || nativeEvent.fromElement) && (getClosestInstanceFromNode(reactEventType) || reactEventType[internalContainerInstanceKey]))
              break a;
            if (reactName || SyntheticEventCtor) {
              reactEventType = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget : (SyntheticEventCtor = nativeEventTarget.ownerDocument) ? SyntheticEventCtor.defaultView || SyntheticEventCtor.parentWindow : window;
              if (reactName) {
                if (SyntheticEventCtor = nativeEvent.relatedTarget || nativeEvent.toElement, reactName = targetInst, SyntheticEventCtor = SyntheticEventCtor ? getClosestInstanceFromNode(SyntheticEventCtor) : null, SyntheticEventCtor !== null && (accumulateTargetOnly = getNearestMountedFiber(SyntheticEventCtor), inCapturePhase = SyntheticEventCtor.tag, SyntheticEventCtor !== accumulateTargetOnly || inCapturePhase !== 5 && inCapturePhase !== 27 && inCapturePhase !== 6))
                  SyntheticEventCtor = null;
              } else
                reactName = null, SyntheticEventCtor = targetInst;
              if (reactName !== SyntheticEventCtor) {
                inCapturePhase = SyntheticMouseEvent;
                _instance = "onMouseLeave";
                reactEventName = "onMouseEnter";
                instance = "mouse";
                if (domEventName === "pointerout" || domEventName === "pointerover")
                  inCapturePhase = SyntheticPointerEvent, _instance = "onPointerLeave", reactEventName = "onPointerEnter", instance = "pointer";
                accumulateTargetOnly = reactName == null ? reactEventType : getNodeFromInstance(reactName);
                lastHostComponent = SyntheticEventCtor == null ? reactEventType : getNodeFromInstance(SyntheticEventCtor);
                reactEventType = new inCapturePhase(_instance, instance + "leave", reactName, nativeEvent, nativeEventTarget);
                reactEventType.target = accumulateTargetOnly;
                reactEventType.relatedTarget = lastHostComponent;
                _instance = null;
                getClosestInstanceFromNode(nativeEventTarget) === targetInst && (inCapturePhase = new inCapturePhase(reactEventName, instance + "enter", SyntheticEventCtor, nativeEvent, nativeEventTarget), inCapturePhase.target = lastHostComponent, inCapturePhase.relatedTarget = accumulateTargetOnly, _instance = inCapturePhase);
                accumulateTargetOnly = _instance;
                inCapturePhase = reactName && SyntheticEventCtor ? getLowestCommonAncestor(reactName, SyntheticEventCtor, getParent) : null;
                reactName !== null && accumulateEnterLeaveListenersForEvent(dispatchQueue, reactEventType, reactName, inCapturePhase, false);
                SyntheticEventCtor !== null && accumulateTargetOnly !== null && accumulateEnterLeaveListenersForEvent(dispatchQueue, accumulateTargetOnly, SyntheticEventCtor, inCapturePhase, true);
              }
            }
          }
          a: {
            reactName = targetInst ? getNodeFromInstance(targetInst) : window;
            SyntheticEventCtor = reactName.nodeName && reactName.nodeName.toLowerCase();
            if (SyntheticEventCtor === "select" || SyntheticEventCtor === "input" && reactName.type === "file")
              var getTargetInstFunc = getTargetInstForChangeEvent;
            else if (isTextInputElement(reactName))
              if (isInputEventSupported)
                getTargetInstFunc = getTargetInstForInputOrChangeEvent;
              else {
                getTargetInstFunc = getTargetInstForInputEventPolyfill;
                var handleEventFunc = handleEventsForInputEventPolyfill;
              }
            else
              SyntheticEventCtor = reactName.nodeName, !SyntheticEventCtor || SyntheticEventCtor.toLowerCase() !== "input" || reactName.type !== "checkbox" && reactName.type !== "radio" ? targetInst && isCustomElement(targetInst.elementType) && (getTargetInstFunc = getTargetInstForChangeEvent) : getTargetInstFunc = getTargetInstForClickEvent;
            if (getTargetInstFunc && (getTargetInstFunc = getTargetInstFunc(domEventName, targetInst))) {
              createAndAccumulateChangeEvent(dispatchQueue, getTargetInstFunc, nativeEvent, nativeEventTarget);
              break a;
            }
            handleEventFunc && handleEventFunc(domEventName, reactName, targetInst);
          }
          handleEventFunc = targetInst ? getNodeFromInstance(targetInst) : window;
          switch (domEventName) {
            case "focusin":
              if (isTextInputElement(handleEventFunc) || handleEventFunc.contentEditable === "true")
                activeElement = handleEventFunc, activeElementInst = targetInst, lastSelection = null;
              break;
            case "focusout":
              lastSelection = activeElementInst = activeElement = null;
              break;
            case "mousedown":
              mouseDown = true;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              mouseDown = false;
              constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget);
              break;
            case "selectionchange":
              if (skipSelectionChangeEvent)
                break;
            case "keydown":
            case "keyup":
              constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget);
          }
          var fallbackData;
          if (canUseCompositionEvent)
            b: {
              switch (domEventName) {
                case "compositionstart":
                  var eventType = "onCompositionStart";
                  break b;
                case "compositionend":
                  eventType = "onCompositionEnd";
                  break b;
                case "compositionupdate":
                  eventType = "onCompositionUpdate";
                  break b;
              }
              eventType = undefined;
            }
          else
            isComposing ? isFallbackCompositionEnd(domEventName, nativeEvent) && (eventType = "onCompositionEnd") : domEventName === "keydown" && nativeEvent.keyCode === 229 && (eventType = "onCompositionStart");
          eventType && (useFallbackCompositionData && nativeEvent.locale !== "ko" && (isComposing || eventType !== "onCompositionStart" ? eventType === "onCompositionEnd" && isComposing && (fallbackData = getData()) : (root = nativeEventTarget, startText = ("value" in root) ? root.value : root.textContent, isComposing = true)), handleEventFunc = accumulateTwoPhaseListeners(targetInst, eventType), 0 < handleEventFunc.length && (eventType = new SyntheticCompositionEvent(eventType, domEventName, null, nativeEvent, nativeEventTarget), dispatchQueue.push({ event: eventType, listeners: handleEventFunc }), fallbackData ? eventType.data = fallbackData : (fallbackData = getDataFromCustomEvent(nativeEvent), fallbackData !== null && (eventType.data = fallbackData))));
          if (fallbackData = canUseTextInputEvent ? getNativeBeforeInputChars(domEventName, nativeEvent) : getFallbackBeforeInputChars(domEventName, nativeEvent))
            eventType = accumulateTwoPhaseListeners(targetInst, "onBeforeInput"), 0 < eventType.length && (handleEventFunc = new SyntheticCompositionEvent("onBeforeInput", "beforeinput", null, nativeEvent, nativeEventTarget), dispatchQueue.push({
              event: handleEventFunc,
              listeners: eventType
            }), handleEventFunc.data = fallbackData);
          extractEvents$1(dispatchQueue, domEventName, targetInst, nativeEvent, nativeEventTarget);
        }
        processDispatchQueue(dispatchQueue, eventSystemFlags);
      });
    }
    function createDispatchListener(instance, listener, currentTarget) {
      return {
        instance,
        listener,
        currentTarget
      };
    }
    function accumulateTwoPhaseListeners(targetFiber, reactName) {
      for (var captureName = reactName + "Capture", listeners = [];targetFiber !== null; ) {
        var _instance2 = targetFiber, stateNode = _instance2.stateNode;
        _instance2 = _instance2.tag;
        _instance2 !== 5 && _instance2 !== 26 && _instance2 !== 27 || stateNode === null || (_instance2 = getListener(targetFiber, captureName), _instance2 != null && listeners.unshift(createDispatchListener(targetFiber, _instance2, stateNode)), _instance2 = getListener(targetFiber, reactName), _instance2 != null && listeners.push(createDispatchListener(targetFiber, _instance2, stateNode)));
        if (targetFiber.tag === 3)
          return listeners;
        targetFiber = targetFiber.return;
      }
      return [];
    }
    function getParent(inst) {
      if (inst === null)
        return null;
      do
        inst = inst.return;
      while (inst && inst.tag !== 5 && inst.tag !== 27);
      return inst ? inst : null;
    }
    function accumulateEnterLeaveListenersForEvent(dispatchQueue, event, target, common, inCapturePhase) {
      for (var registrationName = event._reactName, listeners = [];target !== null && target !== common; ) {
        var _instance3 = target, alternate = _instance3.alternate, stateNode = _instance3.stateNode;
        _instance3 = _instance3.tag;
        if (alternate !== null && alternate === common)
          break;
        _instance3 !== 5 && _instance3 !== 26 && _instance3 !== 27 || stateNode === null || (alternate = stateNode, inCapturePhase ? (stateNode = getListener(target, registrationName), stateNode != null && listeners.unshift(createDispatchListener(target, stateNode, alternate))) : inCapturePhase || (stateNode = getListener(target, registrationName), stateNode != null && listeners.push(createDispatchListener(target, stateNode, alternate))));
        target = target.return;
      }
      listeners.length !== 0 && dispatchQueue.push({ event, listeners });
    }
    var NORMALIZE_NEWLINES_REGEX = /\r\n?/g;
    var NORMALIZE_NULL_AND_REPLACEMENT_REGEX = /\u0000|\uFFFD/g;
    function normalizeMarkupForTextOrAttribute(markup) {
      return (typeof markup === "string" ? markup : "" + markup).replace(NORMALIZE_NEWLINES_REGEX, `
`).replace(NORMALIZE_NULL_AND_REPLACEMENT_REGEX, "");
    }
    function checkForUnmatchedText(serverText, clientText) {
      clientText = normalizeMarkupForTextOrAttribute(clientText);
      return normalizeMarkupForTextOrAttribute(serverText) === clientText ? true : false;
    }
    function setProp(domElement, tag, key, value, props, prevValue) {
      switch (key) {
        case "children":
          if (typeof value === "string")
            tag === "body" || tag === "textarea" && value === "" || setTextContent(domElement, value);
          else if (typeof value === "number" || typeof value === "bigint")
            tag !== "body" && setTextContent(domElement, "" + value);
          else
            return;
          break;
        case "className":
          setValueForKnownAttribute(domElement, "class", value);
          break;
        case "tabIndex":
          setValueForKnownAttribute(domElement, "tabindex", value);
          break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
          setValueForKnownAttribute(domElement, key, value);
          break;
        case "style":
          setValueForStyles(domElement, value, prevValue);
          return;
        case "data":
          if (tag !== "object") {
            setValueForKnownAttribute(domElement, "data", value);
            break;
          }
        case "src":
        case "href":
          if (value === "" && (tag !== "a" || key !== "href")) {
            domElement.removeAttribute(key);
            break;
          }
          if (value == null || typeof value === "function" || typeof value === "symbol" || typeof value === "boolean") {
            domElement.removeAttribute(key);
            break;
          }
          value = sanitizeURL(value);
          domElement.setAttribute(key, value);
          break;
        case "action":
        case "formAction":
          if (typeof value === "function") {
            domElement.setAttribute(key, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
            break;
          } else
            typeof prevValue === "function" && (key === "formAction" ? (tag !== "input" && setProp(domElement, tag, "name", props.name, props, null), setProp(domElement, tag, "formEncType", props.formEncType, props, null), setProp(domElement, tag, "formMethod", props.formMethod, props, null), setProp(domElement, tag, "formTarget", props.formTarget, props, null)) : (setProp(domElement, tag, "encType", props.encType, props, null), setProp(domElement, tag, "method", props.method, props, null), setProp(domElement, tag, "target", props.target, props, null)));
          if (value == null || typeof value === "symbol" || typeof value === "boolean") {
            domElement.removeAttribute(key);
            break;
          }
          value = sanitizeURL(value);
          domElement.setAttribute(key, value);
          break;
        case "onClick":
          value != null && (domElement.onclick = noop$1);
          return;
        case "onScroll":
          value != null && listenToNonDelegatedEvent("scroll", domElement);
          return;
        case "onScrollEnd":
          value != null && listenToNonDelegatedEvent("scrollend", domElement);
          return;
        case "dangerouslySetInnerHTML":
          if (value != null) {
            if (typeof value !== "object" || !("__html" in value))
              throw Error(formatProdErrorMessage(61));
            key = value.__html;
            if (key != null) {
              if (props.children != null)
                throw Error(formatProdErrorMessage(60));
              (prevValue != null ? prevValue.__html : undefined) !== key && (domElement.innerHTML = key);
            }
          }
          break;
        case "multiple":
          domElement.multiple = value && typeof value !== "function" && typeof value !== "symbol";
          break;
        case "muted":
          domElement.muted = value && typeof value !== "function" && typeof value !== "symbol";
          break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "ref":
          break;
        case "autoFocus":
          break;
        case "xlinkHref":
          if (value == null || typeof value === "function" || typeof value === "boolean" || typeof value === "symbol") {
            domElement.removeAttribute("xlink:href");
            break;
          }
          key = sanitizeURL(value);
          domElement.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", key);
          break;
        case "contentEditable":
        case "spellCheck":
        case "draggable":
        case "value":
        case "autoReverse":
        case "externalResourcesRequired":
        case "focusable":
        case "preserveAlpha":
          value != null && typeof value !== "function" && typeof value !== "symbol" ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
          break;
        case "inert":
        case "allowFullScreen":
        case "async":
        case "autoPlay":
        case "controls":
        case "credentialless":
        case "default":
        case "defer":
        case "disabled":
        case "disablePictureInPicture":
        case "disableRemotePlayback":
        case "formNoValidate":
        case "hidden":
        case "loop":
        case "noModule":
        case "noValidate":
        case "open":
        case "playsInline":
        case "readOnly":
        case "required":
        case "reversed":
        case "scoped":
        case "seamless":
        case "itemScope":
          value && typeof value !== "function" && typeof value !== "symbol" ? domElement.setAttribute(key, "") : domElement.removeAttribute(key);
          break;
        case "capture":
        case "download":
          value === true ? domElement.setAttribute(key, "") : value !== false && value != null && typeof value !== "function" && typeof value !== "symbol" ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
          break;
        case "cols":
        case "rows":
        case "size":
        case "span":
          value != null && typeof value !== "function" && typeof value !== "symbol" && !isNaN(value) && 1 <= value ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
          break;
        case "rowSpan":
        case "start":
          value == null || typeof value === "function" || typeof value === "symbol" || isNaN(value) ? domElement.removeAttribute(key) : domElement.setAttribute(key, value);
          break;
        case "popover":
          listenToNonDelegatedEvent("beforetoggle", domElement);
          listenToNonDelegatedEvent("toggle", domElement);
          setValueForAttribute(domElement, "popover", value);
          break;
        case "xlinkActuate":
          setValueForNamespacedAttribute(domElement, "http://www.w3.org/1999/xlink", "xlink:actuate", value);
          break;
        case "xlinkArcrole":
          setValueForNamespacedAttribute(domElement, "http://www.w3.org/1999/xlink", "xlink:arcrole", value);
          break;
        case "xlinkRole":
          setValueForNamespacedAttribute(domElement, "http://www.w3.org/1999/xlink", "xlink:role", value);
          break;
        case "xlinkShow":
          setValueForNamespacedAttribute(domElement, "http://www.w3.org/1999/xlink", "xlink:show", value);
          break;
        case "xlinkTitle":
          setValueForNamespacedAttribute(domElement, "http://www.w3.org/1999/xlink", "xlink:title", value);
          break;
        case "xlinkType":
          setValueForNamespacedAttribute(domElement, "http://www.w3.org/1999/xlink", "xlink:type", value);
          break;
        case "xmlBase":
          setValueForNamespacedAttribute(domElement, "http://www.w3.org/XML/1998/namespace", "xml:base", value);
          break;
        case "xmlLang":
          setValueForNamespacedAttribute(domElement, "http://www.w3.org/XML/1998/namespace", "xml:lang", value);
          break;
        case "xmlSpace":
          setValueForNamespacedAttribute(domElement, "http://www.w3.org/XML/1998/namespace", "xml:space", value);
          break;
        case "is":
          setValueForAttribute(domElement, "is", value);
          break;
        case "innerText":
        case "textContent":
          return;
        default:
          if (!(2 < key.length) || key[0] !== "o" && key[0] !== "O" || key[1] !== "n" && key[1] !== "N")
            key = aliases.get(key) || key, setValueForAttribute(domElement, key, value);
          else
            return;
      }
      viewTransitionMutationContext = true;
    }
    function setPropOnCustomElement(domElement, tag, key, value, props, prevValue) {
      switch (key) {
        case "style":
          setValueForStyles(domElement, value, prevValue);
          return;
        case "dangerouslySetInnerHTML":
          if (value != null) {
            if (typeof value !== "object" || !("__html" in value))
              throw Error(formatProdErrorMessage(61));
            key = value.__html;
            if (key != null) {
              if (props.children != null)
                throw Error(formatProdErrorMessage(60));
              (prevValue != null ? prevValue.__html : undefined) !== key && (domElement.innerHTML = key);
            }
          }
          break;
        case "children":
          if (typeof value === "string")
            setTextContent(domElement, value);
          else if (typeof value === "number" || typeof value === "bigint")
            setTextContent(domElement, "" + value);
          else
            return;
          break;
        case "onScroll":
          value != null && listenToNonDelegatedEvent("scroll", domElement);
          return;
        case "onScrollEnd":
          value != null && listenToNonDelegatedEvent("scrollend", domElement);
          return;
        case "onClick":
          value != null && (domElement.onclick = noop$1);
          return;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "innerHTML":
        case "ref":
          return;
        case "innerText":
        case "textContent":
          return;
        default:
          if (!registrationNameDependencies.hasOwnProperty(key))
            a: {
              if (key[0] === "o" && key[1] === "n" && (props = key.endsWith("Capture"), prevValue = key.slice(2, props ? key.length - 7 : undefined), tag = domElement[internalPropsKey] || null, tag = tag != null ? tag[key] : null, typeof tag === "function" && domElement.removeEventListener(prevValue, tag, props), typeof value === "function")) {
                typeof tag !== "function" && tag !== null && (key in domElement ? domElement[key] = null : domElement.hasAttribute(key) && domElement.removeAttribute(key));
                domElement.addEventListener(prevValue, value, props);
                break a;
              }
              viewTransitionMutationContext = true;
              key in domElement ? domElement[key] = value : value === true ? domElement.setAttribute(key, "") : setValueForAttribute(domElement, key, value);
            }
          return;
      }
      viewTransitionMutationContext = true;
    }
    function setInitialProperties(domElement, tag, props) {
      switch (tag) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "img":
          listenToNonDelegatedEvent("error", domElement);
          listenToNonDelegatedEvent("load", domElement);
          var hasSrc = false, hasSrcSet = false, propKey;
          for (propKey in props)
            if (props.hasOwnProperty(propKey)) {
              var propValue = props[propKey];
              if (propValue != null)
                switch (propKey) {
                  case "src":
                    hasSrc = true;
                    break;
                  case "srcSet":
                    hasSrcSet = true;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(formatProdErrorMessage(137, tag));
                  default:
                    setProp(domElement, tag, propKey, propValue, props, null);
                }
            }
          hasSrcSet && setProp(domElement, tag, "srcSet", props.srcSet, props, null);
          hasSrc && setProp(domElement, tag, "src", props.src, props, null);
          return;
        case "input":
          listenToNonDelegatedEvent("invalid", domElement);
          var defaultValue = propKey = propValue = hasSrcSet = null, checked = null, defaultChecked = null;
          for (hasSrc in props)
            if (props.hasOwnProperty(hasSrc)) {
              var propValue$204 = props[hasSrc];
              if (propValue$204 != null)
                switch (hasSrc) {
                  case "name":
                    hasSrcSet = propValue$204;
                    break;
                  case "type":
                    propValue = propValue$204;
                    break;
                  case "checked":
                    checked = propValue$204;
                    break;
                  case "defaultChecked":
                    defaultChecked = propValue$204;
                    break;
                  case "value":
                    propKey = propValue$204;
                    break;
                  case "defaultValue":
                    defaultValue = propValue$204;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    if (propValue$204 != null)
                      throw Error(formatProdErrorMessage(137, tag));
                    break;
                  default:
                    setProp(domElement, tag, hasSrc, propValue$204, props, null);
                }
            }
          initInput(domElement, propKey, defaultValue, checked, defaultChecked, propValue, hasSrcSet, false);
          return;
        case "select":
          listenToNonDelegatedEvent("invalid", domElement);
          hasSrc = propValue = propKey = null;
          for (hasSrcSet in props)
            if (props.hasOwnProperty(hasSrcSet) && (defaultValue = props[hasSrcSet], defaultValue != null))
              switch (hasSrcSet) {
                case "value":
                  propKey = defaultValue;
                  break;
                case "defaultValue":
                  propValue = defaultValue;
                  break;
                case "multiple":
                  hasSrc = defaultValue;
                default:
                  setProp(domElement, tag, hasSrcSet, defaultValue, props, null);
              }
          tag = propKey;
          props = propValue;
          domElement.multiple = !!hasSrc;
          tag != null ? updateOptions(domElement, !!hasSrc, tag, false) : props != null && updateOptions(domElement, !!hasSrc, props, true);
          return;
        case "textarea":
          listenToNonDelegatedEvent("invalid", domElement);
          propKey = hasSrcSet = hasSrc = null;
          for (propValue in props)
            if (props.hasOwnProperty(propValue) && (defaultValue = props[propValue], defaultValue != null))
              switch (propValue) {
                case "value":
                  hasSrc = defaultValue;
                  break;
                case "defaultValue":
                  hasSrcSet = defaultValue;
                  break;
                case "children":
                  propKey = defaultValue;
                  break;
                case "dangerouslySetInnerHTML":
                  if (defaultValue != null)
                    throw Error(formatProdErrorMessage(91));
                  break;
                default:
                  setProp(domElement, tag, propValue, defaultValue, props, null);
              }
          initTextarea(domElement, hasSrc, hasSrcSet, propKey);
          return;
        case "option":
          for (checked in props)
            if (props.hasOwnProperty(checked) && (hasSrc = props[checked], hasSrc != null))
              switch (checked) {
                case "selected":
                  domElement.selected = hasSrc && typeof hasSrc !== "function" && typeof hasSrc !== "symbol";
                  break;
                default:
                  setProp(domElement, tag, checked, hasSrc, props, null);
              }
          return;
        case "dialog":
          listenToNonDelegatedEvent("beforetoggle", domElement);
          listenToNonDelegatedEvent("toggle", domElement);
          listenToNonDelegatedEvent("cancel", domElement);
          listenToNonDelegatedEvent("close", domElement);
          break;
        case "iframe":
        case "object":
          listenToNonDelegatedEvent("load", domElement);
          break;
        case "video":
        case "audio":
          for (hasSrc = 0;hasSrc < mediaEventTypes.length; hasSrc++)
            listenToNonDelegatedEvent(mediaEventTypes[hasSrc], domElement);
          break;
        case "image":
          listenToNonDelegatedEvent("error", domElement);
          listenToNonDelegatedEvent("load", domElement);
          break;
        case "details":
          listenToNonDelegatedEvent("toggle", domElement);
          break;
        case "embed":
        case "source":
        case "link":
          listenToNonDelegatedEvent("error", domElement), listenToNonDelegatedEvent("load", domElement);
        case "area":
        case "base":
        case "br":
        case "col":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "track":
        case "wbr":
        case "menuitem":
          for (defaultChecked in props)
            if (props.hasOwnProperty(defaultChecked) && (hasSrc = props[defaultChecked], hasSrc != null))
              switch (defaultChecked) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(formatProdErrorMessage(137, tag));
                default:
                  setProp(domElement, tag, defaultChecked, hasSrc, props, null);
              }
          return;
        default:
          if (isCustomElement(tag)) {
            for (propValue$204 in props)
              props.hasOwnProperty(propValue$204) && (hasSrc = props[propValue$204], hasSrc !== undefined && setPropOnCustomElement(domElement, tag, propValue$204, hasSrc, props, undefined));
            return;
          }
      }
      for (defaultValue in props)
        props.hasOwnProperty(defaultValue) && (hasSrc = props[defaultValue], hasSrc != null && setProp(domElement, tag, defaultValue, hasSrc, props, null));
    }
    var emptyProps = {};
    function updateProperties(domElement, tag, lastProps, nextProps) {
      switch (tag) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "input":
          var name = null, type = null, value = null, defaultValue = null, lastDefaultValue = null, checked = null, defaultChecked = null;
          for (propKey in lastProps) {
            var lastProp = lastProps[propKey];
            if (lastProps.hasOwnProperty(propKey) && lastProp != null)
              switch (propKey) {
                case "checked":
                  break;
                case "value":
                  break;
                case "defaultValue":
                  lastDefaultValue = lastProp;
                default:
                  nextProps.hasOwnProperty(propKey) || setProp(domElement, tag, propKey, null, nextProps, lastProp);
              }
          }
          for (var propKey$221 in nextProps) {
            var propKey = nextProps[propKey$221];
            lastProp = lastProps[propKey$221];
            if (nextProps.hasOwnProperty(propKey$221) && (propKey != null || lastProp != null))
              switch (propKey$221) {
                case "type":
                  propKey !== lastProp && (viewTransitionMutationContext = true);
                  type = propKey;
                  break;
                case "name":
                  propKey !== lastProp && (viewTransitionMutationContext = true);
                  name = propKey;
                  break;
                case "checked":
                  propKey !== lastProp && (viewTransitionMutationContext = true);
                  checked = propKey;
                  break;
                case "defaultChecked":
                  propKey !== lastProp && (viewTransitionMutationContext = true);
                  defaultChecked = propKey;
                  break;
                case "value":
                  propKey !== lastProp && (viewTransitionMutationContext = true);
                  value = propKey;
                  break;
                case "defaultValue":
                  propKey !== lastProp && (viewTransitionMutationContext = true);
                  defaultValue = propKey;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (propKey != null)
                    throw Error(formatProdErrorMessage(137, tag));
                  break;
                default:
                  propKey !== lastProp && setProp(domElement, tag, propKey$221, propKey, nextProps, lastProp);
              }
          }
          updateInput(domElement, value, defaultValue, lastDefaultValue, checked, defaultChecked, type, name);
          return;
        case "select":
          propKey = value = defaultValue = propKey$221 = null;
          for (type in lastProps)
            if (lastDefaultValue = lastProps[type], lastProps.hasOwnProperty(type) && lastDefaultValue != null)
              switch (type) {
                case "value":
                  break;
                case "multiple":
                  propKey = lastDefaultValue;
                default:
                  nextProps.hasOwnProperty(type) || setProp(domElement, tag, type, null, nextProps, lastDefaultValue);
              }
          for (name in nextProps)
            if (type = nextProps[name], lastDefaultValue = lastProps[name], nextProps.hasOwnProperty(name) && (type != null || lastDefaultValue != null))
              switch (name) {
                case "value":
                  type !== lastDefaultValue && (viewTransitionMutationContext = true);
                  propKey$221 = type;
                  break;
                case "defaultValue":
                  type !== lastDefaultValue && (viewTransitionMutationContext = true);
                  defaultValue = type;
                  break;
                case "multiple":
                  type !== lastDefaultValue && (viewTransitionMutationContext = true), value = type;
                default:
                  type !== lastDefaultValue && setProp(domElement, tag, name, type, nextProps, lastDefaultValue);
              }
          tag = defaultValue;
          lastProps = value;
          nextProps = propKey;
          propKey$221 != null ? updateOptions(domElement, !!lastProps, propKey$221, false) : !!nextProps !== !!lastProps && (tag != null ? updateOptions(domElement, !!lastProps, tag, true) : updateOptions(domElement, !!lastProps, lastProps ? [] : "", false));
          return;
        case "textarea":
          propKey = propKey$221 = null;
          for (defaultValue in lastProps)
            if (name = lastProps[defaultValue], lastProps.hasOwnProperty(defaultValue) && name != null && !nextProps.hasOwnProperty(defaultValue))
              switch (defaultValue) {
                case "value":
                  break;
                case "children":
                  break;
                default:
                  setProp(domElement, tag, defaultValue, null, nextProps, name);
              }
          for (value in nextProps)
            if (name = nextProps[value], type = lastProps[value], nextProps.hasOwnProperty(value) && (name != null || type != null))
              switch (value) {
                case "value":
                  name !== type && (viewTransitionMutationContext = true);
                  propKey$221 = name;
                  break;
                case "defaultValue":
                  name !== type && (viewTransitionMutationContext = true);
                  propKey = name;
                  break;
                case "children":
                  break;
                case "dangerouslySetInnerHTML":
                  if (name != null)
                    throw Error(formatProdErrorMessage(91));
                  break;
                default:
                  name !== type && setProp(domElement, tag, value, name, nextProps, type);
              }
          updateTextarea(domElement, propKey$221, propKey);
          return;
        case "option":
          for (var propKey$237 in lastProps)
            if (propKey$221 = lastProps[propKey$237], lastProps.hasOwnProperty(propKey$237) && propKey$221 != null && !nextProps.hasOwnProperty(propKey$237))
              switch (propKey$237) {
                case "selected":
                  domElement.selected = false;
                  break;
                default:
                  setProp(domElement, tag, propKey$237, null, nextProps, propKey$221);
              }
          for (lastDefaultValue in nextProps)
            if (propKey$221 = nextProps[lastDefaultValue], propKey = lastProps[lastDefaultValue], nextProps.hasOwnProperty(lastDefaultValue) && propKey$221 !== propKey && (propKey$221 != null || propKey != null))
              switch (lastDefaultValue) {
                case "selected":
                  propKey$221 !== propKey && (viewTransitionMutationContext = true);
                  domElement.selected = propKey$221 && typeof propKey$221 !== "function" && typeof propKey$221 !== "symbol";
                  break;
                default:
                  setProp(domElement, tag, lastDefaultValue, propKey$221, nextProps, propKey);
              }
          return;
        case "img":
        case "link":
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
        case "menuitem":
          for (var propKey$242 in lastProps)
            propKey$221 = lastProps[propKey$242], lastProps.hasOwnProperty(propKey$242) && propKey$221 != null && !nextProps.hasOwnProperty(propKey$242) && setProp(domElement, tag, propKey$242, null, nextProps, propKey$221);
          for (checked in nextProps)
            if (propKey$221 = nextProps[checked], propKey = lastProps[checked], nextProps.hasOwnProperty(checked) && propKey$221 !== propKey && (propKey$221 != null || propKey != null))
              switch (checked) {
                case "children":
                case "dangerouslySetInnerHTML":
                  if (propKey$221 != null)
                    throw Error(formatProdErrorMessage(137, tag));
                  break;
                default:
                  setProp(domElement, tag, checked, propKey$221, nextProps, propKey);
              }
          return;
        default:
          if (isCustomElement(tag)) {
            for (var propKey$247 in lastProps)
              propKey$221 = lastProps[propKey$247], lastProps.hasOwnProperty(propKey$247) && propKey$221 !== undefined && !nextProps.hasOwnProperty(propKey$247) && setPropOnCustomElement(domElement, tag, propKey$247, undefined, nextProps, propKey$221);
            for (defaultChecked in nextProps)
              propKey$221 = nextProps[defaultChecked], propKey = lastProps[defaultChecked], !nextProps.hasOwnProperty(defaultChecked) || propKey$221 === propKey || propKey$221 === undefined && propKey === undefined || setPropOnCustomElement(domElement, tag, defaultChecked, propKey$221, nextProps, propKey);
            return;
          }
      }
      for (var propKey$252 in lastProps)
        propKey$221 = lastProps[propKey$252], lastProps.hasOwnProperty(propKey$252) && propKey$221 != null && !nextProps.hasOwnProperty(propKey$252) && setProp(domElement, tag, propKey$252, null, nextProps, propKey$221);
      for (lastProp in nextProps)
        propKey$221 = nextProps[lastProp], propKey = lastProps[lastProp], !nextProps.hasOwnProperty(lastProp) || propKey$221 === propKey || propKey$221 == null && propKey == null || setProp(domElement, tag, lastProp, propKey$221, nextProps, propKey);
    }
    function isLikelyStaticResource(initiatorType) {
      switch (initiatorType) {
        case "css":
        case "script":
        case "font":
        case "img":
        case "image":
        case "input":
        case "link":
          return true;
        default:
          return false;
      }
    }
    function estimateBandwidth() {
      if (typeof performance.getEntriesByType === "function") {
        for (var count = 0, bits = 0, resourceEntries = performance.getEntriesByType("resource"), i = 0;i < resourceEntries.length; i++) {
          var entry = resourceEntries[i], { transferSize, initiatorType, duration } = entry;
          if (transferSize && duration && isLikelyStaticResource(initiatorType)) {
            initiatorType = 0;
            duration = entry.responseEnd;
            for (i += 1;i < resourceEntries.length; i++) {
              var overlapEntry = resourceEntries[i], overlapStartTime = overlapEntry.startTime;
              if (overlapStartTime > duration)
                break;
              var overlapTransferSize = overlapEntry.transferSize, overlapInitiatorType = overlapEntry.initiatorType;
              overlapTransferSize && isLikelyStaticResource(overlapInitiatorType) && (overlapEntry = overlapEntry.responseEnd, initiatorType += overlapTransferSize * (overlapEntry < duration ? 1 : (duration - overlapStartTime) / (overlapEntry - overlapStartTime)));
            }
            --i;
            bits += 8 * (transferSize + initiatorType) / (entry.duration / 1000);
            count++;
            if (10 < count)
              break;
          }
        }
        if (0 < count)
          return bits / count / 1e6;
      }
      return navigator.connection && (count = navigator.connection.downlink, typeof count === "number") ? count : 5;
    }
    var eventsEnabled = null;
    var selectionInformation = null;
    function getOwnerDocumentFromRootContainer(rootContainerElement) {
      return rootContainerElement.nodeType === 9 ? rootContainerElement : rootContainerElement.ownerDocument;
    }
    function getOwnHostContext(namespaceURI) {
      switch (namespaceURI) {
        case "http://www.w3.org/2000/svg":
          return 1;
        case "http://www.w3.org/1998/Math/MathML":
          return 2;
        default:
          return 0;
      }
    }
    function getChildHostContextProd(parentNamespace, type) {
      if (parentNamespace === 0)
        switch (type) {
          case "svg":
            return 1;
          case "math":
            return 2;
          default:
            return 0;
        }
      return parentNamespace === 1 && type === "foreignObject" ? 0 : parentNamespace;
    }
    function createHoistableInstance(type, props, rootContainerInstance, internalInstanceHandle) {
      rootContainerInstance = getOwnerDocumentFromRootContainer(rootContainerInstance).createElement(type);
      rootContainerInstance[internalInstanceKey] = internalInstanceHandle;
      rootContainerInstance[internalPropsKey] = props;
      setInitialProperties(rootContainerInstance, type, props);
      markNodeAsHoistable(rootContainerInstance);
      return rootContainerInstance;
    }
    function shouldSetTextContent(type, props) {
      return type === "textarea" || type === "noscript" || typeof props.children === "string" || typeof props.children === "number" || typeof props.children === "bigint" || typeof props.dangerouslySetInnerHTML === "object" && props.dangerouslySetInnerHTML !== null && props.dangerouslySetInnerHTML.__html != null;
    }
    var currentPopstateTransitionEvent = null;
    function shouldAttemptEagerTransition() {
      var event = window.event;
      if (event && event.type === "popstate") {
        if (event === currentPopstateTransitionEvent)
          return false;
        currentPopstateTransitionEvent = event;
        return true;
      }
      currentPopstateTransitionEvent = null;
      return false;
    }
    var scheduleTimeout = typeof setTimeout === "function" ? setTimeout : undefined;
    var cancelTimeout = typeof clearTimeout === "function" ? clearTimeout : undefined;
    var localPromise = typeof Promise === "function" ? Promise : undefined;
    var localRequestAnimationFrame = typeof requestAnimationFrame === "function" ? requestAnimationFrame : scheduleTimeout;
    var scheduleMicrotask = typeof queueMicrotask === "function" ? queueMicrotask : typeof localPromise !== "undefined" ? function(callback) {
      return localPromise.resolve(null).then(callback).catch(handleErrorInNextTick);
    } : scheduleTimeout;
    function handleErrorInNextTick(error) {
      setTimeout(function() {
        throw error;
      });
    }
    function isSingletonScope(type) {
      return type === "head";
    }
    function clearHydrationBoundary(parentInstance, hydrationInstance) {
      var node = hydrationInstance, depth = 0;
      do {
        var nextNode = node.nextSibling;
        parentInstance.removeChild(node);
        if (nextNode && nextNode.nodeType === 8)
          if (node = nextNode.data, node === "/$" || node === "/&") {
            if (depth === 0) {
              parentInstance.removeChild(nextNode);
              retryIfBlockedOn(hydrationInstance);
              return;
            }
            depth--;
          } else if (node === "$" || node === "$?" || node === "$~" || node === "$!" || node === "&")
            depth++;
          else if (node === "html")
            clearSingletonPreambleContribution(parentInstance.ownerDocument.documentElement);
          else if (node === "head") {
            node = parentInstance.ownerDocument.head;
            clearSingletonPreambleContribution(node);
            for (var node$jscomp$0 = node.firstChild;node$jscomp$0; ) {
              var nextNode$jscomp$0 = node$jscomp$0.nextSibling, nodeName = node$jscomp$0.nodeName;
              node$jscomp$0[internalHoistableMarker] || nodeName === "SCRIPT" || nodeName === "STYLE" || nodeName === "LINK" && node$jscomp$0.rel.toLowerCase() === "stylesheet" || node.removeChild(node$jscomp$0);
              node$jscomp$0 = nextNode$jscomp$0;
            }
          } else
            node === "body" && clearSingletonPreambleContribution(parentInstance.ownerDocument.body);
        node = nextNode;
      } while (node);
      retryIfBlockedOn(hydrationInstance);
    }
    function hideOrUnhideDehydratedBoundary(suspenseInstance, isHidden) {
      var node = suspenseInstance;
      suspenseInstance = 0;
      do {
        var nextNode = node.nextSibling;
        node.nodeType === 1 ? isHidden ? (node._stashedDisplay = node.style.display, node.style.display = "none") : (node.style.display = node._stashedDisplay || "", node.getAttribute("style") === "" && node.removeAttribute("style")) : node.nodeType === 3 && (isHidden ? (node._stashedText = node.nodeValue, node.nodeValue = "") : node.nodeValue = node._stashedText || "");
        if (nextNode && nextNode.nodeType === 8)
          if (node = nextNode.data, node === "/$")
            if (suspenseInstance === 0)
              break;
            else
              suspenseInstance--;
          else
            node !== "$" && node !== "$?" && node !== "$~" && node !== "$!" || suspenseInstance++;
        node = nextNode;
      } while (node);
    }
    function applyViewTransitionName(instance, name, className) {
      name = CSS.escape(name) !== name ? "r-" + btoa(name).replace(/=/g, "") : name;
      instance.style.viewTransitionName = name;
      className != null && (instance.style.viewTransitionClass = className);
      className = getComputedStyle(instance);
      if (className.display === "inline") {
        name = instance.getClientRects();
        if (name.length === 1)
          var JSCompiler_inline_result = 1;
        else
          for (var i = JSCompiler_inline_result = 0;i < name.length; i++) {
            var rect = name[i];
            0 < rect.width && 0 < rect.height && JSCompiler_inline_result++;
          }
        JSCompiler_inline_result === 1 && (instance = instance.style, instance.display = name.length === 1 ? "inline-block" : "block", instance.marginTop = "-" + className.paddingTop, instance.marginBottom = "-" + className.paddingBottom);
      }
    }
    function restoreViewTransitionName(instance, props) {
      instance = instance.style;
      props = props.style;
      var viewTransitionName = props != null ? props.hasOwnProperty("viewTransitionName") ? props.viewTransitionName : props.hasOwnProperty("view-transition-name") ? props["view-transition-name"] : null : null;
      instance.viewTransitionName = viewTransitionName == null || typeof viewTransitionName === "boolean" ? "" : ("" + viewTransitionName).trim();
      viewTransitionName = props != null ? props.hasOwnProperty("viewTransitionClass") ? props.viewTransitionClass : props.hasOwnProperty("view-transition-class") ? props["view-transition-class"] : null : null;
      instance.viewTransitionClass = viewTransitionName == null || typeof viewTransitionName === "boolean" ? "" : ("" + viewTransitionName).trim();
      instance.display === "inline-block" && (props == null ? instance.display = instance.margin = "" : (viewTransitionName = props.display, instance.display = viewTransitionName == null || typeof viewTransitionName === "boolean" ? "" : viewTransitionName, viewTransitionName = props.margin, viewTransitionName != null ? instance.margin = viewTransitionName : (viewTransitionName = props.hasOwnProperty("marginTop") ? props.marginTop : props["margin-top"], instance.marginTop = viewTransitionName == null || typeof viewTransitionName === "boolean" ? "" : viewTransitionName, props = props.hasOwnProperty("marginBottom") ? props.marginBottom : props["margin-bottom"], instance.marginBottom = props == null || typeof props === "boolean" ? "" : props)));
    }
    function createMeasurement(rect, computedStyle, element) {
      element = element.ownerDocument.defaultView;
      return {
        rect,
        abs: computedStyle.position === "absolute" || computedStyle.position === "fixed",
        clip: computedStyle.clipPath !== "none" || computedStyle.overflow !== "visible" || computedStyle.filter !== "none" || computedStyle.mask !== "none" || computedStyle.mask !== "none" || computedStyle.borderRadius !== "0px",
        view: 0 <= rect.bottom && 0 <= rect.right && rect.top <= element.innerHeight && rect.left <= element.innerWidth
      };
    }
    function measureInstance(instance) {
      var rect = instance.getBoundingClientRect(), computedStyle = getComputedStyle(instance);
      return createMeasurement(rect, computedStyle, instance);
    }
    function measureClonedInstance(instance) {
      var measuredRect = instance.getBoundingClientRect();
      measuredRect = new DOMRect(measuredRect.x + 20000, measuredRect.y + 20000, measuredRect.width, measuredRect.height);
      var computedStyle = getComputedStyle(instance);
      return createMeasurement(measuredRect, computedStyle, instance);
    }
    function forceLayout(ownerDocument) {
      return ownerDocument.documentElement.clientHeight;
    }
    function waitForImageToLoad(resolve) {
      this.addEventListener("load", resolve);
      this.addEventListener("error", resolve);
    }
    function startViewTransition(suspendedState, rootContainer, transitionTypes, mutationCallback, layoutCallback, afterMutationCallback, spawnedWorkCallback, passiveCallback, errorCallback) {
      var ownerDocument = rootContainer.nodeType === 9 ? rootContainer : rootContainer.ownerDocument;
      try {
        var transition = ownerDocument.startViewTransition({
          update: function() {
            var ownerWindow = ownerDocument.defaultView, pendingNavigation = ownerWindow.navigation && ownerWindow.navigation.transition, previousFontLoadingStatus = ownerDocument.fonts.status;
            mutationCallback();
            var blockingPromises = [];
            previousFontLoadingStatus === "loaded" && (forceLayout(ownerDocument), ownerDocument.fonts.status === "loading" && blockingPromises.push(ownerDocument.fonts.ready));
            previousFontLoadingStatus = blockingPromises.length;
            if (suspendedState !== null)
              for (var suspenseyImages = suspendedState.suspenseyImages, imgBytes = 0, i = 0;i < suspenseyImages.length; i++) {
                var suspenseyImage = suspenseyImages[i];
                if (!suspenseyImage.complete) {
                  var rect = suspenseyImage.getBoundingClientRect();
                  if (0 < rect.bottom && 0 < rect.right && rect.top < ownerWindow.innerHeight && rect.left < ownerWindow.innerWidth) {
                    imgBytes += estimateImageBytes(suspenseyImage);
                    if (imgBytes > estimatedBytesWithinLimit) {
                      blockingPromises.length = previousFontLoadingStatus;
                      break;
                    }
                    suspenseyImage = new Promise(waitForImageToLoad.bind(suspenseyImage));
                    blockingPromises.push(suspenseyImage);
                  }
                }
              }
            if (0 < blockingPromises.length)
              return ownerWindow = Promise.race([
                Promise.all(blockingPromises),
                new Promise(function(resolve) {
                  return setTimeout(resolve, 500);
                })
              ]).then(layoutCallback, layoutCallback), (pendingNavigation ? Promise.allSettled([pendingNavigation.finished, ownerWindow]) : ownerWindow).then(afterMutationCallback, afterMutationCallback);
            layoutCallback();
            if (pendingNavigation)
              return pendingNavigation.finished.then(afterMutationCallback, afterMutationCallback);
            afterMutationCallback();
          },
          types: transitionTypes
        });
        ownerDocument.__reactViewTransition = transition;
        var viewTransitionAnimations = [];
        transition.ready.then(function() {
          for (var animations = ownerDocument.documentElement.getAnimations({
            subtree: true
          }), i = 0;i < animations.length; i++) {
            var animation = animations[i], effect = animation.effect, pseudoElement = effect.pseudoElement;
            if (pseudoElement != null && pseudoElement.startsWith("::view-transition")) {
              viewTransitionAnimations.push(animation);
              animation = effect.getKeyframes();
              for (var height = pseudoElement = undefined, unchangedDimensions = true, j = 0;j < animation.length; j++) {
                var keyframe = animation[j], w = keyframe.width;
                if (pseudoElement === undefined)
                  pseudoElement = w;
                else if (pseudoElement !== w) {
                  unchangedDimensions = false;
                  break;
                }
                w = keyframe.height;
                if (height === undefined)
                  height = w;
                else if (height !== w) {
                  unchangedDimensions = false;
                  break;
                }
                delete keyframe.width;
                delete keyframe.height;
                keyframe.transform === "none" && delete keyframe.transform;
              }
              unchangedDimensions && pseudoElement !== undefined && height !== undefined && (effect.setKeyframes(animation), unchangedDimensions = getComputedStyle(effect.target, effect.pseudoElement), unchangedDimensions.width !== pseudoElement || unchangedDimensions.height !== height) && (unchangedDimensions = animation[0], unchangedDimensions.width = pseudoElement, unchangedDimensions.height = height, unchangedDimensions = animation[animation.length - 1], unchangedDimensions.width = pseudoElement, unchangedDimensions.height = height, effect.setKeyframes(animation));
            }
          }
          spawnedWorkCallback();
        }, function(error) {
          ownerDocument.__reactViewTransition === transition && (ownerDocument.__reactViewTransition = null);
          try {
            if (typeof error === "object" && error !== null)
              switch (error.name) {
                case "InvalidStateError":
                  if (error.message === "View transition was skipped because document visibility state is hidden." || error.message === "Skipping view transition because document visibility state has become hidden." || error.message === "Skipping view transition because viewport size changed." || error.message === "Transition was aborted because of invalid state")
                    error = null;
              }
            error !== null && errorCallback(error);
          } finally {
            mutationCallback(), layoutCallback(), spawnedWorkCallback();
          }
        });
        transition.finished.finally(function() {
          for (var i = 0;i < viewTransitionAnimations.length; i++)
            viewTransitionAnimations[i].cancel();
          ownerDocument.__reactViewTransition === transition && (ownerDocument.__reactViewTransition = null);
          passiveCallback();
        });
        return transition;
      } catch (x) {
        return mutationCallback(), layoutCallback(), spawnedWorkCallback(), null;
      }
    }
    function ViewTransitionPseudoElement(pseudo, name) {
      this._scope = document.documentElement;
      this._selector = "::view-transition-" + pseudo + "(" + name + ")";
    }
    ViewTransitionPseudoElement.prototype.animate = function(keyframes, options) {
      options = typeof options === "number" ? { duration: options } : assign({}, options);
      options.pseudoElement = this._selector;
      return this._scope.animate(keyframes, options);
    };
    ViewTransitionPseudoElement.prototype.getAnimations = function() {
      for (var scope = this._scope, selector = this._selector, animations = scope.getAnimations({ subtree: true }), result = [], i = 0;i < animations.length; i++) {
        var effect = animations[i].effect;
        effect !== null && effect.target === scope && effect.pseudoElement === selector && result.push(animations[i]);
      }
      return result;
    };
    ViewTransitionPseudoElement.prototype.getComputedStyle = function() {
      return getComputedStyle(this._scope, this._selector);
    };
    function createViewTransitionInstance(name) {
      return {
        name,
        group: new ViewTransitionPseudoElement("group", name),
        imagePair: new ViewTransitionPseudoElement("image-pair", name),
        old: new ViewTransitionPseudoElement("old", name),
        new: new ViewTransitionPseudoElement("new", name)
      };
    }
    function FragmentInstance(fragmentFiber) {
      this._fragmentFiber = fragmentFiber;
      this._observers = this._eventListeners = null;
    }
    FragmentInstance.prototype.addEventListener = function(type, listener, optionsOrUseCapture) {
      var signal = null, cleanup = null;
      if (optionsOrUseCapture != null && typeof optionsOrUseCapture !== "boolean" && (signal = optionsOrUseCapture.signal || null, signal !== null && signal.aborted))
        return;
      this._eventListeners === null && (this._eventListeners = []);
      var listeners = this._eventListeners;
      if (indexOfEventListener(listeners, type, listener, optionsOrUseCapture) === -1) {
        var fragmentInstance = this, attachedListener = listener;
        optionsOrUseCapture != null && typeof optionsOrUseCapture !== "boolean" && optionsOrUseCapture.once === true && (attachedListener = function(event) {
          fragmentInstance.removeEventListener(type, listener, optionsOrUseCapture);
          typeof listener === "function" ? listener.call(this, event) : listener.handleEvent(event);
        });
        signal !== null && (cleanup = fragmentInstance.removeEventListener.bind(fragmentInstance, type, listener, optionsOrUseCapture), signal.addEventListener("abort", cleanup, { once: true }), cleanup = signal.removeEventListener.bind(signal, "abort", cleanup));
        signal = getAttachOptions(optionsOrUseCapture);
        listeners.push({
          type,
          listener,
          optionsOrUseCapture,
          attachedListener,
          cleanup
        });
        traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, false, addEventListenerToChild, type, attachedListener, signal);
      }
      this._eventListeners = listeners;
    };
    function addEventListenerToChild(child, type, listener, optionsOrUseCapture) {
      getInstanceFromHostFiber(child).addEventListener(type, listener, optionsOrUseCapture);
      return false;
    }
    FragmentInstance.prototype.removeEventListener = function(type, listener, optionsOrUseCapture) {
      var listeners = this._eventListeners;
      if (listeners !== null && (listener = indexOfEventListener(listeners, type, listener, optionsOrUseCapture), listener !== -1)) {
        var _listeners$index = listeners[listener];
        optionsOrUseCapture = _listeners$index.attachedListener;
        var cleanup = _listeners$index.cleanup;
        _listeners$index = getAttachOptions(_listeners$index.optionsOrUseCapture);
        traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, false, removeEventListenerFromChild, type, optionsOrUseCapture, _listeners$index);
        listeners.splice(listener, 1);
        cleanup !== null && cleanup();
      }
    };
    function removeEventListenerFromChild(child, type, listener, optionsOrUseCapture) {
      getInstanceFromHostFiber(child).removeEventListener(type, listener, optionsOrUseCapture);
      return false;
    }
    function getAttachOptions(opts) {
      return opts != null && typeof opts !== "boolean" && (opts.once === true || opts.signal instanceof AbortSignal) ? { capture: opts.capture, passive: opts.passive } : opts;
    }
    function normalizeListenerOptions(opts) {
      return opts == null ? "c=0" : typeof opts === "boolean" ? "c=" + (opts ? "1" : "0") : "c=" + (opts.capture ? "1" : "0");
    }
    function indexOfEventListener(eventListeners, type, listener, optionsOrUseCapture) {
      if (eventListeners.length === 0)
        return -1;
      optionsOrUseCapture = normalizeListenerOptions(optionsOrUseCapture);
      for (var i = 0;i < eventListeners.length; i++) {
        var item = eventListeners[i];
        if (item.type === type && item.listener === listener && normalizeListenerOptions(item.optionsOrUseCapture) === optionsOrUseCapture)
          return i;
      }
      return -1;
    }
    FragmentInstance.prototype.dispatchEvent = function(event) {
      var parentHostFiber = getFragmentParentInstanceOrContainerFiber(this._fragmentFiber);
      if (parentHostFiber === null)
        return true;
      parentHostFiber = getInstanceFromHostFiber(parentHostFiber);
      var eventListeners = this._eventListeners;
      if (eventListeners !== null && 0 < eventListeners.length || !event.bubbles) {
        var temp = parentHostFiber.nodeType === 9 ? parentHostFiber.createComment("") : document.createTextNode("");
        if (eventListeners)
          for (var i = 0;i < eventListeners.length; i++) {
            var _eventListeners$i = eventListeners[i];
            temp.addEventListener(_eventListeners$i.type, _eventListeners$i.attachedListener, getAttachOptions(_eventListeners$i.optionsOrUseCapture));
          }
        parentHostFiber.appendChild(temp);
        event = temp.dispatchEvent(event);
        if (eventListeners)
          for (i = 0;i < eventListeners.length; i++)
            _eventListeners$i = eventListeners[i], temp.removeEventListener(_eventListeners$i.type, _eventListeners$i.attachedListener, getAttachOptions(_eventListeners$i.optionsOrUseCapture));
        parentHostFiber.removeChild(temp);
        return event;
      }
      return parentHostFiber.dispatchEvent(event);
    };
    FragmentInstance.prototype.focus = function(focusOptions) {
      traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, true, setFocusOnFiberIfFocusable, focusOptions, undefined, undefined);
    };
    function setFocusOnFiberIfFocusable(fiber, focusOptions) {
      if (fiber.tag === 6)
        return false;
      fiber = getInstanceFromHostFiber(fiber);
      return setFocusIfFocusable(fiber, focusOptions);
    }
    FragmentInstance.prototype.focusLast = function(focusOptions) {
      var children = [];
      traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, true, collectChildren, children, undefined, undefined);
      for (var i = children.length - 1;0 <= i && !setFocusOnFiberIfFocusable(children[i], focusOptions); i--)
        ;
    };
    function collectChildren(child, collection) {
      collection.push(child);
      return false;
    }
    FragmentInstance.prototype.blur = function() {
      var parentHostFiber = getFragmentParentInstanceOrContainerFiber(this._fragmentFiber);
      parentHostFiber !== null && (parentHostFiber = getInstanceFromHostFiber(parentHostFiber), parentHostFiber = getOwnerDocumentFromRootContainer(parentHostFiber).activeElement, parentHostFiber !== null && traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, false, blurActiveElementWithinFragment, parentHostFiber, undefined, undefined));
    };
    function blurActiveElementWithinFragment(child, activeElement) {
      if (child.tag === 6)
        return false;
      child = getInstanceFromHostFiber(child);
      return child === activeElement || child.contains(activeElement) ? (activeElement.blur(), true) : false;
    }
    FragmentInstance.prototype.observeUsing = function(observer) {
      this._observers === null && (this._observers = new Set);
      this._observers.add(observer);
      traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, false, observeChild, observer, undefined, undefined);
    };
    function observeChild(child, observer) {
      if (child.tag === 6)
        return false;
      child = getInstanceFromHostFiber(child);
      observer.observe(child);
      return false;
    }
    FragmentInstance.prototype.unobserveUsing = function(observer) {
      var observers = this._observers;
      if (observers !== null && observers.has(observer)) {
        observers.delete(observer);
        traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, false, unobserveChild, observer, undefined, undefined);
        for (var i = observers = 0;i < pendingIntersectionUnobserves.length; i++) {
          var pending = pendingIntersectionUnobserves[i];
          pending.fragmentInstance === this && pending.observer === observer ? observer.unobserve(pending.instance) : pendingIntersectionUnobserves[observers++] = pending;
        }
        pendingIntersectionUnobserves.length = observers;
      }
    };
    function unobserveChild(child, observer) {
      if (child.tag === 6)
        return false;
      child = getInstanceFromHostFiber(child);
      observer.unobserve(child);
      return false;
    }
    var pendingIntersectionUnobserves = [];
    var intersectionUnobserveScheduled = false;
    function schedulePendingIntersectionUnobserve(fragmentInstance, observer, instance) {
      pendingIntersectionUnobserves.push({
        fragmentInstance,
        observer,
        instance
      });
      intersectionUnobserveScheduled || (intersectionUnobserveScheduled = true, requestPostPaintCallback(function() {
        intersectionUnobserveScheduled = false;
        var pending = pendingIntersectionUnobserves;
        pendingIntersectionUnobserves = [];
        for (var i = 0;i < pending.length; i++) {
          var item = pending[i];
          item.observer.unobserve(item.instance);
        }
      }));
    }
    FragmentInstance.prototype.getClientRects = function() {
      var rects = [];
      traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, false, collectClientRects, rects, undefined, undefined);
      return rects;
    };
    function collectClientRects(child, rects) {
      if (child.tag === 6) {
        child = child.stateNode;
        var range = child.ownerDocument.createRange();
        range.selectNodeContents(child);
        rects.push.apply(rects, range.getClientRects());
      } else
        child = getInstanceFromHostFiber(child), rects.push.apply(rects, child.getClientRects());
      return false;
    }
    FragmentInstance.prototype.getRootNode = function(getRootNodeOptions) {
      var parentHostFiber = getFragmentParentInstanceOrContainerFiber(this._fragmentFiber);
      return parentHostFiber === null ? this : getInstanceFromHostFiber(parentHostFiber).getRootNode(getRootNodeOptions);
    };
    FragmentInstance.prototype.compareDocumentPosition = function(otherNode) {
      var parentHostFiber = getFragmentParentInstanceOrContainerFiber(this._fragmentFiber);
      if (parentHostFiber === null)
        return Node.DOCUMENT_POSITION_DISCONNECTED;
      var children = [];
      traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, false, collectChildren, children, undefined, undefined);
      var parentHostInstance = getInstanceFromHostFiber(parentHostFiber);
      if (children.length === 0) {
        children = parentHostInstance;
        if (fiberIsPortaledIntoHost(this._fragmentFiber)) {
          a: {
            for (parentHostFiber = this._fragmentFiber.return;parentHostFiber !== null; ) {
              if (parentHostFiber.tag === 4) {
                parentHostFiber = parentHostFiber.stateNode.containerInfo;
                break a;
              }
              if (parentHostFiber.tag === 3 || parentHostFiber.tag === 5 || parentHostFiber.tag === 27)
                break;
              parentHostFiber = parentHostFiber.return;
            }
            parentHostFiber = null;
          }
          parentHostFiber != null && (children = parentHostFiber);
        }
        parentHostFiber = this._fragmentFiber;
        var result = parentHostInstance = children.compareDocumentPosition(otherNode);
        children === otherNode ? result = Node.DOCUMENT_POSITION_CONTAINS : parentHostInstance & Node.DOCUMENT_POSITION_CONTAINED_BY && (children = getFragmentInstanceOrTextInstanceSiblings(parentHostFiber)[1], children === null ? result = Node.DOCUMENT_POSITION_PRECEDING : (otherNode = getInstanceFromHostFiber(children).compareDocumentPosition(otherNode), result = otherNode === 0 || otherNode & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING));
        return result |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
      }
      parentHostFiber = getInstanceFromHostFiber(children[0]);
      result = getInstanceFromHostFiber(children[children.length - 1]);
      var parentHostInstanceFromDOM = fiberIsPortaledIntoHost(this._fragmentFiber) ? parentHostFiber.parentElement : parentHostInstance;
      if (parentHostInstanceFromDOM == null)
        return Node.DOCUMENT_POSITION_DISCONNECTED;
      parentHostInstance = parentHostInstanceFromDOM.compareDocumentPosition(parentHostFiber) & Node.DOCUMENT_POSITION_CONTAINED_BY;
      parentHostInstanceFromDOM = parentHostInstanceFromDOM.compareDocumentPosition(result) & Node.DOCUMENT_POSITION_CONTAINED_BY;
      var firstResult = parentHostFiber.compareDocumentPosition(otherNode), lastResult = result.compareDocumentPosition(otherNode), otherNodeIsWithinFirstOrLastChild = firstResult & Node.DOCUMENT_POSITION_CONTAINED_BY || lastResult & Node.DOCUMENT_POSITION_CONTAINED_BY;
      lastResult = parentHostInstance && parentHostInstanceFromDOM && firstResult & Node.DOCUMENT_POSITION_FOLLOWING && lastResult & Node.DOCUMENT_POSITION_PRECEDING;
      parentHostFiber = parentHostInstance && parentHostFiber === otherNode || parentHostInstanceFromDOM && result === otherNode || otherNodeIsWithinFirstOrLastChild || lastResult ? Node.DOCUMENT_POSITION_CONTAINED_BY : !parentHostInstance && parentHostFiber === otherNode || !parentHostInstanceFromDOM && result === otherNode ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : firstResult;
      return parentHostFiber & Node.DOCUMENT_POSITION_DISCONNECTED || parentHostFiber & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || validateDocumentPositionWithFiberTree(parentHostFiber, this._fragmentFiber, children[0], children[children.length - 1], otherNode) ? parentHostFiber : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    };
    function validateDocumentPositionWithFiberTree(documentPosition, fragmentFiber, precedingBoundaryFiber, followingBoundaryFiber, otherNode) {
      var otherFiber = getClosestInstanceFromNode(otherNode);
      if (documentPosition & Node.DOCUMENT_POSITION_CONTAINED_BY) {
        if (precedingBoundaryFiber = !!otherFiber)
          a: {
            for (;otherFiber !== null; ) {
              if (otherFiber.tag === 7 && (otherFiber === fragmentFiber || otherFiber.alternate === fragmentFiber)) {
                precedingBoundaryFiber = true;
                break a;
              }
              otherFiber = otherFiber.return;
            }
            precedingBoundaryFiber = false;
          }
        return precedingBoundaryFiber;
      }
      if (documentPosition & Node.DOCUMENT_POSITION_CONTAINS) {
        if (otherFiber === null)
          return otherFiber = otherNode.ownerDocument, otherNode === otherFiber || otherNode === otherFiber.documentElement || otherNode === otherFiber.body;
        a: {
          otherFiber = fragmentFiber;
          for (fragmentFiber = getFragmentParentInstanceOrContainerFiber(fragmentFiber);otherFiber !== null; ) {
            if (!(otherFiber.tag !== 5 && otherFiber.tag !== 3 && otherFiber.tag !== 27 || otherFiber !== fragmentFiber && otherFiber.alternate !== fragmentFiber)) {
              otherFiber = true;
              break a;
            }
            otherFiber = otherFiber.return;
          }
          otherFiber = false;
        }
        return otherFiber;
      }
      return documentPosition & Node.DOCUMENT_POSITION_PRECEDING ? ((fragmentFiber = !!otherFiber) && !(fragmentFiber = otherFiber === precedingBoundaryFiber) && (fragmentFiber = getLowestCommonAncestor(precedingBoundaryFiber, otherFiber, getParentForFragmentAncestors), fragmentFiber === null ? fragmentFiber = false : (traverseVisibleInstancesAndTextInstances(fragmentFiber, true, isFiberPrecedingCheck, otherFiber, precedingBoundaryFiber), otherFiber = searchTarget, searchTarget = null, fragmentFiber = otherFiber !== null)), fragmentFiber) : documentPosition & Node.DOCUMENT_POSITION_FOLLOWING ? ((fragmentFiber = !!otherFiber) && !(fragmentFiber = otherFiber === followingBoundaryFiber) && (fragmentFiber = getLowestCommonAncestor(followingBoundaryFiber, otherFiber, getParentForFragmentAncestors), fragmentFiber === null ? fragmentFiber = false : (traverseVisibleInstancesAndTextInstances(fragmentFiber, true, isFiberFollowingCheck, otherFiber, followingBoundaryFiber), otherFiber = searchTarget, searchBoundary = searchTarget = null, fragmentFiber = otherFiber !== null)), fragmentFiber) : false;
    }
    function scrollTextNodeIntoView(textNode, resolvedAlignToTop) {
      var range = textNode.ownerDocument.createRange();
      range.selectNodeContents(textNode);
      textNode = range.getBoundingClientRect();
      window.scrollTo(window.scrollX + textNode.left, resolvedAlignToTop ? window.scrollY + textNode.top : window.scrollY + textNode.bottom - window.innerHeight);
    }
    FragmentInstance.prototype.scrollIntoView = function(alignToTop) {
      if (typeof alignToTop === "object")
        throw Error(formatProdErrorMessage(566));
      var children = [];
      traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, false, collectChildren, children, undefined, undefined);
      var resolvedAlignToTop = alignToTop !== false;
      if (children.length === 0) {
        var hostSiblings = getFragmentInstanceOrTextInstanceSiblings(this._fragmentFiber);
        hostSiblings = resolvedAlignToTop ? hostSiblings[1] || hostSiblings[0] || getFragmentParentInstanceOrContainerFiber(this._fragmentFiber) : hostSiblings[0] || hostSiblings[1];
        if (hostSiblings === null)
          return;
        if (hostSiblings.tag === 6) {
          alignToTop = getInstanceFromHostFiber(hostSiblings);
          scrollTextNodeIntoView(alignToTop, resolvedAlignToTop);
          return;
        }
        hostSiblings = getInstanceFromHostFiber(hostSiblings);
        if (hostSiblings.nodeType !== 9) {
          if (hostSiblings.nodeType === 11) {
            resolvedAlignToTop = "host" in hostSiblings ? hostSiblings.host : null;
            resolvedAlignToTop !== null && resolvedAlignToTop.scrollIntoView(alignToTop);
            return;
          }
          hostSiblings.scrollIntoView(alignToTop);
        }
      }
      for (hostSiblings = resolvedAlignToTop ? children.length - 1 : 0;hostSiblings !== (resolvedAlignToTop ? -1 : children.length); ) {
        var child = children[hostSiblings];
        child.tag === 6 ? (child = getInstanceFromHostFiber(child), scrollTextNodeIntoView(child, resolvedAlignToTop)) : getInstanceFromHostFiber(child).scrollIntoView(alignToTop);
        hostSiblings += resolvedAlignToTop ? -1 : 1;
      }
    };
    function addFragmentHandleToFiber(child, fragmentInstance) {
      child = getInstanceFromHostFiber(child);
      addFragmentHandleToInstance(child, fragmentInstance);
      return false;
    }
    function addFragmentHandleToInstance(instance, fragmentInstance) {
      instance.reactFragments == null && (instance.reactFragments = new Set);
      instance.reactFragments.add(fragmentInstance);
    }
    function commitNewChildToFragmentInstance(childInstance, fragmentInstance) {
      var eventListeners = fragmentInstance._eventListeners;
      if (eventListeners !== null)
        for (var i$jscomp$0 = 0;i$jscomp$0 < eventListeners.length; i$jscomp$0++) {
          var _eventListeners$i3 = eventListeners[i$jscomp$0];
          childInstance.addEventListener(_eventListeners$i3.type, _eventListeners$i3.attachedListener, getAttachOptions(_eventListeners$i3.optionsOrUseCapture));
        }
      childInstance.nodeType !== 3 && (eventListeners = fragmentInstance._observers, eventListeners !== null && eventListeners.forEach(function(observer) {
        for (var writeIdx = 0, i = 0;i < pendingIntersectionUnobserves.length; i++) {
          var pending = pendingIntersectionUnobserves[i];
          if (pending.fragmentInstance !== fragmentInstance || pending.observer !== observer || pending.instance !== childInstance)
            pendingIntersectionUnobserves[writeIdx++] = pending;
        }
        pendingIntersectionUnobserves.length = writeIdx;
        observer.observe(childInstance);
      }), addFragmentHandleToInstance(childInstance, fragmentInstance));
    }
    function deleteChildFromFragmentInstance(childInstance, fragmentInstance) {
      var eventListeners = fragmentInstance._eventListeners;
      if (eventListeners !== null)
        for (var i = 0;i < eventListeners.length; i++) {
          var _eventListeners$i4 = eventListeners[i];
          childInstance.removeEventListener(_eventListeners$i4.type, _eventListeners$i4.attachedListener, getAttachOptions(_eventListeners$i4.optionsOrUseCapture));
        }
      childInstance.nodeType !== 3 && (eventListeners = fragmentInstance._observers, eventListeners !== null && eventListeners.forEach(function(observer) {
        typeof observer.rootMargin === "string" ? schedulePendingIntersectionUnobserve(fragmentInstance, observer, childInstance) : observer.unobserve(childInstance);
      }), childInstance.reactFragments != null && childInstance.reactFragments.delete(fragmentInstance));
    }
    function clearContainerSparingly(container) {
      var nextNode = container.firstChild;
      nextNode && nextNode.nodeType === 10 && (nextNode = nextNode.nextSibling);
      for (;nextNode; ) {
        var node = nextNode;
        nextNode = nextNode.nextSibling;
        switch (node.nodeName) {
          case "HTML":
          case "HEAD":
          case "BODY":
            clearContainerSparingly(node);
            detachDeletedInstance(node);
            continue;
          case "SCRIPT":
          case "STYLE":
            continue;
          case "LINK":
            if (node.rel.toLowerCase() === "stylesheet")
              continue;
        }
        container.removeChild(node);
      }
    }
    function canHydrateInstance(instance, type, props, inRootOrSingleton) {
      for (;instance.nodeType === 1; ) {
        var anyProps = props;
        if (instance.nodeName.toLowerCase() !== type.toLowerCase()) {
          if (!inRootOrSingleton && (instance.nodeName !== "INPUT" || instance.type !== "hidden"))
            break;
        } else if (!inRootOrSingleton)
          if (type === "input" && instance.type === "hidden") {
            var name = anyProps.name == null ? null : "" + anyProps.name;
            if (anyProps.type === "hidden" && instance.getAttribute("name") === name)
              return instance;
          } else
            return instance;
        else if (!instance[internalHoistableMarker])
          switch (type) {
            case "meta":
              if (!instance.hasAttribute("itemprop"))
                break;
              return instance;
            case "link":
              name = instance.getAttribute("rel");
              if (name === "stylesheet" && instance.hasAttribute("data-precedence"))
                break;
              else if (name !== anyProps.rel || instance.getAttribute("href") !== (anyProps.href == null || anyProps.href === "" ? null : anyProps.href) || instance.getAttribute("crossorigin") !== (anyProps.crossOrigin == null ? null : anyProps.crossOrigin) || instance.getAttribute("title") !== (anyProps.title == null ? null : anyProps.title))
                break;
              return instance;
            case "style":
              if (instance.hasAttribute("data-precedence"))
                break;
              return instance;
            case "script":
              name = instance.getAttribute("src");
              if ((name !== (anyProps.src == null ? null : anyProps.src) || instance.getAttribute("type") !== (anyProps.type == null ? null : anyProps.type) || instance.getAttribute("crossorigin") !== (anyProps.crossOrigin == null ? null : anyProps.crossOrigin)) && name && instance.hasAttribute("async") && !instance.hasAttribute("itemprop"))
                break;
              return instance;
            default:
              return instance;
          }
        instance = getNextHydratable(instance.nextSibling);
        if (instance === null)
          break;
      }
      return null;
    }
    function canHydrateTextInstance(instance, text, inRootOrSingleton) {
      if (text === "")
        return null;
      for (;instance.nodeType !== 3; ) {
        if ((instance.nodeType !== 1 || instance.nodeName !== "INPUT" || instance.type !== "hidden") && !inRootOrSingleton)
          return null;
        instance = getNextHydratable(instance.nextSibling);
        if (instance === null)
          return null;
      }
      return instance;
    }
    function canHydrateHydrationBoundary(instance, inRootOrSingleton) {
      for (;instance.nodeType !== 8; ) {
        if ((instance.nodeType !== 1 || instance.nodeName !== "INPUT" || instance.type !== "hidden") && !inRootOrSingleton)
          return null;
        instance = getNextHydratable(instance.nextSibling);
        if (instance === null)
          return null;
      }
      return instance;
    }
    function isSuspenseInstancePending(instance) {
      return instance.data === "$?" || instance.data === "$~";
    }
    function isSuspenseInstanceFallback(instance) {
      return instance.data === "$!" || instance.data === "$?" && instance.ownerDocument.readyState !== "loading";
    }
    function registerSuspenseInstanceRetry(instance, callback) {
      var ownerDocument = instance.ownerDocument;
      if (instance.data === "$~")
        instance._reactRetry = callback;
      else if (instance.data !== "$?" || ownerDocument.readyState !== "loading")
        callback();
      else {
        var listener = function() {
          callback();
          ownerDocument.removeEventListener("DOMContentLoaded", listener);
        };
        ownerDocument.addEventListener("DOMContentLoaded", listener);
        instance._reactRetry = listener;
      }
    }
    function getNextHydratable(node) {
      for (;node != null; node = node.nextSibling) {
        var nodeType = node.nodeType;
        if (nodeType === 1 || nodeType === 3)
          break;
        if (nodeType === 8) {
          nodeType = node.data;
          if (nodeType === "$" || nodeType === "$!" || nodeType === "$?" || nodeType === "$~" || nodeType === "&" || nodeType === "F!" || nodeType === "F")
            break;
          if (nodeType === "/$" || nodeType === "/&")
            return null;
        }
      }
      return node;
    }
    var previousHydratableOnEnteringScopedSingleton = null;
    function getNextHydratableInstanceAfterHydrationBoundary(hydrationInstance) {
      hydrationInstance = hydrationInstance.nextSibling;
      for (var depth = 0;hydrationInstance; ) {
        if (hydrationInstance.nodeType === 8) {
          var data = hydrationInstance.data;
          if (data === "/$" || data === "/&") {
            if (depth === 0)
              return getNextHydratable(hydrationInstance.nextSibling);
            depth--;
          } else
            data !== "$" && data !== "$!" && data !== "$?" && data !== "$~" && data !== "&" || depth++;
        }
        hydrationInstance = hydrationInstance.nextSibling;
      }
      return null;
    }
    function getParentHydrationBoundary(targetInstance) {
      targetInstance = targetInstance.previousSibling;
      for (var depth = 0;targetInstance; ) {
        if (targetInstance.nodeType === 8) {
          var data = targetInstance.data;
          if (data === "$" || data === "$!" || data === "$?" || data === "$~" || data === "&") {
            if (depth === 0)
              return targetInstance;
            depth--;
          } else
            data !== "/$" && data !== "/&" || depth++;
        }
        targetInstance = targetInstance.previousSibling;
      }
      return null;
    }
    function setFocusIfFocusable(node, focusOptions) {
      function handleFocus() {
        didFocus = true;
      }
      if (node.ownerDocument.activeElement === node)
        return true;
      var didFocus = false;
      try {
        node.ownerDocument.addEventListener("focus", handleFocus, true), (node.focus || HTMLElement.prototype.focus).call(node, focusOptions);
      } finally {
        node.ownerDocument.removeEventListener("focus", handleFocus, true);
      }
      return didFocus;
    }
    function requestPostPaintCallback(callback) {
      localRequestAnimationFrame(function() {
        localRequestAnimationFrame(function(time) {
          return callback(time);
        });
      });
    }
    function resolveSingletonInstance(type, props, rootContainerInstance) {
      props = getOwnerDocumentFromRootContainer(rootContainerInstance);
      switch (type) {
        case "html":
          type = props.documentElement;
          if (!type)
            throw Error(formatProdErrorMessage(452));
          return type;
        case "head":
          type = props.head;
          if (!type)
            throw Error(formatProdErrorMessage(453));
          return type;
        case "body":
          type = props.body;
          if (!type)
            throw Error(formatProdErrorMessage(454));
          return type;
        default:
          throw Error(formatProdErrorMessage(451));
      }
    }
    function releaseSingletonInstance(instance, type, props) {
      for (var propKey in props) {
        var propValue = props[propKey];
        props.hasOwnProperty(propKey) && propValue != null && setProp(instance, type, propKey, null, emptyProps, propValue);
      }
      props.dangerouslySetInnerHTML != null && (instance.textContent = "");
      instance.onclick === noop$1 && (instance.onclick = null);
      detachDeletedInstance(instance);
    }
    function clearSingletonPreambleContribution(instance) {
      for (var attributes = instance.attributes;attributes.length; )
        instance.removeAttributeNode(attributes[0]);
      detachDeletedInstance(instance);
    }
    var preloadPropsMap = new Map;
    var preconnectsSet = new Set;
    function getHoistableRoot(container) {
      if (typeof container.getRootNode === "function") {
        var rootNode = container.getRootNode();
        if (rootNode.nodeType === 9 || rootNode.nodeType === 11)
          return rootNode;
      }
      return container.nodeType === 9 ? container : container.ownerDocument;
    }
    var previousDispatcher = ReactDOMSharedInternals.d;
    ReactDOMSharedInternals.d = {
      f: flushSyncWork,
      r: requestFormReset,
      D: prefetchDNS,
      C: preconnect,
      L: preload,
      m: preloadModule,
      X: preinitScript,
      S: preinitStyle,
      M: preinitModuleScript
    };
    function flushSyncWork() {
      var previousWasRendering = previousDispatcher.f(), wasRendering = flushSyncWork$1();
      return previousWasRendering || wasRendering;
    }
    function requestFormReset(form) {
      var formInst = getInstanceFromNode(form);
      formInst !== null && formInst.tag === 5 && formInst.type === "form" ? requestFormReset$1(formInst) : previousDispatcher.r(form);
    }
    var globalDocument = typeof document === "undefined" ? null : document;
    function preconnectAs(rel, href, crossOrigin) {
      var ownerDocument = globalDocument;
      if (ownerDocument && typeof href === "string" && href) {
        var limitedEscapedHref = escapeSelectorAttributeValueInsideDoubleQuotes(href);
        limitedEscapedHref = 'link[rel="' + rel + '"][href="' + limitedEscapedHref + '"]';
        typeof crossOrigin === "string" && (limitedEscapedHref += '[crossorigin="' + crossOrigin + '"]');
        preconnectsSet.has(limitedEscapedHref) || (preconnectsSet.add(limitedEscapedHref), rel = { rel, crossOrigin, href }, ownerDocument.querySelector(limitedEscapedHref) === null && (href = ownerDocument.createElement("link"), setInitialProperties(href, "link", rel), markNodeAsHoistable(href), ownerDocument.head.appendChild(href)));
      }
    }
    function prefetchDNS(href) {
      previousDispatcher.D(href);
      preconnectAs("dns-prefetch", href, null);
    }
    function preconnect(href, crossOrigin) {
      previousDispatcher.C(href, crossOrigin);
      preconnectAs("preconnect", href, crossOrigin);
    }
    function preload(href, as, options) {
      previousDispatcher.L(href, as, options);
      var ownerDocument = globalDocument;
      if (ownerDocument && href && as) {
        var preloadSelector = 'link[rel="preload"][as="' + escapeSelectorAttributeValueInsideDoubleQuotes(as) + '"]';
        as === "image" ? options && options.imageSrcSet ? (preloadSelector += '[imagesrcset="' + escapeSelectorAttributeValueInsideDoubleQuotes(options.imageSrcSet) + '"]', typeof options.imageSizes === "string" && (preloadSelector += '[imagesizes="' + escapeSelectorAttributeValueInsideDoubleQuotes(options.imageSizes) + '"]')) : preloadSelector += '[href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]' : preloadSelector += '[href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]';
        var key = preloadSelector;
        switch (as) {
          case "style":
            key = getStyleKey(href);
            break;
          case "script":
            key = getScriptKey(href);
        }
        if (!(preloadPropsMap.has(key) || (href = assign({
          rel: "preload",
          href: as === "image" && options && options.imageSrcSet ? undefined : href,
          as
        }, options), preloadPropsMap.set(key, href), ownerDocument.querySelector(preloadSelector) !== null || as === "style" && ownerDocument.querySelector(getStylesheetSelectorFromKey(key)) || as === "script" && ownerDocument.querySelector(getScriptSelectorFromKey(key))))) {
          var instance = ownerDocument.createElement("link");
          setInitialProperties(instance, "link", href);
          as === "style" && (instance[internalLoadPendingKey] = true, instance.onload = instance.onerror = function() {
            clearPendingLoadOnNode(instance);
          });
          markNodeAsHoistable(instance);
          ownerDocument.head.appendChild(instance);
        }
      }
    }
    function preloadModule(href, options) {
      previousDispatcher.m(href, options);
      var ownerDocument = globalDocument;
      if (ownerDocument && href) {
        var as = options && typeof options.as === "string" ? options.as : "script", preloadSelector = 'link[rel="modulepreload"][as="' + escapeSelectorAttributeValueInsideDoubleQuotes(as) + '"][href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]', key = preloadSelector;
        switch (as) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            key = getScriptKey(href);
        }
        if (!preloadPropsMap.has(key) && (href = assign({ rel: "modulepreload", href }, options), preloadPropsMap.set(key, href), ownerDocument.querySelector(preloadSelector) === null)) {
          switch (as) {
            case "audioworklet":
            case "paintworklet":
            case "serviceworker":
            case "sharedworker":
            case "worker":
            case "script":
              if (ownerDocument.querySelector(getScriptSelectorFromKey(key)))
                return;
          }
          as = ownerDocument.createElement("link");
          setInitialProperties(as, "link", href);
          markNodeAsHoistable(as);
          ownerDocument.head.appendChild(as);
        }
      }
    }
    function preinitStyle(href, precedence, options) {
      previousDispatcher.S(href, precedence, options);
      var ownerDocument = globalDocument;
      if (ownerDocument && href) {
        var styles = getResourcesFromRoot(ownerDocument).hoistableStyles, key = getStyleKey(href);
        precedence = precedence || "default";
        var resource = styles.get(key);
        if (!resource) {
          var state = { loading: 0, preload: null };
          if (resource = ownerDocument.querySelector(getStylesheetSelectorFromKey(key)))
            state.loading = 5;
          else {
            href = assign({ rel: "stylesheet", href, "data-precedence": precedence }, options);
            (options = preloadPropsMap.get(key)) && adoptPreloadPropsForStylesheet(href, options);
            var link = resource = ownerDocument.createElement("link");
            markNodeAsHoistable(link);
            setInitialProperties(link, "link", href);
            link._p = new Promise(function(resolve, reject) {
              link.onload = resolve;
              link.onerror = reject;
            });
            link.addEventListener("load", function() {
              state.loading |= 1;
            });
            link.addEventListener("error", function() {
              state.loading |= 2;
            });
            state.loading |= 4;
            insertStylesheet(resource, precedence, ownerDocument);
          }
          resource = {
            type: "stylesheet",
            instance: resource,
            count: 1,
            state
          };
          styles.set(key, resource);
        }
      }
    }
    function preinitScript(src, options) {
      previousDispatcher.X(src, options);
      var ownerDocument = globalDocument;
      if (ownerDocument && src) {
        var scripts = getResourcesFromRoot(ownerDocument).hoistableScripts, key = getScriptKey(src), resource = scripts.get(key);
        resource || (resource = ownerDocument.querySelector(getScriptSelectorFromKey(key)), resource || (src = assign({ src, async: true }, options), (options = preloadPropsMap.get(key)) && adoptPreloadPropsForScript(src, options), resource = ownerDocument.createElement("script"), markNodeAsHoistable(resource), setInitialProperties(resource, "link", src), ownerDocument.head.appendChild(resource)), resource = {
          type: "script",
          instance: resource,
          count: 1,
          state: null
        }, scripts.set(key, resource));
      }
    }
    function preinitModuleScript(src, options) {
      previousDispatcher.M(src, options);
      var ownerDocument = globalDocument;
      if (ownerDocument && src) {
        var scripts = getResourcesFromRoot(ownerDocument).hoistableScripts, key = getScriptKey(src), resource = scripts.get(key);
        resource || (resource = ownerDocument.querySelector(getScriptSelectorFromKey(key)), resource || (src = assign({ src, async: true, type: "module" }, options), (options = preloadPropsMap.get(key)) && adoptPreloadPropsForScript(src, options), resource = ownerDocument.createElement("script"), markNodeAsHoistable(resource), setInitialProperties(resource, "link", src), ownerDocument.head.appendChild(resource)), resource = {
          type: "script",
          instance: resource,
          count: 1,
          state: null
        }, scripts.set(key, resource));
      }
    }
    function getResource(type, currentProps, pendingProps, currentResource) {
      var JSCompiler_inline_result = (JSCompiler_inline_result = rootInstanceStackCursor.current) ? getHoistableRoot(JSCompiler_inline_result) : null;
      if (!JSCompiler_inline_result)
        throw Error(formatProdErrorMessage(446));
      switch (type) {
        case "meta":
        case "title":
          return null;
        case "style":
          return typeof pendingProps.precedence === "string" && typeof pendingProps.href === "string" ? (pendingProps = getStyleKey(pendingProps.href), currentProps = getResourcesFromRoot(JSCompiler_inline_result).hoistableStyles, currentResource = currentProps.get(pendingProps), currentResource || (currentResource = {
            type: "style",
            instance: null,
            count: 0,
            state: null
          }, currentProps.set(pendingProps, currentResource)), currentResource) : { type: "void", instance: null, count: 0, state: null };
        case "link":
          if (pendingProps.rel === "stylesheet" && typeof pendingProps.href === "string" && typeof pendingProps.precedence === "string") {
            type = getStyleKey(pendingProps.href);
            var styles$268 = getResourcesFromRoot(JSCompiler_inline_result).hoistableStyles, resource$269 = styles$268.get(type);
            resource$269 || (JSCompiler_inline_result = JSCompiler_inline_result.ownerDocument || JSCompiler_inline_result, resource$269 = {
              type: "stylesheet",
              instance: null,
              count: 0,
              state: { loading: 0, preload: null }
            }, styles$268.set(type, resource$269), (styles$268 = JSCompiler_inline_result.querySelector(getStylesheetSelectorFromKey(type))) ? styles$268._p || (resource$269.instance = styles$268, resource$269.state.loading = 5) : (styles$268 = preloadPropsMap.get(type), styles$268 || (styles$268 = {
              rel: "preload",
              as: "style",
              href: pendingProps.href,
              crossOrigin: pendingProps.crossOrigin,
              integrity: pendingProps.integrity,
              media: pendingProps.media,
              hrefLang: pendingProps.hrefLang,
              referrerPolicy: pendingProps.referrerPolicy
            }, preloadPropsMap.set(type, styles$268)), preloadStylesheet(JSCompiler_inline_result, type, styles$268, resource$269.state)));
            if (currentProps && currentResource === null)
              throw Error(formatProdErrorMessage(528, ""));
            return resource$269;
          }
          if (currentProps && currentResource !== null)
            throw Error(formatProdErrorMessage(529, ""));
          return null;
        case "script":
          return currentProps = pendingProps.async, pendingProps = pendingProps.src, typeof pendingProps === "string" && currentProps && typeof currentProps !== "function" && typeof currentProps !== "symbol" ? (pendingProps = getScriptKey(pendingProps), currentProps = getResourcesFromRoot(JSCompiler_inline_result).hoistableScripts, currentResource = currentProps.get(pendingProps), currentResource || (currentResource = {
            type: "script",
            instance: null,
            count: 0,
            state: null
          }, currentProps.set(pendingProps, currentResource)), currentResource) : { type: "void", instance: null, count: 0, state: null };
        default:
          throw Error(formatProdErrorMessage(444, type));
      }
    }
    function getStyleKey(href) {
      return 'href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"';
    }
    function getStylesheetSelectorFromKey(key) {
      return 'link[rel="stylesheet"][' + key + "]";
    }
    function stylesheetPropsFromRawProps(rawProps) {
      return assign({}, rawProps, {
        "data-precedence": rawProps.precedence,
        precedence: null
      });
    }
    function preloadStylesheet(ownerDocument, key, preloadProps, state) {
      if (key = ownerDocument.querySelector('link[rel="preload"][as="style"][' + key + "]")) {
        if (key[internalLoadPendingKey] !== true) {
          state.loading = 1;
          return;
        }
      } else
        key = ownerDocument.createElement("link"), key[internalLoadPendingKey] = true, key.onload = key.onerror = clearPendingLoadOnNode.bind(null, key), setInitialProperties(key, "link", preloadProps), markNodeAsHoistable(key), ownerDocument.head.appendChild(key);
      state.preload = key;
      key.addEventListener("load", function() {
        return state.loading |= 1;
      });
      key.addEventListener("error", function() {
        return state.loading |= 2;
      });
    }
    function getScriptKey(src) {
      return '[src="' + escapeSelectorAttributeValueInsideDoubleQuotes(src) + '"]';
    }
    function getScriptSelectorFromKey(key) {
      return "script[async]" + key;
    }
    function acquireResource(hoistableRoot, resource, props) {
      resource.count++;
      if (resource.instance === null)
        switch (resource.type) {
          case "style":
            var instance = hoistableRoot.querySelector('style[data-href~="' + escapeSelectorAttributeValueInsideDoubleQuotes(props.href) + '"]');
            if (instance)
              return resource.instance = instance, markNodeAsHoistable(instance), instance;
            var styleProps = assign({}, props, {
              "data-href": props.href,
              "data-precedence": props.precedence,
              href: null,
              precedence: null
            });
            instance = (hoistableRoot.ownerDocument || hoistableRoot).createElement("style");
            markNodeAsHoistable(instance);
            setInitialProperties(instance, "style", styleProps);
            insertStylesheet(instance, props.precedence, hoistableRoot);
            return resource.instance = instance;
          case "stylesheet":
            styleProps = getStyleKey(props.href);
            var instance$274 = hoistableRoot.querySelector(getStylesheetSelectorFromKey(styleProps));
            if (instance$274)
              return resource.state.loading |= 4, resource.instance = instance$274, markNodeAsHoistable(instance$274), instance$274;
            instance = stylesheetPropsFromRawProps(props);
            (styleProps = preloadPropsMap.get(styleProps)) && adoptPreloadPropsForStylesheet(instance, styleProps);
            instance$274 = (hoistableRoot.ownerDocument || hoistableRoot).createElement("link");
            markNodeAsHoistable(instance$274);
            var linkInstance = instance$274;
            linkInstance._p = new Promise(function(resolve, reject) {
              linkInstance.onload = resolve;
              linkInstance.onerror = reject;
            });
            setInitialProperties(instance$274, "link", instance);
            resource.state.loading |= 4;
            insertStylesheet(instance$274, props.precedence, hoistableRoot);
            return resource.instance = instance$274;
          case "script":
            instance$274 = getScriptKey(props.src);
            if (styleProps = hoistableRoot.querySelector(getScriptSelectorFromKey(instance$274)))
              return resource.instance = styleProps, markNodeAsHoistable(styleProps), styleProps;
            instance = props;
            if (styleProps = preloadPropsMap.get(instance$274))
              instance = assign({}, props), adoptPreloadPropsForScript(instance, styleProps);
            hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
            styleProps = hoistableRoot.createElement("script");
            markNodeAsHoistable(styleProps);
            setInitialProperties(styleProps, "link", instance);
            hoistableRoot.head.appendChild(styleProps);
            return resource.instance = styleProps;
          case "void":
            return null;
          default:
            throw Error(formatProdErrorMessage(443, resource.type));
        }
      else
        resource.type === "stylesheet" && (resource.state.loading & 4) === 0 && (instance = resource.instance, resource.state.loading |= 4, insertStylesheet(instance, props.precedence, hoistableRoot));
      return resource.instance;
    }
    function insertStylesheet(instance, precedence, root) {
      for (var nodes = root.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'), last = nodes.length ? nodes[nodes.length - 1] : null, prior = last, i = 0;i < nodes.length; i++) {
        var node = nodes[i];
        if (node.dataset.precedence === precedence)
          prior = node;
        else if (prior !== last)
          break;
      }
      prior ? prior.parentNode.insertBefore(instance, prior.nextSibling) : (precedence = root.nodeType === 9 ? root.head : root, precedence.insertBefore(instance, precedence.firstChild));
    }
    function adoptPreloadPropsForStylesheet(stylesheetProps, preloadProps) {
      stylesheetProps.crossOrigin == null && (stylesheetProps.crossOrigin = preloadProps.crossOrigin);
      stylesheetProps.referrerPolicy == null && (stylesheetProps.referrerPolicy = preloadProps.referrerPolicy);
      stylesheetProps.title == null && (stylesheetProps.title = preloadProps.title);
    }
    function adoptPreloadPropsForScript(scriptProps, preloadProps) {
      scriptProps.crossOrigin == null && (scriptProps.crossOrigin = preloadProps.crossOrigin);
      scriptProps.referrerPolicy == null && (scriptProps.referrerPolicy = preloadProps.referrerPolicy);
      scriptProps.integrity == null && (scriptProps.integrity = preloadProps.integrity);
    }
    var tagCaches = null;
    function getHydratableHoistableCache(type, keyAttribute, ownerDocument) {
      if (tagCaches === null) {
        var cache = new Map;
        var caches = tagCaches = new Map;
        caches.set(ownerDocument, cache);
      } else
        caches = tagCaches, cache = caches.get(ownerDocument), cache || (cache = new Map, caches.set(ownerDocument, cache));
      if (cache.has(type))
        return cache;
      cache.set(type, null);
      ownerDocument = ownerDocument.getElementsByTagName(type);
      for (caches = 0;caches < ownerDocument.length; caches++) {
        var node = ownerDocument[caches];
        if (!(node[internalHoistableMarker] || node[internalInstanceKey] || type === "link" && node.getAttribute("rel") === "stylesheet") && node.namespaceURI !== "http://www.w3.org/2000/svg") {
          var nodeKey = node.getAttribute(keyAttribute) || "";
          nodeKey = type + nodeKey;
          var existing = cache.get(nodeKey);
          existing ? existing.push(node) : cache.set(nodeKey, [node]);
        }
      }
      return cache;
    }
    function mountHoistable(hoistableRoot, type, instance) {
      hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
      hoistableRoot.head.insertBefore(instance, type === "title" ? hoistableRoot.querySelector("head > title") : null);
    }
    function isHostHoistableType(type, props, hostContext) {
      if (hostContext === 1 || props.itemProp != null)
        return false;
      switch (type) {
        case "meta":
        case "title":
          return true;
        case "style":
          if (typeof props.precedence !== "string" || typeof props.href !== "string" || props.href === "")
            break;
          return true;
        case "link":
          if (typeof props.rel !== "string" || typeof props.href !== "string" || props.href === "" || props.onLoad || props.onError)
            break;
          switch (props.rel) {
            case "stylesheet":
              return type = props.disabled, typeof props.precedence === "string" && type == null;
            default:
              return true;
          }
        case "script":
          if (props.async && typeof props.async !== "function" && typeof props.async !== "symbol" && !props.onLoad && !props.onError && props.src && typeof props.src === "string")
            return true;
      }
      return false;
    }
    function maySuspendCommit(type, props) {
      return type === "img" && props.src != null && props.src !== "" && props.onLoad == null && props.loading !== "lazy";
    }
    function preloadResource(resource) {
      return resource.type === "stylesheet" && (resource.state.loading & 3) === 0 ? false : true;
    }
    function estimateImageBytes(instance) {
      return (instance.width || 100) * (instance.height || 100) * (typeof devicePixelRatio === "number" ? devicePixelRatio : 1) * 0.25;
    }
    function suspendInstance(state, instance) {
      typeof instance.decode === "function" && (state.imgCount++, instance.complete || (state.imgBytes += estimateImageBytes(instance), state.suspenseyImages.push(instance)), state = onUnsuspendImg.bind(state), instance.decode().then(state, state));
    }
    function suspendResource(state, hoistableRoot, resource, props) {
      if (resource.type === "stylesheet" && (typeof props.media !== "string" || matchMedia(props.media).matches !== false) && (resource.state.loading & 4) === 0) {
        if (resource.instance === null) {
          var key = getStyleKey(props.href), instance = hoistableRoot.querySelector(getStylesheetSelectorFromKey(key));
          if (instance) {
            hoistableRoot = instance._p;
            hoistableRoot !== null && typeof hoistableRoot === "object" && typeof hoistableRoot.then === "function" && (state.count++, state = onUnsuspend.bind(state), hoistableRoot.then(state, state));
            resource.state.loading |= 4;
            resource.instance = instance;
            markNodeAsHoistable(instance);
            return;
          }
          instance = hoistableRoot.ownerDocument || hoistableRoot;
          props = stylesheetPropsFromRawProps(props);
          (key = preloadPropsMap.get(key)) && adoptPreloadPropsForStylesheet(props, key);
          instance = instance.createElement("link");
          markNodeAsHoistable(instance);
          var linkInstance = instance;
          linkInstance._p = new Promise(function(resolve, reject) {
            linkInstance.onload = resolve;
            linkInstance.onerror = reject;
          });
          setInitialProperties(instance, "link", props);
          resource.instance = instance;
        }
        state.stylesheets === null && (state.stylesheets = new Map);
        state.stylesheets.set(resource, hoistableRoot);
        (hoistableRoot = resource.state.preload) && (resource.state.loading & 3) === 0 && (state.count++, resource = onUnsuspend.bind(state), hoistableRoot.addEventListener("load", resource), hoistableRoot.addEventListener("error", resource));
      }
    }
    var estimatedBytesWithinLimit = 0;
    function waitForCommitToBeReady(state, timeoutOffset) {
      state.stylesheets && state.count === 0 && insertSuspendedStylesheets(state, state.stylesheets);
      return 0 < state.count || 0 < state.imgCount ? function(commit) {
        var stylesheetTimer = setTimeout(function() {
          state.stylesheets && insertSuspendedStylesheets(state, state.stylesheets);
          if (state.unsuspend) {
            var unsuspend = state.unsuspend;
            state.unsuspend = null;
            unsuspend();
          }
        }, 60000 + timeoutOffset);
        0 < state.imgBytes && estimatedBytesWithinLimit === 0 && (estimatedBytesWithinLimit = 62500 * estimateBandwidth());
        var imgTimer = setTimeout(function() {
          state.waitingForImages = false;
          if (state.count === 0 && (state.stylesheets && insertSuspendedStylesheets(state, state.stylesheets), state.unsuspend)) {
            var unsuspend = state.unsuspend;
            state.unsuspend = null;
            unsuspend();
          }
        }, (state.imgBytes > estimatedBytesWithinLimit ? 50 : 800) + timeoutOffset);
        state.unsuspend = commit;
        return function() {
          state.unsuspend = null;
          clearTimeout(stylesheetTimer);
          clearTimeout(imgTimer);
        };
      } : null;
    }
    function checkIfFullyUnsuspended(state) {
      if (state.count === 0 && (state.imgCount === 0 || !state.waitingForImages)) {
        if (state.stylesheets)
          insertSuspendedStylesheets(state, state.stylesheets);
        else if (state.unsuspend) {
          var unsuspend = state.unsuspend;
          state.unsuspend = null;
          unsuspend();
        }
      }
    }
    function onUnsuspend() {
      this.count--;
      checkIfFullyUnsuspended(this);
    }
    function onUnsuspendImg() {
      this.imgCount--;
      checkIfFullyUnsuspended(this);
    }
    var precedencesByRoot = null;
    function insertSuspendedStylesheets(state, resources) {
      state.stylesheets = null;
      state.unsuspend !== null && (state.count++, precedencesByRoot = new Map, resources.forEach(insertStylesheetIntoRoot, state), precedencesByRoot = null, onUnsuspend.call(state));
    }
    function insertStylesheetIntoRoot(root, resource) {
      if (!(resource.state.loading & 4)) {
        var precedences = precedencesByRoot.get(root);
        if (precedences)
          var last = precedences.get(null);
        else {
          precedences = new Map;
          precedencesByRoot.set(root, precedences);
          for (var nodes = root.querySelectorAll("link[data-precedence],style[data-precedence]"), i = 0;i < nodes.length; i++) {
            var node = nodes[i];
            if (node.nodeName === "LINK" || node.getAttribute("media") !== "not all")
              precedences.set(node.dataset.precedence, node), last = node;
          }
          last && precedences.set(null, last);
        }
        nodes = resource.instance;
        node = nodes.getAttribute("data-precedence");
        i = precedences.get(node) || last;
        i === last && precedences.set(null, nodes);
        precedences.set(node, nodes);
        this.count++;
        last = onUnsuspend.bind(this);
        nodes.addEventListener("load", last);
        nodes.addEventListener("error", last);
        i ? i.parentNode.insertBefore(nodes, i.nextSibling) : (root = root.nodeType === 9 ? root.head : root, root.insertBefore(nodes, root.firstChild));
        resource.state.loading |= 4;
      }
    }
    var HostTransitionContext = {
      $$typeof: REACT_CONTEXT_TYPE,
      Provider: null,
      Consumer: null,
      _currentValue: sharedNotPendingObject,
      _currentValue2: sharedNotPendingObject,
      _threadCount: 0
    };
    function FiberRootNode(containerInfo, tag, hydrate, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator, formState) {
      this.tag = 1;
      this.containerInfo = containerInfo;
      this.pingCache = this.current = this.pendingChildren = null;
      this.timeoutHandle = -1;
      this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null;
      this.callbackPriority = 0;
      this.expirationTimes = createLaneMap(-1);
      this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
      this.entanglements = createLaneMap(0);
      this.hiddenUpdates = createLaneMap(null);
      this.identifierPrefix = identifierPrefix;
      this.onUncaughtError = onUncaughtError;
      this.onCaughtError = onCaughtError;
      this.onRecoverableError = onRecoverableError;
      this.pooledCache = null;
      this.pooledCacheLanes = 0;
      this.formState = formState;
      this.transitionTypes = null;
      this.incompleteTransitions = new Map;
    }
    function createFiberRoot(containerInfo, tag, hydrate, initialChildren, hydrationCallbacks, isStrictMode, identifierPrefix, formState, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator) {
      containerInfo = new FiberRootNode(containerInfo, tag, hydrate, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator, formState);
      tag = 1;
      isStrictMode === true && (tag |= 24);
      isStrictMode = createFiberImplClass(3, null, null, tag);
      containerInfo.current = isStrictMode;
      isStrictMode.stateNode = containerInfo;
      tag = createCache();
      tag.refCount++;
      containerInfo.pooledCache = tag;
      tag.refCount++;
      isStrictMode.memoizedState = {
        element: initialChildren,
        isDehydrated: hydrate,
        cache: tag
      };
      initializeUpdateQueue(isStrictMode);
      return containerInfo;
    }
    function getContextForSubtree(parentComponent) {
      if (!parentComponent)
        return emptyContextObject;
      parentComponent = emptyContextObject;
      return parentComponent;
    }
    function updateContainerImpl(rootFiber, lane, element, container, parentComponent, callback) {
      parentComponent = getContextForSubtree(parentComponent);
      container.context === null ? container.context = parentComponent : container.pendingContext = parentComponent;
      container = createUpdate(lane);
      container.payload = { element };
      callback = callback === undefined ? null : callback;
      callback !== null && (container.callback = callback);
      element = enqueueUpdate(rootFiber, container, lane);
      element !== null && (scheduleUpdateOnFiber(element, rootFiber, lane), entangleTransitions(element, rootFiber, lane));
    }
    function markRetryLaneImpl(fiber, retryLane) {
      fiber = fiber.memoizedState;
      if (fiber !== null && fiber.dehydrated !== null) {
        var a = fiber.retryLane;
        fiber.retryLane = a !== 0 && a < retryLane ? a : retryLane;
      }
    }
    function markRetryLaneIfNotHydrated(fiber, retryLane) {
      markRetryLaneImpl(fiber, retryLane);
      (fiber = fiber.alternate) && markRetryLaneImpl(fiber, retryLane);
    }
    function attemptContinuousHydration(fiber) {
      if (fiber.tag === 13 || fiber.tag === 31) {
        var root = enqueueConcurrentRenderForLane(fiber, 67108864);
        root !== null && scheduleUpdateOnFiber(root, fiber, 67108864);
        markRetryLaneIfNotHydrated(fiber, 67108864);
      }
    }
    function attemptHydrationAtCurrentPriority(fiber) {
      if (fiber.tag === 13 || fiber.tag === 31) {
        var lane = requestUpdateLane();
        lane = getBumpedLaneForHydrationByLane(lane);
        var root = enqueueConcurrentRenderForLane(fiber, lane);
        root !== null && scheduleUpdateOnFiber(root, fiber, lane);
        markRetryLaneIfNotHydrated(fiber, lane);
      }
    }
    var _enabled = true;
    function dispatchDiscreteEvent(domEventName, eventSystemFlags, container, nativeEvent) {
      var prevTransition = ReactSharedInternals.T;
      ReactSharedInternals.T = null;
      var previousPriority = ReactDOMSharedInternals.p;
      try {
        ReactDOMSharedInternals.p = 2, dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
      } finally {
        ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition;
      }
    }
    function dispatchContinuousEvent(domEventName, eventSystemFlags, container, nativeEvent) {
      var prevTransition = ReactSharedInternals.T;
      ReactSharedInternals.T = null;
      var previousPriority = ReactDOMSharedInternals.p;
      try {
        ReactDOMSharedInternals.p = 8, dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
      } finally {
        ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition;
      }
    }
    function dispatchEvent(domEventName, eventSystemFlags, targetContainer, nativeEvent) {
      if (_enabled) {
        var blockedOn = findInstanceBlockingEvent(nativeEvent);
        if (blockedOn === null)
          dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, return_targetInst, targetContainer), clearIfContinuousEvent(domEventName, nativeEvent);
        else if (queueIfContinuousEvent(blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent))
          nativeEvent.stopPropagation();
        else if (clearIfContinuousEvent(domEventName, nativeEvent), eventSystemFlags & 4 && -1 < discreteReplayableEvents.indexOf(domEventName)) {
          for (;blockedOn !== null; ) {
            var fiber = getInstanceFromNode(blockedOn);
            if (fiber !== null)
              switch (fiber.tag) {
                case 3:
                  fiber = fiber.stateNode;
                  if (fiber.current.memoizedState.isDehydrated) {
                    var lanes = getHighestPriorityLanes(fiber.pendingLanes);
                    if (lanes !== 0) {
                      var root = fiber;
                      root.pendingLanes |= 2;
                      for (root.entangledLanes |= 2;lanes; ) {
                        var lane = 1 << 31 - clz32(lanes);
                        root.entanglements[1] |= lane;
                        lanes &= ~lane;
                      }
                      ensureRootIsScheduled(fiber);
                      (executionContext & 6) === 0 && (workInProgressRootRenderTargetTime = now() + 500, flushSyncWorkAcrossRoots_impl(0, false));
                    }
                  }
                  break;
                case 31:
                case 13:
                  root = enqueueConcurrentRenderForLane(fiber, 2), root !== null && scheduleUpdateOnFiber(root, fiber, 2), flushSyncWork$1(), markRetryLaneIfNotHydrated(fiber, 2);
              }
            fiber = findInstanceBlockingEvent(nativeEvent);
            fiber === null && dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, return_targetInst, targetContainer);
            if (fiber === blockedOn)
              break;
            blockedOn = fiber;
          }
          blockedOn !== null && nativeEvent.stopPropagation();
        } else
          dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, null, targetContainer);
      }
    }
    function findInstanceBlockingEvent(nativeEvent) {
      nativeEvent = getEventTarget(nativeEvent);
      return findInstanceBlockingTarget(nativeEvent);
    }
    var return_targetInst = null;
    function findInstanceBlockingTarget(targetNode) {
      return_targetInst = null;
      targetNode = getClosestInstanceFromNode(targetNode);
      if (targetNode !== null) {
        var nearestMounted = getNearestMountedFiber(targetNode);
        if (nearestMounted === null)
          targetNode = null;
        else {
          var tag = nearestMounted.tag;
          if (tag === 13) {
            targetNode = getSuspenseInstanceFromFiber(nearestMounted);
            if (targetNode !== null)
              return targetNode;
            targetNode = null;
          } else if (tag === 31) {
            targetNode = getActivityInstanceFromFiber(nearestMounted);
            if (targetNode !== null)
              return targetNode;
            targetNode = null;
          } else if (tag === 3) {
            if (nearestMounted.stateNode.current.memoizedState.isDehydrated)
              return nearestMounted.tag === 3 ? nearestMounted.stateNode.containerInfo : null;
            targetNode = null;
          } else
            nearestMounted !== targetNode && (targetNode = null);
        }
      }
      return_targetInst = targetNode;
      return null;
    }
    function getEventPriority(domEventName) {
      switch (domEventName) {
        case "beforetoggle":
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "seeked":
        case "submit":
        case "toggle":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "fullscreenerror":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return 2;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "resize":
        case "scroll":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return 8;
        case "message":
          switch (getCurrentPriorityLevel()) {
            case ImmediatePriority:
              return 2;
            case UserBlockingPriority:
              return 8;
            case NormalPriority$1:
            case LowPriority:
              return 32;
            case IdlePriority:
              return 268435456;
            default:
              return 32;
          }
        default:
          return 32;
      }
    }
    var hasScheduledReplayAttempt = false;
    var queuedFocus = null;
    var queuedDrag = null;
    var queuedMouse = null;
    var queuedPointers = new Map;
    var queuedPointerCaptures = new Map;
    var queuedExplicitHydrationTargets = [];
    var discreteReplayableEvents = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
    function clearIfContinuousEvent(domEventName, nativeEvent) {
      switch (domEventName) {
        case "focusin":
        case "focusout":
          queuedFocus = null;
          break;
        case "dragenter":
        case "dragleave":
          queuedDrag = null;
          break;
        case "mouseover":
        case "mouseout":
          queuedMouse = null;
          break;
        case "pointerover":
        case "pointerout":
          queuedPointers.delete(nativeEvent.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          queuedPointerCaptures.delete(nativeEvent.pointerId);
      }
    }
    function accumulateOrCreateContinuousQueuedReplayableEvent(existingQueuedEvent, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
      if (existingQueuedEvent === null || existingQueuedEvent.nativeEvent !== nativeEvent)
        return existingQueuedEvent = {
          blockedOn,
          domEventName,
          eventSystemFlags,
          nativeEvent,
          targetContainers: [targetContainer]
        }, blockedOn !== null && (blockedOn = getInstanceFromNode(blockedOn), blockedOn !== null && attemptContinuousHydration(blockedOn)), existingQueuedEvent;
      existingQueuedEvent.eventSystemFlags |= eventSystemFlags;
      blockedOn = existingQueuedEvent.targetContainers;
      targetContainer !== null && blockedOn.indexOf(targetContainer) === -1 && blockedOn.push(targetContainer);
      return existingQueuedEvent;
    }
    function queueIfContinuousEvent(blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
      switch (domEventName) {
        case "focusin":
          return queuedFocus = accumulateOrCreateContinuousQueuedReplayableEvent(queuedFocus, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent), true;
        case "dragenter":
          return queuedDrag = accumulateOrCreateContinuousQueuedReplayableEvent(queuedDrag, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent), true;
        case "mouseover":
          return queuedMouse = accumulateOrCreateContinuousQueuedReplayableEvent(queuedMouse, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent), true;
        case "pointerover":
          var pointerId = nativeEvent.pointerId;
          queuedPointers.set(pointerId, accumulateOrCreateContinuousQueuedReplayableEvent(queuedPointers.get(pointerId) || null, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent));
          return true;
        case "gotpointercapture":
          return pointerId = nativeEvent.pointerId, queuedPointerCaptures.set(pointerId, accumulateOrCreateContinuousQueuedReplayableEvent(queuedPointerCaptures.get(pointerId) || null, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent)), true;
      }
      return false;
    }
    function attemptExplicitHydrationTarget(queuedTarget) {
      var targetInst = getClosestInstanceFromNode(queuedTarget.target);
      if (targetInst !== null) {
        var nearestMounted = getNearestMountedFiber(targetInst);
        if (nearestMounted !== null) {
          if (targetInst = nearestMounted.tag, targetInst === 13) {
            if (targetInst = getSuspenseInstanceFromFiber(nearestMounted), targetInst !== null) {
              queuedTarget.blockedOn = targetInst;
              runWithPriority(queuedTarget.priority, function() {
                attemptHydrationAtCurrentPriority(nearestMounted);
              });
              return;
            }
          } else if (targetInst === 31) {
            if (targetInst = getActivityInstanceFromFiber(nearestMounted), targetInst !== null) {
              queuedTarget.blockedOn = targetInst;
              runWithPriority(queuedTarget.priority, function() {
                attemptHydrationAtCurrentPriority(nearestMounted);
              });
              return;
            }
          } else if (targetInst === 3 && nearestMounted.stateNode.current.memoizedState.isDehydrated) {
            queuedTarget.blockedOn = nearestMounted.tag === 3 ? nearestMounted.stateNode.containerInfo : null;
            return;
          }
        }
      }
      queuedTarget.blockedOn = null;
    }
    function attemptReplayContinuousQueuedEvent(queuedEvent) {
      if (queuedEvent.blockedOn !== null)
        return false;
      for (var targetContainers = queuedEvent.targetContainers;0 < targetContainers.length; ) {
        var nextBlockedOn = findInstanceBlockingEvent(queuedEvent.nativeEvent);
        if (nextBlockedOn === null) {
          nextBlockedOn = queuedEvent.nativeEvent;
          var nativeEventClone = new nextBlockedOn.constructor(nextBlockedOn.type, nextBlockedOn);
          currentReplayingEvent = nativeEventClone;
          nextBlockedOn.target.dispatchEvent(nativeEventClone);
          currentReplayingEvent = null;
        } else
          return targetContainers = getInstanceFromNode(nextBlockedOn), targetContainers !== null && attemptContinuousHydration(targetContainers), queuedEvent.blockedOn = nextBlockedOn, false;
        targetContainers.shift();
      }
      return true;
    }
    function attemptReplayContinuousQueuedEventInMap(queuedEvent, key, map) {
      attemptReplayContinuousQueuedEvent(queuedEvent) && map.delete(key);
    }
    function replayUnblockedEvents() {
      hasScheduledReplayAttempt = false;
      queuedFocus !== null && attemptReplayContinuousQueuedEvent(queuedFocus) && (queuedFocus = null);
      queuedDrag !== null && attemptReplayContinuousQueuedEvent(queuedDrag) && (queuedDrag = null);
      queuedMouse !== null && attemptReplayContinuousQueuedEvent(queuedMouse) && (queuedMouse = null);
      queuedPointers.forEach(attemptReplayContinuousQueuedEventInMap);
      queuedPointerCaptures.forEach(attemptReplayContinuousQueuedEventInMap);
    }
    function scheduleCallbackIfUnblocked(queuedEvent, unblocked) {
      queuedEvent.blockedOn === unblocked && (queuedEvent.blockedOn = null, hasScheduledReplayAttempt || (hasScheduledReplayAttempt = true, Scheduler.unstable_scheduleCallback(Scheduler.unstable_NormalPriority, replayUnblockedEvents)));
    }
    var lastScheduledReplayQueue = null;
    function scheduleReplayQueueIfNeeded(formReplayingQueue) {
      lastScheduledReplayQueue !== formReplayingQueue && (lastScheduledReplayQueue = formReplayingQueue, Scheduler.unstable_scheduleCallback(Scheduler.unstable_NormalPriority, function() {
        lastScheduledReplayQueue === formReplayingQueue && (lastScheduledReplayQueue = null);
        for (var i = 0;i < formReplayingQueue.length; i += 3) {
          var form = formReplayingQueue[i], submitterOrAction = formReplayingQueue[i + 1], formData = formReplayingQueue[i + 2];
          if (typeof submitterOrAction !== "function")
            if (findInstanceBlockingTarget(submitterOrAction || form) === null)
              continue;
            else
              break;
          var formInst = getInstanceFromNode(form);
          formInst !== null && (formReplayingQueue.splice(i, 3), i -= 3, startHostTransition(formInst, {
            pending: true,
            data: formData,
            method: form.method,
            action: submitterOrAction
          }, submitterOrAction, formData));
        }
      }));
    }
    function retryIfBlockedOn(unblocked) {
      function unblock(queuedEvent) {
        return scheduleCallbackIfUnblocked(queuedEvent, unblocked);
      }
      queuedFocus !== null && scheduleCallbackIfUnblocked(queuedFocus, unblocked);
      queuedDrag !== null && scheduleCallbackIfUnblocked(queuedDrag, unblocked);
      queuedMouse !== null && scheduleCallbackIfUnblocked(queuedMouse, unblocked);
      queuedPointers.forEach(unblock);
      queuedPointerCaptures.forEach(unblock);
      for (var i = 0;i < queuedExplicitHydrationTargets.length; i++) {
        var queuedTarget = queuedExplicitHydrationTargets[i];
        queuedTarget.blockedOn === unblocked && (queuedTarget.blockedOn = null);
      }
      for (;0 < queuedExplicitHydrationTargets.length && (i = queuedExplicitHydrationTargets[0], i.blockedOn === null); )
        attemptExplicitHydrationTarget(i), i.blockedOn === null && queuedExplicitHydrationTargets.shift();
      i = (unblocked.ownerDocument || unblocked).$$reactFormReplay;
      if (i != null)
        for (queuedTarget = 0;queuedTarget < i.length; queuedTarget += 3) {
          var form = i[queuedTarget], submitterOrAction = i[queuedTarget + 1], formProps = form[internalPropsKey] || null;
          if (typeof submitterOrAction === "function")
            formProps || scheduleReplayQueueIfNeeded(i);
          else if (formProps) {
            var action = null;
            if (submitterOrAction && submitterOrAction.hasAttribute("formAction"))
              if (form = submitterOrAction, formProps = submitterOrAction[internalPropsKey] || null)
                action = formProps.formAction;
              else {
                if (findInstanceBlockingTarget(form) !== null)
                  continue;
              }
            else
              action = formProps.action;
            typeof action === "function" ? i[queuedTarget + 1] = action : (i.splice(queuedTarget, 3), queuedTarget -= 3);
            scheduleReplayQueueIfNeeded(i);
          }
        }
    }
    function defaultOnDefaultTransitionIndicator() {
      function handleNavigate(event) {
        event.canIntercept && event.info === "react-transition" && event.intercept({
          handler: function() {
            return new Promise(function(resolve) {
              return pendingResolve = resolve;
            });
          },
          focusReset: "manual",
          scroll: "manual"
        });
      }
      function handleNavigateComplete() {
        pendingResolve !== null && (pendingResolve(), pendingResolve = null);
        isCancelled || setTimeout(startFakeNavigation, 20);
      }
      function startFakeNavigation() {
        if (!isCancelled && !navigation.transition) {
          var currentEntry = navigation.currentEntry;
          currentEntry && currentEntry.url != null && navigation.navigate(currentEntry.url, {
            state: currentEntry.getState(),
            info: "react-transition",
            history: "replace"
          });
        }
      }
      if (typeof navigation === "object") {
        var isCancelled = false, pendingResolve = null;
        navigation.addEventListener("navigate", handleNavigate);
        navigation.addEventListener("navigatesuccess", handleNavigateComplete);
        navigation.addEventListener("navigateerror", handleNavigateComplete);
        setTimeout(startFakeNavigation, 100);
        return function() {
          isCancelled = true;
          navigation.removeEventListener("navigate", handleNavigate);
          navigation.removeEventListener("navigatesuccess", handleNavigateComplete);
          navigation.removeEventListener("navigateerror", handleNavigateComplete);
          pendingResolve !== null && (pendingResolve(), pendingResolve = null);
        };
      }
    }
    function ReactDOMRoot(internalRoot) {
      this._internalRoot = internalRoot;
    }
    ReactDOMHydrationRoot.prototype.render = ReactDOMRoot.prototype.render = function(children) {
      var root = this._internalRoot;
      if (root === null)
        throw Error(formatProdErrorMessage(409));
      var current = root.current, lane = requestUpdateLane();
      updateContainerImpl(current, lane, children, root, null, null);
    };
    ReactDOMHydrationRoot.prototype.unmount = ReactDOMRoot.prototype.unmount = function() {
      var root = this._internalRoot;
      if (root !== null) {
        this._internalRoot = null;
        var container = root.containerInfo;
        updateContainerImpl(root.current, 2, null, root, null, null);
        flushSyncWork$1();
        container[internalContainerInstanceKey] = null;
      }
    };
    function ReactDOMHydrationRoot(internalRoot) {
      this._internalRoot = internalRoot;
    }
    ReactDOMHydrationRoot.prototype.unstable_scheduleHydration = function(target) {
      if (target) {
        var updatePriority = resolveUpdatePriority();
        target = { blockedOn: null, target, priority: updatePriority };
        for (var i = 0;i < queuedExplicitHydrationTargets.length && updatePriority !== 0 && updatePriority < queuedExplicitHydrationTargets[i].priority; i++)
          ;
        queuedExplicitHydrationTargets.splice(i, 0, target);
        i === 0 && attemptExplicitHydrationTarget(target);
      }
    };
    var isomorphicReactPackageVersion$jscomp$inline_2043 = React.version;
    if (isomorphicReactPackageVersion$jscomp$inline_2043 !== "19.3.1")
      throw Error(formatProdErrorMessage(527, isomorphicReactPackageVersion$jscomp$inline_2043, "19.3.1"));
    ReactDOMSharedInternals.findDOMNode = function(componentOrElement) {
      var fiber = componentOrElement._reactInternals;
      if (fiber === undefined) {
        if (typeof componentOrElement.render === "function")
          throw Error(formatProdErrorMessage(188));
        componentOrElement = Object.keys(componentOrElement).join(",");
        throw Error(formatProdErrorMessage(268, componentOrElement));
      }
      componentOrElement = findCurrentFiberUsingSlowPath(fiber);
      componentOrElement = componentOrElement !== null ? findCurrentHostFiberImpl(componentOrElement) : null;
      componentOrElement = componentOrElement === null ? null : componentOrElement.stateNode;
      return componentOrElement;
    };
    var internals$jscomp$inline_2586 = {
      bundleType: 0,
      version: "19.3.1",
      rendererPackageName: "react-dom",
      currentDispatcherRef: ReactSharedInternals,
      reconcilerVersion: "19.3.1"
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined") {
      hook$jscomp$inline_2587 = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!hook$jscomp$inline_2587.isDisabled && hook$jscomp$inline_2587.supportsFiber)
        try {
          rendererID = hook$jscomp$inline_2587.inject(internals$jscomp$inline_2586), injectedHook = hook$jscomp$inline_2587;
        } catch (err) {}
    }
    var hook$jscomp$inline_2587;
    exports.createRoot = function(container, options) {
      if (!isValidContainer(container))
        throw Error(formatProdErrorMessage(299));
      var isStrictMode = false, identifierPrefix = "", onUncaughtError = defaultOnUncaughtError, onCaughtError = defaultOnCaughtError, onRecoverableError = defaultOnRecoverableError;
      options !== null && options !== undefined && (options.unstable_strictMode === true && (isStrictMode = true), options.identifierPrefix !== undefined && (identifierPrefix = options.identifierPrefix), options.onUncaughtError !== undefined && (onUncaughtError = options.onUncaughtError), options.onCaughtError !== undefined && (onCaughtError = options.onCaughtError), options.onRecoverableError !== undefined && (onRecoverableError = options.onRecoverableError));
      options = createFiberRoot(container, 1, false, null, null, isStrictMode, identifierPrefix, null, onUncaughtError, onCaughtError, onRecoverableError, defaultOnDefaultTransitionIndicator);
      container[internalContainerInstanceKey] = options.current;
      listenToAllSupportedEvents(container);
      return new ReactDOMRoot(options);
    };
    exports.hydrateRoot = function(container, initialChildren, options) {
      if (!isValidContainer(container))
        throw Error(formatProdErrorMessage(299));
      var isStrictMode = false, identifierPrefix = "", onUncaughtError = defaultOnUncaughtError, onCaughtError = defaultOnCaughtError, onRecoverableError = defaultOnRecoverableError, formState = null;
      options !== null && options !== undefined && (options.unstable_strictMode === true && (isStrictMode = true), options.identifierPrefix !== undefined && (identifierPrefix = options.identifierPrefix), options.onUncaughtError !== undefined && (onUncaughtError = options.onUncaughtError), options.onCaughtError !== undefined && (onCaughtError = options.onCaughtError), options.onRecoverableError !== undefined && (onRecoverableError = options.onRecoverableError), options.formState !== undefined && (formState = options.formState));
      initialChildren = createFiberRoot(container, 1, true, initialChildren, options != null ? options : null, isStrictMode, identifierPrefix, formState, onUncaughtError, onCaughtError, onRecoverableError, defaultOnDefaultTransitionIndicator);
      initialChildren.context = getContextForSubtree(null);
      options = initialChildren.current;
      isStrictMode = requestUpdateLane();
      isStrictMode = getBumpedLaneForHydrationByLane(isStrictMode);
      identifierPrefix = createUpdate(isStrictMode);
      identifierPrefix.callback = null;
      enqueueUpdate(options, identifierPrefix, isStrictMode);
      options = isStrictMode;
      initialChildren.current.lanes = options;
      markRootUpdated$1(initialChildren, options);
      ensureRootIsScheduled(initialChildren);
      container[internalContainerInstanceKey] = initialChildren.current;
      listenToAllSupportedEvents(container);
      return new ReactDOMHydrationRoot(initialChildren);
    };
    exports.version = "19.3.1";
  });

  // node_modules/react-dom/client.js
  var require_client = __commonJS(function(exports, module) {
    function checkDCE() {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
        return;
      }
      if (false) {}
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
      } catch (err) {
        console.error(err);
      }
    }
    if (true) {
      checkDCE();
      module.exports = require_react_dom_client_production();
    }
  });

  // node_modules/react/cjs/react-jsx-runtime.production.js
  var require_react_jsx_runtime_production = __commonJS(function(exports) {
    var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
    var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
    function jsxProd(type, config, maybeKey) {
      var key = null;
      maybeKey !== undefined && (key = "" + maybeKey);
      config.key !== undefined && (key = "" + config.key);
      if ("key" in config) {
        maybeKey = {};
        for (var propName in config)
          propName !== "key" && (maybeKey[propName] = config[propName]);
      } else
        maybeKey = config;
      config = maybeKey.ref;
      return {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        ref: config !== undefined ? config : null,
        props: maybeKey
      };
    }
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsx = jsxProd;
    exports.jsxs = jsxProd;
  });

  // node_modules/react/jsx-runtime.js
  var require_jsx_runtime = __commonJS(function(exports, module) {
    if (true) {
      module.exports = require_react_jsx_runtime_production();
    }
  });

  // src/main.tsx
  var import_react5 = __toESM(require_react(), 1);
  var import_client = __toESM(require_client(), 1);

  // node_modules/@openchamber/sdk/dist/api-version.js
  var OPENCHAMBER_SDK_CHANNEL = "openchamber.sdk";
  var OPENCHAMBER_SDK_API_VERSION = 1;
  // node_modules/@openchamber/sdk/dist/scrollbar-style.js
  var GUEST_SCROLLING_ATTRIBUTE = "data-oc-scrolling";
  var GUEST_SCROLLBAR_CSS = `
:root {
  /* Quiet at rest like the app's own thumbs; hover gives a clear grab target. */
  --oc-scrollbar-thumb: color-mix(in srgb, var(--oc-muted, currentColor) 18%, transparent);
  --oc-scrollbar-thumb-hover: color-mix(in srgb, var(--oc-muted, currentColor) 36%, transparent);
  scrollbar-gutter: stable;
}
* {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}
:hover, [${GUEST_SCROLLING_ATTRIBUTE}] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [${GUEST_SCROLLING_ATTRIBUTE}] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [${GUEST_SCROLLING_ATTRIBUTE}]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [${GUEST_SCROLLING_ATTRIBUTE}] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;
  function installGuestScrollbarActivity(doc) {
    const root = doc.documentElement;
    if (root.hasAttribute("data-oc-scrollbar-activity"))
      return;
    root.setAttribute("data-oc-scrollbar-activity", "");
    const timers = new WeakMap;
    doc.addEventListener("scroll", (event) => {
      const target = event.target === doc ? root : event.target;
      if (!(target instanceof Element))
        return;
      if (!target.hasAttribute("data-oc-scrolling"))
        target.setAttribute("data-oc-scrolling", "");
      const pending = timers.get(target);
      if (pending !== undefined)
        clearTimeout(pending);
      timers.set(target, setTimeout(() => {
        timers.delete(target);
        target.removeAttribute("data-oc-scrolling");
      }, 1000));
    }, { capture: true, passive: true });
  }
  var GUEST_SCROLLBAR_SCRIPT = `(${installGuestScrollbarActivity.toString()})(document);`;
  // node_modules/@openchamber/sdk/dist/workspace.js
  var GUEST_STORAGE_KEY_MAX = 128;
  var GUEST_STORAGE_VALUE_BYTES = 65536;
  // node_modules/@openchamber/sdk/dist/shells.js
  var GUEST_SHELL_ID_MAX = 128;
  var GUEST_SHELL_OUTPUT_TAIL_MAX = 65536;
  // node_modules/@openchamber/sdk/dist/status-controls.js
  var GUEST_STATUS_CONTROLS_MAX = 4;
  var GUEST_STATUS_CONTROL_ID = /^[a-z][a-z0-9-]{0,39}$/;
  var GUEST_STATUS_CONTROL_LABEL_MAX = 60;
  var GUEST_STATUS_CONTROL_OPTIONS_MAX = 16;
  var GUEST_STATUS_CONTROL_VALUE_MAX = 80;
  var isControlObject = (value) => Object(value) === value && !Array.isArray(value);
  var hasOnlyKeys = (value, keys) => Object.keys(value).every((key) => keys.includes(key));
  var isLabel = (value) => String(value) === value && value.length >= 1 && value.length <= GUEST_STATUS_CONTROL_LABEL_MAX;
  var isValue = (value) => String(value) === value && value.length >= 1 && value.length <= GUEST_STATUS_CONTROL_VALUE_MAX;
  var isGuestStatusControls = (controls) => {
    if (!Array.isArray(controls) || controls.length > GUEST_STATUS_CONTROLS_MAX)
      return false;
    const ids = new Set;
    for (const control of controls) {
      if (!isControlObject(control) || !GUEST_STATUS_CONTROL_ID.test(control.id) || !isLabel(control.label))
        return false;
      if (control.disabled !== undefined && control.disabled !== true && control.disabled !== false)
        return false;
      if (ids.has(control.id))
        return false;
      ids.add(control.id);
      if (control.kind === "button") {
        if (!hasOnlyKeys(control, ["kind", "id", "label", "disabled"]))
          return false;
        continue;
      }
      if (control.kind !== "select" || !hasOnlyKeys(control, ["kind", "id", "label", "value", "options", "disabled"]))
        return false;
      if (!isValue(control.value) || !Array.isArray(control.options) || control.options.length < 1 || control.options.length > GUEST_STATUS_CONTROL_OPTIONS_MAX)
        return false;
      const values = new Set;
      for (const option of control.options) {
        if (!isControlObject(option) || !hasOnlyKeys(option, ["value", "label"]) || !isValue(option.value) || !isLabel(option.label) || values.has(option.value))
          return false;
        values.add(option.value);
      }
      if (!values.has(control.value))
        return false;
    }
    return true;
  };
  // node_modules/@openchamber/sdk/dist/file-editor.js
  var GUEST_FILE_EDITOR_CONTENT_MAX = 20000000;
  var GUEST_FILE_EDITOR_VERSION_MAX = 256;
  var patternExpressions = new Map;
  var fileEditorPayloadSize = (value) => ("bytes" in value) ? value.bytes.byteLength : value.content.length;
  var sameFileEditorDocument = (left, right) => {
    if (left.path !== right.path || left.readOnly !== right.readOnly)
      return false;
    if (left.encoding === "text" || right.encoding === "text") {
      return left.encoding === "text" && right.encoding === "text" && left.content === right.content;
    }
    if (left.bytes.byteLength !== right.bytes.byteLength)
      return false;
    for (let index = 0;index < left.bytes.byteLength; index += 1) {
      if (left.bytes[index] !== right.bytes[index])
        return false;
    }
    return true;
  };
  // node_modules/@openchamber/sdk/dist/popover.js
  var GUEST_POPOVER_ID = /^[A-Za-z0-9_-]{1,80}$/;
  var GUEST_POPOVER_COORDINATE_MAX = 1e5;
  var GUEST_POPOVER_WIDTH_MIN = 160;
  var GUEST_POPOVER_WIDTH_MAX = 640;
  var GUEST_POPOVER_HEIGHT_MIN = 48;
  var GUEST_POPOVER_HEIGHT_MAX = 480;
  var GUEST_POPOVER_DATA_MAX = 16000;
  var GUEST_POPOVER_DATA_DEPTH_MAX = 32;
  var GUEST_POPOVER_SIDES = ["left", "right", "top", "bottom"];
  var hasBoundedJsonTree = (value, depth = 0, budget = { remaining: GUEST_POPOVER_DATA_MAX }) => {
    if (--budget.remaining < 0 || depth >= GUEST_POPOVER_DATA_DEPTH_MAX)
      return false;
    if (value === null)
      return true;
    const children = Array.isArray(value) ? value : Object(value) === value ? Object.values(value) : [];
    for (const item of children) {
      if (!hasBoundedJsonTree(item, depth + 1, budget))
        return false;
    }
    return true;
  };
  var isFiniteJson = (value) => {
    if (value === null || value === true || value === false)
      return true;
    if (Array.isArray(value))
      return Object.keys(value).every((key) => /^(0|[1-9]\d*)$/.test(key) && Number(key) < value.length) && value.every(isFiniteJson);
    if (Object(value) === value) {
      const prototype = Object.getPrototypeOf(value);
      return (prototype === null || prototype === Object.prototype) && Object.values(value).every(isFiniteJson);
    }
    return String(value) === value || Number.isFinite(value);
  };
  var isGuestPopoverRequest = (request) => {
    try {
      if (String(request.id) !== request.id || !GUEST_POPOVER_ID.test(request.id) || !Number.isFinite(request.anchor.x) || Math.abs(request.anchor.x) > GUEST_POPOVER_COORDINATE_MAX || !Number.isFinite(request.anchor.y) || Math.abs(request.anchor.y) > GUEST_POPOVER_COORDINATE_MAX || !Number.isFinite(request.anchor.width) || !Number.isFinite(request.anchor.height) || request.anchor.width <= 0 || request.anchor.height <= 0 || request.anchor.width > GUEST_POPOVER_COORDINATE_MAX || request.anchor.height > GUEST_POPOVER_COORDINATE_MAX || !Number.isInteger(request.width) || request.width < GUEST_POPOVER_WIDTH_MIN || request.width > GUEST_POPOVER_WIDTH_MAX || !Number.isInteger(request.height) || request.height < GUEST_POPOVER_HEIGHT_MIN || request.height > GUEST_POPOVER_HEIGHT_MAX || request.side !== undefined && !GUEST_POPOVER_SIDES.includes(request.side) || request.focus !== undefined && request.focus !== true && request.focus !== false || !hasBoundedJsonTree(request.data) || !isFiniteJson(request.data))
        return false;
      return JSON.stringify(request.data).length <= GUEST_POPOVER_DATA_MAX;
    } catch {
      return false;
    }
  };

  // node_modules/@openchamber/sdk/dist/contract.js
  var GUEST_FILE_STAT_KINDS = ["file", "directory", "other", "missing"];
  var isStartSessionResult = (value) => Boolean(value && "sessionId" in value);
  var isPromptResult = (value) => Boolean(value && "sent" in value && !("sessionId" in value));
  var GUEST_COMMIT_SHA = /^[0-9a-f]{7,64}$/i;
  var isGuestCommitSha = (value) => GUEST_COMMIT_SHA.test(value);
  var GUEST_TOAST_MAX = 500;
  var GUEST_CLIPBOARD_TEXT_MAX = 32000;
  var GUEST_COMPOSE_TEXT_MAX = 16000;
  var GUEST_ATTACH_ID_MAX = 128;
  var GUEST_ATTACH_TITLE_MAX = 200;
  var GUEST_ATTACH_URL_MAX = 2000;
  var GUEST_ATTACH_TEXT_MAX = 16000;
  var GUEST_ATTACH_AUTHOR_MAX = 80;
  var GUEST_ATTACH_BRANCH_MAX = 200;
  var GUEST_ATTACH_DATA_MAX = 16000;
  var GUEST_REQUEST_PATH_MAX = 2000;
  var GUEST_REQUEST_TIMEOUT_MS = 20000;
  var GUEST_FILE_PATH_MAX = 1024;
  var GUEST_FILE_CONTENT_MAX = 2000000;
  var GUEST_GENERATE_PROMPT_MAX = 64000;
  var GUEST_GENERATE_SYSTEM_MAX = 8000;
  var GUEST_GENERATE_OUTPUT_TOKENS_MAX = 4000;
  var GUEST_GENERATE_TIMEOUT_MS = 960000;
  var GUEST_GENERATE_LATE_KEEP_MS = 60 * 60000;
  var GUEST_BADGE_MAX = 999;
  var GUEST_FRAME_HEIGHT_MAX = 1e4;
  var GUEST_RESOLVE_ERROR_MAX = 500;
  var HOST_REQUEST_ERROR_CODES = [
    "HOST_UNAVAILABLE",
    "HOST_TIMEOUT",
    "HOST_REJECTED",
    "DISCONNECTED",
    "DISABLED",
    "BAD_PATH",
    "NO_INTEGRATION",
    "NO_SERVICE",
    "SERVICE_FAILED",
    "REQUEST_FAILED",
    "RESPONSE_TOO_LARGE",
    "NO_SESSION",
    "SESSION_BUSY",
    "NOT_GRANTED",
    "NO_DIRECTORY",
    "NOT_FOUND",
    "FILE_TOO_LARGE",
    "DENIED",
    "NO_MODEL",
    "MODEL_FAILED",
    "UNSUPPORTED"
  ];
  var SERVICE_STATUS_VALUES = ["stopped", "starting", "ready", "failed"];
  var hostRequestErrorCodeSet = new Set(HOST_REQUEST_ERROR_CODES);
  var isHostRequestErrorCode = (value) => hostRequestErrorCodeSet.has(value);
  var resolveHostRequestErrorCode = (value) => value && isHostRequestErrorCode(value) ? value : "HOST_REJECTED";
  var isJsonValue = (value) => {
    if (value === undefined)
      return false;
    if (value === null || value === true || value === false)
      return true;
    if (String(value) === value)
      return true;
    if (Number(value) === value)
      return Number.isFinite(value);
    if (Array.isArray(value))
      return value.every(isJsonValue);
    if (Object(value) === value)
      return Object.values(value).every(isJsonValue);
    return false;
  };
  var isAttachData = (value) => isJsonValue(value) && JSON.stringify(value).length <= GUEST_ATTACH_DATA_MAX;
  var clampBranch = (value) => value?.trim().slice(0, GUEST_ATTACH_BRANCH_MAX) ?? "";
  var clampAttachRequest = (request) => {
    const id = request.id.trim().slice(0, GUEST_ATTACH_ID_MAX);
    const title = request.title.trim().slice(0, GUEST_ATTACH_TITLE_MAX);
    const url = request.url.trim().slice(0, GUEST_ATTACH_URL_MAX);
    const text = request.text?.trim().slice(0, GUEST_ATTACH_TEXT_MAX);
    const author = request.author?.trim().slice(0, GUEST_ATTACH_AUTHOR_MAX);
    const kind = request.kind === "pull" ? "pull" : "issue";
    const next = {
      providerId: request.providerId.trim(),
      id,
      title: title || id,
      url,
      kind
    };
    if (text) {
      next.text = text;
    }
    if (author) {
      next.author = author;
    }
    if (kind === "pull") {
      const head = clampBranch(request.branches?.head);
      const base = clampBranch(request.branches?.base);
      if (head && base) {
        next.branches = { head, base };
      }
    }
    if (isAttachData(request.data)) {
      next.data = request.data;
    }
    return next;
  };
  var clampStartSessionRequest = (request) => {
    const next = clampAttachRequest(request);
    if (request.projectId)
      next.projectId = request.projectId;
    if (request.navigation)
      next.navigation = request.navigation;
    if (request.worktree) {
      next.worktree = request.worktree;
    }
    return next;
  };
  var clampPromptRequest = (request) => {
    const next = {
      text: request.text.trim().slice(0, GUEST_COMPOSE_TEXT_MAX)
    };
    if (request.send) {
      next.send = true;
    }
    return next;
  };
  var clampBadgeCount = (count) => {
    if (count === null || !Number.isFinite(count))
      return null;
    return Math.min(GUEST_BADGE_MAX, Math.max(0, Math.round(count)));
  };
  var clampFrameHeight = (height) => {
    if (!Number.isFinite(height))
      return 0;
    return Math.min(GUEST_FRAME_HEIGHT_MAX, Math.max(0, Math.ceil(height)));
  };
  var isGuestFilePath = (value) => value.length > 0 && value.length <= GUEST_FILE_PATH_MAX && !value.includes("\x00") && !value.includes("\\");
  var isGuestRequestPath = (value) => {
    if (!value.startsWith("/") || value.includes("\x00") || value.includes("\\") || value.includes("://")) {
      return false;
    }
    if (value.length > GUEST_REQUEST_PATH_MAX) {
      return false;
    }
    const segments = value.split("/");
    return !segments.some((segment) => segment === "." || segment === "..");
  };
  var serviceStatusSet = new Set(SERVICE_STATUS_VALUES);
  var isServiceStatusResult = (value) => Boolean(value && "status" in value && serviceStatusSet.has(String(value.status)) && !("body" in value));
  var isGuestRequestResult = (value) => Boolean(value && "status" in value && "body" in value && Number.isInteger(value.status));
  var isFileReadResult = (value) => Boolean(value && "content" in value && String(value.content) === value.content);
  var isFileWriteResult = (value) => Boolean(value && "written" in value && value.written === true);
  var isFileListResult = (value) => Boolean(value && "entries" in value && Array.isArray(value.entries));
  var fileStatKindSet = new Set(GUEST_FILE_STAT_KINDS);
  var isFileStatResult = (value) => Boolean(value && "kind" in value && "size" in value && fileStatKindSet.has(String(value.kind)) && Number.isFinite(value.size));
  var isGenerateResult = (value) => Boolean(value && "text" in value && String(value.text) === value.text && !("status" in value));
  var HOST_PUSH_TYPES = new Set([
    "workspace",
    "shells",
    "ready",
    "directory",
    "session",
    "connection",
    "settings",
    "session-lifecycle",
    "item",
    "resolve",
    "action",
    "status-control-event",
    "popover-closed",
    "file-open",
    "file-snapshot",
    "file-saved",
    "generate-late"
  ]);
  var asWireRecord = (data) => Object(data) === data ? data : null;
  var isNonEmptyString = (value) => String(value) === value && value.length > 0;
  var readResultMessage = (wire) => {
    if (!isNonEmptyString(wire.id))
      return null;
    if (wire.ok === true) {
      const message = {
        channel: OPENCHAMBER_SDK_CHANNEL,
        v: OPENCHAMBER_SDK_API_VERSION,
        type: "result",
        id: wire.id,
        ok: true
      };
      if (Object(wire.payload) === wire.payload) {
        message.payload = wire.payload;
      }
      return message;
    }
    if (wire.ok === false && isNonEmptyString(wire.error)) {
      return {
        channel: OPENCHAMBER_SDK_CHANNEL,
        v: OPENCHAMBER_SDK_API_VERSION,
        type: "result",
        id: wire.id,
        ok: false,
        error: wire.error,
        code: resolveHostRequestErrorCode(isNonEmptyString(wire.code) ? wire.code : undefined)
      };
    }
    return null;
  };
  var readHostMessage = (data) => {
    const wire = asWireRecord(data);
    if (!wire || wire.channel !== OPENCHAMBER_SDK_CHANNEL || wire.v !== OPENCHAMBER_SDK_API_VERSION)
      return null;
    if (wire.type === "result")
      return readResultMessage(wire);
    if (!HOST_PUSH_TYPES.has(String(wire.type)) || Object(wire.payload) !== wire.payload)
      return null;
    return wire;
  };

  // node_modules/@openchamber/sdk/dist/host.js
  var isKeyEvent = (event) => ("key" in event) && ("metaKey" in event) && ("ctrlKey" in event);
  var isSaveShortcut = (event) => (event.metaKey || event.ctrlKey) && !event.altKey && !event.shiftKey && event.key.toLowerCase() === "s";

  class HostRequestError extends Error {
    code;
    constructor(code, message) {
      super(message);
      this.name = "HostRequestError";
      this.code = code;
    }
  }
  var rejectBadPath = () => Promise.reject(new HostRequestError("BAD_PATH", 'Request path must start with "/" and stay on the declared origin.'));
  var rejectBadFilePath = () => Promise.reject(new HostRequestError("BAD_PATH", `File path must be 1 to ${GUEST_FILE_PATH_MAX} characters without NUL or backslash.`));
  var deviceStorageScope = (options) => {
    if (options === undefined)
      return;
    if (Object(options) !== options || Array.isArray(options) || options.scope !== undefined && options.scope !== "instance" && options.scope !== "device") {
      throw new HostRequestError("HOST_REJECTED", 'Storage scope must be "instance" or "device".');
    }
    return options.scope === "device" ? "device" : undefined;
  };
  var nextId = (n) => {
    n.value += 1;
    return `oc-${n.value}`;
  };
  var connectHost = (options = {}) => {
    const target = options.target ?? ("window" in globalThis ? window : null);
    if (!target) {
      throw new HostRequestError("HOST_UNAVAILABLE", "No window. connectHost runs in a browser frame.");
    }
    const acceptSource = options.acceptSource ?? ((source) => source === target.parent);
    const requestTimeoutMs = options.requestTimeoutMs ?? GUEST_REQUEST_TIMEOUT_MS;
    const readyListeners = new Set;
    const directoryListeners = new Set;
    const sessionListeners = new Set;
    const lifecycleListeners = new Set;
    const connectionListeners = new Set;
    const settingsListeners = new Set;
    const itemListeners = new Set;
    const statusControlListeners = new Set;
    const popoverClosedListeners = new Set;
    const lateGenerateListeners = new Set;
    const unclaimedLateGenerate = [];
    let resolveHandler = null;
    let actionHandler = null;
    const fileOpenListeners = new Set;
    const fileSavedListeners = new Set;
    let fileSnapshotHandler = null;
    let lastFile = null;
    let saveShortcutInstalled = false;
    const pending = new Map;
    const workspaceListeners = new Map;
    const shellsListeners = new Map;
    let disposed = false;
    const ids = { value: 0 };
    let lastReady = null;
    let lastLifecycle = null;
    let popoverPointerActive = false;
    let popoverFocusActive = false;
    let popoverActivityReported = null;
    const lifecycleFromSession = (session) => {
      if (!session)
        return null;
      return {
        sessionId: session.id,
        phase: session.busy ? "started" : "completed"
      };
    };
    const post = (message) => {
      target.parent.postMessage(message, "*");
    };
    const listenForLateGenerate = () => {
      if (disposed || target.parent === target || lateGenerateListeners.size === 0 || lastReady?.features?.lateGenerateResults !== true)
        return;
      post({ channel: OPENCHAMBER_SDK_CHANNEL, v: OPENCHAMBER_SDK_API_VERSION, type: "generate-late-listen" });
    };
    const emit = (listeners, value) => {
      for (const listener of listeners) {
        try {
          listener(value);
        } catch (error) {
          console.error(error);
        }
      }
    };
    const onMessage = (event) => {
      if (!(event instanceof MessageEvent))
        return;
      if (!acceptSource(event.source))
        return;
      const message = readHostMessage(event.data);
      if (!message)
        return;
      if (message.type === "workspace") {
        const listener = workspaceListeners.get(message.payload.subscriptionId);
        if (listener)
          emit([listener], message.payload.snapshot);
        return;
      }
      if (message.type === "shells") {
        const listener = shellsListeners.get(message.payload.subscriptionId);
        if (listener)
          emit([listener], message.payload.snapshot);
        return;
      }
      if (message.type === "ready") {
        lastReady = message.payload;
        lastLifecycle = lifecycleFromSession(message.payload.session);
        emit(readyListeners, message.payload);
        emit(directoryListeners, message.payload.directory);
        emit(sessionListeners, message.payload.session);
        if (lastLifecycle) {
          emit(lifecycleListeners, lastLifecycle);
        }
        emit(connectionListeners, message.payload.connection);
        emit(settingsListeners, message.payload.settings);
        emit(itemListeners, message.payload.item);
        listenForLateGenerate();
        return;
      }
      if (message.type === "generate-late") {
        if (lateGenerateListeners.size === 0)
          unclaimedLateGenerate.push(message.payload);
        else
          emit(lateGenerateListeners, message.payload);
        return;
      }
      if (message.type === "directory") {
        if (lastReady) {
          lastReady = { ...lastReady, directory: message.payload.directory };
        }
        emit(directoryListeners, message.payload.directory);
        return;
      }
      if (message.type === "session") {
        if (lastReady) {
          lastReady = { ...lastReady, session: message.payload.session };
        }
        if (!message.payload.session) {
          lastLifecycle = null;
        } else if (lastLifecycle?.sessionId !== message.payload.session.id) {
          lastLifecycle = lifecycleFromSession(message.payload.session);
        }
        emit(sessionListeners, message.payload.session);
        return;
      }
      if (message.type === "session-lifecycle") {
        lastLifecycle = message.payload;
        emit(lifecycleListeners, message.payload);
        return;
      }
      if (message.type === "connection") {
        if (lastReady) {
          lastReady = { ...lastReady, connection: message.payload.connection };
        }
        emit(connectionListeners, message.payload.connection);
        return;
      }
      if (message.type === "settings") {
        if (lastReady) {
          lastReady = { ...lastReady, settings: message.payload.settings };
        }
        emit(settingsListeners, message.payload.settings);
        return;
      }
      if (message.type === "item") {
        if (lastReady) {
          lastReady = { ...lastReady, item: message.payload.item };
        }
        emit(itemListeners, message.payload.item);
        return;
      }
      if (message.type === "status-control-event") {
        emit(statusControlListeners, message.payload);
        return;
      }
      if (message.type === "popover-closed") {
        emit(popoverClosedListeners, message.payload);
        return;
      }
      if (message.type === "action") {
        const answer = (payload) => {
          if (!disposed)
            post({
              channel: OPENCHAMBER_SDK_CHANNEL,
              v: OPENCHAMBER_SDK_API_VERSION,
              type: "action-result",
              id: message.id,
              payload
            });
        };
        const handler = actionHandler;
        if (!handler) {
          answer({ ok: false, error: "This extension does not handle background actions." });
          return;
        }
        Promise.resolve().then(() => handler(message.payload)).then(() => answer({ ok: true }), (error) => {
          const text = (error instanceof Error ? error.message : String(error)).trim();
          answer({ ok: false, error: (text || "Action failed.").slice(0, GUEST_RESOLVE_ERROR_MAX) });
        });
        return;
      }
      if (message.type === "file-open") {
        const next = message.payload;
        if (lastFile && sameFileEditorDocument(lastFile, next))
          return;
        lastFile = next;
        emit(fileOpenListeners, message.payload);
        return;
      }
      if (message.type === "file-saved") {
        emit(fileSavedListeners, message.payload.version);
        return;
      }
      if (message.type === "file-snapshot") {
        const answer = (payload) => {
          if (!disposed)
            post({
              channel: OPENCHAMBER_SDK_CHANNEL,
              v: OPENCHAMBER_SDK_API_VERSION,
              type: "file-snapshot-result",
              id: message.id,
              payload
            });
        };
        const fail = (text) => answer({ error: (text.trim() || "Could not read the edited file.").slice(0, GUEST_RESOLVE_ERROR_MAX) });
        const handler = fileSnapshotHandler;
        if (!handler) {
          fail("This extension does not edit files.");
          return;
        }
        Promise.resolve().then(() => handler(message.payload.purpose)).then((snapshot) => {
          if (fileEditorPayloadSize(snapshot) > GUEST_FILE_EDITOR_CONTENT_MAX) {
            fail(`The file is over ${GUEST_FILE_EDITOR_CONTENT_MAX} ${"bytes" in snapshot ? "bytes" : "characters"}.`);
            return;
          }
          if (snapshot.version.length > GUEST_FILE_EDITOR_VERSION_MAX) {
            fail(`The snapshot version is over ${GUEST_FILE_EDITOR_VERSION_MAX} characters.`);
            return;
          }
          answer({ snapshot: "bytes" in snapshot ? { bytes: snapshot.bytes, version: snapshot.version } : { content: snapshot.content, version: snapshot.version } });
        }, (error) => fail(error instanceof Error ? error.message : String(error)));
        return;
      }
      if (message.type === "resolve") {
        const answer = (payload) => {
          post({
            channel: OPENCHAMBER_SDK_CHANNEL,
            v: OPENCHAMBER_SDK_API_VERSION,
            type: "resolve-result",
            id: message.id,
            payload
          });
        };
        const handler = resolveHandler;
        if (!handler) {
          answer({ error: "This extension does not resolve commands." });
          return;
        }
        Promise.resolve().then(() => handler(message.payload)).then((item) => answer({ item: item ? clampAttachRequest(item) : null }), (error) => {
          const text = (error instanceof Error ? error.message : String(error)).trim();
          answer({ error: (text || "Command failed.").slice(0, GUEST_RESOLVE_ERROR_MAX) });
        });
        return;
      }
      const waiter = pending.get(message.id);
      if (!waiter)
        return;
      clearTimeout(waiter.timer);
      pending.delete(message.id);
      if (message.ok) {
        waiter.resolve(message.payload);
        return;
      }
      waiter.reject(new HostRequestError(message.code, message.error));
    };
    target.addEventListener("message", onMessage);
    post({
      channel: OPENCHAMBER_SDK_CHANNEL,
      v: OPENCHAMBER_SDK_API_VERSION,
      type: "hello"
    });
    const send = (message, timeoutMs = requestTimeoutMs) => {
      if (disposed || target.parent === target) {
        return Promise.reject(new HostRequestError("HOST_UNAVAILABLE", "No host frame. This page is not in an iframe."));
      }
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          pending.delete(message.id);
          reject(new HostRequestError("HOST_TIMEOUT", "Host did not answer in time."));
        }, timeoutMs);
        pending.set(message.id, { resolve, reject, timer });
        post(message);
      });
    };
    const request = (message) => send(message).then(() => {
      return;
    });
    const envelope = { channel: OPENCHAMBER_SDK_CHANNEL, v: OPENCHAMBER_SDK_API_VERSION };
    const notify = (message) => {
      if (!disposed && target.parent !== target)
        post(message);
    };
    const requestFileSave = () => notify({ ...envelope, type: "file-save" });
    const onSaveShortcut = (event) => {
      if (!isKeyEvent(event) || !isSaveShortcut(event))
        return;
      event.preventDefault();
      requestFileSave();
    };
    const onPopoverEscape = (event) => {
      if (!isKeyEvent(event) || event.key !== "Escape" || lastReady?.surface !== "popover" || !lastReady.popover)
        return;
      event.preventDefault();
      closePopover(lastReady.popover.id, "escape").catch(() => {
        return;
      });
    };
    const reportPopoverActivity = () => {
      const popover = lastReady?.surface === "popover" ? lastReady.popover : undefined;
      if (!popover)
        return;
      const active = popoverPointerActive || popoverFocusActive;
      if (popoverActivityReported === active)
        return;
      popoverActivityReported = active;
      setPopoverAnchorActive(popover.id, active).catch(() => {
        return;
      });
    };
    const onPopoverPointerOver = () => {
      if (lastReady?.surface !== "popover" || popoverPointerActive)
        return;
      popoverPointerActive = true;
      reportPopoverActivity();
    };
    const onPopoverPointerOut = (event) => {
      if (lastReady?.surface !== "popover" || event.relatedTarget !== null || !popoverPointerActive)
        return;
      popoverPointerActive = false;
      reportPopoverActivity();
    };
    const onPopoverFocus = () => {
      if (lastReady?.surface !== "popover" || popoverFocusActive)
        return;
      popoverFocusActive = true;
      reportPopoverActivity();
    };
    const onPopoverBlur = () => {
      if (lastReady?.surface !== "popover" || !popoverFocusActive)
        return;
      popoverFocusActive = false;
      reportPopoverActivity();
    };
    const requireIdentity = (value, maximum = 1024) => {
      if (!value.trim() || value.length > maximum)
        throw new HostRequestError("HOST_REJECTED", `Identity must contain 1 to ${maximum} characters.`);
    };
    const readWorkspace = async (query) => {
      if (query.kind !== "projects")
        requireIdentity(query.projectId);
      const result = await send({ ...envelope, type: "workspace-read", id: nextId(ids), payload: query });
      if (!result || !("kind" in result) || !("state" in result) || result.kind !== query.kind) {
        throw new HostRequestError("HOST_REJECTED", "Host did not return workspace data.");
      }
      return result;
    };
    const subscribeWorkspace = async (query, listener) => {
      if (query.kind !== "projects")
        requireIdentity(query.projectId);
      const subscriptionId = nextId(ids);
      workspaceListeners.set(subscriptionId, listener);
      try {
        await request({ ...envelope, type: "workspace-subscribe", id: nextId(ids), payload: { subscriptionId, query } });
      } catch (error) {
        workspaceListeners.delete(subscriptionId);
        if (!disposed)
          post({ ...envelope, type: "workspace-unsubscribe", id: nextId(ids), payload: { subscriptionId } });
        throw error;
      }
      return () => {
        if (!workspaceListeners.delete(subscriptionId) || disposed)
          return;
        post({ ...envelope, type: "workspace-unsubscribe", id: nextId(ids), payload: { subscriptionId } });
      };
    };
    const subscribeShells = async (scope, listener) => {
      if (scope.kind === "session")
        requireIdentity(scope.sessionId);
      if (scope.kind === "project")
        requireIdentity(scope.projectId);
      const subscriptionId = nextId(ids);
      shellsListeners.set(subscriptionId, listener);
      try {
        await request({ ...envelope, type: "shells-subscribe", id: nextId(ids), payload: { subscriptionId, scope } });
      } catch (error) {
        shellsListeners.delete(subscriptionId);
        if (!disposed)
          post({ ...envelope, type: "shells-unsubscribe", id: nextId(ids), payload: { subscriptionId } });
        throw error;
      }
      return () => {
        if (!shellsListeners.delete(subscriptionId) || disposed)
          return;
        post({ ...envelope, type: "shells-unsubscribe", id: nextId(ids), payload: { subscriptionId } });
      };
    };
    const storage = async (payload) => {
      if ("key" in payload && (payload.key.length === 0 || payload.key.length > GUEST_STORAGE_KEY_MAX)) {
        throw new HostRequestError("HOST_REJECTED", "Storage key must contain 1 to 128 characters.");
      }
      if (payload.op === "set" && !isJsonValue(payload.value)) {
        throw new HostRequestError("HOST_REJECTED", "Storage values must be JSON.");
      }
      if (payload.op === "set" && new TextEncoder().encode(JSON.stringify(payload.value)).length > GUEST_STORAGE_VALUE_BYTES) {
        throw new HostRequestError("HOST_REJECTED", "Storage value exceeds 64 KiB.");
      }
      if (payload.scope === "device" && lastReady?.features?.deviceStorage !== true) {
        throw new HostRequestError("UNSUPPORTED", "This host does not support device storage.");
      }
      const result = await send({ ...envelope, type: "storage", id: nextId(ids), payload });
      if (!result || !("storage" in result) || result.op !== payload.op)
        throw new HostRequestError("HOST_REJECTED", "Host did not return storage data.");
      return result;
    };
    const closePopover = (id, reason) => lastReady?.features?.popovers !== true && !(lastReady?.surface === "popover" && lastReady.popover?.id === id) ? Promise.reject(new HostRequestError("UNSUPPORTED", "This host does not support popovers.")) : request({ ...envelope, type: "popover-close", id: nextId(ids), payload: reason ? { id, reason } : { id } });
    const setPopoverAnchorActive = (id, active) => lastReady?.features?.popovers !== true && !(lastReady?.surface === "popover" && lastReady.popover?.id === id) ? Promise.reject(new HostRequestError("UNSUPPORTED", "This host does not support popovers.")) : request({ ...envelope, type: "popover-anchor", id: nextId(ids), payload: { id, active } });
    target.addEventListener("keydown", onPopoverEscape, true);
    target.addEventListener("pointerover", onPopoverPointerOver);
    target.addEventListener("pointermove", onPopoverPointerOver);
    target.addEventListener("pointerout", onPopoverPointerOut);
    target.addEventListener("focus", onPopoverFocus);
    target.addEventListener("blur", onPopoverBlur);
    return {
      onAction: (handler) => {
        actionHandler = handler;
        return () => {
          if (actionHandler === handler)
            actionHandler = null;
        };
      },
      listProjects: async () => {
        const result = await readWorkspace({ kind: "projects" });
        if (result.kind !== "projects")
          throw new HostRequestError("HOST_REJECTED", "Expected projects.");
        return result;
      },
      listWorktrees: async (projectId) => {
        const result = await readWorkspace({ kind: "worktrees", projectId });
        if (result.kind !== "worktrees")
          throw new HostRequestError("HOST_REJECTED", "Expected worktrees.");
        return result;
      },
      listSessions: async (projectId) => {
        const result = await readWorkspace({ kind: "sessions", projectId });
        if (result.kind !== "sessions")
          throw new HostRequestError("HOST_REJECTED", "Expected sessions.");
        return result;
      },
      onProjects: (listener) => subscribeWorkspace({ kind: "projects" }, (snapshot) => {
        if (snapshot.kind === "projects")
          listener(snapshot);
      }),
      onWorktrees: (projectId, listener) => subscribeWorkspace({ kind: "worktrees", projectId }, (snapshot) => {
        if (snapshot.kind === "worktrees")
          listener(snapshot);
      }),
      onSessions: (projectId, listener) => subscribeWorkspace({ kind: "sessions", projectId }, (snapshot) => {
        if (snapshot.kind === "sessions")
          listener(snapshot);
      }),
      onRunningShells: (scope, listener) => subscribeShells(scope, listener),
      readShellOutput: async (shellId, options) => {
        requireIdentity(shellId, GUEST_SHELL_ID_MAX);
        const cursor = options?.cursor;
        if (cursor !== undefined && (!Number.isInteger(cursor) || cursor < 0)) {
          throw new HostRequestError("HOST_REJECTED", "Shell output cursor must be a non-negative integer.");
        }
        const tailBytes = options?.tailBytes;
        if (tailBytes !== undefined && (!Number.isInteger(tailBytes) || tailBytes < 1 || tailBytes > GUEST_SHELL_OUTPUT_TAIL_MAX)) {
          throw new HostRequestError("HOST_REJECTED", `Shell output tailBytes must be an integer between 1 and ${GUEST_SHELL_OUTPUT_TAIL_MAX}.`);
        }
        const result = await send({ ...envelope, type: "shell-output", id: nextId(ids), payload: { shellId, cursor, tailBytes } });
        const output = result;
        if (!output || typeof output.output !== "string" || !Number.isFinite(output.cursor)) {
          throw new HostRequestError("HOST_REJECTED", "Host did not return shell output.");
        }
        return output;
      },
      stopShell: async (shellId) => {
        requireIdentity(shellId, GUEST_SHELL_ID_MAX);
        const result = await send({ ...envelope, type: "shell-stop", id: nextId(ids), payload: { shellId } });
        if (result?.stopped !== true)
          throw new HostRequestError("HOST_REJECTED", "Host did not stop the shell.");
        return { stopped: true };
      },
      openSession: async (sessionId) => {
        requireIdentity(sessionId);
        await request({ ...envelope, type: "open-session", id: nextId(ids), payload: { sessionId } });
      },
      storage: {
        get: async (key, options) => {
          const scope = deviceStorageScope(options);
          const payload = { op: "get", key };
          if (scope)
            payload.scope = scope;
          const result = await storage(payload);
          return result.op === "get" && result.found ? result.value : undefined;
        },
        set: async (key, value, options) => {
          const scope = deviceStorageScope(options);
          const payload = { op: "set", key, value };
          if (scope)
            payload.scope = scope;
          await storage(payload);
        },
        delete: async (key, options) => {
          const scope = deviceStorageScope(options);
          const payload = { op: "delete", key };
          if (scope)
            payload.scope = scope;
          await storage(payload);
        },
        keys: async (options) => {
          const scope = deviceStorageScope(options);
          const payload = { op: "keys" };
          if (scope)
            payload.scope = scope;
          const result = await storage(payload);
          if (result.op !== "keys")
            throw new HostRequestError("HOST_REJECTED", "Expected storage keys.");
          return result.keys;
        }
      },
      onReady: (listener) => {
        readyListeners.add(listener);
        if (lastReady)
          listener(lastReady);
        return () => {
          readyListeners.delete(listener);
        };
      },
      onDirectory: (listener) => {
        directoryListeners.add(listener);
        if (lastReady)
          listener(lastReady.directory);
        return () => {
          directoryListeners.delete(listener);
        };
      },
      onSession: (listener) => {
        sessionListeners.add(listener);
        if (lastReady)
          listener(lastReady.session);
        return () => {
          sessionListeners.delete(listener);
        };
      },
      onSessionLifecycle: (listener) => {
        lifecycleListeners.add(listener);
        if (lastLifecycle)
          listener(lastLifecycle);
        return () => {
          lifecycleListeners.delete(listener);
        };
      },
      onConnection: (listener) => {
        connectionListeners.add(listener);
        if (lastReady)
          listener(lastReady.connection);
        return () => {
          connectionListeners.delete(listener);
        };
      },
      onSettings: (listener) => {
        settingsListeners.add(listener);
        if (lastReady)
          listener(lastReady.settings);
        return () => {
          settingsListeners.delete(listener);
        };
      },
      onItem: (listener) => {
        itemListeners.add(listener);
        if (lastReady)
          listener(lastReady.item);
        return () => {
          itemListeners.delete(listener);
        };
      },
      onStatusControl: (listener) => {
        statusControlListeners.add(listener);
        return () => {
          statusControlListeners.delete(listener);
        };
      },
      onPopoverClosed: (listener) => {
        popoverClosedListeners.add(listener);
        return () => {
          popoverClosedListeners.delete(listener);
        };
      },
      setStatusControls: (controls) => {
        if (lastReady?.features?.statusControls !== true) {
          return Promise.reject(new HostRequestError("UNSUPPORTED", "This host does not support status controls."));
        }
        if (!isGuestStatusControls(controls)) {
          return Promise.reject(new HostRequestError("HOST_REJECTED", "Status controls must have unique bounded ids and valid selected options."));
        }
        return request({ ...envelope, type: "status-controls", id: nextId(ids), payload: { controls } });
      },
      openPopover: (payload) => {
        if (lastReady?.features?.popovers !== true) {
          return Promise.reject(new HostRequestError("UNSUPPORTED", "This host does not support popovers."));
        }
        if (!isGuestPopoverRequest(payload)) {
          return Promise.reject(new HostRequestError("HOST_REJECTED", "Popover requests need bounded geometry and JSON data."));
        }
        return request({ ...envelope, type: "popover-open", id: nextId(ids), payload });
      },
      closePopover,
      setPopoverAnchorActive,
      onResolve: (handler) => {
        resolveHandler = handler;
        return () => {
          if (resolveHandler === handler)
            resolveHandler = null;
        };
      },
      toast: (payload) => {
        const message = payload.message.trim();
        if (!message || message.length > GUEST_TOAST_MAX) {
          return Promise.reject(new HostRequestError("HOST_REJECTED", `Toast message must contain 1 to ${GUEST_TOAST_MAX} characters.`));
        }
        if (payload.copy && payload.copy !== true && (!payload.copy.text.length || payload.copy.text.length > GUEST_CLIPBOARD_TEXT_MAX)) {
          return Promise.reject(new HostRequestError("HOST_REJECTED", `Toast copy text must contain 1 to ${GUEST_CLIPBOARD_TEXT_MAX} characters.`));
        }
        return request({
          channel: OPENCHAMBER_SDK_CHANNEL,
          v: OPENCHAMBER_SDK_API_VERSION,
          type: "toast",
          id: nextId(ids),
          payload: { ...payload, message }
        });
      },
      openUrl: (url) => request({
        channel: OPENCHAMBER_SDK_CHANNEL,
        v: OPENCHAMBER_SDK_API_VERSION,
        type: "open-url",
        id: nextId(ids),
        payload: { url }
      }),
      openCommit: (sha) => isGuestCommitSha(sha) ? request({
        channel: OPENCHAMBER_SDK_CHANNEL,
        v: OPENCHAMBER_SDK_API_VERSION,
        type: "open-commit",
        id: nextId(ids),
        payload: { sha }
      }) : Promise.reject(new HostRequestError("HOST_REJECTED", "Commit id must be 7 to 64 hex characters.")),
      openSurface: (surfaceId) => request({
        channel: OPENCHAMBER_SDK_CHANNEL,
        v: OPENCHAMBER_SDK_API_VERSION,
        type: "open-surface",
        id: nextId(ids),
        payload: { surfaceId }
      }),
      writeClipboard: (text) => request({
        channel: OPENCHAMBER_SDK_CHANNEL,
        v: OPENCHAMBER_SDK_API_VERSION,
        type: "clipboard-write",
        id: nextId(ids),
        payload: { text }
      }),
      compose: (payload) => request({
        channel: OPENCHAMBER_SDK_CHANNEL,
        v: OPENCHAMBER_SDK_API_VERSION,
        type: "compose",
        id: nextId(ids),
        payload
      }),
      attach: (payload) => request({
        channel: OPENCHAMBER_SDK_CHANNEL,
        v: OPENCHAMBER_SDK_API_VERSION,
        type: "attach",
        id: nextId(ids),
        payload: clampAttachRequest(payload)
      }),
      startSession: async (payload) => {
        if (payload.projectId !== undefined)
          requireIdentity(payload.projectId);
        const worktree = payload.worktree;
        if (worktree && worktree !== true) {
          if (worktree.kind === "existing")
            requireIdentity(worktree.directory);
          else {
            if (worktree.name !== undefined)
              requireIdentity(worktree.name, 200);
            if (worktree.baseBranch !== undefined)
              requireIdentity(worktree.baseBranch, 200);
          }
        }
        const result = await send({
          channel: OPENCHAMBER_SDK_CHANNEL,
          v: OPENCHAMBER_SDK_API_VERSION,
          type: "start-session",
          id: nextId(ids),
          payload: clampStartSessionRequest(payload)
        }, options.requestTimeoutMs ?? 180000);
        if (!isStartSessionResult(result)) {
          throw new HostRequestError("HOST_REJECTED", "Host did not return a session.");
        }
        return result;
      },
      prompt: (payload) => send({
        channel: OPENCHAMBER_SDK_CHANNEL,
        v: OPENCHAMBER_SDK_API_VERSION,
        type: "prompt",
        id: nextId(ids),
        payload: clampPromptRequest(payload)
      }).then((result) => {
        if (!isPromptResult(result)) {
          throw new HostRequestError("HOST_REJECTED", "Host did not return a prompt result.");
        }
        return result;
      }),
      sessionLink: (payload) => request({
        channel: OPENCHAMBER_SDK_CHANNEL,
        v: OPENCHAMBER_SDK_API_VERSION,
        type: "session-link",
        id: nextId(ids),
        payload: clampAttachRequest(payload)
      }),
      close: () => request({
        channel: OPENCHAMBER_SDK_CHANNEL,
        v: OPENCHAMBER_SDK_API_VERSION,
        type: "close",
        id: nextId(ids)
      }),
      oauthStart: () => request({
        channel: OPENCHAMBER_SDK_CHANNEL,
        v: OPENCHAMBER_SDK_API_VERSION,
        type: "oauth-start",
        id: nextId(ids)
      }),
      oauthDisconnect: () => request({
        channel: OPENCHAMBER_SDK_CHANNEL,
        v: OPENCHAMBER_SDK_API_VERSION,
        type: "oauth-disconnect",
        id: nextId(ids)
      }),
      request: (payload) => (isGuestRequestPath(payload.path) ? send({
        channel: OPENCHAMBER_SDK_CHANNEL,
        v: OPENCHAMBER_SDK_API_VERSION,
        type: "request",
        id: nextId(ids),
        payload
      }) : rejectBadPath()).then((result) => {
        if (!isGuestRequestResult(result)) {
          throw new HostRequestError("HOST_REJECTED", "Host request result was empty.");
        }
        return result;
      }),
      serviceRequest: (payload) => (isGuestRequestPath(payload.path) ? send({
        channel: OPENCHAMBER_SDK_CHANNEL,
        v: OPENCHAMBER_SDK_API_VERSION,
        type: "service-request",
        id: nextId(ids),
        payload
      }) : rejectBadPath()).then((result) => {
        if (!isGuestRequestResult(result)) {
          throw new HostRequestError("HOST_REJECTED", "Host service request result was empty.");
        }
        return result;
      }),
      serviceStatus: () => send({
        channel: OPENCHAMBER_SDK_CHANNEL,
        v: OPENCHAMBER_SDK_API_VERSION,
        type: "service-status",
        id: nextId(ids)
      }).then((result) => {
        if (!isServiceStatusResult(result)) {
          throw new HostRequestError("HOST_REJECTED", "Host did not return service status.");
        }
        return result;
      }),
      readFile: (path) => (isGuestFilePath(path) ? send({
        channel: OPENCHAMBER_SDK_CHANNEL,
        v: OPENCHAMBER_SDK_API_VERSION,
        type: "file-read",
        id: nextId(ids),
        payload: { path }
      }) : rejectBadFilePath()).then((result) => {
        if (!isFileReadResult(result)) {
          throw new HostRequestError("HOST_REJECTED", "Host did not return file content.");
        }
        return result;
      }),
      writeFile: (path, content) => {
        if (!isGuestFilePath(path)) {
          return rejectBadFilePath();
        }
        if (content.length > GUEST_FILE_CONTENT_MAX) {
          return Promise.reject(new HostRequestError("FILE_TOO_LARGE", `Content is over ${GUEST_FILE_CONTENT_MAX} characters.`));
        }
        return send({
          channel: OPENCHAMBER_SDK_CHANNEL,
          v: OPENCHAMBER_SDK_API_VERSION,
          type: "file-write",
          id: nextId(ids),
          payload: { path, content }
        }).then((result) => {
          if (!isFileWriteResult(result)) {
            throw new HostRequestError("HOST_REJECTED", "Host did not confirm the write.");
          }
          return result;
        });
      },
      listDir: (path) => (isGuestFilePath(path) ? send({
        channel: OPENCHAMBER_SDK_CHANNEL,
        v: OPENCHAMBER_SDK_API_VERSION,
        type: "file-list",
        id: nextId(ids),
        payload: { path }
      }) : rejectBadFilePath()).then((result) => {
        if (!isFileListResult(result)) {
          throw new HostRequestError("HOST_REJECTED", "Host did not return directory entries.");
        }
        return result;
      }),
      stat: (path) => (isGuestFilePath(path) ? send({
        channel: OPENCHAMBER_SDK_CHANNEL,
        v: OPENCHAMBER_SDK_API_VERSION,
        type: "file-stat",
        id: nextId(ids),
        payload: { path }
      }) : rejectBadFilePath()).then((result) => {
        if (!isFileStatResult(result)) {
          throw new HostRequestError("HOST_REJECTED", "Host did not return file status.");
        }
        return result;
      }),
      generate: (input) => {
        const prompt = input.prompt.trim();
        const system = input.system?.trim();
        if (prompt.length === 0 || prompt.length > GUEST_GENERATE_PROMPT_MAX) {
          return Promise.reject(new HostRequestError("HOST_REJECTED", `Prompt must be 1 to ${GUEST_GENERATE_PROMPT_MAX} characters.`));
        }
        if (system !== undefined && (system.length === 0 || system.length > GUEST_GENERATE_SYSTEM_MAX)) {
          return Promise.reject(new HostRequestError("HOST_REJECTED", `System prompt must be 1 to ${GUEST_GENERATE_SYSTEM_MAX} characters.`));
        }
        const maxOutputTokens = input.maxOutputTokens === undefined ? undefined : Math.min(GUEST_GENERATE_OUTPUT_TOKENS_MAX, Math.max(1, Math.floor(input.maxOutputTokens)));
        if (maxOutputTokens !== undefined && !Number.isFinite(maxOutputTokens)) {
          return Promise.reject(new HostRequestError("HOST_REJECTED", "maxOutputTokens must be a number."));
        }
        const payload = { prompt };
        if (system !== undefined)
          payload.system = system;
        if (maxOutputTokens !== undefined)
          payload.maxOutputTokens = maxOutputTokens;
        return send({
          channel: OPENCHAMBER_SDK_CHANNEL,
          v: OPENCHAMBER_SDK_API_VERSION,
          type: "generate",
          id: nextId(ids),
          payload
        }, options.requestTimeoutMs ?? GUEST_GENERATE_TIMEOUT_MS).then((result) => {
          if (!isGenerateResult(result)) {
            throw new HostRequestError("HOST_REJECTED", "Host did not return generated text.");
          }
          return result;
        });
      },
      onLateGenerateResult: (listener) => {
        lateGenerateListeners.add(listener);
        for (const result of unclaimedLateGenerate.splice(0))
          emit([listener], result);
        listenForLateGenerate();
        return () => {
          lateGenerateListeners.delete(listener);
        };
      },
      setBadge: (count) => request({
        channel: OPENCHAMBER_SDK_CHANNEL,
        v: OPENCHAMBER_SDK_API_VERSION,
        type: "badge",
        id: nextId(ids),
        payload: { count: clampBadgeCount(count) }
      }),
      setHeight: (height) => request({
        channel: OPENCHAMBER_SDK_CHANNEL,
        v: OPENCHAMBER_SDK_API_VERSION,
        type: "resize",
        id: nextId(ids),
        payload: { height: clampFrameHeight(height) }
      }),
      onFileOpen: (listener) => {
        fileOpenListeners.add(listener);
        if (!saveShortcutInstalled) {
          saveShortcutInstalled = true;
          target.addEventListener("keydown", onSaveShortcut, true);
        }
        if (lastFile)
          listener(lastFile);
        return () => {
          fileOpenListeners.delete(listener);
        };
      },
      onFileSnapshot: (handler) => {
        fileSnapshotHandler = handler;
        return () => {
          if (fileSnapshotHandler === handler)
            fileSnapshotHandler = null;
        };
      },
      onFileSaved: (listener) => {
        fileSavedListeners.add(listener);
        return () => {
          fileSavedListeners.delete(listener);
        };
      },
      reportFileChange: (change) => notify({ ...envelope, type: "file-change", payload: { dirty: change.dirty, edited: change.edited } }),
      requestFileSave,
      reportFileUnsupported: () => notify({ ...envelope, type: "file-unsupported" }),
      dispose: () => {
        for (const subscriptionId of workspaceListeners.keys()) {
          post({ ...envelope, type: "workspace-unsubscribe", id: nextId(ids), payload: { subscriptionId } });
        }
        workspaceListeners.clear();
        for (const subscriptionId of shellsListeners.keys()) {
          post({ ...envelope, type: "shells-unsubscribe", id: nextId(ids), payload: { subscriptionId } });
        }
        shellsListeners.clear();
        disposed = true;
        resolveHandler = null;
        actionHandler = null;
        fileSnapshotHandler = null;
        fileOpenListeners.clear();
        fileSavedListeners.clear();
        if (saveShortcutInstalled)
          target.removeEventListener("keydown", onSaveShortcut, true);
        target.removeEventListener("message", onMessage);
        target.removeEventListener("keydown", onPopoverEscape, true);
        target.removeEventListener("pointerover", onPopoverPointerOver);
        target.removeEventListener("pointermove", onPopoverPointerOver);
        target.removeEventListener("pointerout", onPopoverPointerOut);
        target.removeEventListener("focus", onPopoverFocus);
        target.removeEventListener("blur", onPopoverBlur);
        for (const waiter of pending.values()) {
          clearTimeout(waiter.timer);
          waiter.reject(new HostRequestError("HOST_UNAVAILABLE", "Host client was disposed."));
        }
        pending.clear();
        readyListeners.clear();
        directoryListeners.clear();
        sessionListeners.clear();
        lifecycleListeners.clear();
        connectionListeners.clear();
        settingsListeners.clear();
        itemListeners.clear();
        statusControlListeners.clear();
        popoverClosedListeners.clear();
        lateGenerateListeners.clear();
        unclaimedLateGenerate.length = 0;
      }
    };
  };
  // node_modules/@openchamber/sdk/dist/service-providers.js
  var BROWSER_CONTROL_ACTIONS = [
    "browser.open",
    "browser.snapshot",
    "browser.click",
    "browser.type",
    "browser.scroll",
    "browser.back",
    "browser.forward",
    "browser.inspect",
    "browser.capture",
    "browser.resize",
    "browser.close"
  ];
  var BROWSER_PROVIDER_IDLE_MS = 10 * 60000;
  var CONTROL_ACTIONS = new Set(BROWSER_CONTROL_ACTIONS);
  // node_modules/@openchamber/sdk/dist/service-surface.js
  var SURFACE_CONTROLLERS = ["none", "agent", "user"];
  var CONTROLLERS = new Set(SURFACE_CONTROLLERS);
  // src/App.tsx
  var import_react4 = __toESM(require_react(), 1);

  // node_modules/@openchamber/sdk/dist/ui/theme.js
  var TOKEN_VARS = [
    ["--oc-bg", "background"],
    ["--oc-elevated", "elevated"],
    ["--oc-fg", "foreground"],
    ["--oc-muted", "muted"],
    ["--oc-subtle", "subtle"],
    ["--oc-border", "border"],
    ["--oc-hover", "hover"],
    ["--oc-selection", "selection"],
    ["--oc-focus", "focus"],
    ["--oc-primary", "primary"],
    ["--oc-muted-surface", "mutedSurface"],
    ["--oc-elevated-fg", "elevatedForeground"],
    ["--oc-active", "active"],
    ["--oc-selection-fg", "selectionForeground"],
    ["--oc-primary-fg", "primaryForeground"],
    ["--oc-primary-text", "primaryText"],
    ["--oc-success-text", "successText"],
    ["--oc-warning-text", "warningText"],
    ["--oc-error-text", "errorText"],
    ["--oc-info-text", "infoText"],
    ["--oc-success", "success"],
    ["--oc-warning", "warning"],
    ["--oc-error", "error"],
    ["--oc-info", "info"],
    ["--oc-font", "font"],
    ["--oc-mono", "mono"],
    ["--oc-radius", "radius"],
    ["--surface-background", "background"],
    ["--surface-elevated", "elevated"],
    ["--surface-foreground", "foreground"],
    ["--surface-muted-foreground", "muted"],
    ["--surface-subtle", "subtle"],
    ["--interactive-border", "border"],
    ["--interactive-hover", "hover"],
    ["--interactive-selection", "selection"],
    ["--interactive-focus-ring", "focus"],
    ["--primary", "primary"],
    ["--surface-muted", "mutedSurface"],
    ["--surface-elevated-foreground", "elevatedForeground"],
    ["--interactive-active", "active"],
    ["--interactive-selection-foreground", "selectionForeground"],
    ["--primary-foreground", "primaryForeground"],
    ["--primary-text", "primaryText"],
    ["--success-text", "successText"],
    ["--warning-text", "warningText"],
    ["--error-text", "errorText"],
    ["--info-text", "infoText"],
    ["--status-success", "success"],
    ["--status-warning", "warning"],
    ["--status-error", "error"],
    ["--status-info", "info"],
    ["--font-sans", "font"],
    ["--font-mono", "mono"],
    ["--radius", "radius"]
  ];
  var SYNTAX_TOKEN_VARS = [
    ["--oc-syntax-keyword", "--syntax-keyword", "syntaxKeyword"],
    ["--oc-syntax-string", "--syntax-string", "syntaxString"],
    ["--oc-syntax-number", "--syntax-number", "syntaxNumber"],
    ["--oc-syntax-function", "--syntax-function", "syntaxFunction"],
    ["--oc-syntax-type", "--syntax-type", "syntaxType"],
    ["--oc-syntax-comment", "--syntax-comment", "syntaxComment"],
    ["--oc-syntax-variable", "--syntax-variable", "syntaxVariable"],
    ["--oc-syntax-operator", "--syntax-operator", "syntaxOperator"]
  ];
  var applyHostTheme = (theme, root) => {
    root.style.colorScheme = theme.mode;
    for (const [name, key] of TOKEN_VARS) {
      root.style.setProperty(name, theme.tokens[key]);
    }
    for (const [alias, hostName, key] of SYNTAX_TOKEN_VARS) {
      const value = theme.tokens[key] ?? "";
      root.style.setProperty(alias, value);
      root.style.setProperty(hostName, value);
    }
    root.style.setProperty("font-family", theme.tokens.font);
    root.style.setProperty("font-size", "0.875rem");
    root.style.setProperty("line-height", "1.45");
    root.style.setProperty("color", theme.tokens.foreground);
  };
  var applyHostReady = (ctx, root) => {
    applyHostTheme(ctx.theme, root);
    if (root.dataset) {
      root.dataset.ocSurface = ctx.surface;
      root.dataset.ocTheme = ctx.theme.mode;
    }
  };
  // node_modules/@openchamber/sdk/dist/ui/style.js
  var OC_ALIAS = {
    "surface-background": "bg",
    "surface-elevated": "elevated",
    "surface-elevated-foreground": "elevated-fg",
    "surface-foreground": "fg",
    "surface-muted-foreground": "muted",
    "surface-muted": "muted-surface",
    "surface-subtle": "subtle",
    "interactive-border": "border",
    "interactive-hover": "hover",
    "interactive-active": "active",
    "interactive-selection": "selection",
    "interactive-selection-foreground": "selection-fg",
    "interactive-focus-ring": "focus",
    primary: "primary",
    "primary-foreground": "primary-fg",
    "primary-text": "primary-text",
    "success-text": "success-text",
    "warning-text": "warning-text",
    "error-text": "error-text",
    "info-text": "info-text",
    "status-success": "success",
    "status-warning": "warning",
    "status-error": "error",
    "status-info": "info",
    "font-sans": "font",
    "font-mono": "mono",
    radius: "radius"
  };
  var v = (name, fallback) => `var(--${name}, var(--oc-${OC_ALIAS[name]}, ${fallback}))`;
  var bg = v("surface-background", "transparent");
  var elevated = v("surface-elevated", "transparent");
  var elevatedFg = v("surface-elevated-foreground", "inherit");
  var fg = v("surface-foreground", "inherit");
  var muted = v("surface-muted-foreground", "gray");
  var secondary = v("surface-muted", "transparent");
  var border = v("interactive-border", "currentColor");
  var hover = v("interactive-hover", "transparent");
  var active = v("interactive-active", "transparent");
  var selection = v("interactive-selection", "transparent");
  var selectionFg = v("interactive-selection-foreground", "inherit");
  var primary = v("primary", "currentColor");
  var primaryText = v("primary-text", "inherit");
  var errorText = v("error-text", "inherit");
  var font = v("font-sans", "inherit");
  var mono = v("font-mono", "monospace");
  var radius = v("radius", "9px");
  var controlRadius = `calc(${radius} - 2px)`;
  var smallRadius = `calc(${radius} - 4px)`;
  var mix = (color, pct, base = "transparent") => `color-mix(in srgb, ${color} ${pct}%, ${base})`;
  var focusFill = `background-image: linear-gradient(${hover}, ${hover});`;
  var field = (edge) => `box-shadow: inset 0 0 0 1px ${edge}, var(--oc-sdk-field-lift);`;
  var raised = "box-shadow: inset 0 0 0 1px var(--oc-sdk-edge), var(--oc-sdk-raised-lift);";
  var litButton = "box-shadow: var(--oc-sdk-lit);";
  var darkLift = `inset 0 1px 0 0 ${mix(fg, 1.5)}, 0 1px 1px 0 rgb(0 0 0 / 0.28), 0 2px 3px -2px rgb(0 0 0 / 0.2)`;
  var THEME_VARS = `
:root {
  --oc-sdk-edge: ${mix(fg, 10)};
  --oc-sdk-field-bg: ${elevated};
  --oc-sdk-raised-bg: ${bg};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 2px 0 rgb(0 0 0 / 0.06);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.45), 0 1px 2px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.8), inset 0 0 0 1px rgb(0 0 0 / 0.04), 0 0 0 1px rgb(0 0 0 / 0.1), 0 1px 2px -0.5px rgb(0 0 0 / 0.08), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.08);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${mix(fg, 6)};
  --oc-sdk-field-bg: ${mix(bg, 50, elevated)};
  --oc-sdk-raised-bg: ${elevated};
  --oc-sdk-field-lift: ${darkLift};
  --oc-sdk-raised-lift: ${darkLift};
  --oc-sdk-lit: inset 0 1px 0 0 ${mix(fg, 1.5)}, 0 1px 1px 0 rgb(0 0 0 / 0.28), 0 2px 3px -2px rgb(0 0 0 / 0.2);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.06), inset 0 0 0 1px rgb(255 255 255 / 0.08), 0 0 0 1px rgb(0 0 0 / 0.36), 0 1px 1px -0.5px rgb(0 0 0 / 0.22), 0 3px 3px -1.5px rgb(0 0 0 / 0.2), 0 6px 6px -3px rgb(0 0 0 / 0.16);
}`;
  var tone = (name) => {
    const color = v(`status-${name}`, "currentColor");
    return `
.oc-sdk[data-tone="${name}"], .oc-sdk [data-tone="${name}"] { --oc-sdk-tone: ${color}; --oc-sdk-tone-text: ${v(`${name}-text`, "inherit")}; }`;
  };
  var UI_SIZE_CSS = `
.oc-sdk { box-sizing: border-box; font-size: 0.875rem; line-height: 1.45; }
.oc-sdk *, .oc-sdk *::before, .oc-sdk *::after { box-sizing: border-box; }
/* :where() keeps the reset at zero specificity so every primitive class below overrides it. */
:where(.oc-sdk) :where(button, input, textarea), :where(button.oc-sdk, input.oc-sdk, textarea.oc-sdk) { font: inherit; color: inherit; margin: 0; }
:where(.oc-sdk) :where(button), :where(button.oc-sdk) { cursor: pointer; background: none; border: 0; padding: 0; }
.oc-sdk button:disabled, button.oc-sdk:disabled, .oc-sdk[aria-disabled="true"], .oc-sdk [aria-disabled="true"] { opacity: .5; pointer-events: none; }

.oc-sdk-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 32px; padding: 0 12px; border: 1px solid transparent; font-size: 0.875rem; font-weight: 500; line-height: 1; white-space: nowrap; }
.oc-sdk-btn[data-size="sm"] { gap: 6px; height: 28px; padding: 0 10px; font-size: 0.8125rem; }
.oc-sdk-btn[data-size="xs"] { gap: 4px; height: 24px; padding: 0 8px; font-size: 0.75rem; }
.oc-sdk-btn[data-loading="true"] { opacity: .5; pointer-events: none; }
.oc-sdk-btn > .oc-sdk-spinner-ring { width: 14px; height: 14px; }

.oc-sdk-field { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-field-label { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-field-note { font-size: 0.75rem; }
.oc-sdk-input { display: block; width: 100%; min-width: 0; height: 32px; padding: 0 10px; border: 0; font-size: 0.875rem; line-height: 1.45; appearance: none; }
textarea.oc-sdk-input { height: auto; padding: 8px 10px; resize: vertical; }

.oc-sdk-search { position: relative; min-width: 0; }
.oc-sdk-search .oc-sdk-input { padding-left: 34px; padding-right: 34px; }
.oc-sdk-search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); pointer-events: none; }
.oc-sdk-search-clear { position: absolute; right: 6px; top: 50%; transform: translateY(-50%); display: none; align-items: center; justify-content: center; width: 24px; height: 24px; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-clear { display: inline-flex; }

.oc-sdk-select { position: relative; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-trigger { display: inline-flex; align-items: center; gap: 6px; align-self: flex-start; width: auto; max-width: 100%; min-width: 0; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; text-align: left; }
.oc-sdk-trigger-value { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-trigger-chevron { flex: 0 0 auto; }
.oc-sdk-popup { position: fixed; z-index: 50; display: flex; flex-direction: column; gap: 2px; min-width: 160px; max-width: calc(100vw - 16px); max-height: min(320px, calc(100vh - 16px)); overflow: auto; padding: 4px; border: 1px solid transparent; }
.oc-sdk-popup-search { flex: 0 0 auto; padding: 2px 2px 4px; }
.oc-sdk-popup-search .oc-sdk-input { height: 28px; font-size: 0.8125rem; }
.oc-sdk-option { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; font-size: 0.8125rem; text-align: left; }
.oc-sdk-option-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-option-hint { flex: 0 0 auto; font-size: 0.75rem; }
.oc-sdk-option-check { flex: 0 0 auto; display: inline-flex; width: 14px; visibility: hidden; }
.oc-sdk-option[aria-selected="true"] > .oc-sdk-option-check { visibility: visible; }
.oc-sdk-popup-empty { padding: 8px; font-size: 0.8125rem; }

.oc-sdk-check { display: inline-flex; align-items: flex-start; gap: 8px; width: 100%; text-align: left; }
.oc-sdk-check-box { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px; margin-top: 3px; border: 1px solid transparent; }
.oc-sdk-check-box > svg { display: none; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box > svg { display: block; }
.oc-sdk-check-thumb { flex: 0 0 auto; position: relative; width: 36px; height: 20px; }
.oc-sdk-check-thumb::after { content: ""; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; }
.oc-sdk-check-text { display: flex; flex-direction: column; min-width: 0; }
.oc-sdk-check-label { font-size: 0.875rem; }
.oc-sdk-check-desc { font-size: 0.75rem; }

.oc-sdk-tabs { display: inline-flex; gap: 2px; padding: 2px; max-width: 100%; overflow: auto; }
.oc-sdk-tab { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; font-weight: 500; white-space: nowrap; }
.oc-sdk-tab-count { font-size: 0.75rem; font-variant-numeric: tabular-nums; }

.oc-sdk-badge { display: inline-flex; align-items: center; padding: 1px 6px; font-size: 11px; font-weight: 500; line-height: 16px; white-space: nowrap; }

.oc-sdk-list { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.oc-sdk-row { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; text-align: left; }
.oc-sdk-row-lead { flex: 0 0 auto; width: 64px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
.oc-sdk-row-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-row-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-meta { flex: 0 0 auto; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-list-empty { padding: 16px 8px; text-align: center; font-size: 0.8125rem; }

.oc-sdk-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 40px 16px; text-align: center; }
.oc-sdk-empty-title { margin: 0; font-size: 0.8125rem; font-weight: 600; }
.oc-sdk-empty-body { margin: 0; max-width: 32rem; font-size: 0.8125rem; }
.oc-sdk-empty-action { margin-top: 12px; }

@keyframes oc-sdk-spin { to { transform: rotate(360deg); } }
.oc-sdk-spinner { display: inline-flex; align-items: center; gap: 8px; font-size: 0.8125rem; }
.oc-sdk-spinner-ring { width: 16px; height: 16px; border: 2px solid transparent; animation: oc-sdk-spin .8s linear infinite; }
.oc-sdk-spinner[data-size="sm"] .oc-sdk-spinner-ring { width: 12px; height: 12px; }

.oc-sdk-banner { display: flex; align-items: flex-start; gap: 12px; padding: 8px 12px; border: 1px solid transparent; }
.oc-sdk-banner-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.oc-sdk-banner-title { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-banner-body { font-size: 0.8125rem; }
.oc-sdk-banner-action { flex: 0 0 auto; }

.oc-sdk-separator { display: flex; align-items: center; gap: 8px; width: 100%; margin: 8px 0; font-size: 0.75rem; }
.oc-sdk-separator::before, .oc-sdk-separator::after { content: ""; flex: 1 1 auto; height: 1px; }
.oc-sdk-separator[data-labeled="false"]::after { display: none; }
.oc-sdk-popup > .oc-sdk-separator { margin: 4px 0; }

.oc-sdk-progress { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-progress-label { display: flex; justify-content: space-between; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-progress-track { height: 6px; overflow: hidden; }
.oc-sdk-progress-fill { height: 100%; transform-origin: left; transition: transform 200ms ease-out; }

.oc-sdk-menu { position: relative; display: inline-flex; }

.oc-sdk-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.oc-sdk-text img { display: block; max-width: 100%; margin: 8px 0; }
`;
  var GUEST_UI_LOOK_CSS = `${THEME_VARS}
.oc-sdk { color: ${fg}; font-family: ${font}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${focusFill} }
.oc-sdk-mono { font-family: ${mono}; }
.oc-sdk-muted { color: ${muted}; }
${tone("success")}${tone("warning")}${tone("error")}${tone("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${primary}; --oc-sdk-tone-text: ${primaryText}; }

.oc-sdk-btn { border-radius: ${controlRadius}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${smallRadius}; }
.oc-sdk-btn[data-variant="default"] { color: ${primaryText}; background: ${mix(primary, 10, bg)}; border-color: ${mix(primary, 12)}; ${litButton} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${mix(primary, 16, bg)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${mix(primary, 22, bg)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${secondary}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${hover}, ${hover}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${active}, ${active}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${elevatedFg}; border-color: transparent; ${raised} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${hover}, ${hover}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${active}, ${active}); box-shadow: inset 0 0 0 1px var(--oc-sdk-edge); }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${hover}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${active}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${v("status-error", "red")}; color: ${errorText}; background: ${mix("var(--oc-sdk-tone)", 7, bg)}; border-color: ${mix("var(--oc-sdk-tone)", 12)}; ${litButton} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${mix("var(--oc-sdk-tone)", 9, bg)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${mix("var(--oc-sdk-tone)", 11, bg)}; box-shadow: none; }

.oc-sdk-field-note { color: ${muted}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${errorText}; }
.oc-sdk-input { border-radius: ${controlRadius}; background: var(--oc-sdk-field-bg); color: ${elevatedFg}; ${field("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${muted}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${hover}, ${hover}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${field(mix(fg, 26))} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${field(v("status-error", "red"))} }
.oc-sdk-input[data-mono="true"] { font-family: ${mono}; }

.oc-sdk-search-icon { color: ${muted}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${primary}; }
.oc-sdk-search-clear { border-radius: ${smallRadius}; color: ${muted}; }
.oc-sdk-search-clear:hover { background: ${hover}; color: ${fg}; }

.oc-sdk-trigger { border-color: transparent; border-radius: ${controlRadius}; background: var(--oc-sdk-raised-bg); color: ${elevatedFg}; ${raised} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${hover}, ${hover}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${active}, ${active}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${muted}; }
.oc-sdk-trigger-chevron { color: ${muted}; }
/* The app's dropdown light: lit top, hairline rings and a layered shadow, no border. */
.oc-sdk-popup { --surface-foreground: ${elevatedFg}; border-color: transparent; border-radius: 12px; background: ${elevated}; color: ${elevatedFg}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${hover}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${selection}; color: ${selectionFg}; }
.oc-sdk-option-check { color: ${fg}; }
.oc-sdk-option[data-destructive="true"] { color: ${errorText}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${mix(v("status-error", "red"), 10)}; }
.oc-sdk-option-hint { color: ${muted}; }
.oc-sdk-popup-empty { color: ${muted}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${border}; border-radius: 4px; color: ${fg}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${mix(fg, 60, border)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${border}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${bg}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${primary}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${focusFill} }
.oc-sdk-check-desc { color: ${muted}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${mix(fg, 4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${muted}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${fg}; }
.oc-sdk-tab[aria-selected="true"] { color: ${selectionFg}; background: ${selection}; border-color: ${border}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${elevatedFg}; background: var(--oc-sdk-raised-bg); border-color: transparent; ${raised} }
.oc-sdk-tab-count { color: ${muted}; }

.oc-sdk-badge { border-radius: 9999px; background: ${hover}; color: ${muted}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${mix("var(--oc-sdk-tone)", 15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${hover}; }
.oc-sdk-row[aria-selected="true"] { background: ${selection}; color: ${selectionFg}; }
.oc-sdk-row-lead { font-family: ${mono}; color: ${muted}; }
.oc-sdk-row-sub { color: ${muted}; }
.oc-sdk-row-meta { color: ${muted}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${muted}; }

.oc-sdk-empty-body { color: ${muted}; }

.oc-sdk-spinner { color: ${muted}; }
.oc-sdk-spinner-ring { border-color: ${border}; border-top-color: ${primary}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${mix("var(--oc-sdk-tone)", 10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${muted}; }

.oc-sdk-separator { color: ${muted}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${mix(border, 40)}; }

.oc-sdk-progress-label { color: ${muted}; }
.oc-sdk-progress-track { border-radius: 9999px; background: ${border}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${primary}); }

.oc-sdk-text a { color: ${primaryText}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${mix(border, 60)}; }
`;
  var UI_CSS = `
${GUEST_SCROLLBAR_CSS}
${UI_SIZE_CSS}
${GUEST_UI_LOOK_CSS}`;
  // src/api.ts
  var parse = (body) => {
    try {
      return JSON.parse(body);
    } catch {
      throw new Error(body.slice(0, 500) || "The extension service returned an empty answer.");
    }
  };

  class ServiceError extends Error {
    code;
    constructor(message, code = "SERVICE_ERROR") {
      super(message);
      this.name = "ServiceError";
      this.code = code;
    }
  }
  var describeError = (error) => {
    if (error instanceof ServiceError)
      return { code: error.code, message: error.message };
    if (error && typeof error === "object" && "code" in error && "message" in error) {
      return {
        code: String(error.code ?? "HOST_ERROR"),
        message: String(error.message ?? error)
      };
    }
    return { code: "UNKNOWN", message: String(error instanceof Error ? error.message : error) };
  };
  var fetchRow = async (host, sessionId, directory, rowId) => {
    const query = { sessionId, rowId };
    if (directory)
      query.directory = directory;
    const result = await host.serviceRequest({ method: "GET", path: "/row", query });
    const body = parse(result.body);
    if (body.ok !== true) {
      throw new ServiceError("message" in body ? body.message ?? body.code ?? "Row not found" : "Row not found", "code" in body ? body.code ?? "ROW_NOT_FOUND" : "ROW_NOT_FOUND");
    }
    return body;
  };

  // src/format.ts
  var formatDuration = (value) => {
    if (value === null || value === undefined || !Number.isFinite(value) || value < 0)
      return "—";
    if (value < 50)
      return "<0.1s";
    if (value < 60000)
      return `${(value / 1000).toFixed(value < 1e4 ? 1 : 0)}s`;
    const seconds = Math.round(value / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ${seconds % 60}s`;
  };
  var formatTokens = (value) => {
    if (value === null || value === undefined || !Number.isFinite(value))
      return "—";
    if (value >= 1e6)
      return `${(value / 1e6).toFixed(1)}M`;
    if (value >= 1000)
      return `${(value / 1000).toFixed(1)}K`;
    return String(Math.round(value));
  };
  var formatCost = (value) => {
    if (value === null || value === undefined || !Number.isFinite(value))
      return "—";
    if (value === 0)
      return "$0";
    if (value < 0.0001)
      return `$${value.toExponential(1)}`;
    return `$${value.toFixed(4)}`;
  };
  var formatRate = (value) => {
    if (value === null || value === undefined || !Number.isFinite(value) || value <= 0)
      return "—";
    if (value > 5000)
      return "—";
    return `${Math.round(value)} tok/s`;
  };
  var formatTime = (value) => {
    if (value === null || value === undefined || !Number.isFinite(value))
      return "—";
    const date = new Date(value);
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  };
  var formatClock = (value) => {
    if (value === null || value === undefined || !Number.isFinite(value))
      return "—";
    const date = new Date(value);
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      fractionalSecondDigits: 3
    });
  };
  var truncate = (value, limit) => {
    if (value.length <= limit)
      return value;
    return `${value.slice(0, limit)}…`;
  };
  var statusTone = (status) => {
    switch (status) {
      case "complete":
      case "completed":
      case "succeeded":
        return "success";
      case "error":
      case "failed":
        return "error";
      case "running":
      case "pending":
        return "warning";
      case "interrupted":
        return "info";
      default:
        return "muted";
    }
  };
  var rowLabel = (kind) => {
    switch (kind) {
      case "assistant":
        return "ASSISTANT";
      case "user":
        return "USER";
      case "tool":
        return "TOOL";
      case "compaction":
        return "COMPACT";
      case "notice":
        return "NOTICE";
      case "turn-end":
        return "TURN END";
      default:
        return kind.toUpperCase();
    }
  };
  var safeJson = (value, limit = 40000) => {
    try {
      const text = JSON.stringify(value, null, 2) ?? "";
      return truncate(text, limit);
    } catch {
      return String(value);
    }
  };
  var textPreview = (value, limit = 220) => {
    if (!value)
      return "";
    const compact = value.replace(/\s+/g, " ").trim();
    return truncate(compact, limit);
  };

  // src/components/Timeline.tsx
  var import_react = __toESM(require_react(), 1);
  var jsx_runtime = __toESM(require_jsx_runtime(), 1);
  var MAX_ZOOM = 128;
  var MIN_SPAN_RATIO = 1 / MAX_ZOOM;
  var ZOOM_IN = 0.8;
  var ZOOM_OUT = 1.25;
  var clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  var rowTone = (row) => {
    if (row.kind === "assistant")
      return `assistant ${statusTone(row.status)}`;
    if (row.kind === "tool")
      return `tool ${statusTone(row.status)}`;
    if (row.kind === "compaction")
      return `compaction ${statusTone(row.status)}`;
    if (row.kind === "user")
      return "user";
    if (row.kind === "turn-end")
      return "turn-end";
    return "notice";
  };
  var barTitle = (row) => {
    const parts = [row.kind];
    if ("name" in row && row.name)
      parts.push(row.name);
    if (row.time?.start)
      parts.push(new Date(row.time.start).toLocaleTimeString());
    if (row.time?.duration !== undefined && row.time?.duration !== null) {
      parts.push(formatDuration(row.time.duration));
    }
    if (row.kind === "assistant") {
      if (row.timing.ttftMs !== null)
        parts.push(`TTFT ${formatDuration(row.timing.ttftMs)}`);
      if (row.textLength)
        parts.push(`${row.textLength} chars`);
    }
    return parts.join(" · ");
  };
  var Timeline = ({ snapshot, selectedId, onSelect }) => {
    const rows = import_react.default.useMemo(() => snapshot.rows.filter((row) => row.kind !== "turn-end" && row.kind !== "notice"), [snapshot.rows]);
    const domain = import_react.default.useMemo(() => {
      const starts = rows.map((row) => row.time?.start).filter((value) => typeof value === "number");
      const ends = rows.map((row) => row.time?.end).filter((value) => typeof value === "number");
      if (starts.length === 0)
        return null;
      const min = Math.min(...starts);
      const max = Math.max(...ends, ...starts);
      return { min, max, span: Math.max(1, max - min) };
    }, [rows]);
    const [view, setView] = import_react.default.useState(null);
    const rootRef = import_react.default.useRef(null);
    const trackRef = import_react.default.useRef(null);
    const dragRef = import_react.default.useRef(null);
    const suppressClickRef = import_react.default.useRef(false);
    const visibleView = import_react.default.useMemo(() => {
      if (!domain)
        return null;
      if (!view)
        return { start: domain.min, end: domain.max };
      const minSpan = domain.span * MIN_SPAN_RATIO;
      const span = clamp(view.end - view.start, minSpan, domain.span);
      const start = clamp(view.start, domain.min, domain.max - span);
      return { start, end: start + span };
    }, [domain, view]);
    const zoom = domain && visibleView ? domain.span / Math.max(1, visibleView.end - visibleView.start) : 1;
    const zoomed = view !== null;
    const setClampedView = import_react.default.useCallback((start, end) => {
      if (!domain)
        return;
      const minSpan = domain.span * MIN_SPAN_RATIO;
      const span = clamp(end - start, minSpan, domain.span);
      const clampedStart = clamp(start, domain.min, domain.max - span);
      if (span >= domain.span - 1) {
        setView(null);
        return;
      }
      setView({ start: clampedStart, end: clampedStart + span });
    }, [domain]);
    const zoomAt = import_react.default.useCallback((clientX, factor) => {
      if (!domain || !visibleView || !trackRef.current)
        return;
      const rect = trackRef.current.getBoundingClientRect();
      if (rect.width <= 0)
        return;
      const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
      const anchor = visibleView.start + ratio * (visibleView.end - visibleView.start);
      const nextSpan = clamp((visibleView.end - visibleView.start) * factor, domain.span * MIN_SPAN_RATIO, domain.span);
      const start = anchor - ratio * nextSpan;
      setClampedView(start, start + nextSpan);
    }, [domain, visibleView, setClampedView]);
    const zoomBy = import_react.default.useCallback((factor) => {
      if (!visibleView)
        return;
      const center = (visibleView.start + visibleView.end) / 2;
      const span = (visibleView.end - visibleView.start) * factor;
      setClampedView(center - span / 2, center + span / 2);
    }, [visibleView, setClampedView]);
    const resetZoom = import_react.default.useCallback(() => setView(null), []);
    import_react.default.useEffect(() => {
      const element = rootRef.current;
      if (!element || !domain)
        return;
      const handleWheel = (event) => {
        if (Math.abs(event.deltaY) < 1)
          return;
        if (Math.abs(event.deltaX) > Math.abs(event.deltaY))
          return;
        event.preventDefault();
        zoomAt(event.clientX, event.deltaY < 0 ? ZOOM_IN : ZOOM_OUT);
      };
      element.addEventListener("wheel", handleWheel, { passive: false });
      return () => element.removeEventListener("wheel", handleWheel);
    }, [domain, zoomAt]);
    const handlePointerDown = (event) => {
      if (event.button !== 0 || !visibleView)
        return;
      dragRef.current = {
        pointerId: event.pointerId,
        x: event.clientX,
        start: visibleView.start,
        end: visibleView.end,
        moved: false,
        captured: false
      };
    };
    const handlePointerMove = (event) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== event.pointerId)
        return;
      const dx = event.clientX - drag.x;
      if (!drag.moved && Math.abs(dx) < 4)
        return;
      if (!drag.moved) {
        drag.moved = true;
        suppressClickRef.current = true;
        try {
          event.currentTarget.setPointerCapture(event.pointerId);
          drag.captured = true;
        } catch {}
      }
      const rect = trackRef.current?.getBoundingClientRect();
      if (!rect || rect.width <= 0)
        return;
      const span = drag.end - drag.start;
      const start = drag.start - dx / rect.width * span;
      setClampedView(start, start + span);
    };
    const endPointer = (event) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== event.pointerId)
        return;
      dragRef.current = null;
      if (drag.captured) {
        try {
          event.currentTarget.releasePointerCapture(event.pointerId);
        } catch {}
      }
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 250);
    };
    const handleBarClick = (row) => {
      if (suppressClickRef.current)
        return;
      onSelect(row);
    };
    if (!domain || !visibleView) {
      return /* @__PURE__ */ jsx_runtime.jsx("div", {
        className: "timeline empty",
        children: /* @__PURE__ */ jsx_runtime.jsx("span", {
          children: "No timing data for this session yet."
        })
      });
    }
    const visibleSpan = Math.max(1, visibleView.end - visibleView.start);
    const visibleTurns = snapshot.turns.filter((turn) => {
      const turnRows = rows.filter((row) => row.turn === turn.index);
      return turnRows.some((row) => {
        const start = row.time?.start ?? turn.start;
        const end = row.time?.end ?? start;
        return end >= visibleView.start && start <= visibleView.end;
      });
    }).length;
    return /* @__PURE__ */ jsx_runtime.jsxs("div", {
      className: `timeline${zoomed ? " zoomed" : ""}`,
      ref: rootRef,
      "aria-label": "Trajectory timing overview",
      children: [
        /* @__PURE__ */ jsx_runtime.jsxs("div", {
          className: "timeline-head",
          children: [
            /* @__PURE__ */ jsx_runtime.jsx("span", {
              children: "Overview"
            }),
            /* @__PURE__ */ jsx_runtime.jsxs("span", {
              className: "timeline-domain",
              children: [
                formatDuration(visibleSpan),
                " · ",
                visibleTurns,
                " of ",
                snapshot.totalTurns,
                " turn",
                snapshot.totalTurns === 1 ? "" : "s"
              ]
            }),
            /* @__PURE__ */ jsx_runtime.jsxs("span", {
              className: "timeline-tools",
              children: [
                /* @__PURE__ */ jsx_runtime.jsxs("span", {
                  className: "timeline-zoom",
                  title: "Current zoom",
                  children: [
                    zoom.toFixed(1),
                    "×"
                  ]
                }),
                /* @__PURE__ */ jsx_runtime.jsx("button", {
                  type: "button",
                  className: "timeline-zoom-button",
                  onClick: () => zoomBy(ZOOM_IN),
                  disabled: zoom >= MAX_ZOOM - 0.01,
                  title: "Zoom in",
                  "aria-label": "Zoom in",
                  children: "+"
                }),
                /* @__PURE__ */ jsx_runtime.jsx("button", {
                  type: "button",
                  className: "timeline-zoom-button",
                  onClick: () => zoomBy(ZOOM_OUT),
                  disabled: !zoomed,
                  title: "Zoom out",
                  "aria-label": "Zoom out",
                  children: "−"
                }),
                /* @__PURE__ */ jsx_runtime.jsx("button", {
                  type: "button",
                  className: "timeline-zoom-button reset",
                  onClick: resetZoom,
                  disabled: !zoomed,
                  title: "Reset zoom",
                  children: "Reset"
                })
              ]
            })
          ]
        }),
        /* @__PURE__ */ jsx_runtime.jsx("div", {
          className: "timeline-body",
          onPointerDown: handlePointerDown,
          onPointerMove: handlePointerMove,
          onPointerUp: endPointer,
          onPointerCancel: endPointer,
          onDoubleClick: resetZoom,
          children: snapshot.turns.map((turn) => {
            const turnRows = rows.filter((row) => row.turn === turn.index);
            const isOffscreen = !turnRows.some((row) => {
              const start = row.time?.start ?? turn.start;
              const end = row.time?.end ?? start;
              return end >= visibleView.start && start <= visibleView.end;
            });
            return /* @__PURE__ */ jsx_runtime.jsxs("div", {
              className: `timeline-row${isOffscreen ? " offscreen" : ""}`,
              children: [
                /* @__PURE__ */ jsx_runtime.jsxs("button", {
                  type: "button",
                  className: "timeline-turn-label",
                  onClick: () => {
                    const first = turnRows[0];
                    if (first)
                      handleBarClick(first);
                  },
                  title: `Turn ${turn.index}`,
                  children: [
                    "T",
                    turn.index
                  ]
                }),
                /* @__PURE__ */ jsx_runtime.jsx("div", {
                  className: "timeline-track",
                  ref: turn.index === snapshot.turns[0]?.index ? trackRef : undefined,
                  children: turnRows.map((row) => {
                    const start = row.time?.start ?? turn.start;
                    const end = row.time?.end ?? start + Math.max(1, visibleSpan * 0.004);
                    if (end < visibleView.start || start > visibleView.end)
                      return null;
                    const left = (start - visibleView.start) / visibleSpan * 100;
                    const width = Math.max(0.3, (Math.max(end, start + 1) - start) / visibleSpan * 100);
                    const isSelected = selectedId === row.id;
                    return /* @__PURE__ */ jsx_runtime.jsx("button", {
                      type: "button",
                      className: `timeline-bar ${rowTone(row)}${isSelected ? " selected" : ""}`,
                      style: { left: `${Math.max(0, Math.min(99.7, left))}%`, width: `${Math.min(100, width)}%` },
                      title: barTitle(row),
                      onClick: () => handleBarClick(row)
                    }, row.id);
                  })
                })
              ]
            }, turn.index);
          })
        }),
        /* @__PURE__ */ jsx_runtime.jsx("div", {
          className: "timeline-hint",
          children: "Scroll to zoom · drag to pan · double-click to reset"
        })
      ]
    });
  };

  // src/components/Ledger.tsx
  var import_react2 = __toESM(require_react(), 1);
  var jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
  var PAGE_ROWS = 220;
  var StatusBadge = ({ status }) => /* @__PURE__ */ jsx_runtime2.jsx("span", {
    className: `badge ${statusTone(status)}`,
    children: status ?? "—"
  });
  var KindBadge = ({ kind }) => /* @__PURE__ */ jsx_runtime2.jsx("span", {
    className: `kind kind-${kind}`,
    children: rowLabel(kind)
  });
  var TurnHeader = ({ turn, collapsed, onToggle }) => /* @__PURE__ */ jsx_runtime2.jsxs("div", {
    className: "turn-header",
    children: [
      /* @__PURE__ */ jsx_runtime2.jsx("button", {
        type: "button",
        className: "turn-toggle",
        onClick: onToggle,
        title: collapsed ? "Expand turn" : "Collapse turn",
        children: collapsed ? "▸" : "▾"
      }),
      /* @__PURE__ */ jsx_runtime2.jsxs("span", {
        className: "turn-index",
        children: [
          "Turn ",
          turn.index
        ]
      }),
      /* @__PURE__ */ jsx_runtime2.jsx(StatusBadge, {
        status: turn.status
      }),
      /* @__PURE__ */ jsx_runtime2.jsxs("span", {
        className: "turn-meta",
        children: [
          turn.steps,
          " step",
          turn.steps === 1 ? "" : "s",
          " · ",
          turn.tools,
          " tool",
          turn.tools === 1 ? "" : "s",
          turn.ttftMs !== null ? ` · TTFT ${formatDuration(turn.ttftMs)}` : "",
          turn.duration !== null ? ` · ${formatDuration(turn.duration)}` : ""
        ]
      }),
      /* @__PURE__ */ jsx_runtime2.jsxs("span", {
        className: "turn-usage",
        children: [
          formatTokens(turn.usage.input + turn.usage.output + turn.usage.reasoning + turn.usage.cacheRead + turn.usage.cacheWrite),
          " tok",
          turn.cost > 0 ? ` · ${formatCost(turn.cost)}` : ""
        ]
      })
    ]
  });
  var UserRowView = ({ row, selected, onSelect }) => /* @__PURE__ */ jsx_runtime2.jsxs("button", {
    type: "button",
    className: `ledger-row user${selected ? " selected" : ""}`,
    onClick: onSelect,
    children: [
      /* @__PURE__ */ jsx_runtime2.jsxs("div", {
        className: "row-lead",
        children: [
          /* @__PURE__ */ jsx_runtime2.jsx(KindBadge, {
            kind: "user"
          }),
          row.steer ? /* @__PURE__ */ jsx_runtime2.jsx("span", {
            className: "mini-badge",
            children: "steer"
          }) : null
        ]
      }),
      /* @__PURE__ */ jsx_runtime2.jsxs("div", {
        className: "row-main",
        children: [
          /* @__PURE__ */ jsx_runtime2.jsxs("div", {
            className: "row-title",
            children: [
              /* @__PURE__ */ jsx_runtime2.jsx("span", {
                className: "row-name",
                children: "User prompt"
              }),
              row.files.length > 0 ? /* @__PURE__ */ jsx_runtime2.jsxs("span", {
                className: "row-sub",
                children: [
                  row.files.length,
                  " attachment",
                  row.files.length === 1 ? "" : "s"
                ]
              }) : null
            ]
          }),
          /* @__PURE__ */ jsx_runtime2.jsx("div", {
            className: "row-preview",
            children: textPreview(row.text, 520) || "(empty prompt)"
          })
        ]
      }),
      /* @__PURE__ */ jsx_runtime2.jsx("div", {
        className: "row-side",
        children: /* @__PURE__ */ jsx_runtime2.jsxs("span", {
          className: "row-meta",
          children: [
            row.textLength,
            " chars"
          ]
        })
      })
    ]
  });
  var AssistantRowView = ({ row, selected, onSelect }) => {
    const toolNames = row.blocks.filter((block) => block.kind === "tool");
    const preview = textPreview(row.text || row.reasoning, 420);
    return /* @__PURE__ */ jsx_runtime2.jsxs("button", {
      type: "button",
      className: `ledger-row assistant${selected ? " selected" : ""}`,
      onClick: onSelect,
      children: [
        /* @__PURE__ */ jsx_runtime2.jsxs("div", {
          className: "row-lead",
          children: [
            /* @__PURE__ */ jsx_runtime2.jsx(KindBadge, {
              kind: "assistant"
            }),
            /* @__PURE__ */ jsx_runtime2.jsxs("span", {
              className: "request-no",
              children: [
                "#",
                row.request
              ]
            })
          ]
        }),
        /* @__PURE__ */ jsx_runtime2.jsxs("div", {
          className: "row-main",
          children: [
            /* @__PURE__ */ jsx_runtime2.jsxs("div", {
              className: "row-title",
              children: [
                /* @__PURE__ */ jsx_runtime2.jsx("span", {
                  className: "row-name",
                  children: row.modelID ?? row.model?.id ?? "assistant"
                }),
                /* @__PURE__ */ jsx_runtime2.jsx(StatusBadge, {
                  status: row.status
                }),
                row.agent ? /* @__PURE__ */ jsx_runtime2.jsx("span", {
                  className: "row-sub",
                  children: row.agent
                }) : null,
                row.headersMissing ? /* @__PURE__ */ jsx_runtime2.jsx("span", {
                  className: "mini-badge muted",
                  title: "The collector was not attached for this request",
                  children: "no header"
                }) : null,
                row.retry ? /* @__PURE__ */ jsx_runtime2.jsxs("span", {
                  className: "mini-badge warning",
                  children: [
                    "retry ",
                    row.retry.attempt ?? ""
                  ]
                }) : null
              ]
            }),
            /* @__PURE__ */ jsx_runtime2.jsx("div", {
              className: "row-preview",
              children: preview || (row.toolIDs.length > 0 ? "(tool call only)" : "(no text yet)")
            }),
            /* @__PURE__ */ jsx_runtime2.jsxs("div", {
              className: "row-chips",
              children: [
                toolNames.slice(0, 8).map((block, index) => /* @__PURE__ */ jsx_runtime2.jsx("span", {
                  className: "chip",
                  children: block.name
                }, `${block.name}:${index}`)),
                toolNames.length > 8 ? /* @__PURE__ */ jsx_runtime2.jsxs("span", {
                  className: "chip",
                  children: [
                    "+",
                    toolNames.length - 8
                  ]
                }) : null,
                row.error ? /* @__PURE__ */ jsx_runtime2.jsx("span", {
                  className: "chip error",
                  title: row.error,
                  children: row.errorCode ?? "error"
                }) : null
              ]
            })
          ]
        }),
        /* @__PURE__ */ jsx_runtime2.jsxs("div", {
          className: "row-side assistant-side",
          children: [
            /* @__PURE__ */ jsx_runtime2.jsxs("div", {
              className: "metric",
              children: [
                /* @__PURE__ */ jsx_runtime2.jsx("span", {
                  children: "TTFT"
                }),
                /* @__PURE__ */ jsx_runtime2.jsx("strong", {
                  children: formatDuration(row.timing.ttftMs)
                })
              ]
            }),
            /* @__PURE__ */ jsx_runtime2.jsxs("div", {
              className: "metric",
              children: [
                /* @__PURE__ */ jsx_runtime2.jsx("span", {
                  children: "Duration"
                }),
                /* @__PURE__ */ jsx_runtime2.jsx("strong", {
                  children: formatDuration(row.time?.duration)
                })
              ]
            }),
            /* @__PURE__ */ jsx_runtime2.jsxs("div", {
              className: "metric",
              children: [
                /* @__PURE__ */ jsx_runtime2.jsx("span", {
                  children: "Tokens"
                }),
                /* @__PURE__ */ jsx_runtime2.jsx("strong", {
                  children: formatTokens((row.usage?.input ?? 0) + (row.usage?.output ?? 0) + (row.usage?.reasoning ?? 0))
                })
              ]
            }),
            row.timing.throughput !== null ? /* @__PURE__ */ jsx_runtime2.jsx("div", {
              className: "metric subtle",
              children: formatRate(row.timing.throughput)
            }) : null
          ]
        })
      ]
    });
  };
  var ToolRowView = ({ row, selected, onSelect }) => /* @__PURE__ */ jsx_runtime2.jsxs("button", {
    type: "button",
    className: `ledger-row tool${selected ? " selected" : ""}`,
    onClick: onSelect,
    children: [
      /* @__PURE__ */ jsx_runtime2.jsxs("div", {
        className: "row-lead",
        children: [
          /* @__PURE__ */ jsx_runtime2.jsx(KindBadge, {
            kind: "tool"
          }),
          /* @__PURE__ */ jsx_runtime2.jsxs("span", {
            className: "request-no",
            children: [
              "#",
              row.request
            ]
          })
        ]
      }),
      /* @__PURE__ */ jsx_runtime2.jsxs("div", {
        className: "row-main",
        children: [
          /* @__PURE__ */ jsx_runtime2.jsxs("div", {
            className: "row-title",
            children: [
              /* @__PURE__ */ jsx_runtime2.jsx("span", {
                className: "row-name",
                children: row.name
              }),
              /* @__PURE__ */ jsx_runtime2.jsx(StatusBadge, {
                status: row.status
              }),
              row.error ? /* @__PURE__ */ jsx_runtime2.jsx("span", {
                className: "chip error",
                children: row.errorCode ?? "error"
              }) : null
            ]
          }),
          /* @__PURE__ */ jsx_runtime2.jsx("div", {
            className: "row-preview mono",
            children: textPreview(row.inputPreview, 300) || "(no arguments)"
          }),
          row.outputPreview ? /* @__PURE__ */ jsx_runtime2.jsx("div", {
            className: "row-preview subtle mono",
            children: textPreview(row.outputPreview, 260)
          }) : null
        ]
      }),
      /* @__PURE__ */ jsx_runtime2.jsxs("div", {
        className: "row-side",
        children: [
          /* @__PURE__ */ jsx_runtime2.jsx("span", {
            className: "row-meta",
            children: formatDuration(row.time?.duration)
          }),
          /* @__PURE__ */ jsx_runtime2.jsxs("span", {
            className: "row-meta subtle",
            children: [
              row.outputLength,
              " chars"
            ]
          })
        ]
      })
    ]
  });
  var CompactionRowView = ({ row, selected, onSelect }) => /* @__PURE__ */ jsx_runtime2.jsxs("button", {
    type: "button",
    className: `ledger-row compaction${selected ? " selected" : ""}`,
    onClick: onSelect,
    children: [
      /* @__PURE__ */ jsx_runtime2.jsxs("div", {
        className: "row-lead",
        children: [
          /* @__PURE__ */ jsx_runtime2.jsx(KindBadge, {
            kind: "compaction"
          }),
          /* @__PURE__ */ jsx_runtime2.jsxs("span", {
            className: "request-no",
            children: [
              "#",
              row.request
            ]
          })
        ]
      }),
      /* @__PURE__ */ jsx_runtime2.jsxs("div", {
        className: "row-main",
        children: [
          /* @__PURE__ */ jsx_runtime2.jsxs("div", {
            className: "row-title",
            children: [
              /* @__PURE__ */ jsx_runtime2.jsx("span", {
                className: "row-name",
                children: "Compaction"
              }),
              /* @__PURE__ */ jsx_runtime2.jsx(StatusBadge, {
                status: row.status
              }),
              row.reason ? /* @__PURE__ */ jsx_runtime2.jsx("span", {
                className: "row-sub",
                children: row.reason
              }) : null
            ]
          }),
          /* @__PURE__ */ jsx_runtime2.jsx("div", {
            className: "row-preview",
            children: textPreview(row.summary, 420) || "(no summary yet)"
          })
        ]
      }),
      /* @__PURE__ */ jsx_runtime2.jsxs("div", {
        className: "row-side",
        children: [
          /* @__PURE__ */ jsx_runtime2.jsx("span", {
            className: "row-meta",
            children: formatDuration(row.time?.duration)
          }),
          /* @__PURE__ */ jsx_runtime2.jsxs("span", {
            className: "row-meta subtle",
            children: [
              formatTokens((row.usage?.input ?? 0) + (row.usage?.output ?? 0)),
              " tok"
            ]
          })
        ]
      })
    ]
  });
  var NoticeRowView = ({ row, selected, onSelect }) => /* @__PURE__ */ jsx_runtime2.jsxs("button", {
    type: "button",
    className: `ledger-row notice${selected ? " selected" : ""}`,
    onClick: onSelect,
    children: [
      /* @__PURE__ */ jsx_runtime2.jsx("div", {
        className: "row-lead",
        children: /* @__PURE__ */ jsx_runtime2.jsx(KindBadge, {
          kind: "notice"
        })
      }),
      /* @__PURE__ */ jsx_runtime2.jsxs("div", {
        className: "row-main",
        children: [
          /* @__PURE__ */ jsx_runtime2.jsxs("div", {
            className: "row-title",
            children: [
              /* @__PURE__ */ jsx_runtime2.jsx("span", {
                className: "row-name",
                children: row.role
              }),
              row.name ? /* @__PURE__ */ jsx_runtime2.jsx("span", {
                className: "row-sub",
                children: row.name
              }) : null,
              row.description ? /* @__PURE__ */ jsx_runtime2.jsx("span", {
                className: "row-sub",
                children: row.description
              }) : null
            ]
          }),
          /* @__PURE__ */ jsx_runtime2.jsx("div", {
            className: "row-preview",
            children: textPreview(row.text || row.command || "", 420)
          })
        ]
      }),
      /* @__PURE__ */ jsx_runtime2.jsx("div", {
        className: "row-side"
      })
    ]
  });
  var TurnEndView = ({ row, selected, onSelect }) => /* @__PURE__ */ jsx_runtime2.jsxs("button", {
    type: "button",
    className: `ledger-row turn-end${selected ? " selected" : ""}`,
    onClick: onSelect,
    children: [
      /* @__PURE__ */ jsx_runtime2.jsx("div", {
        className: "row-lead",
        children: /* @__PURE__ */ jsx_runtime2.jsx(KindBadge, {
          kind: "turn-end"
        })
      }),
      /* @__PURE__ */ jsx_runtime2.jsxs("div", {
        className: "row-main",
        children: [
          /* @__PURE__ */ jsx_runtime2.jsxs("div", {
            className: "row-title",
            children: [
              /* @__PURE__ */ jsx_runtime2.jsx("span", {
                className: "row-name",
                children: "Turn ended"
              }),
              /* @__PURE__ */ jsx_runtime2.jsx(StatusBadge, {
                status: row.outcome ?? "complete"
              })
            ]
          }),
          row.error ? /* @__PURE__ */ jsx_runtime2.jsx("div", {
            className: "row-preview error-text",
            children: row.error
          }) : null
        ]
      }),
      /* @__PURE__ */ jsx_runtime2.jsx("div", {
        className: "row-side"
      })
    ]
  });
  var RowView = ({ row, selected, onSelect }) => {
    switch (row.kind) {
      case "user":
        return /* @__PURE__ */ jsx_runtime2.jsx(UserRowView, {
          row,
          selected,
          onSelect
        });
      case "assistant":
        return /* @__PURE__ */ jsx_runtime2.jsx(AssistantRowView, {
          row,
          selected,
          onSelect
        });
      case "tool":
        return /* @__PURE__ */ jsx_runtime2.jsx(ToolRowView, {
          row,
          selected,
          onSelect
        });
      case "compaction":
        return /* @__PURE__ */ jsx_runtime2.jsx(CompactionRowView, {
          row,
          selected,
          onSelect
        });
      case "notice":
        return /* @__PURE__ */ jsx_runtime2.jsx(NoticeRowView, {
          row,
          selected,
          onSelect
        });
      case "turn-end":
        return /* @__PURE__ */ jsx_runtime2.jsx(TurnEndView, {
          row,
          selected,
          onSelect
        });
      default:
        return null;
    }
  };
  var Ledger = ({
    items,
    snapshot,
    selectedId,
    collapsed,
    following,
    scrollRef,
    scrollTarget,
    onScroll,
    onToggleTurn,
    onSelect,
    onJumpLatest
  }) => {
    const [limit, setLimit] = import_react2.default.useState(PAGE_ROWS);
    const visibleItems = items.length > limit ? items.slice(-limit) : items;
    const handledScrollNonce = import_react2.default.useRef(null);
    import_react2.default.useEffect(() => {
      if (!following)
        return;
      if (scrollTarget && handledScrollNonce.current !== scrollTarget.nonce)
        return;
      const element = scrollRef.current;
      if (!element)
        return;
      const frame = window.requestAnimationFrame(() => {
        element.scrollTop = element.scrollHeight;
      });
      return () => window.cancelAnimationFrame(frame);
    }, [following, items.length, snapshot.revision, scrollRef, scrollTarget?.nonce]);
    import_react2.default.useEffect(() => {
      if (!scrollTarget)
        return;
      if (handledScrollNonce.current === scrollTarget.nonce)
        return;
      const index = items.findIndex((item) => item.type === "row" && item.row.id === scrollTarget.id);
      if (index < 0)
        return;
      const needed = items.length - index;
      if (needed > limit) {
        setLimit(Math.min(items.length, needed + 12));
        return;
      }
      const frame = window.requestAnimationFrame(() => {
        const container = scrollRef.current;
        if (!container)
          return;
        const element = Array.from(container.querySelectorAll("[data-row-id]")).find((candidate) => candidate.dataset.rowId === scrollTarget.id);
        if (!element)
          return;
        handledScrollNonce.current = scrollTarget.nonce;
        const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
        const containerRect = container.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const top = Math.max(0, container.scrollTop + (elementRect.top - containerRect.top) - container.clientHeight / 2 + elementRect.height / 2);
        container.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
      });
      return () => window.cancelAnimationFrame(frame);
    }, [scrollTarget, items, limit, scrollRef]);
    const renderItem = (item) => {
      if (item.type === "turn") {
        return /* @__PURE__ */ jsx_runtime2.jsx(TurnHeader, {
          turn: item.turn,
          collapsed: collapsed.has(item.turn.index),
          onToggle: () => onToggleTurn(item.turn.index)
        });
      }
      if (item.type === "between")
        return /* @__PURE__ */ jsx_runtime2.jsx("div", {
          className: "between-header",
          children: "Between turns"
        });
      return /* @__PURE__ */ jsx_runtime2.jsx(RowView, {
        row: item.row,
        selected: selectedId === item.row.id,
        onSelect: () => onSelect(item.row)
      });
    };
    return /* @__PURE__ */ jsx_runtime2.jsxs("div", {
      className: "ledger-wrap",
      children: [
        /* @__PURE__ */ jsx_runtime2.jsxs("div", {
          className: "ledger-scroll",
          ref: scrollRef,
          onScroll,
          children: [
            items.length > limit ? /* @__PURE__ */ jsx_runtime2.jsx("div", {
              className: "ledger-load-earlier",
              children: /* @__PURE__ */ jsx_runtime2.jsxs("button", {
                type: "button",
                className: "btn",
                onClick: () => setLimit((value) => value + PAGE_ROWS),
                children: [
                  "Load earlier (",
                  items.length - limit,
                  " more)"
                ]
              })
            }) : null,
            items.length === 0 ? /* @__PURE__ */ jsx_runtime2.jsx("div", {
              className: "ledger-empty",
              children: "No rows yet. The collector is waiting for the next step."
            }) : /* @__PURE__ */ jsx_runtime2.jsx("div", {
              className: "ledger-inner",
              children: visibleItems.map((item, index) => /* @__PURE__ */ jsx_runtime2.jsx("div", {
                className: "ledger-item",
                "data-row-id": item.type === "row" ? item.row.id : undefined,
                children: renderItem(item)
              }, item.type === "row" ? item.row.id : item.type === "turn" ? `turn:${item.turn.index}` : `between:${index}`))
            })
          ]
        }),
        !following ? /* @__PURE__ */ jsx_runtime2.jsx("button", {
          type: "button",
          className: "jump-latest",
          onClick: onJumpLatest,
          children: "↓ Jump to latest"
        }) : null
      ]
    });
  };

  // src/components/Inspector.tsx
  var import_react3 = __toESM(require_react(), 1);
  var jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
  var tabsFor = (row) => {
    switch (row.kind) {
      case "assistant":
        return ["summary", "output", "timing", "usage", "request", "raw"];
      case "tool":
        return ["summary", "input", "output", "timing", "raw"];
      case "user":
        return ["summary", "input", "raw"];
      case "compaction":
        return ["summary", "output", "timing", "usage", "raw"];
      case "notice":
        return ["summary", "output", "raw"];
      default:
        return ["summary", "raw"];
    }
  };
  var usageRows = (usage) => {
    if (!usage)
      return [];
    return [
      ["Input", formatTokens(usage.input)],
      ["Output", formatTokens(usage.output)],
      ["Reasoning", formatTokens(usage.reasoning)],
      ["Cache read", formatTokens(usage.cacheRead)],
      ["Cache write", formatTokens(usage.cacheWrite)],
      ["Cost", formatCost(usage.cost)]
    ];
  };
  var KeyValue = ({ label, value, mono }) => /* @__PURE__ */ jsx_runtime3.jsxs("div", {
    className: "kv",
    children: [
      /* @__PURE__ */ jsx_runtime3.jsx("span", {
        className: "kv-label",
        children: label
      }),
      /* @__PURE__ */ jsx_runtime3.jsx("span", {
        className: `kv-value${mono ? " mono" : ""}`,
        children: value
      })
    ]
  });
  var PreBlock = ({
    text,
    limit = 60000,
    copy
  }) => {
    const shown = text.length > limit ? `${text.slice(0, limit)}
… (${text.length - limit} more characters)` : text;
    return /* @__PURE__ */ jsx_runtime3.jsxs("div", {
      className: "pre-wrap",
      children: [
        copy ? /* @__PURE__ */ jsx_runtime3.jsx("button", {
          type: "button",
          className: "copy-button",
          onClick: () => copy(text),
          title: "Copy",
          children: "copy"
        }) : null,
        /* @__PURE__ */ jsx_runtime3.jsx("pre", {
          className: "pre-block",
          children: shown || "(empty)"
        })
      ]
    });
  };
  var extractText = (message) => {
    if (!message || !Array.isArray(message.content))
      return "";
    return message.content.filter((item) => item?.type === "text").map((item) => item.text ?? "").join(`
`);
  };
  var extractReasoning = (message) => {
    if (!message || !Array.isArray(message.content))
      return "";
    return message.content.filter((item) => item?.type === "reasoning").map((item) => item.text ?? "").join(`
`);
  };
  var toolField = (tool, key) => tool && typeof tool === "object" ? tool[key] : undefined;
  var StatusBadge2 = ({ status }) => /* @__PURE__ */ jsx_runtime3.jsx("span", {
    className: `badge ${statusTone(status)}`,
    children: status ?? "—"
  });
  var Inspector = ({
    host,
    sessionId,
    directory,
    selected,
    detail,
    loading,
    error,
    onClose
  }) => {
    const [tab, setTab] = import_react3.default.useState("summary");
    import_react3.default.useEffect(() => {
      setTab("summary");
    }, [selected?.id]);
    const copy = import_react3.default.useCallback((text) => {
      const value = text.length > 32000 ? text.slice(0, 32000) : text;
      if (!value)
        return;
      host.writeClipboard(value).then(() => host.toast({ kind: "success", message: value.length < text.length ? "Copied the first 32,000 characters." : "Copied to clipboard." }), () => host.toast({ kind: "error", message: "Could not copy." }));
    }, [host]);
    if (!selected) {
      return /* @__PURE__ */ jsx_runtime3.jsx("aside", {
        className: "inspector empty",
        children: /* @__PURE__ */ jsx_runtime3.jsxs("div", {
          className: "inspector-empty",
          children: [
            /* @__PURE__ */ jsx_runtime3.jsx("span", {
              children: "⌁"
            }),
            /* @__PURE__ */ jsx_runtime3.jsx("p", {
              children: "Select a row to inspect its input, output, timing, usage and request context."
            })
          ]
        })
      });
    }
    const tabs = tabsFor(selected);
    const message = detail?.message;
    const tool = detail?.tool;
    const header = detail?.header;
    const assistant = selected.kind === "assistant" ? selected : null;
    const toolRow = selected.kind === "tool" ? selected : null;
    const rowUsage = "usage" in selected ? selected.usage : undefined;
    const cumulativeUsage = "cumulativeUsage" in selected ? selected.cumulativeUsage : undefined;
    const fullText = extractText(message) || (assistant?.text ?? "");
    const fullReasoning = extractReasoning(message) || (assistant?.reasoning ?? "");
    const toolInput = toolField(tool, "input");
    const toolOutput = toolField(tool, "output");
    const toolError = toolField(tool, "error");
    const toolMetadata = toolField(tool, "metadata");
    return /* @__PURE__ */ jsx_runtime3.jsxs("aside", {
      className: "inspector has-selection",
      children: [
        /* @__PURE__ */ jsx_runtime3.jsxs("div", {
          className: "inspector-head",
          children: [
            /* @__PURE__ */ jsx_runtime3.jsxs("div", {
              className: "inspector-title",
              children: [
                /* @__PURE__ */ jsx_runtime3.jsx("span", {
                  className: `kind kind-${selected.kind}`,
                  children: rowLabel(selected.kind)
                }),
                /* @__PURE__ */ jsx_runtime3.jsx("strong", {
                  children: selected.kind === "assistant" ? `Request #${assistant?.request ?? ""}` : selected.kind === "tool" ? toolRow?.name ?? "Tool" : selected.kind === "user" ? "User prompt" : selected.kind === "compaction" ? "Compaction" : selected.kind === "notice" ? selected.role : "Turn end"
                }),
                "status" in selected && selected.status ? /* @__PURE__ */ jsx_runtime3.jsx(StatusBadge2, {
                  status: selected.status
                }) : null
              ]
            }),
            /* @__PURE__ */ jsx_runtime3.jsx("button", {
              type: "button",
              className: "icon-button",
              onClick: onClose,
              title: "Close inspector",
              children: "×"
            })
          ]
        }),
        /* @__PURE__ */ jsx_runtime3.jsx("div", {
          className: "tabs",
          role: "tablist",
          children: tabs.map((name) => /* @__PURE__ */ jsx_runtime3.jsx("button", {
            type: "button",
            role: "tab",
            "aria-selected": tab === name,
            className: `tab${tab === name ? " active" : ""}`,
            onClick: () => setTab(name),
            children: name
          }, name))
        }),
        /* @__PURE__ */ jsx_runtime3.jsx("div", {
          className: "inspector-body",
          children: loading ? /* @__PURE__ */ jsx_runtime3.jsxs("div", {
            className: "inspector-loading",
            children: [
              /* @__PURE__ */ jsx_runtime3.jsx("div", {
                className: "spinner"
              }),
              " Loading record…"
            ]
          }) : error ? /* @__PURE__ */ jsx_runtime3.jsx("div", {
            className: "inspector-error",
            children: error
          }) : tab === "summary" ? /* @__PURE__ */ jsx_runtime3.jsxs("div", {
            className: "inspector-section",
            children: [
              /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                label: "Kind",
                value: rowLabel(selected.kind)
              }),
              selected.kind === "assistant" ? /* @__PURE__ */ jsx_runtime3.jsxs(jsx_runtime3.Fragment, {
                children: [
                  /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                    label: "Model",
                    value: `${assistant?.provider ?? "—"} / ${assistant?.modelID ?? "—"}`
                  }),
                  /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                    label: "Agent",
                    value: assistant?.agent ?? "—"
                  }),
                  /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                    label: "Status",
                    value: assistant?.status ?? "—"
                  }),
                  /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                    label: "Started",
                    value: formatTime(assistant?.time?.start)
                  }),
                  /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                    label: "First token",
                    value: formatTime(assistant?.time?.firstToken)
                  }),
                  /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                    label: "Completed",
                    value: formatTime(assistant?.time?.end)
                  }),
                  /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                    label: "TTFT",
                    value: formatDuration(assistant?.timing.ttftMs)
                  }),
                  /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                    label: "Duration",
                    value: formatDuration(assistant?.time?.duration)
                  }),
                  /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                    label: "Throughput",
                    value: formatRate(assistant?.timing.throughput)
                  }),
                  /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                    label: "Request header",
                    value: assistant?.headersMissing ? "not recorded" : "recorded"
                  }),
                  assistant?.finish ? /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                    label: "Finish",
                    value: assistant.finish
                  }) : null,
                  assistant?.error ? /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                    label: "Error",
                    value: /* @__PURE__ */ jsx_runtime3.jsx("span", {
                      className: "error-text",
                      children: assistant.error
                    })
                  }) : null,
                  assistant?.retry ? /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                    label: "Retry",
                    value: `attempt ${assistant.retry.attempt ?? "?"}${assistant.retry.error ? ` · ${assistant.retry.error}` : ""}`
                  }) : null
                ]
              }) : null,
              selected.kind === "tool" ? /* @__PURE__ */ jsx_runtime3.jsxs(jsx_runtime3.Fragment, {
                children: [
                  /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                    label: "Tool",
                    value: toolRow?.name ?? "—"
                  }),
                  /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                    label: "Status",
                    value: toolRow?.status ?? "—"
                  }),
                  /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                    label: "Started",
                    value: formatTime(toolRow?.time?.start)
                  }),
                  /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                    label: "Duration",
                    value: formatDuration(toolRow?.time?.duration)
                  }),
                  /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                    label: "Output chars",
                    value: String(toolRow?.outputLength ?? 0)
                  }),
                  toolRow?.error ? /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                    label: "Error",
                    value: /* @__PURE__ */ jsx_runtime3.jsx("span", {
                      className: "error-text",
                      children: toolRow.error
                    })
                  }) : null
                ]
              }) : null,
              selected.kind === "user" ? /* @__PURE__ */ jsx_runtime3.jsxs(jsx_runtime3.Fragment, {
                children: [
                  /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                    label: "Characters",
                    value: String(selected.textLength)
                  }),
                  /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                    label: "Attachments",
                    value: String(selected.files.length)
                  }),
                  /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                    label: "Steering",
                    value: selected.steer ? "yes" : "no"
                  })
                ]
              }) : null,
              selected.kind === "compaction" ? /* @__PURE__ */ jsx_runtime3.jsxs(jsx_runtime3.Fragment, {
                children: [
                  /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                    label: "Reason",
                    value: selected.reason ?? "—"
                  }),
                  /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                    label: "Status",
                    value: selected.status
                  }),
                  /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                    label: "Summary chars",
                    value: String(selected.summaryLength)
                  })
                ]
              }) : null,
              selected.kind === "notice" ? /* @__PURE__ */ jsx_runtime3.jsxs(jsx_runtime3.Fragment, {
                children: [
                  /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                    label: "Role",
                    value: selected.role
                  }),
                  selected.description ? /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                    label: "Description",
                    value: selected.description
                  }) : null
                ]
              }) : null
            ]
          }) : tab === "input" ? /* @__PURE__ */ jsx_runtime3.jsx("div", {
            className: "inspector-section",
            children: selected.kind === "user" ? /* @__PURE__ */ jsx_runtime3.jsxs(jsx_runtime3.Fragment, {
              children: [
                /* @__PURE__ */ jsx_runtime3.jsx(PreBlock, {
                  text: selected.text,
                  copy
                }),
                selected.files.length > 0 ? /* @__PURE__ */ jsx_runtime3.jsx("div", {
                  className: "file-list",
                  children: selected.files.map((file, index) => /* @__PURE__ */ jsx_runtime3.jsxs("div", {
                    className: "file-item",
                    children: [
                      /* @__PURE__ */ jsx_runtime3.jsx("span", {
                        children: file.name ?? `file ${index + 1}`
                      }),
                      /* @__PURE__ */ jsx_runtime3.jsxs("span", {
                        className: "subtle",
                        children: [
                          file.mime ?? "",
                          " ",
                          file.size ? `· ${file.size} bytes` : ""
                        ]
                      })
                    ]
                  }, index))
                }) : null
              ]
            }) : selected.kind === "tool" ? /* @__PURE__ */ jsx_runtime3.jsx(PreBlock, {
              text: safeJson(toolInput ?? toolRow?.inputPreview ?? {}),
              copy
            }) : /* @__PURE__ */ jsx_runtime3.jsx(PreBlock, {
              text: fullReasoning || "(no reasoning recorded)",
              copy
            })
          }) : tab === "output" ? /* @__PURE__ */ jsx_runtime3.jsx("div", {
            className: "inspector-section",
            children: selected.kind === "assistant" ? /* @__PURE__ */ jsx_runtime3.jsxs(jsx_runtime3.Fragment, {
              children: [
                /* @__PURE__ */ jsx_runtime3.jsx("h4", {
                  children: "Text"
                }),
                /* @__PURE__ */ jsx_runtime3.jsx(PreBlock, {
                  text: fullText,
                  copy
                }),
                /* @__PURE__ */ jsx_runtime3.jsx("h4", {
                  children: "Reasoning"
                }),
                /* @__PURE__ */ jsx_runtime3.jsx(PreBlock, {
                  text: fullReasoning || "(no reasoning)",
                  copy
                })
              ]
            }) : selected.kind === "tool" ? /* @__PURE__ */ jsx_runtime3.jsxs(jsx_runtime3.Fragment, {
              children: [
                /* @__PURE__ */ jsx_runtime3.jsx("h4", {
                  children: "Result"
                }),
                /* @__PURE__ */ jsx_runtime3.jsx(PreBlock, {
                  text: typeof toolOutput === "string" ? toolOutput : safeJson(toolOutput ?? toolRow?.outputPreview ?? ""),
                  copy
                }),
                toolError ? /* @__PURE__ */ jsx_runtime3.jsxs(jsx_runtime3.Fragment, {
                  children: [
                    /* @__PURE__ */ jsx_runtime3.jsx("h4", {
                      children: "Error"
                    }),
                    /* @__PURE__ */ jsx_runtime3.jsx(PreBlock, {
                      text: String(toolError),
                      copy
                    })
                  ]
                }) : null,
                toolMetadata ? /* @__PURE__ */ jsx_runtime3.jsxs(jsx_runtime3.Fragment, {
                  children: [
                    /* @__PURE__ */ jsx_runtime3.jsx("h4", {
                      children: "Metadata"
                    }),
                    /* @__PURE__ */ jsx_runtime3.jsx(PreBlock, {
                      text: safeJson(toolMetadata),
                      copy
                    })
                  ]
                }) : null
              ]
            }) : selected.kind === "compaction" ? /* @__PURE__ */ jsx_runtime3.jsx(PreBlock, {
              text: selected.summary || "(no summary)",
              copy
            }) : selected.kind === "notice" ? /* @__PURE__ */ jsx_runtime3.jsx(PreBlock, {
              text: selected.text || selected.command || "",
              copy
            }) : /* @__PURE__ */ jsx_runtime3.jsx(PreBlock, {
              text: selected.kind === "user" ? selected.text : "",
              copy
            })
          }) : tab === "timing" ? /* @__PURE__ */ jsx_runtime3.jsxs("div", {
            className: "inspector-section",
            children: [
              /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                label: "Started",
                value: `${formatClock(selected.time?.start)} · ${selected.time?.start ?? "—"}`
              }),
              selected.kind === "assistant" ? /* @__PURE__ */ jsx_runtime3.jsxs(jsx_runtime3.Fragment, {
                children: [
                  /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                    label: "First token",
                    value: `${formatClock(assistant?.time?.firstToken)} · ${assistant?.time?.firstToken ?? "—"}`
                  }),
                  /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                    label: "Completed",
                    value: `${formatClock(assistant?.time?.end)} · ${assistant?.time?.end ?? "—"}`
                  }),
                  /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                    label: "TTFT",
                    value: formatDuration(assistant?.timing.ttftMs)
                  }),
                  /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                    label: "Decode",
                    value: formatDuration(assistant?.timing.decodeMs)
                  }),
                  /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                    label: "Duration",
                    value: formatDuration(assistant?.time?.duration)
                  }),
                  /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                    label: "Throughput",
                    value: formatRate(assistant?.timing.throughput)
                  }),
                  /* @__PURE__ */ jsx_runtime3.jsx("p", {
                    className: "inspector-note",
                    children: "TTFT is measured from the assistant step start to the first streamed token. Running rows show no made-up duration."
                  })
                ]
              }) : /* @__PURE__ */ jsx_runtime3.jsxs(jsx_runtime3.Fragment, {
                children: [
                  /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                    label: "Duration",
                    value: formatDuration(selected.time?.duration)
                  }),
                  /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                    label: "Completed",
                    value: formatTime(selected.time?.end)
                  })
                ]
              })
            ]
          }) : tab === "usage" ? /* @__PURE__ */ jsx_runtime3.jsxs("div", {
            className: "inspector-section",
            children: [
              rowUsage ? /* @__PURE__ */ jsx_runtime3.jsxs(jsx_runtime3.Fragment, {
                children: [
                  /* @__PURE__ */ jsx_runtime3.jsx("h4", {
                    children: "This request"
                  }),
                  /* @__PURE__ */ jsx_runtime3.jsx("div", {
                    className: "usage-grid",
                    children: usageRows(rowUsage).map(([label, value]) => /* @__PURE__ */ jsx_runtime3.jsxs("div", {
                      className: "usage-cell",
                      children: [
                        /* @__PURE__ */ jsx_runtime3.jsx("span", {
                          children: label
                        }),
                        /* @__PURE__ */ jsx_runtime3.jsx("strong", {
                          children: value
                        })
                      ]
                    }, label))
                  })
                ]
              }) : null,
              cumulativeUsage ? /* @__PURE__ */ jsx_runtime3.jsxs(jsx_runtime3.Fragment, {
                children: [
                  /* @__PURE__ */ jsx_runtime3.jsx("h4", {
                    children: "Session cumulative"
                  }),
                  /* @__PURE__ */ jsx_runtime3.jsx("div", {
                    className: "usage-grid",
                    children: usageRows(cumulativeUsage).map(([label, value]) => /* @__PURE__ */ jsx_runtime3.jsxs("div", {
                      className: "usage-cell",
                      children: [
                        /* @__PURE__ */ jsx_runtime3.jsx("span", {
                          children: label
                        }),
                        /* @__PURE__ */ jsx_runtime3.jsx("strong", {
                          children: value
                        })
                      ]
                    }, label))
                  })
                ]
              }) : null,
              !rowUsage && !cumulativeUsage ? /* @__PURE__ */ jsx_runtime3.jsx("p", {
                className: "subtle",
                children: "No usage recorded for this row."
              }) : null
            ]
          }) : tab === "request" ? /* @__PURE__ */ jsx_runtime3.jsx("div", {
            className: "inspector-section",
            children: header ? /* @__PURE__ */ jsx_runtime3.jsxs(jsx_runtime3.Fragment, {
              children: [
                /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                  label: "Model",
                  value: `${header.model?.providerID ?? "—"} / ${header.model?.id ?? "—"}`
                }),
                /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                  label: "Variant",
                  value: header.model?.variant ?? "—"
                }),
                /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                  label: "Agent",
                  value: header.agent ?? "—"
                }),
                /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                  label: "Prompt messages",
                  value: String(header.messagesCount ?? "—")
                }),
                /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                  label: "System parts",
                  value: String(header.system?.length ?? 0)
                }),
                /* @__PURE__ */ jsx_runtime3.jsx(KeyValue, {
                  label: "Tools",
                  value: String(header.tools ? Object.keys(header.tools).length : 0)
                }),
                /* @__PURE__ */ jsx_runtime3.jsx("h4", {
                  children: "Options"
                }),
                /* @__PURE__ */ jsx_runtime3.jsx(PreBlock, {
                  text: safeJson(header.options ?? {}),
                  copy
                }),
                /* @__PURE__ */ jsx_runtime3.jsx("h4", {
                  children: "System prompt"
                }),
                (header.system ?? []).length > 0 ? (header.system ?? []).map((part, index) => /* @__PURE__ */ jsx_runtime3.jsx(PreBlock, {
                  text: part.text ?? "",
                  copy
                }, index)) : /* @__PURE__ */ jsx_runtime3.jsx("p", {
                  className: "subtle",
                  children: "No system parts recorded."
                }),
                /* @__PURE__ */ jsx_runtime3.jsx("h4", {
                  children: "Tools"
                }),
                header.tools && Object.keys(header.tools).length > 0 ? /* @__PURE__ */ jsx_runtime3.jsx("div", {
                  className: "tool-schema-list",
                  children: Object.entries(header.tools).map(([name, schema]) => /* @__PURE__ */ jsx_runtime3.jsxs("details", {
                    className: "tool-schema",
                    children: [
                      /* @__PURE__ */ jsx_runtime3.jsx("summary", {
                        children: name
                      }),
                      /* @__PURE__ */ jsx_runtime3.jsx(PreBlock, {
                        text: safeJson(schema, 30000),
                        copy
                      })
                    ]
                  }, name))
                }) : /* @__PURE__ */ jsx_runtime3.jsx("p", {
                  className: "subtle",
                  children: "No tools recorded."
                })
              ]
            }) : /* @__PURE__ */ jsx_runtime3.jsx("div", {
              className: "inspector-note",
              children: "This request was made before the collector captured request headers, or the header was not matched. Timing, tokens and tools are still available from the durable transcript."
            })
          }) : /* @__PURE__ */ jsx_runtime3.jsx("div", {
            className: "inspector-section",
            children: /* @__PURE__ */ jsx_runtime3.jsx(PreBlock, {
              text: safeJson(detail ?? selected, 80000),
              copy
            })
          })
        }),
        /* @__PURE__ */ jsx_runtime3.jsxs("div", {
          className: "inspector-foot",
          children: [
            /* @__PURE__ */ jsx_runtime3.jsx("span", {
              className: "subtle",
              children: sessionId
            }),
            directory ? /* @__PURE__ */ jsx_runtime3.jsx("span", {
              className: "subtle mono",
              title: directory,
              children: directory.split("/").slice(-2).join("/")
            }) : null
          ]
        })
      ]
    });
  };

  // src/App.tsx
  var jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
  var sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  function useLedger(host, sessionId, directory) {
    const [snapshot, setSnapshot] = import_react4.default.useState(null);
    const [failure, setFailure] = import_react4.default.useState(null);
    const [error, setError] = import_react4.default.useState(null);
    const [loading, setLoading] = import_react4.default.useState(true);
    const [refreshKey, setRefreshKey] = import_react4.default.useState(0);
    const hostRef = import_react4.default.useRef(host);
    hostRef.current = host;
    import_react4.default.useEffect(() => {
      let cancelled = false;
      let after = -1;
      setSnapshot(null);
      setFailure(null);
      setError(null);
      setLoading(true);
      const loop = async () => {
        while (!cancelled) {
          try {
            const result = await hostRef.current.serviceRequest({
              method: "GET",
              path: "/ledger",
              query: {
                sessionId,
                ...directory ? { directory } : {},
                afterSeq: String(after),
                wait: "8000",
                limitTurns: "80"
              }
            });
            if (cancelled)
              return;
            let body;
            try {
              body = JSON.parse(result.body);
            } catch {
              throw new Error(result.body || "Trajectory service returned an empty answer.");
            }
            if (!body || typeof body !== "object" || !("ok" in body)) {
              throw new Error("Trajectory service returned an invalid answer.");
            }
            const value = body;
            if (value.ok === false) {
              setFailure(value);
              setError(null);
              setLoading(false);
              await sleep(value.code === "collector_missing" ? 4000 : 2500);
              continue;
            }
            if ("changed" in value && value.changed === false) {
              setLoading(false);
              continue;
            }
            const next = value;
            setSnapshot(next);
            setFailure(null);
            setError(null);
            setLoading(false);
            after = next.revision;
          } catch (reason) {
            if (cancelled)
              return;
            const described = describeError(reason);
            setError(described.message);
            setLoading(false);
            await sleep(2500);
          }
        }
      };
      loop();
      return () => {
        cancelled = true;
      };
    }, [sessionId, directory, refreshKey]);
    return {
      snapshot,
      failure,
      error,
      loading,
      refresh: () => setRefreshKey((value) => value + 1)
    };
  }
  function matches(row, query) {
    if (!query)
      return true;
    const needle = query.toLowerCase();
    const parts = [
      row.kind,
      "text" in row ? row.text : "",
      "inputPreview" in row ? row.inputPreview : "",
      "outputPreview" in row ? row.outputPreview : "",
      "summary" in row ? row.summary : "",
      "name" in row ? row.name : "",
      "description" in row ? row.description : "",
      "modelID" in row ? row.modelID : "",
      "error" in row ? row.error : ""
    ];
    return parts.some((part) => typeof part === "string" && part.toLowerCase().includes(needle));
  }
  function buildItems(snapshot, query, collapsed) {
    const items = [];
    for (const turn of snapshot.turns) {
      const turnRows = (turn.rows?.length ?? 0) > 0 ? turn.rows : snapshot.rows.filter((row) => row.turn === turn.index);
      const matching = query ? turnRows.filter((row) => matches(row, query)) : turnRows;
      if (query && matching.length === 0)
        continue;
      items.push({ type: "turn", turn });
      if (!query && collapsed.has(turn.index))
        continue;
      for (const row of matching)
        items.push({ type: "row", row, turn });
    }
    if (snapshot.betweenTurns.length > 0) {
      const between = query ? snapshot.betweenTurns.filter((row) => matches(row, query)) : snapshot.betweenTurns;
      if (between.length > 0) {
        items.push({ type: "between", turn: null });
        for (const row of between)
          items.push({ type: "row", row, turn: null });
      }
    }
    return items;
  }
  var StatChip = ({ label, value, title }) => /* @__PURE__ */ jsx_runtime4.jsxs("span", {
    className: "stat-chip",
    title,
    children: [
      /* @__PURE__ */ jsx_runtime4.jsx("span", {
        className: "stat-label",
        children: label
      }),
      /* @__PURE__ */ jsx_runtime4.jsx("span", {
        className: "stat-value",
        children: value
      })
    ]
  });
  var FailurePanel = ({ failure, onRetry, host }) => {
    const install = failure.install ?? "opencode plugin add openchamber-trajectory-collector";
    return /* @__PURE__ */ jsx_runtime4.jsxs("div", {
      className: "state-panel",
      children: [
        /* @__PURE__ */ jsx_runtime4.jsx("div", {
          className: "state-icon",
          children: "◎"
        }),
        /* @__PURE__ */ jsx_runtime4.jsx("h2", {
          children: "Collector not running"
        }),
        /* @__PURE__ */ jsx_runtime4.jsx("p", {
          children: "The Trajectory view needs the OpenCode collector plugin. Install it once, then open a session so it can attach to this project."
        }),
        /* @__PURE__ */ jsx_runtime4.jsx("pre", {
          className: "install-command",
          children: install
        }),
        /* @__PURE__ */ jsx_runtime4.jsxs("div", {
          className: "state-actions",
          children: [
            /* @__PURE__ */ jsx_runtime4.jsx("button", {
              type: "button",
              className: "btn primary",
              onClick: () => {
                host.writeClipboard(install);
                host.toast({ kind: "success", message: "Install command copied." });
              },
              children: "Copy command"
            }),
            /* @__PURE__ */ jsx_runtime4.jsx("button", {
              type: "button",
              className: "btn",
              onClick: onRetry,
              children: "Retry"
            })
          ]
        }),
        /* @__PURE__ */ jsx_runtime4.jsx("p", {
          className: "state-note",
          children: failure.message ?? "The extension service could not find a live collector for this session."
        })
      ]
    });
  };
  var App = ({ host }) => {
    const [ready, setReady] = import_react4.default.useState(null);
    const [session, setSession] = import_react4.default.useState(null);
    import_react4.default.useEffect(() => {
      const offReady = host.onReady((ctx) => {
        applyHostReady(ctx, document.documentElement);
        document.body.dataset.surface = ctx.surface;
        setReady(ctx);
        setSession(ctx.session);
      });
      const offSession = host.onSession((next) => setSession(next));
      return () => {
        offReady();
        offSession();
      };
    }, [host]);
    if (!ready) {
      return /* @__PURE__ */ jsx_runtime4.jsxs("div", {
        className: "boot-screen",
        children: [
          /* @__PURE__ */ jsx_runtime4.jsx("div", {
            className: "spinner"
          }),
          /* @__PURE__ */ jsx_runtime4.jsx("span", {
            children: "Connecting to Trajectory…"
          })
        ]
      });
    }
    const activeSession = session ?? ready.session;
    if (!activeSession) {
      return /* @__PURE__ */ jsx_runtime4.jsxs("div", {
        className: "boot-screen",
        children: [
          /* @__PURE__ */ jsx_runtime4.jsx("div", {
            className: "state-icon",
            children: "◇"
          }),
          /* @__PURE__ */ jsx_runtime4.jsx("h2", {
            children: "No session open"
          }),
          /* @__PURE__ */ jsx_runtime4.jsx("p", {
            children: "Open a chat, then return to Trajectory."
          })
        ]
      });
    }
    return /* @__PURE__ */ jsx_runtime4.jsx(TrajectorySurface, {
      host,
      ready,
      session: activeSession
    }, `${activeSession.id}:${ready.directory ?? ""}`);
  };
  var TrajectorySurface = ({ host, ready, session }) => {
    const directory = ready.directory ?? null;
    const { snapshot, failure, error, loading, refresh } = useLedger(host, session.id, directory);
    const [query, setQuery] = import_react4.default.useState("");
    const [collapsed, setCollapsed] = import_react4.default.useState(() => new Set);
    const [selected, setSelected] = import_react4.default.useState(null);
    const [scrollTarget, setScrollTarget] = import_react4.default.useState(null);
    const [detail, setDetail] = import_react4.default.useState(null);
    const [detailLoading, setDetailLoading] = import_react4.default.useState(false);
    const [detailError, setDetailError] = import_react4.default.useState(null);
    const scrollRef = import_react4.default.useRef(null);
    const followingRef = import_react4.default.useRef(true);
    const pendingScrollRef = import_react4.default.useRef(false);
    const pendingScrollTimerRef = import_react4.default.useRef(null);
    const [following, setFollowing] = import_react4.default.useState(true);
    const items = import_react4.default.useMemo(() => snapshot ? buildItems(snapshot, query.trim(), collapsed) : [], [snapshot, query, collapsed]);
    import_react4.default.useEffect(() => {
      if (!selected) {
        setDetail(null);
        return;
      }
      let cancelled = false;
      setDetail(null);
      setDetailError(null);
      setDetailLoading(true);
      fetchRow(host, session.id, directory, selected.id).then((value) => {
        if (!cancelled)
          setDetail(value);
      }).catch((reason) => {
        if (!cancelled)
          setDetailError(describeError(reason).message);
      }).finally(() => {
        if (!cancelled)
          setDetailLoading(false);
      });
      return () => {
        cancelled = true;
      };
    }, [host, session.id, directory, selected?.id]);
    const onScroll = import_react4.default.useCallback(() => {
      const element = scrollRef.current;
      if (!element)
        return;
      if (pendingScrollRef.current) {
        followingRef.current = false;
        setFollowing(false);
        return;
      }
      const next = element.scrollHeight - element.scrollTop - element.clientHeight < 140;
      followingRef.current = next;
      setFollowing(next);
    }, []);
    const toggleTurn = import_react4.default.useCallback((index) => {
      setCollapsed((current) => {
        const next = new Set(current);
        if (next.has(index))
          next.delete(index);
        else
          next.add(index);
        return next;
      });
    }, []);
    const selectRow = import_react4.default.useCallback((row) => {
      setSelected(row);
    }, []);
    const focusFromTimeline = import_react4.default.useCallback((row) => {
      setQuery("");
      if (row.turn !== null) {
        setCollapsed((current) => {
          if (!current.has(row.turn))
            return current;
          const next = new Set(current);
          next.delete(row.turn);
          return next;
        });
      }
      setSelected(row);
      followingRef.current = false;
      setFollowing(false);
      pendingScrollRef.current = true;
      if (pendingScrollTimerRef.current !== null) {
        window.clearTimeout(pendingScrollTimerRef.current);
      }
      pendingScrollTimerRef.current = window.setTimeout(() => {
        pendingScrollRef.current = false;
        pendingScrollTimerRef.current = null;
      }, 1400);
      setScrollTarget({ id: row.id, nonce: Date.now() });
    }, []);
    const stats = snapshot?.stats;
    const status = snapshot ? snapshot.turns.some((turn) => turn.status === "running") ? "running" : "idle" : "idle";
    return /* @__PURE__ */ jsx_runtime4.jsxs("div", {
      className: "app",
      "data-surface": ready.surface,
      children: [
        /* @__PURE__ */ jsx_runtime4.jsxs("header", {
          className: "topbar",
          children: [
            /* @__PURE__ */ jsx_runtime4.jsxs("div", {
              className: "brand",
              children: [
                /* @__PURE__ */ jsx_runtime4.jsx("span", {
                  className: "brand-mark",
                  children: "⌁"
                }),
                /* @__PURE__ */ jsx_runtime4.jsxs("div", {
                  className: "brand-copy",
                  children: [
                    /* @__PURE__ */ jsx_runtime4.jsx("strong", {
                      children: "Trajectory"
                    }),
                    /* @__PURE__ */ jsx_runtime4.jsx("span", {
                      className: "session-title",
                      title: session.title,
                      children: session.title || session.id
                    })
                  ]
                }),
                /* @__PURE__ */ jsx_runtime4.jsx("span", {
                  className: `status-dot ${status}`,
                  title: status
                }),
                snapshot ? /* @__PURE__ */ jsx_runtime4.jsx("span", {
                  className: "live-label",
                  children: "live"
                }) : null
              ]
            }),
            /* @__PURE__ */ jsx_runtime4.jsxs("div", {
              className: "topbar-stats",
              children: [
                /* @__PURE__ */ jsx_runtime4.jsx(StatChip, {
                  label: "Turns",
                  value: String(snapshot?.totalTurns ?? 0)
                }),
                /* @__PURE__ */ jsx_runtime4.jsx(StatChip, {
                  label: "Steps",
                  value: String(stats?.steps ?? 0)
                }),
                /* @__PURE__ */ jsx_runtime4.jsx(StatChip, {
                  label: "Tools",
                  value: String(stats?.tools ?? 0)
                }),
                /* @__PURE__ */ jsx_runtime4.jsx(StatChip, {
                  label: "Tokens",
                  value: formatTokens(stats ? stats.usage.input + stats.usage.output + stats.usage.reasoning + stats.usage.cacheRead + stats.usage.cacheWrite : 0),
                  title: "input + output + reasoning + cache"
                }),
                /* @__PURE__ */ jsx_runtime4.jsx(StatChip, {
                  label: "Cost",
                  value: formatCost(stats?.cost ?? 0)
                })
              ]
            }),
            /* @__PURE__ */ jsx_runtime4.jsxs("div", {
              className: "topbar-actions",
              children: [
                /* @__PURE__ */ jsx_runtime4.jsxs("label", {
                  className: "search",
                  children: [
                    /* @__PURE__ */ jsx_runtime4.jsx("span", {
                      className: "search-icon",
                      children: "⌕"
                    }),
                    /* @__PURE__ */ jsx_runtime4.jsx("input", {
                      value: query,
                      onChange: (event) => setQuery(event.target.value),
                      placeholder: "Search trajectory",
                      spellCheck: false
                    }),
                    query ? /* @__PURE__ */ jsx_runtime4.jsx("button", {
                      type: "button",
                      className: "icon-button",
                      onClick: () => setQuery(""),
                      title: "Clear search",
                      children: "×"
                    }) : null
                  ]
                }),
                /* @__PURE__ */ jsx_runtime4.jsx("button", {
                  type: "button",
                  className: "icon-button",
                  onClick: refresh,
                  title: "Refresh",
                  children: "↻"
                })
              ]
            })
          ]
        }),
        failure ? /* @__PURE__ */ jsx_runtime4.jsx(FailurePanel, {
          failure,
          host,
          onRetry: refresh
        }) : error && !snapshot ? /* @__PURE__ */ jsx_runtime4.jsxs("div", {
          className: "state-panel compact",
          children: [
            /* @__PURE__ */ jsx_runtime4.jsx("h2", {
              children: "Trajectory unavailable"
            }),
            /* @__PURE__ */ jsx_runtime4.jsx("p", {
              children: error
            }),
            /* @__PURE__ */ jsx_runtime4.jsx("button", {
              type: "button",
              className: "btn",
              onClick: refresh,
              children: "Retry"
            })
          ]
        }) : loading && !snapshot ? /* @__PURE__ */ jsx_runtime4.jsxs("div", {
          className: "boot-screen",
          children: [
            /* @__PURE__ */ jsx_runtime4.jsx("div", {
              className: "spinner"
            }),
            /* @__PURE__ */ jsx_runtime4.jsx("span", {
              children: "Loading trajectory…"
            })
          ]
        }) : snapshot ? /* @__PURE__ */ jsx_runtime4.jsxs(jsx_runtime4.Fragment, {
          children: [
            /* @__PURE__ */ jsx_runtime4.jsx(Timeline, {
              snapshot,
              selectedId: selected?.id ?? null,
              onSelect: focusFromTimeline
            }),
            /* @__PURE__ */ jsx_runtime4.jsxs("div", {
              className: "workspace",
              children: [
                /* @__PURE__ */ jsx_runtime4.jsx("div", {
                  className: "ledger-column",
                  children: /* @__PURE__ */ jsx_runtime4.jsx(Ledger, {
                    items,
                    snapshot,
                    selectedId: selected?.id ?? null,
                    collapsed,
                    following,
                    scrollRef,
                    scrollTarget,
                    onScroll,
                    onToggleTurn: toggleTurn,
                    onSelect: selectRow,
                    onJumpLatest: () => {
                      const element = scrollRef.current;
                      if (element)
                        element.scrollTop = element.scrollHeight;
                      followingRef.current = true;
                      setFollowing(true);
                    }
                  })
                }),
                /* @__PURE__ */ jsx_runtime4.jsx(Inspector, {
                  host,
                  sessionId: session.id,
                  directory,
                  selected,
                  detail,
                  loading: detailLoading,
                  error: detailError,
                  onClose: () => setSelected(null)
                })
              ]
            })
          ]
        }) : /* @__PURE__ */ jsx_runtime4.jsxs("div", {
          className: "state-panel compact",
          children: [
            /* @__PURE__ */ jsx_runtime4.jsx("h2", {
              children: "Waiting for the collector"
            }),
            /* @__PURE__ */ jsx_runtime4.jsx("p", {
              children: "Open the session once and the collector will attach on the next model step."
            }),
            /* @__PURE__ */ jsx_runtime4.jsx("button", {
              type: "button",
              className: "btn",
              onClick: refresh,
              children: "Retry"
            })
          ]
        })
      ]
    });
  };

  // src/main.tsx
  var jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
  var container = document.getElementById("root");

  class AppErrorBoundary extends import_react5.default.Component {
    state = { error: null };
    static getDerivedStateFromError(error) {
      return { error };
    }
    componentDidCatch(error) {
      console.error("trajectory: app crashed", error);
    }
    render() {
      if (this.state.error) {
        return /* @__PURE__ */ jsx_runtime5.jsxs("div", {
          className: "boot-screen",
          children: [
            /* @__PURE__ */ jsx_runtime5.jsx("div", {
              className: "state-icon",
              children: "!"
            }),
            /* @__PURE__ */ jsx_runtime5.jsx("h2", {
              children: "Trajectory crashed"
            }),
            /* @__PURE__ */ jsx_runtime5.jsx("pre", {
              className: "install-command",
              children: this.state.error.message
            }),
            /* @__PURE__ */ jsx_runtime5.jsx("p", {
              className: "state-note",
              children: "Reload the panel or open the browser console for the full stack."
            })
          ]
        });
      }
      return this.props.children;
    }
  }
  var renderFatal = (error) => {
    if (!container)
      return;
    const message = error instanceof Error ? `${error.message}

${error.stack ?? ""}` : String(error);
    import_client.createRoot(container).render(/* @__PURE__ */ jsx_runtime5.jsxs("div", {
      className: "boot-screen",
      children: [
        /* @__PURE__ */ jsx_runtime5.jsx("div", {
          className: "state-icon",
          children: "!"
        }),
        /* @__PURE__ */ jsx_runtime5.jsx("h2", {
          children: "Trajectory could not start"
        }),
        /* @__PURE__ */ jsx_runtime5.jsx("pre", {
          className: "install-command",
          children: message
        }),
        /* @__PURE__ */ jsx_runtime5.jsx("p", {
          className: "state-note",
          children: "This page must be opened inside OpenChamber."
        })
      ]
    }));
  };
  if (!container) {
    throw new Error("trajectory: #root is missing");
  }
  try {
    const host = connectHost();
    import_client.createRoot(container).render(/* @__PURE__ */ jsx_runtime5.jsx(import_react5.default.StrictMode, {
      children: /* @__PURE__ */ jsx_runtime5.jsx(AppErrorBoundary, {
        children: /* @__PURE__ */ jsx_runtime5.jsx(App, {
          host
        })
      })
    }));
  } catch (error) {
    renderFatal(error);
  }
  window.addEventListener("error", (event) => {
    if (container.childElementCount === 0)
      renderFatal(event.error ?? event.message);
  });
  window.addEventListener("unhandledrejection", (event) => {
    console.error("trajectory: unhandled rejection", event.reason);
  });
})();
