class EventEmitter {
  constructor() {
    this._events = {};
  }

  on(event, handler) {
    if (!handler) throw new TypeError("invalid handler! --EventEmitter");
    this._events[event] = this._events[event] || [];

    const listener = {
      event,
      handler,
      emitter: this,
      listenBy: null,
      destroyed: false,
      unregister() {
        this.emitter.off(this.event, this);
        this._destroy();
      },
      _destroy() {
        if (this.destroyed) return false;
        this.handler = null;
        this.emitter = null;
        this.destroyed = true;
        return true;
      }
    };

    this._events[event].push(listener);
    return listener;
  }

  listenBy(listenBy, event, handler) {
    if (!handler) throw new TypeError("invalid handler! --EventEmitter");
    this._events[event] = this._events[event] || [];

    const listener = {
      event,
      handler,
      emitter: this,
      listenBy,
      destroyed: false,
      unregister() {
        this.emitter.off(this.event, this);
        this._destroy();
      },
      _destroy() {
        if (this.destroyed) return false;
        this.handler = null;
        this.emitter = null;
        this.destroyed = true;
        return true;
      }
    };

    this._events[event].push(listener);
    return listener;
  }

  emit(event, data = null) {
    if (!this._events[event]) return false;

    for (const listener of this._events[event]) {
      if (!listener.destroyed) {
        listener.handler.call(this, data);
      }
    }
    return true;
  }

  off(event, listener) {
    if (!this._events[event]) return false;

    if (listener) {
      this._events[event] = this._events[event].filter(l => l !== listener);
      if (this._events[event].length === 0) {
        delete this._events[event];
      }
      return true;
    }

    // Remove all listeners for event
    for (const l of this._events[event]) {
      l._destroy();
    }
    delete this._events[event];
    return true;
  }

  stopListenBy(listenBy) {
    for (const event in this._events) {
      this._events[event] = this._events[event].filter(listener => {
        if (listener.listenBy === listenBy) {
          listener._destroy();
          return false;
        }
        return true;
      });
    }
  }

  removeAllListeners() {
    for (const event in this._events) {
      const listeners = this._events[event];
      if (listeners) {
        for (let i = 0; i < listeners.length; i++) {
          listeners[i]._destroy();
        }
        this._events[event] = null;
      }
    }
    this._events = {};
  }
}

export default EventEmitter;