// E-Cell Application - Main JavaScript File
// Extracted from the original Manus Space application

// Polyfill for module preload
(function() {
    const relList = document.createElement("link").relList;
    if (relList && relList.supports && relList.supports("modulepreload")) return;
    
    for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
        preload(link);
    }
    
    new MutationObserver(mutations => {
        for (const mutation of mutations) {
            if (mutation.type === "childList") {
                for (const node of mutation.addedNodes) {
                    if (node.tagName === "LINK" && node.rel === "modulepreload") {
                        preload(node);
                    }
                }
            }
        }
    }).observe(document, { childList: true, subtree: true });
    
    function fetchModule(link) {
        const options = {};
        if (link.integrity) options.integrity = link.integrity;
        if (link.referrerPolicy) options.referrerPolicy = link.referrerPolicy;
        if (link.crossOrigin === "use-credentials") {
            options.credentials = "include";
        } else if (link.crossOrigin === "anonymous") {
            options.credentials = "omit";
        } else {
            options.credentials = "same-origin";
        }
        return options;
    }
    
    function preload(link) {
        if (link.ep) return;
        link.ep = true;
        const options = fetchModule(link);
        fetch(link.href, options);
    }
})();

// Event Emitter Class
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
}

// Global Event Emitter
const globalEvents = new EventEmitter();

// View Type Manager
class ViewTypeManager {
    constructor() {
        this.viewType = "default";
        this.prevViewType = "default";
    }
    
    setViewType(type) {
        this.prevViewType = this.viewType;
        this.viewType = type;
        globalEvents.emit("onViewTypeChange", {});
    }
}

const viewManager = new ViewTypeManager();

// Toast Manager
class ToastManager {
    constructor() {
        this.currentToasts = [];
        this.rootContainer = null;
    }
    
    initRoot(container) {
        this.rootContainer = document.createElement("div");
        this.rootContainer.id = "toast-manager-container";
        this.rootContainer.className = "toast-manager-container";
        container.appendChild(this.rootContainer);
    }
    
    showToast({ title, variant = "success" }) {
        if (!this.rootContainer) {
            this.initRoot(document.body);
        }
        
        const toastContainer = document.createElement("div");
        toastContainer.style.pointerEvents = "auto";
        this.rootContainer.prepend(toastContainer);
        
        const toast = new Toast(toastContainer, { title, variant });
        this.currentToasts.push(toast);
        toast.show();
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            this.removeToast(toast);
        }, 3000);
    }
    
    removeToast(toast) {
        this.currentToasts = this.currentToasts.filter(t => t !== toast);
        if (toast.container && toast.container.parentNode) {
            toast.container.parentNode.removeChild(toast.container);
        }
    }
    
    clearAllToasts() {
        this.currentToasts.forEach(toast => this.removeToast(toast));
        this.currentToasts = [];
    }
}

// Toast Component
class Toast {
    constructor(container, config) {
        this.container = container;
        this.config = config;
    }
    
    get template() {
        const { variant, title } = this.config;
        const className = `toast toast--${variant}`;
        
        const successIcon = `
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM14.0711 7.29289C14.4616 6.90237 15.0948 6.90237 15.4853 7.29289C15.8758 7.68342 15.8758 8.31658 15.4853 8.70711L9.57107 14.6213C9.18055 15.0118 8.54738 15.0118 8.15686 14.6213L4.51472 10.9792C4.1242 10.5886 4.1242 9.95543 4.51472 9.5649C4.90525 9.17438 5.53841 9.17438 5.92893 9.5649L8.86396 12.4999L14.0711 7.29289Z"
                    fill="#25BA3B"
                />
            </svg>
        `;
        
        return `
            <div class="${className}">
                <div class="toast__icon-wrapper">${variant === "success" ? successIcon : ""}</div>
                <div class="toast__message">${title}</div>
            </div>
        `;
    }
    
    show() {
        this.container.innerHTML = this.template;
        const toastElement = this.container.querySelector(".toast");
        
        if (toastElement) {
            requestAnimationFrame(() => {
                toastElement.classList.add("is-visible");
            });
        }
    }
    
    destroy() {
        const toastElement = this.container.querySelector(".toast");
        if (toastElement) {
            toastElement.classList.remove("is-visible");
            toastElement.addEventListener("transitionend", () => {
                if (this.container && this.container.parentNode) {
                    this.container.parentNode.removeChild(this.container);
                }
            }, { once: true });
        }
    }
}

