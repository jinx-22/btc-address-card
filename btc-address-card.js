(() => {
  const CARD_VERSION = "1.0.0";
  const CARD_TYPE = "btc-address-card";
  const EDITOR_TYPE = `${CARD_TYPE}-editor`;

  /*
   * ============================================================
   * BTC ADDRESS ENTITY ERKENNUNG
   * ============================================================
   */

  const isAddressEntity = (state) => {
    return !!(
      state &&
      state.attributes &&
      state.attributes.address &&
      Object.prototype.hasOwnProperty.call(
        state.attributes,
        "unconfirmed_count"
      )
    );
  };

  /*
   * ============================================================
   * FORMATIERUNG
   * ============================================================
   */

  const fmtBtc = (value) => {
    const n = Number(value);

    if (!Number.isFinite(n)) {
      return "—";
    }

    return n.toFixed(8);
  };

  const fmtSigned = (value) => {
    const n = Number(value);

    if (!Number.isFinite(n)) {
      return "—";
    }

    const s = n.toFixed(8);

    if (n > 0) {
      return `+${s}`;
    }

    return s;
  };

  const shortAddr = (address) => {
    if (!address || address.length < 20) {
      return address || "";
    }

    return `${address.slice(0, 10)}…${address.slice(-8)}`;
  };

  /*
   * ============================================================
   * TRANSLATION
   * ============================================================
   */

  const t = (hass, de, en) => {
    const language = (
      hass?.locale?.language ||
      hass?.language ||
      "en"
    ).toLowerCase();

    return language.startsWith("de") ? de : en;
  };

  /*
   * ============================================================
   * RGB VALIDIERUNG
   * ============================================================
   */

  const normalizeRgb = (value) => {
    if (
      !Array.isArray(value) ||
      value.length !== 3
    ) {
      return null;
    }

    const rgb = value.map(Number);

    if (
      rgb.some(
        (channel) =>
          !Number.isFinite(channel) ||
          channel < 0 ||
          channel > 255
      )
    ) {
      return null;
    }

    return rgb.map((channel) =>
      Math.round(channel)
    );
  };

  const rgbToCss = (value, opacity) => {
    const rgb = normalizeRgb(value);

    if (!rgb) {
      return "";
    }

    const alpha = Math.min(
      100,
      Math.max(
        0,
        Number.isFinite(Number(opacity))
          ? Number(opacity)
          : 100
      )
    ) / 100;

    return `rgb(${rgb[0]} ${rgb[1]} ${rgb[2]} / ${alpha})`;
  };

  /*
   * ============================================================
   * BTC ADDRESS CARD
   * ============================================================
   */

  class BtcAddressCard extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({
        mode: "open",
      });

      this._config = {};
      this._hass = null;
    }

    /*
     * ==========================================================
     * DEFAULT / STUB CONFIG
     * ==========================================================
     */

    static getStubConfig(hass) {
      let entity = "";

      if (hass?.states) {
        entity =
          Object.keys(hass.states).find((entityId) =>
            isAddressEntity(
              hass.states[entityId]
            )
          ) || "";
      }

      return {
        entity,
      };
    }

    static getConfigElement() {
      return document.createElement(
        EDITOR_TYPE
      );
    }

    setConfig(config) {
      if (!config) {
        throw new Error("Invalid configuration");
      }

      this._config = {
        ...config,
      };

      this._render();
    }

    set hass(hass) {
      this._hass = hass;
      this._render();
    }

    getCardSize() {
      return 3;
    }

    getGridOptions() {
      return {
        columns: 6,
        rows: 3,
        min_columns: 3,
        min_rows: 2,
      };
    }

    /*
     * ==========================================================
     * RENDER
     * ==========================================================
     */

    _render() {
      if (!this._config) {
        return;
      }

      const hass = this._hass;
      const entity = this._config.entity || "";
      const state = hass?.states?.[entity];
      const attrs = state?.attributes || {};

      const name =
        this._config.name ||
        attrs.friendly_name ||
        entity ||
        t(
          hass,
          "BTC-Adresse",
          "BTC address"
        );

      const confirmed =
        state ? state.state : null;

      const pendingIn =
        attrs.pending_incoming;

      const pendingOut =
        attrs.pending_outgoing;

      const pendingChange =
        attrs.pending_change;

      const unconfirmed =
        attrs.unconfirmed_count;

      const address =
        attrs.address || "";

      const changeNum =
        Number(pendingChange);

      const changeClass =
        changeNum > 0
          ? "pos"
          : changeNum < 0
            ? "neg"
            : "zero";

      const unavailable =
        !state ||
        confirmed === "unavailable" ||
        confirmed === "unknown";

      /*
       * ========================================================
       * KARTENFARBE / TRANSPARENZ
       * ========================================================
       *
       * Wenn keine Farbe konfiguriert wurde, bleibt die normale
       * Home-Assistant-Kartenfarbe erhalten.
       *
       * card_color = [R, G, B]
       * card_opacity = 0..100
       */

      const cardColor =
        rgbToCss(
          this._config.card_color,
          this._config.card_opacity
        );

      const cardStyle =
        cardColor
          ? `style="--btc-card-background: ${cardColor};"`
          : "";

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
          }

          ha-card {
            cursor: pointer;
            overflow: hidden;
            background:
              var(
                --btc-card-background,
                var(--ha-card-background,
                var(--card-background-color))
              );
          }

          .wrap {
            padding: 16px;
          }

          .head {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 12px;
          }

          .title {
            font-weight: 500;
            font-size: 1.05rem;
            line-height: 1.3;
            color: var(--primary-text-color);
          }

          .addr {
            margin-top: 2px;
            font-family:
              var(--code-font-family, monospace);
            font-size: 0.75rem;
            color: var(--secondary-text-color);
            word-break: break-all;
          }

          .badge {
            flex-shrink: 0;
            font-size: 0.75rem;
            padding: 2px 8px;
            border-radius: 999px;
            background:
              var(--secondary-background-color);
            color:
              var(--secondary-text-color);
          }

          .badge.hot {
            background:
              color-mix(
                in srgb,
                var(--warning-color) 22%,
                transparent
              );

            color:
              var(--warning-color);
          }

          .balance {
            margin: 14px 0 4px;
            font-size: 1.7rem;
            font-weight: 650;
            letter-spacing: -0.02em;
            font-variant-numeric: tabular-nums;
            color: var(--primary-text-color);
          }

          .unit {
            font-size: 0.85rem;
            font-weight: 500;
            color: var(--secondary-text-color);
            margin-left: 4px;
          }

          .warn {
            color: var(--secondary-text-color);
            padding: 16px;
          }

          .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px 12px;
            margin-top: 14px;
            padding-top: 12px;
            border-top:
              1px solid var(--divider-color);
          }

          .item .lbl {
            font-size: 0.72rem;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            color: var(--secondary-text-color);
          }

          .item .val {
            margin-top: 2px;
            font-variant-numeric: tabular-nums;
            font-size: 0.95rem;
            font-weight: 500;
          }

          .pos {
            color:
              var(--success-color, #4caf50);
          }

          .neg {
            color:
              var(--error-color, #f44336);
          }
        </style>

        <ha-card ${cardStyle}>
          ${
            !entity
              ? `
                <div class="warn">
                  ${t(
                    hass,
                    "Bitte eine BTC-Adresse wählen.",
                    "Please pick a BTC address."
                  )}
                </div>
              `
              : unavailable
                ? `
                  <div class="warn">
                    ${t(
                      hass,
                      "Entity nicht verfügbar:",
                      "Entity unavailable:"
                    )}
                    ${this._esc(entity)}
                  </div>
                `
                : `
                  <div class="wrap">

                    <div class="head">

                      <div>

                        <div class="title">
                          ${this._esc(name)}
                        </div>

                        <div
                          class="addr"
                          title="${this._esc(address)}"
                        >
                          ${this._esc(
                            shortAddr(address)
                          )}
                        </div>

                      </div>

                      <div
                        class="badge ${
                          Number(unconfirmed) > 0
                            ? "hot"
                            : ""
                        }"
                      >
                        ${
                          Number(unconfirmed) || 0
                        }
                        TX
                      </div>

                    </div>

                    <div class="balance">
                      ${fmtBtc(confirmed)}
                      <span class="unit">
                        BTC
                      </span>
                    </div>

                    <div class="grid">

                      <div class="item">

                        <div class="lbl">
                          ${t(
                            hass,
                            "Eingang unbestätigt",
                            "Pending in"
                          )}
                        </div>

                        <div
                          class="val ${
                            Number(pendingIn) > 0
                              ? "pos"
                              : ""
                          }"
                        >
                          ${fmtBtc(pendingIn)}
                        </div>

                      </div>

                      <div class="item">

                        <div class="lbl">
                          ${t(
                            hass,
                            "Ausgang unbestätigt",
                            "Pending out"
                          )}
                        </div>

                        <div
                          class="val ${
                            Number(pendingOut) > 0
                              ? "neg"
                              : ""
                          }"
                        >
                          ${fmtBtc(pendingOut)}
                        </div>

                      </div>

                      <div class="item">

                        <div class="lbl">
                          ${t(
                            hass,
                            "Netto pending",
                            "Net pending"
                          )}
                        </div>

                        <div
                          class="val ${changeClass}"
                        >
                          ${fmtSigned(pendingChange)}
                        </div>

                      </div>

                      <div class="item">

                        <div class="lbl">
                          ${t(
                            hass,
                            "Bestätigt",
                            "Confirmed"
                          )}
                        </div>

                        <div class="val">
                          ${fmtBtc(
                            attrs.confirmed_balance ??
                            confirmed
                          )}
                        </div>

                      </div>

                    </div>

                  </div>
                `
          }
        </ha-card>
      `;

      const card =
        this.shadowRoot.querySelector(
          "ha-card"
        );

      if (card) {
        card.onclick = () => {
          if (!entity) {
            return;
          }

          this.dispatchEvent(
            new CustomEvent(
              "hass-more-info",
              {
                bubbles: true,
                composed: true,
                detail: {
                  entityId: entity,
                },
              }
            )
          );
        };
      }
    }

    /*
     * ==========================================================
     * HTML ESCAPING
     * ==========================================================
     */

    _esc(value) {
      return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }
  }

  /*
   * ============================================================
   * BTC ADDRESS CARD EDITOR
   * ============================================================
   *
   * Der bestehende BTC-Entity-Picker bleibt unverändert.
   *
   * Zusätzlich:
   *
   *   - HA RGB Color Selector
   *   - HA Number Selector als Slider
   */

  class BtcAddressCardEditor extends HTMLElement {
    constructor() {
      super();

      this._config = {};
      this._hass = null;
      this._picker = null;
      this._colorSelector = null;
      this._opacitySelector = null;
    }

    setConfig(config) {
      this._config = {
        ...config,
      };

      this._render();
    }

    set hass(hass) {
      this._hass = hass;
      this._render();
    }

    _render() {
      if (!this._hass || !this._config) {
        return;
      }

      /*
       * ========================================================
       * EDITOR EINMAL AUFBAUEN
       * ========================================================
       */

      if (!this._picker) {
        this.innerHTML = "";

        /*
         * ------------------------------------------------------
         * BTC ENTITY PICKER
         * ------------------------------------------------------
         */

        this._picker =
          document.createElement(
            "ha-entity-picker"
          );

        this._picker.allowCustomEntity =
          false;

        this._picker.includeDomains = [
          "sensor",
        ];

        this._picker.entityFilter = (state) =>
          isAddressEntity(state);

        this._picker.addEventListener(
          "value-changed",
          (event) => {
            event.stopPropagation();

            const entity =
              event.detail?.value || "";

            this._updateConfig({
              entity,
            });
          }
        );

        /*
         * ------------------------------------------------------
         * FARBE
         * ------------------------------------------------------
         */

        this._colorSelector =
          document.createElement(
            "ha-selector"
          );

        this._colorSelector.selector = {
          color_rgb: {},
        };

        this._colorSelector.addEventListener(
          "value-changed",
          (event) => {
            event.stopPropagation();

            const value =
              normalizeRgb(
                event.detail?.value
              );

            if (!value) {
              return;
            }

            this._updateConfig({
              card_color: value,
            });
          }
        );

        /*
         * ------------------------------------------------------
         * TRANSPARENZ
         * ------------------------------------------------------
         */

        this._opacitySelector =
          document.createElement(
            "ha-selector"
          );

        this._opacitySelector.selector = {
          number: {
            min: 0,
            max: 100,
            step: 1,
            mode: "slider",
          },
        };

        this._opacitySelector.addEventListener(
          "value-changed",
          (event) => {
            event.stopPropagation();

            const value =
              Number(
                event.detail?.value
              );

            if (
              !Number.isFinite(value)
            ) {
              return;
            }

            this._updateConfig({
              card_opacity: Math.min(
                100,
                Math.max(0, value)
              ),
            });
          }
        );

        /*
         * ------------------------------------------------------
         * EDITOR LAYOUT
         * ------------------------------------------------------
         */

        const container =
          document.createElement(
            "div"
          );

        container.style.display =
          "grid";

        container.style.gap =
          "16px";

        container.appendChild(
          this._picker
        );

        container.appendChild(
          this._colorSelector
        );

        container.appendChild(
          this._opacitySelector
        );

        this.appendChild(
          container
        );
      }

      /*
       * ========================================================
       * HA ZUSTAND SYNCHRONISIEREN
       * ========================================================
       */

      this._picker.hass =
        this._hass;

      this._picker.label =
        t(
          this._hass,
          "BTC-Adresse",
          "BTC address"
        );

      this._picker.value =
        this._config.entity || "";

      /*
       * ========================================================
       * FARBE SYNCHRONISIEREN
       * ========================================================
       */

      this._colorSelector.hass =
        this._hass;

      this._colorSelector.label =
        t(
          this._hass,
          "Kartenfarbe",
          "Card color"
        );

      const color =
        normalizeRgb(
          this._config.card_color
        );

      this._colorSelector.value =
        color || [128, 128, 128];

      /*
       * ========================================================
       * TRANSPARENZ SYNCHRONISIEREN
       * ========================================================
       */

      this._opacitySelector.hass =
        this._hass;

      this._opacitySelector.label =
        t(
          this._hass,
          "Transparenz",
          "Opacity"
        );

      const opacity =
        Number(
          this._config.card_opacity
        );

      this._opacitySelector.value =
        Number.isFinite(opacity)
          ? Math.min(
              100,
              Math.max(0, opacity)
            )
          : 100;
    }

    /*
     * ==========================================================
     * CONFIG UPDATE
     * ==========================================================
     */

    _updateConfig(changes) {
      this._config = {
        ...this._config,
        ...changes,
      };

      this.dispatchEvent(
        new CustomEvent(
          "config-changed",
          {
            bubbles: true,
            composed: true,
            detail: {
              config: this._config,
            },
          }
        )
      );
    }
  }

  /*
   * ============================================================
   * CUSTOM ELEMENTS
   * ============================================================
   */

  if (
    !customElements.get(
      CARD_TYPE
    )
  ) {
    customElements.define(
      CARD_TYPE,
      BtcAddressCard
    );
  }

  if (
    !customElements.get(
      EDITOR_TYPE
    )
  ) {
    customElements.define(
      EDITOR_TYPE,
      BtcAddressCardEditor
    );
  }

  /*
   * ============================================================
   * HOME ASSISTANT CARD REGISTRATION
   * ============================================================
   */

  window.customCards =
    window.customCards || [];

  window.customCards.push({
    type: CARD_TYPE,
    name: "BTC Address Card",
    preview: true,
    description:
      "Confirmed balance and pending in/out (Mempool Watch). Bestätigter Saldo und unbestätigte Ein-/Ausgänge (Mempool Watch).",
    documentationURL:
      "https://github.com/YOUR_USERNAME/btc-address-card",
  });

  console.info(
    `%c BTC Address Card %c v${CARD_VERSION} `,
    "color: white; background: #f7931a; font-weight: 700;",
    "color: #f7931a; background: white; font-weight: 700;"
  );
})();