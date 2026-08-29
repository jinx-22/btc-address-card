(() => {
  "use strict";

  const CARD_TYPE = "btc-address-card";
  const VERSION = "0.9.8";

  const isAddressEntity = (state) =>
    !!(
      state &&
      state.attributes &&
      state.attributes.address &&
      Object.prototype.hasOwnProperty.call(
        state.attributes,
        "unconfirmed_count"
      )
    );

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

    return n > 0 ? `+${s}` : s;
  };

  const shortAddr = (address) => {
    if (!address || address.length < 20) {
      return address || "";
    }

    return `${address.slice(0, 10)}…${address.slice(-8)}`;
  };

  const t = (hass, de, en) => {
    const language = (
      hass?.locale?.language ||
      hass?.language ||
      "en"
    ).toLowerCase();

    return language.startsWith("de") ? de : en;
  };

  class BtcAddressCard extends HTMLElement {
    /*
     * Home Assistant visual editor.
     *
     * HA creates the editor automatically from this schema.
     */
    static getConfigForm() {
      return {
        schema: [
          {
            name: "entity",
            required: true,
            selector: {
              entity: {
                domain: "sensor",
              },
            },
          },
          {
            name: "name",
            selector: {
              text: {},
            },
          },
          {
            name: "font_size",
            selector: {
              number: {
                min: 70,
                max: 150,
                step: 5,
                mode: "slider",
                unit_of_measurement: "%",
              },
            },
          },
        ],

        computeLabel: (schema) => {
          switch (schema.name) {
            case "entity":
              return "BTC-Adresse";

            case "name":
              return "Name";

            case "font_size":
              return "Schriftgröße";

            default:
              return undefined;
          }
        },

        computeHelper: (schema) => {
          switch (schema.name) {
            case "entity":
              return "BTC-Adresse aus Mempool Watch";

            case "font_size":
              return "70–150 % · Standard 100 %";

            default:
              return undefined;
          }
        },
      };
    }

    /*
     * Default configuration used by the Home Assistant
     * card picker.
     */
    static getStubConfig(hass) {
      const entity =
        Object.keys(hass?.states || {}).find((entityId) =>
          isAddressEntity(hass.states[entityId])
        ) || "";

      return {
        entity,
        font_size: 100,
      };
    }

    /*
     * Called by Home Assistant with the card configuration.
     */
    setConfig(config) {
      if (!config) {
        throw new Error("Invalid configuration");
      }

      if (!config.entity) {
        throw new Error("You need to define an entity");
      }

      this._config = {
        font_size: 100,
        ...config,
      };

      this._render();
    }

    /*
     * Home Assistant state.
     */
    set hass(hass) {
      this._hass = hass;
      this._render();
    }

    /*
     * Masonry view.
     */
    getCardSize() {
      return 3;
    }

    /*
     * Sections view.
     *
     * Home Assistant controls the actual card size.
     * No fixed pixel height is defined here.
     */
    getGridOptions() {
      return {
        rows: 4,
        columns: 12,
        min_rows: 4,
        min_columns: 6,
        max_columns: 24,
      };
    }

    _render() {
      if (!this._config) {
        return;
      }

      if (!this._root) {
        this._root = this.attachShadow({
          mode: "open",
        });
      }

      const hass = this._hass;
      const entity = this._config.entity || "";

      const state =
        hass?.states?.[entity];

      const attrs =
        state?.attributes || {};

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
        state?.state ?? null;

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
            : "";

      const unavailable =
        !state ||
        confirmed === "unavailable" ||
        confirmed === "unknown";

      /*
       * Font size:
       *
       * 100 = default
       * 70  = minimum
       * 150 = maximum
       */
      const configuredFontSize =
        Number(this._config.font_size);

      const fontSize =
        Number.isFinite(configuredFontSize)
          ? Math.min(
              150,
              Math.max(
                70,
                configuredFontSize
              )
            )
          : 100;

      const fontScale =
        fontSize / 100;

      this._root.innerHTML = `
        <style>
          :host {
            display: block;

            width: 100%;
            height: 100%;

            min-width: 0;
            min-height: 0;

            box-sizing: border-box;

            font-size:
              calc(
                1rem * ${fontScale}
              );
          }

          ha-card {
            display: flex;
            flex-direction: column;

            width: 100%;
            height: 100%;

            min-width: 0;
            min-height: 0;

            box-sizing: border-box;

            overflow: hidden;

            cursor: pointer;
          }

          .wrap {
            display: flex;
            flex-direction: column;

            flex: 1 1 auto;

            width: 100%;

            min-width: 0;
            min-height: 0;

            box-sizing: border-box;

            padding: 16px;
          }

          /*
           * Upper section remains at its natural size.
           */
          .head {
            display: flex;

            align-items: flex-start;
            justify-content: space-between;

            gap: 12px;

            flex: 0 0 auto;

            min-width: 0;
          }

          .head > div:first-child {
            min-width: 0;
          }

          .title {
            font-weight: 500;

            font-size: 1.05em;

            line-height: 1.3;

            color:
              var(--primary-text-color);
          }

          .addr {
            margin-top: 2px;

            font-family:
              var(
                --code-font-family,
                monospace
              );

            font-size: 0.75em;

            color:
              var(--secondary-text-color);

            word-break: break-all;
          }

          .badge {
            flex-shrink: 0;

            font-size: 0.75em;

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

          /*
           * Balance remains part of the fixed/natural
           * upper section.
           */
          .balance {
            flex: 0 0 auto;

            margin: 14px 0 4px;

            font-size: 1.7em;

            font-weight: 650;

            letter-spacing: -0.02em;

            font-variant-numeric:
              tabular-nums;

            color:
              var(--primary-text-color);
          }

          .unit {
            font-size: 0.85em;

            font-weight: 500;

            margin-left: 4px;

            color:
              var(--secondary-text-color);
          }

          .warn {
            color:
              var(--secondary-text-color);

            padding: 16px;
          }

          /*
           * Flexible lower section.
           *
           * It receives the remaining height supplied
           * by Home Assistant's grid.
           */
          .grid {
            display: grid;

            grid-template-columns:
              repeat(
                2,
                minmax(0, 1fr)
              );

            grid-template-rows:
              repeat(
                2,
                minmax(0, 1fr)
              );

            gap: 8px 12px;

            margin-top: 14px;

            padding-top: 12px;

            border-top:
              1px solid
              var(--divider-color);

            flex: 1 1 auto;

            min-height: 0;

            align-content: stretch;
          }

          /*
           * Center the information inside each
           * flexible grid row.
           */
          .item {
            display: flex;

            flex-direction: column;

            justify-content: center;

            min-width: 0;
            min-height: 0;

            box-sizing: border-box;
          }

          .item .lbl {
            font-size: 0.72em;

            line-height: 1.2;

            text-transform: uppercase;

            letter-spacing: 0.04em;

            color:
              var(--secondary-text-color);
          }

          .item .val {
            margin-top: 2px;

            font-variant-numeric:
              tabular-nums;

            font-size: 0.95em;

            font-weight: 500;

            line-height: 1.25;

            color:
              var(--primary-text-color);
          }

          .pos {
            color:
              var(
                --success-color,
                #4caf50
              );
          }

          .neg {
            color:
              var(
                --error-color,
                #f44336
              );
          }
        </style>

        <ha-card>

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
                          title="${this._esc(
                            address
                          )}"
                        >
                          ${this._esc(
                            shortAddr(address)
                          )}
                        </div>

                      </div>

                      <div
                        class="badge ${
                          Number(
                            unconfirmed
                          ) > 0
                            ? "hot"
                            : ""
                        }"
                      >
                        ${
                          Number(
                            unconfirmed
                          ) || 0
                        }
                        TX
                      </div>

                    </div>

                    <div class="balance">

                      ${fmtBtc(
                        confirmed
                      )}

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
                            Number(
                              pendingIn
                            ) > 0
                              ? "pos"
                              : ""
                          }"
                        >
                          ${fmtBtc(
                            pendingIn
                          )}
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
                            Number(
                              pendingOut
                            ) > 0
                              ? "neg"
                              : ""
                          }"
                        >
                          ${fmtBtc(
                            pendingOut
                          )}
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
                          ${fmtSigned(
                            pendingChange
                          )}
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
        this._root.querySelector(
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

    _esc(value) {
      return String(value ?? "")
        .replace(
          /&/g,
          "&amp;"
        )
        .replace(
          /</g,
          "&lt;"
        )
        .replace(
          />/g,
          "&gt;"
        )
        .replace(
          /"/g,
          "&quot;"
        );
    }
  }

  /*
   * Register the custom element.
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

  /*
   * Home Assistant card picker registration.
   *
   * Do not filter or replace the global array.
   * Simply register the card as required by
   * the Custom Card documentation.
   */
  window.customCards =
    window.customCards || [];

  window.customCards.push({
    type: CARD_TYPE,

    name:
      "BTC Address Card",

    preview: true,

    description:
      "Bestätigter Saldo und unbestätigte Ein-/Ausgänge (Mempool Watch)",

    documentationURL:
      "https://github.com/jinx-22/btc-address-card",
  });

  /*
   * Version information.
   */
  console.info(
    `%c BTC Address Card %c v${VERSION} `,
    "color:white;background:#f7931a;font-weight:bold;",
    "color:#f7931a;background:white;font-weight:bold;"
  );
})();