// Global Toast Manager Instance
const toastManager = new ToastManager();

// Dialog Component
class Dialog extends HTMLElement {
    constructor() {
        super();
        this._dialogElement = null;
        this._isOpen = false;
        this._title = "Dialog";
        this._isClosable = true;
        this._shadowRoot = this.attachShadow({ mode: "open" });
        this._render();
    }
    
    static get observedAttributes() {
        return ["open", "title", "closable", "width"];
    }
    
    connectedCallback() {
        this._isOpen = this.hasAttribute("open");
        this._title = this.getAttribute("title") || this._title;
        this._isClosable = this.getAttribute("closable") !== "false";
        
        const width = this.getAttribute("width");
        if (width) {
            this.style.setProperty("--dynamic-dialog-width", width);
        } else {
            this.style.removeProperty("--dynamic-dialog-width");
        }
        
        this._render();
        this._dialogElement = this._shadowRoot.querySelector("dialog");
        
        if (this._dialogElement) {
            this._dialogElement.addEventListener("click", (e) => {
                if (this._isClosable && e.target === this._dialogElement) {
                    this.close();
                }
            });
            
            this._dialogElement.addEventListener("close", () => {
                if (this._isOpen) {
                    this._isOpen = false;
                    if (this.hasAttribute("open")) {
                        this.removeAttribute("open");
                    }
                    this._dispatchCloseEvent();
                }
            });
            
            if (this._isOpen && !this._dialogElement.open) {
                this._dialogElement.showModal();
                this._dispatchOpenEvent();
            }
        }
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        const wasOpen = this._isOpen;
        let shouldRerender = false;
        
        if (name === "open") {
            const isOpen = newValue !== null;
            if (this._isOpen !== isOpen) {
                this._isOpen = isOpen;
            }
            
            if (this._dialogElement) {
                if (this._isOpen) {
                    if (!this._dialogElement.open) {
                        this._dialogElement.showModal();
                        if (!wasOpen) this._dispatchOpenEvent();
                    }
                } else {
                    if (this._dialogElement.open) {
                        this._dialogElement.close();
                    }
                }
            }
        } else if (name === "title") {
            const title = newValue || "Dialog";
            if (this._title !== title) {
                this._title = title;
                shouldRerender = true;
            }
        } else if (name === "closable") {
            const closable = newValue !== "false";
            if (this._isClosable !== closable) {
                this._isClosable = closable;
                shouldRerender = true;
            }
        } else if (name === "width") {
            if (newValue !== null) {
                this.style.setProperty("--dynamic-dialog-width", newValue);
            } else {
                this.style.removeProperty("--dynamic-dialog-width");
            }
        }
        
        if (shouldRerender) {
            this._render();
        }
    }
    
    show() {
        if (this._isOpen) {
            if (this._dialogElement && !this._dialogElement.open) {
                this._dialogElement.showModal();
                this._dispatchOpenEvent();
            }
        } else {
            this.setAttribute("open", "");
        }
    }
    
    close() {
        if (this._isOpen) {
            this.removeAttribute("open");
        } else {
            if (this._dialogElement && this._dialogElement.open) {
                this._dialogElement.close();
            }
        }
    }
    
    _handleCloseButtonClick() {
        this.close();
    }
    
    _dispatchOpenEvent() {
        this.dispatchEvent(new CustomEvent("dialog-open", {
            bubbles: true,
            composed: true
        }));
    }
    
    _dispatchCloseEvent() {
        this.dispatchEvent(new CustomEvent("dialog-close", {
            bubbles: true,
            composed: true
        }));
    }
    
    _render() {
        const template = `
            <style>
                :host {
                    --lit-html-dialog-default-width: 400px;
                    --lit-html-dialog-font-family: 'SF Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                    --lit-html-dialog-surface-bg: white;
                    --lit-html-dialog-border-main: rgba(0, 0, 0, 0.06);
                    --lit-html-dialog-text-primary: #34322D;
                    --lit-html-dialog-text-tertiary: #858481;
                    --lit-html-dialog-text-white: white;
                    --lit-html-dialog-icon-tertiary: #858481;
                    --lit-html-dialog-border-btn-main: rgba(0, 0, 0, 0.12);
                    --lit-html-dialog-function-error-bg: #F25A5A;
                    --lit-html-dialog-button-default-bg: transparent;
                    --lit-html-dialog-box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.15);
                    --lit-html-dialog-border-radius: 20px;
                }
                
                dialog {
                    width: var(--dynamic-dialog-width, var(--lit-html-dialog-default-width));
                    max-width: 90vw;
                    background: var(--lit-html-dialog-surface-bg);
                    box-shadow: var(--lit-html-dialog-box-shadow);
                    border-radius: var(--lit-html-dialog-border-radius);
                    border: 1px var(--lit-html-dialog-border-main) solid;
                    padding: 0;
                    margin: auto;
                    overflow: visible;
                }
                
                dialog::backdrop {
                    background: rgba(0, 0, 0, 0.3);
                }
                
                .dialog-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    padding: 20px 16px 10px 20px;
                    gap: 10px;
                }
                
                .dialog-title {
                    flex: 1 1 0;
                    color: var(--lit-html-dialog-text-primary);
                    font-size: 18px;
                    font-family: var(--lit-html-dialog-font-family);
                    font-weight: 600;
                    line-height: 24px;
                    word-wrap: break-word;
                }
                
                .dialog-close-button {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 0;
                    width: 28px;
                    height: 28px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: var(--lit-html-dialog-icon-tertiary);
                    font-size: 18px;
                    font-family: var(--lit-html-dialog-font-family);
                    font-weight: 500;
                    line-height: 1;
                }
                
                .dialog-close-button:hover {
                    color: var(--lit-html-dialog-text-primary);
                }
                
                .dialog-body {
                    padding: 0px 20px;
                    color: var(--lit-html-dialog-text-tertiary);
                    font-size: 14px;
                    font-family: var(--lit-html-dialog-font-family);
                    font-weight: 400;
                    line-height: 22px;
                    word-wrap: break-word;
                }
                
                .dialog-footer {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    gap: 12px;
                    padding: 20px;
                }
            </style>
            
            <dialog part="dialog">
                <div class="dialog-header" part="header">
                    <div class="dialog-title" part="title">${this._title}</div>
                    ${this._isClosable ? `
                        <button
                            type="button"
                            class="dialog-close-button"
                            part="close-button"
                            aria-label="Close dialog"
                        >
                            &#x2715;
                        </button>
                    ` : ""}
                </div>
                <div class="dialog-body" part="body">
                    <slot></slot>
                </div>
                <div class="dialog-footer" part="footer">
                    <slot name="footer"></slot>
                </div>
            </dialog>
        `;
        
        this._shadowRoot.innerHTML = template;
        
        // Add event listener to close button
        const closeButton = this._shadowRoot.querySelector('.dialog-close-button');
        if (closeButton) {
            closeButton.addEventListener('click', () => this._handleCloseButtonClick());
        }
    }
}

// Popup Component
class Popup extends HTMLElement {
    constructor() {
        super();
        this.anchor = null;
        this.popupContent = null;
        this.isOpen = false;
        this.scrollListener = null;
        this._ref = null;
        this._customClass = "";
        this.mousePosition = null;
        this.gapSize = 10;
        this.attachShadow({ mode: "open" });
        this.render();
    }
    
    static get observedAttributes() {
        return ["open", "ref", "class"];
    }
    
    connectedCallback() {
        this.scrollListener = () => {
            if (this.isOpen) this.updatePosition();
        };
        window.addEventListener("scroll", this.scrollListener, true);
        
        if (this._ref) this._ref(this);
    }
    
    disconnectedCallback() {
        if (this.scrollListener) {
            window.removeEventListener("scroll", this.scrollListener, true);
        }
        this.destroy();
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "open") {
            this.isOpen = newValue !== null;
            this.render();
            if (this.isOpen) {
                setTimeout(() => this.updatePosition(), 0);
            }
        } else if (name === "class") {
            this._customClass = newValue || "";
            this.render();
        }
    }
    
    setAnchor(element) {
        this.anchor = element;
        if (this.isOpen) this.updatePosition();
    }
    
    open(event) {
        this.isOpen = true;
        this.setAttribute("open", "");
        
        if (event) {
            this.mousePosition = { x: event.clientX, y: event.clientY };
            const target = event.target;
            if (target) this.setAnchor(target);
        } else {
            this.mousePosition = null;
        }
        
        this.render();
        setTimeout(() => this.updatePosition(), 0);
    }
    
    close() {
        this.isOpen = false;
        this.mousePosition = null;
        this.removeAttribute("open");
        this.render();
    }
    
    updatePosition() {
        if (!this.popupContent) return;
        
        const rect = this.popupContent.getBoundingClientRect();
        let top, left, position = "bottom";
        
        if (this.anchor) {
            top = this.anchor.getBoundingClientRect().bottom + this.gapSize;
        } else if (this.mousePosition) {
            top = this.mousePosition.y + this.gapSize;
        } else {
            top = window.innerHeight / 2 - rect.height / 2;
            left = window.innerWidth / 2 - rect.width / 2;
            this.updatePopupStyles(top, left, position);
            return;
        }
        
        if (this.mousePosition) {
            left = this.mousePosition.x - rect.width / 2;
        } else if (this.anchor) {
            const anchorRect = this.anchor.getBoundingClientRect();
            left = anchorRect.left + anchorRect.width / 2 - rect.width / 2;
        } else {
            left = window.innerWidth / 2 - rect.width / 2;
        }
        
        // Boundary checks
        if (left + rect.width > window.innerWidth) {
            left = window.innerWidth - rect.width - 10;
        }
        if (left < 10) left = 10;
        
        if (top + rect.height > window.innerHeight) {
            position = "top";
            if (this.anchor) {
                top = this.anchor.getBoundingClientRect().top - rect.height - this.gapSize;
            } else if (this.mousePosition) {
                top = this.mousePosition.y - rect.height - this.gapSize;
            }
            
            if (top < 0) {
                top = window.innerHeight / 2 - rect.height / 2;
                position = "bottom";
            }
        }
        
        this.updatePopupStyles(top, left, position);
    }
    
    updatePopupStyles(top, left, position) {
        if (this.popupContent) {
            this.popupContent.style.position = "fixed";
            this.popupContent.style.top = `${top}px`;
            this.popupContent.style.left = `${left}px`;
            this.popupContent.setAttribute("data-position", position);
        }
    }
    
    render() {
        const template = `
            <style>
                :host {
                    display: block;
                }
                
                .popup-content {
                    display: ${this.isOpen ? "block" : "none"};
                    position: fixed;
                    z-index: 1000;
                }
                
                .popup-content[data-position='bottom']::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: -${this.gapSize}px;
                    height: ${this.gapSize}px;
                }
                
                .popup-content[data-position='top']::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: -${this.gapSize}px;
                    height: ${this.gapSize}px;
                }
            </style>
            <div class="popup-content ${this._customClass}" data-position="bottom">
                <slot></slot>
            </div>
        `;
        
        this.shadowRoot.innerHTML = template;
        this.popupContent = this.shadowRoot.querySelector(".popup-content");
    }
    
    destroy() {
        this.shadowRoot.innerHTML = '';
    }
}

// Textarea Component
class Textarea extends HTMLElement {
    constructor() {
        super();
        this.textareaRef = null;
        this._value = "";
        this._autoResize = false;
        this._autoFocus = false;
        this._placeholder = "";
        this._disabled = false;
        this.resizeObserver = null;
    }
    
    static get observedAttributes() {
        return ["auto-resize", "value", "autofocus", "class", "placeholder", "disabled", "rows", "cols"];
    }
    
    connectedCallback() {
        this._render();
        if (this.textareaRef) {
            if (this._autoResize) {
                this._setupAutoResize();
                this.adjustHeight();
            }
            if (this._autoFocus) {
                this.textareaRef.focus();
                const length = this.textareaRef.value.length;
                this.textareaRef.setSelectionRange(length, length);
            }
        }
    }
    
    disconnectedCallback() {
        this._teardownAutoResize();
    }
    
    adjustHeight = () => {
        const textarea = this.textareaRef;
        if (!textarea || !this._autoResize) return;
        
        const scrollTop = textarea.scrollTop;
        const computedStyle = window.getComputedStyle(textarea);
        const borderTop = parseInt(computedStyle.borderTopWidth, 10) || 0;
        const borderBottom = parseInt(computedStyle.borderBottomWidth, 10) || 0;
        
        const clone = textarea.cloneNode(true);
        clone.style.position = "absolute";
        clone.style.visibility = "hidden";
        clone.style.height = "auto";
        clone.style.width = computedStyle.width;
        clone.style.minHeight = computedStyle.minHeight;
        clone.style.maxHeight = computedStyle.maxHeight;
        clone.style.padding = computedStyle.padding;
        clone.style.font = computedStyle.font;
        clone.style.lineHeight = computedStyle.lineHeight;
        clone.style.letterSpacing = computedStyle.letterSpacing;
        clone.style.wordSpacing = computedStyle.wordSpacing;
        clone.style.whiteSpace = computedStyle.whiteSpace;
        clone.style.wordBreak = computedStyle.wordBreak;
        clone.style.boxSizing = computedStyle.boxSizing;
        
        document.body.appendChild(clone);
        
        let height = clone.scrollHeight;
        if (computedStyle.boxSizing !== "border-box") {
            height += borderTop + borderBottom;
        }
        height = clone.scrollHeight + borderTop + borderBottom;
        
        document.body.removeChild(clone);
        
        const minHeight = parseFloat(computedStyle.minHeight) || 0;
        const maxHeight = parseFloat(computedStyle.maxHeight) || Infinity;
        height = Math.max(minHeight, Math.min(height, maxHeight));
        
        textarea.style.height = `${height}px`;
        textarea.scrollTop = scrollTop;
    }
    
    handleInput = (event) => {
        const textarea = event.target;
        this._value = textarea.value;
        
        if (this._autoResize) {
            this.adjustHeight();
        }
        
        this.dispatchEvent(new CustomEvent("lit-textarea-input", {
            detail: { value: this._value },
            bubbles: true,
            composed: true
        }));
        
        this.dispatchEvent(new Event("input", {
            bubbles: true,
            composed: true
        }));
    }
    
    _setupAutoResize() {
        if (!this.textareaRef || this.resizeObserver) return;
        
        window.addEventListener("resize", this.adjustHeight);
        this.resizeObserver = new ResizeObserver(this.adjustHeight);
        this.resizeObserver.observe(this.textareaRef);
    }
    
    _teardownAutoResize() {
        window.removeEventListener("resize", this.adjustHeight);
        if (this.resizeObserver) {
            if (this.textareaRef) {
                this.resizeObserver.unobserve(this.textareaRef);
            }
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
        }
    }
    
    _render() {
        const template = `
            <style>
                .internal-textarea:disabled {
                    cursor: not-allowed;
                    opacity: 0.7;
                }
                
                .internal-textarea {
                    width: 100%;
                    background: transparent;
                    border: none;
                    resize: none;
                    overflow: hidden;
                }
                
                .internal-textarea:focus {
                    outline: none;
                }
            </style>
            <textarea
                part="textarea"
                class="internal-textarea"
                ${this._disabled ? 'disabled' : ''}
                placeholder="${this._placeholder || ''}"
                ${this._autoFocus ? 'autofocus' : ''}
                ${this._rows !== undefined ? `rows="${this._rows}"` : this._autoResize ? 'rows="1"' : ''}
                ${this._cols !== undefined ? `cols="${this._cols}"` : ''}
                aria-label="${this.getAttribute('aria-label') || this._placeholder || 'textarea'}"
            >${this._value}</textarea>
        `;
        
        this.innerHTML = template;
        this.textareaRef = this.querySelector('textarea');
        
        if (this.textareaRef) {
            this.textareaRef.addEventListener('input', this.handleInput);
            this.textareaRef.addEventListener('focus', () => {
                this.dispatchEvent(new FocusEvent('focus', { bubbles: false, composed: true }));
            });
            this.textareaRef.addEventListener('blur', () => {
                this.dispatchEvent(new FocusEvent('blur', { bubbles: false, composed: true }));
            });
            
            if (this.textareaRef.value !== this._value) {
                this.textareaRef.value = this._value;
            }
        }
        
        if (this._autoFocus) {
            setTimeout(() => {
                if (this.textareaRef) this.textareaRef.focus();
            }, 0);
        }
    }
}

// Content Root Component
class ContentRoot extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    
    connectedCallback() {
        const container = document.createElement("div");
        container.id = "content-root";
        this.shadowRoot.appendChild(container);
        
        const style = document.createElement("style");
        style.textContent = `
            #content-root {
                font-family: 'SF Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            }
        `;
        container.appendChild(style);
        
        // Initialize toast manager
        toastManager.initRoot(container);
        
        // Dispatch analytics events
        this.dispatchAnalytics();
    }
    
    dispatchAnalytics() {
        // Track session file view
        if (window.plausible) {
            window.plausible('custom-event', {
                name: 'session_file_view',
                props: { type: 'space' }
            });
            
            window.plausible('custom-event', {
                name: 'manus_space_show'
            });
        }
    }
}

// Utility Functions
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function isNextJS() {
    return [
        () => typeof window !== 'undefined' && window.__NEXT_DATA__,
        () => document.getElementById('__next') !== null,
        () => document.querySelectorAll('script[src*="_next/"]').length > 0,
        () => document.querySelectorAll('link[href*="_next/"]').length > 0
    ].some(check => check());
}

function removeURLParams(params, replace = true) {
    if (typeof window === 'undefined') return;
    
    const url = new URL(window.location.href);
    params.forEach(param => {
        url.searchParams.delete(param);
    });
    
    if (replace) {
        window.history.pushState({}, '', url.toString());
    }
}

function waitForReady() {
    let isReady = false;
    let waitingPromises = [];
    
    return {
        get ready() {
            return isReady;
        },
        markReady: () => {
            if (!isReady) {
                isReady = true;
                waitingPromises.forEach(({ resolve }) => resolve());
                waitingPromises = [];
            }
        },
        waitReady: async () => {
            if (isReady) return true;
            return new Promise((resolve, reject) => {
                waitingPromises.push({ resolve, reject });
            });
        },
        onReady(callback) {
            this.waitReady().then(callback);
        },
        clear: () => {
            isReady = false;
            waitingPromises.forEach(({ reject }) => reject());
            waitingPromises = [];
        }
    };
}

// Initialize Application
function initializeApp() {
    // Register custom elements
    customElements.define("lit-textarea", Textarea);
    customElements.define("lit-popup", Popup);
    customElements.define("lit-dialog", Dialog);
    customElements.define("manus-content-root", ContentRoot);
    
    // Initialize ready state
    const readyState = waitForReady();
    readyState.markReady();
    
    // Set up mutation observer to ensure content root exists
    const observer = new MutationObserver(() => {
        if (!document.querySelector("manus-content-root")) {
            document.body.appendChild(document.createElement("manus-content-root"));
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Initialize content on DOM ready
    if (document.readyState !== "loading") {
        initContent();
    } else {
        document.addEventListener("DOMContentLoaded", initContent);
    }
}

function initContent() {
    const rootElement = document.getElementById("root");
    if (rootElement) {
        // Remove loading spinner
        const loading = rootElement.querySelector(".loading");
        if (loading) {
            loading.remove();
        }
        
        // Add main content
        rootElement.innerHTML = `
            <div class="hero-section">
                <div class="hero-content">
                    <h1>E-Cell | Entrepreneurship Club</h1>
                    <p>Dream, Create and Inspire...</p>
                    <button class="btn-primary" onclick="showWelcomeToast()">
                        Get Started
                    </button>
                </div>
            </div>
            <div class="section">
                <div class="container">
                    <h2 class="section-title">Welcome to E-Cell</h2>
                    <div class="grid grid-2">
                        <div class="card">
                            <h3>Innovation</h3>
                            <p>Fostering innovative ideas and creative solutions for tomorrow's challenges.</p>
                        </div>
                        <div class="card">
                            <h3>Entrepreneurship</h3>
                            <p>Building the next generation of entrepreneurs and business leaders.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

// Global Functions
window.showWelcomeToast = function() {
    toastManager.showToast({
        title: "Welcome to E-Cell! Ready to start your entrepreneurial journey?",
        variant: "success"
    });
};

window.globalEvents = globalEvents;
window.viewManager = viewManager;
window.toastManager = toastManager;

// Initialize the application
initializeApp();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        EventEmitter,
        ViewTypeManager,
        ToastManager,
        Dialog,
        Popup,
        Textarea,
        ContentRoot,
        globalEvents,
        viewManager,
        toastManager
    };
}